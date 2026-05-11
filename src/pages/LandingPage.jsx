import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

const avatarInitials = ['AM', 'SR', 'JL', 'KC']

const whenYouCan = [
  { text: 'A trail where the kids can get dirty and you don\'t stress' },
  { text: 'A build that actually works for your skill level' },
  { text: 'Ideas that grow with your kids — not against them' },
  { text: 'A community that gets the hard days' },
]

const whenYouCant = [
  { text: 'A mud kitchen from things you already have' },
  { text: 'A sensory activity that doesn\'t require a Target run' },
  { text: 'Outdoor time in 20 minutes, even in a small space' },
  { text: 'The reminder that rest is also part of the wild' },
]

const voiceNotIs = [
  { not: 'notifications', is: 'trail notes', note: 'Short, useful, never spammy. Like a text from a friend.' },
  { not: 'wellness journey', is: 'the path ahead', note: 'Every path suggested has a reason.' },
  { not: 'connect with community', is: 'find your pack', note: 'We turn strangers in a park into a tribe.' },
  { not: 'onboarding', is: 'coming home', note: 'Nature restores what the day drains. We help you get there.' },
]

export default function LandingPage() {
  const [pillarsRef, pillarsVisible] = useScrollReveal()
  const [voiceRef, voiceVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="min-h-screen grid md:grid-cols-2 pt-20 md:pt-0">
        {/* Left - Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-ember font-sans text-xs font-medium uppercase tracking-[0.2em] mb-6"
          >
            Wilder Moms
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
          >
            Design a life<br />
            <em className="text-ember">without walls.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-inkl font-sans font-light text-lg leading-relaxed mb-8 max-w-md"
          >
            Trails. Builds. Village. A philosophy rooted in the oldest truth we know —<br />
            <strong className="font-medium text-ink">that we are nature, not observers of it.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex gap-3 mb-6"
          >
            <Link
              to="/join"
              className="px-8 py-3 bg-ember text-white font-sans font-medium text-sm uppercase tracking-wider hover:bg-terra transition-colors"
            >
              Join the Village
            </Link>
            <Link
              to="/wilder-philosophy"
              className="px-6 py-3 text-ember font-sans font-medium text-sm uppercase tracking-wider border border-ember hover:bg-ember/5 transition-colors"
            >
              Our Philosophy
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-inkll font-sans text-xs mb-6"
          >
            Early access opens soon. Join the first mothers.
          </motion.p>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {avatarInitials.map((initials, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-cream bg-blush/40 flex items-center justify-center"
                >
                  <span className="text-ember font-sans font-medium text-xs">{initials}</span>
                </div>
              ))}
            </div>
            <p className="text-inkll font-sans text-sm">
              <strong className="font-medium text-ember">240+</strong> moms already waiting
            </p>
          </motion.div>
        </div>

        {/* Right - Visual Panel */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-forest to-ink relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-olive rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
          </div>

          {/* Dispatch Cards */}
          <div className="relative z-10 flex flex-col gap-6 pr-12">
            {[
              { tag: 'AI dispatch · Sunday 9:41am', title: 'A 2-hour window opens at 10am.', desc: 'Perfect conditions for a solo morning roam through the preserve.', pill: 'Roam with the pack →' },
              { tag: 'Rainy Tuesday · Stay & Create', title: 'Pressed flower nature table', desc: 'Transform your window sills into living art.', pill: 'Start the craft →' },
              { tag: 'From the Village · This Week', title: 'The Hard Season of Winter', desc: 'One 1-mile loop became my weekly lifeline.', pill: 'Read the story →' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.2 }}
                className="w-80 p-5 rounded-lg bg-white/8 border border-white/15 backdrop-blur-sm"
              >
                <p className="text-peach/80 font-sans text-xs uppercase tracking-wide mb-2">{card.tag}</p>
                <h3 className="text-white font-serif text-xl mb-2">{card.title}</h3>
                <p className="text-white/60 font-sans text-sm mb-3">{card.desc}</p>
                <span className="inline-block px-3 py-1.5 rounded-full bg-peach/20 text-peach font-sans text-xs">{card.pill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* When You Can / Can't */}
      <section className="py-20 md:py-28 px-8 bg-ink">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0.5 rounded-lg overflow-hidden">
            {/* When You Can */}
            <div className="bg-forest p-8 md:p-10">
              <p className="text-olive font-sans text-xs font-medium uppercase tracking-widest mb-4">When you can get outside</p>
              <ul className="space-y-4">
                {whenYouCan.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/75 font-sans font-light">
                    <span className="text-olive">→</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* When You Can't */}
            <div className="bg-inkl p-8 md:p-10">
              <p className="text-gold font-sans text-xs font-medium uppercase tracking-widest mb-4">When you can't</p>
              <ul className="space-y-4">
                {whenYouCant.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/75 font-sans font-light">
                    <span className="text-gold">→</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-20 px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-ember font-sans text-xs font-medium uppercase tracking-widest mb-8">
            What we're building
          </p>
          
          <div 
            ref={pillarsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-inkll rounded-lg overflow-hidden ${pillarsVisible ? '' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.7s ease' }}
          >
            {[
              { roman: 'I', label: 'Wilder Trails', name: 'Find your trail', from: 'Perfect match for', desc: 'Your kids, your time, your stroller.', accent: 'bg-ember' },
              { roman: 'II', label: 'Wilder Builds', name: 'Free DIY guides', from: 'For your backyard', desc: 'And the materials you already own.', accent: 'bg-olive' },
              { roman: 'III', label: 'Wilder Crafts', name: 'Nature projects', from: 'For indoors or out', desc: 'Made with what you have.', accent: 'bg-gold' },
              { roman: 'IV', label: 'Wilder Village', name: 'Find your pack', from: 'Moms who get it', desc: 'Strangers in a park become tribe.', accent: 'bg-terra' },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={pillarsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-white p-6 relative hover:-translate-y-1 transition-transform"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${pillar.accent}`} />
                <p className={`font-serif text-4xl font-light mb-4 opacity-25 ${pillar.accent.replace('bg-', 'text-')}`}>
                  {pillar.roman}
                </p>
                <p className={`font-sans text-xs font-medium uppercase tracking-wider mb-1 ${pillar.accent.replace('bg-', 'text-')}`}>
                  {pillar.label}
                </p>
                <p className="font-serif text-lg text-ink mb-2">{pillar.name}</p>
                <p className="text-inkll font-sans text-xs font-light mb-2">
                  {pillar.from} <span className="font-medium">{pillar.from.split(' ').pop()}</span>
                </p>
                <p className="text-inkl font-sans text-sm font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Quote */}
      <section className="py-20 px-8 bg-blush/20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-2xl md:text-3xl font-light italic text-ink leading-relaxed mb-6">
            "Motherhood can feel small. Four walls. Schedules. The same rooms, the same faces, the same tired.<br /><br />
            But the wild is always there — waiting."
          </p>
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ember">
            Wilder Philosophy
          </p>
        </div>
      </section>

      {/* Voice */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-inkll font-sans text-xs font-medium uppercase tracking-widest mb-8">
            How we speak
          </p>
          
          <div 
            ref={voiceRef}
            className={`grid md:grid-cols-2 gap-4 ${voiceVisible ? '' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.7s ease' }}
          >
            {voiceNotIs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={voiceVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-cream border border-inkll/20 rounded"
              >
                <p className="text-inkll font-sans text-sm line-through mb-2">{item.not}</p>
                <p className="font-serif text-lg font-medium italic text-ember mb-2">{item.is}</p>
                <p className="text-inkl font-sans text-xs leading-relaxed">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section 
        ref={ctaRef}
        className={`py-24 px-8 bg-forest text-center relative overflow-hidden ${ctaVisible ? '' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.7s ease' }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-gold/20" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-gold/15" />
        </div>

        <div className="relative z-10">
          <p className="text-gold font-sans text-xs font-medium uppercase tracking-widest mb-4">
            Early Access
          </p>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-white mb-4">
            Your pack is out there.<br />
            <em className="text-gold">Come find them.</em>
          </h2>
          <p className="text-white/50 font-sans font-light mb-8 max-w-md mx-auto leading-relaxed">
            Join the first mothers roaming wilder, raising braver, and never doing it alone.
          </p>
          
          <div className="flex justify-center gap-2 mb-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-72 px-4 py-3 bg-white/10 border border-gold/30 text-white font-sans placeholder:text-white/30 focus:outline-none focus:border-gold"
            />
            <Link
              to="/join"
              className="px-6 py-3 bg-ember text-white font-sans font-medium text-sm uppercase tracking-wider hover:bg-terra transition-colors"
            >
              Join the Waitlist →
            </Link>
          </div>
          <p className="text-white/30 font-sans text-xs">
            No spam. Just the occasional dispatch from the trail.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest border-t border-white/5 py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="font-serif text-xl text-white/50">
          Wilder Moms
        </Link>
        <div className="flex gap-6">
          <Link to="#" className="text-white/30 font-sans text-xs hover:text-gold transition-colors">Instagram</Link>
          <Link to="#" className="text-white/30 font-sans text-xs hover:text-gold transition-colors">TikTok</Link>
          <Link to="/wilder-philosophy" className="text-white/30 font-sans text-xs hover:text-gold transition-colors">Philosophy</Link>
        </div>
        <p className="text-white/20 font-sans text-xs">
          © 2025 Wilder Moms · wildermoms.com
        </p>
      </footer>
    </div>
  )
}
