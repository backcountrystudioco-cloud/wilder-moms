import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const rooms = [
  {
    id: 'mud',
    label: 'The Mud Room',
    tagline: 'Tactile - Loud - Messy',
    title: 'The Mud Room',
    subtitle: 'where hands learn to think',
    description: 'A dedicated space for mess, mixing, pouring, and sensory immersion. The noisiest room. The most important one.',
    principle: 'Mess needs a container. Not to limit it - to liberate it.',
    color: '#8C4A14',
    accentColor: '#F0D2B4',
  },
  {
    id: 'grow',
    label: 'The Grow Room',
    tagline: 'Patient - Living - Seasonal',
    title: 'The Grow Room',
    subtitle: 'where children learn to wait',
    description: 'A space dedicated to growing things. Where the timeline is set by nature, not by a child.',
    principle: 'The timeline belongs to the plant, not the child.',
    color: '#5A6428',
    accentColor: '#C8D890',
  },
  {
    id: 'build',
    label: 'The Build Room',
    tagline: 'Structured - Purposeful - Physical',
    title: 'The Build Room',
    subtitle: 'where agency is born',
    description: 'A space with materials, tools, and a problem to solve. No instruction manual.',
    principle: 'Agency is not taught. It is built.',
    color: '#6B3A2A',
    accentColor: '#D4B4A4',
  },
  {
    id: 'still',
    label: 'The Still Room',
    tagline: 'Quiet - Observational - Slow',
    title: 'The Still Room',
    subtitle: 'where children learn to see',
    description: 'A quiet corner for watching, noticing, drawing, pressing.',
    principle: 'Stillness is a skill. Design for it.',
    color: '#464F5F',
    accentColor: '#C8D0D8',
  },
  {
    id: 'wonder',
    label: 'The Wonder Room',
    tagline: 'Magical - Seasonal - Storytelling',
    title: 'The Wonder Room',
    subtitle: 'where imagination takes root',
    description: 'The room that changes with the seasons. Where small magic lives.',
    principle: 'Wonder is a design choice. Make it on purpose.',
    color: '#7A5C14',
    accentColor: '#F0E4A0',
  },
]

const builds = {
  mud: [
    { tag: 'Ages 0-2', title: 'The mud patch', desc: 'A designated square of bare earth. Watered daily.', cost: 'Free', time: '30 min' },
    { tag: 'Ages 2-7', title: 'Mud kitchen', desc: 'Pallet frame and a world of imaginary cooking.', cost: '$20-40', time: 'Weekend' },
  ],
  grow: [
    { tag: 'Ages 0-3', title: 'Sensory herb garden', desc: 'Mint, lavender, rosemary - gardening as sensory experience.', cost: '$10-20', time: '1 hour' },
    { tag: 'Ages 3-7', title: 'First raised bed', desc: 'Cherry tomatoes and snap peas. A bed fully theirs.', cost: '$15-35', time: 'Afternoon' },
  ],
  build: [
    { tag: 'Ages 2-5', title: 'Loose parts yard', desc: 'Logs, planks, bricks. No instructions.', cost: 'Free-$20', time: 'Ongoing' },
    { tag: 'Ages 4-8', title: 'Wild fort', desc: 'Sticks, twine, living walls.', cost: '$0-25', time: 'Half day' },
  ],
  still: [
    { tag: 'Ages 1-8', title: 'Observation nook', desc: 'A sheltered corner with a sightline to something living.', cost: '$0-15', time: '1 hour' },
    { tag: 'Ages 3-10', title: 'Pressing station', desc: 'A flat stone, heavy books, collected specimens.', cost: 'Free', time: 'Ongoing' },
  ],
  wonder: [
    { tag: 'Ages 1-6', title: 'Fairy garden', desc: 'A miniature world in a corner of the garden.', cost: '$5-20', time: 'Afternoon' },
    { tag: 'Ages 4-12', title: 'Moon garden', desc: 'White flowers, silver leaves - for dusk and moonlight.', cost: '$10-25', time: 'Weekend' },
  ],
}

export default function WildRoomPage() {
  const [activeRoom, setActiveRoom] = useState('mud')
  const [expandedBuild, setExpandedBuild] = useState(null)

  const room = rooms.find(r => r.id === activeRoom)
  const roomIndex = rooms.findIndex(r => r.id === activeRoom)
  const roomBuilds = builds[activeRoom] || []

  const prevRoom = () => {
    const idx = roomIndex - 1
    setActiveRoom(idx >= 0 ? rooms[idx].id : rooms[rooms.length - 1].id)
    setExpandedBuild(null)
  }

  const nextRoom = () => {
    const idx = roomIndex + 1
    setActiveRoom(idx < rooms.length ? rooms[idx].id : rooms[0].id)
    setExpandedBuild(null)
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
            Choose a room, pick your builds, get the blueprint.
          </p>
        </motion.header>

        {/* Room Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {rooms.map(r => (
            <button
              key={r.id}
              onClick={() => { setActiveRoom(r.id); setExpandedBuild(null); }}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all border"
              style={{
                backgroundColor: activeRoom === r.id ? r.color : 'transparent',
                color: activeRoom === r.id ? 'white' : '#783C1E',
                borderColor: activeRoom === r.id ? r.color : '#D2B496',
              }}
            >
              {r.label.replace('The ', '')}
            </button>
          ))}
        </div>

        {/* Room Panel */}
        {room && (
          <motion.div
            key={room.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Hero */}
            <div className="rounded-t-2xl p-6 text-white" style={{ backgroundColor: room.color }}>
              <p className="text-xs font-medium uppercase tracking-widest mb-2 opacity-70">{room.tagline}</p>
              <h2 className="font-serif text-2xl mb-1">
                {room.title}<br />
                <span className="opacity-80 italic">"{room.subtitle}"</span>
              </h2>
              <p className="text-sm opacity-70 mb-4">{room.description}</p>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <p className="text-[10px] font-medium uppercase tracking-wider opacity-50 mb-1">Architect's principle</p>
                <p className="font-serif text-sm italic opacity-90 leading-relaxed">"{room.principle}"</p>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white rounded-b-2xl p-4 border border-inkll/10 border-t-0">
              {/* Builds */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {roomBuilds.map((build, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExpandedBuild(expandedBuild === idx ? null : idx)}
                    className="w-full text-left p-3 rounded-lg border transition-all"
                    style={{
                      backgroundColor: expandedBuild === idx ? '#FAF6EE' : '#FAF6EE50',
                      borderColor: expandedBuild === idx ? '#8C1E00' : '#D2B496',
                    }}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wider text-ember mb-1">{build.tag}</p>
                    <h4 className="font-sans font-medium text-ink text-sm mb-1">{build.title}</h4>
                    <p className="text-xs text-inkl leading-relaxed mb-2">{build.desc}</p>
                    <div className="flex gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blush/50 text-ember">{build.cost}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blush/50 text-ember">{build.time}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Design Principle */}
              <div className="p-4 border border-inkll/10 rounded-lg mb-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-inkl mb-2">
                  The {room.label} design principle
                </p>
                <h4 className="font-serif text-base text-ink mb-2 italic">"{room.principle}"</h4>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-inkll/10">
                <span className="text-xs text-inkl">
                  {roomIndex > 0 && (
                    <button onClick={prevRoom} className="text-ember font-medium ml-1">
                      &larr; {rooms[roomIndex - 1].label.replace('The ', '')}
                    </button>
                  )}
                </span>
                <span className="text-xs text-inkl">Room {roomIndex + 1} of 5</span>
                <span className="text-xs text-inkl">
                  {roomIndex < rooms.length - 1 && (
                    <button onClick={nextRoom} className="text-ember font-medium">
                      {rooms[roomIndex + 1].label.replace('The ', '')} &rarr;
                    </button>
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
