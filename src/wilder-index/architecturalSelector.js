// Pick the architectural move for the current month.
//
// Cadence is monthly, not weekly. We pick from the dimension where the family
// is most under-supported (lowest score), respecting:
//   - Moves already shown (a small cap)
//   - The home's outdoor space (apartment + no outdoor can only get room-scale moves)
//   - The obstacle they named in onboarding (energy biases restoration, etc.)
//
// No numerical lift is computed or shown. The score drifts up over weeks.

import {
  ARCHITECTURAL_MOVES,
  applyArchitecturalPersonalization,
} from './architecturalMoves'
import { DIMENSION_ORDER } from './dimensions'
import { obstacle } from './personalize'

function isApt(profile) {
  const t = profile?.contextAnswers?.['context.homeType']
  return t === 'apartment' || t === 'townhouse'
}
function out(profile) {
  return profile?.contextAnswers?.['context.outdoorSpace']
}
function hasOutdoor(profile) {
  return ['private', 'shared'].includes(out(profile))
}

// Some obstacles bias the dimension we choose (independent of score rank).
const OBSTACLE_BIAS = [
  { kw: 'energy', bonus: 'restoration' },
  { kw: 'tired', bonus: 'restoration' },
  { kw: 'exhaust', bonus: 'restoration' },
  { kw: 'weather', bonus: 'restoration' },
  { kw: 'time', bonus: 'belonging' },
  { kw: 'solo', bonus: 'belonging' },
  { kw: 'no park', bonus: 'dailyNature' },
  { kw: 'no kid', bonus: 'belonging' },
  { kw: 'no backyard', bonus: 'independence' },
  { kw: 'no yard', bonus: 'independence' },
]

// Newer context-signal biases — these float a dimension to the front of
// the rank when the family has answered the corresponding specifics question.
// They're additive with OBSTACLE_BIAS: if both fire, the obstacle wins on
// rank, and the profile bias shapes the pick within each dimension.
const PROFILE_BIAS = [
  { match: (p) => p?.answers?.['specifics.energy'] === 'drained_resentful', bonus: 'restoration' },
  { match: (p) => p?.answers?.['specifics.partner'] === 'solo', bonus: 'independence' },
]

function profileBonus(profile) {
  return PROFILE_BIAS.find((b) => b.match(profile))
}

// Returns a ranked list of dimension ids, with the obstacle-biased dim floated
// to the front (when present). Otherwise pure score-ascending.
function rankDimensions(scores, profile) {
  const ob = obstacle(profile).toLowerCase()
  const bias = OBSTACLE_BIAS.find((b) => ob.includes(b.kw))
  const profilePri = profileBonus(profile)
  const base = DIMENSION_ORDER
    .map((id) => ({ id, score: scores[id] ?? 0 }))
    .sort((a, b) => a.score - b.score)
  if (!bias && !profilePri) return base.map((d) => d.id)
  const pickBonus = bias ? bias.bonus : profilePri.bonus
  const float = base.find((d) => d.id === pickBonus)
  if (!float) return base.map((d) => d.id)
  const rest = base.filter((d) => d.id !== pickBonus)
  return [float.id, ...rest.map((d) => d.id)]
}

// Apartment with no outdoor space can only meaningfully do room-scale moves.
// Mobility access constraints narrow further to 'room' (no landscape moves
// that require navigating uneven terrain we don't know about).
function allowedScales(profile) {
  if (isApt(profile) && !hasOutdoor(profile)) return ['room', 'medium']
  const access = profile?.answers?.['specifics.access']
  if (Array.isArray(access) && access.includes('mobility')) return ['room']
  return ['room', 'medium', 'landscape']
}

// Score candidate moves within a dimension so the profile signals shape the
// pick. Positive = `a` preferred over `b`.
function moveBias(a, b, profile) {
  let score = 0
  const energy = profile?.answers?.['specifics.energy']
  const partner = profile?.answers?.['specifics.partner']
  const schedule = profile?.answers?.['specifics.schedule']
  if (energy === 'drained_resentful') {
    const rank = (m) =>
      m.dimension === 'restoration' || (m.move && /home|seat|chair|sit/i.test(m.move.title || ''))
        ? 1
        : 0
    score += rank(b) - rank(a)
  }
  if (partner === 'solo') {
    const rank = (m) => (m.dimension === 'independence' || m.dimension === 'wonder' ? 1 : 0)
    score += rank(b) - rank(a)
  }
  if (schedule === 'full_time_work') {
    const rank = (m) => (m.move?.effort === 'low' ? 1 : m.move?.effort === 'high' ? -1 : 0)
    score += rank(b) - rank(a)
  }
  return score
}

export function pickMonthlyMove(profile, scores, shownIds = []) {
  if (!scores) return null
  const order = rankDimensions(scores, profile)
  const allowed = allowedScales(profile)
  const used = new Set(shownIds)

  for (const dimId of order) {
    const moves = ARCHITECTURAL_MOVES[dimId] || []
    const candidates = []
    for (const move of moves) {
      if (used.has(move.id)) continue
      if (!allowed.includes(move.scale)) continue
      const personalized = applyArchitecturalPersonalization(move, profile)
      if (personalized === null) continue
      candidates.push({ move: personalized, dimension: dimId })
    }
    if (candidates.length > 0) {
      // Apply profile-aware ordering, then take the top candidate.
      candidates.sort((a, b) => moveBias(a, b, profile))
      return candidates[0]
    }
  }

  // Everything shown or excluded — fall back to the lowest-dim move we have.
  for (const dimId of order) {
    const moves = ARCHITECTURAL_MOVES[dimId] || []
    const candidates = []
    for (const move of moves) {
      if (!allowed.includes(move.scale)) continue
      const personalized = applyArchitecturalPersonalization(move, profile)
      if (personalized !== null) {
        candidates.push({ move: personalized, dimension: dimId })
      }
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => moveBias(a, b, profile))
      return candidates[0]
    }
  }
  return null
}

export function currentMonthKey(date = new Date()) {
  return date.toISOString().slice(0, 7)
}

export function monthLabel(key) {
  if (!key) return ''
  const [y, m] = key.split('-')
  const d = new Date(Number(y), Number(m) - 1, 1)
  if (Number.isNaN(d.getTime())) return key
  return d.toLocaleString('en', { month: 'long', year: 'numeric' })
}
