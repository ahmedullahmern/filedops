// src/pages/admin/Users.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AppRoutes } from '../../constant/constant'

const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1px solid #E2E8F0',
    borderRadius: '8px', fontSize: '13px', outline: 'none',
    boxSizing: 'border-box', marginTop: '4px'
}

const roleBadge = {
    admin: { bg: '#EEEDFE', color: '#3C3489' },
    technician: { bg: '#E6F1FB', color: '#185FA5' },
    client: { bg: '#EAF3DE', color: '#3B6D11' },
}

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'technician' })

    const headers = { Authorization: `Bearer ${Cookies.get('token')}` }

    const fetchUsers = async () => {
        try {
            const res = await axios.get(AppRoutes.getAllUser, { headers })
            setUsers(res.data.data)
        } catch (err) { console.log(err) }
        finally { setLoading(false) }
    }

    useEffect(() => { fetchUsers() }, [])

    const handleCreate = async () => {
        if (!form.email || !form.password || !form.role) {
            alert('Email, password aur role zaroori hai!')
            return
        }
        try {
            await axios.post(AppRoutes.register, form, { headers })
            setShowModal(false)
            setForm({ name: '', email: '', password: '', role: 'technician' })
            fetchUsers()
            alert('User created!')
        } catch (err) {
            alert(err.response?.data?.msg || 'Error')
        }
    }

    const handleDelete = async (id, role) => {
        if (role === 'admin') return alert('Admin delete nahi ho sakta!')
        if (!window.confirm('Confirm delete?')) return
        try {
            await axios.delete(AppRoutes.deleteUser(id), { headers })
            fetchUsers()
            alert('User deleted!')
        } catch (err) {
            alert(err.response?.data?.msg || 'Error')
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#0F172A' }}>Users</h1>
                <button onClick={() => setShowModal(true)} style={{
                    padding: '9px 18px', background: '#0052CC', color: 'white',
                    border: 'none', borderRadius: '8px', fontSize: '13px',
                    cursor: 'pointer', fontWeight: '600'
                }}>
                    + Create User
                </button>
            </div>

            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 1fr', gap: '12px', padding: '8px 0', borderBottom: '1px solid #E2E8F0', fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>
                    <span>NAME</span><span>EMAIL</span><span>ROLE</span><span>ACTION</span>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>Loading...</div>
                ) : users?.map(u => {
                    const rb = roleBadge[u.role] || roleBadge.client
                    return (
                        <div key={u._id} style={{
                            display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 1fr',
                            gap: '12px', padding: '12px 0', borderBottom: '1px solid #F1F5F9',
                            alignItems: 'center', fontSize: '13px'
                        }}>
                            <span style={{ fontWeight: '500', color: '#0F172A' }}>{u.name || '—'}</span>
                            <span style={{ color: '#64748B' }}>{u.email}</span>
                            <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: rb.bg, color: rb.color, display: 'inline-block' }}>
                                {u.role}
                            </span>
                            <button
                                onClick={() => handleDelete(u._id, u.role)}
                                disabled={u.role === 'admin'}
                                style={{
                                    padding: '5px 10px', border: '1px solid #FCA5A5',
                                    borderRadius: '6px', fontSize: '11px', cursor: 'pointer',
                                    background: 'white', color: '#EF4444', fontWeight: '500',
                                    opacity: u.role === 'admin' ? 0.3 : 1
                                }}>
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Create User Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '400px' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Create New User</h2>

                        {[
                            { label: 'Full Name', key: 'name', placeholder: 'Ali Ahmed', type: 'text' },
                            { label: 'Email *', key: 'email', placeholder: 'ali@gmail.com', type: 'email' },
                            { label: 'Temporary Password *', key: 'password', placeholder: '••••••••', type: 'password' },
                        ].map(f => (
                            <div key={f.key} style={{ marginBottom: '14px' }}>
                                <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>{f.label}</label>
                                <input
                                    type={f.type}
                                    style={inputStyle}
                                    placeholder={f.placeholder}
                                    value={form[f.key]}
                                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                />
                            </div>
                        ))}

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Role *</label>
                            <select style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                                <option value='technician'>Technician</option>
                                <option value='client'>Client</option>
                                <option value='admin'>Admin</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowModal(false)} style={{
                                padding: '8px 18px', border: '1px solid #E2E8F0',
                                borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '13px'
                            }}>Cancel</button>
                            <button onClick={handleCreate} style={{
                                padding: '8px 18px', background: '#0052CC', color: 'white',
                                border: 'none', borderRadius: '8px', cursor: 'pointer',
                                fontSize: '13px', fontWeight: '600'
                            }}>Create User</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminUsers