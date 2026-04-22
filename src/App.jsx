import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { JournalProvider } from './context/JournalContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import MissionPage from './pages/MissionPage'
import HabitatPage from './habitat/HabitatPage'
import BuildsPage from './basecamp/BuildsPage'
import BuildDetailPage from './basecamp/BuildDetailPage'
import ActivitiesPage from './basecamp/ActivitiesPage'
import VillagePage from './village/VillagePage'
import ProfilePage from './village/ProfilePage'
import BlueprintPage from './blueprint/BlueprintPage'
import JoinPage from './pages/JoinPage'
import LaunchPopup from './components/LaunchPopup'
import EcoProductsPage from './basecamp/EcoProductsPage'
import JournalPage from './journal/JournalPage'
import SkillsPassport from './skills/SkillsPassport'

function App() {
  return (
    <UserProvider>
      <JournalProvider>
        <LaunchPopup />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route element={<AppLayout />}>
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/habitat" element={<HabitatPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/skills" element={<SkillsPassport />} />
            <Route path="/basecamp" element={<BuildsPage />} />
            <Route path="/basecamp/:buildId" element={<BuildDetailPage />} />
            <Route path="/basecamp/activities" element={<ActivitiesPage />} />
            <Route path="/village" element={<VillagePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/blueprint" element={<BlueprintPage />} />
            <Route path="/basecamp/eco-products" element={<EcoProductsPage />} />
          </Route>
        </Routes>
      </JournalProvider>
    </UserProvider>
  )
}

export default App
