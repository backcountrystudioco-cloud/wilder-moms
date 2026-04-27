import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWilderTrails } from './WilderTrailsContext'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import { useRecommendations } from '../hooks/useRecommendations'
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

// Age range labels
const ageLabels = [
  { value: -1, label: "Baby in carrier" },
  { value: 0, label: "Still in the stroller phase" },
  { value: 2, label: "Toddler on the move" },
  { value: 4, label: "Preschooler explorer" },
  { value: 7, label: "Elementary adventurer" },
  { value: 10, label: "Pre-teen trailblazer" },
];

export default function TrailsPage() {
  const navigate = useNavigate()
  const { location, familyInfo, timeWindow, vibe, currentStep } = useWilderTrails()
  
  // Weather hook - only if we have location
  const weather = useWeather(location?.lat, location?.lon)
  
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
          
          {/* Wilder Companion Suggestion */}
          <div className="bg-gradient-to-br from-forest/10 to-forest/5 rounded-2xl p-5 border border-forest/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base text-ink mb-1">Wilder Companion suggests:</h3>
                <p className="text-inkl text-sm mb-3">
                  {familyInfo?.wantsWater 
                    ? "Based on your crew, a trail with water features might be perfect today!"
                    : familyInfo?.youngestAge <= 3
                      ? "For your youngest adventurer, I'd look for easy, engaging trails with lots to explore."
                      : "Let me find something adventurous that works for everyone."}
                </p>
                <Link
                  to="/wilder-trails/ai-finder"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-white rounded-full text-sm font-medium hover:bg-forest/90 transition-colors"
                >
                  Show me trails →
                </Link>
              </div>
            </div>
          </div>
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
            className={`rounded-2xl p-6 mb-8 ${weatherVibe.color}/10 border border-${weatherVibe.color}/20`}
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

        {/* Trail Results */}
        {!isReady ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-14 h-14 border-4 border-ember/30 border-t-ember rounded-full animate-spin mx-auto mb-5"></div>
              <p className="font-sans text-inkl text-lg">Finding trails for your family...</p>
            </div>
          </div>
        ) : recommendedHikes.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-ink">
                Found {recommendedHikes.length} trails
              </h2>
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
