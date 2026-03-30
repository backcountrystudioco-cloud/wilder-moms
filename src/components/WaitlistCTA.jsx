import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

export default function WaitlistCTA() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, isVisible] = useScrollReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return
    }
    
    setIsSubmitted(true)
  }

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
          {!isSubmitted ? (
            <motion.div
              key="form"
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

              {/* Form */}
              <motion.form 
                variants={fadeUpVariants}
                custom={3}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 font-sans focus:outline-none focus:border-white/40 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-ember text-white font-sans font-medium rounded-lg hover:bg-terra transition-colors whitespace-nowrap"
                >
                  Join the waitlist →
                </button>
              </motion.form>

              {/* Note */}
              <motion.p 
                variants={fadeUpVariants}
                custom={4}
                className="text-white/30 text-sm font-sans"
              >
                No spam. Just the occasional trail note.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="py-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-gold italic mb-4">
                You're in the pack.
              </h2>
              <p className="text-white/55 font-sans">
                We'll be in touch with your early access details soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
