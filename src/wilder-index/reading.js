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
  describeLocation,
  describeSchedule,
  describePartner,
  describeEnergy,
  describeAccess,
  scheduleAnswer,
  partnerAnswer,
  energyAnswer,
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

// Categorize the user's free-text obstacle into a gentle, non-echoing
// descriptor. We never quote the obstacle verbatim in the reading —
// instead we paraphrase into one of these short categories so the user
// sees their concern acknowledged without it being printed back to them.
function obstacleCategory(text) {
  const t = (text || '').toLowerCase()
  if (/energy|tired|exhaust|burn(ed|out)?|running on fumes|fuel/i.test(t)) {
    return 'energy, and the cost of the hour'
  }
  if (/weather|rain|cold|snow|heat|wind|storm/i.test(t)) return 'weather and season'
  if (/no time|busy|hours|schedule|commute|work/i.test(t)) return 'time in the work-week window'
  if (/solo|alone|single|divorc|widow/i.test(t)) return 'doing it without backup'
  if (/no nearby|park|drive|car|transit|far/i.test(t)) return 'getting there without a drive'
  if (/partner|spouse|husband|wife|argue|disagree|align/i.test(t)) return 'partner alignment'
  if (/screen|tablet|phone|video|youtube|ipad/i.test(t)) return 'screens as the default'
  if (/kid|child|toddler|won|refuse|tantrum|meltdown/i.test(t)) return 'what your kid will or won\'t do'
  if (/money|cost|budget|afford|expensive/i.test(t)) return 'the cost of getting out'
  if (/safe|safety|crossing|traffic/i.test(t)) return 'how safe the routes feel'
  if (/anxiety|anxious|stress|overwhelm|mental/i.test(t)) return 'your own capacity, not your kid\'s'
  return 'the shape of your week'
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
  const loc = describeLocation(profile)
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

  // The opening now anchors the family in their specific neighborhood
  // prototype + place name, not just a generic "urban/suburban" label.
  const placeClause = loc.hasLocation
    ? `You live in ${loc.displayName}, in ${home}, with ${out}. `
    : `You live in ${loc.prototypeName.toLowerCase()} territory, in ${home}, with ${out}. `
  const prototypeClause = loc.prototypeBlurb
    ? `The shape of your week — ${loc.prototypeBlurb.toLowerCase()} ` +
      `That shape decides what kind of outside life is easy, and what kind takes more effort. `
    : ''

  const p1 =
    placeClause +
    (kidsPhrase ? `You're raising ${kidsPhrase}, which means your outdoor life has to fit a specific kind of tired, on a specific kind of day. ` : '') +
    prototypeClause +
    (hasLabels.length > 0
      ? `Your block has ${joinAnd(hasLabels.slice(0, 4))}${hasLabels.length > 4 ? ', and a few other things' : ''}. `
      : 'Your block is mostly unmapped in your head right now — a lot of what is there, you haven\'t walked to yet. ') +
    (lacksLabels.length > 0
      ? `It lacks ${joinAnd(lacksLabels)}${lacks.length > 3 ? ', and a few other things' : ''}. The lacks matter as much as the has.`
      : 'You have more in walking distance than most people realize.')

  const p2 =
    `You're strongest on ${joinAnd(strengths.map((id) => DIMENSIONS[id].name.toLowerCase()))} — ${joinAnd(strengthNotes)}. ` +
    `The biggest gap is ${oppDim.name.toLowerCase()}: ${OPPORTUNITY_NOTES[opp]}. ` +
    `It's in the "${oppBand.label.toLowerCase()}" band, which means it's not a missing thing — it's a small, specific thing waiting to be added. ` +
    `In a ${loc.prototypeName.toLowerCase()} neighborhood, that gap is best closed by using what's already close, not by chasing what's far.`

  // Weave 1-2 of the new context signals into P2 where they materially change
  // the framing. Only one clause per gap is woven, so the paragraph doesn't
  // grow noisy for users who answered several.
  const scheduleClause = describeSchedule(profile)
  const partnerClause = describePartner(profile)
  const energyClause = describeEnergy(profile)
  const accessClause = describeAccess(profile)
  const woven = []
  if (partnerClause && (partnerAnswer(profile) === 'partner_mixed' || partnerAnswer(profile) === 'solo')) {
    woven.push(`Closing it ${partnerClause} is the version of "outside" that actually fits your week`)
  }
  if (scheduleClause && (scheduleAnswer(profile) === 'full_time_work' || scheduleAnswer(profile) === 'part_time_work')) {
    woven.push(`the move has to land ${scheduleClause}`)
  }
  if (energyClause && (energyAnswer(profile) === 'drained_resentful' || energyAnswer(profile) === 'drained_unsure')) {
    woven.push(`and it has to do it ${energyClause}`)
  }
  if (accessClause) {
    woven.push(`— and it has to work ${accessClause}`)
  }
  const p2Tail = woven.length > 0 ? ` ${woven.join(', ')}.` : ''

  const p2Final = p2 + p2Tail

  const p3 = obst
    ? `You told us the biggest thing in the way was around ${obstacleCategory(obst)}. That's a real constraint, not a planning problem. The right next step is small enough to fit around it, and specific to ${loc.displayName}, not a generic list.`
    : `There's no single thing standing in the way — there's a pattern waiting to be made. The first step is small and specific to your block in ${loc.displayName}.`

  return [p1, p2Final, p3]
}
