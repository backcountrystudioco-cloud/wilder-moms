import { motion } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

const ArcSection = () => {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section ref={ref} className="bg-ink py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          custom={0}
        >
          <h2 className="font-serif italic text-4xl md:text-5xl text-ember">
            For every kind of day
          </h2>
        </motion.div>

        {/* Two-column panel grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-[1px] rounded-2xl overflow-hidden"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          custom={1}
        >
          {/* Left Panel - When you can go */}
          <div className="bg-forest p-8 md:p-10">
            <p className="text-olive font-sans text-sm tracking-widest uppercase mb-4">
              WHEN YOU CAN GO
            </p>
            <h3 className="font-serif text-white text-2xl md:text-3xl mb-6">
              Get outside — we've got you covered
            </h3>
            <ul className="space-y-3">
              {[
                'Trail recommendations for your family',
                'Smart pack lists for your exact hike',
                'Weather windows that actually fit your schedule',
                'Offline maps so you never lose signal',
                'Live location sharing with your pack'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <span className="text-olive mt-1">→</span>
                  <span className="font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel - When you can't go */}
          <div className="bg-inkl p-8 md:p-10">
            <p className="text-gold font-sans text-sm tracking-widest uppercase mb-4">
              WHEN YOU CAN'T GO
            </p>
            <h3 className="font-serif text-white text-2xl md:text-3xl mb-6">
              Pull up a chair — the Village is here
            </h3>
            <ul className="space-y-3">
              {[
                'Stories from the trail',
                'Crafts you can make with what you have',
                'Weekly dispatches from other moms',
                'Nature tables and windowsill wonders'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <span className="text-gold mt-1">→</span>
                  <span className="font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ArcSection
