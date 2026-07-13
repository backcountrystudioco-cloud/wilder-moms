import { createHmac, timingSafeEqual } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { getCatalogEntry } from '../_lib/buildCatalog.js'

// POST /api/cron/send-drop
// Vercel cron target — runs on the 1st of each month at 9am UTC
// (schedule defined in vercel.json). Protected by CRON_SECRET.
//
// Looks up all `drops` rows with release_date <= today AND status = 'scheduled',
// creates a Resend broadcast for each, sends it to the Wilder Builds Subscribers
// audience, and marks the drop as sent (idempotent — won't re-send).
//
// Body (optional): { drop_id?: string, force?: boolean }
//   drop_id — restrict to one drop (e.g., for manual re-send testing)
//   force   — re-send even if status != 'scheduled'

function verifyCronAuth(req) {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const provided =
    req.headers?.authorization?.replace(/^Bearer\s+/i, '') ||
    req.headers?.['x-cron-secret'] ||
    req.query?.secret
  if (!provided || typeof provided !== 'string') return false
  try {
    const a = Buffer.from(secret)
    const b = Buffer.from(provided)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

function getAdminClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
}

function escapeHtml(s) {
  if (!s) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailHtml({ drop, builds, libraryUrl, baseFont = 'Georgia, serif' }) {
  const buildHtml = builds
    .map(b => `
      <tr>
        <td style="padding: 24px 0; border-bottom: 1px solid rgba(120,60,30,0.12);">
          <p style="text-transform: uppercase; letter-spacing: 0.18em; font-size: 10px; color: #8C1E00; margin: 0 0 6px;">${escapeHtml(b.typeLabel || 'Premium PDF')} · ${b.pages || 0} pages</p>
          <h2 style="font-family: ${baseFont}; font-style: italic; font-size: 28px; color: #3C1E00; margin: 0 0 8px; line-height: 1.2;">${escapeHtml(b.title)}</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #783C1E; margin: 0 0 14px;">${escapeHtml(b.subtitle)}</p>
          <p style="margin: 0;">
            <a href="${libraryUrl}/wilder-builds/builds/${b.slug}" style="background: #8C1E00; color: #FAF6EE; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block; font-family: -apple-system, sans-serif;">Open the build →</a>
          </p>
        </td>
      </tr>
    `)
    .join('')

  const intro = drop.email_intro ||
    `Two new builds this month — themed for ${drop.theme || 'the season'}. They're ready in your library now, re-download anytime.`

  return `
    <!doctype html>
    <html>
      <body style="margin: 0; padding: 0; background: #FAF6EE; font-family: ${baseFont}; color: #3C1E00;">
        <div style="max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #FAF6EE;">
          <p style="text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; color: #8C1E00; margin: 0 0 8px;">The Wilder Builds Monthly</p>
          <h1 style="font-family: ${baseFont}; font-style: italic; font-size: 36px; color: #3C1E00; margin: 0 0 14px; line-height: 1.15;">${escapeHtml(drop.title)}</h1>
          <p style="font-family: ${drop.subtitle ? baseFont : '-apple-system, sans-serif'}; font-style: italic; font-size: 18px; color: #783C1E; margin: 0 0 24px; line-height: 1.5;">${escapeHtml(drop.subtitle || '')}</p>
          <p style="font-size: 16px; line-height: 1.65; color: #3C1E00; margin: 0 0 28px;">${escapeHtml(intro)}</p>
          <table style="width: 100%; border-collapse: collapse;">${buildHtml}</table>
          <p style="font-size: 14px; line-height: 1.6; color: #783C1E; margin: 28px 0 0;">
            Your library now has ${builds.length === 2 ? 'these two new builds plus' : 'this new build plus'} every drop you've ever been a member for.
          </p>
          <p style="margin: 24px 0 0;">
            <a href="${libraryUrl}/wilder-builds" style="background: transparent; color: #8C1E00; padding: 12px 24px; border: 1.5px solid #8C1E00; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block; font-family: -apple-system, sans-serif;">Open your full library →</a>
          </p>
          <p style="font-size: 13px; line-height: 1.6; color: #783C1E; margin: 36px 0 0; padding-top: 24px; border-top: 1px solid rgba(120,60,30,0.12);">
            With dirt under our nails,<br/>
            Melissa & the Wilder Moms team
          </p>
          <p style="font-size: 11px; line-height: 1.5; color: rgba(120,60,30,0.5); margin: 16px 0 0;">
            You're getting this because you're a Wilder Builds subscriber. Manage your subscription anytime from your <a href="${libraryUrl}/wilder-builds" style="color: rgba(120,60,30,0.6);">library</a>.
          </p>
        </div>
      </body>
    </html>
  `
}

function libraryOrigin() {
  const successUrl = process.env.LEMON_CHECKOUT_SUCCESS_URL
  try {
    return new URL(successUrl).origin
  } catch {
    return 'https://your-domain.com'
  }
}

async function createAndSendBroadcast({ resend, audienceId, from, subject, html, name }) {
  // Step 1: create the broadcast in the audience
  const createRes = await fetch('https://api.resend.com/broadcasts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resend}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audience_id: audienceId,
      name,
      from,
      subject,
      html,
      // Reply to a monitored inbox so replies route to the team
      reply_to: 'hello@wildermoms.com',
    }),
  })
  if (!createRes.ok) {
    const text = await createRes.text()
    throw new Error(`create broadcast failed (${createRes.status}): ${text}`)
  }
  const created = await createRes.json()
  const broadcastId = created?.data?.id
  if (!broadcastId) throw new Error('create broadcast returned no id')

  // Step 2: schedule immediate send. Resend uses scheduled_at = null for "now".
  const sendRes = await fetch(`https://api.resend.com/broadcasts/${broadcastId}/send`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${resend}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  if (!sendRes.ok) {
    const text = await sendRes.text()
    throw new Error(`send broadcast failed (${sendRes.status}): ${text}`)
  }
  return broadcastId
}

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify cron auth (Vercel cron sends Authorization: Bearer $CRON_SECRET by default)
  if (!verifyCronAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Required env
  const resendKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  const from = process.env.RESEND_FROM_ADDRESS || 'Wilder Moms <hello@wildermoms.com>'
  if (!resendKey || !audienceId) {
    return res.status(500).json({ error: 'Resend not configured' })
  }

  const admin = getAdminClient()
  if (!admin) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  // Resolve which drops to send
  const today = new Date().toISOString().slice(0, 10)
  const body = (req.method === 'POST' && req.body) || {}
  const forcedDropId = typeof body.drop_id === 'string' ? body.drop_id : null
  const forceResend = body.force === true

  let dueDrops = []
  if (forcedDropId) {
    const { data, error } = await admin
      .from('drops')
      .select('*')
      .eq('id', forcedDropId)
      .maybeSingle()
    if (error || !data) return res.status(404).json({ error: `drop ${forcedDropId} not found` })
    if (!forceResend && data.status === 'sent') {
      return res.status(200).json({ ok: true, skipped: true, reason: 'already sent', drop: data })
    }
    dueDrops = [data]
  } else {
    const { data, error } = await admin
      .from('drops')
      .select('*')
      .eq('status', 'scheduled')
      .lte('release_date', today)
      .order('release_date', { ascending: true })
    if (error) {
      console.error('send-drop: query failed', error)
      return res.status(500).json({ error: 'Failed to load drops' })
    }
    dueDrops = data || []
  }

  if (dueDrops.length === 0) {
    return res.status(200).json({ ok: true, sent: 0 })
  }

  // Load the latest build catalog from the deployed source so the email
  // reflects the actual builds even if buildsLibrary.js changes.
  // We re-read from a small inline catalog stored in the same file we ship.
  // For server-side use we accept that the operator must keep it in sync.
  // Simpler: hardcode the launch drop content here for v1, and read from
  // a future `drops.builds` join as the catalog grows.

  const libraryUrl = libraryOrigin()
  const results = []

  for (const drop of dueDrops) {
    // Flip status to 'sending' immediately to prevent concurrent runs
    await admin.from('drops').update({ status: 'sending' }).eq('id', drop.id)

    // Resolve builds
    const builds = (drop.build_ids || [])
      .map(id => getCatalogEntry(id))
      .filter(Boolean)

    if (builds.length === 0) {
      console.warn('send-drop: no builds resolved for', drop.id)
      await admin.from('drops').update({ status: 'failed' }).eq('id', drop.id)
      results.push({ dropId: drop.id, ok: false, reason: 'no builds' })
      continue
    }

    const subject = drop.email_subject || `${drop.title} — two new Wilder Builds are live`
    const html = buildEmailHtml({ drop, builds, libraryUrl })

    try {
      const broadcastId = await createAndSendBroadcast({
        resend: resendKey,
        audienceId,
        from,
        subject,
        html,
        name: `${drop.title} (${drop.release_date})`,
      })
      await admin.from('drops').update({
        status: 'sent',
        sent_at: new Date().toISOString(),
      }).eq('id', drop.id)
      await admin.from('email_sends').insert({
        drop_id: drop.id,
        kind: 'broadcast',
        resend_id: broadcastId,
        sent_by: forcedDropId ? 'manual' : 'cron',
      })
      results.push({ dropId: drop.id, ok: true, broadcastId })
    } catch (err) {
      console.error('send-drop: send failed for', drop.id, err)
      await admin.from('drops').update({ status: 'failed' }).eq('id', drop.id)
      await admin.from('email_sends').insert({
        drop_id: drop.id,
        kind: 'broadcast',
        sent_by: 'cron',
        metadata: { error: err?.message || String(err) },
      })
      results.push({ dropId: drop.id, ok: false, error: err?.message })
    }
  }

  return res.status(200).json({ ok: true, sent: results.filter(r => r.ok).length, results })
}

// Build catalog metadata now lives in api/_lib/buildCatalog.js
