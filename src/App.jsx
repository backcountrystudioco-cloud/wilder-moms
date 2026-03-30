import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import HabitatPage from './pages/HabitatPage'
import BuildsPage from './pages/BuildsPage'
import BuildDetailPage from './pages/BuildDetailPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ProfilePage from './pages/ProfilePage'
import BlueprintPage from './pages/BlueprintPage'
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
