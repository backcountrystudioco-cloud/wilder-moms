// AI Local Recommendations API - calls OpenAI to generate 3-5 grounded,
// location-aware weekly recommendations for a family that just finished the
// Wilder Index onboarding. Uses gpt-4o-mini directly via fetch (matches the
// existing ai-trail-finder / ai-build-generator pattern).
//
// Requires OPENAI_API_KEY in environment variables.

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = 'gpt-4o-mini'
const TIMEOUT_MS = 12_000
const VALID_KINDS = new Set(['route', 'third_place', 'habitat', 'seasonal', 'social', 'small_thing'])

const SYSTEM_PROMPT = `You are Wilder Companion — a warm, observant, non-judgmental guide for parents of young children. You write personalized, location-aware recommendations grounded in the family's Wilder Index profile and the neighborhood prototype provided.

CRITICAL RULES
1. ONLY recommend places, routes, and patterns the family could plausibly find within walking distance (or a short drive if they confirmed a car) of where they live. The location label and block amenities you receive are the truth.
2. Use the block amenities the family confirmed (library, cafe, park, water, transit, school, trees, corner store) as the raw material for specific recommendations. A family that confirmed "library" and "cafe" should get recommendations that use those, not generic parks.
3. Each recommendation must connect a specific feature in their block to a specific habit in their week. Avoid vague advice like "spend more time outside."
4. Match the family's kids' ages and their "when" pattern (after-school, morning, weekend).
5. Honor the obstacle they named. If they said "energy after work," do not recommend a 90-minute weekend expedition.
6. Be specific but NEVER invent real businesses, parks, transit routes, or street names. Speak about "your local library" or "a café two blocks from your stoop," not "Café Lumière on 5th Street."
7. Each recommendation must be actionable this week, not aspirational.
8. Return only valid JSON matching the requested schema.
9. NEVER repeat a recommendation the family has already seen or already done. The PRIOR WEEK LIST and the COMPLETED LIST below are the family's actual recent weeks. Suggest something meaningfully different in kind, action, or location each time. If you can't avoid a topic entirely (e.g., they only have one park), propose a different angle (time of day, who goes, what to do there). Never output a recommendation whose title or core action substantially overlaps with anything in those lists.`

function buildUserPrompt({ profile = {}, scores = {}, location = {}, previouslyShown = [], completedRecently = [] }) {
  const p = profile, s = scores, l = location
  const join = (arr, fallback) => Array.isArray(arr) && arr.length ? arr.join(', ') : fallback

  const prior = (Array.isArray(previouslyShown) ? previouslyShown : [])
    .filter((x) => x && (x.title || x.action))
    .slice(0, 12)
  const completed = (Array.isArray(completedRecently) ? completedRecently : [])
    .filter((x) => x && (x.title || x.action))
    .slice(0, 12)

  const priorBlock = prior.length
    ? `PRIOR WEEK (do NOT repeat any of these in kind, title, or core action)
${prior.map((x, i) => `  ${i + 1}. ${x.kind ? `[${x.kind}] ` : ''}${x.title || ''}${x.action ? ` — ${x.action}` : ''}`).join('\n')}`
    : ''
  const completedBlock = completed.length
    ? `COMPLETED RECENTLY (this family already did these — suggest something new, not a redo)
${completed.map((x, i) => `  ${i + 1}. ${x.title || ''}${x.action ? ` — ${x.action}` : ''}`).join('\n')}`
    : ''

  return `FAMILY PROFILE
- Kids: ${join(p.kids, '(not specified)')}
- Outside most: ${p.when || 'not specified'}
- Car available: ${p.car || 'not specified'}
- Block amenities (confirmed within 10-min walk): ${join(p.block, 'none confirmed')}
- Big obstacle this month: ${p.obstacle || '(none given)'}

CONTEXT (soft signals — use to choose fits, not to override the pattern)
- Weekly schedule: ${p.schedule || 'not specified'}
- Partner / caregiver alignment: ${p.partner || 'not specified'}
- Energy after an hour outside: ${p.energy || 'not specified'}
- Access notes: ${join(p.access, 'none specified')}

WILDER PATTERN (six dimensions, 0-100)
- Belonging: ${s.belonging ?? 0}
- Independence: ${s.independence ?? 0}
- Wonder: ${s.wonder ?? 0}
- Restoration: ${s.restoration ?? 0}
- Daily Nature: ${s.dailyNature ?? 0}
- Adventure: ${s.adventure ?? 0}

LOCATION
- They live in: ${l.displayName || 'your area'}
- Neighborhood prototype: ${l.prototypeName || 'Your neighborhood'}
- Prototype features: ${join(l.prototypeFeatures, 'general neighborhood')}
- Prototype obstacles: ${join(l.prototypeObstacles, 'none flagged')}
- Climate: ${l.climateBand || 'general'}

${priorBlock ? priorBlock + '\n\n' : ''}${completedBlock ? completedBlock + '\n\n' : ''}Return JSON exactly:
{ "recommendations": [ { "kind": "route" | "third_place" | "habitat" | "seasonal" | "social" | "small_thing", "title": "Short, evocative title (under 8 words)", "action": "Specific action with a duration. Under 280 chars. Use 'your local X' framing, not invented names.", "why": "Why this fits your specific pattern + prototype. Under 180 chars.", "time": "This week" | "Today" | "Saturday morning" | "After school" | "15 minutes" } ] }
Generate exactly 4 recommendations. Each must be different from anything in the PRIOR WEEK or COMPLETED lists above.`
}

// Strip ```json fences, then grab the first outermost JSON object.
function extractJsonObject(text) {
  if (!text) return null
  let clean = String(text).trim()
  if (clean.startsWith('```json')) clean = clean.slice(7)
  else if (clean.startsWith('```')) clean = clean.slice(3)
  if (clean.endsWith('```')) clean = clean.slice(0, -3)
  const match = clean.trim().match(/\{[\s\S]*\}/)
  if (!match) return null
  try { return JSON.parse(match[0]) } catch { return null }
}

function clamp(str, max) {
  if (typeof str !== 'string') return ''
  const s = str.trim()
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

function isValidRecommendation(item) {
  if (!item || typeof item !== 'object') return false
  if (!VALID_KINDS.has(item.kind)) return false
  const t = String(item.title || '').trim()
  const a = String(item.action || '').trim()
  const w = String(item.why || '').trim()
  const ti = String(item.time || '').trim()
  if (!t || !a || !w || !ti) return false
  if (a.length > 300 || w.length > 200) return false
  return true
}

function validateRecommendations(parsed) {
  const list = Array.isArray(parsed?.recommendations) ? parsed.recommendations : null
  if (!list || list.length < 3 || list.length > 5) return null
  const cleaned = list.filter(isValidRecommendation).map((r) => ({
    kind: r.kind, title: clamp(r.title, 80), action: clamp(r.action, 300),
    why: clamp(r.why, 200), time: clamp(r.time, 40),
  }))
  return cleaned.length >= 3 ? cleaned : null
}

// Deterministic fallback used when the API is down, the key is missing, the
// JSON is malformed, or the response fails validation. Always returns 4 items.
function buildFallback({ profile = {} } = {}) {
  const block = Array.isArray(profile.block) ? profile.block : []
  const obstacle = String(profile.obstacle || '')
  const has = (slug) => block.includes(slug)
  const recs = []
  if (has('trees') || has('park')) {
    recs.push({ kind: 'route', title: 'A short loop past your trees', action: 'Walk the same 10-minute block twice this week, eyes up. Say one thing out loud about what you see. The repetition is the point.', why: 'Wonder grows on repetition, and your block has something worth noticing.', time: '15 minutes' })
  } else if (has('water')) {
    recs.push({ kind: 'route', title: 'A walk to the nearest water', action: 'Walk to the closest creek, fountain, or pond this week. Let your child lead the last block. The looking is the point.', why: 'Daily nature compounds when water is a destination, not a feature.', time: '20 minutes' })
  }
  if (has('library') || has('cafe')) {
    recs.push({ kind: 'third_place', title: 'Pick one repeatable spot', action: 'Choose a library, café, or playground you go to once a week for a month. Be a regular, not a visitor.', why: 'Belonging compounds when faces recognize you.', time: 'This week' })
  } else if (has('corner_store') || has('transit')) {
    recs.push({ kind: 'third_place', title: 'Make one errand a ritual', action: 'Pick a store or stop you already use. Go once a week for a month. Say hi to the same person.', why: 'A third place is a place you return to, not a place you find.', time: 'This week' })
  }
  recs.push({ kind: 'habitat', title: 'One visible green thing', action: 'Put a small plant on a windowsill, stoop, or shared outdoor area your child can water. They become the caretaker.', why: 'Daily nature starts with one touchable green thing.', time: 'Today' })
  if (!obstacle.toLowerCase().includes('time')) {
    recs.push({ kind: 'small_thing', title: 'A 5-minute sit', action: 'Find a bench, stoop, or patch of grass near home. Sit for five minutes without a destination. Do it once this week.', why: 'Restoration needs a place, not a plan.', time: '5 minutes' })
  }
  while (recs.length < 3) {
    recs.push({ kind: 'small_thing', title: 'A door-to-eyes ritual', action: 'When you leave the house, name one thing you see that you did not see yesterday. It becomes a habit, not a homework assignment.', why: 'Wonder is a habit of noticing.', time: '2 minutes' })
  }
  return recs.slice(0, 4)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' })
  }
  const { profile, scores, location } = req.body || {}
  if (!profile || !scores || !location) {
    return res.status(400).json({ error: 'Missing required fields: profile, scores, location', code: 'MISSING_FIELDS' })
  }
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured', code: 'NO_KEY' })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const fallback = () => { clearTimeout(timer); return res.status(200).json({ recommendations: buildFallback(req.body), source: 'fallback' }) }

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(req.body) },
        ],
        temperature: 0.7,
        max_tokens: 1400,
      }),
      signal: controller.signal,
    })
    clearTimeout(timer)

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.error('[ai-local-recommendations] OpenAI error', response.status, errText)
      return res.status(200).json({ recommendations: buildFallback(req.body), source: 'fallback' })
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content || ''
    const validated = validateRecommendations(extractJsonObject(content))
    if (!validated) {
      console.warn('[ai-local-recommendations] invalid shape, using fallback', { content: content.slice(0, 200) })
      return res.status(200).json({ recommendations: buildFallback(req.body), source: 'fallback' })
    }
    return res.status(200).json({ recommendations: validated, source: 'ai' })
  } catch (err) {
    if (err?.name !== 'AbortError') console.error('[ai-local-recommendations] error', err)
    return fallback()
  }
}
