// Pure scoring functions for the Wilder Index.
// Each question has up to 4 answer options, scored 0-4. Each dimension has 5
// questions; raw sum 0-20 is multiplied by 5 to scale to 0-100.

import { DIMENSION_ORDER } from './dimensions'

const MAX_PER_QUESTION = 4
const QUESTIONS_PER_DIM = 5
const MAX_RAW = MAX_PER_QUESTION * QUESTIONS_PER_DIM // 20
// Total accumulated lift per dimension, applied on top of the base score.
// Past this, further completions have no further effect on that dimension.
export const MAX_LIFT_PER_DIM = 20

export function rawToScore(raw) {
  if (typeof raw !== 'number' || Number.isNaN(raw)) return 0
  const clamped = Math.max(0, Math.min(MAX_RAW, raw))
  return Math.round((clamped / MAX_RAW) * 100)
}

// Compute all 6 dimension scores from an answers object (questionId -> value).
// Returns a map { belonging: 0-100, ... }.
export function computeScores(answers = {}) {
  const result = {}
  for (const dim of DIMENSION_ORDER) {
    let raw = 0
    let count = 0
    for (let i = 1; i <= QUESTIONS_PER_DIM; i++) {
      const qid = `${dim}.q${i}`
      const v = answers[qid]
      if (typeof v === 'number') {
        raw += v
        count += 1
      }
    }
    if (count === 0) {
      result[dim] = 0
    } else {
      // Scale as if all 5 were answered, to keep scores comparable if a user
      // skipped some. Mild penalty for skipped questions.
      const scaled = (raw / count) * QUESTIONS_PER_DIM
      result[dim] = rawToScore(scaled)
    }
  }
  return result
}

// Add the lift contributed by completed upgrades to the base scores. Iterates
// history items, sums lift per dimension, then caps the accumulated lift at
// MAX_LIFT_PER_DIM (so repeated completions can't push a high score past 100).
// The 100-point cap on the final score is a soft cap: any lift that would
// push a dimension past 100 is discarded, not transferred.
//
// Returns a new scores map. If `scores` is missing, returns the all-zero map.
export function applyHistoryLift(scores, history = []) {
  const result = {}
  const base = scores || {}
  const accumulated = {}
  for (const dim of DIMENSION_ORDER) accumulated[dim] = 0

  if (Array.isArray(history)) {
    for (const item of history) {
      if (!item) continue
      if (item.checkIn !== 'we-did-it' && item.checkIn !== 'changed') continue
      const lift = item.lift
      if (!lift || typeof lift !== 'object') continue
      for (const dim of Object.keys(lift)) {
        if (!DIMENSION_ORDER.includes(dim)) continue
        const n = lift[dim]
        if (typeof n !== 'number' || n <= 0) continue
        accumulated[dim] += n
      }
    }
  }

  for (const dim of DIMENSION_ORDER) {
    const lift = Math.min(MAX_LIFT_PER_DIM, accumulated[dim] || 0)
    const baseScore = typeof base[dim] === 'number' ? base[dim] : 0
    // Soft cap: lift past 100 is discarded, not transferred to other dims.
    result[dim] = Math.min(100, Math.max(0, baseScore + lift))
  }
  return result
}

// Identify the two strongest dimensions and the single best opportunity.
export function summarize(scores) {
  const entries = DIMENSION_ORDER.map((id) => [id, scores[id] ?? 0])
    .sort((a, b) => b[1] - a[1])
  const strengths = entries.slice(0, 2).map(([id]) => id)
  const opportunity = entries[entries.length - 1][0]
  return { strengths, opportunity }
}

export const PER_DIMENSION_MAX = 100
