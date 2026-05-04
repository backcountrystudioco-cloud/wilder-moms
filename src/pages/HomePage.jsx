import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from '../components/Hero'
import ChooseYourPath from '../components/ChooseYourPath'
import MissionSection from '../components/MissionSection'
import WaitlistCTA from '../components/WaitlistCTA'

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
      <ChooseYourPath />
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
