import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { packLists, ageGroups } from './packLists'

const questions = [
  {
    id: 'who',
    question: "Who's coming on the adventure?",
    options: [
      { label: 'Just me (solo adventure)', value: { adults: 1, kids: 0 }, icon: '🚶‍♀️' },
      { label: 'Me + baby carrier', value: { adults: 1, kids: 1, baby: true }, icon: '👶' },
      { label: 'Me + walking kid(s)', value: { adults: 1, kids: 1, walking: true }, icon: '👧' },
      { label: 'Couple + baby', value: { adults: 2, kids: 1, baby: true }, icon: '👨‍👩‍👧' },
      { label: 'Couple + walking kid(s)', value: { adults: 2, kids: 2, mixed: true }, icon: '👨‍👩‍👧‍👦' },
      { label: 'Full family (mixed ages)', value: { adults: 2, kids: 3, mixed: true }, icon: '👨‍👩‍👧‍👦' },
      { label: 'Adults only', value: { adults: 2, kids: 0 }, icon: '👫' },
    ],
  },
  {
    id: 'what',
    question: 'What type of adventure?',
    options: [
      { label: 'Day hike', value: 'day', icon: '🥾' },
      { label: 'Overnight camping', value: 'overnight', icon: '⛺' },
      { label: 'Backpacking (multi-day)', value: 'backpacking', icon: '🎒' },
      { label: 'Beach day', value: 'beach', icon: '🏖️' },
      { label: 'Trail run / fast & light', value: 'fast', icon: '🏃' },
    ],
  },
  {
    id: 'howLong',
    question: 'How long will you be out?',
    dayOptions: [
      { label: '1-2 hours', value: 'short', icon: '⏱️' },
      { label: 'Half day (3-5 hours)', value: 'half', icon: '🌤️' },
      { label: 'Full day (6-8 hours)', value: 'full', icon: '☀️' },
      { label: 'Extended day (8+ hours)', value: 'extended', icon: '🌅' },
    ],
    overnightOptions: [
      { label: '1 night', value: '1night', icon: '🌙' },
      { label: '2 nights', value: '2nights', icon: '🌙🌙' },
      { label: '3 nights', value: '3nights', icon: '🌙🌙🌙' },
      { label: '4+ nights (extended)', value: 'extended', icon: '📅' },
    ],
  },
  {
    id: 'conditions',
    question: 'Any special conditions?',
    options: [
      { label: 'Hot weather (90°F+)', value: 'hot', icon: '🔥' },
      { label: 'Cold / Winter', value: 'cold', icon: '❄️' },
      { label: 'Rainy / Wet', value: 'wet', icon: '🌧️' },
      { label: 'High altitude', value: 'altitude', icon: '🏔️' },
      { label: 'Buggy / Mosquitoes', value: 'bugs', icon: '🦟' },
      { label: 'No special conditions', value: 'normal', icon: '✨' },
    ],
  },
]

const itemRecommendations = {
  hot: ['Extra water (2x)', 'Electrolyte packets', 'Cooling towel', 'Sun hat with neck flap', 'UV-protective clothing', 'Shade tent or umbrella'],
  cold: ['Insulation layers', 'Hand warmers', 'Balaclava', 'Insulated water bottle (prevent freezing)', 'Emergency bivvy', 'Extra socks'],
  wet: ['Pack cover', 'Waterproof bags for clothes', 'Extra dry layers', 'Quick-dry towel', 'Waterproof boots'],
  altitude: ['Acclimatization time', 'Extra water', 'Sun protection (stronger UV)', 'Altitude sickness remedy', 'Compressed oxygen (extreme)'],
  bugs: ['DEET spray', 'Permethrin-treated clothes', 'Bug net', 'Long sleeves/pants', 'Citronella candles'],
}

export default function AdventureProfileBuilder({ onGenerate }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [generatedList, setGeneratedList] = useState([])

  const isOvernightTrip = answers.what === 'overnight' || answers.what === 'backpacking'

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: value }
      // Reset duration if trip type changes
      if (questionId === 'what' && prev.howLong) {
        newAnswers.howLong = undefined
      }
      return newAnswers
    })
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    }
  }

  const generateList = () => {
    let list = []
    const { who, what, howLong, conditions } = answers

    // Base essentials
    list.push(...packLists.dayHikeEssentials.slice(0, 8))

    // Add type-specific items
    if (what === 'day') {
      list.push(...packLists.dayHikeEssentials)
    } else if (what === 'overnight') {
      list.push(...packLists.camping.flatMap((g) => g.items.slice(0, 8)))
    } else if (what === 'backpacking') {
      list.push(...packLists.camping.flatMap((g) => g.items))
    }

    // Add condition-specific items
    if (conditions && conditions !== 'normal' && itemRecommendations[conditions]) {
      list.push(...itemRecommendations[conditions])
    }

    // Duration additions for day hikes
    if ((howLong === 'full' || howLong === 'extended') && (what === 'day' || !what)) {
      list.push('Extra snacks', 'Backup water', 'Headlamp')
    }

    // Duration additions for overnight trips (number of nights)
    if (what === 'overnight' || what === 'backpacking') {
      if (howLong === '1night') {
        list.push('Sleeping bag', 'Sleeping pad', 'Tent', 'Pillow', 'Change of clothes for night')
      } else if (howLong === '2nights') {
        list.push('Sleeping bag', 'Sleeping pad', 'Tent', 'Pillow', 'Change of clothes for night', 'Extra food', 'Water filter', 'Headlamp')
      } else if (howLong === '3nights' || howLong === 'extended') {
        list.push('Sleeping bag', 'Sleeping pad', 'Tent', 'Pillow', 'Change of clothes for night', 'Extra food', 'Water filter', 'Water purification', 'Multiple fuel canisters', 'Repair kit', 'Camp chair', 'Camp stove')
      }
    }

    // Remove duplicates
    setGeneratedList([...new Set(list)])
    setShowResults(true)
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setGeneratedList([])
  }

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10"
      >
        <div className="text-center mb-6">
          <span className="text-4xl mb-3 block">🎒</span>
          <h3 className="font-serif text-2xl text-ink mb-2">Your Adventure Pack List</h3>
          <p className="text-inkl text-sm">{generatedList.length} items recommended</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(answers).map(([key, value]) => {
            const q = questions.find((q) => q.id === key)
            let optLabel = value
            if (q && q.dayOptions) {
              const allOpts = [...(q.dayOptions || []), ...(q.overnightOptions || [])]
              optLabel = allOpts.find((o) => o.value === value)?.label || value
            } else if (q?.options) {
              optLabel = q.options.find((o) => o.value === value)?.label || value
            }
            return (
              <span key={key} className="px-3 py-1 bg-blush/50 rounded-full text-xs text-inkl font-sans">
                {optLabel}
              </span>
            )
          })}
        </div>

        <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
          {generatedList.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-cream transition-colors">
              <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center text-xs flex-shrink-0">
                ✓
              </span>
              <span className="text-inkl text-sm">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onGenerate && onGenerate(generatedList)}
            className="flex-1 px-4 py-3 bg-ember text-white rounded-xl font-sans font-medium hover:bg-terra transition-colors"
          >
            Use This List
          </button>
          <button
            onClick={reset}
            className="px-4 py-3 bg-blush/50 text-inkl rounded-xl font-sans font-medium hover:bg-blush transition-colors"
          >
            Start Over
          </button>
        </div>
      </motion.div>
    )
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-serif text-xl text-ink">Adventure Profile</h3>
          <span className="text-xs text-inkl font-sans">{currentStep + 1} of {questions.length}</span>
        </div>
        <div className="h-1.5 bg-parchment rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-olive rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg text-ink mb-6 font-sans">{currentQuestion.question}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options && currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(currentQuestion.id, option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-olive bg-olive/5'
                      : 'border-inkll/20 hover:border-olive/50'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{option.icon}</span>
                  <span className={`font-sans text-sm font-medium ${isSelected ? 'text-olive' : 'text-ink'}`}>
                    {option.label}
                  </span>
                </button>
              )
            })}
            {currentQuestion.dayOptions && !isOvernightTrip && currentQuestion.dayOptions.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(currentQuestion.id, option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-olive bg-olive/5'
                      : 'border-inkll/20 hover:border-olive/50'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{option.icon}</span>
                  <span className={`font-sans text-sm font-medium ${isSelected ? 'text-olive' : 'text-ink'}`}>
                    {option.label}
                  </span>
                </button>
              )
            })}
            {currentQuestion.overnightOptions && isOvernightTrip && currentQuestion.overnightOptions.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(currentQuestion.id, option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-olive bg-olive/5'
                      : 'border-inkll/20 hover:border-olive/50'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{option.icon}</span>
                  <span className={`font-sans text-sm font-medium ${isSelected ? 'text-olive' : 'text-ink'}`}>
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>

          {currentStep === questions.length - 1 && answers.who && answers.what && answers.howLong && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={generateList}
              className="w-full mt-6 px-6 py-3 bg-ember text-white rounded-xl font-sans font-medium hover:bg-terra transition-colors"
            >
              Generate My Pack List
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
