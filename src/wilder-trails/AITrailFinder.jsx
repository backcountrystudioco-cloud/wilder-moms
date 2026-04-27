import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useWilderTrails } from './WilderTrailsContext'
import { findTrailsWithAI, getRemainingQueries, incrementQueryCount } from './aiTrailFinderUtils'

// Sample prompts that work with their context
const samplePrompts = [
  "Water features for the kids",
  "Shady trail for everyone",
  "Something adventurous",
  "Easy walk with views"
]

export default function AITrailFinder() {
  const navigate = useNavigate()
  const { location, familyInfo, timeWindow } = useWilderTrails()
  
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [remainingQueries, setRemainingQueries] = useState(getRemainingQueries())
  const [hasAutoSearched, setHasAutoSearched] = useState(false)

  // Auto-search on mount if we have context
  useEffect(() => {
    if (!hasAutoSearched && remainingQueries > 0 && (location?.city || familyInfo)) {
      handleSearch(true) // true = auto search
      setHasAutoSearched(true)
    }
  }, [location, familyInfo])

  const handleSearch = async (isAuto = false) => {
    if (!isAuto && !query.trim()) return
    
    if (remainingQueries <= 0) {
      setError("You've used all your free searches. Check back soon!")
      return
    }

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const data = await findTrailsWithAI(isAuto ? '' : query, {
        location,
        familyInfo,
        timeWindow
      })
      setResults(data.recommendations)
      setRemainingQueries(data.remainingQueries)
      incrementQueryCount()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrailSelect = (trail) => {
    navigate(`/wilder-trails/${trail.id}`)
  }

  const handleSampleClick = (sample) => {
    setQuery(sample)
    handleSearch()
  }

  // Build context summary for display
  const getContextSummary = () => {
    const parts = []
    if (location?.city) parts.push(`Near ${location.city}`)
    if (familyInfo) {
      if (familyInfo.youngestAge === -1) parts.push('Baby in carrier')
      else if (familyInfo.youngestAge <= 2) parts.push('Toddler')
      else if (familyInfo.youngestAge <= 5) parts.push('Young kids')
      else parts.push('Older kids')
      if (familyInfo.needsStroller) parts.push('Need stroller')
      if (familyInfo.needsDog) parts.push('Bringing dog')
    }
    if (timeWindow) parts.push(`${timeWindow} min max`)
    return parts.length > 0 ? parts.join(' · ') : null
  }

  const contextSummary = getContextSummary()

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-widest mb-3">AI Trail Finder</p>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">
            {contextSummary ? 'What kind of adventure?' : 'Find your perfect trail'}
          </h1>
          
          {/* User Context */}
          {contextSummary && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-olive/10 text-forest rounded-full text-sm mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {contextSummary}
            </div>
          )}
          
          <p className="text-inkl max-w-lg mx-auto">
            {contextSummary 
              ? "Tell me what you're in the mood for, or let me surprise you."
              : "Tell me what you're looking for and I'll find the perfect trail."}
          </p>
          
          {/* Query Counter */}
          {remainingQueries > 0 && (
            <p className="mt-4 text-sm text-inkl">
              <span className="text-ember font-medium">{remainingQueries}</span> free searches remaining
            </p>
          )}
        </motion.div>

        {/* Quick Action - Find for me button */}
        {contextSummary && !results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <button
              onClick={() => handleSearch(true)}
              disabled={isLoading}
              className="w-full py-6 px-8 bg-forest text-white rounded-2xl font-sans font-medium text-lg hover:bg-forest/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Finding perfect trails...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Find perfect trails for us
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Something with water where the kids can splash around"
              className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-inkll/20 bg-white text-ink placeholder:text-inkl/50 focus:border-ember focus:outline-none resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSearch()
                }
              }}
            />
            <button
              onClick={() => handleSearch()}
              disabled={isLoading || !query.trim()}
              className="absolute right-3 bottom-3 w-10 h-10 bg-ember text-white rounded-xl flex items-center justify-center hover:bg-terra transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* Sample Prompts */}
        {contextSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-xs text-inkl uppercase tracking-wider mb-3">Or try these</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => handleSampleClick(sample)}
                  className="px-4 py-2 bg-white rounded-full text-sm text-ink border border-inkll/20 hover:border-ember/50 transition-colors text-left"
                >
                  {sample}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-2xl text-ink">Here's what I found</h2>
              
              {results.map((rec, index) => (
                <motion.div
                  key={rec.trail.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-inkll/10 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTrailSelect(rec.trail)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          rec.trail.difficulty === 'easy' ? 'bg-olive/20 text-forest' :
                          rec.trail.difficulty === 'moderate' ? 'bg-gold/20 text-ink' :
                          'bg-ember/20 text-ember'
                        }`}>
                          {rec.trail.difficulty}
                        </span>
                        <span className="text-sm text-inkl">{rec.trail.distance} mi</span>
                      </div>
                      <h3 className="font-serif text-xl text-ink mb-2">{rec.trail.title}</h3>
                      <p className="text-sm text-inkl mb-3">{rec.trail.region}, {rec.trail.state}</p>
                      <p className="text-inkl leading-relaxed">{rec.explanation}</p>
                    </div>
                    <svg className="w-5 h-5 text-inkll flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        <AnimatePresence>
          {results && results.length === 0 && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-inkl mb-4">No trails found matching your request.</p>
              <Link
                to="/wilder-trails/trails"
                className="text-ember font-medium hover:underline"
              >
                Browse all trails →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip to Manual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-inkl mb-3">Prefer to browse yourself?</p>
          <Link
            to="/wilder-trails/trails"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full font-medium hover:bg-inkl transition-colors"
          >
            Browse All Trails
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
