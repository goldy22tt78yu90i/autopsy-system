import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import Events from './pages/Events'
import Analysis from './pages/Analysis'
import Alerts from './pages/Alerts'
import AIInsights from './pages/AIInsights'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/events" element={<Events />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <ChatBot />
    </>
  )
}

export default App
