import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ArchitectPage() {
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
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">The Architect</h1>
          <p className="text-inkl text-lg">Detailed blueprints and plans for permanent structures.</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-12 border border-inkll/10 text-center"
        >
          <div className="w-20 h-20 bg-ink/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-ink mb-4">Blueprints Coming Soon</h2>
          <p className="text-inkl max-w-md mx-auto mb-6">
            Comprehensive plans for sheds, playhouses, treehouses, and more. 
            Download and build with confidence.
          </p>
          <p className="text-sm text-inkll">Get notified when blueprints are available.</p>
        </motion.div>
      </div>
    </div>
  )
}
