import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function WildRoomPage() {
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
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">The Wild Room</h1>
          <p className="text-inkl text-lg">Design your outdoor space with our interactive tool.</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-12 border border-inkll/10 text-center"
        >
          <div className="w-20 h-20 bg-forest/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-ink mb-4">Coming Soon</h2>
          <p className="text-inkl max-w-md mx-auto mb-6">
            We're building an interactive design tool that will let you plan your outdoor space zone by zone. 
            Add features, visualize layouts, and create your perfect wilder home.
          </p>
          <p className="text-sm text-inkll">Sign up for updates when we launch.</p>
        </motion.div>
      </div>
    </div>
  )
}
