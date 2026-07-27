// Architectural Moves — a third layer above Habitat Upgrades and Neighborhood
// Upgrades. These changes are about the home itself: how it is arranged, what
// it opens onto, what grows in it. They take weeks to months, not minutes,
// and have no numerical lift. The pattern drifts; the score catches up later.
//
// Each move belongs to one of the 6 dimensions and is tagged by:
//   - scale:   'room' | 'medium' | 'landscape'
//   - cost:    'free' | '$' | '$$' | '$$$'
//   - effort:  'low' | 'medium' | 'high'
//   - timeframe: a short human label
//
// `personalize(profile)` returns an override (title / copy / whyItMatters) for
// the home type and answers of the family, or `null` to skip a move entirely
// for that family (e.g., a shade structure when there is no outdoor).

import {
  AREA_LABELS,
  HOME_LABELS,
  OUTDOOR_LABELS,
  BLOCK_LABELS,
  kidsAges,
  describeBlock,
  obstacle,
  joinAnd,
} from './personalize'

function ctx(profile, key) {
  return profile?.contextAnswers?.[key] || null
}
function blocks(profile) {
  return profile?.answers?.['specifics.block'] || []
}
function has(profile, slug) {
  return blocks(profile).includes(slug)
}
function isApt(profile) {
  const t = ctx(profile, 'context.homeType')
  return t === 'apartment' || t === 'townhouse'
}
function isHouseWithYard(profile) {
  return ctx(profile, 'context.homeType') === 'house_yard'
}
function out(profile) {
  return ctx(profile, 'context.outdoorSpace')
}
function hasOutdoor(profile) {
  return ['private', 'shared'].includes(out(profile))
}
function youngestBucket(profile) {
  const ages = kidsAges(profile)
  if (ages.length === 0) return null
  if (ages.includes('0-2')) return 'baby'
  if (ages.includes('2-4')) return 'toddler'
  if (ages.includes('5-7')) return 'kid'
  if (ages.includes('8-11')) return 'tween'
  return 'older'
}
function obstacleHas(profile, kw) {
  return obstacle(profile).toLowerCase().includes(kw)
}

export const ARCHITECTURAL_MOVES = {
  belonging: [
    {
      id: 'arc.belonging.1',
      title: 'Orient the kitchen to the yard',
      scale: 'room',
      cost: 'free',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'Pull a stool to a window, angle the prep table, or move the small table so the cook — usually you — can see outside. Meals and prep pick up the day\'s weather, the kids playing, the back neighbors. Free; changes the room.',
      whyItMatters: 'The kitchen is the room the parent spends the most time in. If it faces a wall, the home is closed even when it\'s open. If it faces outside, the home breathes through the work.',
      personalize(profile) {
        if (isApt(profile) && !hasOutdoor(profile)) {
          return {
            title: 'A seat that faces the street or sky',
            copy: 'No outdoor of your own, but the kitchen can still face out. Pull the chair or stool to a window that includes a tree, a neighbor\'s garden, a sliver of sky. Five-minute sitting position while the kettle\'s on.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.belonging.2',
      title: 'Open one wall to the porch',
      scale: 'medium',
      cost: '$$$',
      effort: 'medium',
      timeframe: 'A month',
      copy: 'Convert a window, a partial wall, or a sliding door into a real threshold to a porch, deck, or stoop. The porch becomes an extension of the room, not a separate place. Neighbors stop; you stay; the line blurs.',
      whyItMatters: 'Belonging starts with thresholds. A door you actually open is an invitation; a window you look through is a picture. Make one of them real.',
      personalize(profile) {
        if (isApt(profile)) {
          return {
            title: 'Replace one window with a glass door to a balcony',
            copy: 'Where a sliding window or French door to a balcony or shared terrace is possible, swap it in. Or, if not, install a full-length glass storm door so the line between the apartment and outside thins.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.belonging.3',
      title: 'A back or side gate for the block',
      scale: 'medium',
      cost: '$$',
      effort: 'medium',
      timeframe: 'A weekend',
      copy: 'If your yard connects to a neighbor\'s, an alley, or a park path, install a low gate — even a simple one. The block becomes a network children can move through. Many cities and neighborhood groups help fund these.',
      whyItMatters: 'Belonging scales through permeability. Closed yards make the block a set of fortresses; one open gate can start a habit that spreads.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A standing invitation to the people nearby',
            copy: 'No yard to gate, but most apartments and townhomes have a shared courtyard, a hallway corner, a stoop. Pick the spot where the people pass, put one chair there, sweep it weekly, and look up. A gate to people, not a gate to land.',
          }
        }
        return null
      },
    },
  ],
  independence: [
    {
      id: 'arc.independence.1',
      title: 'Hooks and shelves at child height',
      scale: 'room',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'A row of pegs or hooks near the door, at your child\'s shoulder height. A low basket for their backpack, shoes, library book. Kids own their own coats when they can hang them up themselves; the home returns to them.',
      whyItMatters: 'Independence is built from ownership. A coat a kid can hang is a coat a kid remembers. A coat a parent always hands over is a coat that stays a chore.',
    },
    {
      id: 'arc.independence.2',
      title: 'A child-height outdoor station',
      scale: 'medium',
      cost: '$$',
      effort: 'medium',
      timeframe: 'A month',
      copy: 'A real plumbed tap at kid height, a low workbench outside, or a child-height potting bench. Real tools, real water, real height — kids run their own outdoor play instead of asking, and the parent is suddenly off the hook.',
      whyItMatters: 'Children rise to the level of what\'s reachable. Move the water down; the rest of their play lifts up.',
      personalize(profile) {
        if (isApt(profile) && !hasOutdoor(profile)) {
          return {
            title: 'A child-height station by the window',
            copy: 'No outdoor, but a low table by a window with a small bowl, a watering can, a real sponge and a towel is its own outdoor play. Water the plants, wash the leaves, pour between cups, the work of outside without the yard.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.independence.3',
      title: 'A worn path from door to play zone',
      scale: 'landscape',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'Stepping stones, mulch, or just a worn dirt path from the back door to where they actually play. Kids stop asking "can I go outside?" when they can see themselves getting there. A path is a promise to themselves.',
      whyItMatters: 'Routes are how independence moves. The more of them a child can describe, the further they can go alone.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A repeated hallway route',
            copy: 'No yard, but hallways, lobby, laundry floor, and the bench outside the front door can become a path. Walk the same route the same way several days in a row. The repetition is the route.',
          }
        }
        return null
      },
    },
  ],
  wonder: [
    {
      id: 'arc.wonder.1',
      title: 'A nature shelf in the main room',
      scale: 'room',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'Not in the back room; in the room where you already are. A single shelf for today\'s leaf, today\'s seed pod, the rock that came home in the pocket. The collection is the invitation. The shelf is what makes it stick.',
      whyItMatters: 'Wonder survives on placement. A specimen on a back-room shelf is a hobby. A specimen on the kitchen shelf is a relationship.',
    },
    {
      id: 'arc.wonder.2',
      title: 'A windowsill for weather',
      scale: 'room',
      cost: 'free',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'Designate one wide windowsill as the place where weather stuff collects. Leaves in a jar, sticks in a cup, rain in a bowl, a snow chunk on a plate. The window becomes a nature station, not just a window. Free; about attention.',
      whyItMatters: 'Wonder is in what\'s held onto. Without a place for it, the wonder stays a moment and disappears. With a place, it accumulates.',
    },
    {
      id: 'arc.wonder.3',
      title: 'A pollinator strip along one edge',
      scale: 'landscape',
      cost: '$',
      effort: 'medium',
      timeframe: 'A season',
      copy: 'Even a six-foot strip of locally suitable natives — bee balm, milkweed, lavender, goldenrod — turns the edge of your yard into a daily discovery. Bees, butterflies, hummingbirds find it in a season.',
      whyItMatters: 'A lawn is a place with the wonder engineered out. Six feet of native flowers is a place where wonder reappears on its own.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A pollinator box at the window',
            copy: 'No yard, but a railing planter or balcony box of pollinator-friendly flowers does the same work in miniature — mint, lavender, salvias, small coneflowers. Bees find a balcony.',
          }
        }
        return null
      },
    },
  ],
  restoration: [
    {
      id: 'arc.restoration.1',
      title: 'A chair with a view',
      scale: 'room',
      cost: 'free',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'Move one existing chair to face the tree, the sky, or the sliver of green you can see from inside. Five minutes here changes the temperature of the day. You already own it. Rearrange the room around it.',
      whyItMatters: 'Restoration starts with permission to stop. A chair with a view is permission. A chair facing the laundry pile is homework.',
      personalize(profile) {
        if (obstacleHas(profile, 'energy') || obstacleHas(profile, 'tired') || obstacleHas(profile, 'collapse')) {
          return {
            whyItMatters: 'You said energy is the obstacle. Restoration has to fit in the seams of the day, not require a project. A chair with a view is five minutes, not a setup.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.restoration.2',
      title: 'A shade structure over the outdoor spot',
      scale: 'medium',
      cost: '$$$',
      effort: 'high',
      timeframe: 'A season',
      copy: 'A pergola, a retractable awning, a shade sail, or a planted wisteria trellis — one piece of overhead shelter so outdoor time is not weather-dependent. High effort, high return: shade turns a summer yard from "you go" into "we stay."',
      whyItMatters: 'Restoration depends on reliable access. Without shade, the outdoor spot only works some hours; with it, it works most days.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A shade umbrella for the balcony or stoop',
            copy: 'No yard to shade, but a balcony, a stoop, a shared terrace, or the front step becomes usable in summer with one sturdy umbrella. Mid-cost, mostly weather.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.restoration.3',
      title: 'A sensory corner in the yard',
      scale: 'landscape',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'A corner with fragrant plants (lavender, mint, rosemary), soft ground cover (clover, moss, wood chips), water sound (a small basin, a solar fountain), and one seat. Five minutes here is a reset, not a project.',
      whyItMatters: 'A sensory corner is what the weekend version of a good chair does indoors — but with weather, with texture, with real time passing.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A sensory corner indoors',
            copy: 'No yard, but a corner of the apartment or the entryway can play the same role. A small fountain or a recording of water sound; lavender in a pot; a soft rug. The nervous system reads what\'s nearby.',
          }
        }
        return null
      },
    },
  ],
  dailyNature: [
    {
      id: 'arc.dailyNature.1',
      title: 'A native patch instead of one strip of lawn',
      scale: 'landscape',
      cost: '$',
      effort: 'medium',
      timeframe: 'A season',
      copy: 'Take one rectangular section of lawn out and put in a patch of locally suitable natives — grasses, sedges, flowering perennials. Children pass through it; it does not need to be perfect. Mother Nature does the rest.',
      whyItMatters: 'A lawn is the absence of daily nature. A native patch is the presence of it. The difference between them is one decision, repeated each fall.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A native plant on the windowsill',
            copy: 'No yard, but native plants grow in pots too. Swap one houseplant for a small native — a sedge, a serviceberry, a native violet, a wild geranium. Indoor natives teach kids what their region grows.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.dailyNature.2',
      title: 'An indoor plant shelf in the main room',
      scale: 'room',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'Three to five plants in the room where you already are — kitchen, living room, the main hallway. Pick species that grow visibly so kids see them move. The indoor jungle is the bench between outdoor days.',
      whyItMatters: 'Daily nature doesn\'t require daily trips. It requires daily presence with something alive.',
    },
    {
      id: 'arc.dailyNature.3',
      title: 'An edible herb pot at the kitchen window',
      scale: 'room',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'Mint, basil, parsley, chives — one pot at the kitchen window where it\'s most useful. Touchable, snackable, alive. Children snack on the way past; cooking picks up a leaf instead of a plastic bag.',
      whyItMatters: 'Edible is the connection most kids need. A herb they can taste is a herb they will water.',
    },
  ],
  adventure: [
    {
      id: 'arc.adventure.1',
      title: 'A climbable feature in the yard',
      scale: 'medium',
      cost: '$$$',
      effort: 'medium',
      timeframe: 'A weekend',
      copy: 'A climbing boulder, a sturdy low climbing wall, a slackline between two posts, a low rope course. Children rise to the level of risk you trust them with, and Adventure grows with their bodies.',
      whyItMatters: 'Adventure is the part of play that builds confidence. Without a real feature to climb, the outside is just pretty.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'An indoor climbing feature',
            copy: 'No yard, but a single low climbing wall indoors — painted holds on a back-room wall, a portable climbing triangle, a rope tied between two anchor points. Adventure fits where there\'s trust and grip.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.adventure.2',
      title: 'A weatherproof loose-parts zone',
      scale: 'medium',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'A weatherproof bin with rope, planks, tarps, fabric, balls — and a flat open area to use them. Loose parts plus outdoor space equals imagination, every afternoon. Replacement: a heavy-duty deck box.',
      whyItMatters: 'Adventure without materials is just running. With materials, it\'s everything else.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A loose-parts tray in the main room',
            copy: 'No outdoor, but a tray of fabric scraps, ropes, blocks, and cardboard indoors near the window runs the same play. Loose parts travel; adventure follows.',
          }
        }
        return null
      },
    },
    {
      id: 'arc.adventure.3',
      title: 'A challenge loop on the block',
      scale: 'landscape',
      cost: '$',
      effort: 'low',
      timeframe: 'A weekend',
      copy: 'A short loop marked with chalk, mulch, or paint — a stair, a slope, a balance beam, a low wall, a tree to climb. Repeat it weekly. Adventure is repetition with edge.',
      whyItMatters: 'Adventure lives in the repeat. Once is novelty; once-a-week is practice; once-a-month is a relationship.',
      personalize(profile) {
        if (isApt(profile) || !hasOutdoor(profile)) {
          return {
            title: 'A challenge loop on the stairs',
            copy: 'No yard, but the building staircase, the lobby path, and the front sidewalk already have everything a loop needs. Pick the order. Walk it weekly. Two steps at a time on the climb.',
          }
        }
        return null
      },
    },
  ],
}

export const SCALE_META = {
  room: { label: 'In a room', tone: 'bg-forest/10', text: 'text-forest' },
  medium: { label: 'A new opening', tone: 'bg-ember/10', text: 'text-ember' },
  landscape: { label: 'In the yard', tone: 'bg-olive/15', text: 'text-olive' },
}

export const COST_META = {
  free: 'No cost',
  $: 'Under $50',
  $$: '$50–500',
  $$$: '$500+',
}

export function listArchitecturalMoves() {
  return Object.values(ARCHITECTURAL_MOVES).flat()
}

export function findArchitecturalMove(id) {
  if (!id) return null
  for (const list of Object.values(ARCHITECTURAL_MOVES)) {
    const hit = list.find((u) => u.id === id)
    if (hit) return hit
  }
  return null
}

// Apply personalization to an architectural move. Returns the same object shape
// with any overridden title/copy/whyItMatters (and optional clearance tweaks).
// Returns null when the move is not a fit for this profile.
export function applyArchitecturalPersonalization(move, profile) {
  if (!move || typeof move.personalize !== 'function') return move
  const override = move.personalize(profile)
  if (!override) return null
  return { ...move, ...override }
}
