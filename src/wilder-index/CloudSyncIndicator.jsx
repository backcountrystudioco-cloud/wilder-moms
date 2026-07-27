// CloudSyncIndicator — small persistent pill showing the current cloud
// sync state. Reads cloudStatus + lastSavedAt from useWilderIndex.
//
// Renders nothing when the user is signed out (no cloud = nothing to show).

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@clerk/react'
import { useWilderIndex } from './WilderIndexContext'

function relativeTime(d) {
  if (!d) return ''
  const seconds = Math.max(1, Math.round((Date.now() - d.getTime()) / 1000))
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return d.toLocaleDateString('en', { month: 'short', day: 'numeric' })
}

// Pill shown in the IndexHeader — "Saving…" while pending, "Saved · Xm ago"
// when idle, hidden when nothing has been saved yet.
export function SyncIndicator() {
  const { isSignedIn } = useAuth()
  const { cloudStatus, lastSavedAt } = useWilderIndex()
  const [, force] = useState(0)

  useEffect(() => {
    if (!lastSavedAt) return undefined
    const t = setInterval(() => force((n) => n + 1), 15000)
    return () => clearInterval(t)
  }, [lastSavedAt])

  if (!isSignedIn || !lastSavedAt) return null

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-inkll">
      {cloudStatus === 'pending' ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Saving…
        </>
      ) : (
        <>
          <svg className="w-3 h-3 text-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Saved · {relativeTime(lastSavedAt)}
        </>
      )}
    </span>
  )
}

// Brief toast shown once per cloud save. Listens for cloudPulse increments
// and animates a 2.5s confirmation at the bottom of the viewport.
export function CloudSyncToast() {
  const { isSignedIn } = useAuth()
  const { cloudPulse } = useWilderIndex()
  const [show, setShow] = useState(false)
  const lastPulseRef = useRef(0)

  useEffect(() => {
    if (!isSignedIn) return undefined
    if (cloudPulse > lastPulseRef.current && cloudPulse > 0) {
      lastPulseRef.current = cloudPulse
      setShow(true)
      const t = setTimeout(() => setShow(false), 2500)
      return () => clearTimeout(t)
    }
    return undefined
  }, [cloudPulse, isSignedIn])

  return (
    <AnimatePresence>
      {show && isSignedIn && (
        <motion.div
          key={cloudPulse}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-olive text-cream px-4 py-2 rounded-full shadow-lg text-xs flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Saved to your account
        </motion.div>
      )}
    </AnimatePresence>
  )
}
