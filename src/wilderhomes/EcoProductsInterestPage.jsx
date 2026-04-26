import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function EcoProductsInterestPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleInterest = () => {
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          to="/wilder-homes" 
          className="text-ember text-sm font-medium mb-6 inline-flex items-center gap-1 hover:underline"
        >
          ← Back to Wilder Homes
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-inkll/10"
        >
          {!submitted ? (
            <>
              <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">
                Eco-Friendly Products
              </h1>
              <p className="font-sans text-inkl text-lg mb-6">
                We're building a curated guide to non-toxic, eco-friendly products for families — from nursery paints to playroom furniture.
              </p>
              <p className="font-sans text-inkl mb-8">
                Would you be interested in this feature when it's ready?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleInterest}
                  className="flex-1 py-4 px-6 bg-ember text-white font-sans font-medium rounded-full hover:bg-terra transition-colors"
                >
                  Yes, I'm interested
                </button>
                <Link
                  to="/wilder-homes"
                  className="flex-1 py-4 px-6 bg-cream text-ink font-sans font-medium rounded-full hover:bg-blush/50 transition-colors text-center"
                >
                  Not right now
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-olive/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif text-3xl text-ink mb-4">
                  You're on the list!
                </h2>
                <p className="font-sans text-inkl text-lg mb-6">
                  We'll let you know when this feature is ready.
                </p>
                <Link
                  to="/wilder-homes"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ember text-white font-sans font-medium rounded-full hover:bg-terra transition-colors"
                >
                  Continue exploring Wilder Homes
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
