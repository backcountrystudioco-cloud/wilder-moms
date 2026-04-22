/**
 * Seasonal Planting Calendar Data
 * Wilder Moms - Family-Friendly Outdoor/Nature Website
 * 
 * Organized by USDA Zones (focus on Colorado/zones 4-7)
 * Each plant includes: name, type, when to plant, days to harvest, tips
 */

const currentMonth = new Date().getMonth(); // 0-11
const currentSeason = 
  currentMonth >= 2 && currentMonth <= 4 ? 'spring' :
  currentMonth >= 5 && currentMonth <= 7 ? 'summer' :
  currentMonth >= 8 && currentMonth <= 10 ? 'fall' : 'winter';

// USDA Zone estimation based on latitude (rough Colorado estimation)
export function estimateZone(lat) {
  if (lat === null) return 5; // Default to zone 5 (Denver area)
  // Higher latitude = colder zone
  if (lat > 40.5) return 5;  // Mountains/High altitude
  if (lat > 39.5) return 6;  // Denver/Boulder area
  return 7; // Lower elevation/warmer
}

export const plantingCalendar = {
  spring: {
    description: 'Spring is here! Time to get seeds in the ground.',
    zones: {
      4: [
        { name: 'Peas', type: 'vegetable', plant: 'March-April', harvest: 'June-July', days: 60, tip: 'Direct sow as soon as soil can be worked', childFriendly: true, emoji: '🫛' },
        { name: 'Spinach', type: 'vegetable', plant: 'March-April', harvest: 'May-June', days: 40, tip: 'Cool season champion - plant early', childFriendly: true, emoji: '🥬' },
        { name: 'Lettuce', type: 'vegetable', plant: 'April', harvest: 'June', days: 45, tip: 'Cut-and-come-again for endless salads', childFriendly: true, emoji: '🥗' },
        { name: 'Radishes', type: 'vegetable', plant: 'April', harvest: 'May', days: 30, tip: 'Fastest harvest - perfect for impatient little ones', childFriendly: true, emoji: '🔴' },
        { name: 'Carrots', type: 'vegetable', plant: 'April-May', harvest: 'July-August', days: 70, tip: 'Sow thinly, keep moist until germinated', childFriendly: true, emoji: '🥕' },
      ],
      5: [
        { name: 'Sugar Snap Peas', type: 'vegetable', plant: 'March-April', harvest: 'June', days: 60, tip: 'Needs trellis - watch them climb!', childFriendly: true, emoji: '🫛' },
        { name: 'Spinach', type: 'vegetable', plant: 'March-April', harvest: 'May-June', days: 40, tip: 'Cool season champion - plant early', childFriendly: true, emoji: '🥬' },
        { name: 'Lettuce', type: 'vegetable', plant: 'April', harvest: 'June', days: 45, tip: 'Start indoors or direct sow', childFriendly: true, emoji: '🥗' },
        { name: 'Radishes', type: 'vegetable', plant: 'April', harvest: 'May', days: 30, tip: 'Fastest harvest - kids love the quick results', childFriendly: true, emoji: '🔴' },
        { name: 'Kale', type: 'vegetable', plant: 'April', harvest: 'June onwards', days: 55, tip: 'Frost-tolerant, gets sweeter after cold', childFriendly: true, emoji: '🥗' },
        { name: 'Swiss Chard', type: 'vegetable', plant: 'April-May', harvest: 'June', days: 50, tip: 'Rainbow stems make it magical for kids', childFriendly: true, emoji: '🌈' },
      ],
      6: [
        { name: 'Tomatoes', type: 'vegetable', plant: 'Start indoors Feb-March', harvest: 'July-September', days: 80, tip: 'Start seeds indoors 6-8 weeks before last frost', childFriendly: true, emoji: '🍅' },
        { name: 'Peppers', type: 'vegetable', plant: 'Start indoors Feb-March', harvest: 'July-September', days: 75, tip: 'Need warm soil - wait until June to transplant', childFriendly: true, emoji: '🌶️' },
        { name: 'Zucchini', type: 'vegetable', plant: 'May-June', harvest: 'July', days: 50, tip: 'Incredibly productive - one plant feeds a family', childFriendly: true, emoji: '🥒' },
        { name: 'Beans', type: 'vegetable', plant: 'May-June', harvest: 'August', days: 60, tip: 'Direct sow after last frost', childFriendly: true, emoji: '🫘' },
        { name: 'Cucumbers', type: 'vegetable', plant: 'May-June', harvest: 'July', days: 55, tip: 'Great for pickling or fresh eating', childFriendly: true, emoji: '🥒' },
      ],
      7: [
        { name: 'Tomatoes', type: 'vegetable', plant: 'Start indoors Feb', harvest: 'June-August', days: 75, tip: 'Warmer climate = earlier harvest', childFriendly: true, emoji: '🍅' },
        { name: 'Squash', type: 'vegetable', plant: 'April-May', harvest: 'June-July', days: 50, tip: 'Plant after soil warms to 70°F', childFriendly: true, emoji: '🎃' },
        { name: 'Beans', type: 'vegetable', plant: 'April-May', harvest: 'July', days: 55, tip: 'Both bush and pole varieties work great', childFriendly: true, emoji: '🫘' },
        { name: 'Melons', type: 'vegetable', plant: 'May', harvest: 'August', days: 85, tip: 'Needs warm soil and long season', childFriendly: true, emoji: '🍈' },
      ],
    },
    activities: [
      { name: 'Turn the compost', description: 'Spring is prime composting time - teach kids how browns and greens make soil', ages: '3+' },
      { name: 'Check for earthworms', description: 'Dig gently in thawing soil - count how many you find!', ages: '2+' },
      { name: 'Plan your garden layout', description: 'Use sticks and string to map out where each crop goes', ages: '4+' },
      { name: 'Start seeds indoors', description: 'Egg cartons work great for starting tomatoes and peppers', ages: '3+' },
    ],
  },
  summer: {
    description: 'Peak growing season! Keep up with watering and harvesting.',
    zones: {
      4: [
        { name: 'Beans', type: 'vegetable', plant: 'June-July', harvest: 'August-September', days: 60, tip: 'Plant every 2 weeks for continuous harvest', childFriendly: true, emoji: '🫘' },
        { name: 'Lettuce', type: 'vegetable', plant: 'Succession plant', harvest: 'Year-round', days: 45, tip: 'Shade cloth in heat helps prevent bolting', childFriendly: true, emoji: '🥬' },
        { name: 'Kale', type: 'vegetable', plant: 'July', harvest: 'Fall-Spring', days: 55, tip: 'Plant now for fall harvest', childFriendly: true, emoji: '🥗' },
        { name: 'Broccoli', type: 'vegetable', plant: 'June', harvest: 'September', days: 80, tip: 'Fall planting avoids pests', childFriendly: true, emoji: '🥦' },
      ],
      5: [
        { name: 'Zucchini', type: 'vegetable', plant: 'June', harvest: 'July-August', days: 50, tip: 'Check daily - they grow fast!', childFriendly: true, emoji: '🥒' },
        { name: 'Beans', type: 'vegetable', plant: 'June-July', harvest: 'August', days: 60, tip: 'Direct sow, they love warm soil', childFriendly: true, emoji: '🫘' },
        { name: 'Cucumbers', type: 'vegetable', plant: 'June', harvest: 'August', days: 55, tip: 'Perfect for pickling or fresh eating', childFriendly: true, emoji: '🥒' },
        { name: 'Herbs (Basil)', type: 'herb', plant: 'June', harvest: 'All summer', days: 30, tip: 'Pinch flowers to keep leaves growing', childFriendly: true, emoji: '🌿' },
      ],
      6: [
        { name: 'Tomatoes', type: 'vegetable', plant: 'Transplant June', harvest: 'July-September', days: 70, tip: 'Stake or cage for support', childFriendly: true, emoji: '🍅' },
        { name: 'Peppers', type: 'vegetable', plant: 'Transplant June', harvest: 'July-October', days: 75, tip: 'Green or wait for color - both delicious', childFriendly: true, emoji: '🌶️' },
        { name: 'Eggplant', type: 'vegetable', plant: 'June', harvest: 'August', days: 70, tip: 'Needs warm nights to thrive', childFriendly: true, emoji: '🍆' },
        { name: 'Squash', type: 'vegetable', plant: 'June', harvest: 'August', days: 55, tip: 'Summer squash is incredibly productive', childFriendly: true, emoji: '🎃' },
      ],
      7: [
        { name: 'Okra', type: 'vegetable', plant: 'May-June', harvest: 'July-September', days: 60, tip: 'Loves heat - made for Southern summers', childFriendly: true, emoji: '🌾' },
        { name: 'Sweet Potatoes', type: 'vegetable', plant: 'May-June', harvest: 'Fall', days: 100, tip: 'Glorious vines, underground treasure', childFriendly: true, emoji: '🍠' },
        { name: 'Southern Peas', type: 'vegetable', plant: 'May-June', heat: 'August-October', days: 75, tip: 'Heat-loving, fixes nitrogen in soil', childFriendly: true, emoji: '🫘' },
      ],
    },
    activities: [
      { name: 'Water together', description: 'Early morning watering ritual - let kids be in charge of the watering can', ages: '2+' },
      { name: 'Harvest search', description: 'Daily treasure hunt for ripe vegetables', ages: '2+' },
      { name: 'Bug patrol', description: 'Squad up to find ladybugs (good!) and tomato hornworms ( relocate gently)', ages: '3+' },
      { name: 'Weeding contest', description: 'Race to fill a bucket - fastest wins first pick at dinner harvest', ages: '4+' },
    ],
  },
  fall: {
    description: 'Transition time. Plant cool-season crops and prepare for winter.',
    zones: {
      4: [
        { name: 'Spinach', type: 'vegetable', plant: 'August-September', harvest: 'October-November', days: 40, tip: 'Overwinters with protection', childFriendly: true, emoji: '🥬' },
        { name: 'Garlic', type: 'vegetable', plant: 'October', harvest: 'July', days: 'Overwinters', tip: 'Plant before ground freezes - next year harvest', childFriendly: true, emoji: '🧄' },
        { name: 'Lettuce', type: 'vegetable', plant: 'August', harvest: 'October', days: 45, tip: 'Cold frame extends season', childFriendly: true, emoji: '🥗' },
        { name: 'Peas', type: 'vegetable', plant: 'August', harvest: 'October', days: 60, tip: 'Fall peas are often sweeter', childFriendly: true, emoji: '🫛' },
      ],
      5: [
        { name: 'Spinach', type: 'vegetable', plant: 'September', harvest: 'October-November', days: 40, tip: 'Light frost improves sweetness', childFriendly: true, emoji: '🥬' },
        { name: 'Kale', type: 'vegetable', plant: 'August-September', harvest: 'Fall-Winter', days: 55, tip: 'Frost makes it sweeter', childFriendly: true, emoji: '🥗' },
        { name: 'Garlic', type: 'vegetable', plant: 'October', harvest: 'July', days: 'Overwinters', tip: 'Push into soil 2 inches deep', childFriendly: true, emoji: '🧄' },
        { name: 'Mache (Corn Salad)', type: 'vegetable', plant: 'September', harvest: 'November', days: 45, tip: 'Virtually indestructible winter green', childFriendly: true, emoji: '🥬' },
      ],
      6: [
        { name: 'Lettuce', type: 'vegetable', plant: 'September', harvest: 'October', days: 45, tip: 'Use row cover for protection', childFriendly: true, emoji: '🥗' },
        { name: 'Arugula', type: 'vegetable', plant: 'September', harvest: 'October-November', days: 35, tip: 'Peppery and fast-growing', childFriendly: true, emoji: '🥬' },
        { name: 'Garlic', type: 'vegetable', plant: 'October-November', harvest: 'July', days: 'Overwinters', tip: 'Classic fall planting = summer harvest', childFriendly: true, emoji: '🧄' },
        { name: 'Cover Crops', type: 'other', plant: 'October', harvest: 'Till in Spring', days: 'N/A', tip: 'Clover or winter rye protect and feed soil', childFriendly: true, emoji: '🌱' },
      ],
      7: [
        { name: 'Lettuce', type: 'vegetable', plant: 'October', harvest: 'Fall-Winter', days: 45, tip: 'Longer growing season here', childFriendly: true, emoji: '🥗' },
        { name: 'Broccoli', type: 'vegetable', plant: 'September-October', harvest: 'Winter-Spring', days: 80, tip: 'Mild winters mean extended harvest', childFriendly: true, emoji: '🥦' },
        { name: 'Garlic', type: 'vegetable', plant: 'November', harvest: 'June-July', days: 'Overwinters', tip: 'Warmer zones plant later', childFriendly: true, emoji: '🧄' },
      ],
    },
    activities: [
      { name: 'Save seeds', description: 'Harvest and dry seeds from favorite plants for next year', ages: '4+' },
      { name: 'Plant garlic together', description: 'Push cloves into soil, mark the spot, wait for magic next summer', ages: '3+' },
      { name: 'Clean up garden beds', description: 'Pull dead plants, add compost, tuck beds in for winter', ages: '3+' },
      { name: 'Collect leaves', description: 'Jump in piles, then use leaves as mulch or for compost', ages: '2+' },
    ],
  },
  winter: {
    description: 'Rest season. Plan next year\'s garden and start seeds indoors.',
    zones: {
      4: [
        { name: 'Microgreens', type: 'vegetable', plant: 'Indoors year-round', harvest: '7-14 days', days: 14, tip: 'Windowsill growing - great for winter kids projects', childFriendly: true, emoji: '🌱' },
        { name: 'Sprouts', type: 'vegetable', plant: 'Indoors year-round', harvest: '3-7 days', days: 5, tip: 'Jar method - just rinse daily', childFriendly: true, emoji: '🌿' },
        { name: 'Indoor Herbs', type: 'herb', plant: 'Indoors year-round', harvest: 'Ongoing', days: 30, tip: 'Rosemary, thyme, mint thrive on windowsills', childFriendly: true, emoji: '🌱' },
      ],
      5: [
        { name: 'Microgreens', type: 'vegetable', plant: 'Indoors year-round', harvest: '7-14 days', days: 14, tip: 'Pea shoots, sunflower, radish - all fast and nutritious', childFriendly: true, emoji: '🌱' },
        { name: 'Seed Planning', type: 'other', plant: 'January-February', harvest: 'Plan now', days: 0, tip: 'Review seed catalogs, plan layout, dream big', childFriendly: true, emoji: '📔' },
        { name: 'Start Onions', type: 'vegetable', plant: 'February indoors', harvest: 'June', days: 90, tip: 'Long-season crop - start early indoors', childFriendly: true, emoji: '🧅' },
      ],
      6: [
        { name: 'Microgreens', type: 'vegetable', plant: 'Indoors year-round', harvest: '7-14 days', days: 14, tip: 'Sunflower, radish, broccoli - all easy and fast', childFriendly: true, emoji: '🌱' },
        { name: 'Seed Catalog Browsing', type: 'other', plant: 'January', harvest: 'Planning', days: 0, tip: 'Let kids pick something new to try', childFriendly: true, emoji: '📔' },
        { name: 'Start Tomatoes Indoors', type: 'vegetable', plant: 'February', harvest: 'June-July', days: 60, tip: 'Count backwards from last frost date', childFriendly: true, emoji: '🍅' },
      ],
      7: [
        { name: 'Microgreens', type: 'vegetable', plant: 'Indoors year-round', harvest: '7-14 days', days: 14, tip: 'Winters are milder - can direct sow some greens under cover', childFriendly: true, emoji: '🌱' },
        { name: 'Early Peas', type: 'vegetable', plant: 'February under cover', harvest: 'May', days: 60, tip: 'Cloched ground can be planted earlier', childFriendly: true, emoji: '🫛' },
        { name: 'Transplant Prep', type: 'other', plant: 'February-March', harvest: 'Later', days: 0, tip: 'Harden off seedlings gradually', childFriendly: true, emoji: '🌿' },
      ],
    },
    activities: [
      { name: 'Grow microgreens', description: 'Fastest harvest in town - seeds to salad in 7 days flat', ages: '3+' },
      { name: 'Plan on paper', description: 'Map out spring garden with crayons or markers', ages: '4+' },
      { name: 'Check stored vegetables', description: 'Cellar or cool storage check - any soft ones for soup?', ages: '3+' },
      { name: 'Read seed catalogs', description: 'Let kids circle what they want to grow', ages: '3+' },
    ],
  },
};

export function getCurrentSeason() {
  return currentSeason;
}

export function getSeasonalPlants(zone) {
  const seasonData = plantingCalendar[currentSeason];
  const zonePlants = seasonData.zones[zone] || seasonData.zones[5];
  return {
    description: seasonData.description,
    plants: zonePlants,
    activities: seasonData.activities,
    season: currentSeason,
  };
}
