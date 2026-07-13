import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { JournalProvider } from './context/JournalContext'
import { WilderTrailsProvider } from './wilder-trails/WilderTrailsContext'
import AppLayout from './components/AppLayout'
import AppLayoutWithoutFooter from './components/AppLayoutWithoutFooter'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import MissionPage from './pages/MissionPage'
import ExplorePage from './pages/ExplorePage'
import SurveyPage from './pages/SurveyPage'
import LocationPage from './wilder-trails/LocationPage'
import WhosComingPage from './wilder-trails/WhosComingPage'
import SetupPage from './wilder-trails/SetupPage'
import TrailsPage from './wilder-trails/TrailsPage'
import TrailDetailPage from './wilder-trails/TrailDetailPage'
import BuildsPage from './wilder-builds/BuildsPage'
import GatedBuildDetailPage from './wilder-builds/GatedBuildDetailPage'
import BlueprintPage from './blueprint/BlueprintPage'
import JoinPage from './pages/JoinPage'
import LaunchPopup from './components/LaunchPopup'
import JournalPage from './journal/JournalPage'
import SkillsPassport from './skills/SkillsPassport'
import WilderHomesPage from './wilder-homes/WilderHomesPage'
import BuildDetailPage from './wilder-homes/BuildDetailPage'
import AITrailFinder from './wilder-trails/AITrailFinder'

function App() {
  return (
    <UserProvider>
      <JournalProvider>
        <WilderTrailsProvider>
          <LaunchPopup />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route element={<AppLayoutWithoutFooter />}>
              <Route path="/wilder-trails" element={<Navigate to="/wilder-trails/location" replace />} />
              <Route path="/wilder-trails/location" element={<LocationPage />} />
              <Route path="/wilder-trails/whos-coming" element={<WhosComingPage />} />
              <Route path="/wilder-trails/trails" element={<TrailsPage />} />
              <Route path="/wilder-trails/ai-finder" element={<AITrailFinder />} />
              <Route path="/wilder-trails/:trailId" element={<TrailDetailPage />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route path="/wilder-philosophy" element={<MissionPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/wilder-homes" element={<WilderHomesPage />} />
              <Route path="/wilder-homes/builds/:slug" element={<BuildDetailPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/skills" element={<SkillsPassport />} />
              <Route path="/wilder-builds" element={<BuildsPage />} />
              <Route path="/wilder-builds/builds/:slug" element={<GatedBuildDetailPage />} />
              <Route path="/blueprint" element={<BlueprintPage />} />
              <Route path="/survey" element={<SurveyPage />} />
            </Route>
          </Routes>
        </WilderTrailsProvider>
      </JournalProvider>
    </UserProvider>
  )
}

export default App
