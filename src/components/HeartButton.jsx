import { motion } from 'framer-motion'

// HeartButton
// A reusable save/unsave heart toggle for builds, crafts, and hikes.
// Usage:
//   <HeartButton
//     buildId={b.id}
//     buildType="build"
//     isSaved={savedBuilds.includes(b.id)}
//     onToggle={() => toggleSavedBuild(b.id)}
//   />
//
// Props:
//   buildId   - string  (the id of the item being toggled)
//   buildType - 'build' | 'craft' | 'hike' (used for aria-label)
//   isSaved   - boolean (current saved state, controlled)
//   onToggle  - function (called when the user taps the heart)
//   size      - 'sm' | 'md' | 'lg' (default 'md')
//   className - optional extra classes for the wrapper
// All sizes meet the 44px Apple HIG tap target minimum by adding min-h/min-w
// to the button itself; visual icon size stays close to original.
const SIZE_CLASSES = {
  sm: { button: 'p-2 min-h-[44px] min-w-[44px]', icon: 'w-5 h-5' },
  md: { button: 'p-2.5 min-h-[44px] min-w-[44px]', icon: 'w-6 h-6' },
  lg: { button: 'p-3 min-h-[48px] min-w-[48px]', icon: 'w-6 h-6' },
}

export default function HeartButton({
  buildId,
  buildType = 'build',
  isSaved = false,
  onToggle,
  size = 'md',
  className = '',
}) {
  const sizing = SIZE_CLASSES[size] || SIZE_CLASSES.md
  const label = isSaved ? `Unsave ${buildType}` : `Save ${buildType}`

  const handleClick = (e) => {
    // Prevent the click from bubbling up to parent Link/cards
    e.preventDefault()
    e.stopPropagation()
    if (typeof onToggle === 'function') {
      onToggle(buildId)
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      aria-pressed={isSaved}
      title={label}
      data-build-id={buildId}
      data-build-type={buildType}
      data-saved={isSaved ? 'true' : 'false'}
      className={`inline-flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm shadow-sm transition-colors ${sizing.button} ${
        isSaved
          ? 'text-ember'
          : 'text-inkll hover:text-ember'
      } ${className}`}
    >
      {isSaved ? (
        // Filled heart
        <svg
          className={sizing.icon}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        // Outline heart
        <svg
          className={sizing.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      )}
    </motion.button>
  )
}
