import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const relatedItems = {
  sunscreen: ['lip balm with SPF', 'sunglasses', 'sun hat', 'UV-protective clothing'],
  'water bottle': ['water filter', 'electrolyte packets', 'backup water'],
  'first aid kit': ['blister kit', 'emergency blanket', 'medical tape'],
  hat: ['neck gaiter', 'sunglasses strap', 'cooling towel'],
  snacks: ['electrolytes', 'emergency food bars', 'trail mix'],
  'rain jacket': ['pack cover', 'waterproof pants', 'extra dry layers'],
  headlamp: ['spare batteries', 'red light mode backup'],
  phone: ['portable charger', 'offline maps downloaded', 'waterproof case'],
  'hiking boots': ['extra socks', 'blister prevention', 'waterproof gaiters'],
  sunglasses: ['sunglasses strap', 'hard case', 'cleaning cloth'],
  'insect repellent': ['bug net', 'tick remover', 'long sleeves'],
}

const commonMistakes = [
  { item: 'toilet paper', often_forgets: 'trowel, hand sanitizer' },
  { item: 'sunscreen', often_forgets: 'reapply sunscreen, SPF lip balm' },
  { item: 'water', often_forgets: 'filter/purification for longer trips' },
  { item: 'headlamp', often_forgets: 'spare batteries, red light backup' },
  { item: 'phone', often_forgets: 'offline maps, portable battery, car key location' },
  { item: 'first aid kit', often_forgets: 'personal medications, emergency contacts list' },
]

export default function SmartOmissions({ checkedItems, allItems }) {
  const [suggestions, setSuggestions] = useState([])
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    if (!allItems || allItems.length === 0) return

    const checkedLower = checkedItems.map(i => allItems[i]?.toLowerCase() || '')
    const newSuggestions = []

    // Check for missing related items
    checkedLower.forEach((item) => {
      const match = Object.entries(relatedItems).find(([key]) => 
        item.includes(key) || key.includes(item)
      )
      if (match) {
        const [matchedKey, related] = match
        related.forEach((rel) => {
          const hasRelated = checkedLower.some((ci) => ci.includes(rel) || rel.includes(ci))
          if (!hasRelated) {
            const relatedOriginal = allItems.find((ai) => 
              ai.toLowerCase().includes(rel) || rel.includes(ai.toLowerCase())
            )
            if (relatedOriginal) {
              newSuggestions.push({
                missing: relatedOriginal,
                because: matchedKey,
              })
            }
          }
        })
      }
    })

    // Remove duplicates
    const unique = newSuggestions.filter(
      (v, i, a) => a.findIndex((t) => t.missing === v.missing) === i
    )

    setSuggestions(unique)
    setShowPulse(unique.length > 0 && checkedItems.length > 3)
  }, [checkedItems, allItems])

  if (suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-4"
      >
        <div className={`bg-peach/20 border border-peach/40 rounded-xl p-4 ${showPulse ? 'animate-pulse' : ''}`}>
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-sans text-sm font-medium text-ink mb-2">Smart Suggestion</p>
              <ul className="space-y-1.5">
                {suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-inkl">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember mt-1.5 flex-shrink-0" />
                    <span>
                      Add <strong className="text-ink">{s.missing}</strong> — goes great with {s.because}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
