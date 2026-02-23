// // import React, { useContext, useEffect, useState } from 'react'
// // import { ShopContext } from '../context/ShopContext';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // const Login = () => {

// //   const [currentState, setCurrentState] = useState('Login');
// //   const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

// //   const [name,setName] = useState('')
// //   const [password,setPasword] = useState('')
// //   const [email,setEmail] = useState('')

// //   const onSubmitHandler = async (event) => {
// //       event.preventDefault();
// //       try {
// //         if (currentState === 'Sign Up') {
          
// //           const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
// //           if (response.data.success) {
// //             setToken(response.data.token)
// //             localStorage.setItem('token',response.data.token)
// //           } else {
// //             toast.error(response.data.message)
// //           }

// //         } else {

// //           const response = await axios.post(backendUrl + '/api/user/login', {email,password})
// //           if (response.data.success) {
// //             setToken(response.data.token)
// //             localStorage.setItem('token',response.data.token)
// //           } else {
// //             toast.error(response.data.message)
// //           }

// //         }


// //       } catch (error) {
// //         console.log(error)
// //         toast.error(error.message)
// //       }
// //   }

// //   useEffect(()=>{
// //     if (token) {
// //       navigate('/')
// //     }
// //   },[token])

// //   return (
// //     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
// //         <div className='inline-flex items-center gap-2 mb-2 mt-10'>
// //             <p className='prata-regular text-3xl'>{currentState}</p>
// //             <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
// //         </div>
// //         {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
// //         <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
// //         <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
// //         <div className='w-full flex justify-between text-sm mt-[-8px]'>
// //             <p className=' cursor-pointer'>Forgot your password?</p>
// //             {
// //               currentState === 'Login'
// //               ? <p onClick={()=>setCurrentState('Sign Up')} className=' cursor-pointer'>Create account</p>
// //               : <p onClick={()=>setCurrentState('Login')} className=' cursor-pointer'>Login Here</p>
// //             }
// //         </div>
// //         <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
// //     </form>
// //   )
// // }

// // export default Login


// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState(''); // Fixed typo: setPasword -> setPassword
//   const [email, setEmail] = useState('');

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (currentState === 'Sign Up') {
//         const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//         } else {
//           toast.error(response.data.message);
//         }
//       } else {
//         const response = await axios.post(backendUrl + '/api/user/login', { email, password });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token]);

//   return (
//     <div className="min-h-screen flex items-center bg-[#f4f6ff] justify-center">
//       <form
//         onSubmit={onSubmitHandler}
//         className="bg-white p-6 rounded-lg shadow w-full max-w-md flex flex-col items-center gap-4 text-gray-700"
//       >
//         <div className="inline-flex items-center gap-2 mb-6">
//           <h2 className="text-2xl font-bold">{currentState}</h2>
//           <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//         </div>
//         {currentState === 'Login' ? '' : (
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded"
//             placeholder="Your Name"
//             required
//           />
//         )}
//         <input
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           type="email"
//           className="w-full px-3 py-2 border border-gray-300 rounded"
//           placeholder="Email Address"
//           required
//         />
//         <input
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//           type="password"
//           className="w-full px-3 py-2 border border-gray-300 rounded"
//           placeholder="Password"
//           required
//         />
//         <div className="w-full flex justify-between text-sm mt-[-8px]">
//           <p className="cursor-pointer text-gray-600">Forgot your password?</p>
//           {currentState === 'Login' ? (
//             <p onClick={() => setCurrentState('Register')} className="cursor-pointer text-gray-900 underline hover:no-underline">
//               Create account
//             </p>
//           ) : (
//             <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-gray-900 underline hover:no-underline">
//               Login Here
//             </p>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-gray-800  text-white p-2 rounded hover:bg-gray-600"
//         >
//           {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
//         </button>
//         <p className="text-center mt-2 text-gray-600">
//           Don't have an account?{' '}
//           <span
//             onClick={() => setCurrentState('Register')}
//             className="text-gray-900 cursor-pointer underline hover:no-underline"
//           >
//             Register here
//           </span>
//         </p>
//         <p className="text-center  text-gray-600">
//           <input type="checkbox" className="mr-2" /> By continuing, I agree to the terms of use & privacy policy
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;




// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'sonner';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (currentState === 'Register') {
//         const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           toast.success('Account created successfully!');
//         } else {
//           toast.error(response.data.message);
//         }
//       } else {
//         const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           toast.success("Login successful!", { duration: 2000 });
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (token) navigate('/');
//   }, [token]);

//   return (
//     <div className="min-h-screen flex items-center bg-[#f4f6ff] justify-center">
//       <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow w-full max-w-md flex flex-col items-center gap-4 text-gray-700">
//         <div className="inline-flex items-center gap-2 mb-6">
//           <h2 className="text-2xl font-bold">{currentState}</h2>
//           <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//         </div>

//         {currentState === 'Login' ? null : (
//           <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Your Name" required />
//         )}

//         <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Email Address" required />
//         <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Password" required />

//         <div className="w-full flex justify-between text-sm mt-[-8px]">
//           <p className="cursor-pointer text-gray-600">Forgot your password?</p>
//           {currentState === 'Login' ? (
//             <p onClick={() => setCurrentState('Register')} className="cursor-pointer text-gray-900 underline hover:no-underline">
//               Create account
//             </p>
//           ) : (
//             <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-gray-900 underline hover:no-underline">
//               Login Here
//             </p>
//           )}
//         </div>

//         <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-600">
//           {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'sonner';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (currentState === 'Register') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully!');
        } else { toast.error(response.data.message); }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else { toast.error(response.data.message); }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  useEffect(() => { if (token) navigate('/'); }, [token]);

  const focusStyle = (e) => {
    e.target.style.border = '1px solid rgba(99,102,241,0.55)';
    e.target.style.background = 'rgba(99,102,241,0.06)';
    e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
  };
  const blurStyle = (e) => {
    e.target.style.border = '1px solid rgba(255,255,255,0.09)';
    e.target.style.background = 'rgba(255,255,255,0.04)';
    e.target.style.boxShadow = 'none';
  };
  const inputBase = {
    fontFamily: "'Montserrat',sans-serif", fontSize: '13px',
    padding: '12px 14px 12px 42px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '8px', color: 'rgba(255,255,255,0.8)',
    width: '100%', outline: 'none', transition: 'all 0.2s',
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #08080f 0%, #0b0b14 100%)' }}>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
      <p className="absolute bottom-4 right-6 text-white pointer-events-none select-none hidden lg:block"
        style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '90px', fontWeight: 300, opacity: 0.025 }}>LL</p>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #a5b4fc, transparent)' }} />
          <div className="p-8 sm:p-10">

            {/* Brand */}
            <div className="text-center mb-8">
              <p className="text-white font-light mb-1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px' }}>
                LL <span className="font-normal">Leather</span> <em className="text-indigo-400 italic">Lovers</em>
              </p>
              <p className="text-white/25 uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>
                Premium Leather · Est. 2020
              </p>
              <div className="w-10 h-px mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }} />
            </div>

            {/* Tabs */}
            <div className="flex rounded-lg overflow-hidden mb-7 border border-white/[0.08] p-1 gap-1">
              {['Login', 'Register'].map(tab => (
                <button key={tab} type="button" onClick={() => setCurrentState(tab)}
                  className="flex-1 py-2.5 rounded-md transition-all duration-200 font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px',
                    background: currentState === tab ? '#6366f1' : 'transparent',
                    color: currentState === tab ? '#fff' : 'rgba(255,255,255,0.35)' }}>
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-4">

              {/* Name */}
              {currentState === 'Register' && (
                <div>
                  <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <input type="text" placeholder="John Doe" value={name} required onChange={e => setName(e.target.value)} style={inputBase} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <input type="email" placeholder="your@email.com" value={email} required onChange={e => setEmail(e.target.value)} style={inputBase} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Password</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} required onChange={e => setPassword(e.target.value)}
                    style={{ ...inputBase, paddingRight: '42px' }} onFocus={focusStyle} onBlur={blurStyle} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {showPass
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>

              {currentState === 'Login' && (
                <div className="text-right">
                  <button type="button" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Forgot password?</button>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full relative overflow-hidden rounded-lg text-white font-semibold uppercase tracking-widest py-3.5 mt-1 group"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2.5px', background: '#6366f1', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-lg" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (<><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Processing…</>) : currentState === 'Login' ? 'Sign In' : 'Create Account'}
                </span>
              </button>

              <p className="text-center pt-1" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
                {currentState === 'Login' ? "Don't have an account? " : 'Already have an account? '}
                <button type="button" onClick={() => setCurrentState(currentState === 'Login' ? 'Register' : 'Login')}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors underline">
                  {currentState === 'Login' ? 'Register' : 'Login'}
                </button>
              </p>
            </form>
          </div>
        </div>
        <p className="text-center mt-5" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.15)', letterSpacing: '1px' }}>
          🔒 Secure login · LL Leather Lovers · 2020
        </p>
      </div>
    </div>
  );
};

export default Login;