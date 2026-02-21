// import React from "react";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const TrustWorthy = () => {
//   return (
//     <div className="bg-[#6e604a] py-16 px-4 md:px-10 pb-10">
//   <div className="text-center mb-12">
//     <p className="text-sm tracking-widest text-white/70">
//       BEHIND THE BRAND
//     </p>
//     <h2 className="text-3xl md:text-4xl font-bold text-white">
//       The Leather Lovers Difference
//     </h2>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-2 border border-white/20 w-full">
    
//     {/* Tile 1 */}
//     <div className="flex p-6 border-b border-white/20 md:border-r gap-6">
//       <img src={assets.Trust3}
//         className="w-1/2 h-48 md:h-64 object-cover rounded"
//       />
//       <div className="pt-3">
//         <h3 className="text-lg font-semibold text-white mb-2">
//           Premium Raw Materials
//         </h3>
//         <p className="text-white/80 text-sm leading-relaxed">
//           From high-quality leather to durable hardware, every piece starts
//           with premium materials crafted for longevity and comfort.
//         </p>
//       </div>
//     </div>

//     {/* Tile 2 */}
//     <div className="flex p-6 border-b border-white/20 gap-6">
//       <img src={assets.Trust2}
//         className="w-1/2 h-48 md:h-64 object-cover rounded"
//       />
//       <div className="pt-3">
//         <h3 className="text-lg font-semibold text-white mb-2">
//           Crafted by Hand
//         </h3>
//         <p className="text-white/80 text-sm leading-relaxed">
//           Each product is carefully crafted by experienced artisans to
//           ensure detail, durability, and quality in every stitch.
//         </p>
//       </div>
//     </div>

//     {/* Tile 3 */}
//     <div className="flex p-6 border-b md:border-b-0 border-white/20 md:border-r gap-6">
//       <img src={assets.Trust1}
//         className="w-1/2 h-48 md:h-64 object-cover rounded"
//       />
//       <div className="pt-3">
//         <h3 className="text-lg font-semibold text-white mb-2">
//           Workshop to You
//         </h3>
//         <p className="text-white/80 text-sm leading-relaxed">
//           We deliver directly from our workshop to you — no middleman, no
//           inflated pricing. Just honest value.
//         </p>
//       </div>
//     </div>

//     {/* Tile 4 */}
//     <div className="flex p-6 gap-6">
//       <img src={assets.Trust4}
//         className="w-1/2 h-48 md:h-64 object-cover rounded"
//       />
//       <div className="pt-3">
//         <h3 className="text-lg font-semibold text-white mb-2">
//           Ready-Made Fits
//         </h3>
//         <p className="text-white/80 text-sm leading-relaxed">
//           Our ready-made leather jackets come in a wide range of sizes,
//           crafted to deliver perfect comfort and style straight off the rack.
//         </p>
//       </div>
//     </div>

//   </div>
// </div>

//   );
// };

// export default TrustWorthy;




import React, { useRef, useState, useEffect } from "react";
import { assets } from "../assets/assets";

const tiles = [
  {
    image: assets.Trust3,
    tag: "01 — Materials",
    title: "Sourced From the Finest Tanneries",
    body: "Every hide we use is hand-selected from premium tanneries — full-grain, vegetable-tanned, and built to age beautifully with you. No shortcuts. No synthetic blends.",
  },
  {
    image: assets.Trust2,
    tag: "02 — Craft",
    title: "Stitched by Skilled Artisans",
    body: "Our leather workers bring decades of experience to every seam, buckle, and edge finish. Each piece leaves our workshop as a small work of art — made to last a lifetime.",
  },
  {
    image: assets.Trust1,
    tag: "03 — Direct",
    title: "Workshop to Your Wardrobe",
    body: "No middlemen. No retail markup. We ship straight from our workshop — so you pay for the leather, not the distribution chain. Real value, honest pricing.",
  },
  {
    image: assets.Trust4,
    tag: "04 — Fit",
    title: "Ready-Made, Perfectly Sized",
    body: "Our leather jackets, coats, and accessories come in a wide range of sizes — cut generously, finished precisely, and ready to wear the moment they arrive.",
  },
];

const TrustWorthy = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .tw-serif { font-family: 'Cormorant Garamond', serif; }
        .tw-sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes twReveal {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .tw-reveal { opacity:0; animation: twReveal 0.55s ease forwards; }

        /* tile */
        .tw-tile {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }
        .tw-tile:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(201,124,58,0.3);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }

        /* image */
        .tw-tile-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.7s cubic-bezier(.22,1,.36,1), filter 0.5s;
          filter: brightness(0.88) saturate(0.9);
        }
        .tw-tile:hover .tw-tile-img {
          transform: scale(1.04);
          filter: brightness(0.95) saturate(1);
        }

        /* tag */
        .tw-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c97c3a;
          font-weight: 600;
          margin-bottom: 10px;
        }

        /* tile title */
        .tw-tile-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        /* tile body */
        .tw-tile-body {
          font-family: 'Montserrat', sans-serif;
          font-size: 12.5px;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          font-weight: 400;
        }

        /* accent line on hover */
        .tw-tile-line {
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #c97c3a, transparent);
          margin-bottom: 14px;
          transition: width 0.4s ease;
        }
        .tw-tile:hover .tw-tile-line { width: 40px; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        style={{ background: "linear-gradient(160deg, #160e06 0%, #1e1208 40%, #110a04 100%)" }}
      >
        {/* Top separator — amber */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,124,58,0.45), transparent)" }} />

        {/* Bottom separator — indigo */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />

        {/* Left warm glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at left, rgba(160,80,20,0.14) 0%, transparent 70%)" }} />

        {/* Right cool glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at right, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── HEADING ── */}
          <div className="text-center mb-12 sm:mb-16 tw-reveal"
            style={visible ? { animationDelay:"0s" } : { animation:"none", opacity:0 }}>

            <p className="tw-sans mb-3 inline-flex items-center gap-3"
              style={{ fontSize:"10px", letterSpacing:"4px", textTransform:"uppercase", color:"#c97c3a", fontWeight:600 }}>
              <span className="w-6 h-px bg-amber-700/60 inline-block" />
              Behind the Brand
              <span className="w-6 h-px bg-amber-700/60 inline-block" />
            </p>

            <h2 className="tw-serif text-white leading-tight tracking-tight"
              style={{ fontSize:"clamp(34px,4.5vw,56px)", fontWeight:300 }}>
              The{" "}
              <em style={{ fontStyle:"italic", color:"#c97c3a", fontWeight:300 }}>
                LL Leather Lovers
              </em>
              {" "}Difference
            </h2>

            <div className="w-12 h-px mx-auto my-5"
              style={{ background:"linear-gradient(90deg, transparent, #c97c3a, transparent)" }} />

            <p className="tw-sans text-white/35 max-w-lg mx-auto leading-relaxed"
              style={{ fontSize:"13px" }}>
              Four pillars that define every piece we make — from the hide we select to the hand that delivers it.
            </p>
          </div>

          {/* ── TILES GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {tiles.map((tile, i) => (
              <div
                key={i}
                className="tw-reveal"
                style={visible
                  ? { animationDelay:`${0.1 + i * 0.1}s` }
                  : { animation:"none", opacity:0 }
                }
              >
                <div className="tw-tile h-full">

                  {/* Image */}
                  <div className="overflow-hidden" style={{ borderRadius:"12px 12px 0 0" }}>
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="tw-tile-img"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <p className="tw-tag">{tile.tag}</p>
                    <div className="tw-tile-line" />
                    <h3 className="tw-tile-title">{tile.title}</h3>
                    <p className="tw-tile-body flex-1">{tile.body}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* ── BOTTOM TAGLINE ── */}
          <div className="mt-14 sm:mt-16 text-center">
            <p className="tw-sans text-white/20 text-[10px] tracking-[3px] uppercase inline-flex items-center gap-3">
              <span className="w-8 h-px bg-white/10 inline-block" />
              Premium Leather Since 2020 · Made for Real Individuality
              <span className="w-8 h-px bg-white/10 inline-block" />
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default TrustWorthy;