import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { hikes } from '../Habitat/hikes'
import { crafts } from '../BaseCamp/crafts'
import { builds } from '../BaseCamp/builds'
import { packLists } from '../Blueprint/packLists'

const ageGroups = ['0-2', '3-5', '6-9', '10+']
const numericAgeGroups = {
  '0-2': { min: 0, max: 2 },
  '3-5': { min: 3, max: 5 },
  '6-9': { min: 6, max: 9 },
  '10+': { min: 10, max: 99 }
}
const interestOptions = ['Hiking', 'Crafts', 'Building', 'Nature', 'Animals', 'Water', 'Art', 'Music']

function PreferenceToggle({ enabled, onToggle, trueLabel, falseLabel, icon }) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all flex items-center gap-2 ${
        enabled
          ? 'bg-ember text-white'
          : 'bg-blush/50 text-inkl hover:bg-blush'
      }`}
    >
      {icon && <span>{icon}</span>}
      {enabled ? trueLabel : falseLabel}
    </button>
  )
}

function FamilyProfileCard({ familyName, onFamilyNameChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-inkll/10"
    >
      <h3 className="font-serif text-xl text-ink mb-4">Family Profile</h3>
      <div>
        <label className="block text-xs font-medium text-inkll uppercase tracking-wider mb-2">
          Family Name
        </label>
        <input
          type="text"
          value={familyName}
          onChange={(e) => onFamilyNameChange(e.target.value)}
          placeholder="The Wilson Family"
          className="w-full px-3 py-2 rounded-lg border border-inkll/20 bg-cream text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all"
        />
      </div>
    </motion.div>
  )
}

function PreferencesCard({ preferences, onTogglePreference }) {
  const preferenceItems = [
    { key: 'hasStroller', icon: '🚼', trueLabel: 'Stroller needed', falseLabel: 'No stroller' },
    { key: 'wantsWater', icon: '💧', trueLabel: 'Water features', falseLabel: 'No water needed' },
    { key: 'wantsViews', icon: '🏔️', trueLabel: 'Scenic views', falseLabel: 'Any trail' },
    { key: 'wantsDogs', icon: '🐕', trueLabel: 'Dogs welcome', falseLabel: 'No dogs' },
    { key: 'prefersFreeParking', icon: '🅿️', trueLabel: 'Free parking', falseLabel: 'Paid OK' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-inkll/10"
    >
      <h3 className="font-serif text-xl text-ink mb-4">Trail Preferences</h3>
      <p className="font-sans text-sm text-inkl mb-4">
        These preferences help us recommend the best trails for your family.
      </p>
      <div className="flex flex-wrap gap-2">
        {preferenceItems.map(item => (
          <PreferenceToggle
            key={item.key}
            enabled={preferences[item.key]}
            onToggle={() => onTogglePreference(item.key)}
            trueLabel={item.trueLabel}
            falseLabel={item.falseLabel}
            icon={item.icon}
          />
        ))}
      </div>
    </motion.div>
  )
}

function KidCard({ kid, onUpdate, onRemove, canRemove }) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleInterestToggle = (interest) => {
    const newInterests = (kid.interests || []).includes(interest)
      ? kid.interests.filter(i => i !== interest)
      : [...(kid.interests || []), interest]
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
          {(kid.ageGroup || kid.age) && (
            <span className="px-2 py-0.5 rounded-full bg-peach/30 text-inkl text-xs font-sans">
              {kid.ageGroup || kid.age}
            </span>
          )}
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
                value={kid.ageGroup || kid.age || ''}
                onChange={(e) => onUpdate(kid.id, 'ageGroup', e.target.value)}
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
                    (kid.interests || []).includes(interest)
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
    familyName, setFamilyName,
    kids, addKid, removeKid, updateKid,
    savedHikes, savedCrafts, savedBuilds,
    toggleSavedHike, toggleSavedCraft, toggleSavedBuild,
    preferences, togglePreference
  } = useUser()

  const [activeTab, setActiveTab] = useState('hikes')
  const [packListTab, setPackListTab] = useState('hiking')
  const [hikesViewMode, setHikesViewMode] = useState('all') // 'all' or 'byAge'

  // Get saved items data
  const savedHikeItems = hikes.filter(h => savedHikes.includes(h.id))
  const savedCraftItems = crafts.filter(c => savedCrafts.includes(c.id))
  const savedBuildItems = builds.filter(b => savedBuilds.includes(b.id))

  // Organize hikes by child's age fit
  const hikesByAgeFit = useMemo(() => {
    const grouped = {}
    kids.forEach(kid => {
      const ageGroup = kid.ageGroup || kid.age
      if (!ageGroup) return
      
      if (!grouped[ageGroup]) {
        grouped[ageGroup] = {
          ageGroup,
          hikes: []
        }
      }
    })
    
    // Add hikes that fit each child's age group
    savedHikeItems.forEach(hike => {
      kids.forEach(kid => {
        const ageGroup = kid.ageGroup || kid.age
        if (!ageGroup) return
        
        const range = numericAgeGroups[ageGroup]
        if (range && hike.ageMin >= range.min && hike.ageMax <= range.max) {
          if (!grouped[ageGroup].hikes.find(h => h.id === hike.id)) {
            grouped[ageGroup].hikes.push(hike)
          }
        }
      })
    })
    
    return grouped
  }, [savedHikeItems, kids])

  // Get hikes that fit all kids (universal)
  const universalHikes = useMemo(() => {
    if (kids.length === 0) return savedHikeItems
    return savedHikeItems.filter(hike => {
      return kids.every(kid => {
        const ageGroup = kid.ageGroup || kid.age
        if (!ageGroup) return true
        const range = numericAgeGroups[ageGroup]
        if (!range) return true
        return hike.ageMin >= range.min && hike.ageMax <= range.max
      })
    })
  }, [savedHikeItems, kids])

  const tabs = [
    { id: 'hikes', label: 'Hikes', count: savedHikes.length, icon: null },
    { id: 'crafts', label: 'Crafts', count: savedCrafts.length, icon: null },
    { id: 'builds', label: 'Builds', count: savedBuilds.length, icon: null },
    { id: 'survey', label: 'Survey', count: null, icon: null }
  ]

  const surveyUrl = 'https://us3.list-manage.com/survey?u=9ea84c4182a6c4ac21ecf2caa&id=58dad03290&attribution=false'

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Your Profile
          </h1>
          <p className="font-sans text-inkl text-lg">
            Manage your family profile and track your saved adventures.
          </p>
        </header>

        {/* Family Profile Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FamilyProfileCard 
              familyName={familyName}
              onFamilyNameChange={setFamilyName}
            />
            <PreferencesCard 
              preferences={preferences}
              onTogglePreference={togglePreference}
            />
          </div>
        </section>

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
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl text-ink">Saved Items</h2>
          </div>
          
          {/* Tab Navigation */}
          <nav className="flex gap-2 mb-4" role="tablist">
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

          {/* Hikes View Mode Toggle */}
          {activeTab === 'hikes' && savedHikeItems.length > 0 && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setHikesViewMode('all')}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium transition-all ${
                  hikesViewMode === 'all'
                    ? 'bg-ink text-white'
                    : 'bg-blush/50 text-inkl hover:bg-blush'
                }`}
              >
                All Saved ({savedHikeItems.length})
              </button>
              <button
                onClick={() => setHikesViewMode('byAge')}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium transition-all ${
                  hikesViewMode === 'byAge'
                    ? 'bg-ink text-white'
                    : 'bg-blush/50 text-inkl hover:bg-blush'
                }`}
              >
                By Child's Age
              </button>
            </div>
          )}

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'hikes' && (
              savedHikeItems.length > 0 ? (
                hikesViewMode === 'all' ? (
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
                  // Organized by child's age fit
                  <div className="space-y-6">
                    {/* Universal hikes (fit all kids) */}
                    {universalHikes.length > 0 && (
                      <div>
                        <h3 className="font-serif text-lg text-ink mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-olive" />
                          Great for Everyone
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {universalHikes.map(hike => (
                            <SavedItemCard
                              key={hike.id}
                              item={hike}
                              type="hike"
                              onRemove={toggleSavedHike}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Hikes organized by each child's age group */}
                    {Object.values(hikesByAgeFit).map(group => {
                      // Skip if already shown in universal
                      const groupHikes = group.hikes.filter(h => !universalHikes.find(u => u.id === h.id))
                      if (groupHikes.length === 0) return null
                      
                      const kid = kids.find(k => (k.ageGroup || k.age) === group.ageGroup)
                      const kidName = kid?.name || 'Unknown'
                      
                      return (
                        <div key={group.ageGroup}>
                          <h3 className="font-serif text-lg text-ink mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-peach" />
                            {kidName}'s Adventures (Ages {group.ageGroup})
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {groupHikes.map(hike => (
                              <SavedItemCard
                                key={hike.id}
                                item={hike}
                                type="hike"
                                onRemove={toggleSavedHike}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
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

            {activeTab === 'survey' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl p-8 shadow-sm border border-inkll/10 text-center">
                  <span className="text-5xl mb-4 block">📋</span>
                  <h3 className="font-serif text-2xl text-ink mb-2">Share Your Feedback</h3>
                  <p className="font-sans text-inkl mb-6 max-w-md mx-auto">
                    Help us improve Wilder Moms! Your feedback shapes what we build next.
                  </p>
                  <a
                    href={surveyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-ember text-white rounded-full font-sans font-medium text-lg hover:bg-terra transition-colors shadow-lg shadow-ember/20"
                  >
                    Take the Survey
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="bg-blush/30 rounded-xl p-6 border border-inkll/10">
                  <h4 className="font-serif text-lg text-ink mb-3">Quick Feedback</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { emoji: '🌲', label: 'More trails' },
                      { emoji: '🎨', label: 'Better crafts' },
                      { emoji: '👶', label: 'Baby-friendly' },
                      { emoji: '🐕', label: 'Dog trails' },
                    ].map(option => (
                      <button
                        key={option.label}
                        onClick={() => window.open(surveyUrl, '_blank')}
                        className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:bg-cream transition-colors shadow-sm"
                      >
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="font-sans text-xs text-ink text-center">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  )
}
