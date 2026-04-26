import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
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
    icon: '🤲',
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
    icon: '🌱',
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
    icon: '🔨',
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
    icon: '🦋',
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
    icon: '✨',
    color: '#7A5C14',
    accentColor: '#F0E4A0',
  },
]

const spaceTypes = [
  { id: 'all', label: 'All Spaces', icon: '🏠' },
  { id: 'indoor', label: 'Indoors', icon: '🏠' },
  { id: 'outdoor', label: 'Outdoors', icon: '🌳' },
]

export default function WildRoomPage() {
  const [activeSpace, setActiveSpace] = useState('all')
  const [savedRooms, setSavedRooms] = useState([])
  const [showPlanner, setShowPlanner] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved rooms from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wilder_wild_room_plan')
    if (saved) {
      setSavedRooms(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage
  const saveRooms = (rooms) => {
    localStorage.setItem('wilder_wild_room_plan', JSON.stringify(rooms))
    setSavedRooms(rooms)
  }

  const toggleRoom = (roomId) => {
    const newRooms = savedRooms.includes(roomId)
      ? savedRooms.filter(id => id !== roomId)
      : [...savedRooms, roomId]
    saveRooms(newRooms)
  }

  const filteredRooms = activeSpace === 'all' 
    ? rooms 
    : rooms.filter(r => r.space?.includes(activeSpace) || r.spaces?.includes(activeSpace))

  const getSpaceLabel = (room) => {
    if (!room.spaces || room.spaces.length === 2) return 'Indoor & Outdoor'
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
          <Link 
            to="/wilder-homes/environment" 
            className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline"
          >
            &larr; Back to Environment
          </Link>
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
              className="w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between"
              style={{ borderColor: '#8C1E00', backgroundColor: showPlanner ? '#8C1E00' : 'white' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
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
                {showPlanner ? 'Hide' : 'View'} Plan
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
                  <div className="p-4 bg-white rounded-b-2xl border-2 border-t-0"
                    style={{ borderColor: '#8C1E00' }}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {savedRooms.map(roomId => {
                        const room = rooms.find(r => r.id === roomId)
                        return (
                          <div
                            key={roomId}
                            className="flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm"
                            style={{ backgroundColor: room.color }}
                          >
                            <span>{room.icon}</span>
                            <span>{room.label.replace('The ', '')}</span>
                            <button
                              onClick={() => toggleRoom(roomId)}
                              className="ml-1 opacity-70 hover:opacity-100"
                            >
                              x
                            </button>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex gap-2">
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Space Filter */}
        <div className="flex gap-2 mb-6">
          {spaceTypes.map(space => (
            <button
              key={space.id}
              onClick={() => setActiveSpace(space.id)}
              className="flex-1 px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2"
              style={{
                borderColor: activeSpace === space.id ? '#8C1E00' : '#D2B496',
                backgroundColor: activeSpace === space.id ? '#8C1E00' : 'white',
                color: activeSpace === space.id ? 'white' : '#783C1E',
              }}
            >
              <span>{space.icon}</span>
              <span className="text-sm font-medium">{space.label}</span>
            </button>
          ))}
        </div>

        {/* Room Cards */}
        <div className="space-y-4">
          {filteredRooms.map(room => {
            const isSaved = savedRooms.includes(room.id)
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: isSaved ? '3px solid' + room.color : '2px solid #D2B496' }}
              >
                <div 
                  className="p-6 text-white relative"
                  style={{ backgroundColor: room.color }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{room.icon}</span>
                        <span className="text-xs font-medium uppercase tracking-wider opacity-70">{room.tagline}</span>
                      </div>
                      <h2 className="font-serif text-2xl mb-1">
                        {room.title}
                        <br />
                        <span className="italic opacity-80">"{room.subtitle}"</span>
                      </h2>
                      <p className="text-sm opacity-70 mt-2">{room.description}</p>
                    </div>
                    <button
                      onClick={() => toggleRoom(room.id)}
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                      style={{ 
                        backgroundColor: isSaved ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                        border: '2px solid rgba(255,255,255,0.5)'
                      }}
                    >
                      {isSaved ? (
                        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Space indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-white/20">
                      {getSpaceLabel(room)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F0F0D2' }}>
                    <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: '#5A6428' }}>
                      Architect's Principle
                    </p>
                    <p className="text-sm italic leading-relaxed" style={{ color: '#3C3800' }}>
                      "{room.principle}"
                    </p>
                  </div>
                </div>
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
