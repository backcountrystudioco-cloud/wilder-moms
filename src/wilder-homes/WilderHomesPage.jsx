import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { buildCategories, getBuildsByCategory } from './builds'
import BuildCard from './BuildCard'
import CraftCard from './CraftCard'
import WildRoom from './WildRoom'
import WilderCampArchitect from './WilderCampArchitect'
import EcoProductsPage from './EcoProductsPage'
import MaterialPicker, { getMatchedItems } from './MaterialPicker'
import { activities } from './activities'
import { crafts } from './crafts'
import { fadeUpVariants } from '../hooks/useScrollReveal'

// WilderHomesPage — /wilder-homes
// Unified 5-tab hub for the free Wilder Homes destination:
//   1. Guides — free DIY builds
//   2. Activities — free crafts kids can do themselves
//   3. Wild Room — interactive space design tool
//   4. Architect — Wilder Camp Architect ($35 premium blueprints)
//   5. Eco — verified eco-friendly products
// The premium subscription lives separately at /wilder-builds.

const TABS = [
  { id: 'guides', label: 'Guides', accent: 'ember' },
  { id: 'activities', label: 'Activities', accent: 'olive' },
  { id: 'wildroom', label: 'Wild Room', accent: 'olive' },
  { id: 'architect', label: 'Architect', accent: 'gold' },
  { id: 'eco', label: 'Eco', accent: 'forest' },
]

export default function WilderHomesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') || 'guides'
  const [activeTab, setActiveTab] = useState(
    TABS.some(t => t.id === initialTab) ? initialTab : 'guides'
  )

  // Keep URL in sync with the active tab so links like /wilder-homes?tab=eco
  // deep-link into the right section.
  useEffect(() => {
    const current = searchParams.get('tab')
    if (current !== activeTab) {
      const next = new URLSearchParams(searchParams)
      next.set('tab', activeTab)
      setSearchParams(next, { replace: true })
    }
  }, [activeTab, searchParams, setSearchParams])

  return (
    <div className="min-h-screen bg-cream pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={0}
          className="text-center mb-10 pt-8"
        >
          <Link
            to="/wilder-builds"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ember/10 text-ember border border-ember/25 text-xs font-medium uppercase tracking-widest hover:bg-ember/15 transition-colors mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            New: Wilder Builds · monthly PDFs
            <span aria-hidden>→</span>
          </Link>
          <p className="text-inkll text-xs font-medium uppercase tracking-widest mb-4">
            WILDER HOMES
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-ember leading-tight mb-6">
            Make your home connected to nature.
          </h1>
          <p className="text-inkl max-w-2xl mx-auto leading-relaxed text-lg">
            Free DIY guides, activities, an interactive design tool, and curated eco
            products — everything you need to bring the outdoors in.
          </p>
        </motion.div>

        {/* Internal tab navigation */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {TABS.map(tab => (
            <NavChip
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              accent={tab.accent}
            >
              {tab.label}
            </NavChip>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'guides' && <GuidesTab />}
          {activeTab === 'activities' && <CraftsTab />}
          {activeTab === 'wildroom' && <WildRoom />}
          {activeTab === 'architect' && <WilderCampArchitect />}
          {activeTab === 'eco' && <EcoProductsPage />}
        </div>

        {/* Cross-sell to subscription */}
        <div className="mt-16 bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] rounded-3xl p-8 md:p-10 text-white text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-2">
            Want premium PDFs every month?
          </p>
          <h3 className="font-serif text-2xl md:text-3xl italic mb-2">
            See Wilder Builds
          </h3>
          <p className="text-white/80 max-w-lg mx-auto mb-6">
            Two new themed PDFs every month on the 1st — printable, beautifully
            designed, kid-tested. From $9/month or $79/year.
          </p>
          <Link
            to="/wilder-builds"
            className="inline-flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-full font-semibold hover:bg-cream transition-colors"
          >
            See Wilder Builds →
          </Link>
        </div>
      </div>
    </div>
  )
}

function NavChip({ children, active, onClick, accent = 'ember' }) {
  const activeCls = {
    ember: 'bg-ember text-white border-ember',
    olive: 'bg-olive text-white border-olive',
    gold: 'bg-gold text-ink border-gold',
    forest: 'bg-forest text-white border-forest',
  }[accent]
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
        active
          ? activeCls
          : 'bg-white text-inkl border-inkll/30 hover:border-inkl/60 hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function GuidesTab() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [showMaterialPicker, setShowMaterialPicker] = useState(false)

  const filteredBuilds = useMemo(() => {
    let result = getBuildsByCategory(selectedCategory)
    if (selectedMaterials.length > 0) {
      result = getMatchedItems(result, selectedMaterials)
    }
    return result
  }, [selectedCategory, selectedMaterials])

  const matchedActivities = useMemo(() => {
    if (selectedMaterials.length === 0) return []
    return getMatchedItems(activities, selectedMaterials).slice(0, 4)
  }, [selectedMaterials])

  const toggleMaterial = (materialId) =>
    setSelectedMaterials(prev =>
      prev.includes(materialId) ? prev.filter(id => id !== materialId) : [...prev, materialId]
    )

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Mud Kitchens': return 'bg-[#8C4A14]'
      case 'Garden Beds': return 'bg-[#5A6428]'
      case 'Nature Play': return 'bg-[#96963C]'
      case 'Climbing Structures': return 'bg-[#464F5F]'
      case 'Water Play': return 'bg-[#5A3C00]'
      case 'Cozy Hideouts': return 'bg-[#B43C1E]'
      case 'Weekend Builds': return 'bg-[#8C1E00]'
      default: return 'bg-ember'
    }
  }

  return (
    <div>
      {/* Material picker toggle */}
      <button
        onClick={() => setShowMaterialPicker(!showMaterialPicker)}
        className={`w-full p-4 rounded-xl border-2 mb-6 flex items-center justify-between transition-all ${
          showMaterialPicker
            ? 'border-ember bg-white shadow-md'
            : selectedMaterials.length > 0
              ? 'border-olive bg-olive/5'
              : 'border-inkll/20 bg-white hover:border-ember/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">Search</span>
          <div className="text-left">
            <p className="font-sans font-medium text-ink">
              {selectedMaterials.length > 0
                ? `${selectedMaterials.length} material${selectedMaterials.length > 1 ? 's' : ''} selected`
                : 'What do you have?'}
            </p>
            <p className="text-sm text-inkl">
              {selectedMaterials.length > 0
                ? 'Showing builds you can make with what you have'
                : 'Filter builds by materials you already own'}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-inkll transition-transform ${showMaterialPicker ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showMaterialPicker && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <MaterialPicker
            selectedMaterials={selectedMaterials}
            onToggleMaterial={toggleMaterial}
            onClearAll={() => setSelectedMaterials([])}
          />
        </motion.div>
      )}

      {selectedMaterials.length > 0 && matchedActivities.length > 0 && (
        <div className="mb-6 p-4 bg-olive/5 border border-olive/20 rounded-xl">
          <p className="font-sans text-sm font-medium text-olive mb-3">
            Activities you can make right now:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {matchedActivities.map(activity => (
              <div
                key={activity.id}
                className={`p-3 rounded-lg ${
                  activity.hasAllMaterials
                    ? 'bg-olive/20 border border-olive/30'
                    : 'bg-white border border-inkll/10'
                }`}
              >
                <p className="font-sans text-sm text-ink font-medium truncate">
                  {activity.title}
                </p>
                {activity.hasAllMaterials ? (
                  <p className="text-xs text-olive mt-1">Ready!</p>
                ) : (
                  <p className="text-xs text-inkl mt-1">
                    Missing {activity.missingMaterials.length}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {buildCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-ember text-white shadow-lg shadow-ember/20'
                  : `${getCategoryColor(category)} text-white hover:opacity-90`
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="text-inkll text-sm mb-6">
        Showing {filteredBuilds.length} free {filteredBuilds.length === 1 ? 'build' : 'builds'}
        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
      </p>

      {filteredBuilds.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredBuilds.map((build, index) => (
            <BuildCard key={build.id} build={build} index={index} />
          ))}
        </div>
      ) : (
        <div className="bg-blush rounded-2xl p-12 text-center">
          <p className="font-serif text-2xl text-ink italic">
            No builds found in this category yet.
          </p>
          <p className="text-inkl mt-2">Check back soon or explore other categories.</p>
        </div>
      )}
    </div>
  )
}

function CraftsTab() {
  return (
    <div>
      <p className="text-inkll text-sm mb-6">
        Showing {crafts.length} free {crafts.length === 1 ? 'craft' : 'crafts'}. Tap a card to
        see materials and instructions.
      </p>
      {crafts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crafts.map((craft, index) => (
            <CraftCard key={craft.id} craft={craft} index={index} />
          ))}
        </div>
      ) : (
        <div className="bg-blush rounded-2xl p-12 text-center">
          <p className="font-serif text-2xl text-ink italic">No crafts yet.</p>
          <p className="text-inkl mt-2">Check back soon.</p>
        </div>
      )}
    </div>
  )
}
