// Wilder Index — local recommendations client.
//
// Builds the request payload from the full Wilder Index state (profile,
// scores, location) and calls the `/api/ai-local-recommendations` endpoint.
// Falls back to a deterministic, prototype-aware list when the API is
// unavailable or returns invalid data.
//
// Pure ES module — no React, no JSX. The `neighborhoodPrototypes` module
// must exist alongside this file (it exports NEIGHBORHOOD_PROTOTYPES and
// findPrototypeById).

import { findPrototypeById } from './neighborhoodPrototypes'

const API_ENDPOINT = '/api/ai-local-recommendations'
const OBSTACLE_MAX = 280

/**
 * Build the request payload from the full Wilder Index state.
 * Pure function — no fetch, no side effects.
 *
 * previouslyShown + completedRecently are dedup signals — the API instructs
 * the model to avoid anything that overlaps in title, kind, or core action.
 */
export function buildRecommendationsRequest({
  profile,
  scores,
  location,
  previouslyShown = [],
  completedRecently = [],
} = {}) {
  const answers = profile?.answers || {}
  const obstacle = (answers['specifics.obstacle'] || '').trim().slice(0, OBSTACLE_MAX)
  const kids = answers['specifics.kids'] || []
  const block = answers['specifics.block'] || []
  const when = answers['specifics.when'] || null
  const car = answers['specifics.car'] || null
  // New context signals — passed through as soft inputs to the prompt and to
  // the deterministic fallback so recommendations fit the family's actual
  // week (not just their score).
  const schedule = answers['specifics.schedule'] || null
  const partner = answers['specifics.partner'] || null
  const energy = answers['specifics.energy'] || null
  const access = Array.isArray(answers['specifics.access']) ? answers['specifics.access'] : []

  const proto = findPrototypeById(location?.prototypeId) || {}
  return {
    profile: { kids, when, car, block, obstacle, schedule, partner, energy, access },
    scores: {
      belonging: scores?.belonging ?? 0,
      independence: scores?.independence ?? 0,
      wonder: scores?.wonder ?? 0,
      restoration: scores?.restoration ?? 0,
      dailyNature: scores?.dailyNature ?? 0,
      adventure: scores?.adventure ?? 0,
    },
    location: {
      displayName: location?.displayName || 'your area',
      prototype: proto.id || location?.prototypeId || null,
      prototypeName: proto.name || location?.prototypeName || 'Your neighborhood',
      climateBand: proto.climateBand || location?.climateBand || 'general',
      prototypeFeatures: proto.features || [],
      prototypeObstacles: proto.obstacles || [],
    },
    previouslyShown: sanitizeHistory(previouslyShown),
    completedRecently: sanitizeHistory(completedRecently),
  }
}

function sanitizeHistory(list) {
  if (!Array.isArray(list)) return []
  return list
    .filter((x) => x && typeof x === 'object')
    .map((x) => ({
      kind: typeof x.kind === 'string' ? x.kind : null,
      title: typeof x.title === 'string' ? x.title.slice(0, 100) : null,
      action: typeof x.action === 'string' ? x.action.slice(0, 280) : null,
    }))
    .filter((x) => x.title || x.action)
    .slice(0, 12)
}

/**
 * Call the API endpoint. Returns { recommendations, source: 'ai' | 'fallback' }.
 * Never throws — falls back to a deterministic list on any failure.
 */
export async function fetchLocalRecommendations(payload, { signal } = {}) {
  try {
    const r = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    })
    if (!r.ok) {
      const text = await r.text().catch(() => '')
      throw new Error(`API ${r.status}: ${text || 'no body'}`)
    }
    const data = await r.json()
    const list = Array.isArray(data?.recommendations) ? data.recommendations : null
    if (!list || list.length < 3) throw new Error('invalid shape')
    return { recommendations: list, source: data?.source || 'ai' }
  } catch (err) {
    if (typeof console !== 'undefined') {
      console.warn('[localRecommendations] API failed, using fallback:', err?.message || err)
    }
    return { recommendations: fallbackRecommendations(payload), source: 'fallback' }
  }
}

/**
 * Deterministic fallback used when the API is unavailable or returns invalid data.
 * Builds 4 prototype-aware recommendations. Always returns >= 3 items.
 */
export function fallbackRecommendations(payload) {
  const block = Array.isArray(payload?.profile?.block) ? payload.profile.block : []
  const obstacle = typeof payload?.profile?.obstacle === 'string' ? payload.profile.obstacle : ''
  const schedule = payload?.profile?.schedule || null
  const partner = payload?.profile?.partner || null
  const energy = payload?.profile?.energy || null
  const access = Array.isArray(payload?.profile?.access) ? payload.profile.access : []
  const has = (slug) => block.includes(slug)
  const timePressed = schedule === 'full_time_work' || schedule === 'part_time_work' || obstacle.toLowerCase().includes('time')
  const drained = energy === 'drained_resentful' || energy === 'drained_unsure'
  const solo = partner === 'solo'
  const recs = []

  if (has('trees') || has('park')) {
    recs.push({
      kind: 'route',
      title: 'A short loop past your trees',
      action: 'Walk the same 10-minute block twice this week, eyes up. Say one thing out loud about what you see. The repetition is the point.',
      why: 'Wonder grows on repetition, and your block has something worth noticing.',
      time: '15 minutes',
    })
  } else if (has('water')) {
    recs.push({
      kind: 'route',
      title: 'A walk to the nearest water',
      action: 'Walk to the closest creek, fountain, or pond this week. Let your child lead the last block. The looking is the point.',
      why: 'Daily nature compounds when water is a destination, not a feature.',
      time: '20 minutes',
    })
  }

  if (has('library') || has('cafe')) {
    recs.push({
      kind: 'third_place',
      title: 'Pick one repeatable spot',
      action: 'Choose a library, café, or playground you go to once a week for a month. Be a regular, not a visitor.',
      why: 'Belonging compounds when faces recognize you.',
      time: 'This week',
    })
  } else if (has('corner_store') || has('transit')) {
    recs.push({
      kind: 'third_place',
      title: 'Make one errand a ritual',
      action: 'Pick a store or stop you already use. Go once a week for a month. Say hi to the same person.',
      why: 'A third place is a place you return to, not a place you find.',
      time: 'This week',
    })
  }

  recs.push({
    kind: 'habitat',
    title: 'One visible green thing',
    action: 'Put a small plant on a windowsill, stoop, or shared outdoor area your child can water. They become the caretaker.',
    why: 'Daily nature starts with one touchable green thing.',
    time: 'Today',
  })

  if (!timePressed) {
    const title = solo ? 'A 5-minute sit alone' : 'A 5-minute sit'
    const why = drained
      ? 'Restoration is the move that pays you back later in the day.'
      : 'Restoration needs a place, not a plan.'
    recs.push({
      kind: 'small_thing',
      title,
      action: 'Find a bench, stoop, or patch of grass near home. Sit for five minutes without a destination. Do it once this week.',
      why,
      time: '5 minutes',
    })
  }

  // Ensure at least 3.
  while (recs.length < 3) {
    recs.push({
      kind: 'small_thing',
      title: 'A door-to-eyes ritual',
      action: 'When you leave the house, name one thing you see that you did not see yesterday. It becomes a habit, not a homework assignment.',
      why: 'Wonder is a habit of noticing.',
      time: '2 minutes',
    })
  }

  return recs.slice(0, 4)
}

/**
 * Human-readable label for a recommendation kind. Used by the UI.
 */
export const KIND_LABELS = {
  route: 'A short route',
  third_place: 'A repeatable place',
  habitat: 'A home shift',
  seasonal: 'A seasonal shift',
  social: 'A belonging move',
  small_thing: 'A small thing',
}
