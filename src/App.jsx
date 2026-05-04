import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { JournalProvider } from './context/JournalContext'
import { WilderTrailsProvider } from './wilder-trails/WilderTrailsContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import MissionPage from './pages/MissionPage'
import ExplorePage from './pages/ExplorePage'
import LocationPage from './wilder-trails/LocationPage'
import WhosComingPage from './wilder-trails/WhosComingPage'
import SetupPage from './wilder-trails/SetupPage'
import TrailsPage from './wilder-trails/TrailsPage'
import TrailDetailPage from './wilder-trails/TrailDetailPage'
import BuildsPage from './basecamp/BuildsPage'
import BuildDetailPage from './basecamp/BuildDetailPage'
import ActivitiesPage from './basecamp/ActivitiesPage'
import BlueprintPage from './blueprint/BlueprintPage'
import JoinPage from './pages/JoinPage'
import LaunchPopup from './components/LaunchPopup'
import JournalPage from './journal/JournalPage'
import SkillsPassport from './skills/SkillsPassport'
import WilderHomesPage from './wilderhomes/WilderHomesPage'
import WilderActivitiesPage from './wilderhomes/ActivitiesPage'
import WilderEnvironmentPage from './wilderhomes/EnvironmentPage'
import WilderBuildDetailPage from './wilderhomes/BuildDetailPage'
import EcoProductsInterestPage from './wilderhomes/EcoProductsInterestPage'
import ArchivePage from './wilderhomes/ArchivePage'
import ArchitectPage from './wilderhomes/ArchitectPage'
import WildRoomPage from './wilderhomes/WildRoomPage'
import CraftDetailPage from './wilderhomes/CraftDetailPage'
import AITrailFinder from './wilder-trails/AITrailFinder'

function App() {
  return (
    <UserProvider>
      <JournalProvider>
        <WilderTrailsProvider>
          <LaunchPopup />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route element={<AppLayout />}>
              <Route path="/wilder-philosophy" element={<MissionPage />} />
              <Route path="/wilder-trails" element={<Navigate to="/wilder-trails/location" replace />} />
              <Route path="/wilder-trails/location" element={<LocationPage />} />
              <Route path="/wilder-trails/whos-coming" element={<WhosComingPage />} />
              <Route path="/wilder-trails/trails" element={<TrailsPage />} />
              <Route path="/wilder-trails/ai-finder" element={<AITrailFinder />} />
              <Route path="/wilder-trails/:trailId" element={<TrailDetailPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/wilder-homes" element={<WilderHomesPage />} />
              <Route path="/wilder-homes/activities" element={<WilderActivitiesPage />} />
              <Route path="/wilder-homes/activities/craft/:craftId" element={<CraftDetailPage />} />
              <Route path="/wilder-homes/activities/:buildId" element={<WilderBuildDetailPage />} />
              <Route path="/wilder-homes/environment" element={<WilderEnvironmentPage />} />
              <Route path="/wilder-homes/wild-room" element={<WildRoomPage />} />
              <Route path="/wilder-homes/activities/archive" element={<ArchivePage />} />
              <Route path="/wilder-homes/architect" element={<ArchitectPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/skills" element={<SkillsPassport />} />
              <Route path="/basecamp" element={<BuildsPage />} />
              <Route path="/basecamp/:buildId" element={<BuildDetailPage />} />
              <Route path="/basecamp/activities" element={<ActivitiesPage />} />
              <Route path="/blueprint" element={<BlueprintPage />} />
              <Route path="/wilder-homes/eco-products" element={<EcoProductsInterestPage />} />
            </Route>
          </Routes>
        </WilderTrailsProvider>
      </JournalProvider>
    </UserProvider>
  )
}

export default App
