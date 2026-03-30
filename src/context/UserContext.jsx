import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const UserContext = createContext()

const STORAGE_KEY = 'wilder_moms_user_profile'

const getInitialState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load user profile from localStorage')
  }
  return {
    familyName: '',
    children: [],
    preferences: {
      stroller: false,
      water: false,
      views: false,
      dogs: false,
      freeParking: false
    },
    savedHikes: [],
    savedCrafts: [],
    savedBuilds: []
  }
}

export function UserProvider({ children }) {
  const initialState = getInitialState()
  
  const [familyName, setFamilyName] = useState(initialState.familyName)
  const [childrenList, setChildrenList] = useState(initialState.children)
  const [preferences, setPreferences] = useState(initialState.preferences)
  const [savedHikes, setSavedHikes] = useState(initialState.savedHikes)
  const [savedCrafts, setSavedCrafts] = useState(initialState.savedCrafts)
  const [savedBuilds, setSavedBuilds] = useState(initialState.savedBuilds)
  
  // Persist to localStorage whenever profile data changes
  useEffect(() => {
    const profileData = {
      familyName,
      children: childrenList,
      preferences,
      savedHikes,
      savedCrafts,
      savedBuilds
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData))
    } catch (e) {
      console.warn('Failed to save user profile to localStorage')
    }
  }, [familyName, childrenList, preferences, savedHikes, savedCrafts, savedBuilds])
  
  // Computed: youngest age for recommendations
  const youngestAge = useMemo(() => {
    if (childrenList.length === 0) return null
    const ages = childrenList
      .map(c => parseInt(c.age, 10))
      .filter(age => !isNaN(age))
    return ages.length > 0 ? Math.min(...ages) : null
  }, [childrenList])
  
  // Computed: profile completeness
  const profileCompleteness = useMemo(() => {
    let score = 0
    let max = 5
    
    if (familyName.trim()) score++
    if (childrenList.length > 0) score++
    if (childrenList.some(c => c.name.trim() && c.age)) score++
    
    const prefCount = Object.values(preferences).filter(Boolean).length
    if (prefCount >= 1) score++
    if (prefCount >= 3) score++
    
    return Math.min(score / max, 1)
  }, [familyName, childrenList, preferences])
  
  const hasProfile = useMemo(() => {
    return familyName.trim() || childrenList.length > 0 || childrenList.some(c => c.name.trim())
  }, [familyName, childrenList])
  
  // Child management methods
  const addChild = (child = { name: '', age: '', ageGroup: '' }) => {
    setChildrenList(prev => [
      ...prev,
      { id: Date.now().toString(), ...child }
    ])
  }
  
  const removeChild = (id) => {
    setChildrenList(prev => prev.filter(c => c.id !== id))
  }
  
  const updateChild = (id, updates) => {
    setChildrenList(prev =>
      prev.map(c => c.id === id ? { ...c, ...updates } : c)
    )
  }
  
  // Preferences management
  const updatePreferences = (updates) => {
    setPreferences(prev => ({ ...prev, ...updates }))
  }
  
  // Clear entire profile
  const clearProfile = () => {
    setFamilyName('')
    setChildrenList([])
    setPreferences({
      stroller: false,
      water: false,
      views: false,
      dogs: false,
      freeParking: false
    })
  }
  
  // Legacy kid methods for backward compatibility
  const addKid = () => addChild({ name: '', age: '', interests: [] })
  const removeKid = (id) => removeChild(id)
  const updateKid = (id, field, value) => updateChild(id, { [field]: value })
  
  // Save/toggle methods
  const toggleSavedHike = (hikeId) => {
    setSavedHikes(prev =>
      prev.includes(hikeId) ? prev.filter(id => id !== hikeId) : [...prev, hikeId]
    )
  }
  
  const toggleSavedCraft = (craftId) => {
    setSavedCrafts(prev =>
      prev.includes(craftId) ? prev.filter(id => id !== craftId) : [...prev, craftId]
    )
  }
  
  const toggleSavedBuild = (buildId) => {
    setSavedBuilds(prev =>
      prev.includes(buildId) ? prev.filter(id => id !== buildId) : [...prev, buildId]
    )
  }
  
  return (
    <UserContext.Provider value={{
      // Family profile
      familyName, setFamilyName,
      children: childrenList, addChild, removeChild, updateChild,
      preferences, updatePreferences, clearProfile,
      // Computed values
      youngestAge,
      profileCompleteness,
      hasProfile,
      // Legacy kids interface
      kids: childrenList, addKid, removeKid, updateKid,
      // Saved items
      savedHikes, savedCrafts, savedBuilds,
      toggleSavedHike, toggleSavedCraft, toggleSavedBuild
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
