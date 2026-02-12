import { Routes, Route } from 'react-router-dom'
import PublicSite from './pages/PublicSite'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}
