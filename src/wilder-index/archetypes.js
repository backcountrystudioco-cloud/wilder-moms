// Wilder Archetypes — short, evocative identities surfaced in the free reading.
// Each archetype is matched against the strongest dimensions from the
// short assessment, plus the home/area context. The match is intentionally
// fuzzy: archetypes are a feeling, not a diagnosis.

export const ARCHETYPES = [
  {
    id: 'front_porch',
    name: 'The Front Porch Family',
    blurb:
      'Your family builds the block by being still in it. Chairs, names, small repeats.',
    strengths: ['A regular spot neighbors can find you', 'Recognized faces on a short walk', 'A sense the block knows you'],
    signature: 'belonging',
    requires: { belonging: 60 },
    fallback: 'neighborhood',
  },
  {
    id: 'urban_explorer',
    name: 'The Urban Explorer',
    blurb:
      'You use the city as a playground. The walk is the destination. Your kid knows where to go.',
    strengths: ['Routes your child can describe', 'Cafés, libraries, parks you actually use', 'A small territory your family owns'],
    signature: 'independence',
    requires: { independence: 60 },
    fallback: 'neighborhood',
  },
  {
    id: 'quiet_observer',
    name: 'The Quiet Observer',
    blurb:
      'You stop for small things. A leaf, a bug, a window display. Your kid watches the world and it watches back.',
    strengths: ['Walks with reasons to pause', 'Eye for texture and detail', 'A pace that lets noticing happen'],
    signature: 'wonder',
    requires: { wonder: 60 },
    fallback: 'habitat',
  },
  {
    id: 'exhale_seeker',
    name: 'The Exhale Seeker',
    blurb:
      'You know what outside gives you, and you go find it. Restoration is real to you, not aspirational.',
    strengths: ['A go-to place to sit and breathe', 'Permission to slow down outside', 'A pattern that returns you calmer'],
    signature: 'restoration',
    requires: { restoration: 60 },
    fallback: 'habitat',
  },
  {
    id: 'creek_walker',
    name: 'The Creek Walker',
    blurb:
      'Trees, weather, water, dirt — nature is on the way, not on the itinerary. Your ordinary days have wild in them.',
    strengths: ['Nature without a plan', 'A route with green in it', 'Kids who notice seasons changing'],
    signature: 'dailyNature',
    requires: { dailyNature: 60 },
    fallback: 'habitat',
  },
  {
    id: 'edge_finder',
    name: 'The Edge Finder',
    blurb:
      'You let your kid try the thing that looks a little scary. Climbing, balancing, going further. The confidence is in the risk.',
    strengths: ['Real materials and challenge', 'A growing territory', 'A child who recovers when they fall'],
    signature: 'adventure',
    requires: { adventure: 60 },
    fallback: 'habitat',
  },
  {
    id: 'rooted_home',
    name: 'The Rooted Homemaker',
    blurb:
      'Your home is the center. What happens inside the front door sets the tone for the week.',
    strengths: ['A home that holds the family well', 'Routines that feel like yours', 'A base you return to'],
    signature: 'habitat',
    requires: {},
    fallback: 'habitat',
  },
  {
    id: 'growing_into_it',
    name: 'The Family in Bloom',
    blurb:
      'You\'re mid-pattern. The foundation is there, the next layer is taking shape, and the small moves you make now will set the next few years.',
    strengths: ['Curiosity about what could change', 'A real week to work with', 'Openness to small experiments'],
    signature: 'growing',
    requires: {},
    fallback: 'habitat',
  },
]

export function pickArchetype(scores, profile) {
  if (!scores) return ARCHETYPES[ARCHETYPES.length - 1]
  const ordered = Object.keys(scores)
    .map((id) => [id, scores[id] ?? 0])
    .sort((a, b) => b[1] - a[1])

  // Highest-score wins when it crosses the threshold.
  for (const [id, val] of ordered) {
    if (val >= 60) {
      const match = ARCHETYPES.find((a) => a.signature === id)
      if (match) return match
    }
  }
  // No dimension hits the bar — pick by context.
  const ctx = profile?.contextAnswers || {}
  const isApartment = ['apartment', 'townhouse'].includes(ctx['context.homeType'])
  const isUrban = ctx['context.area'] === 'urban'
  if (isUrban) return ARCHETYPES.find((a) => a.id === 'urban_explorer') || ARCHETYPES[1]
  if (isApartment) return ARCHETYPES.find((a) => a.id === 'exhale_seeker') || ARCHETYPES[3]
  return ARCHETYPES[ARCHETYPES.length - 1]
}
