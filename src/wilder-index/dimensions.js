// The 6 Wilder Index dimensions, grounded in the urban design + child-friendly
// city research. Each dimension has a color, a chapter label, and a short
// description used on the dashboard and in onboarding.

export const DIMENSIONS = {
  belonging: {
    id: 'belonging',
    name: 'Belonging',
    chapter: 'Your People',
    color: '#8C1E00', // ember
    accent: 'bg-ember/10',
    text: 'text-ember',
    border: 'border-ember/30',
    description: 'How easily your family recognizes, greets, and is recognized by the people around you.',
    oneLine: 'Familiar faces and places to pause together.',
    whyItMatters: 'Belonging is the foundation. When children recognize neighbors and know a few places to stop, ordinary days feel held.',
  },
  independence: {
    id: 'independence',
    name: 'Independence',
    chapter: 'Room to Roam',
    color: '#5A3C00', // forest
    accent: 'bg-forest/10',
    text: 'text-forest',
    border: 'border-forest/30',
    description: 'How far your child can move through the neighborhood with less and less adult help.',
    oneLine: 'Routes a child can describe and walk on their own.',
    whyItMatters: 'Independence grows in small stretches. A corner, a landmark, a crossing mastered — that is how childhood expands.',
  },
  wonder: {
    id: 'wonder',
    name: 'Wonder',
    chapter: 'Everyday Wonder',
    color: '#D2961E', // gold
    accent: 'bg-gold/15',
    text: 'text-gold',
    border: 'border-gold/30',
    description: 'How much sensory richness and small discovery your everyday routes offer.',
    oneLine: 'Small reasons to stop and look.',
    whyItMatters: 'Wonder is built from little things — a fountain, a climbing tree, a chalk drawing — that make a walk feel like a walk and not a chore.',
  },
  restoration: {
    id: 'restoration',
    name: 'Restoration',
    chapter: 'Places to Exhale',
    color: '#96963C', // olive
    accent: 'bg-olive/15',
    text: 'text-olive',
    border: 'border-olive/30',
    description: 'Whether nearby places help you and your family pause, breathe, and come back calmer.',
    oneLine: 'A chair in the shade, a quiet block, a five-minute reset.',
    whyItMatters: 'Restoration is what outside gives back. If the only outdoor option is high-stimulation, even outside becomes more work.',
  },
  dailyNature: {
    id: 'dailyNature',
    name: 'Daily Nature',
    chapter: 'Nature in the Routine',
    color: '#F2A57B', // peach
    accent: 'bg-peach/30',
    text: 'text-ink',
    border: 'border-peach/40',
    description: 'How often nature is part of an ordinary day, not a special trip.',
    oneLine: 'Trees, leaves, bugs, weather — on the way, not on the itinerary.',
    whyItMatters: 'Daily nature is the difference between a childhood with nature in it and a childhood that visits nature on weekends.',
  },
  adventure: {
    id: 'adventure',
    name: 'Adventure',
    chapter: 'Your Adventure Edge',
    color: '#B43C1E', // terra
    accent: 'bg-terra/15',
    text: 'text-terra',
    border: 'border-terra/30',
    description: 'How much age-appropriate challenge, speed, and real materials your child can find nearby.',
    oneLine: 'Manageable challenge that grows with them.',
    whyItMatters: 'Adventure is the part of play that builds confidence. Without it, outside is just pretty.',
  },
}

export const DIMENSION_ORDER = [
  'belonging',
  'independence',
  'wonder',
  'restoration',
  'dailyNature',
  'adventure',
]

export const BAND_LABELS = [
  { min: 0, max: 33, label: 'Taking root', tone: 'quiet' },
  { min: 34, max: 66, label: 'Growing', tone: 'steady' },
  { min: 67, max: 100, label: 'In your stride', tone: 'strong' },
]

export function bandFor(score) {
  const s = Math.max(0, Math.min(100, score ?? 0))
  return BAND_LABELS.find((b) => s >= b.min && s <= b.max) || BAND_LABELS[0]
}

export function dimensionById(id) {
  return DIMENSIONS[id] || null
}
