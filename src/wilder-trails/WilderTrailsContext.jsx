import { createContext, useContext, useState, useMemo } from 'react'

const WilderTrailsContext = createContext()

const STORAGE_KEY = 'wilder_trails_session'

const getInitialState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load WilderTrails session')
  }
  return {
    location: null, // { lat, lon, city, name }
    familyInfo: null, // { youngestAge, hasBabyInCarrier, numberOfKids, needsStroller, needsDog }
    timeWindow: 60,
    vibe: 'justneedout',
  }
}

export function WilderTrailsProvider({ children }) {
  const initialState = getInitialState()
  
  const [location, setLocation] = useState(initialState.location)
  const [familyInfo, setFamilyInfo] = useState(initialState.familyInfo)
  const [timeWindow, setTimeWindow] = useState(initialState.timeWindow || 60)
  const [vibe, setVibe] = useState(initialState.vibe || 'justneedout')
  
  // Persist to localStorage
  const sessionData = useMemo(() => ({
    location,
    familyInfo,
    timeWindow,
    vibe,
  }), [location, familyInfo, timeWindow, vibe])
  
  // Compute current step based on what data is filled
  const currentStep = useMemo(() => {
    if (!location) return 1
    if (!familyInfo) return 2
    return 3 // 3 = trails page, 4 = trail detail
  }, [location, familyInfo])
  
  // Store session data
  const saveSession = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData))
    } catch (e) {
      console.warn('Failed to save WilderTrails session')
    }
  }
  
  // Update handlers
  const updateLocation = (loc) => {
    setLocation(loc)
    saveSession()
  }
  
  const updateFamilyInfo = (info) => {
    setFamilyInfo(info)
    saveSession()
  }
  
  const updateTimeWindow = (time) => {
    setTimeWindow(time)
    saveSession()
  }
  
  const updateVibe = (v) => {
    setVibe(v)
    saveSession()
  }
  
  // Clear session (for starting fresh)
  const clearSession = () => {
    setLocation(null)
    setFamilyInfo(null)
    setTimeWindow(60)
    setVibe('justneedout')
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.warn('Failed to clear WilderTrails session')
    }
  }
  
  // Build preferences object for recommendations
  const preferences = useMemo(() => {
    if (!familyInfo) return {}
    return {
      youngestAge: familyInfo.youngestAge,
      hasStroller: familyInfo.needsStroller,
      hasBabyInCarrier: familyInfo.hasBabyInCarrier,
      wantsDogs: familyInfo.needsDog,
      timeWindow,
      vibe,
      wantsWater: true,
      wantsRestrooms: true,
      maxDistance: 60,
      maxResults: 6,
    }
  }, [familyInfo, timeWindow, vibe])
  
  return (
    <WilderTrailsContext.Provider value={{
      // State
      location,
      familyInfo,
      timeWindow,
      vibe,
      currentStep,
      preferences,
      
      // Actions
      updateLocation,
      updateFamilyInfo,
      updateTimeWindow,
      updateVibe,
      clearSession,
      
      // Computed
      isStepComplete: (step) => {
        switch (step) {
          case 1: return !!location
          case 2: return !!familyInfo
          case 3: return true // trails is shown when step 2 is complete
          case 4: return true // detail page is a leaf
          default: return false
        }
      },
    }}>
      {children}
    </WilderTrailsContext.Provider>
  )
}

export const useWilderTrails = () => useContext(WilderTrailsContext)

// Export steps constant for ProgressStepper
export const TRAIL_STEPS = [
  { id: 1, label: 'Location', path: '/wilder-trails/location' },
  { id: 2, label: "Who's Coming", path: '/wilder-trails/whos-coming' },
  { id: 3, label: 'Trails', path: '/wilder-trails/trails' },
  { id: 4, label: 'Pack List', path: '/wilder-trails/:trailId' },
]
