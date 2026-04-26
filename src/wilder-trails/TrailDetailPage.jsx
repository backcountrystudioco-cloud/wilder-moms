import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { hikes } from './hikes'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import HourlyWeather from './HourlyWeather'
import SmartChecklist from '../blueprint/SmartChecklist'
import { packLists } from '../blueprint/packLists'

// Get weather-based pack recommendations
function getWeatherPackRecommendations(weather, tempF, elevation) {
  const recommendations = []
  
  // Temperature-based items
  if (tempF > 85) {
    recommendations.push({ item: 'Extra water bottles', reason: 'Hot weather - stay extra hydrated', priority: 'high' })
    recommendations.push({ item: 'Sunscreen', reason: 'Sun protection essential', priority: 'high' })
    recommendations.push({ item: 'Hat with brim', reason: 'Shade for you and kids', priority: 'high' })
    recommendations.push({ item: 'Cooling towel', reason: 'Quick cooling option', priority: 'medium' })
  }
  
  if (tempF < 50) {
    recommendations.push({ item: 'Warm layers', reason: 'Temperature drops on trail', priority: 'high' })
    recommendations.push({ item: 'Packable jacket', reason: 'Wind protection', priority: 'high' })
    recommendations.push({ item: 'Extra socks', reason: 'Keep feet warm and dry', priority: 'medium' })
  }
  
  if (tempF < 35) {
    recommendations.push({ item: 'Hand warmers', reason: 'Keep extremities warm', priority: 'high' })
    recommendations.push({ item: 'Balaclava or neck gaiter', reason: 'Face protection', priority: 'high' })
  }
  
  // Weather condition based
  if (weather?.level === 'rain' || weather?.level === 'drizzle') {
    recommendations.push({ item: 'Rain jackets', reason: 'Stay dry in changing weather', priority: 'high' })
    recommendations.push({ item: 'Waterproof boots', reason: 'Muddy trail conditions', priority: 'high' })
    recommendations.push({ item: 'Pack cover', reason: 'Protect gear from rain', priority: 'medium' })
  }
  
  if (weather?.level === 'snow') {
    recommendations.push({ item: 'Snow boots', reason: 'Traction in snow', priority: 'high' })
    recommendations.push({ item: 'Snow pants', reason: 'Keep kids warm and dry', priority: 'high' })
  }
  
  // Elevation-based items
  if (elevation > 500) {
    recommendations.push({ item: 'Snacks with electrolytes', reason: 'High elevation - extra energy', priority: 'high' })
    recommendations.push({ item: 'First aid kit', reason: 'Remote location', priority: 'high' })
  }
  
  if (elevation > 1000) {
    recommendations.push({ item: 'Emergency blanket', reason: 'Weather can change quickly at elevation', priority: 'high' })
    recommendations.push({ item: 'Map/GPS', reason: 'Trail markers may be snow-covered', priority: 'high' })
  }
  
  return recommendations
}

// Get difficulty-appropriate pack items
function getDifficultyPackItems(difficulty, duration) {
  let baseItems = []
  
  switch (difficulty) {
    case 'easy':
      baseItems = packLists.dayHikeEssentials.slice(0, 8)
      break
    case 'moderate':
      baseItems = packLists.dayHikeEssentials.slice(0, 10)
      break
    case 'challenging':
      baseItems = packLists.dayHikeEssentials
      break
    default:
      baseItems = packLists.dayHikeEssentials.slice(0, 8)
  }
  
  // Add duration-appropriate items
  if (duration > 90) {
    baseItems.push('Trail snacks for longer hike')
    baseItems.push('Water for 2+ hours')
  }
  
  return baseItems
}

const difficultyColors = {
  easy: 'bg-olive/20 text-forest border-olive',
  moderate: 'bg-gold/20 text-ink border-gold',
  challenging: 'bg-ember/20 text-ember border-ember',
}

const difficultyLabels = {
  easy: 'Easy',
  moderate: 'Moderate',
  challenging: 'Challenging',
}

export default function TrailDetailPage() {
  const { trailId } = useParams()
  const location = useLocation()
  const weather = useWeather(location.lat, location.lon)
  
  const [checkedItems, setCheckedItems] = useState([])
  const [showPackList, setShowPackList] = useState(false)
  
  // Find the hike by ID
  const hike = useMemo(() => {
    return hikes.find(h => h.id === trailId)
  }, [trailId])
  
  // Get weather-based recommendations
  const weatherRecommendations = useMemo(() => {
    if (!weather || !weather.temp) return []
    return getWeatherPackRecommendations(weather, weather.temp, hike?.elevation || 0)
  }, [weather, hike?.elevation])
  
  // Get difficulty-based pack list
  const basePackItems = useMemo(() => {
    if (!hike) return []
    return getDifficultyPackItems(hike.difficulty, hike.duration)
  }, [hike])
  
  // Combined pack list
  const combinedPackList = useMemo(() => {
    const combined = [...basePackItems]
    weatherRecommendations.forEach(rec => {
      if (!combined.some(item => item.toLowerCase().includes(rec.item.toLowerCase()))) {
        combined.push(rec.item)
      }
    })
    return combined
  }, [basePackItems, weatherRecommendations])
  
  const handleToggleItem = (index) => {
    setCheckedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }
  
  if (!hike) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl text-ink mb-4">Trail Not Found</h1>
          <p className="font-sans text-inkl mb-8">We couldn't find the trail you're looking for.</p>
          <Link
            to="/wilder-trails"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors"
          >
            Back to Wilder Trails
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-cream pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/wilder-trails"
          className="inline-flex items-center gap-2 text-inkl hover:text-ember transition-colors font-sans text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all trails
        </Link>
        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-sans font-medium mb-4 ${difficultyColors[hike.difficulty]}`}>
            {difficultyLabels[hike.difficulty]}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            {hike.title}
          </h1>
          <p className="font-sans text-inkl text-lg">
            {hike.region}, {hike.state}
          </p>
        </motion.header>
        
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-inkll/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-serif text-ember">{hike.distance}</p>
              <p className="text-inkl font-sans text-sm">miles</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif text-ember">{hike.elevationLabel}</p>
              <p className="text-inkl font-sans text-sm">elevation</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif text-ember">{hike.durationLabel}</p>
              <p className="text-inkl font-sans text-sm">duration</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif text-ember">{hike.ageRange}</p>
              <p className="text-inkl font-sans text-sm">ages</p>
            </div>
          </div>
        </motion.div>
        
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="font-sans text-inkl text-lg leading-relaxed">
            {hike.description}
          </p>
        </motion.div>
        
        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="font-serif text-2xl text-ink mb-4">Trail Features</h2>
          <div className="flex flex-wrap gap-2">
            {hike.strollerFriendly && (
              <span className="px-4 py-2 rounded-full bg-olive/20 text-forest font-sans text-sm">
                ✓ Stroller Friendly
              </span>
            )}
            {hike.dogsAllowed && (
              <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-sans text-sm">
                ✓ Dogs Welcome
              </span>
            )}
            {hike.hasWater && (
              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-sans text-sm">
                ✓ Water Features
              </span>
            )}
            {hike.hasViews && (
              <span className="px-4 py-2 rounded-full bg-olive/20 text-forest font-sans text-sm">
                ✓ Scenic Views
              </span>
            )}
            {hike.isPaved && (
              <span className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-sans text-sm">
                ✓ Paved Path
              </span>
            )}
            {hike.restrooms && (
              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 font-sans text-sm">
                ✓ Restrooms
              </span>
            )}
          </div>
        </motion.div>
        
        {/* Weather Integration */}
        {weather.temp !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="font-serif text-2xl text-ink mb-4">Current Conditions</h2>
            <div className="bg-blush/40 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-serif text-4xl text-ink">{weather.temp}°F</p>
                  <p className="text-inkl capitalize">{weather.description || 'Clear conditions'}</p>
                </div>
                <div className="text-right">
                  <p className="text-inkl text-sm">Best time: </p>
                  <p className="font-sans font-medium text-ember">All day</p>
                </div>
              </div>
              
              {weather.hourly && weather.hourly.length > 0 && (
                <HourlyWeather hourly={weather.hourly} currentHour={new Date().getHours()} />
              )}
            </div>
          </motion.div>
        )}
        
        {/* Weather-Based Pack Recommendations */}
        {weatherRecommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <h2 className="font-serif text-2xl text-ink mb-4">Smart Pack List for Today</h2>
            <p className="font-sans text-inkl mb-4">
              Based on current weather ({weather?.temp}°F) and {hike.elevationLabel} elevation
            </p>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
              <div className="flex flex-wrap gap-2">
                {weatherRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-4 py-2 rounded-full font-sans text-sm ${
                      rec.priority === 'high' 
                        ? 'bg-ember/20 text-ember border border-ember/30' 
                        : 'bg-blush/50 text-inkl border border-blush/30'
                    }`}
                  >
                    {rec.item}
                    <span className="block text-xs text-inkl/70 mt-0.5">{rec.reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Full Pack List Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowPackList(!showPackList)}
            className="w-full flex items-center justify-between px-6 py-4 bg-ember text-white rounded-xl font-sans font-medium hover:bg-terra transition-colors"
          >
            <span>Full Pack List ({combinedPackList.length} items)</span>
            <svg 
              className={`w-5 h-5 transition-transform ${showPackList ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showPackList && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <SmartChecklist
                items={combinedPackList}
                checkedItems={checkedItems}
                onToggle={handleToggleItem}
                title="My Pack List"
                listType="mylist"
              />
            </motion.div>
          )}
        </motion.div>
        
        {/* Get Directions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${hike.lat},${hike.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ember text-white rounded-full font-sans font-medium text-lg hover:bg-terra transition-colors shadow-lg shadow-ember/20"
          >
            Get Directions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
