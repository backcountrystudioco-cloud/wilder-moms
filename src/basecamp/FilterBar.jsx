import { ageRanges, categories, locations } from '../BaseCamp/activities'

function FilterBar({ 
  selectedAge, 
  setSelectedAge, 
  selectedCategories, 
  setSelectedCategories, 
  selectedLocation, 
  setSelectedLocation 
}) {
  
  const handleAgeChange = (age) => {
    setSelectedAge(selectedAge === age ? '' : age)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleLocationChange = (location) => {
    setSelectedLocation(selectedLocation === location ? '' : location)
  }

  const hasActiveFilters = selectedAge || selectedCategories.length > 0 || selectedLocation

  const clearAllFilters = () => {
    setSelectedAge('')
    setSelectedCategories([])
    setSelectedLocation('')
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Nature': return 'bg-olive'
      case 'Arts': return 'bg-peach'
      case 'Physical': return 'bg-gold'
      case 'Educational': return 'bg-slate'
      default: return 'bg-blush'
    }
  }

  return (
    <div className="bg-blush/50 rounded-2xl p-4 mb-8">
      {/* Age Range Filters */}
      <div className="mb-4">
        <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Age Range</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {ageRanges.map(age => (
            <label
              key={age}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-sans text-sm cursor-pointer transition-all
                ${selectedAge === age 
                  ? 'bg-ember text-white' 
                  : 'bg-white text-ink hover:bg-blush'}
              `}
            >
              <input
                type="radio"
                name="age-range"
                value={age}
                checked={selectedAge === age}
                onChange={() => handleAgeChange(age)}
                className="sr-only"
              />
              {age}
            </label>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Category</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <label
              key={category}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-sans text-sm cursor-pointer transition-all
                ${selectedCategories.includes(category) 
                  ? 'bg-ember text-white' 
                  : `${getCategoryColor(category)} text-white hover:opacity-90`}
              `}
            >
              <input
                type="checkbox"
                name="category"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="sr-only"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Location Filters */}
      <div className="mb-4">
        <p className="font-sans text-sm text-inkl mb-2 uppercase tracking-wide">Location</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {locations.map(location => (
            <label
              key={location}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-sans text-sm cursor-pointer transition-all
                ${selectedLocation === location 
                  ? 'bg-ember text-white' 
                  : 'bg-white text-ink hover:bg-blush'}
              `}
            >
              <input
                type="radio"
                name="location"
                value={location}
                checked={selectedLocation === location}
                onChange={() => handleLocationChange(location)}
                className="sr-only"
              />
              {location}
            </label>
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="mt-2 px-4 py-2 font-sans text-sm text-ember underline hover:text-terra transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  )
}

export default FilterBar
