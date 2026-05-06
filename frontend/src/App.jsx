import { Navigate, Route, Routes } from 'react-router-dom'
import Loginpage from './pages/from/loginPage'
import ProtectedRoute from './components/protected/protectedRoute'
import AdminLayout from './layouts/adminLayout'
import AdminDashboard from './pages/admin/dashboard'
import AdminJobs from './pages/admin/job'
import AdminUsers from './pages/admin/user'
import TechnicianLayout from './layouts/technician'
import TechnicianDashboard from './pages/technicain/technicainDashbord'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Loginpage />} />
      <Route path='/admin' element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path='jobs' element={<AdminJobs />} />
        <Route path='users' element={<AdminUsers />} />
      </Route>

      <Route path='/technician' element={
        <ProtectedRoute role="technician">
          <TechnicianLayout />
        </ProtectedRoute>
      }>
        <Route index element={<TechnicianDashboard />} />
      </Route>

      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default App