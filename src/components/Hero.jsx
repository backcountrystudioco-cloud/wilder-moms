import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUpVariants } from '../hooks/useScrollReveal'

const avatarInitials = ['MH', 'JL', 'SR', 'KC']

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-24 md:pt-0 md:min-h-screen">
      <div className="grid md:grid-cols-[0.9fr_1.1fr] md:min-h-screen">
        {/* Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-14 md:py-24">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-ember font-sans font-medium text-xs uppercase tracking-[0.2em]">
              Wilder Moms
            </span>
            <span className="w-1 h-1 rounded-full bg-inkll" />
            <span className="text-inkll font-sans text-xs uppercase tracking-[0.15em]">
              For the second shift
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif font-light text-5xl md:text-6xl lg:text-7xl text-ink leading-[0.95] mb-7 max-w-xl"
          >
            The kind of outside<br />
            <em className="text-ember">you choose over the couch.</em>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-inkl font-sans text-base md:text-lg leading-relaxed mb-4 max-w-lg"
          >
            Your day was full of rooms you couldn't leave. By 5 p.m. you love them,
            you're tired, and the couch has your name on it. Wilder finds the nearby
            places and small outside rituals where your kids get absorbed, you sit
            down, and the same neighbors are doing the same thing.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={2.5}
            className="text-ink font-serif text-xl italic mb-8 max-w-md"
          >
            Same trail. Same neighbors. Same parent half a bench away.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mb-4 flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/welcome"
              className="inline-flex items-center justify-center gap-2 bg-ember text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-terra transition-colors"
            >
              Find your wilder week
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/wilder-homes"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-medium text-sm text-ember border border-ember hover:bg-ember/5 transition-colors"
            >
              Browse wilder homes
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            className="text-inkll font-sans text-xs mb-7"
          >
            No packing list. No activity to lead. Start close to home.
            <br />
            <Link
              to="/wilder-trails"
              className="inline-flex items-center gap-1 mt-1 text-inkll hover:text-ember transition-colors"
            >
              Or check nearby trails
              <span aria-hidden="true">→</span>
            </Link>
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {avatarInitials.map((initials, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-cream bg-ember flex items-center justify-center"
                  style={{ zIndex: avatarInitials.length - i }}
                >
                  <span className="text-white font-sans font-medium text-xs">
                    {initials}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-inkl font-sans text-sm">
              <span className="font-medium text-ink">240+</span> moms choosing small starts
            </p>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={6}
            className="mt-6 max-w-md text-inkll font-serif italic text-sm leading-relaxed"
          >
            Daily outside beats occasional adventure.
          </motion.p>
        </div>

        {/* Visual: a child-led place with a mother's view */}
        <div className="relative min-h-[470px] md:min-h-0 overflow-hidden bg-forest">
          <img
            src="/builds/fairy-apothecary.png"
            alt="Children absorbed in an open-ended garden activity"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest/40 via-transparent to-ink/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute top-6 left-6 md:top-10 md:left-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-ink font-sans text-xs uppercase tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-olive" />
              The mother's view
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="absolute right-5 bottom-6 md:right-10 md:bottom-10 w-[min(20rem,calc(100%-2.5rem))] rounded-2xl bg-cream/95 p-5 shadow-2xl backdrop-blur-sm"
          >
            <p className="text-ember font-sans text-[10px] font-medium uppercase tracking-[0.2em] mb-2">
              A 5:42 p.m. kind of place
            </p>
            <h2 className="font-serif text-2xl text-ink leading-tight mb-3">
              You can see them. They can begin on their own.
            </h2>
            <div className="grid grid-cols-2 gap-2 text-inkl font-sans text-xs">
              <span className="border-t border-inkll/50 pt-2">A seat in the shade</span>
              <span className="border-t border-inkll/50 pt-2">Room to make a mess</span>
              <span className="border-t border-inkll/50 pt-2">One easy way in</span>
              <span className="border-t border-inkll/50 pt-2">No directing required</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
