// PostHog initialization via CDN (loaded in index.html)
// This file just reads the key and ensures PostHog is configured

const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com'

// PostHog is loaded via CDN in index.html
// This just verifies the key is available for custom tracking if needed
if (posthogKey && posthogKey !== 'your_posthog_key_here') {
  console.log('PostHog configured with key:', posthogKey.substring(0, 10) + '...')
}

export const trackEvent = (eventName, properties) => {
  if (window.posthog) {
    window.posthog.capture(eventName, properties)
  }
}

export const identifyUser = (userId, properties) => {
  if (window.posthog) {
    window.posthog.identify(userId, properties)
  }
}
