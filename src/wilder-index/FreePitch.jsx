import { motion } from 'framer-motion'

const PROMISES = [
  {
    title: 'Your Wilder Archetype',
    body: 'A snapshot of how your family naturally lives and plays.',
  },
  {
    title: 'Your Habitat Snapshot',
    body: 'See the hidden strengths of your home, neighborhood, and weekly rhythms.',
  },
  {
    title: 'Your Biggest Opportunity',
    body: 'The one area with the greatest potential to make family life easier and more connected.',
  },
  {
    title: 'One Small Win',
    body: 'A simple idea you can try today.',
  },
]

const UNLOCK_FEATURES = [
  'Your complete Habitat Read',
  'Personalized recommendations for your home, neighborhood, and routines',
  'Weekly Habitat Shifts tailored to your family',
  'Seasonal adventures and neighborhood discoveries',
  'Progress as your Habitat grows over time',
]

export default function FreePitch({ onStart, onSkip }) {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-5">
            A free reading · 3 minutes
          </p>
          <h1 className="font-serif font-light text-4xl md:text-6xl text-ink leading-[1.05] mb-5">
            Discover your family's{' '}
            <em className="text-ember">Wilder Habitat</em>
          </h1>
          <p className="text-inkl text-lg md:text-xl leading-snug max-w-xl mx-auto font-serif italic">
            Your home is only part of the story.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="bg-white rounded-3xl border border-inkll/10 p-7 md:p-10 mb-10"
        >
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
            The way your family spends an ordinary Tuesday is shaped by hundreds of tiny
            decisions — where you walk, where your kids play, how easily you get outside,
            and the places that quietly become part of childhood.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-7">
            Take our free 3-minute assessment to discover what's already working, what's
            getting in your way, and where the biggest opportunities are hiding.
          </p>

          <p className="text-ink font-serif text-lg mb-4">You'll get:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-7">
            {PROMISES.map((p) => (
              <div
                key={p.title}
                className="bg-parchment border border-inkll/10 rounded-2xl p-4"
              >
                <p className="font-serif text-ink text-base mb-1">{p.title}</p>
                <p className="text-inkl text-sm leading-snug">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 bg-ember text-white px-9 py-3.5 rounded-full font-medium text-base hover:bg-terra transition-colors"
            >
              Begin the 3-minute reading
            </button>
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-inkll text-xs hover:text-ink transition-colors"
              >
                Skip — take me to the full Habitat
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="bg-ink text-cream rounded-3xl p-7 md:p-10"
        >
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Want the full picture?
          </p>
          <h2 className="font-serif font-light text-2xl md:text-4xl leading-tight mb-5">
            Unlock your{' '}
            <em className="text-gold">Wilder Habitat</em>
            <span className="block text-inkll text-base md:text-lg font-sans mt-2">
              a living blueprint that evolves with your family.
            </span>
          </h2>
          <p className="text-cream/80 mb-3 font-medium">Inside you'll discover:</p>
          <ul className="space-y-2 mb-7">
            {UNLOCK_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-cream/90">
                <span className="text-gold mt-0.5" aria-hidden="true">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="text-cream/60 text-sm italic">
            You'll see this option after your free reading.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
