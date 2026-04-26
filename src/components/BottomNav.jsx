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
  }
]

export default function BottomNav() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-cream/95 backdrop-blur-md border-t border-inkll/30">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
              isActive(tab.path) ? 'text-ember' : 'text-inkll'
            }`}
          >
            {tab.icon}
            <span className="font-sans text-xs">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
