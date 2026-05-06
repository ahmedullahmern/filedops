// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext)
    const token = Cookies.get('token')

    // ✅ Pehle loading check karo — user fetch ho raha hai abhi
    if (loading) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', minHeight: '100vh',
                color: '#64748B', fontSize: '14px'
            }}>
                Loading...
            </div>
        )
    }

    // ✅ Token nahi — login pe bhejo
    if (!token) return <Navigate to="/login" />

    // ✅ Role match nahi — login pe bhejo
    if (role && user?.role !== role) return <Navigate to="/login" />

    return children
}

export default ProtectedRoute