
// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {

//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   // 🧠 Check if cart is empty
//   const isCartEmpty = cartData.length === 0;

//   return (
//     <div className='border-t pt-14'>

//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       {/* 🛒 If cart is empty, show a friendly message */}
//       {isCartEmpty ? (
//         <div className="text-center py-20 text-gray-500">
//           <p>Your cart is empty.</p>
//           <button
//             onClick={() => navigate('/collection')}
//             className="mt-6 px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-all"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* Cart Items */}
//           <div>
//             {cartData.map((item, index) => {
//               const productData = products.find((product) => product._id === item._id);

//               return (
//                 <div
//                   key={index}
//                   className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//                 >
//                   <div className="flex items-start gap-6">
//                     <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
//                     <div>
//                       <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                       <div className="flex items-center gap-5 mt-2">
//                         <p>{currency}{productData.price}</p>
//                         <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <input
//                     onChange={(e) =>
//                       e.target.value === '' || e.target.value === '0'
//                         ? null
//                         : updateQuantity(item._id, item.size, Number(e.target.value))
//                     }
//                     className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                     type="number"
//                     min={1}
//                     defaultValue={item.quantity}
//                   />
//                   <img
//                     onClick={() => updateQuantity(item._id, item.size, 0)}
//                     className="w-4 mr-4 sm:w-5 cursor-pointer"
//                     src={assets.bin_icon}
//                     alt=""
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           {/* Cart Totals Section */}
//           <div className="flex justify-end my-20">
//             <div className="w-full sm:w-[450px]">
//               <CartTotal />

//               <div className="w-full text-end">
//                 <button
//                   onClick={() => navigate('/place-order')}
//                   disabled={isCartEmpty}
//                   className={`text-sm my-8 px-8 py-3 rounded-md font-semibold transition-all
//                     ${isCartEmpty
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-black text-white hover:bg-gray-900'
//                     }`}
//                 >
//                   PROCEED TO CHECKOUT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;



// import { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {

//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0 && Object.keys(cartItems).length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     } else {
//       setCartData([]); // Reset if products or cart are empty
//     }
//   }, [cartItems, products]);

// //   useEffect(() => {
// //   if (products.length > 0 && Object.keys(cartItems).length > 0) {
// //     const tempData = [];
// //     for (const items in cartItems) {
// //       for (const item in cartItems[items]) {
// //         const entry = cartItems[items][item];
// //         if (entry?.quantity > 0) {
// //           tempData.push({
// //             _id: items,
// //             size: item,
// //             quantity: entry.quantity,
// //             price: entry.price, // ✅ include dynamic price
// //           });
// //         }
// //       }
// //     }
// //     setCartData(tempData);
// //   } else {
// //     setCartData([]);
// //   }
// // }, [cartItems, products]);


//   const isCartEmpty = cartData.length === 0;

//   return (
//     <div className='border-t pt-14'>
//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       {/* 🛒 Empty Cart Message */}
//       {isCartEmpty ? (
//         <div className="text-center py-20 text-gray-500">
//           <p>Your cart is empty.</p>
//           <button
//             onClick={() => navigate('/collection')}
//             className="mt-6 px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-all"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* 🛍️ Cart Items */}
//           <div>
//             {cartData.map((item, index) => {
//               const productData = products.find((product) => product._id === item._id);

//               // 🚨 Handle missing or deleted products safely
//               if (!productData) {
//                 // console.warn(`⚠️ Product not found for id: ${item._id}`);
//                 return null;
//               }
              

//               // 🧠 Safely extract image (Cloudinary or array fallback)
//               const imageSrc = Array.isArray(productData.image)
//                 ? productData.image[0]
//                 : productData.image || assets.placeholder_image;

//               return (
//                 <div
//                   key={index}
//                   className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr]
//                   sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//                 >
//                   <div className="flex items-start gap-6">
//                     <img
//                       className="w-16 sm:w-20 object-cover rounded"
//                       src={imageSrc}
//                       alt={productData.name || "Product"}
//                       onError={(e) => { e.target.src = assets.placeholder_image; }}
//                     />
//                     <div>
//                       <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                       <div className="flex items-center gap-5 mt-2">
//                         <p>{currency}{productData.price}</p>
//                         <p>{currency}{item.price}</p>  {/* ✅ shows actual customized price */}

//                         <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
//                         {/* <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.color}</p> */}
//                       </div>
//                     </div>
//                   </div>

//                   <input
//                     onChange={(e) =>
//                       e.target.value === '' || e.target.value === '0'
//                         ? null
//                         : updateQuantity(item._id, item.size, Number(e.target.value))
//                     }
//                     className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                     type="number"
//                     min={1}
//                     defaultValue={item.quantity}
//                   />

//                   <img
//                     onClick={() => updateQuantity(item._id, item.size, 0)}
//                     className="w-4 mr-4 sm:w-5 cursor-pointer"
//                     src={assets.bin_icon}
//                     alt="Delete"
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           {/* 💰 Cart Totals */}
//           <div className="flex justify-end my-20">
//             <div className="w-full sm:w-[450px]">
//               <CartTotal />

//               <div className="w-full text-end">
//                 <button
//                   onClick={() => navigate('/place-order')}
//                   disabled={isCartEmpty}
//                   className={`text-sm my-8 px-8 py-3 rounded-md font-semibold transition-all
//                     ${isCartEmpty
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-black text-white hover:bg-gray-900'
//                     }`}
//                 >
//                   PROCEED TO CHECKOUT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
  

// import { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   // useEffect(() => {
//   //   if (products.length > 0 && Object.keys(cartItems).length > 0) {
//   //     const tempData = [];
//   //     for (const items in cartItems) {
//   //       for (const itemKey in cartItems[items]) {
//   //         if (cartItems[items][itemKey] > 0) {
//   //           // Split combined key: "S-Tobacco" -> size: "S", color: "Tobacco"
//   //           const [size, color] = itemKey.includes('-') ? itemKey.split('-') : [itemKey, '']; // Fallback if no color (old data)
            
//   //           tempData.push({
//   //             _id: items,
//   //             size,
//   //             color,
//   //             quantity: cartItems[items][itemKey],
//   //           });
//   //         }
//   //       }
//   //     }
//   //     setCartData(tempData);
//   //   } else {
//   //     setCartData([]);
//   //   }
//   // }, [cartItems, products]);

//   useEffect(() => {
//   if (products.length > 0 && Object.keys(cartItems).length > 0) {
//     const tempData = [];
//     for (const items in cartItems) {
//       for (const itemKey in cartItems[items]) {
//         const raw = cartItems[items][itemKey];

//         // normalize old and new shapes
//         const quantity = typeof raw === 'number' ? raw : (raw?.quantity || 0);
//         const customPrice = typeof raw === 'number' ? 0 : (raw?.customPrice || 0);

//         if (quantity > 0) {
//           const [size, color] = itemKey.includes('-') ? itemKey.split('-') : [itemKey, ''];

//           tempData.push({
//             _id: items,
//             size,
//             color,
//             quantity,
//             customPrice
//           });
//         }
//       }
//     }
//     setCartData(tempData);
//   } else {
//     setCartData([]);
//   }
// }, [cartItems, products]);


//   const isCartEmpty = cartData.length === 0;

//   return (
//     <div className='border-t pt-14'>
//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       {/* 🛒 Empty Cart Message */}
//       {isCartEmpty ? (
//         <div className="text-center py-20 text-gray-500">
//           <p>Your cart is empty.</p>
//           <button
//             onClick={() => navigate('/collection')}
//             className="mt-6 px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-all"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* 🛍️ Cart Items */}
//           <div>
//             {cartData.map((item, index) => {
//               const productData = products.find((product) => product._id === item._id);

//               // 🚨 Handle missing or deleted products safely
//               if (!productData) {
//                 console.warn(`⚠️ Product not found for id: ${item._id}`);
//                 return null;
//               }

//               // 🧠 Safely extract image (Cloudinary or array fallback)
//               const imageSrc = Array.isArray(productData.image)
//                 ? productData.image[0]
//                 : productData.image || assets.placeholder_image;

//               return (
//                 <div
//                   key={`${item._id}-${item.size}-${item.color}-${index}`} // Better unique key
//                   className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr]
//                   sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//                 >
//                   <div className="flex items-start gap-6">
//                     <img
//                       className="w-16 sm:w-20 object-cover rounded"
//                       src={imageSrc}
//                       alt={productData.name || "Product"}
//                       onError={(e) => { e.target.src = assets.placeholder_image; }}
//                     />
//                     <div>
//                       <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                       <div className="flex items-center gap-5 mt-2 flex-wrap">
//                         <p>{currency}{productData.price + (item.customPrice || 0)}</p> Only product price, no duplicate
                        
//                         <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
//                         {item.color && ( // Show only if color exists
//                           <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm">
//                             {item.color}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <input
//                     onChange={(e) =>
//                       updateQuantity(
//                         item._id,
//                         item.size,
//                         item.color, // ✅ Pass color
//                         Number(e.target.value) || 0 // Handle empty input
//                       )
//                     }
//                     className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                     type="number"
//                     min={1}
//                     value={item.quantity} // Use value for controlled input (better than defaultValue)
//                   />

//                   <img
//                     onClick={() => updateQuantity(item._id, item.size, item.color, 0)} // ✅ Pass color for delete
//                     className="w-4 mr-4 sm:w-5 cursor-pointer"
//                     src={assets.bin_icon}
//                     alt="Delete"
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           {/* 💰 Cart Totals */}
//           <div className="flex justify-end my-20">
//             <div className="w-full sm:w-[450px]">
//               <CartTotal />

//               <div className="w-full text-end">
//                 <button
//                   onClick={() => navigate('/place-order')}
//                   disabled={isCartEmpty}
//                   className={`text-sm my-8 px-8 py-3 rounded-md font-semibold transition-all
//                     ${isCartEmpty
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-black text-white hover:bg-gray-900'
//                     }`}
//                 >
//                   PROCEED TO CHECKOUT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


// import { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0 && Object.keys(cartItems).length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const itemKey in cartItems[items]) {
//           const raw = cartItems[items][itemKey];
//           const quantity = typeof raw === 'number' ? raw : (raw?.quantity || 0);
//           const customPrice = typeof raw === 'number' ? 0 : (raw?.customPrice || 0);

//           if (quantity > 0) {
//             const [size, color] = itemKey.includes('-') ? itemKey.split('-') : [itemKey, ''];

//             tempData.push({
//               _id: items,
//               size,
//               color,
//               quantity,
//               customPrice
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
//     <div className='border-t pt-10 px-2 sm:px-10 lg:px-24'>
//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       {isCartEmpty ? (
//         <div className="text-center py-20 text-gray-500">
//           <p>Your cart is empty.</p>
//           <button
//             onClick={() => navigate('/collection')}
//             className="mt-6 px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-all"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <>
//           <div>
//             {cartData.map((item, index) => {
//               const productData = products.find((product) => product._id === item._id);
//               if (!productData) {
//                 console.warn(`⚠️ Product not found for id: ${item._id}`);
//                 return null;
//               }

//               const imageSrc = Array.isArray(productData.image)
//                 ? productData.image[0]
//                 : productData.image || assets.placeholder_image;

//               const unitPrice = productData.price + item.customPrice;  // ✅ Base + Custom
//               const lineTotal = unitPrice * item.quantity;

//               return (
//                 <div
//                   key={`${item._id}-${item.size}-${item.color}-${index}`}
//                   className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//                 >
//                   <div className="flex items-start gap-6">
//                     <img
//                       className="w-16 sm:w-20 object-cover rounded"
//                       src={imageSrc}
//                       alt={productData.name || "Product"}
//                       onError={(e) => { e.target.src = assets.placeholder_image; }}
//                     />
//                     <div>
//                       <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                       <div className="flex items-center gap-5 mt-2 flex-wrap">
//                         <div className="flex flex-col">
//                           <p className="font-semibold">{currency}{unitPrice.toFixed(2)}</p>  {/* ✅ $209.98 */}
//                           {item.customPrice > 0 && (
//                             <p className="text-xs text-green-600">Base: {currency}{productData.price.toFixed(2)} + Lining: {currency}{item.customPrice.toFixed(2)}</p>
//                           )}
//                           <p className="text-sm text-gray-600">Qty: {item.quantity} | Line Total: {currency}{lineTotal.toFixed(2)}</p>
//                         </div>
                        
//                         <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
//                         {item.color && (
//                           <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm">
//                             {item.color}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <input
//                     onChange={(e) => updateQuantity(item._id, item.size, item.color, Number(e.target.value) || 0)}
//                     className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                     type="number"
//                     min={1}
//                     value={item.quantity}
//                   />

//                   <img
//                     onClick={() => updateQuantity(item._id, item.size, item.color, 0)}
//                     className="w-4 mr-4 sm:w-5 cursor-pointer"
//                     src={assets.bin_icon}
//                     alt="Delete"
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-end my-20">
//             <div className="w-full sm:w-[450px]">
//               <CartTotal />  {/* Assumes it uses getCartAmount() — now with custom */}

//               <div className="w-full text-end">
//                 <button
//                   onClick={() => navigate('/place-order')}
//                   disabled={isCartEmpty}
//                   className={`text-sm my-8 px-8 py-3 rounded-md font-semibold transition-all
//                     ${isCartEmpty ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}
//                 >
//                   PROCEED TO CHECKOUT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // useEffect(() => {
  //   if (products.length > 0 && Object.keys(cartItems).length > 0) {
  //     const tempData = [];
  //     for (const items in cartItems) {
  //       for (const itemKey in cartItems[items]) {
  //         const raw = cartItems[items][itemKey];
  //         const quantity = typeof raw === 'number' ? raw : (raw?.quantity || 0);
  //         const customPrice = typeof raw === 'number' ? 0 : (raw?.customPrice || 0);
  //         if (quantity > 0) {
  //           const [size, color] = itemKey.includes('-') ? itemKey.split('-') : [itemKey, ''];
  //           tempData.push({ _id: items, size, color, quantity, customPrice });
  //         }
  //       }
  //     }
  //     setCartData(tempData);
  //   } else { setCartData([]); }
  // }, [cartItems, products]);
  useEffect(() => {
  if (products.length > 0 && Object.keys(cartItems).length > 0) {
    const tempData = [];
    for (const items in cartItems) {
      for (const itemKey in cartItems[items]) {
        const raw = cartItems[items][itemKey];
        const quantity = typeof raw === 'number' ? raw : (raw?.quantity || 0);
        const customPrice = typeof raw === 'number' ? 0 : (raw?.customPrice || 0);
        const sizePrice = typeof raw === 'number' ? null : (raw?.sizePrice || null);   // ✅ add kiya
        if (quantity > 0) {
          const [size, color] = itemKey.includes('-') ? itemKey.split('-') : [itemKey, ''];
          tempData.push({ _id: items, size, color, quantity, customPrice, sizePrice });   // ✅ pass kiya
        }
      }
    }
    setCartData(tempData);
  } else { setCartData([]); }
}, [cartItems, products]);

  const isCartEmpty = cartData.length === 0;

  return (
    <div style={{ background: 'linear-gradient(180deg, #08080f 0%, #0b0b14 100%)' }}
      className="min-h-screen py-10 px-4 sm:px-8 lg:px-16">

      <div className="max-w-7xl mx-auto mb-8">
        <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-1"
          style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '4px' }}>Review</p>
        <h1 className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,4vw,44px)' }}>
          Your <em className="text-indigo-400 italic font-light">Cart</em>
          {!isCartEmpty && <span className="ml-3 text-white/55" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '14px', fontStyle: 'normal', fontWeight: 400 }}>({cartData.length} {cartData.length === 1 ? 'item' : 'items'})</span>}
        </h1>
        <div className="w-10 h-px mt-3" style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
      </div>

      {isCartEmpty ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-24 gap-5 rounded-2xl border border-white/[0.05]"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/[0.08] bg-white/[0.03]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white/50 mb-1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 300 }}>Your cart is empty</p>
            <p className="text-white/25" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>Add leather pieces you love and they'll appear here</p>
          </div>
          <button onClick={() => navigate('/collection')}
            className="relative overflow-hidden inline-flex items-center gap-2 text-white border border-indigo-500/40 rounded-sm px-8 py-3 group"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            <span className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">Browse Collection
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-3">
            {cartData.map((item, index) => {
              // const productData = products.find(p => p._id === item._id);
              // if (!productData) return null;
              // const imageSrc = Array.isArray(productData.image) ? productData.image[0] : productData.image || assets.placeholder_image;
              // const unitPrice = productData.price + item.customPrice;
              // const lineTotal = unitPrice * item.quantity;

              const productData = products.find(p => p._id === item._id);
if (!productData) return null;
const imageSrc = Array.isArray(productData.image) ? productData.image[0] : productData.image || assets.placeholder_image;

const original = Number(item.sizePrice) || Number(productData.price);   // ✅ size-specific price
const discountPercent = Number(productData.discountPrice) || 0;
const discountAmount = discountPercent > 0 && discountPercent < 100
  ? (original * discountPercent) / 100 : 0;
const discountedPrice = original - discountAmount;
const unitPrice = discountedPrice + item.customPrice;
const lineTotal = unitPrice * item.quantity;
              return (
                <div key={`${item._id}-${item.size}-${item.color}-${index}`}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all duration-300 p-4 flex items-center gap-4">
                  <Link to={`/product/${item._id}`} className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-gray-100">
                    <img src={imageSrc} alt={productData.name} className="w-full h-full object-contain p-1" onError={e => { e.target.src = assets.placeholder_image; }} />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item._id}`} className="no-underline">
                      <p className="font-medium leading-snug line-clamp-2 hover:text-indigo-300 transition-colors"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>{productData.name}</p>
                    </Link>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 rounded px-2 py-0.5"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>Size: {item.size}</span>
                      {item.color && <span className="bg-white/[0.05] border border-white/[0.08] text-white/50 rounded px-2 py-0.5"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>{item.color}</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="text-white font-semibold" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px' }}>{currency}{unitPrice.toFixed(2)}</span>
                      {item.customPrice > 0 && <span className="text-green-400" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>Base {currency}{productData.price.toFixed(2)} + Lining {currency}{item.customPrice.toFixed(2)}</span>}
                      <span className="text-white/55" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>Line total: {currency}{lineTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <input type="number" min={1} value={item.quantity}
                      onChange={e => updateQuantity(item._id, item.size, item.color, Number(e.target.value) || 0)}
                      className="w-14 text-center rounded-lg transition-all"
                      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', padding: '8px 6px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', outline: 'none' }}
                      onFocus={e => { e.target.style.border = '1px solid rgba(99,102,241,0.5)'; }}
                      onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; }} />
                    <button onClick={() => updateQuantity(item._id, item.size, item.color, 0)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center border border-red-500/20 bg-red-500/[0.06] text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6 M14 11v6 M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="pt-2">
              <button onClick={() => navigate('/collection')}
                className="inline-flex items-center gap-2 hover:text-indigo-400 transition-colors group"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '1px', color: 'rgba(255,255,255,0.55)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform duration-200">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="lg:w-[360px] shrink-0">
            <div className="rounded-2xl overflow-hidden border border-white/[0.07]"
              style={{ background: 'rgba(255,255,255,0.02)', position: 'sticky', top: '24px' }}>
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #6366f1, #a5b4fc, transparent)' }} />
              <div className="p-6">
                <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-4"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>Order Summary</p>
                <CartTotal />
                <button onClick={() => navigate('/place-order')} disabled={isCartEmpty}
                  className="w-full mt-6 relative overflow-hidden rounded-lg text-white font-semibold uppercase tracking-widest py-4 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2.5px', background: '#6366f1' }}>
                  <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-lg" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </button>
                <div className="mt-4 space-y-2">
                  {[
                    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4', text: 'Secure checkout' },
                    { icon: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5', text: 'Easy 7-day returns' },
                    { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', text: 'Free insured shipping' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="1.5" strokeLinecap="round"><path d={icon}/></svg>
                      <span className="text-white/70" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;





// import React from 'react'
// import { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';
// import { IoMdClose } from 'react-icons/io';

// const Cart = () => {
//     const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//     useEffect(() => {
//     if (products.length > 0 && Object.keys(cartItems).length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     } else {
//       setCartData([]); // Reset if products or cart are empty
//     }
//   }, [cartItems, products]);

//   const isCartEmpty = cartData.length === 0;

//   return (
//     <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
      
//     </div>
//   )
// }

// export default Cart
