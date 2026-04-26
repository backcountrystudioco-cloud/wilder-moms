import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUpVariants } from '../hooks/useScrollReveal'

const trailsFeatures = [
  'AI-powered trail matching',
  'Filter by distance, difficulty, age',
  'Find moms nearby',
  'Packed bags, ready to go'
]

const homesFeatures = [
  'Step-by-step build guides',
  'Crafts for every age',
  'Materials lists with links',
  'Related builds & tips'
]

export default function ChooseYourPath() {
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">Two paths to a wilder life</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink">
            Where do you want to start?
          </h2>
        </motion.div>

        {/* Two Path Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Trails Card */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="group relative bg-forest rounded-3xl p-8 md:p-10 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="trails-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </pattern>
                <rect fill="url(#trails-pattern)" width="100%" height="100%" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Content */}
              <p className="text-peach font-sans text-xs uppercase tracking-widest mb-3">Explore</p>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-3">Wilder Trails</h3>
              <p className="text-white/70 font-sans mb-6 leading-relaxed">
                Find the perfect trail for your family today. AI-powered recommendations that match your kids, your time, your location.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {trailsFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/60 font-sans text-sm">
                    <svg className="w-4 h-4 text-peach flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/wilder-trails/location"
                className="inline-flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-full font-sans font-medium hover:bg-peach hover:text-forest transition-colors"
              >
                Explore Trails
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Homes Card */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="group relative bg-ember rounded-3xl p-8 md:p-10 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="homes-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="10" height="10" fill="currentColor" rx="2" />
                </pattern>
                <rect fill="url(#homes-pattern)" width="100%" height="100%" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>

              {/* Content */}
              <p className="text-peach font-sans text-xs uppercase tracking-widest mb-3">Build</p>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-3">Wilder Homes</h3>
              <p className="text-white/70 font-sans mb-6 leading-relaxed">
                Create spaces where nature lives — in your backyard, on your windowsill, in everyday moments. Activities and builds for every family.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {homesFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/60 font-sans text-sm">
                    <svg className="w-4 h-4 text-peach flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/wilder-homes"
                className="inline-flex items-center gap-2 bg-white text-ember px-6 py-3 rounded-full font-sans font-medium hover:bg-peach hover:text-ember transition-colors"
              >
                Start Building
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mobile-only stacked buttons */}
        <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
          <Link
            to="/wilder-trails/location"
            className="flex flex-col items-center gap-2 bg-forest text-white p-6 rounded-2xl"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-sans font-medium">Trails</span>
          </Link>
          <Link
            to="/wilder-homes"
            className="flex flex-col items-center gap-2 bg-ember text-white p-6 rounded-2xl"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-sans font-medium">Homes</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
