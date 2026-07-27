import { motion } from 'framer-motion'
import { DIMENSIONS } from './dimensions'

const UNLOCK_FEATURES = [
  'Your complete Habitat Read',
  'Personalized recommendations for your home, neighborhood, and routines',
  'Weekly Habitat Shifts tailored to your family',
  'Seasonal adventures and neighborhood discoveries',
  'Progress as your Habitat grows over time',
]

export default function FreeResult({ reading, onUnlock, onRestart }) {
  if (!reading) return null
  const { archetype, opener, snapshot, opportunity, smallWin } = reading

  return (
    <div className="min-h-screen bg-cream pt-20 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4 text-center">
            Your free reading
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mb-12"
        >
          {opener.map((line, i) => (
            <p
              key={i}
              className="font-serif text-xl md:text-2xl text-ink leading-snug mb-5"
            >
              {line}
            </p>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="bg-white rounded-3xl border border-inkll/10 p-7 md:p-9 mb-8"
        >
          <p className="text-ember text-[10px] font-medium uppercase tracking-[0.2em] mb-3">
            ✨ Your Wilder Archetype
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-3">
            {archetype.name}
          </h2>
          <p className="text-inkl text-base md:text-lg leading-relaxed font-serif italic">
            {archetype.blurb}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mb-8"
        >
          <p className="text-ember text-[10px] font-medium uppercase tracking-[0.2em] mb-3">
            📍 Your Habitat Snapshot
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed font-serif">
            {snapshot}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mb-8"
        >
          <p className="text-ember text-[10px] font-medium uppercase tracking-[0.2em] mb-3">
            💡 Your Biggest Opportunity
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed font-serif">
            {opportunity}
          </p>
        </motion.section>

        {smallWin && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="bg-parchment rounded-3xl border border-forest/15 p-7 md:p-9 mb-12"
          >
            <p className="text-forest text-[10px] font-medium uppercase tracking-[0.2em] mb-3">
              🌱 One Small Win
            </p>
            <h3 className="font-serif text-2xl text-ink leading-tight mb-3">
              {smallWin.title}
            </h3>
            <p className="text-inkl text-base leading-relaxed mb-4">
              {smallWin.copy}
            </p>
            <p className="text-inkll text-xs">
              · {smallWin.time}{smallWin.effort ? ` · ${smallWin.effort} effort` : ''}
            </p>
          </motion.section>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-inkl font-serif italic text-lg">
            That's what small changes can do.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6 }}
          className="bg-ink text-cream rounded-3xl p-7 md:p-10"
        >
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Want the full picture?
          </p>
          <h2 className="font-serif font-light text-2xl md:text-4xl leading-tight mb-3">
            Unlock your{' '}
            <em className="text-gold">Wilder Habitat</em>
          </h2>
          <p className="text-cream/70 font-sans text-sm md:text-base mb-6">
            A living blueprint that evolves with your family.
          </p>
          <p className="text-cream/80 mb-3 font-medium">Inside you'll discover:</p>
          <ul className="space-y-2 mb-7">
            {UNLOCK_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-cream/90">
                <span className="text-gold mt-0.5" aria-hidden="true">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <button
              onClick={onUnlock}
              className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3.5 rounded-full font-medium text-base hover:bg-terra transition-colors w-full sm:w-auto justify-center"
            >
              Unlock Your Wilder Habitat
              <span aria-hidden="true">→</span>
            </button>
            {onRestart && (
              <button
                onClick={onRestart}
                className="text-cream/60 text-xs hover:text-cream transition-colors"
              >
                Retake the free reading
              </button>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
