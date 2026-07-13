import { createClient } from '@supabase/supabase-js'
import { getClerkUserFromRequest } from './_lib/clerkAuth.js'

// /api/saved-builds
// Manages a user's saved (hearted) free builds. Free builds live in
// src/wilder-builds/builds.js + crafts.js + HIKES/*; this endpoint only
// tracks which slugs the user has saved, not the build content itself.
//
//   GET    /api/saved-builds             -> { saves: [{ build_id, build_type, created_at }] }
//   POST   /api/saved-builds             -> { saved: true, build_id }
//                                          body: { build_id, build_type? }
//   DELETE /api/saved-builds?build_id=X  -> { unsaved: true }
//
// Auth: Clerk Bearer token (verified server-side).
// Storage: Supabase via SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).

const VALID_BUILD_TYPES = new Set(['build', 'craft', 'hike'])

function getAdminClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
}

function sanitizeBuildId(raw) {
  if (typeof raw !== 'string') return ''
  return raw.trim().toLowerCase().slice(0, 128)
}

function sanitizeBuildType(raw) {
  const v = (typeof raw === 'string' ? raw : 'build').trim().toLowerCase()
  return VALID_BUILD_TYPES.has(v) ? v : 'build'
}

export default async function handler(req, res) {
  const auth = await getClerkUserFromRequest(req)
  if (!auth?.userId) {
    return res.status(401).json({ error: 'You must be signed in to save builds.' })
  }

  const admin = getAdminClient()
  if (!admin) {
    return res.status(500).json({ error: 'Storage is not configured on this server.' })
  }

  // ---------------------------------------------------------------- GET
  if (req.method === 'GET') {
    try {
      const { data, error } = await admin
        .from('saved_builds')
        .select('build_id, build_type, created_at')
        .eq('user_id', auth.userId)
        .order('created_at', { ascending: false })
      if (error) {
        console.error('saved-builds: list failed', error)
        return res.status(500).json({ error: 'Could not load saves.' })
      }
      return res.status(200).json({ saves: data || [] })
    } catch (err) {
      console.error('saved-builds: list threw', err)
      return res.status(500).json({ error: 'Could not load saves.' })
    }
  }

  // --------------------------------------------------------------- POST
  if (req.method === 'POST') {
    const body = (req.body && typeof req.body === 'object') ? req.body : {}
    const buildId = sanitizeBuildId(body.build_id)
    if (!buildId) {
      return res.status(400).json({ error: 'build_id is required.' })
    }
    const buildType = sanitizeBuildType(body.build_type)

    try {
      // Idempotent insert via upsert on the unique (user_id, build_id) pair.
      const { error } = await admin
        .from('saved_builds')
        .upsert(
          {
            user_id: auth.userId,
            build_id: buildId,
            build_type: buildType,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,build_id', ignoreDuplicates: true }
        )
      if (error) {
        console.error('saved-builds: insert failed', error)
        return res.status(500).json({ error: 'Could not save build.' })
      }
      return res.status(200).json({ saved: true, build_id: buildId })
    } catch (err) {
      console.error('saved-builds: insert threw', err)
      return res.status(500).json({ error: 'Could not save build.' })
    }
  }

  // ------------------------------------------------------------- DELETE
  if (req.method === 'DELETE') {
    const buildId = sanitizeBuildId(req.query?.build_id)
    if (!buildId) {
      return res.status(400).json({ error: 'build_id query param is required.' })
    }
    try {
      const { error } = await admin
        .from('saved_builds')
        .delete()
        .eq('user_id', auth.userId)
        .eq('build_id', buildId)
      if (error) {
        console.error('saved-builds: delete failed', error)
        return res.status(500).json({ error: 'Could not unsave build.' })
      }
      return res.status(200).json({ unsaved: true, build_id: buildId })
    } catch (err) {
      console.error('saved-builds: delete threw', err)
      return res.status(500).json({ error: 'Could not unsave build.' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
