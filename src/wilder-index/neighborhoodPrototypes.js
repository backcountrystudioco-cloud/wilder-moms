// Neighborhood Prototypes — the canonical taxonomy Wilder Moms uses to
// personalize the full reading by where a family actually lives. Prototypes
// describe the texture of daily outdoor life: physical form, social form,
// and natural form. Non-judgmental by design: no prototype is "better".

export const NEIGHBORHOOD_PROTOTYPES = [
  {
    id: 'urban_dense',
    name: 'Urban Dense',
    blurb: 'Apartments up, sidewalks tight, the city doing the parenting.',
    features: [
      'high pedestrian activity on every block',
      'small or shared outdoor space',
      'transit, storefronts, and people within a short walk',
      'limited private storage and no quiet of your own',
    ],
    obstacles: [
      'no private outdoor space at home',
      'traffic and crossing stress',
      'overstimulation on busy blocks',
      'building rules on what you can keep or store',
    ],
    habitatShifts: [
      'a window-sill or balcony nature shelf you can actually see',
      'a portable loose-parts kit that lives by the door',
      'a child-height observation corner in one room',
    ],
    neighborhoodUses: [
      'one regular third place to return to',
      'a walking route that hits a library, plaza, or park',
      'one short independent route your child can describe',
    ],
    climateBand: 'general',
    climateNotes:
      'Heat islands can make summer sidewalks punishing. Shade, hydration, and indoor cool-down points matter on hot days.',
    recommendationSeeds: [
      { kind: 'third_place', title: 'A regular third place', action: 'Pick a café, library, or playground you return to once a week. Familiarity turns strangers into neighbors.' },
      { kind: 'route', title: 'A short walking route', action: 'One 15-minute loop you can do before or after dinner, hitting at least one of: a tree, a window, a bench.' },
      { kind: 'habitat', title: 'A window or balcony nature shelf', action: 'A small visible green thing on a windowsill, fire-escape shelf, or shared stoop your child can water and check.' },
    ],
  },

  {
    id: 'urban_family',
    name: 'Urban Family',
    blurb: 'Walkable residential blocks, smaller homes with stoops, neighbors who know each other by name.',
    features: [
      'low-rise homes with stoops and front steps',
      'pedestrian-priority side streets',
      'a local school, playground, or library in walking range',
      'faces you begin to recognize on repeat walks',
    ],
    obstacles: [
      'no private yard at home',
      'stoop storage competes with street use',
      'parking and curb space can be tight',
      'weekends can feel over-programmed at the popular spots',
    ],
    habitatShifts: [
      'a stoop or front-step nature shelf',
      'a go-bag of loose parts that lives on a hook by the door',
      'a child-height observation window facing the street',
    ],
    neighborhoodUses: [
      'one block you treat as "yours" for a season',
      'a short school-run loop that becomes a ritual',
      'a regular playground or splash-pad visit',
    ],
    climateBand: 'temperate_wet',
    climateNotes:
      'Stoop culture depends on weather. A covered stoop or awning turns three seasons of outside time into four.',
    recommendationSeeds: [
      { kind: 'third_place', title: 'Your block as a base', action: 'Pick a six-block radius and learn it well. The same faces, the same stoop, the same shortcut home.' },
      { kind: 'route', title: 'A school-run ritual', action: 'The walk to school or daycare becomes a daily route. Add one noticing stop on the way there, one on the way back.' },
      { kind: 'habitat', title: 'A stoop or front-step shelf', action: 'A small visible plant or thing on the stoop that your child can water, check, and talk to neighbors about.' },
    ],
  },

  {
    id: 'suburban_yard',
    name: 'Suburban with a Yard',
    blurb: 'Detached home, private yard, driveways, and destinations that mostly require a car.',
    features: [
      'private yard as the daily outdoor stage',
      'driveways and cul-de-sacs with low traffic',
      'destinations often 10+ minutes by car',
      'space to store bikes, scooters, and big loose parts',
    ],
    obstacles: [
      'the yard can become the whole world',
      'walking to anything is hard',
      'fewer spontaneous encounters with neighbors',
      'screens fill the gap the street used to fill',
    ],
    habitatShifts: [
      'a kid-height garden patch or planter they own',
      'a weather shelf outside the back door with the day on it',
      'a loose-parts bin that can travel out front',
      'a front-yard sit spot that faces the street',
    ],
    neighborhoodUses: [
      'a regular park or trail visit as a habit',
      'one neighbor family you walk or bike with',
      'a library, market, or playground as a weekly anchor',
    ],
    climateBand: 'general',
    climateNotes:
      'Yards shift with seasons. A winter-ready sit spot and a summer shade plan keep the yard usable year-round.',
    recommendationSeeds: [
      { kind: 'habitat', title: 'A kid-height garden patch', action: 'One small corner of the yard your child owns. They plant, water, fail, and try again. The ownership is the point.' },
      { kind: 'route', title: 'A weekly anchor trip', action: 'One regular destination — a park, trail, library, or market — that becomes a habit your child can anticipate.' },
      { kind: 'third_place', title: 'One neighbor rhythm', action: 'One neighbor family you do a recurring thing with. A weekly walk, a weekend yard play, a standing invite.' },
    ],
  },

  {
    id: 'suburban_no_yard',
    name: 'Suburban without a Yard',
    blurb: 'Apartment, townhouse, or condo in a suburban context. Shared outdoor, fewer walkable destinations.',
    features: [
      'shared green space or courtyard',
      'parking-lot walking between home and destinations',
      'nearby strip malls and big-box destinations',
      'more apartment neighbors than block neighbors',
    ],
    obstacles: [
      'shared outdoor space has rules and hours',
      'walkable destinations are often far apart',
      'parking lots dominate the in-between',
      'the home can feel like the whole world on stuck-together days',
    ],
    habitatShifts: [
      'a balcony or patio shelf that gets daily use',
      'a portable outdoor kit for shared green space',
      'a window garden you can see from the kitchen',
    ],
    neighborhoodUses: [
      'one regular park visit, not "someday"',
      'a coffee or library stop that pairs with errands',
      'a paved loop you can do before or after dinner',
    ],
    climateBand: 'general',
    climateNotes:
      'Shared outdoor space is weather-dependent. A covered balcony or sheltered courtyard extends your usable seasons.',
    recommendationSeeds: [
      { kind: 'habitat', title: 'A balcony or patio shelf', action: 'A small visible shelf outside the door with one plant, one found object, one thing to check. Make it daily.' },
      { kind: 'route', title: 'A paved loop', action: 'A 15–25 minute walking or scooter loop you can do from home. Same direction, different days, lets it become a ritual.' },
      { kind: 'third_place', title: 'A regular park anchor', action: 'One park you visit weekly. Same bench, same snack, same routine. Familiarity is the gift.' },
    ],
  },

  {
    id: 'small_town',
    name: 'Small Town',
    blurb: 'A compact core, a main street, a library, and a handful of shops most people can name.',
    features: [
      'walkable downtown within minutes of home',
      'the library is often the anchor',
      'recognizable faces on a short walk',
      'a slower pace at sidewalk level',
    ],
    obstacles: [
      'fewer kid-specific destinations',
      'weather can shut the town down seasonally',
      'the same loop can feel stale',
      'one closed shop can change the whole rhythm',
    ],
    habitatShifts: [
      'a front porch or yard sit spot facing the street',
      'a window shelf that catches the morning',
      'a go-bag for the library or main street',
    ],
    neighborhoodUses: [
      'the library as a weekly anchor',
      'a main-street walk with one stop',
      'a local park or bandstand as a sit spot',
      'a recurring event — market, parade, Friday night',
    ],
    climateBand: 'temperate_wet',
    climateNotes:
      'Small towns often have strong seasons. A summer shade plan and a winter indoor anchor keep the year outside the door.',
    recommendationSeeds: [
      { kind: 'third_place', title: 'The library as anchor', action: 'A weekly library visit becomes the spine of the week. Browse, return, sit, look out the window.' },
      { kind: 'route', title: 'A main-street loop', action: 'A short loop that hits the library, one shop, and one bench. Slow, repeatable, learnable for your child.' },
      { kind: 'habitat', title: 'A porch or yard sit spot', action: 'One outdoor seat at home that faces something — the street, the garden, the sky. Use it on most days.' },
    ],
  },

  {
    id: 'rural',
    name: 'Rural',
    blurb: 'Low density, large lots, fields, farms, woods, and a car ride between most things.',
    features: [
      'wide outdoor space at home',
      'fields, woods, or water within reach',
      'stars and weather visible at night',
      'freedom to make noise and make messes',
    ],
    obstacles: [
      'car dependence for nearly everything',
      'few peer kids in walking distance',
      'limited third places and structured programs',
      'isolation on stuck-together weeks',
    ],
    habitatShifts: [
      'a kid-height garden or animal-care job',
      'a sit spot in the yard, woods, or field edge',
      'a weather-watching shelf by the window',
      'a fire pit, picnic table, or porch as your anchor seat',
    ],
    neighborhoodUses: [
      'one regular neighbor or relative within driving',
      'a library, town park, or swimming hole as a weekly trip',
      'a walking loop on your own land',
    ],
    climateBand: 'general',
    climateNotes:
      'Rural weather swings hard. A mud-room and a covered outdoor space extend the seasons you can actually be outside.',
    recommendationSeeds: [
      { kind: 'habitat', title: 'A kid-height job', action: 'One animal, plant, or place your child is responsible for. The responsibility is the magic.' },
      { kind: 'route', title: 'A woods or field loop', action: 'A walking loop on your own land — a fence line, a tree row, a creek edge. Repeatable, learnable, owned.' },
      { kind: 'third_place', title: 'A weekly anchor trip', action: 'One trip a week that breaks the isolation — a library, a neighbor, a town park, a swim spot.' },
    ],
  },

  {
    id: 'coastal',
    name: 'Coastal',
    blurb: 'Beach, water, tides, wind, salt, and weather that decides what the day looks like.',
    features: [
      'water within walking or short driving range',
      'tide pools, sand, and open sky',
      'weather that shifts by the hour',
      'sand and grit as a permanent feature',
    ],
    obstacles: [
      'wind and salt wear on plans and gear',
      'beach crowds at peak times',
      'sun exposure and reflection off water',
      'limited shade and shelter in open beach zones',
    ],
    habitatShifts: [
      'a tide-watching shelf by the window',
      'a covered outdoor seat for windy days',
      'a sand-and-shell collection shelf at home',
    ],
    neighborhoodUses: [
      'one regular beach or shoreline visit',
      'a tide-table ritual you check together',
      'a harbor, pier, or boardwalk loop',
    ],
    climateBand: 'marine',
    climateNotes:
      'Layering matters. Wind cuts through summer clothes and sun reflects hard off water and sand.',
    recommendationSeeds: [
      { kind: 'route', title: 'A tide-table ritual', action: 'A weekly check of the tide chart together, then a shoreline visit timed to low tide. The ritual is the gift.' },
      { kind: 'habitat', title: 'A tide or weather shelf', action: 'A small shelf with a found shell, a smooth rock, a wind indicator. Your child notices what the day is doing.' },
      { kind: 'third_place', title: 'A shoreline anchor', action: 'One stretch of coast you return to. The same rock, the same bench, the same wind direction becomes home.' },
    ],
  },

  {
    id: 'mountain',
    name: 'Mountain',
    blurb: 'Elevation, slopes, shifting weather, and trail access that turns the day into a vertical choice.',
    features: [
      'trails, slopes, or forest within short reach',
      'elevation changes the weather by the hour',
      'open vistas and big skies',
      'wildlife signs in ordinary places',
    ],
    obstacles: [
      'altitude and weather can shut plans down fast',
      'driving to most trailheads is required',
      'short growing season at higher elevations',
      'winter snow shapes the calendar',
    ],
    habitatShifts: [
      'a gear shelf by the door for the day\'s weather',
      'a sit spot facing the view',
      'a weather-watching window seat',
    ],
    neighborhoodUses: [
      'one regular trail as a weekly anchor',
      'a town park or lower-elevation walk for short days',
      'a creek, lake, or meadow within driving',
    ],
    climateBand: 'mountain',
    climateNotes:
      'Mountain weather can swing 30 degrees in a day. A layering system and a turn-around plan matter more than the trail.',
    recommendationSeeds: [
      { kind: 'route', title: 'A weekly trail anchor', action: 'One trail you do weekly. Same start, same snack, same turnaround. Familiarity builds endurance.' },
      { kind: 'habitat', title: 'A weather-watching shelf', action: 'A shelf with a thermometer, a wind indicator, a notebook. The weather becomes a daily subject, not background.' },
      { kind: 'third_place', title: 'A lower-elevation loop', action: 'A short walk for storm days, sick days, or just-barely days. Same loop, lower stakes, still outside.' },
    ],
  },

  {
    id: 'dry',
    name: 'Dry',
    blurb: 'Desert or arid climate. Sun, heat, sparse vegetation, and big skies that change what outside looks like.',
    features: [
      'sun for most of the year',
      'open sky and long sightlines',
      'vegetation that\'s low, hardy, and worth noticing',
      'cool mornings, hot middays, cool evenings',
    ],
    obstacles: [
      'heat makes midday outside risky',
      'limited shade at home and on routes',
      'monsoon or dry-wind seasons can shut things down',
      'long drives between home and most destinations',
    ],
    habitatShifts: [
      'a shaded porch, ramada, or shade-sail sit spot',
      'a window shelf with a found feather or rock',
      'an early-morning or evening outdoor ritual',
      'a water-station by the door for hot days',
    ],
    neighborhoodUses: [
      'a shaded park or trail used at the cool hours',
      'a library, museum, or pool as a midday anchor',
      'a short evening loop when the light softens',
    ],
    climateBand: 'hot_dry',
    climateNotes:
      'Time of day matters more than distance. An early-morning or dusk plan turns the same neighborhood into a different place.',
    recommendationSeeds: [
      { kind: 'rhythm', title: 'A cool-hours ritual', action: 'One outdoor block in the morning or evening, most days. The timing turns outside into a habit, not a hardship.' },
      { kind: 'third_place', title: 'A shaded anchor', action: 'A library, pool, museum, or shaded park that lets you be outside (or near outside) through the hot middle of the day.' },
      { kind: 'habitat', title: 'A shade-sail or porch sit spot', action: 'A covered outdoor seat at home with one small thing to watch — a bird feeder, a plant, the sky.' },
    ],
  },

  {
    id: 'college_town',
    name: 'College Town',
    blurb: 'A walkable core built around an academic population. Family life and student life side by side.',
    features: [
      'walkable downtown with cafés, bookstores, and a library',
      'campus green spaces, quads, and plazas',
      'cultural events, lectures, and markets most weeks',
      'bikeable distances between most places you go',
    ],
    obstacles: [
      'campus rhythms crowd the popular spots',
      'housing can be small or shared',
      'semester cycles shift the energy of the town',
      'kid-friendly infrastructure is sometimes an afterthought',
    ],
    habitatShifts: [
      'a stoop, balcony, or front-step shelf',
      'a window seat facing foot traffic',
      'a go-bag for campus and downtown walks',
    ],
    neighborhoodUses: [
      'the library as a weekly anchor',
      'a campus green or quad as a sit spot',
      'a farmer\'s market, talk, or museum visit as a ritual',
    ],
    climateBand: 'humid_subtropical',
    climateNotes:
      'Campus greens and plazas offer shade. A summer plan and a winter indoor anchor extend the usable walking year.',
    recommendationSeeds: [
      { kind: 'third_place', title: 'The library + a café', action: 'A weekly library visit paired with a stop at a café or bookstore. The pairing becomes the rhythm.' },
      { kind: 'route', title: 'A campus green loop', action: 'A short loop through a campus green, quad, or plaza. Same trees, same benches, same fountain.' },
      { kind: 'rhythm', title: 'A weekly event visit', action: 'A farmer\'s market, lecture, museum night, or campus event your child begins to look forward to.' },
    ],
  },
]

export function findPrototypeById(id) {
  if (!id) return null
  return NEIGHBORHOOD_PROTOTYPES.find((p) => p.id === id) || null
}

export function inferPrototypeFromContext(contextAnswers = {}) {
  if (!contextAnswers || typeof contextAnswers !== 'object') return 'suburban_no_yard'
  // If a richer prototype was already selected, honor it.
  const explicit = contextAnswers['context.prototype']
  if (explicit && NEIGHBORHOOD_PROTOTYPES.some((p) => p.id === explicit)) return explicit

  const area = contextAnswers['context.area']
  const home = contextAnswers['context.homeType']
  const out = contextAnswers['context.outdoorSpace']

  if (area === 'small_town') return 'small_town'
  if (area === 'rural') return 'rural'

  if (area === 'urban') {
    if (home === 'house_yard' || home === 'house_no_yard') return 'urban_family'
    return 'urban_dense' // apartment, townhouse, or unspecified
  }

  if (area === 'suburban') {
    if (home === 'house_yard' && out === 'private') return 'suburban_yard'
    return 'suburban_no_yard'
  }

  // No area, or unrecognized — fall back to outdoor-space reasoning.
  if (home === 'house_yard' && out === 'private') return 'suburban_yard'
  return 'suburban_no_yard'
}

export function climateBandForPrototype(prototypeId) {
  const p = findPrototypeById(prototypeId)
  return p ? p.climateBand : 'general'
}
