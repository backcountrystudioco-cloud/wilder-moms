import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import WeatherWidget from '../components/WeatherWidget'
import HikeCard from '../components/HikeCard'
import CraftCard from '../components/CraftCard'
import { hikes } from '../data/hikes'
import { crafts } from '../data/crafts'

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

  // Sort hikes by... (keeping as-is since we don't have user location to calculate proximity)
  // If we had user location, we'd sort by distance
  const sortedHikes = [...hikes]

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
            Hikes 🏔️
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
            Crafts 🎨
          </button>
        </nav>

        {/* Content Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'hikes' ? (
            <section aria-label="Hiking trails">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedHikes.map((hike, index) => (
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
