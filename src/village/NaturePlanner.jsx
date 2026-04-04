import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hikes } from '../habitat/hikes'
import { crafts } from '../basecamp/crafts'
import { builds } from '../basecamp/builds'

const STORAGE_KEY = 'nature-planner-state'

const WEEK_VIBES = {
  spring: [
    "Spring Rainy Days",
    "Wildflower Season",
    "Muddy Adventures",
    "April Showers Hikes"
  ],
  summer: [
    "Summer Mornings",
    "Hot Day Escapes",
    "Water Play Days",
    "Longer Light Evenings"
  ],
  fall: [
    "Leaf Crunching Days",
    "Harvest Nature Walk",
    "Cozy Outdoor Crafts",
    "Fall Exploration"
  ],
  winter: [
    "Frosty Morning Walks",
    "Indoor Nature Crafts",
    "Winter Wonder Short Hikes",
    "Bundle Up Adventures"
  ]
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const TIME_OPTIONS = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '1 hour' },
  { value: 120, label: '2 hours' },
  { value: 240, label: 'Half day' },
  { value: 480, label: 'Full day' }
]

const INTEREST_OPTIONS = [
  { id: 'hiking', label: 'Hiking', icon: '🥾' },
  { id: 'crafts', label: 'Crafts', icon: '🎨' },
  { id: 'building', label: 'Building', icon: '🔨' },
  { id: 'water', label: 'Water', icon: '💧' },
  { id: 'nature', label: 'Nature', icon: '🍃' }
]

const AGE_OPTIONS = [
  { value: '2', label: '2 years' },
  { value: '3', label: '3 years' },
  { value: '4', label: '4 years' },
  { value: '5', label: '5 years' },
  { value: '6', label: '6 years' },
  { value: '7', label: '7 years' },
  { value: '8', label: '8 years' },
  { value: '9', label: '9 years' },
  { value: '10', label: '10 years' },
  { value: '11', label: '11 years' },
  { value: '12', label: '12+ years' }
]

const getSeason = () => {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

const getWeekVibe = () => {
  const season = getSeason()
  const vibes = WEEK_VIBES[season]
  return vibes[Math.floor(Math.random() * vibes.length)]
}

const parseAgeRange = (ageRange) => {
  if (!ageRange) return { min: 0, max: 99 }
  if (ageRange.includes('+')) {
    const min = parseInt(ageRange.replace('+', ''))
    return { min, max: 99 }
  }
  const [min, max] = ageRange.split('-').map(n => parseInt(n))
  return { min: min || 0, max: max || 99 }
}

const parseDuration = (duration) => {
  if (!duration) return 0
  const match = duration.toString().match(/(\d+)/)
  if (!match) return 0
  return parseInt(match[1])
}

const filterActivities = (activities, filters, interestType) => {
  return activities.filter(activity => {
    // Age filter
    const ageRange = parseAgeRange(activity.ageRange)
    if (filters.youngestAge < ageRange.min || filters.oldestAge > ageRange.max) {
      return false
    }

    // Time filter
    let activityDuration
    if (interestType === 'hiking') {
      activityDuration = activity.duration
    } else if (interestType === 'crafts') {
      activityDuration = parseDuration(activity.duration)
    } else if (interestType === 'building') {
      activityDuration = parseDuration(activity.timeEstimate)
    }

    if (activityDuration > filters.availableTime) {
      return false
    }

    // Interest-specific filters
    if (interestType === 'hiking' && filters.interests.water && !activity.hasWater) {
      return false
    }

    return true
  })
}

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const getActivityWhy = (activity, filters, interestType) => {
  const reasons = {
    hiking: [
      `Perfect for ages ${filters.youngestAge}-${filters.oldestAge}`,
      'Great for the whole family',
      'Beautiful scenery await',
      'Easy terrain for young legs'
    ],
    crafts: [
      'Minimal materials needed',
      'Quick and satisfying project',
      'Creative outdoor activity',
      'Fun for the whole family'
    ],
    building: [
      'Weekend project the kids can help with',
      'Uses simple materials',
      'Builds imagination and skills',
      'Creates lasting memories'
    ]
  }
  const options = reasons[interestType] || reasons.crafts
  return options[Math.floor(Math.random() * options.length)]
}

const NaturePlanner = () => {
  const [youngestAge, setYoungestAge] = useState('3')
  const [oldestAge, setOldestAge] = useState('8')
  const [availableTime, setAvailableTime] = useState(60)
  const [interests, setInterests] = useState({
    hiking: true,
    crafts: true,
    building: true,
    water: false,
    nature: true
  })
  const [weekPlan, setWeekPlan] = useState([])
  const [weekVibe, setWeekVibe] = useState('')
  const [isGenerated, setIsGenerated] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setYoungestAge(parsed.youngestAge || '3')
        setOldestAge(parsed.oldestAge || '8')
        setAvailableTime(parsed.availableTime || 60)
        setInterests(parsed.interests || { hiking: true, crafts: true, building: true, water: false, nature: true })
      } catch (e) {
        console.warn('Failed to load saved preferences')
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    const state = { youngestAge, oldestAge, availableTime, interests }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [youngestAge, oldestAge, availableTime, interests])

  const generatePlan = useCallback(() => {
    const filters = {
      youngestAge: parseInt(youngestAge),
      oldestAge: parseInt(oldestAge),
      availableTime,
      interests
    }

    const plan = []
    const usedActivities = new Set()

    // Get available activity pools based on interests
    const pools = []
    if (interests.hiking) {
      const hikingActivities = filterActivities(hikes, filters, 'hiking')
      pools.push(...hikingActivities.map(a => ({ ...a, type: 'hiking' })))
    }
    if (interests.crafts) {
      const craftActivities = filterActivities(crafts, filters, 'crafts')
      pools.push(...craftActivities.map(a => ({ ...a, type: 'crafts' })))
    }
    if (interests.building) {
      const buildActivities = builds.filter(b => {
        const ageRange = parseAgeRange(b.ageRange)
        if (filters.youngestAge < ageRange.min || filters.oldestAge > ageRange.max) {
          return false
        }
        const duration = parseDuration(b.timeEstimate)
        return duration <= filters.availableTime * 3 // Building projects can take longer
      })
      pools.push(...buildActivities.map(a => ({ ...a, type: 'building' })))
    }

    const shuffledPools = shuffleArray(pools)

    // Generate 7 days
    DAYS_OF_WEEK.forEach((day, index) => {
      const dayActivities = []
      const dayDuration = 0

      // Add 1-2 activities per day
      const numActivities = Math.random() > 0.3 ? 2 : 1

      for (let i = 0; i < numActivities; i++) {
        const poolIndex = (index * numActivities + i) % shuffledPools.length
        const available = shuffledPools.filter(
          (a, idx) => !usedActivities.has(a.id) && idx >= poolIndex
        )

        if (available.length > 0) {
          const activity = available[0]
          usedActivities.add(activity.id)
          dayActivities.push({
            ...activity,
            why: getActivityWhy(activity, filters, activity.type)
          })
        }
      }

      if (dayActivities.length > 0) {
        plan.push({ day, activities: dayActivities })
      }
    })

    setWeekPlan(plan)
    setWeekVibe(getWeekVibe())
    setIsGenerated(true)
  }, [youngestAge, oldestAge, availableTime, interests])

  const handleInterestToggle = (interest) => {
    setInterests(prev => ({ ...prev, [interest]: !prev[interest] }))
  }

  const handleShuffle = () => {
    generatePlan()
  }

  const handleSaveScreenshot = () => {
    // Create a simple print-friendly view
    window.print()
  }

  const ActivityIcon = ({ type }) => {
    switch (type) {
      case 'hiking':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      case 'crafts':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      case 'building':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      default:
        return null
    }
  }

  const getActivityDuration = (activity) => {
    switch (activity.type) {
      case 'hiking':
        return activity.durationLabel
      case 'crafts':
        return activity.duration
      case 'building':
        return activity.timeEstimate
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest text-cream py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl mb-2">Nature Planner</h1>
          <p className="font-sans text-cream/80 text-sm">
            Plan your week of outdoor adventures
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Inputs Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="font-serif text-xl text-ember mb-4">Tell us about your crew</h2>

          {/* Age Range */}
          <div className="mb-6">
            <label className="block font-sans text-sm text-ink mb-2">Kids' ages</label>
            <div className="flex gap-4">
              <select
                value={youngestAge}
                onChange={(e) => setYoungestAge(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-inkll bg-cream font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ember/50"
              >
                <option value="">Youngest</option>
                {AGE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <span className="self-center text-inkll">to</span>
              <select
                value={oldestAge}
                onChange={(e) => setOldestAge(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-inkll bg-cream font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ember/50"
              >
                <option value="">Oldest</option>
                {AGE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Available Time */}
          <div className="mb-6">
            <label className="block font-sans text-sm text-ink mb-2">Available time</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {TIME_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAvailableTime(opt.value)}
                  className={`px-3 py-2.5 rounded-xl font-sans text-sm transition-all ${
                    availableTime === opt.value
                      ? 'bg-ember text-white'
                      : 'bg-blush text-ink hover:bg-peach/30'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label className="block font-sans text-sm text-ink mb-2">What sounds fun?</label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleInterestToggle(opt.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-sm transition-all ${
                    interests[opt.id]
                      ? 'bg-ember text-white'
                      : 'bg-blush text-ink hover:bg-peach/30'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePlan}
            className="w-full py-4 rounded-xl bg-ember text-white font-sans font-medium text-lg hover:bg-terra transition-colors"
          >
            Generate My Week Plan
          </button>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Week Vibe Title */}
              <div className="text-center mb-6">
                <p className="font-sans text-sm text-inkll uppercase tracking-wider mb-1">
                  This week's vibe
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-ember italic">
                  {weekVibe}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleShuffle}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blush text-ink font-sans font-medium hover:bg-peach/50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Shuffle
                </button>
                <button
                  onClick={handleSaveScreenshot}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-olive text-white font-sans font-medium hover:opacity-90 transition-opacity"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  Save
                </button>
              </div>

              {/* Week Plan */}
              <div className="space-y-4">
                {weekPlan.map((dayPlan, dayIndex) => (
                  <motion.div
                    key={dayPlan.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dayIndex * 0.1 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    {/* Day Header */}
                    <div className="bg-ember/10 px-5 py-3 border-b border-inkll/20">
                      <h4 className="font-serif text-lg text-ember">{dayPlan.day}</h4>
                    </div>

                    {/* Activities */}
                    <div className="divide-y divide-inkll/10">
                      {dayPlan.activities.map((activity, actIndex) => (
                        <div key={activity.id} className="p-5">
                          <div className="flex gap-4">
                            {/* Activity Type Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              activity.type === 'hiking' ? 'bg-olive/20 text-olive' :
                              activity.type === 'crafts' ? 'bg-peach/30 text-terra' :
                              'bg-gold/20 text-gold'
                            }`}>
                              <ActivityIcon type={activity.type} />
                            </div>

                            {/* Activity Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h5 className="font-serif text-lg text-ink leading-tight">
                                  {activity.title}
                                </h5>
                                <span className={`text-xs font-sans px-2 py-1 rounded-full flex-shrink-0 ${
                                  activity.type === 'hiking' ? 'bg-olive/20 text-olive' :
                                  activity.type === 'crafts' ? 'bg-peach/30 text-terra' :
                                  'bg-gold/20 text-gold'
                                }`}>
                                  {activity.type === 'hiking' ? '🥾 Hike' :
                                   activity.type === 'crafts' ? '🎨 Craft' :
                                   '🔨 Build'}
                                </span>
                              </div>

                              <p className="font-sans text-sm text-inkl mb-2">
                                {getActivityDuration(activity)} • Ages {activity.ageRange}
                              </p>

                              <p className="font-sans text-sm text-inkll italic">
                                "{activity.why}"
                              </p>
                            </div>
                          </div>

                          {/* Activity Details (Hiking) */}
                          {activity.type === 'hiking' && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {activity.dogsAllowed && (
                                <span className="text-xs font-sans px-2 py-1 rounded-full bg-blush text-inkll">
                                  🐕 Dogs OK
                                </span>
                              )}
                              {activity.hasWater && (
                                <span className="text-xs font-sans px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                  💧 Water
                                </span>
                              )}
                              {activity.hasViews && (
                                <span className="text-xs font-sans px-2 py-1 rounded-full bg-blush text-inkll">
                                  👁️ Views
                                </span>
                              )}
                              <span className={`text-xs font-sans px-2 py-1 rounded-full ${
                                activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                activity.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {activity.difficulty}
                              </span>
                            </div>
                          )}

                          {/* Activity Details (Crafts) */}
                          {activity.type === 'crafts' && (
                            <div className="mt-3">
                              <p className="text-xs font-sans text-inkll">
                                📦 {activity.materials?.slice(0, 3).join(', ')}
                                {activity.materials?.length > 3 && '...'}
                              </p>
                            </div>
                          )}

                          {/* Activity Details (Building) */}
                          {activity.type === 'building' && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="text-xs font-sans px-2 py-1 rounded-full bg-blush text-inkll">
                                ⏱️ {activity.timeEstimate}
                              </span>
                              <span className="text-xs font-sans px-2 py-1 rounded-full bg-blush text-inkll">
                                💰 {activity.cost}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {weekPlan.length === 0 && (
                <div className="text-center py-12">
                  <p className="font-sans text-inkll mb-4">
                    No activities match your criteria. Try adjusting your filters!
                  </p>
                  <button
                    onClick={() => setInterests({ hiking: true, crafts: true, building: true, water: false, nature: true })}
                    className="px-6 py-2 rounded-xl bg-ember text-white font-sans hover:bg-terra transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial State */}
        {!isGenerated && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blush flex items-center justify-center">
              <span className="text-4xl">🌿</span>
            </div>
            <p className="font-sans text-inkl">
              Fill in your details above and hit "Generate" to create your personalized week plan!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NaturePlanner
