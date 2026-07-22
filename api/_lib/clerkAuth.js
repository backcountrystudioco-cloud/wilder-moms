// Shared server-side helpers for Clerk auth + Supabase admin operations.
// Use this from any /api/*.js handler that needs to identify the caller.

import { createClerkClient } from '@clerk/backend'

let cachedClient = null

export function getClerkClient() {
  if (cachedClient) return cachedClient
  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    throw new Error('CLERK_SECRET_KEY is not set')
  }
  cachedClient = createClerkClient({ secretKey })
  return cachedClient
}

// Reads the Clerk session token from `Authorization: Bearer <token>` and
// returns { userId, sessionId, claims } or null if no valid session.
//
// When verification fails, the catch block still returns null (callers
// translate that to a 401) but stashes the failure reason on the request
// via `req.__clerkAuthError` so handlers can surface it to the UI /
// logs without losing triage info.
export async function getClerkUserFromRequest(req) {
  const auth = req.headers?.authorization || req.headers?.Authorization
  if (!auth || typeof auth !== 'string') return null
  const match = auth.match(/^Bearer\s+(.+)$/i)
  if (!match) return null
  const token = match[1].trim()
  try {
    const client = getClerkClient()
    const payload = await client.verifyToken(token)
    if (!payload?.sub) return null
    return {
      userId: payload.sub,
      sessionId: payload.sid,
      claims: payload,
    }
  } catch (err) {
    const reason = err?.message || String(err)
    console.warn('Clerk verifyToken failed', reason)
    if (req && typeof req === 'object') req.__clerkAuthError = reason
    return null
  }
}

// Resolves a Clerk userId from a customer email. Used by the Lemon Squeezy
// webhook to correlate a new subscription back to the Wilder Moms user.
export async function getClerkUserIdByEmail(email) {
  if (!email) return null
  try {
    const client = getClerkClient()
    const list = await client.users.getUserList({ emailAddress: [email] })
    const user = list?.data?.[0]
    return user?.id || null
  } catch (err) {
    console.warn('Clerk getUserList failed', err?.message)
    return null
  }
}
