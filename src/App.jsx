import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import HabitatPage from './Habitat/HabitatPage'
import BuildsPage from './BaseCamp/BuildsPage'
import BuildDetailPage from './BaseCamp/BuildDetailPage'
import ActivitiesPage from './BaseCamp/ActivitiesPage'
import ProfilePage from './Village/ProfilePage'
import BlueprintPage from './Blueprint/BlueprintPage'
import LaunchPopup from './components/LaunchPopup'

function App() {
  return (
    <UserProvider>
      <LaunchPopup />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="/habitat" element={<HabitatPage />} />
        <Route path="/basecamp" element={<BuildsPage />} />
        <Route path="/basecamp/:buildId" element={<BuildDetailPage />} />
        <Route path="/basecamp/activities" element={<ActivitiesPage />} />
        <Route path="/village" element={<ProfilePage />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
      </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
