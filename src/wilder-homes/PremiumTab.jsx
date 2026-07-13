import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import { fadeUpVariants } from '../hooks/useScrollReveal'
import { useBuildsAccess } from '../hooks/useBuildsAccess'
import {
  premiumBuilds,
  pricing,
  annualSavings,
  TYPES,
  getCurrentDrop,
  getPastDrops,
  getFutureDrops,
} from '../wilder-builds/buildsLibrary'
import PaywallCard from '../components/PaywallCard'

// PremiumTab — the 6th tab on Wilder Homes ("Premium Builds").
// Replaces the former /wilder-builds subscription landing.
//
// ADAPTIVE. Renders based on subscription status:
//   status === 'loading' → SkeletonView (warm welcome card)
//   status === 'active'  → LibraryView (your drops, your stuff)
//   otherwise            → MarketingView (the pitch)
// No separate /library route — the tab URL stays the same.

// =====================================================================
// SkeletonView — quiet, warm welcome card. Feels intentional, not waiting.
// Cream background, no spinner.
// =====================================================================
function SkeletonView() {
  return (
    <div className="min-h-screen bg-cream pt-28 md:pt-32 pb-24 md:pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-4 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-cream via-cream to-olive/10 border border-olive/20 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-gold to-ember flex items-center justify-center text-3xl">
            Key
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-olive mb-2">
            Welcome
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink italic mb-3 leading-tight">
            Pulling up your library…
          </h2>
          <p className="text-inkl text-sm leading-relaxed max-w-md mx-auto">
            Give us a sec to check your subscription and line up your drops.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// =====================================================================
// WelcomeModal — ?subscribed=1 celebration. Auto-dismisses after 6.5s.
// Used inside LibraryView for fresh subscribers.
// =====================================================================
function WelcomeModal({ onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-md"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
        className="bg-white rounded-3xl shadow-2xl shadow-ink/30 max-w-md w-full p-8 md:p-10 text-center relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-olive/20 blur-3xl pointer-events-none" />
        <div className="relative">
          <motion.div
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
            className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-gold to-ember flex items-center justify-center text-4xl"
          >
            Key
          </motion.div>
          <p className="text-xs font-medium uppercase tracking-widest text-ember mb-2">
            Welcome to the library
          </p>
          <h3 className="font-serif text-3xl text-ink italic mb-2 leading-tight">
            Your builds are unlocked.
          </h3>
          <p className="text-inkl mb-6 leading-relaxed">
            Download anytime. We also sent the links to your email — check your inbox in a minute or two.
          </p>
          <button
            onClick={onDismiss}
            className="inline-flex items-center gap-2 bg-ember text-white px-6 py-3 rounded-full font-medium hover:bg-terra transition-colors"
          >
            Open the library
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// =====================================================================
// LibraryView — for active subscribers. Warmer, less sales-y.
// Header: "Welcome back. Your Wilder Builds library."
// Body: active-member banner + DropTimeline (current pinned + past) + Manage subscription
// =====================================================================
function LibraryView() {
  const { subscription } = useBuildsAccess()
  const [searchParams, setSearchParams] = useSearchParams()
  const justSubscribed = searchParams.get('subscribed') === '1'
  const [showWelcome, setShowWelcome] = useState(justSubscribed)

  useEffect(() => {
    if (!showWelcome) return
    const t = setTimeout(() => {
      setShowWelcome(false)
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev)
          next.delete('subscribed')
          return next
        },
        { replace: true }
      )
    }, 6500)
    return () => clearTimeout(t)
  }, [showWelcome, setSearchParams])

  return (
    <div className="min-h-screen bg-cream pt-28 md:pt-32 pb-24 md:pb-20">
      {/* Welcome animation overlay */}
      <AnimatePresence>
        {showWelcome && <WelcomeModal onDismiss={() => setShowWelcome(false)} />}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        custom={0}
        className="text-center mb-8 pt-4 max-w-3xl mx-auto px-4"
      >
        <p className="text-inkll text-xs font-medium uppercase tracking-widest mb-3">
          WILDER HOMES · YOUR LIBRARY
        </p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-ember leading-tight">
          Welcome back.
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-ink mt-2 leading-snug">
          Your Premium Builds library.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Active-member banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-olive/15 via-cream to-gold/15 border border-olive/30 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-olive flex items-center justify-center text-white text-lg flex-shrink-0">
              Key
            </div>
            <div>
              <p className="font-serif text-lg text-ink leading-tight">You're a member.</p>
              <p className="text-sm text-inkl">
                Renews{' '}
                {subscription?.current_period_end
                  ? new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })
                  : 'soon'}
                . Download anytime below.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Full library timeline: current pinned + past chronologically. No future teasers. */}
        <DropTimeline hasAccess={true} justUnlocked={showWelcome} showUpcoming={false} />

        {/* Manage subscription */}
        <div className="mt-14 text-center">
          <a
            href="https://app.lemonsqueezy.com/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-ember hover:text-terra"
          >
            Manage subscription →
          </a>
          {subscription?.current_period_end && (
            <p className="text-xs text-inkll mt-2">
              {`Renews ${new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}`}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// MarketingView — for non-subscribers (none | cancelled | expired).
// Hero, pricing callout, free-vs-premium comparison, library timeline
// (teaser), inline paywall card, founder block, free opt-in, testimonial.
// =====================================================================
function MarketingView() {
  const { status } = useBuildsAccess()
  const isExpired = status === 'expired'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        custom={0}
        className="text-center mb-8 pt-4 max-w-3xl mx-auto px-4"
      >
        <p className="text-inkll text-xs font-medium uppercase tracking-widest mb-3">
          {isExpired ? 'WILDER HOMES · WELCOME BACK' : 'WILDER HOMES · PREMIUM BUILDS'}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-ember leading-tight">
          {isExpired ? 'Pick up where you left off.' : 'Two new build PDFs every month.'}
        </h1>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        {/* What members get */}
        <div className="mb-14 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-inkll/10 text-center">
            <div className="text-4xl mb-3">Phial</div>
            <h4 className="font-serif text-lg text-ink mb-2">Designed, not dumped</h4>
            <p className="text-inkl text-sm">
              Every guide is laid out like a small book. Print it. Read it on a tablet. Use it in the yard with dirty hands.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-inkll/10 text-center">
            <div className="text-4xl mb-3">Child</div>
            <h4 className="font-serif text-lg text-ink mb-2">Tested by tiny humans</h4>
            <p className="text-inkl text-sm">
              Every build has been built by a real kid, with real hands, in a real backyard. Nothing theoretical here.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-inkll/10 text-center">
            <div className="text-4xl mb-3">Sparkle</div>
            <h4 className="font-serif text-lg text-ink mb-2">New drops the 1st</h4>
            <p className="text-inkl text-sm">
              Two themed PDFs land every month. Spring gardens. Summer water play. Fall science. Winter forts.
            </p>
          </div>
        </div>

        {/* Pricing callout */}
        <div className="mb-14 bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-4 left-4 text-8xl">Phial</div>
            <div className="absolute bottom-4 right-4 text-8xl">Mycelium</div>
          </div>
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-2">
              Wilder Homes · Premium Builds subscription
            </p>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-4 leading-tight">
              Two new PDFs every month.<br />Your library grows.
            </h2>

            <div className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 bg-white/15 backdrop-blur rounded-2xl sm:rounded-full p-1 my-2">
              <PricePill
                active
                amount={pricing.monthly.formatted}
                cadence={pricing.monthly.cadence}
                sub="Try it light"
              />
              <PricePill
                amount={pricing.annual.formatted}
                cadence={pricing.annual.cadence}
                sub={`Save $${annualSavings}`}
                badge="Best value"
              />
            </div>

            <p className="text-white/80 text-sm mt-6 mb-2 max-w-xl mx-auto leading-relaxed">
              Garden builds, water play, science kits, art invitations. Each drop is printable and tested
              by real kids. Cancel anytime — keep everything you've ever downloaded.
            </p>

            <a
              href="#start"
              onClick={e => { e.preventDefault(); document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 bg-white text-forest px-7 py-3.5 rounded-full font-sans font-semibold hover:bg-cream transition-colors mt-4"
            >
              {isExpired ? 'Renew your subscription' : 'Start your subscription'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/70 text-xs mt-5">
              <div className="flex items-center gap-1">
                <span className="text-gold">Star</span>
                <span>4.9 rating from 200+ families</span>
              </div>
              <div className="w-px h-4 bg-white/30" />
              <div>Cancel anytime</div>
              <div className="w-px h-4 bg-white/30" />
              <div>Lifetime re-downloads</div>
            </div>
          </div>
        </div>

        {/* Free vs premium comparison */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <p className="text-xs font-medium uppercase tracking-widest text-ember mb-1">
              What's the difference
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-ink italic">
              Free guides vs the Premium Builds library.
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-inkll/15 p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-inkll mb-2">Free Guides</p>
              <p className="font-serif text-2xl text-ink mb-1">Always free</p>
              <p className="text-3xl font-serif text-ink mb-6">$0</p>
              <ul className="space-y-3 text-sm text-inkl">
                <li className="flex gap-2"><span className="text-olive">✓</span> 70+ step-by-step DIY guides</li>
                <li className="flex gap-2"><span className="text-olive">✓</span> Materials lists + cost breakdowns</li>
                <li className="flex gap-2"><span className="text-olive">✓</span> Open access — no sign-in</li>
                <li className="flex gap-2"><span className="text-olive">✓</span> Interactive tools (Wild Room, Architect)</li>
                <li className="flex gap-2"><span className="text-inkll/40">—</span> <span className="text-inkll">Web-based, not designed for print</span></li>
                <li className="flex gap-2"><span className="text-inkll/40">—</span> <span className="text-inkll">No monthly themed drops</span></li>
              </ul>
              <Link
                to="/wilder-homes"
                className="mt-6 w-full py-3 text-center bg-cream text-ink font-medium rounded-full hover:bg-parchment transition-colors text-sm block"
              >
                Browse free guides
              </Link>
            </div>

            <div className="relative bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] rounded-2xl p-6 md:p-8 text-white">
              <div className="absolute top-4 right-4 bg-gold text-ink text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                Members
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-2">
                Wilder Homes · Premium Builds
              </p>
              <p className="font-serif text-2xl mb-1">Beautifully designed PDFs</p>
              <p className="text-3xl font-serif mb-1">
                {pricing.monthly.formatted}
                <span className="text-base text-white/70">{pricing.monthly.cadence}</span>
                <span className="text-sm text-white/60 ml-2">
                  · or {pricing.annual.formatted}{pricing.annual.cadence}
                </span>
              </p>
              <p className="text-xs text-white/60 mb-6">Cancel anytime · You keep everything you've downloaded</p>
              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex gap-2"><span className="text-gold">✓</span> Two new themed PDFs every month (1st)</li>
                <li className="flex gap-2"><span className="text-gold">✓</span> Designed for tablet, phone, and print</li>
                <li className="flex gap-2"><span className="text-gold">✓</span> Each build tested by real kids first</li>
                <li className="flex gap-2"><span className="text-gold">✓</span> Library grows — keep every drop forever</li>
                <li className="flex gap-2"><span className="text-gold">✓</span> Re-download anytime</li>
                <li className="flex gap-2"><span className="text-gold">✓</span> Members-only build questions thread</li>
              </ul>
              <a
                href="#start"
                onClick={e => { e.preventDefault(); document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="mt-6 w-full py-3 text-center bg-white text-forest font-semibold rounded-full hover:bg-cream transition-colors text-sm block"
              >
                {isExpired ? 'Renew your subscription' : 'Start your subscription'}
              </a>
            </div>
          </div>
        </div>

        {/* Library timeline (teaser) */}
        <div id="builds-library" className="mb-14 scroll-mt-24">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-ember mb-1">
                The library
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-ink italic">
                What'll be in your library.
              </h3>
            </div>
            <p className="text-inkl text-sm hidden md:block max-w-md text-right">
              Two themed PDFs every month — your library grows with you.
            </p>
          </div>

          <DropTimeline hasAccess={false} justUnlocked={false} />

          {/* Inline paywall — the actual CTA */}
          <div id="start" className="scroll-mt-24 mt-12">
            <PaywallCard
              variant="banner"
              headline={isExpired ? 'Renew your Premium Builds subscription' : 'Start the Premium Builds subscription'}
              subhead={
                isExpired
                  ? "Pick up your library where you left off. Two themed PDFs every month, beautifully designed for tablet or print."
                  : undefined
              }
            />
          </div>
        </div>

        {/* Founder block */}
        <div className="mb-14 grid md:grid-cols-[200px_1fr] gap-8 items-center bg-white rounded-3xl p-8 md:p-10 border border-inkll/10">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full mx-auto md:mx-0 bg-gradient-to-br from-blush via-peach to-terra flex items-center justify-center text-5xl md:text-6xl shadow-lg shadow-terra/20">
            Founder
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-ember mb-2">
              Why we built this
            </p>
            <p className="font-serif text-2xl md:text-3xl text-ink italic leading-snug mb-4">
              "I spent six months collecting these builds from homesteaders, herbalists, mycologists, and my own grandmother's garden.
              <br className="hidden md:block" />
              Then I designed them so a tired mom could print, prop up on the kitchen counter, and build that weekend."
            </p>
            <p className="text-inkl text-sm">
              — Melissa, founder of Wilder Moms · mother of three wild ones
            </p>
          </div>
        </div>

        {/* Email opt-in for not-ready visitors */}
        <FreeSampleOptIn />

        {/* Testimonial */}
        <div className="mt-14 mb-14 p-8 bg-parchment rounded-2xl text-center">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className="text-2xl text-ember">Star</span>
            ))}
          </div>
          <p className="font-serif text-xl text-ink italic mb-4 max-w-2xl mx-auto">
            "We built the mud kitchen last spring and my kids still use it every single day.
            It's become the heart of our backyard. Worth every penny."
          </p>
          <p className="text-inkl text-sm">— Sarah, mother of 3, Portland OR</p>
        </div>

        {/* Cross-link to free content */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-inkll/20 text-center">
          <p className="text-inkl text-sm mb-3">
            Looking for our free build guides, the Wild Room designer, or the Wilder Camp Architect?
          </p>
          <Link
            to="/wilder-homes"
            className="inline-flex items-center gap-2 text-ember font-medium hover:text-terra"
          >
            Browse the free library →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function PricePill({ amount, cadence, sub, badge, active }) {
  return (
    <div
      className={
        'relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors ' +
        (active ? 'bg-white text-forest shadow-sm' : 'text-white/80')
      }
    >
      {badge && (
        <span className="absolute -top-2 -right-2 bg-gold text-ink text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow">
          {badge}
        </span>
      )}
      <span className="font-serif text-base">{amount}</span>
      <span className="text-xs ml-1 opacity-70">{cadence}</span>
      {sub && <span className="block text-[10px] opacity-60 mt-0.5">{sub}</span>}
    </div>
  )
}

// DropCompositionBadge — small chip showing what types a drop contains
function DropCompositionBadge({ composition, pinned }) {
  const labels = {
    architect: pinned ? 'bg-white/15 text-white' : 'bg-ember/10 text-ember border-ember/30',
    lab: pinned ? 'bg-white/15 text-white' : 'bg-olive/15 text-olive border-olive/30',
    'architect+lab': pinned ? 'bg-white/15 text-white' : 'bg-gold/15 text-ink border-gold/40',
  }
  const text = {
    architect: 'Architect Blueprint',
    lab: 'Lab Activity',
    'architect+lab': 'Architect + Lab',
  }
  if (!composition || !labels[composition]) return null
  return (
    <span className={`text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border ${labels[composition]}`}>
      {text[composition]}
    </span>
  )
}

// =====================================================================
// DropTimeline — current drop pinned + past drops + (optional) future teasers
// Used by both LibraryView (hasAccess=true, showUpcoming=false) and
// MarketingView (hasAccess=false, showUpcoming=true).
// =====================================================================
function DropTimeline({ hasAccess, justUnlocked, showUpcoming = true }) {
  const [filter, setFilter] = useState('all') // 'all' | 'architect' | 'lab'
  const currentDrop = getCurrentDrop()
  const pastDropsRaw = getPastDrops().filter(d => !currentDrop || d.id !== currentDrop.id)
  const futureDrops = getFutureDrops()

  // For filtering, the matching drop includes a build of the requested type
  const matchesFilter = (drop) => {
    if (filter === 'all') return true
    const builds = (premiumBuilds || []).filter(b => b.dropId === drop.id)
    return builds.some(b => b.type === filter)
  }

  const currentDropVisible = currentDrop && matchesFilter(currentDrop)
  const pastDrops = pastDropsRaw.filter(matchesFilter)
  const futureVisible = futureDrops.filter(matchesFilter)

  const byDropId = premiumBuilds.reduce((acc, b) => {
    if (!acc[b.dropId]) acc[b.dropId] = []
    acc[b.dropId].push(b)
    return acc
  }, {})

  if (!currentDrop && pastDropsRaw.length === 0 && futureDrops.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-inkll/15">
        <p className="text-inkl">The next drop arrives on the 1st. Subscribe to get notified.</p>
      </div>
    )
  }

  const noVisibleDrops = !currentDropVisible && pastDrops.length === 0 && futureVisible.length === 0

  return (
    <div className="space-y-8">
      {/* Type filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-inkll mr-1">Show:</span>
        {[
          { id: 'all', label: 'All content' },
          { id: 'architect', label: 'Architect blueprints' },
          { id: 'lab', label: 'Lab activities' },
        ].map(opt => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setFilter(opt.id)}
            className={`px-4 py-2.5 min-h-[44px] inline-flex items-center rounded-full text-xs font-medium border transition-colors ${
              filter === opt.id
                ? 'bg-ink text-cream border-ink'
                : 'bg-white text-inkl border-inkll/30 hover:border-inkl/60 hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {noVisibleDrops && (
        <div className="bg-white rounded-3xl p-10 text-center border border-inkll/15">
          <p className="text-inkl">
            No {filter === 'architect' ? 'architect blueprints' : 'lab activities'} in your library yet.
            {' '}
            <button type="button" onClick={() => setFilter('all')} className="text-ember underline hover:text-ink">
              Show all content
            </button>
          </p>
        </div>
      )}

      {currentDropVisible && (
        <DropSection
          drop={currentDrop}
          builds={byDropId[currentDrop.id] || []}
          pinned
          hasAccess={hasAccess}
          justUnlocked={justUnlocked}
          index={0}
        />
      )}

      {pastDrops.length > 0 && (
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-inkll mb-4 mt-4">
            Past drops
          </p>
          <div className="space-y-6">
            {pastDrops.map((drop, i) => (
              <DropSection
                key={drop.id}
                drop={drop}
                builds={byDropId[drop.id] || []}
                hasAccess={hasAccess}
                justUnlocked={false}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      )}

      {showUpcoming && futureDrops.length > 0 && (
        <div className="opacity-70">
          <p className="text-xs font-medium uppercase tracking-widest text-inkll mb-4 mt-4">
            Coming up
          </p>
          {futureVisible.map(drop => (
            <div
              key={drop.id}
              className="bg-cream/50 border border-dashed border-inkll/30 rounded-2xl p-6 mb-3"
            >
              <p className="text-xs uppercase tracking-widest text-inkll mb-1">
                {drop.month} {drop.year}
              </p>
              <p className="font-serif text-xl text-ink italic">{drop.title}</p>
              {drop.subtitle && <p className="text-inkl text-sm mt-1">{drop.subtitle}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DropSection({ drop, builds, pinned = false, hasAccess, justUnlocked, index }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={
        pinned
          ? `relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br ${drop.cover || 'from-[#5A3C00] via-[#8C4A14] to-[#D2961E]'}`
          : 'bg-cream/30 rounded-3xl p-6 md:p-8 border border-inkll/10'
      }
    >
      {pinned && (
        <>
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-ember/20 blur-3xl pointer-events-none" />
        </>
      )}
      <div className={pinned ? 'relative' : ''}>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {pinned ? (
            <span className="bg-gold text-ink text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              Latest drop · {drop.month} {drop.year}
            </span>
          ) : (
            <span className="text-xs font-medium uppercase tracking-widest text-inkll">
              {drop.month} {drop.year}
            </span>
          )}
          {drop.composition && (
            <DropCompositionBadge composition={drop.composition} pinned={pinned} />
          )}
          {drop.theme && !drop.composition && (
            <span className={`text-xs ${pinned ? 'text-white/70' : 'text-inkll'}`}>· {drop.theme}</span>
          )}
        </div>
        <h3 className={pinned ? 'font-serif text-2xl md:text-3xl text-white italic mb-2' : 'font-serif text-2xl text-ink italic mb-1'}>
          {drop.title}
        </h3>
        {drop.subtitle && (
          <p className={pinned ? 'text-white/80 max-w-2xl mb-6 text-sm md:text-base' : 'text-inkl text-sm mb-4'}>
            {drop.subtitle}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {builds.map((build, i) => (
            <PremiumBuildCard
              key={build.id}
              build={build}
              index={i}
              hasAccess={hasAccess}
              justUnlocked={justUnlocked && pinned}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function PremiumBuildCard({ build, index, hasAccess, justUnlocked }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: justUnlocked ? [1, 1.02, 1] : 1,
      }}
      transition={{
        delay: index * 0.12,
        duration: 0.5,
        scale: { duration: 0.8, times: [0, 0.5, 1] },
      }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-inkll/10 group flex flex-col"
    >
      <Link to={`/wilder-homes/premium/${build.slug}`} className="block">
        <div className={`relative aspect-[4/3] bg-gradient-to-br ${build.coverGradient} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
            <span className="text-[8rem] leading-none">{build.heroEmoji}</span>
          </div>
          <AnimatePresence>
            {!hasAccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 right-4 bg-ink/85 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a4 4 0 00-4 4v3H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 7V6a2 2 0 114 0v3H8z" />
                </svg>
                Members only
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/70 to-transparent">
            <p className="text-white text-xs italic line-clamp-2 leading-snug">
              <span className="text-gold mr-1">Sparkle</span>
              {build.magicFact}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {build.type && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase tracking-wider border ${(TYPES[build.type]?.chipClass) || 'bg-ink/10 text-ink border-ink/20'}`}>
              {build.typeLabel || TYPES[build.type]?.short || build.type}
            </span>
          )}
          <span className="text-inkll text-xs">{build.category}</span>
          <span className="text-inkll text-xs">·</span>
          <span className="text-inkll text-xs">{build.pages} pages</span>
        </div>
        <h3 className="font-serif text-2xl text-ink italic mb-2">{build.title}</h3>
        <p className="text-inkl text-sm leading-relaxed mb-5 flex-1">
          {build.subtitle}
        </p>

        <div className="flex items-center justify-between">
          <Link
            to={`/wilder-homes/premium/${build.slug}`}
            className="text-ember font-medium text-sm hover:text-terra inline-flex items-center gap-1"
          >
            {hasAccess ? 'View & download' : "See what's inside"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          {!hasAccess && (
            <span className="text-xs text-inkll">
              {build.ageRange} · {build.timeEstimate.split('+')[0].trim()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// =====================================================================
// FreeSampleOptIn — soft fallback for not-ready visitors
// =====================================================================
function FreeSampleOptIn() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          criteria: { source: 'wilder-builds-library-optin' },
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Could not save your email')
      }
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="mb-14 bg-cream rounded-3xl p-8 md:p-10 border border-inkll/15">
      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-olive mb-2">
            Not ready to subscribe?
          </p>
          <h3 className="font-serif text-2xl text-ink italic mb-2">
            Get the free Fairy Apothecary sample chapter.
          </h3>
          <p className="text-inkl text-sm leading-relaxed">
            The first 8 pages of the PDF, delivered to your inbox. See the design quality, the table of contents, the build approach — then decide if the full library is for you.
          </p>
        </div>
        {status === 'success' ? (
          <div className="bg-olive/15 border border-olive/30 rounded-2xl p-5 md:min-w-[280px]">
            <p className="font-serif text-xl text-ink mb-1">On its way.</p>
            <p className="text-sm text-inkl">Check {email} in a minute or two.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3 md:min-w-[300px]">
            <input
              type="text"
              required
              placeholder="First name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-inkll/20 bg-white text-ink placeholder:text-inkll/60 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all text-sm"
            />
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full border border-inkll/20 bg-white text-ink placeholder:text-inkll/60 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember transition-all text-sm"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-5 py-3 bg-ember text-white font-medium rounded-full hover:bg-terra transition-colors text-sm whitespace-nowrap disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Send sample'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-terra">{error || 'Could not save. Try again.'}</p>
            )}
            <p className="text-xs text-inkll">
              One email, no spam, unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

// =====================================================================
// Page entry — the "Premium Builds" tab content on Wilder Homes.
// Adaptive shell: switches between LibraryView, MarketingView, SkeletonView.
// =====================================================================
export default function PremiumTab() {
  const { status } = useBuildsAccess()

  if (status === 'loading') {
    return <SkeletonView />
  }

  if (status === 'active') {
    return <LibraryView />
  }

  return <MarketingView />
}
