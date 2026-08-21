// Catches near-duplicate survey questions so the same question never
// ships twice in the field check. Run via `npm run check:questions`.
// Also runs as a pre-commit check via lint-staged if present.
//
// Method: tokenize each question text, build a set of content words
// (drop common English stopwords + low-signal Wilder vocabulary).
// Compare every pair via Jaccard similarity. Flag any pair with
// similarity above DUPE_THRESHOLD. Cross-dimension dupes are also
// flagged because the user already saw the case where belonging.q3
// and restoration.q2 both asked about "chair, shade."

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const questionsPath = resolve(__dirname, '..', 'src', 'wilder-index', 'questions.js')

const STOPWORDS = new Set([
  // English stopwords
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'have', 'has', 'had', 'having', 'do', 'does',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'its', 'our', 'their',
  'this', 'that', 'these', 'those',
  'and', 'or', 'but', 'if', 'then', 'so', 'as', 'of', 'in', 'on', 'at', 'to',
  'for', 'with', 'by', 'from', 'about', 'into', 'over', 'under', 'between',
  'than', 'too', 'very', 'can', 'will', 'just', 'don', 't', 's', 're', 'll',
  // Low-signal Wilder vocabulary that would inflate similarity scores
  'home', 'family', 'kid', 'kids', 'child', 'children', 'often', 'sometimes',
  'never', 'most', 'almost', 'always', 'weeks', 'week', 'much', 'many',
  'one', 'two', 'three', 'four', 'five', 'six', 'around', 'going', 'going',
])

function tokenize(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s']/g, ' ')
      .split(/\s+/)
      .filter((w) => w && !STOPWORDS.has(w) && w.length > 2)
  )
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const x of a) if (b.has(x)) inter += 1
  const union = a.size + b.size - inter
  return inter / union
}

const DUPE_THRESHOLD = 0.5
const SUSPICIOUS_THRESHOLD = 0.35

// Read questions.js as text and parse out { id, text } pairs. We use a
// minimal regex pull rather than evaluating the file (which has imports).
const src = readFileSync(questionsPath, 'utf8')
const blockRegex = /id:\s*'([^']+)',[\s\S]*?text:\s*'((?:\\'|[^'])*)'/g
const questions = []
let m
while ((m = blockRegex.exec(src)) !== null) {
  questions.push({ id: m[1], text: m[2].replace(/\\'/g, "'") })
}

if (questions.length === 0) {
  console.error('No questions parsed from questions.js — check the regex.')
  process.exit(1)
}

const pairs = []
for (let i = 0; i < questions.length; i++) {
  for (let j = i + 1; j < questions.length; j++) {
    const a = questions[i]
    const b = questions[j]
    const ta = tokenize(a.text)
    const tb = tokenize(b.text)
    const sim = jaccard(ta, tb)
    if (sim >= DUPE_THRESHOLD) {
      pairs.push({ a, b, sim, level: 'dupe' })
    } else if (sim >= SUSPICIOUS_THRESHOLD) {
      pairs.push({ a, b, sim, level: 'suspicious' })
    }
  }
}

const dupes = pairs.filter((p) => p.level === 'dupe')
const suspicious = pairs.filter((p) => p.level === 'suspicious')

if (dupes.length > 0) {
  console.error(`\nFound ${dupes.length} near-duplicate question pair(s):\n`)
  for (const p of dupes) {
    console.error(`  [${p.sim.toFixed(2)}] ${p.a.id}  <->  ${p.b.id}`)
    console.error(`         "${p.a.text}"`)
    console.error(`         "${p.b.text}"`)
    console.error('')
  }
}
if (suspicious.length > 0) {
  console.warn(`\nFound ${suspicious.length} suspicious pair(s) — review for overlap:\n`)
  for (const p of suspicious) {
    console.warn(`  [${p.sim.toFixed(2)}] ${p.a.id}  <->  ${p.b.id}`)
    console.warn(`         "${p.a.text}"`)
    console.warn(`         "${p.b.text}"`)
    console.warn('')
  }
}

if (dupes.length > 0) {
  console.error('FAIL: drop or rewrite the duplicate questions before committing.')
  process.exit(1)
}

console.log(
  `OK: ${questions.length} questions, ${dupes.length} dupes, ${suspicious.length} suspicious.`
)
