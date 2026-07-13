import { createClient } from '@supabase/supabase-js'
import { getClerkUserFromRequest } from './_lib/clerkAuth.js'
import { decorateGuide } from './_lib/buildCatalog.js'

// GET /api/my-guides
// Returns the premium Wilder Builds PDFs the user has access to via
// their subscription, joined with display metadata.
//
// Response: {
//   hasAccess: bool,
//   status: 'active' | 'cancelled' | 'expired' | 'paused' | 'none',
//   current_period_end: string | null,
//   acquired: [{
//     id, slug, title, subtitle, cover, type, typeLabel,
//     dropMonth, dropYear, dropId, acquiredAt
//   }, ...]
// }
//
// Auth: Clerk Bearer token (verified server-side).
// Source of truth:
//   - subscriptions.status for access check
//   - acquired_guides for which PDFs the user has accumulated

function getAdminClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const auth = await getClerkUserFromRequest(req)
  if (!auth?.userId) {
    return res.status(401).json({ error: 'You must be signed in to view your library.' })
  }

  const admin = getAdminClient()
  if (!admin) {
    return res.status(500).json({ error: 'Storage is not configured on this server.' })
  }

  let sub = null
  try {
    const { data, error } = await admin
      .from('subscriptions')
      .select('status, current_period_end')
      .eq('clerk_user_id', auth.userId)
      .maybeSingle()
    if (error) {
      console.warn('my-guides: subscription lookup failed', error?.message)
    }
    sub = data
  } catch (err) {
    console.warn('my-guides: subscription lookup threw', err?.message)
  }

  const rawStatus = sub?.status || 'none'
  const status = ['active', 'cancelled', 'expired', 'paused'].includes(rawStatus)
    ? rawStatus
    : 'none'

  let hasAccess = status === 'active'
  if (hasAccess && sub?.current_period_end) {
    const periodEnd = new Date(sub.current_period_end)
    if (Number.isFinite(periodEnd.getTime()) && periodEnd < new Date()) {
      hasAccess = false
    }
  }

  let rows = []
  try {
    const { data, error } = await admin
      .from('acquired_guides')
      .select('build_id, drop_id, acquired_at')
      .eq('user_id', auth.userId)
      .order('acquired_at', { ascending: false })
    if (error) {
      console.error('my-guides: acquired_guides lookup failed', error)
      return res.status(500).json({ error: 'Could not load your library.' })
    }
    rows = data || []
  } catch (err) {
    console.error('my-guides: acquired_guides lookup threw', err)
    return res.status(500).json({ error: 'Could not load your library.' })
  }

  const acquired = rows.map(decorateGuide)

  return res.status(200).json({
    hasAccess,
    status,
    current_period_end: sub?.current_period_end || null,
    acquired,
  })
}
