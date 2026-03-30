import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const templates = [
  {
    id: 'baby-essentials',
    name: 'Baby Essentials',
    items: ['diapers', 'wipes', 'formula', 'pacifier', 'baby food', 'diaper cream'],
  },
  {
    id: 'pet-friendly',
    name: 'Pet-Friendly',
    items: ['dog treats', 'collapsible bowl', 'leash', 'poop bags', 'toy', 'tick remover'],
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    items: ['water', 'snacks', 'phone', 'keys', 'sunscreen'],
  },
  {
    id: 'photo-ready',
    name: 'Photo Ready',
    items: ['camera', 'extra batteries', 'power bank', 'lens cleaner', 'tripod'],
  },
  {
    id: 'emergency-kit',
    name: 'Emergency Kit',
    items: ['emergency blanket', 'whistle', 'flashlight', 'backup meds', 'cash'],
  },
]

export default function QuickTemplates({ onAddItems, availableItems }) {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const handleSelect = (template) => {
    if (selected === template.id) {
      setSelected(null)
    } else {
      setSelected(template.id)
      onAddItems(template.items)
    }
  }

  const isItemAvailable = (item) => {
    if (!availableItems || availableItems.length === 0) return true
    return availableItems.some(
      (ai) => ai.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(ai.toLowerCase())
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-serif text-lg text-ink">Quick Templates</h3>
      <p className="text-sm text-inkl mb-4">Click a template to add all items at once.</p>
      
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => {
          const isSelected = selected === template.id
          const isHovered = hovered === template.id
          const hasUnavailableItems = template.items.some((item) => !isItemAvailable(item))

          return (
            <motion.div
              key={template.id}
              className="relative"
              onHoverStart={() => setHovered(template.id)}
              onHoverEnd={() => setHovered(null)}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => handleSelect(template)}
                className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-olive text-white'
                    : 'bg-blush/50 text-inkl hover:bg-blush'
                }`}
              >
                {template.name}
              </button>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl shadow-lg border border-inkll/20 p-4 min-w-[220px]"
                  >
                    <p className="text-xs text-inkl mb-2 font-medium">Includes:</p>
                    <ul className="space-y-1.5">
                      {template.items.map((item, i) => (
                        <li
                          key={i}
                          className={`text-sm flex items-center gap-2 ${
                            isItemAvailable(item) ? 'text-inkl' : 'text-inkll line-through'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isItemAvailable(item) ? 'bg-olive' : 'bg-inkll'
                            }`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {hasUnavailableItems && (
                      <p className="text-xs text-ember mt-3 pt-2 border-t border-inkll/20">
                        Some items may already be on your list
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
