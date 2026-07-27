// Wilder Index achievement catalog + unlock logic.
// Achievements are unlocked based on the user's history: completed
// onboarding, completed upgrades (with dimension + kind), and a rolling
// count of active days. Achievements are never removed.

export const ACHIEVEMENTS = [
  {
    id: 'field-noted',
    title: 'Field Noted',
    blurb: 'Completed the Wilder Index field check.',
    detail: 'You read your neighborhood. That\'s the whole game.',
    icon: '🪶',
  },
  {
    id: 'first-upgrade',
    title: 'First Upgrade',
    blurb: 'Completed your first upgrade.',
    detail: 'One small change. The hardest one is the first one.',
    icon: '✦',
  },
  {
    id: 'creek-keeper',
    title: 'Creek Keeper',
    blurb: 'Completed 3 Daily Nature upgrades.',
    detail: 'A creek, a tree, a pot of mint — you\'ve made nature a habit.',
    icon: '🌿',
  },
  {
    id: 'porch-season',
    title: 'Porch Season',
    blurb: 'Completed 3 Belonging upgrades.',
    detail: 'Neighbors, chairs, a chalk drawing. Your block knows you now.',
    icon: '🪑',
  },
  {
    id: 'loop-walker',
    title: 'Loop Walker',
    blurb: 'Completed 3 Independence upgrades.',
    detail: 'Your child can describe the way. The neighborhood is theirs.',
    icon: '↻',
  },
  {
    id: 'three-tempo',
    title: 'Three-Tempo Day',
    blurb: 'Completed an upgrade in 3 different dimensions.',
    detail: 'Wonder, restoration, and adventure in one day. The rhythm is working.',
    icon: '≋',
  },
  {
    id: 'habitat-architect',
    title: 'Habitat Architect',
    blurb: 'Completed 3 Habitat Upgrades (home changes).',
    detail: 'A chair by the door. A pot of basil. A chalkboard at child height. The architecture is in the small things.',
    icon: '⌂',
  },
  {
    id: 'steady-hand',
    title: 'Steady Hand',
    blurb: 'Completed 5 total upgrades.',
    detail: 'Five small changes. The pattern is yours now.',
    icon: '✺',
  },
]

// Returns the full list of achievements with an `earned: boolean` flag and,
// when earned, an `earnedAt` date string.
export function evaluateAchievements({ onboardingCompleted, history, earnedIds, activeDays }) {
  const earned = new Set(earnedIds || [])
  const newly = []
  const out = ACHIEVEMENTS.map((a) => {
    if (earned.has(a.id)) return { ...a, earned: true }
    return { ...a, earned: false }
  })

  const safeHistory = Array.isArray(history) ? history : []
  const dimensionCounts = safeHistory.reduce((acc, h) => {
    if (h?.dimension) acc[h.dimension] = (acc[h.dimension] || 0) + 1
    return acc
  }, {})
  const habitatCount = safeHistory.filter((h) => h.kind === 'habitat').length
  const total = safeHistory.length
  const dimensionsTouched = new Set(safeHistory.map((h) => h.dimension).filter(Boolean))
  const inSingleDay = (() => {
    const byDay = safeHistory.reduce((acc, h) => {
      const day = (h.completedAt || '').slice(0, 10)
      if (!day) return acc
      acc[day] = acc[day] || new Set()
      if (h.dimension) acc[day].add(h.dimension)
      return acc
    }, {})
    return Object.values(byDay).some((s) => s.size >= 3)
  })()

  const unlocks = []
  if (onboardingCompleted) unlocks.push('field-noted')
  if (total >= 1) unlocks.push('first-upgrade')
  if ((dimensionCounts.dailyNature || 0) >= 3) unlocks.push('creek-keeper')
  if ((dimensionCounts.belonging || 0) >= 3) unlocks.push('porch-season')
  if ((dimensionCounts.independence || 0) >= 3) unlocks.push('loop-walker')
  if (inSingleDay) unlocks.push('three-tempo')
  if (habitatCount >= 3) unlocks.push('habitat-architect')
  if (total >= 5) unlocks.push('steady-hand')

  for (const id of unlocks) {
    if (!earned.has(id)) {
      earned.add(id)
      newly.push(id)
    }
  }

  return {
    achievements: out.map((a) => ({ ...a, earned: earned.has(a.id) })),
    earnedIds: Array.from(earned),
    newlyUnlocked: newly,
  }
}

export function getAchievement(id) {
  return ACHIEVEMENTS.find((a) => a.id === id) || null
}
