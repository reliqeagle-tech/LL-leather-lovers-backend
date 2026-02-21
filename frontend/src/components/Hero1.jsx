// import React from "react";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const Hero1 = () => {
//   return (
//     <div>
//       <div className=" relative">
//         <img src={assets.ll_lover} alt="" className=" h-[100vh] w-full" />
//         //{" "}
//         <div className="w-full sm:w-1/2 flex flex-col items-center justify-center text-center absolute">
//           //{" "}
//           <h1 className="text-2xl md:text-[4rem] prata-regular text-white">
//             // <span className="text-indigo-500 prata-regular ">Latest</span> //
//             Arrivals //{" "}
//           </h1>
//           // <p className="w-44  md:mt-5 md:w-[40%] h-[3px] bg-indigo-500"></p>
//           //{" "}
//           <p className="prata-regular text-md sm:py-2 md:text-[2.5rem] md:leading-[3rem] text-white ">
//             // This festive season, // <br />
//             // take your brand to <br /> millions of homes //{" "}
//           </p>
//           //{" "}
//           <div className="flex items-center gap-2">
//             // <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
//             //{" "}
//             <p className="font-semibold md:text-base text-white">
//               //{" "}
//               <Link to="/collection" className="text-sm md-text-xl">
//                 // SHOP <span className="text-indigo-500">NOW</span>
//                 //{" "}
//               </Link>
//               //{" "}
//             </p>
//             // <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
//             //{" "}
//           </div>
//           //{" "}
//         </div>
//       </div>
//     </div>
//     // <div className="px-0 flex flex-col sm:flex-row lg:h-[100vh] rounded-lg">
//     //   <div className="">
//     //     {/* TEXT SECTION */}
//     //     <div className="w-full sm:w-1/2 flex flex-col items-center justify-center text-center">
//     //       <h1 className="text-2xl md:text-[4rem] prata-regular text-white">
//     //         <span className="text-indigo-500 prata-regular ">Latest</span>{" "}
//     //         Arrivals
//     //       </h1>

//     //       <p className="w-44  md:mt-5 md:w-[40%] h-[3px] bg-indigo-500"></p>

//     //       <p className="prata-regular text-md sm:py-2 md:text-[2.5rem] md:leading-[3rem] text-white ">
//     //         This festive season,
//     //         <br />
//     //         take your brand to <br /> millions of homes
//     //       </p>

//     //       <div className="flex items-center gap-2">
//     //         <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
//     //         <p className="font-semibold md:text-base text-white">
//     //           <Link to="/collection" className="text-sm md-text-xl">
//     //             SHOP <span className="text-indigo-500">NOW</span>
//     //           </Link>
//     //         </p>
//     //         <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
//     //       </div>
//     //     </div>

//     //     {/* IMAGE SECTION (hidden on mobile) */}
//     //     <div className="md: sm:flex w-full sm:w-1/2 items-end justify-around">
//     //       <img
//     //         className="h-full object-contain object-bottom"
//     //         src={assets.ll_lover}
//     //         alt=""
//     //       />
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default Hero1;

import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero1 = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .font-playfair   { font-family: 'Playfair Display', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

        /* ── entrance animations ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideLeft {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes expandW {
          from { width:0; }
          to   { width:70px; }
        }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes scrollPulse {
          0%,100%{ opacity:.3; transform:scaleY(1); }
          50%    { opacity:1;  transform:scaleY(1.15); }
        }

        .anim-fade-up    { animation: fadeUp   .9s ease        forwards; }
        .anim-slide-left { animation: slideLeft .7s ease .2s   forwards; opacity:0; }
        .anim-sub        { animation: fadeIn    .7s ease .55s  forwards; opacity:0; }
        .anim-cta        { animation: fadeUp    .7s ease .75s  forwards; opacity:0; }
        .anim-badge      { animation: fadeIn    .6s ease 1s    forwards; opacity:0; }
        .anim-line       { animation: expandW  .9s ease .5s   forwards; width:0; }
        .anim-scroll     { animation: scrollPulse 2s ease-in-out infinite; }

        /* ── image zoom on section hover ── */
        .hero-wrap:hover .hero-bg { transform:scale(1.03); }
        .hero-bg { transition: transform 8s ease; }

        /* ── View All arrow bounce ── */
        .arrow-icon {
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .view-all:hover .arrow-icon { transform: translateX(7px); }

        /* ── View All underline slide ── */
        .view-all {
          position: relative;
          transition: color .2s;
        }
        .view-all::after {
          content:'';
          position:absolute;
          bottom:-2px; left:0;
          width:0; height:1px;
          background:rgba(255,255,255,.6);
          transition:width .3s ease;
        }
        .view-all:hover::after { width:100%; }
        .view-all:hover { color:#fff !important; }
      `}</style>

      {/* ── SECTION ── */}
      <section
        className="hero-wrap relative w-full overflow-hidden bg-black"
        style={{ height: "100svh", minHeight: "500px" }}
      >
        {/* Background image */}
        <img
          src={assets.ll_lover3}
          alt="LL Leather Lovers – Latest Arrivals"
          className="hero-bg absolute inset-0 w-full h-full object-cover object-[center_top]
            sm:object-[60%_top]"
          loading="eager"
        />

        {/* Overlay – top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom,rgba(0,0,0,.28) 0%,transparent 18%)",
          }}
        />
        {/* Overlay – left diagonal (desktop) / bottom-up (mobile) */}
        <div
          className="absolute inset-0 pointer-events-none
          hidden sm:block"
          style={{
            background:
              "linear-gradient(105deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.65) 42%,rgba(0,0,0,.18) 68%,transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none
          sm:hidden"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,.96) 0%,rgba(0,0,0,.78) 40%,rgba(0,0,0,.25) 70%,transparent 100%)",
          }}
        />
        {/* Overlay – bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 40%)",
          }}
        />

        {/* ── CONTENT ── */}
        <div
          className="absolute inset-0 flex
          items-center px-[6vw]
          max-sm:items-end max-sm:pb-[72px]"
        >
          {loaded && (
            <div
              className="anim-fade-up
              max-w-[560px] text-left
              max-sm:max-w-full max-sm:text-center"
            >
              {/* Eyebrow */}
              <div
                className="anim-slide-left font-montserrat
                flex items-center gap-[10px] mb-[18px]
                text-[#8b85ff] uppercase tracking-[4px]
                text-[10px] md:text-[12px] font-semibold
                max-sm:justify-center"
              >
                <span className="block w-8 h-[1.5px] bg-[#6C63FF] flex-shrink-0 max-sm:hidden" />
                New Collection 2026
              </div>

              {/* Heading */}
              <h1
                className="font-playfair font-black text-white leading-[1.04] m-0
                text-[clamp(40px,5.8vw,80px)] tracking-[-0.01em]
                max-sm:text-[clamp(34px,10vw,50px)]"
              >
                <span className="text-[#8b85ff] italic font-normal">
                  Latest
                </span>
                <br />
                Arrivals
              </h1>

              {/* Accent line */}
              <div
                className="anim-line h-[2px] my-5 max-sm:mx-auto"
                style={{
                  background: "linear-gradient(90deg,#6C63FF,transparent)",
                }}
              />

              {/* Sub */}
              <p
                className="anim-sub font-playfair text-white/80 leading-[1.65] mb-8
                text-[clamp(16px,1.9vw,22px)]
                max-sm:text-[clamp(14px,4vw,18px)] max-sm:mb-6 text-[20px]"
              >
                Step into a world where <br /> craftsmanship meets attitude. <br />
                At LL Leather Lovers, every <br /> stitch tells a story of precision, <br />passion, and power.
              </p>

              {/* CTA row */}
              <div
                className="anim-cta flex items-center gap-6
                max-sm:flex-col max-sm:items-center max-sm:gap-4"
              >
                {/* Shop Now */}
                <Link
                  to="/collection"
                  className="font-montserrat inline-block
                    text-white bg-[#6C63FF] no-underline
                    px-9 py-[15px] rounded-lg
                    text-[11.5px] font-semibold uppercase tracking-[2.5px]
                    transition-all duration-300
                    hover:bg-[#7b73ff] hover:-translate-y-0.5
                    hover:shadow-[0_10px_32px_rgba(108,99,255,0.5)]
                    max-sm:w-full max-sm:text-center max-sm:py-4"
                >
                  Shop Now
                </Link>

                {/* View All — arrow animates on hover */}
                <Link
                  to="/collection"
                  className="view-all font-montserrat inline-flex items-center gap-2
                    text-white/60 no-underline
                    text-[11.5px] font-medium uppercase tracking-[2px]"
                >
                  View All
                  <svg
                    className="arrow-icon"
                    width="16"
                    height="16"
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
          )}
        </div>

        {/* Badge — desktop only */}
        {loaded && (
          <div
            className="anim-badge font-montserrat
            absolute top-9 right-[5vw]
            text-white/50 border border-white/15
            px-4 py-2 rounded-full backdrop-blur-md
            text-[10px] tracking-[2px] uppercase
            max-sm:hidden"
          >
            ✦ Premium Leather
          </div>
        )}

        {/* Scroll indicator */}
        <div
          className="font-montserrat
          absolute bottom-7 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2
          text-white/35 text-[9px] tracking-[3px] uppercase"
        >
          <div
            className="anim-scroll w-px h-10"
            style={{
              background: "linear-gradient(to bottom,#6C63FF,transparent)",
            }}
          />
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
};

export default Hero1;
