import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWilderIndex } from './WilderIndexContext'
import { generateWeeklyPlan } from './planGenerator'
import { DIMENSIONS, DIMENSION_ORDER } from './dimensions'
import { describeLocation } from './personalize'
import {
  buildRecommendationsRequest,
  fetchLocalRecommendations,
  KIND_LABELS,
} from './localRecommendations'

const KIND_META = {
  habitat: {
    eyebrow: 'At home',
    title: 'Habitat Shift',
    frameClass: 'bg-parchment',
    borderClass: 'border-forest/20',
    accentText: 'text-forest',
    accentBg: 'bg-forest/10',
  },
  neighborhood: {
    eyebrow: 'On the block',
    title: 'Habitat Shift',
    frameClass: 'bg-blush/30',
    borderClass: 'border-peach/40',
    accentText: 'text-terra',
    accentBg: 'bg-terra/10',
  },
}

// Map an AI recommendation kind into the existing card's
// habitat/neighborhood split + eyebrow label.
function kindToBucket(kind) {
  switch (kind) {
    case 'route':
    case 'third_place':
    case 'social':
      return 'neighborhood'
    case 'habitat':
    case 'seasonal':
    case 'small_thing':
    default:
      return 'habitat'
  }
}

// ISO week key, e.g. "2026-W31". Stable across reloads and across the
// whole calendar week, so the weekly plan picks rotate every Monday.
function weekKey(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const weekNum = Math.ceil(((date - yearStart) / 86400000 + 1) / 7)
  return `${date.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`
}

const CACHE_KEY = ['wilder', 'app', 'weekly', 'plan', 'v1'].join(':')

function loadCachedPlan(key) {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.weekKey !== key) return null
    if (!Array.isArray(parsed?.recs) || parsed.recs.length === 0) return null
    return parsed
  } catch {
    return null
  }
}

function saveCachedPlan(key, recs, source) {
  try {
    // Capture the previous week before overwriting so the next week can
    // pass it to the AI as dedup input.
    try {
      const prev = window.localStorage.getItem(CACHE_KEY)
      if (prev) window.localStorage.setItem(PREVIOUS_KEY, prev)
    } catch {
      // ignore
    }
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ weekKey: key, recs, source, savedAt: Date.now() })
    )
  } catch {
    // ignore quota / disabled storage
  }
}

function loadPreviousRecs() {
  try {
    const raw = window.localStorage.getItem(PREVIOUS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed?.recs)) return []
    return parsed.recs
  } catch {
    return []
  }
}

// Normalize a string for fuzzy comparison (lowercase + collapse whitespace).
function norm(s) {
  return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim()
}

// Filter AI recommendations against the user's already-seen / already-done
// items. Drops anything whose title or core action substantially overlaps
// with something in either list. Falls back to the original list only if
// every item was a duplicate.
function dedupeAgainst(recs, priorTitles, priorActions) {
  if (!Array.isArray(recs) || recs.length === 0) return recs
  const usedTitle = new Set(priorTitles.map(norm).filter(Boolean))
  const usedAction = new Set(priorActions.map(norm).filter(Boolean))
  const kept = []
  for (const r of recs) {
    const t = norm(r?.title)
    const a = norm(r?.action)
    const titleHit = t && usedTitle.has(t)
    const actionHit = a && usedAction.has(a)
    if (!titleHit && !actionHit) kept.push(r)
  }
  return kept.length > 0 ? kept : recs
}

function titlesAndActions(recs) {
  const list = Array.isArray(recs) ? recs : []
  return {
    titles: list.map((r) => r?.title || '').filter(Boolean),
    actions: list.map((r) => r?.action || '').filter(Boolean),
  }
}

// Turn raw AI recommendations into the action shape ActionCard already
// understands. IDs include the weekKey so each Monday's plan is its own set
// of check-in entries (history does not bleed across weeks). The three
// cards are tagged with the three lowest-scoring dimensions so each card's
// "For [dimension]" label points at a different gap.
function buildActionsFromAi(recs, scores, week) {
  if (!Array.isArray(recs)) return []
  const dimsForCards = pickSpreadDimensions(scores)
  return recs.map((rec, i) => {
    const bucket = kindToBucket(rec.kind)
    return {
      id: `ai.${week}.${i}.${rec.kind}`,
      title: rec.title,
      copy: rec.action,
      time: rec.time,
      effort: null,
      lift: null,
      kind: bucket,
      dimension: dimsForCards[i] || dimsForCards[0] || null,
      meta: {
        eyebrow: KIND_LABELS[rec.kind] || 'For this week',
        why: rec.why,
      },
      _ai: true,
    }
  })
}

function pickLowestDimension(scores) {
  if (!scores) return null
  let best = null
  let bestVal = Infinity
  for (const id of DIMENSION_ORDER) {
    const v = scores[id]
    if (typeof v === 'number' && v < bestVal) {
      bestVal = v
      best = id
    }
  }
  return best
}

// Spread the three AI cards across the three lowest-scoring dimensions
// (lowest, second-lowest, third-lowest) so the "For [dimension]" label on
// each card carries different meaning instead of all three pointing at
// the same gap.
function pickSpreadDimensions(scores) {
  if (!scores) return [null, null, null]
  const ranked = [...DIMENSION_ORDER]
    .map((id) => [id, scores[id] ?? 0])
    .sort((a, b) => a[1] - b[1])
    .map(([id]) => id)
  return [ranked[0] || null, ranked[1] || null, ranked[2] || null]
}

function liftString(lift) {
  if (!lift) return ''
  return Object.entries(lift)
    .sort((a, b) => b[1] - a[1])
    .map(([dim, n]) => `${DIMENSIONS[dim]?.name || dim} +${n}`)
    .join(' · ')
}

function ActionCard({ action, onCheckIn, onSwap, onSkip, history, isDone, isSkipped }) {
  const [phase, setPhase] = useState('idle')
  const meta = KIND_META[action.kind] || KIND_META.habitat
  const dim = DIMENSIONS[action.dimension]

  useEffect(() => {
    if (isDone || isSkipped) setPhase('done')
    else setPhase('idle')
  }, [isDone, isSkipped, action.id])

  return (
    <div
      className={`${meta.frameClass} border ${meta.borderClass} rounded-3xl p-5 md:p-6 relative overflow-hidden transition-opacity ${
        isDone || isSkipped ? 'opacity-65' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${meta.accentBg} ${meta.accentText}`}
        >
          {action.meta.eyebrow} · {meta.title}
        </span>
        {dim && (
          <span className="inline-flex items-center gap-1 text-[10px] text-inkll">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dim.color }} />
            For {dim.name.toLowerCase()}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-serif text-xl md:text-2xl text-ink leading-tight mb-2">
              {action.title}
            </h3>
            <p className="text-inkl text-sm leading-relaxed mb-3">{action.copy}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-inkll mb-4">
              <span>· {action.time}</span>
              {action.effort && <span>· {action.effort} effort</span>}
              <span className={meta.accentText}>· Lift: {liftString(action.lift)}</span>
            </div>
            <p className="text-inkll text-[11px] italic mb-4">{action.meta.why}</p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPhase('checking')}
                className={`${meta.accentText} bg-ink text-cream px-4 py-2 rounded-full font-medium text-xs hover:opacity-90 transition-opacity`}
              >
                I did this
              </button>
              <button
                onClick={onSwap}
                className="text-inkll text-[11px] hover:text-ink transition-colors px-2 py-1.5"
              >
                Swap
              </button>
              <button
                onClick={onSkip}
                className="text-inkll text-[11px] hover:text-ink transition-colors px-2 py-1.5"
              >
                Not this week
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'checking' && (
          <motion.div
            key="checking"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-serif text-lg text-ink leading-tight mb-2">How did it go?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <button
                onClick={() => { onCheckIn('we-did-it'); setPhase('done') }}
                className="p-3 rounded-xl border-2 border-inkll/20 hover:border-ember/40 text-left"
              >
                <span className="font-sans text-xs text-ink">We did it</span>
              </button>
              <button
                onClick={() => { onCheckIn('changed'); setPhase('done') }}
                className="p-3 rounded-xl border-2 border-inkll/20 hover:border-ember/40 text-left"
              >
                <span className="font-sans text-xs text-ink">We changed the plan</span>
              </button>
              <button
                onClick={() => { onCheckIn('not-today'); setPhase('done') }}
                className="p-3 rounded-xl border-2 border-inkll/20 hover:border-ember/40 text-left"
              >
                <span className="font-sans text-xs text-ink">Not this week</span>
              </button>
            </div>
            <button onClick={() => setPhase('idle')} className="text-inkll text-[11px] hover:text-ink">
              ← Back
            </button>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-lg text-ink leading-tight mb-1.5">
              {isDone ? 'Done.' : 'Noted.'}
            </h3>
            <p className="text-inkll text-xs">
              {isDone
                ? 'Next week\'s plan will build on this.'
                : 'It\'s okay to skip one. The pattern keeps moving.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function WeeklyPlan({ profile, scores }) {
  const { state, markUpgrade, rememberShown } = useWilderIndex()
  const currentWeek = useMemo(() => weekKey(), [])
  const [aiRecs, setAiRecs] = useState([])
  const [aiSource, setAiSource] = useState(null)
  const [aiStatus, setAiStatus] = useState('idle') // idle | loading | ready | error
  const [shownIds, setShownIds] = useState([])
  const [showFallback, setShowFallback] = useState(false)
  const inFlight = useRef(false)

  // Render the AI cards when we have them, otherwise fall back to the
  // local rule-based plan generator so the section never goes empty.
  const aiActions = useMemo(
    () => (aiRecs.length > 0 ? buildActionsFromAi(aiRecs, scores, currentWeek) : []),
    [aiRecs, scores, currentWeek]
  )

  // Cards shown on screen: first 3 of the AI actions, unless the user has
  // swapped some out (shownIds records which AI indices are visible).
  const visibleAiActions = useMemo(() => {
    if (aiActions.length === 0) return []
    const visible = []
    for (let i = 0; i < aiActions.length && visible.length < 3; i++) {
      if (!shownIds.includes(i)) visible.push(aiActions[i])
    }
    return visible.length === 3 ? visible : aiActions.slice(0, 3)
  }, [aiActions, shownIds])

  const fallbackActions = useMemo(
    () => generateWeeklyPlan(profile, scores, state.shownUpgradeIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile, scores, state.shownUpgradeIds]
  )

  const plan = aiStatus === 'ready' && visibleAiActions.length === 3
    ? visibleAiActions
    : fallbackActions

  const fetchAiPicks = useCallback(async (force = false) => {
    if (inFlight.current) return
    if (!force) {
      const cached = loadCachedPlan(currentWeek)
      if (cached) {
        setAiRecs(cached.recs)
        setAiSource(cached.source || 'cache')
        setAiStatus('ready')
        return
      }
    }
    inFlight.current = true
    setAiStatus('loading')
    try {
      const loc = describeLocation(profile || {})

      // Collect dedup signals: the previous AI week (titles + actions) and
      // anything the user has actually marked done since the start of the
      // current onboarding. History items carry the source title/copy so the
      // dedupe logic can compare apples to apples.
      const previousRecs = loadPreviousRecs()
      const priorFromHistory = (Array.isArray(state?.history) ? state.history : [])
        .filter((h) => (h?.checkIn === 'we-did-it' || h?.checkIn === 'changed'))
        .map((h) => ({ title: h?.title || null, action: h?.copy || null, kind: h?.kind || null }))

      const payload = buildRecommendationsRequest({
        profile,
        scores,
        location: loc,
        previouslyShown: previousRecs,
        completedRecently: priorFromHistory,
      })
      const res = await fetchLocalRecommendations(payload)

      // Client-side dedupe as a safety net: even if the AI slipped, drop
      // anything whose title or action matches the previous week or what
      // the user already did.
      const priorTitles = [
        ...previousRecs.map((r) => r?.title || ''),
        ...priorFromHistory.map((h) => h?.title || ''),
      ]
      const priorActions = [
        ...previousRecs.map((r) => r?.action || ''),
        ...priorFromHistory.map((h) => h?.action || ''),
      ]
      const cleaned = dedupeAgainst(res.recommendations, priorTitles, priorActions)

      setAiRecs(cleaned)
      setAiSource(res.source)
      setAiStatus('ready')
      setShowFallback(res.source === 'fallback')
      saveCachedPlan(currentWeek, cleaned, res.source)
    } catch (err) {
      setAiStatus('error')
      setShowFallback(true)
    } finally {
      inFlight.current = false
    }
  }, [profile, scores, currentWeek, state?.history])

  useEffect(() => {
    fetchAiPicks(false)
  }, [fetchAiPicks])

  // Determine which actions are done / skipped based on history
  const actionState = useMemo(() => {
    const out = {}
    for (const action of plan) {
      const matches = state.history.filter((h) => h.id === action.id)
      if (matches.length === 0) {
        out[action.id] = { isDone: false, isSkipped: false }
      } else {
        const last = matches[matches.length - 1]
        out[action.id] = {
          isDone: last.checkIn === 'we-did-it' || last.checkIn === 'changed',
          isSkipped: last.checkIn === 'not-today',
        }
      }
    }
    return out
  }, [plan, state.history])

  if (plan.length === 0) return null

  const isAi = aiStatus === 'ready' && visibleAiActions.length === 3

  const handleCheckIn = (action, checkIn) => {
    markUpgrade(action, action.kind, checkIn)
  }

  const handleSwap = (action) => {
    if (isAi && action._ai) {
      // AI card: hide the swapped one in the current view. If all 3 are
      // swapped, force a fresh fetch from the API.
      const visibleIdx = aiActions.findIndex((a) => a.id === action.id)
      const nextShown = [...shownIds, visibleIdx]
      setShownIds(nextShown)
      if (nextShown.length >= 3 || aiActions.length - nextShown.length < 3) {
        // Re-fetch fresh AI picks so the user always sees new content.
        setShownIds([])
        fetchAiPicks(true)
      }
      return
    }
    rememberShown(action.kind, action.id)
  }

  const handleSkip = (action) => {
    markUpgrade({ ...action, lift: null, id: `${action.id}.skipped.${Date.now()}` }, action.kind, 'not-today')
  }

  const handleRefresh = () => {
    setShownIds([])
    fetchAiPicks(true)
  }

  return (
    <section className="bg-white rounded-3xl border border-inkll/10 p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-3 mb-5 flex-wrap">
        <div>
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-1">
            Your week · {currentWeek}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink">Three small changes</h2>
          <p className="text-inkl text-sm mt-1 max-w-md">
            Picked for your home, your block, and the gap on the chart.
          </p>
          {isAi && (
            <p className="text-inkll text-xs mt-2 italic">
              {showFallback
                ? 'Picked from your block profile — refresh for an AI weekly take.'
                : aiSource === 'ai'
                ? 'Refreshed for this week from your Wilder pattern.'
                : 'Refreshed for this week.'}
            </p>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={aiStatus === 'loading'}
          className="text-inkll text-xs hover:text-ink transition-colors disabled:opacity-50"
        >
          {aiStatus === 'loading' ? 'Refreshing…' : 'Refresh this week'}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plan.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
            onCheckIn={(c) => handleCheckIn(action, c)}
            onSwap={() => handleSwap(action)}
            onSkip={() => handleSkip(action)}
            isDone={actionState[action.id]?.isDone}
            isSkipped={actionState[action.id]?.isSkipped}
          />
        ))}
      </div>
    </section>
  )
}
