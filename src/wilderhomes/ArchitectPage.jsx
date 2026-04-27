import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const collections = [
  {
    id: 'hideaway',
    title: 'Kid-Only Hideaways',
    subtitle: 'Spaces where adults need not apply',
    icon: 'door',
    color: '#8C4A14',
    blueprints: [
      {
        id: 'hobbit-hole',
        title: 'Hobbit Hole House',
        description: 'An earth-sheltered play nook built into a hillside or raised bed. Grass roof, round door, just big enough for two kids. The earth insulates naturally; the moss makes it magical.',
        difficulty: 'Advanced',
        price: '$49',
        time: '2-3 weekends',
        materials: ['Rammed earth or straw bales', 'Salvaged timber framing', 'Living roof sod', 'Round door (salvaged hatch)'],
        ecoImpact: 'Earth shelter reduces energy 80%. Living roof creates habitat.',
        viral: 'Earth-sheltered aesthetic is Instagram gold. The "real hobbit house" angle goes viral.',
        settings: ['House', 'Townhouse'],
        featured: true,
      },
      {
        id: 'fairy-trail',
        title: 'Fairy Door Trail',
        description: 'A winding path through your yard with multiple tiny carved doors in stumps, logs, and trees. Each door opens to a tiny world. Add tiny mailboxes for letters from the fairies.',
        difficulty: 'Beginner',
        price: '$19',
        time: '1 afternoon',
        materials: ['Small logs and stumps', 'Tiny hinges and latches', 'Wood glue', 'Miniature decorations'],
        ecoImpact: 'Uses fallen wood. Encourages outdoor time and observation.',
        viral: 'Fairy doors are a major Pinterest trend. Parents share their kids finding fairy mail.',
        settings: ['House', 'Apartment Balcony', 'Park'],
        featured: false,
      },
      {
        id: 'tarptunnels',
        title: 'Endless Tarp Tunnels',
        description: 'PVC pipe arches with ripstop fabric stretched between them. Create tunnels, caves, connected rooms. Rearrange seasonally. The fabric becomes walls, roofs, forts. Renters welcome.',
        difficulty: 'Beginner',
        price: '$39',
        time: '2-3 hours',
        materials: ['PVC pipe (3/4")', 'Ripstop nylon or parachute fabric', 'Zip ties', 'Stakes'],
        ecoImpact: 'Ripstop lasts decades. No permanent modifications. Zero waste.',
        viral: 'Transformable spaces perform extremely well. The "building the fort" process is content gold.',
        settings: ['House', 'Apartment Balcony', 'Renters'],
        featured: true,
      },
      {
        id: 'tipi',
        title: 'Cedar Pole Tipi',
        description: 'Lean 8-10 cedar poles together, lashed at top. Canvas or drop cloth cover. Just big enough for sitting, too small for adults to stand. A fire pit or chiminea inside makes it magical at night.',
        difficulty: 'Intermediate',
        price: '$44',
        time: '1 day',
        materials: ['Cedar poles (8-10 ft)', 'Natural rope', 'Canvas or heavy drop cloth', 'Stakes'],
        ecoImpact: 'Cedar is naturally rot-resistant. No chemicals or treatment needed.',
        viral: 'Campfire content is massively engaging. "Our backyard campout" posts go viral.',
        settings: ['House', 'Townhouse'],
        featured: false,
      },
      {
        id: 'cardboard-village',
        title: 'Cardboard Box Village',
        description: 'Collect large appliance boxes. Connect them with tunnels cut between. Paint and decorate as a village. Kids help design and build. Updates seasonally. Free materials, endless possibilities.',
        difficulty: 'Beginner',
        price: '$9',
        time: '1 afternoon',
        materials: ['Large cardboard boxes (appliance stores)', 'Box cutter', 'Paint', 'Tape'],
        ecoImpact: 'Diverts cardboard from landfill. Fully recyclable at end of life.',
        viral: 'Box fort content is legendary on TikTok. The "we built a city" angle is shareable.',
        settings: ['House', 'Apartment', 'Renters'],
        featured: true,
      },
      {
        id: 'nook-closet',
        title: 'Closet Reading Cave',
        description: 'Convert a closet or corner into a cave-like reading nook. Curtain rod with draped fabric. Cushions on floor. String lights. Small bookshelf. The smaller, the better - compression creates coziness.',
        difficulty: 'Beginner',
        price: '$24',
        time: '2 hours',
        materials: ['Tension curtain rod', 'Fabric (sari, quilt, drop cloth)', 'Floor cushions', 'String lights'],
        ecoImpact: 'Reuses existing space. No new materials required.',
        viral: 'Cozy corners are a major aesthetic trend. The "secret reading spot" angle resonates.',
        settings: ['House', 'Apartment', 'Renters'],
        featured: false,
      },
    ],
  },
  {
    id: 'eco',
    title: 'Eco-Friendly Builds',
    subtitle: 'Built to give back to the earth',
    icon: 'leaf',
    color: '#5A6428',
    blueprints: [
      {
        id: 'ecobrick-beds',
        title: 'Ecobrick Raised Beds',
        description: 'Build garden walls from plastic bottles packed with organic waste. Kids fill bottles as part of the activity. Bottles stacked with mud mortar create insulating, level beds. Each bed diverts 200+ bottles from landfill.',
        difficulty: 'Intermediate',
        price: '$29',
        time: '2 weekends',
        materials: ['Plastic bottles (collect 100+)', 'Clay soil', 'Straw', 'Wood framing'],
        ecoImpact: 'Diverts 200+ bottles per bed. Plastic locked away for 500 years. Teaches circular economy.',
        viral: 'Eco-content performs extremely well. The "we built this from trash" angle is highly shareable.',
        settings: ['House', 'Townhouse'],
        featured: true,
      },
      {
        id: 'mushroom-fort',
        title: 'Mushroom Log Fort',
        description: 'A fort structure where the structural posts are oak logs being colonised by shiitake or oyster mushrooms. The logs fruit seasonally. Kids harvest and eat what they built. Spent logs become garden soil.',
        difficulty: 'Intermediate',
        price: '$39',
        time: '1 weekend + seasonal',
        materials: ['Oak logs (4-6" diameter)', 'Mushroom plug spawn', 'Wax', 'Simple frame'],
        ecoImpact: 'Mushrooms remediate wood. Logs sequester carbon. Zero-waste system.',
        viral: 'Edible forts are unique. The "we eat our fort" content is memorable.',
        settings: ['House'],
        featured: true,
      },
      {
        id: 'living-willow',
        title: 'Living Willow Lodge',
        description: 'Plant willow cuttings in an arc pattern over steel rods. Willow grows 6+ feet per year. Within 2 seasons, a living green cave. Kids watch it grow. Prunings become building materials.',
        difficulty: 'Beginner',
        price: '$34',
        time: '1 afternoon + seasons',
        materials: ['Willow cuttings (50+)', 'Steel rebar rods', 'Patience'],
        ecoImpact: 'Willow is a hyperaccumulator (pulls toxins from soil). Creates habitat. Sequesters carbon rapidly.',
        viral: 'Time-lapse of growth is extremely engaging. "Our living fort" is a multi-year content series.',
        settings: ['House'],
        featured: false,
      },
      {
        id: 'rain-garden',
        title: 'Rain Chain Rain Garden',
        description: 'Replace downspouts with copper or bamboo rain chains. Direct overflow to a sunken garden bed with gravel, sand, and native plants. The garden filters 90% of runoff. Mosquitoes don\'t breed in gravel.',
        difficulty: 'Intermediate',
        price: '$44',
        time: '1 weekend',
        materials: ['Rain chain (copper or bamboo)', 'River stone', 'Native plants', 'Edging'],
        ecoImpact: 'Filters 90% of stormwater runoff. Creates habitat. Recharges groundwater.',
        viral: 'Water feature + native plants = beautiful content. The "ecosystem in our yard" angle educates and inspires.',
        settings: ['House'],
        featured: false,
      },
      {
        id: 'pollinator-palace',
        title: 'Pollinator Palace',
        description: 'A multi-story insect hotel built from salvaged materials. Drill holes in logs, pack pinecones and stems into wooden frames. Native bees, predatory wasps, and beneficial insects check in. Kids observe all season.',
        difficulty: 'Beginner',
        price: '$19',
        time: '3 hours',
        materials: ['Salvaged wood', 'Drill with various bits', 'Pinecones, stems, dried leaves', 'Natural twine'],
        ecoImpact: 'Provides habitat for native pollinators. No native bees = no food crops. Critical ecosystem support.',
        viral: 'Pollinator content is trending. "We hosted 300 bees this summer" posts are shareable.',
        settings: ['House', 'Apartment Balcony', 'Townhouse'],
        featured: false,
      },
      {
        id: 'bamboo-trellis',
        title: 'Bamboo Bean Tunnel',
        description: 'Plant bamboo poles in a U-shape. Train beans up both sides. The beans meet at the top and create a green tunnel. Kids walk through and eat while exploring. Bamboo sequesters 35% more carbon than trees.',
        difficulty: 'Beginner',
        price: '$24',
        time: '2 hours + growing',
        materials: ['Bamboo poles (8-10)', 'Bean seeds', 'Twine', 'Seeds (scarlet runner are magic)'],
        ecoImpact: 'Bamboo sequesters carbon rapidly. Beans fix nitrogen in soil. Zero inputs after planting.',
        viral: 'Garden tunnels are highly photogenic. "Our bean palace" is a beloved content category.',
        settings: ['House', 'Townhouse', 'Community Garden'],
        featured: false,
      },
    ],
  },
  {
    id: 'nature',
    title: 'Nature Connection',
    subtitle: 'Spaces designed around wonder',
    icon: 'eye',
    color: '#464F5F',
    blueprints: [
      {
        id: 'vernal-pool',
        title: 'Vernal Pool Observatory',
        description: 'A clay-lined seasonal depression that fills with winter rains. By spring, it\'s alive with tadpoles. A wooden platform at child height lets kids observe without disturbing. In summer, it dries to reveal "fossils."',
        difficulty: 'Advanced',
        price: '$49',
        time: '2-3 weekends',
        materials: ['Clay soil (compact)', 'Local stone', 'Cedar posts', 'Weather-resistant wood'],
        ecoImpact: 'Creates critical amphibian habitat. Vernal pools are endangered ecosystems.',
        viral: 'Tadpole content is irresistible. The "we watched them grow" narrative is emotional and shareable.',
        settings: ['House'],
        featured: true,
      },
      {
        id: 'moon-garden',
        title: 'Moon Garden Alcove',
        description: 'A sitting area planted with white flowers that open at night: moonflower, jasmine, evening primrose. Solar lights make it magical after dark. Kids visit every evening to see what opened.',
        difficulty: 'Beginner',
        price: '$29',
        time: '1 afternoon + planting',
        materials: ['White night-blooming plants', 'Solar garden lights', 'Mulch', 'Stone or log seating'],
        ecoImpact: 'Night gardens support nocturnal pollinators. Moths, bats, and night creatures benefit.',
        viral: 'Night garden content is visually stunning. "Magic hour" photography performs extremely well.',
        settings: ['House', 'Townhouse'],
        featured: true,
      },
      {
        id: 'bird-blind',
        title: 'Kid-Sized Bird Blind',
        description: 'A small observation structure just big enough for 2-3 kids. Peepholes at child eye level. Camouflage with fabric and branches. Binoculars on hooks. Kids wait in silence for birds to appear.',
        difficulty: 'Intermediate',
        price: '$34',
        time: '1 weekend',
        materials: ['Salvaged timber', 'Camouflage fabric', 'Drift net', 'Logs for seating'],
        ecoImpact: 'Encourages bird observation and stewardship. No ecological footprint.',
        viral: 'Patience content is compelling. "We spotted 15 species" posts are popular.',
        settings: ['House'],
        featured: false,
      },
      {
        id: 'texture-trail',
        title: 'Barefoot Texture Trail',
        description: 'A winding path through your yard with different surfaces: smooth river stones, bark mulch, grass, gravel, sand, moss. Take off shoes. The trail changes with weather and seasons. Return weekly to notice.',
        difficulty: 'Beginner',
        price: '$19',
        time: '1 day',
        materials: ['River stones', 'Bark mulch', 'Gravel', 'Sand', 'Moss', 'Grass'],
        ecoImpact: 'No materials needed beyond natural surfaces. Encourages barefoot time and immune support.',
        viral: 'Sensory content is engaging. "Our barefoot trail" is a seasonal content series.',
        settings: ['House', 'Apartment Balcony'],
        featured: false,
      },
      {
        id: 'star-platform',
        title: 'Star Gazing Platform',
        description: 'A small elevated deck with a skylight or open roof. A sleeping bag and pillow. A red flashlight. A star chart. The platform is just high enough to see over fences. No light pollution.',
        difficulty: 'Intermediate',
        price: '$39',
        time: '1-2 weekends',
        materials: ['Cedar decking', 'Simple framing', 'Optional: plexiglass skylight', 'Railing at safe height'],
        ecoImpact: 'Encourages astronomy and night sky appreciation. No energy use.',
        viral: 'Night sky photography is stunning. "We saw the Milky Way from our yard" is highly shareable.',
        settings: ['House'],
        featured: false,
      },
      {
        id: 'sensory-bins',
        title: 'Rolling Sensory Bin Station',
        description: 'A tiered rolling cart with 4 rotating sensory bins: smooth stones, dried beans, sand, leaves. Bins swap seasonally. The cart rolls anywhere. Kids bring the sensory room to them.',
        difficulty: 'Beginner',
        price: '$29',
        time: '2 hours',
        materials: ['Rolling cart (IKEA troom)', '4 bins', 'Natural materials (stones, beans, sand, leaves)', 'Labels'],
        ecoImpact: 'Natural materials, reusable bins, zero waste. Materials can be composted at end of life.',
        viral: 'Sensory content is satisfying to watch. "Sensory bin rotation" posts are popular.',
        settings: ['House', 'Apartment', 'Renters'],
        featured: false,
      },
    ],
  },
  {
    id: 'apartment',
    title: 'Apartment-Friendly',
    subtitle: 'Nature connection in small spaces',
    icon: 'home',
    color: '#7A5C14',
    blueprints: [
      {
        id: 'window-station',
        title: 'Window Seed Station',
        description: 'A shallow wooden tray on your sill with seed-starting pots and a spray bottle. Watch roots develop in clear cups. Track growth in a journal. Move starts to balcony when ready.',
        difficulty: 'Beginner',
        price: '$14',
        time: '1 hour',
        materials: ['Shallow wooden tray', 'Small pots', 'Seeds', 'Clear cups (for root watching)', 'Spray bottle'],
        ecoImpact: 'Connects kids to food systems. Zero footprint.',
        viral: 'Growing content is satisfying. "Day 7: they sprouted!" posts get engagement.',
        settings: ['Apartment', 'Condo', 'Renters'],
        featured: true,
      },
      {
        id: 'balcony-meadow',
        title: 'Balcony Meadow in Pots',
        description: 'Group 5-6 large nursery pots on your balcony. Fill with native grass plugs and wildflower seedlings. Add a mason bee house on the railing. Watch insects arrive. Bring pots inside for winter.',
        difficulty: 'Beginner',
        price: '$29',
        time: '2 hours',
        materials: ['Large nursery pots (5-6)', 'Native grass plugs', 'Wildflower seedlings', 'Mason bee house'],
        ecoImpact: 'Creates urban habitat. Mason bees pollinate 20x more efficiently than honeybees.',
        viral: 'Balcony content is aspirational. "Our 20 sq ft nature sanctuary" is relatable.',
        settings: ['Apartment Balcony', 'Condo', 'Renters'],
        featured: true,
      },
      {
        id: 'living-curtain',
        title: 'Living Plant Curtain',
        description: 'Two tall planter boxes with caster wheels filled with ornamental grasses or ferns. Roll them to create a room divider. Plants create privacy, filter air, and add nature to the space.',
        difficulty: 'Beginner',
        price: '$34',
        time: '2 hours',
        materials: ['Two 24" planters on casters', 'Ornamental grasses or ferns', 'Potting soil', 'Liquid fertilizer'],
        ecoImpact: 'Plants filter indoor air. Ornamental grasses support urban biodiversity.',
        viral: 'Plant parent content is huge. "I made a room from plants" is shareable.',
        settings: ['Apartment', 'Condo', 'Renters'],
        featured: false,
      },
      {
        id: 'terrarium-table',
        title: 'Terrarium Side Table',
        description: 'A 20-gallon glass aquarium or apothecary jar becomes a self-contained ecosystem. Moss, ferns, small stones. Mist twice a week. The glass lid becomes a side table for books.',
        difficulty: 'Beginner',
        price: '$24',
        time: '1 hour',
        materials: ['Glass aquarium or apothecary jar', 'Moss', 'Ferns', 'Decorative stones', 'Activated charcoal'],
        ecoImpact: 'Self-contained ecosystem. No water waste. Closed-loop system.',
        viral: 'Terrarium content is calming and beautiful. "Our desk ecosystem" is popular.',
        settings: ['Apartment', 'Condo', 'Renters', 'Dorm'],
        featured: false,
      },
      {
        id: 'vine-tunnel',
        title: 'Indoor Vine Tunnel',
        description: 'A PVC arch in a sunny corner with morning glory or pole bean seeds planted at the base. As vines grow, they climb the frame and create a living cave. Kids walk through. Week 6 is magical.',
        difficulty: 'Beginner',
        price: '$19',
        time: '1 hour + 6 weeks',
        materials: ['PVC pipe arch', 'Morning glory or pole bean seeds', 'Small pots', 'Twist ties'],
        ecoImpact: 'Plants grow food and beauty from nothing. No resources beyond water.',
        viral: 'Growing content with time progression is engaging. "Week 1 vs Week 6" posts perform well.',
        settings: ['Apartment', 'Condo', 'Renters'],
        featured: false,
      },
      {
        id: 'nest-swing',
        title: 'Freestanding Nest Swing',
        description: 'A rattan hanging chair on a freestanding A-frame. No ceiling mounting needed. Kids curl up with a blanket and a book. Position near the window. Nature viewing + swinging.',
        difficulty: 'Beginner',
        price: '$49',
        time: '1 hour',
        materials: ['Freestanding A-frame (IKEA or similar)', 'Rattan nest chair', 'Rope', 'Cushion', 'Throw blanket'],
        ecoImpact: 'Natural materials (rattan is sustainable). No installation means it moves with you.',
        viral: 'Cozy swinging content is aspirational. "The reading spot" is a beloved aesthetic.',
        settings: ['Apartment', 'Condo', 'Renters'],
        featured: false,
      },
    ],
  },
  {
    id: 'sensory',
    title: 'Sensory Sanctuaries',
    subtitle: 'Spaces for calm and regulation',
    icon: 'heart',
    color: '#6B3A2A',
    blueprints: [
      {
        id: 'sound-garden',
        title: 'Wind Chime Garden',
        description: 'Hang different materials that make sound: bamboo, old silverware, glass bottles, metal pipe. Arrange them at child height. The sounds change with wind. Kids sit and listen.',
        difficulty: 'Beginner',
        price: '$14',
        time: '2 hours',
        materials: ['Bamboo', 'Old silverware', 'Glass bottles', 'Metal pipe', 'Natural twine'],
        ecoImpact: 'Uses reclaimed materials. No energy required.',
        viral: 'Satisfying sound content performs well. "Sounds like this" posts engage viewers.',
        settings: ['House', 'Apartment Balcony', 'Townhouse'],
        featured: false,
      },
      {
        id: 'water-wall',
        title: 'Gutter Water Wall',
        description: 'Mount rain gutters at angles on a wall or fence. Water flows down through funnels and channels. Kids redirect the flow with cups and toys. Rain barrel below collects water.',
        difficulty: 'Intermediate',
        price: '$29',
        time: '3 hours',
        materials: ['Rain gutters (3-4)', 'Rain barrel', 'Brackets', 'Funnels', 'Cups and toys'],
        ecoImpact: 'Collects rainwater for reuse. No water bill increase.',
        viral: 'Water play content is satisfying. "Watch this water flow" posts get high retention.',
        settings: ['House', 'Townhouse'],
        featured: false,
      },
      {
        id: 'dark-cave',
        title: 'Dark Den Cave',
        description: 'A small tent or canopy in a quiet corner with blackout curtains. A small lamp with red light (preserves night vision). Cushions. A place to be still when the world is too loud.',
        difficulty: 'Beginner',
        price: '$39',
        time: '2 hours',
        materials: ['Pop-up tent or canopy', 'Blackout curtains', 'Red fairy light', 'Cushions', 'Blanket'],
        ecoImpact: 'Reuses existing materials. Zero waste.',
        viral: 'Cozy/sensory content is engaging. "Where we go to calm down" normalizes self-regulation.',
        settings: ['House', 'Apartment', 'Renters'],
        featured: false,
      },
      {
        id: 'nature-table',
        title: 'Rotating Nature Table',
        description: 'A low shelf or table dedicated to this week\'s nature finds. A feather, a seed pod, a strange stone. No labels. No explanations. Let children arrange. The table changes with the season.',
        difficulty: 'Beginner',
        price: '$9',
        time: '30 minutes',
        materials: ['Low shelf or table', 'Weekly nature collection', 'Optional: display dishes'],
        ecoImpact: 'Free. Encourages outdoor time and observation.',
        viral: 'Nature table content is aesthetic. "What we found this week" is a popular series format.',
        settings: ['House', 'Apartment', 'Renters'],
        featured: false,
      },
    ],
  },
]

export default function ArchitectPage() {
  const [activeCollection, setActiveCollection] = useState('hideaway')
  const [expandedBlueprint, setExpandedBlueprint] = useState(null)
  const [showConsultation, setShowConsultation] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    space: '',
    kids: '',
    vision: '',
    budget: '',
    timeline: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [buildPrompt, setBuildPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBuilds, setGeneratedBuilds] = useState([])
  const [buildError, setBuildError] = useState('')

  const currentCollection = collections.find(c => c.id === activeCollection)
  const featuredBlueprints = collections.flatMap(c => c.blueprints.filter(b => b.featured))

  const generateBuilds = async () => {
    if (!buildPrompt.trim()) return
    
    setIsGenerating(true)
    setBuildError('')
    
    try {
      const response = await fetch('/api/ai-build-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: buildPrompt })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate builds')
      }
      
      setGeneratedBuilds(data.builds)
    } catch (error) {
      console.error('Build generation error:', error)
      setBuildError(error.message || 'Failed to generate builds. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to a backend or email service
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/wilder-homes/environment" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Environment
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
              Cozy. Clever. Where childhood memories live.
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-6">
              We design and build custom cozy nooks, secret hideaways, and special spaces for kids. 
              Not a playground. Not a playroom. A space so special your kids will remember it forever.
            </p>
            <button
              onClick={() => setShowConsultation(true)}
              className="px-8 py-3 bg-white text-ink font-medium rounded-full hover:bg-cream transition-colors"
            >
              Start Your Project
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Build Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 md:p-8 bg-white rounded-3xl border border-inkll/10"
        >
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl text-ink mb-2">What can I make today?</h2>
            <p className="text-inkl">Tell me what you have around the house. Wilder Companion will generate 3 builds you can make this afternoon.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <input
              type="text"
              value={buildPrompt}
              onChange={(e) => setBuildPrompt(e.target.value)}
              placeholder="e.g., cardboard boxes, old sheets, sticks, fabric scraps..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
              onKeyDown={(e) => e.key === 'Enter' && generateBuilds()}
            />
            <button
              onClick={generateBuilds}
              disabled={isGenerating || !buildPrompt.trim()}
              className="px-6 py-3 bg-ember text-white font-medium rounded-full hover:bg-terra transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 0h12a8 8 0 010 16V0z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  Generate Builds
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {buildError && (
            <p className="text-red-500 text-sm text-center">{buildError}</p>
          )}

          {generatedBuilds.length > 0 && (
            <div className="mt-6 space-y-4">
              {generatedBuilds.map((build, index) => (
                <div key={index} className="p-4 bg-cream rounded-xl">
                  <h3 className="font-serif text-lg text-ink mb-2">{build.title}</h3>
                  <p className="text-sm text-inkl mb-3">{build.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-inkll mb-2">Materials</p>
                      <ul className="space-y-1">
                        {build.materials.map((mat, i) => (
                          <li key={i} className="text-sm text-inkl flex items-start gap-2">
                            <span className="text-olive">-</span>
                            {mat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-inkll mb-2">Steps</p>
                      <ol className="space-y-1">
                        {build.steps.map((step, i) => (
                          <li key={i} className="text-sm text-inkl flex items-start gap-2">
                            <span className="text-ember font-medium w-4">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm italic text-olive">{build.whyKidsLoveIt}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Featured Builds */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl text-ink mb-6">Our Signature Builds</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBlueprints.slice(0, 6).map(blueprint => {
              const collection = collections.find(c => c.blueprints.some(b => b.id === blueprint.id))
              return (
                <motion.button
                  key={blueprint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setActiveCollection(collection.id)
                    setExpandedBlueprint(blueprint.id)
                  }}
                  className="text-left bg-white rounded-xl p-5 border border-inkll/10 hover:shadow-lg transition-all hover:border-ember/30 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded" style={{ backgroundColor: collection.color + '20', color: collection.color }}>
                      {collection.title}
                    </span>
                    <span className="font-serif text-lg" style={{ color: collection.color }}>{blueprint.price}</span>
                  </div>
                  <h3 className="font-serif text-lg text-ink mb-1 group-hover:text-ember transition-colors">{blueprint.title}</h3>
                  <p className="text-xs text-inkl line-clamp-2">{blueprint.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-inkll">
                    <span>{blueprint.difficulty}</span>
                    <span>-</span>
                    <span>{blueprint.time}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Collection Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {collections.map(collection => (
            <button
              key={collection.id}
              onClick={() => {
                setActiveCollection(collection.id)
                setExpandedBlueprint(null)
              }}
              className="flex-shrink-0 px-4 py-2 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeCollection === collection.id ? collection.color : 'white',
                color: activeCollection === collection.id ? 'white' : '#783C1E',
                border: `2px solid ${activeCollection === collection.id ? collection.color : '#D2B496'}`,
              }}
            >
              {collection.title}
            </button>
          ))}
        </div>

        {/* Collection Header */}
        <div className="mb-6">
          <h2 className="font-serif text-2xl text-ink" style={{ color: currentCollection.color }}>
            {currentCollection.title}
          </h2>
          <p className="text-inkl">{currentCollection.subtitle}</p>
        </div>

        {/* Blueprints */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {currentCollection.blueprints.map((blueprint, index) => (
            <motion.div
              key={blueprint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-inkll/10"
            >
              <button
                onClick={() => setExpandedBlueprint(expandedBlueprint === blueprint.id ? null : blueprint.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    blueprint.settings.includes('Apartment') || blueprint.settings.includes('Renters') 
                      ? 'bg-gold/10 text-gold' 
                      : 'bg-olive/10 text-olive'
                  }`}>
                    {blueprint.settings.includes('Apartment') || blueprint.settings.includes('Renters') 
                      ? 'Apartment OK' 
                      : 'House Only'}
                  </span>
                  <span className="font-serif text-2xl" style={{ color: currentCollection.color }}>{blueprint.price}</span>
                </div>
                
                <h3 className="font-serif text-xl text-ink mb-2">{blueprint.title}</h3>
                <p className="text-inkl text-sm leading-relaxed mb-4">
                  {blueprint.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-inkll">
                  <span className="font-medium">{blueprint.difficulty}</span>
                  <span className="text-inkll/50">|</span>
                  <span>{blueprint.time}</span>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedBlueprint === blueprint.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="px-6 pb-6 border-t border-inkll/10"
                >
                  <div className="pt-4 space-y-4">
                    {/* Materials */}
                    <div>
                      <h4 className="text-xs font-medium uppercase tracking-wider text-inkll mb-2">Materials</h4>
                      <ul className="text-sm text-inkl space-y-1">
                        {blueprint.materials.map((mat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: currentCollection.color }}>-</span>
                            {mat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Eco Impact */}
                    <div className="p-3 rounded-lg" style={{ backgroundColor: currentCollection.color + '10' }}>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: currentCollection.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs font-medium" style={{ color: currentCollection.color }}>Eco Impact</p>
                          <p className="text-sm text-inkl">{blueprint.ecoImpact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Viral Potential */}
                    <div className="p-3 rounded-lg bg-ember/5">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 flex-shrink-0 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-xs font-medium text-ember">Viral Potential</p>
                          <p className="text-sm text-inkl">{blueprint.viral}</p>
                        </div>
                      </div>
                    </div>

                    {/* Settings */}
                    <div>
                      <p className="text-xs text-inkll">
                        <span className="font-medium">Works in: </span>
                        {blueprint.settings.join(', ')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-8 border border-inkll/10 text-center"
        >
          <h2 className="font-serif text-2xl text-ink mb-4">Want something custom?</h2>
          <p className="text-inkl max-w-md mx-auto mb-6">
            We work with families to design and build one-of-a-kind spaces. 
            Cozy nooks. Secret hideaways. The stuff childhood memories are made of.
          </p>
          <button
            onClick={() => setShowConsultation(true)}
            className="px-8 py-3 bg-ember text-white font-medium rounded-full hover:bg-terra transition-colors"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowConsultation(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {!submitted ? (
                <>
                  <div className="p-6 border-b border-inkll/10" style={{ backgroundColor: '#1A1A2E' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wider">The Wilder Architect</p>
                        <h2 className="font-serif text-2xl text-white italic">Cozy. Clever. Where childhood memories live.</h2>
                      </div>
                      <button
                        onClick={() => setShowConsultation(false)}
                        className="text-white/70 hover:text-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-white/70 text-sm mt-2">Tell us about your dream project</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
                          placeholder="Sarah"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
                          placeholder="sarah@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">Where is this space?</label>
                      <select
                        value={formData.space}
                        onChange={e => setFormData({...formData, space: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
                      >
                        <option value="">Select space type</option>
                        <option value="apartment">Apartment / Condo</option>
                        <option value="house-yard">House with Yard</option>
                        <option value="house-no-yard">House without Yard</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">Tell us about your kids</label>
                      <input
                        type="text"
                        value={formData.kids}
                        onChange={e => setFormData({...formData, kids: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
                        placeholder="Ages, interests, what they love..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">Describe your vision</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.vision}
                        onChange={e => setFormData({...formData, vision: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink resize-none"
                        placeholder="What kind of space do you dream of? A cozy reading nook? Secret hideaway? Fairy garden?"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">Budget Range</label>
                        <select
                          value={formData.budget}
                          onChange={e => setFormData({...formData, budget: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
                        >
                          <option value="">Select range</option>
                          <option value="under-500">Under $500</option>
                          <option value="500-1500">$500 - $1,500</option>
                          <option value="1500-3000">$1,500 - $3,000</option>
                          <option value="3000-5000">$3,000 - $5,000</option>
                          <option value="5000-plus">$5,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-1">Timeline</label>
                        <select
                          value={formData.timeline}
                          onChange={e => setFormData({...formData, timeline: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
                        >
                          <option value="">When do you want to start?</option>
                          <option value="asap">As soon as possible</option>
                          <option value="month">Within a month</option>
                          <option value="few-months">In a few months</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-ember text-white font-medium rounded-full hover:bg-terra transition-colors"
                    >
                      Start Your Project
                    </button>
                  </form>
                </>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-olive/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-2xl text-ink mb-2">We're excited to hear from you!</h2>
                  <p className="text-inkl mb-6">We'll review your project and be in touch within 48 hours to schedule a consultation.</p>
                  <button
                    onClick={() => {
                      setShowConsultation(false)
                      setSubmitted(false)
                      setFormData({name: '', email: '', space: '', kids: '', vision: '', budget: '', timeline: ''})
                    }}
                    className="px-6 py-3 bg-cream text-ink font-medium rounded-full hover:bg-blush/50 transition-colors"
                  >
                    Continue Exploring
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
