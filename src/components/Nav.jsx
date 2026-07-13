import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { useBuildsAccess } from '../hooks/useBuildsAccess'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn, user } = useAuth()
  const { hasAccess, status } = useBuildsAccess()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 right-0 z-[999]
        backdrop-blur-md bg-cream/88
        transition-all duration-300
        ${scrolled ? 'border-b border-inkll/30' : 'border-b border-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Wordmark */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/wilder_moms_logo.jpeg"
              alt="Wilder Moms"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Wilder Homes */}
            <Link
              to="/wilder-homes"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Wilder Homes
            </Link>

            {/* Wilder Trails */}
            <Link
              to="/wilder-trails"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Wilder Trails
            </Link>

            {/* Wilder Philosophy */}
            <Link
              to="/wilder-philosophy"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Wilder Philosophy
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isSignedIn && (
              <Link
                to="/wilder-homes?tab=premium"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors"
                title={
                  hasAccess
                    ? 'Your Premium Builds library — click to view'
                    : status === 'expired'
                    ? 'Renew your Premium Builds subscription'
                    : 'Subscribe to Premium Builds — two PDFs every month'
                }
              >
                {hasAccess ? (
                  <span className="bg-olive/15 text-olive border border-olive/30">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a4 4 0 00-4 4v3H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 7V6a2 2 0 114 0v3H8z" />
                    </svg>
                    Library
                  </span>
                ) : status === 'expired' ? (
                  <span className="bg-terra/15 text-terra border border-terra/30">
                    Renew Premium
                  </span>
                ) : (
                  <span className="bg-ember/10 text-ember border border-ember/25 relative">
                    Premium
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-ember animate-pulse" />
                  </span>
                )}
              </Link>
            )}
            <AnimatePresence mode="wait">
              {isSignedIn ? (
                <motion.div
                  key="user-button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserButton />
                </motion.div>
              ) : (
                <motion.div
                  key="auth-buttons"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <SignInButton>
                    <button className="font-sans font-medium text-sm px-4 py-2 text-ink hover:text-ember transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-ember text-white font-sans font-medium text-sm px-5 py-2.5 rounded-full hover:bg-forest transition-colors duration-300">
                      Join the Waitlist
                    </button>
                  </SignUpButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links - Always Visible */}
      <div className="md:hidden border-t border-inkll/20 mt-1">
        <div className="flex items-center justify-around px-4 py-1.5">
          <Link
            to="/wilder-trails/location"
            className="flex flex-col items-center gap-0 font-sans font-medium text-xs text-ink hover:text-ember transition-colors"
          >
            Wilder Trails
          </Link>
          <Link
            to="/wilder-homes"
            className="flex flex-col items-center gap-0 font-sans font-medium text-xs text-ink hover:text-ember transition-colors"
          >
            Wilder Homes
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
