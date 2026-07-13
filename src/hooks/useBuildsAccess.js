import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/react'
import { supabase } from '../utils/supabase'

// useBuildsAccess
// Reads the current Clerk user's subscription row from Supabase.
// Returns { loading, hasAccess, status, subscription, refresh }.
// status values: 'loading' | 'none' | 'active' | 'cancelled' | 'expired'
//
// Designed to fail open to false — if Supabase is unreachable or the row
// doesn't exist yet, the user simply sees the paywall. Never crashes the UI.

export function useBuildsAccess() {
  const { userId, isSignedIn } = useAuth()
  const [state, setState] = useState({
    loading: true,
    subscription: null,
  })

  const load = useCallback(async () => {
    if (!isSignedIn || !userId) {
      setState({ loading: false, subscription: null })
      return
    }
    setState(prev => ({ ...prev, loading: true }))
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('clerk_user_id', userId)
        .maybeSingle()

      if (error) {
        // Table may not exist yet in early deploys — fail soft
        console.warn('useBuildsAccess: subscription lookup failed', error?.message)
        setState({ loading: false, subscription: null })
        return
      }
      setState({ loading: false, subscription: data || null })
    } catch (err) {
      console.warn('useBuildsAccess: unexpected error', err?.message)
      setState({ loading: false, subscription: null })
    }
  }, [isSignedIn, userId])

  useEffect(() => {
    load()
  }, [load])

  // Re-fetch when window regains focus — handles the case where the user
  // returns from Lemon Squeezy checkout in the same tab.
  useEffect(() => {
    if (!isSignedIn) return
    const onFocus = () => load()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [isSignedIn, load])

  const status = (() => {
    if (state.loading) return 'loading'
    if (!isSignedIn) return 'none'
    if (!state.subscription) return 'none'
    if (state.subscription.status === 'active') return 'active'
    if (state.subscription.status === 'cancelled') return 'cancelled'
    if (state.subscription.status === 'expired') return 'expired'
    return 'none'
  })()

  const hasAccess = status === 'active'

  return {
    loading: state.loading,
    hasAccess,
    status,
    subscription: state.subscription,
    refresh: load,
  }
}
