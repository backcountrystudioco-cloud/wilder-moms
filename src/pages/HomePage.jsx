import { useEffect } from 'react'
import Hero from '../components/Hero'
import ArcSection from '../components/ArcSection'
import FourPillars from '../components/FourPillars'
import BaseCampBuilds from '../components/BaseCampBuilds'
import MissionSection from '../components/MissionSection'
import VoiceSwaps from '../components/VoiceSwaps'
import WaitlistCTA from '../components/WaitlistCTA'

export default function HomePage() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          const offset = 80
          const top = element.getBoundingClientRect().top + window.pageYOffset - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <Hero />
      <ArcSection />
      <FourPillars />
      <BaseCampBuilds />
      <MissionSection />
      <VoiceSwaps />
      <WaitlistCTA />
    </>
  )
}
