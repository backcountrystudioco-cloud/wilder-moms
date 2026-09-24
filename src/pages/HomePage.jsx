import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import {
  premiumBuilds,
  pricing,
  annualSavings,
  getCurrentDrop,
} from '../wilder-builds/buildsLibrary'
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal'

function WilderMomsIntro() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-ink text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Wilder Moms
          </p>
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-tight mb-10">
            A little more wild in everyday motherhood.
          </h2>
          <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed mb-10">
            Go outside. Bring some of it home. Make something. Meet someone.
          </p>
          <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Wilder Moms is about creating more room for kids to explore, make,
            wander, and wonder — and more ways for moms to do it together.
          </p>
          <p className="font-serif italic text-base text-white/55 mb-10">
            Nothing elaborate required.
          </p>
          <Link
            to="/welcome"
            className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
          >
            Find your wilder habitat
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function WilderTrailsSection() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <img
              src="/images/builds/rock-cairn.jpg"
              alt="A rock cairn marking a local trail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute left-4 bottom-4 bg-cream/95 rounded-xl px-4 py-3 max-w-[14rem]">
              <p className="text-ember text-[10px] uppercase tracking-[0.18em] font-medium mb-1">
                Wilder Trails
              </p>
              <p className="font-serif text-lg leading-tight text-ink">
                Somewhere to go.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
              Wilder Trails
            </p>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-ink leading-tight mb-5">
              Somewhere to go.
            </h2>
            <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
              Easy, local ways to get outside with your kids and other moms.
            </p>
            <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
              A trail. A creek. A walk around the neighborhood. A place to
              stop and stay awhile.
            </p>
            <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
              Come late. Turn around early. Let them spend twenty minutes with one rock.
            </p>
            <p className="font-serif italic text-base text-inkl mb-7">
              There is nowhere important we need to get.
            </p>
            <Link
              to="/wilder-trails"
              className="inline-flex items-center gap-2 bg-ember text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
            >
              Explore Wilder Trails
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WilderHomeSection() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
              Wilder Home
            </p>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-ink leading-tight mb-5">
              Make a little wild where you are.
            </h2>
            <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
              Bring nature home. Build something together. Turn an overlooked
              corner into somewhere your kids want to be.
            </p>
            <ul className="text-inkl text-base md:text-lg leading-relaxed mb-5 space-y-1.5">
              <li>A making table by the window.</li>
              <li>A tiny nook under the stairs.</li>
              <li>A place for rocks, sticks, leaves, and whatever came home in their pockets.</li>
              <li>A backyard build that changes with the seasons.</li>
            </ul>
            <p className="text-inkl text-base md:text-lg leading-relaxed mb-7">
              Small ideas for creating homes that invite curiosity, independence,
              making, and connection.
            </p>
            <Link
              to="/wilder-homes"
              className="inline-flex items-center gap-2 bg-ember text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
            >
              Explore Wilder Home
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl order-1 md:order-2"
          >
            <img
              src="/images/Mission.png"
              alt="A making corner at home where kids can build and explore"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute left-4 bottom-4 bg-cream/95 rounded-xl px-4 py-3 max-w-[14rem]">
              <p className="text-ember text-[10px] uppercase tracking-[0.18em] font-medium mb-1">
                Wilder Home
              </p>
              <p className="font-serif text-lg leading-tight text-ink">
                Make a little wild where you are.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MotherhoodClosingManifesto() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-ink text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif font-light text-3xl md:text-5xl text-white leading-tight mb-10">
            Motherhood is better with people.
          </h2>
          <div className="text-white/70 text-base md:text-lg leading-relaxed space-y-4 mb-10 max-w-2xl mx-auto text-left">
            <p>It shouldn't take six texts and a perfectly planned playdate to see another grown-up.</p>
            <p>Sometimes you just need somewhere to go.</p>
            <p>Something to make.</p>
            <p>A reason to step outside.</p>
            <p>A place where the kids can begin on their own and you can sit beside another mom for a minute.</p>
          </div>
          <p className="font-serif italic text-2xl text-white/85 mb-3">
            That's Wilder.
          </p>
          <p className="font-serif text-xl text-gold mb-14">
            Come as you are.
          </p>
          <div className="border-t border-white/20 pt-10 max-w-md mx-auto">
            <p className="font-serif italic text-base text-white/65 mb-1">
              Wilder Trails
            </p>
            <p className="text-white/85 mb-6">
              Go somewhere.
            </p>
            <p className="font-serif italic text-base text-white/65 mb-1">
              Wilder Home
            </p>
            <p className="text-white/85 mb-6">
              Make somewhere.
            </p>
            <p className="font-serif italic text-sm text-white/45">
              Either way, start close to home.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------
// This Month's Drop — show both PDFs from the current drop as preview
// tiles with type badges. Helps visitors see the value before subscribing.
// ---------------------------------------------------------------------
function CurrentDropShowcase() {
  const [ref, visible] = useScrollReveal()
  const currentDrop = getCurrentDrop()
  if (!currentDrop) return null

  const dropBuilds = premiumBuilds.filter(b => b.dropId === currentDrop.id).slice(0, 2)

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3">
            When your brain is done for the day
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-ink mb-3">
            The plan is already made.
          </h2>
          <p className="text-inkl max-w-2xl mx-auto">
            Two new open-ended ideas every month. Set them out, step back, and let
            the play belong to your kids.
          </p>
          <p className="text-inkll font-serif italic text-sm max-w-2xl mx-auto mt-5">
            You need to rest too.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {dropBuilds.map((build, i) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
            >
              <Link
                to="/wilder-homes?tab=premium"
                className="group block bg-white rounded-3xl overflow-hidden border border-inkll/10 hover:border-ember/40 transition-all h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {build.coverImage ? (
                    <img
                      src={build.coverImage}
                      alt={build.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${build.coverGradient}`} />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                      build.type === 'architect'
                        ? 'bg-white/85 text-ember border-ember/30'
                        : 'bg-white/85 text-olive border-olive/30'
                    }`}>
                      {build.typeLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent">
                    <p className="text-white text-sm leading-snug line-clamp-2 font-medium">
                      {build.tagline}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-inkll mb-2">
                    {build.pages} pages · {build.difficulty}
                  </p>
                  <h3 className="font-serif italic text-2xl text-ink mb-2">
                    {build.title}
                  </h3>
                  <p className="text-inkl text-sm leading-relaxed">
                    {build.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------
// Premium Subscription Pitch — pricing tiers + subscribe CTA.
// Replaces the old "waitlist" CTA with something that actually exists.
// ---------------------------------------------------------------------
function PremiumSubscriptionPitch() {
  const [ref, visible] = useScrollReveal()

  return (
    <section
      id="premium"
      ref={ref}
      className="relative py-20 md:py-28 bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-ember/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-white/70 text-xs font-medium uppercase tracking-[0.2em] mb-3">
            For the 4:00 p.m. version of you
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Less to organize.<br />
            <span className="text-gold">More room to exhale.</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            One Architect Blueprint and one Lab Activity every month. Printable, open-ended,
            and made for kids to start without you leading.
          </p>
        </motion.div>

        {/* Pricing pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-0 sm:inline-flex sm:flex-row bg-white/15 backdrop-blur rounded-2xl sm:rounded-full p-1.5 mx-auto mb-8 w-full sm:w-auto"
        >
          <PricingPill
            amount={pricing.monthly.formatted}
            cadence={pricing.monthly.cadence}
            sub="Try it light"
          />
          <PricingPill
            amount={pricing.annual.formatted}
            cadence={pricing.annual.cadence}
            sub={`Save $${annualSavings} a year`}
            badge="Best value"
            highlight
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <Link
            to="/wilder-homes?tab=premium"
            className="inline-flex items-center gap-2 bg-white text-forest px-8 py-4 rounded-full font-semibold text-lg hover:bg-cream transition-colors shadow-xl"
          >
            See the monthly builds
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-white/60 text-sm mt-4">
            Cancel anytime · Past drops included · New PDF the 1st of every month
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function PricingPill({ amount, cadence, sub, badge, highlight = false }) {
  return (
    <div
      className={`relative flex-1 sm:flex-initial px-6 py-3 rounded-xl sm:rounded-full text-center transition-colors ${
        highlight ? 'bg-white text-ink' : 'text-white'
      }`}
    >
      <div className="flex items-baseline justify-center gap-1.5">
        <span className="font-serif italic text-2xl">{amount}</span>
        <span className={`text-sm ${highlight ? 'text-inkl' : 'text-white/70'}`}>{cadence}</span>
      </div>
      <p className={`text-xs ${highlight ? 'text-inkl' : 'text-white/70'} mt-0.5`}>{sub}</p>
      {badge && (
        <span className="absolute -top-2 -right-2 bg-ember text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-md">
          {badge}
        </span>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------
export default function HomePage() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          const offset = 80
          const top = element.getBoundingClientRect().top + window.pageYOffset - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <Hero />
      <WilderMomsIntro />
      <CurrentDropShowcase />
      <WilderTrailsSection />
      <WilderHomeSection />
      <MotherhoodClosingManifesto />
      <PremiumSubscriptionPitch />
    </>
  )
}
