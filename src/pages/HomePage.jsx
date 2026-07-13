import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import {
  premiumBuilds,
  pricing,
  annualSavings,
  getCurrentDrop,
} from '../wilder-builds/buildsLibrary'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

// ---------------------------------------------------------------------
// This Month's Drop — show both PDFs from the current drop as preview
// tiles with type badges. Helps visitors see the value before subscribing.
// ---------------------------------------------------------------------
function CurrentDropShowcase() {
  const [ref, visible] = useScrollReveal()
  const currentDrop = getCurrentDrop()
  if (!currentDrop) return null

  const dropBuilds = premiumBuilds.filter(b => b.dropId === currentDrop.id).slice(0, 2)

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3">
            This month · {currentDrop.month} {currentDrop.year}
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-ink mb-3">
            {currentDrop.title}
          </h2>
          <p className="text-inkl max-w-2xl mx-auto">{currentDrop.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {dropBuilds.map((build, i) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
            >
              <Link
                to={`/wilder-homes/premium/${build.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-inkll/10 hover:border-ember/40 transition-all h-full"
              >
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${build.coverGradient} flex items-center justify-center`}>
                  <span className="text-[10rem] leading-none opacity-30 group-hover:opacity-50 transition-opacity">
                    {build.heroEmoji}
                  </span>
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      build.type === 'architect'
                        ? 'bg-white/85 text-ember border-ember/30'
                        : 'bg-white/85 text-olive border-olive/30'
                    }`}>
                      {build.typeLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink/70 to-transparent">
                    <p className="text-white/90 text-sm leading-snug line-clamp-2">
                      {build.tagline}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-inkll mb-2">
                    {build.pages} pages · {build.difficulty}
                  </p>
                  <h3 className="font-serif italic text-2xl text-ink mb-2">
                    {build.title}
                  </h3>
                  <p className="text-inkl text-sm leading-relaxed">
                    {build.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------
// Premium Subscription Pitch — pricing tiers + subscribe CTA.
// Replaces the old "waitlist" CTA with something that actually exists.
// ---------------------------------------------------------------------
function PremiumSubscriptionPitch() {
  const [ref, visible] = useScrollReveal()

  return (
    <section
      id="premium"
      ref={ref}
      className="relative py-20 md:py-28 bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-ember/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-white/70 text-xs font-medium uppercase tracking-[0.2em] mb-3">
            The Wilder Builds subscription
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Two new PDFs every month.<br />
            <span className="text-gold">One Architect. One Lab.</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Beautifully designed, kid-tested, printable. Your library grows with every drop — past and future PDFs included.
          </p>
        </motion.div>

        {/* Pricing pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-0 sm:inline-flex sm:flex-row bg-white/15 backdrop-blur rounded-2xl sm:rounded-full p-1.5 mx-auto mb-8 w-full sm:w-auto"
        >
          <PricingPill
            amount={pricing.monthly.formatted}
            cadence={pricing.monthly.cadence}
            sub="Try it light"
          />
          <PricingPill
            amount={pricing.annual.formatted}
            cadence={pricing.annual.cadence}
            sub={`Save $${annualSavings} a year`}
            badge="Best value"
            highlight
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <Link
            to="/wilder-homes?tab=premium"
            className="inline-flex items-center gap-2 bg-white text-forest px-8 py-4 rounded-full font-semibold text-lg hover:bg-cream transition-colors shadow-xl"
          >
            See Premium Builds
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-white/60 text-sm mt-4">
            Cancel anytime · Past drops included · New PDF the 1st of every month
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function PricingPill({ amount, cadence, sub, badge, highlight = false }) {
  return (
    <div
      className={`relative flex-1 sm:flex-initial px-6 py-3 rounded-xl sm:rounded-full text-center transition-colors ${
        highlight ? 'bg-white text-ink' : 'text-white'
      }`}
    >
      <div className="flex items-baseline justify-center gap-1.5">
        <span className="font-serif italic text-2xl">{amount}</span>
        <span className={`text-sm ${highlight ? 'text-inkl' : 'text-white/70'}`}>{cadence}</span>
      </div>
      <p className={`text-xs ${highlight ? 'text-inkl' : 'text-white/70'} mt-0.5`}>{sub}</p>
      {badge && (
        <span className="absolute -top-2 -right-2 bg-ember text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-md">
          {badge}
        </span>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------
// 3 Destinations — Trails / Homes / Premium
// ---------------------------------------------------------------------
const paths = [
  {
    to: '/wilder-trails',
    eyebrow: 'For exploring outdoors',
    heading: 'Find a trail.',
    subtitle: 'Curated hikes, kid-friendly by age, with magic moments to make every walk memorable.',
    accentClass: 'bg-ember/15',
    blobFrom: '#B43C1E',
    blobTo: '#F2A57B',
  },
  {
    to: '/wilder-homes',
    eyebrow: 'For building outdoors-in',
    heading: 'Make at home.',
    subtitle: 'Free DIY guides, hands-on activities, an interactive design tool, and curated eco products.',
    accentClass: 'bg-olive/15',
    blobFrom: '#5A6428',
    blobTo: '#96963C',
  },
  {
    to: '/wilder-homes?tab=premium',
    eyebrow: 'For growing outdoors every month',
    heading: 'Get monthly builds.',
    subtitle: 'Two themed PDFs every month on the 1st — one Architect Blueprint, one Lab Activity.',
    accentClass: 'bg-gold/15',
    blobFrom: '#D2961E',
    blobTo: '#F2A57B',
  },
]

function ChooseYourPathTiles() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-blush/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Three ways to start
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-ink">
            Pick your path.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <motion.div
              key={p.to}
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
            >
              <Link
                to={p.to}
                className="group relative block bg-white rounded-3xl p-8 border-2 border-inkll/10 hover:border-ember/50 transition-all h-full"
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-50 blur-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${p.blobFrom} 0%, ${p.blobTo} 60%, transparent 100%)`,
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <p className={`text-[10px] uppercase tracking-[0.2em] font-medium mb-4 ${p.accentClass} text-ember rounded-full px-3 py-1 inline-block self-start`}>
                    {p.eyebrow}
                  </p>
                  <h3 className="font-serif italic text-3xl md:text-4xl text-ink mb-4">
                    {p.heading}
                  </h3>
                  <p className="font-sans text-inkl text-sm leading-relaxed flex-grow">
                    {p.subtitle}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-inkll group-hover:text-ember transition-colors">
                    <span className="font-sans text-xs uppercase tracking-wider">Explore</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------
export default function HomePage() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          const offset = 80
          const top = element.getBoundingClientRect().top + window.pageYOffset - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <Hero />
      <CurrentDropShowcase />
      <ChooseYourPathTiles />
      <PremiumSubscriptionPitch />
    </>
  )
}
