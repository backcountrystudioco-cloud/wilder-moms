import { motion } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'
import { Link } from 'react-router-dom'

const paragraphs = [
  {
    text: "Somewhere along the way, motherhood got boxed in — by schedules, by screens, by the quiet weight of doing everything alone. The wild got pushed further and further away.",
    highlight: false
  },
  {
    text: "We built Wilder Moms to get it back.",
    highlight: true
  }
]

const sections = [
  {
    title: "Getting outside isn't optional. It's how we survive.",
    body: "Nature isn't a reward for good parenting. It's a requirement. We believe in muddy boots, cold hands, and the kind of tired that comes from actually living.",
    emphasis: "So we start by making it easier."
  },
  {
    title: "The right trail, for your real life.",
    body: "Not another generic list of 'family-friendly trails.' You need the right trail for your specific kids, today, with a double stroller and a four-year-old who loses it after 45 minutes. Every suggestion is built around your real life.",
    emphasis: "Wilder Trails finds your perfect match."
  },
  {
    title: "And when you can't get outside —",
    body: "you're still living it. At home. In your backyard, your kitchen, your living room floor. Nature isn't just out there — it's something you can bring inside.",
    emphasis: "Wilder Homes brings nature home."
  },
  {
    title: "This is Wilder Moms.",
    body: "Trails for every kind of day. Builds for every kind of weather. A philosophy that says: the wild isn't a destination. It's a way of life.",
    emphasis: "Welcome home."
  }
]

const pillars = [
  {
    name: 'Wilder Trails',
    path: '/wilder-trails/location',
    description: 'Find the perfect trail for your family today'
  },
  {
    name: 'Wilder Homes',
    path: '/wilder-homes',
    description: 'Bring nature home with builds and crafts'
  },
  {
    name: 'Wilder Philosophy',
    path: '/wilder-philosophy',
    description: 'A different way of thinking about motherhood'
  }
]

export default function MissionPage() {
  const [introRef, introVisible] = useScrollReveal()
  const [pillarsRef, pillarsVisible] = useScrollReveal()
  const [sectionsRef, sectionsVisible] = useScrollReveal()

  return (
    <div className="bg-cream">
      {/* Hero Section - No Image */}
      <section className="pt-28 pb-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-8"
          >
            Wilder Philosophy
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="font-serif text-xl md:text-2xl text-inkl italic">
              This isn't about getting outside more.
            </p>
            <p className="font-serif text-xl md:text-2xl text-ember italic">
              It's about living differently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <motion.div
            ref={introRef}
            variants={fadeUpVariants}
            initial="hidden"
            animate={introVisible ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <p className="text-lg text-ink leading-relaxed">
              {paragraphs[0].text}
            </p>
            <p className="font-serif text-2xl md:text-3xl text-ember italic">
              {paragraphs[1].text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <motion.div
            ref={sectionsRef}
            variants={fadeUpVariants}
            initial="hidden"
            animate={sectionsVisible ? 'visible' : 'hidden'}
            className="space-y-16"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                custom={index}
                className="space-y-4"
              >
                {section.title && (
                  <h2 className={`font-serif text-xl md:text-2xl ${section.emphasis ? 'text-ember italic' : 'text-ink'}`}>
                    {section.title}
                  </h2>
                )}
                <p className="text-lg text-inkl leading-relaxed">
                  {section.body}
                </p>
                {section.emphasis && (
                  <p className="font-serif text-xl text-ember italic">
                    {section.emphasis}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-inkl mb-8">
            Explore Wilder Moms
          </p>
          <motion.div
            ref={pillarsRef}
            variants={fadeUpVariants}
            initial="hidden"
            animate={pillarsVisible ? 'visible' : 'hidden'}
            className="grid md:grid-cols-3 gap-6"
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.name}
                variants={fadeUpVariants}
                custom={index}
              >
                <Link
                  to={pillar.path}
                  className="block bg-cream rounded-2xl p-6 border border-inkll/10 hover:border-ember hover:shadow-lg transition-all group"
                >
                  <h3 className="font-serif text-xl text-ink mb-2 group-hover:text-ember transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="text-inkl text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-ember text-sm font-medium">
                    Explore
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
