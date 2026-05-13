// Hike Activity Recommendation Engine
// Provides 2-3 personalized activity recommendations based on hike context

export const activityRecommendations = {
  seasonal: {
    spring: [
      {
        id: 'dandelion-crown',
        name: 'Dandelion Chain Crowns',
        description: 'Weave dandelions into magical crowns',
        materials: 'Just flowers, patience',
        duration: '15-30 min',
        ages: [2, 3, 4, 5, 6],
        locations: ['forest', 'meadow', 'field', 'trail'],
        magicMoment: 'Leave one perfect chain on a rock as a gift for other hikers',
        makesSpecial: 'Create a "spring princess/prince" ceremony at a scenic spot'
      },
      {
        id: 'frog-watching',
        name: 'Frog & Toad Watching',
        description: 'Sit quietly and count frogs, learn their calls',
        materials: 'None',
        duration: '30-60 min',
        ages: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['river', 'creek', 'pond', 'wetland', 'forest'],
        magicMoment: 'Find frog eggs and observe them over subsequent visits',
        makesSpecial: 'Learn 3+ frog calls and track them through spring'
      },
      {
        id: 'mud-pies',
        name: 'Mud Pie Bakery',
        description: 'Build mud pies with natural decorations',
        materials: 'Sticks, leaves, flowers, rocks',
        duration: '30-45 min',
        ages: [2, 3, 4, 5],
        locations: ['river', 'creek', 'forest', 'field', 'trail'],
        magicMoment: 'Bury small treasures in the mud pie for later discovery',
        makesSpecial: 'Create a "menu" and give mud pies as gifts to stuffed animals'
      },
      {
        id: 'blossom-pressing',
        name: 'Blossom Collecting & Pressing',
        description: 'Collect spring blooms and create a field journal page',
        materials: 'Paper bag, cardboard for pressing',
        duration: '20-45 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['forest', 'orchard', 'trail', 'meadow'],
        magicMoment: 'Give a fallen blossom to another hiker with "spring is here!"',
        makesSpecial: 'Create a "spring collection" with sketches and preserved blossoms'
      }
    ],
    summer: [
      {
        id: 'stone-stacking',
        name: 'Stone Stacking / Rock Balancing',
        description: 'Attempt impossible stacks, practice patience and balance',
        materials: 'Natural stones only',
        duration: '20-60 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12, 'adult'],
        locations: ['beach', 'river', 'creek', 'forest', 'rocky'],
        magicMoment: 'Build a "wishing stack" - each stone is a wish, leave for others',
        makesSpecial: 'Document each successful stack, attempt the impossible height'
      },
      {
        id: 'water-play',
        name: 'Water Play & Dam Building',
        description: 'Create river kingdoms with channels, pools, and dams',
        materials: 'Rocks, sticks, sand, leaves',
        duration: '45-120 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['river', 'creek', 'stream'],
        magicMoment: 'Release the dam ceremonially - "opening the dam ceremony"',
        makesSpecial: 'Give names to different areas, return to see if dam survived'
      },
      {
        id: 'nature-mandala',
        name: 'Nature Art Mandalas',
        description: 'Create circular art using only what nature provides',
        materials: 'Flowers, leaves, stones, sticks (natural, fallen only)',
        duration: '30-60 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12, 'adult'],
        locations: ['forest', 'beach', 'meadow', 'trail', 'river'],
        magicMoment: 'Leave the mandala for others to discover',
        makesSpecial: 'Photograph from above, make it a seasonal tradition'
      },
      {
        id: 'firefly-watching',
        name: 'Firefly Watching',
        description: 'Count fireflies, learn their language of light',
        materials: 'Red-filtered flashlight',
        duration: '30-60 min (evening)',
        ages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['meadow', 'forest', 'field'],
        magicMoment: 'Lie on backs and watch the whole sky pulse with light',
        makesSpecial: 'Try to "talk" to them with your light, learn why they glow'
      }
    ],
    fall: [
      {
        id: 'leaf-art',
        name: 'Leaf Art & Creatures',
        description: 'Make leaf creatures - beetles, birds, foxes, dragons',
        materials: 'Fallen leaves, sticks, rocks, berries',
        duration: '20-45 min',
        ages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['forest', 'trail', 'meadow', 'field'],
        magicMoment: 'Create a "leaf spirit" on a rock and leave it for others',
        makesSpecial: 'Give leaf creatures personalities, make leaf families'
      },
      {
        id: 'bark-rubbings',
        name: 'Bark Rubbings',
        description: 'Find 5+ different tree bark patterns, make a field guide',
        materials: 'Paper, crayons or charcoal',
        duration: '30-60 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12, 'adult'],
        locations: ['forest', 'trail', 'park'],
        magicMoment: 'Find a tree with moss patterns and add those to the rubbing',
        makesSpecial: 'Make a bark field guide page for each unique tree'
      },
      {
        id: 'acorn-games',
        name: 'Acorn Games',
        description: 'Sort, plant, and play with acorns',
        materials: 'Acorns only',
        duration: '15-30 min',
        ages: [3, 4, 5, 6, 7, 8],
        locations: ['forest', 'oak groves', 'trail'],
        magicMoment: 'Find the "mother oak" - one massive tree dropping thousands of acorns',
        makesSpecial: 'Plant some acorns, feed squirrels, play "acorn golf"'
      },
      {
        id: 'seed-collecting',
        name: 'Seed Collecting & Exploration',
        description: 'Identify seeds by how they travel - winged, fluffy, hitchhiker',
        materials: 'Small bags or envelopes',
        duration: '20-45 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['field', 'forest edge', 'meadow', 'trail'],
        magicMoment: 'Find "helicopter" maple seeds and release them - watch them spin',
        makesSpecial: 'Create seed jewelry, plant some in a "seed sanctuary"'
      }
    ],
    winter: [
      {
        id: 'twig-structures',
        name: 'Twig Structure Building',
        description: 'Build shelters for woodland creatures, fairy houses',
        materials: 'Fallen twigs and branches only',
        duration: '30-60 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['forest', 'trail', 'field'],
        magicMoment: 'Build the same structure at the same spot each winter visit',
        makesSpecial: 'Make a "twig temple" or shelters for specific creatures'
      },
      {
        id: 'bird-watching',
        name: 'Bird Watching & Feeding',
        description: 'Learn 3 winter birds in your area, create a tally',
        materials: 'Binoculars (optional), bird guide app',
        duration: '20-45 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['forest', 'trail', 'park', 'meadow'],
        magicMoment: 'Find a mixed flock and watch how different species travel together',
        makesSpecial: 'Track which birds you see at which locations'
      },
      {
        id: 'track-id',
        name: 'Track Identification',
        description: 'Follow animal tracks, try to figure out the whole story',
        materials: 'Track guide (app), camera',
        duration: '30-60 min',
        ages: [5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['forest', 'trail', 'snowy areas', 'muddy paths'],
        magicMoment: 'Find YOUR track - leave your footprint next to an animal\'s',
        makesSpecial: 'Follow a track for as long as you can to figure out the story'
      },
      {
        id: 'sunset-watching',
        name: 'Sunset Watching',
        description: 'Complete silence during sunset, watch for first star',
        materials: 'Blanket, warm layers',
        duration: '30-45 min',
        ages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        locations: ['meadow', 'hilltop', 'beach', 'open trail'],
        magicMoment: 'First star appearance ceremony - who spots it first?',
        makesSpecial: 'Note where the sun disappears, make up sunset stories'
      }
    ]
  },
  
  locationBased: {
    forest: [
      {
        id: 'mushroom-spotting',
        name: 'Mushroom Spotting (Not Eating!)',
        description: 'Look for fairy rings, find the tiniest mushroom',
        materials: 'Camera (optional), guide app',
        duration: '30-60 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Find a "shelf fungus" and examine its layers like pages in a book',
        makesSpecial: 'Notice where fungi grow and what they\'re decomposing'
      },
      {
        id: 'stick-fort',
        name: 'Stick Fort Building',
        description: 'Build fairy house entrances, create doors that fit a small child',
        materials: 'Fallen branches only, no live trees',
        duration: '45-120 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Leave a "fort guardian" - a small stick figure at the entrance',
        makesSpecial: 'Add natural decorations - moss, rocks, feathers'
      },
      {
        id: 'forest-floor',
        name: 'Forest Floor Exploration',
        description: 'Discover the "mini forest" at ground level',
        materials: 'Magnifying glass (optional)',
        duration: '20-45 min',
        ages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Find a "fairy circle" - a ring of moss - and sit in the middle',
        makesSpecial: 'Find a decaying log and discover the recyclers'
      }
    ],
    beach: [
      {
        id: 'shell-art',
        name: 'Shell Art',
        description: 'Sort shells by type, create patterns, make shell creatures',
        materials: 'Shells only',
        duration: '20-45 min',
        ages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Find a sand dollar and leave it as a gift for another explorer',
        makesSpecial: 'Find "perfect" shells, create patterns visible from above'
      },
      {
        id: 'tide-pool',
        name: 'Tide Pool Exploration',
        description: 'Move slowly, touch gently, identify 3 creatures',
        materials: 'Water shoes, magnifying glass (optional)',
        duration: '45-90 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Watch an anemone close, find a hermit crab changing shells',
        makesSpecial: 'Watch how the creatures move, notice different species'
      },
      {
        id: 'driftwood-building',
        name: 'Driftwood Building',
        description: 'Build rafts that float, create sculptures, make message sticks',
        materials: 'Driftwood only',
        duration: '30-60 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Build a driftwood fire ring and toast treats where allowed',
        makesSpecial: 'Create a "message stick" to leave on the beach'
      }
    ],
    river: [
      {
        id: 'dam-building',
        name: 'Dam Building',
        description: 'Create channels and pools, work as a team',
        materials: 'Rocks, sticks, sand',
        duration: '60-120 min',
        ages: [6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Release the dam ceremonially at the end - observe the rush',
        makesSpecial: 'Give the dam a name and history, return to see if it survived'
      },
      {
        id: 'skip-rocks',
        name: 'Skip Rocks / Stone Skipping',
        description: 'Practice flat spin technique, count skips, find perfect rock',
        materials: 'Flat rocks only',
        duration: '15-30 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Beat a family record, find the "legendary skipping stone"',
        makesSpecial: 'Notice which rocks skip best - flat, smooth, thin edges'
      },
      {
        id: 'pebble-art',
        name: 'Pebble Art',
        description: 'Create patterns with smooth stones, make stone creatures',
        materials: 'Pebbles only',
        duration: '20-45 min',
        ages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Build a "creek creature" in the water that fish might notice',
        makesSpecial: 'Create stone portraits of family members'
      }
    ],
    desert: [
      {
        id: 'rock-balancing',
        name: 'Rock Balancing / Cairns',
        description: 'Balance rocks using natural curves, create desert wishing stones',
        materials: 'Rocks only',
        duration: '20-60 min',
        ages: [5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Balance a final stone on top and make a wish, leave for others',
        makesSpecial: 'Try impossible balances, create cairns at special spots'
      },
      {
        id: 'lizard-spotting',
        name: 'Lizard Spotting',
        description: 'Practice "lizard sitting" - sit still and wait for movement',
        materials: 'None',
        duration: '20-45 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Watch a lizard do a push-up display (territorial behavior)',
        makesSpecial: 'Find the same lizard twice, notice different species'
      },
      {
        id: 'sand-art',
        name: 'Sand Art / Designs',
        description: 'Make mandalas in sand, create animal tracks',
        materials: 'Hands, feet, sticks',
        duration: '30-60 min',
        ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Create a design visible from above, try to photograph it',
        makesSpecial: 'Use natural materials to add color and texture'
      }
    ],
    mountain: [
      {
        id: 'summit-ceremony',
        name: 'Summit Ceremony',
        description: 'Share gratitude, take family photo, create a marker',
        materials: 'None',
        duration: '15-30 min at summit',
        ages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Write a summit note and leave it in a cairn for others',
        makesSpecial: 'Create a family summit tradition - same pose each time'
      },
      {
        id: 'geology-discovery',
        name: 'Geological Observation',
        description: 'Find evidence of glaciers, water, or ancient seas',
        materials: 'None',
        duration: '20-45 min',
        ages: [6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Find a fossil imprint - even a shell tells a million-year story',
        makesSpecial: 'Look for "rogue boulders" (glacial erratics), layered rock'
      },
      {
        id: 'alpine-plants',
        name: 'Alpine Plant Discovery',
        description: 'Notice how plants grow low to ground for wind/sun protection',
        materials: 'Plant guide (app)',
        duration: '30-60 min',
        ages: [5, 6, 7, 8, 9, 10, 11, 12],
        magicMoment: 'Find a plant growing from a crack in solid rock',
        makesSpecial: 'Notice cushion plants, tufted grasses, survival strategies'
      }
    ]
  },
  
  ageBased: {
    toddler: [
      {
        id: 'mud-pies-toddler',
        name: 'Mud Pie Bakery',
        description: 'Touch, smell, create with mud',
        materials: 'None - just mud!',
        duration: '10-20 min',
        locations: ['river', 'creek', 'forest', 'field'],
        magicMoment: 'Cover yourself in mud together - ultimate memory',
        makesSpecial: 'Bury treasures and find them on return visits'
      },
      {
        id: 'water-play-toddler',
        name: 'Shallow Water Play',
        description: 'Splash, pour, watch water flow',
        materials: 'None',
        duration: '15-30 min',
        locations: ['river', 'creek', 'beach'],
        magicMoment: 'Find a shallow spot and just splash together',
        makesSpecial: 'Follow their pace - let them lead'
      },
      {
        id: 'rock-collecting',
        name: 'Rock Collecting',
        description: 'Put rocks in and out of containers, feel different textures',
        materials: 'None',
        duration: '10-20 min',
        locations: ['trail', 'beach', 'forest', 'river'],
        magicMoment: 'Let them keep their favorite rock as a treasure',
        makesSpecial: 'Collect one special rock to add to a family collection'
      }
    ],
    youngKid: [
      {
        id: 'nature-bracelet',
        name: 'Nature Bracelet',
        description: 'Tape wrist and stick nature to it as you walk',
        materials: 'Clear tape (carried)',
        duration: '15-30 min',
        locations: ['forest', 'trail', 'meadow'],
        magicMoment: 'See how many different things you can add before it falls off',
        makesSpecial: 'Take it home and press the findings in a journal'
      },
      {
        id: 'leaf-creatures',
        name: 'Leaf Creatures',
        description: 'Make beetles, birds, foxes from fallen leaves',
        materials: 'Fallen leaves, sticks, berries',
        duration: '20-45 min',
        locations: ['forest', 'trail', 'meadow'],
        magicMoment: 'Give each creature a name and backstory',
        makesSpecial: 'Create a whole leaf family'
      },
      {
        id: 'stick-forts-young',
        name: 'Mini Stick Forts',
        description: 'Build small forts for fairies or woodland creatures',
        materials: 'Fallen twigs and branches',
        duration: '30-60 min',
        locations: ['forest', 'trail'],
        magicMoment: 'Add a "door" that fits a small hand',
        makesSpecial: 'Leave a "fort guardian" at the entrance'
      }
    ],
    olderKid: [
      {
        id: 'dam-building-older',
        name: 'Dam Building Challenge',
        description: 'Build a dam that actually holds water',
        materials: 'Rocks, sticks, sand',
        duration: '60-120 min',
        locations: ['river', 'creek', 'stream'],
        magicMoment: 'Name your dam and return to see if it survived',
        makesSpecial: 'Make it a real engineering challenge - test different approaches'
      },
      {
        id: 'track-investigation',
        name: 'Track Investigation',
        description: 'Follow tracks, figure out the whole animal story',
        materials: 'Track guide (app), camera',
        duration: '30-60 min',
        locations: ['forest', 'trail', 'snowy', 'muddy'],
        magicMoment: 'Find where the animal was going and what they were doing',
        makesSpecial: 'Create a tracking journal with photos and sketches'
      },
      {
        id: 'adventure-mapping',
        name: 'Adventure Mapping',
        description: 'Sketch the trail as you go, mark interesting spots',
        materials: 'Small notebook, pencil',
        duration: 'Throughout hike',
        locations: ['forest', 'trail', 'mountain'],
        magicMoment: 'Compare your map to the official map afterward',
        makesSpecial: 'Mark "secret spots" to return to'
      }
    ]
  },
  
  magicMoments: [
    {
      id: 'rock-stack-landmark',
      name: 'Rock Stack Landmarks',
      description: 'Build a visible stack at a special spot',
      locations: ['forest', 'beach', 'trail', 'mountain', 'river'],
      ages: [4, 5, 6, 7, 8, 9, 10, 11, 12, 'adult'],
      materials: 'Stones only',
      howTo: 'Each family member adds one stone and makes a wish. Return to photograph over years.'
    },
    {
      id: 'wish-tree',
      name: 'Wish Tree Ritual',
      description: 'Find a meaningful tree and create a returning tradition',
      locations: ['forest', 'trail'],
      ages: [4, 5, 6, 7, 8, 9, 10, 11, 12, 'adult'],
      materials: 'Biodegradable ribbon or string (carried)',
      howTo: 'Tie ribbons or marks to remember visits. Make wishes. Return to see if they came true.'
    },
    {
      id: 'discovery-pause',
      name: 'Discovery Pause Ritual',
      description: 'When anyone finds something, everyone stops and examines together',
      locations: ['any'],
      ages: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      materials: 'None',
      howTo: 'When anyone calls "Discovery!" everyone stops. Examine it together for 5 minutes. Make it special.'
    },
    {
      id: 'trail-art-gift',
      name: 'Trail Art Gift',
      description: 'Create something for other hikers to discover',
      locations: ['forest', 'trail', 'beach', 'meadow'],
      ages: [4, 5, 6, 7, 8, 9, 10, 11, 12],
      materials: 'Natural materials only',
      howTo: 'Make something beautiful with natural materials. Leave it where others might find it. Check back later.'
    },
    {
      id: 'summit-silence',
      name: 'Summit Silence',
      description: 'Take a moment of complete silence at the top',
      locations: ['mountain', 'hilltop', 'lookout'],
      ages: [5, 6, 7, 8, 9, 10, 11, 12],
      materials: 'None',
      howTo: 'Reach the summit. Before talking, take 60 seconds of complete silence. Then share one word about how you feel.'
    }
  ]
}

// Get activities for specific hike context
export function getRecommendedActivities(context) {
  const { season, location, trailDifficulty, duration, childAges, interests } = context
  
  let recommendations = []
  
  // Helper to get season key
  const getSeason = (month) => {
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'fall'
    return 'winter'
  }
  
  const seasonKey = getSeason(new Date().getMonth())
  
  // Get activities for the season
  const seasonalActivities = activityRecommendations.seasonal[seasonKey] || []
  
  // Get location-specific activities
  const locationActivities = activityRecommendations.locationBased[location] || []
  
  // Filter by age
  const filterByAge = (activities) => {
    return activities.filter(activity => {
      if (!activity.ages) return true
      if (childAges.includes('all')) return true
      
      const maxAge = Math.max(...childAges)
      return activity.ages.some(age => 
        typeof age === 'number' && age <= maxAge
      )
    })
  }
  
  // Filter by duration
  const filterByDuration = (activities, maxDuration) => {
    if (!maxDuration) return activities
    
    return activities.filter(activity => {
      const durationMins = parseInt(activity.duration)
      return durationMins <= maxDuration
    })
  }
  
  // Start with seasonal activities that match location
  const matchedSeasonal = seasonalActivities.filter(a => 
    a.locations && a.locations.includes(location)
  )
  
  // Combine and deduplicate
  const allActivities = [...matchedSeasonal, ...locationActivities]
  
  // Apply filters
  let filtered = filterByAge(allActivities)
  filtered = filterByDuration(filtered, duration === 'short' ? 30 : duration === 'half-day' ? 60 : 999)
  
  // Pick 2-3 based on variety
  const uniqueActivities = []
  const seenIds = new Set()
  
  for (const activity of filtered) {
    if (!seenIds.has(activity.id)) {
      uniqueActivities.push(activity)
      seenIds.add(activity.id)
      if (uniqueActivities.length >= 3) break
    }
  }
  
  // Add a magic moment if we have room
  if (uniqueActivities.length < 3) {
    const magicMoments = activityRecommendations.magicMoments.filter(m => 
      m.locations.includes(location)
    )
    if (magicMoments.length > 0 && childAges.some(a => a >= 4)) {
      uniqueActivities.push(magicMoments[Math.floor(Math.random() * magicMoments.length)])
    }
  }
  
  return uniqueActivities.slice(0, 3).map(activity => ({
    name: activity.name,
    description: activity.description,
    materials: activity.materials,
    duration: activity.duration,
    magicMoment: activity.magicMoment,
    makesSpecial: activity.makesSpecial,
    type: activity.magicMoment ? 'magic-moment' : 'activity'
  }))
}

export default activityRecommendations
