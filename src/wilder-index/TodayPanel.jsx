// TodayPanel — the first surface a returning user sees on the dashboard.
//
// Reads:
//   - profile (state.onboarding.answers)
//   - scores
//   - last 7 days of state.history (who has done what)
//   - the current weekly plan (to surface one idle pick)
//
// Recomposes daily via `todayISO()` as a memo key, so every visit recomputes
// "today" without storing it in state.

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useWilderIndex } from './WilderIndexContext'
import { generateWeeklyPlan } from './planGenerator'
import { DIMENSIONS } from './dimensions'
import { kidsAges, describeHome } from './personalize'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function lastNDays(iso, n) {
  const out = []
  const start = new Date(iso)
  for (let i = 0; i < n; i += 1) {
    const d = new Date(start)
    d.setDate(d.getDate() - i)
    out.push(d.toISOString().slice(0, 10))
  }
  return out
}

function kidsLabel(profile) {
  const ages = kidsAges(profile)
  if (ages.length === 0) return ''
  const last = ages.length === 1 ? ages[0] : `${ages[0]} and ${ages[1]}`
  return ` with your ${last}`
}

function recap(history, days) {
  const daySet = new Set(days)
  const inWindow = history.filter((h) => daySet.has(h.completedAt.slice(0, 10)))
  const done = inWindow.filter((h) => h.checkIn === 'we-did-it' || h.checkIn === 'changed').length
  const skip = inWindow.filter((h) => h.checkIn === 'not-today').length
  if (done + skip === 0) return null
  if (done === 0 && skip > 0) return `${skip} check-in${skip === 1 ? '' : 's'} this week`
  if (done >= 4) return `${done} upgrades this week — your pattern is shaping`
  if (done >= 1) return `${done} upgrade${done === 1 ? '' : 's'} this week — momentum starting`
  return null
}

export default function TodayPanel({ profile, scores }) {
  const { state } = useWilderIndex()
  const dayKey = todayISO()
  const last7 = useMemo(() => lastNDays(dayKey, 7), [dayKey])

  const view = useMemo(() => {
    if (!scores) return null
    const rec = recap(state.history, last7)
    const home = describeHome(profile)
    const weeks = generateWeeklyPlan(profile, scores, state.shownUpgradeIds)
    const todayPick = weeks.find((w) => {
      const matches = state.history.filter((h) => h.id === w.id)
      return matches.length === 0
    }) || weeks[0]
    const arch = state.architectural
    const archMove =
      arch && arch.currentId ? { id: arch.currentId } : null
    const dim = scores
    const opportunityId = Object.keys(DIMENSIONS).sort(
      (a, b) => dim[a] - dim[b]
    )[0]
    return {
      rec,
      home,
      todayPick,
      archMove,
      opportunityId,
      lastVisit: state.activeDays[0] || null,
    }
  }, [state.history, state.shownUpgradeIds, state.architectural, scores, profile, last7])

  if (!view) return null
  const { opportunityId } = view

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-cream rounded-3xl border border-ember/15 p-6 md:p-8 mb-6"
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-2">
        Today · {new Date(dayKey).toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
      </p>
      <h2 className="font-serif text-2xl md:text-3xl text-ink leading-tight">
        {greeting()}{kidsLabel(profile || {})}.
      </h2>
      <p className="text-inkl text-sm mt-2 max-w-xl">
        {view.rec
          ? `${view.rec.charAt(0).toUpperCase()}${view.rec.slice(1)}. The pattern keeps moving.`
          : 'No upgrades yet this week. One small thing today moves the pattern forward.'}
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-3">
        {view.todayPick && (
          <a
            href="#this-week"
            className="block bg-white rounded-2xl border border-inkll/10 p-5 hover:border-ember/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-ember text-[10px] uppercase tracking-widest font-medium">
                Today's pick
              </span>
              {DIMENSIONS[view.todayPick.dimension] && (
                <span
                  className="text-inkll text-[10px] flex items-center gap-1.5"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: DIMENSIONS[view.todayPick.dimension].color }}
                  />
                  {DIMENSIONS[view.todayPick.dimension].name}
                </span>
              )}
            </div>
            <h3 className="font-serif text-lg text-ink leading-snug mb-1">
              {view.todayPick.title}
            </h3>
            <p className="text-inkll text-xs italic">
              {view.todayPick.time} · {view.todayPick.effort} effort
            </p>
          </a>
        )}

        {view.archMove && (
          <a
            href="#this-month"
            className="block bg-parchment rounded-2xl border border-forest/15 p-5 hover:border-forest/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-forest text-[10px] uppercase tracking-widest font-medium">
                This month's architectural move
              </span>
            </div>
            <p className="text-inkl text-sm leading-snug">
              The move for the gap on your chart ({DIMENSIONS[opportunityId]?.name || 'your lowest'}).
              Tap Swap if the timing isn't right.
            </p>
          </a>
        )}
      </div>
    </motion.section>
  )
}
