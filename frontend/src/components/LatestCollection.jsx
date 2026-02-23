// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";
// import ProductItem from "./ProductItem";
// import { Link } from "react-router-dom";

// const LatestCollection = () => {
//   const { products } = useContext(ShopContext);
//   const [latestProducts, setLatestProducts] = useState([]);

//   const updateProductCount = () => {
//     if (window.innerWidth < 640) {
//       // Mobile view → show 6
//       setLatestProducts(products.slice(0, 6));
//     } else {
//       // Tablet & Desktop → show 8
//       setLatestProducts(products.slice(0, 8));
//     }
//   };

//   useEffect(() => {
//     updateProductCount();
//     window.addEventListener("resize", updateProductCount);

//     return () => {
//       window.removeEventListener("resize", updateProductCount);
//     };
//   }, [products]);

//   return (
//     <div className="flex items-center justify-center">
//     <div className="my-5 container">
//       <div className="text-center py-8 text-3xl">
//         <Title text1={"LATEST"} text2={"COLLECTIONS"} />
//         <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//           Discover our latest collection crafted with precision, style, and comfort in mind.
//         </p>
//       </div>

//       {/* Rendering Products */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {latestProducts.map((item, index) => (
//           <ProductItem
//             key={index}
//             id={item._id}
//             image={item.image}
//             name={item.name}
//             price={item.price}
//             discountPrice={item.discountPrice}
//           />
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default LatestCollection;

// import React, { useContext, useEffect, useState, useRef } from "react";
// import { ShopContext } from "../context/ShopContext";
// import ProductItem from "./ProductItem";
// import { Link } from "react-router-dom";

// // Alternating dark card backgrounds so each card feels distinct
// const CARD_THEMES = [
//   { bg: "#0e0e12", border: "rgba(99,102,241,0.12)" }, // dark blue-black
//   { bg: "#111010", border: "rgba(255,255,255,0.07)" }, // warm dark
//   { bg: "#0a0e14", border: "rgba(99,102,241,0.1)" }, // deep navy
//   { bg: "#10100e", border: "rgba(255,255,255,0.06)" }, // dark brown-black
// ];

// const LatestCollection = () => {
//   const { products } = useContext(ShopContext);
//   const [latestProducts, setLatestProducts] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const sectionRef = useRef(null);

//   const updateProductCount = () => {
//     setLatestProducts(
//       window.innerWidth < 640 ? products.slice(0, 6) : products.slice(0, 8),
//     );
//   };

//   useEffect(() => {
//     updateProductCount();
//     window.addEventListener("resize", updateProductCount);
//     return () => window.removeEventListener("resize", updateProductCount);
//   }, [products]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) setVisible(true);
//       },
//       { threshold: 0.08 },
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
//         .lc-serif { font-family: 'Cormorant Garamond', serif; }
//         .lc-sans  { font-family: 'Montserrat', sans-serif; }

//         /* stagger reveal */
//         @keyframes cardReveal {
//           from { opacity:0; transform:translateY(20px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .card-reveal {
//           opacity: 0;
//           animation: cardReveal 0.5s ease forwards;
//         }

//         /* image-only zoom — target only the img tag inside .lc-img-wrap */
//         .lc-img-wrap {
//           overflow: hidden;
//         }
//         .lc-img-wrap img,
//         .lc-img-wrap a img,
//         .lc-img-wrap > * img {
//           transition: transform 0.65s cubic-bezier(.22,1,.36,1) !important;
//         }
//         .lc-card:hover .lc-img-wrap img,
//         .lc-card:hover .lc-img-wrap a img,
//         .lc-card:hover .lc-img-wrap > * img {
//           transform: scale(1.07) !important;
//         }

//         /* card — NO transform on hover, just shadow */
//         .lc-card {
//           border-radius: 6px;
//           overflow: hidden;
//           border: 1px solid;
//           transition: border-color 0.3s, box-shadow 0.3s;
//         }
//         .lc-card:hover {
//           box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.2);
//         }

//         /* CTA fill wipe */
//         .lc-cta {
//           position:relative; overflow:hidden;
//           transition: transform 0.2s, box-shadow 0.25s;
//         }
//         .lc-cta::before {
//           content:''; position:absolute; inset:0;
//           background:#6366f1;
//           transform:scaleX(0); transform-origin:left;
//           transition:transform 0.3s cubic-bezier(.22,1,.36,1);
//         }
//         .lc-cta:hover::before { transform:scaleX(1); }
//         .lc-cta:hover {
//           transform:translateY(-2px);
//           box-shadow:0 8px 28px rgba(99,102,241,0.35);
//         }
//         .lc-cta > * { position:relative; z-index:1; }
//       `}</style>

//       {/*
//         Background: #0b0b0f — slightly lighter/bluer than hero's #050505
//         so there's a clear visual separation when scrolling
//       */}
//       <section
//         ref={sectionRef}
//         className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
//         style={{
//           background: "linear-gradient(180deg, #0b0b0f 0%, #0d0d13 100%)",
//         }}
//       >
//         {/* Top separator line */}
//         <div
//           className="absolute top-0 left-0 right-0 h-px"
//           style={{
//             background:
//               "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
//           }}
//         />

//         {/* Soft indigo glow top-center */}
//         <div
//           className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 65%)",
//           }}
//         />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           {/* ── HEADING ── */}
//           <div className="text-center mb-12 sm:mb-16">
//             <h2
//               className="lc-serif text-white leading-[1.1] tracking-tight"
//               style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 300 }}
//             >
//               Latest{" "}
//               <em
//                 className="text-indigo-400"
//                 style={{ fontStyle: "italic", fontWeight: 300 }}
//               >
//                 Collections
//               </em>
//             </h2>

//             {/* Divider */}
//             <div
//               className="w-12 h-px mx-auto my-4"
//               style={{
//                 background:
//                   "linear-gradient(90deg, transparent, #6366f1, transparent)",
//               }}
//             />

//             <p
//               className="lc-sans text-white/35 max-w-md mx-auto leading-relaxed tracking-wide"
//               style={{ fontSize: "13px" }}
//             >
//               Crafted with precision, styled for those who demand the
//               extraordinary.
//             </p>

//             {/* Count pill */}
//             <div className="flex justify-center mt-5">
//               <span
//                 className="lc-sans inline-flex items-center gap-2 text-white/25
//                 border border-white/[0.07] px-4 py-1.5 rounded-full"
//                 style={{ fontSize: "10px", letterSpacing: "2px" }}
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
//                 {latestProducts.length} pieces
//               </span>
//             </div>
//           </div>

//           {/* ── PRODUCT GRID ── */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
//             {latestProducts.map((item, index) => {
//               const theme = CARD_THEMES[index % CARD_THEMES.length];
//               return (
//                 <div
//                   key={item._id}
//                   className="card-reveal"
//                   style={
//                     visible
//                       ? { animationDelay: `${index * 0.07}s` }
//                       : { animation: "none", opacity: 0 }
//                   }
//                 >
//                   <div
//                     className="lc-card relative"
//                     style={{
//                       background: theme.bg,
//                       borderColor: theme.border,
//                     }}
//                   >
//                     {/* Item number */}
//                     <span
//                       className="absolute top-2.5 left-3 z-10 select-none lc-sans"
//                       style={{
//                         fontSize: "10px",
//                         color: "rgba(255,255,255,0.18)",
//                         letterSpacing: "1px",
//                       }}
//                     >
//                       {String(index + 1).padStart(2, "0")}
//                     </span>

//                     {/* NEW badge — first 3 only */}
//                     {index < 3 && (
//                       <span
//                         className="absolute top-2.5 right-2.5 z-10 bg-indigo-600 text-white
//                           lc-sans rounded-sm px-2 py-0.5"
//                         style={{
//                           fontSize: "9px",
//                           fontWeight: 600,
//                           letterSpacing: "1.5px",
//                         }}
//                       >
//                         NEW
//                       </span>
//                     )}

//                     {/* Image — zoom only on img, not card */}
//                     <div className="lc-img-wrap aspect-[3/4] w-full">
//                       <ProductItem
//                         id={item._id}
//                         image={item.image}
//                         name={item.name}
//                         price={item.price}
//                         discountPrice={item.discountPrice}
//                       />
//                     </div>

//                     {/* Bottom accent line */}
//                     <div
//                       className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300"
//                       style={{
//                         background:
//                           "linear-gradient(90deg, transparent, #6366f1, transparent)",
//                       }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ── CTA ── */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14 sm:mt-16">
//             <Link
//               to="/collection"
//               className="lc-cta lc-sans inline-flex items-center gap-3 no-underline
//                 text-white border rounded-sm px-9 py-3.5"
//               style={{
//                 fontSize: "11px",
//                 fontWeight: 600,
//                 letterSpacing: "2.5px",
//                 textTransform: "uppercase",
//                 borderColor: "rgba(99,102,241,0.5)",
//               }}
//             >
//               <span>Explore Full Collection</span>
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="5" y1="12" x2="19" y2="12" />
//                 <polyline points="12 5 19 12 12 19" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default LatestCollection;

// import React, { useContext, useEffect, useState, useRef } from "react";
// import { ShopContext } from "../context/ShopContext";
// import ProductItem from "./ProductItem";
// import { Link } from "react-router-dom";

// // Distinct left-border accent colors per card position
// const CARD_ACCENTS = [
//   "#6366f1", // indigo
//   "#8b5cf6", // violet
//   "#6366f1", // indigo
//   "#a78bfa", // light violet
//   "#818cf8", // soft indigo
//   "#7c3aed", // deep violet
//   "#6366f1", // indigo
//   "#8b5cf6", // violet
// ];

// const LatestCollection = () => {
//   const { products } = useContext(ShopContext);
//   const [latestProducts, setLatestProducts] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const sectionRef = useRef(null);

//   const updateProductCount = () => {
//     setLatestProducts(
//       window.innerWidth < 640 ? products.slice(0, 6) : products.slice(0, 8),
//     );
//   };

//   useEffect(() => {
//     updateProductCount();
//     window.addEventListener("resize", updateProductCount);
//     return () => window.removeEventListener("resize", updateProductCount);
//   }, [products]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) setVisible(true);
//       },
//       { threshold: 0.06 },
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
//         .lc-serif { font-family: 'Cormorant Garamond', serif; }
//         .lc-sans  { font-family: 'Montserrat', sans-serif; }

//         /* stagger reveal */
//         @keyframes cardReveal {
//           from { opacity:0; transform:translateY(20px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .lc-reveal {
//           opacity: 0;
//           animation: cardReveal 0.5s ease forwards;
//         }

//         /* wrapper — only hover shadow, NO transform on whole card */
//         .lc-wrap {
//           border-radius: 8px;
//           overflow: hidden;
//           transition: box-shadow 0.3s, border-color 0.3s;
//           border: 1px solid rgba(255,255,255,0.06);
//           border-left-width: 3px;
//         }
//         .lc-wrap:hover {
//           box-shadow: 0 10px 36px rgba(0,0,0,0.45);
//           border-color: rgba(99,102,241,0.3);
//         }

//         /* image zoom ONLY — target img inside ProductItem */
//         .lc-img-zone {
//           overflow: hidden;
//         }
//         .lc-img-zone img {
//           transition: transform 0.65s cubic-bezier(.22,1,.36,1) !important;
//           display: block;
//           width: 100%;
//         }
//         .lc-wrap:hover .lc-img-zone img {
//           transform: scale(1.07) !important;
//         }

//         /* CTA fill wipe */
//         .lc-cta {
//           position: relative; overflow: hidden;
//           transition: transform 0.2s, box-shadow 0.25s;
//         }
//         .lc-cta::before {
//           content: ''; position: absolute; inset: 0;
//           background: #6366f1;
//           transform: scaleX(0); transform-origin: left;
//           transition: transform 0.3s cubic-bezier(.22,1,.36,1);
//         }
//         .lc-cta:hover::before { transform: scaleX(1); }
//         .lc-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 28px rgba(99,102,241,0.35);
//         }
//         .lc-cta > * { position: relative; z-index: 1; }
//       `}</style>

//       <section
//         ref={sectionRef}
//         className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
//         style={{
//           background: "linear-gradient(180deg, #0b0b0f 0%, #0e0e14 100%)",
//         }}
//       >
//         {/* Top separator */}
//         <div
//           className="absolute top-0 left-0 right-0 h-px"
//           style={{
//             background:
//               "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
//           }}
//         />

//         {/* Glow */}
//         <div
//           className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 70%)",
//           }}
//         />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           {/* ── HEADING ── */}
//           <div className="text-center mb-12 sm:mb-16">
//             <h2
//               className="lc-serif text-white leading-tight tracking-tight"
//               style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 300 }}
//             >
//               Latest{" "}
//               <em
//                 className="text-indigo-400"
//                 style={{ fontStyle: "italic", fontWeight: 300 }}
//               >
//                 Collections
//               </em>
//             </h2>

//             <div
//               className="w-12 h-px mx-auto my-4"
//               style={{
//                 background:
//                   "linear-gradient(90deg, transparent, #6366f1, transparent)",
//               }}
//             />

//             <p
//               className="lc-sans text-white/35 max-w-md mx-auto leading-relaxed tracking-wide"
//               style={{ fontSize: "13px" }}
//             >
//               Crafted with precision, styled for those who demand the
//               extraordinary.
//             </p>

//             <div className="flex justify-center mt-5">
//               <span
//                 className="lc-sans inline-flex items-center gap-2 text-white/25
//                 border border-white/[0.07] px-4 py-1.5 rounded-full"
//                 style={{ fontSize: "10px", letterSpacing: "2px" }}
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
//                 {latestProducts.length} pieces
//               </span>
//             </div>
//           </div>

//           {/* ── GRID ── */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
//             {latestProducts.map((item, index) => (
//               <div
//                 key={item._id}
//                 className="lc-reveal"
//                 style={
//                   visible
//                     ? { animationDelay: `${index * 0.07}s` }
//                     : { animation: "none", opacity: 0 }
//                 }
//               >
//                 {/*
//                   lc-wrap: colored left border + hover shadow only.
//                   No background set here — ProductItem renders its own card bg.
//                 */}
//                 <div
//                   className="lc-wrap relative"
//                   style={{
//                     borderLeftColor: CARD_ACCENTS[index % CARD_ACCENTS.length],
//                   }}
//                 >
//                   {/* Item number — floated above ProductItem */}
//                   <span
//                     className="absolute top-2.5 left-3 z-20 lc-sans select-none pointer-events-none"
//                     style={{
//                       fontSize: "10px",
//                       color: "rgba(255,255,255,0.22)",
//                       letterSpacing: "1px",
//                     }}
//                   >
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   {/* NEW badge */}
//                   {index < 3 && (
//                     <span
//                       className="absolute top-2.5 right-2.5 z-20 bg-indigo-600 text-white
//                         lc-sans rounded-sm px-2 py-0.5 pointer-events-none"
//                       style={{
//                         fontSize: "9px",
//                         fontWeight: 600,
//                         letterSpacing: "1.5px",
//                       }}
//                     >
//                       NEW
//                     </span>
//                   )}

//                   {/*
//                     lc-img-zone wraps ONLY the image portion of ProductItem.
//                     ProductItem renders both image and info — we can't split it,
//                     so we target the img tag via CSS inside lc-img-zone.
//                     The overflow:hidden on lc-wrap clips the zoom cleanly.
//                   */}
//                   <div className="lc-img-zone">
//                     <ProductItem
//                       id={item._id}
//                       image={item.image}
//                       name={item.name}
//                       price={item.price}
//                       discountPrice={item.discountPrice}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── CTA ── */}
//           <div className="flex items-center justify-center mt-14 sm:mt-16">
//             <Link
//               to="/collection"
//               className="lc-cta lc-sans inline-flex items-center gap-3 no-underline
//                 text-white border rounded-sm px-9 py-3.5"
//               style={{
//                 fontSize: "11px",
//                 fontWeight: 600,
//                 letterSpacing: "2.5px",
//                 textTransform: "uppercase",
//                 borderColor: "rgba(99,102,241,0.5)",
//               }}
//             >
//               <span>Explore Full Collection</span>
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="5" y1="12" x2="19" y2="12" />
//                 <polyline points="12 5 19 12 12 19" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default LatestCollection;


import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const CARD_ACCENTS = [
  "#6366f1","#8b5cf6","#6366f1","#a78bfa",
  "#818cf8","#7c3aed","#6366f1","#8b5cf6",
];

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const updateProductCount = () => {
    setLatestProducts(
      window.innerWidth < 640 ? products.slice(0, 6) : products.slice(0, 8)
    );
  };

  useEffect(() => {
    updateProductCount();
    window.addEventListener("resize", updateProductCount);
    return () => window.removeEventListener("resize", updateProductCount);
  }, [products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .lc-serif { font-family: 'Cormorant Garamond', serif; }
        .lc-sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lc-reveal {
          opacity: 0;
          animation: cardReveal 0.5s ease forwards;
        }

        /* ── Card wrapper — NO background override, NO color override ── */
        .lc-wrap {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(99,102,241,0.15);
          border-left: 3px solid #6366f1;
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          position: relative;
        }
        .lc-wrap:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.25);
          border-color: rgba(99,102,241,0.4);
        }

        /* CTA fill wipe */
        .lc-cta {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.25s;
        }
        .lc-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #6366f1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1);
        }
        .lc-cta:hover::before { transform: scaleX(1); }
        .lc-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.35);
        }
        .lc-cta > * { position: relative; z-index: 1; }
      `}</style>

      <section
        ref={sectionRef}
        className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0b0b0f 0%, #0e0e14 100%)" }}
      >
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Heading ── */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="lc-sans uppercase tracking-[0.22em] text-indigo-400 mb-3"
              style={{ fontSize: '10px', fontWeight: 600 }}>
              New Arrivals
            </p>

            <h2 className="lc-serif text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 300 }}>
              Latest{" "}
              <em className="text-indigo-400" style={{ fontStyle: "italic", fontWeight: 300 }}>
                Collections
              </em>
            </h2>

            <div className="w-12 h-px mx-auto my-4"
              style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />

            <p className="lc-sans text-white/35 max-w-md mx-auto leading-relaxed tracking-wide"
              style={{ fontSize: "13px" }}>
              Crafted with precision, styled for those who demand the extraordinary.
            </p>

            <div className="flex justify-center mt-5">
              <span className="lc-sans inline-flex items-center gap-2 text-white/25
                border border-white/[0.07] px-4 py-1.5 rounded-full"
                style={{ fontSize: "10px", letterSpacing: "2px" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                {latestProducts.length} top picks
              </span>
            </div>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {latestProducts.map((item, index) => (
              <div
                key={item._id}
                className="lc-reveal"
                style={
                  visible
                    ? { animationDelay: `${index * 0.07}s` }
                    : { animation: "none", opacity: 0 }
                }
              >
                {/* Wrapper — only controls border/shadow/shape, nothing else */}
                <div
                  className="lc-wrap"
                  style={{ borderLeftColor: CARD_ACCENTS[index % CARD_ACCENTS.length] }}
                >
                  {/* Item number overlay */}
                  <span
                    className="lc-sans select-none pointer-events-none"
                    style={{
                      position: 'absolute', top: 10, left: 12, zIndex: 10,
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: '9px', fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.25)',
                      background: 'transparent',
                      lineHeight: 1,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* NEW badge — only first 3 */}
                  {index < 3 && (
                    <span
                      className="lc-sans pointer-events-none"
                      style={{
                        position: 'absolute', top: 38, right: 10, zIndex: 10,
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: '8px', fontWeight: 700,
                        letterSpacing: '0.12em',
                        background: '#6366f1',
                        color: '#fff',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        boxShadow: '0 2px 8px rgba(99,102,241,0.5)',
                      }}
                    >
                      NEW
                    </span>
                  )}

                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    discountPrice={item.discountPrice}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="flex items-center justify-center mt-14 sm:mt-16">
            <Link
              to="/collection"
              className="lc-cta lc-sans inline-flex items-center gap-3 no-underline
                text-white border rounded-sm px-9 py-3.5"
              style={{
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "2.5px", textTransform: "uppercase",
                borderColor: "rgba(99,102,241,0.5)",
              }}
            >
              <span>Explore Full Collection</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default LatestCollection;