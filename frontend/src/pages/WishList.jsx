import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const {
    wishlist,
    fetchWishlist,
    toggleWishlistItem,
    userId,
    products,
    currency,
  } = useContext(ShopContext);

  useEffect(() => {
    if (userId) fetchWishlist();
  }, [userId]);

  // Merge wishlist items with product details + ratings
  const wishlistProducts = wishlist
    .map((w) => {
      const product = products.find((p) => p._id === w.productId);
      return product
        ? {
            ...product,
            avgRating:
              product.reviews?.length > 0
                ? product.reviews.reduce((s, r) => s + r.rating, 0) /
                  product.reviews.length
                : 0,
            reviewCount: product.reviews?.length || 0,
          }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="max-w-5xl px-5 sm:px-20  py-6">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer block group shadow-2xl py-5 rounded-md bg-white"
            >
              {/* Product Link */}
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to={`/product/${product._id}`}
                className="block"
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] rounded-md overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Name */}
                <p className="mt-3 text-xs md:text-sm font-light text-gray-900 text-left px-5 line-clamp-2">
                  {product.name}
                </p>
              </Link>

              {/* ⭐ Rating + Count */}
              <div className="px-5 mt-1 text-sm text-yellow-500 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.round(product.avgRating || 0) ? "★" : "☆"}
                  </span>
                ))}
                <span className="ml-2 text-gray-600 text-xs">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="text-start mt-1 px-5 space-x-2">
                <span className="line-through text-gray-500 text-xs">
                  {currency}
                  {(product.price * 1.2).toFixed(0)}
                </span>

                <span className="text-black font-semibold text-sm">
                  {currency}
                  {product.price}
                </span>
              </div>

              {/* Remove Button */}
              <div className="px-5 mt-4">
                <button
                  onClick={() => toggleWishlistItem(product._id)}
                  className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-indigo-500 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
