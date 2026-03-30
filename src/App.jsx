import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import BuildsPage from './pages/BuildsPage'
import BuildDetailPage from './pages/BuildDetailPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <UserProvider>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/builds" element={<BuildsPage />} />
        <Route path="/builds/:buildId" element={<BuildDetailPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
