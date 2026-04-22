import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [baseCampDropdownOpen, setBaseCampDropdownOpen] = useState(false)
  const { isSignedIn, user } = useAuth()

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
        fixed top-0 left-0 right-0 z-50
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
            {/* The Habitat - Explore */}
            <Link
              to="/habitat"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              The Habitat
            </Link>

            {/* The Base Camp - Builds & Activities Dropdown */}
            <div className="relative">
              <button
                className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors inline-flex items-center gap-1"
                onMouseEnter={() => setBaseCampDropdownOpen(true)}
              >
                The Base Camp
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {baseCampDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-cream shadow-lg rounded-lg border border-inkll/10 py-2"
                    onMouseLeave={() => setBaseCampDropdownOpen(false)}
                  >
                    <Link
                      to="/basecamp"
                      className="block px-4 py-2 font-sans text-sm text-ink hover:bg-blush/50 hover:text-ember"
                    >
                      Builds
                    </Link>
                    <Link
                      to="/basecamp/activities"
                      className="block px-4 py-2 font-sans text-sm text-ink hover:bg-blush/50 hover:text-ember"
                    >
                      Activities
                    </Link>
                    <Link
                      to="/basecamp/eco-products"
                      className="block px-4 py-2 font-sans text-sm text-ink hover:bg-blush/50 hover:text-ember"
                    >
                      Eco
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* The Village - Profile/Community */}
            <Link
              to="/village"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              The Village
            </Link>

            {/* Journal */}
            <Link
              to="/journal"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Journal
            </Link>

            {/* Skills Passport */}
            <Link
              to="/skills"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Skills
            </Link>

            {/* The Blueprint - just links to blueprint since it's a tabbed page */}
            <Link
              to="/blueprint"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              The Blueprint
            </Link>

            {/* Landing Page Links */}
            <Link
              to="/mission"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Our Mission
            </Link>
          </div>

          {/* Auth Buttons */}
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

      {/* Mobile Nav Links - Always Visible */}
      <div className="md:hidden border-t border-inkll/20 mt-1">
        <div className="flex items-center justify-around px-4 py-1.5">
          <Link
            to="/habitat"
            className="flex flex-col items-center gap-0 font-sans font-medium text-xs text-ink hover:text-ember transition-colors"
          >
            Habitat
          </Link>
          <Link
            to="/basecamp"
            className="flex flex-col items-center gap-0 font-sans font-medium text-xs text-ink hover:text-ember transition-colors"
          >
            Base
          </Link>
          <Link
            to="/village"
            className="flex flex-col items-center gap-0 font-sans font-medium text-xs text-ink hover:text-ember transition-colors"
          >
            Village
          </Link>
          <Link
            to="/journal"
            className="flex flex-col items-center gap-0 font-sans font-medium text-xs text-ink hover:text-ember transition-colors"
          >
            Journal
          </Link>
          <Link
            to="/skills"
            className="flex flex-col items-center gap-0 font-sans font-medium text-xs text-ink hover:text-ember transition-colors"
          >
            Skills
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
