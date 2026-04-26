import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWilderTrails } from './WilderTrailsContext'
import { useUser } from '../context/UserContext'
import ProgressStepper from './ProgressStepper'

// Age options for youngest child
const ageLabels = [
  { value: -1, label: 'Baby in carrier', desc: 'no time limits' },
  { value: 0, label: 'Still in stroller', desc: 'flat paths needed' },
  { value: 2, label: 'Toddler', desc: '2-3 years old' },
  { value: 4, label: 'Preschooler', desc: '4-5 years old' },
  { value: 7, label: 'Elementary', desc: '6-7 years old' },
  { value: 10, label: 'Pre-teen', desc: '8-12 years old' },
  { value: 13, label: 'Teen', desc: '13+ years old' },
]

// Time window options
const timeLabels = [
  { value: 30, label: 'Quick outing', desc: '30 min or less' },
  { value: 60, label: 'Standard adventure', desc: 'About an hour' },
  { value: 90, label: 'Longer trek', desc: '1.5 hours' },
  { value: 120, label: 'Full expedition', desc: '2+ hours' },
]

// Today's vibe options
const vibeLabels = [
  { value: 'adventurous', label: 'Feeling adventurous' },
  { value: 'chill', label: 'Take it easy' },
  { value: 'justneedout', label: 'Just need to get outside' },
  { value: 'exploring', label: 'Explore something new' },
]

// Special needs options
const specialNeeds = [
  { key: 'needsStroller', label: 'Stroller needed' },
  { key: 'needsDog', label: 'Bringing our dog' },
  { key: 'wantsWater', label: 'Want to splash in water' },
  { key: 'needsRestrooms', label: 'Need restrooms nearby' },
]

export default function WhosComingPage() {
  const navigate = useNavigate()
  const { updateFamilyInfo, updateTimeWindow, updateVibe, familyInfo, timeWindow, vibe, location } = useWilderTrails()
  const { children, youngestAge: profileYoungestAge } = useUser()
  
  // Form state
  const [formData, setFormData] = useState({
    ageGroups: familyInfo?.ageGroups ?? (profileYoungestAge !== undefined ? [profileYoungestAge] : [4]),
    numberOfKids: familyInfo?.numberOfKids ?? (children?.length || 1),
    needsStroller: familyInfo?.needsStroller ?? false,
    needsDog: familyInfo?.needsDog ?? false,
    wantsWater: familyInfo?.wantsWater ?? true,
    needsRestrooms: familyInfo?.needsRestrooms ?? true,
  })
  
  const [selectedTime, setSelectedTime] = useState(timeWindow)
  const [selectedVibe, setSelectedVibe] = useState(vibe)
  
  // Update context when form changes
  const handleUpdateFamilyInfo = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }
  
  const handleTimeWindowChange = (value) => {
    setSelectedTime(value)
    updateTimeWindow(value)
  }
  
  const handleVibeChange = (value) => {
    setSelectedVibe(value)
    updateVibe(value)
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
      hasBabyInCarrier: formData.ageGroups.includes(-1),
    })
    navigate('/wilder-trails/trails')
  }
  
  const toggleAgeGroup = (ageValue) => {
    setFormData(prev => {
      const groups = prev.ageGroups.includes(ageValue)
        ? prev.ageGroups.filter(a => a !== ageValue)
        : [...prev.ageGroups, ageValue]
      return { ...prev, ageGroups: groups }
    })
  }
  
  const handleBack = () => {
    navigate('/wilder-trails/location')
  }

  // Calculate earliest possible start time based on current time
  const getEarliestStartTime = () => {
    const now = new Date()
    const hour = now.getHours()
    if (hour < 10) return 'Early morning'
    if (hour < 14) return 'Midday'
    if (hour < 17) return 'Late afternoon'
    return 'Evening'
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={2} />
        
        {/* Back button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-inkl hover:text-ember transition-colors font-sans text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to location
        </button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            Who's coming on this adventure?
          </h1>
          <p className="font-sans text-inkl text-lg max-w-md">
            Help us find the perfect trail for your crew. We'll use this to filter recommendations.
          </p>
        </motion.header>

        {/* Location context */}
        {location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-2 text-sm text-inkl"
          >
            <svg className="w-4 h-4 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Trails near <span className="text-ember font-medium">{location.city}</span>
          </motion.div>
        )}

        {/* Age Groups (multi-select) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-2">Who is joining you?</h2>
          <p className="font-sans text-sm text-inkl mb-4">Select all that apply</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ageLabels.map((age) => {
              const isSelected = formData.ageGroups.includes(age.value)
              return (
                <button
                  key={age.value}
                  onClick={() => toggleAgeGroup(age.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                    isSelected
                      ? 'bg-ember text-white border-ember'
                      : 'bg-white border-inkll/20 text-ink hover:border-ember'
                  }`}
                >
                  <span className="font-sans font-medium block">{age.label}</span>
                  <span className={`text-xs ${isSelected ? 'text-white/70' : 'text-inkl'}`}>
                    {age.desc}
                  </span>
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </motion.section>

        {/* Number of Kids */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4">How many kids?</h2>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleUpdateFamilyInfo({ numberOfKids: num })}
                className={`w-14 h-14 rounded-xl border-2 font-sans font-medium text-lg transition-all ${
                  formData.numberOfKids === num
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Time Window */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4">How much time do you have?</h2>
          <div className="grid grid-cols-2 gap-3">
            {timeLabels.map((time) => (
              <button
                key={time.value}
                onClick={() => handleTimeWindowChange(time.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedTime === time.value
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                <span className="font-sans font-medium block">{time.label}</span>
                <span className={`text-sm ${selectedTime === time.value ? 'text-white/70' : 'text-inkl'}`}>
                  {time.desc}
                </span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Today's Vibe */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-2 gap-3">
            {vibeLabels.map((v) => (
              <button
                key={v.value}
                onClick={() => handleVibeChange(v.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedVibe === v.value
                    ? 'bg-ember text-white border-ember'
                    : 'bg-white border-inkll/20 text-ink hover:border-ember'
                }`}
              >
                <span className="font-sans font-medium block">{v.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Special Needs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="font-serif text-xl text-ink mb-4">Any special requirements?</h2>
          <div className="grid grid-cols-2 gap-3">
            {specialNeeds.map((need) => (
              <button
                key={need.key}
                onClick={() => handleUpdateFamilyInfo({ [need.key]: !formData[need.key] })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData[need.key]
                    ? 'bg-olive text-white border-olive'
                    : 'bg-white border-inkll/20 text-ink hover:border-olive'
                }`}
              >
                <span className="font-sans font-medium block">{need.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleNext}
            className="w-full py-4 bg-ember text-white rounded-full font-sans font-medium text-lg hover:bg-terra transition-all shadow-lg shadow-ember/20"
          >
            Find our perfect trails →
          </button>
          
          <p className="text-center mt-3 font-sans text-sm text-inkl">
            Showing trails for{' '}
            <span className="text-ember font-medium">
              {formData.ageGroups.length} {formData.ageGroups.length === 1 ? 'age group' : 'age groups'}
            </span>
            {' '}•{' '}
            <span className="text-ember font-medium">{selectedTime} min</span>
            {' '}•{' '}
            <span className="text-ember font-medium">
              {formData.needsStroller ? 'stroller needed' : formData.needsDog ? 'dog-friendly' : 'family hike'}
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
