import { motion } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

const voiceCards = [
  {
    dontSay: 'user data',
    weSay: 'living patterns',
    note: 'We learn what works for your family and build around it.',
  },
  {
    dontSay: 'notifications',
    weSay: 'trail notes',
    note: 'Short, useful, never spammy. Like a text from a friend who\'s already outside.',
  },
  {
    dontSay: 'wellness journey',
    weSay: 'the path ahead',
    note: 'Every path suggested has a reason — the view, the quiet, or the blackberry brambles.',
  },
  {
    dontSay: 'connect with community',
    weSay: 'find your pack',
    note: 'We turn strangers in a park into a coordinated tribe.',
  },
  {
    dontSay: 'explore nature activities',
    weSay: 'get outside together',
    note: 'Simple. Real. Always worth it.',
  },
  {
    dontSay: 'onboarding',
    weSay: 'coming home to yourself',
    note: 'Nature restores what the day takes. We help you get there.',
  },
]

export default function VoiceSwaps() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef, cardsVisible] = useScrollReveal()

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={fadeUpVariants}
          initial="hidden"
          animate={headerVisible ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <p className="text-inkll uppercase tracking-[0.2em] text-sm mb-4">Our Voice</p>
          <h2 className="font-serif font-bold text-4xl text-ink mb-4">
            Rugged, not rigid.
          </h2>
          <p className="font-serif italic text-ember text-xl max-w-2xl mx-auto">
            We don't talk like a wellness app. We talk like a friend who has hiked 400 miles and means every word.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {voiceCards.map((card, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              custom={index}
              className="bg-blush/30 rounded-2xl p-6 border border-inkll/20 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Don't Say */}
              <p className="text-inkll line-through text-lg mb-3">
                {card.dontSay}
              </p>

              {/* We Say */}
              <p className="font-serif italic text-ember font-bold text-xl mb-4">
                {card.weSay}
              </p>

              {/* Note */}
              <p className="text-inkl text-sm leading-relaxed">
                {card.note}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
