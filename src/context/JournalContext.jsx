import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@clerk/react'
import { supabase } from '../utils/supabase'
import { calculateStreak, getPillarProgress, checkSkillEarned } from '../data/skills'

const JournalContext = createContext()

const JOURNAL_ENTRIES_KEY = 'wilder_moms_journal_entries'
const USER_SKILLS_KEY = 'wilder_moms_user_skills'

export function JournalProvider({ children }) {
  const { userId, isSignedIn } = useAuth()
  const [entries, setEntries] = useState([])
  const [earnedSkills, setEarnedSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)

  // Load entries from Supabase on auth change
  useEffect(() => {
    if (isSignedIn && userId) {
      loadEntries(userId)
      loadSkills(userId)
    } else {
      // Load from localStorage when not signed in
      loadLocalEntries()
      loadLocalSkills()
    }
  }, [isSignedIn, userId])

  const loadEntries = async (uid) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', uid)
        .order('date', { ascending: false })

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading entries:', error)
      }

      const entriesData = data || []
      setEntries(entriesData)
      setStreak(calculateStreak(entriesData))
      
      // Also save to localStorage as backup
      localStorage.setItem(`${JOURNAL_ENTRIES_KEY}_${uid}`, JSON.stringify(entriesData))
    } catch (err) {
      console.error('Failed to load entries:', err)
      loadLocalEntries()
    } finally {
      setLoading(false)
    }
  }

  const loadSkills = async (uid) => {
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', uid)

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading skills:', error)
      }

      const skillsData = data?.map(s => s.skill_id) || []
      setEarnedSkills(skillsData)
      localStorage.setItem(`${USER_SKILLS_KEY}_${uid}`, JSON.stringify(skillsData))
    } catch (err) {
      console.error('Failed to load skills:', err)
      loadLocalSkills()
    }
  }

  const loadLocalEntries = () => {
    try {
      const stored = localStorage.getItem(JOURNAL_ENTRIES_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setEntries(parsed)
        setStreak(calculateStreak(parsed))
      }
    } catch (e) {
      console.warn('Failed to load local entries')
    }
    setLoading(false)
  }

  const loadLocalSkills = () => {
    try {
      const stored = localStorage.getItem(USER_SKILLS_KEY)
      if (stored) {
        setEarnedSkills(JSON.parse(stored))
      }
    } catch (e) {
      console.warn('Failed to load local skills')
    }
  }

  // Add new entry
  const addEntry = async (entry) => {
    const newEntry = {
      id: crypto.randomUUID(),
      user_id: userId || null,
      date: entry.date || new Date().toISOString().split('T')[0],
      title: entry.title || '',
      content: entry.content || '',
      pillar_tags: entry.pillar_tags || [],
      mood: entry.mood || 'good',
      weather: entry.weather || '',
      photos: entry.photos || [],
      created_at: new Date().toISOString()
    }

    // Optimistic update
    const updatedEntries = [newEntry, ...entries]
    setEntries(updatedEntries)
    setStreak(calculateStreak(updatedEntries))

    if (isSignedIn && userId) {
      try {
        const { error } = await supabase
          .from('journal_entries')
          .insert([newEntry])

        if (error) {
          console.error('Error saving entry:', error)
        }
      } catch (err) {
        console.error('Failed to save entry to Supabase:', err)
      }
    } else {
      // Save to localStorage
      localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(updatedEntries))
    }

    // Check for new skills earned
    checkAndAwardSkills(updatedEntries)

    return newEntry
  }

  // Update entry
  const updateEntry = async (id, updates) => {
    const updatedEntries = entries.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    )
    setEntries(updatedEntries)
    setStreak(calculateStreak(updatedEntries))

    if (isSignedIn && userId) {
      try {
        const { error } = await supabase
          .from('journal_entries')
          .update(updates)
          .eq('id', id)

        if (error) {
          console.error('Error updating entry:', error)
        }
      } catch (err) {
        console.error('Failed to update entry:', err)
      }
    } else {
      localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(updatedEntries))
    }
  }

  // Delete entry
  const deleteEntry = async (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id)
    setEntries(updatedEntries)
    setStreak(calculateStreak(updatedEntries))

    if (isSignedIn && userId) {
      try {
        const { error } = await supabase
          .from('journal_entries')
          .delete()
          .eq('id', id)

        if (error) {
          console.error('Error deleting entry:', error)
        }
      } catch (err) {
        console.error('Failed to delete entry:', err)
      }
    } else {
      localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(updatedEntries))
    }
  }

  // Check and award skills based on entries
  const checkAndAwardSkills = async (currentEntries) => {
    const allSkillIds = [
      'roam_seedling', 'roam_sprout', 'roam_leaf', 'roam_branch', 'roam_root',
      'create_seedling', 'create_sprout', 'create_leaf', 'create_branch', 'create_root',
      'build_seedling', 'build_sprout', 'build_leaf', 'build_branch', 'build_root',
      'connect_seedling', 'connect_sprout', 'connect_leaf', 'connect_branch', 'connect_root'
    ]

    const newSkills = []

    for (const skillId of allSkillIds) {
      if (!earnedSkills.includes(skillId) && checkSkillEarned(skillId, currentEntries)) {
        newSkills.push(skillId)
      }
    }

    if (newSkills.length > 0) {
      const updatedSkills = [...earnedSkills, ...newSkills]
      setEarnedSkills(updatedSkills)

      if (isSignedIn && userId) {
        try {
          const skillsToInsert = newSkills.map(skillId => ({
            id: crypto.randomUUID(),
            user_id: userId,
            skill_id: skillId,
            achieved_at: new Date().toISOString(),
            notes: 'Auto-earned through journal entries'
          }))

          const { error } = await supabase
            .from('user_skills')
            .insert(skillsToInsert)

          if (error) {
            console.error('Error saving skills:', error)
          }
        } catch (err) {
          console.error('Failed to save skills:', err)
        }
      } else {
        localStorage.setItem(USER_SKILLS_KEY, JSON.stringify(updatedSkills))
      }

      return newSkills
    }

    return []
  }

  // Manual skill award (e.g., from UI interaction)
  const awardSkill = async (skillId) => {
    if (earnedSkills.includes(skillId)) return false

    const updatedSkills = [...earnedSkills, skillId]
    setEarnedSkills(updatedSkills)

    if (isSignedIn && userId) {
      try {
        const { error } = await supabase
          .from('user_skills')
          .insert([{
            id: crypto.randomUUID(),
            user_id: userId,
            skill_id: skillId,
            achieved_at: new Date().toISOString(),
            notes: 'Manually awarded'
          }])

        if (error) {
          console.error('Error awarding skill:', error)
        }
      } catch (err) {
        console.error('Failed to award skill:', err)
      }
    } else {
      localStorage.setItem(USER_SKILLS_KEY, JSON.stringify(updatedSkills))
    }

    return true
  }

  // Computed values
  const pillarProgress = getPillarProgress(earnedSkills)

  return (
    <JournalContext.Provider value={{
      entries,
      earnedSkills,
      loading,
      streak,
      pillarProgress,
      addEntry,
      updateEntry,
      deleteEntry,
      awardSkill,
      checkAndAwardSkills
    }}>
      {children}
    </JournalContext.Provider>
  )
}

export const useJournal = () => useContext(JournalContext)
