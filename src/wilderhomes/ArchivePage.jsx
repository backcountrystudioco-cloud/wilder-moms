import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const traditionalGuides = [
  {
    id: 'cob-kids',
    title: 'Cob for Kids',
    description: 'Earth building made accessible. Shape cob benches, mushroom seats, sculptural forms that children can climb on — using clay, sand, and straw from your own yard.',
    pages: '45 pages',
    time: '3 hrs',
    popular: true,
    price: '$29'
  },
  {
    id: 'timber-framing',
    title: 'Timber Framing Basics',
    description: 'Build a playhouse, reading nook, or sturdy raised bed using traditional timber joinery. No nails, no power tools required — just logs, patience, and kid-sized hands.',
    pages: '32 pages',
    time: '4 hrs',
    popular: false,
    price: '$39'
  },
  {
    id: 'stone-stacking',
    title: 'Stone Stacking',
    description: 'The art of the rock wall, the garden bed, and the fairy house foundation. Learn to read stone, build stable structures, and create something that outlasts you.',
    pages: '28 pages',
    time: '2 hrs',
    popular: false,
    price: '$29'
  }
]

const ecoModernGuides = [
  {
    id: 'mycelium-blocks',
    title: 'Mycelium Building Blocks',
    description: 'Grow your own building materials. Learn to inoculate, shape, and cure mycelium composites for play structures, garden beds, and insulation. The future of building is alive.',
    pages: '38 pages',
    time: '4 hrs',
    popular: true,
    price: '$49',
    badge: 'New',
    badgeColor: 'bg-olive'
  },
  {
    id: 'living-willow',
    title: 'Living Willow Structures',
    description: 'Plant a structure that grows. Weave willow into domes, tunnels, and forts that leaf out in spring and provide habitat. A build that gets better with age.',
    pages: '35 pages',
    time: '3 hrs',
    popular: false,
    price: '$35'
  },
  {
    id: 'hempcrete-basics',
    title: 'Hempcrete for Families',
    description: 'Mix hemp fibers with lime to create breathable, insulating building blocks. Perfect for sensory walls, play nooks, and garden structures. Non-toxic and carbon-negative.',
    pages: '42 pages',
    time: '3 hrs',
    popular: false,
    price: '$39',
    comingSoon: true
  }
]

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState('eco-modern')
  
  const currentGuides = activeCategory === 'traditional' ? traditionalGuides : ecoModernGuides

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/wilder-homes" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
          ← Back to Wilder Homes
        </Link>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 md:p-12 bg-gradient-to-br from-[#1A1A2E] via-[#2D3A4A] to-[#3D5A80] rounded-3xl text-center relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-olive/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-white/80 text-xs font-medium uppercase tracking-wider">The Wilder Lab</span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl text-white italic mb-4 leading-tight">
              Where living materials meet<br />family builds.
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
              Ancient techniques meet futuristic materials. From cob to mycelium, 
              these guides show you how to build with the earth — not against it.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-xs">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-olive" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9 rating from 200+ families</span>
              </div>
              <div className="w-px h-4 bg-white/30" />
              <div>Instant PDF download</div>
              <div className="w-px h-4 bg-white/30" />
              <div>Lifetime access</div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-2 p-1 bg-white rounded-full inline-flex mx-auto">
            <button
              onClick={() => setActiveCategory('eco-modern')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'eco-modern'
                  ? 'bg-olive text-white shadow-md'
                  : 'text-ink hover:bg-cream'
              }`}
            >
              Eco-Modern
            </button>
            <button
              onClick={() => setActiveCategory('traditional')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'traditional'
                  ? 'bg-ember text-white shadow-md'
                  : 'text-ink hover:bg-cream'
              }`}
            >
              Traditional
            </button>
          </div>
          
          <p className="text-center text-inkl text-sm mt-4">
            {activeCategory === 'eco-modern' 
              ? 'Living materials that grow, breathe, and return to the earth'
              : 'Time-tested techniques adapted for modern family gardens'}
          </p>
        </motion.div>

        {/* Guide Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {currentGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-inkll/10 group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#5A6428] via-[#3D5A80] to-[#1A1A2E] flex items-center justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                
                {/* Guide icon */}
                <div className="relative z-10">
                  {guide.id === 'mycelium-blocks' && (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span className="text-white/60 text-xs uppercase tracking-wider">Living Material</span>
                    </div>
                  )}
                  {guide.id === 'living-willow' && (
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  )}
                  {guide.id === 'hempcrete-basics' && (
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  {guide.id === 'cob-kids' && (
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  )}
                  {guide.id === 'timber-framing' && (
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                  )}
                  {guide.id === 'stone-stacking' && (
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Badges */}
                {guide.popular && (
                  <div className="absolute top-3 right-3 bg-ember text-white text-xs font-medium px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                {guide.badge && (
                  <div className={`absolute top-3 left-3 ${guide.badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    {guide.badge}
                  </div>
                )}
                {guide.comingSoon && (
                  <div className="absolute top-3 left-3 bg-ink text-white text-xs font-medium px-2 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-ink/10 text-ink text-xs font-medium rounded-full">
                    {activeCategory === 'eco-modern' ? 'Living Materials' : 'Traditional Craft'}
                  </span>
                  <span className="text-inkll text-xs">{guide.pages} · {guide.time}</span>
                </div>
                <h3 className="font-serif text-xl text-ink mb-2">{guide.title}</h3>
                <p className="text-inkl text-sm leading-relaxed mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-ember">{guide.price}</span>
                  {guide.comingSoon ? (
                    <button disabled className="px-4 py-2 bg-inkll/20 text-inkll text-sm font-medium rounded-full cursor-not-allowed">
                      Coming Soon
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-ember text-white text-sm font-medium rounded-full hover:bg-terra transition-colors">
                      Get Guide
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl p-8 border border-inkll/10 text-center"
        >
          <h3 className="font-serif text-2xl text-ink mb-2">Get the Full Lab Access</h3>
          <p className="text-inkl mb-6">All current guides + every guide we release, forever.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="font-serif text-3xl text-ember">$199</span>
            <button className="px-8 py-3 bg-ember text-white font-medium rounded-full hover:bg-terra transition-colors">
              Unlock All Guides
            </button>
          </div>
          <p className="text-inkll text-xs mt-4">One-time payment · Lifetime access · All future guides included</p>
        </motion.div>
      </div>
    </div>
  )
}
