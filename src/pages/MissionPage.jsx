import { motion } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

const paragraphs = [
  {
    text: "Somewhere along the way, motherhood got boxed in — by schedules, by screens, by the quiet weight of doing everything alone. The village disappeared. The days filled up. The wild got pushed further and further away.",
    highlight: false
  },
  {
    text: "We're building it back.",
    highlight: true
  }
]

const sections = [
  {
    title: "For the mother who wants more than survival mode.",
    body: "More than another list, another app, another thing to manage. You don't need more pressure to \"get outside.\" You need a life that makes it natural.",
    emphasis: "So we start at home."
  },
  {
    title: "We build spaces where nature lives —",
    body: "not just on weekends, but in the everyday. On the windowsill, where flowers you pressed together catch the light. In the backyard, where mud kitchens and wild forts become entire worlds. At the kitchen table, where pinecones, paint, and quiet moments turn into something that stays.",
    emphasis: "Because when nature is part of your home, it stops being something you have to chase."
  },
  {
    title: "And when you are ready to step outside —",
    body: "you don't do it alone.",
    emphasis: "We bring back the village."
  },
  {
    title: "Real mothers, nearby.",
    body: "The kind who will meet you at the trailhead, hold the baby, and not think twice about the mess, the snacks, or the chaos. The kind who show up.",
    emphasis: "We make getting out simple."
  },
  {
    title: "The right trail, for your real life.",
    body: "The plan already thought through. The bag already packed — at least in your head.",
    emphasis: "So you can go."
  },
  {
    title: "And when you can't —",
    body: "you're still living it.",
    emphasis: "This is a different kind of motherhood."
  }
]

const closingPoints = [
  "One that feels less isolated.",
  "More grounded.",
  "A little slower.",
  "A little wilder."
]

export default function MissionPage() {
  const [introRef, introVisible] = useScrollReveal()
  const [imageRef, imageVisible] = useScrollReveal()
  const [sectionsRef, sectionsVisible] = useScrollReveal()
  const [closingRef, closingVisible] = useScrollReveal()

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/Mission.png"
            alt="Wilder Moms"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-cream" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 pt-20 pb-32 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8"
          >
            WILDER MOMS — A MOVEMENT
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="font-serif text-xl md:text-2xl text-white/90 italic">
              This isn't about getting outside more.
            </p>
            <p className="font-serif text-xl md:text-2xl text-white/90 italic">
              It's about living differently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opening Paragraphs */}
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

      {/* Image with Quote */}
      <section className="py-16 px-6 bg-cream">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={imageVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-ember/20">
            <img
              src="/images/Mission.png"
              alt="Wilder Moms"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <p className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed">
                "When nature is part of your home, it stops being something you have to chase."
              </p>
            </div>
          </div>
        </motion.div>
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

      {/* The Closing */}
      <section className="py-24 px-6 bg-ink text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            ref={closingRef}
            variants={fadeUpVariants}
            initial="hidden"
            animate={closingVisible ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <p className="text-lg text-white/70 leading-relaxed">
              Not perfect. Not curated. Not performative.
            </p>
            
            <p className="text-lg text-white/70 leading-relaxed">
              Just real life, lived closer to what matters.
            </p>

            <div className="pt-8 space-y-2">
              <p className="font-serif text-3xl md:text-4xl text-blush italic">
                This is Wilder Moms.
              </p>
              <p className="font-serif text-xl md:text-2xl text-white/80">
                Build the wild life — at home, and beyond it.
              </p>
            </div>

            {/* Closing Points */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {closingPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  custom={index}
                  className="text-center"
                >
                  <p className="text-lg text-white/90 font-medium">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
