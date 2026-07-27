// trailsForPattern.js — recommend hikes from the catalog using the user's
// Wilder Index profile (time budget, kids' ages, block contents, scores).
// Used by TrailsPage to show "From your pattern" above the existing
// weather/AI recommendations.

import { hikes } from './hikes'
import { kidsAges } from '../wilder-index/personalize'
import { DIMENSIONS } from '../wilder-index/dimensions'

function blocks(profile) {
  return profile?.['specifics.block'] || []
}
function when(profile) {
  return profile?.['specifics.when'] || null
}

function timeBudgetMinutes(when) {
  switch (when) {
    case 'after_work': return 45
    case 'weekday_pickup': return 60
    case 'after_school': return 60
    case 'weekend_only': return 180
    case 'morning': return 90
    case 'evening': return 60
    default: return 90
  }
}

const BUCKET_MIDPOINT = { '0-2': 1, '2-4': 3, '5-7': 6, '8-11': 9, '12+': 13 }
function ageFits(hike, kidBuckets) {
  if (kidBuckets.length === 0) return true
  const min = hike.ageMin ?? 0
  const max = hike.ageMax ?? 99
  return kidBuckets.some((b) => {
    const mid = BUCKET_MIDPOINT[b]
    return mid >= min - 1 && mid <= max + 1
  })
}

// Map score lows to trail features most likely to help. Used as a tiebreaker.
// Each rule bumps the score when the hike matches what the user under-scored.
function scoreHikeAgainstPattern(hike, scores) {
  if (!scores) return 0
  let boost = 0
  const lows = Object.keys(DIMENSIONS).sort((a, b) => scores[a] - scores[b]).slice(0, 2)
  for (const d of lows) {
    if (d === 'restoration' && hike.hasWater) boost += 6
    if (d === 'restoration' && hike.shadeLevel === 'medium') boost += 3
    if (d === 'wonder' && hike.hasWater) boost += 5
    if (d === 'wonder' && hike.bestSeason === 'year-round') boost += 2
    if (d === 'adventure' && hike.elevation >= 300) boost += 3
    if (d === 'adventure' && hike.difficulty === 'moderate') boost += 2
    if (d === 'independence' && hike.distance >= 1.5 && hike.distance <= 3) boost += 3
    if (d === 'belonging' && hike.strollerFriendly) boost += 2
    if (d === 'dailyNature' && hike.hasViews) boost += 2
  }
  return boost
}

export function pickTrailsForPattern({ profile, scores, limit = 3 }) {
  if (!profile) return []
  const buckets = kidsAges({ answers: { 'specifics.kids': profile['specifics.kids'] || [] } })
  const budget = timeBudgetMinutes(when(profile))
  const block = blocks(profile)
  return hikes
    .filter((h) => h.duration <= budget)
    .filter((h) => ageFits(h, buckets))
    .map((h) => ({
      hike: h,
      score: scoreHikeAgainstPattern(h, scores || {}),
    }))
    .map((x) => {
      let reasons = []
      if (x.hike.hasWater && block.includes('water')) reasons.push('water nearby')
      if (x.hike.hasWater) reasons.push('water for reset')
      if (x.hike.distance <= 1.5) reasons.push('short enough for a tired day')
      if (x.hike.strollerFriendly) reasons.push('stroller-friendly')
      if (x.hike.bestSeason === 'year-round') reasons.push('usable year-round')
      return { hike: x.hike, reasons, score: x.score }
    })
    .filter((x) => x.reasons.length > 0 || x.score > 0)
    .sort((a, b) => b.score - a.score || a.hike.duration - b.hike.duration)
    .slice(0, limit)
}

export function describeTimeBudget(when) {
  const m = timeBudgetMinutes(when)
  if (m <= 45) return 'about 45 minutes'
  if (m <= 60) return 'about an hour'
  if (m <= 90) return 'about an hour and a half'
  return 'a few hours'
}
