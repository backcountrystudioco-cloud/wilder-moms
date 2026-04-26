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

  const filteredBuilds = getBuildsByCategory(selectedCategory)
  const filteredCrafts = getCraftsByCategory(craftCategory)

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

        {/* Archive Upsell Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Link
            to="/wilder-homes/activities/archive"
            className="block bg-gradient-to-r from-[#5A3C00] via-[#8C4A14] to-[#D2961E] rounded-3xl p-8 text-center hover:opacity-95 transition-opacity group"
          >
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">
              Premium Downloads
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-white italic mb-3">
              Want to build something that lasts?
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mb-4">
              The Archive has detailed guides on cob, timber framing, and stone stacking — techniques your grandparents knew by heart.
            </p>
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#8C4A14] font-sans font-medium rounded-full group-hover:bg-cream transition-colors">
              Explore The Archive
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
