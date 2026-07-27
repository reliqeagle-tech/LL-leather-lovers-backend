// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// const PageNotFound = () => {
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         const t = setTimeout(() => setMounted(true), 60);
//         return () => clearTimeout(t);
//     }, []);

//     return (
//         <>
//             <Helmet>
//                 <title>Page Not Found | LL Leather Lovers</title>
//                 <meta name="robots" content="noindex, follow" />
//             </Helmet>

//             <style>{`
//         .nf-serif { font-family: 'Cormorant Garamond', serif; }
//         .nf-sans  { font-family: 'Montserrat', sans-serif; }

//         .nf-reveal {
//           opacity: 0;
//           transform: translateY(18px) scale(0.985);
//           transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1);
//         }
//         .nf-reveal.nf-in { opacity: 1; transform: translateY(0) scale(1); }

//         @keyframes nfSwing {
//           0%, 100% { transform: rotate(-3deg); }
//           50%      { transform: rotate(3deg); }
//         }
//         @keyframes nfThread {
//           0%, 100% { transform: rotate(-7deg); }
//           50%      { transform: rotate(5deg); }
//         }
//         .nf-tag-swing   { transform-origin: 160px 18px; animation: nfSwing 4.6s ease-in-out infinite; }
//         .nf-thread-sway { transform-origin: 262px 322px; animation: nfThread 3.1s ease-in-out infinite; animation-delay: 0.3s; }

//         .nf-btn-primary { transition: box-shadow 0.25s, transform 0.2s, background 0.25s; }
//         .nf-btn-primary:hover { background: #4f46e5; box-shadow: 0 8px 28px rgba(99,102,241,0.4); transform: translateY(-1px); }

//         .nf-btn-ghost { transition: border-color 0.25s, background 0.25s, transform 0.2s; }
//         .nf-btn-ghost:hover { border-color: rgba(201,124,58,0.5); background: rgba(255,255,255,0.03); transform: translateY(-1px); }

//         @media (prefers-reduced-motion: reduce) {
//           .nf-tag-swing, .nf-thread-sway { animation: none; }
//           .nf-reveal { transition: none; }
//         }
//       `}</style>

//             <section
//                 className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6 py-20"
//                 style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 55%, #0d0b18 100%)" }}
//             >
//                 {/* Top separator, matches site convention */}
//                 <div
//                     className="absolute top-0 left-0 right-0 h-px"
//                     style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
//                 />

//                 {/* Ambient glow */}
//                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
//                     <div
//                         style={{
//                             width: "620px",
//                             height: "620px",
//                             background: "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 65%)",
//                         }}
//                     />
//                 </div>

//                 {/* Giant faint watermark numerals, echoes the newsletter's brand watermark */}
//                 <p
//                     className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 nf-serif text-white
//             pointer-events-none select-none hidden sm:block"
//                     style={{ fontSize: "clamp(160px,28vw,420px)", fontWeight: 300, opacity: 0.035, letterSpacing: "0.02em" }}
//                 >
//                     404
//                 </p>

//                 <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
//                     {/* Eyebrow */}
//                     <div className={`nf-reveal ${mounted ? "nf-in" : ""}`}>
//                         <p
//                             className="nf-sans text-indigo-400 font-semibold mb-2 uppercase"
//                             style={{ fontSize: "10px", letterSpacing: "4px" }}
//                         >
//                             Lost In The Workshop
//                         </p>
//                     </div>

//                     {/* Signature: hanging, unstitching leather tag */}
//                     <div
//                         className={`nf-reveal ${mounted ? "nf-in" : ""} my-6`}
//                         style={{ transitionDelay: "0.1s" }}
//                     >
//                         <svg
//                             width="220"
//                             height="300"
//                             viewBox="0 0 320 420"
//                             xmlns="http://www.w3.org/2000/svg"
//                             role="img"
//                             aria-label="A leather tag stamped 404, hanging from a stitched cord that has come loose"
//                         >
//                             <defs>
//                                 <linearGradient id="nfLeather" x1="0%" y1="0%" x2="100%" y2="100%">
//                                     <stop offset="0%" stopColor="#a85a2e" />
//                                     <stop offset="55%" stopColor="#8b431f" />
//                                     <stop offset="100%" stopColor="#5c2c13" />
//                                 </linearGradient>
//                                 <linearGradient id="nfCord" x1="0%" y1="0%" x2="0%" y2="100%">
//                                     <stop offset="0%" stopColor="#d8b98a" />
//                                     <stop offset="100%" stopColor="#b08a56" />
//                                 </linearGradient>
//                             </defs>

//                             <g className="nf-tag-swing">
//                                 {/* cord */}
//                                 <path
//                                     d="M160 8 C 130 40, 130 70, 160 92 C 190 70, 190 40, 160 8 Z"
//                                     fill="none"
//                                     stroke="url(#nfCord)"
//                                     strokeWidth="5"
//                                     strokeLinecap="round"
//                                 />

//                                 {/* tag body */}
//                                 <rect x="40" y="86" width="240" height="290" rx="20" fill="url(#nfLeather)" />
//                                 {/* hand-stitched inset border */}
//                                 <rect
//                                     x="56"
//                                     y="102"
//                                     width="208"
//                                     height="258"
//                                     rx="12"
//                                     fill="none"
//                                     stroke="rgba(244,234,217,0.45)"
//                                     strokeWidth="1.5"
//                                     strokeDasharray="5 6"
//                                 />

//                                 {/* punch hole */}
//                                 <circle cx="160" cy="120" r="10" fill="#0d0b18" />
//                                 <circle
//                                     cx="160"
//                                     cy="120"
//                                     r="10"
//                                     fill="none"
//                                     stroke="rgba(244,234,217,0.5)"
//                                     strokeWidth="1.2"
//                                     strokeDasharray="2 3"
//                                 />

//                                 {/* rivets */}
//                                 <circle cx="76" cy="112" r="4.5" fill="#3d1f0f" />
//                                 <circle cx="75" cy="111" r="1.6" fill="#e0a868" opacity="0.7" />
//                                 <circle cx="244" cy="112" r="4.5" fill="#3d1f0f" />
//                                 <circle cx="243" cy="111" r="1.6" fill="#e0a868" opacity="0.7" />

//                                 {/* embossed 404 */}
//                                 <text
//                                     x="160"
//                                     y="252"
//                                     textAnchor="middle"
//                                     className="nf-serif"
//                                     style={{ fontSize: "76px", fontWeight: 400, fill: "#3d1f0f", opacity: 0.55 }}
//                                     dx="2"
//                                     dy="2"
//                                 >
//                                     404
//                                 </text>
//                                 <text
//                                     x="160"
//                                     y="252"
//                                     textAnchor="middle"
//                                     className="nf-serif"
//                                     style={{ fontSize: "76px", fontWeight: 400, fill: "#f4ead9" }}
//                                 >
//                                     404
//                                 </text>

//                                 {/* stamp label */}
//                                 <text
//                                     x="160"
//                                     y="300"
//                                     textAnchor="middle"
//                                     className="nf-sans"
//                                     style={{ fontSize: "11px", fill: "rgba(244,234,217,0.75)", letterSpacing: "3px" }}
//                                 >
//                                     NOT FOUND
//                                 </text>
//                                 <line x1="110" y1="316" x2="210" y2="316" stroke="rgba(244,234,217,0.25)" strokeWidth="1" />
//                             </g>

//                             {/* loose thread coming undone from the bottom-right seam */}
//                             <g className="nf-thread-sway">
//                                 <path
//                                     d="M262 322 C 280 336, 268 356, 286 368 C 296 375, 292 388, 302 396"
//                                     fill="none"
//                                     stroke="rgba(244,234,217,0.55)"
//                                     strokeWidth="1.4"
//                                     strokeDasharray="1.5 3.5"
//                                     strokeLinecap="round"
//                                 />
//                                 <circle cx="302" cy="396" r="2.2" fill="rgba(244,234,217,0.6)" />
//                             </g>
//                         </svg>
//                     </div>

//                     {/* Headline */}
//                     <div className={`nf-reveal ${mounted ? "nf-in" : ""}`} style={{ transitionDelay: "0.18s" }}>
//                         <h1
//                             className="nf-serif text-white leading-tight tracking-tight font-light mb-4"
//                             style={{ fontSize: "clamp(26px,4.2vw,42px)" }}
//                         >
//                             This Page Came Apart{" "}
//                             <em style={{ fontStyle: "italic", color: "#c97c3a" }}>at the Seams</em>
//                         </h1>
//                     </div>

//                     {/* Subtext */}
//                     <div className={`nf-reveal ${mounted ? "nf-in" : ""}`} style={{ transitionDelay: "0.24s" }}>
//                         <p
//                             className="nf-sans text-white/60 max-w-md mx-auto mb-9"
//                             style={{ fontSize: "13.5px", lineHeight: "1.85" }}
//                         >
//                             The piece you're after isn't on the workbench. It may have moved, been retired
//                             from the collection, or never cut from the hide at all.
//                         </p>
//                     </div>

//                     {/* Actions */}
//                     <div
//                         className={`nf-reveal ${mounted ? "nf-in" : ""} flex flex-col sm:flex-row items-center gap-3 mb-10`}
//                         style={{ transitionDelay: "0.3s" }}
//                     >
//                         <Link
//                             to="/"
//                             className="nf-btn-primary nf-sans text-white rounded-full px-8 py-3.5
//                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
//                             style={{
//                                 fontSize: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "2.5px",
//                                 textTransform: "uppercase",
//                                 background: "#6366f1",
//                             }}
//                         >
//                             Return Home
//                         </Link>
//                         <button
//                             type="button"
//                             onClick={() => window.history.back()}
//                             className="nf-btn-ghost nf-sans text-white/70 rounded-full px-8 py-3.5 border border-white/15
//                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
//                             style={{
//                                 fontSize: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "2.5px",
//                                 textTransform: "uppercase",
//                             }}
//                         >
//                             Go Back
//                         </button>
//                     </div>

//                     {/* Brand line */}
//                     <div
//                         className={`nf-reveal ${mounted ? "nf-in" : ""} flex items-center justify-center gap-3`}
//                         style={{ transitionDelay: "0.36s" }}
//                     >
//                         <span className="w-8 h-px bg-white/20 inline-block" />
//                         <p className="nf-sans text-white/40 uppercase" style={{ fontSize: "9px", letterSpacing: "3px" }}>
//                             LL Leather Lovers · Est. 2020
//                         </p>
//                         <span className="w-8 h-px bg-white/20 inline-block" />
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default PageNotFound;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// const PageNotFound = () => {
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         const t = setTimeout(() => setMounted(true), 60);
//         return () => clearTimeout(t);
//     }, []);

//     return (
//         <>
//             <Helmet>
//                 <title>Page Not Found | LL Leather Lovers</title>
//                 <meta name="robots" content="noindex, follow" />
//             </Helmet>

//             <style>{`
//         .nf-sans  { font-family: 'Montserrat', sans-serif; }

//         .nf-reveal {
//           opacity: 0;
//           transform: translateY(18px) scale(0.985);
//           transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1);
//         }
//         .nf-reveal.nf-in { opacity: 1; transform: translateY(0) scale(1); }

//         @keyframes nfSwing {
//           0%, 100% { transform: rotate(-3deg); }
//           50%      { transform: rotate(3deg); }
//         }
//         .nf-tag-swing   { transform-origin: 160px 18px; animation: nfSwing 4.6s ease-in-out infinite; }

//         .nf-btn-primary { transition: box-shadow 0.25s, transform 0.2s, background 0.25s; }
//         .nf-btn-primary:hover { background: #4f46e5; box-shadow: 0 8px 28px rgba(99,102,241,0.4); transform: translateY(-1px); }

//         .nf-btn-ghost { transition: border-color 0.25s, background 0.25s, transform 0.2s; }
//         .nf-btn-ghost:hover { border-color: rgba(201,124,58,0.5); background: rgba(255,255,255,0.03); transform: translateY(-1px); }

//         @media (prefers-reduced-motion: reduce) {
//           .nf-tag-swing { animation: none; }
//           .nf-reveal { transition: none; }
//         }
//       `}</style>

//             <section
//                 className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6 py-20"
//                 style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 55%, #0d0b18 100%)" }}
//             >
//                 {/* Top separator, matches site convention */}
//                 <div
//                     className="absolute top-0 left-0 right-0 h-px"
//                     style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
//                 />

//                 {/* Ambient glow */}
//                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
//                     <div
//                         style={{
//                             width: "620px",
//                             height: "620px",
//                             background: "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 65%)",
//                         }}
//                     />
//                 </div>

//                 {/* Giant faint watermark numerals, echoes the newsletter's brand watermark */}
//                 <p
//                     className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 nf-sans text-white
//             pointer-events-none select-none hidden sm:block"
//                     style={{ fontSize: "clamp(160px,28vw,420px)", fontWeight: 800, opacity: 0.09, letterSpacing: "0.02em" }}
//                 >
//                     404
//                 </p>

//                 <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
//                     {/* Eyebrow */}
//                     <div className={`nf-reveal ${mounted ? "nf-in" : ""}`}>
//                         <p
//                             className="nf-sans text-indigo-400 font-semibold mb-2 uppercase"
//                             style={{ fontSize: "10px", letterSpacing: "4px" }}
//                         >
//                             Lost In The Workshop
//                         </p>
//                     </div>

//                     {/* Signature: hanging leather tag */}
//                     <div
//                         className={`nf-reveal ${mounted ? "nf-in" : ""} my-6`}
//                         style={{ transitionDelay: "0.1s" }}
//                     >
//                         <svg
//                             width="220"
//                             height="300"
//                             viewBox="0 0 320 420"
//                             xmlns="http://www.w3.org/2000/svg"
//                             role="img"
//                             aria-label="A leather tag stamped 404, hanging from a stitched cord"
//                         >
//                             <defs>
//                                 <linearGradient id="nfLeather" x1="0%" y1="0%" x2="100%" y2="100%">
//                                     <stop offset="0%" stopColor="#a85a2e" />
//                                     <stop offset="55%" stopColor="#8b431f" />
//                                     <stop offset="100%" stopColor="#5c2c13" />
//                                 </linearGradient>
//                                 <linearGradient id="nfCord" x1="0%" y1="0%" x2="0%" y2="100%">
//                                     <stop offset="0%" stopColor="#d8b98a" />
//                                     <stop offset="100%" stopColor="#b08a56" />
//                                 </linearGradient>
//                             </defs>

//                             <g className="nf-tag-swing">
//                                 {/* cord */}
//                                 <path
//                                     d="M160 8 C 130 40, 130 70, 160 92 C 190 70, 190 40, 160 8 Z"
//                                     fill="none"
//                                     stroke="url(#nfCord)"
//                                     strokeWidth="5"
//                                     strokeLinecap="round"
//                                 />

//                                 {/* tag body */}
//                                 <rect x="40" y="86" width="240" height="290" rx="20" fill="url(#nfLeather)" />
//                                 {/* hand-stitched inset border */}
//                                 <rect
//                                     x="56"
//                                     y="102"
//                                     width="208"
//                                     height="258"
//                                     rx="12"
//                                     fill="none"
//                                     stroke="rgba(244,234,217,0.45)"
//                                     strokeWidth="1.5"
//                                     strokeDasharray="5 6"
//                                 />

//                                 {/* punch hole */}
//                                 <circle cx="160" cy="120" r="10" fill="#0d0b18" />
//                                 <circle
//                                     cx="160"
//                                     cy="120"
//                                     r="10"
//                                     fill="none"
//                                     stroke="rgba(244,234,217,0.5)"
//                                     strokeWidth="1.2"
//                                     strokeDasharray="2 3"
//                                 />

//                                 {/* rivets */}
//                                 <circle cx="76" cy="112" r="4.5" fill="#3d1f0f" />
//                                 <circle cx="75" cy="111" r="1.6" fill="#e0a868" opacity="0.7" />
//                                 <circle cx="244" cy="112" r="4.5" fill="#3d1f0f" />
//                                 <circle cx="243" cy="111" r="1.6" fill="#e0a868" opacity="0.7" />

//                                 {/* embossed 404 */}
//                                 <text
//                                     x="160"
//                                     y="250"
//                                     textAnchor="middle"
//                                     className="nf-sans"
//                                     style={{ fontSize: "68px", fontWeight: 800, fill: "#3d1f0f", opacity: 0.55 }}
//                                     dx="2"
//                                     dy="2"
//                                 >
//                                     404
//                                 </text>
//                                 <text
//                                     x="160"
//                                     y="250"
//                                     textAnchor="middle"
//                                     className="nf-sans"
//                                     style={{ fontSize: "68px", fontWeight: 800, fill: "#f4ead9" }}
//                                 >
//                                     404
//                                 </text>

//                                 {/* stamp label */}
//                                 <text
//                                     x="160"
//                                     y="300"
//                                     textAnchor="middle"
//                                     className="nf-sans"
//                                     style={{ fontSize: "11px", fill: "rgba(244,234,217,0.75)", letterSpacing: "3px" }}
//                                 >
//                                     NOT FOUND
//                                 </text>
//                                 <line x1="110" y1="316" x2="210" y2="316" stroke="rgba(244,234,217,0.25)" strokeWidth="1" />
//                             </g>
//                         </svg>
//                     </div>

//                     {/* Headline */}
//                     <div className={`nf-reveal ${mounted ? "nf-in" : ""}`} style={{ transitionDelay: "0.18s" }}>
//                         <h1
//                             className="nf-sans text-white leading-tight tracking-tight mb-4"
//                             style={{ fontSize: "clamp(24px,3.8vw,38px)", fontWeight: 700 }}
//                         >
//                             This Page Came Apart{" "}
//                             <span style={{ color: "#c97c3a" }}>at the Seams</span>
//                         </h1>
//                     </div>

//                     {/* Subtext */}
//                     <div className={`nf-reveal ${mounted ? "nf-in" : ""}`} style={{ transitionDelay: "0.24s" }}>
//                         <p
//                             className="nf-sans text-white/60 max-w-md mx-auto mb-9"
//                             style={{ fontSize: "13.5px", lineHeight: "1.85" }}
//                         >
//                             The piece you're after isn't on the workbench. It may have moved, been retired
//                             from the collection, or never cut from the hide at all.
//                         </p>
//                     </div>

//                     {/* Actions */}
//                     <div
//                         className={`nf-reveal ${mounted ? "nf-in" : ""} flex flex-col sm:flex-row items-center gap-3 mb-10`}
//                         style={{ transitionDelay: "0.3s" }}
//                     >
//                         <Link
//                             to="/"
//                             className="nf-btn-primary nf-sans text-white rounded-full px-8 py-3.5
//                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
//                             style={{
//                                 fontSize: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "2.5px",
//                                 textTransform: "uppercase",
//                                 background: "#6366f1",
//                             }}
//                         >
//                             Return Home
//                         </Link>
//                         <button
//                             type="button"
//                             onClick={() => window.history.back()}
//                             className="nf-btn-ghost nf-sans text-white/70 rounded-full px-8 py-3.5 border border-white/15
//                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
//                             style={{
//                                 fontSize: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "2.5px",
//                                 textTransform: "uppercase",
//                             }}
//                         >
//                             Go Back
//                         </button>
//                     </div>

//                     {/* Brand line */}
//                     <div
//                         className={`nf-reveal ${mounted ? "nf-in" : ""} flex items-center justify-center gap-3`}
//                         style={{ transitionDelay: "0.36s" }}
//                     >
//                         <span className="w-8 h-px bg-white/20 inline-block" />
//                         <p className="nf-sans text-white/40 uppercase" style={{ fontSize: "9px", letterSpacing: "3px" }}>
//                             LL Leather Lovers · Est. 2020
//                         </p>
//                         <span className="w-8 h-px bg-white/20 inline-block" />
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default PageNotFound;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <Helmet>
                <title>Page Not Found | LL Leather Lovers</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <style>{`
            .nf-sans  { font-family: 'Montserrat', sans-serif; }

        .nf-reveal {
          opacity: 0;
          transform: translateY(18px) scale(0.985);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .nf-reveal.nf-in { opacity: 1; transform: translateY(0) scale(1); }

        @keyframes nfSwing {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
        .nf-tag-swing   { transform-origin: 160px 18px; animation: nfSwing 4.6s ease-in-out infinite; }

        .nf-btn-primary { transition: box-shadow 0.25s, transform 0.2s, background 0.25s; }
        .nf-btn-primary:hover { background: #4f46e5; box-shadow: 0 8px 28px rgba(99,102,241,0.4); transform: translateY(-1px); }

        .nf-btn-ghost { transition: border-color 0.25s, background 0.25s, transform 0.2s; }
        .nf-btn-ghost:hover { border-color: rgba(201,124,58,0.5); background: rgba(255,255,255,0.03); transform: translateY(-1px); }

        @media (prefers-reduced-motion: reduce) {
          .nf-tag-swing { animation: none; }
          .nf-reveal { transition: none; }
        }
      `}</style>

            <section
                className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6 py-8"
                style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 55%, #0d0b18 100%)" }}
            >
                {/* Top separator, matches site convention */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
                />

                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div
                        style={{
                            width: "620px",
                            height: "620px",
                            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 65%)",
                        }}
                    />
                </div>

                {/* Giant faint watermark numerals, echoes the newsletter's brand watermark */}
                <p
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 nf-sans text-white
            pointer-events-none select-none hidden sm:block"
                    style={{ fontSize: "clamp(90px,14vw,220px)", fontWeight: 800, opacity: 0.06, letterSpacing: "0.02em" }}
                >
                    404
                </p>

                <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
                    {/* Eyebrow */}
                    <div className={`nf-reveal ${mounted ? "nf-in" : ""}`}>
                        <p
                            className="nf-sans text-indigo-400 font-semibold mb-2 uppercase"
                            style={{ fontSize: "10px", letterSpacing: "4px" }}
                        >
                            Lost In The Workshop
                        </p>
                    </div>

                    {/* Signature: hanging leather tag */}
                    <div
                        className={`nf-reveal ${mounted ? "nf-in" : ""} my-3`}
                        style={{ transitionDelay: "0.1s" }}
                    >
                        <svg
                            width="150"
                            height="205"
                            viewBox="0 0 320 420"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="A leather tag stamped 404, hanging from a stitched cord"
                        >
                            <defs>
                                <linearGradient id="nfLeather" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#a85a2e" />
                                    <stop offset="55%" stopColor="#8b431f" />
                                    <stop offset="100%" stopColor="#5c2c13" />
                                </linearGradient>
                                <linearGradient id="nfCord" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#d8b98a" />
                                    <stop offset="100%" stopColor="#b08a56" />
                                </linearGradient>
                            </defs>

                            <g className="nf-tag-swing">
                                {/* cord */}
                                <path
                                    d="M160 8 C 130 40, 130 70, 160 92 C 190 70, 190 40, 160 8 Z"
                                    fill="none"
                                    stroke="url(#nfCord)"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />

                                {/* tag body */}
                                <rect x="40" y="86" width="240" height="290" rx="20" fill="url(#nfLeather)" />
                                {/* hand-stitched inset border */}
                                <rect
                                    x="56"
                                    y="102"
                                    width="208"
                                    height="258"
                                    rx="12"
                                    fill="none"
                                    stroke="rgba(244,234,217,0.45)"
                                    strokeWidth="1.5"
                                    strokeDasharray="5 6"
                                />

                                {/* punch hole */}
                                <circle cx="160" cy="120" r="10" fill="#0d0b18" />
                                <circle
                                    cx="160"
                                    cy="120"
                                    r="10"
                                    fill="none"
                                    stroke="rgba(244,234,217,0.5)"
                                    strokeWidth="1.2"
                                    strokeDasharray="2 3"
                                />

                                {/* rivets */}
                                <circle cx="76" cy="112" r="4.5" fill="#3d1f0f" />
                                <circle cx="75" cy="111" r="1.6" fill="#e0a868" opacity="0.7" />
                                <circle cx="244" cy="112" r="4.5" fill="#3d1f0f" />
                                <circle cx="243" cy="111" r="1.6" fill="#e0a868" opacity="0.7" />

                                {/* embossed 404 */}
                                <text
                                    x="160"
                                    y="250"
                                    textAnchor="middle"
                                    className="nf-sans"
                                    style={{ fontSize: "68px", fontWeight: 800, fill: "#3d1f0f", opacity: 0.55 }}
                                    dx="2"
                                    dy="2"
                                >
                                    404
                                </text>
                                <text
                                    x="160"
                                    y="250"
                                    textAnchor="middle"
                                    className="nf-sans"
                                    style={{ fontSize: "68px", fontWeight: 800, fill: "#f4ead9" }}
                                >
                                    404
                                </text>

                                {/* stamp label */}
                                <text
                                    x="160"
                                    y="300"
                                    textAnchor="middle"
                                    className="nf-sans"
                                    style={{ fontSize: "11px", fill: "rgba(244,234,217,0.75)", letterSpacing: "3px" }}
                                >
                                    NOT FOUND
                                </text>
                                <line x1="110" y1="316" x2="210" y2="316" stroke="rgba(244,234,217,0.25)" strokeWidth="1" />
                            </g>
                        </svg>
                    </div>

                    {/* Headline */}
                    <div className={`nf-reveal ${mounted ? "nf-in" : ""}`} style={{ transitionDelay: "0.18s" }}>
                        <h1
                            className="nf-sans text-white leading-tight tracking-tight mb-2"
                            style={{ fontSize: "clamp(20px,3.2vw,30px)", fontWeight: 700 }}
                        >
                            This Page Came Apart{" "}
                            <span style={{ color: "#c97c3a" }}>at the Seams</span>
                        </h1>
                    </div>

                    {/* Subtext */}
                    <div className={`nf-reveal ${mounted ? "nf-in" : ""}`} style={{ transitionDelay: "0.24s" }}>
                        <p
                            className="nf-sans text-white/60 max-w-md mx-auto mb-5"
                            style={{ fontSize: "12.5px", lineHeight: "1.7" }}
                        >
                            The piece you're after isn't on the workbench. It may have moved, been retired
                            from the collection, or never cut from the hide at all.
                        </p>
                    </div>

                    {/* Actions */}
                    <div
                        className={`nf-reveal ${mounted ? "nf-in" : ""} flex flex-col sm:flex-row items-center gap-3 mb-5`}
                        style={{ transitionDelay: "0.3s" }}
                    >
                        <Link
                            to="/"
                            className="nf-btn-primary nf-sans text-white rounded-full px-7 py-3
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                            style={{
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "2.5px",
                                textTransform: "uppercase",
                                background: "#6366f1",
                            }}
                        >
                            Return Home
                        </Link>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="nf-btn-ghost nf-sans text-white/70 rounded-full px-7 py-3 border border-white/15
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                            style={{
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "2.5px",
                                textTransform: "uppercase",
                            }}
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Brand line */}
                    <div
                        className={`nf-reveal ${mounted ? "nf-in" : ""} flex items-center justify-center gap-3`}
                        style={{ transitionDelay: "0.36s" }}
                    >
                        <span className="w-8 h-px bg-white/20 inline-block" />
                        <p className="nf-sans text-white/40 uppercase" style={{ fontSize: "9px", letterSpacing: "3px" }}>
                            LL Leather Lovers · Est. 2020
                        </p>
                        <span className="w-8 h-px bg-white/20 inline-block" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default PageNotFound;