import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'

const categoryColors = {
  'Nature': 'bg-olive',
  'Arts': 'bg-peach',
  'Physical': 'bg-gold',
  'Educational': 'bg-slate'
}

const locationIcons = {
  'Indoor': '🏠',
  'Outdoor': '🌳',
  'Both': '🏕️'
}

function ActivityCard({ activity, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const getLocationText = () => {
    if (activity.indoor === true) return 'Indoor'
    if (activity.indoor === false) return 'Outdoor'
    return 'Both'
  }

  return (
    <motion.article
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      custom={index}
    >
      {/* Image with favorite button */}
      <div className="relative">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="text-xl">
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and badges row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-serif text-xl text-ink leading-tight">
            {activity.title}
          </h3>
          <span className="flex-shrink-0 px-3 py-1 bg-ember text-white text-xs font-sans rounded-full">
            {activity.ageRange}
          </span>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {activity.categories.map(category => (
            <span
              key={category}
              className={`${categoryColors[category]} text-white text-xs font-sans px-2 py-1 rounded-full`}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Meta info row */}
        <div className="flex items-center gap-3 mb-4 text-sm font-sans text-inkl">
          <span className="flex items-center gap-1">
            <span>⏱️</span> {activity.duration}
          </span>
          <span className="flex items-center gap-1">
            <span>{locationIcons[getLocationText()]}</span> {getLocationText()}
          </span>
          {activity.weatherSensitive !== 'Any' && (
            <span className={`px-2 py-0.5 rounded text-xs ${
              activity.weatherSensitive === 'Good' ? 'bg-parchment text-forest' : 'bg-slate/20 text-slate'
            }`}>
              {activity.weatherSensitive === 'Good' ? '☀️' : '🌧️'} {activity.weatherSensitive} weather
            </span>
          )}
        </div>

        {/* Materials preview */}
        <div className="mb-4">
          <p className="font-sans text-xs text-inkl uppercase tracking-wide mb-1">Materials</p>
          <p className="font-sans text-sm text-ink">
            {activity.materials.join(', ')}
          </p>
        </div>

        {/* Expandable instructions */}
        <div className="border-t border-inkll/30 pt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between font-sans text-sm text-ember hover:text-terra transition-colors"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide' : 'Show'} Instructions</span>
            <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <p className="font-sans text-sm text-ink leading-relaxed">
                {activity.instructions}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ActivityCard
