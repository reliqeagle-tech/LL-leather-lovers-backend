// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";
// // import ProductItem from './ProductItem';

// const CustomLeather = () => {
//   // const {products} = useContext(ShopContext);
//   // const [bestSeller,setBestSeller] = useState([]);

//   // useEffect(()=>{
//   //     const bestProduct = products.filter((item)=>(item.bestseller));
//   //     setBestSeller(bestProduct.slice(0,5))
//   // },[products])

//   return (
//     <div className="flex items-center justify-center">
//       <div className="my-10 px-4 sm:px-6 md:px-10 flex flex-col md:flex-row gap-8 md:h-[60vh] container">
//         {/* Left Text Section */}
//         <div className="md:w-1/3 p-2 sm:p-5 flex flex-col justify-center">
//           <h1 className="font-normal text-3xl sm:text-4xl md:text-5xl leading-tight">
//             <span className="text-indigo-500">Ready-Made</span> <br />
//             Leather Luxury
//           </h1>

//           <p className="pt-4 sm:pt-6 text-sm sm:text-base leading-relaxed text-gray-700">
//             Our ready-made leather fits deliver personality without the wait.
//             <br />
//             <br />
//             From classic biker silhouettes to modern essentials, each piece is
//             crafted with premium leather and refined craftsmanship — built for
//             comfort, durability, and effortless style.
//             <br />
//             <br />
//             No shortcuts. No compromises. Just authentic leather wear made for
//             real individuality.
//           </p>

//           <div className="pt-6 sm:pt-8">
//             <Link
//               to="/collection"
//               className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base inline-block"
//             >
//               Shop Now
//             </Link>
//           </div>
//         </div>

//         {/* Right Image Section */}
//         <div className="md:w-2/3 p-2 sm:p-5 flex items-center justify-center">
//           {" "}
//           <img
//             className="rounded-md w-full md:h-[450px]"
//             src={assets.customLeatherImg}
//             alt=""
//           />{" "}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomLeather;

import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const CustomLeather = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .cl-serif { font-family: 'Cormorant Garamond', serif; }
        .cl-sans  { font-family: 'Montserrat', sans-serif; }

        /* CTA button fill wipe */
        .cl-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s, color 0.3s;
        }
        .cl-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #6366f1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
        }
        .cl-btn:hover::before { transform: scaleX(1); }
        .cl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(99,102,241,0.4);
        }
        .cl-btn > * { position: relative; z-index: 1; }

        /* image parallax-style float */
        .cl-img {
          transition: transform 0.6s cubic-bezier(.22,1,.36,1),
                      box-shadow 0.6s;
        }
        .cl-img:hover {
          transform: scale(1.02) translateY(-4px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }

        /* decorative text stroke */
        .cl-stroke {
          -webkit-text-stroke: 1px rgba(255,255,255,0.12);
          color: transparent;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 300;
          line-height: 1;
          position: absolute;
          bottom: -10px;
          right: 0;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
      `}</style>

      <section
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        style={{
          /* Warm deep cognac/leather tone — totally different from the blue-black sections */
          background:
            "linear-gradient(135deg, #1a0e05 0%, #2d1a0a 35%, #1e1208 65%, #150d06 100%)",
        }}
      >
        {/* Top separator — warm amber */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,100,30,0.5), transparent)",
          }}
        />

        {/* Bottom separator */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
          }}
        />

        {/* Warm radial glow — left side behind text */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at left, rgba(160,80,20,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Cool glow — right side behind image */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at right, rgba(99,102,241,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Decorative watermark text */}
        <span className="cl-stroke hidden lg:block">LEATHER</span>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* ── LEFT — TEXT ── */}
            <div className="lg:w-[45%] flex flex-col justify-center">
              {/* Eyebrow */}
              <p
                className="cl-sans mb-4 inline-flex items-center gap-2"
                style={{
                  fontSize: "10px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "#c97c3a",
                  fontWeight: 600,
                }}
              >
                <span className="w-8 h-px bg-amber-600/60 inline-block" />
                Premium Collection
              </p>

              {/* Heading */}
              <h2
                className="cl-serif text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontSize: "clamp(36px,5vw,62px)", fontWeight: 300 }}
              >
                Ready-Made <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "#c97c3a",
                    fontWeight: 300,
                  }}
                >
                  Leather
                </em>{" "}
                Luxury
              </h2>

              {/* Divider */}
              <div
                className="w-10 h-px mb-6"
                style={{
                  background: "linear-gradient(90deg, #c97c3a, transparent)",
                }}
              />

              {/* Body text */}
              <div
                className="cl-sans space-y-4 text-white/50"
                style={{ fontSize: "14px", lineHeight: "1.8" }}
              >
                <p>
                  Our ready-made leather fits deliver personality without the
                  wait.
                </p>
                <p>
                  From classic biker silhouettes to modern essentials, each
                  piece is crafted with premium leather and refined
                  craftsmanship — built for comfort, durability, and effortless
                  style.
                </p>
                <p>
                  No shortcuts. No compromises. Just authentic leather wear made
                  for real individuality.
                </p>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-6 mt-8 mb-8 pt-6 border-t border-white/[0.07]">
                {[
                  { value: "500+", label: "Products" },
                  { value: "100%", label: "Genuine Leather" },
                  { value: "5★", label: "Rated" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p
                      className="cl-serif text-white font-light"
                      style={{ fontSize: "clamp(22px,3vw,30px)" }}
                    >
                      {value}
                    </p>
                    <p
                      className="cl-sans text-white/35 mt-0.5"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  to="/collection"
                  className="cl-btn cl-sans inline-flex items-center gap-3 no-underline
                    text-white border rounded-sm px-8 py-3.5"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    borderColor: "rgba(99,102,241,0.5)",
                  }}
                >
                  <span>Shop Now</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>

                <Link
                  to="/about"
                  className="cl-sans text-white/40 hover:text-white/80 transition-colors no-underline
                    inline-flex items-center gap-2"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Our Story
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ── RIGHT — IMAGE ── */}
            <div className="lg:w-[55%] relative flex items-center justify-center">
              {/* Decorative frame behind image */}
              <div
                className="absolute top-4 left-4 right-[-16px] bottom-[-16px] rounded-2xl pointer-events-none"
                style={{
                  border: "1px solid rgba(201,124,58,0.2)",
                  borderRadius: "16px",
                }}
              />

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-amber-600/40" />
                <div className="absolute top-0 left-0 w-px h-full bg-amber-600/40" />
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-px bg-indigo-500/40" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-indigo-500/40" />
              </div>

              <img
                src={assets.customLeatherImg}
                alt="Premium Leather Collection"
                className="cl-img relative z-10 w-full rounded-xl"
                style={{
                  maxHeight: "520px",
                  objectFit: "cover",
                  objectPosition: "center",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
                }}
              />

              {/* Floating label badge */}
              <div
                className="cl-sans absolute bottom-6 left-0 z-20 bg-white/95 backdrop-blur-sm
                  rounded-lg px-4 py-3 shadow-2xl"
                style={{ transform: "translateX(-10%)" }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    marginBottom: "2px",
                  }}
                >
                  Crafted With
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1.2,
                  }}
                >
                  Premium Leather
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="#6366f1"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomLeather;
