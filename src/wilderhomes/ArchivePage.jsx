import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/wilder-homes/environment" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
            ← Back to Environment
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">The Archive</h1>
          <p className="text-inkl text-lg">Ancient wisdom for modern families.</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-12 border border-inkll/10 text-center"
        >
          <div className="w-20 h-20 bg-ember/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-ink mb-4">Premium Guides Coming Soon</h2>
          <p className="text-inkl max-w-md mx-auto mb-6">
            Traditional building techniques, natural materials, and time-tested designs — 
            compiled into downloadable guides for your family.
          </p>
          <p className="text-sm text-inkll">Join our newsletter to be notified when guides launch.</p>
        </motion.div>
      </div>
    </div>
  )
}
