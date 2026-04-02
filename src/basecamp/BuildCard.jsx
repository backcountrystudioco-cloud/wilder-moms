import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'

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

export default function BuildCard({ build, index = 0 }) {
  const icon = categoryIcons[build.category] || 'Shelter'
  const colorClass = categoryColors[build.category] || 'from-ember to-terra'
  
  return (
    <motion.article
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/basecamp/${build.id}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-ink/5 flex flex-col h-full">
          {/* Icon Header */}
          <div className={`relative h-32 bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
            <span className="text-2xl font-bold text-white opacity-40 uppercase tracking-wider">{icon}</span>
            {/* Category Tag */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-ink text-xs font-medium">
              {build.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Title */}
            <h3 className="font-serif text-xl text-ink mb-2 leading-snug">
              {build.title}
            </h3>

            {/* Description */}
            <p className="text-inkl text-sm leading-relaxed mb-4 line-clamp-2">
              {build.description}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Difficulty Badge */}
              <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[build.difficulty]}`}>
                {difficultyLabels[build.difficulty]}
              </span>
              {/* Time Estimate */}
              <span className="bg-cream text-ink px-2 py-1 rounded text-xs">
                {build.timeEstimate}
              </span>
              {/* Age Range */}
              <span className="bg-cream text-ink px-2 py-1 rounded text-xs">
                Ages {build.ageRange}
              </span>
            </div>

            {/* Cost */}
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
