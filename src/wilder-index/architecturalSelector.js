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

// Returns a ranked list of dimension ids, with the obstacle-biased dim floated
// to the front (when present). Otherwise pure score-ascending.
function rankDimensions(scores, profile) {
  const ob = obstacle(profile).toLowerCase()
  const bias = OBSTACLE_BIAS.find((b) => ob.includes(b.kw))
  const base = DIMENSION_ORDER
    .map((id) => ({ id, score: scores[id] ?? 0 }))
    .sort((a, b) => a.score - b.score)
  if (!bias) return base.map((d) => d.id)
  const float = base.find((d) => d.id === bias.bonus)
  if (!float) return base.map((d) => d.id)
  const rest = base.filter((d) => d.id !== bias.bonus)
  return [float.id, ...rest.map((d) => d.id)]
}

// Apartment with no outdoor space can only meaningfully do room-scale moves.
function allowedScales(profile) {
  if (isApt(profile) && !hasOutdoor(profile)) return ['room', 'medium']
  return ['room', 'medium', 'landscape']
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
      return candidates[0]
    }
  }

  // Everything shown or excluded — fall back to the lowest-dim move we have.
  for (const dimId of order) {
    const moves = ARCHITECTURAL_MOVES[dimId] || []
    for (const move of moves) {
      if (!allowed.includes(move.scale)) continue
      const personalized = applyArchitecturalPersonalization(move, profile)
      if (personalized !== null) {
        return { move: personalized, dimension: dimId }
      }
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
