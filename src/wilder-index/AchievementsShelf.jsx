import { motion } from 'framer-motion'

export default function AchievementsShelf({ achievements = [] }) {
  if (!achievements.length) return null
  const earned = achievements.filter((a) => a.earned)
  const locked = achievements.filter((a) => !a.earned)

  return (
    <section className="bg-white rounded-3xl border border-inkll/10 p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-1">
            Field notes
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink">Achievements</h2>
        </div>
        <p className="text-inkll text-xs">
          {earned.length} of {achievements.length} unlocked
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className={`relative p-4 rounded-2xl border ${
              a.earned
                ? 'border-ember/30 bg-ember/5'
                : 'border-inkll/15 bg-cream/60'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-lg ${
                a.earned ? 'bg-ember/10 text-ember' : 'bg-inkll/10 text-inkll grayscale'
              }`}
            >
              {a.icon}
            </div>
            <p className={`text-sm font-serif text-center mb-1 ${a.earned ? 'text-ink' : 'text-inkll'}`}>
              {a.title}
            </p>
            <p className="text-[11px] text-inkll text-center leading-snug">
              {a.earned ? a.detail : a.blurb}
            </p>
            {!a.earned && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-inkll/40" />
            )}
          </motion.div>
        ))}
      </div>

      {locked.length > 0 && earned.length > 0 && (
        <p className="text-inkll text-xs mt-5 text-center italic">
          {locked.length} more to find.
        </p>
      )}
    </section>
  )
}
