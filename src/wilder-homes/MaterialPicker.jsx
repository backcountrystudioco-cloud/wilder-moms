import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const allMaterials = [
  // Nature
  { id: 'sticks', label: 'Sticks', icon: '', category: 'nature' },
  { id: 'rocks', label: 'Rocks', icon: '', category: 'nature' },
  { id: 'leaves', label: 'Leaves', icon: '', category: 'nature' },
  { id: 'pinecones', label: 'Pinecones', icon: '', category: 'nature' },
  { id: 'acorns', label: 'Acorns', icon: '', category: 'nature' },
  { id: 'flowers', label: 'Flowers', icon: '', category: 'nature' },
  { id: 'mud', label: 'Mud', icon: '', category: 'nature' },
  { id: 'grass', label: 'Grass', icon: '', category: 'nature' },
  { id: 'water', label: 'Water', icon: '', category: 'nature' },
  { id: 'sand', label: 'Sand', icon: '', category: 'nature' },
  { id: 'dirt', label: 'Dirt', icon: '', category: 'nature' },
  // Recycling
  { id: 'cardboard', label: 'Cardboard', icon: '', category: 'recycling' },
  { id: 'tp-rolls', label: 'TP Rolls', icon: '', category: 'recycling' },
  { id: 'egg-cartons', label: 'Egg Cartons', icon: '', category: 'recycling' },
  { id: 'plastic-bottles', label: 'Plastic Bottles', icon: '', category: 'recycling' },
  { id: 'newspaper', label: 'Newspaper', icon: '', category: 'recycling' },
  { id: 'tin-cans', label: 'Tin Cans', icon: '', category: 'recycling' },
  // Craft
  { id: 'paper', label: 'Paper', icon: '', category: 'craft' },
  { id: 'tape', label: 'Tape', icon: '', category: 'craft' },
  { id: 'glue', label: 'Glue', icon: '', category: 'craft' },
  { id: 'scissors', label: 'Scissors', icon: '', category: 'craft' },
  { id: 'string', label: 'String', icon: '', category: 'craft' },
  { id: 'paint', label: 'Paint', icon: '', category: 'craft' },
  { id: 'markers', label: 'Markers', icon: '', category: 'craft' },
  { id: 'crayons', label: 'Crayons', icon: '', category: 'craft' },
  // Food/Nature
  { id: 'seeds', label: 'Seeds', icon: '', category: 'food' },
  { id: 'soil', label: 'Soil', icon: '', category: 'food' },
  { id: 'potting-soil', label: 'Potting Soil', icon: '', category: 'food' },
  { id: 'oats', label: 'Oats', icon: '', category: 'food' },
  { id: 'peanut-butter', label: 'Peanut Butter', icon: '', category: 'food' },
  { id: 'birdseed', label: 'Birdseed', icon: '', category: 'food' },
  { id: 'containers', label: 'Containers', icon: '', category: 'craft' },
  { id: 'buckets', label: 'Buckets', icon: '', category: 'nature' },
  { id: 'blankets', label: 'Blankets', icon: '', category: 'craft' },
  { id: 'pillows', label: 'Pillows', icon: '', category: 'craft' },
  { id: 'flashlights', label: 'Flashlights', icon: '', category: 'craft' },
  { id: 'snacks', label: 'Snacks', icon: '', category: 'food' },
  { id: 'blanket', label: 'Blanket', icon: '', category: 'nature' },
]

const categoryLabels = {
  nature: 'Nature',
  recycling: 'Recycling',
  craft: 'Craft',
  food: 'Food & Garden',
}

const categoryColors = {
  nature: 'bg-[#5A6428]/10 border-[#5A6428]/30',
  recycling: 'bg-slate/10 border-slate/30',
  craft: 'bg-ember/10 border-ember/30',
  food: 'bg-olive/10 border-olive/30',
}

// Normalize a material string to match our IDs
const normalizeMaterial = (material) => {
  if (!material) return null
  const lower = material.toLowerCase()
  
  if (lower.includes('stick')) return 'sticks'
  if (lower.includes('rock') || lower.includes('stone')) return 'rocks'
  if (lower.includes('leaf')) return 'leaves'
  if (lower.includes('pine cone') || lower.includes('pinecone')) return 'pinecones'
  if (lower.includes('acorn')) return 'acorns'
  if (lower.includes('flower') || lower.includes('petal')) return 'flowers'
  if (lower.includes('mud') || lower.includes('dirt')) return 'mud'
  if (lower.includes('grass')) return 'grass'
  if (lower.includes('water')) return 'water'
  if (lower.includes('sand')) return 'sand'
  if (lower.includes('cardboard')) return 'cardboard'
  if (lower.includes('toilet paper') || lower.includes('tp roll') || lower.includes('roll')) return 'tp-rolls'
  if (lower.includes('egg carton')) return 'egg-cartons'
  if (lower.includes('plastic bottle') || lower.includes('bottle')) return 'plastic-bottles'
  if (lower.includes('newspaper')) return 'newspaper'
  if (lower.includes('tin can') || lower.includes('can')) return 'tin-cans'
  if (lower.includes('paper')) return 'paper'
  if (lower.includes('tape')) return 'tape'
  if (lower.includes('glue')) return 'glue'
  if (lower.includes('scissor')) return 'scissors'
  if (lower.includes('string') || lower.includes('yarn')) return 'string'
  if (lower.includes('paint')) return 'paint'
  if (lower.includes('marker')) return 'markers'
  if (lower.includes('crayon')) return 'crayons'
  if (lower.includes('seed')) return 'seeds'
  if (lower.includes('soil') || lower.includes('potting soil')) return 'soil'
  if (lower.includes('oat')) return 'oats'
  if (lower.includes('peanut butter')) return 'peanut-butter'
  if (lower.includes('birdseed') || lower.includes('bird seed')) return 'birdseed'
  if (lower.includes('container')) return 'containers'
  if (lower.includes('bucket')) return 'buckets'
  if (lower.includes('blanket') || lower.includes('pillow')) return 'blankets'
  if (lower.includes('flashlight')) return 'flashlights'
  if (lower.includes('snack') || lower.includes('food')) return 'snacks'
  return null
}

export default function MaterialPicker({ selectedMaterials, onToggleMaterial, onClearAll }) {
  const [activeCategory, setActiveCategory] = useState('nature')

  const filteredMaterials = allMaterials.filter(m => m.category === activeCategory)

  const materialsByCategory = useMemo(() => {
    return allMaterials.reduce((acc, mat) => {
      if (!acc[mat.category]) acc[mat.category] = []
      acc[mat.category].push(mat)
      return acc
    }, {})
  }, [])

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl text-ink">What Do You Have?</h3>
          <p className="text-sm text-inkl">Select materials to find what you can build</p>
        </div>
        {selectedMaterials.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1 text-xs text-ember hover:bg-ember/10 rounded-full transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Selected Materials Chips */}
      {selectedMaterials.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-parchment/50 rounded-xl">
          {selectedMaterials.map(id => {
            const material = allMaterials.find(m => m.id === id)
            return (
              <motion.span
                key={id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-3 py-1.5 bg-ember text-white rounded-full text-sm flex items-center gap-1.5"
              >
                <span>{material?.icon}</span>
                <span>{material?.label}</span>
                <button 
                  onClick={() => onToggleMaterial(id)}
                  className="ml-1 hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </motion.span>
            )
          })}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-3 py-2 rounded-lg font-sans text-sm whitespace-nowrap transition-all ${
              activeCategory === key
                ? `${categoryColors[key]} border`
                : 'bg-parchment/50 text-inkl hover:bg-parchment'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Material Chips */}
      <div className="flex flex-wrap gap-2">
        {filteredMaterials.map(material => {
          const isSelected = selectedMaterials.includes(material.id)
          return (
            <button
              key={material.id}
              onClick={() => onToggleMaterial(material.id)}
              className={`px-3 py-2 rounded-xl font-sans text-sm flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-ember text-white'
                  : 'bg-parchment text-ink hover:bg-blush'
              }`}
            >
              <span>{material.icon}</span>
              <span>{material.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Helper function to get matched builds/activities
export function getMatchedItems(items, selectedMaterials) {
  if (!items || selectedMaterials.length === 0) return []

  const scored = items.map(item => {
    // Handle both formats: activities use materials: ['string'], builds use materials: [{name: 'string'}]
    const itemMaterials = (item.materials || []).map(mat => {
      if (typeof mat === 'string') return normalizeMaterial(mat)
      if (typeof mat === 'object' && mat.name) return normalizeMaterial(mat.name)
      return null
    }).filter(Boolean)

    const matchCount = itemMaterials.filter(m => selectedMaterials.includes(m)).length
    const missingMaterials = itemMaterials.filter(m => !selectedMaterials.includes(m))
    const hasAllMaterials = missingMaterials.length === 0 && itemMaterials.length > 0

    return {
      ...item,
      matchCount,
      missingMaterials,
      hasAllMaterials,
      matchPercentage: itemMaterials.length > 0 
        ? Math.round((matchCount / itemMaterials.length) * 100) 
        : 0,
      totalMaterials: itemMaterials.length,
    }
  })

  return scored
    .filter(a => a.matchCount > 0)
    .sort((a, b) => {
      if (a.hasAllMaterials && !b.hasAllMaterials) return -1
      if (!a.hasAllMaterials && b.hasAllMaterials) return 1
      return b.matchPercentage - a.matchPercentage
    })
}
