import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'

const categoryColors = {
  'Nature': 'bg-olive',
  'Arts': 'bg-peach',
  'Physical': 'bg-gold',
  'Educational': 'bg-slate'
}

const categoryGradients = {
  'Nature': 'from-green-600 to-green-800',
  'Arts': 'from-peach to-amber-600',
  'Physical': 'from-gold to-amber-700',
  'Educational': 'from-slate/70 to-slate'
}

function ActivityCard({ activity, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const getLocationText = () => {
    if (activity.indoor === true) return 'Indoor'
    if (activity.indoor === false) return 'Outdoor'
    return 'Both'
  }
  
  // Get gradient based on first category
  const gradientClass = activity.categories?.[0] 
    ? categoryGradients[activity.categories[0]] || 'from-ember to-terra'
    : 'from-ember to-terra'

  return (
    <motion.article
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      custom={index}
    >
      {/* Icon Header */}
      <div className={`relative h-32 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
        <span className="text-5xl opacity-40">
          {activity.emoji || '🎨'}
        </span>
        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="text-xl">
            {isFavorite ? (
              <svg className="w-5 h-5 text-ember" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
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
          {activity.categories?.map(category => (
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {activity.duration}
          </span>
          <span className="flex items-center gap-1">
            {getLocationText()}
          </span>
          {activity.weatherSensitive !== 'Any' && (
            <span className={`px-2 py-0.5 rounded text-xs ${
              activity.weatherSensitive === 'Good' ? 'bg-parchment text-forest' : 'bg-slate/20 text-slate'
            }`}>
              {activity.weatherSensitive} weather
            </span>
          )}
        </div>

        {/* Materials preview */}
        <div className="mb-4">
          <p className="font-sans text-xs text-inkl uppercase tracking-wide mb-1">Materials</p>
          <p className="font-sans text-sm text-ink">
            {activity.materials?.join(', ')}
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
