import { motion } from 'framer-motion'
import { useScrollReveal, fadeInVariants } from '../hooks/useScrollReveal'

export default function MissionSection() {
  const [quoteRef, quoteVisible] = useScrollReveal()
  const [logoRef, logoVisible] = useScrollReveal()

  return (
    <section className="bg-[#FFF3EC] py-24 px-6 relative overflow-hidden">
      {/* Decorative quote mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-ember opacity-[6%] font-serif font-bold pointer-events-none select-none" style={{ fontSize: '12rem', lineHeight: 1 }}>
        &ldquo;
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Logo */}
        <motion.div
          ref={logoRef}
          variants={fadeInVariants}
          initial="hidden"
          animate={logoVisible ? 'visible' : 'hidden'}
          className="mb-10 flex justify-center"
        >
          <img
            src="/wilder_moms_logo.jpeg"
            alt="Wilder Moms Logo"
            className="w-20 h-20 rounded-full object-cover shadow-ember/20 shadow-lg"
          />
        </motion.div>

        {/* Eye */}
        <motion.p
          ref={quoteRef}
          variants={fadeInVariants}
          initial="hidden"
          animate={quoteVisible ? 'visible' : 'hidden'}
          className="text-inkll uppercase tracking-[0.2em] text-sm mb-6"
        >
          Our Mission
        </motion.p>

        {/* Blockquote */}
        <motion.blockquote
          ref={quoteRef}
          variants={fadeInVariants}
          initial="hidden"
          animate={quoteVisible ? 'visible' : 'hidden'}
          className="font-serif italic text-[1.8rem] leading-relaxed text-ink mb-10"
          style={{ fontSize: '1.8rem' }}
        >
          Wilder Moms exists to help mothers get outside more, stress less, and never feel alone doing it — on the trail, in the park, and on the days when the kitchen table is as far as they get.
        </motion.blockquote>

        {/* Attribution */}
        <motion.p
          ref={quoteRef}
          variants={fadeInVariants}
          initial="hidden"
          animate={quoteVisible ? 'visible' : 'hidden'}
          className="text-ember uppercase tracking-[0.15em] text-sm font-sans"
        >
          — Melissa Harrison, Founder & Visionary
        </motion.p>
      </div>
    </section>
  )
}
