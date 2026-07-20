import { useState } from 'react'
import { motion } from 'framer-motion'
import { SignInButton, useAuth } from '@clerk/react'
import { pricing, annualSavings, subscriptionBenefits } from '../wilder-builds/buildsLibrary'
import { useBuildsAccess } from '../hooks/useBuildsAccess'

// PaywallCard
// Value-stacked paywall shown to non-members. Tier toggle (monthly / annual).
// If user is signed in, button kicks off checkout. If not, opens Clerk sign-in.

export default function PaywallCard({
  variant = 'inline', // 'inline' | 'detail' | 'banner'
  headline = 'Start the Wilder Builds subscription',
  subhead,
  defaultPlan = 'annual',
  onCheckoutStart,
}) {
  const { isSignedIn, getToken } = useAuth()
  const { status } = useBuildsAccess()
  const [plan, setPlan] = useState(defaultPlan)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const isMember = status === 'active'
  const selected = pricing[plan]

  const startCheckout = async () => {
    if (isMember) return
    if (!isSignedIn) return
    setBusy(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) {
        // Clerk has not yet hydrated a session token. Don't fire a doomed
        // request the server will reject — surface a clear message so the
        // user knows to retry in a moment instead of wondering why nothing
        // happened.
        throw new Error('Your session is still loading. Please try again in a moment.')
      }
      const res = await fetch('/api/lemon-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ source: variant, plan }),
      })
      const data = await res.json()
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Could not start checkout')
      }
      if (onCheckoutStart) onCheckoutStart(data.url)
      window.location.href = data.url
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setBusy(false)
    }
  }

  const cta = (
    <button
      type="button"
      onClick={startCheckout}
      disabled={busy || isMember}
      className={
        variant === 'banner'
          ? 'w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-forest px-7 py-3.5 rounded-full font-sans font-semibold hover:bg-cream transition-colors'
          : 'w-full inline-flex items-center justify-center gap-2 bg-ember hover:bg-terra disabled:opacity-60 text-white px-6 py-3.5 rounded-full font-sans font-medium transition-colors shadow-lg shadow-ember/20'
      }
    >
      {busy ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          Opening checkout…
        </>
      ) : (
        <>
          Start {plan === 'annual' ? 'annual' : 'monthly'} · {selected.formatted}{selected.cadence}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </>
      )}
    </button>
  )

  const tierToggle = (
    <div
      className={
        variant === 'banner'
          ? 'inline-flex items-center bg-white/15 backdrop-blur rounded-full p-1 mb-6'
          : 'inline-flex items-center bg-cream rounded-full p-1 mb-5 border border-inkll/15'
      }
    >
      {Object.entries(pricing).map(([key, tier]) => (
        <button
          key={key}
          type="button"
          onClick={() => setPlan(key)}
          className={
            'relative px-4 py-2 rounded-full text-sm font-medium transition-colors ' +
            (plan === key
              ? variant === 'banner'
                ? 'bg-white text-forest'
                : 'bg-white text-ember shadow-sm'
              : variant === 'banner'
                ? 'text-white/80 hover:text-white'
                : 'text-inkl hover:text-ink')
          }
        >
          {tier.formatted}
          <span className="text-xs ml-1 opacity-70">{tier.cadence}</span>
          {tier.recommended && (
            <span className="absolute -top-2 -right-2 bg-gold text-ink text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow">
              Save ${annualSavings}
            </span>
          )}
        </button>
      ))}
    </div>
  )

  const inner = (
    <div
      className={
        variant === 'banner'
          ? 'bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden'
          : 'bg-white rounded-2xl border border-inkll/15 shadow-lg shadow-ink/5 p-6 md:p-8'
      }
    >
      {variant === 'banner' && (
        <>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-4 left-4 text-7xl">Phial</div>
            <div className="absolute bottom-4 right-4 text-7xl">Mycelium</div>
          </div>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold/20 blur-2xl pointer-events-none" />
        </>
      )}

      <div className={variant === 'banner' ? 'relative z-10 max-w-2xl mx-auto text-center' : ''}>
        {variant !== 'banner' && (
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-ember mb-3">
            Wilder Builds · Members only
          </span>
        )}
        <h3
          className={
            variant === 'banner'
              ? 'font-serif text-3xl md:text-5xl italic mb-3 leading-tight'
              : 'font-serif text-2xl text-ink mb-2'
          }
        >
          {headline}
        </h3>
        <p
          className={
            variant === 'banner'
              ? 'text-white/80 mb-6 text-base md:text-lg leading-relaxed'
              : 'text-inkl mb-5 leading-relaxed'
          }
        >
          {subhead ||
            `Two premium PDFs every month, beautifully designed for tablet or print. Cancel anytime — keep what you've downloaded.`}
        </p>

        {tierToggle}

        <ul className={variant === 'banner' ? 'space-y-2 mb-8 text-left max-w-md mx-auto' : 'space-y-2.5 mb-6'}>
          {subscriptionBenefits.map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={variant === 'banner' ? 'text-gold mt-0.5' : 'text-olive mt-0.5'}>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className={variant === 'banner' ? 'text-white/90 text-sm md:text-base' : 'text-inkl text-sm'}>
                {line}
              </span>
            </li>
          ))}
        </ul>

        {!isSignedIn ? (
          <SignInButton mode="modal" fallbackRedirectUrl="/wilder-homes?tab=premium&subscribed=1">
            <button
              type="button"
              className={
                variant === 'banner'
                  ? 'w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-forest px-7 py-3.5 rounded-full font-sans font-semibold hover:bg-cream transition-colors'
                  : 'w-full inline-flex items-center justify-center gap-2 bg-ember hover:bg-terra text-white px-6 py-3.5 rounded-full font-sans font-medium transition-colors'
              }
            >
              Sign in to subscribe
            </button>
          </SignInButton>
        ) : (
          cta
        )}

        {error && (
          <p className="mt-3 text-sm text-terra">{error}</p>
        )}

        {variant === 'banner' && (
          <p className="mt-5 text-xs text-white/60">
            Cancel anytime · Secure checkout via Lemon Squeezy · You keep what you've downloaded
          </p>
        )}
        {variant !== 'banner' && (
          <p className="mt-3 text-xs text-inkll text-center">
            Cancel anytime · Secure checkout · You keep what you've downloaded
          </p>
        )}
      </div>
    </div>
  )

  return variant === 'banner' ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {inner}
    </motion.div>
  ) : (
    inner
  )
}
