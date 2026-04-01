import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import { useUser } from '../context/UserContext'

const difficultyColors = {
  easy: 'bg-olive/20 text-forest border-olive',
  moderate: 'bg-gold/20 text-ink border-gold',
  challenging: 'bg-ember/20 text-ember border-ember',
}

const difficultyLabels = {
  easy: 'Easy',
  moderate: 'Moderate',
  challenging: 'Hard',
}

const stateColors = {
  'Washington': 'bg-blue-100 text-blue-800',
  'Colorado': 'bg-amber-100 text-amber-800',
  'Oregon': 'bg-teal-100 text-teal-800',
  'Utah': 'bg-orange-100 text-orange-800',
  'Texas': 'bg-red-100 text-red-800',
}

export default function HikeCard({ hike, index = 0, showScore = false }) {
  const { savedHikes, toggleSavedHike } = useUser()
  const isSaved = savedHikes.includes(hike.id)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${hike.lat},${hike.lon}`
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-olive text-white'
    if (score >= 60) return 'bg-gold text-white'
    if (score >= 40) return 'bg-terra text-white'
    return 'bg-ember text-white'
  }

  return (
    <motion.article
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-inkll/10"
    >
      {/* Color-coded header based on difficulty */}
      <div className={`relative p-4 border-b-4 ${difficultyColors[hike.difficulty].replace('/20', '')}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* State badge */}
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-sans font-medium mb-2 ${stateColors[hike.state]}`}>
              {hike.state}
            </span>
            {/* Title */}
            <h3 className="font-serif text-xl text-ink mb-1">
              {hike.title}
            </h3>
            {/* Region */}
            <p className="text-inkl/70 font-sans text-sm">
              {hike.region}
            </p>
          </div>
          {/* Save Button */}
          <button
            onClick={() => toggleSavedHike(hike.id)}
            className={`p-2 rounded-full transition-all ${
              isSaved 
                ? 'bg-ember text-white' 
                : 'bg-white/80 text-ink hover:bg-white hover:text-ember'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save hike'}
          >
            <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        {/* Match Score Badge */}
        {showScore && hike.score > 0 && (
          <div className={`mt-2 mr-2 inline-block px-2 py-1 rounded-full text-xs font-sans font-bold ${getScoreColor(hike.score)}`}>
            {hike.score}% match
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Difficulty & Stats Row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-sans font-medium border ${difficultyColors[hike.difficulty]}`}>
            {difficultyLabels[hike.difficulty]}
          </span>
          <span className="px-3 py-1 rounded-full bg-peach/20 text-inkl font-sans text-sm">
            {hike.distanceLabel}
          </span>
          <span className="px-3 py-1 rounded-full bg-blush text-inkl font-sans text-sm">
            {hike.durationLabel}
          </span>
        </div>

        {/* Age Range */}
        <div className="mb-3">
          <span className="text-inkl font-sans text-sm">
            Ages: <span className="font-medium text-ink">{hike.ageRange}</span>
          </span>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hike.strollerFriendly && (
            <span className="px-2 py-0.5 rounded bg-slate/20 text-slate font-sans text-xs" title="Stroller Friendly">
              Stroller OK
            </span>
          )}
          {hike.dogsAllowed && (
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-sans text-xs" title="Dogs Allowed">
              Dogs OK
            </span>
          )}
          {hike.hasWater && (
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-sans text-xs" title="Water Features">
              Water
            </span>
          )}
          {hike.hasViews && (
            <span className="px-2 py-0.5 rounded bg-olive/20 text-forest font-sans text-xs" title="Scenic Views">
              Views
            </span>
          )}
          {hike.isPaved && (
            <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-sans text-xs" title="Paved Path">
              Paved
            </span>
          )}
          {hike.restrooms && (
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-sans text-xs" title="Restrooms Available">
              Restrooms
            </span>
          )}
        </div>

        {/* Quick Info Row */}
        <div className="flex items-center gap-3 mb-3 text-xs text-inkl">
          {/* Parking */}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            {hike.parking === 'free' ? 'Free Parking' : hike.parking === 'free_limited' ? 'Free/Limited' : 'Paid Parking'}
          </span>
          {/* Duration */}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {hike.durationLabel}
          </span>
          {/* Shade */}
          <span className="flex items-center gap-1">
            {hike.shadeLevel === 'low' ? 'Full Sun' : hike.shadeLevel === 'medium' ? 'Partial Shade' : 'Heavy Shade'}
          </span>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className={`text-inkl font-sans text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
            {hike.description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-ember font-sans text-sm font-medium hover:text-terra transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        {/* Get Directions Button */}
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ember text-white font-sans text-sm font-medium hover:bg-forest transition-colors"
        >
          Get Directions
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </a>
      </div>
    </motion.article>
  )
}
