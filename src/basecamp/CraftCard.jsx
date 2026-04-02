import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import { useUser } from '../context/UserContext'

const categoryGradients = {
  'Painting': 'from-pink-400 to-rose-500',
  'Nature': 'from-green-500 to-emerald-600',
  'Building': 'from-amber-500 to-orange-600',
  'Science': 'from-blue-500 to-indigo-600',
  'Music': 'from-purple-500 to-violet-600',
}

const categoryIcons = {
  'Painting': 'Painting',
  'Nature': 'Nature',
  'Building': 'Building',
  'Science': 'Science',
  'Music': 'Music',
}

export default function CraftCard({ craft, index = 0 }) {
  const { savedCrafts, toggleSavedCraft } = useUser()
  const isSaved = savedCrafts.includes(craft.id)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const gradientClass = categoryGradients[craft.category] || 'from-peach to-amber-500'
  const icon = categoryIcons[craft.category] || 'craft'

  return (
    <motion.article
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-inkll/10"
    >
      {/* Icon Header */}
      <div className={`relative h-32 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
        <span className="text-2xl font-bold text-white opacity-40 uppercase tracking-wider">{icon}</span>
        {/* Indoor/Outdoor Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-sans font-medium ${
          craft.indoor ? 'bg-white/90 text-inkl' : 'bg-parchment/90 text-forest'
        }`}>
          {craft.indoor ? 'Indoor' : 'Outdoor'}
        </span>
        {/* Save Button */}
        <button
          onClick={() => toggleSavedCraft(craft.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isSaved 
              ? 'bg-ember text-white' 
              : 'bg-white/80 text-inkl hover:bg-white hover:text-ember'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save craft'}
        >
          <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-serif text-xl text-ink mb-3">
          {craft.title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {/* Duration Pill */}
          <span className="px-3 py-1 rounded-full bg-peach/20 text-inkl font-sans text-sm">
            {craft.duration}
          </span>
          {/* Age Range */}
          <span className="px-3 py-1 rounded-full bg-blush text-inkl font-sans text-sm">
            Ages {craft.ageRange}
          </span>
        </div>

        {/* Materials Preview */}
        <div className="mb-4">
          <p className="text-inkl font-sans text-sm mb-2">
            <span className="font-medium text-ink">Materials:</span>{' '}
            {craft.materials?.slice(0, 3).join(', ')}
            {craft.materials?.length > 3 && (
              <span className="text-inkll"> +{craft.materials.length - 3} more</span>
            )}
          </p>
        </div>

        {/* Expandable Instructions */}
        <div className="border-t border-inkll/20 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-ember font-sans text-sm font-medium">
              View Instructions
            </span>
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 text-ember"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pt-3 text-inkl font-sans text-sm leading-relaxed">
                  {craft.instructions}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}
