import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FilterBar from './FilterBar'
import ActivityCard from './ActivityCard'
import { activities } from './activities'

function ActivitiesPage() {
  const [selectedAge, setSelectedAge] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [buildPrompt, setBuildPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBuilds, setGeneratedBuilds] = useState([])
  const [buildError, setBuildError] = useState('')
  const [freeGenerations, setFreeGenerations] = useState(5)
  const [hasSubscription, setHasSubscription] = useState(false)

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Filter by age range
      if (selectedAge && activity.ageRange !== selectedAge) {
        return false
      }

      // Filter by categories (AND logic - must have all selected categories)
      if (selectedCategories.length > 0) {
        const hasAllCategories = selectedCategories.every(cat => 
          activity.categories.includes(cat)
        )
        if (!hasAllCategories) return false
      }

      // Filter by location
      if (selectedLocation) {
        if (selectedLocation === 'Indoor' && activity.indoor !== true) {
          return false
        }
        if (selectedLocation === 'Outdoor' && activity.indoor !== false) {
          return false
        }
        // 'Both' would pass both indoor=true and indoor=false
      }

      return true
    })
  }, [selectedAge, selectedCategories, selectedLocation])

  const hasActiveFilters = selectedAge || selectedCategories.length > 0 || selectedLocation

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
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page title */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Activities for Every Age
          </h1>
          <p className="font-sans text-inkl text-lg max-w-2xl">
            Discover nature-based adventures, creative crafts, and educational activities 
            for your family — filtered by age, category, and location.
          </p>
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

        {/* Filter Bar */}
        <FilterBar
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Results count */}
        <p className="font-sans text-sm text-inkl mb-4">
          {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
          {hasActiveFilters && ' (filtered)'}
        </p>

        {/* Activity Grid */}
        {filteredActivities.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blush rounded-2xl p-12 text-center"
          >
            <p className="font-serif text-2xl text-ink italic mb-4">
              No activities match your filters
            </p>
            <p className="font-sans text-inkl">
              Try adjusting your filters to see more activities, or clear all filters to start fresh.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ActivitiesPage
