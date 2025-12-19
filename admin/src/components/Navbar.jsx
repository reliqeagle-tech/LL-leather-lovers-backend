import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between sticky top-0 bg-[#000000] z-[99]'>
      <div><h1 className='font-semibold text-3xl text-white'>LL Leather <span className='text-indigo-500'>Lovers</span></h1>
      <p className='text-center text-sm text-gray-300 prata-regular'>ADMIN PANEL</p>
      </div>
      <button onClick={()=>setToken('')} className='bg-gray-600 hover:bg-indigo-500 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm '>Logout</button>
    </div>
  )
}

export default Navbar