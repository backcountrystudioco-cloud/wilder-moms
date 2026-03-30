import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { builds, buildCategories, getBuildsByCategory } from '../data/builds'
import BuildCard from '../components/BuildCard'
import { fadeUpVariants } from '../hooks/useScrollReveal'

export default function BuildsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

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

        {/* Results Count */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={2}
          className="text-inkll text-sm mb-6"
        >
          Showing {filteredBuilds.length} {filteredBuilds.length === 1 ? 'build' : 'builds'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </motion.p>

        {/* Builds Grid */}
        {filteredBuilds.length > 0 ? (
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
        )}

        {/* Bottom CTA */}
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
      </div>
    </div>
  )
}
