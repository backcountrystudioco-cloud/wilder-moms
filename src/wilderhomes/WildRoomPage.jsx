import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const spaceTypes = [
  { id: 'backyard', label: 'Backyard', icon: '🏡' },
  { id: 'porch', label: 'Porch/Patio', icon: '🪑' },
  { id: 'balcony', label: 'Balcony', icon: '🌿' },
  { id: 'indoor', label: 'Indoor Room', icon: '🏠' },
  { id: 'garden', label: 'Garden', icon: '🌻' },
]

const goals = [
  { id: 'play', label: 'Kids play area', icon: '🎮' },
  { id: 'garden', label: 'Growing things', icon: '🌱' },
  { id: 'sensory', label: 'Sensory play', icon: '👐' },
  { id: 'cozy', label: 'Cozy hideaway', icon: '🏕️' },
  { id: 'science', label: 'Nature exploration', icon: '🔬' },
]

const recommendations = {
  backyard: {
    play: ['Mud Kitchen Station', 'Balance Beam', 'Tire Climber', 'Water Play Station'],
    garden: ['Strawberry Pocket Garden', 'Pea Pod Frame', 'Tomato Tower', 'Bug Hotel'],
    sensory: ['Sand Table', 'Textured Path', 'Wind Chimes', 'Sensory Beds'],
    cozy: ['Fort Building Corner', 'Sheet Tunnel', 'Cozy Reading Nook', 'Hammock Space'],
    science: ['Rock Collection Display', 'Bird Watching Station', 'Weather Station', 'Pond Area'],
  },
  porch: {
    play: ['Mini Mud Kitchen', 'Water Wall', 'Activity Table', 'Chalk Board'],
    garden: ['Herb Window Box', 'Potted Gardens', 'Vertical Planter', 'Hanging Plants'],
    sensory: ['Wind Chimes', 'Texture Boards', 'Sound Garden', 'Scent Pots'],
    cozy: ['Cozy Corner Setup', 'Blanket Fort Space', 'Reading Nook', 'Bean Bag Zone'],
    science: ['Seed Starting Station', 'Bug Observation', 'Sun Dial', 'Rain Gauge'],
  },
  balcony: {
    play: ['Mini Activity Table', 'Finger Painting Station', 'Small Sand Box', 'Play Kitchen'],
    garden: ['Vertical Garden', 'Herb Pots', 'Hanging Baskets', 'Window Box'],
    sensory: ['Wind Mobiles', 'Texture Pots', 'Scent Garden', 'Sound Tubes'],
    cozy: ['Cushion Corner', 'Canopy Fort', 'Story Corner', 'Teepee'],
    science: ['Seed Growing', 'Plant Observation', 'Weather Watch', 'Bug Hotel Mini'],
  },
  indoor: {
    play: ['Sensory Table', 'Activity Wall', 'Construction Corner', 'Art Station'],
    garden: ['Windowsill Garden', 'Terrarium', 'Hydroponics', 'Sprouting Station'],
    sensory: ['Sensory Bins', 'Texture Wall', 'Calming Corner', 'Fidget Tools'],
    cozy: ['Fort Kit', 'Reading Nook', 'Canopy Tent', 'Cozy Cushions'],
    science: ['Nature Collections', 'Magnifying Station', 'Observation Journal', 'Craft Projects'],
  },
  garden: {
    play: ['Natural Play Structures', 'Log Climbers', 'Tire Stacks', 'Balance Rocks'],
    garden: ['Vegetable Beds', 'Butterfly Garden', 'Herb Spiral', 'Berry Patch'],
    sensory: ['Sensory Path', 'Textured Plants', 'Wind Chimes', 'Scent Garden'],
    cozy: ['Seating Area', 'Shade Structure', 'Fire Pit Circle', 'Hammock'],
    science: ['Pollinator Garden', 'Native Plants', 'Soil Testing', 'Wildlife Habitat'],
  },
}

const buildRecommendations = [
  { id: 'mud-kitchen-one-board', title: 'The One-Board Mud Kitchen', image: '/builds/mud kitchen.png' },
  { id: 'balance-beam', title: 'Balance Beam', image: '/builds/balance-beam.png' },
  { id: 'bug-hotel', title: 'Mason Bee Hotel', image: '/builds/bee.png' },
  { id: 'fort-sticks', title: 'Stick Fort', image: '/builds/fort-sticks.png' },
  { id: 'pocket-garden', title: 'Strawberry Pocket Garden', image: '/builds/strawberries.png' },
  { id: 'window-box', title: 'Herbs on the Porch', image: '/builds/herb.png' },
  { id: 'sheet-tunnel', title: 'Sheet Tunnel', image: '/builds/sheet-tunnel.png' },
  { id: 'bottle-bowl', title: 'Bottle Bowl', image: '/builds/bottle-bowl.png' },
]

export default function WildRoomPage() {
  const [step, setStep] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)
  const [spaceType, setSpaceType] = useState(null)
  const [selectedGoals, setSelectedGoals] = useState([])
  const [showResults, setShowResults] = useState(false)

  const toggleGoal = (goalId) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    )
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const getRecommendations = () => {
    const recs = []
    if (spaceType && selectedGoals.length > 0) {
      selectedGoals.forEach(goal => {
        const spaceRecs = recommendations[spaceType]?.[goal] || []
        spaceRecs.forEach(buildName => {
          const build = buildRecommendations.find(b => b.title.includes(buildName.split(' ')[0]) || buildName.includes(b.title.split(' ')[0]))
          if (build && !recs.find(r => r.id === build.id)) {
            recs.push(build)
          }
        })
      })
    }
    return recs.slice(0, 6)
  }

  const reset = () => {
    setStep(1)
    setSelectedImage(null)
    setSpaceType(null)
    setSelectedGoals([])
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/wilder-homes/environment" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
            ← Back to Environment
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">The Wild Room</h1>
          <p className="text-inkl text-lg">Take a photo of your space and get personalized ideas.</p>
        </motion.header>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-ember' : 'bg-inkll/20'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-8 border border-inkll/10"
        >
          {/* Step 1: Photo Upload */}
          {step === 1 && (
            <div className="text-center">
              <h2 className="font-serif text-2xl text-ink mb-4">Upload a photo of your space</h2>
              <p className="text-inkl mb-8">This helps us visualize what you're working with.</p>
              
              <div className="mb-8">
                <label className="block cursor-pointer">
                  <div className={`aspect-[4/3] rounded-2xl border-2 border-dashed ${
                    selectedImage ? 'border-ember bg-ember/5' : 'border-inkll/30 hover:border-ember/50'
                  } flex items-center justify-center overflow-hidden transition-colors`}>
                    {selectedImage ? (
                      <img src={selectedImage} alt="Your space" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-ember/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <svg className="w-8 h-8 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-ink font-medium">Click to upload a photo</p>
                        <p className="text-sm text-inkll">or drag and drop</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={() => setStep(2)}
                className="px-8 py-4 bg-ember text-white font-sans font-medium rounded-full hover:bg-terra transition-colors"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Space Type */}
          {step === 2 && (
            <div className="text-center">
              <h2 className="font-serif text-2xl text-ink mb-4">What kind of space is this?</h2>
              <p className="text-inkl mb-8">This helps us tailor our recommendations.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {spaceTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSpaceType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      spaceType === type.id
                        ? 'bg-ember text-white border-ember'
                        : 'bg-cream text-ink border-inkll/20 hover:border-ember/50'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">{type.icon}</span>
                    <span className="font-sans font-medium">{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 bg-cream text-ink font-sans font-medium rounded-full hover:bg-blush/50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!spaceType}
                  className="px-8 py-4 bg-ember text-white font-sans font-medium rounded-full hover:bg-terra transition-colors disabled:opacity-50"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && !showResults && (
            <div className="text-center">
              <h2 className="font-serif text-2xl text-ink mb-4">What do you want to create?</h2>
              <p className="text-inkl mb-8">Select all that apply. This helps us suggest the right projects.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedGoals.includes(goal.id)
                        ? 'bg-ember text-white border-ember'
                        : 'bg-cream text-ink border-inkll/20 hover:border-ember/50'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{goal.icon}</span>
                    <span className="font-sans text-sm font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-4 bg-cream text-ink font-sans font-medium rounded-full hover:bg-blush/50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setShowResults(true)}
                  disabled={selectedGoals.length === 0}
                  className="px-8 py-4 bg-ember text-white font-sans font-medium rounded-full hover:bg-terra transition-colors disabled:opacity-50"
                >
                  Get Ideas →
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl text-ink mb-4">Your Wilder Space Ideas</h2>
                <p className="text-inkl">
                  Based on your {spaceTypes.find(s => s.id === spaceType)?.label.toLowerCase()} and goals, here are some ideas to get you started:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {getRecommendations().map((build) => (
                  <Link
                    key={build.id}
                    to={`/wilder-homes/activities/${build.id}`}
                    className="block bg-cream rounded-xl overflow-hidden border border-inkll/10 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-blush/20 to-parchment relative">
                      {build.image && (
                        <img src={build.image} alt={build.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg text-ink mb-1">{build.title}</h3>
                      <p className="text-xs text-ember">View guide →</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <p className="text-inkl mb-4">Want more ideas for your space?</p>
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-cream text-ink font-sans font-medium rounded-full hover:bg-blush/50 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
