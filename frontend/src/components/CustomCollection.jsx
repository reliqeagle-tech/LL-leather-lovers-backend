// import React from "react";
// import Title from "./Title";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const CustomCollection = () => {
//   return (
//     <div className="w-full px-4 sm:px-8 md:px-12 py-10 bg-transparent">

//       {/* Section Title */}
//       <div className="text-center mb-8">
//         <Title text1={"OUR"} text2={"COLLECTION"} />
//       </div>

//       {/* FLEX WRAPPER */}
//       <div className="flex flex-col md:flex-row gap-6 md:gap-8">

//         {/* LEFT LARGE IMAGE */}
//         <Link
//           to={"/collection?category=Women"}
//           className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-[500px] group overflow-hidden rounded-lg shadow-lg"
//         >
//           <div className="flex items-center justify-center shadow">
//             <img
//             className="w-[60%] h-full flex justify-center items-center transition-all duration-300 group-hover:scale-105"
//             src={assets.women}
//             alt=""
//           />
//           </div>
//           <h1 className="absolute inset-0 flex items-center justify-center
//             text-white text-3xl sm:text-4xl font-semibold drop-shadow-lg
//              transition">
//             Women
//           </h1>
//         </Link>

//         {/* RIGHT COLUMN */}
//         <div className="flex flex-col w-full md:w-1/2 gap-6">

//           {/* MEN IMAGE */}
//           <Link
//             to={"/collection?category=Men"}
//             className="relative w-full h-52 sm:h-64 md:h-[240px] group overflow-hidden rounded-lg shadow-lg"
//           >
//             {/* <img
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               src={assets.James}
//               alt=""
//             /> */}
//             <div className="flex items-center justify-center ">
//             <img
//             className="w-[60%] h-full flex justify-center items-center transition-all duration-300 group-hover:scale-105"
//             src={assets.men}
//             alt=""
//           />
//           </div>
//             <h1 className="absolute inset-0 flex items-center justify-center
//               text-white text-2xl sm:text-3xl font-semibold drop-shadow-lg
//               transition">
//               Men
//             </h1>
//           </Link>

//           {/* ACCESSORIES IMAGE */}
//           <Link
//             to={"/collection?category=Accessories"}
//             className="relative w-full h-52 sm:h-64 md:h-[240px] group overflow-hidden rounded-lg shadow-lg"
//           >
//             <div className="flex items-center justify-center ">
//             <img
//             className="w-[60%] h-full flex justify-center items-center transition-all duration-300 group-hover:scale-105"
//             src={assets.pillow}
//             alt=""
//           />
//           </div>
//             <h1 className="absolute inset-0 flex items-center justify-center
//               text-white text-2xl sm:text-3xl font-semibold drop-shadow-lg
//               transition">
//               Others
//             </h1>
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomCollection;





// import React, { useRef, useState, useEffect } from "react";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const CustomCollection = () => {
//   const [visible, setVisible] = useState(false);
//   const sectionRef = useRef(null);

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

//   const categories = [
//     {
//       to: "/collection?category=Women",
//       label: "Women",
//       sub: "Jackets & Skirts",
//       image: assets.women,
//       accent: "#818cf8",
//       span: "large", // takes left half full height
//     },
//     {
//       to: "/collection?category=Men",
//       label: "Men",
//       sub: "Jackets & Coats",
//       image: assets.men,
//       accent: "#6366f1",
//       span: "small",
//     },
//     {
//       to: "/collection?category=Others",
//       label: "Others",
//       sub: "Pillows, Aprons & More",
//       image: assets.pillow,
//       accent: "#a5b4fc",
//       span: "small",
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,500&family=Montserrat:wght@300;400;500;600&display=swap');
//         .cc-serif { font-family: 'Cormorant Garamond', serif; }
//         .cc-sans  { font-family: 'Montserrat', sans-serif; }

//         @keyframes ccReveal {
//           from { opacity:0; transform:translateY(24px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .cc-reveal { opacity:0; animation: ccReveal 0.6s ease forwards; }

//         /* card base */
//         .cc-card {
//           position: relative;
//           overflow: hidden;
//           border-radius: 12px;
//           display: block;
//           text-decoration: none;
//           background: #0d0d14;
//         }

//         /* image */
//         .cc-card img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center top;
//           display: block;
//           transition: transform 0.8s cubic-bezier(.22,1,.36,1),
//                       filter 0.5s ease;
//           filter: brightness(0.75);
//         }
//         .cc-card:hover img {
//           transform: scale(1.07);
//           filter: brightness(0.55);
//         }

//         /* dark gradient overlay — always */
//         .cc-card::before {
//           content: '';
//           position: absolute; inset: 0; z-index: 1;
//           background: linear-gradient(
//             to top,
//             rgba(0,0,0,0.85) 0%,
//             rgba(0,0,0,0.3) 45%,
//             transparent 70%
//           );
//           transition: opacity 0.4s;
//         }

//         /* extra overlay on hover */
//         .cc-card::after {
//           content: '';
//           position: absolute; inset: 0; z-index: 1;
//           background: rgba(0,0,0,0.25);
//           opacity: 0;
//           transition: opacity 0.4s;
//         }
//         .cc-card:hover::after { opacity: 1; }

//         /* text content */
//         .cc-content {
//           position: absolute;
//           bottom: 0; left: 0; right: 0;
//           z-index: 2;
//           padding: 24px 24px 28px;
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//         }

//         /* label */
//         .cc-label {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(28px, 3.5vw, 44px);
//           font-weight: 300;
//           color: #ffffff;
//           line-height: 1;
//           letter-spacing: -0.01em;
//           transition: color 0.3s;
//         }
//         .cc-card:hover .cc-label {
//           color: #ffffff;
//         }

//         /* sub label */
//         .cc-sub {
//           font-family: 'Montserrat', sans-serif;
//           font-size: 10px;
//           letter-spacing: 2.5px;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.45);
//           font-weight: 500;
//           transition: color 0.3s;
//         }
//         .cc-card:hover .cc-sub { color: rgba(255,255,255,0.7); }

//         /* arrow pill — slides in on hover */
//         .cc-arrow {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-family: 'Montserrat', sans-serif;
//           font-size: 10px;
//           font-weight: 600;
//           letter-spacing: 2px;
//           text-transform: uppercase;
//           color: #fff;
//           background: var(--accent);
//           padding: 7px 16px;
//           border-radius: 2px;
//           margin-top: 10px;
//           width: fit-content;
//           opacity: 0;
//           transform: translateY(8px);
//           transition: opacity 0.3s, transform 0.3s;
//         }
//         .cc-card:hover .cc-arrow {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         /* accent top-right corner line */
//         .cc-corner {
//           position: absolute;
//           top: 14px; right: 14px;
//           z-index: 2;
//           width: 28px; height: 28px;
//           pointer-events: none;
//         }
//         .cc-corner::before {
//           content: '';
//           position: absolute;
//           top: 0; right: 0;
//           width: 100%; height: 1.5px;
//           background: var(--accent);
//           opacity: 0.7;
//         }
//         .cc-corner::after {
//           content: '';
//           position: absolute;
//           top: 0; right: 0;
//           width: 1.5px; height: 100%;
//           background: var(--accent);
//           opacity: 0.7;
//         }
//       `}</style>

//       <section
//         ref={sectionRef}
//         className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
//         style={{
//           background: "linear-gradient(180deg, #111018 0%, #0c0c12 100%)",
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
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(ellipse at center, rgba(99,102,241,0.05) 0%, transparent 70%)",
//           }}
//         />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           {/* ── HEADING ── */}
//           <div
//             className={`mb-10 sm:mb-14 cc-reveal`}
//             style={
//               visible
//                 ? { animationDelay: "0s" }
//                 : { animation: "none", opacity: 0 }
//             }
//           >
//             <div className="flex items-end justify-between flex-wrap gap-4">
//               <div>
//                 <p
//                   className="cc-sans text-indigo-400 font-semibold mb-2"
//                   style={{
//                     fontSize: "10px",
//                     letterSpacing: "4px",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Browse By Category
//                 </p>
//                 <h2
//                   className="cc-serif text-white leading-tight tracking-tight"
//                   style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: 300 }}
//                 >
//                   Our{" "}
//                   <em
//                     className="text-indigo-400"
//                     style={{ fontStyle: "italic", fontWeight: 300 }}
//                   >
//                     Collection
//                   </em>
//                 </h2>
//               </div>
//               <Link
//                 to="/collection"
//                 className="cc-sans text-white/35 hover:text-white/80 transition-colors no-underline
//                   inline-flex items-center gap-2 pb-1 border-b border-white/10 hover:border-white/30"
//                 style={{
//                   fontSize: "11px",
//                   letterSpacing: "2px",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 View All
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <line x1="5" y1="12" x2="19" y2="12" />
//                   <polyline points="12 5 19 12 12 19" />
//                 </svg>
//               </Link>
//             </div>

//             {/* divider */}
//             <div
//               className="w-16 h-px mt-5"
//               style={{
//                 background: "linear-gradient(90deg, #6366f1, transparent)",
//               }}
//             />
//           </div>

//           {/* ── GRID ── */}
//           {/*
//             Desktop layout:
//             ┌─────────────┬─────────────┐
//             │             │    Men      │ 260px
//             │   Women     ├─────────────┤
//             │             │   Others    │ 260px
//             └─────────────┴─────────────┘
//             Total right = 260 + 260 + gap(20) = 540px
//             Women = 540px to match exactly
//           */}
//           <div
//             className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
//             style={{ gridTemplateRows: "260px 260px" }}
//           >
//             {/* WOMEN — spans both rows on desktop */}
//             <div
//               className="cc-reveal md:row-span-2"
//               style={
//                 visible
//                   ? { animationDelay: "0.1s" }
//                   : { animation: "none", opacity: 0 }
//               }
//             >
//               <Link
//                 to="/collection?category=Women"
//                 className="cc-card"
//                 style={{
//                   "--accent": "#818cf8",
//                   height: "100%",
//                   display: "block",
//                   minHeight: "300px",
//                 }}
//               >
//                 <img
//                   src={assets.women}
//                   alt="Women Collection"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     objectPosition: "center top",
//                     display: "block",
//                   }}
//                 />
//                 <div className="cc-corner" style={{ "--accent": "#818cf8" }} />
//                 <div className="cc-content">
//                   <span className="cc-sub">Women's Edit</span>
//                   <span className="cc-label">Women</span>
//                   <span className="cc-arrow" style={{ "--accent": "#6366f1" }}>
//                     Shop Now
//                     <svg
//                       width="12"
//                       height="12"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="5" y1="12" x2="19" y2="12" />
//                       <polyline points="12 5 19 12 12 19" />
//                     </svg>
//                   </span>
//                 </div>
//               </Link>
//             </div>

//             {/* MEN */}
//             <div
//               className="cc-reveal"
//               style={
//                 visible
//                   ? { animationDelay: "0.2s" }
//                   : { animation: "none", opacity: 0 }
//               }
//             >
//               <Link
//                 to="/collection?category=Men"
//                 className="cc-card"
//                 style={{
//                   "--accent": "#6366f1",
//                   height: "100%",
//                   minHeight: "260px",
//                   display: "block",
//                 }}
//               >
//                 <img
//                   src={assets.men}
//                   alt="Men Collection"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     objectPosition: "center top",
//                     display: "block",
//                   }}
//                 />
//                 <div className="cc-corner" style={{ "--accent": "#6366f1" }} />
//                 <div className="cc-content">
//                   <span className="cc-sub">Men's Edit</span>
//                   <span className="cc-label">Men</span>
//                   <span className="cc-arrow" style={{ "--accent": "#4f46e5" }}>
//                     Shop Now
//                     <svg
//                       width="12"
//                       height="12"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="5" y1="12" x2="19" y2="12" />
//                       <polyline points="12 5 19 12 12 19" />
//                     </svg>
//                   </span>
//                 </div>
//               </Link>
//             </div>

//             {/* OTHERS */}
//             <div
//               className="cc-reveal"
//               style={
//                 visible
//                   ? { animationDelay: "0.3s" }
//                   : { animation: "none", opacity: 0 }
//               }
//             >
//               <Link
//                 to="/collection?category=Others"
//                 className="cc-card"
//                 style={{
//                   "--accent": "#a5b4fc",
//                   height: "100%",
//                   minHeight: "260px",
//                   display: "block",
//                 }}
//               >
//                 <img
//                   src={assets.pillow}
//                   alt="Others Collection"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     objectPosition: "center",
//                     display: "block",
//                   }}
//                 />
//                 <div className="cc-corner" style={{ "--accent": "#a5b4fc" }} />
//                 <div className="cc-content">
//                   <span className="cc-sub">Pillows, Aprons & More</span>
//                   <span className="cc-label">Others</span>
//                   <span className="cc-arrow" style={{ "--accent": "#6366f1" }}>
//                     Shop Now
//                     <svg
//                       width="12"
//                       height="12"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <line x1="5" y1="12" x2="19" y2="12" />
//                       <polyline points="12 5 19 12 12 19" />
//                     </svg>
//                   </span>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CustomCollection;
