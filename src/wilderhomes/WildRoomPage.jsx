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
        { id: 'root-cellar', name: 'Root Cellar Hideaway', description: 'A below-grade sensory room accessed by a small hatch. Earth walls regulate temperature. Clay and water play contained underground where mess belongs. The compression of the entrance creates the "now I am in my world" transition.' },
        { id: 'stream-crossing', name: 'Stream Crossing Arrival', description: 'Stepping stones spanning a drainage channel create a ceremonial arrival moment. Cross the water to enter. Parents maintain sight lines while children feel the satisfaction of independent navigation.' },
        { id: 'locker-village', name: 'Inhabitable Locker Village', description: 'Gear cubbies designed as tiny dwellings - a cave, a hollow log, a small cottage. Each child has their own home within a home at their scale. Low thresholds create ownership.' },
        { id: 'tunnel-network', name: 'Tunnel Connection System', description: 'A network of child-scale tunnels connecting zones. Children move independently through the space. Smooth concrete with embedded mosaics. The journey IS the experience.' },
      ],
      outdoor: [
        { id: 'floating-island', name: 'Floating Island Pod', description: 'A raised platform with stepping stones, accessible sensory play space underneath. Deep eaves keep it outdoor-but-sheltered. The below zone is contained; the above is elevated and visible.' },
        { id: 'mud-theater', name: 'Earth Amphitheater', description: 'Tiered earth benches around a central mud pit. Children perform, work, and observe from different heights. Natural arena logic. Adults watch from the perimeter.' },
        { id: 'texture-maze', name: 'Texture Maze Garden', description: 'A winding path through sensory zones: gravel, bark, grass, sand, moss. The maze format makes discovery sequential. Children return weekly to note changes.' },
        { id: 'rain-ritual', name: 'Rain Collection Ritual', description: 'A rain chain guides water to a collection basin. Children watch, collect, and redirect. The daily ritual of rain observation connects them to weather cycles.' },
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
        { id: 'seed-vault', name: 'Subterranean Seed Vault', description: 'A small below-grade room accessible by ladder where seeds are stored and starting happens. The underground space maintains consistent temperature. Low ceiling, intimate scale. Children descend into the earth to work with seeds.' },
        { id: 'bay-greenhouse', name: 'Bay Window Greenhouse', description: 'A deep alcove becomes a micro-greenhouse with child-height observation perches. Kids monitor seed starting at eye level. The curved seat wraps around them like a protective seed furrow.' },
        { id: 'propagation-loft', name: 'Vertical Propagation Loft', description: 'A lofted platform at child eye level for hanging planters. Above is the grow zone; underneath is the observation nook. Multiple exits maintain safety while creating vertical discovery.' },
        { id: 'cocoon-chamber', name: 'Cocoon Propagation Chamber', description: 'A glass-walled pod kids can crawl into to feel surrounded by their plants. Capsule-inspired scale creates intimacy. Children disappear into the green.' },
      ],
      outdoor: [
        { id: 'greenhouse-tunnel', name: 'Greenhouse Tunnel Portal', description: 'A transparent corridor connecting inside to outside growing spaces. Children pass through a portal between environments. The tunnel itself becomes a growing environment with climbing vines.' },
        { id: 'canopy-lookout', name: 'Canopy Observation Loft', description: 'A raised platform where children climb up to observe the plant canopy from above. Sized for children only - adults view from below. Different relationship with plants than adults have.' },
        { id: 'terraced-beds', name: 'Terraced Growing Amphitheater', description: 'Tiered raised beds create natural seating and different microclimates. Children work at different heights. The amphitheater format encourages communal tending.' },
        { id: 'secret-beds', name: 'Hidden Garden Rooms', description: 'Separate enclosed growing areas connected by narrow paths. Each room has its own character and crops. The paths between create discovery and secrecy.' },
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
        { id: 'loft-workshop', name: 'Inhabitable Workshop Loft', description: 'A lofted building station where kids stand inside a child-scaled workshop. Elevated with pegboard walls, small workbench, material bins at reach. The underneath becomes clay/sprawl zone. Multiple ladder access points.' },
        { id: 'transform-floor', name: 'Transformable Floor Plane', description: 'The floor consists of flip-top surfaces: smooth for drawing, inverted to reveal texture for building. Low storage benches convert to seating or work surfaces. The room literally transforms.' },
        { id: 'threshold-airlock', name: 'Compression Threshold Airlock', description: 'Low ceiling at entry creates psychological preparation, then releases into full-height making space. This architectural airlock helps children transition into experimental freedom.' },
        { id: 'wall-workshop', name: 'Full-Height Pegboard Wall', description: 'An entire wall of pegboard with tools and materials at every height. Children climb a library ladder to access upper storage. The wall is the inventory, the room is the workshop.' },
      ],
      outdoor: [
        { id: 'climbing-entry', name: 'Climbing Wall Entry Workshop', description: 'The build zone is accessed by climbing a bouldering wall. Tools are stored at elevation. The physical requirement creates focus and transition ritual. Adults enter conventionally; the child-space is defined by climbing.' },
        { id: 'tunnel-spire', name: 'Tunnel Network Makerspace', description: 'Connected workshops arranged around a tunnel spine. Children move through tunnels to access different making zones. The tunnels create secret routes through the workshop.' },
        { id: 'log-construction', name: 'Log Architecture Lab', description: 'Real logs, branches, stakes. Build structures that weather and change. The log pile is the lumber yard. Structures last seasons, not hours.' },
        { id: 'salvage-warehouse', name: 'Salvage Warehouse', description: 'Collected junk: pallets, pipes, tiles, windows. Premium building materials, free. The warehouse format makes gathering feel industrial and serious.' },
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
        { id: 'listening-chamber', name: 'Listening Chamber', description: 'A small enclosed room with acoustic isolation for 1-2 children. One round window at child eye level - adults see only ceiling. No furniture except cushions. Rammed earth walls for silence. The room is for being, not doing.' },
        { id: 'womb-alcove', name: 'Womb-Like Reading Alcove', description: 'A deeply curved, low-ceilinged niche. Sized just for one child plus a book - proportionally tiny for the feeling of being held. Warm overhead lighting. Multiple entries prevent entrapment feeling.' },
        { id: 'hygge-platform', name: 'Scandinavian Hygge Platform', description: 'A low wooden platform in a corner creates a papoose effect through partial enclosure. Layered textiles - wool, sheepskin, linen. Children can disappear into cushions but remain supervised.' },
        { id: 'capsule-retreat', name: 'Japanese Capsule Retreat', description: 'A small enclosed pod built into the wall with a single porthole window. Extreme coziness through compression. Children see out but feel protected within. Inspired by capsule hotels, softened for children.' },
      ],
      outdoor: [
        { id: 'sky-observatory', name: 'Sky Observatory Loft', description: 'Accessed by ladder, this small loft is positioned under a roof window. Children climb up to lie under stars or watch rain. Intimate space with low ceiling except under window. Adults cannot stand inside.' },
        { id: 'sitting-stones', name: 'Arranged Sitting Stones', description: 'Natural stones arranged around a focal planting create a listen spot. Return weekly to notice changes. The arrangement signals this is a place for presence.' },
        { id: 'hiding-room', name: 'The Hiding Room', description: 'A small space (2m x 2m) with a single child-scale doorway (60cm square). Inside: a cushion, a lamp, a book. The room is barely visible from outside - a void that draws you in.' },
        { id: 'wind-chime-zone', name: 'Wind Chime Garden', description: 'Various materials - bamboo, metal, glass - creating gentle sounds paired with swaying grasses. Children sit within the zone and listen. The sound garden has no other purpose.' },
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
        { id: 'the-vortex', name: 'The Vortex', description: 'A circular room with curved walls and domed ceiling. Star map painted above. A single fabric curtain entry. Inside, a rotating projector casts slow-moving constellations. No corners, no right angles. The geometry itself is the magic.' },
        { id: 'transformation-chamber', name: 'Transformation Chamber', description: 'Mirrored walls with interchangeable floor panels - wood, grass, water imagery. Children rearrange the space to create different environments. Hidden storage holds costumes and props. The room becomes whatever story requires.' },
        { id: 'underworld-passage', name: 'The Underworld Passage', description: 'A narrow corridor (50cm wide) with sequential chambers: one dark with water sounds, one mirrored with light, one filled with soft objects. Children traverse to reach a treasure room. Adults enter each chamber separately.' },
        { id: 'micro-dollhouse', name: 'Enterable Micro-Dollhouse', description: 'A child-scaled magical dwelling - fairy cottage, spaceship, submarine. Kids physically enter at 1:1 scale. Multiple openings create escape routes. Translucent walls provide borrowed light and mystery.' },
      ],
      outdoor: [
        { id: 'fairy-door-village', name: 'Fairy Door Village', description: 'Multiple tiny doors in trees, stumps, walls. Each door is a different world - no bigger than a child\'s hand. The village logic means more discovery, more mystery, more inhabitants.' },
        { id: 'moon-garden', name: 'Moon Garden', description: 'White flowers that open at night - moonflower, jasmine, white petunia. Plant it, tend it, visit after dark. The garden transforms when the sun goes down.' },
        { id: 'night-walk', name: 'Lantern Walk Path', description: 'A winding path with embedded low lights. Follow the light through the garden at night. The path reveals what appears after dark - moths, owls, night-blooming flowers.' },
        { id: 'cloud-room', name: 'Cloud Viewing Room', description: 'A small structure with large skylight and reclined seating. Lie on cushions and watch clouds. Pure observation. No other purpose. White plaster, soft fabric, nothing else.' },
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
