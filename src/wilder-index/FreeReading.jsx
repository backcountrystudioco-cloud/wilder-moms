import { useState } from 'react'
import FreePitch from './FreePitch'
import FreeAssessment from './FreeAssessment'
import FreeResult from './FreeResult'
import { generateFreeReading } from './freeReadingGenerator'
import { Link } from 'react-router-dom'

// The free reading flow:
//   pitch -> assessment -> result -> [unlock -> full index, or restart]
//
// State is intentionally not persisted — the free reading is a one-shot
// value exchange, not the dashboard.

export default function FreeReading() {
  const [stage, setStage] = useState('pitch')
  const [reading, setReading] = useState(null)

  const handleComplete = ({ scores, profile }) => {
    const result = generateFreeReading(profile, scores)
    setReading(result)
    setStage('result')
  }

  const handleUnlock = () => {
    // The full Wilder Index takes the user through the deeper onboarding
    // and into the dashboard.
    window.location.href = '/'
  }

  const handleRestart = () => {
    setReading(null)
    setStage('pitch')
  }

  return (
    <div className="relative">
      <div className="absolute top-5 left-5 z-10">
        <Link to="/" className="text-inkll text-xs hover:text-ink transition-colors">
          Back to home
        </Link>
      </div>

      {stage === 'pitch' && (
        <FreePitch onStart={() => setStage('assessment')} onSkip={() => (window.location.href = '/')} />
      )}
      {stage === 'assessment' && <FreeAssessment onComplete={handleComplete} />}
      {stage === 'result' && (
        <FreeResult reading={reading} onUnlock={handleUnlock} onRestart={handleRestart} />
      )}
    </div>
  )
}
