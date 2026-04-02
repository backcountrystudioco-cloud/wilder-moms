import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getBuildById, getRelatedBuilds } from './builds'
import BuildCard from './BuildCard'

const difficultyColors = {
  easy: 'bg-olive text-white',
  medium: 'bg-gold text-white',
  hard: 'bg-ember text-white'
}

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
}

const categoryIcons = {
  'Shelter': 'Shelter',
  'Fire': 'Fire',
  'Water': 'Water',
  'Food': 'Food',
  'Tools': 'Tools',
  'Comfort': 'Comfort',
  'Safety': 'Safety',
  'Fun': 'Fun',
}

function AccordionStep({ step, index, isOpen, onToggle }) {
  return (
    <div className="border-b border-inkll/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center gap-3 text-left group"
      >
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 transition-colors duration-300 ${
            isOpen
              ? 'bg-ember text-white'
              : 'bg-blush text-ink group-hover:bg-ember/20'
          }`}
        >
          {index + 1}
        </span>
        <span className={`font-medium text-lg transition-colors ${isOpen ? 'text-ember' : 'text-ink'}`}>
          {step.title}
        </span>
        <svg
          className={`ml-auto w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-11 text-inkl leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BuildDetailPage() {
  const { buildId } = useParams()
  const navigate = useNavigate()
  const build = getBuildById(buildId)
  const relatedBuilds = getRelatedBuilds(buildId)
  const [openSteps, setOpenSteps] = useState({})

  if (!build) {
    return (
      <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl text-ink mb-4">Build Not Found</h1>
          <p className="text-inkl mb-8">The build you're looking for doesn't exist.</p>
          <Link
            to="/basecamp"
            className="inline-flex items-center gap-2 bg-ember text-white px-6 py-3 rounded-full font-medium hover:bg-terra transition-colors"
          >
            Back to Builds
          </Link>
        </div>
      </div>
    )
  }

  const handleStepToggle = (index) => {
    setOpenSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const scrollToWaitlist = (e) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      const target = document.getElementById('waitlist')
      if (target) {
        const offset = 80
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Hero Header */}
      <div className="relative h-72 md:h-80 bg-gradient-to-br from-ember to-terra flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <span className="text-3xl font-bold text-white opacity-30 uppercase tracking-wider">{categoryIcons[build.category] || 'Shelter'}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <Link
            to="/basecamp"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Builds
          </Link>
          <span className="inline-block bg-peach text-ink text-xs font-medium px-3 py-1 rounded-full mb-3">
            {build.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            {build.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg shadow-ink/5 p-6 md:p-8">
          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-inkll/20">
            {/* Difficulty */}
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${difficultyColors[build.difficulty]}`}>
              {difficultyLabels[build.difficulty]}
            </span>
            {/* Time */}
            <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-sm">
              <span className="font-medium">{build.timeEstimate}</span>
            </span>
            {/* Age Range */}
            <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-sm">
              Ages <span className="font-medium">{build.ageRange}</span>
            </span>
            {/* Cost */}
            <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-sm">
              {build.cost}
            </span>
          </div>

          {/* Description */}
          <p className="text-inkl leading-relaxed mb-8">
            {build.description}
          </p>

          {/* Materials & Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Materials */}
            <div>
              <h2 className="font-serif text-2xl text-ink mb-4">Materials</h2>
              <ul className="space-y-3">
                {build.materials.map((material, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-ink font-medium">{material.name}</span>
                      <span className="text-inkl text-sm ml-2">({material.quantity})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h2 className="font-serif text-2xl text-ink mb-4">Tools Needed</h2>
              <div className="flex flex-wrap gap-2">
                {build.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-blush text-ink px-3 py-1.5 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-ink mb-4">Build Steps</h2>
            <div className="border-t border-inkll/20">
              {build.steps.map((step, index) => (
                <AccordionStep
                  key={index}
                  step={step}
                  index={index}
                  isOpen={openSteps[index] || false}
                  onToggle={() => handleStepToggle(index)}
                />
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-parchment rounded-xl p-6 mb-8">
            <h2 className="font-serif text-2xl text-ink mb-4 flex items-center gap-2">
              <span className="text-gold">✦</span> Pro Tips
            </h2>
            <ul className="space-y-2">
              {build.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold flex-shrink-0">•</span>
                  <span className="text-inkl leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#waitlist"
              onClick={scrollToWaitlist}
              className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-terra transition-colors"
            >
              Join the Waitlist for More Builds
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Related Builds */}
        {relatedBuilds.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-6 text-center">
              Related Builds
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBuilds.map((relatedBuild, index) => (
                <BuildCard key={relatedBuild.id} build={relatedBuild} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
