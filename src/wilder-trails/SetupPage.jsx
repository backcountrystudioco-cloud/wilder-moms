import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWilderTrails } from './WilderTrailsContext'
import { useLocation } from '../hooks/useLocation'
import { useUser } from '../context/UserContext'

// Location presets
const locationPresets = [
  { name: 'Denver Metro', lat: 39.7392, lon: -104.9903, state: 'Colorado' },
  { name: 'Boulder', lat: 40.0150, lon: -105.2705, state: 'Colorado' },
  { name: 'Longmont', lat: 40.1672, lon: -105.1000, state: 'Colorado' },
  { name: 'Fort Collins', lat: 40.5853, lon: -105.0844, state: 'Colorado' },
  { name: 'Colorado Springs', lat: 38.8339, lon: -104.8214, state: 'Colorado' },
  { name: 'Estes Park (RMNP)', lat: 40.3772, lon: -105.5217, state: 'Colorado' },
  { name: 'Golden', lat: 39.7555, lon: -105.2211, state: 'Colorado' },
  { name: 'Seattle', lat: 47.6062, lon: -122.3321, state: 'Washington' },
  { name: 'Portland', lat: 45.5051, lon: -122.6750, state: 'Oregon' },
  { name: 'Bend', lat: 44.0582, lon: -121.3153, state: 'Oregon' },
  { name: 'Austin', lat: 30.2672, lon: -97.7431, state: 'Texas' },
  { name: 'Salt Lake City', lat: 40.7608, lon: -111.8910, state: 'Utah' },
  { name: 'Phoenix', lat: 33.4484, lon: -112.0740, state: 'Arizona' },
]

// Age options
const ageLabels = [
  { value: -1, label: 'Baby in carrier', desc: 'watch nap windows' },
  { value: 0, label: 'Baby/toddler', desc: 'paths for everyone' },
  { value: 2, label: 'Toddler', desc: '2-3 years' },
  { value: 4, label: 'Preschooler', desc: '4-5 years' },
  { value: 7, label: 'Elementary', desc: '6-7 years' },
  { value: 10, label: 'Pre-teen', desc: '8-12 years' },
]

// Time options
const timeLabels = [
  { value: 30, label: '30 min', desc: 'Quick outing' },
  { value: 60, label: '1 hour', desc: 'Standard' },
  { value: 90, label: '1.5 hours', desc: 'Longer trek' },
  { value: 120, label: '2+ hours', desc: 'Full day' },
]

// Special needs
const specialNeeds = [
  { key: 'needsStroller', label: 'Stroller needed' },
  { key: 'needsDog', label: 'Bringing dog' },
  { key: 'wantsWater', label: 'Want water features' },
  { key: 'needsRestrooms', label: 'Need restrooms' },
]

export default function SetupPage() {
  const navigate = useNavigate()
  const { updateLocation, updateFamilyInfo, updateTimeWindow, location, familyInfo, timeWindow } = useWilderTrails()
  const autoLocation = useLocation()
  const { children, youngestAge: profileYoungestAge } = useUser()
  
  const [manualLocation, setManualLocation] = useState(location?.name || null)
  
  // Combined form state
  const [formData, setFormData] = useState({
    ageGroups: familyInfo?.ageGroups ?? (profileYoungestAge !== undefined ? [profileYoungestAge] : [4]),
    numberOfKids: familyInfo?.numberOfKids ?? (children?.length || 1),
    needsStroller: familyInfo?.needsStroller ?? false,
    needsDog: familyInfo?.needsDog ?? false,
    wantsWater: familyInfo?.wantsWater ?? true,
    needsRestrooms: familyInfo?.needsRestrooms ?? true,
    timeWindow: timeWindow || 60,
  })
  
  const [isComplete, setIsComplete] = useState(false)
  
  // Check if setup is complete
  useEffect(() => {
    if (location?.city && formData.ageGroups.length > 0) {
      setIsComplete(true)
    } else {
      setIsComplete(false)
    }
  }, [location, formData.ageGroups])
  
  const handleSelectLocation = (preset) => {
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
        city: autoLocation.city || 'My Location',
        state: autoLocation.state || '',
        name: autoLocation.city || 'My Location',
      })
      setManualLocation(autoLocation.city || 'My Location')
    }
  }
  
  const handleTimeChange = (value) => {
    setFormData(prev => ({ ...prev, timeWindow: value }))
    updateTimeWindow(value)
  }
  
  const handleNext = () => {
    updateFamilyInfo({
      youngestAge: Math.min(...formData.ageGroups),
      ageGroups: formData.ageGroups,
      numberOfKids: formData.numberOfKids,
      needsStroller: formData.needsStroller,
      needsDog: formData.needsDog,
      wantsWater: formData.wantsWater,
      needsRestrooms: formData.needsRestrooms,
    })
    navigate('/wilder-trails/trails')
  }
  
  const handleAgeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      ageGroups: [value],
    }))
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            Let's find your trail
          </h1>
          <p className="font-sans text-inkl text-lg">
            Tell us a bit about your crew
          </p>
        </motion.div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-ember text-white flex items-center justify-center text-sm font-medium">1</span>
            Where are you exploring?
          </h2>
          
          {/* Auto-detect */}
          <button
            onClick={handleUseMyLocation}
            disabled={autoLocation.loading}
            className={`w-full p-4 mb-4 rounded-xl border-2 transition-all text-left ${
              manualLocation === autoLocation.city
                ? 'border-forest bg-forest/5'
                : 'border-inkll/20 hover:border-forest/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-ember/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <p className="font-sans font-medium text-ink">
                  {autoLocation.loading ? 'Detecting location...' : 'Use my location'}
                </p>
                {autoLocation.city && (
                  <p className="text-sm text-inkl">{autoLocation.city}, {autoLocation.state}</p>
                )}
              </div>
            </div>
          </button>
          
          <p className="text-center text-sm text-inkl mb-3">— or pick a city —</p>
          
          {/* Preset locations */}
          <div className="grid grid-cols-2 gap-2">
            {locationPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleSelectLocation(preset)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  manualLocation === preset.name
                    ? 'border-forest bg-forest/5'
                    : 'border-inkll/20 hover:border-forest/40'
                }`}
              >
                <p className="font-sans font-medium text-ink text-sm">{preset.name}</p>
                <p className="text-xs text-inkl">{preset.state}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Family Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-ember text-white flex items-center justify-center text-sm font-medium">2</span>
            Youngest adventurer?
          </h2>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {ageLabels.map((age) => (
              <button
                key={age.value}
                onClick={() => handleAgeChange(age.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  formData.ageGroups.includes(age.value)
                    ? 'border-forest bg-forest/5'
                    : 'border-inkll/20 hover:border-forest/40'
                }`}
              >
                <p className="font-sans font-medium text-ink text-sm">{age.label}</p>
                <p className="text-xs text-inkl">{age.desc}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Special Needs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-ember text-white flex items-center justify-center text-sm font-medium">3</span>
            Special needs?
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {specialNeeds.map((need) => (
              <button
                key={need.key}
                onClick={() => setFormData(prev => ({ ...prev, [need.key]: !prev[need.key] }))}
                className={`px-4 py-2 rounded-full border-2 font-sans text-sm transition-all ${
                  formData[need.key]
                    ? 'border-forest bg-forest text-white'
                    : 'border-inkll/20 hover:border-forest/40 text-ink'
                }`}
              >
                {need.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-ember text-white flex items-center justify-center text-sm font-medium">4</span>
            How much time do you have?
          </h2>
          
          <div className="grid grid-cols-4 gap-2">
            {timeLabels.map((time) => (
              <button
                key={time.value}
                onClick={() => handleTimeChange(time.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  formData.timeWindow === time.value
                    ? 'border-forest bg-forest/5'
                    : 'border-inkll/20 hover:border-forest/40'
                }`}
              >
                <p className="font-sans font-medium text-ink text-sm">{time.label}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Find Trails Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleNext}
            disabled={!isComplete}
            className={`w-full py-4 rounded-full font-sans font-medium text-lg transition-all ${
              isComplete
                ? 'bg-forest text-white hover:bg-forest/90'
                : 'bg-inkll/20 text-inkll cursor-not-allowed'
            }`}
          >
            Find my trails
            <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
