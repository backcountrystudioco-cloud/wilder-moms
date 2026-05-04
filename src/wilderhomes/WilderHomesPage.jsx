import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { builds } from './builds'
import { crafts } from './crafts'

export default function WilderHomesPage() {

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-8"
        >
          <p className="text-inkll text-xs font-medium uppercase tracking-widest mb-4">
            WILDER HOMES
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-ember leading-tight mb-6">
            A wilder home starts here.
          </h1>
          <p className="text-inkl max-w-2xl mx-auto leading-relaxed text-lg">
            Two paths to a childhood full of outdoor adventure. Choose your journey.
          </p>
        </motion.div>

        {/* Two Decision Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {/* Activities Card */}
          <Link
            to="/wilder-homes/activities"
            className="group relative bg-white rounded-3xl p-8 border-2 border-inkll/10 hover:border-ember/50 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-ember/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-widest text-ember mb-3">For getting messy</p>
              <h2 className="font-serif text-3xl text-ink mb-3">Activities</h2>
              <p className="text-inkl mb-6 leading-relaxed">
                Free builds and crafts to make with your kids this weekend. Mud kitchens, forts, gardens, and everything in between — designed for the kind of fun that gets you dirty.
              </p>
              <div className="flex items-center gap-4 text-sm text-inkll mb-6">
                <span>{builds.length} build guides</span>
                <span className="w-1 h-1 rounded-full bg-inkll/30" />
                <span>{crafts.length} crafts</span>
              </div>
              <div className="flex items-center gap-2 text-ember font-medium">
                <span>Get building</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Environment Card */}
          <Link
            to="/wilder-homes/environment"
            className="group relative bg-white rounded-3xl p-8 border-2 border-inkll/10 hover:border-olive/50 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-olive/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-widest text-olive mb-3">For cultivating home</p>
              <h2 className="font-serif text-3xl text-ink mb-3">Environment</h2>
              <p className="text-inkl mb-6 leading-relaxed">
                Tools and guides for creating natural spaces with intention. Clean materials, time-tested techniques, and designs that bring the outdoors in — for a home built to last.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-inkll mb-6">
                <span className="px-2 py-1 bg-olive/10 text-olive rounded-full">GreenHome Guide</span>
                <span className="px-2 py-1 bg-olive/10 text-olive rounded-full">The Wilder Lab</span>
                <span className="px-2 py-1 bg-olive/10 text-olive rounded-full">The Architect</span>
              </div>
              <div className="flex items-center gap-2 text-olive font-medium">
                <span>Design your space</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
