import { createHmac, timingSafeEqual } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { getClerkUserIdByEmail } from './_lib/clerkAuth.js'

// POST /api/lemon-webhook
// Receives Lemon Squeezy subscription events. Verifies HMAC signature.
// Upserts the Supabase `subscriptions` row keyed by Clerk user ID.
// Idempotent: keyed on lemon_subscription_id (deduped in subscription_events).
//
// Subscribed events: subscription_created, subscription_updated,
//                    subscription_cancelled, subscription_expired.

const SUBSCRIPTION_EVENTS = new Set([
  'subscription_created',
  'subscription_updated',
  'subscription_resumed',
  'subscription_cancelled',
  'subscription_expired',
  'subscription_unpaused',
  'subscription_paused',
])

function verifyLemonSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false
  try {
    const hmac = createHmac('sha256', secret).update(rawBody).digest('hex')
    const a = Buffer.from(hmac, 'utf8')
    const b = Buffer.from(signature, 'utf8')
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

// Read raw body for HMAC verification (Vercel provides req.body as parsed JSON
// only when content-type is application/json; for raw bytes we read the stream.)
async function readRawBody(req) {
  if (typeof req.body === 'string') return req.body
  if (req.body && typeof req.body === 'object') {
    // Already parsed — fall back to JSON.stringify. This is unsafe for HMAC
    // unless the raw bytes match, so we warn and continue.
    console.warn('lemon-webhook: req.body already parsed, HMAC may not match')
    return JSON.stringify(req.body)
  }
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function mapStatus(eventName) {
  switch (eventName) {
    case 'subscription_created':
    case 'subscription_updated':
    case 'subscription_resumed':
    case 'subscription_unpaused':
      return 'active'
    case 'subscription_paused':
      return 'paused'
    case 'subscription_cancelled':
      return 'cancelled'
    case 'subscription_expired':
      return 'expired'
    default:
      return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secret = process.env.LEMON_WEBHOOK_SECRET
  const signature = req.headers['x-signature'] || req.headers['X-Signature']
  const rawBody = await readRawBody(req)

  if (!verifyLemonSignature(rawBody, signature, secret)) {
    console.warn('lemon-webhook: invalid signature')
    return res.status(401).json({ error: 'Invalid signature' })
  }

  let event
  try {
    event = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody
  } catch (err) {
    console.warn('lemon-webhook: invalid JSON', err?.message)
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const eventName = event?.meta?.event_name
  if (!eventName || !SUBSCRIPTION_EVENTS.has(eventName)) {
    // Acknowledge so Lemon Squeezy doesn't retry, but no-op.
    return res.status(200).json({ ok: true, ignored: true })
  }

  const sub = event?.data?.attributes
  const lemonSubscriptionId = event?.data?.id
  const customerEmail = sub?.user_email || sub?.customer_email
  const status = mapStatus(eventName)
  const currentPeriodEnd = sub?.renews_at || sub?.ends_at || null
  const variantId = sub?.variant_id ? String(sub.variant_id) : null
  const customerId = sub?.customer_id ? String(sub.customer_id) : null

  if (!lemonSubscriptionId || !customerEmail) {
    console.warn('lemon-webhook: missing subscription id or email', { lemonSubscriptionId, customerEmail })
    return res.status(200).json({ ok: true, ignored: true })
  }

  const admin = getAdminClient()
  if (!admin) {
    console.error('lemon-webhook: Supabase not configured')
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  // Idempotency: check if we've already processed this event by id.
  // Lemon Squeezy doesn't send a stable event id, so we use lemon_subscription_id
  // + event_name as a logical dedup key.
  const dedupKey = `${lemonSubscriptionId}:${eventName}`
  try {
    const { data: existing } = await admin
      .from('subscription_events')
      .select('id')
      .eq('lemon_event_key', dedupKey)
      .maybeSingle()
    if (existing) {
      return res.status(200).json({ ok: true, deduped: true })
    }
  } catch (err) {
    console.warn('lemon-webhook: dedup check failed', err?.message)
    // continue — better to risk a small duplicate than miss the event
  }

  // Correlate email → Clerk user
  const clerkUserId = await getClerkUserIdByEmail(customerEmail)
  if (!clerkUserId) {
    console.warn('lemon-webhook: no Clerk user for email', customerEmail)
    // Still log the event so we can backfill later if the user signs up.
    try {
      await admin.from('subscription_events').insert({
        lemon_event_key: dedupKey,
        event_type: eventName,
        metadata: { email: customerEmail, reason: 'no_clerk_user', lemon_subscription_id: lemonSubscriptionId },
      })
    } catch (err) {
      console.warn('lemon-webhook: failed to log orphan event', err?.message)
    }
    return res.status(200).json({ ok: true, ignored: true })
  }

  // Upsert the subscriptions row.
  try {
    const { error: upsertErr } = await admin.from('subscriptions').upsert(
      {
        clerk_user_id: clerkUserId,
        lemon_customer_id: customerId,
        lemon_subscription_id: String(lemonSubscriptionId),
        lemon_variant_id: variantId,
        status,
        current_period_end: currentPeriodEnd,
        customer_email: customerEmail,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'clerk_user_id' }
    )
    if (upsertErr) {
      console.error('lemon-webhook: subscription upsert failed', upsertErr)
      return res.status(500).json({ error: 'Failed to update subscription' })
    }
  } catch (err) {
    console.error('lemon-webhook: subscription upsert threw', err)
    return res.status(500).json({ error: 'Internal error' })
  }

  // Log the event (best-effort)
  try {
    await admin.from('subscription_events').insert({
      clerk_user_id: clerkUserId,
      lemon_event_key: dedupKey,
      event_type: eventName,
      source: event?.meta?.custom_data?.source || null,
      metadata: { status, current_period_end: currentPeriodEnd, lemon_subscription_id: lemonSubscriptionId },
    })
  } catch (err) {
    console.warn('lemon-webhook: failed to log event', err?.message)
  }

  // Resend audience sync. Maintains the broadcast list for monthly drops.
  // On subscribe/resume → add with first/last name from Clerk + status=active.
  // On cancel/expire → keep contact in audience but tag status so we skip them.
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const audienceId = process.env.RESEND_AUDIENCE_ID

      if (status === 'active') {
        // Lookup name from Clerk
        let firstName = null
        let lastName = null
        try {
          const { createClerkClient } = await import('@clerk/backend')
          const cc = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
          const u = await cc.users.getUser(clerkUserId)
          firstName = u?.firstName || null
          lastName = u?.lastName || null
        } catch (e) {
          console.warn('lemon-webhook: Clerk name lookup failed', e?.message)
        }

        await resend.contacts.create({
          audienceId,
          email: customerEmail,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          unsubscribed: false,
        })
      } else if (status === 'cancelled' || status === 'expired') {
        // Tag so monthly cron can skip them; keep them in the audience
        // so a re-subscribe reactivates without re-adding.
        try {
          await resend.contacts.update({
            audienceId,
            email: customerEmail,
            unsubscribed: false,
          })
          // Note: Resend doesn't expose arbitrary key/value properties on
          // contacts via REST in this version, so we can't write a 'status'
          // tag from here. Instead the cron endpoint checks the Supabase
          // subscriptions table directly — which is the authoritative source.
        } catch (e) {
          console.warn('lemon-webhook: Resend contact update failed', e?.message)
        }
      }
    } catch (err) {
      console.warn('lemon-webhook: Resend audience sync failed', err?.message)
    }
  }

  // Welcome email on first subscription. Non-blocking — if Resend is down,
  // the user still gets access; they can re-download from the library.
  if (eventName === 'subscription_created') {
    // Populate acquired_guides with every build from current + past drops.
    // Idempotent via upsert on (user_id, build_id). The library is
    // cumulative — a subscriber keeps everything they've ever been paid for,
    // so granting all past drops here means re-subscribers re-receive the
    // historical library automatically (and the upsert is a no-op if they
    // already have those rows).
    //
    // On subscription_cancelled / subscription_expired we intentionally do
    // NOT delete acquired_guides — the rows stay as a historical record.
    // Authoritative access checks live on subscriptions.status; the /api/my-guides
    // endpoint reports status, and /api/builds-pdf refuses non-active subs.
    try {
      const today = new Date().toISOString().slice(0, 10)
      const { data: dropRows, error: dropErr } = await admin
        .from('drops')
        .select('id, build_ids')
        .lte('release_date', today)
      if (dropErr) {
        console.warn('lemon-webhook: drops lookup failed', dropErr?.message)
      } else {
        const acquired = []
        const seen = new Set()
        for (const drop of dropRows || []) {
          for (const buildId of (drop.build_ids || [])) {
            if (typeof buildId !== 'string' || !buildId) continue
            const key = buildId
            if (seen.has(key)) continue
            seen.add(key)
            acquired.push({
              user_id: clerkUserId,
              build_id: key,
              drop_id: drop.id,
              acquisition_source: 'subscription',
              acquired_at: new Date().toISOString(),
            })
          }
        }
        if (acquired.length > 0) {
          const { error: insertErr } = await admin
            .from('acquired_guides')
            .upsert(acquired, { onConflict: 'user_id,build_id', ignoreDuplicates: true })
          if (insertErr) {
            console.error('lemon-webhook: acquired_guides upsert failed', insertErr)
          }
        }
      }
    } catch (err) {
      console.warn('lemon-webhook: acquired_guides populate threw', err?.message)
    }
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const libraryUrl = process.env.LEMON_CHECKOUT_SUCCESS_URL
        ? new URL(process.env.LEMON_CHECKOUT_SUCCESS_URL).origin + '/wilder-builds'
        : 'https://your-domain.com/wilder-builds'
      const from = process.env.RESEND_FROM_ADDRESS || 'Wilder Moms <hello@wildermoms.com>'
      await resend.emails.send({
        from,
        to: customerEmail,
        subject: "You're in. Two new builds land in your library on the 1st.",
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #3C1E00; background: #FAF6EE; padding: 32px;">
            <p style="text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; color: #8C1E00; margin: 0 0 12px;">The Wilder Builds Library</p>
            <h1 style="font-size: 32px; font-style: italic; margin: 0 0 16px; line-height: 1.2;">Welcome in. Your library is open.</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #783C1E;">The Fairy Apothecary and Mycelium Donuts are waiting for you — download them now, or anytime. They're yours to keep even if you cancel later.</p>
            <p style="margin: 28px 0;">
              <a href="${libraryUrl}" style="background: #8C1E00; color: white; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block;">Open the library →</a>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #783C1E;"><strong>The library grows every month.</strong> On the 1st, two new themed PDFs land in your inbox — and your library. Outdoor kitchens, garden beds, science builds, art invitations. Whatever the season calls for.</p>
            <p style="font-size: 14px; line-height: 1.6; color: #783C1E;">Manage your subscription anytime from your <a href="${libraryUrl}" style="color: #8C1E00;">library page</a>.</p>
            <p style="font-size: 14px; line-height: 1.6; color: #783C1E; margin-top: 32px;">With dirt under our nails,<br/>Melissa & the Wilder Moms team</p>
          </div>
        `,
      })
    } catch (err) {
      console.warn('lemon-webhook: welcome email failed', err?.message)
    }
  }

  return res.status(200).json({ ok: true })
}
