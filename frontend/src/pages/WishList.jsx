import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import AccountSidebar from "../components/AccountSidebar";
import { generateSeoUrlParts } from "../utils/slugify";

const Stars = ({ rating = 0, count = 0 }) => (
  <div className="flex items-center gap-0.5 ">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill={i < Math.round(rating) ? "#fbbf24" : "none"}
        stroke="#fbbf24"
        strokeWidth="1.6"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ))}
    <span className="text-gray-400 ml-1 text-[10px]">({count})</span>
  </div>
);

const ACCENTS = ["#6366f1", "#a5b4fc", "#818cf8", "#c084fc", "#4f46e5", "#7c3aed"];

const getProductUrl = (product) => {
  const { _id, category, subCategory, name, sku } = product;

  if (!category || !subCategory || !sku) {
    console.warn("Missing SEO data:", { category, subCategory, sku, name });
    return `/product/${_id}`;
  }

  const { categorySlug, subCategorySlug, productSlug, skuSlug } = generateSeoUrlParts(
    category,
    subCategory,
    name,
    sku
  );

  return `/product/${categorySlug}/${subCategorySlug}/${productSlug}/${skuSlug}`;
};

const Wishlist = () => {
  const { wishlist, fetchWishlist, toggleWishlistItem, userId, products, currency } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchWishlist().finally(() => setLoading(false));
    }
  }, [userId]);

  const wishlistProducts = wishlist
    .map((w) => {
      const product = products.find((p) => p._id === w.productId);
      if (!product) return null;
      return {
        ...product,
        avgRating: product.reviews?.length > 0
          ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
          : 0,
        reviewCount: product.reviews?.length || 0,
      };
    })
    .filter(Boolean);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
      >
        <div className="text-indigo-400 text-lg">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <div
      style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-10 text-gray-100"
    >
      {/* Top separator line */}
      <div
        className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-[24%] shrink-0">
          <AccountSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <p
              className="text-indigo-400 font-semibold uppercase tracking-widest mb-1.5"
              style={{ fontSize: "10px", letterSpacing: "4px" }}
            >
              Account
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h1
                className="text-white font-light leading-tight"
                style={{ fontSize: "clamp(28px, 4.5vw, 42px)" }}
              >
                My <em className="text-indigo-400 italic">Wishlist</em>
              </h1>
              {wishlistProducts.length > 0 && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-300 text-sm">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <div className="w-28 h-px mt-4 bg-gradient-to-r from-indigo-500 to-transparent" />
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 gap-6 rounded-2xl border border-white/5 bg-white/[0.015]">
              <div className="w-20 h-20 rounded-full flex items-center justify-center border border-indigo-500/20 bg-indigo-950/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-xl text-white/80 mb-2">Your wishlist is empty</p>
                <p className="text-gray-400">Save your favorite leather pieces here</p>
              </div>
              <Link
                to="/collection"
                className="mt-4 inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors font-medium tracking-wide text-sm uppercase"
              >
                Browse Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {wishlistProducts.map((product, index) => {
                  const price = parseFloat(product.price) || 0;
                  const discountPrice = product.discountPrice ? parseFloat(product.discountPrice) : 0;
                  const hasDiscount = discountPrice > 0 && discountPrice < price;
                  const displayPrice = hasDiscount ? discountPrice : price;
                  const discountPct = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;
                  const accent = ACCENTS[index % ACCENTS.length];

                  return (
                    <div
                      key={product._id}
                      className="group bg-gradient-to-b from-gray-900/40 to-gray-950/60 rounded-2xl overflow-hidden border border-gray-800/60 hover:border-indigo-500/40 transition-all duration-300 flex flex-col shadow-xl hover:shadow-indigo-900/30 mx-auto w-full"
                      style={{
                        borderLeft: `4.5px solid ${accent}`,
                        height: "340px", // Fixed total card height (reduced)
                        maxWidth: "240px", // Reduced card width
                      }}
                    >
                      {/* Image Container – now takes 65% of card height */}
                      <Link
                        to={getProductUrl(product)}
                        className="block relative overflow-hidden rounded-t-2xl shrink-0"
                        style={{
                          height: "62%",
                          background: 'linear-gradient(135deg, #f5f3f0 0%, #ece9e4 100%)',
                        }}
                      >
                        <img
                          src={Array.isArray(product.image) ? product.image[0] : product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Heart badge – filled red like wishlist item */}
                        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-900/80 backdrop-blur-md border border-red-700/50 flex items-center justify-center shadow-xl z-10">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="#f87171" stroke="#f87171">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </div>
                      </Link>

                      {/* Product Info – now takes 30% of card height */}
                      <div
                        className="px-2.5 py-1.5 flex flex-col flex-1 min-h-0"
                        style={{ height: "38%" }}
                      >
                        <Link to={getProductUrl(product)} className="no-underline">
                          <h3
                            className="text-white font-light line-clamp-2 mb-1  transition-colors"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "13px",
                              lineHeight: "1.15",
                            }}
                          >
                            {product.name}
                          </h3>
                        </Link>

                        <Stars rating={product.avgRating} count={product.reviewCount} />

                        {/* Price & Discount */}
                        <div className="flex items-center gap-1.5 my-1 flex-wrap">
                          <span className="text-sm font-semibold text-white">
                            {currency}{displayPrice.toFixed(2)}
                          </span>

                          {hasDiscount && (
                            <>
                              <span className="text-[11px] text-gray-400 line-through">
                                {currency}{price.toFixed(2)}
                              </span>
                              <span className="bg-green-900/70 text-green-300 text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                                {discountPct}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-1.5 mt-auto">
                          <Link
                            to={getProductUrl(product)}
                            className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-center text-[11px] font-medium transition-all"
                          >
                            View Product
                          </Link>

                          <button
                            onClick={() => toggleWishlistItem(product._id)}
                            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50 transition-all"
                            title="Remove from wishlist"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center mt-14">
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-full font-medium tracking-wider uppercase text-sm transition-all shadow-xl hover:shadow-indigo-500/30"
                >
                  Continue Shopping
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;