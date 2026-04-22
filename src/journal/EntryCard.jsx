import { motion } from 'framer-motion'
import { pillars } from '../data/skills'

const moodEmojis = {
  great: '😊',
  good: '🙂',
  meh: '😐'
}

const moodColors = {
  great: 'bg-green-100 text-green-700',
  good: 'bg-blue-100 text-blue-700',
  meh: 'bg-gray-100 text-gray-600'
}

export default function EntryCard({ entry, index, onClick }) {
  const date = new Date(entry.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-inkll/10 cursor-pointer hover:border-ember/30 hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-sans text-xs text-inkll uppercase tracking-wide">{formattedDate}</p>
          <h3 className="font-serif text-lg text-ink">{entry.title || 'Untitled Entry'}</h3>
        </div>
        {entry.mood && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${moodColors[entry.mood]}`}>
            {moodEmojis[entry.mood]} {entry.mood}
          </span>
        )}
      </div>

      {/* Content preview */}
      {entry.content && (
        <p className="font-sans text-sm text-inkl mb-3 line-clamp-2">
          {entry.content}
        </p>
      )}

      {/* Pillar Tags */}
      {entry.pillar_tags && entry.pillar_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {entry.pillar_tags.map(tag => {
            const pillar = pillars[tag]
            if (!pillar) return null
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
              >
                <span>{pillar.icon}</span>
                <span>{pillar.name}</span>
              </span>
            )
          })}
        </div>
      )}

      {/* Photo preview */}
      {entry.photos && entry.photos.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {entry.photos.slice(0, 3).map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt=""
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
          ))}
          {entry.photos.length > 3 && (
            <div className="w-16 h-16 rounded-lg bg-cream flex items-center justify-center text-inkll text-xs flex-shrink-0">
              +{entry.photos.length - 3}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-inkll/10">
        <div className="flex items-center gap-3">
          {entry.weather && (
            <span className="text-xs text-inkll">{entry.weather}</span>
          )}
        </div>
        <span className="text-xs text-ember font-medium">Read more →</span>
      </div>
    </motion.div>
  )
}
