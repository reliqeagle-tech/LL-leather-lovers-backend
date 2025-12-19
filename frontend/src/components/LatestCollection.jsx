import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  const updateProductCount = () => {
    if (window.innerWidth < 640) {
      // Mobile view → show 6
      setLatestProducts(products.slice(0, 6));
    } else {
      // Tablet & Desktop → show 8
      setLatestProducts(products.slice(0, 8));
    }
  };

  useEffect(() => {
    updateProductCount();
    window.addEventListener("resize", updateProductCount);

    return () => {
      window.removeEventListener("resize", updateProductCount);
    };
  }, [products]);

  return (
    <div className="flex items-center justify-center">
    <div className="my-5 container">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection crafted with precision, style, and comfort in mind.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            discountPrice={item.discountPrice}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default LatestCollection;
