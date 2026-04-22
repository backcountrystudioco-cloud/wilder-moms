import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import { 
  ecoProducts, 
  categories, 
  healthFilters, 
  useCaseLabels,
  getProductsByUseCase,
  getCompleteNurseryBundle,
  getCompletePlayroomBundle,
  getCompletePlaysetBundle
} from './ecoProducts'

const categoryColors = {
  'Paints & Finishes': 'bg-[#8C4A14]',
  'Building Materials': 'bg-[#5A6428]',
  'Interiors': 'bg-[#464F5F]',
  'Kids & Baby': 'bg-[#7B3E88]',
  'Furniture': 'bg-[#3D5A80]'
}

const difficultyLabels = {
  0: 'Ready to Play',
  1: 'Very Easy',
  2: 'Easy',
  3: 'Medium',
  4: 'Challenging',
  5: 'Pro Required'
}

const difficultyColors = {
  0: 'text-green-600 bg-green-50',
  1: 'text-green-600 bg-green-50',
  2: 'text-blue-600 bg-blue-50',
  3: 'text-yellow-600 bg-yellow-50',
  4: 'text-orange-600 bg-orange-50',
  5: 'text-red-600 bg-red-50'
}

const projectPathways = [
  { id: 'nursery', label: "I'm painting a nursery", icon: '🍼', color: 'bg-[#FFE4E1]' },
  { id: 'playset', label: "I'm building outdoor structures", icon: '🏗️', color: 'bg-[#E8F5E9]' },
  { id: 'playroom', label: "I'm furnishing a playroom", icon: '🎨', color: 'bg-[#E3F2FD]' },
  { id: 'child-bedroom', label: "I'm setting up a child's bedroom", icon: '🛏️', color: 'bg-[#FFF3E0]' },
  { id: 'mudroom', label: "I'm building a mudroom", icon: '🥾', color: 'bg-[#F1F8E9]' },
  { id: 'all', label: "I'm browsing everything", icon: '🔍', color: 'bg-cream' }
]

const bundles = {
  nursery: getCompleteNurseryBundle(),
  playset: getCompletePlaysetBundle(),
  playroom: getCompletePlayroomBundle()
}

export default function EcoProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedHealthFlags, setSelectedHealthFlags] = useState([])
  const [selectedUseCase, setSelectedUseCase] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showSmallBrandsOnly, setShowSmallBrandsOnly] = useState(false)
  const [showDIYOnly, setShowDIYOnly] = useState(false)
  const [compareList, setCompareList] = useState([])
  const [showCompareModal, setShowCompareModal] = useState(false)

  const filteredProducts = useMemo(() => {
    let products = ecoProducts

    // Project-based filter
    if (selectedProject && selectedProject !== 'all') {
      products = products.filter(p => 
        p.useCases && p.useCases.includes(selectedProject)
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      const catMap = {
        'Paints & Finishes': 'paints',
        'Building Materials': 'buildingMaterials',
        'Interiors': 'interiors',
        'Kids & Baby': 'kids',
        'Furniture': 'furniture'
      }
      products = products.filter(p => p.category === catMap[selectedCategory])
    }

    // Health flags filter
    if (selectedHealthFlags.length > 0) {
      products = products.filter(p => 
        p.healthFlags && selectedHealthFlags.every(flag => p.healthFlags.includes(flag))
      )
    }

    // Small brands filter
    if (showSmallBrandsOnly) {
      products = products.filter(p => p.smallBrand)
    }

    // DIY filter
    if (showDIYOnly) {
      products = products.filter(p => p.diyDifficulty <= 2)
    }

    return products
  }, [selectedCategory, selectedHealthFlags, selectedProject, showSmallBrandsOnly, showDIYOnly])

  const toggleHealthFlag = (flag) => {
    setSelectedHealthFlags(prev => 
      prev.includes(flag) 
        ? prev.filter(f => f !== flag)
        : [...prev, flag]
    )
  }

  const toggleCompare = (product) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id)
      }
      if (prev.length >= 4) return prev
      return [...prev, product]
    })
  }

  const getCertBadges = (certifications) => {
    return certifications.map(cert => (
      <span
        key={cert}
        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest"
      >
        {cert}
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={0}
          className="text-center mb-8 pt-8"
        >
          <p className="text-inkll text-xs font-medium uppercase tracking-widest mb-4">
            THE BASE CAMP · ECO PRODUCTS
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-ember leading-tight mb-6">
            Build healthy. Build eco.
          </h1>
          <p className="text-inkl max-w-2xl mx-auto leading-relaxed text-lg">
            Every product verified for low-VOC emissions, sustainable sourcing, or third-party certifications. 
            No greenwashing — just certifications we trust.
          </p>
        </motion.div>

        {/* Project Pathways - Start Here */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={1}
          className="mb-8"
        >
          <p className="text-inkll text-sm font-medium uppercase tracking-wide mb-3">Start Here — What are you building?</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {projectPathways.map(pathway => (
              <button
                key={pathway.id}
                onClick={() => {
                  setSelectedProject(pathway.id)
                  setSelectedCategory('All')
                }}
                className={`
                  flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all
                  ${selectedProject === pathway.id 
                    ? 'border-ember bg-white shadow-lg' 
                    : 'border-inkll/10 bg-white hover:border-ember/30'
                  }
                `}
              >
                <span className="text-xl">{pathway.icon}</span>
                <span className="font-sans text-sm font-medium text-ink whitespace-nowrap">{pathway.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quick Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={2}
          className="flex flex-wrap gap-3 mb-6"
        >
          {/* Health Filters */}
          <div className="flex items-center gap-2">
            <span className="text-inkll text-xs font-medium">Health:</span>
            {healthFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => toggleHealthFlag(filter.id)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${selectedHealthFlags.includes(filter.id)
                    ? `bg-${filter.color}/20 text-${filter.color} border border-${filter.color}/30`
                    : 'bg-white text-inkll border border-inkll/10 hover:border-inkll/30'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Special Filters */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setShowSmallBrandsOnly(!showSmallBrandsOnly)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1
                ${showSmallBrandsOnly
                  ? 'bg-[#5A6428] text-white' 
                  : 'bg-white text-inkll border border-inkll/10 hover:border-inkll/30'
                }
              `}
            >
              {showSmallBrandsOnly && '✓'} 🏪 Small Brands
            </button>
            <button
              onClick={() => setShowDIYOnly(!showDIYOnly)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1
                ${showDIYOnly
                  ? 'bg-[#8C4A14] text-white' 
                  : 'bg-white text-inkll border border-inkll/10 hover:border-inkll/30'
                }
              `}
            >
              {showDIYOnly && '✓'} 🔧 DIY Friendly
            </button>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={3}
          className="flex gap-3 mb-8 overflow-x-auto pb-2"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setSelectedProject(null)
              }}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all
                ${selectedCategory === category
                  ? 'bg-ember text-white shadow-lg shadow-ember/20'
                  : `${categoryColors[category] || 'bg-inkll/20'} text-white`
                }
              `}
            >
              {category}
            </button>
          ))}
          <span className="text-inkll text-sm self-center ml-2">
            {filteredProducts.length} products
          </span>
          {compareList.length > 0 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="ml-auto px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium flex items-center gap-2"
            >
              Compare ({compareList.length})
            </button>
          )}
        </motion.div>

        {/* Complete Your Project Bundles */}
        <AnimatePresence>
          {selectedProject && selectedProject !== 'all' && bundles[selectedProject] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-white rounded-2xl p-6 border border-inkll/10"
            >
              <h3 className="font-serif text-xl text-ink mb-4">Complete Your {useCaseLabels[selectedProject] || 'Project'} Bundle</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(bundles[selectedProject]).map(([key, product]) => (
                  product && (
                    <div key={key} className="flex items-center gap-3 p-3 bg-cream rounded-xl">
                      <div className="w-12 h-12 bg-ember/10 rounded-full flex items-center justify-center text-ember text-xl">
                        {key === 'paint' && '🎨'}
                        {key === 'floor' && '🏗️'}
                        {key === 'mattress' && '🛏️'}
                        {key === 'purifier' && '💨'}
                        {key === 'lighting' && '💡'}
                        {key === 'toys' && '🧸'}
                        {key === 'lumber' && '🪵'}
                        {key === 'finish' && '✨'}
                        {key === 'flooring' && '🪵'}
                        {key === 'furniture' && '🪑'}
                      </div>
                      <div>
                        <p className="text-xs text-inkll uppercase">{key}</p>
                        <p className="font-medium text-ink text-sm">{product.name}</p>
                        <p className="text-xs text-ember">{product.brand}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={4}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl p-6 border border-inkll/10 shadow-sm relative"
            >
              {/* Compare Checkbox */}
              <button
                onClick={() => toggleCompare(product)}
                className={`
                  absolute top-4 right-4 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                  ${compareList.find(p => p.id === product.id)
                    ? 'bg-ember border-ember text-white'
                    : 'border-inkll/30 bg-white hover:border-ember'
                  }
                `}
              >
                {compareList.find(p => p.id === product.id) && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${categoryColors[product.category] || 'bg-inkll'}`}>
                  {product.category}
                </span>
                <span className="text-inkll text-sm font-medium">
                  {product.priceRange}
                </span>
              </div>

              {/* Brand & Name */}
              <h3 className="font-serif text-xl text-ink mb-1">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-inkll text-sm">{product.brand}</p>
                {product.smallBrand && (
                  <span className="text-xs bg-[#5A6428]/10 text-[#5A6428] px-2 py-0.5 rounded-full">🏪 Small Brand</span>
                )}
                {product.womenOwned && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">👩 Owned</span>
                )}
              </div>

              {/* Description */}
              <p className="text-inkl text-sm leading-relaxed mb-3">
                {product.description}
              </p>

              {/* Use Cases */}
              {product.useCases && product.useCases.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.useCases.slice(0, 3).map(uc => (
                    <span key={uc} className="text-xs bg-cream text-inkll px-2 py-0.5 rounded">
                      {useCaseLabels[uc] || uc}
                    </span>
                  ))}
                </div>
              )}

              {/* DIY Difficulty */}
              {product.diyDifficulty !== undefined && (
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-3 ${difficultyColors[product.diyDifficulty]}`}>
                  <span>{product.diyDifficulty <= 2 ? '🔧' : '⚙️'}</span>
                  {difficultyLabels[product.diyDifficulty]}
                </div>
              )}

              {/* Health Flags */}
              {product.healthFlags && product.healthFlags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.healthFlags.map(flag => (
                    <span key={flag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      ✓ {flag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              )}

              {/* Eco Features */}
              <div className="mb-4">
                <p className="text-xs text-inkll font-medium uppercase tracking-wide mb-2">Why it's eco</p>
                <ul className="space-y-1">
                  {product.ecoFeatures.slice(0, 2).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-inkl">
                      <span className="text-forest mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="mb-4 flex flex-wrap gap-1">
                {getCertBadges(product.certifications)}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-3 border-t border-inkll/10">
                <a
                  href={product.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ember hover:text-terra font-medium flex items-center gap-1"
                >
                  Website
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                {product.links.purchase && (
                  <a
                    href={product.links.purchase}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ember hover:text-terra font-medium flex items-center gap-1"
                  >
                    Where to Buy
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-ink italic mb-2">No products match your filters</p>
            <p className="text-inkl">Try adjusting your health flags or project type</p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSelectedHealthFlags([])
                setSelectedProject(null)
                setShowSmallBrandsOnly(false)
                setShowDIYOnly(false)
              }}
              className="mt-4 text-ember font-medium hover:text-terra"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Footer Note */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={5}
          className="mt-12 text-center"
        >
          <p className="text-inkll text-sm max-w-xl mx-auto">
            All products verified for real eco-certifications. We avoid greenwashing by only listing 
            products with third-party verification like GREENGUARD, FSC, FloorScore, and LEED compliance.
          </p>
        </motion.div>
      </div>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCompareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-ink">Compare Products</h2>
                <button onClick={() => setShowCompareModal(false)} className="text-inkll hover:text-ink">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left font-medium text-inkll p-2">Feature</th>
                      {compareList.map(p => (
                        <th key={p.id} className="text-left p-2 font-serif text-lg text-ink">{p.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2 text-inkll font-medium">Brand</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-2 text-inkl">{p.brand}</td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-inkll font-medium">Category</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-2 text-inkl">{p.category}</td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-inkll font-medium">Price</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-2 text-inkl font-medium">{p.priceRange}</td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-inkll font-medium">DIY Difficulty</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-2 text-inkl">
                          {p.diyDifficulty !== undefined ? difficultyLabels[p.diyDifficulty] : 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-inkll font-medium">Health Flags</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-2 text-inkl">
                          {p.healthFlags ? p.healthFlags.join(', ') : 'None'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-inkll font-medium">Certifications</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-2 text-inkl">
                          {p.certifications.join(', ')}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-inkll font-medium">Small Brand</td>
                      {compareList.map(p => (
                        <td key={p.id} className="p-2 text-inkl">{p.smallBrand ? '✓ Yes' : 'No'}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="px-6 py-2 rounded-full border border-inkll/20 text-inkl hover:bg-cream transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setCompareList([])}
                  className="px-6 py-2 rounded-full bg-ember text-white hover:bg-terra transition-colors"
                >
                  Clear Comparison
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
