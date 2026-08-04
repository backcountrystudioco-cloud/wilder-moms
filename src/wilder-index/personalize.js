// Light helpers for reading the user's profile and producing human strings.

import {
  NEIGHBORHOOD_PROTOTYPES,
  findPrototypeById,
  inferPrototypeFromContext,
  climateBandForPrototype,
} from './neighborhoodPrototypes'

export const AREA_LABELS = {
  urban: 'an urban block',
  suburban: 'a suburban block',
  small_town: 'a small town',
  rural: 'a rural area',
}

export const HOME_LABELS = {
  apartment: 'an apartment',
  townhouse: 'a townhouse',
  house_yard: 'a house with a yard',
  house_no_yard: 'a house without much yard',
}

export const OUTDOOR_LABELS = {
  private: 'a private outdoor space',
  shared: 'a shared outdoor space',
  none: 'no outdoor space of your own',
}

export const KID_AGE_LABELS = {
  '0-2': 'a baby or toddler',
  '2-4': 'a toddler or young preschooler',
  '5-7': 'an early school-age kid',
  '8-11': 'a tween',
  '12+': 'a teenager',
}

export function kidAgesList(kids) {
  if (!Array.isArray(kids) || kids.length === 0) return []
  return kids.map((a) => KID_AGE_LABELS[a] || a).filter(Boolean)
}

export function describeHome(profile) {
  const ctx = profile?.contextAnswers || {}
  const area = AREA_LABELS[ctx['context.area']] || 'a neighborhood'
  const home = HOME_LABELS[ctx['context.homeType']] || 'a home'
  const out = OUTDOOR_LABELS[ctx['context.outdoorSpace']]
  return { area, home, out, hasOut: !!out && ctx['context.outdoorSpace'] !== 'none' }
}

export function describeBlock(profile) {
  const block = profile?.answers?.['specifics.block'] || []
  if (!Array.isArray(block) || block.length === 0) return { has: [], lacks: [] }
  const all = ['library', 'cafe', 'park', 'water', 'school', 'transit', 'trees', 'cornerstore']
  const has = block
  const lacks = all.filter((b) => !has.includes(b))
  return { has, lacks }
}

export function whenOutside(profile) {
  return profile?.answers?.['specifics.when'] || null
}

export function carAccess(profile) {
  return profile?.answers?.['specifics.car'] || null
}

export function obstacle(profile) {
  return (profile?.answers?.['specifics.obstacle'] || '').trim()
}

export function kidsAges(profile) {
  return profile?.answers?.['specifics.kids'] || []
}

// ──────────────────────────────────────────────────────────────────────
// New context signals — added 2025 to capture what's most cited as "what's
// actually in the way": schedule shape, partner alignment, the cost of an
// hour outside, and access constraints. All are optional. When unset, the
// helpers return empty strings so existing copy paths behave identically.
// ──────────────────────────────────────────────────────────────────────

export function scheduleAnswer(profile) {
  return profile?.answers?.['specifics.schedule'] || null
}

export function partnerAnswer(profile) {
  return profile?.answers?.['specifics.partner'] || null
}

export function energyAnswer(profile) {
  return profile?.answers?.['specifics.energy'] || null
}

export function accessAnswer(profile) {
  const raw = profile?.answers?.['specifics.access']
  return Array.isArray(raw) ? raw : []
}

// Editorial string for the reading — only emits text when the answer is
// "load-bearing" (work-week crunch, solo parenting, drained). Empty string
// otherwise so the paragraphs read normally for users who didn't answer or
// who fall in the neutral buckets.
export function describeSchedule(profile) {
  const s = scheduleAnswer(profile)
  if (s === 'full_time_work' || s === 'part_time_work') return 'during the work-week crunch'
  if (s === 'hybrid_work') return 'in the windows between work and home'
  if (s === 'stay_at_home' || s === 'between_jobs') return 'on days that flow into one another'
  return ''
}

export function describePartner(profile) {
  const p = partnerAnswer(profile)
  if (p === 'partner_aligned') return 'even when you\'re both fried'
  if (p === 'partner_mixed') return 'even though you don\'t always agree'
  if (p === 'partner_limited') return 'even with limited backup'
  if (p === 'solo') return 'on your own'
  if (p === 'other_caregivers') return 'with a wider village on call'
  return ''
}

export function describeEnergy(profile) {
  const e = energyAnswer(profile)
  if (e === 'energized') return 'without you paying for it later'
  if (e === 'tired_but_worth_it') return 'even when the hour costs you'
  if (e === 'drained_unsure') return 'without leaving you spent'
  if (e === 'drained_resentful') return 'without it costing you'
  return ''
}

const ACCESS_PHRASES = {
  mobility: 'with a stroller- or walker-friendly path',
  sensory: 'around noise, crowds, or texture sensitivities',
  allergies: 'around allergies',
  language: 'in the language you actually speak at home',
}

export function describeAccess(profile) {
  const list = accessAnswer(profile)
  if (!list || list.length === 0) return ''
  const filtered = list.filter((k) => k && k !== 'none')
  if (filtered.length === 0) return ''
  const phrases = filtered.map((k) => ACCESS_PHRASES[k]).filter(Boolean)
  if (phrases.length === 0) return ''
  if (phrases.length === 1) return phrases[0]
  return `${phrases.slice(0, -1).join(', ')} and ${phrases[phrases.length - 1]}`
}

// Join an array of items with natural-language commas and "and".
export function joinAnd(items) {
  const list = items.filter(Boolean)
  if (list.length === 0) return ''
  if (list.length === 1) return list[0]
  if (list.length === 2) return `${list[0]} and ${list[1]}`
  return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`
}

// Map a block presence slug to a human label
export const BLOCK_LABELS = {
  library: 'a library',
  cafe: 'a café or bakery',
  park: 'a park or playground',
  water: 'water nearby',
  school: 'a school within walking distance',
  transit: 'public transit',
  trees: 'mature street trees on the block',
  cornerstore: 'a corner store',
}

// Re-export the prototype utilities so consumers can import everything from
// `personalize.js` if they prefer.
export {
  NEIGHBORHOOD_PROTOTYPES,
  findPrototypeById,
  inferPrototypeFromContext,
  climateBandForPrototype,
}

// Read the user's location + prototype from their profile. Falls back
// gracefully when the data is partial.
export function describeLocation(profile) {
  const ctx = profile?.contextAnswers || {}
  const raw = (ctx['context.location'] || '').trim()
  const prototypeId = inferPrototypeFromContext(ctx)
  const proto = findPrototypeById(prototypeId)
  return {
    prototypeId,
    prototypeName: proto?.name || 'Your neighborhood',
    prototypeBlurb: proto?.blurb || '',
    climateBand: proto?.climateBand || 'general',
    climateNotes: proto?.climateNotes || '',
    rawLocation: raw,
    displayName: raw || 'your area',
    hasLocation: raw.length > 0,
  }
}
