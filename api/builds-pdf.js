import { createClient } from '@supabase/supabase-js'
import { getClerkUserFromRequest } from './_lib/clerkAuth.js'

// GET /api/builds-pdf?id=fairy-apothecary
// Returns { url } pointing to a 60-second signed URL for the requested PDF.
// Requires an active Wilder Builds subscription.
//
// Watermarking: server-side pdf watermarking is a v2 enhancement. For v1
// we rely on:
//   - Clerk session verification
//   - Active subscription check
//   - 60s signed URL expiry (URLs cannot be shared after expiry)
//   - Per-download audit log entry (knowing exactly who downloaded what)

const ALLOWED_IDS = new Set(['fairy-apothecary', 'mycelium-donuts'])
const PDF_STORAGE_PATH = {
  'fairy-apothecary': 'fairy-apothecary.pdf',
  'mycelium-donuts': 'mycelium-donuts.pdf',
}

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

  const buildId = String(req.query.id || '').toLowerCase()
  if (!buildId || !ALLOWED_IDS.has(buildId)) {
    return res.status(400).json({ error: 'Unknown build id' })
  }

  const auth = await getClerkUserFromRequest(req)
  if (!auth?.userId) {
    return res.status(401).json({ error: 'You must be signed in to download.' })
  }

  const admin = getAdminClient()
  if (!admin) {
    return res.status(500).json({ error: 'Storage is not configured on this server.' })
  }

  // Check active subscription
  let sub = null
  try {
    const { data, error } = await admin
      .from('subscriptions')
      .select('status, current_period_end, lemon_subscription_id')
      .eq('clerk_user_id', auth.userId)
      .maybeSingle()
    if (error) {
      console.warn('builds-pdf: subscription lookup failed', error?.message)
    }
    sub = data
  } catch (err) {
    console.warn('builds-pdf: subscription lookup threw', err?.message)
  }

  if (!sub || sub.status !== 'active') {
    return res.status(403).json({
      error: sub?.status === 'expired' ? 'Your subscription has lapsed.' : 'Active subscription required.',
      status: sub?.status || 'none',
    })
  }

  // Optional: refuse if period already over
  if (sub.current_period_end && new Date(sub.current_period_end) < new Date()) {
    return res.status(403).json({ error: 'Your subscription has lapsed.', status: 'expired' })
  }

  // Generate 60-second signed URL
  const path = PDF_STORAGE_PATH[buildId]
  let url = null
  try {
    const { data, error } = await admin.storage
      .from('builds-pdfs')
      .createSignedUrl(path, 60)
    if (error) {
      console.error('builds-pdf: createSignedUrl failed', error)
      return res.status(500).json({ error: 'Could not generate download link.' })
    }
    url = data?.signedUrl
  } catch (err) {
    console.error('builds-pdf: storage threw', err)
    return res.status(500).json({ error: 'Could not generate download link.' })
  }

  if (!url) {
    return res.status(500).json({ error: 'No download URL returned.' })
  }

  // Audit log (best-effort, non-blocking — don't fail download if logging fails)
  try {
    await admin.from('build_downloads').insert({
      clerk_user_id: auth.userId,
      build_id: buildId,
      lemon_subscription_id: sub.lemon_subscription_id || null,
      ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || null,
      user_agent: req.headers['user-agent']?.slice(0, 500) || null,
    })
  } catch (err) {
    console.warn('builds-pdf: audit log insert failed', err?.message)
  }

  return res.status(200).json({ url })
}
