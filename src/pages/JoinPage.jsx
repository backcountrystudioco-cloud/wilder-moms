import { useState } from 'react'
import { motion } from 'framer-motion'

export default function JoinPage() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          criteria: 'Join page signup'
        }),
      })
      
      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

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
          {status === 'success' ? (
            <div className="text-center py-8">
              <h2 className="font-serif text-2xl text-ink mb-2">You're in!</h2>
              <p className="font-sans text-inkl">Check your inbox for next steps.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-sm text-ink mb-1">Your name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-inkll/20 bg-cream font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ember/40"
                />
              </div>
              <div>
                <label className="block font-sans text-sm text-ink mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-inkll/20 bg-cream font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ember/40"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 bg-ember text-white rounded-xl font-sans font-medium hover:bg-terra transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join the Village'}
              </button>
            </form>
          )}
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
