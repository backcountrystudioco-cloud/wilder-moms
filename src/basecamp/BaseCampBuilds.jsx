import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'
import { builds } from './builds'

const difficultyColors = {
  easy: 'bg-olive text-white',
  medium: 'bg-gold text-white',
  hard: 'bg-ember text-white'
}

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
}

const categoryIcons = {
  'Shelter': 'Shelter',
  'Fire': 'Fire',
  'Water': 'Water',
  'Food': 'Food',
  'Tools': 'Tools',
  'Comfort': 'Comfort',
  'Safety': 'Safety',
  'Fun': 'Fun',
}

const categoryColors = {
  'Shelter': 'from-amber-600 to-amber-800',
  'Fire': 'from-orange-600 to-red-700',
  'Water': 'from-blue-500 to-blue-700',
  'Food': 'from-green-600 to-green-800',
  'Tools': 'from-gray-600 to-gray-800',
  'Comfort': 'from-purple-600 to-purple-800',
  'Safety': 'from-red-600 to-red-800',
  'Fun': 'from-pink-500 to-pink-700',
}

// Show first 3 builds from the actual builds data
const featuredBuilds = builds.slice(0, 3)

function BuildCard({ build, index }) {
  const [ref, isVisible] = useScrollReveal()
  const icon = categoryIcons[build.category] || 'Shelter'
  const colorClass = categoryColors[build.category] || 'from-ember to-terra'
  const buildImage = `/images/builds/${build.id}.jpg`

  return (
    <motion.article
      ref={ref}
      variants={fadeUpVariants}
      custom={index}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/basecamp/${build.id}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-ink/5 flex flex-col h-full">
          {/* Image Header */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={buildImage}
              alt={build.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.classList.add(`bg-gradient-to-br`, ...colorClass.split(' '), 'flex', 'items-center', 'justify-center')
              }}
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-ink text-xs font-medium">
              {build.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-serif text-xl text-ink mb-2 leading-snug">
              {build.title}
            </h3>

            <p className="text-inkl text-sm leading-relaxed mb-4 line-clamp-2">
              {build.description}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[build.difficulty]}`}>
                {difficultyLabels[build.difficulty]}
              </span>
              <span className="bg-cream text-ink px-2 py-1 rounded text-xs">
                {build.timeEstimate}
              </span>
              <span className="bg-cream text-ink px-2 py-1 rounded text-xs">
                Ages {build.ageRange}
              </span>
            </div>

            <div className="mt-auto">
              <span className="text-inkl text-sm font-medium">
                {build.cost}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function BaseCampBuilds() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="builds" className="bg-cream py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="text-inkll text-xs font-medium uppercase tracking-widest mb-4"
          >
            THE BASE CAMP · BUILD GUIDES
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            custom={1}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-ember leading-tight mb-6"
          >
            Build a wilder home for your kids.
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            custom={2}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="text-inkl max-w-2xl mx-auto leading-relaxed"
          >
            Healthy living spaces aren't complicated or expensive. These are the builds that turn a
            backyard — or a balcony — into a place your kids will choose over a screen, every single
            time.
          </motion.p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredBuilds.map((build, index) => (
            <BuildCard key={build.id} build={build} index={index} />
          ))}
        </div>

        {/* View All Builds Link */}
        <div className="text-center mt-12">
          <Link
            to="/basecamp"
            className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-terra transition-colors"
          >
            View All Builds
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
