import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../../App'

const Login = ({ setToken, setIsLogin }) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Restore remembered email on mount
    useEffect(() => {
        const saved = localStorage.getItem('ll_admin_email')
        if (saved) { setEmail(saved); setRemember(true) }
    }, [])

    const clearErr = (field) => setErrors(p => ({ ...p, [field]: '' }))

    const validate = () => {
        const e = {}
        if (!email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address'
        if (!password) e.password = 'Password is required'
        else if (password.length < 6) e.password = 'Minimum 6 characters'
        setErrors(e)
        return !Object.keys(e).length
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })

            if (response.data.success) {
                // Save remember-me preference
                if (remember) localStorage.setItem('ll_admin_email', email)
                else localStorage.removeItem('ll_admin_email')

                // Set token (App.jsx stores it in localStorage via useEffect)
                setToken(response.data.token)
                setIsLogin(true);

                // Toast success — matches App.jsx ToastContainer (top-right, colored theme)
                toast.success('🎉 Welcome back! Redirecting to dashboard…')

                // Navigate to dashboard
                // setTimeout(() => navigate('/'), 800)
                navigate("/", { replace: true });

            } else {
                toast.error(response.data.message || 'Invalid credentials')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const emailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !errors.email

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-[#F4F5FA] px-4'>

            {/* ── Subtle background blobs ── */}
            <div className='pointer-events-none fixed top-[-200px] right-[-130px] w-[580px] h-[580px] rounded-full'
                style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 65%)' }} />
            <div className='pointer-events-none fixed bottom-[-110px] left-[-80px] w-[420px] h-[420px] rounded-full'
                style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 65%)' }} />
            <div className='pointer-events-none fixed inset-0 z-0'
                style={{ backgroundImage: 'radial-gradient(circle, rgba(108,99,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            {/* ══ CARD ══ */}
            <div
                className='relative z-10 w-full max-w-[410px] bg-white rounded-2xl overflow-hidden border border-gray-100'
                style={{ boxShadow: '0 20px 60px rgba(108,99,255,0.13), 0 4px 16px rgba(0,0,0,0.05)' }}
            >

                {/* ── Gradient band header ── */}
                <div
                    className='relative px-8 pt-7 pb-6 overflow-hidden'
                    style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #8C86FF 55%, #A994FF 100%)' }}
                >
                    {/* Decorative circles */}
                    <div className='pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10' />
                    <div className='pointer-events-none absolute -bottom-8 left-6  w-24 h-24 rounded-full bg-white/[0.07]' />

                    {/* Brand */}
                    <div className='relative z-10 flex items-center gap-2.5 mb-5'>
                        <div className='w-9 h-9 rounded-[10px] flex items-center justify-center bg-white/20 border border-white/30 flex-shrink-0'>
                            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                                <polygon points='12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5' />
                                <line x1='12' y1='2' x2='12' y2='22' />
                                <line x1='2' y1='8.5' x2='22' y2='8.5' />
                                <line x1='2' y1='15.5' x2='22' y2='15.5' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-[15px] font-extrabold text-white leading-none tracking-tight'>LL Leather</p>
                            <p className='text-[9.5px] font-semibold text-white/55 tracking-[0.1em] uppercase mt-0.5'>Lovers · Admin</p>
                        </div>
                        <span
                            className='ml-auto text-[9px] font-extrabold text-white uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0'
                            style={{ background: '#F5A623' }}
                        >
                            ⚡ PRO
                        </span>
                    </div>

                    {/* Heading */}
                    <div className='relative z-10'>
                        <h1 className='text-[21px] font-extrabold text-white tracking-tight leading-snug mb-1'>
                            Admin Login 🔐
                        </h1>
                        <p className='text-[13px] text-white/60 font-normal'>
                            Enter your credentials to continue
                        </p>
                    </div>
                </div>

                {/* ── Form body ── */}
                <div className='px-8 py-6'>

                    {/* Status pills */}
                    <div className='flex items-center justify-center gap-4 mb-6'>
                        <div className='flex items-center gap-1.5 text-[11.5px] font-medium text-gray-400'>
                            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse' />
                            All systems online
                        </div>
                        <div className='w-px h-3 bg-gray-200' />
                        <div className='flex items-center gap-1.5 text-[11.5px] font-medium text-gray-400'>
                            <span className='w-1.5 h-1.5 rounded-full bg-[#6C63FF] flex-shrink-0' />
                            SSL secured
                        </div>
                    </div>

                    <form onSubmit={onSubmitHandler} noValidate>

                        {/* ── Email ── */}
                        <div className='mb-4'>
                            <label className='block text-[13px] font-semibold text-gray-600 mb-1.5'>
                                Email Address
                            </label>
                            <div className='relative group'>
                                <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#6C63FF] transition-colors pointer-events-none'>
                                    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                        <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                                        <polyline points='22,6 12,13 2,6' />
                                    </svg>
                                </span>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); clearErr('email') }}
                                    placeholder='admin@llleather.com'
                                    autoComplete='email'
                                    disabled={loading}
                                    className={[
                                        'w-full pl-10 pr-10 py-3 text-[13.5px] font-medium rounded-xl border outline-none transition-all',
                                        'bg-gray-50 text-gray-900 placeholder:text-gray-300',
                                        'focus:bg-white focus:border-[#6C63FF] focus:ring-4 focus:ring-[#6C63FF]/10',
                                        'disabled:opacity-50 disabled:cursor-not-allowed',
                                        errors.email ? 'border-red-400 bg-red-50/40' : 'border-gray-200',
                                    ].join(' ')}
                                />
                                {emailValid && (
                                    <span className='absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 text-sm font-bold'>✓</span>
                                )}
                            </div>
                            {errors.email && (
                                <p className='flex items-center gap-1 mt-1.5 text-[11.5px] font-medium text-red-500'>
                                    <svg width='11' height='11' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' /></svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* ── Password ── */}
                        <div className='mb-3'>
                            <label className='block text-[13px] font-semibold text-gray-600 mb-1.5'>
                                Password
                            </label>
                            <div className='relative group'>
                                <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#6C63FF] transition-colors pointer-events-none'>
                                    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                        <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                                        <path d='M7 11V7a5 5 0 0110 0v4' />
                                    </svg>
                                </span>
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); clearErr('password') }}
                                    placeholder='Enter your password'
                                    autoComplete='current-password'
                                    disabled={loading}
                                    className={[
                                        'w-full pl-10 pr-12 py-3 text-[13.5px] font-medium rounded-xl border outline-none transition-all',
                                        'bg-gray-50 text-gray-900 placeholder:text-gray-300',
                                        'focus:bg-white focus:border-[#6C63FF] focus:ring-4 focus:ring-[#6C63FF]/10',
                                        'disabled:opacity-50 disabled:cursor-not-allowed',
                                        errors.password ? 'border-red-400 bg-red-50/40' : 'border-gray-200',
                                    ].join(' ')}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPw(p => !p)}
                                    tabIndex={-1}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-all'
                                >
                                    {showPw ? (
                                        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                            <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24' />
                                            <line x1='1' y1='1' x2='23' y2='23' />
                                        </svg>
                                    ) : (
                                        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                                            <circle cx='12' cy='12' r='3' />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className='flex items-center gap-1 mt-1.5 text-[11.5px] font-medium text-red-500'>
                                    <svg width='11' height='11' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' /></svg>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* ── Remember me + Forgot password ── */}
                        <div className='flex items-center justify-between mt-4 mb-5'>
                            <label
                                className='flex items-center gap-2 cursor-pointer select-none'
                                onClick={() => setRemember(p => !p)}
                            >
                                <div className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-all ${remember ? 'bg-[#6C63FF] border-[#6C63FF]' : 'bg-white border-gray-300'}`}>
                                    {remember && <span className='text-white text-[10px] font-black leading-none'>✓</span>}
                                </div>
                                <span className='text-[13px] font-medium text-gray-500'>Keep me signed in</span>
                            </label>

                            <button
                                type='button'
                                onClick={() => navigate('/forget-password')}
                                className='text-[13px] font-semibold text-[#6C63FF] hover:text-[#5A52E8] hover:underline transition-colors bg-transparent border-none p-0 cursor-pointer'
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* ── Submit button ── */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-[14.5px] font-bold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0'
                            style={{
                                background: 'linear-gradient(135deg, #6C63FF 0%, #8C86FF 100%)',
                                boxShadow: '0 4px 18px rgba(108,99,255,0.40)',
                            }}
                        >
                            {loading ? (
                                <>
                                    <span className='w-[17px] h-[17px] rounded-full border-2 border-white/30 border-t-white flex-shrink-0 animate-spin' />
                                    <span>Signing in…</span>
                                </>
                            ) : (
                                <>
                                    <span>Login to Dashboard</span>
                                    <span className='w-[22px] h-[22px] rounded-full bg-white/25 flex items-center justify-center text-[12px]'>→</span>
                                </>
                            )}
                        </button>

                    </form>
                </div>

                {/* ── Footer ── */}
                <div className='px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-1.5'>
                    <span className='text-[12px] text-gray-400 font-medium'>Having trouble?</span>
                    <button
                        onClick={() => navigate('/forget-password')}
                        className='text-[12px] font-bold text-[#6C63FF] hover:underline transition-colors bg-transparent border-none cursor-pointer p-0'
                    >
                        Reset password →
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Login