// Pure scoring functions for the Wilder Index.
// Each question has up to 4 answer options, scored 0-4. Each dimension has 5
// questions; raw sum 0-20 is multiplied by 5 to scale to 0-100.

import { DIMENSION_ORDER } from './dimensions'

const MAX_PER_QUESTION = 4
const QUESTIONS_PER_DIM = 5
const MAX_RAW = MAX_PER_QUESTION * QUESTIONS_PER_DIM // 20

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

// Identify the two strongest dimensions and the single best opportunity.
export function summarize(scores) {
  const entries = DIMENSION_ORDER.map((id) => [id, scores[id] ?? 0])
    .sort((a, b) => b[1] - a[1])
  const strengths = entries.slice(0, 2).map(([id]) => id)
  const opportunity = entries[entries.length - 1][0]
  return { strengths, opportunity }
}

export const PER_DIMENSION_MAX = 100
