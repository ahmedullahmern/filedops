// src/layouts/technicianLayout.jsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Cookies from 'js-cookie'

const TechnicianLayout = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('token')
        setUser(null)
        navigate('/login')
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>

            {/* Sidebar */}
            <div style={{
                width: '220px', background: 'white',
                borderRight: '1px solid #E2E8F0',
                display: 'flex', flexDirection: 'column',
                position: 'fixed', top: 0, bottom: 0, left: 0
            }}>
                {/* Logo */}
                <div style={{ padding: '20px', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '30px', height: '30px', background: '#7C3AED',
                            borderRadius: '6px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: 'white', fontWeight: '600'
                        }}>F</div>
                        <span style={{ fontWeight: '600', color: '#7C3AED', fontSize: '16px' }}>
                            FieldOps
                        </span>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ padding: '12px 8px', flex: 1 }}>
                    <NavLink to="/technician" end style={({ isActive }) => ({
                        display: 'block', padding: '10px 14px', borderRadius: '8px',
                        marginBottom: '4px', textDecoration: 'none', fontSize: '14px',
                        fontWeight: isActive ? '600' : '400',
                        background: isActive ? '#F5F3FF' : 'transparent',
                        color: isActive ? '#7C3AED' : '#64748B',
                    })}>
                        My Jobs
                    </NavLink>
                </nav>

                {/* User + Logout */}
                <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Technician</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '10px', wordBreak: 'break-all' }}>
                        {user?.email}
                    </div>
                    <button onClick={handleLogout} style={{
                        width: '100%', padding: '8px', border: '1px solid #E2E8F0',
                        borderRadius: '8px', background: 'white', color: '#EF4444',
                        cursor: 'pointer', fontSize: '13px', fontWeight: '500'
                    }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ marginLeft: '220px', flex: 1, padding: '24px' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default TechnicianLayout