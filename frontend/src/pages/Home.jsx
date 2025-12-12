import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Hero1 from '../components/Hero1'
import PromoBanner from '../components/PromoBanner'
import CustomLeather from '../components/customLeather'
import ReviewCarousal from '../components/CustomCollection'
import TrustWorthy from '../components/trustWorthy'

const Home = () => {
  return (
    <div className='px-0'>
      {/* <Hero /> */}
      <Hero1 />
      <LatestCollection/>
      <CustomLeather/>
      <BestSeller/>
      <ReviewCarousal />
      {/* <PromoBanner /> */}
      <TrustWorthy/>
      <NewsletterBox/>
      <OurPolicy/>
    </div>
  )
}

export default Home
