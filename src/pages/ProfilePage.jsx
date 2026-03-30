import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { hikes } from '../data/hikes'
import { crafts } from '../data/crafts'
import { builds } from '../data/builds'
import { packLists } from '../data/packLists'

const ageGroups = ['0-2', '3-5', '6-9', '10+']
const interestOptions = ['Hiking', 'Crafts', 'Building', 'Nature', 'Animals', 'Water', 'Art', 'Music']

function KidCard({ kid, onUpdate, onRemove, canRemove }) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleInterestToggle = (interest) => {
    const newInterests = kid.interests.includes(interest)
      ? kid.interests.filter(i => i !== interest)
      : [...kid.interests, interest]
    onUpdate(kid.id, 'interests', newInterests)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 shadow-sm border border-inkll/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left"
        >
          <span className="font-serif text-lg text-ink">{kid.name || 'Untitled Kid'}</span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 text-inkll"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        {canRemove && (
          <button
            onClick={() => onRemove(kid.id)}
            className="p-2 text-inkll hover:text-ember transition-colors"
            aria-label="Remove child"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Name & Age Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-inkll uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                value={kid.name}
                onChange={(e) => onUpdate(kid.id, 'name', e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 rounded-lg border border-inkll/20 bg-cream text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-inkll uppercase tracking-wider mb-2">
                Age Group
              </label>
              <select
                value={kid.age}
                onChange={(e) => onUpdate(kid.id, 'age', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-inkll/20 bg-cream text-ink focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all"
              >
                <option value="">Select age</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-xs font-medium text-inkll uppercase tracking-wider mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-1 rounded-full text-sm font-sans transition-all ${
                    kid.interests.includes(interest)
                      ? 'bg-ember text-white'
                      : 'bg-blush/50 text-inkl hover:bg-blush'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

function SavedItemCard({ item, type, onRemove }) {
  const getImageUrl = () => {
    if (type === 'hike') return item.imageUrl
    if (type === 'craft') return item.imageUrl
    if (type === 'build') return item.imageUrl
    return null
  }

  const getMeta = () => {
    if (type === 'hike') return `${item.distance} · ${item.duration}`
    if (type === 'craft') return `${item.duration} · Ages ${item.ageRange}`
    if (type === 'build') return item.meta ? `${item.meta.time} · Ages ${item.meta.ages}` : ''
    return ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-inkll/10 flex"
    >
      {/* Image */}
      {getImageUrl() && (
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={getImageUrl()}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h4 className="font-serif text-base text-ink mb-1 line-clamp-1">
            {item.title}
          </h4>
          <p className="text-xs text-inkl">{getMeta()}</p>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="self-start text-xs text-ember hover:text-terra transition-colors flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Remove
        </button>
      </div>
    </motion.div>
  )
}

function EmptyState({ type }) {
  const messages = {
    hikes: 'No saved hikes yet. Start exploring and save your favorites!',
    crafts: 'No saved crafts yet. Discover fun projects to do with your kids!',
    builds: 'No saved builds yet. Find builds that inspire your next project!'
  }

  return (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blush/50 flex items-center justify-center">
        <svg className="w-8 h-8 text-inkll" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <p className="font-sans text-inkl text-sm max-w-xs mx-auto">
        {messages[type]}
      </p>
    </div>
  )
}

export default function ProfilePage() {
  const { 
    kids, addKid, removeKid, updateKid,
    savedHikes, savedCrafts, savedBuilds,
    toggleSavedHike, toggleSavedCraft, toggleSavedBuild
  } = useUser()

  const [activeTab, setActiveTab] = useState('hikes')
  const [packListTab, setPackListTab] = useState('hiking')

  // Get saved items data
  const savedHikeItems = hikes.filter(h => savedHikes.includes(h.id))
  const savedCraftItems = crafts.filter(c => savedCrafts.includes(c.id))
  const savedBuildItems = builds.filter(b => savedBuilds.includes(b.id))

  const tabs = [
    { id: 'hikes', label: 'Hikes', count: savedHikes.length, icon: null },
    { id: 'crafts', label: 'Crafts', count: savedCrafts.length, icon: null },
    { id: 'builds', label: 'Builds', count: savedBuilds.length, icon: null }
  ]

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Your Profile
          </h1>
          <p className="font-sans text-inkl text-lg">
            Manage your kids&apos; profiles and track your saved adventures.
          </p>
        </header>

        {/* My Kids Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl text-ink">My Kids</h2>
            <button
              onClick={addKid}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ember text-white font-sans text-sm font-medium hover:bg-terra transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Child
            </button>
          </div>
          
          <div className="space-y-4">
            {kids.map((kid, index) => (
              <KidCard
                key={kid.id}
                kid={kid}
                onUpdate={updateKid}
                onRemove={removeKid}
                canRemove={kids.length > 1}
              />
            ))}
          </div>
        </section>

        {/* Pack Lists Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl text-ink">Pack Lists</h2>
          </div>

          {/* Pack List Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setPackListTab('hiking')}
              className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all flex items-center gap-2 ${
                packListTab === 'hiking'
                  ? 'bg-ember text-white'
                  : 'bg-blush/50 text-inkl hover:bg-blush'
              }`}
            >
              Hiking
            </button>
            <button
              onClick={() => setPackListTab('camping')}
              className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all flex items-center gap-2 ${
                packListTab === 'camping'
                  ? 'bg-ember text-white'
                  : 'bg-blush/50 text-inkl hover:bg-blush'
              }`}
            >
              Camping
            </button>
            <button
              onClick={() => setPackListTab('essentials')}
              className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all flex items-center gap-2 ${
                packListTab === 'essentials'
                  ? 'bg-ember text-white'
                  : 'bg-blush/50 text-inkl hover:bg-blush'
              }`}
            >
              Day Hike Essentials
            </button>
          </div>

          {/* Pack Lists Grid */}
          {packListTab === 'essentials' ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
              <h3 className="font-serif text-xl text-ink mb-4">Day Hike Essentials</h3>
              <ul className="space-y-2">
                {packLists.dayHikeEssentials.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-olive text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-inkl">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(packListTab === 'hiking' ? packLists.hiking : packLists.camping).map((group, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-inkll/10">
                  <h3 className="font-serif text-lg text-ember mb-3">{group.ageGroup}</h3>
                  <ul className="space-y-1.5">
                    {group.items.slice(0, 6).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-inkl">
                        <span className="w-1.5 h-1.5 rounded-full bg-ember mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {group.items.length > 6 && (
                    <p className="text-xs text-inkll mt-2">+{group.items.length - 6} more items</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved Items Section */}
        <section>
          <h2 className="font-serif text-2xl text-ink mb-4">Saved Items</h2>
          
          {/* Tab Navigation */}
          <nav className="flex gap-2 mb-6" role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-full font-sans text-sm font-medium transition-all flex items-center gap-2
                  ${activeTab === tab.id
                    ? 'bg-ember text-white shadow-md'
                    : 'bg-blush/50 text-inkl hover:bg-blush'
                  }
                `}
              >
                <span>{tab.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-blush'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'hikes' && (
              savedHikeItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedHikeItems.map(hike => (
                    <SavedItemCard
                      key={hike.id}
                      item={hike}
                      type="hike"
                      onRemove={toggleSavedHike}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState type="hikes" />
              )
            )}

            {activeTab === 'crafts' && (
              savedCraftItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedCraftItems.map(craft => (
                    <SavedItemCard
                      key={craft.id}
                      item={craft}
                      type="craft"
                      onRemove={toggleSavedCraft}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState type="crafts" />
              )
            )}

            {activeTab === 'builds' && (
              savedBuildItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedBuildItems.map(build => (
                    <SavedItemCard
                      key={build.id}
                      item={build}
                      type="build"
                      onRemove={toggleSavedBuild}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState type="builds" />
              )
            )}
          </motion.div>
        </section>
      </div>
    </div>
  )
}
