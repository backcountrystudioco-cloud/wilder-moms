import { motion } from 'framer-motion'
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
    spaces: ['indoor', 'outdoor'],
    examples: {
      indoor: 'Sensory table with bins, textured surfaces on walls, play dough station, water play tray',
      outdoor: 'Mud patch, dirt mound, water wall, sand pit, texture garden path',
    },
    tips: [
      'Start small - a corner is enough',
      'Contain the mess to make it feel safe',
      'Rotate materials weekly to renew interest',
    ],
    color: '#8C4A14',
    accentColor: '#F0D2B4',
  },
  {
    id: 'grow',
    label: 'The Grow Room',
    tagline: 'Patient - Living - Seasonal',
    title: 'The Grow Room',
    subtitle: 'where children learn to wait',
    description: 'A space dedicated to growing things. Where the timeline is set by nature, not by a child. The slowest room. One of the most powerful ones.',
    principle: 'The timeline belongs to the plant, not the child. In a world of instant feedback, a garden is radical.',
    spaces: ['outdoor', 'indoor'],
    examples: {
      indoor: 'Windowsill herbs, terrarium, sprouting station, kitchen scraps garden',
      outdoor: 'Raised bed, teepee with climbing plants, strawberry patch, compost area',
    },
    tips: [
      'Choose fast-growing plants for immediate gratification',
      'Let them water - even overwatering is learning',
      'Harvest together and eat what you grow',
    ],
    color: '#5A6428',
    accentColor: '#C8D890',
  },
  {
    id: 'build',
    label: 'The Build Room',
    tagline: 'Structured - Purposeful - Physical',
    title: 'The Build Room',
    subtitle: 'where agency is born',
    description: 'A space with materials, tools, and a problem to solve. No instruction manual. The most empowering room in the house.',
    principle: 'Agency is not taught. It is built. Children who are given materials and a problem - and then left alone to solve it - develop a relationship with their own capability.',
    spaces: ['indoor', 'outdoor'],
    examples: {
      indoor: 'Cardboard box constructions, fort corner, wooden block area, cardboard marble run',
      outdoor: 'Stick fort, log structures, mud brick building, rope and pulley system',
    },
    tips: [
      'Real tools, not toys - a small hammer and nails work best',
      'Loose parts accumulate naturally - start collecting',
      'The best builds have no right answer',
    ],
    color: '#6B3A2A',
    accentColor: '#D4B4A4',
  },
  {
    id: 'still',
    label: 'The Still Room',
    tagline: 'Quiet - Observational - Slow',
    title: 'The Still Room',
    subtitle: 'where children learn to see',
    description: 'A quiet corner for watching, noticing, drawing, pressing. The antidote to overstimulation. The rarest and most needed room.',
    principle: 'Stillness is a skill. Design for it. We design houses full of stimulation and then wonder why children cannot be still.',
    spaces: ['indoor', 'outdoor'],
    examples: {
      indoor: 'Cozy reading nook, nature table, bird feeder view, art corner',
      outdoor: 'Shaded observation spot, bird bath viewing area, garden bench, weather station',
    },
    tips: [
      'A chair and a view is enough',
      'Keep materials minimal - empty space invites presence',
      'Return weekly to notice changes',
    ],
    color: '#464F5F',
    accentColor: '#C8D0D8',
  },
  {
    id: 'wonder',
    label: 'The Wonder Room',
    tagline: 'Magical - Seasonal - Storytelling',
    title: 'The Wonder Room',
    subtitle: 'where imagination takes root',
    description: 'The room that changes with the seasons. Where small magic lives - fairy doors, moon gardens, night walks, seasonal altars.',
    principle: 'Wonder is a design choice. Make it on purpose. Magic does not happen by accident - it is placed there deliberately.',
    spaces: ['outdoor', 'indoor'],
    examples: {
      indoor: 'Seasonal nature table, fairy garden in a pot, discovery basket, magical story corner',
      outdoor: 'Fairy door in a tree, fairy garden, night walk path, seasonal altar',
    },
    tips: [
      'Rotate weekly with seasonal finds',
      'Let children arrange - their curation tells you what matters',
      'Small, specific, surprising beats large and obvious',
    ],
    color: '#7A5C14',
    accentColor: '#F0E4A0',
  },
]

const spaceTypes = [
  { id: 'all', label: 'All Spaces' },
  { id: 'indoor', label: 'Indoors' },
  { id: 'outdoor', label: 'Outdoors' },
]

export default function WildRoomPage() {
  const [activeSpace, setActiveSpace] = useState('all')
  const [savedRooms, setSavedRooms] = useState([])
  const [expandedRoom, setExpandedRoom] = useState(null)
  const [showPlanner, setShowPlanner] = useState(false)

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

  const toggleRoom = (roomId) => {
    const newRooms = savedRooms.includes(roomId)
      ? savedRooms.filter(id => id !== roomId)
      : [...savedRooms, roomId]
    saveRooms(newRooms)
  }

  const toggleExpand = (roomId, e) => {
    e.stopPropagation()
    setExpandedRoom(expandedRoom === roomId ? null : roomId)
  }

  const filteredRooms = activeSpace === 'all' 
    ? rooms 
    : rooms.filter(r => r.spaces?.includes(activeSpace))

  const getSpaceLabel = (room) => {
    if (!room.spaces || room.spaces.length === 2) return 'Indoor and Outdoor'
    return room.spaces[0] === 'indoor' ? 'Indoor only' : 'Outdoor only'
  }

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

            {showPlanner && (
              <div className="p-4 bg-white rounded-b-2xl border-2 border-t-0 border-ember">
                <div className="flex flex-wrap gap-2 mb-4">
                  {savedRooms.map(roomId => {
                    const room = rooms.find(r => r.id === roomId)
                    return (
                      <div
                        key={roomId}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm"
                        style={{ backgroundColor: room.color }}
                      >
                        <span className="font-serif italic">{room.label}</span>
                        <button
                          onClick={() => toggleRoom(roomId)}
                          className="ml-1 opacity-70 hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('wilder_wild_room_plan')
                    setSavedRooms([])
                    setShowPlanner(false)
                  }}
                  className="px-4 py-2 text-sm text-inkl hover:text-ember"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Space Filter */}
        <div className="flex gap-2 mb-8">
          {spaceTypes.map(space => (
            <button
              key={space.id}
              onClick={() => setActiveSpace(space.id)}
              className="flex-1 px-4 py-3 rounded-xl border-2 transition-all"
              style={{
                borderColor: activeSpace === space.id ? '#8C1E00' : '#D2B496',
                backgroundColor: activeSpace === space.id ? '#8C1E00' : 'white',
                color: activeSpace === space.id ? 'white' : '#783C1E',
              }}
            >
              <span className="text-sm font-medium">{space.label}</span>
            </button>
          ))}
        </div>

        {/* Room Cards */}
        <div className="space-y-4">
          {filteredRooms.map(room => {
            const isSaved = savedRooms.includes(room.id)
            const isExpanded = expandedRoom === room.id
            
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden"
                style={{ 
                  border: isSaved ? '3px solid ' + room.color : '2px solid #D2B496',
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
                  
                  {/* Space indicator */}
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white">
                      {getSpaceLabel(room)}
                    </span>
                    {isSaved && (
                      <span className="text-xs px-3 py-1 rounded-full bg-white text-sm flex items-center gap-1" style={{ color: room.color }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        In your plan
                      </span>
                    )}
                  </div>
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

                      {/* Examples */}
                      <div className="mb-6">
                        <h3 className="font-serif text-lg text-ink mb-4">How it looks in your space</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {room.examples.indoor && (
                            <div className="p-4 rounded-xl" style={{ backgroundColor: '#FAF6EE' }}>
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-sm font-medium text-ink">Indoors</span>
                              </div>
                              <p className="text-sm text-inkl">{room.examples.indoor}</p>
                            </div>
                          )}
                          {room.examples.outdoor && (
                            <div className="p-4 rounded-xl" style={{ backgroundColor: '#FAF6EE' }}>
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                <span className="text-sm font-medium text-ink">Outdoors</span>
                              </div>
                              <p className="text-sm text-inkl">{room.examples.outdoor}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="mb-6">
                        <h3 className="font-serif text-lg text-ink mb-3">Where to start</h3>
                        <ul className="space-y-2">
                          {room.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-inkl">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: room.accentColor }}>
                                <span style={{ color: room.color }}>{i + 1}</span>
                              </span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action */}
                      <div className="pt-4 border-t border-inkll/10">
                        <button
                          onClick={() => toggleRoom(room.id)}
                          className="w-full py-3 px-4 rounded-full font-medium text-sm transition-all"
                          style={{
                            backgroundColor: isSaved ? 'transparent' : room.color,
                            color: isSaved ? room.color : 'white',
                            border: `2px solid ${room.color}`,
                          }}
                        >
                          {isSaved ? 'Remove from Plan' : 'Add to Plan'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-inkl">No rooms match this filter. Try "All Spaces".</p>
          </div>
        )}
      </div>
    </div>
  )
}
