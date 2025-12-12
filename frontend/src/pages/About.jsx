import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='px-10'>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
  <p>
    LL Leather Lovers was founded from a deep appreciation for genuine craftsmanship and a passion for authentic leather. Our story began with a simple vision: to offer premium leather products that blend timeless elegance with exceptional durability.
  </p>

  <p>
    From the beginning, we have focused on delivering high-quality leather clothing and luxurious leather pillow covers, each crafted with care from the finest materials. Every piece in our collection is designed to bring sophistication, comfort, and lasting value to your everyday life.
  </p>

  <b className='text-gray-800'>Our Mission</b>

  <p>
    Our mission at LL Leather Lovers is to celebrate the beauty of authentic leather by creating products that stand the test of time. We are committed to exceptional craftsmanship, premium materials, and delivering an experience that leather lovers can trust and appreciate.
  </p>
</div>

      </div>

      <div className=' text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6 pb-10'>
        <div className='border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc] '>
          <b className='font-bold'>Quality Assurance</b>
          <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards. Every item goes through multiple layers of inspection, from material durability and stitching strength to design accuracy and finish.</p>
        </div>
        <div className='border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc]'>
          <b>Convenience</b>
          <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier. From intuitive navigation and smart search filters to secure checkout and multiple payment options.</p>
        </div>
        <div className='border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc]'>
          <b>Exceptional Customer Service</b>
          <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority. Whether you need help choosing the right product, have questions about your order.</p>
        </div>
        <div className='border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc]'>
          <b>Fast & Reliable Delivery</b>
          <p className=' text-gray-600'>We ensure your orders reach you quickly and safely, with reliable shipping partners and real-time tracking. Your products arrive on time, every time, so you can enjoy them without delay.</p>
        </div>
        <div className='border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc] '>
          <b>Sustainable Practices</b>
          <p className=' text-gray-600'>We are committed to eco-friendly sourcing and packaging. From ethically produced materials to recyclable packaging, we strive to reduce our environmental footprint while delivering high-quality products.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
