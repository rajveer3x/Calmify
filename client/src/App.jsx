import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import OnboardingWizard from './pages/OnboardingWizard'
import Dashboard from './pages/Dashboard'
import ResourceLibrary from './pages/ResourceLibrary'
import ExercisePlayer from './pages/ExercisePlayer'
import ProgressJournal from './pages/ProgressJournal'
import InteractiveBreathingTool from './pages/InteractiveBreathingTool'
import ActiveExercisePlayer from './pages/ActiveExercisePlayer'
import ProfileSettings from './pages/ProfileSettings'
import ChatCompanion from './pages/ChatCompanion'
import Sidebar from './components/Sidebar'
import { useCalmify } from './context/CalmifyContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

const MainLayout = () => {
  return (
    <div className="flex flex-col md:flex-row bg-serene-bg dark:bg-[#121e1c] min-h-screen transition-colors duration-500">
      <Sidebar />
      <div className="flex-1 max-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

const ProtectedRoute = () => {
  const { isAuthenticated, isBootstrapping } = useCalmify()

  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-serene-bg dark:bg-[#121e1c] text-on-surface/70 dark:text-[#9caaa7] transition-colors duration-500">
        Restoring your sanctuary...
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

const PublicRoute = () => {
  const { isAuthenticated, isBootstrapping, currentUser } = useCalmify()

  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-serene-bg dark:bg-[#121e1c] text-on-surface/70 dark:text-[#9caaa7] transition-colors duration-500">
        Restoring your sanctuary...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Outlet />
  }

  const hasTriggers = Array.isArray(currentUser?.triggers) && currentUser.triggers.length > 0

  return <Navigate to={hasTriggers ? "/dashboard" : "/onboarding"} replace />
}

const AppContentRoute = () => {
  const { currentUser } = useCalmify()
  const hasTriggers = Array.isArray(currentUser?.triggers) && currentUser.triggers.length > 0

  return hasTriggers ? <Outlet /> : <Navigate to="/onboarding" replace />
}

const OnboardingRoute = () => {
  const { currentUser } = useCalmify()
  const hasTriggers = Array.isArray(currentUser?.triggers) && currentUser.triggers.length > 0

  return hasTriggers ? <Navigate to="/dashboard" replace /> : <Outlet />
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
        </Route>
        
        <Route element={<ProtectedRoute />}>
          <Route element={<OnboardingRoute />}>
            <Route path="/onboarding" element={<OnboardingWizard />} />
          </Route>
          <Route element={<AppContentRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exercises" element={<ResourceLibrary />} />
              <Route path="/player" element={<ExercisePlayer />} />
              <Route path="/play/:id" element={<ActiveExercisePlayer />} />
              <Route path="/journal" element={<ProgressJournal />} />
              <Route path="/breathe" element={<InteractiveBreathingTool />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/companion" element={<ChatCompanion />} />
            </Route>
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
