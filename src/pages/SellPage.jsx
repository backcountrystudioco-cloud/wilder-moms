// SellPage — dedicated conversion page for the full Wilder Habitat analysis.
// Reached from the landing-page CTA "Build my Wilder Habitat". Goes deeper
// than the landing (which is a teaser) so a returning visitor gets the full
// pitch before committing to the field check.
//
// The bottom CTA sets a sessionStorage flag and navigates to `/` —
// OnboardingFlow reads that flag on mount and skips the welcome straight to
// the brand cards reading.

import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthCorner from '../wilder-index/AuthCorner'

const HABITAT_SKIP_FLAG = 'wilder_habitat_skip_welcome'

const STEPS = [
  {
    n: '01',
    eyebrow: 'Step one',
    title: 'A 5-minute field check.',
    body: 'Seven short chapters — your block, your family, your routines. Behavioral questions, not a personality quiz. There\'s no wrong answer and you can come back to it.',
    time: 'About five minutes',
  },
  {
    n: '02',
    eyebrow: 'Step two',
    title: 'We read your pattern.',
    body: 'Your answers build a six-dimension picture of your family\'s outdoor life — what\'s already strong, what\'s missing, and where one small change has the highest likelihood of mattering.',
    time: 'Instant',
  },
  {
    n: '03',
    eyebrow: 'Step three',
    title: 'One action each week.',
    body: 'Every week you receive one specific Habitat Shift — picked for your home, your block, and your week. Plus, once a month, an architectural move for the home itself. No articles. No tips list. One thing.',
    time: 'Weekly',
  },
]

const SAMPLE_CARDS = [
  {
    eyebrow: 'Today at home · Belonging',
    title: 'Sit on the stoop with the people next door for ten minutes.',
    body: 'Same time, three days in a row. Familiarity is the smallest and most powerful neighborhood shift.',
    time: '10 minutes',
    tag: 'Habitat Shift',
  },
  {
    eyebrow: 'This month · Wonder',
    title: 'Move one chair to where the light comes in.',
    body: 'A chair with a view is five minutes, not a setup. Yours said energy is the obstacle — this fits in the seams of the day.',
    time: '5 minutes · free',
    tag: 'Architectural Move',
  },
  {
    eyebrow: 'For Tacoma, WA',
    title: 'Make your local library a regular stop.',
    body: 'One Saturday morning for a month. Belonging compounds when faces recognize you.',
    time: 'This week',
    tag: 'Local Recommendation',
  },
]

const FAQ = [
  {
    q: 'How long does the field check take?',
    a: 'About five minutes. Seven short chapters, each with a handful of questions. You can pause and come back — your answers save automatically as you go.',
  },
  {
    q: 'What if I don\'t know what to answer?',
    a: 'Pick the closest one. There\'s no wrong answer, and a guess is more useful than a blank. The reading is shaped by your actual week, not by what you wish it were.',
  },
  {
    q: 'Will my answers be saved if I leave?',
    a: 'Yes. We save every answer as you go, locally on your device. Sign in and your progress syncs across devices so you can pick up anywhere.',
  },
  {
    q: 'What does it cost?',
    a: 'The full Habitat analysis and weekly recommendations are part of Wilder Moms. The paid pieces — premium builds, deeper trail guides — are optional. You can use everything in the field check and reading without paying anything.',
  },
]

function StartButton({ children, className = '' }) {
  const navigate = useNavigate()
  const onClick = () => {
    try {
      sessionStorage.setItem(HABITAT_SKIP_FLAG, '1')
    } catch (e) {
      // ignore storage failures; OnboardingFlow still works without the flag
    }
    navigate('/')
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 bg-ember text-white px-10 py-4 rounded-full font-medium text-base hover:bg-terra transition-colors ${className}`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </button>
  )
}

export default function SellPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="pt-6 md:pt-8">
        <AuthCorner />
      </div>

      {/* HERO */}
      <section className="px-6 pt-14 md:pt-20 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/wilder-moms-logo.jpeg"
            alt="Wilder Moms"
            className="h-32 md:h-40 w-auto mx-auto mb-8"
          />
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-7">
            The full Wilder Habitat
          </p>
          <h1 className="font-serif font-light text-5xl md:text-7xl text-ink leading-[0.95] mb-10">
            A complete read of your family's <em className="text-ember">outdoor life.</em>
          </h1>
          <p className="font-serif text-xl md:text-2xl text-ink leading-snug max-w-2xl mx-auto">
            One five-minute field check. Six dimensions. A reading. One specific
            action each week, picked for your home, your block, and the life you
            actually live.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-parchment px-6 py-16 md:py-24 border-y border-inkll/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3 text-center">
            How it works
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-12 md:mb-16">
            Three steps. Then it lives in your week.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-inkll/10 p-7"
              >
                <p className="text-ember font-serif text-3xl mb-3">{s.n}</p>
                <p className="text-inkll text-[10px] font-medium uppercase tracking-[0.18em] mb-2">
                  {s.eyebrow}
                </p>
                <h3 className="font-serif text-2xl text-ink leading-snug mb-3">
                  {s.title}
                </h3>
                <p className="text-inkl text-base leading-relaxed mb-4">
                  {s.body}
                </p>
                <p className="text-inkll text-xs uppercase tracking-wider">
                  {s.time}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE WEEK */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3 text-center">
            A sample week
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-4">
            What you'll see in your dashboard.
          </h2>
          <p className="text-inkl text-base text-center max-w-xl mx-auto mb-10 md:mb-12">
            Three small moves this week. One for the home. One for the block.
            One place chosen for your family.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {SAMPLE_CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-inkll/10 p-6 flex flex-col"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-inkll mb-2">
                  {c.eyebrow}
                </p>
                <h4 className="font-serif text-lg text-ink leading-tight mb-3">
                  {c.title}
                </h4>
                <p className="text-inkl text-sm leading-relaxed flex-1 mb-4">
                  {c.body}
                </p>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-inkll">
                  <span>{c.time}</span>
                  <span className="bg-ember/10 text-ember px-2 py-0.5 rounded-full">
                    {c.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-parchment px-6 py-16 md:py-24 border-y border-inkll/10">
        <div className="max-w-xl mx-auto">
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3 text-center">
            What you get
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-10">
            The full Habitat analysis.
          </h2>
          <ul className="space-y-3 md:space-y-4">
            {[
              'A complete analysis of your family\'s Habitat',
              'Your highest-impact opportunities',
              'Weekly personalized Habitat recommendations',
              'Local places chosen specifically for your family',
              'Seasonal guidance that evolves with your children',
              'Ongoing updates as your family and routines change',
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-inkl text-base md:text-lg leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 mt-1.5 w-4 h-4 rounded-full bg-ember/15 border border-ember/40 flex items-center justify-center"
                >
                  <span className="block w-1.5 h-1.5 rounded-full bg-ember" />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <p className="text-ember text-xs font-medium uppercase tracking-[0.2em] mb-3 text-center">
            Common questions
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-10">
            The short answers.
          </h2>
          <div className="space-y-6 md:space-y-8">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-inkll/10 pb-6 md:pb-8 last:border-b-0">
                <h3 className="font-serif text-lg md:text-xl text-ink mb-2">
                  {item.q}
                </h3>
                <p className="text-inkl text-base leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-ink text-white px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif font-light text-3xl md:text-5xl leading-tight">
            Stop guessing.
          </p>
          <p className="font-serif italic text-gold text-3xl md:text-5xl leading-tight mt-2">
            Start building.
          </p>
          <p className="font-serif text-base md:text-lg text-cream/80 mt-10 leading-relaxed max-w-md mx-auto">
            Because extraordinary childhoods aren't created by doing more.
            <br />
            They're created by doing the right things, consistently.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <p className="text-inkll text-xs uppercase tracking-[0.18em] mb-5">
            Five minutes · Seven chapters
          </p>
          <StartButton>Start my Wilder Habitat</StartButton>
          <Link
            to="/discover"
            className="block mt-4 text-ink font-medium text-sm hover:text-terra transition-colors"
          >
            Try the free 3-minute reading first →
          </Link>
          <p className="text-inkll text-[11px] mt-2 italic">
            Get a taste of the reading before committing to the full thing.
          </p>
        </div>
      </section>
    </div>
  )
}
