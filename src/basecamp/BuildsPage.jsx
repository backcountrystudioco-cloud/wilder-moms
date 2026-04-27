import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { builds, buildCategories, getBuildsByCategory } from './builds'
import BuildCard from './BuildCard'
import WilderCampArchitect from './WilderCampArchitect'
import WildRoom from './WildRoom'
import EcoProductsPage from './EcoProductsPage'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import MaterialPicker, { getMatchedItems } from './MaterialPicker'
import { activities } from './activities'

export default function BuildsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedSection, setExpandedSection] = useState('free')
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [showMaterialPicker, setShowMaterialPicker] = useState(false)
  const [buildPrompt, setBuildPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBuilds, setGeneratedBuilds] = useState([])
  const [buildError, setBuildError] = useState('')
  const [freeGenerations, setFreeGenerations] = useState(5)
  const [hasSubscription, setHasSubscription] = useState(false)

  const filteredBuilds = useMemo(() => {
    let result = getBuildsByCategory(selectedCategory)
    
    // Filter by selected materials if any
    if (selectedMaterials.length > 0) {
      const matched = getMatchedItems(result, selectedMaterials)
      result = matched
    }
    
    return result
  }, [selectedCategory, selectedMaterials])

  const matchedActivities = useMemo(() => {
    if (selectedMaterials.length === 0) return []
    return getMatchedItems(activities, selectedMaterials).slice(0, 4)
  }, [selectedMaterials])

  const toggleMaterial = (materialId) => {
    setSelectedMaterials(prev => {
      if (prev.includes(materialId)) {
        return prev.filter(id => id !== materialId)
      }
      return [...prev, materialId]
    })
  }

  const clearMaterials = () => {
    setSelectedMaterials([])
  }

  const generateBuilds = async () => {
    if (!buildPrompt.trim()) return
    if (!hasSubscription && freeGenerations <= 0) return
    
    setIsGenerating(true)
    setBuildError('')
    
    try {
      const response = await fetch('/api/ai-build-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: buildPrompt })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate builds')
      }
      
      setGeneratedBuilds(data.builds)
      if (!hasSubscription) {
        setFreeGenerations(prev => prev - 1)
      }
    } catch (error) {
      console.error('Build generation error:', error)
      setBuildError(error.message || 'Failed to generate builds. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

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
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={0}
          className="text-center mb-8 pt-8"
        >
          <p className="text-inkll text-xs font-medium uppercase tracking-widest mb-4">
            THE BASE CAMP · BUILD GUIDES
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-ember leading-tight mb-6">
            Build a wilder home for your kids.
          </h1>
          <p className="text-inkl max-w-2xl mx-auto leading-relaxed text-lg">
            Healthy living spaces aren't complicated or expensive. These are the builds that turn a
            backyard — or a balcony — into a place your kids will choose over a screen, every single
            time.
          </p>
        </motion.div>

        {/* Wilder Companion AI Build Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 p-6 md:p-8 bg-gradient-to-br from-[#1A1A2E] via-[#2D3A4A] to-[#3D5A80] rounded-3xl"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl text-white">Wilder Companion</h2>
                <p className="text-white/60 text-sm">AI-powered build generator</p>
              </div>
            </div>
            {!hasSubscription && (
              <div className="md:ml-auto bg-white/10 px-4 py-2 rounded-full">
                <p className="text-white text-sm">
                  <span className="font-medium">{freeGenerations}</span> free generations left
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={buildPrompt}
              onChange={(e) => setBuildPrompt(e.target.value)}
              placeholder="What do you have around the house? (e.g., cardboard boxes, old sheets, sticks, PVC pipes)"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              onKeyDown={(e) => e.key === 'Enter' && generateBuilds()}
            />
            <button
              onClick={generateBuilds}
              disabled={isGenerating || !buildPrompt.trim() || (!hasSubscription && freeGenerations <= 0)}
              className="px-6 py-3 bg-ember text-white font-medium rounded-xl hover:bg-terra transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 0h12a8 8 0 010 16V0z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  Generate Builds
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {(!hasSubscription && freeGenerations <= 0) && (
            <div className="mt-4 p-4 bg-white/10 rounded-xl text-center">
              <p className="text-white text-sm mb-2">You've used all your free generations</p>
              <button className="px-4 py-2 bg-white text-ink rounded-full text-sm font-medium hover:bg-cream transition-colors">
                Unlock Unlimited - Coming Soon
              </button>
            </div>
          )}

          {buildError && (
            <p className="mt-3 text-red-300 text-sm text-center">{buildError}</p>
          )}

          {generatedBuilds.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-white font-serif text-lg">Your Builds</h3>
              {generatedBuilds.map((build, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h4 className="font-serif text-lg text-white mb-2">{build.title}</h4>
                  <p className="text-white/70 text-sm mb-3">{build.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">Materials</p>
                      <ul className="space-y-1">
                        {build.materials.map((mat, i) => (
                          <li key={i} className="text-sm text-white/80 flex items-start gap-2">
                            <span className="text-olive">-</span>
                            {mat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-2">Steps</p>
                      <ol className="space-y-1">
                        {build.steps.map((step, i) => (
                          <li key={i} className="text-sm text-white/80 flex items-start gap-2">
                            <span className="text-ember font-medium w-4">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm italic text-olive">{build.whyKidsLoveIt}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Three Section Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={1}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {/* Free Builds Card */}
          <button
            onClick={() => setExpandedSection('free')}
            className={`text-left p-6 rounded-2xl border-2 transition-all ${
              expandedSection === 'free'
                ? 'border-ember bg-white shadow-lg'
                : 'border-inkll/20 bg-white/50 hover:border-ember/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink">Free Builds</h3>
                <p className="text-inkl text-sm">{builds.length} guides</p>
              </div>
            </div>
            <p className="text-inkl text-sm">
              Step-by-step DIY guides for mud kitchens, gardens, forts, and more. Free to access, built with simple materials.
            </p>
            {expandedSection === 'free' && (
              <div className="mt-4 text-xs text-ember font-medium">↓ Viewing now</div>
            )}
          </button>

          {/* Wild Room Card */}
          <button
            onClick={() => setExpandedSection('wildroom')}
            className={`text-left p-6 rounded-2xl border-2 transition-all ${
              expandedSection === 'wildroom'
                ? 'border-ember bg-white shadow-lg'
                : 'border-inkll/20 bg-white/50 hover:border-ember/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#5A6428]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#5A6428]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink">The Wild Room</h3>
                <p className="text-inkl text-sm">Interactive tool</p>
              </div>
            </div>
            <p className="text-inkl text-sm">
              Design your outdoor space by room type. Choose from Mud, Grow, Build, Still, and Wonder zones.
            </p>
            {expandedSection === 'wildroom' && (
              <div className="mt-4 text-xs text-ember font-medium">↓ Viewing now</div>
            )}
          </button>

          {/* Architect Card */}
          <button
            onClick={() => setExpandedSection('architect')}
            className={`text-left p-6 rounded-2xl border-2 transition-all ${
              expandedSection === 'architect'
                ? 'border-ember bg-white shadow-lg'
                : 'border-inkll/20 bg-white/50 hover:border-ember/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#D2961E]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#D2961E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink">Wilder Camp Architect</h3>
                <p className="text-inkl text-sm">Premium blueprints</p>
              </div>
            </div>
            <p className="text-inkl text-sm">
              Architectural blueprints for cradle-to-grave builds. Ancient techniques, modern simplicity. Premium plans from $35.
            </p>
            {expandedSection === 'architect' && (
              <div className="mt-4 text-xs text-ember font-medium">↓ Viewing now</div>
            )}
          </button>

          {/* Eco Products Card */}
          <button
            onClick={() => setExpandedSection('ecoproducts')}
            className={`text-left p-6 rounded-2xl border-2 transition-all ${
              expandedSection === 'ecoproducts'
                ? 'border-ember bg-white shadow-lg'
                : 'border-inkll/20 bg-white/50 hover:border-ember/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#2D5A3D]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#2D5A3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink">Eco Products</h3>
                <p className="text-inkl text-sm">Verified green building</p>
              </div>
            </div>
            <p className="text-inkl text-sm">
              Verified eco-friendly paints, materials, and furnishings. No greenwashing — just third-party certified products.
            </p>
            {expandedSection === 'ecoproducts' && (
              <div className="mt-4 text-xs text-ember font-medium">↓ Viewing now</div>
            )}
          </button>

          {/* The Archive Card */}
          <button
            onClick={() => setExpandedSection('archive')}
            className={`text-left p-6 rounded-2xl border-2 transition-all ${
              expandedSection === 'archive'
                ? 'border-ember bg-white shadow-lg'
                : 'border-inkll/20 bg-white/50 hover:border-ember/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#5A3C00]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#5A3C00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink">The Archive</h3>
                <p className="text-inkl text-sm">Premium guides</p>
              </div>
            </div>
            <p className="text-inkl text-sm">
              Ancient building wisdom for modern families. Cob, timber framing, stone stacking — downloadable PDF guides.
            </p>
            {expandedSection === 'archive' && (
              <div className="mt-4 text-xs text-ember font-medium">↓ Viewing now</div>
            )}
          </button>
        </motion.div>

        {/* Free Builds Section */}
        {expandedSection === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Material Picker Toggle */}
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
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Material Picker Panel */}
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
                  onClearAll={clearMaterials}
                />
              </motion.div>
            )}

            {/* Matched Activities Preview */}
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
                        <p className="text-xs text-olive mt-1">✓ Ready!</p>
                      ) : (
                        <p className="text-xs text-inkl mt-1">Missing {activity.missingMaterials.length}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter Tabs */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                {buildCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      flex-shrink-0 px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-300
                      ${selectedCategory === category
                        ? 'bg-ember text-white shadow-lg shadow-ember/20'
                        : `${getCategoryColor(category)} text-white hover:opacity-90`
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <p className="text-inkll text-sm mb-6">
              Showing {filteredBuilds.length} free {filteredBuilds.length === 1 ? 'build' : 'builds'}{selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>

            {/* Builds Grid */}
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
                <p className="text-inkl mt-2">
                  Check back soon or explore other categories.
                </p>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-16 text-center bg-parchment rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl text-ink italic mb-4">
                Want more build guides?
              </h2>
              <p className="text-inkl max-w-xl mx-auto mb-6">
                We're constantly adding new projects. Join the waitlist to be the first to know when new builds are released.
              </p>
              <a
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  const waitlist = document.getElementById('waitlist')
                  if (waitlist) {
                    setTimeout(() => {
                      waitlist.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }
                }}
                className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-terra transition-colors"
              >
                Join the Waitlist
              </a>
            </div>

            {/* Other Sections Links */}
            <div className="mt-12 grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setExpandedSection('wildroom')}
                className="p-6 bg-white rounded-xl border border-inkll/20 hover:border-[#5A6428] transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-[#5A6428]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="font-serif text-lg text-ink">Explore The Wild Room</span>
                </div>
                <p className="text-inkl text-sm">Design your space by room type — interactive tool</p>
              </button>
              <button
                onClick={() => setExpandedSection('architect')}
                className="p-6 bg-white rounded-xl border border-inkll/20 hover:border-[#D2961E] transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-[#D2961E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="font-serif text-lg text-ink">View Premium Blueprints</span>
                </div>
                <p className="text-inkl text-sm">Cradle-to-grave compostable builds from $35</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Wild Room Section */}
        {expandedSection === 'wildroom' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <WildRoom />
            
            {/* Other Sections Links */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-inkll/20">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setExpandedSection('free')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">Back to Free Builds</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">{builds.length} step-by-step guides</p>
                </button>
                <button
                  onClick={() => setExpandedSection('architect')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-[#D2961E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">View Premium Blueprints</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">Architectural plans from $35</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Architect Section */}
        {expandedSection === 'architect' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <WilderCampArchitect />
            
            {/* Other Sections Links */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-inkll/20">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setExpandedSection('free')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">Back to Free Builds</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">{builds.length} step-by-step guides</p>
                </button>
                <button
                  onClick={() => setExpandedSection('wildroom')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-[#5A6428]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">Explore The Wild Room</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">Interactive design tool</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Eco Products Section */}
        {expandedSection === 'ecoproducts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EcoProductsPage />
            
            {/* Other Sections Links */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-inkll/20">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setExpandedSection('free')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">Back to Free Builds</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">{builds.length} step-by-step guides</p>
                </button>
                <button
                  onClick={() => setExpandedSection('architect')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-[#D2961E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">View Premium Blueprints</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">Architectural plans from $35</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Archive Section */}
        {expandedSection === 'archive' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Hero Banner */}
            <div className="mb-12 p-8 md:p-12 bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] rounded-3xl text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-8xl">*</div>
                <div className="absolute bottom-4 right-4 text-8xl">*</div>
                <div className="absolute top-1/2 left-1/4 text-6xl opacity-50">*</div>
              </div>
              
              <div className="relative z-10">
                <p className="text-white/80 text-xs font-medium uppercase tracking-widest mb-3">
                  The Wilder Archive · Premium Downloads
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-white italic mb-4 leading-tight">
                  The outdoor skills your<br />grandparents knew by heart.
                </h2>
                <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                  Cob, timber framing, stone stacking — techniques passed down through generations, 
                  now adapted for modern family gardens. These aren't just builds. They're heirlooms.
                </p>
                
                {/* Social proof badges */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-ember">Star</span>
                    <span>4.9 rating from 200+ families</span>
                  </div>
                  <div className="w-px h-4 bg-white/30" />
                  <div>Instant PDF download</div>
                  <div className="w-px h-4 bg-white/30" />
                  <div>Lifetime access</div>
                </div>
              </div>
            </div>

            {/* Why Ancient Techniques Matter */}
            <div className="mb-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-inkll/10 text-center">
                <div className="text-4xl mb-3">Globe</div>
                <h4 className="font-serif text-lg text-ink mb-2">Zero Waste</h4>
                <p className="text-inkl text-sm">Built with materials from your own yard. No carbon footprint, no hardware store run.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-inkll/10 text-center">
                <div className="text-4xl mb-3">Child</div>
                <h4 className="font-serif text-lg text-ink mb-2">Kid-Safe</h4>
                <p className="text-inkl text-sm">Every technique adapted for little hands. Sensory-rich, developmentally appropriate.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-inkll/10 text-center">
                <div className="text-4xl mb-3">Mountain</div>
                <h4 className="font-serif text-lg text-ink mb-2">Lasts Generations</h4>
                <p className="text-inkl text-sm">Stone and earth don't rot. These are the builds your grandchildren will play on.</p>
              </div>
            </div>

            {/* Archive Cards */}
            <div className="mb-12">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-ember mb-1">Ancient Technique Guides</p>
                  <h3 className="font-serif text-2xl text-ink italic">Build something that lasts.</h3>
                </div>
                <p className="text-inkl text-sm hidden md:block">Each includes printable blueprints, material lists & step-by-step video</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Cob for Kids */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-inkll/10 group"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#8C4A14] to-[#D2961E] flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl text-white/30">Craft</div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-white text-xs font-medium uppercase tracking-wider">Most Popular</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-ember/10 text-ember text-xs font-medium rounded-full">Bestseller</span>
                      <span className="text-inkll text-xs">45 pages · 3 hrs</span>
                    </div>
                    <h3 className="font-serif text-xl text-ink mb-2">Cob for Kids</h3>
                    <p className="text-inkl text-sm leading-relaxed mb-4">
                      Earth building made accessible. Shape cob benches, mushroom seats, sculptural forms 
                      that children can climb on — using clay, sand, and straw from your own yard.
                    </p>
                    
                    {/* What's included */}
                    <div className="bg-cream/50 rounded-lg p-3 mb-4">
                      <p className="text-xs font-medium text-ink mb-2">What's inside:</p>
                      <ul className="text-xs text-inkl space-y-1">
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> 45-page illustrated guide</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Printable material checklist</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Step-by-step video tutorial</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Safety guide for kids</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-serif text-ink">$35</span>
                        <span className="text-inkl text-xs block">One-time purchase, lifetime access</span>
                      </div>
                    </div>
                    <a
                      href="https://gumroad.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-center bg-ember text-white font-sans font-medium rounded-full hover:bg-terra transition-colors shadow-lg shadow-ember/20"
                    >
                      Get the Guide →
                    </a>
                  </div>
                </motion.div>

                {/* Timber & Twine */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-inkll/10 group"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#5A6428] to-[#96963C] flex items-center justify-center relative overflow-hidden">
                    <div className="text-7xl">Wood</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-[#5A6428]/10 text-[#5A6428] text-xs font-medium rounded-full">Editor’s Pick</span>
                      <span className="text-inkll text-xs">38 pages · 4 hrs</span>
                    </div>
                    <h3 className="font-serif text-xl text-ink mb-2">Timber & Twine</h3>
                    <p className="text-inkl text-sm leading-relaxed mb-4">
                      Joinery without nails. Japanese-inspired connections, rope-lashed joints, 
                      and the beauty of a frame that holds together through geometry alone.
                    </p>
                    
                    {/* What's included */}
                    <div className="bg-cream/50 rounded-lg p-3 mb-4">
                      <p className="text-xs font-medium text-ink mb-2">What's inside:</p>
                      <ul className="text-xs text-inkl space-y-1">
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> 38-page illustrated guide</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Knot-tying reference chart</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> 3 project blueprints</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Tool recommendations</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-serif text-ink">$35</span>
                        <span className="text-inkl text-xs block">One-time purchase, lifetime access</span>
                      </div>
                    </div>
                    <a
                      href="https://gumroad.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-center bg-ink text-white font-sans font-medium rounded-full hover:bg-ember transition-colors"
                    >
                      Get the Guide →
                    </a>
                  </div>
                </motion.div>

                {/* The Stone Circle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-inkll/10 group"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#464F5F] to-[#5A6428] flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl text-white/30">Guide</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-[#464F5F]/10 text-[#464F5F] text-xs font-medium rounded-full">New</span>
                      <span className="text-inkll text-xs">52 pages · 5 hrs</span>
                    </div>
                    <h3 className="font-serif text-xl text-ink mb-2">The Stone Circle</h3>
                    <p className="text-inkl text-sm leading-relaxed mb-4">
                      Dry stacking without mortar. The ancient art of balance — stones that hold each other up 
                      through geometry alone. Create gathering spaces, spirals, and towers.
                    </p>
                    
                    {/* What's included */}
                    <div className="bg-cream/50 rounded-lg p-3 mb-4">
                      <p className="text-xs font-medium text-ink mb-2">What's inside:</p>
                      <ul className="text-xs text-inkl space-y-1">
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> 52-page illustrated guide</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Design templates (5 patterns)</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Stone sourcing guide</li>
                        <li className="flex items-start gap-2"><span className="text-olive">✓</span> Weatherproofing tips</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-serif text-ink">$45</span>
                        <span className="text-inkl text-xs block">One-time purchase, lifetime access</span>
                      </div>
                    </div>
                    <a
                      href="https://gumroad.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-center bg-ink text-white font-sans font-medium rounded-full hover:bg-ember transition-colors"
                    >
                      Get the Guide →
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Full Library Bundle CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 bg-gradient-to-r from-ink via-[#2D5A3D] to-[#5A6428] rounded-3xl p-8 md:p-12 text-center"
            >
              <span className="inline-block px-4 py-1 bg-ember text-white text-xs font-medium rounded-full mb-4">
                Save $65 with the Complete Bundle
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-white italic mb-3">
                The Full Wilder Archive
              </h3>
              <p className="text-white/60 text-sm max-w-lg mx-auto mb-6">
                All 5 ancient technique guides + all 3 Wilder Library philosophy books. 
                Everything you need to transform your backyard into a generations-long adventure.
              </p>
              
              {/* What's included quick view */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['Cob for Kids', 'Timber & Twine', 'Stone Circle', 'Wattle & Daub', 'Cordwood Craft', 'Mud Kitchen Handbook', 'Art of Doing Nothing', '12 Seasonal Builds'].map(item => (
                  <span key={item} className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">{item}</span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://gumroad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-white text-ink font-sans font-bold rounded-full hover:bg-cream transition-colors shadow-xl text-lg"
                >
                  Get the Full Archive — $199
                </a>
                <p className="text-white/40 text-sm">Reg. $264 separately</p>
              </div>
            </motion.div>

            {/* Wilder Library Philosophy Collection */}
            <div className="mb-12">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-olive mb-1">The Wilder Library</p>
                  <h3 className="font-serif text-2xl text-ink italic">The philosophy behind the builds.</h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* The Mud Kitchen Handbook */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 border border-inkll/10 flex gap-5"
                >
                  <div className="w-24 h-28 bg-gradient-to-br from-blush/30 to-parchment rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">🍲</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blush/50 text-ember text-xs font-medium rounded-full">40-page guide</span>
                      <span className="text-inkll text-xs">Instant PDF</span>
                    </div>
                    <h4 className="font-serif text-xl text-ink mb-2">The Mud Kitchen Handbook</h4>
                    <p className="text-inkl text-sm leading-relaxed mb-4">
                      A meditation on why mess is necessary for childhood development. 
                      Build philosophy + 5 recipes for the ultimate mud kitchen.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-serif text-ink">$18</span>
                      <a
                        href="https://gumroad.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-ember text-white text-sm font-medium rounded-full hover:bg-terra transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* The Art of Doing Nothing */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 border border-inkll/10 flex gap-5"
                >
                  <div className="w-24 h-28 bg-gradient-to-br from-olive/20 to-cream rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">Nature</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-olive/20 text-olive text-xs font-medium rounded-full">55-page guide</span>
                      <span className="text-inkll text-xs">Instant PDF</span>
                    </div>
                    <h4 className="font-serif text-xl text-ink mb-2">The Art of Doing Nothing</h4>
                    <p className="text-inkl text-sm leading-relaxed mb-4">
                      On letting children be bored and unsupervised outdoors. 
                      Why our ancestors understood this — and why we've forgotten.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-serif text-ink">$22</span>
                      <a
                        href="https://gumroad.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-olive text-white text-sm font-medium rounded-full hover:bg-forest transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mb-12 p-8 bg-parchment rounded-2xl text-center">
              <div className="flex justify-center mb-4">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-2xl text-ember">Star</span>
                ))}
              </div>
              <p className="font-serif text-xl text-ink italic mb-4 max-w-2xl mx-auto">
                "We built the cob bench last spring and my kids still use it every single day. 
                It's become the heart of our backyard. Worth every penny."
              </p>
              <p className="text-inkl text-sm">— Sarah, mother of 3, Portland OR</p>
            </div>

            {/* Master Builder Course CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-cream rounded-3xl p-8 md:p-12 text-center border border-inkll/10"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-ember mb-3">
                For Families Ready to Go Deep
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-ink italic mb-3">
                The Master Builder Course
              </h3>
              <p className="text-inkl max-w-lg mx-auto mb-6">
                6 weeks. 5 ancient techniques. One backyard. Video lessons, printable blueprints, 
                and a community of families building together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://gumroad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-ember text-white font-sans font-bold rounded-full hover:bg-terra transition-colors shadow-lg shadow-ember/20 text-lg"
                >
                  Join the Course — $120
                </a>
                <p className="text-inkl text-sm">or $199 with all guides included</p>
              </div>
            </motion.div>

            {/* Other Sections Links */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-inkll/20">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setExpandedSection('free')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">Back to Free Builds</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">{builds.length} step-by-step guides</p>
                </button>
                <button
                  onClick={() => setExpandedSection('architect')}
                  className="p-4 bg-cream rounded-lg hover:bg-parchment transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <svg className="w-4 h-4 text-[#D2961E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-ink">View Premium Blueprints</span>
                  </div>
                  <p className="text-inkl text-xs pl-7">Architectural plans from $35</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
