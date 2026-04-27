import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Base essentials for any hike
const BASE_ESSENTIALS = [
  { id: 'water', label: 'Water bottle(s)', icon: '💧' },
  { id: 'snacks', label: 'Healthy snacks', icon: '🍎' },
  { id: 'phone', label: 'Fully charged phone', icon: '📱' },
  { id: 'firstaid', label: 'Small first aid kit', icon: '🩹' },
  { id: 'sunscreen', label: 'Sunscreen', icon: '☀️' },
  { id: 'layers', label: 'Extra layer/jacket', icon: '🧥' },
  { id: 'wipes', label: 'Wipes/hand sanitizer', icon: '🧻' },
]

// Duration-based items
const DURATION_ITEMS = {
  short: [], // < 1 hour
  medium: [], // 1-2 hours
  long: [ // > 2 hours
    { id: 'lunch', label: 'Lunch/packed meal', icon: '🥪' },
    { id: 'extra_water', label: 'Extra water', icon: '💧' },
  ],
}

// Trail feature items
const FEATURE_ITEMS = {
  hasWater: [
    { id: 'water_shoes', label: 'Water shoes/waterproof sandals', icon: '👟' },
    { id: 'towel', label: 'Small towel for water play', icon: '🛁' },
    { id: 'spare_clothes', label: 'Spare clothes for kids', icon: '👕' },
  ],
  restrooms: [
    { id: 'toilet_paper', label: 'Toilet paper (just in case)', icon: '🧻' },
  ],
  dogsAllowed: [
    { id: 'dog_water', label: 'Water for dog', icon: '🐕' },
    { id: 'dog_treats', label: 'Dog treats', icon: '🦴' },
    { id: 'poop_bags', label: 'Poop bags', icon: '🗑️' },
  ],
}

// Age-based items
const AGE_ITEMS = {
  baby: [ // < 1 year
    { id: 'carrier', label: 'Baby carrier (not stroller)', icon: '👶' },
    { id: 'diaper_bag', label: 'Diaper bag + extras', icon: '👶' },
    { id: 'change_mat', label: 'Change mat', icon: '🛏️' },
  ],
  toddler: [ // 1-3 years
    { id: 'stroller', label: 'Stroller (if needed)', icon: '婴儿车' },
    { id: 'comfort_item', label: 'Comfort item (blanket/toy)', icon: '🧸' },
    { id: 'activities', label: 'Snacks/comfort items', icon: '🍎' },
  ],
  preschool: [ // 4-5 years
    { id: 'binoculars', label: 'Kid binoculars', icon: '🔭' },
    { id: 'nature_journal', label: 'Small nature journal', icon: '📓' },
  ],
  schoolAge: [ // 6+ years
    { id: 'backpack', label: 'Small backpack', icon: '🎒' },
    { id: 'camera_kid', label: 'Kid camera/binoculars', icon: '📷' },
  ],
}

// Difficulty-based items
const DIFFICULTY_ITEMS = {
  easy: [
    { id: 'hiking_stick', label: 'Walking stick (optional)', icon: '🦯' },
  ],
  moderate: [
    { id: 'hiking_boots', label: 'Sturdy shoes/boots', icon: '🥾' },
    { id: 'hiking_poles', label: 'Hiking poles', icon: '🦯' },
  ],
  challenging: [
    { id: 'hiking_boots', label: 'Hiking boots (required)', icon: '🥾' },
    { id: 'hiking_poles', label: 'Hiking poles', icon: '🦯' },
    { id: 'trekking_plan', label: 'Trekking plan', icon: '📋' },
  ],
}

export default function PackListGenerator({ trail, familyInfo, weather, onClose }) {
  const [packList, setPackList] = useState([])
  const [checkedItems, setCheckedItems] = useState([])
  const [showPrint, setShowPrint] = useState(false)

  useEffect(() => {
    generatePackList()
  }, [trail, familyInfo])

  const generatePackList = () => {
    const items = []

    // Add base essentials
    items.push(...BASE_ESSENTIALS)

    // Add duration items
    const duration = trail?.duration || 60
    if (duration > 120) {
      items.push(...DURATION_ITEMS.long)
    }

    // Add feature items
    if (trail?.hasWater) {
      items.push(...FEATURE_ITEMS.hasWater)
    }
    if (trail?.restrooms) {
      items.push(...FEATURE_ITEMS.restrooms)
    }
    if (trail?.dogsAllowed) {
      items.push(...FEATURE_ITEMS.dogsAllowed)
    }

    // Add age-based items
    const age = familyInfo?.youngestAge ?? 5
    if (age <= 0) {
      items.push(...AGE_ITEMS.baby)
      if (familyInfo?.needsStroller) {
        items.push(...AGE_ITEMS.toddler.filter(i => i.id === 'stroller'))
      }
    } else if (age <= 3) {
      items.push(...AGE_ITEMS.toddler)
      if (familyInfo?.needsStroller) {
        items.push(...AGE_ITEMS.toddler.filter(i => i.id === 'stroller'))
      }
    } else if (age <= 5) {
      items.push(...AGE_ITEMS.preschool)
    } else {
      items.push(...AGE_ITEMS.schoolAge)
    }

    // Add difficulty items
    const difficulty = trail?.difficulty || 'easy'
    items.push(...DIFFICULTY_ITEMS[difficulty])

    // Add weather-based items
    if (weather?.temp > 80) {
      items.push({ id: 'cooling_towel', label: 'Cooling towel', icon: '🧊' })
      items.push({ id: 'hat', label: 'Sun hat', icon: '👒' })
    }
    if (weather?.temp < 50) {
      items.push({ id: 'warm_layers', label: 'Extra warm layers', icon: '🧥' })
      items.push({ id: 'gloves', label: 'Gloves (for kids)', icon: '🧤' })
    }
    if (weather?.level?.includes('rain') || weather?.level?.includes('drizzle')) {
      items.push({ id: 'rain_gear', label: 'Rain jackets/cover', icon: '🌧️' })
      items.push({ id: 'tarp', label: 'Small tarp/blanket', icon: '🛖' })
    }

    // Remove duplicates by id
    const uniqueItems = items.filter((item, index, self) => 
      index === self.findIndex(t => t.id === item.id)
    )

    setPackList(uniqueItems)
  }

  const handleToggle = (id) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const progress = packList.length > 0 ? (checkedItems.length / packList.length) * 100 : 0

  const handlePrint = () => {
    window.print()
  }

  if (!trail) return null

  return (
    <>
      <style>{`
        @media print {
          .pack-list-item {
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
            list-style: none;
            display: flex;
            align-items: center;
          }
          .pack-list-item::before {
            content: '☐';
            display: inline-block;
            width: 24px;
            font-size: 18px;
          }
          .pack-list-item.checked::before {
            content: '☑';
          }
          .pack-list-item.checked span {
            text-decoration: line-through;
            opacity: 0.5;
          }
          .print-header {
            display: none;
          }
        }
      `}</style>

      <div className="fixed inset-0 bg-ink/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-cream rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="bg-forest p-5 print-header">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-white">Pack List</h2>
                <p className="text-forestl text-sm mt-1">
                  {trail.title} • {trail.durationLabel}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-forestl mb-1">
                <span>Packed</span>
                <span>{checkedItems.length}/{packList.length}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* List */}
          <div className="p-5 overflow-y-auto max-h-[50vh]">
            <div className="space-y-1">
              {packList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                    checkedItems.includes(item.id) 
                      ? 'bg-olive/20' 
                      : 'bg-white hover:bg-blush/30'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    checkedItems.includes(item.id)
                      ? 'bg-forest border-forest'
                      : 'border-inkll'
                  }`}>
                    {checkedItems.includes(item.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={`flex-1 font-sans ${
                    checkedItems.includes(item.id) ? 'text-forest line-through' : 'text-ink'
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-inkll/10 bg-white">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-3 bg-forest text-white rounded-full font-sans font-medium hover:bg-forest/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Pack List
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
