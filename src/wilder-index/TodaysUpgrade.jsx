import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWilderIndex } from './WilderIndexContext'
import { DIMENSIONS } from './dimensions'

const KIND_META = {
  habitat: {
    eyebrow: 'Today at home',
    title: 'Habitat Upgrade',
    frameClass: 'bg-parchment',
    borderClass: 'border-forest/20',
    accentText: 'text-forest',
    accentBg: 'bg-forest/10',
    swapCopy: 'Swap this change',
  },
  neighborhood: {
    eyebrow: 'Today in the neighborhood',
    title: 'Neighborhood Upgrade',
    frameClass: 'bg-blush/30',
    borderClass: 'border-peach/40',
    accentText: 'text-terra',
    accentBg: 'bg-terra/10',
    swapCopy: 'Swap this idea',
  },
}

function liftString(lift) {
  if (!lift) return ''
  const entries = Object.entries(lift).sort((a, b) => b[1] - a[1])
  return entries
    .map(([dim, n]) => `${DIMENSIONS[dim]?.name || dim} +${n}`)
    .join(' · ')
}

function UpgradeCard({ kind, selected, onSwap, onCheckIn, onDismiss, completedToday }) {
  const meta = KIND_META[kind]
  const [phase, setPhase] = useState('idle') // idle | checking | done
  const dim = selected?.lift ? Object.entries(selected.lift).sort((a, b) => b[1] - a[1])[0]?.[0] : null
  const dimMeta = dim ? DIMENSIONS[dim] : null

  useEffect(() => {
    setPhase('idle')
  }, [selected?.id])

  if (!selected) {
    return (
      <div className={`${meta.frameClass} border ${meta.borderClass} rounded-3xl p-6 md:p-8`}>
        <p className={`text-xs font-medium uppercase tracking-[0.2em] ${meta.accentText}`}>
          {meta.eyebrow}
        </p>
        <h3 className="font-serif text-2xl text-ink mt-2">All caught up.</h3>
        <p className="text-inkl text-sm mt-2">No new upgrade is queued right now. Come back tomorrow.</p>
      </div>
    )
  }

  return (
    <div className={`${meta.frameClass} border ${meta.borderClass} rounded-3xl p-6 md:p-8 relative overflow-hidden`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${meta.accentBg} ${meta.accentText}`}>
          {meta.title}
        </span>
        {dimMeta && (
          <span className="inline-flex items-center gap-1 text-[10px] text-inkll">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dimMeta.color }} />
            For {dimMeta.name.toLowerCase()}
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
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-3">
              {selected.title}
            </h3>
            <p className="text-inkl text-base leading-relaxed mb-4">{selected.copy}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-inkll mb-5">
              <span>· {selected.time}</span>
              {selected.effort && <span>· {selected.effort} effort</span>}
              <span className={meta.accentText}>· Estimated lift: {liftString(selected.lift)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPhase('checking')}
                className={`inline-flex items-center gap-2 ${meta.accentText} bg-ink text-cream px-5 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity`}
              >
                I'll do this
              </button>
              <button
                onClick={onSwap}
                className="text-inkll text-xs hover:text-ink transition-colors px-3 py-2"
              >
                {meta.swapCopy}
              </button>
              <button
                onClick={onDismiss}
                className="text-inkll text-xs hover:text-ink transition-colors px-3 py-2"
              >
                Not today
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
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-ink leading-tight mb-3">How did it go?</h3>
            <p className="text-inkl text-sm mb-5">A quick check-in. There is no wrong answer.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <button
                onClick={() => {
                  onCheckIn('we-did-it')
                  setPhase('done')
                }}
                className="p-3 rounded-xl border-2 border-inkll/20 hover:border-ember/40 text-left"
              >
                <span className="font-sans text-sm text-ink">We did it</span>
              </button>
              <button
                onClick={() => {
                  onCheckIn('changed')
                  setPhase('done')
                }}
                className="p-3 rounded-xl border-2 border-inkll/20 hover:border-ember/40 text-left"
              >
                <span className="font-sans text-sm text-ink">We changed the plan</span>
              </button>
              <button
                onClick={() => {
                  onCheckIn('not-today')
                  setPhase('done')
                }}
                className="p-3 rounded-xl border-2 border-inkll/20 hover:border-ember/40 text-left"
              >
                <span className="font-sans text-sm text-ink">Not today</span>
              </button>
            </div>
            <button
              onClick={() => setPhase('idle')}
              className="text-inkll text-xs hover:text-ink transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="py-2"
          >
            <h3 className="font-serif text-2xl text-ink leading-tight mb-2">Noted.</h3>
            <p className="text-inkl text-sm">
              Tomorrow's upgrade will be picked with the next thing in mind. One small change at a time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TodaysUpgrade({ kind }) {
  const { state, selectUpgrade, rememberShown, markUpgrade } = useWilderIndex()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const u = selectUpgrade(kind)
    if (u) {
      setSelected(u)
      rememberShown(kind, u.id)
    }
  }, [kind, state.history.length, state.shownUpgradeIds[kind].length])

  if (!selected) return null

  const handleSwap = () => {
    const next = selectUpgrade(kind, selected.id)
    if (next) {
      setSelected(next)
      rememberShown(kind, next.id)
    }
  }

  const handleCheckIn = (checkIn) => {
    if (checkIn === 'we-did-it' || checkIn === 'changed') {
      markUpgrade(selected, kind, checkIn)
    } else {
      // Still count as an active day but not as a completed upgrade
      markUpgrade({ ...selected, lift: null, id: `${selected.id}.skipped` }, kind, checkIn)
    }
  }

  const handleDismiss = () => {
    // Counts as a check-in, but not as a completed upgrade
    markUpgrade({ ...selected, lift: null, id: `${selected.id}.skipped` }, kind, 'not-today')
  }

  return (
    <UpgradeCard
      kind={kind}
      selected={selected}
      onSwap={handleSwap}
      onCheckIn={handleCheckIn}
      onDismiss={handleDismiss}
    />
  )
}
