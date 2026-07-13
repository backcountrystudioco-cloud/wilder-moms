import { Link, useLocation } from 'react-router-dom'

const tabs = [
  {
    path: '/wilder-trails/location',
    label: 'Trails',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    )
  },
  {
    path: '/wilder-homes',
    label: 'Homes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.25-8.25L21 12M3 18h18M6.75 21h12a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 001.5 0z" />
      </svg>
    )
  },
  {
    path: '/wilder-homes?tab=premium',
    label: 'Premium',
    isNew: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    )
  }
]

export default function BottomNav() {
  const location = useLocation()

  const isActive = (path) => {
    if (path.includes('tab=premium')) {
      return location.pathname === '/wilder-homes' && location.search.includes('tab=premium')
    }
    return location.pathname === path
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-cream/95 backdrop-blur-md border-t border-inkll/30 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            aria-current={isActive(tab.path) ? 'page' : undefined}
            aria-label={tab.isNew ? `${tab.label} (new)` : tab.label}
            className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[64px] px-3 py-2 transition-colors ${
              isActive(tab.path) ? 'text-ember' : 'text-inkll'
            }`}
          >
            {tab.icon}
            <span className="font-sans text-xs mt-0.5">{tab.label}</span>
            {tab.isNew && (
              <span
                aria-hidden="true"
                className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-ember animate-pulse"
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}
