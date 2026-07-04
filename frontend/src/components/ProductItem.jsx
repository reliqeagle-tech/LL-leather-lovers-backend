// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, image, name, price, discountPrice }) => {
//   const { currency, getProductReviews } = useContext(ShopContext);

//   const [reviews, setReviews] = useState([]);
//   const [avgRating, setAvgRating] = useState(0);

//   // Load reviews when card mounts
//   useEffect(() => {
//     loadReviews();
//   }, [id]);

//   const loadReviews = async () => {
//     const data = await getProductReviews(id);
//     setReviews(data || []);

//     if (data && data.length > 0) {
//       const average =
//         data.reduce((sum, review) => sum + review.rating, 0) / data.length;
//       setAvgRating(average);
//     }
//   };

//   // Render stars
//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <span key={i}>
//         {i < Math.round(rating) ? "★" : "☆"}
//       </span>
//     ));
//   };
//   // 1. Determine the percentage discount (assuming discountPrice holds the PERCENTAGE value, e.g., 10 for 10%)
//     const percentOff = Number(discountPrice) || 0;

//     // 2. Check if the discount is valid (must be between 0 and 100)
//     const isValidDiscount = percentOff > 0 && percentOff < 100;

//     // 3. Calculate the final discounted price
//     const discountedPriceValue = isValidDiscount
//         ? price - (price * percentOff / 100)
//         : price;

//     // 4. Update hasDiscount based on the percentage being valid
//     const hasDiscount = isValidDiscount;

//     // console.log(discountedPriceValue)
//     // console.log(isValidDiscount)
//     // console.log("discount price is: ",discountedPriceValue);

//     // --- ⭐ FIXED MATH LOGIC END ---

//   return (
//     <Link
//       onClick={() => window.scrollTo(0, 0)}
//       className="cursor-pointer block group shadow-md rounded-lg py-5 bg-white"
//       to={`/product/${id}`}
//     >
//       {/* Image */}
//       <div className="w-full aspect-[4/3] rounded-md overflow-hidden flex items-center justify-center">
//         <img
//           src={image[0]}
//           alt={name}
//           className="h-full w-auto object-contain transition-t ransform duration-300 group-hover:scale-105 px-4"
//         />
//       </div>

//       {/* Offer */}
//       <div className="mt-3 px-5 py-2">
//         <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs">
//           Christmas Sale
//         </span>
//       </div>

//       {/* Product Name */}
//       <p className="mt-2 text-xs md:text-sm font-light text-gray-900 text-left px-4 line-clamp-2">
//         {name}
//       </p>

//       {/* ⭐ Rating + (Count) */}
//       <div className="pl-4 mt-1 text-sm text-yellow-500 flex items-center">
//         {renderStars(avgRating)}
//         <span className="ml-2 text-gray-600 text-xs">
//           ({reviews.length})
//         </span>
//       </div>

//       {/* Price
//       <div className="text-start mt-1 space-x-2 px-5">
//         <span className="line-through text-gray-500 text-xs">
//           {currency}
//           {(price * 1.2).toFixed(0)}
//         </span>

//         <span className="text-black font-semibold text-sm">
//           {currency}
//           {price}
//         </span>
//       </div> */}
//       {/* Price Section */}
//             <div className="text-start mt-1 space-x-2 px-5">
//                 {hasDiscount ? (
//                     <>
//                         {/* Old Price */}
//                         <span className="line-through text-gray-500 text-xs">
//                             {currency}{price}
//                         </span>

//                         {/* Discount Price - Use the newly calculated value */}
//                         <span className="text-black font-semibold text-sm">
//                             {currency}{discountedPriceValue.toFixed(2)}
//                         </span>

//                         {/* % OFF - Use the value straight from the percentage variable */}
//                         <span className="text-green-600 text-xs font-medium">
//                             {percentOff}% OFF
//                         </span>
//                     </>
//                 ) : (
//                     // Normal Price
//                     <span className="text-black font-semibold text-sm">
//                         {currency}{price}
//                     </span>
//                 )}
//             </div>
//     </Link>
//   );
// };

// export default ProductItem;



// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, image, name, price, discountPrice }) => {
//   const { currency, getProductReviews } = useContext(ShopContext);
//   const [reviews,   setReviews]   = useState([]);
//   const [avgRating, setAvgRating] = useState(0);

//   useEffect(() => {
//     (async () => {
//       const data = await getProductReviews(id);
//       setReviews(data || []);
//       if (data?.length) {
//         setAvgRating(data.reduce((s, r) => s + r.rating, 0) / data.length);
//       }
//     })();
//   }, [id]);

//   // ── Price logic ────────────────────────────────────────────────
//   const percentOff       = Number(discountPrice) || 0;
//   const isValidDiscount  = percentOff > 0 && percentOff < 100;
//   const discountedPrice  = isValidDiscount ? price - (price * percentOff / 100) : price;

//   // ── Star renderer ──────────────────────────────────────────────
//   const Stars = ({ rating }) => (
//     <span style={{ display: 'inline-flex', gap: '1px' }}>
//       {[...Array(5)].map((_, i) => {
//         const full   = i < Math.floor(rating);
//         const half   = !full && i < rating;
//         const color  = full || half ? '#f59e0b' : 'rgba(255,255,255,0.15)';
//         return (
//           <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
//           </svg>
//         );
//       })}
//     </span>
//   );

//   return (
//     <Link
//       onClick={() => window.scrollTo(0, 0)}
//       to={`/product/${id}`}
//       className="ll-product-card"
//       style={{
//         display: 'block',
//         borderRadius: '14px',
//         overflow: 'hidden',
//         position: 'relative',
//         background: 'linear-gradient(160deg, #0e0e1c 0%, #0a0a12 100%)',
//         border: '1px solid rgba(99,102,241,0.12)',
//         transition: 'all 0.3s ease',
//         textDecoration: 'none',
//       }}
//     >
//       <style>{`
//         .ll-product-card:hover {
//           border-color: rgba(99,102,241,0.35) !important;
//           transform: translateY(-3px);
//           box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1) !important;
//         }
//         .ll-product-card:hover .ll-product-img {
//           transform: scale(1.06);
//         }
//         .ll-product-card:hover .ll-cart-hint {
//           opacity: 1 !important;
//           transform: translateY(0) !important;
//         }
//       `}</style>

//       {/* ── Image container ── */}
//       <div style={{
//         width: '100%',
//         aspectRatio: '3/3.2',
//         overflow: 'hidden',
//         background: 'linear-gradient(135deg, #141420 0%, #0f0f1a 100%)',
//         position: 'relative',
//       }}>
//         <img
//           src={image[0]}
//           alt={name}
//           className="ll-product-img"
//           style={{
//             width: '100%', height: '100%',
//             objectFit: 'cover',
//             transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
//             display: 'block',
//           }}
//         />

//         {/* Gradient overlay at bottom of image */}
//         <div style={{
//           position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
//           background: 'linear-gradient(to top, rgba(10,10,18,0.85) 0%, transparent 100%)',
//           pointerEvents: 'none',
//         }} />

//         {/* Discount badge */}
//         {isValidDiscount && (
//           <div style={{
//             position: 'absolute', top: 10, left: 10,
//             background: 'linear-gradient(135deg, #6366f1 0%, #4f52d9 100%)',
//             borderRadius: '6px', padding: '3px 8px',
//             boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
//           }}>
//             <span style={{
//               fontFamily: "'Montserrat',sans-serif",
//               fontSize: '9px', fontWeight: 700,
//               letterSpacing: '0.08em', color: '#fff',
//             }}>
//               {percentOff}% OFF
//             </span>
//           </div>
//         )}

//         {/* Sale badge */}
//         <div style={{
//           position: 'absolute', top: 10, right: 10,
//           background: 'rgba(201,124,58,0.15)',
//           border: '1px solid rgba(201,124,58,0.4)',
//           borderRadius: '6px', padding: '3px 8px',
//         }}>
//           <span style={{
//             fontFamily: "'Montserrat',sans-serif",
//             fontSize: '8px', fontWeight: 700,
//             letterSpacing: '0.1em', color: '#c97c3a',
//             textTransform: 'uppercase',
//           }}>
//             Sale
//           </span>
//         </div>

//         {/* Hover cart hint */}
//         <div
//           className="ll-cart-hint"
//           style={{
//             position: 'absolute', bottom: 10, left: '50%',
//             transform: 'translate(-50%, 6px)',
//             opacity: 0,
//             transition: 'all 0.25s ease',
//             background: 'rgba(99,102,241,0.9)',
//             backdropFilter: 'blur(8px)',
//             borderRadius: '8px',
//             padding: '6px 14px',
//             whiteSpace: 'nowrap',
//             display: 'flex', alignItems: 'center', gap: 6,
//           }}
//         >
//           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
//             <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
//             <line x1="3" y1="6" x2="21" y2="6"/>
//             <path d="M16 10a4 4 0 01-8 0"/>
//           </svg>
//           <span style={{
//             fontFamily: "'Montserrat',sans-serif",
//             fontSize: '9px', fontWeight: 700,
//             letterSpacing: '0.12em', color: '#fff',
//             textTransform: 'uppercase',
//           }}>
//             View Product
//           </span>
//         </div>
//       </div>

//       {/* ── Info section ── */}
//       <div style={{ padding: '12px 14px 14px' }}>

//         {/* Product name */}
//         <p style={{
//           fontFamily: "'Cormorant Garamond',serif",
//           fontSize: 'clamp(13px,1.5vw,15px)',
//           fontWeight: 400,
//           color: 'rgba(255,255,255,0.9)',
//           lineHeight: 1.35,
//           marginBottom: '8px',
//           display: '-webkit-box',
//           WebkitLineClamp: 2,
//           WebkitBoxOrient: 'vertical',
//           overflow: 'hidden',
//         }}>
//           {name}
//         </p>

//         {/* Rating row */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '10px' }}>
//           <Stars rating={avgRating} />
//           {reviews.length > 0 ? (
//             <>
//               <span style={{
//                 fontFamily: "'Montserrat',sans-serif",
//                 fontSize: '9px', fontWeight: 600,
//                 color: '#f59e0b',
//               }}>
//                 {avgRating.toFixed(1)}
//               </span>
//               <span style={{
//                 fontFamily: "'Montserrat',sans-serif",
//                 fontSize: '9px', color: 'rgba(255,255,255,0.25)',
//               }}>
//                 ({reviews.length})
//               </span>
//             </>
//           ) : (
//             <span style={{
//               fontFamily: "'Montserrat',sans-serif",
//               fontSize: '9px', color: 'rgba(255,255,255,0.2)',
//             }}>
//               No reviews yet
//             </span>
//           )}
//         </div>

//         {/* Divider */}
//         <div style={{
//           height: 1, marginBottom: '10px',
//           background: 'linear-gradient(90deg, rgba(99,102,241,0.2), transparent)',
//         }} />

//         {/* Price row */}
//         <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
//           {isValidDiscount ? (
//             <>
//               {/* Final price */}
//               <span style={{
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontSize: '18px', fontWeight: 500,
//                 color: '#fff', lineHeight: 1,
//               }}>
//                 {currency}{discountedPrice.toFixed(2)}
//               </span>

//               {/* Original price */}
//               <span style={{
//                 fontFamily: "'Montserrat',sans-serif",
//                 fontSize: '10px', fontWeight: 400,
//                 color: 'rgba(255,255,255,0.3)',
//                 textDecoration: 'line-through',
//               }}>
//                 {currency}{price}
//               </span>

//               {/* Savings pill */}
//               <span style={{
//                 fontFamily: "'Montserrat',sans-serif",
//                 fontSize: '8px', fontWeight: 700,
//                 letterSpacing: '0.08em',
//                 color: '#34d399',
//                 background: 'rgba(52,211,153,0.1)',
//                 border: '1px solid rgba(52,211,153,0.2)',
//                 borderRadius: '4px',
//                 padding: '1px 5px',
//               }}>
//                 Save {currency}{(price - discountedPrice).toFixed(2)}
//               </span>
//             </>
//           ) : (
//             <span style={{
//               fontFamily: "'Cormorant Garamond',serif",
//               fontSize: '18px', fontWeight: 500,
//               color: '#fff', lineHeight: 1,
//             }}>
//               {currency}{price}
//             </span>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductItem;


import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { generateSeoUrlParts } from "../utils/slugify";

const ProductItem = ({ id, image, name, price, discountPrice, category, subCategory, sku }) => {
  const { currency, getProductReviews } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const getProductUrl = () => {

    if (!category || !subCategory || !sku) {
      console.warn("Missing SEO data:", {
        category,
        subCategory,
        sku,
        name,
      });

      return `/product/${id}`;
    }

    const {
      categorySlug,
      subCategorySlug,
      productSlug,
      skuSlug,
    } = generateSeoUrlParts(
      category,
      subCategory,
      name,
      sku
    );

    return `/product/${categorySlug}/${subCategorySlug}/${productSlug}/${skuSlug}`;
  };

  useEffect(() => {
    (async () => {
      const data = await getProductReviews(id);
      setReviews(data || []);
      if (data?.length) {
        setAvgRating(data.reduce((s, r) => s + r.rating, 0) / data.length);
      }
    })();
  }, [id]);

  // ── Price logic ────────────────────────────────────────────────
  const percentOff = Number(discountPrice) || 0;
  const isValidDiscount = percentOff > 0 && percentOff < 100;
  const discountedPrice = isValidDiscount ? price - (price * percentOff / 100) : price;

  // ── Star renderer ──────────────────────────────────────────────
  const Stars = ({ rating }) => (
    <span style={{ display: 'inline-flex', gap: '1px' }}>
      {[...Array(5)].map((_, i) => {
        const full = i < Math.floor(rating);
        const half = !full && i < rating;
        const color = full || half ? '#f59e0b' : 'rgba(255,255,255,0.15)';
        return (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </span>
  );

  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      to={getProductUrl()}
      className="ll-product-card"
      style={{
        display: 'block',
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(160deg, #0e0e1c 0%, #0a0a12 100%)',
        border: '1px solid rgba(99,102,241,0.12)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
      }}
    >
      <style>{`
        .ll-product-card:hover {
          border-color: rgba(99,102,241,0.35) !important;
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1) !important;
        }
        .ll-product-card:hover .ll-product-img {
          transform: scale(1.06);
        }
        .ll-product-card:hover .ll-cart-hint {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      {/* ── Image container ── */}
      <div style={{
        width: '100%',
        aspectRatio: '1/1',
        background: 'linear-gradient(135deg, #f5f3f0 0%, #ece9e4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Image — contain so full product is always visible */}
        <img
          src={image[0]}
          alt={name}
          className="ll-product-img"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain',
            padding: '12px',
            transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
            display: 'block',
          }}
        />

        {/* Gradient overlay at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to top, rgba(10,10,18,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Discount badge — z-index above overlay */}
        {isValidDiscount && (
          <div style={{
            position: 'absolute', top: 10, left: 10, zIndex: 3,
            background: 'linear-gradient(135deg, #6366f1 0%, #4f52d9 100%)',
            borderRadius: '6px', padding: '0px 8px',
            boxShadow: '0 4px 12px rgba(99,102,241,0.5)',
          }}>
            <span style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.08em', color: '#fff',
            }}>
              {percentOff}% OFF
            </span>
          </div>
        )}

        {/* Sale badge — z-index above overlay */}
        {/* <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 3,
          background: 'rgba(201,124,58,0.92)',
          borderRadius: '6px', padding: '0px 8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '8px', fontWeight: 700,
            letterSpacing: '0.1em', color: '#fff',
            textTransform: 'uppercase',
          }}>
            Sale
          </span>
        </div> */}

        {/* Hover cart hint — z-index above overlay */}
        <div
          className="ll-cart-hint"
          style={{
            position: 'absolute', bottom: 10, left: '40%',
            transform: 'translate(-50%, 6px)',
            opacity: 0,
            transition: 'all 0.25s ease',
            background: 'rgba(99,102,241,0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            padding: '6px 14px',
            whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 6,
            zIndex: 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.12em', color: '#fff',
            textTransform: 'uppercase',
          }}>
            View Product
          </span>
        </div>
      </div>

      {/* ── Info section ── */}
      <div style={{ padding: '12px 14px 14px' }}>

        {/* Product name */}
        <p style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 'clamp(13px,1.5vw,15px)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.35,
          marginBottom: '8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {name}
        </p>

        {/* Rating row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '10px' }}>
          <Stars rating={avgRating} />
          {reviews.length > 0 ? (
            <>
              <span style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '9px', fontWeight: 600,
                color: '#f59e0b',
              }}>
                {avgRating.toFixed(1)}
              </span>
              <span style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '9px', color: 'rgba(255,255,255,0.25)',
              }}>
                ({reviews.length})
              </span>
            </>
          ) : (
            <span style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: '9px', color: 'rgba(255,255,255,0.2)',
            }}>
              No reviews yet
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: '10px',
          background: 'linear-gradient(90deg, rgba(99,102,241,0.2), transparent)',
        }} />

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
          {isValidDiscount ? (
            <>
              {/* Final price */}
              <span style={{
                // fontFamily: "'Cormorant Garamond',serif",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '18px', fontWeight: 500,
                color: '#fff', lineHeight: 1,
              }}>
                {currency}{discountedPrice.toFixed(2)}
              </span>

              {/* Original price */}
              <span style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '10px', fontWeight: 400,
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'line-through',
              }}>
                {currency}{price}
              </span>

              {/* Savings pill */}
              <span style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '8px', fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#34d399',
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.2)',
                borderRadius: '4px',
                padding: '1px 5px',
              }}>
                Save {currency}{(price - discountedPrice).toFixed(2)}
              </span>
            </>
          ) : (
            <span style={{
              // fontFamily: "'Cormorant Garamond',serif",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: '18px', fontWeight: 500,
              color: '#fff', lineHeight: 1,
            }}>
              {currency}{price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;




// import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";
// import { generateSeoUrlParts } from "../utils/slugify";

// const ANIM = `
//   @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

//   @keyframes ddlGlow {
//     0%,100% { opacity:1; filter: blur(0px) brightness(1); }
//     50%      { opacity:1; filter: blur(0.5px) brightness(1.5); }
//   }
//   @keyframes ddlSlideInFwd {
//     from { opacity:0; transform: translateX(36px) scale(.97); }
//     to   { opacity:1; transform: translateX(0) scale(1); }
//   }
//   @keyframes ddlSlideInBack {
//     from { opacity:0; transform: translateX(-36px) scale(.97); }
//     to   { opacity:1; transform: translateX(0) scale(1); }
//   }

//   .ddl-gold-line {
//     position: absolute; top: 0; left: 0;
//     width: 100%; height: 1.5px;
//     background: linear-gradient(90deg,
//       transparent 0%, #4338CA 20%, #6366F1 45%,
//       #818CF8 50%, #6366F1 55%, #4338CA 80%, transparent 100%
//     );
//     transform: scaleX(0) translateZ(0);
//     transform-origin: left center;
//     transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
//     will-change: transform;
//   }
//   .ddl-card:hover .ddl-gold-line {
//     transform: scaleX(1) translateZ(0);
//     animation: ddlGlow 1.4s ease 0.45s infinite;
//   }
//   .ddl-card:hover .ddl-dots-wrap { opacity: 1; }
//   .ddl-card:hover .ddl-overlay   { transform: translateY(0); }
//   .ddl-card:hover .ddl-name      { color: #6366F1; }
//   .ddl-card:hover .ddl-arrow     { color: #6366F1; transform: translateX(4px); }
//   .ddl-card {
//     transition: border-color 0.35s cubic-bezier(.16,1,.3,1),
//                 transform 0.35s cubic-bezier(.16,1,.3,1),
//                 box-shadow 0.35s cubic-bezier(.16,1,.3,1);
//   }
//   .ddl-card:hover {
//     border-color: rgba(99,102,241,0.5) !important;
//     transform: translateY(-6px);
//     box-shadow: 0 20px 48px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.12);
//   }
//   .ddl-slide-img {
//     width: 100%; height: 100%;
//     object-fit: contain; padding: 12px;
//     position: absolute; inset: 0;
//     transition: opacity .32s ease, transform .32s cubic-bezier(.4,0,.2,1);
//     will-change: transform, opacity;
//   }
//   .ddl-slide-img.enter-fwd  { opacity: 0; transform: translateX(40px) scale(.97); }
//   .ddl-slide-img.enter-back { opacity: 0; transform: translateX(-40px) scale(.97); }
//   .ddl-slide-img.active     { opacity: 1; transform: translateX(0) scale(1); }
//   .ddl-slide-img.exit-fwd   { opacity: 0; transform: translateX(-40px) scale(.97); }
//   .ddl-slide-img.exit-back  { opacity: 0; transform: translateX(40px) scale(.97); }

//   .ddl-star { font-size: 13px; transition: color .2s; }

//   .ddl-overlay {
//     position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
//     padding: 10px 12px 12px;
//     transform: translateY(100%);
//     transition: transform 0.32s cubic-bezier(.4,0,.2,1);
//     background: transparent;
//   }
//   .ddl-quick-btn {
//     width: 100%; padding: 10px 0;
//     background: linear-gradient(110deg, #4338CA 0%, #6366F1 55%, #818CF8 100%);
//     background-size: 200% 200%; background-position: 0% 50%;
//     border: none; cursor: pointer; border-radius: 5px;
//     color: #fff; font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
//     font-family: 'Montserrat', sans-serif; text-transform: uppercase;
//     position: relative; overflow: hidden;
//     transition: background-position 0.4s ease, box-shadow 0.3s ease;
//     box-shadow: 0 3px 14px rgba(99,102,241,0.3);
//   }
//   .ddl-quick-btn::before {
//     content: ''; position: absolute; top: -50%; left: -60%;
//     width: 28%; height: 200%;
//     background: rgba(255,255,255,0.22); transform: skewX(-20deg);
//     transition: left .5s ease;
//   }
//   .ddl-quick-btn:hover::before { left: 120%; }
//   .ddl-quick-btn:hover { background-position: 100% 50%; box-shadow: 0 4px 20px rgba(99,102,241,0.45); }

//   .ddl-body {
//     padding: 12px 14px 14px;
//   }

//   .ddl-name {
//     color: #1E1B4B; font-family: 'Montserrat', sans-serif;
//     font-size: 13px; font-weight: 600; line-height: 1.45;
//     margin-bottom: 6px; letter-spacing: 0.01em;
//     display: -webkit-box; -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical; overflow: hidden;
//     transition: color 0.25s;
//   }
//   .ddl-arrow {
//     font-size: 16px; display: inline-block;
//     color: rgba(99,102,241,0.4);
//     transition: color 0.35s cubic-bezier(.16,1,.3,1), transform 0.35s cubic-bezier(.16,1,.3,1);
//   }
//   .ddl-dots-wrap { opacity: 0; transition: opacity 0.25s; }
// `;

// const ProductItem = ({ id, image, name, price, discountPrice, category, subCategory, sku }) => {
//   const { currency, getProductReviews, toggleWishlistItem, wishlist } = useContext(ShopContext);

//   const [reviews, setReviews] = useState([]);
//   const [avgRating, setAvgRating] = useState(0);
//   const [hovered, setHovered] = useState(false);
//   const [imgIndex, setImgIndex] = useState(0);
//   const [sliding, setSliding] = useState(false);
//   const [slideDir, setSlideDir] = useState(1);
//   const [displayIdx, setDisplayIdx] = useState(0);
//   const autoRef = useRef(null);
//   const images = Array.isArray(image) ? image : [image];

//   useEffect(() => { loadReviews(); }, [id]);

//   const getProductUrl = () => {
//     if (!category || !subCategory || !sku) {
//       console.warn("Missing SEO data:", { category, subCategory, sku, name });
//       return `/product/${id}`;
//     }
//     const { categorySlug, subCategorySlug, productSlug, skuSlug } = generateSeoUrlParts(category, subCategory, name, sku);
//     return `/product/${categorySlug}/${subCategorySlug}/${productSlug}/${skuSlug}`;
//   };

//   const loadReviews = async () => {
//     const data = await getProductReviews(id);
//     setReviews(data || []);
//     if (data?.length > 0)
//       setAvgRating(data.reduce((s, r) => s + r.rating, 0) / data.length);
//   };

//   const slideTo = useCallback((nextIdx, dir = 1) => {
//     if (sliding || nextIdx === imgIndex) return;
//     setSlideDir(dir); setSliding(true);
//     setTimeout(() => { setImgIndex(nextIdx); setDisplayIdx(nextIdx); setSliding(false); }, 320);
//   }, [sliding, imgIndex]);

//   useEffect(() => {
//     if (hovered && images.length > 1) {
//       autoRef.current = setInterval(() => {
//         setImgIndex(prev => {
//           const next = (prev + 1) % images.length;
//           setSlideDir(1); setSliding(true);
//           setTimeout(() => { setDisplayIdx(next); setSliding(false); }, 320);
//           return next;
//         });
//       }, 1800);
//     } else {
//       clearInterval(autoRef.current);
//       if (!hovered) slideTo(0, -1);
//     }
//     return () => clearInterval(autoRef.current);
//   }, [hovered, images.length]);

//   const isWishlisted = Array.isArray(wishlist) ? wishlist.some(i => i.productId === id) : false;

//   /* ══════════════════════════════════════════════════════════════
//      ✅ DISCOUNT FIX — LLeather Lovers stores discountPrice as the
//      FINAL RUPEE AMOUNT in the database (e.g. discountPrice: 950
//      means ₹950, not 950%). D Dolly Lamb's original logic treated
//      discountPrice as a percentage — that assumption is WRONG here
//      and was ported over incorrectly. This version:
//        1. Uses discountPrice directly as the final price
//        2. Derives the % badge from price vs discountPrice instead
//         of assuming discountPrice itself is a percent
//   ══════════════════════════════════════════════════════════════ */
//   const hasDiscount = Number(discountPrice) > 0 && Number(discountPrice) < Number(price);
//   const finalPrice = hasDiscount ? Number(discountPrice) : Number(price);
//   const percentOff = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => {
//       const full = i < Math.floor(rating), half = !full && i < rating;
//       return (
//         <span key={i} className="ddl-star" style={{ color: full || half ? "#6366F1" : "#C7D2FE" }}>
//           {full ? "★" : half ? "⯨" : "☆"}
//         </span>
//       );
//     });

//   const showPrev = sliding ? displayIdx : null;
//   const showCurr = sliding ? imgIndex : displayIdx;

//   return (
//     <>
//       <style>{ANIM}</style>

//       <Link
//         to={getProductUrl()}
//         onClick={() => window.scrollTo(0, 0)}
//         className="ddl-card block no-underline cursor-pointer relative rounded-[14px] overflow-hidden"
//         style={{
//           background: "#FFFFFF",
//           border: "1px solid rgba(99,102,241,0.15)",
//           boxShadow: "0 2px 12px rgba(99,102,241,0.07)",
//           fontFamily: "'Montserrat', sans-serif",
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         {/* IMAGE ZONE */}
//         <div className="relative w-full aspect-[7/6] overflow-hidden rounded-t-[13px]"
//           style={{ background: "#FFFFFF" }}>

//           {sliding && showPrev !== null && (
//             <img src={images[showPrev] || images[0]} alt={name}
//               className={`ddl-slide-img ${slideDir === 1 ? "exit-fwd" : "exit-back"}`}
//               style={{ zIndex: 1 }} />
//           )}
//           <img src={images[showCurr] || images[0]} alt={name}
//             className={`ddl-slide-img ${sliding ? (slideDir === 1 ? "enter-fwd" : "enter-back") : "active"}`}
//             style={{
//               zIndex: 2,
//               animation: sliding
//                 ? `ddlSlideIn${slideDir === 1 ? "Fwd" : "Back"} .32s cubic-bezier(.4,0,.2,1) forwards`
//                 : "none",
//             }} />

//           {/* Sale badge */}
//           {hasDiscount && (
//             <div style={{
//               position: "absolute", top: 10, left: 10, zIndex: 8,
//               background: "linear-gradient(135deg, #4338CA, #6366F1)",
//               color: "#fff", fontSize: 8, fontWeight: 700,
//               letterSpacing: "0.2em", padding: "3px 9px", borderRadius: 3,
//               fontFamily: "'Montserrat', sans-serif",
//             }}>{percentOff}% OFF</div>
//           )}

//           {/* Wishlist */}
//           <button
//             className="text-indigo-500 hover:text-white hover:bg-indigo-500"
//             style={{
//               position: "absolute", top: 10, right: 10, zIndex: 8,
//               width: 32, height: 32, borderRadius: "50%",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               cursor: "pointer", border: "1px solid rgba(99,102,241,0.25)",
//               boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
//               transition: "background 0.2s, border-color 0.2s, transform 0.2s",
//             }}
//             onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
//             onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//           >
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//               />
//             </svg>
//           </button>

//           {/* Dot indicators */}
//           {images.length > 1 && (
//             <div className="ddl-dots-wrap" style={{
//               position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
//               display: "flex", gap: 5, zIndex: 10,
//             }}>
//               {images.slice(0, 5).map((_, i) => (
//                 <button key={i} style={{
//                   height: 4, border: "none", padding: 0, cursor: "pointer", borderRadius: 2,
//                   width: i === imgIndex ? 18 : 4,
//                   background: i === imgIndex ? "#6366F1" : "rgba(99,102,241,0.25)",
//                   transition: "width 0.3s, background 0.3s",
//                 }}
//                   onMouseEnter={(e) => { e.preventDefault(); e.stopPropagation(); slideTo(i, i > imgIndex ? 1 : -1); }}
//                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                 />
//               ))}
//             </div>
//           )}

//           {/* View Product */}
//           <div className="ddl-overlay" onClick={(e) => e.preventDefault()}>
//             <Link to={getProductUrl()} onClick={(e) => e.stopPropagation()}>
//               <button className="ddl-quick-btn">View Product</button>
//             </Link>
//           </div>
//         </div>

//         {/* Indigo rule */}
//         <div style={{ position: "relative", height: 1, overflow: "hidden", background: "#DDE0FF" }}>
//           <div className="ddl-gold-line" />
//         </div>

//         {/* INFO SECTION */}
//         <div className="ddl-body bg-[#d4e8fc]">
//           <p className="ddl-name">{name}</p>

//           <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
//             <div style={{ display: "flex", gap: 2 }}>{renderStars(avgRating)}</div>
//             <span style={{ fontSize: 11, color: "#6B7280", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
//               ({reviews.length})
//             </span>
//           </div>

//           <div style={{ height: 1, background: "rgba(99,102,241,0.18)", marginBottom: 8 }} />

//           <div style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap" }}>
//             {hasDiscount ? (
//               <>
//                 <span style={{ fontSize: 16, fontWeight: 700, color: "#4338CA", fontFamily: "'Montserrat', sans-serif" }}>
//                   {currency}{finalPrice.toFixed(2)}
//                 </span>
//                 <span style={{ fontSize: 11, color: "#9CA3AF", textDecoration: "line-through", fontFamily: "'Montserrat', sans-serif" }}>
//                   {currency}{price}
//                 </span>
//                 <span style={{
//                   fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", color: "#6366F1",
//                   background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.22)",
//                   borderRadius: 2, padding: "1px 6px", fontFamily: "'Montserrat', sans-serif",
//                 }}>–{percentOff}%</span>
//               </>
//             ) : (
//               <span style={{ fontSize: 16, fontWeight: 700, color: "#4338CA", fontFamily: "'Montserrat', sans-serif" }}>
//                 {currency}{price}
//               </span>
//             )}
//           </div>

//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
//             <span style={{
//               fontSize: 9, letterSpacing: "0.22em", color: "#6B7280",
//               textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
//             }}>Premium Leather</span>
//             <span className="ddl-arrow">→</span>
//           </div>
//         </div>
//       </Link>
//     </>
//   );
// };

// export default ProductItem;