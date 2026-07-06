import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const CARD_ACCENTS = [
  "#6366f1", "#8b5cf6", "#6366f1", "#a78bfa",
  "#818cf8", "#7c3aed", "#6366f1", "#8b5cf6",
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
          // border-left: 3px solid #6366f1;
          border:2px solid rgba(99,102,241,.12);
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
        className="py-16 sm:py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0b0b0f 0%, #0e0e14 100%)" }}
      >
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Heading ── */}
          <div className="text-center mb-10">
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

            <div className="w-48 h-[2px] mx-auto mt-1  mb-6"
              style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />

            <p className="lc-sans text-white/65 max-w-md mx-auto leading-relaxed tracking-wide"
              style={{ fontSize: "13px" }}>
              Crafted with precision, styled for those who demand the extraordinary.
            </p>

            <div className="flex justify-center mt-5">
              <span className="lc-sans inline-flex items-center gap-2 text-white/70
                border border-white/30 bg-white/[0.03] px-4 py-1.5 rounded-full"
                style={{ fontSize: "10px", letterSpacing: "2px" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                {latestProducts.length} Limited Collection
              </span>
            </div>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 ">
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
                      LATEST
                    </span>
                  )}

                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    discountPrice={item.discountPrice}
                    category={item.category}
                    subCategory={item.subCategory}
                    sku={item.sku}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="flex items-center justify-center  sm:mt-10">
            <Link
              to="/collection"
              className="lc-cta lc-sans inline-flex items-center gap-3 no-underline
                text-white border rounded-full px-5 py-3.5 hover:border-none"
              style={{
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "2.5px", textTransform: "uppercase",
                borderColor: "rgba(99,102,241,0.5)",
                background:
                  "radial-gradient(circle at center, rgba(99,102,241,.04), transparent 60%), linear-gradient(180deg,#090909,#0d0d13)",
              }}
            >
              <span>Explore Full Collection</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default LatestCollection;