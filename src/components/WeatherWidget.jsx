import { useLocation } from '../hooks/useLocation'
import { useWeather } from '../hooks/useWeather'
import { motion } from 'framer-motion'

export default function WeatherWidget({ onToggle, showingHikes }) {
  const location = useLocation()
  const weather = useWeather(location.lat, location.lon)

  const isLoading = location.loading || weather.loading
  const error = location.error || weather.error

  return (
    <section className="bg-blush/50 rounded-2xl p-6 mb-8">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blush rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-32 bg-blush rounded animate-pulse" />
            <div className="h-4 w-24 bg-blush rounded animate-pulse" />
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-ink font-sans font-medium">Weather Unavailable</p>
            <p className="text-inkl text-sm">{error}</p>
          </div>
          <button
            onClick={onToggle}
            className="px-4 py-2 rounded-full bg-ember text-white font-sans text-sm hover:bg-forest transition-colors"
          >
            {showingHikes ? 'Show Crafts' : 'Show Hikes'}
          </button>
        </div>
      )}

      {/* Weather Content */}
      {!isLoading && !error && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* Weather Emoji */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-3xl"
            >
              {weather.emoji}
            </motion.div>

            {/* Location & Weather Info */}
            <div>
              <h2 className="text-ink font-serif text-xl md:text-2xl">
                {location.city}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-inkl font-sans text-lg">
                  {weather.temp}°F · {weather.description}
                </span>
              </div>
            </div>
          </div>

          {/* Badge & Toggle */}
          <div className="flex items-center gap-3">
            {/* Good for Hiking Badge */}
            {weather.isGoodForHiking ? (
              <span className="px-3 py-1.5 rounded-full bg-olive/20 text-forest font-sans text-sm font-medium">
                Good for hiking! ☀️
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-peach/30 text-inkl font-sans text-sm font-medium">
                Try indoor crafts 🎨
              </span>
            )}

            {/* Manual Toggle */}
            <button
              onClick={onToggle}
              className="px-4 py-2 rounded-full border border-inkll/30 bg-cream text-ink font-sans text-sm hover:border-ember hover:text-ember transition-colors"
            >
              {showingHikes ? 'Show Crafts' : 'Show Hikes'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
