// 30 Wilder Index onboarding questions, 5 per dimension.
// Behavior-based, observable indicators. Phrased to avoid jargon and avoid
// framing structural conditions as parental failure. Frequency answers map
// to 0-4 for scoring (Never=0, Sometimes=1, Often=2, Most weeks=3, Almost always=4).
// Where a question needs different option sets, a per-question `options` is
// provided and the index in the options array is the score.
//
// Research grounding (briefs in research/ and concepts/):
//   - Belonging   → Sampson 1997 (Science); Coleman 1988 social capital;
//                   Putnam 2000; Jacobs 1961 "eyes on the street".
//   - Independence→ Hillman/Adams/Whitelegg 1990 "One False Move";
//                   Karsten 2005; Shaw et al. 2013 cross-national;
//                   SRTS evidence base.
//   - Wonder      → Kaplan & Kaplan 1989 preference matrix;
//                   Berman/Jonides/Kaplan 2008; Kellert/Heerwagen biophilia;
//                   Tishman "Slow Looking" (least child-specific evidence).
//   - Restoration → Kaplan 1995 ART; Ulrich 1984 surgery-window;
//                   Barton & Pretty 2010 (5-min acute dose);
//                   White et al. 2019 (120-min/week sustained dose).
//   - Nearby Nature→ White et al. 2019 Sci Rep; Mitchell & Popham 2008 Lancet
//                   (equity); Louv 2005; Wolf "nearby nature".
//   - Adventure   → Sandseter 2007 (6 risky-play categories);
//                   Brussoni 2015 IJERPH; Canadian Paediatric Society 2024;
//                   Nicholson 1971 "Theory of Loose Parts";
//                   Lady Allen of Hurtwood.

const FREQUENCY = [
  { label: 'Never', value: 0 },
  { label: 'Sometimes', value: 1 },
  { label: 'Often', value: 2 },
  { label: 'Most weeks', value: 3 },
  { label: 'Almost always', value: 4 },
]

const COUNT = [
  { label: 'None', value: 0 },
  { label: 'One', value: 1 },
  { label: 'Two or three', value: 3 },
  { label: 'Several', value: 4 },
]

const COMFORT = [
  { label: 'Not comfortably', value: 0 },
  { label: 'Only with close adult help', value: 1 },
  { label: 'With an adult nearby', value: 3 },
  { label: 'Independently, as their skills grow', value: 4 },
]

export const QUESTIONS = [
  // ────────────── BELONGING ──────────────
  // Sampson 1997 + Coleman 1988: belonging is measured by repeat
  // recognition + intergenerational closure (do nearby adults know your
  // kid's name?). q5 is the behavioral consequence test — if no one
  // would help, the belonging isn't real in the developmental sense.
  {
    id: 'belonging.q1',
    dimension: 'belonging',
    chapter: 'Your People',
    text: 'On a short walk, how often do you and your kids run into someone you know by name?',
    sub: 'The dog-walker, the barista, the grandparent down the block.',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'belonging.q2',
    dimension: 'belonging',
    chapter: 'Your People',
    text: 'Could your child walk out the door and have at least one nearby adult know their name?',
    sub: 'A neighbor, a regular at the corner store, the librarian. The intergenerational test.',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'belonging.q3',
    dimension: 'belonging',
    chapter: 'Your People',
    text: 'Do your local places have chairs, shade, or something to do — enough to stay, not just pass through?',
    type: 'frequency',
    options: FREQUENCY,
  },
  // Softened: the previous wording packed three variables into one
  // question (stroller + young child + older relative = double-barreled).
  // Splitting the ask into a single, observable test.
  {
    id: 'belonging.q4',
    dimension: 'belonging',
    chapter: 'Your People',
    text: 'On your usual walking route, can you push a stroller without lifting it over curbs or into traffic?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'belonging.q5',
    dimension: 'belonging',
    chapter: 'Your People',
    text: 'If your child got hurt or upset outside, is there someone nearby — not you — who would help?',
    type: 'frequency',
    options: FREQUENCY,
  },

  // ────────────── INDEPENDENCE ──────────────
  // Hillman/Adams/Whitelegg 1990 found the dramatic UK 7-year-old
  // independent-mobility decline (80% → 9% by 1990). Shaw et al. 2013
  // shows Germany at 81% on the same metric — the gap is structural,
  // not parental. q5 (reverse-scored) is the binding constraint.
  {
    id: 'independence.q1',
    dimension: 'independence',
    chapter: 'Room to Roam',
    text: 'Without checking with you first, can your child get to one place they care about on their own?',
    sub: 'A friend\'s house, a park, a corner store, a library.',
    type: 'options',
    options: [
      { label: 'Not yet', value: 0 },
      { label: 'Maybe with practice', value: 1 },
      { label: 'A few small errands', value: 3 },
      { label: 'Several places they know the way to', value: 4 },
    ],
  },
  {
    id: 'independence.q2',
    dimension: 'independence',
    chapter: 'Room to Roam',
    text: 'Can your child describe the way to a friend\'s house using landmarks they remember?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'independence.q3',
    dimension: 'independence',
    chapter: 'Room to Roam',
    text: 'Are crossings on your walking routes short, visible, and slow enough that a child can understand them?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'independence.q4',
    dimension: 'independence',
    chapter: 'Room to Roam',
    text: 'Is there more than one practical way to walk to school, a park, or a friend\'s home?',
    type: 'options',
    options: [
      { label: 'No, just one route', value: 0 },
      { label: 'One main route', value: 2 },
      { label: 'Two or three', value: 4 },
    ],
  },
  {
    id: 'independence.q5',
    dimension: 'independence',
    chapter: 'Room to Roam',
    text: 'How often do you have to drive somewhere because the walking route feels unsafe?',
    sub: 'Less is better. Higher score = fewer required drives.',
    type: 'reverseFrequency',
    options: FREQUENCY,
  },

  // ────────────── WONDER ──────────────
  // Least child-specific evidence of the 6 dimensions. Anchored to
  // Kaplan preference matrix (coherence/complexity/legibility/mystery)
  // + biophilic-design patterns (Kellert/Heerwagen) for what actually
  // captures child attention: movement, water, animals, change.
  {
    id: 'wonder.q1',
    dimension: 'wonder',
    chapter: 'Everyday Wonder',
    text: 'On your last few walks, did your child stop to look at something you didn\'t plan to stop for?',
    sub: 'A bug, a puddle, a strange leaf, a window display.',
    type: 'frequency',
    options: FREQUENCY,
  },
  // Softened: the original phrasing was a "reasons to go" list, which
  // asked parents to be tour guides. Reworded to the child-attention
  // proxy — features that move, change, or do something.
  {
    id: 'wonder.q2',
    dimension: 'wonder',
    chapter: 'Everyday Wonder',
    text: 'How many small features nearby move, change, or do something — a fountain, a creek, a shop window, a cat, a chalk drawing?',
    type: 'count',
    options: COUNT,
  },
  {
    id: 'wonder.q3',
    dimension: 'wonder',
    chapter: 'Everyday Wonder',
    text: 'Can your child notice seasons changing from your windows, your front step, or a balcony?',
    type: 'frequency',
    options: FREQUENCY,
  },
  // Softened: the "trees, gardens, buildings that make the street feel
  // shaped" phrasing was abstract. Replaced with the features that
  // actually grab attention — water, animals, plants that move.
  {
    id: 'wonder.q4',
    dimension: 'wonder',
    chapter: 'Everyday Wonder',
    text: 'Do your walking routes have water, animals, or plants that move or change while you\'re there?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'wonder.q5',
    dimension: 'wonder',
    chapter: 'Everyday Wonder',
    text: 'Does your child spontaneously stop, investigate, or ask questions during walks?',
    type: 'frequency',
    options: FREQUENCY,
  },

  // ────────────── RESTORATION ──────────────
  // Kaplan 1995 ART — directed-attention fatigue is restored by
  // environments with "soft fascination" (birds, water, wind). Barton &
  // Pretty 2010 dose-response shows 5 min of nature exposure gives an
  // acute mood lift; White et al. 2019 puts sustained wellbeing at
  // 120 min/week. q5 rewritten around "patience" — a parent-centered
  // proxy for directed-attention restoration.
  {
    id: 'restoration.q1',
    dimension: 'restoration',
    chapter: 'Places to Exhale',
    text: 'Is there somewhere nearby where you can sit for five minutes and hear more birds than cars?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'restoration.q2',
    dimension: 'restoration',
    chapter: 'Places to Exhale',
    text: 'Is there a place to stop near home with a chair, shade, and a view — that doesn\'t require planning?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'restoration.q3',
    dimension: 'restoration',
    chapter: 'Places to Exhale',
    text: 'Do you have a low-demand walk — somewhere you don\'t have to be constantly vigilant at driveways?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'restoration.q4',
    dimension: 'restoration',
    chapter: 'Places to Exhale',
    text: 'Can you find shade in summer or a sunny spot in winter within a short walk?',
    type: 'frequency',
    options: FREQUENCY,
  },
  // Softened: "calmer" was vague. "More patience" is an embodied,
  // parent-relevant proxy for directed-attention restoration (ART).
  {
    id: 'restoration.q5',
    dimension: 'restoration',
    chapter: 'Places to Exhale',
    text: 'After spending time at your nearest outdoor place, do you usually have more patience when you get home than when you left?',
    type: 'frequency',
    options: FREQUENCY,
  },

  // ────────────── NEARBY NATURE (id kept as dailyNature) ──────────────
  // White et al. 2019 Sci Rep: 120 min/week in nature is the threshold
  // for sustained health/wellbeing in adults (the child dose is
  // plausibly different — flagged in the dimension brief as the
  // largest evidence gap). Mitchell & Popham 2008 Lancet: green space
  // modifies the income gradient on mortality — the strongest equity
  // finding in the literature. The questions are written to work in
  // both leafy suburbs and 4th-floor walk-ups (a tree on the sidewalk
  // counts; a stoop planter counts).
  {
    id: 'dailyNature.q1',
    dimension: 'dailyNature',
    chapter: 'Nearby Nature',
    text: 'On most days, does your child see, touch, or smell something living — plant or animal — without you planning it?',
    sub: 'A houseplant, a street tree, a stoop garden, a beetle on the sidewalk. Ambient nature.',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'dailyNature.q2',
    dimension: 'dailyNature',
    chapter: 'Nearby Nature',
    text: 'Is there a small patch of nature close enough to use on an ordinary weekday without driving?',
    sub: 'A tree, a planter, a strip of grass, a stoop garden.',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'dailyNature.q3',
    dimension: 'dailyNature',
    chapter: 'Nearby Nature',
    text: 'Do your routine routes (to school, friends, coffee) include trees or gardens?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'dailyNature.q4',
    dimension: 'dailyNature',
    chapter: 'Nearby Nature',
    text: 'Can your child regularly notice birds, insects, or other small wildlife?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'dailyNature.q5',
    dimension: 'dailyNature',
    chapter: 'Nearby Nature',
    text: 'How often can your family have a meaningful nature experience without getting in a car?',
    sub: 'Higher score = more days outside that don\'t require a drive.',
    type: 'frequency',
    options: FREQUENCY,
  },

  // ────────────── ADVENTURE ──────────────
  // Sandseter 2007: 6 categories of risky play (great heights, rapid
  // speed, dangerous tools, dangerous elements, rough-and-tumble,
  // disappear/get lost). Brussoni 2015 IJERPH: risky play has
  // measurable physical and mental-health benefits; "good risk" vs
  // "bad risk" depends on calibrability. Nicholson 1971 loose parts:
  // the more movable stuff, the more creativity. q3 rewritten in
  // the calibrable-risk frame — the binding constraint is usually
  // adult permission, not the absence of physical space.
  {
    id: 'adventure.q1',
    dimension: 'adventure',
    chapter: 'Your Adventure Edge',
    text: 'Is there somewhere nearby where your child can climb, balance, or move fast without entering traffic?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'adventure.q2',
    dimension: 'adventure',
    chapter: 'Your Adventure Edge',
    text: 'Are there logs, slopes, stepping stones, or uneven ground they can navigate?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'adventure.q3',
    dimension: 'adventure',
    chapter: 'Your Adventure Edge',
    text: 'Is there somewhere your child can move fast, climb high, or take a real risk without you needing to stop them?',
    sub: 'The "calibrable risk" test — a place where the risk is real but the child can read it.',
    type: 'comfort',
    options: COMFORT,
  },
  {
    id: 'adventure.q4',
    dimension: 'adventure',
    chapter: 'Your Adventure Edge',
    text: 'Is there room for energetic, rough-and-tumble play without constant conflict with cars or fragile landscaping?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'adventure.q5',
    dimension: 'adventure',
    chapter: 'Your Adventure Edge',
    text: 'Are there places where your child can use real materials — dig, build, garden, cook outdoors?',
    type: 'frequency',
    options: FREQUENCY,
  },
]

// ──────────────────────────────────────────────────────────────────────
// Your Specifics — a 7th chapter that doesn't score a dimension but
// makes the rest of the experience specific to the person. Used to
// parameterize upgrade copy and write the personalized reading.
// ──────────────────────────────────────────────────────────────────────

export const SPECIFICS_QUESTIONS = [
  {
    id: 'specifics.kids',
    chapter: 'Your Specifics',
    text: 'What ages are your kids?',
    sub: 'Pick all that apply. The right habitat shift at age 2 is not the right habitat shift at age 9.',
    type: 'checkbox',
    multi: true,
    options: [
      { label: 'Under 2', value: '0-2' },
      { label: '2 to 4', value: '2-4' },
      { label: '5 to 7', value: '5-7' },
      { label: '8 to 11', value: '8-11' },
      { label: '12 and up', value: '12+' },
    ],
  },
  {
    id: 'specifics.block',
    chapter: 'Your Specifics',
    text: 'Which of these are within a 10-minute walk from home?',
    sub: 'Check what you know. Skip what you don\'t.',
    type: 'checkbox',
    multi: true,
    options: [
      { label: 'A library', value: 'library' },
      { label: 'A café or bakery', value: 'cafe' },
      { label: 'A park or playground', value: 'park' },
      { label: 'A creek, pond, or other water', value: 'water' },
      { label: 'A school', value: 'school' },
      { label: 'Public transit', value: 'transit' },
      { label: 'Mature street trees on the block', value: 'trees' },
      { label: 'A bakery or corner store', value: 'cornerstore' },
    ],
  },
  {
    id: 'specifics.when',
    chapter: 'Your Specifics',
    text: 'When are you actually outside most?',
    type: 'radio',
    options: [
      { label: 'Mornings', value: 'morning' },
      { label: 'After school or daycare', value: 'afterschool' },
      { label: 'Weekends', value: 'weekends' },
      { label: 'Whenever we can, no pattern', value: 'whenever' },
      { label: 'Honestly, not much', value: 'notmuch' },
    ],
  },
  {
    id: 'specifics.car',
    chapter: 'Your Specifics',
    text: 'Is a car available when you need one?',
    type: 'radio',
    options: [
      { label: 'Yes, one is always there', value: 'always' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'No, we walk, bike, or transit', value: 'no' },
    ],
  },
  {
    id: 'specifics.obstacle',
    chapter: 'Your Specifics',
    text: 'What is the biggest thing between you and more outside time this month?',
    sub: 'Optional. A real answer helps us suggest something that fits, not against.',
    type: 'textarea',
    optional: true,
    placeholder: 'Energy after work, the weather, no nearby park, my kid refuses the stroller, my partner and I disagree…',
  },
  {
    id: 'specifics.schedule',
    chapter: 'Your Specifics',
    text: 'Which best describes your week right now?',
    sub: 'Optional. We use this to find the time windows that actually exist.',
    type: 'radio',
    optional: true,
    options: [
      { label: 'Full-time work outside the home', value: 'full_time_work' },
      { label: 'Part-time or shift work', value: 'part_time_work' },
      { label: 'Hybrid — some days in, some out', value: 'hybrid_work' },
      { label: 'At home with kids', value: 'stay_at_home' },
      { label: 'Between jobs or on leave', value: 'between_jobs' },
    ],
  },
  {
    id: 'specifics.partner',
    chapter: 'Your Specifics',
    text: 'Who lives with you and helps with outside time?',
    sub: 'Optional. There\'s no wrong answer — it just changes the suggestions.',
    type: 'radio',
    optional: true,
    options: [
      { label: 'Yes — we\'re on the same page', value: 'partner_aligned' },
      { label: 'Yes — but we disagree about screens, weather, who\'s on duty', value: 'partner_mixed' },
      { label: 'Limited — they work long hours or travel', value: 'partner_limited' },
      { label: 'It\'s mostly me', value: 'solo' },
      { label: 'Co-parent, grandparents, or a village helps', value: 'other_caregivers' },
    ],
  },
  {
    id: 'specifics.energy',
    chapter: 'Your Specifics',
    text: 'After an hour outside with your kids, you usually feel…',
    sub: 'Optional. Honest answers help us plan for the hour it actually costs.',
    type: 'radio',
    optional: true,
    options: [
      { label: 'Calmer and recharged', value: 'energized' },
      { label: 'Tired but glad we went', value: 'tired_but_worth_it' },
      { label: 'Drained and unsure it was worth it', value: 'drained_unsure' },
      { label: 'Drained — and resentful about the planning', value: 'drained_resentful' },
    ],
  },
  {
    id: 'specifics.access',
    chapter: 'Your Specifics',
    text: 'Anything that affects how your family gets outside? (check all that apply)',
    sub: 'Optional. We use this to avoid suggesting things that don\'t fit.',
    type: 'checkbox',
    multi: true,
    optional: true,
    options: [
      { label: 'None of these', value: 'none' },
      { label: 'Mobility — wheelchair, walker, joint issues', value: 'mobility' },
      { label: 'Sensory — noise, crowds, or texture sensitivities', value: 'sensory' },
      { label: 'Allergies — pollen, food, bee sting kit', value: 'allergies' },
      { label: 'Language — we speak another language at home', value: 'language' },
    ],
  },
]

export const CONTEXT_QUESTIONS = [
  {
    id: 'context.prototype',
    text: 'Which description feels most like the place where your family lives?',
    sub: 'We use this to read your neighborhood. The right answer is the one your week feels like.',
    type: 'radio',
    options: [
      { label: 'City core — apartments, sidewalks, the city doing the parenting', value: 'urban_dense' },
      { label: 'Walkable residential — smaller homes with stoops, neighbors who know each other', value: 'urban_family' },
      { label: 'Suburban with a yard — detached homes, more space, car-oriented destinations', value: 'suburban_yard' },
      { label: 'Suburban without much yard — townhouse or apartment, fewer walkable destinations', value: 'suburban_no_yard' },
      { label: 'Small town — compact core, library, main street', value: 'small_town' },
      { label: 'Rural — spread out, fields or woods, car dependence', value: 'rural' },
      { label: 'Coastal — beach, water, tides, wind', value: 'coastal' },
      { label: 'Mountain or foothill — slopes, elevation, weather shifts', value: 'mountain' },
      { label: 'Dry climate — desert or arid, heat, sparse vegetation', value: 'dry' },
      { label: 'College town — walkable core with student life mixed in', value: 'college_town' },
    ],
  },
  {
    id: 'context.location',
    text: 'What city or ZIP are you near?',
    sub: 'Used only to read your climate and shape your reading. Stored on your device. Skip if you prefer.',
    type: 'text',
    optional: true,
    placeholder: 'e.g., Tacoma, WA or 98402',
  },
  {
    id: 'context.homeType',
    text: 'What kind of home do you live in?',
    type: 'radio',
    options: [
      { label: 'Apartment or condo', value: 'apartment' },
      { label: 'Townhouse', value: 'townhouse' },
      { label: 'House with a yard', value: 'house_yard' },
      { label: 'House without a yard', value: 'house_no_yard' },
    ],
  },
  {
    id: 'context.outdoorSpace',
    text: 'Do you have a private or shared outdoor space at home?',
    sub: 'A balcony, porch, stoop, shared courtyard, or yard all count.',
    type: 'radio',
    options: [
      { label: 'Yes, private', value: 'private' },
      { label: 'Yes, shared', value: 'shared' },
      { label: 'No', value: 'none' },
    ],
  },
  {
    id: 'context.zip',
    text: 'Optional: your zip code',
    sub: 'Helps us suggest climate-appropriate plants and timing. Stored only on your device.',
    type: 'text',
    optional: true,
    placeholder: 'e.g., 90210',
  },
]
