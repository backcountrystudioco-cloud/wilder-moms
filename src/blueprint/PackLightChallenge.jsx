import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const challenges = [
  {
    id: 'snacks_vs_tp',
    scenario: "You're over by 2 items. Remove one:",
    options: ['Extra snack bar', 'Toilet paper', 'Backup socks'],
    correct: 1,
    explanation: "Toilet paper can be replaced with leaves or moss in a pinch, but hunger is real!",
  },
  {
    id: 'luxury_vs_essential',
    scenario: "Space is tight for your day hike. Skip:",
    options: ['Trail guidebook', 'Extra water', 'First aid kit'],
    correct: 0,
    explanation: "Guidebooks are great but your phone has offline maps now!",
  },
  {
    id: 'phone_extras',
    scenario: "Your phone is heavy enough. Drop one:",
    options: ['Portable charger', 'Phone case', 'Waterproof pouch'],
    correct: 1,
    explanation: "A bulky case adds weight for little protection benefit on the trail.",
  },
  {
    id: 'baby_extras',
    scenario: "Toddler gear space is limited. Skip:",
    options: ['Diaper', 'Change of clothes', 'Favorite toy'],
    correct: 2,
    explanation: "A favorite toy can wait - diapers and dry clothes cannot!",
  },
]

const itemWeights = {
  water: 1.2, // lbs per 16oz
  snacks: 0.3,
  'first aid kit': 0.5,
  flashlight: 0.4,
  'rain jacket': 0.6,
  'extra layers': 0.8,
  sunscreen: 0.2,
  'toilet paper': 0.1,
  phone: 0.4,
  'portable charger': 0.3,
}

const recommendedLimits = {
  day: 15, // items for day hike
  overnight: 30,
  backpacking: 40,
}

export default function PackLightChallenge({ totalItems, tripType = 'day', onOptimize }) {
  const [showChallenge, setShowChallenge] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const limit = recommendedLimits[tripType] || 15
  const isOver = totalItems > limit
  const overBy = totalItems - limit

  useEffect(() => {
    if (isOver && totalItems > 5) {
      setShowChallenge(true)
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
      setCurrentChallenge(randomChallenge)
    }
  }, [isOver, totalItems])

  const handleSelect = (index) => {
    setSelected(index)
    setShowResult(true)
    if (index === currentChallenge.correct) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (challenges.length > 1) {
      const remaining = challenges.filter(c => c.id !== currentChallenge?.id)
      if (remaining.length > 0) {
        setCurrentChallenge(remaining[Math.floor(Math.random() * remaining.length)])
      }
    }
    setSelected(null)
    setShowResult(false)
  }

  if (!showChallenge || !currentChallenge) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="mb-6"
      >
        <div className="bg-olive/10 border border-olive/30 rounded-xl p-4">
          <div className="text-center mb-4">
            <span className="text-2xl mb-2 block font-sans text-olive">Pack</span>
            <p className="font-serif text-lg text-ink">Pack Light Challenge!</p>
            <p className="text-sm text-inkl">
              You're {overBy} item{overBy > 1 ? 's' : ''} over ({totalItems}/{limit}). Can you optimize?
            </p>
          </div>

          <div className="bg-cream rounded-lg p-4">
            <p className="text-sm font-medium text-ink mb-4">{currentChallenge.scenario}</p>
            <div className="space-y-2">
              {currentChallenge.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleSelect(index)}
                  disabled={showResult}
                  className={`w-full p-3 rounded-lg text-left font-sans text-sm transition-all ${
                    showResult
                      ? index === currentChallenge.correct
                        ? 'bg-olive text-white'
                        : index === selected
                          ? 'bg-ember/20 text-ember'
                          : 'bg-parchment text-inkl'
                      : 'bg-parchment hover:bg-blush text-ink'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-white rounded-lg"
              >
                <p className="text-xs text-inkl">{currentChallenge.explanation}</p>
              </motion.div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            {showResult && (
              <button
                onClick={handleNext}
                className="flex-1 px-4 py-2 bg-olive text-white rounded-lg font-sans text-sm font-medium hover:bg-forest transition-colors"
              >
                Another Tip
              </button>
            )}
            <button
              onClick={() => setShowChallenge(false)}
              className="flex-1 px-4 py-2 bg-blush/50 text-inkl rounded-lg font-sans text-sm font-medium hover:bg-blush transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
