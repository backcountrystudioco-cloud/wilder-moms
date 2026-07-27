import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWilderIndex } from './WilderIndexContext'
import { generateWeeklyPlan } from './planGenerator'
import { DIMENSIONS } from './dimensions'

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
  const [plan, setPlan] = useState(() =>
    generateWeeklyPlan(profile, scores, state.shownUpgradeIds)
  )

  useEffect(() => {
    setPlan(generateWeeklyPlan(profile, scores, state.shownUpgradeIds))
  }, [profile, scores, state.shownUpgradeIds])

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

  const handleCheckIn = (action, checkIn) => {
    markUpgrade(action, action.kind, checkIn)
  }

  const handleSwap = (action) => {
    rememberShown(action.kind, action.id)
    setPlan(generateWeeklyPlan(profile, scores, {
      ...state.shownUpgradeIds,
      [action.kind]: [action.id, ...(state.shownUpgradeIds[action.kind] || []).filter((x) => x !== action.id)].slice(0, 6),
    }))
  }

  const handleSkip = (action) => {
    markUpgrade({ ...action, lift: null, id: `${action.id}.skipped.${Date.now()}` }, action.kind, 'not-today')
  }

  return (
    <section className="bg-white rounded-3xl border border-inkll/10 p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-1">
            Your week
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink">Three small changes</h2>
          <p className="text-inkl text-sm mt-1 max-w-md">
            Picked for your home, your block, and the gap on the chart.
          </p>
        </div>
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
