import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import OnboardingWizard from './pages/OnboardingWizard'
import Dashboard from './pages/Dashboard'
import ResourceLibrary from './pages/ResourceLibrary'
import ExercisePlayer from './pages/ExercisePlayer'
import ProgressJournal from './pages/ProgressJournal'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        
        {/* Main App Layout Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercises" element={<ResourceLibrary />} />
        <Route path="/player" element={<ExercisePlayer />} />
        <Route path="/journal" element={<ProgressJournal />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
