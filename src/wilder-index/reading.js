// Generates a personalized 3-paragraph reading of a family's pattern
// from their onboarding answers, scores, and context. The output is plain
// text, designed to be read like a friend describing what they noticed.

import { DIMENSIONS, DIMENSION_ORDER, bandFor } from './dimensions'
import {
  AREA_LABELS,
  HOME_LABELS,
  OUTDOOR_LABELS,
  KID_AGE_LABELS,
  BLOCK_LABELS,
  describeHome,
  describeBlock,
  kidsAges,
  obstacle,
  joinAnd,
} from './personalize'

function strongestTwo(scores) {
  return [...DIMENSION_ORDER]
    .map((id) => [id, scores?.[id] ?? 0])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id)
}

function lowestOne(scores) {
  return [...DIMENSION_ORDER]
    .map((id) => [id, scores?.[id] ?? 0])
    .sort((a, b) => a[1] - b[1])[0][0]
}

const OPPORTUNITY_NOTES = {
  belonging: 'your block doesn\'t quite feel like a place people know each other yet',
  independence: 'your child can\'t move through the neighborhood without you driving or escorting them',
  wonder: 'your everyday walks are missing the small reasons to stop and look',
  restoration: 'you don\'t have a nearby place to sit and come back calmer',
  dailyNature: 'nature is something you visit, not something that\'s in the day',
  adventure: 'your child has fewer chances to test their edge, climb, run, or take a real risk',
}

const STRENGTH_NOTES = {
  belonging: 'you already have social fabric — neighbors, regulars, the kind of block where people know each other',
  independence: 'your child is on their way to moving through the neighborhood on their own — routes, landmarks, crossings they understand',
  wonder: 'your walks already have small reasons to stop and look — you notice',
  restoration: 'you have a place to exhale nearby, and you use it',
  dailyNature: 'nature is part of your ordinary days, not a special trip',
  adventure: 'your child has room to climb, balance, run, and try things that feel a little scary in the good way',
}

function describeKids(kids) {
  if (!kids || kids.length === 0) return null
  const labels = kids.map((a) => KID_AGE_LABELS[a] || a).filter(Boolean)
  if (labels.length === 0) return null
  if (labels.length === 1) return labels[0]
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`
}

export function generateReading(profile, scores) {
  if (!scores) return []
  const { area, home, out, hasOut } = describeHome(profile)
  const { has, lacks } = describeBlock(profile)
  const kids = kidsAges(profile)
  const kidsPhrase = describeKids(kids)
  const obst = obstacle(profile)

  const strengths = strongestTwo(scores)
  const opp = lowestOne(scores)
  const oppDim = DIMENSIONS[opp]
  const strengthNotes = strengths.map((id) => STRENGTH_NOTES[id]).filter(Boolean)
  const oppBand = bandFor(scores[opp])

  const hasLabels = has.map((b) => BLOCK_LABELS[b]).filter(Boolean)
  const lacksLabels = lacks.slice(0, 3).map((b) => BLOCK_LABELS[b]).filter(Boolean)

  const p1 =
    `You live in ${area}, in ${home}, with ${out}. ` +
    (kidsPhrase ? `You're raising ${kidsPhrase}, which means your outdoor life has to fit a specific kind of tired, on a specific kind of day. ` : '') +
    (hasLabels.length > 0
      ? `Your block has ${joinAnd(hasLabels.slice(0, 4))}${hasLabels.length > 4 ? ', and a few other things' : ''}. `
      : 'Your block is mostly unmapped in your head right now — a lot of what is there, you haven\'t walked to yet. ') +
    (lacksLabels.length > 0
      ? `It lacks ${joinAnd(lacksLabels)}${lacks.length > 3 ? ', and a few other things' : ''}. The lacks matter as much as the has.`
      : 'You have more in walking distance than most people realize.')

  const p2 =
    `You're strongest on ${joinAnd(strengths.map((id) => DIMENSIONS[id].name.toLowerCase()))} — ${joinAnd(strengthNotes)}. ` +
    `The biggest gap is ${oppDim.name.toLowerCase()}: ${OPPORTUNITY_NOTES[opp]}. ` +
    `It's in the "${oppBand.label.toLowerCase()}" band, which means it's not a missing thing — it's a small, specific thing waiting to be added.`

  const p3 = obst
    ? `You said "${obst}" was the biggest thing in the way. That's a real constraint, not a planning problem. The right next step is small enough to fit around it, not in spite of it.`
    : `There's no single thing standing in the way — there's a pattern waiting to be made. The first step is small and specific to your block.`

  return [p1, p2, p3]
}
