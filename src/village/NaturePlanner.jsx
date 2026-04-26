import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hikes } from '../wilder-trails/hikes'
import { crafts } from '../basecamp/crafts'
import { builds } from '../basecamp/builds'

const STORAGE_KEY = 'nature-planner-state'

// ============ UTILITY FUNCTIONS ============

// Approximate driving speed categories (miles per hour)
const DRIVING_SPEEDS = {
  15: 25,  // city traffic
  30: 35,  // suburban mixed
  45: 45   // highway
}

// Haversine formula for distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Estimate driving time based on distance
const estimateDrivingTime = (distanceMiles) => {
  // Assume average 30 mph for suburban areas
  const avgSpeed = 30
  return Math.round((distanceMiles / avgSpeed) * 60) // returns minutes
}

// Parse age range from string like "3-8" or "6+"
const parseAgeRange = (ageRange) => {
  if (!ageRange) return { min: 0, max: 99 }
  if (ageRange.includes('+')) {
    const min = parseInt(ageRange.replace('+', ''))
    return { min, max: 99 }
  }
  const [min, max] = ageRange.split('-').map(n => parseInt(n))
  return { min: min || 0, max: max || 99 }
}

// Get driving radius options
const RADIUS_OPTIONS = [
  { value: 15, label: '15 min', description: 'Quick outing nearby' },
  { value: 30, label: '30 min', description: 'Short drive' },
  { value: 45, label: '45 min', description: 'Willing to drive further' }
]

// Time availability options
const TIME_OPTIONS = [
  { value: 60, label: 'Quick outing', sublabel: '~1 hour', icon: '' },
  { value: 180, label: 'Half day', sublabel: '2-3 hours', icon: '' },
  { value: 360, label: 'Full adventure', sublabel: '4-6 hours', icon: '' }
]

// Age range options
const AGE_OPTIONS = [
  { value: '2-4', label: 'Toddlers', icon: '' },
  { value: '4-7', label: 'Little kids', icon: '' },
  { value: '7-10', label: 'Big kids', icon: '' },
  { value: '10+', label: 'Pre-teens', icon: '' }
]

// Get seasonal title based on month
const getSeasonalTitle = () => {
  const month = new Date().getMonth()
  const day = new Date().getDate()
  
  // Northern hemisphere seasons
  if (month >= 2 && month <= 4) {
    const springTitles = [
      "Perfect spring weekend ahead",
      "Spring adventures await",
      "Let's find spring magic",
      "Fresh air & new growth"
    ]
    return springTitles[Math.floor(Math.random() * springTitles.length)]
  }
  if (month >= 5 && month <= 7) {
    const summerTitles = [
      "Summer weekends are for adventures",
      "Long days, more exploring",
      "Make it a summer to remember",
      "Sunshine & trail time"
    ]
    return summerTitles[Math.floor(Math.random() * summerTitles.length)]
  }
  if (month >= 8 && month <= 10) {
    const fallTitles = [
      "Fall: the perfect hiking weather",
      "Crunch through autumn adventures",
      "Cozy weekend explorations",
      "Fall colors await"
    ]
    return fallTitles[Math.floor(Math.random() * fallTitles.length)]
  }
  const winterTitles = [
    "Winter wanderings",
    "Cold days, warm memories",
    "Bundle up and explore",
    "Winter wonder weekends"
  ]
  return winterTitles[Math.floor(Math.random() * winterTitles.length)]
}

// Shuffle array helper
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Filter hikes by age and time
const filterHikes = (hikesList, youngestAge, oldestAge, availableMinutes) => {
  return hikesList.filter(hike => {
    // Age filter
    const hikeAge = parseAgeRange(hike.ageRange)
    if (youngestAge < hikeAge.min || oldestAge > hikeAge.max) {
      return false
    }
    // Time filter (available minutes must cover hike duration)
    if (hike.duration > availableMinutes) {
      return false
    }
    return true
  })
}

// Filter crafts by age
const filterCrafts = (craftsList, youngestAge, oldestAge) => {
  return craftsList.filter(craft => {
    const craftAge = parseAgeRange(craft.ageRange)
    return youngestAge >= craftAge.min && oldestAge <= craftAge.max
  })
}

// Filter builds by age and time
const filterBuilds = (buildsList, youngestAge, oldestAge) => {
  return buildsList.filter(build => {
    const buildAge = parseAgeRange(build.ageRange)
    if (youngestAge < buildAge.min || oldestAge > buildAge.max) {
      return false
    }
    // Parse time estimate like "30 minutes" or "1 hour"
    const timeMatch = build.timeEstimate.match(/(\d+)/)
    if (timeMatch) {
      const buildMinutes = build.timeEstimate.includes('hour') 
        ? parseInt(timeMatch[1]) * 60 
        : parseInt(timeMatch[1])
      if (buildMinutes > 120) return false // Max 2 hours for weekend build
    }
    return true
  })
}

// Get activity tagline
const getHikeTagline = (hike) => {
  const taglines = [
    `Beautiful ${hike.region} adventure`,
    `${hike.difficulty} trail with ${hike.distanceLabel}`,
    hike.description.split('.')[0],
    `${hike.distanceLabel} of wonder awaits`
  ]
  return taglines[Math.floor(Math.random() * taglines.length)]
}

// Get add-on tagline
const getAddonTagline = (type) => {
  if (type === 'craft') {
    return "Quick craft to extend the fun"
  }
  return "Weekend project to build together"
}

// ============ COMPONENT ============

const NaturePlanner = () => {
  // State
  const [step, setStep] = useState(1) // 1: location, 2: time, 3: ages, 4: results
  const [location, setLocation] = useState(null) // { lat, lon } or null
  const [locationMethod, setLocationMethod] = useState(null) // 'geolocation' or 'zip'
  const [zipCode, setZipCode] = useState('')
  const [drivingRadius, setDrivingRadius] = useState(30)
  const [availableTime, setAvailableTime] = useState(180)
  const [youngestAge, setYoungestAge] = useState(4)
  const [oldestAge, setOldestAge] = useState(8)
  const [weekendPlan, setWeekendPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load saved location preferences
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.location) {
          setLocation(parsed.location)
          setLocationMethod(parsed.locationMethod || 'zip')
        }
        if (parsed.drivingRadius) setDrivingRadius(parsed.drivingRadius)
        if (parsed.availableTime) setAvailableTime(parsed.availableTime)
        if (parsed.youngestAge) setYoungestAge(parsed.youngestAge)
        if (parsed.oldestAge) setOldestAge(parsed.oldestAge)
      } catch (e) {
        console.warn('Failed to load saved preferences')
      }
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    const state = {
      location,
      locationMethod,
      drivingRadius,
      availableTime,
      youngestAge,
      oldestAge
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [location, locationMethod, drivingRadius, availableTime, youngestAge, oldestAge])

  // Handle geolocation request
  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
        setLocationMethod('geolocation')
        setIsLoading(false)
        setStep(2)
      },
      (err) => {
        setError('Unable to get your location. Please enter a zip code.')
        setIsLoading(false)
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  // Handle zip code submission - approximate zip to coordinates
  const handleZipSubmit = () => {
    if (zipCode.length < 5) {
      setError('Please enter a valid 5-digit zip code')
      return
    }

    // Common zip code coordinates (major US cities/regions)
    // In production, you'd use a zip code API
    const zipCoords = {
      // Washington/Seattle area
      '98001': { lat: 47.3543, lon: -122.3124 },
      '98002': { lat: 47.3083, lon: -122.2065 },
      '98003': { lat: 47.2633, lon: -122.4633 },
      '98101': { lat: 47.6101, lon: -122.3351 },
      '98102': { lat: 47.6397, lon: -122.3210 },
      '98103': { lat: 47.6693, lon: -122.3436 },
      '98105': { lat: 47.6635, lon: -122.2971 },
      '98106': { lat: 47.5303, lon: -122.3555 },
      '98107': { lat: 47.6701, lon: -122.3943 },
      '98108': { lat: 47.5438, lon: -122.3112 },
      '98109': { lat: 47.6278, lon: -122.3466 },
      '98112': { lat: 47.6308, lon: -122.3005 },
      '98115': { lat: 47.6809, lon: -122.3013 },
      '98116': { lat: 47.5611, lon: -122.3964 },
      '98117': { lat: 47.6863, lon: -122.3724 },
      '98118': { lat: 47.5458, lon: -122.2705 },
      '98119': { lat: 47.6376, lon: -122.3625 },
      '98122': { lat: 47.6102, lon: -122.3007 },
      '98125': { lat: 47.7211, lon: -122.2972 },
      '98133': { lat: 47.7377, lon: -122.3438 },
      '98144': { lat: 47.5800, lon: -122.2947 },
      '98146': { lat: 47.5014, lon: -122.3632 },
      '98166': { lat: 47.4532, lon: -122.3451 },
      '98168': { lat: 47.4801, lon: -122.2965 },
      '98177': { lat: 47.7461, lon: -122.3746 },
      '98178': { lat: 47.5013, lon: -122.2425 },
      '98052': { lat: 47.6810, lon: -122.1200 },
      '98053': { lat: 47.6478, lon: -122.0514 },
      '98055': { lat: 47.4637, lon: -122.2088 },
      '98056': { lat: 47.5153, lon: -122.1817 },
      '98058': { lat: 47.4412, lon: -122.1208 },
      '98059': { lat: 47.5000, lon: -122.1093 },
      '98070': { lat: 47.4132, lon: -122.4643 },
      '98072': { lat: 47.7742, lon: -122.1284 },
      '98074': { lat: 47.6278, lon: -122.0565 },
      '98075': { lat: 47.5840, lon: -122.0235 },
      '98198': { lat: 47.3967, lon: -122.3093 },
      // Oregon/Portland area
      '97035': { lat: 45.4373, lon: -122.7016 },
      '97080': { lat: 45.4773, lon: -122.3859 },
      '97124': { lat: 45.5368, lon: -122.9856 },
      '97201': { lat: 45.5155, lon: -122.7004 },
      '97202': { lat: 45.4790, lon: -122.6388 },
      '97203': { lat: 45.5902, lon: -122.7420 },
      '97204': { lat: 45.5208, lon: -122.6764 },
      '97205': { lat: 45.5269, lon: -122.7004 },
      '97206': { lat: 45.4813, lon: -122.5986 },
      '97209': { lat: 45.5292, lon: -122.6876 },
      '97210': { lat: 45.5372, lon: -122.7200 },
      '97211': { lat: 45.5633, lon: -122.6422 },
      '97212': { lat: 45.5482, lon: -122.6441 },
      '97213': { lat: 45.5357, lon: -122.6047 },
      '97214': { lat: 45.5128, lon: -122.6416 },
      '97215': { lat: 45.5118, lon: -122.5985 },
      '97216': { lat: 45.5258, lon: -122.5784 },
      '97217': { lat: 45.5672, lon: -122.6473 },
      '97218': { lat: 45.5626, lon: -122.5941 },
      '97219': { lat: 45.4557, lon: -122.6717 },
      '97220': { lat: 45.5559, lon: -122.5644 },
      '97221': { lat: 45.5003, lon: -122.7128 },
      '97222': { lat: 45.4407, lon: -122.6432 },
      '97223': { lat: 45.4395, lon: -122.7809 },
      '97224': { lat: 45.4109, lon: -122.7625 },
      '97225': { lat: 45.5003, lon: -122.7784 },
      '97229': { lat: 45.5575, lon: -122.7819 },
      '97230': { lat: 45.5425, lon: -122.5018 },
      '97231': { lat: 45.5822, lon: -122.7873 },
      '97232': { lat: 45.5292, lon: -122.6287 },
      '97301': { lat: 44.9334, lon: -123.0256 },
      '97302': { lat: 44.9254, lon: -122.9966 },
      '97303': { lat: 44.9532, lon: -123.0461 },
      '97333': { lat: 44.5516, lon: -123.2627 },
      '97355': { lat: 44.4267, lon: -122.5889 },
      // Colorado/Denver area
      '80010': { lat: 39.7395, lon: -104.8310 },
      '80011': { lat: 39.7327, lon: -104.7639 },
      '80012': { lat: 39.7295, lon: -104.7940 },
      '80013': { lat: 39.7013, lon: -104.7722 },
      '80014': { lat: 39.6958, lon: -104.8389 },
      '80015': { lat: 39.6383, lon: -104.7727 },
      '80016': { lat: 39.6073, lon: -104.8097 },
      '80017': { lat: 39.6699, lon: -104.7784 },
      '80018': { lat: 39.6900, lon: -104.7005 },
      '80019': { lat: 39.7863, lon: -104.7540 },
      '80020': { lat: 39.9285, lon: -105.0745 },
      '80021': { lat: 39.8878, lon: -105.1361 },
      '80022': { lat: 39.8716, lon: -104.8889 },
      '80023': { lat: 39.9627, lon: -105.0768 },
      '80024': { lat: 39.8367, lon: -105.0836 },
      '80025': { lat: 39.9068, lon: -105.2400 },
      '80026': { lat: 39.9970, lon: -105.0863 },
      '80027': { lat: 39.9638, lon: -105.1505 },
      '80028': { lat: 39.8633, lon: -104.9669 },
      '80030': { lat: 39.8428, lon: -105.0381 },
      '80031': { lat: 39.8623, lon: -105.0066 },
      '80033': { lat: 39.7941, lon: -105.0435 },
      '80034': { lat: 39.7743, lon: -105.0231 },
      '80102': { lat: 39.6562, lon: -104.3460 },
      '80104': { lat: 39.3879, lon: -104.7783 },
      '80108': { lat: 39.3556, lon: -104.8581 },
      '80109': { lat: 39.2862, lon: -104.8196 },
      '80110': { lat: 39.6476, lon: -104.9872 },
      '80111': { lat: 39.6134, lon: -104.9534 },
      '80112': { lat: 39.5707, lon: -104.8973 },
      '80113': { lat: 39.6416, lon: -104.9719 },
      '80120': { lat: 39.5898, lon: -105.0054 },
      '80121': { lat: 39.6125, lon: -104.9818 },
      '80122': { lat: 39.5673, lon: -104.9633 },
      '80123': { lat: 39.6067, lon: -105.0441 },
      '80124': { lat: 39.5293, lon: -104.9493 },
      '80125': { lat: 39.5083, lon: -105.0059 },
      '80126': { lat: 49.5267, lon: -104.9310 },
      '80127': { lat: 39.5712, lon: -105.1259 },
      '80128': { lat: 39.5709, lon: -105.0705 },
      '80129': { lat: 39.5509, lon: -105.0347 },
      '80130': { lat: 39.5403, lon: -104.9513 },
      '80131': { lat: 39.3047, lon: -104.8317 },
      '80132': { lat: 39.1039, lon: -104.8845 },
      '80134': { lat: 39.5257, lon: -104.7746 },
      '80135': { lat: 39.2189, lon: -105.0183 },
      '80136': { lat: 39.7281, lon: -104.4618 },
      '80137': { lat: 39.7817, lon: -104.6413 },
      '80138': { lat: 39.5213, lon: -104.6686 },
      '80202': { lat: 39.7532, lon: -104.9967 },
      '80203': { lat: 39.7307, lon: -104.9812 },
      '80204': { lat: 39.7394, lon: -105.0207 },
      '80205': { lat: 39.7583, lon: -104.9710 },
      '80206': { lat: 39.7294, lon: -104.9540 },
      '80207': { lat: 39.7682, lon: -104.9271 },
      '80209': { lat: 39.7087, lon: -104.9697 },
      '80210': { lat: 39.6766, lon: -104.9625 },
      '80211': { lat: 39.7650, lon: -105.0202 },
      '80212': { lat: 39.7733, lon: -105.0465 },
      '80214': { lat: 39.7467, lon: -105.0544 },
      '80215': { lat: 39.7434, lon: -105.0896 },
      '80216': { lat: 39.7872, lon: -104.9598 },
      '80218': { lat: 39.7321, lon: -104.9703 },
      '80219': { lat: 39.7029, lon: -105.0202 },
      '80220': { lat: 39.7425, lon: -104.9199 },
      '80221': { lat: 39.8016, lon: -105.0095 },
      '80222': { lat: 39.7014, lon: -104.9373 },
      '80223': { lat: 39.7100, lon: -104.9995 },
      '80224': { lat: 39.6879, lon: -104.9131 },
      '80226': { lat: 39.7122, lon: -105.0677 },
      '80227': { lat: 39.6655, lon: -105.0860 },
      '80228': { lat: 39.6802, lon: -105.1297 },
      '80229': { lat: 39.8556, lon: -104.9347 },
      '80230': { lat: 39.7194, lon: -104.8938 },
      '80231': { lat: 39.6810, lon: -104.8946 },
      '80232': { lat: 39.6955, lon: -105.0915 },
      '80233': { lat: 39.8790, lon: -104.9230 },
      '80234': { lat: 39.8214, lon: -105.0065 },
      '80235': { lat: 39.7023, lon: -105.0920 },
      '80236': { lat: 39.6590, lon: -105.0435 },
      '80237': { lat: 39.6400, lon: -104.9013 },
      '80238': { lat: 39.7868, lon: -104.8760 },
      '80239': { lat: 39.7840, lon: -104.8351 },
      '80241': { lat: 39.8649, lon: -104.9673 },
      '80246': { lat: 39.7086, lon: -104.9035 },
      '80247': { lat: 39.7033, lon: -104.8778 },
      '80249': { lat: 39.7741, lon: -104.7891 },
      '80260': { lat: 39.8674, lon: -104.9641 },
      '80290': { lat: 39.7502, lon: -104.9895 },
      '80293': { lat: 39.7461, lon: -104.9895 },
      '80294': { lat: 39.7461, lon: -104.9895 },
      // Texas/Austin area
      '78610': { lat: 30.0859, lon: -97.8822 },
      '78612': { lat: 30.2108, lon: -97.5552 },
      '78613': { lat: 30.4683, lon: -97.8190 },
      '78615': { lat: 30.5303, lon: -97.5802 },
      '78617': { lat: 30.1404, lon: -97.5958 },
      '78620': { lat: 30.3253, lon: -98.0229 },
      '78621': { lat: 30.2000, lon: -97.4783 },
      '78626': { lat: 30.4811, lon: -97.6557 },
      '78628': { lat: 30.4537, lon: -97.7708 },
      '78634': { lat: 30.4357, lon: -97.6238 },
      '78640': { lat: 30.0672, lon: -97.7782 },
      '78641': { lat: 30.5844, lon: -97.7869 },
      '78642': { lat: 30.4957, lon: -97.9149 },
      '78645': { lat: 30.4419, lon: -97.9087 },
      '78653': { lat: 30.2459, lon: -97.5919 },
      '78660': { lat: 30.0894, lon: -97.6501 },
      '78664': { lat: 30.5279, lon: -97.6626 },
      '78665': { lat: 30.5298, lon: -97.6045 },
      '78666': { lat: 29.8909, lon: -97.9410 },
      '78669': { lat: 30.4016, lon: -98.0915 },
      '78681': { lat: 30.5080, lon: -97.7175 },
      '78701': { lat: 30.2714, lon: -97.7409 },
      '78702': { lat: 30.2593, lon: -97.7151 },
      '78703': { lat: 30.2851, lon: -97.7681 },
      '78704': { lat: 30.2453, lon: -97.7771 },
      '78705': { lat: 30.2862, lon: -97.7383 },
      '78712': { lat: 30.3503, lon: -97.7021 },
      '78717': { lat: 30.4906, lon: -97.7472 },
      '78721': { lat: 30.2704, lon: -97.6833 },
      '78722': { lat: 30.2894, lon: -97.7086 },
      '78723': { lat: 30.3069, lon: -97.6886 },
      '78724': { lat: 30.2959, lon: -97.6486 },
      '78725': { lat: 30.2971, lon: -97.5878 },
      '78726': { lat: 30.4303, lon: -97.7933 },
      '78727': { lat: 30.4260, lon: -97.7493 },
      '78728': { lat: 30.4446, lon: -97.7160 },
      '78729': { lat: 30.4116, lon: -97.7530 },
      '78730': { lat: 30.3634, lon: -97.7545 },
      '78731': { lat: 30.3415, lon: -97.7781 },
      '78732': { lat: 30.3784, lon: -97.8865 },
      '78733': { lat: 30.3336, lon: -97.8011 },
      '78734': { lat: 30.3768, lon: -97.8390 },
      '78735': { lat: 30.2659, lon: -97.8440 },
      '78736': { lat: 30.2421, lon: -97.8580 },
      '78737': { lat: 30.2082, lon: -97.8992 },
      '78738': { lat: 30.2703, lon: -97.9723 },
      '78739': { lat: 30.1681, lon: -97.8732 },
      '78741': { lat: 30.2310, lon: -97.7146 },
      '78742': { lat: 30.2279, lon: -97.7472 },
      '78744': { lat: 30.1767, lon: -97.7475 },
      '78745': { lat: 30.2072, lon: -97.7831 },
      '78746': { lat: 30.2967, lon: -97.8108 },
      '78747': { lat: 30.1331, lon: -97.7185 },
      '78748': { lat: 30.1703, lon: -97.7830 },
      '78749': { lat: 30.1940, lon: -97.8253 },
      '78750': { lat: 30.4412, lon: -97.7981 },
      '78751': { lat: 30.3105, lon: -97.7283 },
      '78752': { lat: 30.3286, lon: -97.7075 },
      '78753': { lat: 30.3646, lon: -97.6765 },
      '78754': { lat: 30.3711, lon: -97.6393 },
      '78756': { lat: 30.3189, lon: -97.7410 },
      '78757': { lat: 30.3424, lon: -97.7425 },
      '78758': { lat: 30.3528, lon: -97.6954 },
      '78759': { lat: 30.4004, lon: -97.7531 },
      // Utah area
      '84003': { lat: 40.3431, lon: -111.7456 },
      '84004': { lat: 40.4154, lon: -111.7129 },
      '84005': { lat: 40.2564, lon: -111.7463 },
      '84006': { lat: 40.3431, lon: -111.8304 },
      '84010': { lat: 40.8758, lon: -111.8278 },
      '84011': { lat: 40.8572, lon: -111.8408 },
      '84013': { lat: 40.2832, lon: -112.1101 },
      '84014': { lat: 40.9508, lon: -111.8404 },
      '84015': { lat: 41.1302, lon: -112.0262 },
      '84020': { lat: 40.4955, lon: -111.8996 },
      '84021': { lat: 40.3689, lon: -111.4456 },
      '84022': { lat: 40.7219, lon: -112.0988 },
      '84023': { lat: 40.2169, lon: -109.4394 },
      '84024': { lat: 40.9433, lon: -111.5044 },
      '84025': { lat: 40.9898, lon: -111.8659 },
      '84032': { lat: 40.3902, lon: -111.2488 },
      '84033': { lat: 40.9742, lon: -111.5408 },
      '84036': { lat: 40.6207, lon: -111.5005 },
      '84037': { lat: 41.0339, lon: -111.8989 },
      '84040': { lat: 40.8692, lon: -111.9078 },
      '84041': { lat: 41.0138, lon: -111.9519 },
      '84042': { lat: 40.6097, lon: -111.7860 },
      '84043': { lat: 40.4081, lon: -111.8745 },
      '84044': { lat: 40.6472, lon: -111.9577 },
      '84045': { lat: 40.3315, lon: -111.9456 },
      '84046': { lat: 40.5648, lon: -109.5289 },
      '84047': { lat: 40.5872, lon: -111.8888 },
      '84050': { lat: 40.8795, lon: -111.6039 },
      '84051': { lat: 40.4371, lon: -110.3971 },
      '84052': { lat: 40.1398, lon: -110.1688 },
      '84053': { lat: 40.2821, lon: -109.8814 },
      '84054': { lat: 40.8376, lon: -111.9451 },
      '84055': { lat: 40.7822, lon: -111.5829 },
      '84056': { lat: 41.1246, lon: -111.9806 },
      '84057': { lat: 40.3085, lon: -111.7017 },
      '84058': { lat: 40.2810, lon: -111.6528 },
      '84059': { lat: 40.2797, lon: -111.6164 },
      '84060': { lat: 40.6546, lon: -111.4974 },
      '84061': { lat: 40.4926, lon: -111.4673 },
      '84062': { lat: 40.3039, lon: -111.5734 },
      '84063': { lat: 40.0232, lon: -109.7065 },
      '84065': { lat: 40.4856, lon: -111.9638 },
      '84066': { lat: 40.2859, lon: -109.2065 },
      '84067': { lat: 41.1381, lon: -112.0139 },
      '84070': { lat: 40.5689, lon: -111.8996 },
      '84074': { lat: 40.5606, lon: -112.2986 },
      '84075': { lat: 41.0711, lon: -112.0798 },
      '84080': { lat: 40.0781, lon: -111.8524 },
      '84081': { lat: 40.6231, lon: -112.0127 },
      '84082': { lat: 40.3689, lon: -111.1062 },
      '84084': { lat: 40.6236, lon: -111.9579 },
      '84085': { lat: 40.4511, lon: -109.9725 },
      '84086': { lat: 40.7405, lon: -110.0367 },
      '84087': { lat: 40.8790, lon: -111.9390 },
      '84088': { lat: 40.5770, lon: -111.9635 },
      '84089': { lat: 40.9868, lon: -111.9070 },
      '84090': { lat: 40.7299, lon: -111.9041 },
      '84091': { lat: 40.7299, lon: -111.9041 },
      '84092': { lat: 40.7299, lon: -111.9041 },
      '84093': { lat: 40.7299, lon: -111.9041 },
      '84094': { lat: 40.7299, lon: -111.9041 },
      '84095': { lat: 40.5721, lon: -111.8629 },
      '84096': { lat: 40.4317, lon: -111.9717 },
      '84097': { lat: 40.2995, lon: -111.6728 },
      '84098': { lat: 40.7165, lon: -111.5478 },
      '84101': { lat: 40.7652, lon: -111.8876 },
      '84102': { lat: 40.7589, lon: -111.8559 },
      '84103': { lat: 40.7749, lon: -111.8710 },
      '84104': { lat: 40.7515, lon: -111.9266 },
      '84105': { lat: 40.7382, lon: -111.8588 },
      '84106': { lat: 40.7225, lon: -111.8245 },
      '84107': { lat: 40.6985, lon: -111.8882 },
      '84108': { lat: 40.7867, lon: -111.8151 },
      '84109': { lat: 40.7771, lon: -111.7602 },
      '84110': { lat: 40.7606, lon: -111.8913 },
      '84111': { lat: 40.7542, lon: -111.8720 },
      '84112': { lat: 40.7664, lon: -111.8422 },
      '84113': { lat: 40.7650, lon: -111.8012 },
      '84114': { lat: 40.7684, lon: -111.8152 },
      '84115': { lat: 40.7145, lon: -111.8731 },
      '84116': { lat: 40.7937, lon: -111.9361 },
      '84117': { lat: 40.6893, lon: -111.8210 },
      '84118': { lat: 40.6491, lon: -111.9613 },
      '84119': { lat: 40.7012, lon: -111.9682 },
      '84120': { lat: 40.6981, lon: -112.0138 },
      '84121': { lat: 40.6560, lon: -111.8210 },
      '84123': { lat: 40.6767, lon: -111.9131 },
      '84124': { lat: 40.7206, lon: -111.8210 },
      '84125': { lat: 40.6827, lon: -111.9512 },
      '84128': { lat: 40.6996, lon: -112.0744 },
      '84129': { lat: 40.6576, lon: -111.9755 },
      '84130': { lat: 40.7534, lon: -111.9114 },
      '84138': { lat: 40.7684, lon: -111.8152 },
      '84143': { lat: 40.7684, lon: -111.8152 },
      '84145': { lat: 40.7542, lon: -111.8720 },
      '84147': { lat: 40.7606, lon: -111.8913 },
      '84148': { lat: 40.7606, lon: -111.8913 },
      '84150': { lat: 40.7650, lon: -111.8012 },
      '84151': { lat: 40.7542, lon: -111.8720 },
      '84152': { lat: 40.7684, lon: -111.8152 },
      '84157': { lat: 40.6985, lon: -111.8882 },
      '84158': { lat: 40.7534, lon: -111.9114 },
      '84165': { lat: 40.7145, lon: -111.8731 },
      '84170': { lat: 40.7012, lon: -111.9682 },
      '84171': { lat: 40.6560, lon: -111.8210 },
      '84180': { lat: 40.6827, lon: -111.9512 },
      '84184': { lat: 40.6827, lon: -111.9512 },
      '84188': { lat: 40.6576, lon: -111.9755 }
    }

    const zip = zipCode.trim().substring(0, 5)
    if (zipCoords[zip]) {
      setLocation(zipCoords[zip])
      setLocationMethod('zip')
      setError(null)
      setStep(2)
    } else {
      // Default to Seattle if zip not found
      setLocation({ lat: 47.6062, lon: -122.3321 })
      setLocationMethod('zip')
      setError(null)
      setStep(2)
    }
  }

  // Generate weekend plan
  const generatePlan = useCallback(() => {
    if (!location) return

    setIsLoading(true)

    // Calculate distances to all hikes
    const hikesWithDistance = hikes.map(hike => ({
      ...hike,
      distance: calculateDistance(location.lat, location.lon, hike.lat, hike.lon),
      drivingTime: estimateDrivingTime(calculateDistance(location.lat, location.lon, hike.lat, hike.lon))
    }))

    // Filter by driving radius and age
    const maxDrivingMinutes = DRIVING_SPEEDS[drivingRadius]
    let availableHikes = hikesWithDistance.filter(hike => {
      if (hike.drivingTime > maxDrivingMinutes) return false
      if (hike.duration > availableTime) return false
      const hikeAge = parseAgeRange(hike.ageRange)
      if (youngestAge < hikeAge.min || oldestAge > hikeAge.max) return false
      return true
    })

    // Sort by distance
    availableHikes.sort((a, b) => a.distance - b.distance)

    // Get crafts and builds
    const availableCrafts = filterCrafts(crafts, youngestAge, oldestAge)
    const availableBuilds = filterBuilds(builds, youngestAge, oldestAge)

    // Generate Saturday plan
    let saturdayHike = null
    let saturdayAddon = null
    let sundayHike = null
    let sundayAddon = null

    if (availableHikes.length > 0) {
      // Pick Saturday hike - prefer closer ones but introduce some randomness
      const shuffledHikes = shuffleArray(availableHikes)
      saturdayHike = shuffledHikes[0]
      
      // Sunday hike - different one from Saturday
      const remainingHikes = shuffledHikes.slice(1)
      if (remainingHikes.length > 0) {
        sundayHike = remainingHikes[0]
      } else if (shuffledHikes.length > 1) {
        sundayHike = shuffledHikes[1]
      }

      // Add-on for Saturday (50% chance craft, 50% chance build)
      if (Math.random() > 0.5 && availableCrafts.length > 0) {
        saturdayAddon = {
          type: 'craft',
          item: availableCrafts[Math.floor(Math.random() * availableCrafts.length)]
        }
      } else if (availableBuilds.length > 0) {
        saturdayAddon = {
          type: 'build',
          item: availableBuilds[Math.floor(Math.random() * availableBuilds.length)]
        }
      }

      // Add-on for Sunday
      if (Math.random() > 0.5 && availableCrafts.length > 0) {
        sundayAddon = {
          type: 'craft',
          item: availableCrafts[Math.floor(Math.random() * availableCrafts.length)]
        }
      } else if (availableBuilds.length > 0) {
        sundayAddon = {
          type: 'build',
          item: availableBuilds[Math.floor(Math.random() * availableBuilds.length)]
        }
      }
    }

    setWeekendPlan({
      saturday: {
        hike: saturdayHike,
        addon: saturdayAddon
      },
      sunday: {
        hike: sundayHike,
        addon: sundayAddon
      },
      seasonalTitle: getSeasonalTitle(),
      location: location,
      drivingRadius: drivingRadius
    })

    setIsLoading(false)
    setStep(4)
  }, [location, drivingRadius, availableTime, youngestAge, oldestAge])

  // Shuffle plan (generate new one)
  const shufflePlan = () => {
    generatePlan()
  }

  // Go back to previous step
  const goBack = () => {
    if (step > 1) setStep(step - 1)
  }

  // Reset to start
  const reset = () => {
    setStep(1)
    setWeekendPlan(null)
    setError(null)
  }

  // ============ RENDER ============

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest text-cream py-8 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl mb-2">This Weekend</h1>
          <p className="font-sans text-cream/80 text-sm">
            Simple, realistic outdoor plans for busy moms
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Step 1: Location */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ember/10 flex items-center justify-center">
                  <span className="text-3xl">📍</span>
                </div>
                <h2 className="font-serif text-xl text-ember mb-2">Where are you?</h2>
                <p className="font-sans text-sm text-inkl">
                  We'll find hikes near you
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={requestGeolocation}
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-ember text-white font-sans font-medium flex items-center justify-center gap-3 hover:bg-terra transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Getting location...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Use my location
                    </>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-inkll/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-inkll">or enter zip code</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="Zip code"
                    className="flex-1 px-4 py-4 rounded-xl border border-inkll bg-cream font-sans text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/50"
                    maxLength={5}
                  />
                  <button
                    onClick={handleZipSubmit}
                    disabled={zipCode.length < 5}
                    className="px-6 py-4 rounded-xl bg-olive text-white font-sans font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    Go
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Time Available */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-inkll mb-4 hover:text-ink"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ember/10 flex items-center justify-center">
                  <span className="text-3xl">Clock</span>
                </div>
                <h2 className="font-serif text-xl text-ember mb-2">How much time?</h2>
                <p className="font-sans text-sm text-inkl">
                  How far are you willing to drive?
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {RADIUS_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setDrivingRadius(option.value)
                      setStep(3)
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      drivingRadius === option.value
                        ? 'bg-ember text-white'
                        : 'bg-blush text-ink hover:bg-peach/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-medium">{option.label}</span>
                      <span className="text-sm opacity-80">{option.description}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="font-sans text-sm text-inkl mb-3">What kind of outing?</p>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setAvailableTime(option.value)
                      }}
                      className={`p-3 rounded-xl text-center transition-all ${
                        availableTime === option.value
                          ? 'bg-ember text-white'
                          : 'bg-blush text-ink hover:bg-peach/30'
                      }`}
                    >
                      <div className="text-xl mb-1">{option.icon}</div>
                      <div className="font-sans text-xs font-medium">{option.sublabel}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full mt-6 py-4 rounded-xl bg-ember text-white font-sans font-medium hover:bg-terra transition-colors"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Step 3: Ages */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-inkll mb-4 hover:text-ink"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ember/10 flex items-center justify-center">
                  <span className="text-3xl">Family</span>
                </div>
                <h2 className="font-serif text-xl text-ember mb-2">Who are you bringing?</h2>
                <p className="font-sans text-sm text-inkl">
                  We'll suggest age-appropriate adventures
                </p>
              </div>

              <div className="mb-6">
                <label className="block font-sans text-sm text-ink mb-2">Youngest child</label>
                <select
                  value={youngestAge}
                  onChange={(e) => setYoungestAge(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-inkll bg-cream font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ember/50"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(age => (
                    <option key={age} value={age}>{age} years old</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-sans text-sm text-ink mb-2">Oldest child</label>
                <select
                  value={oldestAge}
                  onChange={(e) => setOldestAge(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-inkll bg-cream font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ember/50"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(age => (
                    <option key={age} value={age}>{age} years old</option>
                  ))}
                </select>
              </div>

              <button
                onClick={generatePlan}
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-ember text-white font-sans font-medium text-lg hover:bg-terra transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Finding perfect hikes...' : "Let's go!"}
              </button>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 4 && weekendPlan && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Seasonal Title */}
              <div className="text-center mb-6">
                <p className="font-sans text-sm text-inkll uppercase tracking-wider mb-1">
                  This weekend's plan
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-ember italic">
                  {weekendPlan.seasonalTitle}
                </h3>
              </div>

              {/* Shuffle Button */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={shufflePlan}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blush text-ink font-sans font-medium hover:bg-peach/50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Different options
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-3 rounded-xl bg-inkll/20 text-ink font-sans font-medium hover:bg-inkll/30 transition-colors"
                >
                  Start over
                </button>
              </div>

              {/* Saturday Card */}
              <DayCard
                day="Saturday"
                hike={weekendPlan.saturday.hike}
                addon={weekendPlan.saturday.addon}
                drivingRadius={weekendPlan.drivingRadius}
              />

              {/* Sunday Card */}
              <DayCard
                day="Sunday"
                hike={weekendPlan.sunday.hike}
                addon={weekendPlan.sunday.addon}
                drivingRadius={weekendPlan.drivingRadius}
              />

              {/* No hikes found */}
              {(!weekendPlan.saturday.hike && !weekendPlan.sunday.hike) && (
                <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blush flex items-center justify-center">
                    <span className="text-3xl">Search</span>
                  </div>
                  <h3 className="font-serif text-xl text-ember mb-2">No hikes found</h3>
                  <p className="font-sans text-inkl mb-4">
                    Try expanding your driving distance or adjusting ages
                  </p>
                  <button
                    onClick={reset}
                    className="px-6 py-3 rounded-xl bg-ember text-white font-sans font-medium hover:bg-terra transition-colors"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Tips */}
              <div className="mt-6 p-4 bg-parchment rounded-xl">
                <h4 className="font-serif text-lg text-forest mb-2">💡 Mom tips</h4>
                <ul className="font-sans text-sm text-forest/80 space-y-1">
                  <li>• Check trail conditions before heading out</li>
                  <li>• Pack snacks, water, and a first-aid kit</li>
                  <li>• Leave no trace - bring bags for trash</li>
                  <li>• Sunflower seeds make great trail snacks for little hands</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Day Card Component
const DayCard = ({ day, hike, addon, drivingRadius }) => {
  if (!hike) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden mb-4"
    >
      {/* Day Header */}
      <div className="bg-ember px-5 py-3">
        <h4 className="font-serif text-lg text-white">{day}</h4>
      </div>

      {/* Main Hike */}
      <div className="p-5">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-xl bg-olive/20 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">Boot</span>
          </div>
          <div className="flex-1">
            <h5 className="font-serif text-lg text-ink leading-tight mb-1">
              {hike.title}
            </h5>
            <p className="font-sans text-sm text-inkl mb-2">
              {hike.region}, {hike.state}
            </p>
            <p className="font-sans text-sm text-inkll italic">
              "{getHikeTagline(hike)}"
            </p>
          </div>
        </div>

        {/* Hike Details */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs font-sans px-3 py-1.5 rounded-full bg-blush text-ink">
            Distance: {hike.distanceLabel}
          </span>
          <span className="text-xs font-sans px-3 py-1.5 rounded-full bg-blush text-ink">
            Time: {hike.durationLabel}
          </span>
          <span className="text-xs font-sans px-3 py-1.5 rounded-full bg-blush text-ink">
            ~{hike.drivingTime} min drive
          </span>
          <span className={`text-xs font-sans px-3 py-1.5 rounded-full ${
            hike.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            hike.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {hike.difficulty}
          </span>
        </div>

        {/* Hike Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {hike.hasWater && (
            <span className="text-xs font-sans px-2 py-1 rounded-full bg-blue-50 text-blue-700">
              Water feature
            </span>
          )}
          {hike.hasViews && (
            <span className="text-xs font-sans px-2 py-1 rounded-full bg-purple-50 text-purple-700">
              Views
            </span>
          )}
          {hike.dogsAllowed && (
            <span className="text-xs font-sans px-2 py-1 rounded-full bg-amber-50 text-amber-700">
              Dogs OK
            </span>
          )}
          {hike.strollerFriendly && (
            <span className="text-xs font-sans px-2 py-1 rounded-full bg-pink-50 text-pink-700">
              Stroller friendly
            </span>
          )}
        </div>
      </div>

      {/* Add-on */}
      {addon && (
        <div className="px-5 py-4 bg-parchment border-t border-inkll/10">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              addon.type === 'craft' ? 'bg-peach/30' : 'bg-gold/20'
            }`}>
              <span className="text-lg">{addon.type === 'craft' ? 'Craft' : 'Hammer'}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h6 className="font-sans text-sm font-medium text-ink">
                  {addon.item.title}
                </h6>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  addon.type === 'craft' ? 'bg-peach/30 text-terra' : 'bg-gold/20 text-gold'
                }`}>
                  {addon.type === 'craft' ? 'Quick craft' : 'Weekend build'}
                </span>
              </div>
              <p className="font-sans text-xs text-inkl">
                {addon.type === 'craft' 
                  ? `${addon.item.duration} • Ages ${addon.item.ageRange}`
                  : `${addon.item.timeEstimate} • Ages ${addon.item.ageRange}`
                }
              </p>
              <p className="font-sans text-xs text-inkll italic mt-1">
                {getAddonTagline(addon.type)}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default NaturePlanner
