import { useMemo, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWilderTrails } from './WilderTrailsContext'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import { useRecommendations } from '../hooks/useRecommendations'
import { findTrailsWithAI, getRemainingQueries } from './aiTrailFinderUtils'
import ProgressStepper from './ProgressStepper'
import HikeCard from './HikeCard'

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

// Weather vibe labels
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
  if (weather.level === 'rain' || weather.level === 'heavy-rain') {
    return { vibe: "Rainy day — indoor fun or wait it out", color: "bg-slate" };
  }
  if (weather.level === 'snow' || weather.level === 'heavy-snow') {
    return { vibe: "Snow day! Bundle up or save for later", color: "bg-blue" };
  }
  return null;
}

// Age range labels
const ageLabels = [
  { value: -1, label: "Baby in carrier" },
  { value: 0, label: "Toddler" },
  { value: 2, label: "Toddler on the move" },
  { value: 4, label: "Preschooler explorer" },
  { value: 7, label: "Elementary adventurer" },
  { value: 10, label: "Pre-teen trailblazer" },
];

export default function TrailsPage() {
  const navigate = useNavigate()
  const { location, familyInfo, timeWindow } = useWilderTrails()
  
  // Weather hook - only if we have location
  const weather = useWeather(location?.lat, location?.lon)
  
  // AI recommendations state
  const [aiRecommendations, setAiRecommendations] = useState([])
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)
  const [aiRemaining, setAiRemaining] = useState(getRemainingQueries())
  
  // Get recommendations based on context
  const { hikes: recommendedHikes, weatherAssessment, isReady } = useRecommendations(
    location,
    weather,
    {
      youngestAge: familyInfo?.youngestAge ?? 5,
      hasStroller: familyInfo?.needsStroller ?? false,
      wantsWater: familyInfo?.wantsWater ?? true,
      wantsRestrooms: familyInfo?.needsRestrooms ?? true,
      wantsDogs: familyInfo?.needsDog ?? false,
      timeWindow: timeWindow,
    }
  )
  
  const timeContext = getTimeContext()
  
  // Time-based message
  const timeMessage = useMemo(() => {
    if (!weatherAssessment) return "Pick a spot and we'll find something perfect for your family.";
    return getTimeMessage(timeContext, weatherAssessment.level);
  }, [weatherAssessment, timeContext]);

  // Weather vibe
  const weatherVibe = useMemo(() => {
    if (!weatherAssessment) return null;
    return getWeatherVibe(weatherAssessment, timeContext);
  }, [weatherAssessment, timeContext]);
  
  // Fetch AI recommendations on mount
  useEffect(() => {
    if (aiRemaining > 0 && (location?.city || familyInfo)) {
      fetchAiRecommendations()
    }
  }, [])
  
  const fetchAiRecommendations = async () => {
    setAiLoading(true)
    setAiError(null)
    
    try {
      const data = await findTrailsWithAI('', {
        location,
        familyInfo,
        timeWindow
      })
      setAiRecommendations(data.recommendations || [])
      setAiRemaining(data.remainingQueries)
    } catch (err) {
      setAiError(err.message)
    } finally {
      setAiLoading(false)
    }
  }
  
  const handleBack = () => {
    navigate('/wilder-trails/whos-coming')
  }
  
  const handleTrailSelect = (trailId) => {
    navigate(`/wilder-trails/${trailId}`)
  }

  const getAgeLabel = (value) => {
    if (value === -1) return "baby in carrier";
    return ageLabels.find(a => a.value === value)?.label?.toLowerCase() || "preschooler explorer";
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ProgressStepper currentStep={3} />
        
        {/* Back button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-inkl hover:text-ember transition-colors font-sans text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to who's coming
        </button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            Your Perfect Trails
          </h1>
          <p className="font-sans text-inkl text-lg max-w-2xl leading-relaxed mb-4">
            Based on your crew near {location?.city || 'your area'}, here are trails that actually work for your family's reality today.
          </p>
        </motion.header>

        {/* Family Summary */}
        {familyInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-blush/40 rounded-2xl p-4 flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="font-sans text-ink">
                {getAgeLabel(familyInfo.youngestAge)}
              </span>
            </div>
            <span className="text-inkll">•</span>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-sans text-ink">{timeWindow} min</span>
            </div>
            {familyInfo.needsStroller && (
              <>
                <span className="text-inkll">•</span>
                <span className="font-sans text-ink">Stroller needed</span>
              </>
            )}
            {familyInfo.needsDog && (
              <>
                <span className="text-inkll">•</span>
                <span className="font-sans text-ink">Dog-friendly</span>
              </>
            )}
          </motion.div>
        )}

        {/* Weather Vibe Check */}
        {isReady && weatherAssessment && weatherVibe && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-6 mb-8 ${weatherVibe.color}/10 border ${weatherVibe.color}/20`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-serif text-2xl text-ink">{weatherVibe.vibe}</p>
                <p className="font-sans text-inkl mt-1">{timeMessage}</p>
              </div>
              <div className="flex items-center gap-4">
                {weather.temp !== null && (
                  <div className="text-center">
                    <p className="font-sans text-3xl font-medium text-ink">{weather.temp}°F</p>
                    <p className="font-sans text-sm text-inkl capitalize">{weather.description || 'Current conditions'}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Starter Trails - Show immediately */}
        {!aiLoading && aiRecommendations.length === 0 && !isReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <p className="font-sans text-inkl">Loading trails...</p>
            </div>
          </motion.div>
        )}

        {/* Starter Trails - Show these first while AI is thinking */}
        {!aiLoading && aiRecommendations.length === 0 && isReady && recommendedHikes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-ember/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl text-ink">Top Picks for {location?.city}</h2>
                <p className="font-sans text-xs text-inkl">Great trails for your crew</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {recommendedHikes.slice(0, 3).map((hike, index) => (
                <motion.div
                  key={hike.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTrailSelect(hike.id)}
                  className="bg-white rounded-xl p-4 border border-ember/20 hover:border-ember/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          hike.difficulty === 'easy' ? 'bg-olive/20 text-forest' :
                          hike.difficulty === 'moderate' ? 'bg-gold/20 text-ink' :
                          'bg-ember/20 text-ember'
                        }`}>
                          {hike.difficulty}
                        </span>
                        <span className="text-xs text-inkl">{hike.durationLabel}</span>
                      </div>
                      <h3 className="font-serif text-lg text-ink">{hike.title}</h3>
                      <p className="text-sm text-inkl">{hike.region}, {hike.state}</p>
                    </div>
                    <svg className="w-5 h-5 text-ember flex-shrink-0 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Wilder Companion AI Recommendations */}
        {(aiLoading || aiRecommendations.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl text-ink">Wilder Companion's Picks</h2>
                <p className="font-sans text-xs text-inkl">Based on your family's needs</p>
              </div>
            </div>
            
            {aiLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-forest/30 border-t-forest rounded-full animate-spin mr-3"></div>
                <p className="font-sans text-inkl">Finding perfect trails...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={rec.trail.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleTrailSelect(rec.trail.id)}
                    className="bg-white rounded-xl p-4 border border-forest/20 hover:border-forest/40 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            rec.trail.difficulty === 'easy' ? 'bg-olive/20 text-forest' :
                            rec.trail.difficulty === 'moderate' ? 'bg-gold/20 text-ink' :
                            'bg-ember/20 text-ember'
                          }`}>
                            {rec.trail.difficulty}
                          </span>
                          <span className="text-xs text-inkl">{rec.trail.distance} mi</span>
                        </div>
                        <h3 className="font-serif text-lg text-ink mb-1">{rec.trail.title}</h3>
                        <p className="text-sm text-inkl mb-2">{rec.trail.region}, {rec.trail.state}</p>
                        <p className="font-sans text-sm text-inkl leading-relaxed">{rec.explanation}</p>
                      </div>
                      <svg className="w-5 h-5 text-forest flex-shrink-0 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* AI Error or fallback */}
        {aiError && (
          <div className="mb-8 p-4 bg-blush/40 rounded-xl text-center">
            <p className="text-sm text-inkl">{aiError}</p>
          </div>
        )}

        {/* Trail Results - Hidden when AI recommendations are showing */}
        {!aiLoading && aiRecommendations.length > 0 ? null : !isReady ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-14 h-14 border-4 border-ember/30 border-t-ember rounded-full animate-spin mx-auto mb-5"></div>
              <p className="font-sans text-inkl text-lg">Finding trails for your family...</p>
            </div>
          </div>
        ) : recommendedHikes.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-ink">Found trails</h2>
              <span className="font-sans text-sm text-ember bg-ember/10 px-4 py-2 rounded-full">
                Sorted by best match
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedHikes.map((hike, index) => (
                <motion.div
                  key={hike.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  onClick={() => handleTrailSelect(hike.id)}
                  className="cursor-pointer"
                >
                  <HikeCard hike={hike} index={index} showScore={true} />
                  
                  {/* Why this trail works */}
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
                        About {hike.distance} miles from {location?.city}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
              We couldn't find trails matching your criteria. Try adjusting your filters or check back later.
            </p>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors"
            >
              Adjust preferences
            </button>
          </motion.div>
        )}

        {/* Start Over Link */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/wilder-trails/location')}
            className="font-sans text-sm text-inkl hover:text-ember transition-colors"
          >
            Start a new trail search
          </button>
        </div>
      </div>
    </div>
  )
}
