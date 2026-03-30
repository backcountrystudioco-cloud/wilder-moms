import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [kids, setKids] = useState([
    { id: '1', name: '', age: '', interests: [] }
  ])
  const [savedHikes, setSavedHikes] = useState([])
  const [savedCrafts, setSavedCrafts] = useState([])
  const [savedBuilds, setSavedBuilds] = useState([])
  
  const addKid = () => {
    setKids([...kids, { id: Date.now().toString(), name: '', age: '', interests: [] }])
  }
  
  const removeKid = (id) => {
    setKids(kids.filter(k => k.id !== id))
  }
  
  const updateKid = (id, field, value) => {
    setKids(kids.map(k => k.id === id ? { ...k, [field]: value } : k))
  }
  
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
      kids, addKid, removeKid, updateKid,
      savedHikes, savedCrafts, savedBuilds,
      toggleSavedHike, toggleSavedCraft, toggleSavedBuild
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
