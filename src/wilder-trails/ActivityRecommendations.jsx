import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getRecommendedActivities } from '../utils/activityRecommendations'

export default function ActivityRecommendations({ trailContext, location, season }) {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (!trailContext) return
    
    // Build context from trail data
    const context = {
      season: season || getCurrentSeason(),
      location: location || 'forest',
      trailDifficulty: trailContext.difficulty || 'easy',
      duration: trailContext.duration || 'short',
      childAges: trailContext.childAges || [5, 8], // default
      interests: trailContext.interests || []
    }
    
    // Simulate slight delay for "thinking" effect
    setTimeout(() => {
      const activities = getRecommendedActivities(context)
      setRecommendations(activities)
      setLoading(false)
    }, 800)
  }, [trailContext, location, season])
  
  const getCurrentSeason = () => {
    const month = new Date().getMonth()
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'fall'
    return 'winter'
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-inkll/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-ember/10 rounded-full animate-pulse" />
          <span className="text-inkl">Finding perfect activities...</span>
        </div>
        <div className="space-y-3">
          <div className="h-20 bg-cream rounded-xl animate-pulse" />
          <div className="h-20 bg-cream rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }
  
  if (recommendations.length === 0) return null
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-inkll/10">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h3 className="font-serif text-lg text-ink">Make This Hike Special</h3>
          <p className="text-xs text-inkl">Activities picked for your trail & season</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((activity, index) => (
          <motion.div
            key={activity.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-2 ${
              activity.type === 'magic-moment' 
                ? 'bg-olive/5 border-olive/20' 
                : 'bg-cream/50 border-inkll/10'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-serif text-ink">{activity.name}</h4>
              <span className="text-xs text-inkl bg-white px-2 py-1 rounded-full">
                {activity.duration}
              </span>
            </div>
            
            <p className="text-sm text-inkl mb-3">{activity.description}</p>
            
            {activity.materials && (
              <div className="flex items-center gap-1 text-xs text-inkll mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>{activity.materials}</span>
              </div>
            )}
            
            <div className="pt-2 border-t border-inkll/10">
              <div className="flex items-start gap-2">
                <span className="text-ember text-sm">✨</span>
                <p className="text-sm text-ember font-medium">{activity.magicMoment}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="text-xs text-inkll mt-4 text-center">
        Activities adapt to season, location, and your kids' ages
      </p>
    </div>
  )
}
