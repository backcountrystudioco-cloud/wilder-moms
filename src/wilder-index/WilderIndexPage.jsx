import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { WilderIndexProvider, useWilderIndex } from './WilderIndexContext'
import OnboardingFlow from './OnboardingFlow'
import RevealScreen from './RevealScreen'
import TodayPanel from './TodayPanel'
import ScoreDashboard from './ScoreDashboard'
import WeeklyPlan from './WeeklyPlan'
import MonthlyArchitectural from './MonthlyArchitectural'
import AchievementsShelf from './AchievementsShelf'
import { SyncIndicator, CloudSyncToast } from './CloudSyncIndicator'
import { DIMENSIONS } from './dimensions'

const REVEAL_KEY = 'wilder_moms_index_reveal_seen'

function IndexHeader({ onReset, familyName }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-ember font-sans font-medium text-xs uppercase tracking-[0.2em]">
          The Wilder Index
        </span>
        <span className="w-1 h-1 rounded-full bg-inkll" />
        <span className="text-inkll font-sans text-xs uppercase tracking-[0.15em]">
          For {familyName || 'your family'}
        </span>
        <SyncIndicator />
      </div>
      <h1 className="font-serif font-light text-4xl md:text-5xl text-ink leading-tight">
        Read your <em className="text-ember">neighborhood.</em>
      </h1>
      <p className="text-inkl text-sm mt-3 max-w-xl">
        Six dimensions, a written reading, and a sequenced week of small changes —
        picked for your home, your block, and the life you actually live.
      </p>
      <button
        onClick={onReset}
        className="text-inkll text-xs mt-3 hover:text-ink transition-colors"
      >
        Retake the field check
      </button>
    </div>
  )
}

function TodayStat({ label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-inkll/10 p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-inkll">{label}</p>
      <p className="font-serif text-2xl text-ink mt-1">{value}</p>
      {sub && <p className="text-xs text-inkll mt-0.5">{sub}</p>}
    </div>
  )
}

function Dashboard() {
  const { state, scores, summary, achievements, newlyUnlocked, resetIndex } = useWilderIndex()
  const totalUpgrades = state.history.filter((h) => h.checkIn === 'we-did-it' || h.checkIn === 'changed').length
  const totalActive = state.activeDays.length
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (newlyUnlocked && newlyUnlocked.length > 0) {
      const a = newlyUnlocked[newlyUnlocked.length - 1]
      const found = (achievements || []).find((x) => x.id === a)
      setToast(found ? found.title : a)
      const t = setTimeout(() => setToast(null), 4500)
      return () => clearTimeout(t)
    }
  }, [newlyUnlocked, achievements])

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <IndexHeader
          onReset={() => {
            if (window.confirm('Reset the Wilder Index? Your scores and history will be cleared.')) {
              resetIndex()
              try { window.localStorage.removeItem(REVEAL_KEY) } catch (e) {}
            }
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TodayPanel
            profile={{ ...state.onboarding, answers: state.onboarding.answers }}
            scores={scores}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <ScoreDashboard scores={scores} summary={summary} />
        </motion.div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <TodayStat label="Habitat shifts done" value={totalUpgrades} sub="since you started" />
          <TodayStat label="Active days" value={totalActive} sub="any check-in counts" />
          <TodayStat
            label="Opportunity"
            value={summary?.opportunity ? DIMENSIONS[summary.opportunity].name : '—'}
            sub="the one we'd grow"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6"
          id="this-week"
        >
          <WeeklyPlan
            profile={{ ...state.onboarding, answers: state.onboarding.answers }}
            scores={scores}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6"
          id="this-month"
        >
          <MonthlyArchitectural
            profile={{ ...state.onboarding, answers: state.onboarding.answers }}
            scores={scores}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <AchievementsShelf achievements={achievements} />
        </motion.div>

        <p className="text-inkll text-xs text-center mt-8">
          <Link to="/" className="hover:text-ink transition-colors">← Back to home</Link>
        </p>

        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-cream px-5 py-3 rounded-full shadow-xl text-sm flex items-center gap-2"
          >
            <span>Unlocked:</span>
            <span className="font-serif italic">{toast}</span>
          </motion.div>
        )}

        <CloudSyncToast />
      </div>
    </div>
  )
}

function OnboardingGate({ onDone }) {
  return <OnboardingFlow onCompleted={onDone} />
}

function IndexInner() {
  const { state, scores, summary } = useWilderIndex()
  const [seenReveal, setSeenReveal] = useState(() => {
    try { return window.localStorage.getItem(REVEAL_KEY) === '1' } catch (e) { return false }
  })

  if (!state.onboarding.completed) {
    return <OnboardingGate onDone={() => { setSeenReveal(false) }} />
  }

  if (!seenReveal && scores) {
    return (
      <RevealScreen
        scores={scores}
        summary={summary}
        profile={{ ...state.onboarding, answers: state.onboarding.answers }}
        onContinue={() => {
          setSeenReveal(true)
          try { window.localStorage.setItem(REVEAL_KEY, '1') } catch (e) {}
        }}
      />
    )
  }

  return <Dashboard />
}

export default function WilderIndexPage() {
  return <IndexInner />
}
