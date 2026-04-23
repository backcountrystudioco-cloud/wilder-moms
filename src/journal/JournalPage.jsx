import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useJournal } from '../context/JournalContext'
import { pillars, getRandomPrompt } from '../data/skills'
import EntryCard from './EntryCard'
import AddEntryModal from './AddEntryModal'

export default function JournalPage() {
  const { entries, streak, pillarProgress, loading } = useJournal()
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedPillar, setSelectedPillar] = useState(null)
  const [dailyPrompt] = useState(getRandomPrompt())

  const recentEntries = entries.slice(0, 6)

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-ember/30 border-t-ember rounded-full animate-spin mx-auto mb-5"></div>
          <p className="font-sans text-inkl">Loading your journal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-2">
            My Journal
          </h1>
          <p className="font-sans text-inkl text-lg">
            Your Wilder Moms journey, one entry at a time.
          </p>
        </motion.header>

        {/* Streak & Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {/* Streak */}
          <div className="bg-white rounded-2xl p-4 text-center border border-inkll/10">
            <div className="text-3xl mb-1">Fire</div>
            <p className="font-serif text-2xl text-ink">{streak}</p>
            <p className="font-sans text-xs text-inkl">day streak</p>
          </div>

          {/* Total Entries */}
          <div className="bg-white rounded-2xl p-4 text-center border border-inkll/10">
            <div className="text-3xl mb-1">Notes</div>
            <p className="font-serif text-2xl text-ink">{entries.length}</p>
            <p className="font-sans text-xs text-inkl">entries</p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl p-4 text-center border border-inkll/10">
            <div className="text-3xl mb-1">Star</div>
            <p className="font-serif text-2xl text-ink">
              {Object.values(pillarProgress).reduce((acc, p) => acc + p.earned, 0)}
            </p>
            <p className="font-sans text-xs text-inkl">skills earned</p>
          </div>

          {/* Days Active */}
          <div className="bg-white rounded-2xl p-4 text-center border border-inkll/10">
            <div className="text-3xl mb-1">Leaf</div>
            <p className="font-serif text-2xl text-ink">
              {entries.length > 0 
                ? Math.max(...entries.map(e => {
                    const d = new Date(e.date)
                    const now = new Date()
                    return Math.floor((now - d) / (1000 * 60 * 60 * 24))
                  }))
                : 0}
            </p>
            <p className="font-sans text-xs text-inkl">days active</p>
          </div>
        </motion.div>

        {/* Daily Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-parchment rounded-2xl p-6 mb-8 border border-inkll/10"
        >
          <p className="font-sans text-xs text-inkll uppercase tracking-wide mb-2">Today's prompt</p>
          <p className="font-serif text-xl text-ink italic">"{dailyPrompt}"</p>
        </motion.div>

        {/* Pillar Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4">Pillar Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(pillars).map(([id, pillar]) => (
              <button
                key={id}
                onClick={() => setSelectedPillar(selectedPillar === id ? null : id)}
                className={`bg-white rounded-2xl p-4 text-left border-2 transition-all ${
                  selectedPillar === id ? 'border-ember' : 'border-inkll/10 hover:border-ember/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{pillar.icon}</span>
                  <span className="font-serif text-lg text-ink">{pillar.name}</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-cream rounded-full overflow-hidden mb-1">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${pillarProgress[id]?.percentage || 0}%`,
                      backgroundColor: pillar.color
                    }}
                  />
                </div>
                <p className="font-sans text-xs text-inkl">
                  {pillarProgress[id]?.earned || 0}/{pillar.skills.length} skills
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Entries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-ink">Recent Entries</h2>
            {entries.length > 6 && (
              <Link to="/journal/all" className="font-sans text-sm text-ember hover:text-terra">
                View all →
              </Link>
            )}
          </div>

          {recentEntries.length > 0 ? (
            <div className="grid gap-4">
              {recentEntries.map((entry, index) => (
                <EntryCard key={entry.id} entry={entry} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-blush/40 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">Seed</div>
              <h3 className="font-serif text-xl text-ink mb-2">Start your journey</h3>
              <p className="font-sans text-inkl mb-4">
                Your first journal entry is waiting. What did you notice today?
              </p>
            </div>
          )}
        </motion.div>

        {/* Empty state CTA */}
        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-ember text-white rounded-full font-sans font-medium text-lg hover:bg-terra transition-colors shadow-lg shadow-ember/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Write Your First Entry
            </button>
          </motion.div>
        )}

        {/* FAB for adding entries */}
        {entries.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-ember text-white rounded-full shadow-lg shadow-ember/30 flex items-center justify-center hover:bg-terra transition-colors z-40"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        )}

        {/* Add Entry Modal */}
        <AnimatePresence>
          {showAddModal && (
            <AddEntryModal onClose={() => setShowAddModal(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
