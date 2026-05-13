import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabase'

const buildCategories = [
  'Cardboard, tarps & fabric (easy, often free)',
  'Nature builds (sticks, stones, mud, leaves)',
  'Growing projects (willow, beans, gardens)',
  'Permanent builds (wood, stone, ecobricks)',
  'Magical hideaways (forts, fairy trails, hobbit holes)'
]

const questions = [
  {
    section: 'The Problem',
    questions: [
      {
        id: 'ideaSource',
        text: 'When you want to do an outdoor project with your kids, where do you find ideas?',
        type: 'radio',
        options: [
          'Pinterest',
          'YouTube',
          'Google',
          'Instagram',
          'I don\'t bother',
          'Other'
        ]
      },
      {
        id: 'currentBarrier',
        text: 'What\'s stopped you from building more outdoor projects?',
        type: 'checkbox',
        options: [
          'Can\'t find good instructions',
          'Don\'t know what to build',
          'Takes too much planning',
          'Materials cost too much',
          'Kids lose interest quickly',
          'Never seems to turn out right',
          'Don\'t have the tools',
          'Just haven\'t gotten around to it'
        ]
      }
    ]
  },
  {
    section: 'Who You Are',
    questions: [
      {
        id: 'childAges',
        text: "What ages are your kids?",
        sub: 'Select all that apply',
        type: 'checkbox',
        options: ['0-2 years', '3-5 years', '6-9 years', '10-12 years', '13+ years']
      },
      {
        id: 'homeType',
        text: 'What type of home do you live in?',
        type: 'radio',
        options: ['Apartment / Condo', 'Townhouse', 'House with yard', 'House without yard']
      },
      {
        id: 'zipCode',
        text: 'Your zip code (helps us build local features)',
        type: 'text',
        placeholder: 'e.g., 90210'
      }
    ]
  },
  {
    section: 'Build Demand',
    questions: [
      {
        id: 'buildInterest',
        text: 'Which type of project sounds most fun?',
        sub: 'Pick 1-2 that appeal to you',
        type: 'checkbox',
        options: buildCategories
      },
      {
        id: 'buildIntent',
        text: 'Which would you actually PAY for a blueprint guide?',
        sub: 'Pick 1-2. This helps us prioritize what to build first.',
        type: 'checkbox',
        options: buildCategories
      },
      {
        id: 'buildBudget',
        text: 'What\'s your budget for a complete blueprint guide?',
        sub: 'Includes materials list, step-by-step instructions, and tips',
        type: 'radio',
        options: [
          'Free is fine',
          '$9-15',
          '$19-29',
          '$30-49',
          '$50+ for the right build'
        ]
      }
    ]
  },
  {
    section: 'Conversion Barriers',
    questions: [
      {
        id: 'whyNotBuy',
        text: 'What\'s stopped you from buying project guides before?',
        sub: 'Be honest - we\'re trying to solve a real problem',
        type: 'checkbox',
        options: [
          'Too expensive for what you get',
          'Never know if it\'ll actually work',
          'Don\'t have time to build even with a guide',
          'Free YouTube videos are good enough',
          'Never occurred to me to pay for this',
          'Hard to trust online reviews'
        ]
      },
      {
        id: 'whyWilderBetter',
        text: 'What would make Wilder Moms better than free YouTube/Pinterest?',
        sub: 'Pick up to 2',
        type: 'checkbox',
        options: [
          'Step-by-step video, not just text',
          'Exact materials list with costs upfront',
          'Kid-tested instructions that actually work',
          'Community of moms who\'ve done it',
          'Unique builds I can\'t find elsewhere',
          'Done-for-you materials kit delivery'
        ]
      },
      {
        id: 'biggestBarrier',
        text: 'If you could solve ONE problem that stops you from building, what would it be?',
        type: 'textarea',
        placeholder: 'Think: time, cost, confidence, planning...'
      }
    ]
  },
  {
    section: 'Trails',
    questions: [
      {
        id: 'trailFrequency',
        text: 'How often does your family go on hikes or trails?',
        type: 'radio',
        options: ['Weekly+', 'Monthly', 'Rarely', 'Never']
      },
      {
        id: 'trailValue',
        text: 'What would make a trail finder actually useful?',
        sub: 'Pick up to 2',
        type: 'checkbox',
        options: [
          'Matches by kids\' ages/abilities',
          'Shows current weather & conditions',
          'Stroller/wheelchair accessible filters',
          'Shaded trails for hot days',
          'Under 1 hour away',
          'AI-powered personalized recommendations'
        ]
      }
    ]
  },
  {
    section: 'Community',
    questions: [
      {
        id: 'communityJoin',
        text: 'If we built a private community of moms sharing builds and trail adventures, would you join?',
        type: 'radio',
        options: [
          'Yes, I want that',
          'Maybe',
          "Not my thing"
        ]
      },
      {
        id: 'email',
        text: 'Your email (for early access updates)',
        type: 'email',
        placeholder: 'your@email.com'
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
      const { error } = await supabase
        .from('survey_responses')
        .insert([{ 
          answers,
          completed_at: new Date().toISOString()
        }])

      if (error) throw error

      setSubmitted(true)
    } catch (err) {
      console.error('Survey submit error:', err)
      // Save to localStorage as backup
      const stored = JSON.parse(localStorage.getItem('survey_responses') || '[]')
      stored.push({ answers, completed_at: new Date().toISOString() })
      localStorage.setItem('survey_responses', JSON.stringify(stored))
      setSubmitted(true)
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
            <p className="text-inkl text-lg mb-4">
              Your feedback helps us build something that truly works for your family.
            </p>
            <p className="text-ember font-medium mb-8">
              We'll email you when early access is available.
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
            Help Us Build Wilder Moms
          </h1>
          <p className="text-inkl">
            5 minutes to help us create something that actually works for your family.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-inkl mb-2">
            <span>Step {currentSection + 1} of {questions.length}</span>
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
          {currentSectionData.questions.map((question) => (
            <div key={question.id} className="mb-8 last:mb-0">
              <h3 className="font-serif text-xl text-ink mb-1">{question.text}</h3>
              {question.sub && (
                <p className="text-inkl text-sm mb-4">{question.sub}</p>
              )}

              {question.type === 'textarea' ? (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder={question.placeholder || 'Your thoughts...'}
                  className="w-full min-h-[100px] p-4 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink resize-none"
                />
              ) : question.type === 'email' || question.type === 'text' ? (
                <input
                  type={question.type === 'email' ? 'email' : 'text'}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full px-4 py-3 rounded-xl border-2 border-inkll/20 focus:border-ember focus:outline-none text-ink"
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
                        <span className="text-ink text-sm">{option}</span>
                      </label>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {question.options.map(option => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
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
              {submitting ? 'Submitting...' : 'Submit'}
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
