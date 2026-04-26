import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBuildById, getRelatedBuilds } from './builds'
import BuildCard from './BuildCard'

export default function BuildDetailPage() {
  const { buildId } = useParams()
  const build = getBuildById(buildId)
  const relatedBuilds = getRelatedBuilds(buildId)

  if (!build) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-ink mb-4">Build not found</h2>
          <Link to="/wilder-homes/activities" className="text-ember font-medium">
            ← Back to Activities
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
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
          <span className="text-6xl opacity-50">
            {build.category === 'Mud Kitchens' ? '🍽️' :
             build.category === 'Garden Beds' ? '🌱' :
             build.category === 'Nature Play' ? '🦋' :
             build.category === 'Climbing Structures' ? '🧗' :
             build.category === 'Water Play' ? '💧' :
             build.category === 'Cozy Hideouts' ? '🏕️' :
             build.category === 'Weekend Builds' ? '🔨' : '✨'}
          </span>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium uppercase tracking-wider text-ember px-3 py-1 bg-ember/10 rounded-full">
              {build.category}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              build.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              build.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {build.difficulty}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">{build.title}</h1>
          <p className="text-xl text-inkl leading-relaxed">{build.description}</p>
        </motion.header>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Time', value: build.timeEstimate },
            { label: 'Ages', value: build.ageRange },
            { label: 'Cost', value: build.cost },
            { label: 'Tools', value: build.tools?.length ? `${build.tools.length} items` : '-' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center border border-inkll/10">
              <p className="text-[10px] uppercase tracking-wider text-inkll mb-1">{item.label}</p>
              <p className="font-sans font-medium text-ink">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl text-ink mb-6">Steps</h2>
          <div className="space-y-4">
            {build.steps?.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-inkll/10">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-ember/10 text-ember font-medium flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-ink mb-2">{step.title}</h3>
                    <p className="text-inkl leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Materials */}
        {build.materials && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl text-ink mb-6">Materials</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {build.materials.map((material, index) => (
                <a
                  key={index}
                  href={material.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-4 border border-inkll/10 hover:border-ember/30 transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-sans font-medium text-ink">{material.name}</p>
                    <p className="text-xs text-inkll">Qty: {material.quantity}</p>
                  </div>
                  <svg className="w-4 h-4 text-inkll" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tips */}
        {build.tips && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl text-ink mb-6">Pro Tips</h2>
            <div className="bg-ember/5 rounded-2xl p-6 border border-ember/10">
              <ul className="space-y-3">
                {build.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-inkl">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0 mt-2" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* Related Builds */}
        {relatedBuilds.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-serif text-2xl text-ink mb-6">Related Builds</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBuilds.map((relatedBuild, index) => (
                <BuildCard key={relatedBuild.id} build={relatedBuild} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
