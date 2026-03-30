import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

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

  const navLinks = [
    { label: 'Explore', path: '/explore', mobileHidden: false },
    { label: 'Builds', path: '/builds', mobileHidden: false },
    { label: 'Activities', path: '/activities', mobileHidden: false },
    { label: 'The Platform', id: 'platform' },
    { label: 'Build Guides', id: 'builds' },
    { label: 'Our Mission', id: 'mission' }
  ]

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
              className="w-[42px] h-[42px] rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <span
              className="hidden"
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                backgroundColor: '#8C1E00'
              }}
            />
            <span className="font-serif text-xl md:text-2xl">
              <span className="text-ink">Wilder</span>
              <span className="text-ember italic"> Moms</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* App Navigation Links */}
            <Link
              to="/explore"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Explore
            </Link>
            <Link
              to="/builds"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Builds
            </Link>
            <Link
              to="/activities"
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Activities
            </Link>
            {/* Landing Page Links */}
            <a
              href="#platform"
              onClick={(e) => handleNavClick(e, 'platform')}
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              The Platform
            </a>
            <a
              href="#builds"
              onClick={(e) => handleNavClick(e, 'builds')}
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Build Guides
            </a>
            <a
              href="#mission"
              onClick={(e) => handleNavClick(e, 'mission')}
              className="font-sans font-medium text-sm uppercase tracking-[0.08em] text-ink hover:text-ember transition-colors"
            >
              Our Mission
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="#waitlist"
            onClick={(e) => handleNavClick(e, 'waitlist')}
            className="bg-ember text-white font-sans font-medium text-sm px-5 py-2.5 rounded-full hover:bg-forest transition-colors duration-300"
          >
            Join the Waitlist
          </a>
        </div>
      </div>

      {/* Mobile Nav Links - Always Visible */}
      <div className="md:hidden border-t border-inkll/20 mt-2">
        <div className="flex items-center justify-around gap-4 px-4 py-3">
          <Link
            to="/explore"
            className="flex flex-col items-center gap-1 font-sans font-medium text-sm text-ink hover:text-ember transition-colors"
          >
            <span>🔍</span>
            <span>Explore</span>
          </Link>
          <Link
            to="/builds"
            className="flex flex-col items-center gap-1 font-sans font-medium text-sm text-ink hover:text-ember transition-colors"
          >
            <span>🔨</span>
            <span>Builds</span>
          </Link>
          <Link
            to="/activities"
            className="flex flex-col items-center gap-1 font-sans font-medium text-sm text-ink hover:text-ember transition-colors"
          >
            <span>⭐</span>
            <span>Activities</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center gap-1 font-sans font-medium text-sm text-ink hover:text-ember transition-colors"
          >
            <span>👤</span>
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
