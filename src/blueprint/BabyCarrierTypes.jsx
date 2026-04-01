import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const carrierTypes = [
  {
    id: 'soft-structured',
    name: 'Soft-Structured Carrier (SSC)',
    image: '/images/carriers/SSC.png',
    examples: ['Osprey Poco Soft Child Carrier', 'Chimparoo', 'Tula', 'LennyLamb'],
    bestFor: ['Hiking with toddlers', 'Long day hikes', 'Newborns through 4 years'],
    pros: [
      'Padded hip belt transfers weight to hips',
      'Adjustable for different sized kids',
      'Multiple pockets for gear',
      'Sun shade canopy often included',
      'Durable, trail-worthy construction',
      'Can nurse baby on-trail with some adjustment',
    ],
    cons: [
      'Heavier than wraps',
      'Bulkier to pack',
    ],
    ageRange: 'Birth - 4 years (up to 45 lbs)',
    weight: '2-5 lbs',
    babywearingTips: [
      'You should always be able to kiss baby\'s head (T.I.C.K.S. rule)',
      'Tight - snug fit | In view - face visible | Close - kissable | Keep chin off chest | Supported back',
      'Ensure baby\'s hips are in M-position (knees above bottom)',
      'Tighten waist belt first, then shoulder straps',
    ],
  },
  {
    id: 'frame-pack',
    name: 'Frame Hiking Pack',
    image: '/images/carriers/frame carrier.png',
    examples: ['Osprey Pixel', 'Deuter Kid Comfort Pro', 'Kelty PerfectFit', 'Gregory Marquette'],
    bestFor: ['Serious hikers', 'Long distances', 'Backpacking with baby', 'Babies 6+ months who sit well'],
    pros: [
      'Maximum weight distribution',
      'Can carry 40-50+ lbs total',
      'Built-in kickstand for easy loading',
      'Very comfortable for long periods',
      'Often includes weather protection',
    ],
    cons: [
      'Heaviest option (5-10 lbs)',
      'Expensive ($200-500)',
      'Takes practice to load/unload',
      'Cumbersome in tight spaces',
    ],
    ageRange: '6 months - 5 years',
    weight: '5-10 lbs',
  },
  {
    id: 'wrap',
    name: 'Wrap / Mei Tai',
    image: '/images/carriers/wrap.png',
    examples: ['LennyLamb', 'Artipoppe', 'Chimparoo Mei Tai', 'Didymos'],
    bestFor: ['Newborns & infants', 'Short walks', 'Narrow trails', 'Early hiking before baby sits'],
    pros: [
      'Tiny, lightweight, packs small',
      'Newborn to toddler in one carrier',
      'Allows breastfeeding discreetly',
      'Can share between caregivers easily',
      'Affordable',
    ],
    cons: [
      'Weight on shoulders only',
      'Takes practice to tie correctly',
      'Not ideal for long hikes',
      'No structural support',
    ],
    ageRange: 'Birth to 3-4 years',
    weight: '0.5-2 lbs',
    babywearingTips: [
      'You should always be able to kiss baby\'s head (T.I.C.K.S. rule)',
      'Tight - snug fit | In view - face visible | Close - kissable | Keep chin off chest | Supported back',
      'Practice tying at home before your first hike',
      'Keep wrap tension even on both shoulders',
      'Double-wrap for more support on longer hikes',
    ],
  },
]

const comparisonFeatures = [
  { name: 'Infant Compatible', key: 'infant' },
  { name: 'Toddler Compatible', key: 'toddler' },
  { name: 'Long Hikes (4+ hrs)', key: 'longHikes' },
  { name: 'Lightweight', key: 'lightweight' },
  { name: 'Affordable', key: 'affordable' },
  { name: 'Nursing Friendly', key: 'nursing' },
]

const featureRatings = {
  'soft-structured': { infant: true, toddler: true, longHikes: true, lightweight: false, affordable: false, nursing: true },
  'frame-pack': { infant: true, toddler: true, longHikes: true, lightweight: false, affordable: false, nursing: false },
  'wrap': { infant: true, toddler: true, longHikes: false, lightweight: true, affordable: true, nursing: true },
}

export default function BabyCarrierTypes() {
  const [selectedCarrier, setSelectedCarrier] = useState(null)
  const [viewMode, setViewMode] = useState('cards')

  const current = carrierTypes.find((c) => c.id === selectedCarrier)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-xl text-ink">Baby Carrier Types</h3>
          <p className="text-sm text-inkl">When to use each one</p>
        </div>
        <div className="flex gap-1 bg-parchment p-1 rounded-lg">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded text-xs font-sans transition-all ${viewMode === 'cards' ? 'bg-olive text-white' : 'text-inkl'}`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1 rounded text-xs font-sans transition-all ${viewMode === 'comparison' ? 'bg-olive text-white' : 'text-inkl'}`}
          >
            Compare
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {carrierTypes.map((carrier) => (
              <button
                key={carrier.id}
                onClick={() => setSelectedCarrier(selectedCarrier === carrier.id ? null : carrier.id)}
                className={`rounded-xl border-2 text-left transition-all overflow-hidden ${
                  selectedCarrier === carrier.id
                    ? 'border-olive bg-olive/5'
                    : 'border-inkll/20 hover:border-olive/50'
                }`}
              >
                <div className="aspect-[4/3] bg-cream relative">
                  <img 
                    src={carrier.image} 
                    alt={carrier.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentNode.classList.add('flex', 'items-center', 'justify-center')
                      e.target.parentNode.innerHTML = `<span class="text-4xl">🎒</span>`
                    }}
                  />
                </div>
                <div className="p-3">
                  <p className="font-sans text-sm font-medium text-ink">{carrier.name}</p>
                  <p className="text-xs text-inkl mt-1">{carrier.ageRange}</p>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-cream rounded-xl p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img 
                      src={current.image} 
                      alt={current.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-ink">{current.name}</h4>
                    <p className="text-sm text-inkl">Weight: {current.weight}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-ink mb-2">Examples:</p>
                  <div className="flex flex-wrap gap-1">
                    {current.examples.map((ex, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white rounded-full text-xs text-inkl">{ex}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-ink mb-2">Best For:</p>
                  <ul className="space-y-1">
                    {current.bestFor.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-inkl">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-olive mb-2">Pros</p>
                    <ul className="space-y-1">
                      {current.pros.slice(0, 3).map((p, i) => (
                        <li key={i} className="text-xs text-inkl">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ember mb-2">Cons</p>
                    <ul className="space-y-1">
                      {current.cons.slice(0, 2).map((c, i) => (
                        <li key={i} className="text-xs text-inkl">{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {current.babywearingTips && (
                  <div className="mt-4 pt-4 border-t border-inkll/20">
                    <p className="text-xs font-medium text-ink mb-2">Babywearing Best Practices</p>
                    <ul className="space-y-1">
                      {current.babywearingTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-inkl">
                          <span className="text-ember flex-shrink-0">👶</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr>
                <th className="text-left font-sans text-xs text-inkl p-2">Carrier</th>
                {comparisonFeatures.map((f) => (
                  <th key={f.key} className="text-center font-sans text-xs text-inkl p-2">{f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carrierTypes.map((carrier) => (
                <tr key={carrier.id} className="border-t border-inkll/10">
                  <td className="p-2">
                    <p className="font-sans text-xs font-medium text-ink whitespace-nowrap">{carrier.name.split(' ')[0]}</p>
                  </td>
                  {comparisonFeatures.map((f) => (
                    <td key={f.key} className="text-center p-2">
                      {featureRatings[carrier.id][f.key] ? (
                        <span className="text-olive text-sm">✓</span>
                      ) : (
                        <span className="text-inkll text-sm">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
