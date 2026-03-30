import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FilterBar from '../components/FilterBar'
import ActivityCard from '../components/ActivityCard'
import { activities } from '../data/activities'

function ActivitiesPage() {
  const [selectedAge, setSelectedAge] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Filter by age range
      if (selectedAge && activity.ageRange !== selectedAge) {
        return false
      }

      // Filter by categories (AND logic - must have all selected categories)
      if (selectedCategories.length > 0) {
        const hasAllCategories = selectedCategories.every(cat => 
          activity.categories.includes(cat)
        )
        if (!hasAllCategories) return false
      }

      // Filter by location
      if (selectedLocation) {
        if (selectedLocation === 'Indoor' && activity.indoor !== true) {
          return false
        }
        if (selectedLocation === 'Outdoor' && activity.indoor !== false) {
          return false
        }
        // 'Both' would pass both indoor=true and indoor=false
      }

      return true
    })
  }, [selectedAge, selectedCategories, selectedLocation])

  const hasActiveFilters = selectedAge || selectedCategories.length > 0 || selectedLocation

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page title */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Activities for Every Age
          </h1>
          <p className="font-sans text-inkl text-lg max-w-2xl">
            Discover nature-based adventures, creative crafts, and educational activities 
            for your family — filtered by age, category, and location.
          </p>
        </motion.header>

        {/* Filter Bar */}
        <FilterBar
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Results count */}
        <p className="font-sans text-sm text-inkl mb-4">
          {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
          {hasActiveFilters && ' (filtered)'}
        </p>

        {/* Activity Grid */}
        {filteredActivities.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blush rounded-2xl p-12 text-center"
          >
            <p className="font-serif text-2xl text-ink italic mb-4">
              No activities match your filters
            </p>
            <p className="font-sans text-inkl">
              Try adjusting your filters to see more activities, or clear all filters to start fresh.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ActivitiesPage
