// import { IoMdClose } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import CartContents from "./CartContent"; // Assuming this is the correct import path; adjust if needed
// import { useRef, useEffect } from 'react'; // Add this import for useRef and useEffect

// const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
//   const navigate = useNavigate();
//   const drawerRef = useRef(null); // Add this ref to track the drawer element

//   // Add this useEffect to handle outside clicks
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (drawerOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
//         toggleCartDrawer(); // Close the drawer if click is outside
//       }
//     };

//     if (drawerOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     // Cleanup listener on unmount or when drawer closes
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [drawerOpen, toggleCartDrawer]);

//   const handleCheckout = () => {
//     toggleCartDrawer(); // close drawer
//     navigate('/place-order')// go to checkout page
//   };

//   return (
//     <div
//   ref={drawerRef}
//   className={`
//     fixed top-0 right-0
//     w-[90%] sm:w-3/4 md:w-[35rem]
//     h-full bg-white shadow-xl
//     transform transition-transform duration-300
//     flex flex-col
//     z-[9999]
//     ${drawerOpen ? "translate-x-0" : "translate-x-full"}
//   `}
// >
//   {/* Close button */}
//   <div className="flex justify-end p-4">
//     <button onClick={toggleCartDrawer}>
//       <IoMdClose className="h-6 w-6 text-gray-600 hover:text-black transition" />
//     </button>
//   </div>

//   {/* Cart content */}
//   <div className="flex-grow px-4 pb-32 overflow-y-auto">
//     <CartContents />
//   </div>

//   {/* Bottom Checkout Bar (ALWAYS visible) */}
//   <div className="fixed bottom-0 right-0 w-[85%] sm:w-[60%] md:w-[30rem] bg-white border-t p-4 shadow-xl">
//     <button
//       onClick={handleCheckout}
//       className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
//     >
//       Checkout
//     </button>

//     <p className="text-xs sm:text-sm text-gray-500 mt-3 text-center leading-tight">
//       Shipping, taxes, and discount codes calculated at checkout.
//     </p>
//   </div>
// </div>

//   );
// };

// export default CartDrawer;



import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CartContents from './CartContent';
import { useRef, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const { cartItems } = useContext(ShopContext);

  // Item count badge
  const itemCount = Object.values(cartItems).reduce((acc, variants) =>
    acc + Object.values(variants).reduce((a, v) => {
      const qty = typeof v === 'number' ? v : (v?.quantity || 0);
      return a + qty;
    }, 0), 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        toggleCartDrawer();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen, toggleCartDrawer]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate('/place-order');
  };

  return (
    <>
      <style>{`
        @keyframes drawerGlowIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        .ll-drawer-scroll::-webkit-scrollbar { width:3px; }
        .ll-drawer-scroll::-webkit-scrollbar-track { background:transparent; }
        .ll-drawer-scroll::-webkit-scrollbar-thumb { background:rgba(99,102,241,0.3); border-radius:4px; }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        style={{
          background: 'rgba(4,4,10,0.75)',
          backdropFilter: 'blur(4px)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          animation: drawerOpen ? 'drawerGlowIn 0.3s ease' : 'none',
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full z-[9999] flex flex-col"
        style={{
          width: 'min(92vw, 26rem)',
          background: 'linear-gradient(160deg, #0d0d1a 0%, #09090f 100%)',
          borderLeft: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.6), -1px 0 0 rgba(99,102,241,0.1)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* Left accent line */}
        <div className="absolute top-0 left-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(180deg, rgba(99,102,241,0.6) 0%, rgba(201,124,58,0.4) 50%, transparent 100%)',
          }} />

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div>
              <p className="uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px',
                  color: '#6366f1', fontWeight: 600, marginBottom: '2px' }}>
                LL Leather Lovers
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: '22px',
                color: '#fff',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}>
                Shopping <em style={{ fontStyle: 'italic', color: '#c97c3a' }}>Cart</em>
              </h2>
              <div className="mt-3 w-10 h-px"
          style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
            </div>

            {itemCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full tabular-nums"
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  background: '#6366f1',
                  color: '#fff',
                  marginTop: '2px',
                }}>
                {itemCount}
              </span>
            )}
          </div>

          <button
            onClick={toggleCartDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(99,102,241,0.2)';
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <IoMdClose className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.6)' }} />
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div className="ll-drawer-scroll flex-1 overflow-y-auto px-5 py-4">
          <CartContents />
        </div>

        {/* ── Checkout footer ── */}
        <div
          className="flex-shrink-0 px-5 py-5"
          style={{
            borderTop: '1px solid rgba(99,102,241,0.15)',
            background: 'linear-gradient(0deg, rgba(9,9,15,1) 0%, rgba(13,13,26,0.95) 100%)',
            boxShadow: '0 -16px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Divider line */}
          <div className="mb-4 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.4), rgba(201,124,58,0.3), transparent)' }} />

          <button
            onClick={handleCheckout}
            disabled={itemCount === 0}
            className="relative w-full py-3.5 rounded-xl overflow-hidden transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed group"
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: itemCount > 0
                ? 'linear-gradient(135deg, #6366f1 0%, #4f52d9 100%)'
                : 'rgba(255,255,255,0.1)',
              color: '#fff',
              boxShadow: itemCount > 0 ? '0 8px 24px rgba(99,102,241,0.35)' : 'none',
            }}
            onMouseEnter={e => { if (itemCount > 0) e.currentTarget.style.background = 'linear-gradient(135deg, #4f52d9 0%, #4044c7 100%)'; }}
            onMouseLeave={e => { if (itemCount > 0) e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f52d9 100%)'; }}
          >
            <span className="flex items-center justify-center gap-2">
              Proceed to Checkout
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>

          <p className="text-center mt-3"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px',
              color: 'rgba(255,255,255,0.2)', lineHeight: 1.5 }}>
            Shipping, taxes &amp; discounts calculated at checkout
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;