import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/react'
import { computeScores, summarize } from './scoring'
import { evaluateAchievements } from './achievements'
import { HABITAT_UPGRADES, NEIGHBORHOOD_UPGRADES } from './catalog'
import { DIMENSION_ORDER } from './dimensions'

const CLERK_META_KEY = 'wilderIndex'
const CLOUD_DEBOUNCE_MS = 1500
const STORAGE_KEY = 'wilder_moms_index_v1'
const SHOWN_CAP = 6

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

function getInitial() {
  if (typeof window === 'undefined') return initialState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    return { ...initialState, ...parsed }
  } catch (e) {
    return initialState
  }
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

const IndexContext = createContext(null)

export function WilderIndexProvider({ children }) {
  const { user, isSignedIn, isLoaded } = useAuth()
  const [state, setState] = useState(getInitial)
  const hydratedFromCloudRef = useRef(null) // user.id we last hydrated from

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // ignore quota errors
    }
  }, [state])

  // Cloud sync: when signed in, hydrate once from unsafeMetadata and then
  // write back on every meaningful state change (debounced). Localstorage
  // remains the per-device cache for users who aren't signed in.
  // Cloud sync: when signed in, hydrate once from unsafeMetadata and then
  // write back on every meaningful state change (debounced). Localstorage
  // remains the per-device cache for users who aren't signed in.
  const [cloudStatus, setCloudStatus] = useState('idle') // 'idle' | 'pending' | 'saved'
  const [lastSavedAt, setLastSavedAt] = useState(null)
  const [cloudPulse, setCloudPulse] = useState(0) // increments on each successful save

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return
    if (hydratedFromCloudRef.current === user.id) return
    const remote = user.unsafeMetadata?.[CLERK_META_KEY]
    if (remote && typeof remote === 'object') {
      setState((prev) => {
        // Don't clobber a more recent local profile.
        if (prev.onboarding?.completed) return prev
        return { ...initialState, ...remote }
      })
    }
    hydratedFromCloudRef.current = user.id
  }, [isLoaded, isSignedIn, user])

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      setCloudStatus('idle')
      return
    }
    // Skip until something worth saving exists.
    if (!state.onboarding?.completed && (state.history || []).length === 0) {
      setCloudStatus('idle')
      return
    }
    setCloudStatus('pending')
    const t = setTimeout(async () => {
      try {
        await user.updateUnsafeMetadata({ [CLERK_META_KEY]: state })
        setLastSavedAt(new Date())
        setCloudStatus('saved')
        setCloudPulse((n) => n + 1)
      } catch (e) {
        // network/rate error — try again on the next state change.
        setCloudStatus('idle')
      }
    }, CLOUD_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [state, isLoaded, isSignedIn, user])

  const scores = useMemo(
    () => (state.onboarding.completed ? computeScores(state.onboarding.answers) : null),
    [state.onboarding.completed, state.onboarding.answers]
  )
  const summary = useMemo(() => (scores ? summarize(scores) : null), [scores])

  const achievements = useMemo(
    () =>
      evaluateAchievements({
        onboardingCompleted: state.onboarding.completed,
        history: state.history,
        earnedIds: state.earnedAchievementIds,
        activeDays: state.activeDays,
      }),
    [state.onboarding.completed, state.history, state.earnedAchievementIds, state.activeDays]
  )

  // Keep earnedAchievementIds in state in sync with the latest evaluation
  useEffect(() => {
    setState((prev) => {
      if (
        achievements.earnedIds.length === prev.earnedAchievementIds.length &&
        achievements.earnedIds.every((id, i) => id === prev.earnedAchievementIds[i])
      ) {
        return prev
      }
      return { ...prev, earnedAchievementIds: achievements.earnedIds }
    })
  }, [achievements.earnedIds])

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
      onboarding: { ...prev.onboarding, completed: true, completedAt: new Date().toISOString() },
    }))
  }, [])

  const resetIndex = useCallback(() => {
    setState({ ...initialState })
  }, [])

  // Pick an upgrade for a given kind ('habitat' | 'neighborhood'). Skips the
  // currentId if provided (used for swap) and avoids the most recently
  // shown list. Falls back to oldest-shown when exhausted.
  const selectUpgrade = useCallback(
    (kind, currentId = null) => {
      const map = kind === 'habitat' ? HABITAT_UPGRADES : NEIGHBORHOOD_UPGRADES
      const targetDim = summary?.opportunity || DIMENSION_ORDER[0]
      const dimensionPool = map[targetDim] || Object.values(map).flat()
      const otherPools = DIMENSION_ORDER
        .filter((d) => d !== targetDim)
        .flatMap((d) => map[d] || [])
      const all = [...dimensionPool, ...otherPools]
      const recent = state.shownUpgradeIds[kind] || []
      const candidates = all.filter(
        (u) => u.id !== currentId && !recent.includes(u.id)
      )
      const pool = candidates.length > 0 ? candidates : all.filter((u) => u.id !== currentId)
      const fallback = pool.length > 0 ? pool : all
      return fallback[Math.floor(Math.random() * fallback.length)] || null
    },
    [summary, state.shownUpgradeIds]
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

  const markUpgrade = useCallback(
    (upgrade, kind, checkIn = 'we-did-it') => {
      setState((prev) => {
        const day = todayISO()
        const newHistory = prev.history
          .filter((h) => h.id !== upgrade.id)
          .concat({
            id: upgrade.id,
            kind,
            dimension: upgrade.lift ? Object.keys(upgrade.lift)[0] : null,
            title: upgrade.title,
            completedAt: new Date().toISOString(),
            checkIn,
          })
        const newDays = prev.activeDays.includes(day)
          ? prev.activeDays
          : [day, ...prev.activeDays].slice(0, 365)
        // Remove the upgrade from the shown list so the dashboard can show
        // a fresh one next time.
        const recent = (prev.shownUpgradeIds[kind] || []).filter((x) => x !== upgrade.id)
        return {
          ...prev,
          history: newHistory,
          activeDays: newDays,
          shownUpgradeIds: { ...prev.shownUpgradeIds, [kind]: recent },
        }
      })
    },
    []
  )

  // Architectural Move actions. The selector lives outside the context, so
  // these are thin state setters for shown/current acknowledgments.
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
