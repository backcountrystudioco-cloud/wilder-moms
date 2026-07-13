import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from '../components/Hero'
import MissionSection from '../components/MissionSection'
import WaitlistCTA from '../components/WaitlistCTA'
import { getCurrentDrop } from '../wilder-builds/buildsLibrary'

const paths = [
  {
    to: '/wilder-trails',
    eyebrow: 'FOR EXPLORING OUTDOORS',
    heading: 'Find a trail.',
    subtitle: 'Curated hikes, kid-friendly by age, with magic moments to make every walk memorable.',
    accentClass: 'bg-ember/15',
    blobFrom: '#B43C1E',
    blobTo: '#F2A57B',
  },
  {
    to: '/wilder-homes',
    eyebrow: 'FOR BUILDING OUTDOORS-IN',
    heading: 'Make at home.',
    subtitle: 'Free DIY guides, an interactive design tool, and curated eco products — everything to bring nature inside.',
    accentClass: 'bg-olive/15',
    blobFrom: '#5A6428',
    blobTo: '#96963C',
  },
  {
    to: '/wilder-homes?tab=premium',
    eyebrow: 'FOR GROWING OUTDOORS EVERY MONTH',
    heading: 'Get monthly builds.',
    subtitle: 'Two themed PDFs every month on the 1st — one Architect Blueprint, one Lab Activity. Beautifully designed, kid-tested.',
    accentClass: 'bg-gold/15',
    blobFrom: '#D2961E',
    blobTo: '#F2A57B',
  },
]

function ChooseYourPathTiles() {
  const currentDrop = getCurrentDrop()

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Where do you want to start?
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-ink">
            Choose your path.
          </h2>
        </motion.div>

        {/* What's new this month */}
        {currentDrop && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="mb-8"
          >
            <Link
              to="/wilder-homes?tab=premium"
              className="group flex items-center justify-between gap-4 bg-white border border-inkll/15 rounded-2xl p-5 hover:border-ember/40 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-ember/10 text-ember">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ember font-medium mb-1">
                    This month's drop
                  </p>
                  <p className="font-serif text-lg text-ink truncate">
                    {currentDrop.title} — <span className="text-inkl font-sans text-sm">{currentDrop.subtitle}</span>
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0 text-inkll group-hover:text-ember group-hover:translate-x-1 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>
        )}

        {/* 3 tiles */}
        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <motion.div
              key={p.to}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 + i * 0.1 }}
            >
              <Link
                to={p.to}
                className="group relative block bg-white rounded-3xl p-8 border-2 border-inkll/10 hover:border-ember/50 transition-all h-full"
              >
                {/* Colored gradient blob in top-right */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-50 blur-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${p.blobFrom} 0%, ${p.blobTo} 60%, transparent 100%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Eyebrow */}
                  <p className={`text-[10px] uppercase tracking-[0.2em] font-medium mb-4 ${p.accentClass} text-ember rounded-full px-3 py-1 inline-block self-start`}>
                    {p.eyebrow}
                  </p>

                  {/* Heading */}
                  <h3 className="font-serif italic text-3xl md:text-4xl text-ink mb-4">
                    {p.heading}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-sans text-inkl text-sm leading-relaxed flex-grow">
                    {p.subtitle}
                  </p>

                  {/* Subtle arrow indicator */}
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

export default function HomePage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

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

    const handleScroll = () => {
      // Show floating CTA after scrolling past the hero section
      if (window.scrollY > 500) {
        setShowFloatingCTA(true)
      } else {
        setShowFloatingCTA(false)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Hero />
      <ChooseYourPathTiles />
      <MissionSection />
      <WaitlistCTA />

      {/* Floating CTA - appears after scrolling */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <Link
              to="/explore"
              className="flex items-center gap-3 bg-ember text-white px-6 py-3 rounded-full shadow-lg shadow-ember/30 hover:bg-terra transition-colors"
            >
              <span className="font-sans font-medium">Start Exploring</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
