import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmailCapture({ criteria, onSuccess, darkMode = false, inline = false }) {
  const [isOpen, setIsOpen] = useState(inline)
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
        if (!inline) {
          setTimeout(() => {
            setIsOpen(false)
            setStatus('idle')
            if (onSuccess) onSuccess()
          }, 3000)
        }
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Failed to subscribe. Please try again.')
    }
  }

  const bgClass = darkMode ? 'bg-white/10 border-white/20' : 'bg-white border-inkll/10'
  const textClass = darkMode ? 'text-white' : 'text-ink'
  const mutedClass = darkMode ? 'text-white/60' : 'text-inkl'
  const inputBg = darkMode ? 'bg-white/10' : 'bg-cream'
  const inputBorder = darkMode ? 'border-white/20' : 'border-inkll/20'
  const inputText = darkMode ? 'text-white placeholder:text-white/40' : 'text-ink placeholder:text-inkll/50'

  return (
    <>
      {/* Toggle Button (only if not inline) */}
      {!inline && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full mt-6 px-6 py-4 bg-ember text-white rounded-2xl font-sans font-medium hover:bg-terra transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {isOpen ? 'Close' : 'Get Your Personalized Trail Recs'}
        </button>
      )}

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
            <div className={`mt-4 p-6 rounded-2xl border ${bgClass}`}>
              {status === 'success' ? (
                <div className="text-center py-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-olive/30' : 'bg-olive/20'}`}>
                    <svg className={`w-8 h-8 ${darkMode ? 'text-gold' : 'text-olive'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className={`font-serif text-2xl ${textClass} mb-2`}>You're in!</h3>
                  <p className={`font-sans ${mutedClass}`}>We'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <h3 className={`font-serif text-xl ${textClass} mb-2`}>Join the Wilder Moms Village</h3>
                  <p className={`font-sans ${mutedClass} text-sm mb-4`}>
                    Get trail recommendations and updates delivered to your inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className={`block font-sans text-sm ${textClass} mb-1`}>Your name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className={`w-full px-4 py-3 rounded-xl border ${inputBorder} ${inputBg} font-sans ${inputText} focus:outline-none focus:ring-2 focus:ring-ember/40 transition-all`}
                      />
                    </div>

                    <div>
                      <label className={`block font-sans text-sm ${textClass} mb-1`}>Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-xl border ${inputBorder} ${inputBg} font-sans ${inputText} focus:outline-none focus:ring-2 focus:ring-ember/40 transition-all`}
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

                  <p className={`mt-4 font-sans text-xs ${mutedClass} text-center`}>
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
