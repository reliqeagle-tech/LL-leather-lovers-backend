import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
// import LatestCollection from '../components/LatestCollection'
// import BestSeller from '../components/BestSeller'
// import OurPolicy from '../components/OurPolicy'
// import NewsletterBox from '../components/NewsletterBox'
// import CustomLeather from '../components/customLeather'
// import ReviewCarousal from '../components/CustomCollection'
// import TrustWorthy from '../components/trustWorthy'
import Hero1 from '../components/Hero1'

const LatestCollection = lazy(() => import("../components/LatestCollection"));
const BestSeller = lazy(() => import("../components/BestSeller"));
const ReviewCarousal = lazy(() => import("../components/CustomCollection"));
const TrustWorthy = lazy(() => import("../components/trustWorthy"));
const NewsletterBox = lazy(() => import("../components/NewsletterBox"));
const OurPolicy = lazy(() => import("../components/OurPolicy"));
const CustomLeather = lazy(() => import("../components/customLeather"));

const SectionLoader = () => <div className='min-h-[200px]' />

const Home = () => {

  return (
    <>
      <Helmet>
        <title>
          LL Leather Lovers | Premium Leather Jackets, Pillow Covers & Leather Products
        </title>

        <meta
          name="description"
          content="Shop premium leather jackets for men and women, leather pillow covers, recliner headrest covers, desk mats, aprons and handcrafted leather products at LL Leather Lovers."
        />

        <link rel="canonical" href="https://llleatherlovers.com/" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="LL Leather Lovers | Premium Leather Products"
        />
        <meta
          property="og:description"
          content="Discover premium leather jackets, pillow covers, recliner headrest covers, desk mats and handcrafted leather products."
        />
        <meta property="og:url" content="https://llleatherlovers.com/" />
        <meta
          property="og:image"
          content="https://llleatherlovers.com/ll_leatherlovers_title.webp"
        />
        <meta
          property="og:image:alt"
          content="LL Leather Lovers Logo"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="LL Leather Lovers | Premium Leather Products"
        />
        <meta
          name="twitter:description"
          content="Discover premium leather jackets, pillow covers, recliner headrest covers and handcrafted leather products."
        />
        <meta
          name="twitter:image"
          content="https://llleatherlovers.com/ll_leatherlovers_title.webp"
        />
        <meta
          name="twitter:image:alt"
          content="LL Leather Lovers Logo"
        />

        {/* Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "LL Leather Lovers",
            url: "https://llleatherlovers.com/",
            logo: "https://llleatherlovers.com/ll_leatherlovers_title.webp",
            email: "info@llleatherlovers.com"
          })}
        </script>

        {/* Website */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "LL Leather Lovers",
            url: "https://llleatherlovers.com/",
            inLanguage: "en"
          })}
        </script>

        {/* WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Home",
            url: "https://llleatherlovers.com/",
            description:
              "Premium leather jackets, pillow covers, recliner headrest covers, desk mats and handcrafted leather products.",
            inLanguage: "en",
            isPartOf: {
              "@type": "WebSite",
              url: "https://llleatherlovers.com/"
            }
          })}
        </script>
      </Helmet>
      <div className='px-0'>
        <Hero1 />
        {/* <LatestCollection />
        <CustomLeather />
        <BestSeller />
        <ReviewCarousal />
        <TrustWorthy />
        <NewsletterBox />
        <OurPolicy /> */}
        <Suspense fallback={<SectionLoader />}>
          <LatestCollection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <CustomLeather />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <BestSeller />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ReviewCarousal />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TrustWorthy />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <NewsletterBox />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <OurPolicy />
        </Suspense>
      </div>
    </>
  )
}

export default Home
