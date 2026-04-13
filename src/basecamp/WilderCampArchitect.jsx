import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'

const premiumBuilds = [
  {
    id: 'living-bean-teepee',
    title: 'The Living Bean Teepee',
    subtitle: 'A cathedral of climbing beans that transforms from sticks to sanctuary',
    category: 'Living Structures',
    difficulty: 'Easy',
    timeEstimate: '1 Weekend',
    priceRange: '$35-65',
    ageRange: '2-12',
    badge: 'Most Popular',
    color: 'bg-[#5A6428]',
    description: 'Six bamboo poles become a cathedral of scarlet runners and sweet peas. In six weeks, bare bones transform into a breathing green cave. At season\'s end, everything except your saved seeds returns to earth.',
    designPhilosophy: '"Children deserve spaces that respond to time and care. This structure teaches patience — the cave you plant is not the cave you play in. The transformation itself becomes the narrative: remember when it was just sticks?"',
    architectNote: 'The teepee form is ancient — used by Indigenous peoples across North America for thousands of years. We\'re borrowing a form that has cradled human gathering for millennia. The vertical geometry creates a sense of enclosure while the open top allows light and air to circulate.',
    features: [
      'Fully compostable — every material returns to earth',
      'No tools required — lashing only',
      'Transforms completely over 6 weeks',
      'Saves seeds for next year',
      'Works on balconies, patios, yards',
      'Harvest beans for eating'
    ],
    scales: [
      { name: 'Balcony', dimensions: '4 poles, 5\' height', materials: '4 bamboo poles, 20\' jute twine, heirloom seeds', estimatedCost: '$35-45', bestFor: 'Apartments, small patios' },
      { name: 'Standard', dimensions: '6 poles, 7\' height', materials: '6 bamboo poles, 30\' jute twine, heirloom seeds', estimatedCost: '$45-55', bestFor: 'Average backyards' },
      { name: 'Grand', dimensions: '8 poles, 8\' height', materials: '8 bamboo poles, 50\' jute twine, heirloom seeds, ground cover', estimatedCost: '$55-70', bestFor: 'Large yards, multiple children' }
    ],
    technique: {
      name: 'Living Architecture',
      description: 'Ancient form meets seasonal transformation. Borrowed from Indigenous gathering structures worldwide.'
    },
    includes: [
      '12-page architectural blueprint PDF (pole layout, lashing patterns, foundation)',
      'Complete material sourcing guide with specific product links',
      'Seed selection guide (scarlet runner vs. pole beans vs. morning glories)',
      'Week-by-week growth journal template',
      'Companion planting notes',
      'End-of-season seed saving instructions',
      'Variations: tunnel configuration, tunnel-and-teepee hybrid'
    ],
    previewImages: [
      { type: 'diagram', label: 'Pole Layout' },
      { type: 'growth', label: '6-Week Transformation' },
      { type: 'section', label: 'Cross Section' }
    ]
  },
  {
    id: 'wicker-cloud-nest',
    title: 'The Wicker Cloud Nest',
    subtitle: 'A suspended hammock-nest that borrows overhead space',
    category: 'Suspended Play',
    difficulty: 'Easy',
    timeEstimate: '1 Day',
    priceRange: '$80-150',
    ageRange: '3-12',
    badge: null,
    color: 'bg-[#8C4A14]',
    description: 'Why should children only play on floors? This structure borrows the most underused dimension in small spaces — the ceiling. A woven nest hangs from a bamboo beam, creating a contained-but-not-trapped cradle that swings gently.',
    designPhilosophy: '"The suspended position means no dirt contact, no damp ground. Children feel held while looking out. The nest cradle creates a feeling that plastic swings never achieve — organic, breathing, alive."',
    architectNote: 'Suspended structures have been built by humans for millennia — from Maya swing rituals to Korean jultagi performances. We\'re reclaiming vertical space that apartment dwellers never use. In Japan, engawa (veranda space) traditionally bridged indoor and outdoor — this nest does the same.',
    features: [
      'Uses zero floor space',
      'Quick-release for storage',
      'Bamboo frame disassembles flat',
      'Natural wicker breathes and conforms',
      'Weight tested to 200lbs',
      'Works on balconies, patios, indoors'
    ],
    scales: [
      { name: 'Nook', dimensions: '4\' beam, nest 24" diameter', materials: 'Bamboo pole, hemp rope, small wicker nest', estimatedCost: '$80-100', bestFor: 'Narrow balconies, reading nook' },
      { name: 'Standard', dimensions: '6\' beam, nest 30" diameter', materials: 'Bamboo pole, hemp rope, medium wicker nest', estimatedCost: '$110-130', bestFor: 'Patios, larger spaces' },
      { name: 'Grand', dimensions: '8\' beam, nest 36" diameter', materials: 'Reinforced beam, large nest, swing hardware', estimatedCost: '$140-160', bestFor: 'Large decks, family gatherings' }
    ],
    technique: {
      name: 'Suspended Living',
      description: 'Borrowed from Asian architectural traditions of engawa and cantilevered living.'
    },
    includes: [
      '8-page architectural blueprint PDF (beam mounting, rope rigging)',
      'Ceiling/beam mounting requirements',
      'Weight calculations and safety factors',
      'Rope selection guide (hemp vs. jute vs. manila)',
      'Nest sizing guide by child age',
      'Alternative: DIY woven nest from willow switches',
      'Seasonal storage instructions'
    ],
    previewImages: [
      { type: 'elevation', label: 'Side View' },
      { type: 'detail', label: 'Connection Detail' },
      { type: 'section', label: 'Rope Rigging' }
    ]
  },
  {
    id: 'cob-mud-oven',
    title: 'The Cob Mud Oven',
    subtitle: 'A wood-fired outdoor oven that parents use more than the kids',
    category: 'Earth Building',
    difficulty: 'Medium',
    timeEstimate: '2-3 Weekends',
    priceRange: '$75-120',
    ageRange: '2-12',
    badge: 'Family Favorite',
    color: 'bg-[#B43C1E]',
    description: 'Earth, straw, and sand become a functioning wood-fired oven. The same cob that insulates your home insulates this oven — it reaches 900°F in 45 minutes. Build it with your kids; use it for years.',
    designPhilosophy: '"Cob is humanity\'s oldest building material — used for 10,000 years across every continent. When you build this oven, you join a lineage of earth builders stretching back to the first fires in the first shelters."',
    architectNote: 'The thermal mass of cob is extraordinary — once heated, an earth oven stays warm for hours. In permaculture design, this is called "standing heat" — the structure itself stores energy. Your cob oven will outlive your children\'s childhood by centuries.',
    features: [
      'Fully compostable — returns to earth in 200+ years',
      'Reaches 900°F — real pizza in 90 seconds',
      'Lasts 200+ years with basic care',
      'Build with clay from your own yard',
      'Thermal mass holds heat 8+ hours',
      'No industrial materials'
    ],
    scales: [
      { name: 'Pocket', dimensions: '18" diameter, 12" height', materials: 'Found clay, straw, sand — often 100% free', estimatedCost: '$25-40', bestFor: 'Small spaces, first earth build' },
      { name: 'Standard', dimensions: '24" diameter, 18" height', materials: 'Bagged clay, straw, sand, fire bricks', estimatedCost: '$75-95', bestFor: 'Family kitchens, regular use' },
      { name: 'Grand', dimensions: '30" diameter, 24" height', materials: 'Full masonry kit, imported stone base, chimney', estimatedCost: '$110-150', bestFor: 'Outdoor kitchens, entertaining' }
    ],
    technique: {
      name: 'Cob Construction',
      description: 'Earth + straw + sand. No forms, no cement, no skills needed. Sculpt it like clay, let it dry.'
    },
    includes: [
      '20-page architectural blueprint PDF (full drawings, thermal calculations)',
      'Soil testing guide — find clay in your own yard',
      'Complete cob mixing ratios by soil type',
      'Foundation options (stone, brick, salvaged materials)',
      'Dome shaping without forms',
      'First firing protocol (critical for longevity)',
      'Seasonal maintenance and repair guide',
      'Pizza and bread recipes optimized for cob ovens'
    ],
    previewImages: [
      { type: 'section', label: 'Thermal Mass Section' },
      { type: 'diagram', label: 'Dome Form' },
      { type: 'detail', label: 'Foundation Detail' }
    ]
  },
  {
    id: 'willow-cubby',
    title: 'The Willow Cubby',
    subtitle: 'A living fence that grows into a play enclosure',
    category: 'Living Structures',
    difficulty: 'Easy',
    timeEstimate: '1 Day to Build, 1 Season to Grow',
    priceRange: '$25-45',
    ageRange: '3-12',
    badge: 'Eco Build',
    color: 'bg-[#96963C]',
    description: 'Fresh willow cuttings pushed into soil become a living fence. By midsummer, you have a dense, breathable green wall. In three years, a permanent structure. Prunings become next year\'s building material.',
    designPhilosophy: '"Traditional hurdle-making dates to Iron Age Britain. We\'re giving children the most ancient building method — push a stick in earth, watch it grow. The wall becomes more substantial with their attention."',
    architectNote: 'Willow roots in 4-6 weeks. The same properties that make willow easy to propagate make it a metaphor for abundance — cut one branch, grow ten. Children who build this learn that living materials multiply value rather than depreciate.',
    features: [
      '100% compostable — even the "waste" propagates',
      'Grows more substantial each year',
      'Annual pruning provides building material',
      'Free cuttings from arborists or neighbors',
      'Dense enough for privacy by year two',
      'Becomes wildlife habitat'
    ],
    scales: [
      { name: 'Corner', dimensions: '3x3\' section against wall', materials: '15 willow cuttings, twine, compost', estimatedCost: '$15-25', bestFor: 'Balconies, small corners' },
      { name: 'Standard', dimensions: '5x5\' free-standing cubby', materials: '30 willow cuttings, stakes, twine', estimatedCost: '$25-35', bestFor: 'Average yards' },
      { name: 'Village', dimensions: '8x8\' with 6\' entry arch', materials: '50+ cuttings, hazel frame, espalier wire', estimatedCost: '$40-55', bestFor: 'Large yards, multiple children' }
    ],
    technique: {
      name: 'Hurdle Making',
      description: 'Ancient Celtic and Anglo-Saxon technique. Used for 2,000+ years in Britain.'
    },
    includes: [
      '10-page architectural blueprint PDF (layout, weaving patterns)',
      'Cuttings sourcing guide (free from arborists)',
      'Timing guide — when to cut and plant',
      'Soil preparation for optimal rooting',
      'Weaving technique — even children can do this',
      'First-year care and establishment',
      'Pruning for structure — annual maintenance guide',
      'Rabbit-proofing and deer-proofing options'
    ],
    previewImages: [
      { type: 'plan', label: 'Layout Plan' },
      { type: 'growth', label: 'Seasonal Growth Stages' },
      { type: 'detail', label: 'Weave Detail' }
    ]
  },
  {
    id: 'hay-bale-playhouse',
    title: 'The Hay Bale Playhouse',
    subtitle: 'A room built from bales that become garden amendment',
    category: 'Ephemeral Structures',
    difficulty: 'Easy',
    timeEstimate: '2-3 Hours',
    priceRange: '$50-100',
    ageRange: '2-10',
    badge: null,
    color: 'bg-[#D2961E]',
    description: 'Stack hay bales like giant Legos — no tools, no skills, no hardware. When the season ends, till the bale house into the garden. The playhouse becomes soil that grows next year\'s vegetables.',
    designPhilosophy: '"The ephemerality is the point. A summer spent in the bale house becomes memory. The disintegration is not failure — it\'s completion of a lifecycle. Children learn that materials can have multiple lives."',
    architectNote: 'Hay bale construction has been used for emergency shelters, straw bale homes, and now children\'s play. The thermal mass of stacked bales insulates in summer heat. When you till them under in fall, you\'re returning carbon to soil — sequestering carbon while creating joy.',
    features: [
      'No tools required',
      'Build with your toddler',
      '100% composted by spring',
      'Sequesters carbon as garden soil',
      'Grows more substantial each season',
      'Free hay bales in rural areas'
    ],
    scales: [
      { name: 'Couch', dimensions: '2 bales against wall + cushion', materials: '2 hay bales, cushion, optional canopy', estimatedCost: '$15-25', bestFor: 'Balconies, quick setup' },
      { name: 'Standard', dimensions: '8 bales, 3-wall U-shape', materials: '8 hay bales, fabric roof option', estimatedCost: '$50-65', bestFor: 'Backyards, full playhouse' },
      { name: 'Village', dimensions: '16 bales, multiple rooms', materials: '16 bales, bamboo frame, grass mat roof', estimatedCost: '$85-110', bestFor: 'Large properties, community builds' }
    ],
    technique: {
      name: 'Stacked Bale',
      description: 'Borrowed from straw bale home construction. No forms, no cement — just stacking.'
    },
    includes: [
      '8-page architectural blueprint PDF (stacking patterns, openings)',
      'Bale sourcing guide — what type to use (straw vs. hay)',
      'Load calculations for bale stacking',
      'Window and door opening techniques',
      'Temporary roof options (bamboo + mats)',
      'End-of-season decomposition guide',
      'Garden planning based on bale amendment',
      'Year two: where to build for different sun angles'
    ],
    previewImages: [
      { type: 'plan', label: 'Floor Plan' },
      { type: 'elevation', label: 'Bale Configuration' },
      { type: 'section', label: 'Garden Integration' }
    ]
  },
  {
    id: 'cordwood-retreat',
    title: 'The Cordwood Garden Retreat',
    subtitle: 'Log ends and earth mortar create a sculptural reading nook',
    category: 'Earth Building',
    difficulty: 'Medium',
    timeEstimate: '2 Weekends',
    priceRange: '$90-150',
    ageRange: '4-12',
    badge: 'Architectural',
    color: 'bg-[#464F5F]',
    description: 'Round wood ends face outward in a cob mortar bed — the grain patterns of each log visible like a end-grain cutting board. Inside: a child-sized retreat for reading, hiding, being small.',
    designPhilosophy: '"Cordwood dates to 18th-century log cabin construction. We\'re using it for its visual texture and thermal mass — the log ends are beautiful, like a record of the tree\'s life. When this structure returns to earth, it leaves behind rich soil."',
    architectNote: 'The beauty of cordwood is in its imperfection — no two log ends are the same. Children love identifying tree species by their grain. The mortar gap creates natural insulation. By choosing locally harvested wood, you\'re capturing value from "waste" that would otherwise be chipped or burned.',
    features: [
      'Log "waste" becomes architectural feature',
      'Thermal mass keeps cool in summer',
      'Unique appearance — no two the same',
      'Can use downed trees from your property',
      '200+ year expected lifespan',
      'Sculptural focal point'
    ],
    scales: [
      { name: 'Nook', dimensions: '4\' diameter, 3\' height', materials: '30-40 log ends, 2 bags clay, sand', estimatedCost: '$40-60', bestFor: 'Small yards, reading corners' },
      { name: 'Standard', dimensions: '5\' diameter, 4\' height', materials: '60-80 log ends, 4 bags clay/sand mix', estimatedCost: '$90-120', bestFor: 'Full retreat, family use' },
      { name: 'Grand', dimensions: '6\' diameter, 5\' height with bench', materials: '100+ log ends, masonry bench, chimney', estimatedCost: '$140-180', bestFor: 'Outdoor classroom, gathering space' }
    ],
    technique: {
      name: 'Cordwood Masonry',
      description: 'Revived in 1970s by Rob Roy. Uses small-diameter wood — what was once waste.'
    },
    includes: [
      '16-page architectural blueprint PDF (full drawings, log selection)',
      'Log sourcing guide — what diameters work, where to get them',
      'Mortar mixing for cordwood (clay vs. lime)',
      'Log end preparation and sealing',
      'First course laying technique',
      'Structural corner posts for longevity',
      'Interior finish options',
      'Annual maintenance — resealing log ends'
    ],
    previewImages: [
      { type: 'section', label: 'Wall Section' },
      { type: 'detail', label: 'Log End Detail' },
      { type: 'elevation', label: 'Elevation' }
    ]
  },
  {
    id: 'living-root-bench',
    title: 'The Living Root Bench',
    subtitle: 'Willow branches fuse into furniture over two seasons',
    category: 'Living Structures',
    difficulty: 'Moderate',
    timeEstimate: '1 Day to Build, 18 Months to Use',
    priceRange: '$40-70',
    ageRange: '3-12',
    badge: 'Heirloom',
    color: 'bg-[#5A3C00]',
    description: 'Fresh willow branches woven around a form fuse together through a process called "approach grafting." In 18 months, the connections become permanent. The bench becomes a living piece of furniture.',
    designPhilosophy: '"What if children could build furniture that grows? This bench will be here when they\'re adults — it will outlive us all. The patience required is the lesson: some of the best things cannot be rushed."',
    architectNote: 'Approach grafting (inarching) has been used in orchard management for centuries. By binding young shoots together, their cambium layers fuse. The result is a monocoque structure — strong because it\'s continuous. Living wood is stronger than dried wood.',
    features: [
      'Becomes stronger each year',
      'Living tissue self-repairs damage',
      'Expected lifespan: 50+ years',
      'Can be shaped as it grows',
      'Provides wildlife habitat in winter',
      'Truly heirloom — can pass to next generation'
    ],
    scales: [
      { name: 'Seedling', dimensions: '2\' long, child-sized', materials: '20+ willow cuttings, biodegradable ties', estimatedCost: '$20-35', bestFor: 'Toddlers, first bench' },
      { name: 'Standard', dimensions: '4\' long, adult-sized', materials: '40+ cuttings, hazel frame, ties', estimatedCost: '$40-55', bestFor: 'Family benches, reading spots' },
      { name: 'Grand', dimensions: '6\' long with back', materials: '80+ cuttings, structural frame, woven seat', estimatedCost: '$60-80', bestFor: 'Gathering spaces, community benches' }
    ],
    technique: {
      name: 'Living Wood Joinery',
      description: 'Based on approach grafting — used in orchards for 500+ years.'
    },
    includes: [
      '12-page architectural blueprint PDF (form building, weaving patterns)',
      'Form construction from reclaimed materials',
      'Cutting selection and timing (winter dormant)',
      'Binding technique for graft take',
      'First-year care and watering',
      'When to remove form — transition to freestanding',
      'Shaping and pruning for comfort',
      'Winter protection in cold climates'
    ],
    previewImages: [
      { type: 'diagram', label: 'Grafting Junction' },
      { type: 'growth', label: '18-Month Progression' },
      { type: 'section', label: 'Cross Section' }
    ]
  },
  {
    id: 'terracotta-tower',
    title: 'The Terracotta Tower',
    subtitle: 'Stacked planting pots create a climbing wall and vertical garden',
    category: 'Container Architecture',
    difficulty: 'Easy',
    timeEstimate: '1 Hour',
    priceRange: '$60-120',
    ageRange: '2-8',
    badge: null,
    color: 'bg-[#8C1E00]',
    description: 'Terracotta pots stacked in offset pattern become a climbing face with integrated planting pockets. The weight of stacked pots replaces hardware. Plants cascade from every tier. At season\'s end, pots become permanent garden features.',
    designPhilosophy: '"Container gardening meets climbing wall. The pots themselves become architectural elements, not just vessels. A child climbing this tower is simultaneously tending plants, creating vertical play, and learning gravity through weight and balance."',
    architectNote: 'The ancient Romans used stacked pottery in their gardens for both planting and as garden boundaries. We\'re reclaiming this form for children. The offset stacking creates rhythm — step, pause, look at plant, step again. The pause is where learning happens.',
    features: [
      'No hardware — gravity alone holds it',
      'Pots store flat in winter',
      'Completely compostable materials',
      'Integrated planting teaches vertical gardening',
      'Works on concrete, decking, grass',
      'Move it anywhere — no permanent installation'
    ],
    scales: [
      { name: 'Window', dimensions: '3 pots, 2\' total height', materials: '3 terracotta pots, pot feet', estimatedCost: '$25-35', bestFor: 'Windowsills, very small spaces' },
      { name: 'Standard', dimensions: '6 pots, 3\' total height', materials: '6 graduating pots, spacers, compost', estimatedCost: '$60-80', bestFor: 'Patios, balconies' },
      { name: 'Tower', dimensions: '10 pots, 5\' total height', materials: '10 graduating pots, structural base, rail mount', estimatedCost: '$100-140', bestFor: 'Corner feature, climbing challenge' }
    ],
    technique: {
      name: 'Stacked Vessel',
      description: 'Ancient form rediscovered. Weight and offset create structural stability.'
    },
    includes: [
      '8-page architectural blueprint PDF (stacking patterns, sizing)',
      'Pot selection guide — what sizes to use',
      'Drainage and frost protection',
      'Plant selection for each tier (trailing vs. upright)',
      'Stability testing protocol before child use',
      'Rail mounting for apartment balconies',
      'Winter storage and seasonal rotation',
      'Alternative: hypertufa containers (stone-look, lightweight)'
    ],
    previewImages: [
      { type: 'elevation', label: 'Tower Elevation' },
      { type: 'detail', label: 'Offset Detail' },
      { type: 'plan', label: 'Planting Plan' }
    ]
  }
]

export default function WilderCampArchitect() {
  const [expandedBuild, setExpandedBuild] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(premiumBuilds.map(b => b.category))]

  const filteredBuilds = activeCategory === 'All' 
    ? premiumBuilds 
    : premiumBuilds.filter(b => b.category === activeCategory)

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            {[...Array(20)].map((_, i) => (
              <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="400" className="stroke-white" strokeWidth="0.5" />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} className="stroke-white" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs font-medium uppercase tracking-widest mb-4"
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
            Architectural blueprints designed by an architect. Every material chosen for its life story —
            from earth to return to earth. These structures don't leave waste; they leave memories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-white/60"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              100% compostable materials
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Ancient techniques modernized
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Works in any space
            </span>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-parchment">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-ember text-white'
                    : 'bg-white text-ink hover:bg-ember/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blueprint Preview Teaser */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-medium uppercase tracking-widest text-ember mb-4">Sample Blueprint</p>
              <h3 className="font-serif text-3xl text-ink italic mb-4">The Living Bean Teepee — Elevation</h3>
              <p className="text-inkl mb-6">
                Every plan includes precise dimensions, material callouts, and clear notation.
                Designed to be read by first-time builders — no jargon, no assumptions.
              </p>
              <div className="bg-white rounded-xl p-6 border border-ink/10">
                <svg viewBox="0 0 400 300" className="w-full">
                  {/* Teepee outline */}
                  <line x1="200" y1="40" x2="80" y2="260" className="stroke-ink stroke-2" />
                  <line x1="200" y1="40" x2="320" y2="260" className="stroke-ink stroke-2" />
                  <line x1="200" y1="40" x2="130" y2="260" className="stroke-ink stroke-1" />
                  <line x1="200" y1="40" x2="270" y2="260" className="stroke-ink stroke-1" />
                  
                  {/* Lashing detail */}
                  <circle cx="200" cy="40" r="15" className="stroke-ember stroke-2 fill-cream" />
                  <text x="200" y="44" className="fill-ember text-[8px] font-mono text-center">LASHING</text>
                  
                  {/* Dimension lines */}
                  <line x1="60" y1="260" x2="340" y2="260" className="stroke-ink stroke-1" />
                  <line x1="60" y1="250" x2="60" y2="270" className="stroke-ink stroke-1" />
                  <line x1="340" y1="250" x2="340" y2="270" className="stroke-ink stroke-1" />
                  <text x="200" y="280" className="fill-ink text-[10px] font-mono text-center">7'-0" (TYPICAL)</text>
                  
                  {/* Ground line */}
                  <line x1="40" y1="260" x2="360" y2="260" className="stroke-ink stroke-2" />
                  
                  {/* Bean vine suggestion */}
                  <path d="M 90 260 Q 150 180 200 40 Q 250 180 310 260" className="stroke-[#5A6428] stroke-1 fill-none stroke-dasharray" />
                  
                  {/* Title */}
                  <text x="350" y="295" className="fill-ember text-[9px] font-mono text-right">LIVING BEAN TEEPEE - ELEVATION</text>
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#5A6428]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#5A6428]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-ink mb-1">Cradle to Grave Design</h4>
                  <p className="text-inkl text-sm">Every material chosen for its full lifecycle — from earth, through use, back to earth. No permanent waste.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B43C1E]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#B43C1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-ink mb-1">Ancient Wisdom, Modern Ease</h4>
                  <p className="text-inkl text-sm">Techniques refined over 10,000 years, simplified for non-builders. No power tools required.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D2961E]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#D2961E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-ink mb-1">Works in Any Space</h4>
                  <p className="text-inkl text-sm">Three size options for every space — balconies to acreage. Small space? No problem.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#464F5F]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#464F5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-ink mb-1">Real Architectural Drawings</h4>
                  <p className="text-inkl text-sm">Plan, elevation, and section views with dimensions. The kind of drawings you'd pay $200/hr for elsewhere.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Builds Grid */}
      <section className="py-16 bg-parchment">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-ember mb-3">The Collection</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink italic">
              Available as Premium Plans
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBuilds.map((build, index) => (
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
                      {build.id === 'living-bean-teepee' && (
                        <>
                          <line x1="100" y1="10" x2="40" y2="90" className="stroke-white stroke-1" />
                          <line x1="100" y1="10" x2="160" y2="90" className="stroke-white stroke-1" />
                          <line x1="100" y1="10" x2="70" y2="90" className="stroke-white stroke-1" />
                          <line x1="100" y1="10" x2="130" y2="90" className="stroke-white stroke-1" />
                          <circle cx="100" cy="10" r="8" className="stroke-white stroke-1 fill-cream" />
                        </>
                      )}
                      {build.id === 'cob-mud-oven' && (
                        <>
                          <ellipse cx="100" cy="70" rx="60" ry="20" className="stroke-white stroke-1 fill-none" />
                          <path d="M 40 70 Q 100 20 160 70" className="stroke-white stroke-1 fill-none" />
                          <circle cx="100" cy="50" r="15" className="stroke-white stroke-1 fill-cream" />
                        </>
                      )}
                      {build.id === 'willow-cubby' && (
                        <>
                          <line x1="30" y1="90" x2="60" y2="30" className="stroke-white stroke-1" />
                          <line x1="60" y1="30" x2="140" y2="30" className="stroke-white stroke-1" />
                          <line x1="140" y1="30" x2="170" y2="90" className="stroke-white stroke-1" />
                          <path d="M 35 90 Q 50 60 60 30 Q 100 50 140 30 Q 150 60 165 90" className="stroke-white stroke-1 fill-none" />
                        </>
                      )}
                      {!['living-bean-teepee', 'cob-mud-oven', 'willow-cubby'].includes(build.id) && (
                        <rect x="40" y="30" width="120" height="60" className="stroke-white stroke-1 fill-none" />
                      )}
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

                  {/* Technique Tag */}
                  <div className="mb-4">
                    <span className="text-xs font-medium text-olive bg-[#F0F0D2] px-2 py-1 rounded">
                      {build.technique.name}
                    </span>
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
                      {/* Design Philosophy */}
                      <div className="bg-parchment rounded-xl p-4">
                        <p className="text-xs font-medium text-ember mb-2">Architect's Vision</p>
                        <p className="text-inkl text-sm italic">"{build.designPhilosophy}"</p>
                      </div>

                      {/* What's Included */}
                      <div>
                        <h4 className="font-medium text-ink text-sm mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {build.includes.slice(0, 4).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-inkl text-sm">
                              <svg className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                          {build.includes.length > 4 && (
                            <li className="text-inkl text-xs pl-6">
                              +{build.includes.length - 4} more items
                            </li>
                          )}
                        </ul>
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
          <button className="px-8 py-3 bg-gold text-white font-medium text-lg rounded-full hover:bg-ember transition-colors">
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
