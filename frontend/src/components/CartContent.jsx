// import { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';
// import { RiDeleteBin3Fill, RiDeleteBin3Line } from 'react-icons/ri'
// import { ImBin } from "react-icons/im";
// import { RiAddLine, RiSubtractLine } from 'react-icons/ri'

// const CartContent = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0 && Object.keys(cartItems).length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const variant in cartItems[items]) {  // Rename 'item' to 'variant' for clarity
//           const raw = cartItems[items][variant];  // ✅ Extract raw (object or number)
//           const quantity = typeof raw === 'number' ? raw : (raw?.quantity || 0);  // ✅ Handle object
//           const customPrice = typeof raw === 'number' ? 0 : (raw?.customPrice || 0);  // ✅ Extract custom

//           if (quantity > 0) {
//             const [size, color] = variant.split('-');  // Parse: "S-Red" → size="S", color="Red"
//             if (!size || !color) continue;  // Skip invalid keys
//             tempData.push({
//               _id: items,
//               size,
//               color,  // Add color!
//               quantity,
//               customPrice  // ✅ Add customPrice
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     } else {
//       setCartData([]);
//     }
//   }, [cartItems, products]);

//   const isCartEmpty = cartData.length === 0;
//   return (
//     <div>
//   <div className="text-xl sm:text-2xl mb-3">
//     <Title text1={"YOUR"} text2={"CART"} />
//   </div>

//   {isCartEmpty ? (
//     <div className="text-center py-20 text-gray-500">
//       <p>Your cart is empty.</p>
//       <button
//         onClick={() => navigate('/collection')}
//         className="mt-6 px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-all"
//       >
//         Continue Shopping
//       </button>
//     </div>
//   ) : (
//     <>
//       {/* CART ITEMS */}
//       <div className="space-y-6">
//         {cartData.map((item, index) => {
//           const productData = products.find((p) => p._id === item._id);
//           if (!productData) return null;

//           const imageSrc = Array.isArray(productData.image)
//             ? productData.image[0]
//             : productData.image || assets.placeholder_image;

//           const discountAmount = productData.price - ( productData.price * productData.discountPrice/100)
//           const unitPrice = discountAmount + item.customPrice;
//           const lineTotal = unitPrice * item.quantity;

//           return (
//             <div
//               key={`${item._id}-${item.size}-${item.color}-${index}`}
//               className="
//                 border-b pb-4
//                 grid grid-cols-1
//                 sm:grid-cols-[1fr_auto_auto]
//                 gap-4
//               "
//             >
//               {/* LEFT: IMAGE + DETAILS */}
//               <div className="flex items-start gap-4 sm:gap-6">
//                 <img
//                   className="w-16 sm:w-20 object-cover rounded"
//                   src={imageSrc}
//                   alt={productData.name}
//                   onError={(e) => {
//                     e.target.src = assets.placeholder_image;
//                   }}
//                 />

//                 <div className="text-sm">
//                   <p className="font-medium">{productData.name}</p>

//                   {/* Attributes */}
//                   <div className="flex flex-wrap items-center gap-2 mt-2">
//                     <p className="px-2 py-1 border bg-slate-50 text-xs">
//                       {item.size}
//                     </p>
//                     <p className="px-2 py-1 border bg-slate-50 text-xs">
//                       {item.color}
//                     </p>
//                   </div>

//                   {/* Pricing */}
//                   <div className="mt-2">
//                     <p className="font-semibold">
//                       {currency}
//                       {unitPrice.toFixed(2)}
//                     </p>

//                     {item.customPrice > 0 && (
//                       <p className="text-xs text-green-600 leading-tight">
//                         Base: {currency}
//                         {productData.price.toFixed(2)} + Custom: {currency}
//                         {item.customPrice.toFixed(2)}
//                       </p>
//                     )}

//                     <p className="text-xs text-gray-600">
//                       Qty: {item.quantity} | Line Total: {currency}
//                       {lineTotal.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* MIDDLE: QUANTITY CONTROLS */}
//               <div className="flex justify-start sm:justify-center items-center space-x-1">
//                 <button
//                   type="button"
//                   onClick={() =>
//                     updateQuantity(
//                       item._id,
//                       item.size,
//                       item.color,
//                       Math.max(1, item.quantity - 1)
//                     )
//                   }
//                   disabled={item.quantity <= 1}
//                   className="
//                     w-8 h-8 border border-gray-300 bg-white
//                     rounded-l-md text-gray-500
//                     disabled:opacity-50 disabled:cursor-not-allowed
//                     hover:bg-gray-50 transition
//                   "
//                 >
//                   <RiSubtractLine className="w-4 h-4" />
//                 </button>

//                 <input
//                   type="number"
//                   min="1"
//                   max="99"
//                   value={item.quantity}
//                   onChange={(e) => {
//                     const val = Number(e.target.value);
//                     if (e.target.value === '' || val === 0) return;
//                     updateQuantity(item._id, item.size, item.color, val);
//                   }}
//                   className="
//                     w-14 h-8 border-y border-gray-300 bg-white
//                     text-center text-sm font-medium
//                     focus:ring-blue-500 focus:ring-1 outline-none
//                     appearance-none
//                   "
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     updateQuantity(
//                       item._id,
//                       item.size,
//                       item.color,
//                       item.quantity + 1
//                     )
//                   }
//                   className="
//                     w-8 h-8 border border-gray-300 bg-white
//                     rounded-r-md text-gray-500
//                     hover:bg-gray-50 transition
//                   "
//                 >
//                   <RiAddLine className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* RIGHT: DELETE BTN */}
//               <div className="flex justify-start sm:justify-center">
//                 <button
//                   onClick={() =>
//                     updateQuantity(item._id, item.size, item.color, 0)
//                   }
//                 >
//                   <ImBin className="h-5 w-5 text-red-600 cursor-pointer" />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* CART TOTAL SECTION */}
//       <div className="flex justify-end my-14">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//         </div>
//       </div>
//     </>
//   )}
// </div>

//   );
// }

// export default CartContent;



import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { ImBin } from 'react-icons/im';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

const CartContent = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const variant in cartItems[items]) {
          const raw = cartItems[items][variant];
          const quantity = typeof raw === 'number' ? raw : (raw?.quantity || 0);
          const customPrice = typeof raw === 'number' ? 0 : (raw?.customPrice || 0);
          if (quantity > 0) {
            const [size, color] = variant.split('-');
            if (!size || !color) continue;
            tempData.push({ _id: items, size, color, quantity, customPrice });
          }
        }
      }
      setCartData(tempData);
    } else {
      setCartData([]);
    }
  }, [cartItems, products]);

  const isCartEmpty = cartData.length === 0;

  return (
    <>
      <style>{`
        .ll-qty-input::-webkit-inner-spin-button,
        .ll-qty-input::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
        .ll-qty-input { -moz-appearance: textfield; }
        .ll-cart-item { transition: background 0.2s ease; }
        .ll-cart-item:hover { background: rgba(99,102,241,0.04) !important; }
      `}</style>

      {/* Title */}
      {/* <div className="mb-7">
        <p className="uppercase tracking-[0.2em] mb-1.5"
          style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', color: '#6366f1', fontWeight: 600 }}>
          Your Selection
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 'clamp(22px,3vw,30px)',
          color: '#fff',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}>
          Shopping <em style={{ fontStyle: 'italic', color: '#c97c3a' }}>Cart</em>
        </h2>
        <div className="mt-3 w-10 h-px"
          style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
      </div> */}

      {isCartEmpty ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="rgba(99,102,241,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px',
            color: '#fff', fontWeight: 300, marginBottom: '6px' }}>
            Your cart is empty
          </p>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
            color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
            Discover our premium leather collection
          </p>
          <button
            onClick={() => navigate('/collection')}
            className="px-6 py-2.5 rounded-lg transition-all duration-200"
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: '#6366f1',
              color: '#fff',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#4f52d9'}
            onMouseLeave={e => e.currentTarget.style.background = '#6366f1'}
          >
            Browse Collection
          </button>
        </div>
      ) : (
        <>
          {/* ── Cart Items ── */}
          <div>
            {cartData.map((item, index) => {
              const productData = products.find((p) => p._id === item._id);
              if (!productData) return null;

              const imageSrc = Array.isArray(productData.image)
                ? productData.image[0] : productData.image || assets.placeholder_image;

              const discountAmount = productData.price - (productData.price * productData.discountPrice / 100);
              const unitPrice = discountAmount + item.customPrice;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div
                  key={`${item._id}-${item.size}-${item.color}-${index}`}
                  className="ll-cart-item flex gap-4 py-5 px-2 rounded-xl -mx-2"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* Image */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ border: '1px solid rgba(99,102,241,0.15)' }}>
                    <img
                      src={imageSrc}
                      alt={productData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = assets.placeholder_image; }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: '16px',
                        color: '#fff',
                        fontWeight: 400,
                        lineHeight: 1.2,
                      }} className="truncate pr-2">
                        {productData.name}
                      </p>

                      {/* Delete */}
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.color, 0)}
                        className="flex-shrink-0 transition-colors duration-200 mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                      >
                        <ImBin className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[item.size, item.color].map((badge, bi) => (
                        <span key={bi} className="px-2 py-0.5 rounded-md"
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: '9px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: 'rgba(99,102,241,0.1)',
                            color: 'rgba(129,140,248,0.9)',
                            border: '1px solid rgba(99,102,241,0.2)',
                          }}>
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Pricing + stepper */}
                    <div className="mt-3 flex items-end justify-between gap-2 flex-wrap">
                      <div>
                        <p className="tabular-nums" style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: '20px',
                          color: '#fff',
                          fontWeight: 400,
                          lineHeight: 1,
                        }}>
                          {currency}{lineTotal.toFixed(2)}
                        </p>
                        {item.customPrice > 0 ? (
                          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px',
                            color: '#c97c3a', marginTop: '2px' }}>
                            Base {currency}{discountAmount.toFixed(2)} + Custom {currency}{item.customPrice.toFixed(2)}
                          </p>
                        ) : (
                          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px',
                            color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>
                            {currency}{unitPrice.toFixed(2)} each
                          </p>
                        )}
                      </div>

                      {/* Qty stepper */}
                      <div className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: '1px solid rgba(99,102,241,0.25)' }}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, item.size, item.color, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center transition-colors duration-150 disabled:opacity-30"
                          style={{ background: 'rgba(99,102,241,0.08)', color: 'rgba(255,255,255,0.5)' }}
                          onMouseEnter={e => { if (item.quantity > 1) e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; }}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
                        >
                          <RiSubtractLine className="w-3 h-3" />
                        </button>

                        <input
                          type="number"
                          min="1" max="99"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (e.target.value === '' || val === 0) return;
                            updateQuantity(item._id, item.size, item.color, val);
                          }}
                          className="ll-qty-input w-10 h-8 text-center outline-none"
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: '12px',
                            fontWeight: 600,
                            background: 'rgba(99,102,241,0.05)',
                            color: '#fff',
                            borderLeft: '1px solid rgba(99,102,241,0.2)',
                            borderRight: '1px solid rgba(99,102,241,0.2)',
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center transition-colors duration-150"
                          style={{ background: 'rgba(99,102,241,0.08)', color: 'rgba(255,255,255,0.5)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
                        >
                          <RiAddLine className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Cart Total ── */}
          <div className="flex justify-end mt-10 mb-14">
            <div className="w-full sm:w-[420px]">
              <CartTotal />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartContent;