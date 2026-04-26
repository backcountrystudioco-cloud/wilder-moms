/**
 * Trail Craft Data - Outdoor craft integration for Habitat page
 * Wilder Moms - Family-Friendly Outdoor/Nature Website
 * 
 * Maps crafts to trail moments, weather conditions, and forage possibilities
 */

// Trail moment types
export const trailMoments = {
  'rest-stop': 'Rest Stop Craft',
  'collecting': 'Collection Activity',
  'walking': 'Walk & Create',
  'waiting': 'Waiting Game',
  'camp': 'Campsite Craft',
};

// Effort levels with time estimates
export const effortLevels = {
  quick: { label: 'Quick (5-15 min)', maxDuration: 15 },
  medium: { label: 'Medium (15-30 min)', maxDuration: 30 },
  extended: { label: 'Extended (30+ min)', maxDuration: 60 },
};

// Weather-aware craft suggestions
export const weatherCraftMap = {
  hot: {
    crafts: ['nature-bracelet', 'leaf-whistle', 'grass-blade-flute', 'rock-tower', 'mud-paint'],
    tips: 'Quick crafts in the shade. Collect items during cooler morning hours.',
  },
  'extreme-heat': {
    crafts: ['nature-bracelet', 'leaf-whistle', 'grass-blade-flute'],
    tips: 'Stick to instant gratification crafts. Save extended projects for another day.',
  },
  drizzle: {
    crafts: ['bark-rubbing', 'nature-bracelet', 'stick-bundles', 'mud-paint'],
    tips: 'Perfect for covered areas. Undereave or tree cover works great.',
  },
  'drizzle-cool': {
    crafts: ['bark-rubbing', 'bark-rubbing', 'nature-journal', 'twig-letters'],
    tips: 'Cozy covered spots are ideal. Watch for slippery surfaces.',
  },
  rain: {
    crafts: ['nature-journal', 'twig-letters', 'stick-bundles'],
    tips: 'Keep dry and stay safe. These work well at trail shelters.',
  },
  cold: {
    crafts: ['charcoal-drawing', 'rock-tower', 'stick-bundles', 'nest-building'],
    tips: 'Stationary activities that warm you up. Pack hand warmers!',
  },
  snow: {
    crafts: ['snow-sculpture', 'ice-art', 'nature-bracelet'],
    tips: 'Embrace the elements! Dress warm and keep moving.',
  },
  perfect: {
    crafts: ['stone-fairy-house', 'bark-rubbing', 'nest-building', 'twig-letters', 'feather-mobile', 'pine-cone-owl'],
    tips: 'Perfect conditions! Go for extended projects and explore freely.',
  },
  cloudy: {
    crafts: ['seed-mosaic', 'flower-collage', 'nature-journal', 'bark-rubbing'],
    tips: 'Overcast = no sunburn risk. Great for detailed work outdoors.',
  },
  warm: {
    crafts: ['rock-tower', 'nature-bracelet', 'dandelion-crown', 'leaf-bow', 'grass-weaving'],
    tips: 'Comfortable temps for any craft. Longer projects are go.',
  },
  default: {
    crafts: ['nature-bracelet', 'bark-rubbing', 'rock-tower', 'nature-journal'],
    tips: 'Every trail is a craft opportunity. Look for what catches your eye.',
  },
};

// Time window craft suggestions
export const timeCraftMap = {
  30: ['nature-bracelet', 'leaf-whistle', 'grass-blade-flute', 'leaf-bow', 'rock-tower'],
  60: ['bark-rubbing', 'dandelion-crown', 'mud-paint', 'stick-bundles', 'grass-weaving'],
  90: ['acorn-cap-necklace', 'twig-letters', 'pine-cone-owl', 'nest-building', 'twig-frame'],
  120: ['stone-fairy-house', 'feather-mobile', 'moss-terrarium', 'charcoal-drawing'],
};

// Forage-to-craft mappings
export const forageTargets = {
  pinecones: [
    { craftId: 'pine-cone-owl', makeNow: true, description: 'Pine Cone Owl - classic trail craft' },
    { craftId: 'pine-cone-owl', makeNow: false, description: 'Save for indoor craft later' },
  ],
  acorns: [
    { craftId: 'acorn-cap-necklace', makeNow: true, description: 'Acorn Cap Necklace - wearable memory' },
  ],
  feathers: [
    { craftId: 'feather-mobile', makeNow: true, description: 'Feather Wind Catcher - dance in the breeze' },
    { craftId: 'nest-building', makeNow: true, description: 'Tiny Bird Nest - cozy and natural' },
  ],
  smooth_rocks: [
    { craftId: 'rock-tower', makeNow: true, description: 'Rock Balancing Art - find the center' },
    { craftId: 'stone-fairy-house', makeNow: false, description: 'Stone Fairy House - save for garden' },
  ],
  flat_rocks: [
    { craftId: 'stone-fairy-house', makeNow: true, description: 'Stone Fairy House - build a tiny home' },
  ],
  bark: [
    { craftId: 'bark-rubbing', makeNow: true, description: 'Bark Rubbing - reveal the tree\'s texture' },
  ],
  leaves_maple: [
    { craftId: 'leaf-bow', makeNow: true, description: 'Maple Leaf Bow - natural elegance' },
    { craftId: 'leaf-print-bookmarks', makeNow: false, description: 'Leaf Print Bookmarks - preserve the moment' },
  ],
  leaves_large: [
    { craftId: 'mud-paint', makeNow: true, description: 'Mud Paint on Leaves - earth on earth' },
    { craftId: 'leaf-whistle', makeNow: true, description: 'Leaf Whistle - sound of summer' },
  ],
  sticks: [
    { craftId: 'stick-bundles', makeNow: true, description: 'Magic Stick Bundles - bundle up nature' },
    { craftId: 'twig-letters', makeNow: false, description: 'Twig Letters - spell it out' },
  ],
  dandelions: [
    { craftId: 'dandelion-crown', makeNow: true, description: 'Dandelion Crown - wear your finds' },
  ],
  wildflowers: [
    { craftId: 'flower-lei', makeNow: true, description: 'Flower Lei - a necklace from the trail' },
    { craftId: 'flower-face', makeNow: false, description: 'Petal Faces - silly and creative' },
  ],
  moss: [
    { craftId: 'moss-terrarium', makeNow: false, description: 'Moss Terrarium - tiny ecosystem' },
    { craftId: 'stone-fairy-house', makeNow: true, description: 'Moss roofing for fairy houses' },
  ],
  grass_long: [
    { craftId: 'grass-blade-flute', makeNow: true, description: 'Grass Blade Flute - make music' },
    { craftId: 'grass-weaving', makeNow: true, description: 'Grass Blade Mats - woven art' },
  ],
  seed_pods: [
    { craftId: 'seed-pod-birds', makeNow: true, description: 'Seed Pod Birds - nature\'s sculpture' },
  ],
  charcoal: [
    { craftId: 'charcoal-drawing', makeNow: true, description: 'Charcoal Drawing - sketch the scene' },
  ],
};

// Items commonly found on Colorado trails (for forage suggestions)
export const trailForageItems = [
  { id: 'pinecones', label: 'Pinecones', emoji: '🌲', season: ['spring', 'summer', 'fall'] },
  { id: 'acorns', label: 'Acorns', emoji: '🌰', season: ['fall'] },
  { id: 'feathers', label: 'Feathers', emoji: '🪶', season: ['spring', 'summer', 'fall'] },
  { id: 'smooth_rocks', label: 'Smooth rocks', emoji: '🪨', season: ['spring', 'summer', 'fall', 'winter'] },
  { id: 'flat_rocks', label: 'Flat rocks', emoji: '🪨', season: ['spring', 'summer', 'fall'] },
  { id: 'bark', label: 'Interesting bark', emoji: '🌳', season: ['spring', 'summer', 'fall'] },
  { id: 'leaves_maple', label: 'Maple leaves', emoji: '🍁', season: ['fall'] },
  { id: 'leaves_large', label: 'Large leaves', emoji: '🍃', season: ['spring', 'summer'] },
  { id: 'sticks', label: 'Sticks', emoji: '🪵', season: ['spring', 'summer', 'fall', 'winter'] },
  { id: 'dandelions', label: 'Dandelions', emoji: '🌼', season: ['spring', 'summer'] },
  { id: 'wildflowers', label: 'Wildflowers', emoji: '🌸', season: ['spring', 'summer'] },
  { id: 'moss', label: 'Moss', emoji: '🌿', season: ['spring', 'summer', 'fall'] },
  { id: 'grass_long', label: 'Long grass', emoji: '🌾', season: ['spring', 'summer'] },
  { id: 'seed_pods', label: 'Seed pods', emoji: '🫘', season: ['summer', 'fall'] },
];

// Seasonal forage highlights
export const seasonalForage = {
  spring: [
    { id: 'dandelions', label: 'Dandelions', emoji: '🌼' },
    { id: 'wildflowers', label: 'Wildflowers', emoji: '🌸' },
    { id: 'sticks', label: 'Sticks', emoji: '🪵' },
    { id: 'moss', label: 'Moss', emoji: '🌿' },
    { id: 'grass_long', label: 'Long grass', emoji: '🌾' },
  ],
  summer: [
    { id: 'pinecones', label: 'Pinecones', emoji: '🌲' },
    { id: 'feathers', label: 'Feathers', emoji: '🪶' },
    { id: 'smooth_rocks', label: 'Smooth rocks', emoji: '🪨' },
    { id: 'leaves_large', label: 'Large leaves', emoji: '🍃' },
    { id: 'moss', label: 'Moss', emoji: '🌿' },
  ],
  fall: [
    { id: 'pinecones', label: 'Pinecones', emoji: '🌲' },
    { id: 'acorns', label: 'Acorns', emoji: '🌰' },
    { id: 'feathers', label: 'Feathers', emoji: '🪶' },
    { id: 'leaves_maple', label: 'Maple leaves', emoji: '🍁' },
    { id: 'sticks', label: 'Sticks', emoji: '🪵' },
    { id: 'seed_pods', label: 'Seed pods', emoji: '🫘' },
  ],
  winter: [
    { id: 'sticks', label: 'Sticks', emoji: '🪵' },
    { id: 'smooth_rocks', label: 'Smooth rocks', emoji: '🪨' },
    { id: 'bark', label: 'Interesting bark', emoji: '🌳' },
    { id: 'pinecones', label: 'Pinecones', emoji: '🌲' },
  ],
};

// Hike character to craft mapping
export const hikeCraftMap = {
  water: ['rock-tower', 'mud-paint', 'nature-bracelet'],
  forest: ['bark-rubbing', 'twig-letters', 'nest-building', 'moss-terrarium'],
  meadow: ['dandelion-crown', 'flower-lei', 'grass-weaving', 'nature-bracelet'],
  mountain: ['rock-tower', 'charcoal-drawing', 'stick-bundles', 'stone-fairy-house'],
  canyon: ['bark-rubbing', 'mud-paint', 'leaf-whistle'],
  prairie: ['grass-blade-flute', 'grass-weaving', 'nature-bracelet', 'dandelion-crown'],
};

// Get craft suggestions based on context
export function getCraftSuggestions({ weatherLevel, timeWindow, hikeCharacter, season, forage }) {
  const suggestions = [];
  
  // Weather-based crafts
  const weatherCrafts = weatherCraftMap[weatherLevel] || weatherCraftMap.default;
  if (weatherCrafts) {
    weatherCrafts.crafts.forEach(craftId => {
      suggestions.push({
        craftId,
        source: 'weather',
        priority: 'primary',
      });
    });
  }
  
  // Time-based crafts
  const timeCrafts = timeCraftMap[timeWindow] || timeCraftMap[60];
  timeCrafts.forEach(craftId => {
    if (!suggestions.find(s => s.craftId === craftId)) {
      suggestions.push({
        craftId,
        source: 'time',
        priority: 'secondary',
      });
    }
  });
  
  // Hike character crafts
  if (hikeCharacter && hikeCraftMap[hikeCharacter]) {
    hikeCraftMap[hikeCharacter].forEach(craftId => {
      if (!suggestions.find(s => s.craftId === craftId)) {
        suggestions.push({
          craftId,
          source: 'trail',
          priority: 'bonus',
        });
      }
    });
  }
  
  // Forage-based crafts (if user has collected items)
  if (forage && forage.length > 0) {
    forage.forEach(item => {
      const craftOptions = forageTargets[item];
      if (craftOptions) {
        craftOptions.forEach(opt => {
          if (!suggestions.find(s => s.craftId === opt.craftId)) {
            suggestions.push({
              craftId: opt.craftId,
              source: 'forage',
              priority: 'personal',
              description: opt.description,
              makeNow: opt.makeNow,
            });
          }
        });
      }
    });
  }
  
  return suggestions.slice(0, 6);
}

// Get seasonal forage items
export function getSeasonalForageItems(season) {
  return seasonalForage[season] || seasonalForage.spring;
}
