import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import { useRecommendations } from '../hooks/useRecommendations'
import HikeCard from './HikeCard'
import WeatherWidget from './WeatherWidget'

export default function HabitatPage() {
  const location = useLocation()
  const weather = useWeather(location.lat, location.lon)
  
  // Allow manual location override
  const [manualLocation, setManualLocation] = useState(null)
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  
  // Family preferences
  const [preferences, setPreferences] = useState({
    youngestAge: 5,
    hasStroller: false,
    wantsWater: true,
    wantsViews: true,
    wantsDogs: false,
    prefersFreeParking: true,
  })

  // Use manual location if set, otherwise use detected location
  const activeLocation = manualLocation || (location.lat ? location : null)
  
  const { hikes: recommendedHikes, weatherAssessment, message, isReady } = useRecommendations(
    activeLocation,
    weather,
    preferences
  )

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Manual location presets for common areas
  const locationPresets = [
    { name: 'Denver Metro', lat: 39.7392, lon: -104.9903 },
    { name: 'Boulder', lat: 40.0150, lon: -105.2705 },
    { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214 },
    { name: 'Fort Collins', lat: 40.5853, lon: -105.0844 },
    { name: 'Estes Park (RMNP)', lat: 40.3772, lon: -105.5217 },
    { name: 'Golden', lat: 39.7555, lon: -105.2211 },
  ]

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl text-ink mb-4"
          >
            The Habitat
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-inkl text-lg max-w-2xl"
          >
            Finding the right trail shouldn't take longer than the hike. 
            We know your family — and we've already found what's perfect for today.
          </motion.p>
        </header>

        {/* Location Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-blush/50 rounded-2xl p-4 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
                <span className="text-lg">📍</span>
              </div>
              <div>
                <p className="font-sans text-sm text-inkl">Your Location</p>
                <p className="font-sans font-medium text-ink">
                  {location.loading ? (
                    <span className="text-inkl italic">Finding you...</span>
                  ) : location.city && !manualLocation ? (
                    location.city
                  ) : manualLocation ? (
                    <span className="text-olive">Manual: {manualLocation.name}</span>
                  ) : location.error ? (
                    <span className="text-terra">{location.error}</span>
                  ) : (
                    <span className="text-inkl italic">Select location below</span>
                  )}
                </p>
              </div>
            </div>

            {/* Location Picker Toggle */}
            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="px-4 py-2 bg-ember text-white rounded-full font-sans text-sm hover:bg-terra transition-colors"
            >
              {showLocationPicker ? 'Hide Locations' : 'Change Location'}
            </button>
          </div>
          
          {/* Location Picker Dropdown */}
          {showLocationPicker && (
            <div className="mt-4 pt-4 border-t border-inkll/20">
              <p className="font-sans text-sm text-inkl mb-3">Choose an area to find nearby trails:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  onClick={() => {
                    setManualLocation(null)
                    setShowLocationPicker(false)
                  }}
                  className={`px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                    !manualLocation && location.lat
                      ? 'bg-ember text-white border-ember'
                      : 'bg-white border-inkll/20 text-ink hover:border-ember'
                  }`}
                >
                  📍 Auto-detect
                </button>
                {locationPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setManualLocation({ ...preset, city: preset.name, lat: preset.lat, lon: preset.lon })
                      setShowLocationPicker(false)
                    }}
                    className={`px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                      manualLocation?.name === preset.name
                        ? 'bg-ember text-white border-ember'
                        : 'bg-white border-inkll/20 text-ink hover:border-ember'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Family Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blush/50 rounded-2xl p-6 mb-8"
        >
          <h2 className="font-serif text-2xl text-ink mb-4">Your Family Profile</h2>
          <p className="font-sans text-inkl mb-4 text-sm">
            Tell us a bit about your crew and we'll find the perfect matches.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Youngest Age */}
            <div>
              <label className="block font-sans text-sm text-inkl mb-2">Youngest hiker</label>
              <select
                value={preferences.youngestAge}
                onChange={(e) => setPreferences(prev => ({ ...prev, youngestAge: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-inkll/20 font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ember"
              >
                <option value={1}>Baby (0-1)</option>
                <option value={2}>Toddler (2-3)</option>
                <option value={4}>Preschool (4-5)</option>
                <option value={6}>Early Elementary (6-7)</option>
                <option value={8}>Elementary (8+)</option>
              </select>
            </div>

            {/* Toggle Preferences */}
            <div>
              <label className="block font-sans text-sm text-inkl mb-2">Gear</label>
              <button
                onClick={() => togglePreference('hasStroller')}
                className={`w-full px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                  preferences.hasStroller
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                {preferences.hasStroller ? '🚼 Stroller' : '🚶 No stroller'}
              </button>
            </div>

            <div>
              <label className="block font-sans text-sm text-inkl mb-2">Water features</label>
              <button
                onClick={() => togglePreference('wantsWater')}
                className={`w-full px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                  preferences.wantsWater
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                {preferences.wantsWater ? '💧 Want water' : 'No water needed'}
              </button>
            </div>

            <div>
              <label className="block font-sans text-sm text-inkl mb-2">Views</label>
              <button
                onClick={() => togglePreference('wantsViews')}
                className={`w-full px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                  preferences.wantsViews
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                {preferences.wantsViews ? '🏔️ Want views' : 'Views optional'}
              </button>
            </div>

            <div>
              <label className="block font-sans text-sm text-inkl mb-2">Dogs</label>
              <button
                onClick={() => togglePreference('wantsDogs')}
                className={`w-full px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                  preferences.wantsDogs
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                {preferences.wantsDogs ? '🐕 Bringing dog' : 'No dogs'}
              </button>
            </div>

            <div>
              <label className="block font-sans text-sm text-inkl mb-2">Parking</label>
              <button
                onClick={() => togglePreference('prefersFreeParking')}
                className={`w-full px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                  preferences.prefersFreeParking
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                {preferences.prefersFreeParking ? '🅿️ Free only' : 'Any parking'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        {!activeLocation ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blush/50 rounded-2xl p-12 text-center"
          >
            <span className="text-5xl mb-4 block">🗺️</span>
            <h3 className="font-serif text-2xl text-ink mb-2">Select Your Location</h3>
            <p className="font-sans text-inkl mb-6">
              Enable location access or pick an area above to see personalized trail recommendations.
            </p>
          </motion.div>
        ) : isReady ? (
          <>
            {/* Weather Assessment Message */}
            {weatherAssessment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`rounded-2xl p-6 mb-8 ${
                  weatherAssessment.score >= 80
                    ? 'bg-olive/10 border border-olive/20'
                    : weatherAssessment.score >= 50
                    ? 'bg-gold/10 border border-gold/20'
                    : 'bg-terra/10 border border-terra/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{weatherAssessment.icon}</span>
                  <div>
                    <h3 className="font-serif text-xl text-ink mb-1">
                      {weatherAssessment.label} {location.city ? `in ${location.city}` : 'for hiking'}
                    </h3>
                    <p className="font-sans text-inkl">{weatherAssessment.advice}</p>
                    {message && (
                      <p className="font-sans text-ink mt-2 font-medium">{message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recommended Trails */}
            {recommendedHikes.length > 0 ? (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-ink">Perfect for You Today</h2>
                  <span className="font-sans text-sm text-inkl">
                    Sorted by match
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedHikes.map((hike, index) => (
                    <motion.div
                      key={hike.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <HikeCard hike={hike} index={index} showDistance={true} />
                      
                      {/* Match Reasons */}
                      {hike.reasons && hike.reasons.length > 0 && (
                        <div className="mt-2 px-4 py-3 bg-blush/30 rounded-b-xl -mt-2">
                          <div className="flex flex-wrap gap-2">
                            {hike.reasons.map((reason, i) => (
                              <span key={i} className="font-sans text-xs text-inkl bg-white/60 px-2 py-1 rounded-full">
                                {reason}
                              </span>
                            ))}
                            {hike.distance && (
                              <span className="font-sans text-xs text-inkl bg-white/60 px-2 py-1 rounded-full">
                                {hike.distance} mi away
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="/explore"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors"
                  >
                    See all {hikes.length - recommendedHikes.length} more trails
                    <span>→</span>
                  </a>
                </div>
              </section>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blush/50 rounded-2xl p-12 text-center"
              >
                <span className="text-5xl mb-4 block">🌧️</span>
                <h3 className="font-serif text-2xl text-ink mb-2">Not the best day for hiking</h3>
                <p className="font-sans text-inkl mb-6">
                  {weatherAssessment?.level === 'storm'
                    ? "Storms aren't safe for outdoor adventures. Let's make today a Base Camp day instead."
                    : weatherAssessment?.level === 'rain' || weatherAssessment?.level === 'snow'
                    ? "The weather isn't cooperating, but there's plenty to explore inside."
                    : "We couldn't find trails matching your criteria. Try adjusting your preferences."}
                </p>
                <a
                  href="/builds"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors"
                >
                  Explore Base Camp activities
                  <span>→</span>
                </a>
              </motion.div>
            )}
          </>
        ) : location.loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-ember/30 border-t-ember rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-sans text-inkl">Finding your perfect trails...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blush/50 rounded-2xl p-12 text-center"
          >
            <span className="text-5xl mb-4 block">🗺️</span>
            <h3 className="font-serif text-2xl text-ink mb-2">Select Your Location</h3>
            <p className="font-sans text-inkl mb-6">
              Enable location access or pick an area above to see personalized trail recommendations.
            </p>
          </motion.div>
        )}

        {/* Why This Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/50 rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">🗺️</span>
            <h3 className="font-serif text-lg text-ink mb-2">Location Aware</h3>
            <p className="font-sans text-sm text-inkl">
              We find trails near you, not just generic lists from across the state.
            </p>
          </div>
          <div className="bg-white/50 rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">🌤️</span>
            <h3 className="font-serif text-lg text-ink mb-2">Weather Smart</h3>
            <p className="font-sans text-sm text-inkl">
              Recommendations shift with conditions — shade on hot days, sunny on cold.
            </p>
          </div>
          <div className="bg-white/50 rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">👨‍👩‍👧‍👦</span>
            <h3 className="font-serif text-lg text-ink mb-2">Family Focused</h3>
            <p className="font-sans text-sm text-inkl">
              Strollers, ages, energy levels — we match to your actual crew.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
