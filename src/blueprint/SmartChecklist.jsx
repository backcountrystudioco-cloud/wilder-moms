import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SmartChecklist({ items, checkedItems = [], onToggle, title, listType = 'default' }) {
  const [localChecked, setLocalChecked] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`wilder_moms_blueprint_${listType}`)
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          return []
        }
      }
    }
    return checkedItems
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`wilder_moms_blueprint_${listType}`, JSON.stringify(localChecked))
    }
  }, [localChecked, listType])

  useEffect(() => {
    setLocalChecked(checkedItems)
  }, [checkedItems])

  const handleToggle = (index) => {
    const newChecked = localChecked.includes(index)
      ? localChecked.filter(i => i !== index)
      : [...localChecked, index]
    
    setLocalChecked(newChecked)
    if (onToggle) {
      onToggle(index)
    }
  }

  const progress = items.length > 0 ? (localChecked.length / items.length) * 100 : 0

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      {title && (
        <h3 className="font-serif text-xl text-ink mb-4">{title}</h3>
      )}
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-inkl font-sans">Progress</span>
          <span className="text-sm text-inkl font-sans">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-parchment rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full bg-olive rounded-full"
          />
        </div>
      </div>

      {/* Checklist Items */}
      <ul className="space-y-3">
        <AnimatePresence>
          {items.map((item, index) => {
            const isChecked = localChecked.includes(index)
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5"
                  style={{
                    backgroundColor: isChecked ? '#96963C' : 'transparent',
                    borderColor: isChecked ? '#96963C' : '#D2B496'
                  }}
                >
                  <motion.svg
                    initial={false}
                    animate={{ scale: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </button>
                <span
                  className={`font-sans text-base transition-all duration-200 ${
                    isChecked ? 'text-inkl line-through' : 'text-inkl'
                  }`}
                >
                  {item}
                </span>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}
