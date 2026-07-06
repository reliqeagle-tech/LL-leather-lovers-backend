import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Hero1 from '../components/Hero1'
import CustomLeather from '../components/customLeather'
import ReviewCarousal from '../components/CustomCollection'
import TrustWorthy from '../components/trustWorthy'

const Home = () => {
  return (
    <div className='px-0'>
      <Hero1 />
      <LatestCollection />
      <CustomLeather />
      <BestSeller />
      <ReviewCarousal />
      <TrustWorthy />
      <NewsletterBox />
      <OurPolicy />
    </div>
  )
}

export default Home
