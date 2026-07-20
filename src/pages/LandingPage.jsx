import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

const avatarInitials = ['AM', 'SR', 'JL', 'KC']

const whenYouCan = [
  { text: 'A trail within 20 minutes, picked for your kids\' ages and your stroller' },
  { text: 'An invitation that holds their attention so you can cook dinner' },
  { text: 'A backyard project that grows with them, not against them' },
  { text: 'Moms in the same boat — no performance, no judgment' },
]

const whenYouCant = [
  { text: 'A rainy-day activity that uses what\'s already in your kitchen' },
  { text: '15 quiet minutes of outside, even in a small space' },
  { text: 'Permission to count the doorstep, the yard, the sidewalk' },
  { text: 'A reminder that rest is part of the wild too' },
]

const voiceNotIs = [
  { not: 'screen-free rules', is: 'open invitations', note: 'We don\'t count minutes. We open doors — and trust you to know when.' },
  { not: 'hour trackers', is: 'one good idea', note: 'You don\'t have to log every hour to make outside count. Ten minutes counts.' },
  { not: 'outdoor curriculum', is: 'what to do this afternoon', note: 'Real life happens Tuesday at 4 p.m., not Saturday at 9. We plan for the real day.' },
  { not: 'parenting advice', is: 'a pack of moms who\'ve been there today', note: 'The best ideas come from someone who just unpacked a muddy toddler five minutes ago.' },
]

const dispatchCards = [
  {
    tag: 'AI dispatch · Sunday 9:41am',
    title: 'A 2-hour window opens at 10am.',
    desc: 'Perfect conditions for a solo morning roam through the preserve.',
    pill: 'Roam with the pack →',
  },
  {
    tag: 'Rainy Tuesday · Stay & Create',
    title: 'Pressed flower nature table',
    desc: 'Transform your window sills into living art installations.',
    pill: 'Start the craft →',
  },
  {
    tag: 'From the Village · This Week',
    title: 'The Hard Season of Winter',
    desc: 'When the dark months hit hard, one particular 1-mile loop became my weekly lifeline.',
    pill: 'Read the story →',
  },
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
            Wilder Moms · For the mom who wants outside to be the everyday
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
          >
            Less screen time.<br />
            <em className="text-ember">More real life.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-inkl font-sans font-light text-lg leading-relaxed mb-6 max-w-md"
          >
            Two new nature activities every month — printable, kid-tested, made
            with what you already have. Plus free trail guides and DIY builds.
            <strong className="font-medium text-ink"> So getting outside feels simpler than staying inside.</strong>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-inkll font-sans text-sm italic mb-8 max-w-md"
          >
            No hour-counting. No perfection required. The doorstep counts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-3 mb-6 flex-wrap"
          >
            <Link
              to="/join"
              className="px-8 py-3 bg-ember text-white font-sans font-medium text-sm uppercase tracking-wider hover:bg-terra transition-colors"
            >
              Open the guide
            </Link>
            <Link
              to="/wilder-trails"
              className="px-6 py-3 text-ember font-sans font-medium text-sm uppercase tracking-wider border border-ember hover:bg-ember/5 transition-colors"
            >
              Find a trail near you
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="text-inkll font-sans text-xs mb-6"
          >
            Early access is open. First monthly drop lands the 1st.
          </motion.p>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
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
              <strong className="font-medium text-ember">240+</strong> moms already in the pack
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
            {dispatchCards.map((card, i) => (
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
          <div className="text-center mb-12">
            <p className="text-ember font-sans text-xs font-medium uppercase tracking-[0.2em] mb-3">
              Built for real days
            </p>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-white">
              Because "get outside more" was never the hard part.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-0.5 rounded-lg overflow-hidden">
            {/* When You Can */}
            <div className="bg-forest p-8 md:p-10">
              <p className="text-olive font-sans text-xs font-medium uppercase tracking-widest mb-4">When you can step outside</p>
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
              <p className="text-gold font-sans text-xs font-medium uppercase tracking-widest mb-4">When you can't (yet)</p>
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
          <div className="text-center mb-12">
            <p className="text-ember font-sans text-xs font-medium uppercase tracking-[0.2em] mb-3">
              What's inside
            </p>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-ink">
              Four ways to make outside the easier answer.
            </h2>
            <p className="text-inkl font-sans mt-4 max-w-2xl mx-auto leading-relaxed">
              Most nature content is built for the weekend. Wilder is built for your Tuesday
              at 4 p.m. — and your Saturday morning, and your rainy Sunday afternoon.
            </p>
          </div>

          <div
            ref={pillarsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-inkll rounded-lg overflow-hidden ${pillarsVisible ? '' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.7s ease' }}
          >
            {[
              {
                roman: 'I',
                label: 'Wilder Trails',
                name: 'Go somewhere today',
                from: 'Near home',
                desc: 'A trail picked for your kids\' ages, your stroller, and how much time you actually have.',
                accent: 'bg-ember',
              },
              {
                roman: 'II',
                label: 'Wilder Builds',
                name: 'Make something real',
                from: 'Backyard or balcony',
                desc: 'Free DIY plans using sticks, scrap wood, cardboard, and what you already own.',
                accent: 'bg-olive',
              },
              {
                roman: 'III',
                label: 'Wilder PDFs',
                name: 'Two new ones every month',
                from: 'Printable, kid-tested',
                desc: 'One Architect Build, one Lab Activity. Low-prep. The plan is already made.',
                accent: 'bg-gold',
              },
              {
                roman: 'IV',
                label: 'Wilder Village',
                name: 'You\'re not alone in this',
                from: 'A pack of moms',
                desc: 'Quiet community. Strangers in a park become a tribe. No performance, no judgment.',
                accent: 'bg-terra',
              },
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
                  {pillar.from}
                </p>
                <p className="text-inkl font-sans text-sm font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Permission Quote */}
      <section className="py-20 px-8 bg-blush/20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-2xl md:text-3xl font-light italic text-ink leading-relaxed mb-6">
            You don't need a bigger yard, better weather, or all day. You need
            one good idea, one nearby door, and permission to start small.
          </p>
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ember">
            The Wilder Way
          </p>
        </div>
      </section>

      {/* Voice */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-inkll font-sans text-xs font-medium uppercase tracking-widest mb-3">
            How we talk
          </p>
          <h2 className="text-center font-serif font-light text-2xl md:text-3xl text-ink mb-10">
            The same things, said in a way that helps.
          </h2>

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

      {/* Who This Is For */}
      <section className="py-20 px-8 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <p className="text-ember font-sans text-xs font-medium uppercase tracking-[0.2em] mb-3 text-center">
            Who Wilder is for
          </p>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink text-center mb-12">
            You'll probably recognize yourself in here.
          </h2>

          <ul className="space-y-5">
            {[
              'You\'ve caught yourself handing over the tablet one more time than you wanted to.',
              'Your Pinterest board is full of mud kitchens and nature tables. Your weekend is usually not.',
              'You want your kids to remember a real childhood — not just Roblox rooms.',
              'You\'re tired of nature content aimed at families with more land, more time, and matching linen.',
              'You believe a screen isn\'t evil — you just want one more way to make outside the easier answer.',
              'You\'d love to know there\'s a pack of moms out here trying, too.',
            ].map((line, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-ember font-serif text-2xl leading-none">✓</span>
                <p className="text-ink font-sans text-base md:text-lg leading-relaxed flex-1">
                  {line}
                </p>
              </li>
            ))}
          </ul>
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
            Open the guide
          </p>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-white mb-4">
            Stop scrolling.<br />
            <em className="text-gold">Start outside.</em>
          </h2>
          <p className="text-white/50 font-sans font-light mb-8 max-w-md mx-auto leading-relaxed">
            Two printable nature activities every month, free trail guides, and a
            pack of moms in your corner. Made for real days.
          </p>

          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-72 px-4 py-3 bg-white/10 border border-gold/30 text-white font-sans placeholder:text-white/30 focus:outline-none focus:border-gold"
            />
            <Link
              to="/join"
              className="px-6 py-3 bg-ember text-white font-sans font-medium text-sm uppercase tracking-wider hover:bg-terra transition-colors"
            >
              Send me this month →
            </Link>
          </div>
          <p className="text-white/30 font-sans text-xs">
            One short note when a new drop lands. Unsubscribe whenever outside isn't calling.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest border-t border-white/5 py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="font-serif text-xl text-white/50">
          Wilder Moms
        </Link>
        <div className="flex gap-6">
          <Link to="/wilder-trails" className="text-white/30 font-sans text-xs hover:text-gold transition-colors">Trails</Link>
          <Link to="/wilder-homes" className="text-white/30 font-sans text-xs hover:text-gold transition-colors">DIY Builds</Link>
          <Link to="/wilder-homes?tab=premium" className="text-white/30 font-sans text-xs hover:text-gold transition-colors">Monthly PDFs</Link>
        </div>
        <p className="text-white/20 font-sans text-xs">
          © 2025 Wilder Moms · wildermoms.com
        </p>
      </footer>
    </div>
  )
}
