import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWilderTrails } from './WilderTrailsContext'
import { useLocation } from '../hooks/useLocation'
import ProgressStepper from './ProgressStepper'

// Location presets
const locationPresets = [
  { name: 'Denver Metro', lat: 39.7392, lon: -104.9903, state: 'Colorado' },
  { name: 'Boulder', lat: 40.0150, lon: -105.2705, state: 'Colorado' },
  { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214, state: 'Colorado' },
  { name: 'Fort Collins', lat: 40.5853, lon: -105.0844, state: 'Colorado' },
  { name: 'Estes Park (RMNP)', lat: 40.3772, lon: -105.5217, state: 'Colorado' },
  { name: 'Golden', lat: 39.7555, lon: -105.2211, state: 'Colorado' },
  { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
  { name: 'Portland', lat: 45.5051, lon: -122.6750 },
  { name: 'Bend', lat: 44.0582, lon: -121.3153 },
  { name: 'Austin', lat: 30.2672, lon: -97.7431 },
  { name: 'Salt Lake City', lat: 40.7608, lon: -111.8910 },
  { name: 'Phoenix', lat: 33.4484, lon: -112.0740 },
]

export default function LocationPage() {
  const navigate = useNavigate()
  const { updateLocation, location: currentLocation, currentStep } = useWilderTrails()
  const autoLocation = useLocation()
  
  const [manualLocation, setManualLocation] = useState(currentLocation?.name || null)
  const [showPresets, setShowPresets] = useState(false)

  const handleSelectPreset = (preset) => {
    setManualLocation(preset.name)
    updateLocation({
      lat: preset.lat,
      lon: preset.lon,
      city: preset.name,
      state: preset.state || '',
      name: preset.name,
    })
  }

  const handleUseMyLocation = () => {
    if (autoLocation.lat && autoLocation.lon) {
      updateLocation({
        lat: autoLocation.lat,
        lon: autoLocation.lon,
        city: autoLocation.city || 'Your Location',
        state: autoLocation.state || '',
        name: autoLocation.city || 'My Location',
      })
      setManualLocation(autoLocation.city || 'My Location')
    }
  }

  const handleNext = () => {
    if (currentLocation) {
      navigate('/wilder-trails/whos-coming')
    }
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={1} />
        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            Where are you exploring?
          </h1>
          <p className="font-sans text-inkl text-lg max-w-md mx-auto">
            Tell us your area and we'll find trails perfect for your family's adventure today.
          </p>
        </motion.header>

        {/* Auto-detect Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <button
            onClick={handleUseMyLocation}
            disabled={autoLocation.loading}
            className="w-full p-6 bg-white rounded-2xl border-2 border-ember shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                autoLocation.loading 
                  ? 'bg-ember/10' 
                  : currentLocation?.name && !manualLocation
                    ? 'bg-olive/20' 
                    : 'bg-ember/10'
              }`}>
                {autoLocation.loading ? (
                  <div className="w-6 h-6 border-2 border-ember/30 border-t-ember rounded-full animate-spin" />
                ) : (
                  <svg className="w-7 h-7 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="font-serif text-xl text-ink group-hover:text-ember transition-colors">
                  {autoLocation.loading ? 'Finding your location...' : 'Use My Location'}
                </p>
                <p className="font-sans text-sm text-inkl">
                  {autoLocation.city 
                    ? `Current: ${autoLocation.city}` 
                    : autoLocation.error 
                      ? autoLocation.error
                      : 'Let us find trails near you'}
                </p>
              </div>
              <svg className="w-5 h-5 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-inkll/20" />
          <span className="font-sans text-sm text-inkl">or pick an area</span>
          <div className="flex-1 h-px bg-inkll/20" />
        </div>

        {/* Location Presets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="w-full p-4 bg-blush/40 rounded-xl flex items-center justify-between hover:bg-blush/60 transition-colors"
          >
            <span className="font-sans text-ink font-medium">
              {manualLocation ? `Selected: ${manualLocation}` : 'Choose from popular areas'}
            </span>
            <svg 
              className={`w-5 h-5 text-inkl transition-transform ${showPresets ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showPresets && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              {locationPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-4 rounded-xl border-2 font-sans text-sm text-center transition-all ${
                    manualLocation === preset.name
                      ? 'bg-ember text-white border-ember'
                      : 'bg-white border-inkll/20 text-ink hover:border-ember hover:bg-ember/5'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <button
            onClick={handleNext}
            disabled={!currentLocation}
            className={`w-full py-4 rounded-full font-sans font-medium text-lg transition-all shadow-lg ${
              currentLocation
                ? 'bg-ember text-white hover:bg-terra shadow-ember/20'
                : 'bg-inkll/20 text-inkll cursor-not-allowed'
            }`}
          >
            {currentLocation ? "Next: Who's Coming →" : 'Select a location to continue'}
          </button>
          
          {currentLocation && (
            <p className="text-center mt-3 font-sans text-sm text-inkl">
              Selected: <span className="text-ember font-medium">{currentLocation.city}</span>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
