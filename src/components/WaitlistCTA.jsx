import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'
import { supabase } from '../utils/supabase'

export default function WaitlistCTA() {
  const [ref, isVisible] = useScrollReveal()
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const { error } = await supabase
        .from('Waitlist')
        .insert({
          email: formData.email,
          name: formData.name,
        })
      
      if (error) {
        if (error.code === '23505') {
          setStatus('duplicate')
        } else {
          setStatus('error')
        }
      } else {
        setStatus('success')
      }
    } catch (err) {
      setStatus('error')
    }
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
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
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

          {/* Inline Form */}
          {status === 'success' ? (
            <motion.div variants={fadeUpVariants} custom={3} className="text-center">
              <p className="text-gold font-serif text-2xl italic">You're in the pack!</p>
              <p className="text-white/60 font-sans text-sm mt-2">Check your inbox for next steps.</p>
            </motion.div>
          ) : status === 'duplicate' ? (
            <motion.div variants={fadeUpVariants} custom={3} className="text-center">
              <p className="text-gold font-serif text-2xl italic">Already on the list!</p>
              <p className="text-white/60 font-sans text-sm mt-2">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.form 
              variants={fadeUpVariants} 
              custom={3}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white font-sans placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white font-sans placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors shadow-lg shadow-ember/30 disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining...' : 'Join the Village'}
              </button>
            </motion.form>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-sm font-sans mt-3">Something went wrong. Try again.</p>
          )}

          {/* Note */}
          <motion.p 
            variants={fadeUpVariants}
            custom={4}
            className="text-white/30 text-sm font-sans mt-6"
          >
            No spam. Just the occasional trail note.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
