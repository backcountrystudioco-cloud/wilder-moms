import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import { useUser } from '../context/UserContext'

const difficultyColors = {
  easy: 'bg-olive/20 text-forest',
  moderate: 'bg-gold/20 text-ink',
  challenging: 'bg-ember/20 text-ember',
}

const difficultyLabels = {
  easy: 'Easy',
  moderate: 'Moderate',
  challenging: 'Hard',
}

export default function HikeCard({ hike, index = 0 }) {
  const { savedHikes, toggleSavedHike } = useUser()
  const isSaved = savedHikes.includes(hike.id)
  
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${hike.lat},${hike.lon}`
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
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hike.imageUrl}
          alt={hike.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
          }}
        />
        {/* Difficulty Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-sans font-medium ${difficultyColors[hike.difficulty]}`}>
          {difficultyLabels[hike.difficulty]}
        </span>
        {/* Save Button */}
        <button
          onClick={() => toggleSavedHike(hike.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isSaved 
              ? 'bg-ember text-white' 
              : 'bg-white/80 text-inkl hover:bg-white hover:text-ember'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save hike'}
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
          {hike.title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {/* Distance & Duration Pill */}
          <span className="px-3 py-1 rounded-full bg-peach/20 text-inkl font-sans text-sm">
            {hike.distance} · {hike.duration}
          </span>
          {/* Elevation */}
          <span className="px-3 py-1 rounded-full bg-blush text-inkl font-sans text-sm">
            ↑ {hike.elevation}
          </span>
        </div>

        {/* Age Range */}
        <div className="mb-3">
          <span className="text-inkl font-sans text-sm">
            Ages: <span className="font-medium text-ink">{hike.ageRange}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-inkl font-sans text-sm leading-relaxed mb-4 line-clamp-2">
          {hike.description}
        </p>

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
