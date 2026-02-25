// import React, { useContext, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";
// import AccountSidebar from "../components/AccountSidebar";
// import Title from "../components/Title";

// const Wishlist = () => {
//   const {
//     wishlist,
//     fetchWishlist,
//     toggleWishlistItem,
//     userId,
//     products,
//     currency,
//   } = useContext(ShopContext);

//   useEffect(() => {
//     if (userId) fetchWishlist();
//   }, [userId]);

//   // Merge wishlist items with product details + ratings
//   const wishlistProducts = wishlist
//     .map((w) => {
//       const product = products.find((p) => p._id === w.productId);
//       return product
//         ? {
//             ...product,
//             avgRating:
//               product.reviews?.length > 0
//                 ? product.reviews.reduce((s, r) => s + r.rating, 0) /
//                   product.reviews.length
//                 : 0,
//             reviewCount: product.reviews?.length || 0,
//           }
//         : null;
//     })
//     .filter(Boolean);

//   return (
//     <div className='container flex flex-col md:flex-row gap-5 m-auto '>
//       <div className='col1 md:w-[20%] py-10'>
//         <AccountSidebar />
//       </div>
//     <div className="max-w-5xl px-5 sm:px-20  py-6">
//       {/* <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2> */}
//       <div className="text-center text-2xl mb-2">
//               <Title text1={"MY"} text2={"WISHLIST"} />
//             </div>

//       {wishlistProducts.length === 0 ? (
//         <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {wishlistProducts.map((product) => (
//             <div
//               key={product._id}
//               className="cursor-pointer block group shadow-lg pt-4 rounded-md bg-white"
//             >
//               {/* Product Link */}
//               <Link
//                 onClick={() => window.scrollTo(0, 0)}
//                 to={`/product/${product._id}`}
//                 className="block"
//               >
//                 {/* Image */}
//                 <div className="w-full aspect-[4/3] rounded-md overflow-hidden flex items-center justify-center">
//                   <img
//                     src={product.image[0]}
//                     alt={product.name}
//                     className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>

//                 {/* Product Name */}
//                 <p className="mt-3 text-xs md:text-sm font-light text-gray-900 text-left px-5 line-clamp-2 bg-[#f1f1f1]">
//                   {product.name}
//                 </p>
//               </Link>
//               <div className="bg-[#f1f1f1]">
//               {/* ⭐ Rating + Count */}
//               <div className="px-5  text-sm text-yellow-500 flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i}>
//                     {i < Math.round(product.avgRating || 0) ? "★" : "☆"}
//                   </span>
//                 ))}
//                 <span className="ml-2 text-gray-600 text-xs">
//                   ({product.reviewCount})
//                 </span>
//               </div>

//               {/* Price */}
//               <div className="text-start mt-1 px-5 space-x-2">
//                 <span className="line-through text-gray-500 text-xs">
//                   {currency}
//                   {(product.price * 1.2).toFixed(0)}
//                 </span>

//                 <span className="text-black font-semibold text-sm">
//                   {currency}
//                   {product.price}
//                 </span>
//               </div>

//               {/* Remove Button */}
//               <div className="px-5 pb-4 mt-4">
//                 <button
//                   onClick={() => toggleWishlistItem(product._id)}
//                   className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-indigo-500 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default Wishlist;



// import React, { useContext, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";
// import AccountSidebar from "../components/AccountSidebar";

// const Stars = ({ rating = 0, count = 0 }) => (
//   <div className="flex items-center gap-0.5 my-1.5">
//     {Array.from({ length: 5 }, (_, i) => (
//       <svg key={i} width="12" height="12" viewBox="0 0 24 24"
//         fill={i < Math.round(rating) ? "#3b82f6" : "none"}
//         stroke="#3b82f6" strokeWidth="1.5">
//         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//       </svg>
//     ))}
//     <span className="text-gray-400 ml-1" style={{ fontSize: "10px" }}>({count})</span>
//   </div>
// );

// const ACCENTS = ["#6366f1","#3b82f6","#4f46e5","#2563eb","#818cf8","#7c3aed","#6366f1","#4338ca"];

// const Wishlist = () => {
//   const { wishlist, fetchWishlist, toggleWishlistItem, userId, products, currency } = useContext(ShopContext);

//   useEffect(() => {
//     if (userId) fetchWishlist();
//   }, [userId]);

//   const wishlistProducts = wishlist
//     .map((w) => {
//       const product = products.find((p) => p._id === w.productId);
//       return product ? {
//         ...product,
//         avgRating: product.reviews?.length > 0
//           ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0,
//         reviewCount: product.reviews?.length || 0,
//       } : null;
//     })
//     .filter(Boolean);

//   return (
//     <div
//       style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
//       className="min-h-screen py-10 px-4 sm:px-6 lg:px-10"
//     >
//       {/* Top separator */}
//       <div className="fixed top-0 left-0 right-0 h-px z-50"
//         style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

//         {/* ── SIDEBAR ── */}
//         <div className="md:w-[22%] shrink-0">
//           <AccountSidebar />
//         </div>

//         {/* ── MAIN ── */}
//         <div className="flex-1 min-w-0">

//           {/* Heading */}
//           <div className="mb-7">
//             <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-1"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "4px" }}>
//               Account
//             </p>
//             <div className="flex items-end justify-between gap-3 flex-wrap">
//               <h1 className="text-white font-light leading-tight"
//                 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,40px)" }}>
//                 My{" "}
//                 <em className="text-indigo-400 italic font-light">Wishlist</em>
//               </h1>
//               {wishlistProducts.length > 0 && (
//                 <span className="inline-flex items-center gap-2 border border-white/[0.07]
//                   rounded-full px-3 py-1.5"
//                   style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
//                     color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px" }}>
//                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
//                   {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
//                 </span>
//               )}
//             </div>
//             <div className="w-10 h-px mt-3"
//               style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }} />
//           </div>

//           {/* ── EMPTY STATE ── */}
//           {wishlistProducts.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-24 gap-5 rounded-2xl border border-white/[0.05]"
//               style={{ background: "rgba(255,255,255,0.02)" }}>
//               <div className="w-16 h-16 rounded-full flex items-center justify-center
//                 border border-white/[0.08] bg-white/[0.03]">
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
//                   stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                 </svg>
//               </div>
//               <div className="text-center">
//                 <p className="text-white/50 mb-1"
//                   style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 300 }}>
//                   Your wishlist is empty
//                 </p>
//                 <p className="text-white/25"
//                   style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px" }}>
//                   Save pieces you love and find them here
//                 </p>
//               </div>
//               <Link to="/collection"
//                 className="relative overflow-hidden inline-flex items-center gap-2 no-underline
//                   text-white border border-indigo-500/40 rounded-sm px-7 py-3 group"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
//                   fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase" }}>
//                 <span className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100
//                   origin-left transition-transform duration-300" />
//                 <span className="relative z-10 flex items-center gap-2">
//                   Browse Collection
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
//                     stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                     <line x1="5" y1="12" x2="19" y2="12"/>
//                     <polyline points="12 5 19 12 12 19"/>
//                   </svg>
//                 </span>
//               </Link>
//             </div>
//           ) : (
//             <>
//               {/* ── GRID ── */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                 {wishlistProducts.map((product, index) => {
//                   const hasDiscount = product.discountPrice &&
//                     Number(product.discountPrice) < Number(product.price);
//                   const discountPct = hasDiscount
//                     ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
//                   const displayPrice = hasDiscount ? product.discountPrice : product.price;
//                   const accent = ACCENTS[index % ACCENTS.length];

//                   return (
//                     <div key={product._id}
//                       className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100
//                         hover:shadow-xl transition-shadow duration-300 flex flex-col group"
//                       style={{ borderLeft: `3px solid ${accent}` }}>

//                       {/* Image */}
//                       <Link
//                         to={`/product/${product._id}`}
//                         onClick={() => window.scrollTo(0, 0)}
//                         className="block relative overflow-hidden bg-white"
//                         style={{ height: "200px" }}
//                       >
//                         <img
//                           src={Array.isArray(product.image) ? product.image[0] : product.image}
//                           alt={product.name}
//                           className="w-full h-full transition-transform duration-600 group-hover:scale-105"
//                           style={{ objectFit: "contain", objectPosition: "center", padding: "8px",
//                             transitionDuration: "0.6s" }}
//                         />
//                         {/* Wishlist heart indicator */}
//                         <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full
//                           bg-red-50 border border-red-100 flex items-center justify-center">
//                           <svg width="13" height="13" viewBox="0 0 24 24"
//                             fill="#ef4444" stroke="#ef4444" strokeWidth="1.5">
//                             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                           </svg>
//                         </div>
//                       </Link>

//                       {/* Info */}
//                       <div className="px-3 pt-2.5 pb-3 flex flex-col flex-1">

//                         {/* Name */}
//                         <Link to={`/product/${product._id}`}
//                           onClick={() => window.scrollTo(0, 0)}
//                           className="no-underline">
//                           <p className="text-gray-800 leading-snug line-clamp-2 mb-0.5
//                             hover:text-indigo-600 transition-colors"
//                             style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", fontWeight: 400 }}>
//                             {product.name}
//                           </p>
//                         </Link>

//                         {/* Stars */}
//                         <Stars rating={product.avgRating} count={product.reviewCount} />

//                         {/* Price */}
//                         <div className="flex items-center gap-2 flex-wrap mt-0.5 mb-3">
//                           {hasDiscount ? (
//                             <>
//                               <span style={{ fontFamily: "'Montserrat',sans-serif",
//                                 fontSize: "15px", fontWeight: 700, color: "#111" }}>
//                                 {currency}{displayPrice}
//                               </span>
//                               <span style={{ fontFamily: "'Montserrat',sans-serif",
//                                 fontSize: "11px", color: "#9ca3af", textDecoration: "line-through" }}>
//                                 {currency}{product.price}
//                               </span>
//                               <span className="bg-green-50 border border-green-200 text-green-600
//                                 px-1.5 py-0.5 rounded"
//                                 style={{ fontFamily: "'Montserrat',sans-serif",
//                                   fontSize: "9px", fontWeight: 700 }}>
//                                 {discountPct}% OFF
//                               </span>
//                             </>
//                           ) : (
//                             <span style={{ fontFamily: "'Montserrat',sans-serif",
//                               fontSize: "15px", fontWeight: 700, color: "#111" }}>
//                               {currency}{product.price}
//                             </span>
//                           )}
//                         </div>

//                         {/* Actions */}
//                         <div className="flex gap-2 mt-auto">
//                           {/* View product */}
//                           <Link
//                             to={`/product/${product._id}`}
//                             onClick={() => window.scrollTo(0, 0)}
//                             className="flex-1 flex items-center justify-center gap-1.5 no-underline
//                               text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-lg
//                               hover:bg-indigo-600 hover:text-white hover:border-indigo-600
//                               transition-all duration-200 py-2"
//                             style={{ fontFamily: "'Montserrat',sans-serif",
//                               fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px" }}>
//                             <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
//                               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                               <circle cx="12" cy="12" r="3"/>
//                             </svg>
//                             View
//                           </Link>

//                           {/* Remove */}
//                           <button
//                             onClick={() => toggleWishlistItem(product._id)}
//                             className="w-9 h-9 flex items-center justify-center rounded-lg
//                               border border-red-100 bg-red-50 text-red-400
//                               hover:bg-red-500 hover:text-white hover:border-red-500
//                               transition-all duration-200 shrink-0"
//                             title="Remove from wishlist">
//                             <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
//                               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                               <polyline points="3 6 5 6 21 6"/>
//                               <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
//                               <path d="M10 11v6 M14 11v6"/>
//                               <path d="M9 6V4h6v2"/>
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Continue shopping */}
//               <div className="flex justify-center mt-10">
//                 <Link to="/collection"
//                   className="relative overflow-hidden inline-flex items-center gap-2 no-underline
//                     text-white border border-indigo-500/40 rounded-sm px-8 py-3 group"
//                   style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
//                     fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase" }}>
//                   <span className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100
//                     origin-left transition-transform duration-300" />
//                   <span className="relative z-10 flex items-center gap-2">
//                     Continue Shopping
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
//                       stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                       <line x1="5" y1="12" x2="19" y2="12"/>
//                       <polyline points="12 5 19 12 12 19"/>
//                     </svg>
//                   </span>
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wishlist;

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import AccountSidebar from "../components/AccountSidebar";

const Stars = ({ rating = 0, count = 0 }) => (
  <div className="flex items-center gap-0.5 my-1.5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill={i < Math.round(rating) ? "#fbbf24" : "none"}
        stroke="#fbbf24"
        strokeWidth="1.6"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ))}
    <span className="text-gray-400 ml-1 text-[10px]">({count})</span>
  </div>
);

const ACCENTS = ["#6366f1", "#a5b4fc", "#818cf8", "#c084fc", "#4f46e5", "#7c3aed"];

const Wishlist = () => {
  const { wishlist, fetchWishlist, toggleWishlistItem, userId, products, currency } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchWishlist().finally(() => setLoading(false));
    }
  }, [userId]);

  const wishlistProducts = wishlist
    .map((w) => {
      const product = products.find((p) => p._id === w.productId);
      if (!product) return null;
      return {
        ...product,
        avgRating: product.reviews?.length > 0
          ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
          : 0,
        reviewCount: product.reviews?.length || 0,
      };
    })
    .filter(Boolean);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
      >
        <div className="text-indigo-400 text-lg">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <div
      style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-10 text-gray-100"
    >
      {/* Top separator line */}
      <div
        className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-[24%] shrink-0">
          <AccountSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <p
              className="text-indigo-400 font-semibold uppercase tracking-widest mb-1.5"
              style={{ fontSize: "10px", letterSpacing: "4px" }}
            >
              Account
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h1
                className="text-white font-light leading-tight"
                style={{ fontSize: "clamp(28px, 4.5vw, 42px)" }}
              >
                My <em className="text-indigo-400 italic">Wishlist</em>
              </h1>
              {wishlistProducts.length > 0 && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-sm">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <div className="w-12 h-px mt-4 bg-gradient-to-r from-indigo-500 to-transparent" />
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 gap-6 rounded-2xl border border-white/5 bg-white/[0.015]">
              <div className="w-20 h-20 rounded-full flex items-center justify-center border border-indigo-500/20 bg-indigo-950/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-xl text-white/80 mb-2">Your wishlist is empty</p>
                <p className="text-gray-400">Save your favorite leather pieces here</p>
              </div>
              <Link
                to="/collection"
                className="mt-4 inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors font-medium tracking-wide text-sm uppercase"
              >
                Browse Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {wishlistProducts.map((product, index) => {
                  const price = parseFloat(product.price) || 0;
                  const discountPrice = product.discountPrice ? parseFloat(product.discountPrice) : 0;
                  const hasDiscount = discountPrice > 0 && discountPrice < price;
                  const displayPrice = hasDiscount ? discountPrice : price;
                  const discountPct = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;
                  const accent = ACCENTS[index % ACCENTS.length];

                  return (
                    <div
                      key={product._id}
                      className="group bg-gradient-to-b from-gray-900/40 to-gray-950/60 rounded-2xl overflow-hidden border border-gray-800/60 hover:border-indigo-500/40 transition-all duration-300 flex flex-col shadow-xl hover:shadow-indigo-900/30"
                      style={{ borderLeft: `4.5px solid ${accent}` }}
                    >
                      {/* Image Container – dark background like your preferred example */}
                      <Link
                        to={`/product/${product._id}`}
                        className="block relative overflow-hidden rounded-t-2xl"
                        style={{
                          height: "250px",
                          // background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
                          // background: 'linear-gradient(to top, rgba(10,10,18,0.6) 0%, transparent 100%)',
                          background: 'linear-gradient(135deg, #f5f3f0 0%, #ece9e4 100%)',
                        }}
                      >
                        <img
                          src={Array.isArray(product.image) ? product.image[0] : product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Gradient overlay at bottom
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                          background: 'linear-gradient(to top, rgba(10,10,18,0.6) 0%, transparent 100%)',
                          pointerEvents: 'none',
                          zIndex: 1,
                        }} /> */}

                        {/* Heart badge – filled red like wishlist item */}
                        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-900/80 backdrop-blur-md border border-red-700/50 flex items-center justify-center shadow-xl z-10">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="#f87171" stroke="#f87171">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="p-5 flex flex-col flex-1">
                        <Link to={`/product/${product._id}`} className="no-underline">
                          <h3
                            className="text-white font-light leading-tight line-clamp-2 mb-2 group-hover:text-indigo-300 transition-colors"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "16px",
                              fontWeight: 300,
                            }}
                          >
                            {product.name}
                          </h3>
                        </Link>

                        <Stars rating={product.avgRating} count={product.reviewCount} />

                        {/* Price & Discount */}
                        <div className="flex items-center gap-3 mt-3 mb-6 flex-wrap">
                          <span className="text-2xl font-semibold text-white">
                            {currency}{displayPrice.toFixed(2)}
                          </span>

                          {hasDiscount && (
                            <>
                              <span className="text-base text-gray-400 line-through">
                                {currency}{price.toFixed(2)}
                              </span>
                              <span className="bg-green-900/70 text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                                {discountPct}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                          <Link
                            to={`/product/${product._id}`}
                            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-center text-sm font-medium transition-all"
                          >
                            View Product
                          </Link>

                          <button
                            onClick={() => toggleWishlistItem(product._id)}
                            className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50 transition-all"
                            title="Remove from wishlist"
                          >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center mt-14">
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl font-medium tracking-wider uppercase text-sm transition-all shadow-xl hover:shadow-indigo-500/30"
                >
                  Continue Shopping
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;