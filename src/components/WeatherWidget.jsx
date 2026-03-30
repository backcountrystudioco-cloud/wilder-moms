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
            {/* Weather Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 bg-cream rounded-full flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
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
                Good for hiking!
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-peach/30 text-inkl font-sans text-sm font-medium">
                Try indoor crafts
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
