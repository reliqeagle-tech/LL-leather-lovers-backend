// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/assets';
// import { useLocation } from 'react-router-dom';

// const SearchBar = () => {

//     const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
//     const [visible,setVisible] = useState(false)
//     const location = useLocation();

//     useEffect(()=>{
//         if (location.pathname.includes('collection')) {
//             setVisible(true);
//         }
//         else {
//             setVisible(false)
//         }
//     },[location])

//   return showSearch && visible ? (
//     <div className='border-t border-b bg-gray-50 text-center'>
//       <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
//         <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
//         <img className='w-4' src={assets.search_icon} alt="" />
//       </div>
//       <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
//     </div>
//   ) : null
// }

// export default SearchBar



import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  useEffect(() => {
    if (showSearch && visible) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [showSearch, visible]);

  if (!showSearch || !visible) return null;

  return (
    <>
      <style>{`
        @keyframes searchDown {
          from { opacity:0; transform:translateY(-10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ll-search-input::placeholder { color: rgba(255,255,255,0.25); }
        .ll-search-input::-webkit-search-cancel-button { display:none; }
      `}</style>

      <div
        className="relative"
        style={{
          background: 'linear-gradient(180deg, #08080f 0%, #0b0b14 100%)',
          borderBottom: '1px solid rgba(99,102,241,0.15)',
          animation: 'searchDown 0.25s ease',
        }}
      >
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />

        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">

          {/* Input wrapper */}
          <div
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-250"
            style={{
              background: focused ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.04)',
              border: focused
                ? '1px solid rgba(99,102,241,0.5)'
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1), 0 0 20px rgba(99,102,241,0.08)' : 'none',
            }}
          >
            {/* Search icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke={focused ? '#6366f1' : 'rgba(255,255,255,0.25)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="flex-shrink-0 transition-colors duration-200">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              type="search"
              placeholder="Search leather jackets, accessories…"
              className="ll-search-input flex-1 bg-transparent outline-none"
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.02em',
              }}
            />

            {/* Clear button */}
            {search && (
              <button
                onClick={() => setSearch('')}
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2l6 6M8 2L2 8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Cancel */}
          <button
            onClick={() => { setShowSearch(false); setSearch(''); }}
            className="flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-200"
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.70)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#6366f1';
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.70)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.040)';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;