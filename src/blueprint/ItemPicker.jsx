import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { packLists } from './packLists'

const allItems = [
  ...packLists.dayHikeEssentials.map(item => ({ item, category: 'Essentials', ages: [] })),
  ...packLists.hiking.flatMap(group => 
    group.items.map(item => ({ item, category: `Hiking - ${group.ageGroup}`, ages: [group.ageGroup] }))
  ),
  ...packLists.camping.flatMap(group =>
    group.items.map(item => ({ item, category: `Camping - ${group.ageGroup}`, ages: [group.ageGroup] }))
  ),
]

export default function ItemPicker({ onAddItems }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItems, setSelectedItems] = useState([])
  const [showPicker, setShowPicker] = useState(false)

  const categories = ['all', 'Essentials', 'Hiking', 'Camping']

  const filteredItems = useMemo(() => {
    return allItems.filter(({ item, category }) => {
      const matchesSearch = item.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || category.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const toggleItem = (itemName) => {
    setSelectedItems(prev =>
      prev.includes(itemName) ? prev.filter(i => i !== itemName) : [...prev, itemName]
    )
  }

  const handleAddSelected = () => {
    if (selectedItems.length > 0) {
      onAddItems(selectedItems)
      setSelectedItems([])
      setShowPicker(false)
      setSearch('')
    }
  }

  if (!showPicker) {
    return (
      <button
        onClick={() => setShowPicker(true)}
        className="w-full px-4 py-3 bg-olive/10 text-olive rounded-xl font-sans text-sm font-medium hover:bg-olive/20 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Browse & Add Items
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-inkll/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg text-ink">Browse All Items</h3>
        <button
          onClick={() => setShowPicker(false)}
          className="text-inkll hover:text-ink"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-inkll" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="w-full pl-10 pr-4 py-2.5 bg-cream rounded-xl font-sans text-sm text-ink placeholder:text-inkll/60 focus:outline-none focus:ring-2 focus:ring-olive/30"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Selected Count */}
      {selectedItems.length > 0 && (
        <div className="flex items-center justify-between mb-3 p-2 bg-olive/10 rounded-lg">
          <span className="text-sm text-olive font-sans font-medium">
            {selectedItems.length} selected
          </span>
          <button
            onClick={() => setSelectedItems([])}
            className="text-xs text-inkl hover:text-ink"
          >
            Clear
          </button>
        </div>
      )}

      {/* Items List */}
      <div className="max-h-64 overflow-y-auto space-y-1 mb-4">
        <AnimatePresence>
          {filteredItems.slice(0, 50).map(({ item }, idx) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.01 }}
              onClick={() => toggleItem(item)}
              className={`w-full p-3 rounded-lg text-left flex items-start gap-3 transition-colors ${
                selectedItems.includes(item)
                  ? 'bg-olive/10'
                  : 'hover:bg-cream'
              }`}
            >
              <span className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                selectedItems.includes(item)
                  ? 'bg-olive border-olive'
                  : 'border-inkll/30'
              }`}>
                {selectedItems.includes(item) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-inkl">{item}</span>
            </motion.button>
          ))}
        </AnimatePresence>
        {filteredItems.length === 0 && (
          <p className="text-center text-inkll py-8 text-sm">No items found</p>
        )}
        {filteredItems.length > 50 && (
          <p className="text-center text-inkll py-2 text-xs">
            Showing 50 of {filteredItems.length} items. Refine your search.
          </p>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddSelected}
        disabled={selectedItems.length === 0}
        className={`w-full py-3 rounded-xl font-sans font-medium transition-colors ${
          selectedItems.length > 0
            ? 'bg-ember text-white hover:bg-terra'
            : 'bg-blush/50 text-inkll cursor-not-allowed'
        }`}
      >
        Add {selectedItems.length > 0 ? `${selectedItems.length} Items` : 'Items'}
      </button>
    </motion.div>
  )
}
