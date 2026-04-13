import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { builds, buildCategories, getBuildsByCategory } from './builds'
import BuildCard from './BuildCard'
import WilderCampArchitect from './WilderCampArchitect'
import WildRoom from './WildRoom'
import { fadeUpVariants } from '../hooks/useScrollReveal'

export default function BuildsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState('free') // 'free', 'wildroom', or 'premium'

  const filteredBuilds = useMemo(() => {
    return getBuildsByCategory(selectedCategory)
  }, [selectedCategory])

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

        {/* Category Filter Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={1}
          className="mb-8 overflow-x-auto"
        >
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
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={2}
          className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p className="text-inkll text-sm">
            {viewMode === 'free' && (
              <>Showing {filteredBuilds.length} free {filteredBuilds.length === 1 ? 'build' : 'builds'}{selectedCategory !== 'All' && ` in ${selectedCategory}`}</>
            )}
            {viewMode === 'wildroom' && (
              <>The Wild Room — design your outdoor space by room type</>
            )}
            {viewMode === 'premium' && (
              <>Premium architectural blueprints</>
            )}
          </p>
          <div className="flex gap-2 bg-parchment p-1 rounded-full flex-wrap">
            <button
              onClick={() => setViewMode('free')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'free'
                  ? 'bg-ember text-white'
                  : 'text-ink hover:text-ember'
              }`}
            >
              Free Builds
            </button>
            <button
              onClick={() => setViewMode('wildroom')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'wildroom'
                  ? 'bg-ember text-white'
                  : 'text-ink hover:text-ember'
              }`}
            >
              The Wild Room
            </button>
            <button
              onClick={() => setViewMode('premium')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                viewMode === 'premium'
                  ? 'bg-ember text-white'
                  : 'text-ink hover:text-ember'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Architect
            </button>
          </div>
        </motion.div>

        {/* Builds Grid or Wilder Camp Architect or Wild Room */}
        {viewMode === 'free' ? (
          filteredBuilds.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={3}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredBuilds.map((build, index) => (
                <BuildCard key={build.id} build={build} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={3}
              className="bg-blush rounded-2xl p-12 text-center"
            >
              <p className="font-serif text-2xl text-ink italic">
                No builds found in this category yet.
              </p>
              <p className="text-inkl mt-2">
                Check back soon or explore other categories.
              </p>
            </motion.div>
          )
        ) : viewMode === 'wildroom' ? (
          <WildRoom />
        ) : (
          <WilderCampArchitect />
        )}

        {/* Bottom CTA - only show in free mode */}
        {viewMode === 'free' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={4}
            className="mt-16 text-center bg-parchment rounded-2xl p-8 md:p-12"
          >
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
          </motion.div>
        )}
      </div>
    </div>
  )
}
