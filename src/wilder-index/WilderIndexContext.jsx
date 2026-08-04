// WilderIndexContext — per-user state for the Wilder Index.
//
// Persistence model (post-fix):
//   1. Source of truth = Supabase `wilder_index_state` table, scoped by Clerk
//      user id. Each user gets their own row.
//   2. Per-user localStorage cache (`wilder_index_<userId>`) for instant
//      paint on returning devices. Never shared across users.
//   3. One-time migration: if a user signs in and Supabase has no row but
//      Clerk's `unsafeMetadata.wilderIndex` has data, we copy that data
//      into Supabase and tag the row `migrated_from_clerk_metadata = true`.
//      The Clerk metadata is left intact as a backup.
//
// Race-condition notes:
//   - On sign-in we render the per-user local cache first (instant), then
//     hydrate from Supabase. The hydrate step is the only thing that can
//     replace local state with server state — the old "don't clobber a
//     completed local" check is gone because per-user keys make it safe.
//   - Saves only fire after hydration completes for the current user id.
//     Stale saves from a previous sign-in are dropped by the userId ref.
//   - On sign-out we reset to initialState. Per-user local caches are kept
//     so a re-sign-in restores the offline view instantly.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react'
import { useAuth } from '@clerk/react'
import { computeScores, applyHistoryLift, summarize } from './scoring'
import { evaluateAchievements } from './achievements'
import { HABITAT_UPGRADES, NEIGHBORHOOD_UPGRADES } from './catalog'
import { DIMENSION_ORDER } from './dimensions'

const CLERK_META_KEY = 'wilderIndex'
const CLOUD_DEBOUNCE_MS = 1500
const SHOWN_CAP = 6
const HISTORY_CAP = 500
const ACTIVE_DAYS_CAP = 365
const SHOWN_PER_KIND_CAP = 12

const STORAGE_PREFIX = 'wilder_index_'
const LEGACY_STORAGE_KEY = '********************'

const initialState = {
  onboarding: {
    completed: false,
    completedAt: null,
    answers: {},
    contextAnswers: {},
  },
  history: [],
  earnedAchievementIds: [],
  activeDays: [],
  shownUpgradeIds: { habitat: [], neighborhood: [] },
  architectural: {
    currentMonthKey: null,
    currentId: null,
    shownIds: [],
    acknowledgments: [],
  },
}

function storageKeyFor(userId) {
  return `${STORAGE_PREFIX}${userId}`
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function safeParse(raw) {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function loadLocalForUser(userId) {
  if (typeof window === 'undefined' || !userId) return null
  const parsed = safeParse(window.localStorage.getItem(storageKeyFor(userId)))
  if (!parsed) return null
  return { ...initialState, ...parsed }
}

// One-time migration: if a legacy single-key local cache exists for this
// user, copy it into the per-user key. The legacy key is left intact so
// we never destroy data.
function migrateLegacyLocalCache(userId) {
  if (typeof window === 'undefined' || !userId) return null
  const userKey = storageKeyFor(userId)
  if (window.localStorage.getItem(userKey)) return null
  const legacy = safeParse(window.localStorage.getItem(LEGACY_STORAGE_KEY))
  if (!legacy) return null
  try {
    window.localStorage.setItem(userKey, JSON.stringify(legacy))
  } catch {
    // ignore
  }
  return { ...initialState, ...legacy }
}

const IndexContext = createContext(null)

export function WilderIndexProvider({ children }) {
  const { user, isSignedIn, isLoaded, getToken } = useAuth()
  const [state, setState] = useState(initialState)
  const [cloudStatus, setCloudStatus] = useState('idle') // 'idle' | 'loading' | 'pending' | 'saved' | 'error'
  const [lastSavedAt, setLastSavedAt] = useState(null)
  const [cloudPulse, setCloudPulse] = useState(0)

  // The userId we most recently hydrated from. Used to discard stale work
  // (e.g. a save scheduled by a previous user after the user has switched
  // accounts).
  const hydratedUserIdRef = useRef(null)
  // True once we've finished hydrating from the server for the current user.
  // Saves only fire after this flips true.
  const hydrationCompleteRef = useRef(false)
  // True if the current user has already had their Clerk metadata migrated
  // to Supabase. Prevents repeated migration attempts.
  const migratedForRef = useRef(null)

  // -------------------------------------------------------- Per-user local cache
  // Write the local cache for the signed-in user on every state change.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const uid = user?.id
    if (!uid) return
    try {
      window.localStorage.setItem(storageKeyFor(uid), JSON.stringify(state))
    } catch {
      // ignore quota errors
    }
  }, [state, user?.id])

  // ---------------------------------------------------- Sign-in / sign-out
  // Single effect that reacts to auth changes. On sign-in: load local cache
  // → fetch from Supabase → migrate Clerk metadata if needed → mark
  // hydration complete. On sign-out: reset state, drop the hydration flag.
  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn || !user) {
      // Sign-out: clear everything.
      hydratedUserIdRef.current = null
      hydrationCompleteRef.current = false
      migratedForRef.current = null
      setState(initialState)
      setCloudStatus('idle')
      setLastSavedAt(null)
      return
    }

    const uid = user.id

    // First thing: paint the per-user local cache so the user doesn't see
    // a flash of empty state.
    const local = loadLocalForUser(uid) || migrateLegacyLocalCache(uid)
    if (local) {
      setState(local)
    } else {
      setState(initialState)
    }

    // Mark hydration as in-progress for this user.
    hydrationCompleteRef.current = false
    hydratedUserIdRef.current = uid

    // Fire the cloud hydration. Async; we don't await it inside the effect.
    ;(async () => {
      setCloudStatus('loading')
      try {
        const token = await getToken().catch(() => null)
        if (!token) {
          // Without a token we can't read the server. Treat as offline —
          // proceed with whatever local cache we already painted.
          setCloudStatus('idle')
          hydrationCompleteRef.current = true
          return
        }
        const res = await fetch('/api/wilder-index', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.status === 401) {
          setCloudStatus('error')
          hydrationCompleteRef.current = true
          return
        }
        if (!res.ok) throw new Error(`GET ${res.status}`)
        const data = await res.json()

        // Stale-response guard: only apply if we're still on the same user.
        if (hydratedUserIdRef.current !== uid) return

        if (data?.state && typeof data.state === 'object') {
          setState({ ...initialState, ...data.state })
          setCloudStatus('saved')
        } else {
          // Server has nothing for this user. If Clerk metadata has legacy
          // data and we haven't migrated yet for this user, migrate it.
          const clerkData = user.unsafeMetadata?.[CLERK_META_KEY]
          if (
            clerkData &&
            typeof clerkData === 'object' &&
            migratedForRef.current !== uid
          ) {
            migratedForRef.current = uid
            try {
              const putRes = await fetch('/api/wilder-index', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ state: clerkData, migrateFromClerk: true }),
              })
              if (putRes.ok) {
                const putData = await putRes.json().catch(() => null)
                if (putData?.updatedAt) setLastSavedAt(new Date(putData.updatedAt))
                setState({ ...initialState, ...clerkData })
                setCloudStatus('saved')
              } else {
                setCloudStatus('idle')
              }
            } catch {
              setCloudStatus('idle')
            }
          } else {
            setCloudStatus('idle')
          }
        }
      } catch (err) {
        console.warn('[wilder-index] hydrate failed', err?.message || err)
        setCloudStatus('error')
      } finally {
        // Only flip the flag if we're still the active user.
        if (hydratedUserIdRef.current === uid) {
          hydrationCompleteRef.current = true
        }
      }
    })()
  }, [isLoaded, isSignedIn, user, getToken])

  // --------------------------------------------------------- Cloud save loop
  // Fires whenever `state` changes after hydration. Debounced so a burst of
  // setter calls collapses into one server write.
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return
    if (!hydrationCompleteRef.current) return
    // Don't bother saving if there's nothing meaningful yet.
    if (!state.onboarding?.completed && (state.history || []).length === 0) return

    setCloudStatus('pending')
    const uid = user.id
    const timer = setTimeout(async () => {
      // Discard if the user has changed (signed out / switched) since the
      // save was scheduled.
      if (hydratedUserIdRef.current !== uid) return

      try {
        const token = await getToken().catch(() => null)
        if (!token) {
          setCloudStatus('error')
          return
        }
        const res = await fetch('/api/wilder-index', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ state }),
        })
        if (!res.ok) {
          setCloudStatus('error')
          return
        }
        const data = await res.json().catch(() => null)
        if (hydratedUserIdRef.current !== uid) return
        if (data?.updatedAt) setLastSavedAt(new Date(data.updatedAt))
        setCloudStatus('saved')
        setCloudPulse((n) => n + 1)
      } catch (err) {
        console.warn('[wilder-index] save failed', err?.message || err)
        setCloudStatus('error')
      }
    }, CLOUD_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [state, isLoaded, isSignedIn, user, getToken])

  // ----------------------------------------------------------- Derived data
  // Base scores come from the field check; completed upgrades add lift on top
  // so the displayed score actually moves when users mark shifts done.
  // applyHistoryLift caps the accumulated lift per dimension (no runaway
  // scores) and discards any lift that would push a dim past 100.
  const scores = useMemo(() => {
    if (!state.onboarding.completed) return null
    const base = computeScores(state.onboarding.answers)
    return applyHistoryLift(base, state.history)
  }, [state.onboarding.completed, state.onboarding.answers, state.history])
  const summary = useMemo(() => (scores ? summarize(scores) : null), [scores])
  const achievements = useMemo(
    () =>
      evaluateAchievements({
        onboardingCompleted: state.onboarding.completed,
        history: state.history,
        earnedIds: state.earnedAchievementIds,
        activeDays: state.activeDays,
      }),
    [
      state.onboarding.completed,
      state.history,
      state.earnedAchievementIds,
      state.activeDays,
    ]
  )

  // Keep earnedAchievementIds in state in sync with the latest evaluation
  useEffect(() => {
    setState((prev) => {
      const sameLength = achievements.earnedIds.length === prev.earnedAchievementIds.length
      const allSame =
        sameLength &&
        achievements.earnedIds.every((id, i) => id === prev.earnedAchievementIds[i])
      if (allSame) return prev
      return { ...prev, earnedAchievementIds: achievements.earnedIds }
    })
  }, [achievements.earnedIds])

  // ------------------------------------------------------------- Mutators
  const setAnswer = useCallback((questionId, value) => {
    setState((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        answers: { ...prev.onboarding.answers, [questionId]: value },
      },
    }))
  }, [])

  const setContextAnswer = useCallback((questionId, value) => {
    setState((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        contextAnswers: { ...prev.onboarding.contextAnswers, [questionId]: value },
      },
    }))
  }, [])

  const completeOnboarding = useCallback(() => {
    setState((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        completed: true,
        completedAt: new Date().toISOString(),
      },
    }))
  }, [])

  // Reset is destructive: it wipes local state and asks the server to delete
  // the row. Local caches for OTHER users are untouched.
  const resetIndex = useCallback(async () => {
    setState({ ...initialState })
    if (isSignedIn && user) {
      try {
        const token = await getToken().catch(() => null)
        if (token) {
          await fetch('/api/wilder-index', {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          })
        }
      } catch (err) {
        console.warn('[wilder-index] reset failed to clear server row', err?.message || err)
      }
      try {
        window.localStorage.removeItem(storageKeyFor(user.id))
      } catch {
        // ignore
      }
    }
  }, [isSignedIn, user, getToken])

  const selectUpgrade = useCallback(
    (kind, currentId = null) => {
      const map = kind === 'habitat' ? HABITAT_UPGRADES : NEIGHBORHOOD_UPGRADES
      const targetDim = summary?.opportunity || DIMENSION_ORDER[0]
      const recent = state.shownUpgradeIds[kind] || []

      // Deterministic, lowest-dimension-first. Take the first item from the
      // opportunity dim's pool that hasn't been shown recently and isn't
      // the current card.
      const opportunityPool = map[targetDim] || []
      let pick = opportunityPool.find(
        (u) => u.id !== currentId && !recent.includes(u.id)
      )
      if (pick) return pick

      // Opportunity-dim pool is exhausted — fall back to the next-lowest
      // dims in score-ascending order so "Today's pick" stays aligned with
      // what the weekly plan is doing.
      const otherDims = DIMENSION_ORDER
        .filter((d) => d !== targetDim)
        .sort((a, b) => (scores?.[a] ?? 0) - (scores?.[b] ?? 0))
      for (const dim of otherDims) {
        const pool = map[dim] || []
        pick = pool.find((u) => u.id !== currentId && !recent.includes(u.id))
        if (pick) return pick
      }

      // All dims exhausted at the "not recent" filter — relax to any
      // non-current item in the opportunity dim.
      pick = opportunityPool.find((u) => u.id !== currentId)
      if (pick) return pick

      // Last resort: anything in any dim that isn't the current card.
      const all = Object.values(map).flat()
      return all.find((u) => u.id !== currentId) || null
    },
    [summary, scores, state.shownUpgradeIds]
  )

  const rememberShown = useCallback((kind, id) => {
    setState((prev) => {
      const recent = prev.shownUpgradeIds[kind] || []
      const next = [id, ...recent.filter((x) => x !== id)].slice(0, SHOWN_CAP)
      return {
        ...prev,
        shownUpgradeIds: { ...prev.shownUpgradeIds, [kind]: next },
      }
    })
  }, [])

  const markUpgrade = useCallback((upgrade, kind, checkIn = 'we-did-it') => {
    setState((prev) => {
      const day = todayISO()
      const newHistory = prev.history
        .filter((h) => h.id !== upgrade.id)
        .concat({
          id: upgrade.id,
          kind,
          dimension: upgrade.lift ? Object.keys(upgrade.lift)[0] : null,
          lift: upgrade.lift || null,
          title: upgrade.title,
          completedAt: new Date().toISOString(),
          checkIn,
        })
        .slice(-HISTORY_CAP)
      const newDays = prev.activeDays.includes(day)
        ? prev.activeDays
        : [day, ...prev.activeDays].slice(0, ACTIVE_DAYS_CAP)
      const recent = (prev.shownUpgradeIds[kind] || []).filter((x) => x !== upgrade.id)
      return {
        ...prev,
        history: newHistory,
        activeDays: newDays,
        shownUpgradeIds: {
          ...prev.shownUpgradeIds,
          [kind]: recent.slice(0, SHOWN_PER_KIND_CAP),
        },
      }
    })
  }, [])

  const setArchitecturalCurrent = useCallback(({ id, monthKey }) => {
    setState((prev) => {
      const arch = prev.architectural || {
        currentMonthKey: null,
        currentId: null,
        shownIds: [],
        acknowledgments: [],
      }
      if (arch.currentId === id && arch.currentMonthKey === monthKey) return prev
      const shownIds = [id, ...(arch.shownIds || []).filter((x) => x !== id)].slice(0, 18)
      return {
        ...prev,
        architectural: { ...arch, currentId: id, currentMonthKey: monthKey, shownIds },
      }
    })
  }, [])

  const acknowledgeArchitectural = useCallback((id, status = 'noted') => {
    setState((prev) => {
      const arch = prev.architectural || {
        currentMonthKey: null,
        currentId: null,
        shownIds: [],
        acknowledgments: [],
      }
      const list = arch.acknowledgments || []
      const next = list
        .filter((a) => !(a.id === id && a.monthKey === arch.currentMonthKey))
        .concat({ id, monthKey: arch.currentMonthKey, status, at: new Date().toISOString() })
        .slice(-24)
      return { ...prev, architectural: { ...arch, acknowledgments: next } }
    })
  }, [])

  const value = {
    state,
    scores,
    summary,
    achievements: achievements.achievements,
    newlyUnlocked: achievements.newlyUnlocked,
    setAnswer,
    setContextAnswer,
    completeOnboarding,
    resetIndex,
    selectUpgrade,
    rememberShown,
    markUpgrade,
    setArchitecturalCurrent,
    acknowledgeArchitectural,
    cloudStatus,
    lastSavedAt,
    cloudPulse,
  }

  return <IndexContext.Provider value={value}>{children}</IndexContext.Provider>
}

export function useWilderIndex() {
  const ctx = useContext(IndexContext)
  if (!ctx) throw new Error('useWilderIndex must be used inside WilderIndexProvider')
  return ctx
}
