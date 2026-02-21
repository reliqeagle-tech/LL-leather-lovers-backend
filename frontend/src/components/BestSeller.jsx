// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {

//     const {products} = useContext(ShopContext);
//     const [bestSeller,setBestSeller] = useState([]);

//     useEffect(()=>{
//         const bestProduct = products.filter((item)=>(item.bestseller));
//         setBestSeller(bestProduct.slice(0,4))
//     },[products])

//   return (
//     <div className="my-8 px-4 sm:px-6 md:px-10">
//   {/* Heading Section */}
//   <div className="text-center text-2xl sm:text-3xl py-6">
//     <Title text1={"BEST"} text2={"SELLERS"} />

//     <p className="w-[90%] sm:w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
//       Discover the most popular picks of the season — trending, stylish, and always in demand.
//     </p>
//   </div>

//   {/* Product Grid */}
//   <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-6">
//     {bestSeller.map((item, index) => (
//       <ProductItem
//         key={index}
//         id={item._id}
//         name={item.name}
//         image={item.image}
//         price={item.price}
//         discountPrice={item.discountPrice}
//       />
//     ))}
//   </div>
// </div>

//   )
// }

// export default BestSeller

import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const CARD_ACCENTS = ["#6366f1", "#3b82f6", "#4f46e5", "#2563eb"];

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 4));
  }, [products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.06 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Blue star renderer
  const Stars = ({ rating = 4, count = 0 }) => (
    <div className="flex items-center gap-0.5 mt-1 mb-2">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#3b82f6" : "none"}
          stroke="#3b82f6"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="text-gray-400 text-[11px] ml-1">({count})</span>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .bs-serif { font-family: 'Cormorant Garamond', serif; }
        .bs-sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes bsReveal {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .bs-reveal { opacity:0; animation: bsReveal 0.5s ease forwards; }

        /* image zoom — only the img, not the card */
        .bs-img img {
          transition: transform 0.65s cubic-bezier(.22,1,.36,1);
          display: block; width: 100%; height: 100%;
          object-fit: contain; object-position: center ;
          padding: 8px;
          
        }
        .bs-card:hover .bs-img img { transform: scale(1.06); }

        /* CTA fill */
        .bs-cta { position:relative; overflow:hidden; transition: transform 0.2s, box-shadow 0.25s; }
        .bs-cta::before {
          content:''; position:absolute; inset:0;
          background:#3b82f6;
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.3s cubic-bezier(.22,1,.36,1);
        }
        .bs-cta:hover::before { transform:scaleX(1); }
        .bs-cta:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(59,130,246,0.4); }
        .bs-cta > * { position:relative; z-index:1; }
      `}</style>

      <section
        ref={sectionRef}
        className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #060610 0%, #08080f 50%, #050510 100%)",
        }}
      >
        {/* Top separator */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)",
          }}
        />

        {/* Blue radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ── HEADING ── */}
          <div className="text-center mb-12 sm:mb-16">
            <p
              className="bs-sans mb-4 inline-flex items-center gap-2 text-blue-400 font-semibold"
              style={{
                fontSize: "10px",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
              Top Rated
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
            </p>

            <h2
              className="bs-serif text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 300 }}
            >
              Best{" "}
              <em
                className="text-blue-300"
                style={{ fontStyle: "italic", fontWeight: 300 }}
              >
                Sellers
              </em>
            </h2>

            <div
              className="w-12 h-px mx-auto my-4"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #3b82f6, transparent)",
              }}
            />

            <p
              className="bs-sans text-white/35 max-w-md mx-auto leading-relaxed tracking-wide"
              style={{ fontSize: "13px" }}
            >
              The most loved pieces this season — trending, timeless, and always
              in demand.
            </p>

            <div className="flex justify-center mt-5">
              <span
                className="bs-sans inline-flex items-center gap-2 text-white/25
                border border-white/[0.07] px-4 py-1.5 rounded-full"
                style={{ fontSize: "10px", letterSpacing: "2px" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                {bestSeller.length} top picks
              </span>
            </div>
          </div>

          {/* ── GRID ── */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {bestSeller.map((item, index) => {
              const hasDiscount =
                item.discountPrice &&
                Number(item.discountPrice) < Number(item.price);
              const discountPct = hasDiscount
                ? Math.round(
                    ((item.price - item.discountPrice) / item.price) * 100,
                  )
                : 0;
              const displayPrice = hasDiscount
                ? item.discountPrice
                : item.price;
              const rating = item.rating ?? 4;
              const reviewCount = item.reviews?.length ?? item.reviewCount ?? 0;

              return (
                <div
                  key={item._id}
                  className="bs-reveal"
                  style={
                    visible
                      ? { animationDelay: `${index * 0.08}s` }
                      : { animation: "none", opacity: 0 }
                  }
                >
                  <Link
                    to={`/product/${item._id}`}
                    className="block no-underline group"
                  >
                    <div
                      className="bs-card bg-white rounded-xl overflow-hidden shadow-sm
                        border border-gray-100 transition-shadow duration-300
                        hover:shadow-xl relative"
                      style={{
                        borderLeft: `3px solid ${CARD_ACCENTS[index % CARD_ACCENTS.length]}`,
                      }}
                    >
                      {/* ── IMAGE ── */}
                      <div
                        className="bs-img relative overflow-hidden bg-white"
                        style={{ height: "240px" }}
                      >
                        {/* HOT badge */}
                        <span
                          className="bs-sans absolute top-2.5 right-2.5 z-10 bg-blue-600 text-white
                          text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded"
                        >
                          ★ HOT
                        </span>

                        {/* number */}
                        <span
                          className="bs-sans absolute top-2.5 left-3 z-10 text-[10px]
                          text-black/20 tracking-wide select-none"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <img
                          src={
                            Array.isArray(item.image)
                              ? item.image[0]
                              : item.image
                          }
                          alt={item.name}
                        />
                      </div>

                      {/* ── INFO ── */}
                      <div className="px-3 pt-3 pb-4">
                        {/* Christmas Sale pill — only when discounted */}
                        {hasDiscount && (
                          <span
                            className="bs-sans inline-block bg-indigo-600 text-white
                            text-[11px] font-semibold px-3 py-1 rounded-full mb-2"
                          >
                            Christmas Sale
                          </span>
                        )}

                        {/* Product name */}
                        <p
                          className="bs-sans text-[13px] text-gray-800 font-normal leading-[1.5]
                          line-clamp-2 mb-1"
                        >
                          {item.name}
                        </p>

                        {/* Stars */}
                        <Stars rating={rating} count={reviewCount} />

                        {/* Price row */}
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          {hasDiscount ? (
                            <>
                              <span className="bs-sans text-[15px] font-bold text-gray-900">
                                ${displayPrice}
                              </span>
                              <span className="bs-sans text-[12px] text-gray-400 line-through font-normal">
                                ${item.price}
                              </span>
                              <span
                                className="bs-sans text-[10px] font-bold text-green-600
                                bg-green-50 border border-green-200 px-1.5 py-0.5 rounded"
                              >
                                {discountPct}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="bs-sans text-[15px] font-bold text-gray-900">
                              ${item.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div className="flex items-center justify-center mt-14 sm:mt-16">
            <Link
              to="/collection"
              className="bs-cta bs-sans inline-flex items-center gap-3 no-underline
                text-white border border-blue-500/50 rounded-sm px-9 py-3.5"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              <span>Shop Best Sellers</span>
              <svg
                width="15"
                height="15"
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
      </section>
    </>
  );
};

export default BestSeller;
