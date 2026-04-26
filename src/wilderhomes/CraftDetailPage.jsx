import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { crafts } from './crafts'

export default function CraftDetailPage() {
  const { craftId } = useParams()
  const craft = crafts.find(c => c.id === craftId)

  if (!craft) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-ink mb-4">Craft not found</h2>
          <Link to="/wilder-homes/activities" className="text-ember font-medium">
            ← Back to Activities
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link to="/wilder-homes/activities" className="text-ember text-sm font-medium inline-flex items-center gap-1 hover:underline">
            ← Back to Activities
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspect-[16/9] bg-gradient-to-br from-blush/20 to-parchment rounded-3xl mb-8 flex items-center justify-center"
        >
          <span className="text-6xl opacity-50">🎨</span>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">{craft.title}</h1>
          <div className="flex items-center gap-4 text-sm text-inkl">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {craft.duration}
            </span>
            <span>·</span>
            <span>Ages {craft.ageRange}</span>
            {craft.indoor && (
              <>
                <span>·</span>
                <span className="bg-olive/10 text-olive px-2 py-0.5 rounded-full text-xs">Can be indoor</span>
              </>
            )}
          </div>
        </motion.header>

        {/* Materials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4">What you need</h2>
          <div className="bg-white rounded-2xl p-6 border border-inkll/10">
            <ul className="space-y-2">
              {craft.materials.map((material, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span className="text-ink font-sans">{material}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Instructions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-serif text-xl text-ink mb-4">How to make it</h2>
          <div className="bg-white rounded-2xl p-6 border border-inkll/10">
            <p className="text-inkl leading-relaxed font-sans text-lg">
              {craft.instructions}
            </p>
          </div>
        </motion.section>

        {/* Tips */}
        {craft.tips && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="font-serif text-xl text-ink mb-4">Tips & Variations</h2>
            <div className="bg-ember/5 rounded-2xl p-6 border border-ember/10">
              <ul className="space-y-2">
                {craft.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-inkl">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
                    <span className="font-sans">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* Back to Activities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/wilder-homes/activities"
            className="inline-flex items-center gap-2 text-ember font-medium hover:underline"
          >
            ← Back to all activities
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
