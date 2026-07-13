import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { hikes } from '../wilder-trails/hikes'
import { crafts } from '../wilder-homes/crafts'
import { builds } from '../wilder-homes/builds'
import { premiumBuilds as allPremiumBuilds } from '../wilder-builds/buildsLibrary'

const ageGroups = ['0-2', '3-5', '6-9', '10+']
const numericAgeGroups = {
  '0-2': { min: 0, max: 2 },
  '3-5': { min: 3, max: 5 },
  '6-9': { min: 6, max: 9 },
  '10+': { min: 10, max: 99 }
}
const interestOptions = ['Hiking', 'Crafts', 'Building', 'Nature', 'Animals', 'Water', 'Art', 'Music']

function PreferenceToggle({ enabled, onToggle, trueLabel, falseLabel }) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all ${
        enabled
          ? 'bg-ember text-white'
          : 'bg-blush/50 text-inkl hover:bg-blush'
      }`}
    >
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
    { key: 'hasStroller', trueLabel: 'Stroller needed', falseLabel: 'No stroller' },
    { key: 'wantsWater', trueLabel: 'Water features', falseLabel: 'No water needed' },
    { key: 'wantsViews', trueLabel: 'Scenic views', falseLabel: 'Any trail' },
    { key: 'wantsDogs', trueLabel: 'Dogs welcome', falseLabel: 'No dogs' },
    { key: 'prefersFreeParking', trueLabel: 'Free parking', falseLabel: 'Paid OK' },
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

function AcquiredGuideCard({ guide }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-inkll/10 flex flex-col"
    >
      {/* Cover */}
      <div
        className={`relative h-32 bg-gradient-to-br ${guide.coverGradient || guide.accent || 'from-ember via-terra to-gold'} flex items-center justify-center`}
      >
        <span className="text-white/95 font-serif text-xl italic px-4 text-center">
          {guide.title}
        </span>
        {guide.typeLabel && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-medium px-2 py-1 rounded-full bg-white/85 text-ink">
            {guide.typeLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="font-sans text-xs uppercase tracking-wider text-ember mb-1">
          {guide.dropMonth ? `${guide.dropMonth} ${guide.dropYear} drop` : 'Premium PDF'}
        </p>
        <h4 className="font-serif text-base text-ink mb-1 line-clamp-2">
          {guide.title}
        </h4>
        {guide.subtitle && (
          <p className="font-sans text-xs text-inkl mb-3 line-clamp-2">{guide.subtitle}</p>
        )}
        <button
          type="button"
          className="mt-auto self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ember text-white font-sans text-xs font-medium hover:bg-terra transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </motion.div>
  )
}

function LockedGuideCard({ guide }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-inkll/10 flex flex-col relative"
    >
      {/* Cover */}
      <div
        className={`relative h-32 bg-gradient-to-br ${guide.coverGradient || guide.accent || 'from-ember via-terra to-gold'} flex items-center justify-center opacity-70`}
      >
        <span className="text-white/90 font-serif text-xl italic px-4 text-center">
          {guide.title}
        </span>
        <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white/95 text-ink px-3 py-1 rounded-full font-sans text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Members only
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="font-sans text-xs uppercase tracking-wider text-inkll mb-1">
          {guide.dropMonth ? `${guide.dropMonth} ${guide.dropYear} drop` : 'Premium PDF'}
        </p>
        <h4 className="font-serif text-base text-inkl mb-3 line-clamp-2">
          {guide.title}
        </h4>
        <Link
          to="/wilder-homes?tab=premium"
          className="mt-auto self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cream text-inkl border border-inkll/20 font-sans text-xs font-medium hover:bg-blush transition-colors"
        >
          Subscribe to unlock
        </Link>
      </div>
    </motion.div>
  )
}

function LibrarySkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-5 w-40 bg-blush/60 rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <div key={i} className="h-24 bg-blush/40 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
      <div>
        <div className="h-5 w-48 bg-blush/60 rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-blush/40 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
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
  const [hikesViewMode, setHikesViewMode] = useState('all') // 'all' or 'byAge'

  // Acquired Guides state
  const [guidesState, setGuidesState] = useState({
    loading: false,
    subscribed: false,
    acquired: [], // array of premium build ids the user has unlocked
    error: null,
  })

  // Fetch acquired guides from API on mount
  useEffect(() => {
    let cancelled = false
    const fetchGuides = async () => {
      setGuidesState(prev => ({ ...prev, loading: true, error: null }))
      try {
        const res = await fetch('/api/my-guides', { credentials: 'include' })
        if (cancelled) return
        if (!res.ok) {
          setGuidesState({
            loading: false,
            subscribed: false,
            acquired: [],
            error: `Could not load your guides (${res.status})`,
          })
          return
        }
        const data = await res.json().catch(() => ({}))
        setGuidesState({
          loading: false,
          subscribed: Boolean(data?.hasAccess),
          acquired: Array.isArray(data?.acquired) ? data.acquired : [],
          error: null,
        })
      } catch (err) {
        if (cancelled) return
        setGuidesState({
          loading: false,
          subscribed: false,
          acquired: [],
          error: err?.message || 'Could not load your guides',
        })
      }
    }
    fetchGuides()
    return () => {
      cancelled = true
    }
  }, [])

  // Resolve which premium guides the user actually has access to
  const myAcquiredGuides = useMemo(() => {
    if (!guidesState.subscribed) return []
    const acquiredSet = new Set(guidesState.acquired)
    if (acquiredSet.size === 0) return allPremiumBuilds // subscribed but no explicit list => all
    return allPremiumBuilds.filter(b => acquiredSet.has(b.id) || acquiredSet.has(b.slug))
  }, [guidesState])

  // Locked guides — premium builds the user hasn't unlocked yet
  const lockedGuides = useMemo(() => {
    if (guidesState.subscribed) return []
    return allPremiumBuilds
  }, [guidesState.subscribed])

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
    { id: 'library', label: 'My Library', count: null, icon: null },
    { id: 'survey', label: 'Survey', count: null, icon: null }
  ]

  const surveyUrl = 'https://us3.list-manage.com/survey?u=9ea84c4182a6c4ac21ecf2caa&id=58dad03290&attribution=false'

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-4">
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
                {tab.count !== null && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-blush'
                  }`}>
                    {tab.count}
                  </span>
                )}
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

            {activeTab === 'library' && (
              <div className="space-y-10">
                {/* Saved Builds section */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-lg text-ink flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-ember" />
                      Saved Builds
                    </h3>
                    {savedBuildItems.length > 0 && (
                      <span className="text-xs font-sans text-inkll">
                        {savedBuildItems.length} saved
                      </span>
                    )}
                  </div>
                  {savedBuildItems.length > 0 ? (
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
                    <div className="bg-white rounded-xl border border-inkll/10 p-6 text-center">
                      <p className="font-sans text-sm text-inkl">
                        No saved builds yet. Tap the heart on any free build to save it here.
                      </p>
                      <Link
                        to="/wilder-homes"
                        className="inline-block mt-3 text-xs font-sans font-medium text-ember hover:text-terra transition-colors"
                      >
                        Browse Wilder Homes →
                      </Link>
                    </div>
                  )}
                </section>

                {/* Acquired Guides section */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-lg text-ink flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      Acquired Monthly Guides
                    </h3>
                    <Link
                      to="/wilder-homes?tab=premium"
                      className="text-xs font-sans font-medium text-ember hover:text-terra transition-colors"
                    >
                      See Wilder Builds →
                    </Link>
                  </div>

                  {guidesState.loading ? (
                    <LibrarySkeleton />
                  ) : guidesState.error ? (
                    <div className="bg-white rounded-xl border border-inkll/10 p-6 text-center">
                      <p className="font-sans text-sm text-inkl mb-3">
                        {guidesState.error}
                      </p>
                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="text-xs font-sans font-medium text-ember hover:text-terra transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  ) : guidesState.subscribed ? (
                    myAcquiredGuides.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {myAcquiredGuides.map(guide => (
                          <AcquiredGuideCard key={guide.id} guide={guide} />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-inkll/10 p-6 text-center">
                        <p className="font-sans text-sm text-inkl">
                          No guides unlocked yet — your first drop arrives on the 1st.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="space-y-4">
                      {/* Pitch card */}
                      <div className="bg-gradient-to-br from-ink to-forest rounded-2xl p-6 text-white">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium mb-2">
                          Wilder Builds · Members only
                        </p>
                        <h4 className="font-serif italic text-2xl mb-2">
                          Subscribe to unlock monthly PDFs
                        </h4>
                        <p className="font-sans text-sm text-white/75 mb-5 max-w-md">
                          Two themed PDFs every month on the 1st — one Architect Blueprint, one Lab Activity. Your library grows forever.
                        </p>
                        <Link
                          to="/wilder-homes?tab=premium"
                          className="inline-flex items-center gap-2 bg-ember hover:bg-terra text-white px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-colors shadow-md"
                        >
                          Subscribe to unlock
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>

                      {/* Locked preview cards */}
                      {lockedGuides.length > 0 && (
                        <div>
                          <p className="font-sans text-xs uppercase tracking-wider text-inkll mb-3">
                            What's waiting for you
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {lockedGuides.map(guide => (
                              <LockedGuideCard key={guide.id} guide={guide} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            )}

            {activeTab === 'survey' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl p-8 shadow-sm border border-inkll/10 text-center">
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
                      { label: 'More trails' },
                      { label: 'Better crafts' },
                      { label: 'Baby-friendly' },
                      { label: 'Dog trails' },
                    ].map(option => (
                      <button
                        key={option.label}
                        onClick={() => window.open(surveyUrl, '_blank')}
                        className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:bg-cream transition-colors shadow-sm"
                      >
                        <span className="font-sans text-sm text-ink text-center font-medium">{option.label}</span>
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
