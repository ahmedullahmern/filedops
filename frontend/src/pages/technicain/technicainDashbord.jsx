// src/pages/technician/dashboard.jsx
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AppRoutes } from '../../constant/constant'
import { AuthContext } from '../../context/authContext'

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
        <span style={{
            padding: '3px 10px', borderRadius: '20px',
            fontSize: '11px', fontWeight: '600',
            background: s.bg, color: s.color
        }}>
            {status}
        </span>
    )
}

const TechnicianDashboard = () => {
    const { user } = useContext(AuthContext)
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState(null) // Drawer ke liye
    const [noteText, setNoteText] = useState('')
    const [updating, setUpdating] = useState(false)

    const headers = { Authorization: `Bearer ${Cookies.get('token')}` }

    console.log("selectedJob-->", selectedJob)
    const fetchJobs = async () => {
        try {
            const res = await axios.get(
                AppRoutes.getTechnicain,
                { headers }
            )
            setJobs(res.data.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchJobs() }, [])

    // Status Update
    const handleStatusUpdate = async (jobId, newStatus) => {
        setUpdating(true)
        try {
            const res = await axios.put(
                `http://localhost:3000/api/job/technicainupdatedstatus/${jobId}`,
                { status: newStatus },
                { headers }
            )
            // Drawer mein bhi update karo
            setSelectedJob(res.data.data)
            fetchJobs()
        } catch (err) {
            alert(err.response?.data?.msg || 'Error')
        } finally {
            setUpdating(false)
        }
    }

    // Note Add
    const handleAddNote = async () => {
        if (!noteText.trim()) return alert('Note likho pehle!')
        setUpdating(true)
        try {
            const res = await axios.post(
                `http://localhost:3000/api/job/addnote/${selectedJob._id}`,
                { text: noteText },
                { headers }
            )
            setSelectedJob(res.data.data)
            setNoteText('')
            fetchJobs()
        } catch (err) {
            alert(err.response?.data?.msg || 'Error')
        } finally {
            setUpdating(false)
        }
    }

    // Stats
    const total = jobs.length
    const inProgress = jobs.filter(j => j.status === 'in-progress').length
    const completed = jobs.filter(j => j.status === 'completed').length
    const pending = jobs.filter(j => j.status === 'assigned').length

    return (
        <div>
            <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#0F172A', marginBottom: '24px' }}>
                My Jobs
            </h1>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Assigned', value: total, color: '#0F172A' },
                    { label: 'Assigned', value: pending, color: '#185FA5' },
                    { label: 'In Progress', value: inProgress, color: '#3C3489' },
                    { label: 'Completed', value: completed, color: '#3B6D11' },
                ].map((s, i) => (
                    <div key={i} style={{
                        background: 'white', border: '1px solid #E2E8F0',
                        borderRadius: '12px', padding: '20px'
                    }}>
                        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>{s.label}</div>
                        <div style={{ fontSize: '28px', fontWeight: '600', color: s.color }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Jobs List */}
            <div style={{
                background: 'white', border: '1px solid #E2E8F0',
                borderRadius: '12px', padding: '20px'
            }}>
                {/* Table Header */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 80px',
                    gap: '12px', padding: '8px 0',
                    borderBottom: '1px solid #E2E8F0',
                    fontSize: '11px', color: '#94A3B8', fontWeight: '600'
                }}>
                    <span>JOB</span>
                    <span>CLIENT</span>
                    <span>DATE</span>
                    <span>STATUS</span>
                    <span></span>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>Loading...</div>
                ) : jobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                        Koi job assign nahi hui abhi
                    </div>
                ) : (
                    jobs.map(job => (
                        <div key={job._id} style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 80px',
                            gap: '12px', padding: '14px 0',
                            borderBottom: '1px solid #F1F5F9',
                            alignItems: 'center', fontSize: '13px'
                        }}>
                            <div>
                                <div style={{ fontWeight: '600', color: '#0F172A' }}>{job.title}</div>
                                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                                    {job.address || 'No address'}
                                </div>
                            </div>
                            <span style={{ color: '#64748B' }}>
                                {job.clientId?.email || 'N/A'}
                            </span>
                            <span style={{ color: '#64748B', fontSize: '12px' }}>
                                {job.scheduledAt
                                    ? new Date(job.scheduledAt).toLocaleDateString()
                                    : 'Not scheduled'}
                            </span>
                            <Badge status={job.status} />
                            <button
                                onClick={() => { setSelectedJob(job); setNoteText('') }}
                                style={{
                                    padding: '6px 12px', border: '1px solid #E2E8F0',
                                    borderRadius: '8px', background: 'white',
                                    cursor: 'pointer', fontSize: '12px',
                                    fontWeight: '500', color: '#7C3AED'
                                }}
                            >
                                View
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* ===== DRAWER ===== */}
            {selectedJob && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setSelectedJob(null)}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'rgba(0,0,0,0.3)', zIndex: 200
                        }}
                    />

                    {/* Drawer Panel */}
                    <div style={{
                        position: 'fixed', top: 0, right: 0, bottom: 0,
                        width: '420px', background: 'white',
                        zIndex: 201, display: 'flex', flexDirection: 'column',
                        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)'
                    }}>
                        {/* Drawer Header */}
                        <div style={{
                            padding: '20px 24px',
                            borderBottom: '1px solid #E2E8F0',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>
                                {selectedJob.title}
                            </h2>
                            <button
                                onClick={() => setSelectedJob(null)}
                                style={{
                                    border: 'none', background: 'none',
                                    fontSize: '20px', cursor: 'pointer', color: '#94A3B8'
                                }}
                            >✕</button>
                        </div>

                        {/* Drawer Content — Scrollable */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

                            {/* Job Info */}
                            <div style={{
                                background: '#F8FAFC', borderRadius: '12px',
                                padding: '16px', marginBottom: '20px'
                            }}>
                                {[
                                    { label: 'Status', value: <Badge status={selectedJob.status} /> },
                                    { label: 'Client', value: selectedJob.clientId?.email || 'N/A' },
                                    { label: 'Address', value: selectedJob.address || 'Not provided' },
                                    { label: 'Scheduled', value: selectedJob.scheduledAt ? new Date(selectedJob.scheduledAt).toLocaleString() : 'Not scheduled' },
                                    { label: 'Description', value: selectedJob.description || selectedJob.problem || 'No description' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        alignItems: 'center', padding: '8px 0',
                                        borderBottom: i < 4 ? '1px solid #E2E8F0' : 'none',
                                        fontSize: '13px'
                                    }}>
                                        <span style={{ color: '#64748B', fontWeight: '500' }}>{item.label}</span>
                                        <span style={{ color: '#0F172A', fontWeight: '500', textAlign: 'right', maxWidth: '60%' }}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Status Update */}
                            {selectedJob.status !== 'completed' && selectedJob.status !== 'cancelled' && (
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A', marginBottom: '10px' }}>
                                        Status Update Karo
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {['in-progress', 'completed'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(selectedJob._id, status)}
                                                disabled={updating || selectedJob.status === status}
                                                style={{
                                                    padding: '8px 16px',
                                                    border: '1px solid #E2E8F0',
                                                    borderRadius: '8px', cursor: 'pointer',
                                                    fontSize: '13px', fontWeight: '500',
                                                    background: selectedJob.status === status ? '#7C3AED' : 'white',
                                                    color: selectedJob.status === status ? 'white' : '#64748B',
                                                    opacity: updating ? 0.6 : 1
                                                }}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Notes Timeline */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A', marginBottom: '12px' }}>
                                    Notes ({selectedJob.notes?.length || 0})
                                </div>

                                {selectedJob.notes?.length === 0 || !selectedJob.notes ? (
                                    <div style={{
                                        textAlign: 'center', padding: '20px',
                                        color: '#94A3B8', fontSize: '13px',
                                        background: '#F8FAFC', borderRadius: '8px'
                                    }}>
                                        Koi note nahi abhi
                                    </div>
                                ) : (
                                    selectedJob.notes.map((note, i) => (
                                        <div key={i} style={{
                                            padding: '12px', background: '#F8FAFC',
                                            borderRadius: '8px', marginBottom: '8px',
                                            borderLeft: '3px solid #7C3AED'
                                        }}>
                                            <div style={{ fontSize: '13px', color: '#0F172A', marginBottom: '6px' }}>
                                                {note.text}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                                                {new Date(note.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Note Input — Bottom Fixed */}
                        <div style={{
                            padding: '16px 24px',
                            borderTop: '1px solid #E2E8F0',
                            background: 'white'
                        }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>
                                Note Add Karo
                            </div>
                            <textarea
                                value={noteText}
                                onChange={e => setNoteText(e.target.value)}
                                placeholder="Kya kiya site pe? Koi update likho..."
                                rows={3}
                                style={{
                                    width: '100%', padding: '10px 12px',
                                    border: '1px solid #E2E8F0', borderRadius: '8px',
                                    fontSize: '13px', resize: 'none', outline: 'none',
                                    boxSizing: 'border-box', color: '#0F172A',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                            />
                            <button
                                onClick={handleAddNote}
                                disabled={updating || !noteText.trim()}
                                style={{
                                    marginTop: '8px', width: '100%',
                                    padding: '10px', background: '#7C3AED',
                                    color: 'white', border: 'none',
                                    borderRadius: '8px', fontSize: '13px',
                                    fontWeight: '600', cursor: 'pointer',
                                    opacity: (!noteText.trim() || updating) ? 0.5 : 1
                                }}
                            >
                                {updating ? 'Saving...' : 'Note Save Karo'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TechnicianDashboard