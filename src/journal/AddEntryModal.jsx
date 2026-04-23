import { useState } from 'react'
import { motion } from 'framer-motion'
import { useJournal } from '../context/JournalContext'
import { pillars } from '../data/skills'

const moods = [
  { value: 'great', label: 'Great', emoji: 'G' },
  { value: 'good', label: 'Good', emoji: 'OK' },
  { value: 'meh', label: 'Meh', emoji: '-' }
]

export default function AddEntryModal({ onClose }) {
  const { addEntry } = useJournal()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedPillars, setSelectedPillars] = useState([])
  const [mood, setMood] = useState('good')
  const [weather, setWeather] = useState('')
  const [saving, setSaving] = useState(false)

  const togglePillar = (pillarId) => {
    setSelectedPillars(prev => 
      prev.includes(pillarId)
        ? prev.filter(p => p !== pillarId)
        : [...prev, pillarId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    await addEntry({
      title,
      content,
      pillar_tags: selectedPillars,
      mood,
      weather
    })

    setSaving(false)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-ink/60 z-50 flex items-end md:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-cream rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-cream z-10 px-6 py-4 border-b border-inkll/10 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-ink">New Entry</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-inkll hover:text-ink transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block font-sans text-sm font-medium text-ink mb-2">
              What happened today?
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Morning roam at Bear Peak..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-inkll/20 font-sans text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-sans text-sm font-medium text-ink mb-2">
              Tell the story
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="The kids found a frog in the creek. Lily named it 'Ribbit' and insisted it come home with us (it didn't)..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white border border-inkll/20 font-sans text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all resize-none"
            />
          </div>

          {/* Pillars */}
          <div>
            <label className="block font-sans text-sm font-medium text-ink mb-2">
              Which pillars did this touch?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(pillars).map(([id, pillar]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => togglePillar(id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedPillars.includes(id)
                      ? 'border-ember bg-white'
                      : 'border-inkll/10 bg-white/50 hover:border-ember/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{pillar.icon}</span>
                    <span className="font-sans text-sm font-medium text-ink">{pillar.name}</span>
                  </div>
                  <p className="font-sans text-xs text-inkll">{pillar.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block font-sans text-sm font-medium text-ink mb-2">
              How was the vibe?
            </label>
            <div className="flex gap-3">
              {moods.map(m => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value)}
                  className={`flex-1 py-3 rounded-xl border-2 font-sans text-sm transition-all ${
                    mood === m.value
                      ? 'border-ember bg-white'
                      : 'border-inkll/10 bg-white/50 hover:border-ember/30'
                  }`}
                >
                  <span className="text-xl mr-1">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weather (optional) */}
          <div>
            <label className="block font-sans text-sm font-medium text-ink mb-2">
              Weather (optional)
            </label>
            <input
              type="text"
              value={weather}
              onChange={e => setWeather(e.target.value)}
              placeholder="Sunny, 72°F, perfect conditions..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-inkll/20 font-sans text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-inkll/20 font-sans text-ink hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !title.trim()}
              className="flex-1 py-3 rounded-full bg-ember text-white font-sans font-medium hover:bg-terra transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
