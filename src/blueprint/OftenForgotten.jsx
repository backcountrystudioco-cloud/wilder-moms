import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const oftenForgotten = [
  { item: 'Phone charger / portable battery', category: 'electronics' },
  { item: 'Extra socks', category: 'clothing' },
  { item: 'Headlamp spare batteries', category: 'electronics' },
  { item: 'Lip balm with SPF', category: 'skincare' },
  { item: 'Toilet paper & trowel', category: 'sanitation' },
  { item: 'Sunglasses strap', category: 'accessories' },
  { item: 'Hand sanitizer', category: 'sanitation' },
  { item: 'Backup snacks', category: 'food' },
  { item: 'Map / offline maps downloaded', category: 'navigation' },
  { item: 'Car keys (in waterproof bag)', category: 'misc' },
  { item: 'Personal medications', category: 'health' },
  { item: 'Emergency contacts list', category: 'safety' },
]

export default function OftenForgotten({ checkedItems = [], allItems = [] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [missingItems, setMissingItems] = useState([])

  useEffect(() => {
    if (allItems.length === 0) return

    const checkedLower = checkedItems.map(i => allItems[i]?.toLowerCase() || '')
    const missing = oftenForgotten.filter(f => {
      const hasItem = checkedLower.some(ci => ci.includes(f.item.toLowerCase()) || f.item.toLowerCase().includes(ci))
      return !hasItem
    })

    setMissingItems(missing)
    // Show banner if more than 3 commonly forgotten items are missing after user has 5+ checked
    setIsVisible(missing.length >= 3 && checkedItems.length >= 5)
  }, [checkedItems, allItems])

  if (!isVisible || missingItems.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-6"
      >
        <div className="bg-gold/10 border border-gold/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧠</span>
            <div className="flex-1">
              <p className="font-sans text-sm font-medium text-ink mb-1">Often Forgotten Items</p>
              <p className="text-xs text-inkl mb-3">Based on what other Wilder Moms usually leave behind:</p>
              <div className="flex flex-wrap gap-2">
                {missingItems.slice(0, 6).map((f, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 bg-white rounded-full text-xs text-inkl font-sans border border-inkll/30 hover:border-gold hover:text-ink transition-colors"
                  >
                    + {f.item}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
