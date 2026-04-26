import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getRelatedBuilds } from './builds'

const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700'
}

export default function BuildCard({ build, index = 0 }) {
  const relatedBuilds = getRelatedBuilds(build.id)
  const [showRelated, setShowRelated] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden border border-inkll/10 hover:shadow-lg transition-shadow"
    >
      <Link to={`/wilder-homes/activities/${build.id}`} className="block">
        {/* Image Area */}
        <div className="aspect-[4/3] bg-gradient-to-br from-blush/20 to-parchment relative">
          {build.imageUrl ? (
            <img src={build.imageUrl} alt={build.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-50">
                {build.category === 'Mud Kitchens' ? '🍽️' :
                 build.category === 'Garden Beds' ? '🌱' :
                 build.category === 'Nature Play' ? '🦋' :
                 build.category === 'Climbing Structures' ? '🧗' :
                 build.category === 'Water Play' ? '💧' :
                 build.category === 'Cozy Hideouts' ? '🏕️' :
                 build.category === 'Weekend Builds' ? '🔨' : '✨'}
              </span>
            </div>
          )}
          {build.badge && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-ember/90 text-white text-[10px] font-medium uppercase rounded-full">
              {build.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-medium uppercase px-2 py-0.5 rounded-full ${difficultyColors[build.difficulty]}`}>
              {build.difficulty}
            </span>
            <span className="text-[10px] text-inkll">{build.timeEstimate}</span>
            <span className="text-[10px] text-inkll">·</span>
            <span className="text-[10px] text-inkll">Ages {build.ageRange}</span>
          </div>

          <h3 className="font-serif text-lg text-ink mb-1">{build.title}</h3>
          <p className="text-sm text-inkl line-clamp-2 mb-3">{build.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-ember font-medium">View guide →</span>
            {relatedBuilds.length > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowRelated(!showRelated)
                }}
                className="text-xs text-inkll hover:text-ember transition-colors"
              >
                {showRelated ? 'Hide' : relatedBuilds.length} related
              </button>
            )}
          </div>

          {/* Related Builds */}
          {showRelated && relatedBuilds.length > 0 && (
            <div className="mt-3 pt-3 border-t border-inkll/10">
              <p className="text-[10px] text-inkll uppercase tracking-wide mb-2">You might also like</p>
              <div className="space-y-2">
                {relatedBuilds.map(related => (
                  <Link
                    key={related.id}
                    to={`/wilder-homes/activities/${related.id}`}
                    className="flex items-center gap-2 text-xs text-ink hover:text-ember transition-colors p-2 -mx-2 rounded-lg hover:bg-cream"
                  >
                    <span className="w-1 h-1 rounded-full bg-ember flex-shrink-0" />
                    <span>{related.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
