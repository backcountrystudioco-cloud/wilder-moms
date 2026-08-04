// Generates a sequenced 3-action weekly plan, parameterized to the user.
// The plan picks the 3 lowest-scoring dimensions and finds the most
// appropriate Habitat or Neighborhood upgrade for each, in priority order.

import { DIMENSION_ORDER, DIMENSIONS } from './dimensions'
import {
  HABITAT_UPGRADES,
  NEIGHBORHOOD_UPGRADES,
  applyPersonalization,
} from './catalog'
import { kidsAges, carAccess, whenOutside, obstacle } from './personalize'

function hasBlock(profile, slug) {
  const arr = profile?.answers?.['specifics.block'] || []
  return Array.isArray(arr) && arr.includes(slug)
}

function youngestKidBucket(profile) {
  const ages = kidsAges(profile)
  if (ages.length === 0) return null
  if (ages.includes('0-2') || ages.includes('2-4')) return 'young'
  if (ages.includes('5-7') || ages.includes('8-11')) return 'older'
  return 'tween'
}

// Pick the best upgrade from a dimension's pool for this person, excluding
// IDs that have already been used in the same plan or recently shown.
function pickFrom(dimension, kind, profile, usedIds, recentIds) {
  const map = kind === 'habitat' ? HABITAT_UPGRADES : NEIGHBORHOOD_UPGRADES
  const pool = map[dimension] || []
  // First-pass: not used yet, not recently shown
  let candidates = pool.filter((u) => !usedIds.has(u.id) && !recentIds.has(u.id))
  if (candidates.length === 0) candidates = pool.filter((u) => !usedIds.has(u.id))
  if (candidates.length === 0) candidates = pool
  // Soft profile-based reorder: solo parenting prefers independence/wonder
  // moves (often doable alone), and full-time-work prefers low-effort moves.
  if (profile) {
    const partner = profile?.answers?.['specifics.partner']
    const schedule = profile?.answers?.['specifics.schedule']
    candidates = [...candidates].sort((a, b) => profileBias(a, b, { partner, schedule, kind }))
  }
  return candidates[0] || null
}

// Score two candidates for ordering. Positive = a goes first.
function profileBias(a, b, { partner, schedule, kind }) {
  let score = 0
  if (partner === 'solo') {
    const dimRank = (u) => (u.lift && (u.lift.independence || u.lift.wonder)) ? 1 : 0
    score += dimRank(b) - dimRank(a)
  }
  if (schedule === 'full_time_work') {
    const effortRank = (u) => (u.effort === 'low' ? 1 : u.effort === 'high' ? -1 : 0)
    score += effortRank(b) - effortRank(a)
  }
  return score
}

const DAY_COPY = [
  // 0-indexed: [today, day 3, day 6]
  { eyebrow: 'Today', why: 'The first small change. After it\'s part of the day, the next two build on it.' },
  { eyebrow: 'Day 3', why: 'Once the first one is in place, this is the next layer. Not a new project — a continuation.' },
  { eyebrow: 'Day 6', why: 'The week\'s third move. Smaller than the first two. It\'s the one that locks the pattern in.' },
]

// Decide kind preference based on the dimension and the user's profile.
function preferredKind(dim, profile) {
  // If the user has no outdoor space at home, lean neighborhood for habitat-relevant dims
  const noOut = profile?.contextAnswers?.['context.outdoorSpace'] === 'none'
  const isApartment = ['apartment', 'townhouse'].includes(profile?.contextAnswers?.['context.homeType'])
  if ((noOut || isApartment) && (dim === 'belonging' || dim === 'wonder' || dim === 'restoration' || dim === 'adventure')) {
    return 'neighborhood'
  }
  // For daily nature in apartments, lean neighborhood (pocket park, tree-lined route)
  if (dim === 'dailyNature' && (noOut || isApartment)) return 'neighborhood'
  // Default: habitat for restoration, wonder, dailyNature, belonging; neighborhood for independence, adventure
  if (dim === 'independence' || dim === 'adventure') return 'neighborhood'
  return 'habitat'
}

export function generateWeeklyPlan(profile, scores, recentIds = { habitat: [], neighborhood: [] }) {
  if (!scores) return []
  // Rank dimensions by score, ascending
  const ranked = [...DIMENSION_ORDER]
    .map((id) => [id, scores[id] ?? 0])
    .sort((a, b) => a[1] - b[1])

  // If a major obstacle was named, bias the first action toward the dimension
  // most likely to be affected. "Energy after work" → restoration first.
  const obst = obstacle(profile)
  let priorityBoost = null
  if (/energy|tired|exhaust/i.test(obst)) priorityBoost = 'restoration'
  else if (/time/i.test(obst)) priorityBoost = 'belonging'
  else if (/weather/i.test(obst)) priorityBoost = 'restoration'
  else if (/no nearby|park|drive/i.test(obst)) priorityBoost = 'dailyNature'

  const ordered = priorityBoost
    ? [priorityBoost, ...ranked.map(([id]) => id).filter((id) => id !== priorityBoost)]
    : ranked.map(([id]) => id)

  const usedIds = new Set()
  const recentHabitat = new Set(recentIds.habitat || [])
  const recentNeighborhood = new Set(recentIds.neighborhood || [])

  const picks = []
  for (let i = 0; i < 3 && i < ordered.length; i++) {
    const dim = ordered[i]
    const kind = preferredKind(dim, profile)
    const recent = kind === 'habitat' ? recentHabitat : recentNeighborhood
    const raw = pickFrom(dim, kind, profile, usedIds, recent)
    if (raw) {
      usedIds.add(raw.id)
      const personalized = applyPersonalization(raw, profile)
      picks.push({
        ...personalized,
        dimension: dim,
        kind,
        day: i,
        meta: DAY_COPY[i],
      })
    }
  }
  return picks
}

export { youngestKidBucket, hasBlock }
