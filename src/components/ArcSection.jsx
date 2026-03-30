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
              The Habitat + The Village + The Blueprint
            </h3>
            <ul className="space-y-3">
              {[
                'AI trail matching',
                'Pack finder',
                'AI pack lists',
                'Live location sharing',
                'Weather windows'
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
              The Base Camp — bring nature home
            </h3>
            <ul className="space-y-3">
              {[
                'Seasonal crafts & displays',
                'Pressing flowers from your last trail',
                'Sensory play with natural materials',
                'Activity kits delivered to your door'
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
