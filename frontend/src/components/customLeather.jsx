import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
// import ProductItem from './ProductItem';

const CustomLeather = () => {

    // const {products} = useContext(ShopContext);
    // const [bestSeller,setBestSeller] = useState([]);

    // useEffect(()=>{
    //     const bestProduct = products.filter((item)=>(item.bestseller));
    //     setBestSeller(bestProduct.slice(0,5))
    // },[products])

  return (
   <div className="my-10 px-4 sm:px-6 md:px-10 flex flex-col md:flex-row gap-8 md:h-[60vh]">

  {/* Left Text Section */}
  <div className="md:w-1/3 p-2 sm:p-5 flex flex-col justify-center">
    <h1 className="font-normal text-3xl sm:text-4xl md:text-5xl leading-tight">
      <span className="text-indigo-500">Ready-Made</span> <br />
      Leather Luxury
    </h1>

    <p className="pt-4 sm:pt-6 text-sm sm:text-base leading-relaxed text-gray-700">
      Our ready-made leather fits deliver personality without the wait.
      <br /><br />
      From classic biker silhouettes to modern essentials, each piece is crafted
      with premium leather and refined craftsmanship — built for comfort,
      durability, and effortless style.
      <br /><br />
      No shortcuts. No compromises.
      Just authentic leather wear made for real individuality.
    </p>

    <div className="pt-6 sm:pt-8">
      <Link
        to="/collection"
        className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-sm text-sm sm:text-base inline-block"
      >
        Shop Now
      </Link>
    </div>
  </div>

  {/* Right Image Section */}
  <div className="md:w-2/3 p-2 sm:p-5 flex items-center justify-center"> <img className="rounded-md w-full h-[260px] sm:h-[350px] md:h-full object-cover" src={assets.customLeatherImage} alt="" /> </div>

</div>


  )
}

export default CustomLeather