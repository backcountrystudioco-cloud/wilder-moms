import { useState } from 'react'
import { motion } from 'framer-motion'

const elevationWarnings = [
  { min: 0, max: 7000, message: 'Standard precautions apply', severity: 'low' },
  { min: 7000, max: 9500, message: 'UV intensity 20% stronger — sunscreen required', severity: 'medium' },
  { min: 9500, max: 11000, message: 'Afternoon lightning risk window: 12-3pm. Plan early start.', severity: 'high' },
  { min: 11000, max: 14000, message: 'Summit weather can change in minutes. Pack emergency layers.', severity: 'critical' },
]

const weatherAlerts = [
  { condition: 'rain', alert: 'Afternoon storms possible — rain shells + dry layer in every pack', elevation: 9500 },
  { condition: 'thunderstorm', alert: 'Lightning risk above tree line after noon — summit before 11am', elevation: 9500 },
  { condition: 'wind', alert: 'Wind can drop temp 10°F+ quickly — pack wind layer', elevation: 7000 },
  { condition: 'hot', alert: 'Trail above 75°F at start — extra water + plan cooler start time', elevation: 0 },
]

const momSpecificAdditions = [
  { name: 'Emergency whistle (each child)', note: 'Helps kids stay calm and signal if separated', priority: 'high' },
  { name: 'Dry socks (extras)', note: 'Prevents cold feet — biggest kid complaint', priority: 'high' },
  { name: 'Blister care (moleskin)', note: 'Kid feet blister fast in new shoes', priority: 'high' },
  { name: 'Extra inhaler/EpiPen', note: 'If allergies are a factor', priority: 'critical' },
  { name: 'Hand warmers', note: 'Quick warmth for kids who stop moving', priority: 'medium' },
  { name: 'Baby wipes', note: 'Cleanup, emergencies, trail dust', priority: 'high' },
  { name: 'Backup snack (3x normal)', note: 'Hangry kids = turnaround', priority: 'critical' },
  { name: 'Sunscreen (extra application)', note: 'Altitude UV 30-40% stronger', priority: 'critical' },
]

const priorityColors = {
  critical: 'bg-ember text-white',
  high: 'bg-gold text-white',
  medium: 'bg-olive text-white',
  low: 'bg-inkll text-white',
}

export default function TrailSafetyCheck({ onAddItems }) {
  const [elevation, setElevation] = useState(8000)
  const [weatherCondition, setWeatherCondition] = useState('clear')
  const [tripHours, setTripHours] = useState(3)
  const [hasKids, setHasKids] = useState(true)

  const currentElevationWarning = elevationWarnings.find(e => elevation >= e.min && elevation < e.max)

  const filteredWeatherAlerts = weatherAlerts.filter(alert => {
    if (weatherCondition === 'clear') return false
    if (alert.condition === weatherCondition) return true
    return false
  })

  const getLightningWindow = () => {
    if (elevation >= 9500) {
      return { window: '12-3pm', message: 'Lightning risk window active — summit before noon or exit by 11:30am', severity: 'critical' }
    }
    return null
  }

  const getTurnaroundBuffer = () => {
    const baseBuffer = hasKids ? 1.5 : 1.2
    const adjustedHours = tripHours * baseBuffer
    const suggestedReturn = Math.max(1, adjustedHours - 1)
    return `${suggestedReturn.toFixed(1)} hours`
  }

  const lightning = getLightningWindow()

  const handleAddAllMomItems = () => {
    if (onAddItems) {
      onAddItems(momSpecificAdditions.map(i => i.name))
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl text-ink">Trail Safety Check</h3>
          <p className="text-sm text-inkl">Weather-smart warnings for your hike</p>
        </div>
        <span className="px-3 py-1 bg-ember/10 text-ember rounded-full text-xs font-sans">Beta</span>
      </div>

      {/* Elevation Input */}
      <div className="mb-6">
        <label className="block font-sans text-sm text-ink mb-2">
          Trail Elevation: <span className="font-medium text-ember">{elevation.toLocaleString()} ft</span>
        </label>
        <input
          type="range"
          min="5000"
          max="14000"
          step="500"
          value={elevation}
          onChange={(e) => setElevation(Number(e.target.value))}
          className="w-full h-2 bg-blush rounded-lg appearance-none cursor-pointer accent-ember"
        />
        <div className="flex justify-between text-xs text-inkll mt-1">
          <span>5,000ft</span>
          <span>14,000ft</span>
        </div>
      </div>

      {/* Elevation Warning */}
      {currentElevationWarning && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-6 border ${
            currentElevationWarning.severity === 'critical' ? 'bg-ember/10 border-ember/30' :
            currentElevationWarning.severity === 'high' ? 'bg-gold/10 border-gold/30' :
            currentElevationWarning.severity === 'medium' ? 'bg-olive/10 border-olive/30' :
            'bg-parchment border-inkll/20'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              currentElevationWarning.severity === 'critical' ? 'bg-ember' :
              currentElevationWarning.severity === 'high' ? 'bg-gold' :
              currentElevationWarning.severity === 'medium' ? 'bg-olive' :
              'bg-inkll'
            }`} />
            <p className="text-sm text-ink font-medium">{currentElevationWarning.message}</p>
          </div>
        </motion.div>
      )}

      {/* Lightning Warning (if applicable) */}
      {lightning && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl mb-6 bg-ember border border-ember/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">Lightning</span>
            <p className="text-sm text-ember font-medium">{lightning.message}</p>
          </div>
          <p className="text-xs text-ember/80">Lightning can strike from clear sky — white clouds building = incoming weather</p>
        </motion.div>
      )}

      {/* Weather Condition */}
      <div className="mb-6">
        <label className="block font-sans text-sm text-ink mb-2">Weather Conditions</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'clear', label: 'Clear', color: 'bg-forest/10 border-forest/30' },
            { id: 'rain', label: 'Rain', color: 'bg-slate/20 border-slate/40' },
            { id: 'thunderstorm', label: 'Storm', color: 'bg-ember/10 border-ember/30' },
            { id: 'wind', label: 'Wind', color: 'bg-olive/10 border-olive/30' },
          ].map((w) => (
            <button
              key={w.id}
              onClick={() => setWeatherCondition(w.id)}
              className={`px-3 py-2 rounded-lg font-sans text-sm border transition-all ${
                weatherCondition === w.id
                  ? `${w.color} border`
                  : 'bg-parchment border-transparent hover:border-inkll/20'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      {filteredWeatherAlerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {filteredWeatherAlerts.map((alert, i) => (
            <div key={i} className="p-3 rounded-lg bg-gold/10 border border-gold/30">
              <p className="text-sm text-ink">Warning: {alert.alert}</p>
            </div>
          ))}
        </div>
      )}

      {/* Trip Duration with Kids */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="font-sans text-sm text-ink">Planned Hike Duration</label>
          <label className="flex items-center gap-2 text-xs text-inkl">
            <input
              type="checkbox"
              checked={hasKids}
              onChange={(e) => setHasKids(e.target.checked)}
              className="w-4 h-4 accent-ember"
            />
            Hiking with kids
          </label>
        </div>
        <input
          type="range"
          min="1"
          max="8"
          step="0.5"
          value={tripHours}
          onChange={(e) => setTripHours(Number(e.target.value))}
          className="w-full h-2 bg-blush rounded-lg appearance-none cursor-pointer accent-ember"
        />
        <p className="text-sm text-inkl mt-2">
          <span className="font-medium text-ember">{tripHours} hours</span>
          {hasKids && <span className="text-inkl"> → Plan for {getTurnaroundBuffer()} actual hiking time with kids</span>}
        </p>
      </div>

      {/* Mom-Specific Additions */}
      <div className="border-t border-inkll/10 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-serif text-lg text-ink">Mom's Safety Extras</h4>
          <button
            onClick={handleAddAllMomItems}
            className="px-3 py-1.5 bg-ember text-white rounded-lg font-sans text-xs font-medium hover:bg-terra transition-colors"
          >
            Add All to List
          </button>
        </div>
        <div className="space-y-2">
          {momSpecificAdditions.map((item, i) => (
            <div key={i} className="flex items-start justify-between p-2 bg-parchment/50 rounded-lg gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded text-xs font-sans ${priorityColors[item.priority]}`}>
                  {item.priority}
                </span>
                <span className="text-sm text-ink">{item.name}</span>
              </div>
              <span className="text-xs text-inkl flex-shrink-0 hidden sm:inline">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
