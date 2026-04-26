import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import { ecoProducts } from './ecoProducts'

const rooms = [
  {
    id: 'mud',
    name: 'The Mud Room',
    tagline: 'where hands learn to think',
    category: 'Tactile · Loud · Messy',
    color: '#8C4A14',
    textColor: '#F0D2B4',
    principle: '"Mess needs a container. Not to limit it — to make it feel safe. When a child knows where the mess is allowed, they go deeper into it."',
    builds: [
      { id: 'mud-patch', ageRange: '0–2', title: 'The mud patch', desc: 'A designated square of bare earth. Watered daily. Nothing more needed.', cost: 'Free', time: '30 min', tag: 'Ages 0–2' },
      { id: 'sensory-path', ageRange: '0–3', title: 'Texture path', desc: 'Stepping stones of different materials — gravel, bark, smooth stone, grass, sand.', cost: '$10–20', time: '1 hour', tag: 'Ages 0–3' },
      { id: 'mud-kitchen', ageRange: '2–7', title: 'Mud kitchen', desc: 'Pallet frame, thrift store pots, and a world of imaginary cooking.', cost: '$20–40', time: 'Weekend', tag: 'Ages 2–7' },
      { id: 'pour-station', ageRange: '1–5', title: 'Pour & measure station', desc: 'Funnels, tubes, containers. Water and mud. The physics lab of early childhood.', cost: '$5–15', time: '1 hour', tag: 'Ages 1–5' },
    ]
  },
  {
    id: 'grow',
    name: 'The Grow Room',
    tagline: 'where children learn to wait',
    category: 'Patient · Living · Seasonal',
    color: '#5A6428',
    textColor: '#C8D890',
    principle: '"A garden teaches what no screen can: that some things cannot be hurried. That investment has a timeline that isn\'t yours to set."',
    builds: [
      { id: 'herb-garden', ageRange: '0–3', title: 'Sensory herb garden', desc: 'Mint, lavender, rosemary — crush the leaves and smell them.', cost: '$10–20', time: '1 hour', tag: 'Ages 0–3' },
      { id: 'raised-bed', ageRange: '3–7', title: 'First raised bed', desc: 'Cherry tomatoes, snap peas, sunflowers. A bed that\'s fully theirs to tend.', cost: '$15–35', time: 'Afternoon', tag: 'Ages 3–7' },
      { id: 'seed-saving', ageRange: '4–8', title: 'Seed saving station', desc: 'Collect, dry, label, store. The ritual of saving for next year.', cost: 'Free', time: 'Ongoing', tag: 'Ages 4–8' },
      { id: 'worm-farm', ageRange: '5–10', title: 'Worm farm', desc: 'Feed it, watch it work, use the castings. A complete ecosystem.', cost: '$0–15', time: 'Weekend', tag: 'Ages 5–10' },
    ]
  },
  {
    id: 'build',
    name: 'The Build Room',
    tagline: 'where agency is born',
    category: 'Structured · Purposeful · Physical',
    color: '#6B3A2A',
    textColor: '#F0D2B4',
    principle: '"Every architect started by building something with their hands and standing back to see if it held. That moment of standing back — that\'s the beginning of spatial intelligence."',
    builds: [
      { id: 'loose-parts', ageRange: '2–5', title: 'Loose parts yard', desc: 'Logs, planks, bricks, rope, crates. No instructions. The materials are the prompt.', cost: 'Free–$20', time: 'Ongoing', tag: 'Ages 2–5' },
      { id: 'wild-fort', ageRange: '4–8', title: 'Wild fort', desc: 'Sticks, twine, living walls. A space that is entirely theirs to design.', cost: '$0–25', time: 'Half day', tag: 'Ages 4–8' },
      { id: 'tool-station', ageRange: '5–10', title: 'First tool station', desc: 'Real tools, safely sized. The first time they make something new.', cost: '$15–30', time: 'Afternoon', tag: 'Ages 5–10' },
      { id: 'bug-hotel', ageRange: '4–9', title: 'Bug hotel', desc: 'Stacked pallets, hollow tubes, bark, leaves. A built habitat.', cost: 'Free', time: 'Weekend', tag: 'Ages 4–9' },
    ]
  },
  {
    id: 'still',
    name: 'The Still Room',
    tagline: 'where children learn to see',
    category: 'Quiet · Observational · Slow',
    color: '#464F5F',
    textColor: '#C8D0D8',
    principle: '"The best buildings have a quiet room. Not silent — still. A place where the pace of the outside world cannot enter."',
    builds: [
      { id: 'observation-nook', ageRange: '1–8', title: 'Observation nook', desc: 'A sheltered corner with a low seat and a sightline to something living.', cost: '$0–15', time: '1 hour', tag: 'Ages 1–8' },
      { id: 'pressing-station', ageRange: '3–10', title: 'Pressing station', desc: 'A flat stone, heavy books, collected specimens. The archive of a nature childhood.', cost: 'Free', time: 'Ongoing', tag: 'Ages 3–10' },
      { id: 'nature-journal', ageRange: '4–12', title: 'Nature journal spot', desc: 'A dedicated seat, a waterproof journal, a tin of pencils.', cost: '$5–15', time: '30 min', tag: 'Ages 4–12' },
      { id: 'bird-watching', ageRange: '2–10', title: 'Bird watching post', desc: 'Feeder, low perch, identification cards. The first lesson in patient attention.', cost: '$5–20', time: '1 hour', tag: 'Ages 2–10' },
    ]
  },
  {
    id: 'wonder',
    name: 'The Wonder Room',
    tagline: 'where imagination takes root',
    category: 'Magical · Seasonal · Storytelling',
    color: '#7A5C14',
    textColor: '#F0E4A0',
    principle: '"Scale creates wonder. A tiny door in a large tree. A single candle in a dark garden. Magic is an architectural problem."',
    builds: [
      { id: 'fairy-garden', ageRange: '1–6', title: 'Fairy garden', desc: 'A miniature world in a corner of the garden. Scale is the magic ingredient.', cost: '$5–20', time: 'Afternoon', tag: 'Ages 1–6' },
      { id: 'moon-garden', ageRange: '4–12', title: 'Moon garden', desc: 'White flowers, silver leaves — designed to be visited at dusk.', cost: '$10–25', time: 'Weekend', tag: 'Ages 4–12' },
      { id: 'nature-table', ageRange: 'All', title: 'Seasonal nature table', desc: 'A low surface that changes with the seasons. The indoor altar to the outdoor world.', cost: 'Free', time: 'Ongoing', tag: 'All ages' },
      { id: 'night-walk', ageRange: '2–10', title: 'Night walk kit', desc: 'Torches, a blanket, a thermos. The garden after dark is a different world.', cost: '$5–15', time: '30 min', tag: 'Ages 2–10' },
    ]
  }
]

const roomEcoMapping = {
  'mud': { useCases: ['mudroom', 'playroom'], label: 'Mud Room Materials' },
  'grow': { useCases: ['garden', 'outdoor', 'nursery'], label: 'Grow Room Supplies' },
  'build': { useCases: ['playroom', 'outdoor', 'child-bedroom'], label: 'Build Room Materials' },
  'still': { useCases: ['nursery', 'playroom', 'child-bedroom'], label: 'Still Room Finishes' },
  'wonder': { useCases: ['outdoor', 'playroom', 'nursery'], label: 'Wonder Room Elements' }
}

const buildDetails = {
  'mud-patch': {
    steps: [
      { title: 'Choose the spot', text: 'Pick a corner that gets some sun and is visible from your kitchen window. You want to be able to see it without hovering over it.' },
      { title: 'Clear and define it', text: 'Remove grass from a 1m x 1m patch. Edge it with a simple border — bricks, stones, a timber edge. The boundary tells the child: this is your zone.' },
      { title: 'Make it mud, not just dirt', text: 'Water it the night before. Real mud — the kind that holds a handprint — is the point. Keep a small watering can nearby.' },
      { title: 'Add the first tools', text: 'One spoon, one small pot, one stick. That\'s it for 0–2. Overwhelm is the enemy of deep play.' }
    ],
    note: '"The boundary is not a limit — it\'s a permission. A child who knows exactly where the mess is allowed goes deeper into it than one left with the whole yard."'
  },
  'sensory-path': {
    steps: [
      { title: 'Map your path', text: 'It doesn\'t need to be long — 6 stepping zones is plenty. Curved feels more natural than straight.' },
      { title: 'Choose your textures', text: 'Smooth river stone, coarse gravel, bark chip, soft grass, fine sand, wooden disc. Aim for contrast.' },
      { title: 'Set each zone', text: 'Dig 5cm down for each zone, lay landscape fabric, fill with your material. Use log rounds as borders.' },
      { title: 'Walk it barefoot first', text: 'Before the children, you walk it. Feel each surface. Adjust anything that\'s sharp or unstable.' }
    ],
    note: '"Each texture zone is a complete sensory event. The path teaches them that moving through space changes how they feel."'
  },
  'mud-kitchen': {
    steps: [
      { title: 'Source your materials', text: 'Thrift store: old wooden pallet or dresser frame, a pot, colander, utensils. You don\'t need to buy anything new.' },
      { title: 'Build the frame', text: 'Stand the pallet upright against a fence or wall. Sand rough edges. Position it so the child faces into the yard.' },
      { title: 'Add the sink', text: 'Cut a hole, drop in a metal bowl. A small bucket underneath catches overflow. Keep a small jug nearby.' },
      { title: 'Stock the pantry', text: 'Jars of sand, dried herbs, pine cones, flower petals, gravel, bark. Rotate seasonally.' },
      { title: 'Hand it over completely', text: 'Let them name it. Let them decorate it. Let them decide the menu. Your job is supplier and occasional customer.' }
    ],
    note: '"A kitchen is a workspace. When you give them one that is genuinely theirs — they work in it with extraordinary seriousness."'
  },
  'pour-station': {
    steps: [
      { title: 'Collect your vessels', text: 'Different sizes, different shapes: a tall thin bottle, a wide shallow bowl, a small cup, a large bucket, a colander, a funnel.' },
      { title: 'Set up the station', text: 'On a low table or directly on the grass. The station should be at child height — they need to see into every vessel.' },
      { title: 'Add water and mud', text: 'Start with water. Add mud slowly. Then add gravel, leaves, flower petals. The materials suggest what to do.' },
      { title: 'Step back', text: 'This is not a supervised activity. It is a provocation. Set it up, make sure they\'re safe, and get out of the way.' }
    ],
    note: '"Volume, gravity, material properties — this is physics. A toddler with a funnel and a bucket is doing the same thing, faster."'
  },
  'herb-garden': {
    steps: [
      { title: 'Choose your herbs', text: 'Mint, lavender, rosemary, lemon thyme, chamomile. All robust, all fragrant, all safe to touch.' },
      { title: 'Position for access', text: 'Against a sunny wall, at knee height for a toddler. The whole point is the reaching, touching, crushing, smelling.' },
      { title: 'Teach the crush and smell', text: 'Pinch a mint leaf. Hold it to their nose. Watch their face. Sensation, then language: "that\'s mint."' },
      { title: 'Let them tend it', text: 'Their own small watering can. A weekly watering ritual — same day, same time. Rhythm teaches responsibility.' }
    ],
    note: '"Aromatherapy is architecture. The herbs you plant near a threshold change how a child experiences crossing it."'
  }
}

export default function WildRoom() {
  const [activeRoom, setActiveRoom] = useState('mud')
  const [selectedBuild, setSelectedBuild] = useState(null)
  const [selectedAge, setSelectedAge] = useState('all')

  const currentRoom = rooms.find(r => r.id === activeRoom)
  const roomIndex = rooms.findIndex(r => r.id === activeRoom)

  const filteredBuilds = currentRoom.builds.filter(build => {
    if (selectedAge === 'all') return true
    const [min, max] = build.ageRange.split('–').map(v => v === 'All' ? 99 : parseInt(v))
    const [filterMin, filterMax] = selectedAge.split('-').map(Number)
    return min <= filterMax && max >= filterMin
  })

  return (
    <div className="bg-cream">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <p className="text-ember text-xs font-medium uppercase tracking-widest mb-4">
          Wilder Moms · The Wild Room
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4 italic">
          Every home needs a <span className="text-ember">Wild Room.</span>
        </h2>
        <p className="text-inkl max-w-xl mx-auto text-sm leading-relaxed">
          Not a room — a design intention. Your outdoor space, read through an architect's eye.
          Choose a room, pick your builds, get the blueprint.
        </p>
      </div>

      {/* Room Tabs */}
      <div className="px-4 overflow-x-auto">
        <div className="flex gap-2 max-w-4xl mx-auto pb-2">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => { setActiveRoom(room.id); setSelectedBuild(null) }}
              className={`
                flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-medium transition-all
                ${activeRoom === room.id
                  ? 'text-white shadow-lg'
                  : 'bg-white text-inkl border border-inkll/30 hover:border-ember hover:text-ember'
                }
              `}
              style={activeRoom === room.id ? { backgroundColor: room.color } : {}}
            >
              {room.name.replace('The ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Room Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoom}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Room Hero */}
          <div
            className="px-4 py-8 mt-6 border-b border-inkll/20"
          >
            <div className="max-w-4xl mx-auto">
              <p
                className="text-xs font-medium uppercase tracking-widest text-ember mb-3"
              >
                Room {roomIndex + 1} of 5 · {currentRoom.category}
              </p>
              <h3
                className="font-serif text-3xl md:text-4xl text-ink mb-3 italic"
              >
                {currentRoom.name}<br />
                <span className="text-inkl">where {currentRoom.tagline}</span>
              </h3>
              <div
                className="mt-6 p-4 rounded-lg border-l-4 border-ember bg-parchment max-w-lg"
              >
                <p className="text-xs uppercase tracking-wider text-inkl mb-2">Architect's principle</p>
                <p className="font-serif text-ink text-sm italic leading-relaxed">
                  {currentRoom.principle}
                </p>
              </div>
            </div>
          </div>

          {/* Room Body */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Age Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', '0-2', '3-5', '6-8'].map(age => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium transition-all
                    ${selectedAge === age
                      ? 'text-white'
                      : 'bg-cream text-inkl border border-inkll/30 hover:border-ember'
                    }
                  `}
                  style={selectedAge === age ? { backgroundColor: currentRoom.color, borderColor: currentRoom.color } : {}}
                >
                  {age === 'all' ? 'All ages' : `Ages ${age}`}
                </button>
              ))}
            </div>

            {/* Builds Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {filteredBuilds.map(build => (
                <motion.div
                  key={build.id}
                  whileHover={{ y: -2 }}
                  className={`
                    border rounded-xl p-4 cursor-pointer transition-all bg-white
                    ${selectedBuild === build.id ? 'border-ember border-2' : 'border-inkll/30 hover:border-ember'}
                  `}
                  onClick={() => setSelectedBuild(selectedBuild === build.id ? null : build.id)}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-ember mb-2">{build.tag}</p>
                  <h4 className="font-serif text-lg text-ink mb-2">{build.title}</h4>
                  <p className="text-inkl text-sm leading-relaxed mb-3">{build.desc}</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blush text-ember text-xs rounded-full">{build.cost}</span>
                    <span className="px-2 py-1 bg-blush text-ember text-xs rounded-full">{build.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detail Panel */}
            {selectedBuild && buildDetails[selectedBuild] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-2 border-ember rounded-xl p-6 bg-white mb-8"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-ember mb-2">
                  {currentRoom.name} build
                </p>
                <h4 className="font-serif text-2xl text-ink mb-6">
                  {buildDetails[selectedBuild].steps[0]?.title === 'Choose the spot' ? 'The mud patch' :
                   buildDetails[selectedBuild].steps[0]?.title === 'Map your path' ? 'Texture path' :
                   buildDetails[selectedBuild].steps[0]?.title === 'Source your materials' ? 'Mud kitchen' :
                   buildDetails[selectedBuild].steps[0]?.title === 'Collect your vessels' ? 'Pour station' :
                   buildDetails[selectedBuild].steps[0]?.title === 'Choose your herbs' ? 'Sensory herb garden' :
                   selectedBuild}
                </h4>

                <div className="space-y-4 mb-6">
                  {buildDetails[selectedBuild].steps.map((step, i) => (
                    <div key={i} className="flex gap-4 pb-4 border-b border-blush last:border-0 last:pb-0">
                      <div
                        className="w-8 h-8 rounded-full bg-blush text-ember flex items-center justify-center flex-shrink-0 text-sm font-medium"
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h5 className="font-medium text-ink text-sm mb-1">{step.title}</h5>
                        <p className="text-inkl text-xs leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-parchment rounded-lg mb-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-olive mb-2">Architect's note</p>
                  <p className="text-inkl text-sm italic leading-relaxed">{buildDetails[selectedBuild].note}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 bg-ember text-white text-xs font-medium rounded hover:bg-terra transition-colors">
                    Get the full guide ↗
                  </button>
                  <button
                    onClick={() => setSelectedBuild(null)}
                    className="px-5 py-2.5 bg-transparent text-ember text-xs font-medium rounded border border-ember hover:bg-ember/5 transition-colors"
                  >
                    Back to builds
                  </button>
                </div>
              </motion.div>
            )}

            {/* Design Principle */}
            <div className="border border-inkll/30 rounded-xl p-6 bg-white mb-8">
              <p className="text-xs font-medium uppercase tracking-wider text-inkl mb-3">
                The {currentRoom.name} design principle
              </p>
              <h4 className="font-serif text-xl text-ink mb-3">
                {activeRoom === 'mud' && 'Mess needs a container. Not to limit it — to liberate it.'}
                {activeRoom === 'grow' && 'The timeline belongs to the plant, not the child.'}
                {activeRoom === 'build' && 'Agency is not taught. It is built.'}
                {activeRoom === 'still' && 'Stillness is a skill. Design for it.'}
                {activeRoom === 'wonder' && 'Wonder is a design choice. Make it on purpose.'}
              </h4>
              <p className="text-inkl text-sm leading-relaxed">
                {activeRoom === 'mud' && 'When children know exactly where mess is permitted, they go deeper into it. The Mud Room is defined space — edges that say "yes, here, all of this is allowed." Boundary is not restriction. It is permission.'}
                {activeRoom === 'grow' && 'In a world of instant feedback, a garden is radical. A seed has its own schedule. The Grow Room teaches children that some of the best things cannot be rushed.'}
                {activeRoom === 'build' && 'Children who are given materials and a problem — and then left alone to solve it — develop a relationship with their own capability that no structured activity can replicate.'}
                {activeRoom === 'still' && 'We design houses full of stimulation and then wonder why children cannot be still. Stillness needs its own space — a corner that is quiet by design, with a sightline to something alive.'}
                {activeRoom === 'wonder' && 'Magic doesn\'t happen by accident in a space — it is placed there deliberately. A tiny door in a large tree. A candle jar in the dark garden. A white flower that glows at dusk.'}
              </p>
            </div>

            {/* Room Navigation */}
            <div className="flex justify-between items-center py-4 border-t border-inkll/30">
              {roomIndex > 0 ? (
                <button
                  onClick={() => { setActiveRoom(rooms[roomIndex - 1].id); setSelectedBuild(null) }}
                  className="text-ember text-sm font-medium hover:underline"
                >
                  ← {rooms[roomIndex - 1].name}
                </button>
              ) : (
                <span></span>
              )}
              <p className="text-inkl text-xs">
                Room {roomIndex + 1} of 5
              </p>
              {roomIndex < rooms.length - 1 ? (
                <button
                  onClick={() => { setActiveRoom(rooms[roomIndex + 1].id); setSelectedBuild(null) }}
                  className="text-ember text-sm font-medium hover:underline"
                >
                  {rooms[roomIndex + 1].name} →
                </button>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Eco Products Section */}
      {(() => {
        const relevantProducts = ecoProducts.slice(0, 4)
        
        return (
          <div className="bg-parchment py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-ember text-xs font-medium uppercase tracking-widest mb-3">
                  Eco-Friendly Materials
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-ink italic mb-3">
                  Safe finishes for your {currentRoom.name}
                </h3>
                <p className="text-inkl text-sm max-w-lg mx-auto">
                  Every material in your Wild Room should be as thoughtful as the design. 
                  These certified low-VOC, non-toxic products keep the space safe for little hands and lungs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {relevantProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl p-4 border border-inkll/20 hover:border-ember transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-ember font-medium uppercase tracking-wider">{product.brand}</p>
                        <h4 className="font-serif text-lg text-ink">{product.name}</h4>
                      </div>
                      <span className="px-2 py-1 bg-blush text-ember text-xs rounded-full">{product.priceRange}</span>
                    </div>
                    <p className="text-inkl text-xs mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.certifications.slice(0, 2).map(cert => (
                        <span key={cert} className="px-2 py-0.5 bg-olive/10 text-olive text-xs rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {product.healthFlags.slice(0, 2).map(flag => (
                        <span key={flag} className="text-xs text-inkl">
                          • {flag.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/wilder-homes/eco-products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white text-sm font-medium rounded-full hover:bg-terra transition-colors"
                >
                  Browse all eco products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Final CTA */}
      <div className="bg-ink py-12 px-4 text-center">
        <h3 className="font-serif text-2xl text-white italic mb-4">
          Ready to design your Wild Room?
        </h3>
        <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
          Take the quiz to get a personalized Wild Room layout based on your space, budget, and children's ages.
        </p>
        <button className="px-8 py-3 bg-ember text-white font-medium rounded-full hover:bg-terra transition-colors">
          Design My Wild Room →
        </button>
      </div>
    </div>
  )
}
