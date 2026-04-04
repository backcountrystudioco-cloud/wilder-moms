import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NaturePlanner from './NaturePlanner'
import SkillsPassport from './SkillsPassport'

export default function VillagePage() {
  const [activeTab, setActiveTab] = useState('planner')

  const tabs = [
    { id: 'planner', label: 'Nature Planner', icon: '📅' },
    { id: 'passport', label: 'Skills Passport', icon: '🏆' }
  ]

  return (
    <div className="min-h-screen bg-cream pt-24 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            The Village
          </h1>
          <p className="font-sans text-inkl text-lg max-w-xl mx-auto">
            Your outdoor family companion. Plan adventures, track skills, grow together.
          </p>
        </header>

        {/* Tab Navigation */}
        <nav className="flex justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 rounded-full font-sans text-base font-medium transition-all flex items-center gap-2
                ${activeTab === tab.id
                  ? 'bg-ember text-white shadow-lg shadow-ember/20'
                  : 'bg-white text-inkl hover:bg-blush/50 border border-inkll/10'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'planner' && <NaturePlanner />}
            {activeTab === 'passport' && <SkillsPassport />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
