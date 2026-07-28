import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { computeScores } from './scoring'

const FREQUENCY = [
  { label: 'Never', value: 0 },
  { label: 'Sometimes', value: 1 },
  { label: 'Often', value: 2 },
  { label: 'Most weeks', value: 3 },
  { label: 'Almost always', value: 4 },
]

// 10 questions. One per dimension + context + ages.
// Scoring mirrors the full index so we can call computeScores on these answers
// directly. The free reading uses the resulting score band as guidance only.
const QUESTIONS = [
  {
    id: 'context.area',
    chapter: 'About your home',
    eyebrow: 'Question 1 of 10',
    text: 'Where do you live?',
    type: 'radio',
    options: [
      { label: 'Urban core', value: 'urban' },
      { label: 'Suburban', value: 'suburban' },
      { label: 'Small town', value: 'small_town' },
      { label: 'Rural', value: 'rural' },
    ],
    contextKey: 'context.area',
  },
  {
    id: 'context.homeType',
    chapter: 'About your home',
    eyebrow: 'Question 2 of 10',
    text: 'What kind of home do you live in?',
    type: 'radio',
    options: [
      { label: 'Apartment or condo', value: 'apartment' },
      { label: 'Townhouse', value: 'townhouse' },
      { label: 'House with a yard', value: 'house_yard' },
      { label: 'House without a yard', value: 'house_no_yard' },
    ],
    contextKey: 'context.homeType',
  },
  {
    id: 'context.outdoorSpace',
    chapter: 'About your home',
    eyebrow: 'Question 3 of 10',
    text: 'Do you have a private or shared outdoor space at home?',
    sub: 'A balcony, porch, stoop, shared courtyard, or yard all count.',
    type: 'radio',
    options: [
      { label: 'Yes, private', value: 'private' },
      { label: 'Yes, shared', value: 'shared' },
      { label: 'No', value: 'none' },
    ],
    contextKey: 'context.outdoorSpace',
  },
  {
    id: 'belonging.q5',
    dimension: 'belonging',
    chapter: 'Your People',
    eyebrow: 'Question 4 of 10',
    text: 'Do you have a place at home — porch, stoop, shared step — where neighbors can naturally stop?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'independence.q1',
    dimension: 'independence',
    chapter: 'Room to Roam',
    eyebrow: 'Question 5 of 10',
    text: 'As your child grows, is there a place they could reach on their own — without you driving?',
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
    id: 'wonder.q1',
    dimension: 'wonder',
    chapter: 'Everyday Wonder',
    eyebrow: 'Question 6 of 10',
    text: 'During a short walk, can your child find at least one small thing to stop and look at?',
    sub: 'A bug, a puddle, a strange leaf, a window display.',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'restoration.q2',
    dimension: 'restoration',
    chapter: 'Places to Exhale',
    eyebrow: 'Question 7 of 10',
    text: 'Is there a place to stop near home with a chair, shade, and a view — that doesn\'t require planning?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'dailyNature.q2',
    dimension: 'dailyNature',
    chapter: 'Nature in the Routine',
    eyebrow: 'Question 8 of 10',
    text: 'Is there a small patch of nature close enough to use on an ordinary weekday without driving?',
    sub: 'A tree, a planter, a strip of grass, a stoop garden.',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'adventure.q1',
    dimension: 'adventure',
    chapter: 'Your Adventure Edge',
    eyebrow: 'Question 9 of 10',
    text: 'Is there somewhere nearby where your child can climb, balance, or move fast without entering traffic?',
    type: 'frequency',
    options: FREQUENCY,
  },
  {
    id: 'specifics.kids',
    chapter: 'About your family',
    eyebrow: 'Question 10 of 10',
    text: 'What ages are your kids?',
    sub: 'Pick all that apply.',
    type: 'checkbox',
    multi: true,
    options: [
      { label: 'Under 2', value: '0-2' },
      { label: '2 to 4', value: '2-4' },
      { label: '5 to 7', value: '5-7' },
      { label: '8 to 11', value: '8-11' },
      { label: '12 and up', value: '12+' },
    ],
    specificsKey: 'specifics.kids',
  },
]

function splitAnswers(answers) {
  const dimensionAnswers = {}
  const contextAnswers = {}
  const specificsAnswers = {}
  for (const q of QUESTIONS) {
    const v = answers[q.id]
    if (v === undefined) continue
    if (q.contextKey) contextAnswers[q.contextKey] = v
    else if (q.specificsKey) specificsAnswers[q.specificsKey] = v
    else if (q.dimension) dimensionAnswers[q.id] = v
  }
  return { dimensionAnswers, contextAnswers, specificsAnswers }
}

export default function FreeAssessment({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const question = QUESTIONS[index]
  const isLast = index === QUESTIONS.length - 1
  const progress = ((index + 1) / QUESTIONS.length) * 100

  const value = answers[question.id]

  const canAdvance = useMemo(() => {
    if (question.type === 'checkbox') return Array.isArray(value) && value.length > 0
    return value !== undefined && value !== ''
  }, [question, value])

  const setValue = (v) => setAnswers((prev) => ({ ...prev, [question.id]: v }))

  const handleNext = () => {
    if (!canAdvance) return
    if (isLast) {
      const split = splitAnswers(answers)
      const scores = computeScores(split.dimensionAnswers)
      const profile = {
        answers: split.specificsAnswers,
        contextAnswers: split.contextAnswers,
      }
      onComplete({ scores, profile })
      return
    }
    setIndex((n) => n + 1)
  }

  const handleBack = () => {
    if (index === 0) return
    setIndex((n) => n - 1)
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-inkll mb-2">
            <span>Free reading</span>
            <span>{question.eyebrow}</span>
          </div>
          <div className="h-1 w-full bg-inkll/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ember"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3">
              {question.chapter}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-2">
              {question.text}
            </h2>
            {question.sub && (
              <p className="text-inkl text-sm mb-7 max-w-lg">{question.sub}</p>
            )}
            {!question.sub && <div className="mb-7" />}

            {question.type === 'checkbox' && question.multi ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {question.options.map((opt) => {
                  const selected = Array.isArray(value) ? value.includes(opt.value) : false
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(value) ? value : []
                        const next = current.includes(opt.value)
                          ? current.filter((v) => v !== opt.value)
                          : [...current, opt.value]
                        setValue(next)
                      }}
                      className={`text-left p-4 rounded-xl border-2 transition-all flex items-start gap-2 ${
                        selected
                          ? 'border-ember bg-ember/5 text-ink'
                          : 'border-inkll/20 hover:border-ember/30 text-ink'
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                          selected ? 'bg-ember border-ember' : 'border-inkll/40'
                        }`}
                        aria-hidden="true"
                      >
                        {selected && (
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="font-sans text-sm">{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {question.options.map((opt) => {
                  const isSelected = value === opt.value
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setValue(opt.value)
                        setTimeout(() => {
                          if (isLast) {
                            const next = { ...answers, [question.id]: opt.value }
                            const split = splitAnswers(next)
                            const scores = computeScores(split.dimensionAnswers)
                            const profile = {
                              answers: split.specificsAnswers,
                              contextAnswers: split.contextAnswers,
                            }
                            onComplete({ scores, profile })
                          } else {
                            setIndex((n) => n + 1)
                          }
                        }, 220)
                      }}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-ember bg-ember/5 text-ink'
                          : 'border-inkll/20 hover:border-ember/30 text-ink'
                      }`}
                    >
                      <span className="font-sans text-sm">{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              {index > 0 ? (
                <button onClick={handleBack} className="text-inkll hover:text-ink transition-colors">
                  Back
                </button>
              ) : (
                <span />
              )}
              {question.type === 'checkbox' && (
                <button
                  onClick={handleNext}
                  disabled={!canAdvance}
                  className={`font-medium ${
                    canAdvance ? 'text-ember hover:text-terra' : 'text-inkll/50 cursor-not-allowed'
                  }`}
                >
                  {isLast ? 'See your reading' : 'Continue'}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
