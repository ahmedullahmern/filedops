import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import Cookies from 'js-cookie'

const AdminLayout = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('token')
        setUser(null)
        navigate('/login')
    }

    const navItems = [
        { path: '/admin', label: 'Dashboard', end: true },
        { path: '/admin/jobs', label: 'Jobs' },
        { path: '/admin/users', label: 'Users' },
    ]

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
                            width: '30px', height: '30px', background: '#0052CC',
                            borderRadius: '6px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: 'white', fontWeight: '600'
                        }}>F</div>
                        <span style={{ fontWeight: '600', color: '#0052CC', fontSize: '16px' }}>
                            FieldOps
                        </span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav style={{ padding: '12px 8px', flex: 1 }}>
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            style={({ isActive }) => ({
                                display: 'block', padding: '10px 14px',
                                borderRadius: '8px', marginBottom: '4px',
                                textDecoration: 'none', fontSize: '14px',
                                fontWeight: isActive ? '600' : '400',
                                background: isActive ? '#EFF4FF' : 'transparent',
                                color: isActive ? '#0052CC' : '#64748B',
                            })}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>
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

            {/* ✅ Bas yeh — Outlet yahan page content dikhayega */}
            <div style={{ marginLeft: '220px', flex: 1, padding: '24px' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout