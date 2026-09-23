import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DIMENSIONS } from './dimensions'
import { generateReading } from './reading'
import { generateWeeklyPlan } from './planGenerator'
import { applyPersonalization } from './catalog'
import { describeLocation } from './personalize'
import { findPrototypeById } from './neighborhoodPrototypes'
import {
  buildRecommendationsRequest,
  fetchLocalRecommendations,
  KIND_LABELS,
} from './localRecommendations'
import ScoreArc from './ScoreArc'

function MiniUpgradeCard({ upgrade, dimension }) {
  const dim = DIMENSIONS[dimension]
  return (
    <div className="bg-white border border-inkll/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: dim?.color }}
        />
        <p className="text-[10px] font-medium uppercase tracking-wider text-inkll">
          {upgrade.meta.eyebrow} · {dim?.name}
        </p>
      </div>
      <h4 className="font-serif text-lg text-ink leading-tight mb-2">
        {upgrade.title}
      </h4>
      <p className="text-inkl text-sm leading-relaxed mb-3 line-clamp-3">
        {upgrade.copy}
      </p>
      <p className="text-inkll text-[11px] italic">
        {upgrade.meta.why}
      </p>
    </div>
  )
}

function LocalRecommendationCard({ rec }) {
  return (
    <div className="bg-white border border-inkll/10 rounded-2xl p-5 h-full flex flex-col">
      <p className="text-[10px] font-medium uppercase tracking-wider text-inkll mb-2">
        {KIND_LABELS[rec.kind] || 'For your week'}
      </p>
      <h4 className="font-serif text-lg text-ink leading-tight mb-2">
        {rec.title}
      </h4>
      <p className="text-inkl text-sm leading-relaxed mb-3 flex-1">
        {rec.action}
      </p>
      <p className="text-inkll text-[11px] italic mb-1">{rec.why}</p>
      <p className="text-inkll text-[10px] uppercase tracking-wider">{rec.time}</p>
    </div>
  )
}

function LocationRecommendations({ profile, scores }) {
  const [state, setState] = useState({ status: 'idle', list: [], source: null })

  useEffect(() => {
    let cancelled = false
    const loc = describeLocation(profile || {})
    const payload = buildRecommendationsRequest({
      profile,
      scores,
      location: {
        displayName: loc.displayName,
        prototypeId: loc.prototypeId,
        prototypeName: loc.prototypeName,
        climateBand: loc.climateBand,
      },
    })
    setState({ status: 'loading', list: [], source: null })
    fetchLocalRecommendations(payload).then((res) => {
      if (cancelled) return
      setState({ status: 'ready', list: res.recommendations, source: res.source })
    })
    return () => { cancelled = true }
  }, [profile, scores])

  if (state.status === 'idle') return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.95 }}
      className="mb-12"
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-2 text-center">
        For {describeLocation(profile || {}).displayName}
      </p>
      <p className="text-inkl text-sm text-center max-w-md mx-auto mb-6">
        Four small moves for this week, picked for your block and your week.
        {state.source === 'fallback' && (
          <span className="block text-inkll italic mt-1 text-xs">
            Based on your block — refresh to refine once Wilder Companion is back.
          </span>
        )}
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {state.status === 'loading'
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/60 border border-inkll/10 rounded-2xl p-5 h-full"
              >
                <div className="h-3 w-16 bg-inkll/10 rounded mb-3" />
                <div className="h-5 w-3/4 bg-inkll/10 rounded mb-3" />
                <div className="h-3 w-full bg-inkll/10 rounded mb-1.5" />
                <div className="h-3 w-5/6 bg-inkll/10 rounded mb-3" />
                <div className="h-2.5 w-2/3 bg-inkll/10 rounded" />
              </div>
            ))
          : state.list.map((rec, i) => (
              <LocalRecommendationCard key={`${rec.kind}-${i}`} rec={rec} />
            ))}
      </div>
    </motion.section>
  )
}

export default function RevealScreen({ scores, summary, profile, onContinue }) {
  const [stagger, setStagger] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setStagger(1), 200)
    return () => clearTimeout(t)
  }, [])

  const reading = generateReading(profile || {}, scores)
  const weeklyPlan = generateWeeklyPlan(profile || {}, scores)
  const loc = describeLocation(profile || {})
  const prototype = findPrototypeById(loc.prototypeId)

  const strengthNames = (summary?.strengths || []).map((id) => DIMENSIONS[id]?.name).filter(Boolean)
  const opportunityName = summary?.opportunity ? DIMENSIONS[summary.opportunity].name : null

  return (
    <div className="min-h-screen bg-cream px-6 pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Your Wilder Habitat
          </p>
          <h1 className="font-serif font-light text-4xl md:text-6xl text-ink leading-[0.95] mb-5">
            This is your family's <em className="text-ember">pattern.</em>
          </h1>
          <p className="text-inkl text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Six small readings, drawn quietly from the life you're already living.
            More a beginning than a grade.
          </p>
        </motion.div>

        {strengthNames.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center text-inkl font-serif italic text-base mb-2"
          >
            Your strength{strengthNames.length > 1 ? 's' : ''}: {strengthNames.join(' and ')}.
          </motion.p>
        )}
        {opportunityName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center text-inkl font-serif italic text-base mb-6"
          >
            One small opportunity: <span className="text-ember">{opportunityName}</span>.
          </motion.p>
        )}

        {prototype && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-ember text-[10px] font-medium uppercase tracking-[0.2em] mb-2">
              Your neighborhood pattern
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-1">
              {loc.displayName !== 'your area' ? `${loc.displayName} · ` : ''}{prototype.name}
            </h2>
            <p className="text-inkl font-serif italic text-sm md:text-base max-w-md mx-auto">
              {prototype.blurb}
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-14">
          {Object.keys(DIMENSIONS).map((dim, i) => (
            <motion.div
              key={dim}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: stagger, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="flex justify-center"
            >
              <ScoreArc dimension={dim} score={scores[dim]} size="lg" animated />
            </motion.div>
          ))}
        </div>

        {reading.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mb-14"
          >
            <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4 text-center">
              A reading
            </p>
            <div className="bg-white rounded-3xl border border-inkll/10 p-7 md:p-10">
              {reading.map((para, i) => (
                <p
                  key={i}
                  className={`text-inkl font-serif text-lg leading-relaxed ${
                    i < reading.length - 1 ? 'mb-5' : ''
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.section>
        )}

        {weeklyPlan.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="mb-12"
          >
            <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-2 text-center">
              Your week
            </p>
            <p className="text-inkl text-sm text-center max-w-md mx-auto mb-6">
              Three small changes for the next seven days, picked for your home and your block.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {weeklyPlan.map((u) => (
                <MiniUpgradeCard
                  key={u.id}
                  upgrade={u}
                  dimension={u.dimension}
                />
              ))}
            </div>
            <p className="text-inkll text-xs text-center mt-5 max-w-md mx-auto italic">
              And once a month — one architectural move for the home itself,
              a change to the space rather than the day.
            </p>
          </motion.section>
        )}

        <LocationRecommendations profile={profile} scores={scores} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-inkll text-sm max-w-md mx-auto mb-6">
            The whole thing is the regular outside place — same trail walked often,
            neighbors closer than you'd think.
          </p>
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
          >
            Open my dashboard
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
