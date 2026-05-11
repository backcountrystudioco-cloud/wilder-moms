import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabase'

const questions = [
  {
    section: 'About You',
    questions: [
      {
        id: 'childAge',
        text: 'How old is your youngest child?',
        type: 'radio',
        options: ['Expecting', 'Under 1 year', '1–3 years', '4–6 years', '7–12 years', '13+']
      },
      {
        id: 'frequency',
        text: 'How often do you actively plan outdoor activities with your kids?',
        type: 'radio',
        options: ['Multiple times a week', 'Weekly', 'A few times a month', 'Rarely', 'Almost never']
      }
    ]
  },
  {
    section: 'Pain Points',
    questions: [
      {
        id: 'barriers',
        text: "What's the biggest thing standing between you and getting outside more with your kids?",
        type: 'radio',
        options: ['Planning takes too much effort', 'Not knowing where to go', 'Kids lose interest quickly', 'Safety concerns', 'Weather uncertainty', 'Lack of time', 'Lack of community/support']
      },
      {
        id: 'missing',
        text: "What's missing from most parenting or outdoor family websites today?",
        type: 'textarea'
      }
    ]
  },
  {
    section: 'Wilder Build',
    questions: [
      {
        id: 'projectTypes',
        text: 'Which kinds of projects would you realistically do with your kids?',
        sub: 'Pick up to 3.',
        type: 'checkbox',
        options: ['Fairy gardens', 'Mud kitchens', 'Raised garden beds', 'Bird feeders or bird houses', 'Nature play spaces', 'Backyard obstacle courses', 'Outdoor sensory stations', 'Forts or hideaways', 'Indoor nature crafts', 'Seasonal decorations using natural materials']
      },
      {
        id: 'realisticLevel',
        text: 'What level of project feels realistic for your family?',
        type: 'radio',
        options: ['10-minute mini activities', 'Simple weekend projects', 'Half-day outdoor builds', 'Larger multi-day projects', 'Depends on how guided it is']
      },
      {
        id: 'projectWorth',
        text: 'What would make a Wilder Build project worth doing?',
        sub: 'Pick top 2.',
        type: 'checkbox',
        options: ['Easy setup', 'Uses inexpensive materials', 'Kids stay engaged', 'Educational value', 'Encourages outdoor play', 'Creates something lasting', 'Feels creative and meaningful', 'Helps reduce screen time']
      }
    ]
  },
  {
    section: 'Product Validation',
    questions: [
      {
        id: 'indispensable',
        text: 'Which ONE feature would make Wilder Moms indispensable to you?',
        type: 'radio',
        options: ['Nature-inspired build projects', 'Seasonal outdoor plans', 'Local parent community', 'Expert outdoor guidance', 'Printable resources', 'Events & meetups']
      },
      {
        id: 'kits',
        text: 'Would you be interested in pre-planned project kits or printable guides?',
        type: 'radio',
        options: ['Printable guides only', 'Physical kits with materials', 'Both', 'Neither']
      },
      {
        id: 'membership',
        text: 'If Wilder Moms genuinely saved you time and helped your family spend more meaningful time outdoors, would you pay for a membership?',
        type: 'radio',
        options: ['Definitely not', 'Probably not', 'Maybe', 'Probably yes', 'Definitely yes']
      }
    ]
  },
  {
    section: 'Brand & Growth',
    questions: [
      {
        id: 'discovery',
        text: 'Where are you most likely to discover or engage with Wilder Moms?',
        type: 'radio',
        options: ['Instagram', 'TikTok', 'Pinterest', 'Email newsletter', 'Podcast', 'Word of mouth', 'Google search']
      },
      {
        id: 'wouldMiss',
        text: 'If Wilder Moms disappeared tomorrow, what would you miss most?',
        sub: 'What feels most valuable, different, or emotionally meaningful?',
        type: 'textarea'
      }
    ]
  }
]

export default function SurveyPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const currentSectionData = questions[currentSection]
  const isLastSection = currentSection === questions.length - 1

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentSection < questions.length - 1) {
      setCurrentSection(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    try {
      // Try Supabase first
      const { error } = await supabase
        .from('survey_responses')
        .insert([{ 
          answers,
          submitted_at: new Date().toISOString()
        }])

      if (error) {
        console.log('Supabase error (table may not exist):', error.message)
        // If table doesn't exist, store in localStorage as backup
        const storedResponses = JSON.parse(localStorage.getItem('survey_responses') || '[]')
        storedResponses.push({
          answers,
          submitted_at: new Date().toISOString()
        })
        localStorage.setItem('survey_responses', JSON.stringify(storedResponses))
        console.log('Saved to localStorage as backup')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Survey submit error:', err)
      // Save to localStorage as fallback
      try {
        const storedResponses = JSON.parse(localStorage.getItem('survey_responses') || '[]')
        storedResponses.push({
          answers,
          submitted_at: new Date().toISOString()
        })
        localStorage.setItem('survey_responses', JSON.stringify(storedResponses))
        setSubmitted(true)
      } catch (localErr) {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-olive/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl text-ink mb-3">Thank you!</h2>
            <p className="text-inkl text-lg mb-8">
              Your feedback helps us build something that truly works for your family.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-medium hover:bg-terra transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
            ← Back to Home
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">
            Wilder Moms Research Survey
          </h1>
          <p className="text-inkl">
            We're learning what actually helps families spend more meaningful time outdoors — and what would make Wilder Moms genuinely useful long-term.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-inkl mb-2">
            <span>Section {currentSection + 1} of {questions.length}</span>
            <span>{Math.round(((currentSection + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-inkll/20 rounded-full">
            <div
              className="h-full bg-ember rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section Label */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-ember">
            {currentSectionData.section}
          </span>
        </motion.div>

        {/* Questions Card */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-inkll/10 mb-8"
        >
          {currentSectionData.questions.map((question, qIndex) => (
            <div key={question.id} className="mb-8 last:mb-0">
              <h3 className="font-serif text-xl text-ink mb-2">{question.text}</h3>
              {question.sub && (
                <p className="text-inkl text-sm mb-4">{question.sub}</p>
              )}

              {question.type === 'textarea' ? (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder="Your thoughts..."
                  className="w-full min-h-[100px] p-4 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink resize-none"
                />
              ) : question.type === 'checkbox' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map(option => {
                    const selected = answers[question.id] || []
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selected.includes(option)
                            ? 'border-ember bg-ember/5'
                            : 'border-inkll/20 hover:border-ember/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(option)}
                          onChange={() => {
                            const current = answers[question.id] || []
                            if (current.includes(option)) {
                              handleAnswer(question.id, current.filter(v => v !== option))
                            } else {
                              handleAnswer(question.id, [...current, option])
                            }
                          }}
                          className="w-4 h-4 accent-ember"
                        />
                        <span className="text-ink">{option}</span>
                      </label>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {question.options.map(option => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        answers[question.id] === option
                          ? 'border-ember bg-ember/5'
                          : 'border-inkll/20 hover:border-ember/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswer(question.id, option)}
                        className="w-4 h-4 accent-ember"
                      />
                      <span className="text-ink">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentSection === 0}
            className="px-6 py-3 rounded-full border-2 border-inkll/20 text-ink font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-ember/30 transition-colors"
          >
            ← Previous
          </button>

          {isLastSection ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-ember text-white rounded-full font-medium hover:bg-terra transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? 'Submitting...' : 'Submit Survey'}
              {!submitting && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-ember text-white rounded-full font-medium hover:bg-terra transition-colors"
            >
              Next →
            </button>
          )}
        </div>

        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  )
}
