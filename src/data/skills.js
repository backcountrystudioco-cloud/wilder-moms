/**
 * Four Pillars Skills System
 * Wilder Moms - Journal & Skills Passport
 * 
 * Each pillar has 5 skills progressing from Seedling → Root
 */

export const pillars = {
  roam: {
    id: 'roam',
    name: 'Roam',
    icon: 'R',
    color: '#5A6428',
    description: 'Trail & Nature Skills',
    skills: [
      {
        id: 'roam_seedling',
        name: 'Seedling',
        level: 1,
        description: 'First walk outside',
        requirements: ['Take your first outdoor nature walk'],
        badge: 'I'
      },
      {
        id: 'roam_sprout',
        name: 'Sprout',
        level: 2,
        description: '1-mile hike completed',
        requirements: ['Complete a 1-mile hike with the family'],
        badge: 'II'
      },
      {
        id: 'roam_leaf',
        name: 'Leaf',
        level: 3,
        description: '3-mile trail master',
        requirements: ['Complete a 3-mile trail hike'],
        badge: 'III'
      },
      {
        id: 'roam_branch',
        name: 'Branch',
        level: 4,
        description: 'Dawn adventurer',
        requirements: ['Start a hike at sunrise or before 7am'],
        badge: 'IV'
      },
      {
        id: 'roam_root',
        name: 'Root',
        level: 5,
        description: 'Trail navigator',
        requirements: ['Lead the way on a trail using map or compass'],
        badge: 'V'
      }
    ]
  },
  create: {
    id: 'create',
    name: 'Create',
    icon: 'C',
    color: '#8C4A14',
    description: 'Nature Arts & Discovery',
    skills: [
      {
        id: 'create_seedling',
        name: 'Gatherer',
        level: 1,
        description: 'Collector of treasures',
        requirements: ['Collect natural items (leaves, rocks, feathers)'],
        badge: 'I'
      },
      {
        id: 'create_sprout',
        name: 'Artist',
        level: 2,
        description: 'Nature art maker',
        requirements: ['Create art using only natural materials'],
        badge: 'II'
      },
      {
        id: 'create_leaf',
        name: 'Storyteller',
        level: 3,
        description: 'Photo journal keeper',
        requirements: ['Document 5 outdoor adventures with photos'],
        badge: 'III'
      },
      {
        id: 'create_branch',
        name: 'Investigator',
        level: 4,
        description: 'Scavenger hunt champion',
        requirements: ['Complete a nature scavenger hunt'],
        badge: 'IV'
      },
      {
        id: 'create_root',
        name: 'Observer',
        level: 5,
        description: 'Nature journal keeper',
        requirements: ['Keep a written nature journal for 4+ weeks'],
        badge: 'V'
      }
    ]
  },
  build: {
    id: 'build',
    name: 'Build',
    icon: 'B',
    color: '#D2961E',
    description: 'Campcraft & Making',
    skills: [
      {
        id: 'build_seedling',
        name: 'Kindler',
        level: 1,
        description: 'Gathering helper',
        requirements: ['Help gather kindling for a fire or stove'],
        badge: 'I'
      },
      {
        id: 'build_sprout',
        name: 'Fire Keeper',
        level: 2,
        description: 'Fire safety star',
        requirements: ['Learn fire safety and help start a safe outdoor fire'],
        badge: 'II'
      },
      {
        id: 'build_leaf',
        name: 'Camp Builder',
        level: 3,
        description: 'Shelter maker',
        requirements: ['Help set up a tent or outdoor shelter'],
        badge: 'III'
      },
      {
        id: 'build_branch',
        name: 'Trail Chef',
        level: 4,
        description: 'Outdoor cooking assistant',
        requirements: ['Help prepare a meal outdoors over fire or stove'],
        badge: 'IV'
      },
      {
        id: 'build_root',
        name: 'Maker',
        level: 5,
        description: 'Build lead',
        requirements: ['Lead a family outdoor building project from plan to finish'],
        badge: 'V'
      }
    ]
  },
  connect: {
    id: 'connect',
    name: 'Connect',
    icon: 'Co',
    color: '#7B3E88',
    description: 'Community & Sharing',
    skills: [
      {
        id: 'connect_seedling',
        name: 'Village Voice',
        level: 1,
        description: 'Story sharer',
        requirements: ['Share a story about an outdoor adventure'],
        badge: 'I'
      },
      {
        id: 'connect_sprout',
        name: 'Trail Friend',
        level: 2,
        description: 'Hike buddy finder',
        requirements: ['Hike with another family or friend'],
        badge: 'II'
      },
      {
        id: 'connect_leaf',
        name: 'Trail Leader',
        level: 3,
        description: 'Group guide',
        requirements: ['Lead a group hike or outdoor activity'],
        badge: 'III'
      },
      {
        id: 'connect_branch',
        name: 'Guide',
        level: 4,
        description: 'Mentor spirit',
        requirements: ['Help a new family discover outdoor adventures'],
        badge: 'IV'
      },
      {
        id: 'connect_root',
        name: 'Host',
        level: 5,
        description: 'Village connector',
        requirements: ['Organize a community outdoor event'],
        badge: 'V'
      }
    ]
  }
}

// Daily prompts for journaling
export const dailyPrompts = [
  "What did you notice today that you haven't seen before?",
  "Where did you find peace outside today?",
  "What sound made you smile?",
  "What did the light do that was beautiful?",
  "What did your child discover that surprised you?",
  "What would you like to do again tomorrow?",
  "What wild thing did you encounter?",
  "How did the weather change your plans?",
  "What did you learn about nature today?",
  "What moment felt most like childhood?",
  "What did you leave better than you found it?",
  "What would you tell another mom about today?"
]

// Get random prompt
export const getRandomPrompt = () => {
  return dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)]
}

// Get skill by ID
export const getSkillById = (skillId) => {
  for (const pillar of Object.values(pillars)) {
    const skill = pillar.skills.find(s => s.id === skillId)
    if (skill) return { ...skill, pillar }
  }
  return null
}

// Get all skills for a pillar
export const getSkillsForPillar = (pillarId) => {
  return pillars[pillarId]?.skills || []
}

// Get pillar by ID
export const getPillarById = (pillarId) => {
  return pillars[pillarId] || null
}

// Get total skills count
export const getTotalSkillsCount = () => {
  return Object.values(pillars).reduce((acc, pillar) => acc + pillar.skills.length, 0)
}

// Check if skill is earned based on journal entries
export const checkSkillEarned = (skillId, entries) => {
  // This would be more sophisticated in production
  // For now, simple heuristics based on pillar_tags and mood
  const skill = getSkillById(skillId)
  if (!skill) return false

  // Check if there are entries with matching pillar and positive mood
  const relevantEntries = entries.filter(entry => 
    entry.pillar_tags?.includes(skill.pillar.id)
  )

  switch (skillId) {
    case 'roam_seedling':
      return entries.length > 0
    case 'roam_sprout':
      return relevantEntries.some(e => e.mood === 'great')
    case 'create_seedling':
      return entries.some(e => e.pillar_tags?.includes('create'))
    case 'build_seedling':
      return entries.some(e => e.pillar_tags?.includes('build'))
    case 'connect_seedling':
      return entries.some(e => e.pillar_tags?.includes('connect'))
    default:
      return relevantEntries.length >= 3
  }
}

// Calculate streak from entries
export const calculateStreak = (entries) => {
  if (!entries || entries.length === 0) return 0

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )

  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.date)
    entryDate.setHours(0, 0, 0, 0)

    const diffDays = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24))

    if (diffDays <= 1) {
      streak++
      currentDate = entryDate
    } else {
      break
    }
  }

  return streak
}

// Get pillar progress for user
export const getPillarProgress = (earnedSkills) => {
  const progress = {}
  
  for (const [pillarId, pillar] of Object.entries(pillars)) {
    const earned = earnedSkills.filter(s => s.startsWith(pillarId)).length
    progress[pillarId] = {
      earned,
      total: pillar.skills.length,
      percentage: Math.round((earned / pillar.skills.length) * 100)
    }
  }

  return progress
}
