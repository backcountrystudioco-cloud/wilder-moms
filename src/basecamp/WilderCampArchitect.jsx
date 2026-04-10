import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'

const premiumBuilds = [
  {
    id: 'wilder-nook',
    title: 'The Wilder Nook',
    subtitle: 'A pocket-sized refuge for quiet moments',
    category: 'Hideaway',
    difficulty: 'Medium',
    timeEstimate: '1 Weekend',
    priceRange: '$45-85',
    ageRange: '3-9',
    badge: 'Bestseller',
    color: 'bg-terra',
    description: 'A child-scale architectural shelter that feels like stepping into another world. The Wilder Nook combines the warmth of a treehouse with the enclosure of a fort — a private domain where little ones can read, rest, or let their imagination run wild.',
    designPhilosophy: '"Children need spaces that feel discovered, not constructed. The Wilder Nook uses simple geometry to create a sense of enclosure that kids find deeply comforting — a pattern I\'ve returned to in every residential project I\'ve designed for families."',
    architectNote: 'The angled roof isn\'t just aesthetic — it creates a visual hierarchy that makes kids feel the space is "under" something, not just "in" something. The opening faces north to avoid direct sun glare during afternoon play.',
    features: [
      'Kid-sized entrance that feels like a secret passage',
      'Angled roof for visual drama and rain runoff',
      'Interior shelf for books and treasures',
      'Scalable in 3 sizes: Pocket (2\'x2\'), Standard (3\'x4\'), Grand (4\'x6\')',
      'Optional: LED strip lighting for evening use',
      'Fully compostable materials'
    ],
    scales: [
      { name: 'Pocket', dimensions: '2\' x 2\' x 3\'h', materials: '4 - 2x4x8, 2 - 2x6x6, 1 sheet plywood', estimatedCost: '$45-55', bestFor: 'Balconies, small patios' },
      { name: 'Standard', dimensions: '3\' x 4\' x 4\'h', materials: '6 - 2x4x8, 4 - 2x6x8, 2 sheets plywood', estimatedCost: '$65-75', bestFor: 'Average backyards' },
      { name: 'Grand', dimensions: '4\' x 6\' x 5\'h', materials: '8 - 2x4x8, 6 - 2x6x10, 3 sheets plywood', estimatedCost: '$80-95', bestFor: 'Large yards, multiple children' }
    ],
    includes: [
      '12-page architectural blueprint PDF (plan, elevation, section views)',
      'Complete material cut list with lumber yard optimization',
      'Step-by-step illustrated assembly guide',
      'Scaling worksheet for all 3 sizes',
      'Structural connection details',
      'Site placement guide',
      'Builder\'s tip sheet from parents who\'ve built it'
    ],
    previewImages: [
      { type: 'blueprint', label: 'Floor Plan' },
      { type: 'render', label: '3D Render' },
      { type: 'elevation', label: 'Side Elevation' }
    ]
  },
  {
    id: 'the-gathering',
    title: 'The Gathering',
    subtitle: 'A circular seating structure for shared meals and stories',
    category: 'Community',
    difficulty: 'Medium',
    timeEstimate: '2 Weekends',
    priceRange: '$75-120',
    ageRange: '2-12',
    badge: 'New',
    color: 'bg-forest',
    description: 'An octagonal outdoor classroom and gathering space where children sit in a circle — equal, seen, and part of something. The Gathering transforms from a morning yoga spot to an afternoon craft station to an evening story circle.',
    designPhilosophy: '"I designed The Gathering after watching how children naturally arrange themselves in circles during play. By making the geometry explicit and beautiful, we validate that impulse. The low walls create enclosure without isolation."',
    architectNote: 'The octagonal form is structural efficient (rigid geometry) while feeling softer than a square. Eight sides mean no "head of the table" positioning — true equality. The bench height is calculated for cross-leg sitting.',
    features: [
      'Octagonal design with 8 sitting positions',
      'Low horizontal framing — feels open but defined',
      'Integrated bench seating at child height (10")',
      'Central firepit location (compatible with Bioethanol insert)',
      'Scalable: Family (8-seat) or Village (16-seat)',
      'Bent willow roof option for living structure'
    ],
    scales: [
      { name: 'Family', dimensions: '6\' diameter, 4\'h', materials: '8 - 4x4 posts, 16 - 2x6x6, woven willow panels', estimatedCost: '$75-90', bestFor: '1-3 children, small families' },
      { name: 'Village', dimensions: '10\' diameter, 5\'h', materials: '16 - 4x4 posts, 24 - 2x6x8, woven willow panels', estimatedCost: '$110-130', bestFor: '3+ children, playgroups' }
    ],
    includes: [
      '16-page architectural blueprint PDF',
      'Engineering specs for willow bending',
      'Bench construction details',
      'Central feature mounting instructions',
      'Site prep and drainage guide',
      'Community build guide for involving others'
    ],
    previewImages: [
      { type: 'plan', label: 'Plan View' },
      { type: 'section', label: 'Cross Section' },
      { type: 'detail', label: 'Connection Detail' }
    ]
  },
  {
    id: 'signal-tower',
    title: 'Signal Tower',
    subtitle: 'A communication structure with mirrors, flags, and stories',
    category: 'Exploration',
    difficulty: 'Easy',
    timeEstimate: '1 Day',
    priceRange: '$35-55',
    ageRange: '4-12',
    badge: null,
    color: 'bg-ink',
    description: 'Two heights, a ladder, a mirror, and a flag line. The Signal Tower turns kids into explorers and storytellers — sending messages across the yard, watching for deer, announcing the arrival of ice cream trucks.',
    designPhilosophy: '"Play structures should have purpose beyond climbing. The Signal Tower solves the eternal kid-question: "what do I do up here?" With tools for communication, the height becomes meaningful."',
    architectNote: 'The ship\'s ladder rungs are spaced at 8" on-center — the optimal climbing rhythm for children ages 4-12. The rotating flag arm uses a simple lazy susan bearing available at any hardware store.',
    features: [
      'Ship\'s ladder access (8" rung spacing)',
      'Rotating signal arm with mirror and flag mounts',
      'Lower platform at 3\' for younger children',
      'Upper platform at 6\' for dramatic views',
      'Flag line extending to ground level',
      'Signal flag template included'
    ],
    scales: [
      { name: 'Signal', dimensions: '3\' x 3\' footprint, 6\' total height', materials: '4 - 4x4x8 posts, 2 - 2x10x6 platform, ladder kit', estimatedCost: '$35-45', bestFor: 'Visual boundaries, yard navigation' },
      { name: 'Grand Signal', dimensions: '4\' x 4\' footprint, 8\' total height', materials: '6 - 4x4x10 posts, 3 - 2x10x8 platforms, ladder kit', estimatedCost: '$50-65', bestFor: 'Multiple viewing levels' }
    ],
    includes: [
      '8-page architectural blueprint PDF',
      'Ladder rung spacing chart',
      'Lazy susan bearing installation',
      'Flag template (SVG download)',
      'Mirror mounting detail',
      'Signal flag alphabet guide'
    ],
    previewImages: [
      { type: 'elevation', label: 'Elevation' },
      { type: 'detail', label: 'Signal Arm Detail' },
      { type: 'section', label: 'Platform Section' }
    ]
  }
]

const blueprintStyles = {
  line: 'stroke-ember stroke-2',
  dimension: 'stroke-ink stroke-1',
  fill: 'fill-cream opacity-30',
  text: 'fill-ink text-[8px] font-mono'
}

export default function WilderCampArchitect() {
  const [expandedBuild, setExpandedBuild] = useState(null)

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            {/* Architectural grid pattern */}
            {[...Array(20)].map((_, i) => (
              <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="400" className="stroke-white" strokeWidth="0.5" />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} className="stroke-white" strokeWidth="0.5" />
            ))}
            {/* Decorative building sketch */}
            <g transform="translate(400, 50)">
              <rect x="0" y="100" width="400" height="200" className="stroke-white stroke-1 fill-none" />
              <line x1="0" y1="100" x2="200" y2="0" className="stroke-white stroke-1" />
              <line x1="400" y1="100" x2="200" y2="0" className="stroke-white stroke-1" />
              <rect x="150" y="180" width="100" height="120" className="stroke-white stroke-1 fill-none" />
              <line x1="200" y1="180" x2="200" y2="300" className="stroke-white stroke-1" />
            </g>
          </svg>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-ember text-xs font-medium uppercase tracking-widest mb-4"
          >
            Wilder Camp Architect
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white italic leading-tight mb-6"
          >
            Build something they'll remember forever.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-lg mb-8"
          >
            Architectural blueprints and build plans designed by a real architect.
            Not sketches — real drawings with dimensions, details, and the care
            you'd expect from a professional commission.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-white/60"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Architectural PDF blueprints
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              3 size options per design
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Optimized material cut lists
            </span>
          </motion.div>
        </div>
      </section>

      {/* Blueprint Preview Teaser */}
      <section className="py-16 bg-parchment">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-medium uppercase tracking-widest text-ember mb-4">Sample Blueprint</p>
              <h3 className="font-serif text-3xl text-ink italic mb-4">The Wilder Nook — Floor Plan</h3>
              <p className="text-inkl mb-6">
                Every plan includes precise dimensions, material callouts, and clear notation.
                Designed to be read by first-time builders — no jargon, no assumptions.
              </p>
              <div className="bg-cream rounded-xl p-6 border border-ink/10">
                <svg viewBox="0 0 400 300" className="w-full">
                  {/* Floor plan outline */}
                  <rect x="50" y="80" width="300" height="180" className="stroke-ink stroke-2 fill-cream" />
                  
                  {/* Dimension lines */}
                  <line x1="50" y1="280" x2="350" y2="280" className="stroke-ink stroke-1" />
                  <line x1="50" y1="275" x2="50" y2="285" className="stroke-ink stroke-1" />
                  <line x1="350" y1="275" x2="350" y2="285" className="stroke-ink stroke-1" />
                  <text x="200" y="295" className="fill-ink text-[10px] font-mono text-center">4'-0" (SCALE 1/4" = 1')</text>
                  
                  {/* Left dimension */}
                  <line x1="30" y1="80" x2="30" y2="260" className="stroke-ink stroke-1" />
                  <line x1="25" y1="80" x2="35" y2="80" className="stroke-ink stroke-1" />
                  <line x1="25" y1="260" x2="35" y2="260" className="stroke-ink stroke-1" />
                  <text x="20" y="175" className="fill-ink text-[10px] font-mono" transform="rotate(-90, 20, 175)">3'-0"</text>
                  
                  {/* Roof indication */}
                  <path d="M 45 75 L 200 20 L 355 75" className="stroke-ink stroke-2 fill-cream" />
                  <line x1="200" y1="20" x2="200" y2="80" className="stroke-ink stroke-1 stroke-dasharray" />
                  
                  {/* Door opening */}
                  <line x1="150" y1="260" x2="250" y2="260" className="stroke-ink stroke-3" />
                  <line x1="150" y1="260" x2="150" y2="240" className="stroke-ink stroke-1" />
                  <line x1="250" y1="260" x2="250" y2="240" className="stroke-ink stroke-1" />
                  <path d="M 150 260 Q 200 240 250 260" className="stroke-ink stroke-1 fill-none" />
                  <text x="200" y="255" className="fill-ink text-[8px] font-mono text-center">DOOR OPENING</text>
                  
                  {/* Interior shelf */}
                  <line x1="50" y1="150" x2="100" y2="150" className="stroke-ink stroke-2" />
                  <text x="75" y="140" className="fill-ink text-[8px] font-mono text-center">SHELF</text>
                  
                  {/* Notes */}
                  <text x="50" y="65" className="fill-ink text-[8px] font-mono">NOTES:</text>
                  <text x="50" y="75" className="fill-ink text-[7px] font-mono">- ALL DIMENSIONS ARE FRAMING</text>
                  <text x="50" y="83" className="fill-ink text-[7px] font-mono">- RAFTERS @ 16" O.C.</text>
                  <text x="50" y="91" className="fill-ink text-[7px] font-mono">- PLYWOOD FLOOR 1/2" CDX</text>
                  
                  {/* Title */}
                  <text x="350" y="295" className="fill-ember text-[9px] font-mono text-right">WILDER NOOK - PLAN</text>
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-ink mb-1">Professional-Quality Drawings</h4>
                    <p className="text-inkl text-sm">Plan, elevation, and section views with standard architectural notation. The kind of drawings you'd pay an architect $150/hr to produce.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M12 9v6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-ink mb-1">Waste-Minimized Materials</h4>
                    <p className="text-inkl text-sm">Every cut list is optimized for standard lumber lengths. You'll buy what you need — nothing wasted, nothing shortage.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-ink mb-1">The Designer's Note</h4>
                    <p className="text-inkl text-sm">Each plan includes personal notes on why the design works — the child development thinking, the spatial decisions, the little details that make it special.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-ink mb-1">Three Size Options</h4>
                    <p className="text-inkl text-sm">Every design scales to fit your space and budget. Pocket, Standard, and Grand sizes with adjusted materials and dimensions.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Builds Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-ember mb-3">The Collection</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink italic">
              Available as Premium Plans
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumBuilds.map((build, index) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-ink/5"
              >
                {/* Blueprint Preview Header */}
                <div className={`${build.color} h-40 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      <rect x="20" y="30" width="160" height="60" className="stroke-white stroke-1 fill-none" />
                      <line x1="20" y1="30" x2="100" y2="10" className="stroke-white stroke-1" />
                      <line x1="180" y1="30" x2="100" y2="10" className="stroke-white stroke-1" />
                      <rect x="80" y="50" width="40" height="40" className="stroke-white stroke-1 fill-none" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    {build.badge && (
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-2">
                        {build.badge}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl text-white italic">{build.title}</h3>
                    <p className="text-white/70 text-sm">{build.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs">
                    <span className="px-2 py-1 bg-cream rounded text-ink">{build.difficulty}</span>
                    <span className="px-2 py-1 bg-cream rounded text-ink">{build.timeEstimate}</span>
                    <span className="px-2 py-1 bg-cream rounded text-ink">Ages {build.ageRange}</span>
                  </div>

                  <p className="text-inkl text-sm mb-4 line-clamp-3">
                    {build.description}
                  </p>

                  {/* Scale Options */}
                  <div className="mb-6">
                    <p className="text-xs font-medium text-ink mb-2">Available Sizes:</p>
                    <div className="flex flex-wrap gap-2">
                      {build.scales.map((scale) => (
                        <span key={scale.name} className="px-2 py-1 bg-parchment text-ink text-xs rounded">
                          {scale.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-ink/10">
                    <div>
                      <p className="text-xs text-inkl">Plan Package</p>
                      <p className="font-serif text-xl text-ember">{build.priceRange}</p>
                    </div>
                    <button
                      onClick={() => setExpandedBuild(expandedBuild === build.id ? null : build.id)}
                      className="px-4 py-2 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/80 transition-colors"
                    >
                      {expandedBuild === build.id ? 'Less Details' : 'View Details'}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedBuild === build.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-ink/10 space-y-6"
                    >
                      {/* What's Included */}
                      <div>
                        <h4 className="font-medium text-ink text-sm mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {build.includes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-inkl text-sm">
                              <svg className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Design Philosophy */}
                      <div className="bg-parchment rounded-xl p-4">
                        <p className="text-xs font-medium text-ember mb-2">Designer's Note</p>
                        <p className="text-inkl text-sm italic">"{build.designPhilosophy}"</p>
                      </div>

                      {/* Size Breakdown */}
                      <div>
                        <h4 className="font-medium text-ink text-sm mb-3">Size Options:</h4>
                        <div className="space-y-3">
                          {build.scales.map((scale) => (
                            <div key={scale.name} className="bg-cream rounded-lg p-3">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-ink text-sm">{scale.name}</span>
                                <span className="text-ember text-sm font-medium">{scale.estimatedCost}</span>
                              </div>
                              <p className="text-inkl text-xs mb-1">{scale.dimensions}</p>
                              <p className="text-inkl text-xs">{scale.bestFor}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Purchase Button */}
                      <button className="w-full py-3 bg-ember text-white font-medium rounded-full hover:bg-terra transition-colors">
                        Get the Blueprint — {build.priceRange}
                      </button>

                      <p className="text-center text-inkl text-xs">
                        Instant PDF download. Satisfaction guaranteed.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ink">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="font-serif text-3xl text-white italic mb-4">
            Want a custom design for your backyard?
          </h3>
          <p className="text-white/70 mb-8">
            The Wilder Camp Architect offers consultation services for families who want
            a truly bespoke play structure — designed for your specific yard, children, and dreams.
          </p>
          <button className="px-8 py-3 bg-ember text-white font-medium text-lg rounded-full hover:bg-terra transition-colors">
            Schedule a Consultation
          </button>
          <p className="text-white/40 text-sm mt-4">
            Consultation includes 3D renderings and preliminary plans.
          </p>
        </div>
      </section>
    </div>
  )
}
