import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../utils/supabase'

const STORAGE_KEY = 'wilder_moms_saved_trails'
const ACTIVITIES_KEY = 'wilder_moms_completed_activities'

export function useSavedTrails(userId) {
  const [savedTrails, setSavedTrails] = useState([])
  const [loading, setLoading] = useState(true)

  // Load saved trails
  useEffect(() => {
    if (userId) {
      loadSavedTrails()
    } else {
      loadLocalSavedTrails()
    }
  }, [userId])

  const loadSavedTrails = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('saved_trails')
        .select('trail_id, created_at')
        .eq('user_id', userId)

      if (error) {
        console.error('Error loading saved trails:', error)
        setLoading(false)
        return
      }

      setSavedTrails(data?.map(t => t.trail_id) || [])
    } catch (err) {
      console.error('Failed to load saved trails:', err)
    }
    setLoading(false)
  }

  const loadLocalSavedTrails = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setSavedTrails(saved)
    } catch {
      setSavedTrails([])
    }
    setLoading(false)
  }

  const saveTrail = async (trailId) => {
    if (userId) {
      // Save to Supabase
      await supabase.from('saved_trails').insert({
        user_id: userId,
        trail_id: trailId
      })
    } else {
      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (!saved.includes(trailId)) {
        saved.push(trailId)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
      }
    }
    setSavedTrails(prev => [...prev, trailId])
  }

  const unsaveTrail = async (trailId) => {
    if (userId) {
      // Remove from Supabase
      await supabase
        .from('saved_trails')
        .delete()
        .eq('user_id', userId)
        .eq('trail_id', trailId)
    } else {
      // Remove from localStorage
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const filtered = saved.filter(id => id !== trailId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    }
    setSavedTrails(prev => prev.filter(id => id !== trailId))
  }

  const toggleSaved = useCallback(async (trailId) => {
    if (savedTrails.includes(trailId)) {
      await unsaveTrail(trailId)
    } else {
      await saveTrail(trailId)
    }
  }, [savedTrails, userId])

  const isSaved = useCallback((trailId) => {
    return savedTrails.includes(trailId)
  }, [savedTrails])

  return {
    savedTrails,
    loading,
    toggleSaved,
    isSaved,
    saveTrail,
    unsaveTrail
  }
}

export function useCompletedActivities(userId) {
  const [completedActivities, setCompletedActivities] = useState([])
  const [loading, setLoading] = useState(true)

  // Load completed activities
  useEffect(() => {
    if (userId) {
      loadCompletedActivities()
    } else {
      loadLocalCompletedActivities()
    }
  }, [userId])

  const loadCompletedActivities = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('completed_activities')
        .select('*')
        .eq('user_id', userId)

      if (error) {
        console.error('Error loading completed activities:', error)
        setLoading(false)
        return
      }

      setCompletedActivities(data || [])
    } catch (err) {
      console.error('Failed to load completed activities:', err)
    }
    setLoading(false)
  }

  const loadLocalCompletedActivities = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || '[]')
      setCompletedActivities(saved)
    } catch {
      setCompletedActivities([])
    }
    setLoading(false)
  }

  const markComplete = async (activityType, activityId, notes = '') => {
    const activity = {
      id: `${activityType}-${activityId}-${Date.now()}`,
      activity_type: activityType,
      activity_id: activityId,
      completed_at: new Date().toISOString(),
      notes,
      user_id: userId || null
    }

    if (userId) {
      // Save to Supabase
      const { error } = await supabase
        .from('completed_activities')
        .insert({
          user_id: userId,
          activity_type: activityType,
          activity_id: activityId,
          completed_at: new Date().toISOString(),
          notes
        })

      if (error) {
        console.error('Error marking complete:', error)
      }
    } else {
      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || '[]')
      saved.push(activity)
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(saved))
    }
    
    setCompletedActivities(prev => [...prev, activity])
    return activity
  }

  const unmarkComplete = async (activityType, activityId) => {
    if (userId) {
      await supabase
        .from('completed_activities')
        .delete()
        .eq('user_id', userId)
        .eq('activity_type', activityType)
        .eq('activity_id', activityId)
    } else {
      const saved = JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || '[]')
      const filtered = saved.filter(
        a => !(a.activity_type === activityType && a.activity_id === activityId)
      )
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(filtered))
    }
    
    setCompletedActivities(prev => 
      prev.filter(a => !(a.activity_type === activityType && a.activity_id === activityId))
    )
  }

  const toggleComplete = useCallback(async (activityType, activityId) => {
    const isCompleted = isCompletedActivity(activityType, activityId)
    if (isCompleted) {
      await unmarkComplete(activityType, activityId)
    } else {
      await markComplete(activityType, activityId)
    }
  }, [completedActivities, userId])

  const isCompletedActivity = useCallback((activityType, activityId) => {
    return completedActivities.some(
      a => a.activity_type === activityType && a.activity_id === activityId
    )
  }, [completedActivities])

  const getCompletedByType = useCallback((activityType) => {
    return completedActivities.filter(a => a.activity_type === activityType)
  }, [completedActivities])

  return {
    completedActivities,
    loading,
    markComplete,
    unmarkComplete,
    toggleComplete,
    isCompletedActivity,
    getCompletedByType
  }
}
