import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discountPrice }) => {
  const { currency, getProductReviews } = useContext(ShopContext);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  // Load reviews when card mounts
  useEffect(() => {
    loadReviews();
  }, [id]);

  const loadReviews = async () => {
    const data = await getProductReviews(id);
    setReviews(data || []);

    if (data && data.length > 0) {
      const average =
        data.reduce((sum, review) => sum + review.rating, 0) / data.length;
      setAvgRating(average);
    }
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>
        {i < Math.round(rating) ? "★" : "☆"}
      </span>
    ));
  };
  // 1. Determine the percentage discount (assuming discountPrice holds the PERCENTAGE value, e.g., 10 for 10%)
    const percentOff = Number(discountPrice) || 0;

    // 2. Check if the discount is valid (must be between 0 and 100)
    const isValidDiscount = percentOff > 0 && percentOff < 100;
    
    // 3. Calculate the final discounted price
    const discountedPriceValue = isValidDiscount
        ? price - (price * percentOff / 100)
        : price;

    // 4. Update hasDiscount based on the percentage being valid
    const hasDiscount = isValidDiscount;

    console.log(discountedPriceValue)
    console.log(isValidDiscount)
    console.log("discount price is: ",discountedPriceValue);
    
    // --- ⭐ FIXED MATH LOGIC END ---

  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      className="cursor-pointer block group shadow-md rounded-md py-5"
      to={`/product/${id}`}
    >
      {/* Image */}
      <div className="w-full aspect-[4/3] rounded-md overflow-hidden flex items-center justify-center">
        <img
          src={image[0]}
          alt={name}
          className="h-full w-auto object-contain transition-t ransform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Offer */}
      <div className="mt-3 px-5">
        <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs">
          Christmas Sale
        </span>
      </div>

      {/* Product Name */}
      <p className="mt-2 text-xs md:text-sm font-light text-gray-900 text-left pl-5 line-clamp-2">
        {name}
      </p>

      {/* ⭐ Rating + (Count) */}
      <div className="pl-5 mt-1 text-sm text-yellow-500 flex items-center">
        {renderStars(avgRating)}
        <span className="ml-2 text-gray-600 text-xs">
          ({reviews.length})
        </span>
      </div>

      {/* Price
      <div className="text-start mt-1 space-x-2 px-5">
        <span className="line-through text-gray-500 text-xs">
          {currency}
          {(price * 1.2).toFixed(0)}
        </span>

        <span className="text-black font-semibold text-sm">
          {currency}
          {price}
        </span>
      </div> */}
      {/* Price Section */}
            <div className="text-start mt-1 space-x-2 px-5">
                {hasDiscount ? (
                    <>
                        {/* Old Price */}
                        <span className="line-through text-gray-500 text-xs">
                            {currency}{price}
                        </span>

                        {/* Discount Price - Use the newly calculated value */}
                        <span className="text-black font-semibold text-sm">
                            {currency}{discountedPriceValue.toFixed(2)}
                        </span>

                        {/* % OFF - Use the value straight from the percentage variable */}
                        <span className="text-green-600 text-xs font-medium">
                            {percentOff}% OFF
                        </span>
                    </>
                ) : (
                    // Normal Price
                    <span className="text-black font-semibold text-sm">
                        {currency}{price}
                    </span>
                )}
            </div>
    </Link>
  );
};

export default ProductItem;
