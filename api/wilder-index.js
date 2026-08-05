import { createClient } from '@supabase/supabase-js'
import { getClerkUserFromRequest } from './_lib/clerkAuth.js'
import { requireEnv, envMissingResponse } from './_lib/requiredEnv.js'

// /api/wilder-index
// Persists each user's Wilder Index state in Supabase. This replaces the
// earlier Clerk `unsafeMetadata` approach, which has a small payload
// limit and was never meant to hold a per-user state blob.
//
//   GET    /api/wilder-index -> { state, updatedAt, migratedFromClerk }
//   PUT    /api/wilder-index -> { saved: true, updatedAt }
//                               body: { state: <object>, migrateFromClerk?: boolean }
//   DELETE /api/wilder-index -> { deleted: true }  (used by "Retake the field check")
//
// Auth: Clerk Bearer token (verified server-side).
// Storage: Supabase via SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
// Table:   public.wilder_index_state (PK = clerk_user_id).

const HISTORY_CAP = 500
const ACTIVE_DAYS_CAP = 365
const SHOWN_PER_KIND_CAP = 12

function getAdminClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function clampArray(raw, cap) {
  if (!Array.isArray(raw)) return raw
  if (raw.length <= cap) return raw
  return raw.slice(raw.length - cap)
}

// Clamps the known growable arrays on the Wilder Index state and lets
// every other top-level key pass through unchanged.
function sanitizeState(raw) {
  if (!isPlainObject(raw)) return null
  const safe = { ...raw }

  if ('history' in raw) {
    safe.history = clampArray(raw.history, HISTORY_CAP)
  }
  if ('activeDays' in raw) {
    safe.activeDays = clampArray(raw.activeDays, ACTIVE_DAYS_CAP)
  }
  if ('shownUpgradeIds' in raw && isPlainObject(raw.shownUpgradeIds)) {
    const incoming = raw.shownUpgradeIds
    safe.shownUpgradeIds = {
      habitat: Array.isArray(incoming.habitat)
        ? clampArray(incoming.habitat, SHOWN_PER_KIND_CAP)
        : [],
      neighborhood: Array.isArray(incoming.neighborhood)
        ? clampArray(incoming.neighborhood, SHOWN_PER_KIND_CAP)
        : [],
    }
  }

  return safe
}

export default async function handler(req, res) {
  const auth = await getClerkUserFromRequest(req)
  if (!auth?.userId) {
    return res.status(401).json({
      error: 'You must be signed in to save your Wilder Index.',
      code: 'UNAUTHORIZED',
    })
  }

  // At least one of VITE_SUPABASE_URL / SUPABASE_URL must be present,
  // plus the service role key. The OR is encoded as a label so the
  // 503 error message tells the operator what to wire up.
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const check = requireEnv(
    supabaseUrl
      ? ['SUPABASE_SERVICE_ROLE_KEY']
      : ['VITE_SUPABASE_URL or SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
  )
  if (!check.ok) return envMissingResponse(res, check.missing)

  const admin = getAdminClient()
  if (!admin) {
    return res.status(500).json({ error: 'Storage is not configured on this server.' })
  }

  // ---------------------------------------------------------------- GET
  if (req.method === 'GET') {
    try {
      const { data, error } = await admin
        .from('wilder_index_state')
        .select('state, updated_at, migrated_from_clerk_metadata')
        .eq('clerk_user_id', auth.userId)
        .maybeSingle()
      if (error) {
        console.error('[wilder-index] get failed', error)
        return res.status(500).json({ error: 'Could not load Wilder Index state.' })
      }
      if (!data) {
        return res.status(200).json({
          state: null,
          updatedAt: null,
          migratedFromClerk: false,
        })
      }
      return res.status(200).json({
        state: data.state ?? null,
        updatedAt: data.updated_at ?? null,
        migratedFromClerk: Boolean(data.migrated_from_clerk_metadata),
      })
    } catch (err) {
      console.error('[wilder-index] get threw', err)
      return res.status(500).json({ error: 'Could not load Wilder Index state.' })
    }
  }

  // ---------------------------------------------------------------- PUT
  if (req.method === 'PUT') {
    const body = (req.body && typeof req.body === 'object') ? req.body : {}
    if (!isPlainObject(body.state)) {
      return res.status(400).json({
        error: 'state must be a JSON object.',
        code: 'INVALID_STATE',
      })
    }
    const sanitizedState = sanitizeState(body.state)
    if (!isPlainObject(sanitizedState)) {
      return res.status(400).json({
        error: 'state must be a JSON object.',
        code: 'INVALID_STATE',
      })
    }
    const migrateFromClerk = body.migrateFromClerk === true
    const nowIso = new Date().toISOString()

    try {
      // Distinct insert vs update so we only stamp
      // migrated_from_clerk_metadata on the first-ever row. Upsert would
      // overwrite the flag on every write, which would lose the
      // "migrated" signal for users who keep editing their state.
      const { data: existing, error: lookupErr } = await admin
        .from('wilder_index_state')
        .select('clerk_user_id')
        .eq('clerk_user_id', auth.userId)
        .maybeSingle()
      if (lookupErr) {
        console.error('[wilder-index] put lookup failed', lookupErr)
        return res.status(500).json({ error: 'Could not save Wilder Index state.' })
      }

      let updatedAt = nowIso

      if (existing) {
        const { data, error } = await admin
          .from('wilder_index_state')
          .update({ state: sanitizedState, updated_at: nowIso })
          .eq('clerk_user_id', auth.userId)
          .select('updated_at')
          .single()
        if (error) {
          console.error('[wilder-index] update failed', error)
          return res.status(500).json({ error: 'Could not save Wilder Index state.' })
        }
        updatedAt = data?.updated_at || nowIso
      } else {
        const { data, error } = await admin
          .from('wilder_index_state')
          .insert({
            clerk_user_id: auth.userId,
            state: sanitizedState,
            schema_version: 1,
            updated_at: nowIso,
            migrated_from_clerk_metadata: migrateFromClerk,
          })
          .select('updated_at')
          .single()
        if (error) {
          console.error('[wilder-index] insert failed', error)
          return res.status(500).json({ error: 'Could not save Wilder Index state.' })
        }
        updatedAt = data?.updated_at || nowIso
      }

      return res.status(200).json({ saved: true, updatedAt })
    } catch (err) {
      console.error('[wilder-index] put threw', err)
      return res.status(500).json({ error: 'Could not save Wilder Index state.' })
    }
  }

  // ------------------------------------------------------------- DELETE
  if (req.method === 'DELETE') {
    try {
      const { error } = await admin
        .from('wilder_index_state')
        .delete()
        .eq('clerk_user_id', auth.userId)
      if (error) {
        console.error('[wilder-index] delete failed', error)
        return res.status(500).json({ error: 'Could not delete Wilder Index state.' })
      }
      return res.status(200).json({ deleted: true })
    } catch (err) {
      console.error('[wilder-index] delete threw', err)
      return res.status(500).json({ error: 'Could not delete Wilder Index state.' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
