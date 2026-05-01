import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { builds, buildCategories, getBuildsByCategory } from './builds'
import { crafts, craftCategories, getCraftsByCategory } from './crafts'
import BuildCard from './BuildCard'

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState('builds')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [craftCategory, setCraftCategory] = useState('All')
  const [buildPrompt, setBuildPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBuilds, setGeneratedBuilds] = useState([])
  const [buildError, setBuildError] = useState('')
  const [freeGenerations, setFreeGenerations] = useState(5)
  const [hasSubscription, setHasSubscription] = useState(false)

  const filteredBuilds = getBuildsByCategory(selectedCategory)
  const filteredCrafts = getCraftsByCategory(craftCategory)

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

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/wilder-homes" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
            ← Back to Wilder Homes
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">Activities</h1>
          <p className="text-inkl text-lg">Builds and crafts to make this weekend. Designed for the kind of fun that gets you dirty.</p>
        </motion.header>

        {/* Wilder Companion AI Build Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 bg-gradient-to-br from-[#1A1A2E] via-[#2D3A4A] to-[#3D5A80] rounded-3xl"
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
              placeholder="What do you have around the house? (e.g., cardboard boxes, old sheets, sticks)"
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

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('builds')}
            className={`px-6 py-3 rounded-full font-sans font-medium transition-all ${
              activeTab === 'builds'
                ? 'bg-ember text-white'
                : 'bg-white text-ink border border-inkll/20 hover:border-ember/50'
            }`}
          >
            Build Guides ({builds.length})
          </button>
          <button
            onClick={() => setActiveTab('crafts')}
            className={`px-6 py-3 rounded-full font-sans font-medium transition-all ${
              activeTab === 'crafts'
                ? 'bg-ember text-white'
                : 'bg-white text-ink border border-inkll/20 hover:border-ember/50'
            }`}
          >
            Crafts ({crafts.length})
          </button>
        </div>

        {/* Builds Section */}
        {activeTab === 'builds' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Category Filter */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {buildCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-sans text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-ink text-white'
                      : 'bg-white text-inkl border border-inkll/20 hover:border-ember/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-inkll text-sm mb-6">
              Showing {filteredBuilds.length} {filteredBuilds.length === 1 ? 'build' : 'builds'}
            </p>

            {/* Builds Grid */}
            {filteredBuilds.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuilds.map((build, index) => (
                  <BuildCard key={build.id} build={build} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-inkll/10">
                <p className="font-serif text-2xl text-ink italic">No builds found in this category.</p>
                <p className="text-inkl mt-2">Check back soon or explore other categories.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Crafts Section */}
        {activeTab === 'crafts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Category Filter */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {craftCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setCraftCategory(category)}
                  className={`px-4 py-2 rounded-full font-sans text-sm font-medium whitespace-nowrap transition-all ${
                    craftCategory === category
                      ? 'bg-ink text-white'
                      : 'bg-white text-inkl border border-inkll/20 hover:border-ember/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-inkll text-sm mb-6">
              Showing {filteredCrafts.length} {filteredCrafts.length === 1 ? 'craft' : 'crafts'}
            </p>

            {/* Crafts Grid */}
            {filteredCrafts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCrafts.map((craft, index) => (
                  <Link
                    key={craft.id}
                    to={`/wilder-homes/activities/craft/${craft.id}`}
                    className="bg-white rounded-xl overflow-hidden border border-inkll/10 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-blush/20 to-parchment flex items-center justify-center">
                      <span className="text-4xl">{craft.imageUrl ? '🎨' : '🎨'}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-lg text-ink mb-1">{craft.title}</h4>
                      <p className="text-xs text-inkl mb-2 line-clamp-2">{craft.description}</p>
                      <div className="flex items-center gap-2 text-xs text-inkll">
                        <span>{craft.timeEstimate}</span>
                        <span>·</span>
                        <span>Ages {craft.ageRange}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-inkll/10">
                <p className="font-serif text-2xl text-ink italic">No crafts found in this category.</p>
                <p className="text-inkl mt-2">Check back soon or explore other categories.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Wilder Lab Upsell Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Link
            to="/wilder-homes/activities/archive"
            className="block bg-gradient-to-r from-[#1A1A2E] via-[#2D3A4A] to-[#3D5A80] rounded-3xl p-8 text-center hover:opacity-95 transition-opacity group"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-white/80 text-xs font-medium uppercase tracking-wider">The Wilder Lab</span>
            </div>
            <h3 className="font-serif text-2xl text-white italic mb-2">
              Where living materials meet family builds
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mb-4">
              Mycelium, hempcrete, cob, and more — guides for building with the earth, not against it.
            </p>
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-olive text-white font-sans font-medium rounded-full group-hover:bg-white group-hover:text-ink transition-colors">
              Explore The Wilder Lab
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
