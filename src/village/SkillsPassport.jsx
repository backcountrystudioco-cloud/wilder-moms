import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Badge definitions with criteria
const BADGE_CATEGORIES = {
  trailBlazer: {
    title: 'Trail Blazer',
    icon: '🥾',
    description: 'Complete hikes of increasing difficulty',
    color: 'bg-ember',
    badges: [
      { id: 'first_hike', name: 'First Steps', description: 'Complete your first hike', icon: '🥾', criteria: { type: 'hike', count: 1 } },
      { id: 'three_hikes', name: 'Trail Starter', description: 'Complete 3 hikes', icon: '🥾', criteria: { type: 'hike', count: 3 } },
      { id: 'five_hikes', name: 'Path Finder', description: 'Complete 5 hikes', icon: '🥾', criteria: { type: 'hike', count: 5 } },
      { id: 'ten_hikes', name: 'Trail Master', description: 'Complete 10 hikes', icon: '🏔️', criteria: { type: 'hike', count: 10 } },
    ]
  },
  craftyHands: {
    title: 'Crafty Hands',
    icon: '🎨',
    description: 'Try crafts from different categories',
    color: 'bg-peach',
    badges: [
      { id: 'first_craft', name: 'First Creation', description: 'Complete your first craft', icon: '🌿', criteria: { type: 'craft', count: 1 } },
      { id: 'nature_craft', name: 'Nature Artist', description: 'Try a nature craft', icon: '🍃', criteria: { type: 'craft', category: 'nature' } },
      { id: 'outdoor_craft', name: 'Outdoor Maker', description: 'Try an outdoor craft', icon: '🏕️', criteria: { type: 'craft', category: 'outdoor' } },
      { id: 'three_crafts', name: 'Craft Enthusiast', description: 'Complete 3 crafts', icon: '🎨', criteria: { type: 'craft', count: 3 } },
      { id: 'five_crafts', name: 'Master Crafter', description: 'Complete 5 crafts', icon: '✨', criteria: { type: 'craft', count: 5 } },
    ]
  },
  builder: {
    title: 'Builder',
    icon: '🔨',
    description: 'Complete builds from different categories',
    color: 'bg-gold',
    badges: [
      { id: 'first_build', name: 'First Build', description: 'Complete your first build', icon: '🔨', criteria: { type: 'build', count: 1 } },
      { id: 'shelter_build', name: 'Shelter Builder', description: 'Build a shelter', icon: '⛺', criteria: { type: 'build', category: 'shelter' } },
      { id: 'tool_build', name: 'Tool Maker', description: 'Build a tool', icon: '🪓', criteria: { type: 'build', category: 'tool' } },
      { id: 'three_builds', name: 'Builder Basics', description: 'Complete 3 builds', icon: '🏗️', criteria: { type: 'build', count: 3 } },
      { id: 'five_builds', name: 'Master Builder', description: 'Complete 5 builds', icon: '🏆', criteria: { type: 'build', count: 5 } },
    ]
  },
  natureSpotter: {
    title: 'Nature Spotter',
    icon: '🔍',
    description: 'Discover different species and nature items',
    color: 'bg-olive',
    badges: [
      { id: 'first_spot', name: 'First Discovery', description: 'Spot your first nature item', icon: '🦋', criteria: { type: 'nature_spot', count: 1 } },
      { id: 'bird_spotter', name: 'Bird Watcher', description: 'Spot 3 birds', icon: '🐦', criteria: { type: 'nature_spot', category: 'bird', count: 3 } },
      { id: 'bug_spotter', name: 'Bug Scout', description: 'Find 3 bugs', icon: '🐛', criteria: { type: 'nature_spot', category: 'bug', count: 3 } },
      { id: 'five_spots', name: 'Nature Eyes', description: 'Make 5 nature discoveries', icon: '👀', criteria: { type: 'nature_spot', count: 5 } },
      { id: 'ten_spots', name: 'Nature Expert', description: 'Make 10 nature discoveries', icon: '🌟', criteria: { type: 'nature_spot', count: 10 } },
    ]
  },
  adventureFirsts: {
    title: 'Adventure Firsts',
    icon: '⭐',
    description: 'Reach exciting milestones',
    color: 'bg-terra',
    badges: [
      { id: 'first_mile', name: 'First Mile', description: 'Hike your first mile', icon: '🚶', criteria: { type: 'milestone', id: 'first_mile' } },
      { id: 'five_mile', name: 'Five Miler', description: 'Complete a 5-mile hike', icon: '🏃', criteria: { type: 'milestone', id: 'five_mile' } },
      { id: 'early_bird', name: 'Early Bird', description: 'Complete an early morning hike', icon: '🌅', criteria: { type: 'milestone', id: 'early_bird' } },
      { id: 'overnight', name: 'Overnight Adventurer', description: 'Complete your first overnight camp', icon: '🌙', criteria: { type: 'milestone', id: 'overnight' } },
      { id: 'lake_swim', name: 'Lake Swimmer', description: 'Swim in a lake for the first time', icon: '🏊', criteria: { type: 'milestone', id: 'lake_swim' } },
      { id: 'trail_friend', name: 'Trail Friend', description: 'Make a friend on the trail', icon: '🤝', criteria: { type: 'milestone', id: 'trail_friend' } },
      { id: 'gear_sharer', name: 'Gear Giver', description: 'Share your gear with someone', icon: '🎒', criteria: { type: 'milestone', id: 'gear_sharer' } },
    ]
  }
}

// Check-in form options
const CHECKIN_OPTIONS = {
  hike: [
    { id: 'easy', name: 'Easy (under 1 mile)', difficulty: 1 },
    { id: 'moderate', name: 'Moderate (1-3 miles)', difficulty: 2 },
    { id: 'challenging', name: 'Challenging (3-5 miles)', difficulty: 3 },
    { id: 'epic', name: 'Epic (5+ miles)', difficulty: 4 },
  ],
  craft: [
    { id: 'nature', name: 'Nature Craft', category: 'nature' },
    { id: 'outdoor', name: 'Outdoor Craft', category: 'outdoor' },
    { id: 'survival', name: 'Survival Craft', category: 'survival' },
  ],
  build: [
    { id: 'shelter', name: 'Shelter', category: 'shelter' },
    { id: 'tool', name: 'Tool', category: 'tool' },
    { id: 'fire', name: 'Fire Setup', category: 'fire' },
    { id: 'water', name: 'Water Project', category: 'water' },
  ],
  nature_spot: [
    { id: 'bird', name: 'Bird', category: 'bird' },
    { id: 'bug', name: 'Bug', category: 'bug' },
    { id: 'animal', name: 'Animal Track', category: 'animal' },
    { id: 'plant', name: 'Plant/Leaf', category: 'plant' },
    { id: 'rock', name: 'Rock/Mineral', category: 'rock' },
  ],
  milestone: [
    { id: 'first_mile', name: 'Hiked my first mile!', milestoneId: 'first_mile' },
    { id: 'five_mile', name: 'Completed a 5-mile hike!', milestoneId: 'five_mile' },
    { id: 'early_bird', name: 'Early morning hike completed!', milestoneId: 'early_bird' },
    { id: 'overnight', name: 'First overnight camp!', milestoneId: 'overnight' },
    { id: 'lake_swim', name: 'Swam in a lake!', milestoneId: 'lake_swim' },
    { id: 'trail_friend', name: 'Made a friend on the trail!', milestoneId: 'trail_friend' },
    { id: 'gear_sharer', name: 'Shared gear with someone!', milestoneId: 'gear_sharer' },
  ]
}

const STORAGE_KEY = 'wilder_moms_checkins'

// Load check-ins from localStorage
function loadCheckins() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Save check-ins to localStorage
function saveCheckins(checkins) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins))
}

// Check if a badge is earned based on check-ins
function isBadgeEarned(badge, checkins) {
  const { criteria } = badge
  
  switch (criteria.type) {
    case 'hike':
      return checkins.filter(c => c.type === 'hike').length >= criteria.count
    case 'craft':
      if (criteria.category) {
        return checkins.some(c => c.type === 'craft' && c.category === criteria.category)
      }
      return checkins.filter(c => c.type === 'craft').length >= criteria.count
    case 'build':
      if (criteria.category) {
        return checkins.some(c => c.type === 'build' && c.category === criteria.category)
      }
      return checkins.filter(c => c.type === 'build').length >= criteria.count
    case 'nature_spot':
      if (criteria.category) {
        return checkins.filter(c => c.type === 'nature_spot' && c.category === criteria.category).length >= criteria.count
      }
      return checkins.filter(c => c.type === 'nature_spot').length >= criteria.count
    case 'milestone':
      return checkins.some(c => c.type === 'milestone' && c.milestoneId === criteria.id)
    default:
      return false
  }
}

// Calculate progress for a category
function getCategoryProgress(categoryKey, checkins) {
  const category = BADGE_CATEGORIES[categoryKey]
  const earned = category.badges.filter(badge => isBadgeEarned(badge, checkins)).length
  return {
    earned,
    total: category.badges.length,
    percentage: Math.round((earned / category.badges.length) * 100)
  }
}

// Confetti particle component
function ConfettiParticle({ delay, x }) {
  const colors = ['#D2961E', '#8C1E00', '#B43C1E', '#F2A57B', '#96963C']
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  return (
    <motion.div
      initial={{ y: 0, x, opacity: 1, rotate: 0 }}
      animate={{ 
        y: [0, -100, 200],
        x: [x, x + (Math.random() - 0.5) * 100],
        opacity: [1, 1, 0],
        rotate: Math.random() * 360
      }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
      className="absolute w-3 h-3 rounded-full"
      style={{ backgroundColor: color }}
    />
  )
}

// Confetti burst effect
function ConfettiBurst({ active }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.3,
    x: (Math.random() - 0.5) * 200
  }))
  
  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
          {particles.map(p => (
            <ConfettiParticle key={p.id} delay={p.delay} x={p.x} />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// Badge card component
function BadgeCard({ badge, earned, onClick }) {
  return (
    <motion.div
      whileHover={!earned ? { scale: 1.02, y: -2 } : {}}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-300
        ${earned 
          ? 'bg-gradient-to-br from-blush to-cream shadow-lg ring-2 ring-ember/30' 
          : 'bg-gray-100/50 opacity-60 hover:opacity-80'
        }
      `}
    >
      {/* Badge icon */}
      <div className={`
        w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto
        ${earned ? 'bg-ember/10' : 'bg-gray-200'}
      `}>
        {earned ? badge.icon : '🔒'}
      </div>
      
      {/* Badge name */}
      <h4 className={`font-serif text-center text-sm mb-1 ${earned ? 'text-ink' : 'text-gray-500'}`}>
        {badge.name}
      </h4>
      
      {/* Badge description */}
      <p className={`text-xs text-center ${earned ? 'text-inkl' : 'text-gray-400'}`}>
        {earned ? badge.description : `Complete: ${badge.description.toLowerCase()}`}
      </p>
      
      {/* Earned checkmark */}
      {earned && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-ember rounded-full flex items-center justify-center shadow-md"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  )
}

// Check-in modal component
function CheckInModal({ isOpen, onClose, onCheckIn }) {
  const [selectedType, setSelectedType] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  
  useEffect(() => {
    if (!isOpen) {
      setSelectedType(null)
      setSelectedOption(null)
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  const handleSubmit = () => {
    if (selectedType && selectedOption) {
      const option = CHECKIN_OPTIONS[selectedType].find(o => o.id === selectedOption)
      onCheckIn({
        type: selectedType,
        category: option?.category || null,
        milestoneId: option?.milestoneId || null,
        difficulty: option?.difficulty || null,
        name: option?.name,
        date: new Date().toISOString()
      })
      onClose()
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-ink/60 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="bg-cream rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
          >
            <h3 className="font-serif text-2xl text-ink mb-6 text-center">Log Your Adventure! 🌿</h3>
            
            {/* Type selection */}
            <div className="mb-6">
              <p className="text-sm text-inkl mb-3 font-sans">What did you do?</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CHECKIN_OPTIONS).map(([type, options]) => (
                  <button
                    key={type}
                    onClick={() => { setSelectedType(type); setSelectedOption(null); }}
                    className={`
                      p-3 rounded-xl border-2 transition-all font-sans text-sm
                      ${selectedType === type 
                        ? 'border-ember bg-blush' 
                        : 'border-inkll/30 bg-white hover:border-inkll'
                      }
                    `}
                  >
                    <span className="block text-lg mb-1">
                      {type === 'hike' && '🥾'}
                      {type === 'craft' && '🎨'}
                      {type === 'build' && '🔨'}
                      {type === 'nature_spot' && '🔍'}
                      {type === 'milestone' && '⭐'}
                    </span>
                    <span className="text-ink capitalize">{type.replace('_', ' ')}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Option selection */}
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6"
              >
                <p className="text-sm text-inkl mb-3 font-sans">Select the specific activity:</p>
                <div className="space-y-2">
                  {CHECKIN_OPTIONS[selectedType].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`
                        w-full p-3 rounded-xl border-2 transition-all text-left font-sans text-sm
                        ${selectedOption === option.id 
                          ? 'border-ember bg-blush' 
                          : 'border-inkll/30 bg-white hover:border-inkll'
                        }
                      `}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedType || !selectedOption}
              className={`
                w-full py-3 rounded-xl font-sans font-medium transition-all
                ${selectedType && selectedOption
                  ? 'bg-ember text-white hover:bg-terra'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Check In! ✓
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Category section component
function CategorySection({ categoryKey, category, checkins, onBadgeClick }) {
  const progress = getCategoryProgress(categoryKey, checkins)
  const earnedCount = category.badges.filter(b => isBadgeEarned(b, checkins)).length
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center text-lg`}>
          {category.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl text-ink">{category.title}</h3>
          <p className="text-xs text-inkl font-sans">{category.description}</p>
        </div>
        <div className="text-right">
          <span className="font-sans text-sm text-ember font-medium">{earnedCount}/{category.badges.length}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-blush rounded-full mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${category.color} rounded-full`}
        />
      </div>
      
      {/* Badge grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {category.badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <BadgeCard
              badge={badge}
              earned={isBadgeEarned(badge, checkins)}
              onClick={() => onBadgeClick(badge)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Main Skills Passport component
export default function SkillsPassport() {
  const [checkins, setCheckins] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [previousEarned, setPreviousEarned] = useState(new Set())
  
  // Load check-ins on mount
  useEffect(() => {
    const loaded = loadCheckins()
    setCheckins(loaded)
    
    // Calculate initial earned badges
    const earned = new Set()
    Object.values(BADGE_CATEGORIES).forEach(category => {
      category.badges.forEach(badge => {
        if (isBadgeEarned(badge, loaded)) {
          earned.add(badge.id)
        }
      })
    })
    setPreviousEarned(earned)
  }, [])
  
  // Check for newly earned badges
  useEffect(() => {
    if (checkins.length === 0) return
    
    Object.values(BADGE_CATEGORIES).forEach(category => {
      category.badges.forEach(badge => {
        if (isBadgeEarned(badge, checkins) && !previousEarned.has(badge.id)) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 2000)
          setPreviousEarned(prev => new Set([...prev, badge.id]))
        }
      })
    })
  }, [checkins, previousEarned])
  
  // Handle new check-in
  const handleCheckIn = useCallback((newCheckin) => {
    const updated = [newCheckin, ...checkins]
    setCheckins(updated)
    saveCheckins(updated)
  }, [checkins])
  
  // Calculate total stats
  const totalEarned = Object.values(BADGE_CATEGORIES).reduce((acc, cat) => {
    return acc + cat.badges.filter(b => isBadgeEarned(b, checkins)).length
  }, 0)
  
  const totalBadges = Object.values(BADGE_CATEGORIES).reduce((acc, cat) => {
    return acc + cat.badges.length
  }, 0)
  
  return (
    <div className="min-h-screen bg-cream py-8 px-4 relative overflow-hidden">
      {/* Confetti overlay */}
      <ConfettiBurst active={showConfetti} />
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl text-ink mb-2">Skills Passport</h1>
          <p className="text-inkl font-sans">Track your outdoor adventures and earn badges!</p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <span className="block font-serif text-3xl text-ember">{totalEarned}</span>
              <span className="text-xs text-inkl font-sans">Badges Earned</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-3xl text-ink">{totalBadges}</span>
              <span className="text-xs text-inkl font-sans">Total Badges</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-3xl text-gold">{checkins.length}</span>
              <span className="text-xs text-inkl font-sans">Adventures Logged</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Add Check-in Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 bg-ember text-white font-sans font-medium rounded-xl hover:bg-terra transition-colors shadow-lg shadow-ember/20 flex items-center justify-center gap-2"
        >
          <span className="text-xl">✨</span>
          Add Check-in
          <span className="text-xl">✨</span>
        </button>
      </motion.div>
      
      {/* Badge Categories */}
      <div className="max-w-4xl mx-auto">
        {Object.entries(BADGE_CATEGORIES).map(([key, category], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <CategorySection
              categoryKey={key}
              category={category}
              checkins={checkins}
              onBadgeClick={() => {}}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Recent Check-ins */}
      {checkins.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8">
          <h3 className="font-serif text-xl text-ink mb-4">Recent Adventures</h3>
          <div className="space-y-2">
            {checkins.slice(0, 5).map((checkin, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-inkll/20"
              >
                <div className="w-10 h-10 bg-blush rounded-full flex items-center justify-center">
                  {checkin.type === 'hike' && '🥾'}
                  {checkin.type === 'craft' && '🎨'}
                  {checkin.type === 'build' && '🔨'}
                  {checkin.type === 'nature_spot' && '🔍'}
                  {checkin.type === 'milestone' && '⭐'}
                </div>
                <div className="flex-1">
                  <p className="font-sans text-sm text-ink">{checkin.name}</p>
                  <p className="font-sans text-xs text-inkl">
                    {new Date(checkin.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Check-in Modal */}
      <CheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCheckIn={handleCheckIn}
      />
    </div>
  )
}
