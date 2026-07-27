import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero1 = () => {
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const t = setTimeout(() => setLoaded(true), 80);
  //   return () => clearTimeout(t);
  // }, []);

  return (
    <>
      <style>{`
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
        style={{ height: "calc(100vh - 68px)" }}
      >
        {/* Background image */}
        <img

          src='/ll_lover3.webp'
          alt="LL Leather Lovers – Latest Arrivals"
          className="hero-bg absolute inset-0 w-full h-full object-cover object-[72%_center]
            sm:object-[75%_top]"
          loading="eager"
          fetchPriority="high"
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
              "linear-gradient(105deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.55) 38%,rgba(0,0,0,.18) 68%,transparent 100%)",
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
          items-center px-[7vw]
          max-sm:items-end max-sm:pb-[72px]"
        >

          <div
            className="anim-fade-up
              max-w-[430px] text-left
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
              className="font-playfair font-black text-white leading-[0.95] m-0
                text-[clamp(44px,5vw,72px)] tracking-[-0.01em]
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
              className="anim-sub font-playfair text-white/80 leading-[1.55] mb-6
                text-[clamp(16px,1.9vw,22px)]
                max-sm:text-[clamp(14px,4vw,18px)] max-sm:mb-6 text-[20px]"
            >
              Step into a world where  craftsmanship meets attitude.
              At LL Leather Lovers, every stitch tells a story of precision, passion, and power.
            </p>

            {/* CTA row */}
            <div
              className="anim-cta flex items-center gap-8
                max-sm:flex-col max-sm:items-center max-sm:gap-4"
            >
              {/* Shop Now */}
              <Link
                to="/collection"
                className="font-montserrat inline-block
                    text-white bg-[#4F46E5] no-underline
                    px-9 py-[15px] rounded-lg
                    text-[11.5px] font-semibold uppercase tracking-[2.5px]
                    transition-all duration-300
                    hover:bg-[#4338CA] hover:-translate-y-0.5
                    hover:shadow-[0_10px_32px_rgba(108,99,255,0.5)]
                    max-sm:w-full max-sm:text-center max-sm:py-4 border border-indigo-700"
              >
                Shop Now
              </Link>

              {/* View All — arrow animates on hover */}
              <Link
                to="/collection"
                className="view-all font-montserrat inline-flex items-center gap-2
                    text-white/80 no-underline
                    text-[11.5px] font-medium uppercase tracking-[2px]"
              >
                EXPLORE COLLECTION
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

        </div>

        {/* Badge — desktop only */}

        <div
          className="anim-badge font-montserrat
            absolute top-9   right-[5vw]
            text-white/65 border border-white/15
            px-4 py-2 rounded-full backdrop-blur-lg
            text-[10px] tracking-[2px] uppercase
            max-sm:hidden"
        >
          ✦ Premium Leather
        </div>

        {/* Scroll indicator */}
        {/* <div
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
        </div> */}
      </section>
    </>
  );
};

export default Hero1;
