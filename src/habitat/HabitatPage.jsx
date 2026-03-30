import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import { useRecommendations } from '../hooks/useRecommendations'
import HikeCard from './HikeCard'
import WeatherWidget from './WeatherWidget'

// Time context helper
function getTimeContext() {
  const hour = new Date().getHours();
  if (hour < 10) return 'early';
  if (hour < 14) return 'midday';
  if (hour < 17) return 'late';
  return 'evening';
}

// Get time-based recommendation message
function getTimeMessage(timeContext, weatherLevel) {
  const messages = {
    early: {
      perfect: "Early start = best conditions! Trails are cool and quiet.",
      cloudy: "Morning hiking is ideal - trails will be peaceful.",
      hot: "Start early to beat the heat. Shade trails recommended.",
      cold: "Bundle up! Morning sun will warm you up as you hike.",
      drizzle: "Early drizzle expected - might clear by midday.",
      default: "Great time to start your adventure!"
    },
    midday: {
      perfect: "Perfect timing for a midday adventure!",
      cloudy: "Great conditions for a full day outside.",
      hot: "It's hot - prioritize shaded trails and water breaks.",
      cold: "Bundle up! Layers needed for comfortable hiking.",
      drizzle: "Light rain possible - waterproof layers recommended.",
      rain: "Rain expected - consider indoor alternatives.",
      default: "Good time for outdoor exploration."
    },
    late: {
      perfect: "Perfect afternoon for a family hike!",
      cloudy: "Overcast skies mean comfortable hiking conditions.",
      hot: "Cooling down - still a great time for a shorter trail.",
      cold: "Temps dropping - shorter trails recommended for afternoon.",
      drizzle: "Rain likely later - get out now before it starts.",
      rain: "Rain expected - maybe a Base Camp afternoon?",
      default: "Nice time for an outdoor adventure!"
    },
    evening: {
      perfect: "Quick evening hike before dinner?",
      cloudy: "Still time for a short evening stroll.",
      hot: "Perfect cooling off weather for evening walk.",
      cold: "Getting chilly - keep it short and warm.",
      drizzle: "Skip the evening hike, try tomorrow.",
      rain: "Not ideal evening conditions - maybe craft night?",
      default: "Good time for a short family walk."
    }
  };
  
  const weatherMessages = messages[timeContext];
  return weatherMessages[weatherLevel] || weatherMessages.default;
}

// Get best hike window based on weather
function getBestWindow(weather, timeContext) {
  if (weather.level === 'storm') return { label: 'Stay indoors', icon: '🏠', message: "Safety first today." };
  if (weather.level === 'rain') return { label: 'Indoor day', icon: '🎨', message: "Try a Base Camp activity instead." };
  if (weather.level === 'snow') return { label: 'Snow play', icon: '❄️', message: "Perfect for snow adventures!" };
  
  if (weather.level === 'hot') {
    if (timeContext === 'early') return { label: 'NOW', icon: '🌅', message: "Cool morning - best time to start!" };
    return { label: 'Early AM', icon: '⏰', message: "Before 10am for cooler temps" };
  }
  
  if (weather.level === 'perfect' || weather.level === 'cloudy') {
    return { label: 'All day', icon: '☀️', message: "Go whenever works for you!" };
  }
  
  if (weather.level === 'drizzle') {
    return { label: 'Now is OK', icon: '🌦️', message: "Light rain - bring layers" };
  }
  
  if (weather.level === 'drizzle-cold') {
    return { label: 'Wait for sun', icon: '⏳', message: "Warmer temps expected later" };
  }
  
  return { label: 'This afternoon', icon: '🕐', message: "Best conditions expected" };
}

// Elevation appropriateness
function getElevationAdvice(tempF, elevation) {
  if (tempF > 85) {
    if (elevation > 500) return { text: "High elevation + heat = tough", icon: '😅', avoid: true };
    if (elevation > 200) return { text: "Moderate elevation - stay hydrated", icon: '💧', avoid: false };
  }
  if (tempF < 45) {
    if (elevation > 500) return { text: "High elevation = cold + wind", icon: '🥶', avoid: true };
  }
  return null;
}

export default function HabitatPage() {
  const location = useLocation()
  const weather = useWeather(location.lat, location.lon)
  
  // State
  const [manualLocation, setManualLocation] = useState(null)
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  
  // Family preferences
  const [preferences, setPreferences] = useState({
    youngestAge: 5,
    hasStroller: false,
    wantsWater: true,
    wantsViews: true,
    wantsDogs: false,
    prefersFreeParking: true,
  })

  // Derived values
  const activeLocation = manualLocation || (location.lat ? location : null)
  const timeContext = getTimeContext()
  const { hikes: recommendedHikes, weatherAssessment, message, isReady } = useRecommendations(
    activeLocation,
    weather,
    preferences
  )

  // Location presets
  const locationPresets = [
    { name: 'Denver Metro', lat: 39.7392, lon: -104.9903 },
    { name: 'Boulder', lat: 40.0150, lon: -105.2705 },
    { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214 },
    { name: 'Fort Collins', lat: 40.5853, lon: -105.0844 },
    { name: 'Estes Park (RMNP)', lat: 40.3772, lon: -105.5217 },
    { name: 'Golden', lat: 39.7555, lon: -105.2211 },
  ]

  // Toggle preference helper
  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Best window for hiking
  const bestWindow = useMemo(() => {
    if (!weatherAssessment) return null;
    return getBestWindow(weatherAssessment, timeContext);
  }, [weatherAssessment, timeContext]);

  // Time-based message
  const timeMessage = useMemo(() => {
    if (!weatherAssessment) return "Pick a location to get started!";
    return getTimeMessage(timeContext, weatherAssessment.level);
  }, [weatherAssessment, timeContext]);

  // Elevation advice
  const elevationAdvice = useMemo(() => {
    if (!weather.temp) return null;
    return getElevationAdvice(weather.temp, 300); // Using average elevation
  }, [weather.temp]);

  // Score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-olive';
    if (score >= 50) return 'bg-gold';
    return 'bg-terra';
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Your Habitat
          </h1>
          <p className="font-sans text-inkl text-lg max-w-2xl">
            Trails found just for you, based on where you are, how long you have, and what your family needs.
          </p>
        </motion.header>

        {/* Adventure Readiness Score */}
        {isReady && weatherAssessment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className={`rounded-2xl p-6 ${weatherAssessment.score >= 80 ? 'bg-olive/10 border border-olive/20' : weatherAssessment.score >= 50 ? 'bg-gold/10 border border-gold/20' : 'bg-terra/10 border border-terra/20'}`}>
              <div className="flex items-center justify-between flex-wrap gap-6">
                {/* Score gauge */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="stroke-inkll/20"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`stroke-ember ${getScoreColor(weatherAssessment.score)}`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${weatherAssessment.score}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-2xl text-ink">{weatherAssessment.score}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-inkl uppercase tracking-wide">Adventure Score</p>
                    <p className="font-serif text-xl text-ink">{weatherAssessment.label}</p>
                    <p className="font-sans text-sm text-inkl">{timeMessage}</p>
                  </div>
                </div>

                {/* Best window */}
                {bestWindow && (
                  <div className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3">
                    <span className="text-2xl">{bestWindow.icon}</span>
                    <div>
                      <p className="font-sans text-xs text-inkl uppercase">Best time</p>
                      <p className="font-sans font-medium text-ink">{bestWindow.label}</p>
                      <p className="font-sans text-xs text-inkl">{bestWindow.message}</p>
                    </div>
                  </div>
                )}

                {/* Current conditions */}
                {weather.temp !== null && (
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="text-3xl">{weatherAssessment?.icon || '🌤️'}</span>
                      <p className="font-sans text-2xl font-medium text-ink">{weather.temp}°F</p>
                      <p className="font-sans text-xs text-inkl">Current temp</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Weather advice */}
              <div className="mt-4 pt-4 border-t border-inkll/20">
                <p className="font-sans text-inkl">{weatherAssessment.advice}</p>
                {message && <p className="font-sans text-ink mt-1 font-medium">{message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Location Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-blush/50 rounded-2xl p-4 mb-6"
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
                    <span className="text-olive">{manualLocation.name}</span>
                  ) : location.error ? (
                    <span className="text-terra">{location.error}</span>
                  ) : (
                    <span className="text-inkl italic">Select location below</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLocationPicker(!showLocationPicker)}
                className="px-4 py-2 bg-ember text-white rounded-full font-sans text-sm hover:bg-terra transition-colors"
              >
                {showLocationPicker ? 'Done' : 'Change'}
              </button>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className={`px-4 py-2 rounded-full font-sans text-sm border transition-colors ${
                  showProfile ? 'bg-ember text-white border-ember' : 'border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                {showProfile ? 'Hide Filters' : 'Family Profile'}
              </button>
            </div>
          </div>
          
          {/* Location Picker */}
          <AnimatePresence>
            {showLocationPicker && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-inkll/20">
                  <p className="font-sans text-sm text-inkl mb-3">Choose an area:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    <button
                      onClick={() => { setManualLocation(null); setShowLocationPicker(false); }}
                      className={`px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                        !manualLocation && location.lat ? 'bg-ember text-white border-ember' : 'bg-white border-inkll/20 text-ink hover:border-ember'
                      }`}
                    >
                      📍 Auto-detect
                    </button>
                    {locationPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => { setManualLocation({ ...preset, city: preset.name }); setShowLocationPicker(false); }}
                        className={`px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                          manualLocation?.name === preset.name ? 'bg-ember text-white border-ember' : 'bg-white border-inkll/20 text-ink hover:border-ember'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Family Profile */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-inkll/20">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Youngest Age */}
                    <div>
                      <label className="block font-sans text-xs text-inkl mb-2">Youngest hiker</label>
                      <select
                        value={preferences.youngestAge}
                        onChange={(e) => setPreferences(prev => ({ ...prev, youngestAge: Number(e.target.value) }))}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-inkll/20 font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ember"
                      >
                        <option value={1}>Baby (0-1)</option>
                        <option value={2}>Toddler (2-3)</option>
                        <option value={4}>Preschool (4-5)</option>
                        <option value={6}>Early Elem (6-7)</option>
                        <option value={8}>Elem +</option>
                      </select>
                    </div>

                    {/* Toggle buttons */}
                    {[
                      { key: 'hasStroller', trueLabel: '🚼 Stroller', falseLabel: '🚶 No stroller', label: 'Gear' },
                      { key: 'wantsWater', trueLabel: '💧 Water', falseLabel: 'No water', label: 'Water' },
                      { key: 'wantsViews', trueLabel: '🏔️ Views', falseLabel: 'Any trail', label: 'Views' },
                      { key: 'wantsDogs', trueLabel: '🐕 Dogs', falseLabel: 'No dogs', label: 'Dogs' },
                      { key: 'prefersFreeParking', trueLabel: '🅿️ Free', falseLabel: 'Any', label: 'Parking' },
                    ].map(({ key, trueLabel, falseLabel, label }) => (
                      <div key={key}>
                        <label className="block font-sans text-xs text-inkl mb-2">{label}</label>
                        <button
                          onClick={() => togglePreference(key)}
                          className={`w-full px-3 py-2 rounded-lg border font-sans text-sm transition-all ${
                            preferences[key] ? 'bg-ember text-white border-ember' : 'bg-white border-inkll/20 text-ink hover:border-ember'
                          }`}
                        >
                          {preferences[key] ? trueLabel : falseLabel}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            <p className="font-sans text-inkl">Enable location access or pick an area above to see personalized recommendations.</p>
          </motion.div>
        ) : isReady ? (
          <>
            {/* Weather Alert if relevant */}
            {weatherAssessment && (weatherAssessment.level === 'hot' || weatherAssessment.level === 'cold' || weatherAssessment.level === 'rain') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl border ${
                  weatherAssessment.level === 'hot' ? 'bg-orange-50 border-orange-200' :
                  weatherAssessment.level === 'cold' ? 'bg-blue-50 border-blue-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{weatherAssessment.icon}</span>
                  <p className="font-sans text-sm text-ink">
                    {weatherAssessment.level === 'hot' && "Today's heat affects trail selection. We prioritized shaded routes."}
                    {weatherAssessment.level === 'cold' && "Cold weather factored in. Sunny trails prioritized for warmth."}
                    {weatherAssessment.level === 'rain' && "Wet conditions affect trail safety. Check descriptions for covered options."}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Recommended Trails */}
            {recommendedHikes.length > 0 ? (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-ink">Tailored For Today</h2>
                    <p className="font-sans text-sm text-inkl">Sorted by how well each matches your situation</p>
                  </div>
                  <span className="font-sans text-sm text-ember bg-ember/10 px-3 py-1 rounded-full">
                    {recommendedHikes.length} trails
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedHikes.map((hike, index) => (
                    <motion.div
                      key={hike.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <HikeCard hike={hike} index={index} showScore={true} />
                      
                      {/* Match reasons */}
                      <div className="mt-2 px-4 py-3 bg-cream rounded-b-xl border border-t-0 border-inkll/10">
                        <div className="flex flex-wrap gap-2">
                          {hike.reasons?.map((reason, i) => (
                            <span key={i} className="font-sans text-xs text-ember bg-ember/10 px-2 py-1 rounded-full">
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                        {hike.distance && (
                          <p className="font-sans text-xs text-inkl mt-2">
                            📍 {hike.distance} mi from {manualLocation?.name || location.city}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Alternative activities if weather is bad */}
                {weatherAssessment && weatherAssessment.score < 60 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 bg-blush/50 rounded-2xl p-6"
                  >
                    <h3 className="font-serif text-xl text-ink mb-3">Not feeling the outdoors today?</h3>
                    <p className="font-sans text-inkl mb-4">Base Camp has activities perfect for indoor adventures:</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="/basecamp" className="px-4 py-2 bg-ember text-white rounded-full font-sans text-sm hover:bg-terra transition-colors">
                        🏕️ Indoor Builds
                      </a>
                      <a href="/basecamp/activities" className="px-4 py-2 bg-ember text-white rounded-full font-sans text-sm hover:bg-terra transition-colors">
                        🎨 Nature Crafts
                      </a>
                      <a href="/blueprint" className="px-4 py-2 bg-ember text-white rounded-full font-sans text-sm hover:bg-terra transition-colors">
                        🎒 Plan for Tomorrow
                      </a>
                    </div>
                  </motion.div>
                )}
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
                  {weatherAssessment?.level === 'storm' ? "Storms aren't safe for outdoor adventures." :
                   weatherAssessment?.level === 'rain' ? "The weather isn't cooperating for outdoor trails." :
                   "We couldn't find trails matching your criteria. Try adjusting your filters."}
                </p>
                <a href="/basecamp" className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors">
                  Explore Base Camp instead
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
            <p className="font-sans text-inkl">Pick an area above to see personalized recommendations.</p>
          </motion.div>
        )}

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <h3 className="font-serif text-xl text-ink mb-6 text-center">How We Find Your Perfect Trail</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: '📍', title: 'Location', desc: 'We find trails near you, not just anywhere.' },
              { icon: '🌤️', title: 'Weather', desc: 'Heat? Shade. Cold? Sun. Rain? Covered.' },
              { icon: '👨‍👩‍👧‍👦', title: 'Your Crew', desc: 'Ages, strollers, dogs, energy levels.' },
              { icon: '⏰', title: 'Time', desc: 'Duration fits your actual schedule today.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/50 rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h4 className="font-serif text-ink mb-1">{item.title}</h4>
                <p className="font-sans text-xs text-inkl">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
