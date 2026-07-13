// Premium gated builds available to Wilder Builds subscribers.
// Mirrors the data shape used in builds.js so detail pages stay consistent.
// Copy here is draft — replace once the actual PDFs are designed.
//
// Model: monthly "drops" of 2 themed PDFs. Library is cumulative —
// subscribers keep every drop they've ever been paid for.

export const pricing = {
  monthly: { amount: 9,  formatted: '$9',  cadence: '/month', lemonVariantEnv: 'LEMON_VARIANT_ID_MONTHLY', recommended: false },
  annual:  { amount: 79, formatted: '$79', cadence: '/year',  lemonVariantEnv: 'LEMON_VARIANT_ID_ANNUAL',  recommended: true },
}
export const annualSavings = (pricing.monthly.amount * 12) - pricing.annual.amount // $108 - $79 = $29 / yr

// Content type taxonomy. Both types live behind one Wilder Builds paywall;
// subscribers see them together in their library, sorted/filtered by type.
export const TYPES = {
  architect: {
    id: 'architect',
    label: 'Architect Blueprint',
    short: 'Architect',
    description: 'Full architectural plans for outdoor builds — gardens, structures, lasting installations.',
    accent: 'from-[#5A3C00] via-[#8C4A14] to-[#D2961E]',
    chipClass: 'bg-ember/10 text-ember border-ember/30',
  },
  lab: {
    id: 'lab',
    label: 'Lab Activity',
    short: 'Lab',
    description: 'Hands-on experiments kids do themselves — growing, crafting, observing, cooking.',
    accent: 'from-[#2D5A3D] via-[#5A6428] to-[#96963C]',
    chipClass: 'bg-olive/15 text-olive border-olive/30',
  },
}

export function getType(id) {
  return TYPES[id] || null
}

// Each drop is two themed builds released on the 1st of the month.
// Drops accumulate — the library grows over time.
export const drops = [
  {
    id: 'launch-drop',
    month: 'Launch',
    year: 2026,
    releaseDate: '2026-07-01',
    title: 'The Launch Drop',
    subtitle: 'Two PDFs to kick off the Wilder Builds library — one architect blueprint, one lab activity.',
    theme: 'Garden + Science',
    composition: 'architect+lab',
    builds: ['fairy-apothecary', 'mycelium-donuts'],
    cover: 'from-[#5A3C00] via-[#8C4A14] to-[#D2961E]',
  },
]

// Flatten every drop's builds into a single list, newest first.
// Memoized: only built on first access (avoids TDZ with buildCatalog below).
let _premiumBuildsCache = null
export function getPremiumBuilds() {
  if (_premiumBuildsCache) return _premiumBuildsCache
  const flat = []
  for (const drop of drops) {
    for (const buildId of drop.builds) {
      const b = buildCatalog[buildId]
      if (b) flat.push({ ...b, dropId: drop.id, dropMonth: drop.month, dropYear: drop.year, releaseDate: drop.releaseDate })
    }
  }
  flat.sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1))
  _premiumBuildsCache = flat
  return flat
}

// Backwards-compat: `premiumBuilds` is also exported as a function so existing
// `.filter(...)` / `.map(...)` call sites continue to work. We can't export it
// as an array without triggering the TDZ issue with `buildCatalog` below.
// To freeze the array for a stable consumer (e.g. memoization), wrap calls in
// `useMemo(() => getPremiumBuilds(), [])`.
export const premiumBuilds = new Proxy([], {
  get(_target, prop) {
    const arr = getPremiumBuilds()
    const value = arr[prop]
    return typeof value === 'function' ? value.bind(arr) : value
  },
  has(_target, prop) {
    return prop in getPremiumBuilds()
  },
  ownKeys() {
    return Reflect.ownKeys(getPremiumBuilds())
  },
  getOwnPropertyDescriptor(_target, prop) {
    return Reflect.getOwnPropertyDescriptor(getPremiumBuilds(), prop)
  },
  getPrototypeOf() {
    return Array.prototype
  },
})

export function getCurrentDrop() {
  // The newest drop, by releaseDate
  return [...drops].sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1))[0] || null
}

export function getPastDrops() {
  const today = new Date().toISOString().slice(0, 10)
  return drops.filter(d => d.releaseDate <= today).sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1))
}

export function getFutureDrops() {
  const today = new Date().toISOString().slice(0, 10)
  return drops.filter(d => d.releaseDate > today).sort((a, b) => (a.releaseDate < b.releaseDate ? -1 : 1))
}

export function getDropById(id) {
  return drops.find(d => d.id === id) || null
}

export function getPremiumBuildBySlug(slug) {
  return premiumBuilds.find(b => b.slug === slug || b.id === slug)
}

export function getAllPremiumBuilds() {
  return premiumBuilds
}

// ---------------------------------------------------------------------
// Build catalog — one source of truth, referenced by drop.builds.
// Add new entries here as you design new monthly PDFs.
// ---------------------------------------------------------------------
const buildCatalog = {
  'fairy-apothecary': {
    id: 'fairy-apothecary',
    slug: 'fairy-apothecary',
    title: 'The Fairy Apothecary',
    subtitle: 'Build a backyard mud kitchen your kids will disappear into',
    tagline: 'A mud kitchen, a potion lab, and a 4-year-old\'s happy place — all in one weekend build.',
    type: 'architect',
    typeLabel: 'Architect Blueprint',
    category: 'Mud Kitchen Architect',
    ageRange: '3–10',
    timeEstimate: 'A weekend build, then years of play',
    difficulty: 'medium',
    cost: '$40–$110',
    accent: 'from-[#5A3C00] via-[#8C4A14] to-[#D2961E]',
    heroEmoji: 'Phial',
    coverGradient: 'from-[#F2A57B] via-[#D2961E] to-[#8C4A14]',
    pages: 38,
    coverImage: '/builds/fairy-apothecary.png',
    season: 'Build once, play year-round',
    magicFact:
      'A mud kitchen is the single highest-engagement outdoor toy in early childhood research — kids spend 45+ minute sessions foraging, mixing, and "serving" without any adult prompting. This build doubles as one.',
    description:
      'A real mud kitchen for your backyard: a wooden stand with a removable cauldron tub, jars and scoops at kid height, and a circular herb garden bed right next to it so the "ingredients" are always in reach. Kids forage leaves and petals, mix mud-and-water "potions," and serve imaginary meals to anyone who\'ll sit still. Designed for zero cleanup drama and years of independent play — built once, played with forever.',
    whatsInside: [
      '38-page illustrated PDF (printable + tablet)',
      'Cut list + full materials list with budget and splurge options',
      'Step-by-step build with photos for every stage',
      'Cauldron tub and stand plans (weatherproof, removable for cleaning)',
      '12 printable potion recipe cards + sensory-play prompts',
      'Kid-safe foraging guide (8 friendly herbs, what to avoid)',
      'Optional herb garden bed layout for "live ingredients"',
      'Care + weatherproofing guide so it lasts years outdoors',
    ],
    tableOfContents: [
      { chapter: '01', title: 'Why a mud kitchen works', pages: 4 },
      { chapter: '02', title: 'Choosing your spot', pages: 3 },
      { chapter: '03', title: 'The mud-kitchen stand', pages: 5 },
      { chapter: '04', title: 'The cauldron tub + drain system', pages: 4 },
      { chapter: '05', title: 'Jars, scoops, and storage', pages: 4 },
      { chapter: '06', title: 'The "ingredient" herb bed (optional)', pages: 5 },
      { chapter: '07', title: 'Potion recipe cards (printable)', pages: 6 },
      { chapter: '08', title: 'Care, weatherproofing, year-round play', pages: 7 },
    ],
    materials: [
      { name: 'Cedar or pine boards (weatherproof for outdoors)', quantity: '~28 linear ft' },
      { name: '1 large tub (galvanized or plastic — the "cauldron")', quantity: '1' },
      { name: 'Drill bits + weatherproof wood screws', quantity: '1 box' },
      { name: '8–10 small glass jars or tin cans (potion storage)', quantity: '8–10' },
      { name: 'Wooden scoops, ladles, or whisks', quantity: '3–4' },
      { name: 'Optional: 6–8 herbs for the live "ingredient" bed', quantity: '1 starter set' },
      { name: 'Exterior wood stain or sealant', quantity: '1 can' },
    ],
    tools: ['Drill', 'Saw', 'Shovel', 'Tape measure', 'Level', 'Sandpaper'],
    previewPages: [
      'Page 03 — The mud kitchen layout diagram',
      'Page 12 — Cauldron tub + drain assembly',
      'Page 19 — The "live ingredient" herb bed plan',
      'Page 28 — Sample recipe card: Dragon Breath Tonic',
    ],
  },
  'mycelium-donuts': {
    id: 'mycelium-donuts',
    slug: 'mycelium-donuts',
    title: 'Mycelium Donuts',
    subtitle: 'Grow a kid-sized mushroom farm in the shape of donuts',
    tagline: 'The build your kids check on every morning for two weeks straight.',
    type: 'lab',
    typeLabel: 'Lab Activity',
    category: 'Science Lab',
    ageRange: '5–12',
    timeEstimate: '45 min build, 10–14 day grow',
    difficulty: 'easy',
    cost: '$30–$50',
    accent: 'from-[#2D5A3D] via-[#5A6428] to-[#96963C]',
    heroEmoji: 'Mycelium',
    coverGradient: 'from-[#F0D2B4] via-[#96963C] to-[#5A6428]',
    pages: 32,
    coverImage: '/builds/mycelium-donuts.jpeg',
    season: 'Year-round (indoor)',
    magicFact:
      'Mycelium is the largest living organism on Earth — one forest in Oregon spans 2,385 acres. Your donut farm is a tiny, edible window into that.',
    description:
      'A whimsical, low-tech grow kit shaped like donuts: inoculated substrate rings that fruit oyster mushrooms in 10-14 days. Kids build the forms, inoculate the spawn, watch the mycelium web colonize the donuts, and harvest their own mushrooms for dinner. Designed for zero mess, zero smell, and 100% "can I check it again?" energy.',
    whatsInside: [
      '32-page illustrated PDF (printable + tablet)',
      'Where to buy spawn (or grow your own from a store-bought oyster)',
      'Donut mold templates (3 sizes, printable)',
      'Step-by-step inoculation walkthrough with photos',
      'Troubleshooting guide (the 6 things that go wrong + fixes)',
      'Kid-safe science explainer: what mycelium actually is',
      '3 harvest recipes a 7-year-old can make',
      'How to start round two from your first harvest (free spawn forever)',
    ],
    tableOfContents: [
      { chapter: '01', title: 'What is mycelium, really?', pages: 4 },
      { chapter: '02', title: 'Sourcing your spawn', pages: 3 },
      { chapter: '03', title: 'Building the donut molds', pages: 5 },
      { chapter: '04', title: 'Substrate prep + inoculation', pages: 6 },
      { chapter: '05', title: 'The 14-day grow journal', pages: 5 },
      { chapter: '06', title: 'Harvest + 3 kid recipes', pages: 4 },
      { chapter: '07', title: 'Troubleshooting + second flush', pages: 3 },
      { chapter: '08', title: 'Extending the build: fairy ring, log inoculation', pages: 2 },
    ],
    materials: [
      { name: 'Oyster mushroom spawn (sawdust spawn, 5 lb bag)', quantity: '1' },
      { name: 'Straw or hardwood pellets (pasteurized substrate)', quantity: '~2 cu ft' },
      { name: 'Food-grade plastic donut molds (3 sizes)', quantity: '1 set' },
      { name: 'Large clear plastic bags for grow chambers', quantity: '3' },
      { name: 'Spray bottle for misting', quantity: '1' },
      { name: 'Cotton or breathable tape', quantity: '1 roll' },
    ],
    tools: ['Scissors', 'Large pot for pasteurizing', 'Tongs', 'Thermometer'],
    previewPages: [
      'Page 04 — What mycelium looks like up close',
      'Page 09 — Donut mold assembly',
      'Page 14 — Day 1 vs Day 7 vs Day 14 photo journal',
      'Page 22 — Three recipes your kid can cook',
    ],
  },
}

export const subscriptionBenefits = [
  'Two new themed PDFs every month — drops on the 1st',
  'Beautiful, printable PDFs designed for tablet or the kitchen counter',
  'Your library grows — keep every drop, re-download anytime',
  'Cancel anytime — even after you cancel, you keep what you downloaded',
  'Members-only space to ask build questions and share photos',
]

// Backward-compat helper for code that still imports `premiumPrice`
export const premiumPrice = pricing.annual

