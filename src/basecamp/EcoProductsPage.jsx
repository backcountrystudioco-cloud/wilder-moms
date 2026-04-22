import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import { ecoProducts } from './ecoProducts'

const categories = ['All', 'Paints & Finishes', 'Building Materials', 'Interiors']

const categoryColors = {
  'Paints & Finishes': 'bg-[#8C4A14]',
  'Building Materials': 'bg-[#5A6428]',
  'Interiors': 'bg-[#464F5F]'
}

export default function EcoProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = selectedCategory === 'All'
    ? ecoProducts
    : ecoProducts.filter(p => p.category === selectedCategory)

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
            Verified eco-friendly products for your home.
          </h1>
          <p className="text-inkl max-w-2xl mx-auto leading-relaxed text-lg">
            Every product here is verified for low-VOC emissions, sustainable sourcing, or both. 
            No greenwashing — just certifications we trust.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={1}
          className="flex gap-3 mb-10 overflow-x-auto pb-2"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={2}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl p-6 border border-inkll/10 shadow-sm"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${categoryColors[product.category]}`}>
                  {product.category}
                </span>
                <span className="text-inkll text-sm font-medium">
                  {product.priceRange}
                </span>
              </div>

              {/* Brand & Name */}
              <h3 className="font-serif text-xl text-ink mb-1">{product.name}</h3>
              <p className="text-inkll text-sm mb-3">{product.brand}</p>

              {/* Description */}
              <p className="text-inkl text-sm leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Eco Features */}
              <div className="mb-4">
                <p className="text-xs text-inkll font-medium uppercase tracking-wide mb-2">Why it's eco-friendly</p>
                <ul className="space-y-1">
                  {product.ecoFeatures.slice(0, 3).map((feature, i) => (
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

        {/* Footer Note */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={3}
          className="mt-12 text-center"
        >
          <p className="text-inkll text-sm max-w-xl mx-auto">
            All products verified for real eco-certifications. We avoid greenwashing by only listing 
            products with third-party verification like GREENGUARD, FSC, FloorScore, and LEED compliance.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
