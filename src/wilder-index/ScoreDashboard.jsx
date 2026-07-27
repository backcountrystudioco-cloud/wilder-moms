import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DIMENSIONS, DIMENSION_ORDER, bandFor } from './dimensions'
import ScoreArc from './ScoreArc'

function ScoreExplainer({ dimension, score, onClose }) {
  const dim = DIMENSIONS[dimension]
  const band = bandFor(score)
  if (!dim) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink/40 flex items-end md:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-cream rounded-3xl p-7 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: dim.color }}
          />
          <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: dim.color }}>
            {dim.name}
          </p>
        </div>
        <h3 className="font-serif text-2xl text-ink mb-2">{band.label}</h3>
        <p className="text-inkl text-sm leading-relaxed mb-4">{dim.description}</p>
        <p className="text-inkll text-sm leading-relaxed italic">
          {dim.whyItMatters}
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-full text-ink font-sans text-sm border border-inkll/20 hover:bg-inkll/5 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function ScoreDashboard({ scores, summary }) {
  const [explainerDim, setExplainerDim] = useState(null)
  if (!scores) return null
  const strengthSet = new Set(summary?.strengths || [])

  return (
    <section className="bg-white rounded-3xl border border-inkll/10 p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-1">
            Your Wilder pattern
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink">Six dimensions</h2>
        </div>
        {summary?.opportunity && (
          <p className="text-inkll text-xs hidden sm:block">
            Opportunity → <span className="text-ink font-medium">{DIMENSIONS[summary.opportunity].name}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {DIMENSION_ORDER.map((dim, i) => {
          const score = scores[dim] ?? 0
          const isStrength = strengthSet.has(dim)
          return (
            <motion.button
              key={dim}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setExplainerDim(dim)}
              className={`flex flex-col items-center p-3 md:p-4 rounded-2xl border transition-all hover:border-ember/30 ${
                isStrength ? 'border-ember/30 bg-ember/5' : 'border-inkll/10'
              }`}
            >
              <ScoreArc dimension={dim} score={score} size="md" />
              {isStrength && (
                <p className="text-[10px] font-medium uppercase tracking-wider text-ember mt-2">
                  Strength
                </p>
              )}
            </motion.button>
          )
        })}
      </div>

      <p className="text-inkll text-xs mt-5 text-center">
        Tap any score to learn what it means.
      </p>

      <AnimatePresence>
        {explainerDim && (
          <ScoreExplainer
            dimension={explainerDim}
            score={scores[explainerDim]}
            onClose={() => setExplainerDim(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
