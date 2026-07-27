// MonthlyArchitectural — a single, monthly-cadence recommendation that lives
// below the weekly plan. Not a card to-do, not a check-in. The point is the
// movement of the home itself — bigger than a chair by the door, smaller
// than a renovation.

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWilderIndex } from './WilderIndexContext'
import { pickMonthlyMove, currentMonthKey, monthLabel } from './architecturalSelector'
import { SCALE_META, COST_META } from './architecturalMoves'
import { DIMENSIONS } from './dimensions'

function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  )
}

export default function MonthlyArchitectural({ profile, scores }) {
  const { state, setArchitecturalCurrent, acknowledgeArchitectural } = useWilderIndex()
  const [rollToken, setRollToken] = useState(0)

  const monthKey = useMemo(() => currentMonthKey(), [])
  const archState = state.architectural || {
    currentMonthKey: null,
    currentId: null,
    shownIds: [],
    acknowledgments: [],
  }

  const pick = useMemo(() => {
    if (!scores) return null
    return pickMonthlyMove(profile, scores, archState.shownIds || [])
    // rollToken intentionally included so "Swap" re-picks
  }, [profile, scores, archState.shownIds, rollToken])

  // Persist the chosen move into context as the current architectural move.
  useEffect(() => {
    if (!pick?.move?.id) return
    if (
      archState.currentId !== pick.move.id ||
      archState.currentMonthKey !== monthKey
    ) {
      setArchitecturalCurrent({ id: pick.move.id, monthKey })
    }
  }, [pick?.move?.id, monthKey, archState.currentId, archState.currentMonthKey, setArchitecturalCurrent])

  if (!pick || !pick.move) return null

  const move = pick.move
  const dim = DIMENSIONS[pick.dimension]
  const scale = SCALE_META[move.scale] || SCALE_META.room
  const cost = COST_META[move.cost] || move.cost
  const acknowledged = (archState.acknowledgments || []).some(
    (a) => a.id === move.id && a.monthKey === monthKey
  )

  const handleSwap = () => {
    // Push the current move to the front of shownIds so the next pick avoids
    // it, then re-roll.
    acknowledgeArchitectural(move.id, 'swapped')
    setRollToken((n) => n + 1)
  }
  const handleGotIt = () => {
    acknowledgeArchitectural(move.id, 'noted')
  }
  const handleNotNow = () => {
    acknowledgeArchitectural(move.id, 'snoozed')
    setRollToken((n) => n + 1)
  }

  return (
    <section className="bg-white rounded-3xl border border-inkll/10 p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-forest text-xs font-medium uppercase tracking-[0.2em]">
          This month · {monthLabel(monthKey)}
        </p>
        {dim && (
          <p className="text-inkll text-xs hidden sm:flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: dim.color }}
            />
            For {dim.name.toLowerCase()}
          </p>
        )}
      </div>
      <h2 className="font-serif text-2xl md:text-3xl text-ink leading-tight">
        One architectural move
      </h2>
      <p className="text-inkl text-sm mt-1 max-w-md mb-6">
        A change to the home itself — bigger than a chair by the door, smaller
        than a renovation. One per month, picked for your pattern.
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={move.id + ':' + rollToken}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="bg-parchment border border-forest/20 rounded-2xl p-5 md:p-6"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Tag className={`${scale.tone} ${scale.text}`}>{scale.label}</Tag>
            <Tag className="bg-white border border-inkll/15 text-inkl">{cost}</Tag>
            <Tag className="bg-white border border-inkll/15 text-inkl">
              {move.timeframe}
            </Tag>
          </div>

          <h3 className="font-serif text-xl md:text-2xl text-ink leading-tight mb-2">
            {move.title}
          </h3>
          <p className="text-inkl text-sm leading-relaxed mb-4">{move.copy}</p>
          <p className="text-inkll text-sm italic leading-relaxed">
            {move.whyItMatters}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {acknowledged ? (
              <span className="text-forest text-xs font-medium">
                Noted for this month.
              </span>
            ) : (
              <button
                onClick={handleGotIt}
                className="bg-ink text-cream px-4 py-2 rounded-full font-sans text-xs hover:bg-inkl transition-colors"
              >
                Got it
              </button>
            )}
            <button
              onClick={handleSwap}
              className="text-inkll text-xs hover:text-ink transition-colors px-2 py-1.5"
            >
              Swap
            </button>
            <button
              onClick={handleNotNow}
              className="text-inkll text-xs hover:text-ink transition-colors px-2 py-1.5"
            >
              Not now
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
