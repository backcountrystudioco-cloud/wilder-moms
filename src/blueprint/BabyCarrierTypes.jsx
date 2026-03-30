import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const carrierTypes = [
  {
    id: 'soft-structured',
    name: 'Soft-Structured Carrier (SSC)',
    icon: '🎒',
    examples: ['Osprey Poco', 'Deuter Kid Comfort', 'Chimparoo', 'Tula'],
    bestFor: ['Hiking with toddlers', 'Long day hikes', 'Children 1-4 years'],
    pros: [
      'Padded hip belt transfers weight to hips',
      'Adjustable for different sized kids',
      'Multiple pockets for gear',
      'Sun shade canopy often included',
      'Durable, trail-worthy construction',
    ],
    cons: [
      'Heavier than wraps or slings',
      'Child cannot nurse easily',
      'Bulkier to pack',
    ],
    ageRange: '6 months - 4 years (or until 40+ lbs)',
    weight: '4-7 lbs carrier only',
  },
  {
    id: 'frame-pack',
    name: 'Frame Hiking Pack',
    icon: '🎒',
    examples: ['Osprey Pixel', 'Deuter Kid Comfort Pro', 'Kelty PerfectFit', 'Gregory Marquette'],
    bestFor: ['Serious hikers', 'Long distances', 'Backpacking with baby', 'Babies 6+ months who sit well'],
    pros: [
      'Maximum weight distribution',
      'Can carry 40-50+ lbs total',
      'Built-in kickstand for easy loading',
      'Very comfortable for long periods',
      ' Often includes weather protection',
    ],
    cons: [
      'Heaviest option (5-10 lbs)',
      'Expensive ($200-500)',
      'Takes practice to load/unload',
      'Cumbersome in tight spaces',
    ],
    ageRange: '6 months - 5 years',
    weight: '5-10 lbs carrier only',
  },
  {
    id: 'wrap',
    name: 'Wrap / Mei Tai',
    icon: '🧣',
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
  },
  {
    id: 'harness-integrated',
    name: 'Harness-Style Carrier',
    icon: '🪢',
    examples: ['Osprey Eninja', 'Mountain Smith Quarter dome', 'Moby Wrap'],
    bestFor: ['Toddlers who want independence', 'Shorter, easier trails', 'Kids 2+ who walk most'],
    pros: [
      'Child can climb in/out independently',
      'Lightweight and simple',
      'Good backup when toddler gets tired',
      'Affordable',
    ],
    cons: [
      'No hip belt = all weight on shoulders',
      'Child limited to riding position only',
      'Not suitable for infants',
    ],
    ageRange: '2-5 years',
    weight: '1-3 lbs',
  },
  {
    id: 'hammock',
    name: 'Pop Top Hammock Carrier',
    icon: ' hammock',
    examples: ['Popzem Pop Top', 'Bumkins Aerie'],
    bestFor: ['Scenic viewpoints', 'Beach walks', 'Flat, wide trails', 'Kids who love hammocks'],
    pros: [
      'Unique and fun for kids',
      'Lightweight',
      'Can be used as regular hammock',
    ],
    cons: [
      'Limited trail capability',
      'Requires trees or posts',
      'Not for serious hiking',
      'Hard to find durable options',
    ],
    ageRange: '1-4 years',
    weight: '1-2 lbs',
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
  'soft-structured': { infant: true, toddler: true, longHikes: true, lightweight: false, affordable: false, nursing: false },
  'frame-pack': { infant: true, toddler: true, longHikes: true, lightweight: false, affordable: false, nursing: false },
  'wrap': { infant: true, toddler: true, longHikes: false, lightweight: true, affordable: true, nursing: true },
  'harness-integrated': { infant: false, toddler: true, longHikes: false, lightweight: true, affordable: true, nursing: false },
  'hammock': { infant: false, toddler: true, longHikes: false, lightweight: true, affordable: true, nursing: false },
}

export default function BabyCarrierTypes() {
  const [selectedCarrier, setSelectedCarrier] = useState(null)
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'comparison'

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {carrierTypes.map((carrier) => (
              <button
                key={carrier.id}
                onClick={() => setSelectedCarrier(selectedCarrier === carrier.id ? null : carrier.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedCarrier === carrier.id
                    ? 'border-olive bg-olive/5'
                    : 'border-inkll/20 hover:border-olive/50'
                }`}
              >
                <span className="text-2xl mb-2 block">{carrier.icon}</span>
                <p className="font-sans text-sm font-medium text-ink">{carrier.name}</p>
                <p className="text-xs text-inkl mt-1">{carrier.ageRange}</p>
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
                  <span className="text-3xl">{current.icon}</span>
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
                    <p className="text-xs font-medium text-olive mb-2">✓ Pros</p>
                    <ul className="space-y-1">
                      {current.pros.slice(0, 3).map((p, i) => (
                        <li key={i} className="text-xs text-inkl">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ember mb-2">✗ Cons</p>
                    <ul className="space-y-1">
                      {current.cons.slice(0, 2).map((c, i) => (
                        <li key={i} className="text-xs text-inkl">{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left font-sans text-xs text-inkl p-2">Carrier Type</th>
                {comparisonFeatures.map((f) => (
                  <th key={f.key} className="text-center font-sans text-xs text-inkl p-2 min-w-[80px]">{f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carrierTypes.map((carrier) => (
                <tr key={carrier.id} className="border-t border-inkll/10">
                  <td className="p-2">
                    <p className="font-sans text-xs font-medium text-ink">{carrier.icon} {carrier.name.split(' ')[0]}</p>
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
