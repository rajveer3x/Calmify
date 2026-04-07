import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import OnboardingWizard from './pages/OnboardingWizard'
import Dashboard from './pages/Dashboard'
import ResourceLibrary from './pages/ResourceLibrary'
import ExercisePlayer from './pages/ExercisePlayer'
import ProgressJournal from './pages/ProgressJournal'
import Sidebar from './components/Sidebar'
import './App.css'

const MainLayout = () => {
  return (
    <div className="flex bg-serene-bg min-h-screen">
      <Sidebar />
      <div className="flex-1 max-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        
        {/* Main App Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<ResourceLibrary />} />
          <Route path="/player" element={<ExercisePlayer />} />
          <Route path="/journal" element={<ProgressJournal />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
