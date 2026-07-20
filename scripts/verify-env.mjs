#!/usr/bin/env node
// Wilder Moms local env audit. Reads .env.example as the schema and
// compares it to .env (and .env.local if present). Reports missing,
// empty, misnamed, and placeholder values so a developer can see
// exactly which wires are not connected before they ship.
//
// Usage:
//   node scripts/verify-env.mjs
//   npm run verify-env
//
// Exits 0 if every required var is present and non-empty.
// Exits 1 if any required var is missing/empty/placeholder.
// Exits 2 on schema errors (no .env.example).
//
// Pair this with a Vercel pre-deploy check so an incomplete wiring
// is caught before users see "could not start checkout".

import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function readEnv(path) {
  if (!existsSync(path)) return { found: false, vars: {}, path }
  const raw = readFileSync(path, 'utf8')
  const vars = {}
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    vars[key] = value
  }
  return { found: true, vars, path }
}

function classify(value) {
  if (value === '' || value === undefined) return 'empty'
  if (/^(your[_-]|pk_test_your|<.*>)/i.test(value)) return 'placeholder'
  return 'ok'
}

const example = readEnv(resolve(root, '.env.example'))
if (!example.found) {
  console.error('No .env.example at project root. Cannot audit.')
  process.exit(2)
}

const envFiles = [
  readEnv(resolve(root, '.env')),
  readEnv(resolve(root, '.env.local')),
].filter((f) => f.found)

if (envFiles.length === 0) {
  console.error('No .env or .env.local found at project root.')
  process.exit(2)
}

const merged = Object.assign({}, ...envFiles.map((f) => f.vars))

// Classify schema entries
const schemaEntries = Object.entries(example.vars).map(([key, rawPlaceholder]) => ({
  key,
  rawPlaceholder,
  requiredBecause:
    classify(rawPlaceholder) === 'placeholder' || classify(rawPlaceholder) === 'empty',
}))

// Find issues
const missing = []
const empty = []
const placeholder = []
const misnamed = []
const unused = []

for (const entry of schemaEntries) {
  const actual = merged[entry.key]
  if (actual === undefined || actual === '') {
    if (entry.requiredBecause) missing.push(entry.key)
    else unused.push(entry.key)
  } else if (classify(actual) === 'placeholder') {
    placeholder.push(entry.key)
  }
}

const schemaKeys = new Set(schemaEntries.map((e) => e.key))
for (const key of Object.keys(merged)) {
  if (!schemaKeys.has(key)) misnamed.push(key)
}

// Group misnamed by likely typo (e.g., Secret= should be VITE_SUPABASE_PUBLISHABLE_KEY)
const typoHints = {
  Secret: 'VITE_SUPABASE_PUBLISHABLE_KEY (looks like a renamed Supabase publishable key)',
}

console.log('\n=== Wilder Moms · env audit ===\n')
console.log('Schema source:  .env.example')
console.log(
  'Env files:      ',
  envFiles.length > 0
    ? envFiles.map((f) => f.path.replace(root + '/', '')).join(', ')
    : 'none'
)
console.log()

const blocks = [
  ['MISSING (required by schema)', missing],
  ['EMPTY (no value set)', empty],
  ['PLACEHOLDER (still a `your_*` value)', placeholder],
  ['UNUSED IN SCHEMA (likely typos)', misnamed.map((k) => `${k}=` + (typoHints[k] ? ` — did you mean ${typoHints[k]}?` : ''))],
]

let anyIssue = false
for (const [label, list] of blocks) {
  if (list.length === 0) continue
  anyIssue = true
  console.log(`-- ${label}`)
  for (const item of list) console.log(`   ${item}`)
  console.log()
}

if (!anyIssue) {
  console.log('OK: every required env var is set and non-placeholder.')
  process.exit(0)
}

// Severity hint
const isProd = process.env.NODE_ENV === 'production'
console.log(
  isProd
    ? `Production mode: ${missing.length + empty.length + placeholder.length} critical issue(s). Failing build.`
    : `Local mode: ${missing.length + empty.length + placeholder.length} critical issue(s).`
)
process.exit(1)
