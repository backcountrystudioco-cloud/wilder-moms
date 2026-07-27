// Generates the free reading from a partial assessment.
// The free reading has four parts:
//   1. A short opener that earns the user's attention
//   2. The archetype (identity)
//   3. The Habitat Snapshot (what is already working)
//   4. The Biggest Opportunity (the friction worth reducing)
//   5. One Small Win (a single habitat shift, picked from the lowest-scoring dimension)
//
// Intentionally narrative. The point is to feel valuable, not to disclose the
// full Habitat Read.

import { DIMENSIONS, DIMENSION_ORDER, bandFor } from './dimensions'
import { describeHome, describeBlock, kidsAges, obstacle, joinAnd } from './personalize'
import { pickArchetype } from './archetypes'
import { HABITAT_UPGRADES, NEIGHBORHOOD_UPGRADES, applyPersonalization } from './catalog'

function lowestOne(scores) {
  return [...DIMENSION_ORDER]
    .map((id) => [id, scores?.[id] ?? 0])
    .sort((a, b) => a[1] - b[1])[0]
}

function strongestTwo(scores) {
  return [...DIMENSION_ORDER]
    .map((id) => [id, scores?.[id] ?? 0])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id)
}

const OPPORTUNITY_NOTES = {
  belonging:
    'your block doesn\'t quite feel like a place people know each other yet',
  independence:
    'your child can\'t move through the neighborhood without you driving or escorting them',
  wonder: 'your everyday walks are missing the small reasons to stop and look',
  restoration: 'you don\'t have a nearby place to sit and come back calmer',
  dailyNature: 'nature is something you visit, not something that\'s in the day',
  adventure:
    'your child has fewer chances to test their edge, climb, run, or take a real risk',
}

const STRENGTH_NOTES = {
  belonging:
    'social fabric — neighbors, regulars, the kind of block where people know each other',
  independence:
    'a child on the way to moving through the neighborhood on their own — routes, landmarks, crossings they understand',
  wonder: 'walks with small reasons to stop and look — you notice',
  restoration: 'a place to exhale nearby, and you use it',
  dailyNature: 'nature as part of ordinary days, not a special trip',
  adventure:
    'room to climb, balance, run, and try things that feel a little scary in the good way',
}

// A small library of openers that lead with identity, not numbers.
// Selected by archetype signature when possible, otherwise by context.
function buildOpener(archetype, profile) {
  const { area } = describeHome(profile)
  const line = archetype.id === 'growing_into_it'
    ? 'Your family already has everything it needs to thrive.'
    : archetype.id === 'front_porch'
    ? 'Your family knows how to be still in a place. That\'s rarer than it sounds.'
    : archetype.id === 'urban_explorer'
    ? 'Your family uses the city as a playground. The walk is the destination.'
    : archetype.id === 'quiet_observer'
    ? 'Your family stops for small things. The noticing is the practice.'
    : archetype.id === 'exhale_seeker'
    ? 'You know what outside gives you. You go find it.'
    : archetype.id === 'creek_walker'
    ? 'Your family keeps nature on the way, not on the itinerary.'
    : archetype.id === 'edge_finder'
    ? 'You let your kid try the thing that looks a little scary.'
    : 'Your family is mid-pattern. The foundation is there.'

  const friction = `The biggest thing standing between your family and the life you imagine isn't more time — it's the friction between your daily routines and the world just outside your ${area.replace(/^a\s+/, '')}.`
  const reframe = `That's good news, because small changes can have an outsized impact.`
  return [line, friction, reframe]
}

// The narrative snapshot — what is already working, in plain language.
function buildSnapshot(scores, profile) {
  const { area, home, out } = describeHome(profile)
  const kids = kidsAges(profile)
  const kidsPhrase =
    kids.length === 0
      ? null
      : kids.length === 1
      ? `raising ${kids[0]}`
      : `raising ${joinAnd(kids)}`

  const strengths = strongestTwo(scores)
  const notes = strengths.map((id) => STRENGTH_NOTES[id]).filter(Boolean)

  const opener =
    `You live in ${area}, in ${home}${out ? `, with ${out}` : ''}. ` +
    (kidsPhrase ? `You're ${kidsPhrase}, which means your outdoor life has to fit a specific kind of tired, on a specific kind of day. ` : '') +
    `What's already working is ${joinAnd(strengths.map((id) => DIMENSIONS[id].name.toLowerCase()))} — ${joinAnd(notes)}.`

  return opener
}

// The opportunity paragraph — the friction worth reducing. Names the dimension
// without scoring it.
function buildOpportunity(scores, profile) {
  const [oppId, oppScore] = lowestOne(scores)
  const dim = DIMENSIONS[oppId]
  const band = bandFor(oppScore)
  const obst = obstacle(profile)

  const main = `The biggest opportunity right now is ${dim.name.toLowerCase()}: ${OPPORTUNITY_NOTES[oppId]}. ` +
    `It\'s in the "${band.label.toLowerCase()}" band, which means it isn\'t a missing thing — it\'s a small, specific thing waiting to be added.`

  const close = obst
    ? `You named "${obst}" as the thing in the way. That's a real constraint, not a planning problem. The right move is small enough to fit around it.`
    : `The right move is small enough to fit around a real week.`

  return `${main} ${close}`
}

// Picks one small win from the lowest-scoring dimension's pool. Personalizes it
// against the profile so it reads as specific to the user.
function pickSmallWin(scores, profile) {
  const [oppId] = lowestOne(scores)
  const kind = oppId === 'independence' || oppId === 'adventure' ? 'neighborhood' : 'habitat'
  const map = kind === 'habitat' ? HABITAT_UPGRADES : NEIGHBORHOOD_UPGRADES
  const pool = map[oppId] || []
  if (pool.length === 0) return null
  const raw = pool[0]
  return applyPersonalization(raw, profile)
}

export function generateFreeReading(profile, scores) {
  if (!scores) return null
  const archetype = pickArchetype(scores, profile)
  const opener = buildOpener(archetype, profile)
  const snapshot = buildSnapshot(scores, profile)
  const opportunity = buildOpportunity(scores, profile)
  const smallWin = pickSmallWin(scores, profile)

  return {
    archetype,
    opener,
    snapshot,
    opportunity,
    smallWin,
  }
}
