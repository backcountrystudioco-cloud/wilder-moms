import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const seasons = [
  {
    id: 'hot',
    label: 'Hot Weather',
    icon: 'sun',
    color: 'bg-terra/10 border-terra/30',
    items: [
      { name: 'Extra water', note: '2x normal amount', priority: 'critical' },
      { name: 'Electrolyte packets', note: 'prevent dehydration', priority: 'high' },
      { name: 'Cooling towel', note: 'neck cooling bandana', priority: 'medium' },
      { name: 'Sun hat with neck flap', note: 'broad brim recommended', priority: 'high' },
      { name: 'UV-protective clothing', note: 'UPF 50+ shirts', priority: 'high' },
      { name: 'Shade tent/umbrella', note: 'for rest stops', priority: 'medium' },
      { name: 'Early start timing', note: 'hike before 10am', priority: 'medium' },
      { name: 'Ice bandana', note: 'cool pulse points', priority: 'low' },
    ],
  },
  {
    id: 'cold',
    label: 'Cold / Winter',
    icon: 'snow',
    color: 'bg-slate/10 border-slate/30',
    items: [
      { name: 'Insulation layers', note: '3-layer system', priority: 'critical' },
      { name: 'Hand warmers', note: 'pack extra', priority: 'high' },
      { name: 'Balaclava / neck gaiter', note: 'face protection', priority: 'high' },
      { name: 'Insulated water bottle', note: 'prevent freezing', priority: 'high' },
      { name: 'Emergency bivvy', note: 'space blanket backup', priority: 'critical' },
      { name: 'Extra wool socks', note: 'keep feet dry', priority: 'high' },
      { name: 'Insulated boots', note: 'rated for temps', priority: 'critical' },
      { name: 'Headlamp (essential)', note: 'shorter daylight', priority: 'critical' },
    ],
  },
  {
    id: 'wet',
    label: 'Rainy / Wet',
    icon: 'rain',
    color: 'bg-slate/20 border-slate/40',
    items: [
      { name: 'Pack cover', note: 'waterproof rain fly', priority: 'critical' },
      { name: 'Waterproof bags', note: 'for dry clothes', priority: 'critical' },
      { name: 'Extra dry layers', note: 'backup set', priority: 'high' },
      { name: 'Quick-dry towel', note: 'microfiber recommended', priority: 'medium' },
      { name: 'Waterproof boots', note: 'or gaiters', priority: 'high' },
      { name: 'Waterproof jacket', note: 'breathable GORE-TEX', priority: 'critical' },
      { name: 'Waterproof hat', note: 'keep rain off face', priority: 'high' },
      { name: 'Dry bag for electronics', note: 'phone, first aid', priority: 'high' },
    ],
  },
  {
    id: 'bugs',
    label: 'Bug Season',
    icon: 'bugs',
    color: 'bg-olive/10 border-olive/30',
    items: [
      { name: 'DEET spray', note: '30%+ for ticks', priority: 'critical' },
      { name: 'Permethrin-treated clothes', note: 'pre-treat ahead', priority: 'high' },
      { name: 'Bug head net', note: 'essential for kids', priority: 'high' },
      { name: 'Long sleeves/pants', note: 'lightweight breathable', priority: 'high' },
      { name: 'Citronella wristbands', note: 'for kids', priority: 'medium' },
      { name: 'Tick check tool', note: 'fine-point tweezers', priority: 'critical' },
      { name: 'Light-colored clothes', note: 'easier to spot ticks', priority: 'medium' },
      { name: 'Picnic tablecloth', note: 'for breaks off ground', priority: 'low' },
    ],
  },
]

const priorityColors = {
  critical: 'bg-ember text-white',
  high: 'bg-gold text-white',
  medium: 'bg-olive text-white',
  low: 'bg-inkll text-inkl',
}

export default function SeasonalWeather({ onAddItems }) {
  const [activeSeason, setActiveSeason] = useState(null)

  const currentSeason = seasons.find((s) => s.id === activeSeason)

  const handleAddAll = () => {
    if (currentSeason && onAddItems) {
      onAddItems(currentSeason.items.map((i) => i.name))
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <h3 className="font-serif text-xl text-ink mb-2">Seasonal Conditions</h3>
      <p className="text-sm text-inkl mb-6">Filter recommendations by current conditions</p>

      {/* Season Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap overflow-x-auto pb-2 -mx-1 px-1">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setActiveSeason(activeSeason === season.id ? null : season.id)}
            className={`px-3 py-2 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeSeason === season.id
                ? `${season.color} border`
                : 'bg-parchment text-inkl hover:bg-blush'
            }`}
          >
            {season.icon} {season.label}
          </button>
        ))}
      </div>

      {/* Season Details */}
      <AnimatePresence mode="wait">
        {currentSeason && (
          <motion.div
            key={currentSeason.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${currentSeason.color} border rounded-xl p-4`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-serif text-lg text-ink">{currentSeason.icon} {currentSeason.label} Essentials</p>
              </div>
              <button
                onClick={handleAddAll}
                className="px-3 py-1.5 bg-ember text-white rounded-lg font-sans text-xs font-medium hover:bg-terra transition-colors"
              >
                Add All to List
              </button>
            </div>

            <div className="space-y-2">
              {currentSeason.items.map((item, i) => (
                <div key={i} className="flex items-start justify-between p-2 bg-white/50 rounded-lg gap-2">
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
          </motion.div>
        )}
      </AnimatePresence>

      {!activeSeason && (
        <div className="text-center py-8 text-inkl">
          <span className="text-2xl mb-2 block">Nature</span>
          <p className="text-sm">Select a season above to see tailored recommendations</p>
        </div>
      )}
    </div>
  )
}
