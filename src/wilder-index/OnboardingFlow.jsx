import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import { QUESTIONS, CONTEXT_QUESTIONS, SPECIFICS_QUESTIONS } from './questions'
import { DIMENSIONS, DIMENSION_ORDER, bandFor } from './dimensions'
import { computeScores, summarize } from './scoring'
import { useWilderIndex } from './WilderIndexContext'

const chapterIntro = {
  belonging: {
    title: 'Your People',
    eyebrow: 'Chapter 1 of 7',
    line: 'Familiar faces, places to pause, a block that knows you. Five quick questions.',
  },
  independence: {
    title: 'Room to Roam',
    eyebrow: 'Chapter 2 of 7',
    line: 'Routes a child can describe. Crossings they can read. Five quick questions.',
  },
  wonder: {
    title: 'Everyday Wonder',
    eyebrow: 'Chapter 3 of 7',
    line: 'Small reasons to stop and look. Five quick questions.',
  },
  restoration: {
    title: 'Places to Exhale',
    eyebrow: 'Chapter 4 of 7',
    line: 'Where you can sit, breathe, and come back calmer. Five quick questions.',
  },
  dailyNature: {
    title: 'Nature in the Routine',
    eyebrow: 'Chapter 5 of 7',
    line: 'Trees, leaves, bugs, weather — on the way, not on the itinerary. Five quick questions.',
  },
  adventure: {
    title: 'Your Adventure Edge',
    eyebrow: 'Chapter 6 of 7',
    line: 'Manageable challenge that grows with them. Five quick questions.',
  },
  specifics: {
    title: 'Your Specifics',
    eyebrow: 'Chapter 7 of 7',
    line: 'A few details about your home, your block, and your actual days. This is what makes the suggestions specific.',
  },
}

function buildQuestionPlan() {
  const chapters = DIMENSION_ORDER.map((dim) => ({
    dim,
    title: chapterIntro[dim].title,
    eyebrow: chapterIntro[dim].eyebrow,
    line: chapterIntro[dim].line,
    questions: QUESTIONS.filter((q) => q.dimension === dim),
  }))
  chapters.push({
    dim: 'specifics',
    title: chapterIntro.specifics.title,
    eyebrow: chapterIntro.specifics.eyebrow,
    line: chapterIntro.specifics.line,
    questions: SPECIFICS_QUESTIONS,
  })
  return { chapters }
}

// 4 short reading cards shown before the field check begins. Mom reads first,
// answers second. The "why we exist" copy is the brand intro that used to live
// on a separate landing page.
const BRAND_CARDS = [
  {
    eyebrow: 'Before we start · 1 of 4',
    title: 'The question we start from.',
    body: 'What kind of outdoor place would a tired working mom choose over sitting on the couch after work? Not a playground that needs her to lead. A place where children get absorbed in their own small world, while she gets a minute to exhale.',
    cta: 'Continue reading',
  },
  {
    eyebrow: 'Before we start · 2 of 4',
    title: 'Five things we believe.',
    body: '',
    principles: true,
    cta: 'Continue reading',
  },
  {
    eyebrow: 'Before we start · 3 of 4',
    title: 'From an architect + a mother.',
    body: 'When the environment restores the mother, children get longer, less interrupted stretches of independent exploration too. Wilder sits at the seam of these two truths: better childhoods can begin with giving her somewhere to sit.',
    cta: 'One more',
  },
  {
    eyebrow: 'Before we start · 4 of 4',
    title: 'How this works.',
    body: 'You\'ll answer roughly thirty quick questions about how your week already feels, then a few details about your home and your block. From there, we read where you are, and from then on we suggest one small change at a time — a chair by the door, a new route, a pot of mint.',
    cta: 'Begin the field check',
  },
]

const PRINCIPLES = [
  'Children need daily freedom more than occasional adventure.',
  'A neighborhood matters more than a backyard.',
  'The best play has no instructions.',
  'Parents need restoration too.',
  'Connection happens in repeated places.',
]

function BrandCards({ cardIndex, onNext, onBack, onSkip }) {
  const card = BRAND_CARDS[cardIndex]
  if (!card) return null
  const isLast = cardIndex === BRAND_CARDS.length - 1
  return (
    <motion.div
      key={`brand-${cardIndex}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
      className="max-w-2xl mx-auto pt-12 md:pt-16"
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4 text-center">
        {card.eyebrow}
      </p>
      <h2 className="font-serif font-light text-3xl md:text-5xl text-ink leading-tight mb-7 text-center">
        {card.title}
      </h2>

      {card.principles ? (
        <div className="space-y-3 mb-10 bg-parchment rounded-2xl p-6 md:p-8 border border-inkll/10">
          {PRINCIPLES.map((p, i) => (
            <p key={i} className="font-serif italic text-inkl text-lg leading-snug">
              {p}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-inkl text-lg leading-relaxed mb-10 text-center max-w-xl mx-auto">
          {card.body}
        </p>
      )}

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
        >
          {card.cta}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="flex items-center justify-between mt-10 text-xs">
        {cardIndex > 0 ? (
          <button onClick={onBack} className="text-inkll hover:text-ink">
            ← Back
          </button>
        ) : (
          <span />
        )}
        {isLast ? (
          <button onClick={onSkip} className="text-inkll hover:text-ink">
            Skip the reading →
          </button>
        ) : (
          <span />
        )}
      </div>
    </motion.div>
  )
}

function ChapterIntro({ chapter, onContinue, onSkip }) {
  return (
    <motion.button
      type="button"
      key={`intro-${chapter.dim}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      onClick={onContinue}
      className="max-w-xl mx-auto text-center pt-16 pb-10 px-4 w-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 rounded-2xl"
      aria-label={`Begin ${chapter.title}`}
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
        {chapter.eyebrow}
      </p>
      <h2 className="font-serif font-light text-4xl md:text-5xl text-ink leading-tight mb-5">
        {chapter.title}
      </h2>
      <p className="text-inkl text-base leading-relaxed max-w-md mx-auto mb-10">
        {chapter.line}
      </p>
      <span
        className="inline-flex items-center gap-2 bg-ember text-white px-7 py-3 rounded-full font-medium text-sm group-hover:bg-terra transition-colors"
      >
        Begin chapter
        <span aria-hidden="true">→</span>
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => { e.stopPropagation(); onSkip() }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation()
            e.preventDefault()
            onSkip()
          }
        }}
        className="block mx-auto mt-4 text-inkll text-xs hover:text-ink transition-colors cursor-pointer"
      >
        Skip the rest of the field check
      </span>
    </motion.button>
  )
}

function SpecificsCard({ question, value, onChange, onBack, onNext, isLast }) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto"
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
        {question.chapter}
      </p>
      <h3 className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-2">
        {question.text}
      </h3>
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
                  onChange(next)
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
      ) : question.type === 'textarea' ? (
        <textarea
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full p-4 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink resize-none mb-6 font-sans text-sm"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
          {question.options.map((opt) => {
            const isSelected = value === opt.value
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setTimeout(() => onNext(), 220)
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
        <button onClick={onBack} className="text-inkll hover:text-ink transition-colors">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="text-ember hover:text-terra font-medium"
        >
          {isLast ? 'See your reading →' : 'Continue →'}
        </button>
      </div>
    </motion.div>
  )
}

function QuestionCard({ question, value, onChange, onBack, onNext, isLast }) {
  const options = question.options
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto"
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
        {question.chapter}
      </p>
      <h3 className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-2">
        {question.text}
      </h3>
      {question.sub && (
        <p className="text-inkl text-sm mb-7 max-w-lg">{question.sub}</p>
      )}
      {!question.sub && <div className="mb-7" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
        {options.map((opt) => {
          const isSelected = value === opt.value
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setTimeout(() => onNext(), 220)
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

      <div className="flex items-center justify-between text-xs">
        <button
          onClick={onBack}
          className="text-inkll hover:text-ink transition-colors"
        >
          ← Back
        </button>
        <span className="text-inkll">
          {isLast ? 'Last question in this chapter' : 'Pick one to continue'}
        </span>
      </div>
    </motion.div>
  )
}

function ContextStep({ answers, onChange, onBack, onNext, isLast }) {
  const question = CONTEXT_QUESTIONS[answers._index] || CONTEXT_QUESTIONS[0]
  const idx = CONTEXT_QUESTIONS.findIndex((q) => q.id === question.id)
  const total = CONTEXT_QUESTIONS.length

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto"
    >
      <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
        Optional context · {idx + 1} of {total}
      </p>
      <h3 className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-2">
        {question.text}
      </h3>
      {question.sub && <p className="text-inkl text-sm mb-6 max-w-lg">{question.sub}</p>}

      {question.type === 'text' ? (
        <input
          type="text"
          value={answers[question.id] || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink mb-6"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {question.options.map((opt) => {
            const isSelected = answers[question.id] === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(question.id, opt.value)
                  setTimeout(() => onNext(), 220)
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
        <button onClick={onBack} className="text-inkll hover:text-ink transition-colors">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="text-ember hover:text-terra font-medium"
        >
          {isLast ? 'See my Wilder Index →' : 'Continue →'}
        </button>
      </div>
    </motion.div>
  )
}

function Welcome({ onStart }) {
  const { isSignedIn } = useAuth()
  return (
    <div className="overflow-hidden">
      {/* TOP HEADER — auth controls so returning members can sign in from the landing */}
      <header className="px-6 pt-6 md:pt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-serif text-lg md:text-xl text-ink tracking-tight">
            Wilder <span className="text-ember">Moms</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal" forceRedirectUrl="/">
                  <button
                    type="button"
                    className="font-sans font-medium text-sm px-3 md:px-4 py-2 text-ink hover:text-ember transition-colors"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl="/">
                  <button
                    type="button"
                    className="bg-ember text-white font-sans font-medium text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-forest transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-16 md:pt-24 pb-14 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-7">
            Wilder Moms · A five-minute reading
          </p>
          <h1 className="font-serif font-light text-5xl md:text-7xl text-ink leading-[0.95] mb-10">
            Your <em className="text-ember">Wilder Habitat.</em>
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-ink leading-snug max-w-2xl mx-auto">
            The life you want for your family isn't built in one big moment. It's built in the small choices you make every day.
          </p>
        </div>
      </section>

      {/* BLUEPRINT */}
      <section className="bg-parchment px-6 py-16 md:py-20 border-y border-inkll/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-inkl text-lg md:text-xl leading-relaxed font-serif">
            Your Wilder Habitat is a <em className="text-ember">personalized blueprint</em> for those choices.
          </p>
        </div>
      </section>

      {/* FIVE MINUTES + UPGRADES — two-column body */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
          <p className="text-inkl text-base md:text-lg leading-relaxed">
            In just five minutes, we'll learn how your family lives—your home, your
            neighborhood, and your weekly rhythms. Then we'll create a living plan
            that grows with you, delivering one <span className="text-ink">personalized Habitat Shift</span> at a time.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed">
            Each habitat shift is simple, practical, and grounded in research, helping
            you spend less time wondering what to do next and more time creating
            the kind of childhood you've always imagined.
          </p>
        </div>
      </section>

      {/* NO GRID */}
      <section className="bg-parchment px-6 py-16 md:py-20 border-y border-inkll/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {['No moving.', 'No remodeling.', 'No packed schedules.', 'No guilt.'].map((line) => (
              <p key={line} className="font-serif italic text-ink text-2xl md:text-3xl leading-snug">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* JUST THOUGHTFUL */}
      <section className="px-6 py-14 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-ink text-lg md:text-xl leading-relaxed">
            Just thoughtful, high-impact improvements that make everyday life{' '}
            <em className="font-serif">more connected, more adventurous, and more meaningful.</em>
          </p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-ink text-white px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif font-light text-3xl md:text-5xl leading-tight">
            Because the best childhoods aren't accidental.
          </p>
          <p className="font-serif italic text-gold text-3xl md:text-5xl leading-tight mt-3">
            They're built, one small decision at a time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <p className="text-inkll text-xs uppercase tracking-[0.18em] mb-5">
            Five minutes · Seven chapters
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-ember text-white px-10 py-4 rounded-full font-medium text-base hover:bg-terra transition-colors"
          >
            Build my Wilder Habitat
            <span aria-hidden="true">→</span>
          </button>
          <Link
            to="/"
            className="block mt-5 text-inkll text-xs hover:text-ink transition-colors"
          >
            Not now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function OnboardingFlow({ onCompleted }) {
  const { setAnswer, setContextAnswer, completeOnboarding } = useWilderIndex()
  const { chapters } = useMemo(buildQuestionPlan, [])
  const [step, setStep] = useState({ kind: 'welcome' })
  const [localContext, setLocalContext] = useState({ _index: 0 })

  const startChapter = useCallback(
    (dim) => setStep({ kind: 'chapter-intro', dim, qIndex: 0 }),
    []
  )

  const startBrandCards = useCallback(
    () => setStep({ kind: 'brand-cards', cardIndex: 0 }),
    []
  )

  const advanceBrandCards = useCallback(() => {
    setStep((prev) => {
      if (prev.kind !== 'brand-cards') return prev
      const next = prev.cardIndex + 1
      if (next >= BRAND_CARDS.length) {
        return { kind: 'chapter-intro', dim: 'belonging' }
      }
      return { kind: 'brand-cards', cardIndex: next }
    })
  }, [])

  const backBrandCards = useCallback(() => {
    setStep((prev) => {
      if (prev.kind !== 'brand-cards') return prev
      if (prev.cardIndex === 0) return { kind: 'welcome' }
      return { kind: 'brand-cards', cardIndex: prev.cardIndex - 1 }
    })
  }, [])

  const onAnswer = useCallback(
    (qid, value) => {
      setAnswer(qid, value)
    },
    [setAnswer]
  )

  const onContextChange = useCallback(
    (qid, value) => {
      setContextAnswer(qid, value)
      setLocalContext((prev) => ({ ...prev, [qid]: value }))
    },
    [setContextAnswer]
  )

  const advanceChapter = useCallback(
    (dim, qIndex) => {
      if (qIndex + 1 < chapters.find((c) => c.dim === dim).questions.length) {
        setStep({ kind: 'question', dim, qIndex: qIndex + 1 })
      } else {
        if (dim === 'specifics') {
          setStep({ kind: 'context', _index: 0 })
        } else {
          const idx = DIMENSION_ORDER.indexOf(dim)
          if (idx + 1 < DIMENSION_ORDER.length) {
            setStep({ kind: 'chapter-intro', dim: DIMENSION_ORDER[idx + 1] })
          } else {
            setStep({ kind: 'chapter-intro', dim: 'specifics' })
          }
        }
      }
    },
    [chapters]
  )

  const advanceContext = useCallback(() => {
    const next = (step._index || 0) + 1
    if (next < CONTEXT_QUESTIONS.length) {
      setStep({ kind: 'context', _index: next })
      setLocalContext((p) => ({ ...p, _index: next }))
    } else {
      completeOnboarding()
      if (onCompleted) onCompleted()
    }
  }, [step, completeOnboarding, onCompleted])

  const goBack = useCallback(() => {
    if (step.kind === 'question') {
      if (step.qIndex > 0) {
        setStep({ ...step, qIndex: step.qIndex - 1 })
      } else {
        setStep({ kind: 'chapter-intro', dim: step.dim })
      }
    } else if (step.kind === 'chapter-intro') {
      const idx = DIMENSION_ORDER.indexOf(step.dim)
      if (idx > 0) {
        const prevDim = DIMENSION_ORDER[idx - 1]
        const prevChapter = chapters.find((c) => c.dim === prevDim)
        setStep({ kind: 'question', dim: prevDim, qIndex: prevChapter.questions.length - 1 })
      } else if (step.dim === 'specifics') {
        const lastDim = DIMENSION_ORDER[DIMENSION_ORDER.length - 1]
        const lastChapter = chapters.find((c) => c.dim === lastDim)
        setStep({ kind: 'question', dim: lastDim, qIndex: lastChapter.questions.length - 1 })
      } else {
        // Chapter 1 — back to the brand cards reading
        setStep({ kind: 'brand-cards', cardIndex: BRAND_CARDS.length - 1 })
      }
    } else if (step.kind === 'brand-cards') {
      backBrandCards()
    } else if (step.kind === 'context') {
      const i = step._index || 0
      if (i > 0) {
        setStep({ kind: 'context', _index: i - 1 })
        setLocalContext((p) => ({ ...p, _index: i - 1 }))
      } else {
        setStep({ kind: 'chapter-intro', dim: 'specifics' })
      }
    }
  }, [step, chapters, backBrandCards])

  let body = null
  if (step.kind === 'welcome') {
    body = <Welcome onStart={startBrandCards} />
  } else if (step.kind === 'brand-cards') {
    body = (
      <BrandCards
        cardIndex={step.cardIndex}
        onNext={advanceBrandCards}
        onBack={goBack}
        onSkip={() => setStep({ kind: 'chapter-intro', dim: 'belonging' })}
      />
    )
  } else if (step.kind === 'chapter-intro') {
    const chapter = chapters.find((c) => c.dim === step.dim)
    body = (
      <ChapterIntro
        chapter={chapter}
        onContinue={() => setStep({ kind: 'question', dim: step.dim, qIndex: 0 })}
        onSkip={() => completeOnboarding() || (onCompleted && onCompleted())}
      />
    )
  } else if (step.kind === 'question') {
    const chapter = chapters.find((c) => c.dim === step.dim)
    const question = chapter.questions[step.qIndex]
    const Card = step.dim === 'specifics' ? SpecificsCard : QuestionCard
    body = (
      <Card
        question={question}
        value={undefined}
        onChange={(v) => onAnswer(question.id, v)}
        onBack={goBack}
        onNext={() => advanceChapter(step.dim, step.qIndex)}
        isLast={step.qIndex === chapter.questions.length - 1}
      />
    )
  } else if (step.kind === 'context') {
    body = (
      <ContextStep
        answers={localContext}
        onChange={onContextChange}
        onBack={goBack}
        onNext={advanceContext}
        isLast={(step._index || 0) === CONTEXT_QUESTIONS.length - 1}
      />
    )
  }

  return (
    <div className="min-h-screen bg-cream px-6 pt-24 pb-20">
      <AnimatePresence mode="wait">{body}</AnimatePresence>
    </div>
  )
}
