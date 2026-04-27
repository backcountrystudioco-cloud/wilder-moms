import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const rooms = [
  {
    id: 'mud',
    label: 'The Mud Room',
    tagline: 'Tactile - Loud - Messy',
    title: 'The Mud Room',
    subtitle: 'where hands learn to think',
    description: 'A dedicated space for mess, mixing, pouring, and sensory immersion. The noisiest room. The most important one.',
    principle: 'Mess needs a container. Not to limit it - to liberate it. When children know exactly where mess is permitted, they go deeper into it.',
    color: '#8C4A14',
    accentColor: '#F0D2B4',
    implementations: {
      indoor: [
        { id: 'sensory-nook', name: 'Sensory Alcove', description: 'A curtained corner with a low bin of rice, beans, or sand. Clip a shower curtain to ceiling hooks for instant enclosure. The compression of the entrance creates the "now I am in my world" feeling. Cleanup: contain in the bin.' },
        { id: 'locker-village', name: 'Gear Cubby Village', description: 'Individual hooks and shelves designed as tiny dwellings - a cave, a hollow log, a small cottage. Each child has their own home within a home at their scale. Low thresholds create ownership. Add a curtain for extra hideaway.' },
        { id: 'texture-wall', name: 'Texture Discovery Wall', description: 'A section of wall covered in different materials: bark, smooth stones, woven fabric, cork. At child eye level. Remove shoes and explore with fingertips. A sensory hallway in narrow spaces.' },
        { id: 'water-station', name: 'Standing Water Station', description: 'A large container on a bench with cups, funnels, and tubes. Water play at standing height. Mop nearby. The station is the destination, not the mess. Works in laundry rooms, porches, garages.' },
      ],
      outdoor: [
        { id: 'mud-kitchen', name: 'Mud Kitchen Corner', description: 'A low table or repurposed dresser outdoors with bowls, spoons, and old kitchen items. Near a water source. The mess stays outside where it belongs. Start with what you have - expand from there.' },
        { id: 'dig-zone', name: 'Digging Zone', description: 'A contained area - sandbox, old tub, or demarcated ground - for digging and mixing. Add sticks, stones, water. The boundary makes it feel intentional rather than destructive.' },
        { id: 'texture-path', name: 'Barefoot Texture Path', description: 'Stepping stones or a designated path with different surfaces: smooth pebbles, bark mulch, grass, gravel. Take off shoes and explore. Returns to the same spot weekly to note changes in texture after weather.' },
        { id: 'rain-play', name: 'Rain Day Station', description: 'A spot to put on rain gear and go outside when it rains. Boots, coats, umbrella. Keep them by the door. Rain becomes an event, not an inconvenience. A bucket to collect rain for later play.' },
      ],
      transition: 'The Threshold: A compression space with low ceiling before releasing into the sensory zone. Borrowed light from adjacent rooms creates emergence-from-darkness feeling. This is where the outside world ends and the wild begins.',
    },
    tips: [
      'Start with one sensory element, expand slowly',
      'The messier the entrance, the cleaner the exit ritual',
      'Low light at entry creates anticipation',
      'Let children establish the mess zone boundaries',
    ],
  },
  {
    id: 'grow',
    label: 'The Grow Room',
    tagline: 'Patient - Living - Seasonal',
    title: 'The Grow Room',
    subtitle: 'where children learn to wait',
    description: 'A space dedicated to growing things. Where the timeline is set by nature, not by a child. The slowest room. One of the most powerful ones.',
    principle: 'The timeline belongs to the plant, not the child. In a world of instant feedback, a garden is radical.',
    color: '#5A6428',
    accentColor: '#C8D890',
    implementations: {
      indoor: [
        { id: 'seed-station', name: 'Seed Starting Station', description: 'A sunny window shelf with small pots, seeds, and a spray bottle. Label with photos. Watch roots develop in clear cups. The window becomes a living exhibit that changes daily.' },
        { id: 'kitchen-herbs', name: 'Kitchen Herb Garden', description: 'Basil, mint, chives in small pots on a windowsill or shelf at child height. Snip and taste. Water with a small pitcher. The kitchen becomes the grow room.' },
        { id: 'scrap-garden', name: 'Scrap Regeneration Garden', description: 'Green onions regrow in water glasses. Carrot tops produce seeds. Potato eyes become vines. Keep jars on a sunny shelf. Low commitment, high wonder.' },
        { id: 'observation-shelf', name: 'Nature Observation Shelf', description: 'A dedicated low shelf holding this week\'s finds: a feather, a seed pod, a pressed flower. Rotate weekly. Let children arrange. The shelf changes with the seasons.' },
      ],
      outdoor: [
        { id: 'raised-bed', name: 'Raised Bed Plot', description: 'A raised bed at child height - even 6 inches helps. Their own square foot for carrots, radishes, beans. First harvests are addictive. Size makes it manageable.' },
        { id: 'container-garden', name: 'Container Growing Corner', description: 'Pots on a patio or porch. Tomatoes in a bucket, herbs in old cans, flowers in thrifted ceramics. Containers let you move with the sun. Low investment, high yield.' },
        { id: 'teepee-trellis', name: 'Climbing Bean Teepee', description: 'Canes or branches in a circle, tied at top. Beans climb up and create a hideout inside. Eat while hiding. The teepee is the structure, the beans are the walls.' },
        { id: 'pollinator-zone', name: 'Pollinator Welcome Zone', description: 'A corner of flowers that attract butterflies and bees. Zinnias, sunflowers, lavender. Plant once, observe for years. Watch the ecosystem arrive.' },
      ],
      transition: 'The Waiting Window: An indoor spot with clear sightline to outdoor garden. Check daily. Notice changes. Practice patience. The window frame becomes a living picture that changes with seasons.',
    },
    tips: [
      'Choose fast growers: radishes sprout in a week',
      'Let them water, even too much. Overwatering is learning.',
      'Harvest together and eat what you grow',
      'Keep a growth journal with dated photos',
    ],
  },
  {
    id: 'build',
    label: 'The Build Room',
    tagline: 'Structured - Purposeful - Physical',
    title: 'The Build Room',
    subtitle: 'where agency is born',
    description: 'A space with materials, tools, and a problem to solve. No instruction manual. The most empowering room in the house.',
    principle: 'Agency is not taught. It is built. Children who are given materials and a problem - and then left alone to solve it - develop a relationship with their own capability.',
    color: '#6B3A2A',
    accentColor: '#D4B4A4',
    implementations: {
      indoor: [
        { id: 'loose-parts', name: 'Loose Parts Collection', description: 'A shelf with cardboard tubes, fabric scraps, boxes, wooden blocks. Not toys - raw materials. Rotate weekly. The shelf is the inventory. Children choose what to build.' },
        { id: 'cardboard-station', name: 'Cardboard Construction Station', description: 'Large boxes, tape, child-safe scissors. The rule: anything made gets displayed, then recycled. New builds replace old ones. A standing supply of boxes from appliance stores.' },
        { id: 'tool-corner', name: 'Tool Corner', description: 'A low shelf with real tools: hammer, screwdriver, pliers (child-sized). The corner is for working, not playing. Model correct use, then step back. Supervision from nearby.' },
        { id: 'make-do-cart', name: 'Make-Do Cart', description: 'A rolling cart with this week\'s materials: egg cartons, bottle caps, toilet paper tubes. Bring the Build Room anywhere. The cart makes the space.' },
      ],
      outdoor: [
        { id: 'stick-pile', name: 'Stick Collection Corner', description: 'A designated pile of branches, logs, and stakes. The pile is the lumber yard. Start collecting on walks. Structures change weekly. Some last, some get rebuilt.' },
        { id: 'mud-building', name: 'Mud Brick Building', description: 'A spot for mixing dirt and water into mud. Add leaves, sand, straw. Pack into forms or hands. The mud is the material. Sun-baked bricks last longer. The ground is the workbench.' },
        { id: 'salvage-pile', name: 'Salvage Collection', description: 'Collected junk: pallets, pipes, tiles, old windows. Premium building materials, free. An outdoor pile makes gathering feel serious. Safety check before adding to pile.' },
        { id: 'fort-supply', name: 'Fort-Building Supplies', description: 'A bin of sheets, rope, clothespins, and stakes. Outdoor forts happen fast with the right supplies. Keep them in a weatherproof bin. Ready when inspiration strikes.' },
      ],
      transition: 'The Making Threshold: Materials roll between spaces on carts. Outdoor builds inform indoor projects. The distinction blurs. A child carries their outdoor fort plan inside to scale it in cardboard.',
    },
    tips: [
      'Real tools, not toys - a small hammer and nails works best',
      'Loose parts accumulate naturally - start collecting',
      'The best builds have no right answer',
      'Document builds with photos - they become planning tools',
    ],
  },
  {
    id: 'still',
    label: 'The Still Room',
    tagline: 'Quiet - Observational - Slow',
    title: 'The Still Room',
    subtitle: 'where children learn to see',
    description: 'A quiet corner for watching, noticing, drawing, pressing. The antidote to overstimulation. The rarest and most needed room.',
    principle: 'Stillness is a skill. Design for it. We design houses full of stimulation and then wonder why children cannot be still.',
    color: '#464F5F',
    accentColor: '#C8D0D8',
    implementations: {
      indoor: [
        { id: 'cozy-nook', name: 'Curtained Reading Nook', description: 'A corner with a chair, cushions, and a curtain on a tension rod. Creates a cave-like enclosure. A lamp inside makes it a destination. Low cost, high impact. Works in closets, corners, under stairs.' },
        { id: 'window-seat', name: 'Bird Window Seat', description: 'A cushioned spot at a window with a view. Add a small stool for feet. Binoculars on a hook. The window becomes a TV - live, free, always changing. Position away from household traffic.' },
        { id: 'nature-shelf', name: 'Nature Curiosity Shelf', description: 'A low shelf for collected objects: feathers, stones, seed pods, leaves. No labels, no explanations. Rotate monthly. Let children arrange and rearrange. The shelf tells the season.' },
        { id: 'sound-corner', name: 'Quiet Sound Corner', description: 'Headphones with nature sounds (rain, ocean, birds) plus a simple coloring activity. An island of calm in a loud house. Works during noise-sensitive times: naptime, quiet hours.' },
      ],
      outdoor: [
        { id: 'sitting-stone', name: 'Designated Sitting Stone', description: 'One comfortable stone or stump in the garden. Return to the same spot weekly. Notice changes: What bloomed? What fell? What visited? The spot becomes a relationship with that place.' },
        { id: 'shade-nook', name: 'Shade Observation Nook', description: 'A naturally shady corner with a small chair. Watch what happens in the shade: ants, shadows, cool air. The spot is chosen, not furnished. Part of the garden becomes the Still Room.' },
        { id: 'wind-chimes', name: 'Wind Chime Collection', description: 'Hang different materials that make sound: bamboo, old silverware, glass bottles. Children sit and listen. The sounds change with wind. Adds auditory interest to any outdoor space.' },
        { id: 'rain-watching', name: 'Rain Watching Spot', description: 'A covered spot to watch rain fall: under a porch roof, under a large tree, under an umbrella. Rain gear nearby. When it rains, this is the place to be.' },
      ],
      transition: 'The Notice Wall: A shared space to record observations. Drawings, photos, notes. What did you see? The wall becomes a collective journal of presence over time.',
    },
    tips: [
      'A chair and a view is enough',
      'Keep materials minimal - empty space invites presence',
      'Return weekly to notice changes',
      'Model stillness yourself first',
    ],
  },
  {
    id: 'wonder',
    label: 'The Wonder Room',
    tagline: 'Magical - Seasonal - Storytelling',
    title: 'The Wonder Room',
    subtitle: 'where imagination takes root',
    description: 'The room that changes with the seasons. Where small magic lives - fairy doors, moon gardens, night walks, seasonal altars.',
    principle: 'Wonder is a design choice. Make it on purpose. Magic does not happen by accident - it is placed there deliberately.',
    color: '#7A5C14',
    accentColor: '#F0E4A0',
    implementations: {
      indoor: [
        { id: 'star-ceiling', name: 'Star Ceiling Corner', description: 'Glow-in-the-dark stars on a ceiling corner. A small flashlight. Lie down and look up. Takes 20 minutes to install. A $5 investment in wonder. Add new constellations over time.' },
        { id: 'mystery-box', name: 'The Mystery Box', description: 'A closed box with a small hole to peer inside. Once a week, add something: a bone, a strange seed, a feather, a stone. Never explain. The box becomes a source of questions, not answers.' },
        { id: 'costume-corner', name: 'Imagination Costume Corner', description: 'A basket of fabric scraps, old jewelry, hats, scarves. No costumes - just materials. A sarong becomes a cape, a scarf becomes a wizard robe. Less is more.' },
        { id: 'discovery-basket', name: 'Weekly Discovery Basket', description: 'A basket with this week\'s seasonal treasures. Autumn leaves. Spring buds. Summer shells. Winter pine. Rotate weekly. Let children arrange. The basket holds the season.' },
      ],
      outdoor: [
        { id: 'fairy-door', name: 'One Fairy Door', description: 'One small door in a tree or stump. Real wood, simple hinge. No bigger than a child\'s hand. Who lives there? The question is the point. Add a tiny mailbox for letters.' },
        { id: 'moon-garden', name: 'Moon Garden', description: 'White flowers that open at night: moonflower, jasmine, white petunia. Plant in a visible spot from a window. Visit after dark. The garden is different at night.' },
        { id: 'night-walk', name: 'Evening Lantern Walk', description: 'A flashlight walk around the yard after dark. Same route each time. Notice what appears at night: moths, frogs, stars. The ordinary becomes mysterious.' },
        { id: 'seasonal-altar', name: 'Seasonal Nature Altar', description: 'A low stone or stump where you place weekly offerings: fallen leaves, spring flowers, summer berries. The altar changes with the year. Part altar, part nature table.' },
      ],
      transition: 'The Mystery Box: A shared container of unexplained natural objects. Questions welcome. Answers not required. The box sits at the threshold between inside and outside, a daily invitation to wonder.',
    },
    tips: [
      'Rotate weekly with seasonal finds',
      'Let children arrange - their curation tells you what matters',
      'Small, specific, surprising beats large and obvious',
      'Questions are more valuable than answers',
    ],
  },
]

export default function WildRoomPage() {
  const [savedRooms, setSavedRooms] = useState([])
  const [expandedRoom, setExpandedRoom] = useState(null)
  const [showPlanner, setShowPlanner] = useState(false)
  const [showModal, setShowModal] = useState(null)
  const [selectedImpls, setSelectedImpls] = useState([])
  const [roomNotes, setRoomNotes] = useState('')
  const [spaceLocation, setSpaceLocation] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('wilder_wild_room_plan')
    if (saved) {
      try {
        setSavedRooms(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved rooms')
      }
    }
  }, [])

  const saveRooms = (roomsToSave) => {
    localStorage.setItem('wilder_wild_room_plan', JSON.stringify(roomsToSave))
    setSavedRooms(roomsToSave)
  }

  const openAddModal = (room) => {
    const existing = savedRooms.find(r => r.id === room.id)
    setShowModal(room.id)
    setSelectedImpls(existing?.implementations || [])
    setRoomNotes(existing?.notes || '')
    setSpaceLocation(existing?.location || '')
  }

  const toggleImpl = (implId) => {
    setSelectedImpls(prev => 
      prev.includes(implId) 
        ? prev.filter(id => id !== implId)
        : [...prev, implId]
    )
  }

  const savePlan = () => {
    if (!showModal) return
    
    const roomData = rooms.find(r => r.id === showModal)
    const existingIndex = savedRooms.findIndex(r => r.id === showModal)
    
    const roomPlan = {
      id: showModal,
      label: roomData.label,
      color: roomData.color,
      implementations: selectedImpls,
      notes: roomNotes,
      location: spaceLocation,
    }

    let newRooms
    if (existingIndex >= 0) {
      newRooms = [...savedRooms]
      newRooms[existingIndex] = roomPlan
    } else {
      newRooms = [...savedRooms, roomPlan]
    }
    
    saveRooms(newRooms)
    setShowModal(null)
  }

  const removeRoom = (roomId) => {
    saveRooms(savedRooms.filter(r => r.id !== roomId))
  }

  const toggleExpand = (roomId, e) => {
    e.stopPropagation()
    setExpandedRoom(expandedRoom === roomId ? null : roomId)
  }

  const getSavedRoom = (roomId) => savedRooms.find(r => r.id === roomId)
  const isSaved = (roomId) => !!getSavedRoom(roomId)

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <a 
            href="/wilder-homes/environment" 
            className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Environment
          </a>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">The Wild Room</h1>
          <p className="text-inkl text-lg max-w-xl mx-auto">
            Every home needs a Wild Room. Not a room - a design intention. 
            Plan your spaces and bring nature home.
          </p>
        </motion.header>

        {/* Saved Rooms Banner */}
        {savedRooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowPlanner(!showPlanner)}
              className="w-full p-4 rounded-2xl border-2 border-ember transition-all flex items-center justify-between"
              style={{ backgroundColor: showPlanner ? '#8C1E00' : 'white' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: showPlanner ? 'rgba(255,255,255,0.2)' : '#8C1E00' }}>
                  <svg className="w-5 h-5" fill="none" stroke={showPlanner ? 'white' : '#8C1E00'} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-serif text-lg" style={{ color: showPlanner ? 'white' : '#3C1E00' }}>
                    Your Wild Room Plan
                  </p>
                  <p className="text-sm" style={{ color: showPlanner ? 'rgba(255,255,255,0.7)' : '#783C1E' }}>
                    {savedRooms.length} {savedRooms.length === 1 ? 'room' : 'rooms'} selected
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium" style={{ color: showPlanner ? 'white' : '#8C1E00' }}>
                {showPlanner ? 'Hide' : 'View'}
              </span>
            </button>

            <AnimatePresence>
              {showPlanner && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-2xl border-2 border-t-0 border-ember">
                    {savedRooms.map(room => (
                      <div key={room.id} className="mb-4 last:mb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-serif text-lg" style={{ color: room.color }}>
                              {room.label}
                            </h3>
                            {room.location && (
                              <p className="text-xs text-inkl">{room.location}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeRoom(room.id)}
                            className="text-inkl hover:text-ember"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        {room.implementations?.length > 0 && (
                          <ul className="text-sm text-inkl space-y-1 ml-4">
                            {room.implementations.map(implId => {
                              const roomData = rooms.find(r => r.id === room.id)
                              const allImpls = [...(roomData?.implementations.indoor || []), ...(roomData?.implementations.outdoor || [])]
                              const impl = allImpls.find(i => i.id === implId)
                              return impl ? (
                                <li key={implId} className="flex items-start gap-2">
                                  <span style={{ color: room.color }}>-</span>
                                  {impl.name}
                                </li>
                              ) : null
                            })}
                          </ul>
                        )}
                        {room.notes && (
                          <p className="text-sm text-inkl italic mt-2 ml-4 border-l-2 pl-3" style={{ borderColor: room.accentColor }}>
                            "{room.notes}"
                          </p>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        localStorage.removeItem('wilder_wild_room_plan')
                        setSavedRooms([])
                        setShowPlanner(false)
                      }}
                      className="px-4 py-2 text-sm text-inkl hover:text-ember mt-4"
                    >
                      Clear All
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Room Cards */}
        <div className="space-y-4">
          {rooms.map(room => {
            const saved = getSavedRoom(room.id)
            const isExpanded = expandedRoom === room.id
            
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden"
                style={{ 
                  border: saved ? '3px solid ' + room.color : '2px solid #D2B496',
                }}
              >
                {/* Header - Clickable */}
                <button
                  onClick={(e) => toggleExpand(room.id, e)}
                  className="w-full p-6 text-left"
                  style={{ backgroundColor: room.color }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium uppercase tracking-wider opacity-70">{room.tagline}</span>
                      </div>
                      <h2 className="font-serif text-2xl text-white mb-1">
                        {room.title}
                      </h2>
                      <p className="text-base text-white/80 italic">"{room.subtitle}"</p>
                      <p className="text-sm text-white/70 mt-2">{room.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <svg 
                        className={`w-6 h-6 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Saved indicator */}
                  {saved && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-white text-sm flex items-center gap-1" style={{ color: room.color }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        In your plan
                      </span>
                      {saved.implementations?.length > 0 && (
                        <span className="text-xs text-white/70">
                          {saved.implementations.length} item{saved.implementations.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="bg-white">
                    <div className="p-6 border-t border-inkll/10">
                      {/* Architect's Principle */}
                      <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#F0F0D2' }}>
                        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#5A6428' }}>
                          Architect's Principle
                        </p>
                        <p className="text-base italic leading-relaxed" style={{ color: '#3C3800' }}>
                          "{room.principle}"
                        </p>
                      </div>

                      {/* Transition Zone */}
                      {room.implementations.transition && (
                        <div className="mb-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: room.accentColor }}>
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke={room.color} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: room.color }}>
                                The Bridge
                              </p>
                              <p className="text-sm text-inkl italic">{room.implementations.transition}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Indoor Implementations */}
                      {room.implementations.indoor && (
                        <div className="mb-6">
                          <h3 className="font-serif text-lg text-ink mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Indoors
                          </h3>
                          <div className="space-y-2">
                            {room.implementations.indoor.map((impl, i) => (
                              <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: '#FAF6EE' }}>
                                <h4 className="text-sm font-medium text-ink mb-1">{impl.name}</h4>
                                <p className="text-xs text-inkl leading-relaxed">{impl.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Outdoor Implementations */}
                      {room.implementations.outdoor && (
                        <div className="mb-6">
                          <h3 className="font-serif text-lg text-ink mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Outdoors
                          </h3>
                          <div className="space-y-2">
                            {room.implementations.outdoor.map((impl, i) => (
                              <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: '#FAF6EE' }}>
                                <h4 className="text-sm font-medium text-ink mb-1">{impl.name}</h4>
                                <p className="text-xs text-inkl leading-relaxed">{impl.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      <div className="mb-6">
                        <h3 className="font-serif text-lg text-ink mb-3">Where to start</h3>
                        <ul className="space-y-2">
                          {room.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-inkl">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: room.accentColor }}>
                                <span className="text-xs font-medium" style={{ color: room.color }}>{i + 1}</span>
                              </span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action */}
                      <div className="pt-4 border-t border-inkll/10">
                        <button
                          onClick={() => openAddModal(room)}
                          className="w-full py-3 px-4 rounded-full font-medium text-sm transition-all"
                          style={{
                            backgroundColor: saved ? 'transparent' : room.color,
                            color: saved ? room.color : 'white',
                            border: `2px solid ${room.color}`,
                          }}
                        >
                          {saved ? 'Edit Plan' : 'Add to Plan'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Add to Plan Modal */}
      <AnimatePresence>
        {showModal && (() => {
          const room = rooms.find(r => r.id === showModal)
          const allImpls = [...(room.implementations.indoor || []), ...(room.implementations.outdoor || [])]
          
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              onClick={() => setShowModal(null)}
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-6 border-b border-inkll/10" style={{ backgroundColor: room.color }}>
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-white">{room.title}</h2>
                    <button
                      onClick={() => setShowModal(null)}
                      className="text-white/70 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/80 mt-1">Customize your {room.label.toLowerCase()}</p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Location Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-ink mb-2">
                      Where will this go?
                    </label>
                    <input
                      type="text"
                      value={spaceLocation}
                      onChange={e => setSpaceLocation(e.target.value)}
                      placeholder="e.g., Kitchen corner, Back porch, Whole basement"
                      className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
                    />
                  </div>

                  {/* Implementation Picker */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-ink mb-3">
                      What do you want to include?
                    </label>
                    <div className="space-y-2">
                      {allImpls.map(impl => (
                        <label
                          key={impl.id}
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                          style={{ 
                            backgroundColor: selectedImpls.includes(impl.id) ? room.accentColor + '40' : '#FAF6EE'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedImpls.includes(impl.id)}
                            onChange={() => toggleImpl(impl.id)}
                            className="mt-1 w-4 h-4 rounded"
                            style={{ accentColor: room.color }}
                          />
                          <div>
                            <span className="text-sm font-medium text-ink">{impl.name}</span>
                            <p className="text-xs text-inkl mt-0.5">{impl.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">
                      Your notes
                    </label>
                    <textarea
                      value={roomNotes}
                      onChange={e => setRoomNotes(e.target.value)}
                      placeholder="Ideas, materials to gather, reminders..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-inkll/10 flex gap-3">
                  <button
                    onClick={() => setShowModal(null)}
                    className="flex-1 py-3 px-4 rounded-full font-medium text-sm bg-cream text-ink hover:bg-blush/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={savePlan}
                    className="flex-1 py-3 px-4 rounded-full font-medium text-sm text-white transition-all"
                    style={{ backgroundColor: room.color }}
                  >
                    {selectedImpls.length > 0 || roomNotes || spaceLocation ? 'Save Plan' : 'Skip'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
