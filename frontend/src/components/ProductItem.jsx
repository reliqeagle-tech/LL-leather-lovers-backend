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

const ProductItem = ({ id, image, name, price, discountPrice }) => {
  const { currency, getProductReviews } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

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
      to={`/product/${id}`}
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