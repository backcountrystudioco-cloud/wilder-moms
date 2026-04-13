import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { builds, buildCategories, getBuildsByCategory } from './builds'
import BuildCard from './BuildCard'
import WilderCampArchitect from './WilderCampArchitect'
import WildRoom from './WildRoom'
import { fadeUpVariants } from '../hooks/useScrollReveal'

export default function BuildsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedSection, setExpandedSection] = useState('free')

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

        {/* Three Section Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={1}
          className="grid md:grid-cols-3 gap-4 mb-10"
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
        </motion.div>

        {/* Free Builds Section */}
        {expandedSection === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
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
      </div>
    </div>
  )
}
