import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import ExplorePage from './habitat/ExplorePage'
import HabitatPage from './habitat/HabitatPage'
import BuildsPage from './basecamp/BuildsPage'
import BuildDetailPage from './basecamp/BuildDetailPage'
import ActivitiesPage from './basecamp/ActivitiesPage'
import ProfilePage from './village/ProfilePage'
import BlueprintPage from './blueprint/BlueprintPage'
import LaunchPopup from './components/LaunchPopup'

function App() {
  return (
    <UserProvider>
      <LaunchPopup />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/habitat" element={<HabitatPage />} />
        <Route path="/builds" element={<BuildsPage />} />
        <Route path="/builds/:buildId" element={<BuildDetailPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
      </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
