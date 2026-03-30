import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import BottomNav from './BottomNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Nav />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
