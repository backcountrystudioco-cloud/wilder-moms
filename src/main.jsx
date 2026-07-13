import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/react'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const posthogKey = import.meta.env.VITE_POSTHOG_KEY

// Initialize PostHog for session recording & heatmaps
if (posthogKey && posthogKey !== 'your_posthog_key_here') {
  // Dynamically load PostHog from CDN
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://cdn.posthog.com/posthog.js'
  script.onload = () => {
    if (window.posthog) {
      window.posthog.init(posthogKey, {
        api_host: 'https://app.posthog.com',
        person_profiles: 'identified_only',
        session_recording: {
          maskAllInputs: false
        },
        capture_pageview: true
      })
    }
  }
  document.head.appendChild(script)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider 
        publishableKey={publishableKey}
        signInFallbackRedirectUrl="/explore"
        signUpFallbackRedirectUrl="/explore"
        afterSignOutUrl="/"
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
