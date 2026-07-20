// requiredEnv — fail-fast helper for serverless handlers.
//
// Reports missing or empty environment variables both to Vercel logs
// (once per cold start) and as a 503 response so the client UI can
// surface a precise message instead of a generic 500.
//
// Usage:
//   import { requireEnv, envMissingResponse } from './_lib/requiredEnv.js'
//
//   export default async function handler(req, res) {
//     const check = requireEnv(['LEMON_API_KEY', 'LEMON_STORE_ID'])
//     if (!check.ok) return envMissingResponse(res, check.missing)
//     ...
//   }

const warnedColdStarts = new Set()

export function requireEnv(keys) {
  const missing = []
  for (const k of keys) {
    const v = process.env[k]
    if (v === undefined || v === null || String(v).trim() === '') {
      missing.push(k)
    }
  }
  if (missing.length === 0) return { ok: true, missing: [] }

  // Log once per cold start per list of missing keys so Vercel function
  // logs show the wiring problem without spamming.
  const sig = missing.slice().sort().join(',')
  if (!warnedColdStarts.has(sig)) {
    warnedColdStarts.add(sig)
    console.error(
      `[requiredEnv] handler invoked with missing env: ${missing.join(', ')}. ` +
        `Set these in Vercel → Project Settings → Environment Variables ` +
        `(or your .env file for local dev).`
    )
  }
  return { ok: false, missing }
}

export function envMissingResponse(res, missing) {
  return res.status(503).json({
    error:
      `Server is missing required configuration (${missing.join(', ')}). ` +
      'The site owner needs to wire these up before checkout can run.',
    missing,
  })
}
