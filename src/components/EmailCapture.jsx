import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmailCapture({ criteria, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          criteria: criteria
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '' })
        setTimeout(() => {
          setIsOpen(false)
          setStatus('idle')
          if (onSuccess) onSuccess()
        }, 3000)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Failed to subscribe. Please try again.')
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mt-6 px-6 py-4 bg-ember text-white rounded-2xl font-sans font-medium hover:bg-terra transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {isOpen ? 'Close' : 'Get Your Personalized Trail Recs'}
      </button>

      {/* Form Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-white rounded-2xl border border-inkll/10">
              {status === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-olive/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-2">You're in!</h3>
                  <p className="font-sans text-inkl">We'll send personalized trail recs to {formData.email || 'your inbox'}.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-xl text-ink mb-2">Join the Wilder Moms Village</h3>
                  <p className="font-sans text-inkl text-sm mb-4">
                    Get trail recommendations tailored to your family delivered to your inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-sans text-sm text-ink mb-1">Your name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-inkll/20 bg-cream font-sans text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-sm text-ink mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-inkll/20 bg-cream font-sans text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember transition-all"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-terra font-sans text-sm">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full px-6 py-3 bg-ember text-white rounded-xl font-sans font-medium hover:bg-terra transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending...' : 'Join the Village'}
                    </button>
                  </form>

                  <p className="mt-4 font-sans text-xs text-inkll text-center">
                    No spam, ever. Just trail love.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
