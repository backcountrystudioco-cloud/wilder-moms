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

function ManifestoCh1() {
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
            Why we made this
          </p>
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-tight mb-10">
            Motherhood is better with people.
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Somewhere along the way, raising kids got strangely lonely. We live farther
            from family. Our friends are scattered across town. Schedules are packed.
            Playdates take planning. And somehow we're supposed to build a village
            while also packing the snacks, finding the missing shoe, answering the
            email, making dinner, and keeping tiny humans alive.
          </p>
          <p className="font-serif italic text-2xl md:text-3xl text-white/55 mb-8">
            That's a lot.
          </p>
          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            So we made something simpler.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ManifestoCh2And3() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <img
              src="/images/Mission.png"
              alt="Moms and kids stepping outside together"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute left-4 bottom-4 bg-cream/95 rounded-xl px-4 py-3 max-w-[14rem]">
              <p className="text-ember text-[10px] uppercase tracking-[0.18em] font-medium mb-1">
                Come outside
              </p>
              <p className="font-serif text-lg leading-tight text-ink">
                Just come.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
              The invitation
            </p>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-ink leading-tight mb-5">
              Come outside.
            </h2>
            <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
              Wilder Moms brings moms and kids together for easy, local adventures outside.
            </p>
            <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
              A walk. A trail. A creek. A morning at the park.
            </p>
            <p className="font-serif italic text-base text-inkl mb-5">
              Nothing impressive required.
            </p>
            <ul className="text-inkl text-base leading-relaxed mb-6 space-y-1.5">
              <li>You don't need to be outdoorsy.</li>
              <li>You don't need fancy gear.</li>
              <li>You don't need to know anyone.</li>
              <li>And you definitely don't need to have it together.</li>
            </ul>
            <p className="font-serif text-2xl text-ink mb-5">
              Just come.
            </p>
            <p className="text-inkl text-base leading-relaxed mb-5">
              Your kids can wander. You can talk to another grown-up. Maybe everyone
              gets a little muddy. Maybe somebody has a meltdown. Maybe you meet the
              person you'll text next Tuesday when the afternoon feels approximately
              nine hours long.
            </p>
            <p className="font-serif italic text-base text-inkl">
              That's kind of the idea.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="font-serif font-light text-3xl md:text-4xl text-ink leading-tight mb-8">
            This isn't really about hiking.
          </h3>
          <div className="text-inkl text-base md:text-lg leading-relaxed space-y-3 mb-10 max-w-2xl mx-auto">
            <p>It's about having somewhere to go.</p>
            <p>It's about recognizing a face when you arrive.</p>
            <p>It's about someone else remembering your kid's name.</p>
            <p>It's about conversations that start on the trail and eventually become:</p>
          </div>
          <p className="font-serif italic text-2xl text-ink mb-10">
            We're heading outside. Want to come?
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Because motherhood was never meant to happen alone. And finding your people
            shouldn't feel like another thing you have to accomplish.
          </p>
          <Link
            to="/welcome"
            className="inline-flex items-center gap-2 bg-ember text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
          >
            We'll meet you outside. Find your local Wilder Moms
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ManifestoCh4To6() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
            No experience necessary
          </p>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink leading-tight mb-7">
            No experience necessary.
          </h2>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
            Seriously.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
            You do not have to be a hiking family.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
            Some of us have backpack carriers. Some of us have goldfish crackers crushed
            into every surface of the car. Most of us have both.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
            Wilder Moms outings are meant to be easy enough to say yes to.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
            Come late. Turn around early. Carry the toddler. Let the five-year-old
            spend twenty minutes investigating one rock.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-7">
            There is nowhere important we need to get.
          </p>
          <p className="font-serif italic text-xl md:text-2xl text-ink">
            The point is being there together.
          </p>
        </motion.div>

        <hr className="border-inkll/15 mb-16 md:mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink leading-tight mb-2">
            Kids need outside.
          </h2>
          <p className="font-serif italic text-2xl md:text-3xl text-ember leading-snug mb-8">
            So do moms.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-6">
            Outside gives kids room to move, explore, get dirty, invent things, and be kids.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-6">
            But something happens for us, too.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-8">
            There are fewer walls. Less stuff to manage. No house to clean before
            someone comes over. No toys to share perfectly. No pressure to make the
            afternoon magical.
          </p>
          <p className="font-serif text-xl md:text-2xl text-ink leading-snug mb-2">
            We walk.
          </p>
          <p className="font-serif text-xl md:text-2xl text-ink leading-snug mb-2">
            We talk.
          </p>
          <p className="font-serif text-xl md:text-2xl text-ink leading-snug mb-8">
            We breathe.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed">
            And for a little while, motherhood feels less like something we're carrying
            individually and more like something we're doing together.
          </p>
        </motion.div>

        <hr className="border-inkll/15 mb-16 md:mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink leading-tight mb-7">
            You can come alone.
          </h2>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-6">
            Actually, we hope you do.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-6">
            Walking into something where everyone seems to know each other can feel
            weird. We know.
          </p>
          <p className="text-inkl text-base md:text-lg leading-relaxed mb-5">
            So here's what you need to know:
          </p>
          <ul className="text-inkl text-base md:text-lg leading-relaxed mb-8 space-y-1.5">
            <li>There will be other new moms.</li>
            <li>There will be kids having feelings.</li>
            <li>There will be snacks.</li>
            <li>Nobody cares what you're wearing.</li>
            <li>Nobody is counting miles.</li>
            <li>And nobody expects you to already belong.</li>
          </ul>
          <p className="font-serif italic text-2xl md:text-3xl text-ink">
            That's the whole invitation.
          </p>
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
// 3 Destinations — Survey / Homes / Trails
// ---------------------------------------------------------------------
const paths = [
  {
    to: '/welcome',
    eyebrow: 'Start here',
    heading: "What's your wilder week?",
    subtitle: 'A few questions about your week and your block — get a starting spot, three small swaps, and one quiet reset.',
    accentClass: 'bg-ember/15',
    blobFrom: '#B43C1E',
    blobTo: '#F2A57B',
    tag: '3 min · free',
  },
  {
    to: '/wilder-homes',
    eyebrow: 'For a yes-space at home',
    heading: 'Make room for play.',
    subtitle: 'Backyard, balcony, and doorstep builds where kids can start on their own using sticks, water, scraps, and what is already around.',
    accentClass: 'bg-olive/15',
    blobFrom: '#5A6428',
    blobTo: '#96963C',
  },
  {
    to: '/wilder-trails',
    eyebrow: 'For after-work',
    heading: 'Find somewhere to stop.',
    subtitle: 'A nearby route with a seat, some shade, and room to let them go on ahead without turning you into the trip leader.',
    accentClass: 'bg-gold/15',
    blobFrom: '#D2961E',
    blobTo: '#F2A57B',
  },
]

function ChooseYourPathTiles() {
  const [ref, visible] = useScrollReveal()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-blush/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Use what you need today
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-ink">
            Outside, without the production.
          </h2>
          <p className="text-inkll font-serif italic text-sm max-w-xl mx-auto mt-4">
            A neighborhood matters more than a backyard.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <motion.div
              key={p.to}
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
            >
              <Link
                to={p.to}
                className="group relative block bg-white rounded-3xl p-8 border-2 border-inkll/10 hover:border-ember/50 transition-all h-full"
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-50 blur-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${p.blobFrom} 0%, ${p.blobTo} 60%, transparent 100%)`,
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <p className={`text-[10px] uppercase tracking-[0.2em] font-medium mb-4 rounded-full px-3 py-1 inline-block self-start ${
                    p.tag
                      ? 'bg-ember text-white'
                      : `${p.accentClass} text-ember`
                  }`}>
                    {p.eyebrow}
                  </p>
                  <h3 className="font-serif italic text-3xl md:text-4xl text-ink mb-4">
                    {p.heading}
                  </h3>
                  <p className="font-sans text-inkl text-sm leading-relaxed flex-grow">
                    {p.subtitle}
                  </p>
                  {p.tag && (
                    <p className="mt-3 font-serif italic text-xs text-inkll">
                      {p.tag}
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-2 text-inkll group-hover:text-ember transition-colors">
                    <span className="font-sans text-xs uppercase tracking-wider">See the option</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
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
      <ManifestoCh1 />
      <CurrentDropShowcase />
      <ManifestoCh2And3 />
      <ManifestoCh4To6 />
      <ChooseYourPathTiles />
      <PremiumSubscriptionPitch />
    </>
  )
}
