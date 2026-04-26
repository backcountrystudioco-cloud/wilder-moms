import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const blueprints = [
  {
    id: 'sensory-table',
    title: 'Sensory Play Table',
    type: 'Indoor',
    description: 'A built-in sensory table for your living room or playroom. Sand, water, rice, or beans — the removable tray makes cleanup easy. Perfect for rainy days when the outdoors calls but won\'t answer.',
    dimensions: '3ft x 2ft x 2ft',
    difficulty: 'Intermediate',
    price: '$19'
  },
  {
    id: 'nook-retreat',
    title: 'Nature Nook Retreat',
    type: 'Indoor/Outdoor',
    description: 'Build a cozy reading nook using reclaimed wood, soft lighting, and natural materials. A place your kids will actually want to go when the chaos gets too much. Indoor or covered porch installation.',
    dimensions: '4ft x 4ft x 6ft',
    difficulty: 'Advanced',
    price: '$29'
  },
  {
    id: 'mud-kitchen',
    title: 'Outdoor Mud Kitchen',
    type: 'Outdoor',
    description: 'The ultimate outdoor cooking station for little chefs. Counter height perfect for ages 3-9, with a working basin, prep space, and storage for real cookware. Built to last through seasons of mud pies.',
    dimensions: '4ft x 2ft x 3ft',
    difficulty: 'Beginner',
    price: '$24'
  },
  {
    id: 'tree-platform',
    title: 'Tree Platform',
    type: 'Outdoor',
    description: 'A safe, sturdy platform for treehouses. Includes load calculations, hardware specs, and step-by-step instructions. The design adapts to most standard trees — no engineering degree required.',
    dimensions: '8ft x 8ft platform',
    difficulty: 'Advanced',
    price: '$39'
  },
  {
    id: 'nature-shelf',
    title: 'Display Nature Shelf',
    type: 'Indoor',
    description: 'A wall-mounted display system for treasures from your adventures. Acorns, feathers, pressed flowers, rocks — rotate the collections as the seasons change. Makes nature feel like art.',
    dimensions: '4ft wide x 3ft tall',
    difficulty: 'Beginner',
    price: '$14'
  },
  {
    id: 'climbing-wall',
    title: 'Indoor Climbing Wall',
    type: 'Indoor',
    description: 'Turn a wall into a climbing challenge. Designed for small spaces — works in a bedroom corner or basement. Holds up to 100lbs, with handholds that grow with your kids\' skills.',
    dimensions: '6ft x 8ft',
    difficulty: 'Intermediate',
    price: '$29'
  }
]

export default function ArchitectPage() {
  const [filter, setFilter] = useState('All')
  const [submitted, setSubmitted] = useState(false)

  const filteredBlueprints = filter === 'All' 
    ? blueprints 
    : blueprints.filter(b => b.type === filter)

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/wilder-homes/environment" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
          ← Back to Environment
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 md:p-12 bg-gradient-to-br from-[#1A1A2E] via-[#2D3A4A] to-[#3D5A80] rounded-3xl text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-3">
              The Wilder Architect
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-white italic mb-4 leading-tight">
              Come up with a plan first.
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Before you swing the hammer, we help you think it through. Detailed plans for indoor sensory spaces, outdoor builds, and everything in between — designed for real families with real spaces.
            </p>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {['All', 'Indoor', 'Outdoor'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-ink text-white'
                  : 'bg-white text-inkl border border-inkll/20 hover:border-ember/50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Blueprints Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredBlueprints.map((blueprint, index) => (
            <motion.div
              key={blueprint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-inkll/10 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    blueprint.type === 'Indoor' 
                      ? 'bg-olive/10 text-olive' 
                      : blueprint.type === 'Outdoor'
                        ? 'bg-ember/10 text-ember'
                        : 'bg-gold/10 text-gold'
                  }`}>
                    {blueprint.type}
                  </span>
                  <span className="font-serif text-2xl text-ember">{blueprint.price}</span>
                </div>
                
                <h3 className="font-serif text-xl text-ink mb-2">{blueprint.title}</h3>
                <p className="text-inkl text-sm leading-relaxed mb-4">
                  {blueprint.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-inkll mb-4">
                  <span>{blueprint.dimensions}</span>
                  <span>·</span>
                  <span>{blueprint.difficulty}</span>
                </div>
                
                <button className="w-full py-3 bg-ember text-white text-sm font-medium rounded-full hover:bg-terra transition-colors">
                  Download Blueprint
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 border border-inkll/10 text-center"
        >
          {!submitted ? (
            <>
              <h2 className="font-serif text-2xl text-ink mb-4">Need a custom plan?</h2>
              <p className="text-inkl max-w-md mx-auto mb-6">
                Tell us what you're building. We'll help you plan it out — dimensions that fit your space, materials that fit your budget, and steps that fit your schedule.
              </p>
              <button 
                onClick={() => setSubmitted(true)}
                className="px-6 py-3 bg-ember text-white font-sans font-medium rounded-full hover:bg-terra transition-colors"
              >
                Get a custom plan
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-olive/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-ink mb-4">We'll be in touch</h2>
              <p className="text-inkl mb-4">Share a bit more about your project and we'll follow up with ideas.</p>
              <Link 
                to="/wilder-homes"
                className="inline-flex items-center justify-center px-6 py-3 bg-olive text-white font-sans font-medium rounded-full hover:opacity-90 transition-colors"
              >
                Continue exploring Wilder Homes
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
