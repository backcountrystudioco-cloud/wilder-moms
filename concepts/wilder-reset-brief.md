# Wilder Reset — Product Brief

> **A year to change your life.**
> A personalized home + neighborhood + routine redesign for working families.

## The promise

In one year, your family's outside life is different. Not "more walks." Not "less screen time." Different — structured, specific, owned by the family instead of by the calendar.

The Reset is not a habit app. It's a 12-month redesign of the hardest window in your week, expanded outward until outside life is the default again.

## The shape

Mom completes a 10–15 minute assessment.

Mom completes a 10–15 minute assessment.

She tells Wilder:

- kids' ages
- work/school schedule
- home type
- yard/balcony/no outdoor space
- neighborhood
- current screen habits
- where afternoons fall apart
- what outdoor gear they own
- how independently the kids play
- where the family already goes
- what she wishes family life looked like

Then Wilder gives her a very specific plan.

## What it does NOT sound like

> "Try taking a family walk after dinner!"

## What it DOES sound like

### Your 4:30–7:30 Reset

Your hardest window is the transition from school → home → dinner. We're going to remove three decisions from that window.

- **Arrival**: Kids go directly to the backyard before entering the house.
- **Change**: Move shoes, jackets and outdoor clothes from the bedroom closets to the garage entry.
- **Play**: Put the scooters where the kids can access them without asking.
- **Boundary**: Screens don't become available until after dinner.
- **Mom**: You don't have to participate. Your job is to make the transition possible.

## Why this is different from the current Wilder Index

The Wilder Index *measures* — gives 6 dimension scores, a reading, a weekly plan.

The Wilder Reset *redesigns* — gives a specific home + neighborhood + routine redesign for the hardest window in the family's week, then expands it across the year.

The Reset can be a deeper, more concrete product layered on top of the Index, where the Index is the input signal and the Reset is the prescriptive output.

## The year, broken into quarters

A 1-year commitment needs quarterly structure, not just one window.

| Quarter | Theme | Window | Goal |
| -- | -- | -- | -- |
| Q1 (months 1–3) | **The Hard Window** | The 4:30–7:30 transition (or whichever window the family names as hardest) | Remove 3–5 decisions from that window. Outside becomes the default before dinner. |
| Q2 (months 4–6) | **The Neighborhood** | Saturday morning, or the after-school-but-not-home window | Establish one regular third place and one walkable route. The block becomes somewhere the family knows. |
| Q3 (months 7–9) | **The Rhythm** | Across the whole week | Hold the Q1 and Q2 patterns through a season change. Adjust for weather, daylight, school schedule shifts. |
| Q4 (months 10–12) | **The Next One** | The window the family picks | The family picks the next hardest thing. The Reset expands outward, one window at a time, until outside life is the default. |

Each quarter ships:

- **One Reset** (5 moves, scoped to that quarter's window)
- **3 monthly check-ins** (did the moves hold? what broke? swap or rebuild?)
- **One end-of-quarter milestone** (a concrete observable — first regular Saturday, first time the kids led a walk on their own, etc.)

## Pricing

Monthly ($19) or annual ($199) — both lead to the same Reset. The promise is the year; the cadence is the parent's choice.

Monthly is for families who want to test the rhythm before committing. Annual is for families who are ready to commit the year upfront and want the savings. Both unlock the same quarterly Resets, monthly check-ins, and end-of-quarter milestones. There's no "monthly gets less" tier — only two ways to pay for the same year.

The free tier: Wilder Index (the measurement, the reading, the weekly plan).
The paid tier: Wilder Reset (the year of windows, the prescriptive moves, the quarterly check-ins).

## Input signals the Index currently misses

The Reset would need the survey to capture:

- screen habits — currently NOT captured
- afternoon transition specifically — currently only generically via `specifics.obstacle`
- outdoor gear inventory — currently NOT captured
- what mom wishes family life looked like — currently NOT captured

The Index already captures (and the Reset can reuse):

- kids' ages — `specifics.kids`
- work/school schedule — `specifics.schedule`
- home type — `context.homeType`
- outdoor space — `context.outdoorSpace`
- neighborhood — `context.prototype`
- how independently the kids play — `independence` dimension (5 questions)
- where the family already goes — `specifics.block`

## Output schema (proposed)

```js
// One Reset per family — picked for their hardest window.
{
  kind: 'reset',
  version: 1,
  generatedAt: '<ISO>',
  family: {
    kids: ['5-7', '8-11'],          // from specifics.kids
    home: 'house_yard',              // from context.homeType
    outdoor: 'private',              // from context.outdoorSpace
    prototype: 'suburban_yard',      // from context.prototype
    hasYardAccess: true,
    gear: ['scooters', 'balls',],    // NEW input
    screensDefault: 'on_demand',     // NEW input
    afternoonShape: 'school_then_home_then_dinner',  // NEW input
  },

  window: {
    id: 'afternoon-transition',
    name: 'Your 4:30–7:30 Reset',
    start: '15:30',
    end: '19:30',
    diagnosis: 'The transition from school → home → dinner is where the week falls apart.',
    pickedBecause: 'specifics.obstacle matches /energy/, kids are school-age, no third place on the way home.',
  },

  moves: [
    {
      slot: 'arrival',               // arrival | change | play | boundary | reset | mom
      title: 'Arrival',
      instruction: 'Kids go directly to the backyard before entering the house.',
      why: 'Removes the "settle in with a screen" default.',
      effort: 'low',                 // low | medium | high
      reversible: true,              // can be undone without losing the rest
      dependsOn: [],                 // ids of moves that must be in place first
    },
    {
      slot: 'change',
      title: 'Change',
      instruction: 'Move shoes, jackets, and outdoor clothes from the bedroom closets to the garage entry.',
      why: 'Removes the "where are my shoes?" bottleneck.',
      effort: 'low',
      reversible: true,
      dependsOn: [],
    },
    {
      slot: 'play',
      title: 'Play',
      instruction: 'Put the scooters where the kids can access them without asking.',
      why: 'Removes the "can I…?" decision loop.',
      effort: 'low',
      reversible: true,
      dependsOn: ['arrival'],
    },
    {
      slot: 'boundary',
      title: 'Boundary',
      instruction: 'Screens don\'t become available until after dinner.',
      why: 'Replaces the default rather than fighting it.',
      effort: 'medium',
      reversible: true,
      dependsOn: ['arrival'],
    },
    {
      slot: 'mom',
      title: 'Mom',
      instruction: 'You don\'t have to participate. Your job is to make the transition possible.',
      why: 'Most failed routines fail because one adult is doing the cognitive work.',
      effort: 'low',
      reversible: true,
      dependsOn: [],
    },
  ],

  unlocks: [
    'one less decision per day = ~365 fewer decisions a year',
    'kids enter dinner hungrier and more tired-out',
    'screen-time shifts to after-dinner, where it competes with bedtime instead of with outside',
  ],
}
```

## Why these fields

- **`window.pickedBecause`** — the explanation that names the survey signals that selected this window. The diagnostic sentence is what makes it feel specific instead of generic. Echoes the survey signals so the parent recognizes their own week in the diagnosis.
- **`moves[].slot`** — five named slots (arrival / change / play / boundary / mom) cover the hard parts of any routine: how you enter, how you get ready, what you do instead of the default, the rule that replaces the rule, and the adult's role. The schema can hold all five or just three, but the slots give the renderer a template.
- **`moves[].effort`** — important for sequencing. Low-effort moves should be available immediately; high-effort moves are weekend projects. The UI can sort or filter by this.
- **`moves[].reversible`** — explicit. A reset is a series of small experiments, not a commitment. Every move is something the family can undo without losing the others.
- **`moves[].dependsOn`** — `arrival` is a precondition for `play` and `boundary`. If you don't land at the door differently, the play move has nothing to attach to. The renderer can show moves in dependency order.
- **`unlocks`** — the long-form payoff. The brief says "we're going to remove three decisions from that window." `unlocks` is where the count lives. Each unlock is a sentence the parent can read and recognize their week in.

## How the window is picked

The window picker is a small rule engine, not AI. It uses existing survey inputs and adds 3-4 new specifics:

```js
function pickWindow(profile) {
  const { schedule, obstacle, when, kids, energy, partner } = profile.specifics
  const hasSchoolAge = kids.some(a => ['5-7','8-11','12+'].includes(a))

  // Default: the afternoon transition. Most working-family pain is here.
  if (hasSchoolAge && (schedule === 'full_time_work' || schedule === 'part_time_work')) {
    return 'afternoon-transition'   // 3:30-7:30 PM
  }
  // Stay-at-home with young kids: the morning stretch
  if (schedule === 'stay_at_home' && kids.some(a => ['0-2','2-4'].includes(a))) {
    return 'morning-stretch'        // 9:00-11:30 AM
  }
  // Single parent or partner-misaligned: the dinner-to-bed window
  if (partner === 'solo' || partner === 'partner_mixed') {
    return 'evening-wind-down'      // 7:00-9:30 PM
  }
  // Energy-tapped obstacle
  if (/energy|tired|exhaust/i.test(obstacle)) {
    return 'afternoon-transition'
  }
  // Default
  return 'afternoon-transition'
}
```

Three to five windows cover the bulk of working-family life. The picker is deterministic and explainable.

## The moves library

Each window has 8-15 candidate moves. The generator picks 4-5 that:

- Match the home type (apartment moves are different from house_with_yard moves)
- Match the gear inventory (don't suggest "scooters" if they don't own any)
- Match the kids' ages (don't suggest "your tween walks to the library" for a 2-year-old)
- Cover all five slots if possible (arrival, change, play, boundary, mom)
- Avoid moves the family has already tried (track in `state.history`)

Moves live in `src/wilder-reset/moves.js` as static data. The Reset is pure logic — no AI call needed. The AI is reserved for the weekly local recommendations where neighborhood-specific detail matters; the Reset is a home + routine redesign that the family already has.

## UI shape

The renderer is one card on the dashboard, replacing the current "Today's upgrade" section for families who have a Reset.

```
┌─ Your 4:30–7:30 Reset ──────────────────────────────────┐
│                                                          │
│  Your hardest window is the transition from school →     │
│  home → dinner. We're going to remove three decisions    │
│  from that window.                                       │
│                                                          │
│  ARRIVAL    Kids go directly to the backyard before      │
│             entering the house.                          │
│                                                          │
│  CHANGE     Move shoes, jackets, and outdoor clothes     │
│             from the bedroom closets to the garage entry.│
│                                                          │
│  PLAY       Put the scooters where the kids can access   │
│             them without asking.                         │
│                                                          │
│  BOUNDARY   Screens don't become available until after   │
│             dinner.                                      │
│                                                          │
│  MOM        You don't have to participate. Your job is   │
│             to make the transition possible.             │
│                                                          │
│  ⌐ This is the reset. Mark it tried, swap a move,       │
│    or take it apart.                                     │
└──────────────────────────────────────────────────────────┘
```

- One move per slot — the slot is the section header, the move is the only content.
- "Mom" slot always present when the family has a primary caregiver in the home.
- Action row at the bottom: "Mark it tried", "Swap a move", "Take it apart" (regenerate with different moves).
- History: marking it tried appends to `state.history` so the weekly plan and reading can reflect "Reset started X days ago."
- "Swap a move" lets the parent veto one move (e.g., "we don't have a garage") and the picker replaces it with the next-best move for the slot.

## Where it fits in the existing architecture

| Existing piece | Reset relationship |
| -- | -- |
| `dimensions.js` (6 dimensions) | Reset reads `scores.opportunity` to bias which moves get picked (if belonging is low, the arrival slot leans toward "knock on a neighbor's door" rather than "backyard") |
| `architecturalMoves.js` (monthly move) | Reset is a deeper cousin. Where the monthly move is one change, the Reset is a window-scoped bundle. They live side by side. |
| `catalog.js` upgrades (weekly plan) | Weekly plan handles the day-to-day. Reset is the one-time structural setup. The weekly plan can surface "Reset move 2 still pending?" as a nudge. |
| `localRecommendations.js` (AI weekly) | Different job — neighborhood-specific, AI-driven. Reset is purely home + routine. |
| `reading.js` (3-paragraph reading) | Reset is referenced in P3 — "The hardest window in your week is the 3:30-7:30 transition. We've mapped a reset for it below." |

The Reset is one new artifact. It doesn't replace anything.

## Files to create (when ready)

```
src/wilder-reset/
  windows.js          // window definitions (3-5 windows)
  moves.js            // 30-50 candidate moves across windows
  generator.js        // pickWindow + pickMoves pure functions
  Reset.jsx           // dashboard renderer
```

## Files to extend

- `questions.js` — add 3-4 new specifics (gear inventory, screens default, afternoon shape, wish)
- `RevealScreen.jsx` — append Reset preview after the location recommendations
- `WilderIndexPage.jsx` — mount `<Reset />` on the dashboard
- `WilderIndexContext.jsx` — add `markResetTried`, `swapResetMove` mutators

## Verification & refinement

Three parallel subagents audited the design against (a) the 52-week content depth, (b) foundational urban design and architectural canon, (c) developmental-psychology and pediatric mental-health evidence. Full briefs in `wilder-reset-verification-brief.md`, `wilder-reset-canon-verification.md`, and `wilder-reset-mental-health-verification.md`. Headlines:

### Move count math (from depth brief)

- **Shipped per family across the year: ~18–20 distinct moves**, not 20 in series. Q3 ships 3 moves (hold-only) to absorb the motivation drop; Q4 is family-pick and may overlap with Q1.
- **Library size: 120–130 move records**. Includes ~80 alternates (swap chains), ~40 cross-quarter variants (Q1 move re-served in Q3), and ~4 single-move picks. Without this headroom, swaps and lineage both run out.
- **Total touchpoints per family: ~120–140 items** across 52 weeks (moves + monthly check-ins + 30 weekly nudges + 4 milestones + 4 swap weeks).
- **Q3 drop-off prediction: 30–50%** of families will not complete the Q3 Reset intact. Q3 is designed to be lower-effort so a partial completion is still a win.

### Canon tightening (from urban-design brief)

Five second-order weaknesses the canon called out — each is fixable without changing the overall structure:

1. **Arrival is inward; canon says it should also be outward.** Jacobs + Sampson 1997 + Alexander #165 — neighbor visibility is part of the arrival, not just private backyard. Fix: ship two arrival alternates (`arrival.backyard-first` for inward families, `arrival.stoop-greet` for outward families, the picker chooses).
2. **Play is access; canon says it should be materials.** Nicholson 1971 loose parts — scooters are a fixed affordance, not variables. Fix: every Q1 play move ships with a "loose-parts starter" alternates (`play.bins-of-stuff` — three bins of cheap materials by the door).
3. **Boundary is a rule; canon says it should also be a place.** Gehl soft edge + Whyte triangulation — invite alternate behavior, not just forbid the default. Fix: every boundary move ships with a paired "temptation place" (`boundary.screens-after-dinner` + `place.dinner-bucket-of-magnifying-glasses`).
4. **Mom is one adult; canon says Mom is a cluster.** Alexander #37 + Hartz-Karp + UNICEF CFCI — partner, neighbors, grandparents, kids themselves. Marketing choice to keep "Mom"; the moves library treats the slot as `cluster` with alternates like `cluster.partner-on-duty`, `cluster.neighbor-anchor`, `cluster.kid-led`.
5. **Missing celebration/observation.** BJ Fogg instant celebration + Whyte observation method + Lally 66-day median. Fix: every quarter has an `observe` micro-slot ("what did you notice this week that was different?") and the end-of-quarter milestone is celebrated in-app.

**Naming note**: the canon's word is *repair* (Alexander #104) or *piecemeal growth* — "Reset" is a marketing choice. The brief keeps "Reset" because it lands with parents; the in-app copy should reflect Alexander's framing where it fits ("gradually stiffening" the routine, "piecemeal" rather than wholesale).

### Mental-health ranking (from mental-health brief)

The five slots rank, honestly, by strength of evidence linking them to *child* mental health:

| Slot | Evidence rank | Strongest citation |
| -- | -- | -- |
| **play** | ★★★★★ strongest | Undirected outdoor play reduces anxiety risk — CPS 2024 (Beaulieu & Beno, PCH 29:4); Brussoni 2015 IJERPH; Sandseter 2007; Gray 2013 *Free to Learn*; **Dodd et al. 2026 JCPP** (n=4,151 Scottish cohort, each extra day/week outdoor play at 2–4y → 6–14% higher odds of low-symptom trajectory through 8y) |
| **arrival** | ★★★★ | How a kid lands at home after school affects cortisol / regulation. Combined with belonging + outside-before-dinner = strongest mental-health leverage. |
| **boundary** (screens) | ★★★ | AAP 2026 revised media statement (Hill et al., *Pediatrics* 157:2 e2025075320) supersedes the 2016 hours-based framework; boundary should be reframed as "what screens don't replace" rather than just "screens are off." |
| **change** | ★★ | Friction reduction at transitions reduces stress, but evidence is mostly adult-side. |
| **mom / cluster** | ★ | Strongest evidence is *adult*-protective (caregiver mental load → child outcomes), not directly child. The slot is still in the design — it lowers the parent's load, which lowers the child's stress. |

**Q-by-Q mental-health evidence**:

- **Q2 Neighborhood is the richest** for child mental health — regular third places + walkable routes map directly onto belonging + nearby-nature research.
- **Q1 Hard Window's cortisol claim is the weakest** — the literature on after-school cortisol in kids is small. Reframe Q1 around "outside-before-dinner as a default" rather than "reduce cortisol" (which we don't have evidence for).
- **Q3 Rhythm should explicitly include a self-observation week** — Whyte's observation method, applied by the parent to their own family's pattern.

**Marketing framing**: the Reset is a *lifestyle product*. Outside-life as a default. Routine redesign for working families. It is not a clinical intervention, and the marketing copy makes no claims about anxiety, depression, ADHD, behavioral disorders, sleep, cortisol, mental health outcomes, or any other clinical or developmental outcome. The evidence base informs our design (we know play is the highest-leverage slot, we know rough-and-tumble and nature contact and routine all have research behind them) but the marketing copy stays in lifestyle territory:

- *Outside life is the default.*
- *A year to change your family's week.*
- *The hardest window, redesigned.*
- *One regular third place. One walkable route. One window at a time.*

**Outcomes module**: deliberately omitted from the product. The Reset does not ask parents to track wellbeing, sleep, screen time, or outdoor minutes as measured outcomes. This keeps the product out of clinical-claim territory and removes the implicit promise that completing the Reset produces a measurable change. The product's only promise is the year itself: outside life as a default.

**Internal evidence base** (kept for design decisions, NOT for marketing copy):

- Play is the highest-leverage slot — strong research base (CPS 2024, Brussoni, Sandseter, Gray, Dodd 2026).
- Loose parts > fixed affordances for play variety — Nicholson 1971.
- Nature contact for 120+ min/week in adults is associated with sustained wellbeing — White et al. 2019.
- Family routines reduce allostatic load and improve child resilience — Fiese 2002, McEwen.
- Caregiver mental load is a primary predictor of routine success — Folkman / Lazarus.
- Independent mobility is associated with higher self-efficacy in children — Hillman/Adams, Prezza, Marzi 2024.

These inform slot priorities and the swap library but stay out of user-facing copy.

### What changed in this revision

- **Slot count: 5 → 6** with the addition of `observe` as a sixth micro-slot per Reset.
- **Slot rename: `mom` → `cluster`** in the data model; "Mom" retained as the marketing label in the UI.
- **Move library size: ~30–50 → 120–130 records** (including alternates + cross-quarter variants).
- **Per-family shipped moves: ~20 → 18–20** (Q3 ships fewer moves; some Q1 moves re-served in Q3 by lineage).
- **Q3 reframed as hold-only**, not add-new.
- **AAP 2016 → AAP 2026** in the boundary-slot evidence base.
- **Marketing copy: lifestyle only.** No clinical or developmental claims about anxiety, depression, ADHD, sleep, cortisol, or other outcomes. The evidence base is kept internal for design decisions and is not surfaced in user-facing copy.
