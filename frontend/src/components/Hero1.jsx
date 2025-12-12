import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero1 = () => {
  return (
    <div className="px-0 flex flex-col sm:flex-row lg:h-[100vh] rounded-lg">
  <div className="px-0 w-full flex flex-row sm:flex-row justify-center md-py-10 py-0 sm:py-0 bg-gradient-to-r from-black via-black to-indigo-500">

    {/* TEXT SECTION */}
    <div className="w-full sm:w-1/2 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl md:text-[4rem] prata-regular text-white">
        <span className="text-indigo-500 prata-regular ">Latest</span> Arrivals
      </h1>

      <p className="w-44  md:mt-5 md:w-[40%] h-[3px] bg-indigo-500"></p>

      <p className="prata-regular text-md sm:py-2 md:text-[2.5rem] md:leading-[3rem] text-white ">
        This festive season,
        <br />
        take your brand to <br /> millions of homes
      </p>

      <div className="flex items-center gap-2">
        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
        <p className="font-semibold md:text-base text-white">
          <Link to="/collection" className="text-sm md-text-xl" >
            SHOP <span className="text-indigo-500">NOW</span>
          </Link>
        </p>
        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
      </div>
    </div>

    {/* IMAGE SECTION (hidden on mobile) */}
    <div className="md: sm:flex w-full sm:w-1/2 items-end justify-around">
      <img
        className="h-full object-contain object-bottom"
        src={assets.leatherModel}
        alt=""
      />
    </div>

  </div>
</div>


  );
};

export default Hero1;


