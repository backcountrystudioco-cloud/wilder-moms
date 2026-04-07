import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import MissionPage from './pages/MissionPage'
import HabitatPage from './habitat/HabitatPage'
import BuildsPage from './basecamp/BuildsPage'
import BuildDetailPage from './basecamp/BuildDetailPage'
import ActivitiesPage from './basecamp/ActivitiesPage'
import VillagePage from './village/VillagePage'
import BlueprintPage from './blueprint/BlueprintPage'
import JoinPage from './pages/JoinPage'
import LaunchPopup from './components/LaunchPopup'

function App() {
  return (
    <UserProvider>
      <LaunchPopup />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route element={<AppLayout />}>
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/habitat" element={<HabitatPage />} />
        <Route path="/basecamp" element={<BuildsPage />} />
        <Route path="/basecamp/:buildId" element={<BuildDetailPage />} />
        <Route path="/basecamp/activities" element={<ActivitiesPage />} />
        <Route path="/village" element={<VillagePage />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
      </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
