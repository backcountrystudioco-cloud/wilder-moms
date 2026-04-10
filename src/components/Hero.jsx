import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants, slideInRightVariants } from '../hooks/useScrollReveal'
import { supabase } from '../utils/supabase'

const dispatchCards = [
  {
    tag: 'AI dispatch · Sunday 9:41am',
    title: 'A 2-hour window opens at 10am.',
    desc: 'Perfect conditions for a solo morning roam through the preserve.',
    pill: 'Roam with the pack →'
  },
  {
    tag: 'Rainy Tuesday · Stay & Create',
    title: 'Pressed flower nature table',
    desc: 'Transform your window sills into living art installations.',
    pill: 'Start the craft →'
  },
  {
    tag: '3 moms nearby · This weekend',
    title: 'Jamie is heading to Bear Creek',
    desc: 'She is leaving at 7am Saturday. Room for two more.',
    pill: 'Join the roam →'
  }
]

const avatarInitials = ['MH', 'JL', 'SR', 'KC']

export default function Hero() {
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
    <section className="min-h-screen bg-cream pt-24 md:pt-0">
      <div className="grid md:grid-cols-2 min-h-screen">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 md:py-0">
          {/* Logo */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-8"
          >
            <img
              src="/wilder_moms_logo.jpeg"
              alt="Wilder Moms"
              className="w-[110px] h-[110px] rounded-full object-cover shadow-ember/20"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-ember font-sans font-medium text-sm uppercase tracking-[0.15em] mb-4"
          >
            NOW BUILDING · JOIN US EARLY
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
          >
            When nature lives in your home, you stop having to find it.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-inkl font-sans text-base md:text-lg leading-relaxed mb-8 max-w-md"
          >
            Wilder Moms is for the mother who wants a different kind of everyday — one that starts on the windowsill, grows into the backyard, and finds its way to the trailhead when you're ready.
          </motion.p>

          {/* Form */}
          {status === 'success' ? (
            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible" custom={4}>
              <p className="text-forest font-serif text-2xl italic">You're in the pack!</p>
              <p className="text-inkl font-sans text-sm mt-2">Check your inbox for next steps.</p>
            </motion.div>
          ) : status === 'duplicate' ? (
            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible" custom={4}>
              <p className="text-forest font-serif text-2xl italic">Already on the list!</p>
              <p className="text-inkl font-sans text-sm mt-2">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 mb-3"
            >
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex-1 px-4 py-3 rounded-full border border-inkll/30 bg-cream font-sans text-ink placeholder:text-inkll/60 focus:outline-none focus:border-ember transition-colors"
              />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 px-4 py-3 rounded-full border border-inkll/30 bg-cream font-sans text-ink placeholder:text-inkll/60 focus:outline-none focus:border-ember transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-full bg-ember text-white font-sans font-medium hover:bg-forest transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining...' : 'Claim your spot →'}
              </button>
            </motion.form>
          )}

          {status === 'error' && (
            <p className="text-red-600 text-sm font-sans">Something went wrong. Try again.</p>
          )}

          {/* Note */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            className="text-inkll/70 font-sans text-sm mb-8"
          >
            No spam. Just the occasional trail note.
          </motion.p>

          {/* Social Proof */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex items-center gap-4"
          >
            {/* Stacked Avatars */}
            <div className="flex -space-x-2">
              {avatarInitials.map((initials, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-cream bg-ember flex items-center justify-center"
                  style={{ zIndex: avatarInitials.length - i }}
                >
                  <span className="text-white font-sans font-medium text-xs">
                    {initials}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-inkl font-sans text-sm">
              <span className="font-medium text-ink">240+</span> moms already on the waitlist
            </p>
          </motion.div>
        </div>

        {/* Right Column - Visual Panel with Dispatch Cards */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-forest to-forest/80 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-olive rounded-full blur-3xl" />
          </div>

          {/* Dispatch Cards */}
          <div className="relative z-10 flex flex-col gap-6 pr-12">
            {dispatchCards.map((card, i) => (
              <motion.div
                key={i}
                variants={slideInRightVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                className="w-80 p-5 rounded-xl bg-white/8 border border-white/15 backdrop-blur-sm"
              >
                <p className="text-peach/80 font-sans text-xs uppercase tracking-wide mb-2">
                  {card.tag}
                </p>
                <h3 className="text-white font-serif text-xl mb-2">
                  {card.title}
                </h3>
                <p className="text-white/60 font-sans text-sm mb-4">
                  {card.desc}
                </p>
                <span className="inline-block px-3 py-1.5 rounded-full bg-peach/20 text-peach font-sans text-xs">
                  {card.pill}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
