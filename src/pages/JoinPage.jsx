import { motion } from 'framer-motion'
import EmailCapture from '../components/EmailCapture'

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Join the Wilder Moms Village
          </h1>
          <p className="font-sans text-inkl text-lg">
            Get personalized trail recommendations, connect with local moms, and discover outdoor adventures that actually work for your family.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <EmailCapture 
            criteria="Join page signup" 
            inline={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="font-sans text-inkl text-sm mb-6">What you'll get:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Trail Recs', desc: 'Personalized to your family' },
              { title: 'Local Connections', desc: 'Meet moms near you' },
              { title: 'Weekend Ideas', desc: 'Curated outdoor activities' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blush flex items-center justify-center">
                  <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-ink mb-1">{item.title}</h3>
                <p className="font-sans text-xs text-inkl">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
