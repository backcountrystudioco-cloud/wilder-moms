import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const environmentSections = [
  {
    id: 'wild-room',
    title: 'The Wild Room',
    description: 'Design your indoor and outdoor spaces with our interactive tool. Create zones, plan features, and visualize your wilder home.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    color: 'forest',
    to: '/wilder-homes/wild-room',
    badge: 'Interactive Tool'
  },
  {
    id: 'eco-products',
    title: 'GreenHome Guide',
    description: 'Curated sustainable materials and tools for indoor and outdoor projects. Good for your family, good for the planet.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'olive',
    to: '/wilder-homes/eco-products',
    badge: 'Shop'
  },
  {
    id: 'archive',
    title: 'The Wilder Lab',
    description: 'Where living materials meet family builds. Mycelium, hempcrete, cob, and more — guides for building with the earth.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'olive',
    to: '/wilder-homes/activities/archive',
    badge: 'Build Guides'
  },
  {
    id: 'architect',
    title: 'The Architect',
    description: 'Detailed blueprints for outdoor AND indoor builds that create natural nooks, sensory spaces, and innovative ways for your family to connect with nature.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'ink',
    to: '/wilder-homes/architect',
    badge: 'Blueprints'
  }
]

const colorClasses = {
  forest: 'bg-forest/10 text-forest border-forest/20',
  olive: 'bg-olive/10 text-olive border-olive/20',
  ember: 'bg-ember/10 text-ember border-ember/20',
  ink: 'bg-ink/10 text-ink border-ink/20'
}

export default function EnvironmentPage() {
  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/wilder-homes" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
            ← Back to Wilder Homes
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">Environment</h1>
          <p className="text-inkl text-lg max-w-2xl">
            Design tools and guides for creating natural spaces with intention. Clean materials, time-tested techniques, and builds that bring the outdoors in.
          </p>
        </motion.header>

        {/* Environment Sections Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {environmentSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Link
                to={section.to}
                className="group block bg-white rounded-2xl p-6 border-2 border-inkll/10 hover:border-ember/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[section.color]}`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${colorClasses[section.color]}`}>
                        {section.badge}
                      </span>
                      <svg className="w-4 h-4 text-inkll group-hover:text-ember transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl text-ink mb-1">{section.title}</h3>
                    <p className="text-inkl text-sm leading-relaxed">{section.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-ink rounded-2xl p-8 text-center"
        >
          <p className="font-serif text-2xl text-cream mb-2">Ready to start building?</p>
          <p className="text-inkll mb-6">Check out our free build guides to get started.</p>
          <Link
            to="/wilder-homes/activities"
            className="inline-block px-6 py-3 bg-cream text-ink font-sans font-medium rounded-full hover:bg-ember hover:text-white transition-colors"
          >
            Browse Build Guides
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
