   

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const PromoBanner = () => {
  const { banners, backendUrl } = useContext(ShopContext);

  if (!banners || banners.length === 0) return null;

  // Assuming single banner for promo
  const banner = banners[0];

  return (
    <section className="w-full mb-10 overflow-hidden  ">
      {/* Full Horizontal Banner Image */}
      <Link to={"/collection"} className="block">
        <img 
          // src={banner.image} 
          src={assets.bannerL}
          alt={banner.title || "Promo Banner"} 
          className="w-full h-64 md:h-80 lg:h-[400px] object-strech"  // Full width, fixed height, crop to fill horizontally
        />
      </Link>
    </section>
  );
};

export default PromoBanner;