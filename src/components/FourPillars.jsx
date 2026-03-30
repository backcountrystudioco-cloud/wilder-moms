import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'
import { packLists, ageGroups } from '../data/packLists'

const pillars = [
  {
    accent: 'bg-ember',
    numeral: 'I',
    label: 'THE VILLAGE',
    title: 'You\'re not alone on this trail',
    description:
      'Connect with a community that gets it — from muddy stroller battles to triumphant summit moments. Share stories, find trail friends, and discover that the best adventures are the ones you don\'t have to solo.',
    cta: { label: 'Join the Village', to: '/profile', icon: '👥' }
  },
  {
    accent: 'bg-olive',
    numeral: 'II',
    label: 'THE HABITAT',
    title: 'Find trails that fit your family',
    description:
      'Whether you\'ve got a newborn in a carrier or a toddler who refuses to walk, AI-powered trail matching considers elevation, terrain, stroller-friendliness, and crowd levels to surface walks that actually work for where you are right now.',
    cta: { label: 'Explore Trails', to: '/explore', icon: '🌿' }
  },
  {
    accent: 'bg-gold',
    numeral: 'III',
    label: 'THE BASE CAMP',
    title: 'Bring nature home',
    description:
      'When the trail isn\'t calling, bring the outdoors in. Seasonal nature crafts, pressing flowers from your last hike, sensory bins with natural materials, and curated activity kits delivered to your door — because the spirit of adventure doesn\'t need a backpack.',
    cta: { label: 'See Builds & Activities', to: '/builds', icon: '🏕️' }
  },
  {
    accent: 'bg-slate',
    numeral: 'IV',
    label: 'THE BLUEPRINT',
    title: 'Safety and preparation, finally simple',
    description:
      'Leave no trace meets peace of mind. AI-generated pack lists tailored to your family\'s needs, live location sharing for group hikes, real-time weather windows, and offline maps so you can explore with confidence — and focus on the moments that matter.',
    isBlueprint: true,
  }
]

const FourPillars = () => {
  const [ref, isVisible] = useScrollReveal()
  const [activeBlueprintTab, setActiveBlueprintTab] = useState('hiking')

  return (
    <section id="pillars" ref={ref} className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          custom={0}
        >
          <p className="text-inkll font-sans text-sm tracking-widest uppercase mb-4">
            WHAT WE BELIEVE
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-ember mb-6">
            Four pillars. One community.
          </h2>
          <p className="font-sans text-inkl text-lg max-w-2xl mx-auto">
            Trails, community, nature crafts, and safety — all in one place, for every kind of day.
          </p>
        </motion.div>

        {/* 4-column grid of cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          custom={1}
        >
          {pillars.map((pillar, index) => (
            <div
              key={pillar.label}
              className="bg-white p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* 3px top accent bar */}
              <div className={`h-[3px] ${pillar.accent} mb-6`} />

              {/* Large roman numeral */}
              <p className="font-serif text-6xl text-ink/10 mb-2">
                {pillar.numeral}
              </p>

              {/* Label */}
              <p className="font-sans text-sm tracking-widest text-inkl mb-3">
                {pillar.label}
              </p>

              {/* Title */}
              <h3 className="font-serif text-xl text-ink mb-4">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-inkl text-sm leading-relaxed flex-grow mb-4">
                {pillar.description}
              </p>

              {/* Blueprint Section */}
              {pillar.isBlueprint ? (
                <div className="space-y-3">
                  {/* Tabs */}
                  <div className="flex gap-1 bg-blush/50 rounded-full p-1">
                    <button
                      onClick={() => setActiveBlueprintTab('hiking')}
                      className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition-colors ${
                        activeBlueprintTab === 'hiking'
                          ? 'bg-ember text-white'
                          : 'text-ink hover:text-ember'
                      }`}
                    >
                      🥾 Hiking
                    </button>
                    <button
                      onClick={() => setActiveBlueprintTab('camping')}
                      className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition-colors ${
                        activeBlueprintTab === 'camping'
                          ? 'bg-ember text-white'
                          : 'text-ink hover:text-ember'
                      }`}
                    >
                      ⛺ Camping
                    </button>
                  </div>

                  {/* Age Groups */}
                  <div className="space-y-2">
                    {(activeBlueprintTab === 'hiking' ? packLists.hiking : packLists.camping).map((group, i) => (
                      <div key={i} className="bg-cream/50 rounded-lg p-2">
                        <p className="font-sans text-xs font-medium text-ember mb-1">{group.ageGroup}</p>
                        <p className="font-sans text-[10px] text-inkl line-clamp-2">{group.items.slice(0, 3).join(' • ')}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={pillar.cta.to}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-sans text-sm font-medium text-white transition-colors ${pillar.accent} hover:opacity-90`}
                >
                  <span>{pillar.cta.icon}</span>
                  {pillar.cta.label}
                </Link>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FourPillars
