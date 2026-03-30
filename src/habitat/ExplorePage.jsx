import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import WeatherWidget from './WeatherWidget'
import HikeCard from './HikeCard'
import CraftCard from '../BaseCamp/CraftCard'
import { hikes, hikeStates, hikeDifficulties, hikeDurations, hikeShadeLevels, hikeParkingTypes, hikeFeatures } from './hikes'
import { crafts } from '../BaseCamp/crafts'

export default function ExplorePage() {
  const location = useLocation()
  const weather = useWeather(location.lat, location.lon)

  // Tab state: 'hikes' or 'crafts'
  const [activeTab, setActiveTab] = useState('hikes')
  // Manual override toggle
  const [manualOverride, setManualOverride] = useState(false)

  // Set default tab based on weather when not manually overridden
  useEffect(() => {
    if (manualOverride) return

    if (weather.isGoodForHiking === true) {
      setActiveTab('hikes')
    } else if (weather.isGoodForHiking === false) {
      setActiveTab('crafts')
    }
  }, [weather.isGoodForHiking, manualOverride])

  // Handle toggle button
  const handleToggle = () => {
    setManualOverride(true)
    setActiveTab(activeTab === 'hikes' ? 'crafts' : 'hikes')
  }

  // ========== HIKE FILTERING & SORTING ==========
  const [selectedState, setSelectedState] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedShade, setSelectedShade] = useState('')
  const [selectedParking, setSelectedParking] = useState('')
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [sortBy, setSortBy] = useState('distance')

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    )
  }

  const clearHikeFilters = () => {
    setSelectedState('')
    setSelectedDifficulty('')
    setSelectedDuration('')
    setSelectedShade('')
    setSelectedParking('')
    setSelectedFeatures([])
    setSortBy('distance')
  }

  const hasActiveHikeFilters = selectedState || selectedDifficulty || selectedDuration || selectedShade || selectedParking || selectedFeatures.length > 0

  // Filter and sort hikes
  const filteredHikes = useMemo(() => {
    let result = [...hikes]

    // Filter by state
    if (selectedState) {
      result = result.filter(h => h.state === selectedState)
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      result = result.filter(h => h.difficulty === selectedDifficulty)
    }

    // Filter by duration
    if (selectedDuration) {
      const dur = hikeDurations.find(d => d.id === selectedDuration)
      if (dur) {
        result = result.filter(h => {
          if (dur.max && dur.min) {
            return h.duration >= dur.min && h.duration < dur.max
          } else if (dur.max) {
            return h.duration < dur.max
          } else if (dur.min) {
            return h.duration >= dur.min
          }
          return true
        })
      }
    }

    // Filter by shade level
    if (selectedShade) {
      result = result.filter(h => h.shadeLevel === selectedShade)
    }

    // Filter by parking type
    if (selectedParking) {
      result = result.filter(h => h.parking === selectedParking)
    }

    // Filter by features (all must match)
    if (selectedFeatures.length > 0) {
      result = result.filter(h => 
        selectedFeatures.every(f => h[f] === true)
      )
    }

    // Sort
    switch (sortBy) {
      case 'distance':
        result.sort((a, b) => a.distance - b.distance)
        break
      case 'elevation':
        result.sort((a, b) => a.elevation - b.elevation)
        break
      case 'age':
        result.sort((a, b) => a.ageMin - b.ageMin)
        break
      case 'duration':
        result.sort((a, b) => a.duration - b.duration)
        break
      default:
        break
    }

    return result
  }, [selectedState, selectedDifficulty, selectedDuration, selectedShade, selectedParking, selectedFeatures, sortBy])

  const getSortLabel = (sort) => {
    switch (sort) {
      case 'distance': return 'Shortest'
      case 'elevation': return 'Lowest Elev.'
      case 'age': return 'Youngest Ages'
      case 'duration': return 'Quickest'
      default: return sort
    }
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Explore
          </h1>
          <p className="font-sans text-inkl text-lg max-w-2xl">
            Find your next adventure or craft project. We&apos;ll suggest the perfect activity based on your local weather.
          </p>
        </header>

        {/* Weather Widget */}
        <WeatherWidget onToggle={handleToggle} showingHikes={activeTab === 'hikes'} />

        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'hikes'}
            onClick={() => {
              setActiveTab('hikes')
              setManualOverride(true)
            }}
            className={`
              px-6 py-3 rounded-full font-sans text-base font-medium transition-all
              ${activeTab === 'hikes'
                ? 'bg-ember text-white shadow-md'
                : 'bg-blush/50 text-inkl hover:bg-blush'
              }
            `}
          >
            Hikes ({hikes.length})
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'crafts'}
            onClick={() => {
              setActiveTab('crafts')
              setManualOverride(true)
            }}
            className={`
              px-6 py-3 rounded-full font-sans text-base font-medium transition-all
              ${activeTab === 'crafts'
                ? 'bg-ember text-white shadow-md'
                : 'bg-blush/50 text-inkl hover:bg-blush'
              }
            `}
          >
            Crafts ({crafts.length})
          </button>
        </nav>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'hikes' ? (
            <section aria-label="Hiking trails">
              {/* ========== HIKE FILTERS ========== */}
              <div className="bg-blush/50 rounded-2xl p-4 mb-8">
                {/* Sort Dropdown */}
                <div className="flex items-center justify-between mb-4">
                  <p className="font-sans text-sm text-inkl uppercase tracking-wide">Sort by</p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-full bg-white text-ink font-sans text-sm border border-inkll/20 focus:outline-none focus:ring-2 focus:ring-ember"
                  >
                    <option value="distance">{getSortLabel('distance')}</option>
                    <option value="duration">{getSortLabel('duration')}</option>
                    <option value="elevation">{getSortLabel('elevation')}</option>
                    <option value="age">{getSortLabel('age')}</option>
                  </select>
                </div>

                {/* State Filters */}
                <div className="mb-4">
                  <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">State</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedState('')}
                      className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                        selectedState === ''
                          ? 'bg-ember text-white'
                          : 'bg-white text-ink hover:bg-blush'
                      }`}
                    >
                      All States
                    </button>
                    {hikeStates.map(state => (
                      <button
                        key={state}
                        onClick={() => setSelectedState(state)}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                          selectedState === state
                            ? 'bg-ember text-white'
                            : 'bg-white text-ink hover:bg-blush'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filters */}
                <div className="mb-4">
                  <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Difficulty</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedDifficulty('')}
                      className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                        selectedDifficulty === ''
                          ? 'bg-ember text-white'
                          : 'bg-white text-ink hover:bg-blush'
                      }`}
                    >
                      Any
                    </button>
                    {hikeDifficulties.map(diff => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-4 py-2 rounded-full font-sans text-sm capitalize transition-all ${
                          selectedDifficulty === diff
                            ? 'bg-ember text-white'
                            : 'bg-white text-ink hover:bg-blush'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Filters */}
                <div className="mb-4">
                  <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Duration</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedDuration('')}
                      className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                        selectedDuration === ''
                          ? 'bg-ember text-white'
                          : 'bg-white text-ink hover:bg-blush'
                      }`}
                    >
                      Any
                    </button>
                    {hikeDurations.map(dur => (
                      <button
                        key={dur.id}
                        onClick={() => setSelectedDuration(dur.id)}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                          selectedDuration === dur.id
                            ? 'bg-ember text-white'
                            : 'bg-white text-ink hover:bg-blush'
                        }`}
                      >
                        {dur.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shade Level Filters */}
                <div className="mb-4">
                  <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Shade</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedShade('')}
                      className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                        selectedShade === ''
                          ? 'bg-ember text-white'
                          : 'bg-white text-ink hover:bg-blush'
                      }`}
                    >
                      Any
                    </button>
                    {hikeShadeLevels.map(shade => (
                      <button
                        key={shade.id}
                        onClick={() => setSelectedShade(shade.id)}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                          selectedShade === shade.id
                            ? 'bg-ember text-white'
                            : 'bg-white text-ink hover:bg-blush'
                        }`}
                      >
                        {shade.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parking Filters */}
                <div className="mb-4">
                  <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Parking</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedParking('')}
                      className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                        selectedParking === ''
                          ? 'bg-ember text-white'
                          : 'bg-white text-ink hover:bg-blush'
                      }`}
                    >
                      Any
                    </button>
                    {hikeParkingTypes.map(park => (
                      <button
                        key={park.id}
                        onClick={() => setSelectedParking(park.id)}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                          selectedParking === park.id
                            ? 'bg-ember text-white'
                            : 'bg-white text-ink hover:bg-blush'
                        }`}
                      >
                        {park.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feature Filters */}
                <div className="mb-4">
                  <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Features</p>
                  <div className="flex gap-2 flex-wrap">
                    {hikeFeatures.map(feature => (
                      <button
                        key={feature.id}
                        onClick={() => handleFeatureToggle(feature.id)}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                          selectedFeatures.includes(feature.id)
                            ? 'bg-ember text-white'
                            : 'bg-white text-ink hover:bg-blush'
                        }`}
                      >
                        {feature.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear All Button */}
                {hasActiveHikeFilters && (
                  <button
                    onClick={clearHikeFilters}
                    className="mt-2 px-4 py-2 font-sans text-sm text-ember underline hover:text-terra transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}

                {/* Results Count */}
                <p className="mt-4 font-sans text-sm text-inkl">
                  Showing {filteredHikes.length} of {hikes.length} hikes
                </p>
              </div>

              {/* Hikes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHikes.map((hike, index) => (
                  <HikeCard key={hike.id} hike={hike} index={index} />
                ))}
              </div>
            </section>
          ) : (
            <section aria-label="Craft projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crafts.map((craft, index) => (
                  <CraftCard key={craft.id} craft={craft} index={index} />
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  )
}
