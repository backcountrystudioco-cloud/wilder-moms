import { useState } from 'react'
import { motion } from 'framer-motion'

const difficultyLevels = [
  { 
    id: 'easy', 
    label: 'Easy', 
    description: 'Paved paths, close to car, mild terrain',
    additions: ['Minimal water', 'Basic first aid', 'Phone'],
    removals: ['Emergency blanket', 'Extra layers'],
  },
  { 
    id: 'moderate', 
    label: 'Moderate', 
    description: 'Unmarked trails, some elevation, 1-2 hrs from help',
    additions: ['Extra water', 'Headlamp', 'Whistle', 'Extra snacks'],
    removals: [],
  },
  { 
    id: 'challenging', 
    label: 'Challenging', 
    description: 'Steep terrain, remote, limited cell service',
    additions: ['Emergency bivvy', 'Map & compass', 'Fire starter', 'Signaling mirror', 'Backup communication'],
    removals: [],
  },
  { 
    id: 'extreme', 
    label: 'Extreme / Remote', 
    description: 'Expedition style, far from help, technical terrain',
    additions: ['Personal locator beacon', 'Satellite communicator', 'Full emergency kit', 'Multiple backup systems', 'Detailed trip plan left behind'],
    removals: [],
  },
]

export default function TripDifficultySlider({ onDifficultyChange }) {
  const [selected, setSelected] = useState('moderate')

  const handleSelect = (id) => {
    setSelected(id)
    const level = difficultyLevels.find((l) => l.id === id)
    if (onDifficultyChange) {
      onDifficultyChange({ additions: level.additions, removals: level.removals, level: id })
    }
  }

  const currentLevel = difficultyLevels.find((l) => l.id === selected)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <h3 className="font-serif text-xl text-ink mb-2">Trip Difficulty</h3>
      <p className="text-sm text-inkl mb-6">How remote is your adventure?</p>

      {/* Difficulty Selector */}
      <div className="flex gap-2 mb-6">
        {difficultyLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => handleSelect(level.id)}
            className={`flex-1 px-3 py-2 rounded-lg font-sans text-xs font-medium transition-all ${
              selected === level.id
                ? level.id === 'easy' ? 'bg-olive text-white' :
                  level.id === 'moderate' ? 'bg-gold text-white' :
                  level.id === 'challenging' ? 'bg-terra text-white' :
                  'bg-ember text-white'
                : 'bg-parchment text-inkl hover:bg-blush'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Current Selection Details */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cream rounded-xl p-4"
      >
        <p className="text-sm text-inkl mb-4">{currentLevel.description}</p>

        {currentLevel.additions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-ink mb-2">Consider adding:</p>
            <div className="flex flex-wrap gap-1.5">
              {currentLevel.additions.map((item, i) => (
                <span key={i} className="px-2 py-1 bg-olive/10 text-olive text-xs rounded-full font-sans">
                  + {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {currentLevel.removals.length > 0 && (
          <div>
            <p className="text-xs font-medium text-ink mb-2">You can skip:</p>
            <div className="flex flex-wrap gap-1.5">
              {currentLevel.removals.map((item, i) => (
                <span key={i} className="px-2 py-1 bg-inkll/20 text-inkl text-xs rounded-full font-sans line-through">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Warning for extreme */}
      {selected === 'extreme' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-ember/10 border border-ember/30 rounded-lg"
        >
          <p className="text-xs text-ember font-medium">
            ⚠️ Always file a detailed trip plan with someone you trust before heading out.
          </p>
        </motion.div>
      )}
    </div>
  )
}
