import { createClient } from '@supabase/supabase-js'
import { getClerkUserFromRequest } from './_lib/clerkAuth.js'
import { requireEnv, envMissingResponse } from './_lib/requiredEnv.js'

// POST /api/lemon-checkout
// Creates a Lemon Squeezy checkout URL for the Wilder Builds subscription.
// The user's email is prefilled so the webhook can correlate.
//
// Body: {
//   plan?: 'monthly' | 'annual'  // defaults to 'annual' (recommended)
//   source?: string              // for analytics (e.g., 'paywall_card', 'comparison_column')
// }

const REQUIRED_LIT = [
  'LEMON_API_KEY',
  'LEMON_STORE_ID',
  'LEMON_VARIANT_ID_ANNUAL',
  'LEMON_VARIANT_ID_MONTHLY',
]

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const check = requireEnv(REQUIRED_LIT)
  if (!check.ok) return envMissingResponse(res, check.missing)

  const {
    LEMON_API_KEY,
    LEMON_STORE_ID,
    LEMON_VARIANT_ID_MONTHLY,
    LEMON_VARIANT_ID_ANNUAL,
    LEMON_CHECKOUT_SUCCESS_URL,
    LEMON_CHECKOUT_CANCEL_URL,
  } = process.env

  const requestedPlan = (req.body?.plan === 'monthly' || req.body?.plan === 'annual') ? req.body.plan : 'annual'
  const variantId = requestedPlan === 'monthly' ? LEMON_VARIANT_ID_MONTHLY : LEMON_VARIANT_ID_ANNUAL

  const auth = await getClerkUserFromRequest(req)
  if (!auth?.userId) {
    const reason = req.__clerkAuthError
    return res.status(401).json({
      error: 'You must be signed in to subscribe.',
      ...(reason ? { clerkAuthError: reason } : {}),
    })
  }

  // Look up the user's email via Clerk so the checkout is prefilled and the
  // webhook can correlate. Fall back gracefully if Clerk lookup fails.
  let email = null
  try {
    const { createClerkClient } = await import('@clerk/backend')
    const client = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
    const user = await client.users.getUser(auth.userId)
    email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || null
  } catch (err) {
    console.warn('lemon-checkout: could not load Clerk user email', err?.message)
  }

  if (!email) {
    return res.status(400).json({ error: 'No email on file. Update your account and try again.' })
  }

  const source = (req.body && typeof req.body.source === 'string') ? req.body.source.slice(0, 64) : 'unknown'
  const plan = (req.body?.plan === 'monthly' || req.body?.plan === 'annual') ? req.body.plan : 'annual'

  try {
    const lsRes = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${LEMON_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_options: {
              embed: false,
              media: false,
              logo: true,
            },
            checkout_data: {
              email,
              custom: {
                clerk_user_id: auth.userId,
                source,
                plan,
              },
            },
            product_options: {
              redirect_url: LEMON_CHECKOUT_SUCCESS_URL || 'https://your-domain.com/wilder-builds?subscribed=1',
              receipt_button_text: 'Open the Wilder Builds library',
              receipt_thank_you_note: 'Your PDFs are unlocked. Download anytime from the Builds library.',
            },
            expires_at: null,
          },
          relationships: {
            store: { data: { type: 'stores', id: LEMON_STORE_ID } },
            variant: { data: { type: 'variants', id: variantId } },
          },
        },
      }),
    })

    if (!lsRes.ok) {
      const text = await lsRes.text()
      console.error('Lemon Squeezy checkout error', lsRes.status, text)
      return res.status(502).json({ error: 'Could not start checkout. Please try again.' })
    }

    const json = await lsRes.json()
    const url = json?.data?.attributes?.url
    if (!url) {
      console.error('Lemon Squeezy checkout returned no URL', json)
      return res.status(502).json({ error: 'Checkout service did not return a URL.' })
    }

    // Analytics: log the click (best-effort, non-blocking)
    try {
      const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (supabaseUrl && supabaseKey) {
        const admin = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
        await admin.from('subscription_events').insert({
          clerk_user_id: auth.userId,
          event_type: 'checkout_started',
          source,
          metadata: { email, plan },
        })
      }
    } catch (err) {
      console.warn('lemon-checkout: could not log analytics', err?.message)
    }

    return res.status(200).json({ url })
  } catch (err) {
    console.error('lemon-checkout: unexpected error', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
