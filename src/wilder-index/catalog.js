// The Wilder Index upgrade catalog. Each upgrade has a base definition
// (title, copy, time, effort, lift) plus a `personalize(profile)` function
// that returns an override based on the user's actual answers. If the
// function returns null, the base is used.

import { kidsAges, describeBlock } from './personalize'

function p(ctx, key) {
  return ctx?.contextAnswers?.[key] || null
}
function blockArr(profile) {
  return profile?.answers?.['specifics.block'] || []
}
function hasBlock(profile, slug) {
  return blockArr(profile).includes(slug)
}
function isApartment(profile) {
  return p(profile, 'context.homeType') === 'apartment' || p(profile, 'context.homeType') === 'townhouse'
}
function isHouseWithYard(profile) {
  return p(profile, 'context.homeType') === 'house_yard'
}
function hasYard(profile) {
  return ['private', 'shared'].includes(p(profile, 'context.outdoorSpace'))
}
function youngestKidBucket(profile) {
  const ages = kidsAges(profile)
  if (ages.length === 0) return null
  if (ages.includes('0-2')) return 'baby'
  if (ages.includes('2-4')) return 'toddler'
  if (ages.includes('5-7')) return 'kid'
  if (ages.includes('8-11')) return 'tween'
  return 'older'
}

export const HABITAT_UPGRADES = {
  belonging: [
    {
      id: 'hab.belonging.1',
      title: 'Put two chairs by the door',
      time: '15 minutes',
      effort: 'low',
      lift: { belonging: 3 },
      copy: 'Two movable chairs on the porch, stoop, or shared step. Sit together after school for 15 minutes. Neighbors stop when there is somewhere to stop.',
      personalize(profile) {
        const out = p(profile, 'context.outdoorSpace')
        if (out === 'balcony' || (isApartment(profile) && out === 'shared')) {
          return {
            title: 'One chair and one plant on the balcony',
            copy: 'A small chair and a fragrant plant on the balcony, the shared step, or just inside the front door. Sit for 15 minutes after pickup. Neighbors stop when there is somewhere to stop, even a small one.',
          }
        }
        if (out === 'none') {
          return {
            title: 'A small welcome by the door',
            copy: 'You don\'t have outdoor space, so the welcome goes inside: a chair or cushion just inside the front door, a chalk drawing on the inside of the door, a small plant on the entry shelf. Sit there 15 minutes after pickup. Neighbors knock when there is somewhere to knock.',
          }
        }
        return null
      },
    },
    {
      id: 'hab.belonging.2',
      title: 'Learn three names',
      time: 'A week',
      effort: 'low',
      lift: { belonging: 2, wonder: 1 },
      copy: 'Pick three neighbors you and your child already see regularly. Use their names this week. Familiarity is the smallest and most powerful neighborhood upgrade.',
      personalize() { return null },
    },
    {
      id: 'hab.belonging.3',
      title: 'A chalk welcome',
      time: '20 minutes',
      effort: 'low',
      lift: { belonging: 2, wonder: 1 },
      copy: 'A simple chalk drawing at the front step or shared walkway. Children stop. Parents stop. Someone always says hi.',
      personalize(profile) {
        if (isApartment(profile)) {
          return {
            title: 'A chalk welcome on the inside of the door',
            copy: 'A chalk drawing on the inside of your apartment door, or a small washable drawing on the hallway wall (with permission). Same effect, smaller canvas. Children see it. Neighbors stop to look.',
          }
        }
        return null
      },
    },
  ],
  independence: [
    {
      id: 'hab.independence.1',
      title: 'Name the landmarks on one route',
      time: 'One walk',
      effort: 'low',
      lift: { independence: 3, wonder: 1 },
      copy: 'Walk the school route, the park route, or the friend\'s-house route. Let your child name three landmarks out loud. Routes become theirs when they can describe them.',
      personalize() { return null },
    },
    {
      id: 'hab.independence.2',
      title: 'Clear one sightline',
      time: '20 minutes',
      effort: 'low',
      lift: { independence: 2, restoration: 1 },
      copy: 'Move the bins, planters, or overgrown shrubs that block a child\'s view of the street. Children can move through a place they can see.',
      personalize() { return null },
    },
    {
      id: 'hab.independence.3',
      title: 'Practice a small errand',
      time: 'A week',
      effort: 'medium',
      lift: { independence: 3, belonging: 1 },
      copy: 'A note to a neighbor. A library book returned. A small thing that makes the block feel like a place children belong in, not just pass through.',
      personalize(profile) {
        if (hasBlock(profile, 'library')) {
          return {
            title: 'Return a library book on foot',
            copy: 'A library book returned, with your child carrying it. A real errand, on foot, to a place you can go back to. That\'s how the block becomes a place children belong in, not just pass through.',
          }
        }
        return null
      },
    },
  ],
  wonder: [
    {
      id: 'hab.wonder.1',
      title: 'A door-side discovery kit',
      time: '10 minutes',
      effort: 'low',
      lift: { wonder: 3, dailyNature: 1 },
      copy: 'A small weatherproof box by the door with a magnifier, a chalk tin, or a nature notebook. The kit turns "let\'s go" into "let\'s look."',
      personalize(profile) {
        if (isApartment(profile)) {
          return {
            title: 'A windowsill discovery kit',
            copy: 'A small tray on the windowsill with a magnifier, a chalk tin, or a nature notebook. It turns the window into a place to look, even when "out" is six feet away.',
          }
        }
        return null
      },
    },
    {
      id: 'hab.wonder.2',
      title: 'Adopt one tree',
      time: 'Ongoing',
      effort: 'low',
      lift: { wonder: 2, dailyNature: 2 },
      copy: 'Pick one tree near home. Photograph it in four seasons. A child with a tree has a relationship with time.',
      personalize(profile) {
        if (!hasBlock(profile, 'trees')) {
          return {
            title: 'Adopt one plant',
            copy: 'Pick one plant on your block — a shrub, a planter outside the building, a tree in the parking strip. Photograph it in four seasons. A child with a plant has a relationship with time.',
          }
        }
        return null
      },
    },
    {
      id: 'hab.wonder.3',
      title: 'A child-height feature',
      time: 'A weekend',
      effort: 'medium',
      lift: { wonder: 3, adventure: 1 },
      copy: 'A pinwheel, a painted stone trail, an insect hotel, a small chalkboard. Anything at child height turns a yard or shared space into a place to return to.',
      personalize(profile) {
        if (isApartment(profile) && !hasYard(profile)) {
          return {
            title: 'A child-height thing in the window',
            copy: 'A wind chime, a small plant, a piece of art at child height in a window facing the street. It gives your child something to look for from the sidewalk, and passersby a reason to look up.',
          }
        }
        return null
      },
    },
  ],
  restoration: [
    {
      id: 'hab.restoration.1',
      title: 'A five-minute reset chair',
      time: '15 minutes',
      effort: 'low',
      lift: { restoration: 3, dailyNature: 1 },
      copy: 'Add a chair, a cushion, or a small shade umbrella to a permitted outdoor area. The point isn\'t comfort — it\'s permission to stop.',
      personalize(profile) {
        if (isApartment(profile) || !hasYard(profile)) {
          return {
            title: 'A reset spot at home',
            copy: 'A chair, a cushion, or a folded blanket by a window that faces trees or sky. Five minutes here after pickup. The point isn\'t comfort — it\'s permission to stop.',
          }
        }
        return null
      },
    },
    {
      id: 'hab.restoration.2',
      title: 'A fragrant pot by the door',
      time: '20 minutes',
      effort: 'low',
      lift: { restoration: 2, dailyNature: 2, wonder: 1 },
      copy: 'Lavender, mint, rosemary, or basil — anything you can brush with your hand on the way in. Scent is the fastest reset.',
      personalize() { return null },
    },
    {
      id: 'hab.restoration.3',
      title: 'A no-destination rule',
      time: 'A week',
      effort: 'low',
      lift: { restoration: 3, belonging: 1 },
      copy: 'Pick one short walk each week where the rule is: no errands, no destination, no agenda. Just the block.',
      personalize(profile) {
        if (p(profile, 'context.outdoorSpace') === 'none' || isApartment(profile)) {
          return {
            title: 'A no-agenda ten minutes',
            copy: 'Apartment living makes "just the block" easier. Ten minutes after pickup, no destination, no agenda. Down the hall, around the block, anywhere the rules stay off.',
          }
        }
        return null
      },
    },
  ],
  dailyNature: [
    {
      id: 'hab.dailyNature.1',
      title: 'One pot of native plants',
      time: '20 minutes',
      effort: 'low',
      lift: { dailyNature: 3, wonder: 1 },
      copy: 'A single pot of locally suitable, child-touchable plants by a window, a stoop, a balcony, or a shared entrance. One is enough to start.',
      personalize(profile) {
        if (isApartment(profile)) {
          return {
            title: 'One pot of touchable plants on the balcony',
            copy: 'A single small pot of touchable, non-toxic plants on the balcony railing or by the kitchen window. Mint, basil, lamb\'s ear, succulents. One is enough to start.',
          }
        }
        if (isHouseWithYard(profile)) {
          return {
            title: 'One patch of touchable plants in the yard',
            copy: 'A small patch of touchable, kid-safe plants in the front or back yard — lamb\'s ear, mint, sage, snapdragons. They can pick a leaf every time they pass.',
          }
        }
        return null
      },
    },
    {
      id: 'hab.dailyNature.2',
      title: 'A window-side nature shelf',
      time: '15 minutes',
      effort: 'low',
      lift: { dailyNature: 2, wonder: 1, restoration: 1 },
      copy: 'A small shelf or tray by a window that faces outside. Today\'s leaf, today\'s seed pod, today\'s stone. Nature without leaving the house.',
      personalize() { return null },
    },
    {
      id: 'hab.dailyNature.3',
      title: 'A daily noticing list',
      time: 'A week',
      effort: 'low',
      lift: { dailyNature: 2, restoration: 1, wonder: 1 },
      copy: 'A simple list by the door — birds, clouds, first flowers, last leaves. Children who notice are already outside.',
      personalize(profile) {
        const y = youngestKidBucket(profile)
        if (y === 'baby' || y === 'toddler') {
          return {
            title: 'A noticing book by the door',
            copy: 'A small notebook by the door for the small noticing — birds, dogs, leaves, a strange car. Even a toddler can point, and you write it down. Noticing is the first form of outside.',
          }
        }
        return null
      },
    },
  ],
  adventure: [
    {
      id: 'hab.adventure.1',
      title: 'A challenge loop',
      time: 'A week',
      effort: 'low',
      lift: { adventure: 3, independence: 1 },
      copy: 'A short loop near home with one slope, one set of steps, one log, one uneven patch. Repeat it weekly. The challenge is in the repetition.',
      personalize(profile) {
        if (p(profile, 'context.area') === 'urban' || isApartment(profile)) {
          return {
            title: 'An urban challenge loop',
            copy: 'A short urban loop that includes one curb, one staircase, one set of bollards, one patch of gravel. Repeat it weekly. The challenge is in the repetition, not the wilderness.',
          }
        }
        return null
      },
    },
    {
      id: 'hab.adventure.2',
      title: 'A loose-parts bin by the door',
      time: '15 minutes',
      effort: 'low',
      lift: { adventure: 3, wonder: 1 },
      copy: 'Rope, cardboard, chalk, a bucket, a small tarp. Things without a job. Children invent the job.',
      personalize() { return null },
    },
    {
      id: 'hab.adventure.3',
      title: 'A supervised real-tools afternoon',
      time: 'A weekend',
      effort: 'medium',
      lift: { adventure: 3, dailyNature: 1 },
      copy: 'Gardening, simple woodworking, or outdoor cooking with real tools. Children rise to the materials you trust them with.',
      personalize() { return null },
    },
  ],
}

export const NEIGHBORHOOD_UPGRADES = {
  belonging: [
    {
      id: 'nbh.belonging.1',
      title: 'Visit one local place and stay',
      time: '15 minutes',
      effort: 'low',
      lift: { belonging: 3, restoration: 1 },
      copy: 'A café, a bakery, a library. The point isn\'t the place — it\'s the staying. 15 minutes, no agenda.',
      personalize(profile) {
        if (hasBlock(profile, 'library') && !hasBlock(profile, 'cafe')) {
          return {
            title: 'Visit the library and stay',
            copy: 'The library, not to borrow anything. Sit. Read a magazine. Let your kid look at the picture books. 15 minutes, no agenda. The point isn\'t the books — it\'s the staying.',
          }
        }
        if (hasBlock(profile, 'cafe') && !hasBlock(profile, 'library')) {
          return {
            title: 'Visit a local café and stay',
            copy: 'A local café, a coffee, a kid\'s hot chocolate. Stay 15 minutes after you\'ve finished the drink. The point isn\'t the coffee — it\'s the staying.',
          }
        }
        return null
      },
    },
    {
      id: 'nbh.belonging.2',
      title: 'Find one local event this week',
      time: '15 minutes',
      effort: 'low',
      lift: { belonging: 2, wonder: 1 },
      copy: 'A market, a library story time, a school event, a community board posting. Belonging shows up when you do.',
      personalize() { return null },
    },
    {
      id: 'nbh.belonging.3',
      title: 'A "same bench, same time" meet-up',
      time: 'A week',
      effort: 'medium',
      lift: { belonging: 4, restoration: 1 },
      copy: 'Pick one bench, one café, one playground. Same time, same day, one other family. Repetition is how strangers become a village.',
      personalize() { return null },
    },
  ],
  independence: [
    {
      id: 'nbh.independence.1',
      title: 'Walk the school route together',
      time: '30 minutes',
      effort: 'low',
      lift: { independence: 3, wonder: 1 },
      copy: 'Not the drive. The walk. Note one landmark, one crossing, one shortcut. Make the route familiar enough to be theirs.',
      personalize(profile) {
        if (!hasBlock(profile, 'school')) {
          return {
            title: 'Walk one route they can repeat',
            copy: 'No school within walking distance. Pick the route to the park, the library, the friend\'s house. Note one landmark, one crossing, one shortcut. Make the route familiar enough to be theirs.',
          }
        }
        return null
      },
    },
    {
      id: 'nbh.independence.2',
      title: 'A small errand they can do',
      time: 'A week',
      effort: 'medium',
      lift: { independence: 3, belonging: 1 },
      copy: 'Returning a library book. Posting a letter. Buying one item at a corner store. Real errands make real children.',
      personalize(profile) {
        if (hasBlock(profile, 'cornerstore')) {
          return {
            title: 'A corner-store errand',
            copy: 'A walk to the corner store, your kid carrying the small change. One item, their choice. Real errands make real children.',
          }
        }
        return null
      },
    },
    {
      id: 'nbh.independence.3',
      title: 'Mark one stressful crossing',
      time: '15 minutes',
      effort: 'low',
      lift: { independence: 2, restoration: 1 },
      copy: 'Identify the one crossing that makes you hold your child\'s hand tightest. Then email the city or the school. One note, one place.',
      personalize() { return null },
    },
  ],
  wonder: [
    {
      id: 'nbh.wonder.1',
      title: 'A "three tiny discoveries" walk',
      time: '20 minutes',
      effort: 'low',
      lift: { wonder: 3, dailyNature: 1 },
      copy: 'A familiar route with a new rule: stop three times for something small. The route doesn\'t change. The noticing does.',
      personalize() { return null },
    },
    {
      id: 'nbh.wonder.2',
      title: 'Find one new small destination',
      time: 'A week',
      effort: 'low',
      lift: { wonder: 2, independence: 1 },
      copy: 'A bookshop window, a mural you\'ve never seen, a public garden, a bench with a view. Pick one within a 10-minute walk.',
      personalize() { return null },
    },
    {
      id: 'nbh.wonder.3',
      title: 'Take a different side street',
      time: '20 minutes',
      effort: 'low',
      lift: { wonder: 2, independence: 2 },
      copy: 'Same start, same end, different turn. Let your child pick the turn. The neighborhood gets bigger by being walked.',
      personalize() { return null },
    },
  ],
  restoration: [
    {
      id: 'nbh.restoration.1',
      title: 'Identify a five-minute quiet spot',
      time: 'A week',
      effort: 'low',
      lift: { restoration: 3, dailyNature: 1 },
      copy: 'Find the closest place where traffic fades and you can hear yourself. Make it the family\'s reset place.',
      personalize(profile) {
        if (hasBlock(profile, 'water')) {
          return {
            title: 'Find the closest water',
            copy: 'You said there\'s water within walking distance. The closest water is your family\'s reset place. Water sound is the fastest off-switch for a tired nervous system. Walk there once this week, stay 5 minutes.',
          }
        }
        if (hasBlock(profile, 'park')) {
          return {
            title: 'Find the quietest corner of the park',
            copy: 'You have a park nearby. The quietest corner of that park is the reset place — the side away from the playground, the bench under the biggest tree. Walk there once this week, stay 5 minutes.',
          }
        }
        return null
      },
    },
    {
      id: 'nbh.restoration.2',
      title: 'Shift one routine walk',
      time: 'A week',
      effort: 'low',
      lift: { restoration: 2, wonder: 1 },
      copy: 'Same destination, one block over. Quieter streets, slower crossings, fewer driveways. Sometimes restoration is just the parallel route.',
      personalize() { return null },
    },
    {
      id: 'nbh.restoration.3',
      title: 'A "no errands" ten-minute walk',
      time: '10 minutes',
      effort: 'low',
      lift: { restoration: 3, belonging: 1 },
      copy: 'After the most stressful part of the day, ten minutes outside with no task. The walk is the task.',
      personalize() { return null },
    },
  ],
  dailyNature: [
    {
      id: 'nbh.dailyNature.1',
      title: 'Choose the greener route',
      time: 'A week',
      effort: 'low',
      lift: { dailyNature: 2, wonder: 1, restoration: 1 },
      copy: 'To school, to coffee, to a friend\'s. Take the route with the most trees, even if it takes a few extra minutes.',
      personalize(profile) {
        if (hasBlock(profile, 'trees')) {
          return {
            title: 'Take the tree-lined route',
            copy: 'You said your block has mature street trees. The tree-lined route is the route. Take it this week, to one weekly destination, even if it adds a few minutes.',
          }
        }
        return null
      },
    },
    {
      id: 'nbh.dailyNature.2',
      title: 'Visit one small green space',
      time: '20 minutes',
      effort: 'low',
      lift: { dailyNature: 3, restoration: 1 },
      copy: 'A pocket park, a tree-lined street, a creek access, a community garden. Stay 10 minutes. Notice one thing.',
      personalize(profile) {
        if (hasBlock(profile, 'water')) {
          return {
            title: 'Visit the water once this week',
            copy: 'You said there\'s water nearby. A creek access, a pond, a waterfront. Visit it once this week. Stay 10 minutes. Notice one thing.',
          }
        }
        if (hasBlock(profile, 'park')) {
          return {
            title: 'Visit the park once this week',
            copy: 'The closest park, even if you\'ve been before. Stay 10 minutes. Notice one thing you didn\'t notice last time.',
          }
        }
        return null
      },
    },
    {
      id: 'nbh.dailyNature.3',
      title: 'Bring nature inside',
      time: '15 minutes',
      effort: 'low',
      lift: { dailyNature: 2, wonder: 1 },
      copy: 'One fallen leaf, one seed pod, one interesting stone. Place it where you\'ll see it. The walk doesn\'t end when you come home.',
      personalize() { return null },
    },
  ],
  adventure: [
    {
      id: 'nbh.adventure.1',
      title: 'Find one local challenge spot',
      time: 'A week',
      effort: 'low',
      lift: { adventure: 3, independence: 1 },
      copy: 'A climbing tree, a balance log, a water feature, a big hill. Make it a regular stop. Adventure is repetition with edge.',
      personalize() { return null },
    },
    {
      id: 'nbh.adventure.2',
      title: 'A loops day',
      time: 'A weekend',
      effort: 'low',
      lift: { adventure: 2, wonder: 1, independence: 1 },
      copy: 'Plan a route that returns to the start without backtracking. Loops feel longer, look bigger, and don\'t require turning around.',
      personalize() { return null },
    },
    {
      id: 'nbh.adventure.3',
      title: 'A "what\'s around the corner" walk',
      time: '30 minutes',
      effort: 'low',
      lift: { adventure: 2, wonder: 2 },
      copy: 'Pick a direction you don\'t usually walk. Follow it for 15 minutes. Turn around, find a new way home. Maps are made by feet.',
      personalize() { return null },
    },
  ],
}

export function listHabitatUpgrades() {
  return Object.values(HABITAT_UPGRADES).flat()
}

export function listNeighborhoodUpgrades() {
  return Object.values(NEIGHBORHOOD_UPGRADES).flat()
}

export function findUpgrade(id, kind = 'habitat') {
  const map = kind === 'habitat' ? HABITAT_UPGRADES : NEIGHBORHOOD_UPGRADES
  for (const list of Object.values(map)) {
    const hit = list.find((u) => u.id === id)
    if (hit) return hit
  }
  return null
}

// Apply personalization to an upgrade. Returns a new object with possibly
// overridden title / copy / time / effort / lift. Falls back to base.
export function applyPersonalization(upgrade, profile) {
  if (!upgrade || typeof upgrade.personalize !== 'function') return upgrade
  const override = upgrade.personalize(profile)
  if (!override) return upgrade
  return { ...upgrade, ...override }
}
