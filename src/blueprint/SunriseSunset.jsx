import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const monthSunData = {
  jan: { sunrise: '7:20', sunset: '5:00', daylight: '9h 40m' },
  feb: { sunrise: '6:50', sunset: '5:40', daylight: '10h 50m' },
  mar: { sunrise: '6:50', sunset: '6:20', daylight: '11h 30m' }, // DST starts
  apr: { sunrise: '6:00', sunset: '7:00', daylight: '13h 00m' },
  may: { sunrise: '5:30', sunset: '7:30', daylight: '14h 00m' },
  jun: { sunrise: '5:20', sunset: '8:00', daylight: '14h 40m' },
  jul: { sunrise: '5:35', sunset: '7:50', daylight: '14h 15m' },
  aug: { sunrise: '6:10', sunset: '7:20', daylight: '13h 10m' },
  sep: { sunrise: '6:40', sunset: '6:30', daylight: '11h 50m' },
  oct: { sunrise: '7:10', sunset: '5:40', daylight: '10h 30m' }, // DST ends
  nov: { sunrise: '7:40', sunset: '4:50', daylight: '9h 10m' },
  dec: { sunrise: '7:15', sunset: '4:40', daylight: '9h 25m' },
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function SunriseSunset({ onAddItems }) {
  const [month, setMonth] = useState(new Date().getMonth())
  const [elevation, setElevation] = useState(8000)
  const [hikeDuration, setHikeDuration] = useState(3)

  const sunData = Object.values(monthSunData)[month]
  const monthName = monthNames[month]

  // Temperature adjustment based on elevation
  const getElevationTempAdjustment = () => {
    if (elevation < 7000) return '+0°F'
    if (elevation < 9500) return '-5 to 10°F'
    if (elevation < 11000) return '-10 to 15°F'
    return '-15 to 20°F'
  }

  // Best hiking windows by month
  const getBestWindow = () => {
    if (month >= 5 && month <= 8) {
      return { start: '6:00', end: '11:00', note: 'Coolest window — avoid afternoon heat' }
    }
    if (month === 3 || month === 4 || month === 9 || month === 10) {
      return { start: '8:00', end: '14:00', note: 'Comfortable temperatures — start early for summit' }
    }
    return { start: '9:00', end: '13:00', note: 'Short daylight — plan accordingly' }
  }

  const handleAddSunriseItems = () => {
    if (onAddItems) {
      onAddItems(['Headlamp (extra batteries)', 'Sunrise timing noted', 'Plan return 1hr before sunset'])
    }
  }

  const bestWindow = getBestWindow()
  const tempAdjust = getElevationTempAdjustment()

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <h3 className="font-serif text-xl text-ink mb-2">Sunrise & Sunset</h3>
      <p className="text-sm text-inkl mb-6">Light timing + best hiking windows for {monthName}</p>

      {/* Month Selector */}
      <div className="mb-6">
        <label className="block font-sans text-sm text-ink mb-2">Month</label>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-1">
          {monthNames.map((name, i) => (
            <button
              key={i}
              onClick={() => setMonth(i)}
              className={`px-2 py-1.5 rounded font-sans text-xs transition-all ${
                month === i
                  ? 'bg-ember text-white'
                  : 'bg-parchment text-inkl hover:bg-blush'
              }`}
            >
              {name.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gold/10 rounded-xl text-center">
          <span className="text-2xl block mb-1">🌅</span>
          <p className="font-sans text-xs text-inkl uppercase tracking-wide">Sunrise</p>
          <p className="font-serif text-2xl text-ink">{sunData.sunrise}</p>
        </div>
        <div className="p-4 bg-ember/10 rounded-xl text-center">
          <span className="text-2xl block mb-1">🌇</span>
          <p className="font-sans text-xs text-inkl uppercase tracking-wide">Sunset</p>
          <p className="font-serif text-2xl text-ink">{sunData.sunset}</p>
        </div>
      </div>

      {/* Daylight + Elevation */}
      <div className="p-4 bg-forest/10 rounded-xl mb-6">
        <p className="text-sm text-ink mb-1">
          <span className="font-medium">Daylight:</span> {sunData.daylight}
        </p>
        <p className="text-sm text-ink">
          <span className="font-medium">At {elevation.toLocaleString()}ft:</span> temp drops {tempAdjust}
        </p>
      </div>

      {/* Best Hiking Window */}
      <div className="p-4 bg-olive/10 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">⏰</span>
          <p className="font-sans text-sm font-medium text-ink">Best Hiking Window</p>
        </div>
        <p className="font-serif text-xl text-ink mb-1">
          {bestWindow.start} – {bestWindow.end}
        </p>
        <p className="text-xs text-inkl">{bestWindow.note}</p>
      </div>

      {/* Elevation Input */}
      <div className="mb-4">
        <label className="block font-sans text-sm text-ink mb-2">
          Your Trail: <span className="font-medium text-ember">{elevation.toLocaleString()} ft</span>
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
      </div>

      {/* Hike Duration */}
      <div className="mb-6">
        <label className="block font-sans text-sm text-ink mb-2">
          Planned Duration: <span className="font-medium text-ember">{hikeDuration}h</span>
        </label>
        <input
          type="range"
          min="1"
          max="8"
          step="0.5"
          value={hikeDuration}
          onChange={(e) => setHikeDuration(Number(e.target.value))}
          className="w-full h-2 bg-blush rounded-lg appearance-none cursor-pointer accent-ember"
        />
      </div>

      {/* Return Warning */}
      {(() => {
        // Parse sunset time to calculate return deadline
        const [sunsetHour, sunsetMin] = sunData.sunset.split(':').map(Number)
        const returnHour = sunsetHour - 1
        return (
          <div className="p-3 bg-ember/10 border border-ember/20 rounded-lg">
            <p className="text-sm text-ink">
              <span className="font-medium">Return by:</span> {returnHour}:{sunsetMin.toString().padStart(2, '0')} ({sunData.sunset} sunset, 1hr buffer)
            </p>
          </div>
        )
      })()}

      {/* Quick Add */}
      <button
        onClick={handleAddSunriseItems}
        className="w-full mt-4 px-4 py-2 bg-forest text-white rounded-xl font-sans text-sm font-medium hover:bg-forest/90 transition-colors"
      >
        + Add Sun Timing Items to List
      </button>
    </div>
  )
}
