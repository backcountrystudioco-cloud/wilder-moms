import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'
import EmailCapture from './EmailCapture'

export default function WaitlistCTA() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section 
      id="waitlist" 
      className="relative py-24 md:py-32 bg-ink overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full border border-ember/20"
          style={{ transform: 'scale(1)' }}
        />
        <div 
          className="absolute w-[700px] h-[700px] rounded-full border border-ember/20"
          style={{ transform: 'scale(1.2)' }}
        />
      </div>

      <div 
        ref={ref}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow */}
            <motion.p 
              variants={fadeUpVariants}
              className="text-gold uppercase tracking-widest text-sm font-sans mb-6"
            >
              Early Access
            </motion.p>

            {/* Headline */}
            <motion.h2 
              variants={fadeUpVariants}
              custom={1}
              className="font-serif text-4xl md:text-5xl text-white mb-6 italic"
            >
              <span className="text-gold">Your pack is waiting for you.</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p 
              variants={fadeUpVariants}
              custom={2}
              className="text-white/55 font-sans text-lg mb-10 max-w-lg mx-auto"
            >
              Join the first mothers getting outside together. Early access opens soon — Colorado, Montana, Texas, and beyond.
            </motion.p>

            {/* Email Capture */}
            <motion.div variants={fadeUpVariants} custom={3}>
              <EmailCapture 
                criteria="Waitlist signup - Early access" 
                darkMode={true}
              />
            </motion.div>

            {/* Note */}
            <motion.p 
              variants={fadeUpVariants}
              custom={4}
              className="text-white/30 text-sm font-sans mt-6"
            >
              No spam. Just the occasional trail note.
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
