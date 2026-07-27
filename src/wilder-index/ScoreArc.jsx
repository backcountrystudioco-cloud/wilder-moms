import { motion } from 'framer-motion'
import { DIMENSIONS, bandFor } from './dimensions'

// A single 0-100 score rendered as a soft arc. Reused on the dashboard and
// the reveal screen. Color is taken from the dimension definition.
export default function ScoreArc({ dimension, score, animated = false, size = 'md' }) {
  const dim = DIMENSIONS[dimension]
  const band = bandFor(score)
  const pct = Math.max(0, Math.min(100, score ?? 0))

  const sizes = {
    sm: { wrap: 'w-20 h-20', stroke: 6, r: 30, text: 'text-base' },
    md: { wrap: 'w-24 h-24', stroke: 7, r: 36, text: 'text-lg' },
    lg: { wrap: 'w-32 h-32', stroke: 8, r: 46, text: 'text-2xl' },
  }
  const s = sizes[size] || sizes.md
  const C = 2 * Math.PI * s.r
  const dash = (pct / 100) * C

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${s.wrap}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={s.r}
            fill="none"
            stroke="currentColor"
            strokeWidth={s.stroke}
            className="text-inkll/20"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={s.r}
            fill="none"
            stroke={dim.color}
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={C}
            initial={animated ? { strokeDashoffset: C } : { strokeDashoffset: C - dash }}
            animate={{ strokeDashoffset: C - dash }}
            transition={{ duration: animated ? 1.4 : 0.4, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-serif ${s.text} text-ink`}
          >
            {Math.round(pct)}
          </span>
        </div>
      </div>
      <p className="font-sans text-xs font-medium uppercase tracking-wider mt-2 text-ink text-center">
        {dim.name}
      </p>
      <p
        className="font-serif italic text-xs mt-0.5"
        style={{ color: dim.color }}
      >
        {band.label}
      </p>
    </div>
  )
}
