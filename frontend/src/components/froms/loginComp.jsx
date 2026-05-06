import React, { useContext, useState } from 'react';
import axios from "axios";
import { AppRoutes } from "../../constant/constant.jsx";
import Cookies from 'js-cookie';
import { AuthContext } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import ButtonLoader from '../loader/ButonLoader.jsx';


const LoginFromComp = () => {
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        axios.post(AppRoutes.login, obj)
            .then((res) => {
                const userData = res?.data?.data?.user
                Cookies.set('token', res?.data?.data?.token)
                setUser(userData)
                if (userData?.role === 'admin') navigate('/admin')
                else if (userData?.role === 'technician') navigate('/technician')
                else if (userData?.role === 'client') navigate('/client')
            })
            .catch((err) => {
                alert(err.response?.data?.msg || err.message)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <>
            {/* Responsive CSS */}
            <style>{`
                .login-wrapper {
                    display: flex;
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                }
                .login-left {
                    width: 45%;
                    padding: 64px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: white;
                }
                .login-right {
                    flex: 1;
                    background: #0052CC;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                .login-input {
                    width: 100%;
                    padding: 12px 16px;
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                    outline: none;
                    fontSize: 14px;
                    color: #0F172A;
                    box-sizing: border-box;
                    font-size: 14px;
                }
                .login-input:focus {
                    border-color: #0052CC;
                    box-shadow: 0 0 0 3px rgba(0,82,204,0.15);
                }
                .login-btn {
                    width: 100%;
                    padding: 14px;
                    background: #0052CC;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .login-btn:hover { background: #0041a3; }
                .login-btn:disabled { background: #6B9FE4; cursor: not-allowed; }

                /* ✅ Mobile responsive */
                @media (max-width: 768px) {
                    .login-wrapper { flex-direction: column; }
                    .login-left {
                        width: 100%;
                        padding: 32px 24px;
                    }
                    .login-right { display: none; }
                }
            `}</style>

            <div className="login-wrapper">

                {/* Left Side */}
                <div className="login-left">

                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '32px', height: '32px', background: '#0052CC',
                            borderRadius: '6px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px'
                        }}>F</div>
                        <span style={{ fontWeight: '700', color: '#0052CC', fontSize: '20px' }}>FieldOps</span>
                    </div>

                    {/* Form */}
                    <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
                            Welcome Back
                        </h1>
                        <p style={{ color: '#64748B', marginBottom: '40px' }}>
                            Login to manage your field operations and team.
                        </p>

                        <form onSubmit={handleLogin}>
                            {/* Email */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                                    Email Address
                                </label>
                                <input
                                    type="email" name="email"
                                    placeholder="name@company.com"
                                    required
                                    className="login-input"
                                />
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: '28px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                                        Password
                                    </label>
                                    <a href="#" style={{ fontSize: '14px', color: '#0052CC', fontWeight: '600', textDecoration: 'none' }}>
                                        Forgot password?
                                    </a>
                                </div>
                                <input
                                    type="password" name="password"
                                    placeholder="••••••••"
                                    required
                                    className="login-input"
                                />
                            </div>

                            <button type="submit" disabled={isLoading} className="login-btn">
                                {isLoading ? 'Logging in...' : 'Login to Account'}
                            </button>
                        </form>
                    </div>

                    <p style={{ color: '#64748B', fontSize: '14px' }}>
                        Don't have an account?{' '}
                        <a href="#" style={{ color: '#0052CC', fontWeight: '700', textDecoration: 'none' }}>
                            Contact Sales
                        </a>
                    </p>
                </div>

                {/* Right Side — Desktop only */}
                <div className="login-right">
                    {/* Background blur circles */}
                    <div style={{
                        position: 'absolute', top: '-10%', right: '-10%',
                        width: '400px', height: '400px', background: '#60A5FA',
                        borderRadius: '50%', filter: 'blur(120px)', opacity: 0.3
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-10%', left: '-10%',
                        width: '400px', height: '400px', background: '#1E40AF',
                        borderRadius: '50%', filter: 'blur(120px)', opacity: 0.3
                    }} />

                    {/* Card */}
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '32px', padding: '48px 40px',
                        maxWidth: '460px', textAlign: 'center',
                        position: 'relative', zIndex: 1
                    }}>
                        {/* Badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '6px 16px', background: 'rgba(0,82,204,0.4)',
                            borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)',
                            marginBottom: '24px'
                        }}>
                            <span style={{
                                width: '8px', height: '8px', background: '#4ADE80',
                                borderRadius: '50%', display: 'inline-block',
                                animation: 'pulse 2s infinite'
                            }} />
                            <span style={{ color: 'white', fontSize: '11px', fontWeight: '700', letterSpacing: '2px' }}>
                                INDUSTRY LEADER
                            </span>
                        </div>

                        <h2 style={{ fontSize: '30px', fontWeight: '700', color: 'white', marginBottom: '16px', lineHeight: 1.3 }}>
                            Empowering the world's most efficient field teams.
                        </h2>
                        <p style={{ color: '#BFDBFE', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
                            Trusted by 10,000+ dispatchers and technicians globally for seamless operations and real-time tracking.
                        </p>

                        {/* Avatars */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex' }}>
                                {[11, 12, 13].map((i, idx) => (
                                    <img key={i}
                                        src={`https://i.pravatar.cc/100?img=${i}`}
                                        alt="user"
                                        style={{
                                            width: '38px', height: '38px', borderRadius: '50%',
                                            border: '2px solid white',
                                            marginLeft: idx === 0 ? 0 : '-10px'
                                        }}
                                    />
                                ))}
                            </div>
                            <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                                Join 50k+ users today
                            </span>
                        </div>
                    </div>

                    {/* Status badge */}
                    <div style={{
                        position: 'absolute', bottom: '32px',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 16px', background: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ width: '8px', height: '8px', background: '#4ADE80', borderRadius: '50%' }} />
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '500' }}>
                            System Status: Optimal
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginFromComp        