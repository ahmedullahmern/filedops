// src/pages/admin/Jobs.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AppRoutes } from '../../constant/constant'

const badgeColors = {
    pending: { bg: '#FAEEDA', color: '#854F0B' },
    assigned: { bg: '#E6F1FB', color: '#185FA5' },
    'in-progress': { bg: '#EEEDFE', color: '#3C3489' },
    completed: { bg: '#EAF3DE', color: '#3B6D11' },
    cancelled: { bg: '#FCEBEB', color: '#A32D2D' },
}

const Badge = ({ status }) => {
    const s = badgeColors[status] || badgeColors.pending
    return (
        <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: s.bg, color: s.color }}>
            {status}
        </span>
    )
}

const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1px solid #E2E8F0',
    borderRadius: '8px', fontSize: '13px', outline: 'none',
    boxSizing: 'border-box', marginTop: '4px'
}

const AdminJobs = () => {
    const [jobs, setJobs] = useState([])
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('all')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showAssignModal, setShowAssignModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [loading, setLoading] = useState(true)

    const [form, setForm] = useState({
        title: '', description: '', clientId: '',
        technicianId: '', address: '', scheduledAt: ''
    })
    const [assignTechId, setAssignTechId] = useState('')

    const headers = { Authorization: `Bearer ${Cookies.get('token')}` }

    const fetchJobs = async () => {
        try {
            const res = await axios.get(AppRoutes.getAlljobs, { headers })
            setJobs(res.data.data)
        } catch (err) { console.log(err) }
        finally { setLoading(false) }
    }

    const fetchUsers = async () => {
        try {
            // getAllUsers route banana hoga backend mein
            const res = await axios.get(AppRoutes.getAllUser, { headers })
            setUsers(res.data.data)
        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        fetchJobs()
        fetchUsers()
    }, [])

    const handleCreate = async () => {
        try {
            await axios.post(AppRoutes.createJob, form, { headers })
            setShowCreateModal(false)
            setForm({ title: '', description: '', clientId: '', technicianId: '', address: '', scheduledAt: '' })
            fetchJobs()
            alert('Job created!')
        } catch (err) {
            alert(err.response?.data?.msg || 'Error')
        }
    }

    const handleAssign = async () => {
        try {
            await axios.put(AppRoutes.adminTechAssign(selectedJob._id),
                { technicianId: assignTechId }, { headers })
            setShowAssignModal(false)
            fetchJobs()
            alert('Technician assigned!')
        } catch (err) {
            alert(err.response?.data?.msg || 'Error')
        }
    }

    const clients = users.filter(u => u.role === 'client')
    const technicians = users.filter(u => u.role === 'technician')
    const filteredJobs = filter === 'all' ? jobs : jobs.filter(j => j.status === filter)

    const FILTERS = ['all', 'pending', 'assigned', 'in-progress', 'completed', 'cancelled']

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#0F172A' }}>Jobs</h1>
                <button onClick={() => setShowCreateModal(true)} style={{
                    padding: '9px 18px', background: '#0052CC', color: 'white',
                    border: 'none', borderRadius: '8px', fontSize: '13px',
                    cursor: 'pointer', fontWeight: '600'
                }}>
                    + Create Job
                </button>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {FILTERS.map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: '6px 14px', borderRadius: '20px', fontSize: '12px',
                        cursor: 'pointer', fontWeight: '500', border: 'none',
                        background: filter === f ? '#0052CC' : '#E2E8F0',
                        color: filter === f ? 'white' : '#64748B'
                    }}>
                        {f === 'all' ? 'All' : f}
                    </button>
                ))}
            </div>

            {/* Jobs Table */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr', gap: '12px', padding: '8px 0', borderBottom: '1px solid #E2E8F0', fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>
                    <span>TITLE</span><span>CLIENT</span><span>TECHNICIAN</span><span>STATUS</span><span>ACTION</span>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>Loading...</div>
                ) : filteredJobs?.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>No jobs found</div>
                ) : (
                    filteredJobs?.map(job => (
                        <div key={job._id} style={{
                            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr',
                            gap: '12px', padding: '12px 0', borderBottom: '1px solid #F1F5F9',
                            alignItems: 'center', fontSize: '13px'
                        }}>
                            <span style={{ fontWeight: '500', color: '#0F172A' }}>{job.title}</span>
                            <span style={{ color: '#64748B' }}>{job.clientId?.email || 'N/A'}</span>
                            <span style={{ color: '#64748B' }}>{job.technicianId?.email || 'Unassigned'}</span>
                            <Badge status={job.status} />
                            <button
                                onClick={() => { setSelectedJob(job); setShowAssignModal(true) }}
                                disabled={job.status === 'completed' || job.status === 'cancelled'}
                                style={{
                                    padding: '5px 10px', border: '1px solid #E2E8F0',
                                    borderRadius: '6px', fontSize: '11px', cursor: 'pointer',
                                    background: 'white', fontWeight: '500',
                                    opacity: (job.status === 'completed' || job.status === 'cancelled') ? 0.4 : 1
                                }}>
                                {job.technicianId ? 'Reassign' : 'Assign'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Create Job Modal */}
            {showCreateModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                }}>
                    <div style={{
                        background: 'white', borderRadius: '16px',
                        padding: '28px', width: '440px', maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Create New Job</h2>

                        {[
                            { label: 'Job Title *', key: 'title', placeholder: 'e.g. AC Repair' },
                            { label: 'Description', key: 'description', placeholder: 'Problem details...' },
                            { label: 'Address', key: 'address', placeholder: 'e.g. Orangi Town' },
                        ].map(f => (
                            <div key={f.key} style={{ marginBottom: '14px' }}>
                                <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>{f.label}</label>
                                <input
                                    style={inputStyle}
                                    placeholder={f.placeholder}
                                    value={form[f.key]}
                                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                />
                            </div>
                        ))}

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Client *</label>
                            <select style={inputStyle} value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })}>
                                <option value=''>Select client...</option>
                                {clients.map(c => <option key={c._id} value={c._id}>{c.email}</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Assign Technician (Optional)</label>
                            <select style={inputStyle} value={form.technicianId} onChange={e => setForm({ ...form, technicianId: e.target.value })}>
                                <option value=''>Select technician...</option>
                                {technicians.map(t => <option key={t._id} value={t._id}>{t.email}</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Scheduled Date</label>
                            <input type='datetime-local' style={inputStyle}
                                value={form.scheduledAt}
                                onChange={e => setForm({ ...form, scheduledAt: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowCreateModal(false)} style={{
                                padding: '8px 18px', border: '1px solid #E2E8F0',
                                borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '13px'
                            }}>Cancel</button>
                            <button onClick={handleCreate} style={{
                                padding: '8px 18px', background: '#0052CC', color: 'white',
                                border: 'none', borderRadius: '8px', cursor: 'pointer',
                                fontSize: '13px', fontWeight: '600'
                            }}>Create Job</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Modal */}
            {showAssignModal && selectedJob && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '380px' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Assign Technician</h2>
                        <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                            Job: <strong>{selectedJob.title}</strong>
                        </p>
                        <select style={inputStyle} value={assignTechId} onChange={e => setAssignTechId(e.target.value)}>
                            <option value=''>Select technician...</option>
                            {technicians.map(t => <option key={t._id} value={t._id}>{t.email}</option>)}
                        </select>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button onClick={() => setShowAssignModal(false)} style={{
                                padding: '8px 18px', border: '1px solid #E2E8F0',
                                borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '13px'
                            }}>Cancel</button>
                            <button onClick={handleAssign} style={{
                                padding: '8px 18px', background: '#0052CC', color: 'white',
                                border: 'none', borderRadius: '8px', cursor: 'pointer',
                                fontSize: '13px', fontWeight: '600'
                            }}>Assign</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminJobs