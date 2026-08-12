# Wilder Reset — Verification Brief

> Verification of the Reset's depth, adaptation, and 52-week reality.
> Source brief: `concepts/wilder-reset-brief.md`. Reference: existing `src/wilder-index/` shape (history cap 500, shown cap 6, catalog already keyed by `homeType` / `outdoorSpace` / `kidsAges`).

---

## A. Move count breakdown

The brief under-counts what "a year" requires. The 5-slot × 4-quarter = 20 number is the *core move count*, not the *library size*. A real year needs:

### A.1 Math

| Layer | What it is | Count |
| --- | --- | --- |
| Core moves shipped to the family | 4 quarters × 5 slots = 20, but each is one of 4–6 candidates per slot per window | 20 shipped |
| Per-slot alternates | 3–5 alternates per slot per window (so a swap has somewhere to go) | 5 slots × 4 windows × 4 alternates avg = **80 alternates** |
| Quarter-to-quarter variants | The same slot, different quarter, needs a *different* move (Q2 isn't Q1) | 5 slots × 4 quarters × 2 extra variants = **40 cross-quarter variants** |
| "If you only do one thing" picks | One short move per quarter, surfaced weekly as the smallest viable change | 4 |
| Monthly check-in prompts | 3 per quarter × 4 = 12, but each needs 4–6 follow-up branches depending on the answer | 12 prompts + ~60 branch strings |
| End-of-quarter milestone definitions | 4 templates, each with 2–3 milestone options based on what shipped | 4 templates + ~12 milestone variants |
| Weekly nudges | 52 weeks, but only 13 are Reset-launch / milestone weeks; the other 39 are *content references* drawn from the moves library + the AI weekly feed | ~13 reset-tied + 39 adaptive nudges |
| Window definitions | 3–5 windows × 3–4 sub-windows each (e.g., "afternoon-transition" has "after-pickup" / "pre-dinner" / "dinner-to-bed") | 4 windows × 3 sub-windows = 12 |
| Adaptation rules | Per-slot fallback chains (no garage → entry-mudroom → front-hall → door-mat) | ~30 rules |

**Total unique move records in `moves.js`:**
- 80 alternates + 40 cross-quarter variants + 4 single-move picks = **~124 move records**
- Round to **120–130 move records** for a defensible library.

**Total generated per family across the year:**
- 20 core moves shipped, 4 milestone definitions, 12 check-in prompts, 52 weekly nudges
- Of the 52 nudges, ~10–15 will be Reset-references ("Reset move 2 still pending?")
- The other 37–42 come from `localRecommendations.js` and the `catalog.js` weekly pool, with the Reset *biasing* what gets shown, not replacing it
- Realistic per-family content exposure: **~120–140 distinct items** (moves + prompts + nudges) across the 52 weeks

### A.2 Catalog structure

```
src/wilder-reset/
  windows.js        // 4 windows × 3 sub-windows = 12 definitions
  moves.js          // 120-130 move records
  swapChains.js     // 30 fallback rules (per-slot)
  generator.js      // pickWindow + pickMoves + applyLineage (pure)
  lineage.js        // read/write to state.reset (pure)
  Reset.jsx         // dashboard renderer
  CheckIn.jsx       // monthly check-in flow (3 questions)
  Milestone.jsx     // end-of-quarter milestone card
```

**Per-quarter move count budget** (so a family never sees the same move twice across a year without it being intentional):
- 5 core moves (one per slot)
- ~2–3 alternates per slot, pre-picked, available in the "Swap" menu
- Total per-quarter pool: 5 + (5 × 2.5) = **~17.5 moves per quarter**
- Yearly pool: ~70 moves the family *could* be served
- Yearly shipped: 20, plus ~10 swaps = **30 served across the year**
- Library: 120–130 (the rest are anti-repeat insurance + the source for next year if they re-subscribe)

---

## B. Adaptation model

The brief's promise — "suggestions feed off what the user has committed to" — needs three concrete mechanisms, not just a vague "AI."

### B.1 What adapts

1. **Slot → alternate substitution.** A "no garage" is a `familySignals.outdoorSpace !== 'private'` filter. The picker pulls the next move whose `familySignals` still match. This is deterministic, not AI.
2. **Quarter-on-quarter building.** A Q1 move that landed (`acknowledgedMoves`) becomes a `dependsOn` for a Q2 move in the same slot. E.g., Q1's "kids go to backyard" → Q2's "neighbors know the kids go to the backyard at 3:45" depends on it.
3. **Weekly nudge tone.** Once the family has marked a move "tried," that move stops appearing in the nudge stream. The nudge stream instead references *the next pending move* in the active Reset.

### B.2 What does NOT adapt (and shouldn't try to)

- The *window* doesn't change between quarters within a year. Q1 is always the afternoon transition (or whatever was picked). Q3 is *the same window under stress*, not a different window. The picker is one-shot, not adaptive.
- The slot schema is fixed: arrival / change / play / boundary / mom. New slots are not invented per quarter. (This is what makes the renderer a stable template.)
- The move `effort` distribution per quarter is fixed: 3 low + 1 medium + 1 high. The family can't negotiate to a 5-low quarter, because the medium/high moves are the ones that hold when the low ones get stale.

### B.3 The lineage read

Each new Reset and each weekly nudge calls one function:

```js
function nextEligibleMoves({ slot, quarter, familySignals, lineage }) {
  return MOVES.filter(m =>
    m.slot === slot &&
    m.quarter === quarter &&
    m.familySignals matches familySignals &&
    !lineage.acknowledgedMoves.includes(m.id) &&
    !lineage.abandonedMoves.includes(m.id) &&
    m.dependsOn.every(d => lineage.acknowledgedMoves.includes(d)) &&
    !lineage.supersededByMe(m.id)   // if I depend on a move that's been swapped-out
  )
}
```

The `familySignals` filter is what adapts to the survey. The `lineage` filter is what adapts to what they've done. The `quarter` filter is what adapts to *where in the year they are*.

---

## C. 52-week calendar sketch

Format: `Week N — Title (kind)`. Kind is one of: **R** (Reset), **C** (check-in), **N** (weekly nudge), **M** (milestone), **A** (assessment), **S** (swap-week / take-it-apart).

The "if you only do one thing this week" column names the smallest viable move.

### Q1 — The Hard Window (weeks 1–13)

| Wk | Beat | Kind | If you only do one thing |
| --- | --- | --- | --- |
| 1 | Assessment review + window pick | A | "You picked the 4:30–7:30 window." |
| 2 | Q1 Reset ships, 5 moves surfaced | R | **Arrival**: kids to backyard before entry |
| 3 | Nudge on the *change* slot | N | Shoes by the garage door, not the bedroom |
| 4 | Nudge on the *play* slot | N | Scooters where they can reach them |
| 5 | Nudge on the *boundary* slot | N | Screens off until after dinner |
| 6 | Nudge on the *mom* slot (and a gentle "this isn't your job to run") | N | Don't join the play; make it possible |
| 7 | Nudge: "Reset move 2 still pending?" | N | Re-anchor on change slot |
| 8 | Nudge: cross-slot link (arrival → play) | N | The arrival move only works if play has stuff to do |
| 9 | Swap-week — open the swap menu | S | Try the alternate, or skip it |
| 10 | Nudge: "What broke this week?" (low-pressure survey) | N | The thing that broke is data |
| 11 | Monthly check-in #1 | C | "Are the moves still in place?" |
| 12 | Nudge: prepare for milestone | N | The end-of-quarter is observable |
| 13 | **Milestone: first full Reset week** | M | "You did the window for a whole week." |

### Q2 — The Neighborhood (weeks 14–26)

| Wk | Beat | Kind | If you only do one thing |
| --- | --- | --- | --- |
| 14 | Q2 Reset ships, building on Q1 lineage | R | **Arrival**: walking arrival (not drive-up) for one block |
| 15 | Nudge: third place slot | N | Find the regular Saturday spot |
| 16 | Nudge: walkable route slot | N | Walk the route once, name three landmarks |
| 17 | Nudge: neighbors-by-name slot | N | Use three neighbors' names this week |
| 18 | Nudge: weekend rhythm slot | N | One Saturday morning thing, repeated |
| 19 | Nudge: parent participation (Q2's "mom" slot) | N | You go too, not just the kids |
| 20 | Nudge: Q1 line — "the arrival move from Q1 still happens first" | N | Don't skip the Q1 moves |
| 21 | Nudge: weather-week contingency | N | What does Q2 look like in rain? |
| 22 | Swap-week | S | Try the alternate third place |
| 23 | Nudge: "What broke?" | N | The break is the data |
| 24 | Monthly check-in #2 | C | "Is the Saturday thing holding?" |
| 25 | Nudge: milestone prep | N | The end-of-quarter is observable |
| 26 | **Milestone: first regular Saturday / first kid-led walk** | M | "You have a place now." |

### Q3 — The Rhythm (weeks 27–39) — *the danger quarter*

Q3 is where motivation drops. The novelty is gone; the season has changed; the school year is in full swing. Q3's job is *holding*, not adding.

| Wk | Beat | Kind | If you only do one thing |
| --- | --- | --- | --- |
| 27 | Q3 Reset ships — *fewer* moves, all "hold" | R | **Arrival**: still going to the backyard |
| 28 | Nudge: season change — what worked in Q1 doesn't fit Q3 | N | Adjust the *how*, not the *what* |
| 29 | Nudge: re-anchor Q1 + Q2 moves | N | The compound is what's important |
| 30 | Nudge: school-schedule-shift contingency | N | Pickup time moved; the move adapts |
| 31 | Nudge: weather contingency | N | One indoor version of each move |
| 32 | Nudge: parent burnout (Q3 is the trough) | N | Skip a move, don't skip the week |
| 33 | Swap-week — *the most-used swap week* | S | Lower the bar; the move can be 50% of itself |
| 34 | Nudge: "You don't have to add anything new this quarter" | N | Holding is winning |
| 35 | Nudge: re-anchor Q1 + Q2 moves | N | The compound is what's important |
| 36 | Monthly check-in #3 (lowest-effort of the year) | C | "Are we still doing it, even at 50%?" |
| 37 | Nudge: milestone prep | N | The end-of-quarter is observable |
| 38 | Nudge: prepare for Q4 family choice | N | What's the next hardest thing? |
| 39 | **Milestone: held through the season change** | M | "You have a year of this now." |

### Q4 — The Next One (weeks 40–52)

Q4 is family-led. The window is *whatever they pick*. The moves library grows a *Q4 addendum* for the 4 most common picks:

| Common Q4 picks | Quarter 4 move slots |
| --- | --- |
| Dinner-to-bed window | bath / pajamas / wind-down / story / lights-out |
| Weekend morning | breakfast / first-out / regular-thing / family-time / mom |
| After-dinner | clean-up / chore / outside-15 / bath-prep / mom |
| One parent works from home | commute-replace / lunch-out / kid-visits / end-of-day / mom |

| Wk | Beat | Kind | If you only do one thing |
| --- | --- | --- | --- |
| 40 | Q4 Reset ships — family picks the window | R | **Arrival** of the new window |
| 41 | Nudge: the new slot's first move | N | The smallest viable version of the new move |
| 42 | Nudge: link to Q1 (the compound is everything) | N | The new move attaches to the old ones |
| 43 | Nudge: family picks the "mom" slot for the quarter | N | You decide what your job is |
| 44 | Nudge: hold Q1 + Q2 + Q3 *and* the new one | N | The compound is everything |
| 45 | Swap-week | S | Lower the bar; the year is almost over |
| 46 | Nudge: "What's the one thing you want to keep?" | N | Decide what's permanent |
| 47 | Nudge: the year-end reflection prompt | N | What's different from week 1? |
| 48 | Monthly check-in #4 | C | "What's the year, in three sentences?" |
| 49 | Nudge: prepare for the year-end milestone | N | The year-end is observable |
| 50 | Nudge: which Q1 move is still in place? | N | The compound is everything |
| 51 | Nudge: which Q4 move is going to be permanent? | N | One new permanent thing |
| 52 | **Milestone: a year of windows** | M | "Outside life is the default now." |

### C.1 Per-quarter totals

| Quarter | Resets | Check-ins | Milestones | Nudges | Swap weeks |
| --- | --- | --- | --- | --- | --- |
| Q1 | 5 moves | 1 | 1 | 7 | 1 |
| Q2 | 5 moves | 1 | 1 | 7 | 1 |
| Q3 | 3 moves (hold-only) | 1 | 1 | 9 | 1 |
| Q4 | 5 moves (family-pick) | 1 | 1 | 7 | 1 |
| Year | **18 moves shipped** | 4 | 4 | 30 | 4 |

(Plus 2 from Q1/Q2 that get re-anchored as `dependsOn` in later quarters, totaling **20 distinct moves touched across the year** — matching the brief's math.)

---

## D. Catalog data model

The brief's shape is mostly right. Here it is filled in, with the slots, families, and lineage hooks:

```js
// moves.js — one record per candidate move
{
  // identity
  id: 'arrival.backyard-first',          // stable; never rename (history refers to it)
  slot: 'arrival',                        // arrival | change | play | boundary | mom
                                            //   (Q4 addendum: bath | pajamas | story | lights-out | etc.)
  quarter: 1,                             // 1-4
  window: 'afternoon-transition',         // 4 windows × 3 sub-windows = 12 values

  // matching
  familySignals: {
    homeTypes: ['house_yard', 'house_no_yard', 'townhouse'],
    outdoorSpaces: ['private', 'shared'],
    kidsAges: ['5-7', '8-11'],            // empty array = no age filter
    energyOk: true,                       // false = only for low-energy windows
    partnerOk: ['partner_aligned', 'partner_mixed', 'solo'],
  },

  // content
  title: 'Arrival',
  instruction: 'Kids go directly to the backyard before entering the house.',
  why: 'Removes the "settle in with a screen" default.',
  effort: 'low',                          // low | medium | high
  cost: 'free',                           // free | $ | $$ | $$$
  reversible: true,

  // lineage
  dependsOn: [],                          // ids of moves that must be acknowledged first
  supersedes: ['arrival.default-entry'],   // if this move is acknowledged, don't suggest these
  unlocks: ['arrival.walking-arrival'],   // moves this move enables (next quarter can reference)
  swapOf: null,                           // if non-null, this is an alternate for that id
  swapChain: 'arrival.backyard-first',    // root id of the swap family (all alternates share)
}
```

### D.1 Schema invariants

- `id` is a stable, never-reused string. History arrays store these. Renaming = data loss for current users.
- `slot` is one of a fixed 5-set per window. New slots are not added without a Reset version bump.
- `quarter` is 1–4. A move with `quarter: 1` is never re-served in quarter 4 unless `swapOf` is set.
- `familySignals` is the *filter*, not the *trigger*. A move is eligible when **all** of its `familySignals` match the family (or are empty).
- `dependsOn` is a hard gate: the move is invisible until all `dependsOn` ids appear in `state.reset.acknowledgedMoves`.
- `supersedes` is a soft gate: those moves are *deprioritized*, not hidden. (Because the family may have done them in a prior round and the lineage knows.)
- `swapChain` groups all alternates of one move. The swap menu shows the chain, not the whole library.
- `unlocks` is the *forward* dependency. Used by Q2/Q3/Q4 generators to know what to suggest next.

### D.2 What's missing from the brief's model

The brief's `personalize(profile)` pattern (used in `catalog.js` and `architecturalMoves.js`) is *content-override* logic. The Reset is different: it doesn't override content, it *filters* which record to serve. So `moves.js` should be **pure data** (no `personalize()` functions). The filtering happens in `generator.js` against `familySignals`.

This is a meaningful architectural choice: the catalog becomes a queryable dataset, the generator becomes a query. The `personalize()` pattern is for upgrades that need *new copy*; the moves library just needs *different records*.

---

## E. Swap mechanism

The "we don't have a garage" case is the most common swap. The mechanism:

### E.1 The chain

Every move in a slot is part of a `swapChain` (a root id + its alternates). When the family swaps a move, the generator:

1. Looks up the chain root.
2. Walks the chain, filtering by:
   - The family's current `familySignals` (the new move still has to fit)
   - `!lineage.acknowledgedMoves.includes(m.id)` (not already done)
   - `!lineage.abandonedMoves.includes(m.id)` (not previously abandoned)
3. Returns the first match. If none match, the slot becomes "open" — the parent can choose to skip it, which appends to `lineage.abandonedMoves` with `{ reason: 'no-fit', quarter, slot }`.

### E.2 The skip behavior

When a slot is skipped:
- The slot renders as "open" in the Reset card, with a one-line note ("We couldn't find a fit for this slot. Move on, or pick a custom move?").
- The skip is logged with `{ reason, timestamp, familySignalsAtTime }` so future quarters don't re-suggest the same move under the same conditions.
- The family can still write a custom move ("we put the shoes by the front door") which becomes a new record in `lineage.customMoves`.

### E.3 The "we tried that and it didn't work" path

Distinct from "no fit." When the family marks a move as *tried-but-failed*:
- The move goes into `lineage.abandonedMoves` with `{ reason: 'tried-failed', ... }`.
- The swap menu for that slot starts at the *next* alternate, not the first.
- The move's `swapChain` is annotated with a "burned" flag in this family's lineage — the family won't see it again for the rest of the year.
- Future quarters: the move is *not* in their global `abandonedMoves` (so a different family can still see it), but it *is* in the family's personal `abandonedMoves`.

### E.4 Swap menu UI cost

The swap menu at Q1 launch is small (~2–3 alternates per slot). By Q3, the family's `abandonedMoves` has narrowed the menu. By Q4, the family is mostly picking from moves the lineage *knows fit* them.

The "open slot" case is rare but expected: in a year, 1–2 slots across all 20 will likely be "open." The renderer needs to handle this gracefully (no error, no shame, no fallback to a bad fit).

---

## F. Lineage model

`state.reset` extends the existing `state.architectural` pattern (which already tracks `currentId`, `shownIds`, `acknowledgments`).

### F.1 Schema

```js
state.reset = {
  // current position
  currentQuarter: 1,                     // 1-4
  currentWindow: 'afternoon-transition',  // picked at assessment
  currentSlot: null,                      // which slot is the UI focused on; null = whole Reset
  currentMoveId: null,                    // the move currently surfaced

  // the family history
  acknowledgedMoves: [                    // moves the family has marked tried-and-kept
    {
      id: 'arrival.backyard-first',
      quarter: 1,
      slot: 'arrival',
      acknowledgedAt: '2025-09-12T17:30:00Z',
      checkIn: 'kept' | 'tweaked' | 'halfway',  // mirrors markUpgrade checkIn values
    },
  ],
  abandonedMoves: [                      // tried-and-failed or no-fit
    {
      id: 'arrival.walking-arrival',
      quarter: 2,
      slot: 'arrival',
      reason: 'tried-failed' | 'no-fit' | 'skipped',
      abandonedAt: '...',
      note: 'kid refused' | '',           // free-text, optional
    },
  ],
  swappedMoves: [                         // history of swaps
    { from: 'arrival.backyard-first', to: 'arrival.front-step', quarter: 1, at: '...' },
  ],
  customMoves: [                          // moves the family invented
    { slot: 'arrival', quarter: 1, text: 'we put the shoes by the front door', at: '...' },
  ],

  // check-ins + milestones
  checkIns: [
    { quarter: 1, at: '2025-10-15T19:00:00Z',
      responses: { held: ['arrival.backyard-first'], broke: ['change.shoes-garage'] } },
  ],
  milestones: [
    { quarter: 1, id: 'first-full-week', achievedAt: '2025-12-22T20:00:00Z' },
  ],

  // lineage guards
  shownIds: [],                           // cap at ~30; mirror of architectural.shownIds
  history: [],                            // append-only event log, cap at 500 (mirrors history cap)
}
```

### F.2 How it changes other parts of the app

| Existing piece | Reads `state.reset` to do what |
| --- | --- |
| `reading.js` P3 | References the current quarter + the most recent acknowledged move. "You're 7 weeks into the year. The Q2 reset built on the Q1 arrival move that's still holding." |
| `localRecommendations.js` | Biases weekly picks: 30% chance a weekly pick is a Reset-referenced nudge if there are pending moves. |
| `WeeklyPlan.jsx` | Adds a "Reset move 2 still pending?" line at the top when the active Reset has 1+ unacknowledged moves. |
| `TodaysUpgrade.jsx` | Renders the Reset card on the dashboard for families with `state.reset.currentQuarter > 0`. |
| `scoring.js` | Acknowledged moves add lift to one of the 6 dimensions (mirrors `applyHistoryLift`). |

### F.3 What the lineage doesn't do

- It does not auto-suggest Q2's moves when Q1's are done. The Q2 ship is gated by the calendar (week 14), not by Q1 completion. A family that failed Q1 still gets Q2 — the *content* of Q2 adapts, not the *timing*.
- It does not carry state across subscriptions. If the family re-subscribes for year 2, the lineage starts fresh but the familySignals carry over (so the swap menu remembers "no garage" for life).
- It does not track the *kids'* response. Only the parent's mark. A move the kids hated but the parent marked "kept" is "kept."

---

## G. Honest gaps and falloff points

### G.1 The Q3 cliff

The Q3 cliff is real and this design only partially addresses it. The mitigations are:

- **Q3 ships fewer moves** (3 vs. 5). The card reads "hold, don't add."
- **The check-in is lower-effort** ("are we still doing it at 50%?").
- **The swap menu is pre-warmed** with the family's already-swapped-in moves.

What this *doesn't* solve:
- Q3 falls in summer (US school calendar). The family is on vacation, the routine is broken, the Resets assume the schedule. The Q3 move set needs a *summer variant* and a *school-year variant* — this isn't in the brief.
- Q3 is also when one of the two working parents typically renegotiates their hours. The schedule input may go stale. The Reset doesn't re-pick the window mid-year.
- A 50% Q3 hold is the realistic best case. The design assumes the family can hold; the data should be honest that 30–50% of families will fall off entirely by week 30.

### G.2 What the design does NOT cover

- **The second kid.** The brief assumes one kid (or a kid-cohort). The moves library needs per-age variants, and the family with a 3-year-old and a 10-year-old will get moves that fit neither. The `kidsAges` filter can hide moves but can't *bridge* age gaps. A "kid-range" slot for mixed-age families is missing.
- **The second parent.** The `mom` slot is singular. The design assumes one primary caregiver in the home, with the other as occasional support. Partner-misaligned families (one parent does outside, one does screens) have no moves that bridge the disagreement.
- **Divorced/co-parenting families.** The Reset assumes one home. The Q2 "third place" is impossible if the kid is at the other parent's house on alternating weeks. The lineage doesn't track *which home the kid is at this week*.
- **The after-dark window.** All four named windows are daytime. The after-dinner window is referenced in the brief's "boundary" slot but not as a full Reset window. Working families who can't get the kids outside in daylight hours have no quarter designed for them.
- **The "we already do this" family.** The catalog assumes the family is at zero. A family that already has the backyard routine but lacks the neighborhood piece is served by the *swap* menu but not by the *quarter structure*. There's no "skip Q1" path.
- **The "we tried everything and the kid won't" family.** The lineage tracks abandoned moves but doesn't *suggest* "maybe this isn't the right quarter for this family." A "pause the Reset" path is missing.
- **The cost of the moves.** Some moves need gear (scooters, a gate, climbing boulder). The current "screens default" + "gear inventory" inputs are the start, but the moves library doesn't tag moves by *what they require* explicitly enough to swap when the family can't afford it.
- **The school calendar.** All four quarters assume "months 1–3" = "fall in school." Families in the southern hemisphere, homeschool families, and families with summer-break-from-school timing get a quarter structure that doesn't match their year.
- **The reading P3 reference.** `reading.js` generates P3 from `obstacle(profile)` and the lowest-dimension. A meaningful Reset-aware P3 means threading `state.reset.currentQuarter` and `state.reset.acknowledgedMoves.length > 0` into the generator. The current P3 is generic; a Reset-aware P3 is a separate small refactor.

### G.3 Where families fall off (predicted)

- **Week 3** (first nudge week). If the family hasn't done move 1 by week 3, the lineage should *lower the move's effort tier* in the swap menu, not surface the same move again.
- **Week 13** (Q1 milestone). The milestone needs to be celebratory, not evaluative. A family that didn't hit "first full week" by week 13 needs a reframe, not a fail.
- **Week 26** (Q2 milestone). 30–40% of families will not have established a regular Saturday by week 26. The Q3 Reset needs to know this and ship in "low mode."
- **Week 36** (Q3 check-in). The lowest-effort check-in. If a family skips this, the system should *auto-pause the Reset* and surface "what would make this work again?" rather than sending another nudge.
- **Week 52** (year-end milestone). 50–60% of families will not have a "permanent" Q4 move by week 52. The year-end milestone should celebrate *what held*, not what was added.

### G.4 What would tip this from "good" to "great"

- **A pre-quarter preview at week N-1.** "Next week we ship the Q2 Reset. Here are the 5 moves. Mark any you want to skip." A 2-minute pre-flight before each quarter reduces the Q-launch overwhelm.
- **A between-quarter reflection card.** Not the check-in (which is monthly), but a 5-minute mid-quarter "what's working / what's not" at week 7, 19, 31, 43. These are the weeks the swap menu is most useful.
- **A "do this with me" thread on the Q1 move.** The hardest part of the Q1 reset is that one parent has to set it up. A 4-step "set up the backyard" walkthrough with photos and a 30-min time estimate would prevent the "I never got around to it" dropout.
- **A kid-facing view.** The current design is parent-only. The "kids know the move is the move" piece is missing. A simple 1-line "your move this week" that the kid sees (text, sticker, fridge magnet) is the difference between "parent reminder" and "house rule."

### G.5 Bottom line

The 120–130 move records are enough for one year of one family. The lineage model is enough to adapt to what the family has done. The 52-week calendar is realistic but optimistic — 30–50% of families will fall off in Q3, and the design needs to admit that and ship a "low mode" Q3 rather than pretending every family finishes the year.

The honest gap is the **after-dark window** and the **second-parent misalignment**. The brief covers the primary caregiver's hardest daytime window well. It does not cover the family's hardest window if the hardest window is *not* a daytime window. A Reset v2 should add a "dinner-to-bed" window as a first-class quarter option, not a slot variant.
