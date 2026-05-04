import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">
            Where would you like to go?
          </h1>
          <p className="text-inkl text-lg">
            Choose your adventure
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Wilder Homes Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/wilder-homes"
              className="block bg-white rounded-3xl p-8 border-2 border-inkll/10 hover:border-ember/30 hover:shadow-xl transition-all group h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-ember/10 flex items-center justify-center mb-6 group-hover:bg-ember/20 transition-colors">
                <svg className="w-8 h-8 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-ink mb-3">Wilder Homes</h2>
              <p className="text-inkl mb-4">
                Build guides, activities, the Wild Room planning tool, and the Wilder Lab for living material builds.
              </p>
              <div className="flex items-center gap-2 text-ember font-medium">
                <span>Explore Builds</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* Wilder Trails Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/wilder-trails"
              className="block bg-white rounded-3xl p-8 border-2 border-inkll/10 hover:border-forest/30 hover:shadow-xl transition-all group h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-forest/10 flex items-center justify-center mb-6 group-hover:bg-forest/20 transition-colors">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-ink mb-3">Wilder Trails</h2>
              <p className="text-inkl mb-4">
                Find family-friendly trails, check conditions, get AI recommendations for your crew, and track your adventures.
              </p>
              <div className="flex items-center gap-2 text-forest font-medium">
                <span>Find Trails</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
