import { useState } from 'react'
import { motion } from 'framer-motion'
import { packLists } from '../data/packLists'

export default function BlueprintPage() {
  const [activeTab, setActiveTab] = useState('hiking')
  const [expandedAge, setExpandedAge] = useState(null)

  const toggleAge = (index) => {
    setExpandedAge(expandedAge === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            📋 The Blueprint
          </h1>
          <p className="font-sans text-inkl text-lg">
            Pack lists tailored to your family — organized by age group so everyone has what they need.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('hiking')}
            className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all ${
              activeTab === 'hiking'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            🥾 Hiking Lists
          </button>
          <button
            onClick={() => setActiveTab('camping')}
            className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all ${
              activeTab === 'camping'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            ⛺ Camping Lists
          </button>
          <button
            onClick={() => setActiveTab('essentials')}
            className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all ${
              activeTab === 'essentials'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            🏔️ Day Hike Essentials
          </button>
        </div>

        {/* Day Hike Essentials */}
        {activeTab === 'essentials' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-inkll/10"
          >
            <h2 className="font-serif text-2xl text-ink mb-6">Day Hike Essentials</h2>
            <p className="text-inkl mb-6">The must-haves for any family hike, regardless of age.</p>
            <ul className="space-y-3">
              {packLists.dayHikeEssentials.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-olive text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-inkl">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Hiking or Camping Lists by Age */}
        {(activeTab === 'hiking' || activeTab === 'camping') && (
          <div className="space-y-4">
            {(activeTab === 'hiking' ? packLists.hiking : packLists.camping).map((group, index) => (
              <motion.div
                key={group.ageGroup}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-inkll/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleAge(index)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div>
                    <h3 className="font-serif text-xl text-ink">{group.ageGroup}</h3>
                    <p className="text-sm text-inkl mt-1">{group.items.length} items</p>
                  </div>
                  <motion.svg
                    animate={{ rotate: expandedAge === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-inkll"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: expandedAge === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-t border-inkll/10 pt-4">
                    <ul className="space-y-2">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
                          <span className="text-inkl text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
