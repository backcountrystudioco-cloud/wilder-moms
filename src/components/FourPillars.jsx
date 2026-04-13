import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

const pillars = [
  {
    accent: 'bg-ember',
    numeral: 'I',
    label: 'THE VILLAGE',
    title: "Pull up a chair. The fire is always here.",
    description:
      "The Village isn't another social network. It's a campfire circle — an oral tradition where mothers share stories that get witnessed, not liked. The hard weeks. The trail tales. The quiet wisdom that comes from years of showing up. No metrics. No algorithms. Just stories gathered around the fire.",
    cta: { label: 'Hear the Stories', to: '/village', icon: null }
  },
  {
    accent: 'bg-olive',
    numeral: 'II',
    label: 'THE HABITAT',
    title: "Finding the right trail shouldn't take longer than the hike.",
    description:
      "You don't need another generic list of 'family-friendly trails.' You need the right trail for your specific kids, today, with a double stroller and a four-year-old who loses it after 45 minutes. We know your family. We know the nap window, the meltdown threshold, the need for a bathroom within the first mile. Every suggestion is built around your real life — not a stock photo version of it.",
    cta: { label: 'Explore Trails', to: '/habitat', icon: null }
  },
  {
    accent: 'bg-gold',
    numeral: 'III',
    label: 'THE BASE CAMP',
    title: "Staying home doesn't mean giving up on nature.",
    description:
      "Some days the adventure is making it to the kitchen table. And that's okay. The Base Camp is for those days. Pressing the flowers you found last Sunday. Building a nature table with pinecones from your coat pocket. Letting your kid paint rocks while you drink your coffee warm for once. Nature isn't just out there — it's something you can bring inside, keep alive, and make part of every single day.",
    cta: { label: 'See Builds & Activities', to: '/basecamp', icon: null }
  },
  {
    accent: 'bg-slate',
    numeral: 'IV',
    label: 'THE BLUEPRINT',
    title: 'Leave the house ready. Come home safe.',
    description:
      "The thing stopping most moms from getting outside isn't wanting to — it's the mental load of preparing for it. What do I pack? Is this trail safe to do alone? What if something goes wrong? We answer all of it before you even put on your boots. Smart pack lists for your exact trip. Offline maps so you never lose signal and your nerve. Live location with the people who love you. We handle the logistics so you can just go.",
    cta: { label: 'See Pack Lists', to: '/blueprint', icon: null }
  }
]

const FourPillars = () => {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="pillars" ref={ref} className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          custom={0}
        >
          <p className="text-inkll font-sans text-sm tracking-widest uppercase mb-4">
            WHAT WE BELIEVE
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-ember mb-6">
            Four pillars. One community.
          </h2>
          <p className="font-sans text-inkl text-lg max-w-2xl mx-auto">
            Trails, community, nature crafts, and safety — all in one place, for every kind of day.
          </p>
        </motion.div>

        {/* 4-column grid of cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          custom={1}
        >
          {pillars.map((pillar, index) => (
            <div
              key={pillar.label}
              className="bg-white p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* 3px top accent bar */}
              <div className={`h-[3px] ${pillar.accent} mb-6`} />

              {/* Large roman numeral */}
              <p className="font-serif text-6xl text-ink/10 mb-2">
                {pillar.numeral}
              </p>

              {/* Label */}
              <p className="font-sans text-sm tracking-widest text-inkl mb-3">
                {pillar.label}
              </p>

              {/* Title */}
              <h3 className="font-serif text-xl text-ink mb-4">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-inkl text-sm leading-relaxed flex-grow mb-4">
                {pillar.description}
              </p>

              {/* CTA Button */}
              <Link
                to={pillar.cta.to}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-sans text-sm font-medium text-white transition-colors ${pillar.accent} hover:opacity-90`}
              >
                {pillar.cta.label}
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FourPillars
