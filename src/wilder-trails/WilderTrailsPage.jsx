import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import { useRecommendations } from '../hooks/useRecommendations'
import { Link } from 'react-router-dom'
import HikeCard from './HikeCard'
import HourlyWeather from './HourlyWeather'
import WhatsGrowing from './WhatsGrowing'
import TrailCraftMoments from './TrailCraftMoments'
import WhatICollected from './WhatICollected'

// Time context helper
function getTimeContext() {
  const hour = new Date().getHours();
  if (hour < 10) return 'early';
  if (hour < 14) return 'midday';
  if (hour < 17) return 'late';
  return 'evening';
}

// Get time-based recommendation message - warmer mom voice
function getTimeMessage(timeContext, weatherLevel) {
  const messages = {
    early: {
      perfect: "Early bird gets the trail — and the best conditions!",
      cloudy: "Morning adventures await. The trails are peaceful now.",
      hot: "Start now if you can. The shade trails are calling.",
      cold: "Layers on, coffee in hand — let's beat that morning chill.",
      drizzle: "Light rain expected. Pack those waterproof layers!",
      default: "What a perfect morning for your family to explore!"
    },
    midday: {
      perfect: "It's go time. The weather is literally made for hiking.",
      cloudy: "Overcast and beautiful — my favorite hiking weather honestly.",
      hot: "Keep it cool out there. Water breaks every 10 minutes, okay?",
      cold: "Brrr. Sunny trails will warm you up as you walk.",
      drizzle: "Drizzle won't stop us, but waterproof layers are must-haves.",
      rain: "Rain day vibes — maybe save the big hike for tomorrow?",
      default: "Good window for a family adventure right now."
    },
    late: {
      perfect: "Perfect afternoon for a little adventure with your people.",
      cloudy: "Overcast skies = comfortable hiking. No complaints here.",
      hot: "Cooling down nicely. Still time for a shorter trail.",
      cold: "Temps dropping. Short and sweet trails today, please.",
      drizzle: "Rain likely later — get out there now before it starts.",
      rain: "Not ideal conditions. How about a cozy Base Camp afternoon?",
      default: "Nice time to get outside with the family!"
    },
    evening: {
      perfect: "Quick sunset adventure? The light is gorgeous right now.",
      cloudy: "Still time for a short evening stroll before dinner.",
      hot: "Perfect cooling-off weather for a walk around the block.",
      cold: "Getting chilly fast. Keep it short and warm.",
      drizzle: "Skip the evening hike, try tomorrow morning instead.",
      rain: "Not tonight — but tomorrow's looking better!",
      default: "Good time for a short family walk."
    }
  };
  
  const weatherMessages = messages[timeContext];
  return weatherMessages[weatherLevel] || weatherMessages.default;
}

// Get best hike window based on weather - warmer messaging
function getBestWindow(weather, timeContext) {
  if (weather.level === 'storm') return { label: 'Stay indoors', message: "Safety first today, mama." };
  if (weather.level === 'rain') return { label: 'Indoor day', message: "Try a Base Camp activity instead." };
  if (weather.level === 'snow') return { label: 'Snow play!', message: "Bundle up and make memories." };
  
  if (weather.level === 'hot') {
    if (timeContext === 'early') return { label: 'NOW', message: "Cool morning — best time to start!" };
    return { label: 'Early AM', message: "Before 10am for cooler temps" };
  }
  
  if (weather.level === 'perfect' || weather.level === 'cloudy') {
    return { label: 'All day', message: "Go whenever works for you!" };
  }
  
  if (weather.level === 'drizzle') {
    return { label: 'Totally fine', message: "Light rain — just bring layers" };
  }
  
  if (weather.level === 'drizzle-cold') {
    return { label: 'Wait for sun', message: "Warmer temps expected later" };
  }
  
  return { label: 'This afternoon', message: "Best conditions expected" };
}

// Weather assessment - warmer, friendlier labels
function getWeatherVibe(weather, timeContext) {
  if (weather.level === 'perfect' || weather.level === 'cloudy' || weather.level === 'cloudy-cool') {
    return { vibe: "Perfect day to be outside", color: "bg-olive" };
  }
  if (weather.level === 'warm') {
    return { vibe: "Beautiful weather for adventure", color: "bg-olive" };
  }
  if (weather.level === 'hot' || weather.level === 'extreme-heat') {
    return { vibe: "Hot one today — seek shade", color: "bg-terra" };
  }
  if (weather.level === 'chilly' || weather.level === 'cold' || weather.level === 'cloudy-cold') {
    return { vibe: "Chilly but totally doable", color: "bg-gold" };
  }
  if (weather.level === 'drizzle' || weather.level === 'drizzle-cool') {
    return { vibe: "Drizzle won't stop the fun", color: "bg-gold" };
  }
  if (weather.level === 'drizzle-cold') {
    return { vibe: "Cold + damp = stay warm", color: "bg-terra" };
  }
  if (weather.level === 'rain') {
    return { vibe: "Rainy day ahead", color: "bg-terra" };
  }
  if (weather.level === 'snow') {
    return { vibe: "Snow day adventures!", color: "bg-slate" };
  }
  return { vibe: "Check conditions before heading out", color: "bg-gold" };
}

// Elevation appropriateness - warmer delivery
function getElevationAdvice(tempF, elevation) {
  if (tempF > 85) {
    if (elevation > 500) return { text: "High elevation + heat = tough combo today", avoid: true };
    if (elevation > 200) return { text: "Moderate elevation — stay extra hydrated", avoid: false };
  }
  if (tempF < 45) {
    if (elevation > 500) return { text: "High elevation will feel extra cold — bundle up!", avoid: true };
  }
  return null;
}

// Age range labels - conversational
const ageLabels = [
  { value: -1, label: "Baby in carrier (we can go longer, but diaper stops matter)" },
  { value: 0, label: "Still in the stroller phase" },
  { value: 2, label: "Toddler on the move" },
  { value: 4, label: "Preschooler explorer" },
  { value: 7, label: "Elementary adventurer" },
  { value: 10, label: "Pre-teen trailblazer" },
];

// Time window labels - conversational
const timeLabels = [
  { value: 30, label: "Quick outing (30 min)" },
  { value: 60, label: "Standard adventure (1 hour)" },
  { value: 90, label: "Longer trek (1.5 hours)" },
  { value: 120, label: "Full expedition (2+ hours)" },
];

// Vibe labels - how are you feeling today
const vibeLabels = [
  { value: "adventurous", label: "Feeling adventurous" },
  { value: "chill", label: "Take it easy today" },
  { value: "justneedout", label: "Just need to get outside" },
  { value: "exploring", label: "Let's explore something new" },
];

// Must-have options - friendly labels
const mustHaveOptions = [
  { key: 'wantsWater', label: "Water to splash in" },
  { key: 'wantsRestrooms', label: "Bathroom nearby" },
  { key: 'needsShade', label: "Shade for hot days" },
  { key: 'flatStroller', label: "Flat enough for stroller" },
  { key: 'wantsDogs', label: "Dog-friendly" },
  { key: 'freeParking', label: "Free parking" },
  { key: 'hasViews', label: "Scenic viewpoints" },
];

export default function WilderTrailsPage() {
  const location = useLocation()
  const weather = useWeather(location.lat, location.lon)
  
  // State
  const [manualLocation, setManualLocation] = useState(null)
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  
  // Family preferences - conversational defaults
  const [preferences, setPreferences] = useState({
    youngestAge: 4,
    hasBabyInCarrier: false,
    timeWindow: 60,
    vibe: 'justneedout',
    wantsWater: true,
    wantsRestrooms: true,
    needsShade: false,
    flatStroller: false,
    wantsDogs: false,
    freeParking: false,
    hasViews: false,
  })
  
  // Search trigger for Let's Go button
  const [searchTriggered, setSearchTriggered] = useState(false)
  
  // Foraged items collection for trail crafts
  const [forageCollection, setForageCollection] = useState([])

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
    if (!weatherAssessment) return "Pick a spot on the map and we'll find something perfect for your family.";
    return getTimeMessage(timeContext, weatherAssessment.level);
  }, [weatherAssessment, timeContext]);

  // Weather vibe
  const weatherVibe = useMemo(() => {
    if (!weatherAssessment) return null;
    return getWeatherVibe(weatherAssessment, timeContext);
  }, [weatherAssessment, timeContext]);

  // Elevation advice
  const elevationAdvice = useMemo(() => {
    if (!weather.temp) return null;
    return getElevationAdvice(weather.temp, 300);
  }, [weather.temp]);

  // Get label helpers
  const getAgeLabel = (value) => {
    if (value === -1) return "Baby in carrier";
    return ageLabels.find(a => a.value === value)?.label || "Preschooler explorer";
  };
  const getVibeLabel = (value) => vibeLabels.find(v => v.value === value)?.label || "Just need to get outside";
  
  // Smart summary generator
  const getSmartSummary = () => {
    const ageDesc = preferences.youngestAge === -1 
      ? "baby in carrier" 
      : getAgeLabel(preferences.youngestAge).toLowerCase();
    const timeDesc = timeLabels.find(t => t.value === preferences.timeWindow)?.label || "standard adventure";
    const mustHaves = Object.entries({
      wantsWater: 'water to splash in',
      wantsRestrooms: 'bathrooms nearby',
      needsShade: 'shade',
      flatStroller: 'stroller-friendly',
      wantsDogs: 'dog-friendly',
      freeParking: 'free parking',
      hasViews: 'scenic views'
    }).filter(([key]) => preferences[key]).map(([, label]) => label);
    
    return { ageDesc, timeDesc, mustHaves };
  };
  
  // Handle Let's Go button
  const handleLetsGo = () => {
    setSearchTriggered(true);
    // Scroll to results section
    setTimeout(() => {
      const resultsSection = document.getElementById('trail-results');
      if (resultsSection) {
        const navOffset = 100;
        const elementPosition = resultsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-cream pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - warmer intro */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            Your Perfect Afternoon
          </h1>
          <p className="font-sans text-inkl text-lg max-w-2xl leading-relaxed">
            Most trail guides were written for someone else's family. Ours was built for yours — your kids' ages, your time window, your vibe, your must-haves.
          </p>
        </motion.header>

        {/* Weather Vibe Check - softer presentation */}
        {isReady && weatherAssessment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className={`rounded-3xl p-6 md:p-8 ${weatherVibe?.color || 'bg-blush'}/10 border border-${weatherVibe?.color || 'blush'}/20`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Vibe message */}
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-serif text-2xl md:text-3xl text-ink">{weatherVibe?.vibe || "Let's check the weather"}</p>
                    <p className="font-sans text-inkl mt-1">{timeMessage}</p>
                  </div>
                </div>

                {/* Best window & conditions */}
                <div className="flex flex-wrap items-center gap-6">
                  {bestWindow && (
                    <div className="bg-white/70 rounded-2xl px-5 py-4 text-center">
                      <p className="font-sans text-xs text-inkl uppercase tracking-wide mb-1">Best time to go</p>
                      <p className="font-serif text-xl text-ink">{bestWindow.label}</p>
                      <p className="font-sans text-sm text-inkl mt-0.5">{bestWindow.message}</p>
                    </div>
                  )}

                  {weather.temp !== null && (
                    <div className="text-center">
                      <p className="font-sans text-3xl font-medium text-ink">{weather.temp}°F</p>
                      <p className="font-sans text-sm text-inkl capitalize">{weather.description || 'Current conditions'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional weather advice */}
              {(weatherAssessment.level === 'hot' || weatherAssessment.level === 'cold' || weatherAssessment.level === 'rain') && (
                <div className="mt-5 pt-5 border-t border-inkll/20">
                  <p className="font-sans text-inkl">
                    {weatherAssessment.level === 'hot' && "We've prioritized shaded trails to keep everyone comfortable."}
                    {weatherAssessment.level === 'cold' && "Sunny trails are bumped up in the results to help you warm up."}
                    {weatherAssessment.level === 'rain' && "We've factored in trail conditions — some may be muddy but still doable."}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Hourly Weather & What's Growing - new features */}
        {isReady && location.lat && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <HourlyWeather 
              hourly={weather.hourly || []} 
              currentHour={new Date().getHours()}
            />
            <WhatsGrowing 
              lat={location.lat} 
              lon={location.lon}
            />
          </div>
        )}

        {/* Trail Craft Moments */}
        {isReady && weatherAssessment && (
          <div className="mb-8">
            <TrailCraftMoments 
              weatherAssessment={weatherAssessment}
              timeWindow={preferences.timeWindow}
              forage={forageCollection.map(c => c.id)}
            />
          </div>
        )}

        {/* What I Collected - floating tracker */}
        <WhatICollected 
          collection={forageCollection}
          onCollectionChange={setForageCollection}
        />

        {/* Location & Family Profile Card */}
        <motion.div
          id="profile-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-blush/60 rounded-3xl p-5 md:p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            {/* Location indicator */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-ember/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-xs text-inkl uppercase tracking-wide">Exploring</p>
                <p className="font-sans font-medium text-ink text-lg">
                  {location.loading ? (
                    <span className="text-inkl italic">Finding you...</span>
                  ) : location.city && !manualLocation ? (
                    location.city
                  ) : manualLocation ? (
                    <span className="text-ember">{manualLocation.name}</span>
                  ) : location.error ? (
                    <span className="text-terra">{location.error}</span>
                  ) : (
                    <span className="text-inkl italic">Select your area below</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowLocationPicker(!showLocationPicker)
                  if (!showLocationPicker) {
                    setTimeout(() => {
                      const section = document.getElementById('profile-section')
                      if (section) {
                        const navOffset = 100
                        const top = section.getBoundingClientRect().top + window.pageYOffset - navOffset
                        window.scrollTo({ top, behavior: 'smooth' })
                      }
                    }, 50)
                  }
                }}
                className="px-4 py-2 bg-ember text-white rounded-full font-sans text-sm hover:bg-terra transition-colors shadow-sm"
              >
                {showLocationPicker ? 'Done' : 'Change Area'}
              </button>
              <button
                onClick={() => {
                  setShowProfile(!showProfile)
                  if (!showProfile) {
                    setTimeout(() => {
                      const section = document.getElementById('profile-section')
                      if (section) {
                        const navOffset = 100
                        const top = section.getBoundingClientRect().top + window.pageYOffset - navOffset
                        window.scrollTo({ top, behavior: 'smooth' })
                      }
                    }, 50)
                  }
                }}
                className={`px-4 py-2 rounded-full font-sans text-sm border transition-all duration-200 ${
                  showProfile ? 'bg-ember text-white border-ember shadow-sm' : 'border-inkll/30 text-ink hover:border-ember bg-white/50'
                }`}
              >
                {showProfile ? 'Hide Details' : "Who's Coming?"}
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
                <div className="mt-5 pt-5 border-t border-inkll/20">
                  <p className="font-sans text-sm text-inkl mb-3">Choose an area:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    <button
                      onClick={() => { setManualLocation(null); setShowLocationPicker(false); }}
                      className={`px-3 py-2.5 rounded-xl border font-sans text-sm transition-all ${
                        !manualLocation && location.lat ? 'bg-ember text-white border-ember' : 'bg-white border-inkll/20 text-ink hover:border-ember hover:bg-ember/5'
                      }`}
                    >
                      Auto-detect
                    </button>
                    {locationPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => { setManualLocation({ ...preset, city: preset.name }); setShowLocationPicker(false); }}
                        className={`px-3 py-2.5 rounded-xl border font-sans text-sm transition-all ${
                          manualLocation?.name === preset.name ? 'bg-ember text-white border-ember' : 'bg-white border-inkll/20 text-ink hover:border-ember hover:bg-ember/5'
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

          {/* Family Profile - conversational */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-5 pt-5 border-t border-inkll/20">
                  <p className="font-serif text-lg text-ink mb-4">Tell us about your crew</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Youngest hiker */}
                    <div>
                      <label className="block font-sans text-sm text-ink mb-2">How old are your littles?</label>
                      <select
                        value={preferences.youngestAge}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPreferences(prev => ({ 
                            ...prev, 
                            youngestAge: val,
                            hasBabyInCarrier: val === -1
                          }))
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-inkll/20 font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all"
                      >
                        {ageLabels.map(age => (
                          <option key={age.value} value={age.value}>{age.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Time window */}
                    <div>
                      <label className="block font-sans text-sm text-ink mb-2">What's your time window?</label>
                      <select
                        value={preferences.timeWindow}
                        onChange={(e) => setPreferences(prev => ({ ...prev, timeWindow: Number(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-inkll/20 font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all"
                      >
                        {timeLabels.map(time => (
                          <option key={time.value} value={time.value}>{time.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Today's vibe */}
                    <div>
                      <label className="block font-sans text-sm text-ink mb-2">What's today's vibe?</label>
                      <select
                        value={preferences.vibe}
                        onChange={(e) => setPreferences(prev => ({ ...prev, vibe: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-inkll/20 font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all"
                      >
                        {vibeLabels.map(vibe => (
                          <option key={vibe.value} value={vibe.value}>{vibe.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Must-haves */}
                    <div>
                      <label className="block font-sans text-sm text-ink mb-2">Any must-haves?</label>
                      <div className="flex flex-wrap gap-2">
                        {mustHaveOptions.slice(0, 4).map(opt => (
                          <button
                            key={opt.key}
                            onClick={() => togglePreference(opt.key)}
                            className={`px-3 py-2 rounded-lg border font-sans text-xs transition-all ${
                              preferences[opt.key] ? 'bg-ember text-white border-ember' : 'bg-white border-inkll/20 text-ink hover:border-ember'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional must-haves row */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {mustHaveOptions.slice(4).map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => togglePreference(opt.key)}
                        className={`px-3 py-2 rounded-lg border font-sans text-xs transition-all ${
                          preferences[opt.key] ? 'bg-ember text-white border-ember' : 'bg-white border-inkll/20 text-ink hover:border-ember'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Let's Go Button */}
                  <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                      onClick={handleLetsGo}
                      className="px-8 py-3.5 bg-ember text-white rounded-full font-sans font-medium text-base hover:bg-terra transition-all shadow-lg shadow-ember/20 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Let's Go
                    </button>
                    
                    {/* Smart Summary */}
                    {searchTriggered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-cream/80 rounded-xl px-4 py-3 border border-inkll/20"
                      >
                        <p className="font-sans text-sm text-ink">
                          Finding trails for a family with{' '}
                          <span className="font-medium text-ember">
                            {getSmartSummary().ageDesc}
                          </span>
                          ,{' '}
                          <span className="font-medium text-ember">
                            {getSmartSummary().timeDesc.toLowerCase()}
                          </span>
                          {getSmartSummary().mustHaves.length > 0 && (
                            <>
                              , wanting{' '}
                              <span className="font-medium text-ember">
                                {getSmartSummary().mustHaves.slice(0, 2).join(', ')}
                                {getSmartSummary().mustHaves.length > 2 && ` +${getSmartSummary().mustHaves.length - 2} more`}
                              </span>
                            </>
                          )}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Join CTA */}
                  <div className="mt-4 bg-parchment rounded-2xl p-4 text-center">
                    <p className="font-sans text-forest text-sm mb-3">
                      Ready for personalized trail recs?
                    </p>
                    <Link
                      to="/join"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors"
                    >
                      Join the Village
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
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
            className="bg-blush/40 rounded-3xl p-10 md:p-14 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ember/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-ink mb-3">Let's find your trail</h3>
            <p className="font-sans text-inkl max-w-md mx-auto">
              Select your area above and we'll show you trails that actually work for your family's reality.
            </p>
          </motion.div>
        ) : isReady ? (
          <>
            {/* Trail Results */}
            {recommendedHikes.length > 0 ? (
              <section id="trail-results">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-ink">Trails for Right Now</h2>
                    <p className="font-sans text-inkl mt-1">Sorted by how well each matches your crew today</p>
                  </div>
                  <span className="font-sans text-sm text-ember bg-ember/10 px-4 py-2 rounded-full">
                    {recommendedHikes.length} found
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedHikes.map((hike, index) => (
                    <motion.div
                      key={hike.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                    >
                      <HikeCard hike={hike} index={index} showScore={true} />
                      
                      {/* Why this trail works - mom-friendly */}
                      <div className="mt-2 px-5 py-4 bg-cream rounded-b-2xl border border-t-0 border-inkll/10">
                        <p className="font-sans text-xs text-inkl mb-2">Why this one works:</p>
                        <div className="flex flex-wrap gap-2">
                          {hike.reasons?.slice(0, 3).map((reason, i) => (
                            <span key={i} className="font-sans text-xs text-terra bg-terra/10 px-3 py-1 rounded-full">
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                        {hike.distance && (
                          <p className="font-sans text-xs text-inkl mt-3">
                            About {hike.distance} miles from {manualLocation?.name || location.city}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Alternative activities */}
                {weatherAssessment && weatherAssessment.score < 60 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 bg-blush/50 rounded-3xl p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-ink mb-2">Not feeling the outdoors today?</h3>
                        <p className="font-sans text-inkl mb-4">Base Camp has everything you need for a perfect indoor day:</p>
                        <div className="flex flex-wrap gap-3">
                          <a href="/basecamp" className="px-5 py-2.5 bg-ember text-white rounded-full font-sans text-sm hover:bg-terra transition-colors">
                            Indoor Builds
                          </a>
                          <a href="/basecamp/activities" className="px-5 py-2.5 bg-white border border-inkll/20 text-ink rounded-full font-sans text-sm hover:border-ember transition-colors">
                            Nature Crafts
                          </a>
                          <a href="/blueprint" className="px-5 py-2.5 bg-white border border-inkll/20 text-ink rounded-full font-sans text-sm hover:border-ember transition-colors">
                            Plan for Tomorrow
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </section>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blush/40 rounded-3xl p-10 md:p-14 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-terra/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-terra" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-ink mb-3">Tough day for trails</h3>
                <p className="font-sans text-inkl mb-6 max-w-md mx-auto">
                  {weatherAssessment?.level === 'storm' ? "Storms aren't safe for outdoor adventures today." :
                   weatherAssessment?.level === 'rain' ? "The weather isn't cooperating, mama." :
                   "We couldn't find trails matching your criteria. Try adjusting your filters."}
                </p>
                <a href="/basecamp" className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors">
                  Check out Base Camp instead
                  <span>→</span>
                </a>
              </motion.div>
            )}
          </>
        ) : location.loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-14 h-14 border-4 border-ember/30 border-t-ember rounded-full animate-spin mx-auto mb-5"></div>
              <p className="font-sans text-inkl text-lg">Finding trails for your family...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blush/40 rounded-3xl p-10 md:p-14 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-olive/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-ink mb-3">Ready when you are</h3>
            <p className="font-sans text-inkl">Pick an area above and we'll find something perfect for your crew.</p>
          </motion.div>
        )}

        {/* How It Works - simpler, warmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <h3 className="font-serif text-xl md:text-2xl text-ink mb-6 text-center">How We Find Your Trail</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Your Location', desc: 'Near you, not just anywhere generic', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
              { title: 'Real Weather', desc: 'Heat? Shade. Rain? Covered options.', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
              { title: 'Your Crew', desc: 'Ages, energy, strollers, dogs — all of it', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
              { title: 'Your Time', desc: 'Fits your actual schedule today', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((item, i) => (
              <div key={i} className="bg-white/60 rounded-2xl p-5 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-ember/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
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
