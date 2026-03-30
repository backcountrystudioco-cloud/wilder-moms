import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

const builds = [
  {
    id: 'mud-kitchen',
    thumbGradient: 'bg-gradient-to-br from-[#8C4A14] to-[#5A2800]',
    badge: 'Weekend build',
    title: 'The Classic Mud Kitchen',
    tag: 'Outdoor Play',
    description: 'A backyard mud kitchen is the single best investment in hours of independent, sensory-rich play.',
    meta: { cost: '$20–40', time: '2–4 hours', ages: '1–8', skill: 'Beginner' },
    steps: [
      { title: 'Source your materials', detail: 'Check local Facebook Marketplace, garage sales, andHabitat for Humanity ReStore for old sinks, shelving units, and pallets.' },
      { title: 'Build the frame', detail: 'Use 2×4 lumber to create a basic A-frame or box structure. Keep it low enough for kids to reach comfortably.' },
      { title: 'Add the "sink"', detail: 'Secure a plastic tub or basin at standing height. Add a garden hose adapter for running water play.' },
      { title: 'Stock the kitchen', detail: 'Gather old pots, pans, wooden spoons, mason jars, and kitchen tools. Real utensils beat plastic every time.' },
      { title: 'Make it theirs', detail: 'Let kids help paint or decorate. Add a chalkboard panel for menu writing.' }
    ],
    cta: 'Get the full materials list →',
    ctaHref: '#waitlist'
  },
  {
    id: 'raised-garden',
    thumbGradient: 'bg-gradient-to-br from-[#5A6428] to-[#3C4614]',
    badge: 'Afternoon build',
    title: 'Their First Raised Garden Bed',
    tag: 'Gardening',
    description: 'A raised bed gives kids ownership of growing their own food — and makes the harvest feel impossibly exciting.',
    meta: { cost: '$15–35', time: '2–3 hours', ages: '3–12', skill: 'Beginner' },
    steps: [
      { title: 'Pick your spot & size', detail: 'Choose a spot with 6+ hours of sun. Keep beds 3–4 feet wide so kids can reach the center from either side.' },
      { title: 'Build the frame', detail: 'Use untreated 2×10 or 2×12 boards. 4×4 corner posts make assembly easy and the bed sturdy.' },
      { title: 'Fill with the right mix', detail: 'Fill ⅔ with compost, ⅓ with peat moss or coco coir. This ratio drains well and holds nutrients.' },
      { title: 'Plant what kids love to eat', detail: 'Cherry tomatoes, sugar snap peas, strawberries, and radishes grow fast and taste incredible fresh.' },
      { title: 'Make it magical', detail: 'Add stepping stones, a bean teepee, or a little sign with their name on it.' }
    ],
    cta: 'Get the full planting guide →',
    ctaHref: '#waitlist'
  },
  {
    id: 'wild-fort',
    thumbGradient: 'bg-gradient-to-br from-[#464F5F] to-[#2d3240]',
    badge: 'Half-day build',
    title: 'The Backyard Wild Fort',
    tag: 'Imaginative Play',
    description: 'A simple frame of branches becomes the setting for a thousand adventures. The best forts are mostly built by kids.',
    meta: { cost: '$0–25', time: '3–5 hours', ages: '4–12', skill: 'Easy' },
    steps: [
      { title: 'Let them choose the location', detail: 'Kids will pick spots adults never would — shady, sloped, hidden. Let the location inform the design.' },
      { title: 'Build the frame', detail: 'Start with two forked branches driven into the ground at an A-frame angle. Add a ridgepole across the top.' },
      { title: 'Weave the walls', detail: 'Fill in with long branches woven horizontally through the forks. Thicker branches at the base, thinner near the top.' },
      { title: 'Make it cozy inside', detail: 'Add a layer of pine straw or leaves for flooring. Hang a tarp or blanket across the entrance.' },
      { title: 'Stay out of it', detail: 'The single most important rule: this is theirs. Resist the urge to "help" once the building is done.' }
    ],
    cta: 'Get more wild space ideas →',
    ctaHref: '#waitlist'
  }
]

function AccordionStep({ step, index, isOpen, onToggle }) {
  return (
    <div className="border-b border-inkll/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-3 flex items-center gap-3 text-left group"
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 transition-colors duration-300 ${
            isOpen
              ? 'bg-ember text-white'
              : 'bg-blush text-ink group-hover:bg-ember/20'
          }`}
        >
          {index + 1}
        </span>
        <span className={`font-medium transition-colors ${isOpen ? 'text-ember' : 'text-ink'}`}>
          {step.title}
        </span>
        <svg
          className={`ml-auto w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="pb-3 pl-9 text-inkl text-sm leading-relaxed">
          {step.detail}
        </p>
      </motion.div>
    </div>
  )
}

function BuildCard({ build, index }) {
  const [activeStep, setActiveStep] = useState(null)
  const [ref, isVisible] = useScrollReveal()

  const handleStepToggle = (stepIndex) => {
    setActiveStep(activeStep === stepIndex ? null : stepIndex)
  }

  const scrollToWaitlist = (e) => {
    e.preventDefault()
    const target = document.getElementById('waitlist')
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      custom={index}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-ink/5 flex flex-col"
    >
      {/* Thumb Header - Links to Builds Page */}
      <Link to="/basecamp" className={`${build.thumbGradient} p-5 relative block`}>
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
          {build.badge}
        </span>
        <span className="inline-block bg-peach/90 text-ink text-xs font-medium px-2 py-1 rounded-full mb-3">
          {build.tag}
        </span>
        <h3 className="font-serif text-xl text-white leading-snug">
          {build.title}
        </h3>
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-inkl text-sm leading-relaxed mb-4">
          {build.description}
        </p>

        {/* Meta Row */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <span className="bg-cream text-ink px-2 py-1 rounded">
            <span className="font-medium">{build.meta.cost}</span>
          </span>
          <span className="bg-cream text-ink px-2 py-1 rounded">
            <span className="font-medium">{build.meta.time}</span>
          </span>
          <span className="bg-cream text-ink px-2 py-1 rounded">
            <span className="font-medium">Ages {build.meta.ages}</span>
          </span>
          <span className="bg-cream text-ink px-2 py-1 rounded">
            <span className="font-medium">{build.meta.skill}</span>
          </span>
        </div>

        {/* Accordion Steps */}
        <div className="border-t border-inkll/20 -mx-5 px-5 pt-4 mt-auto">
          <h4 className="text-xs font-medium text-inkll uppercase tracking-wider mb-2">
            Steps
          </h4>
          {build.steps.map((step, stepIndex) => (
            <AccordionStep
              key={stepIndex}
              step={step}
              index={stepIndex}
              isOpen={activeStep === stepIndex}
              onToggle={() => handleStepToggle(stepIndex)}
            />
          ))}
        </div>

        {/* CTA */}
        <a
          href={build.ctaHref}
          onClick={scrollToWaitlist}
          className="mt-5 inline-flex items-center gap-2 text-ember font-medium text-sm hover:text-terra transition-colors"
        >
          {build.cta}
        </a>
      </div>
    </motion.div>
  )
}

export default function BaseCampBuilds() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="builds" className="bg-cream py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            variants={fadeUpVariants}
            custom={0}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="text-inkll text-xs font-medium uppercase tracking-widest mb-4"
          >
            THE BASE CAMP · BUILD GUIDES
          </motion.p>
          <motion.h2
            variants={fadeUpVariants}
            custom={1}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-ember leading-tight mb-6"
          >
            Build a wilder home for your kids.
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            custom={2}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="text-inkl max-w-2xl mx-auto leading-relaxed"
          >
            Healthy living spaces aren't complicated or expensive. These are the builds that turn a
            backyard — or a balcony — into a place your kids will choose over a screen, every single
            time.
          </motion.p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {builds.map((build, index) => (
            <BuildCard key={build.id} build={build} index={index} />
          ))}
        </div>

        {/* View All Builds Link */}
        <div className="text-center mt-12">
          <Link
            to="/basecamp"
            className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-terra transition-colors"
          >
            View All Builds
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
