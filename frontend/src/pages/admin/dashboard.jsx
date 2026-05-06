// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AppRoutes } from '../../constant/constant'
import { useNavigate } from 'react-router-dom'

const statStyle = {
    background: 'white', border: '1px solid #E2E8F0',
    borderRadius: '12px', padding: '20px'
}

const badgeColors = {
    pending: { bg: '#FAEEDA', color: '#854F0B' },
    assigned: { bg: '#E6F1FB', color: '#185FA5' },
    'in-progress': { bg: '#EEEDFE', color: '#3C3489' },
    completed: { bg: '#EAF3DE', color: '#3B6D11' },
    cancelled: { bg: '#FCEBEB', color: '#A32D2D' },
}

const Badge = ({ status }) => {
    const style = badgeColors[status] || badgeColors.pending
    return (
        <span style={{
            padding: '3px 10px', borderRadius: '20px', fontSize: '11px',
            fontWeight: '600', background: style.bg, color: style.color
        }}>
            {status}
        </span>
    )
}

const AdminDashboard = () => {
    const [stats, setStats] = useState(null)
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const headers = { Authorization: `Bearer ${Cookies.get('token')}` }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, jobsRes] = await Promise.all([
                    axios.get(AppRoutes.Dashboard, { headers }),
                    axios.get(AppRoutes.getAlljobs, { headers }),
                ])
                setStats(statsRes.data.data)
                setJobs(jobsRes.data.data?.slice(0, 5)) // Recent 5
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return (
        <div style={{ textAlign: 'center', marginTop: '80px', color: '#64748B' }}>
            Loading...
        </div>
    )

    return (
        <div>
            <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#0F172A' }}>
                Dashboard
            </h1>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Jobs', value: stats?.total, color: '#0F172A' },
                    { label: 'Pending', value: stats?.pending, color: '#854F0B' },
                    { label: 'In Progress', value: stats?.inProgress, color: '#3C3489' },
                    { label: 'Completed', value: stats?.completed, color: '#3B6D11' },
                ].map((s, i) => (
                    <div key={i} style={statStyle}>
                        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>{s.label}</div>
                        <div style={{ fontSize: '28px', fontWeight: '600', color: s.color }}>{s.value ?? 0}</div>
                    </div>
                ))}
            </div>

            {/* Recent Jobs Table */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A' }}>Recent Jobs</h2>
                    <button
                        onClick={() => navigate('/admin/jobs')}
                        style={{
                            padding: '6px 14px', background: '#0052CC', color: 'white',
                            border: 'none', borderRadius: '8px', fontSize: '13px',
                            cursor: 'pointer', fontWeight: '500'
                        }}>
                        View All
                    </button>
                </div>

                {/* Table Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr', gap: '12px', padding: '8px 0', borderBottom: '1px solid #E2E8F0', fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>
                    <span>TITLE</span><span>CLIENT</span><span>TECHNICIAN</span><span>STATUS</span>
                </div>

                {jobs?.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>No jobs yet</div>
                ) : (
                    jobs?.map(job => (
                        <div key={job._id} style={{
                            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr',
                            gap: '12px', padding: '12px 0', borderBottom: '1px solid #F1F5F9',
                            alignItems: 'center', fontSize: '13px'
                        }}>
                            <span style={{ fontWeight: '500', color: '#0F172A' }}>{job.title}</span>
                            <span style={{ color: '#64748B' }}>{job.clientId?.email || 'N/A'}</span>
                            <span style={{ color: '#64748B' }}>{job.technicianId?.email || 'Unassigned'}</span>
                            <Badge status={job.status} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default AdminDashboard