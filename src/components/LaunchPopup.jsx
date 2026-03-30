import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LaunchPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('wilderMoms_launchPopupSeen')
    if (!hasSeenPopup) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('wilderMoms_launchPopupSeen', 'true')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-cream rounded-2xl shadow-2xl shadow-ink/20 max-w-lg w-full p-8 md:p-10 text-center"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-blush hover:bg-peach transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
              <img
                src="/wilder_moms_logo.jpeg"
                alt="Wilder Moms"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>

            {/* Content */}
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              Welcome to <span className="text-ember italic">Wilder Moms</span>
            </h2>
            <p className="text-inkl text-lg mb-6 leading-relaxed">
              A community for moms who believe the best childhood happens outdoors, messy, and unplugged.
            </p>
            <p className="text-inkl mb-8 leading-relaxed">
              We're building the app that helps you plan adventures, discover nature-based activities, and connect with other wilderness-minded moms.
            </p>

            {/* CTA */}
            <a
              href="#waitlist"
              onClick={handleClose}
              className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-terra transition-colors"
            >
              Join the Waitlist
            </a>

            {/* Skip */}
            <button
              onClick={handleClose}
              className="block w-full mt-4 text-inkll text-sm hover:text-ink transition-colors"
            >
              Continue to app
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
