/**
 * Craft Trail Extensions
 * Adds trail-specific metadata to crafts from crafts.js
 */

import { crafts } from '../basecamp/crafts';
import { trailMoments, effortLevels } from '../habitat/craftTrails';

// Extend each craft with trail-specific data
export const trailCrafts = crafts.map(craft => {
  // Default values for indoor crafts
  let trailData = {
    trailMoment: 'camp',
    effortLevel: 'medium',
    forages: [],
    weatherFlexible: false,
    makeNowIndoor: false,
  };
  
  // Outdoor/quick crafts
  if (!craft.indoor) {
    // Quick crafts that work almost anywhere
    if (['nature-bracelet', 'leaf-whistle', 'grass-blade-flute', 'rock-tower'].includes(craft.id)) {
      trailData = {
        trailMoment: 'walking',
        effortLevel: 'quick',
        forages: getForagesForCraft(craft.id),
        weatherFlexible: true,
        makeNowIndoor: false,
      };
    }
    // Medium effort outdoor crafts
    else if (['bark-rubbing', 'dandelion-crown', 'mud-paint', 'stick-bundles', 'grass-weaving', 'leaf-bow', 'mud-faces'].includes(craft.id)) {
      trailData = {
        trailMoment: 'rest-stop',
        effortLevel: 'medium',
        forages: getForagesForCraft(craft.id),
        weatherFlexible: craft.id !== 'mud-paint' && craft.id !== 'mud-faces',
        makeNowIndoor: false,
      };
    }
    // Extended outdoor crafts
    else if (['stone-fairy-house', 'nest-building', 'feather-mobile', 'twig-letters', 'twig-frame', 'charcoal-drawing'].includes(craft.id)) {
      trailData = {
        trailMoment: 'camp',
        effortLevel: 'extended',
        forages: getForagesForCraft(craft.id),
        weatherFlexible: false,
        makeNowIndoor: false,
      };
    }
  }
  
  // Indoor crafts that can be made from trail finds
  else {
    trailData = {
      trailMoment: 'camp',
      effortLevel: 'medium',
      forages: getForagesForCraft(craft.id),
      weatherFlexible: false,
      makeNowIndoor: true,
    };
  }
  
  return {
    ...craft,
    ...trailData,
    trailMomentLabel: trailMoments[trailData.trailMoment],
    effortLabel: effortLevels[trailData.effortLevel].label,
  };
});

function getForagesForCraft(craftId) {
  const forageMap = {
    'pine-cone-owl': ['pinecones'],
    'acorn-cap-necklace': ['acorns'],
    'feather-mobile': ['feathers'],
    'nest-building': ['feathers', 'sticks'],
    'rock-tower': ['smooth_rocks'],
    'stone-fairy-house': ['flat_rocks', 'moss'],
    'bark-rubbing': ['bark'],
    'leaf-bow': ['leaves_maple'],
    'mud-paint': ['leaves_large'],
    'leaf-whistle': ['leaves_large'],
    'dandelion-crown': ['dandelions'],
    'flower-lei': ['wildflowers'],
    'stick-bundles': ['sticks'],
    'twig-letters': ['sticks'],
    'twig-frame': ['sticks'],
    'grass-blade-flute': ['grass_long'],
    'grass-weaving': ['grass_long'],
    'seed-pod-birds': ['seed_pods'],
    'charcoal-drawing': ['charcoal'],
    'moss-terrarium': ['moss'],
  };
  
  return forageMap[craftId] || [];
}

// Get craft by ID
export function getCraftById(id) {
  return trailCrafts.find(c => c.id === id);
}

// Get crafts by IDs
export function getCraftsByIds(ids) {
  return ids.map(id => getCraftById(id)).filter(Boolean);
}

// Get outdoor crafts only
export function getOutdoorCrafts() {
  return trailCrafts.filter(c => !c.indoor);
}

// Get quick crafts for hot weather
export function getQuickCrafts() {
  return trailCrafts.filter(c => c.effortLevel === 'quick' && !c.indoor);
}

// Get crafts that can be made from foraged items
export function getForageCrafts(forageIds) {
  return trailCrafts.filter(c => 
    c.forages.some(f => forageIds.includes(f)) && c.makeNowIndoor
  );
}
