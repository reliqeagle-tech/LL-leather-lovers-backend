// import React,{useState} from 'react';
// import { FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Social icons from react-icons
// import { Link } from 'react-router-dom';
// import NewsletterBox from './NewsletterBox';


// const Footer = () => {
//   const isDevelopment = import.meta.env.MODE === 'development'
//     const backendUrl = isDevelopment ? import.meta.env.VITE_BACKEND_URL_D : import.meta.env.VITE_BACKEND_URL
//     const [loading, setLoading] = useState(false);

//     const onSubmitHandler = async (event) => {
//       event.preventDefault();
//       const email = event.target.email.value;

//       console.log(backendUrl)
//       setLoading(true);
//       try {
//         const res = await fetch(`${backendUrl}/api/user/send-mail`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         });

//         const data = await res.json();

//         if (data.success) {
//           alert("🎉 Subscription successful! Check your email.");
//           event.target.reset();
//         } else {
//           alert("⚠️ Error: " + data.message);
//         }
//       } catch (error) {
//         alert("❌ Error subscribing: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//   return (
//     <footer className="bg-black text-white py-12 px-4">
//   <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">

//     {/* Main Grid */}
//     <div className="
//       grid
//       grid-cols-1
//       sm:grid-cols-2
//       md:grid-cols-3
//       lg:grid-cols-6
//       gap-10
//       mb-12
//     ">
//       {/* Column 1 - INFO */}
//       <div className="space-y-4 text-center sm:text-left">
//         <h4 className="text-lg font-semibold text-gray-200 uppercase tracking-wide">INFO</h4>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
//           <li><Link to="/about" className="hover:text-white">About Us</Link></li>
//           <li><Link to="/orders" className="hover:text-white">Shipping & Returns</Link></li>
//           <li><Link to="/about" className="hover:text-white">Our Quality</Link></li>
//           {/* <li><Link to="" className="hover:text-white">Customer Gallery</Link></li>
//           <li><Link to="/CmInchConverter" className="hover:text-white">Cm to Inch Converter</Link></li> */}
//           <li><Link to="" className="hover:text-white">Leather Waxing</Link></li>
//           <li><Link to="" className="hover:text-white">Sizing Chart</Link></li>
//           <li><Link to="/bestseller" className="hover:text-white">Best Sellers</Link></li>
//           {/* <li><Link to="" className="hover:text-white">Testimonials</Link></li> */}
//         </ul>
//       </div>

//       {/* Column 2 - Women */}
//       <div className="space-y-4 text-center sm:text-left">
//         <h4 className="text-lg font-semibold text-gray-200 uppercase tracking-wide">Women's Collection</h4>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li><Link to="/collection?category=Women&sub=Topwear" className="hover:text-white">Women Leather Jackets</Link></li>
//           <li><Link to="/collection?category=Women&sub=Topwear" className="hover:text-white">Bomber Biker Jacket</Link></li>
//           <li><Link to="/collection?category=Women&sub=Topwear" className="hover:text-white">Moto Biker Jacket</Link></li>
//           <li><Link to="/collection?category=Women&sub=Topwear" className="hover:text-white">Women Winter Wear</Link></li>
//           <li><Link to="/collection?category=Women&sub=Topwear" className="hover:text-white">Women Night Dress</Link></li>
//           <li><Link to="/collection?category=Women&sub=Bottomwear" className="hover:text-white">Leather Pencil Skirt</Link></li>
//           <li><Link to="/collection?category=Women&sub=Bottomwear" className="hover:text-white">Leather Full Skirt</Link></li>
//           <li><Link to="/collection?category=Women&sub=Bottomwear" className="hover:text-white">Slim Bodycon Skirt</Link></li>
//         </ul>
//       </div>

//       {/* Column 3 - Men */}
//       <div className="space-y-4 text-center sm:text-left">
//         <h4 className="text-lg font-semibold text-gray-200 uppercase tracking-wide">Men's Collection</h4>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li><Link to="/collection?category=Men&sub=Topwear" className="hover:text-white">Men Leather Jackets</Link></li>
//           <li><Link to="/collection?category=Men&sub=Topwear" className="hover:text-white">Coats</Link></li>
//           <li><Link to="/collection?category=Men&sub=Topwear" className="hover:text-white">Bomber Biker Jacket</Link></li>
//           {/* <li><Link to="/collection?category=Men&sub=Topwear" className="hover:text-white">Leather Long Coats</Link></li>
//           <li><Link to="/collection?category=Men&sub=Topwear" className="hover:text-white">Leather Suits</Link></li>
//           <li><Link to="/collection?category=Men&sub=Bottomwear" className="hover:text-white">Leather Shorts</Link></li>
//           <li><Link to="/collection?category=Men&sub=Celebrity" className="hover:text-white">Celebrity Leather Jackets</Link></li>
//           <li><Link to="/collection?category=Men&sub=Topwear" className="hover:text-white">Leather Blazers</Link></li> */}
//         </ul>
//       </div>

//       {/* Column 4 - Accessories */}
//       <div className="space-y-4 text-center sm:text-left">
//         <h4 className="text-lg font-semibold text-gray-200 uppercase tracking-wide">Others</h4>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li><Link to="/collection?category=Others&sub=Pillow" className="hover:text-white">Pillow Covers</Link></li>
//           <li><Link to="/collection?category=Others&sub=Cushion Cover" className="hover:text-white">Cushion Cover</Link></li>
//           <li><Link to="/collection?category=Others&sub=Aprons" className="hover:text-white">Aprons</Link></li>
//           <li><Link to="/collection?category=Others&sub=Desk Mat" className="hover:text-white">Desk Mat</Link></li>
//           <li><Link to="/collection?category=Others&sub=Chair Cover" className="hover:text-white">Recliner Chair Headrest Cover</Link></li>
//           {/* <li><a href="#" className="hover:text-white">Leather Hood</a></li>
//           <li><a href="#" className="hover:text-white">Leather Belt</a></li>
//           <li><a href="#" className="hover:text-white">Pillow Cover</a></li> */}
//         </ul>
//       </div>

//       {/* Column 5 - New Arrivals */}
//       <div className="space-y-4 text-center sm:text-left">
//         <h4 className="text-lg font-semibold text-gray-200 uppercase tracking-wide">New Arrivals</h4>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li><a href="/collection?category=Men&sub=Topwear" className="hover:text-white">Men's New Arrivals</a></li>
//           <li><a href="collection?category=Women&sub=Topwear" className="hover:text-white">Women's New Arrivals</a></li>
//         </ul>
//       </div>

//       {/* Column 6 - Newsletter */}
//       <div className="space-y-4 text-center sm:text-left">
//         <h4 className="text-lg font-semibold text-gray-200 uppercase tracking-wide">Newsletter</h4>
//         <p className="text-sm text-gray-400">
//           Join the LL Leather Lovers mailing list for the latest arrivals, events, collections, and offers.
//         </p>

//         <form onSubmit={onSubmitHandler} className="relative">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
//           >
//             &gt;
//           </button>
//         </form>

//         <div className="flex justify-center sm:justify-start space-x-4 pt-2">
//           <FaEnvelope size={16} className="text-gray-400 hover:text-white" />
//           <FaFacebookF size={16} className="text-gray-400 hover:text-white" />
//           <FaInstagram size={16} className="text-gray-400 hover:text-white" />
//           <FaTwitter size={16} className="text-gray-400 hover:text-white" />
//         </div>
//       </div>
//     </div>

//     {/* Bottom copyright */}
//     <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
//       COPYRIGHT © 2025 llleatherlovers.com — All Rights Reserved — Privacy Policy
//     </div>
//   </div>
// </footer>

//   );
// };

// export default Footer;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const buildUrl = (categoryName, subCategory) =>
  `/collection?category=${encodeURIComponent(categoryName)}&sub=${encodeURIComponent(subCategory)}`;

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to}
      className="text-white/70 hover:text-indigo-400 transition-colors duration-200 inline-flex items-center gap-1 group"
      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", lineHeight: "1.9" }}>
      <span className="w-0 group-hover:w-4 h-px bg-indigo-400 inline-block transition-all duration-300 overflow-hidden" />
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const isDevelopment = import.meta.env.MODE === 'development';
  const backendUrl = isDevelopment ? import.meta.env.VITE_BACKEND_URL_D : import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [categories, setCategories] = useState([]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/user/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        event.target.reset();
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/category/list`
        );

        if (res.data.success) {
          setCategories(res.data.categories || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [backendUrl]);

  return (
    <footer style={{ background: "linear-gradient(180deg, #09090f 0%, #060610 100%)" }}
      className="relative overflow-hidden">

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

      {/* Watermark */}
      <div className="absolute bottom-8 right-0 pointer-events-none select-none hidden lg:block overflow-hidden">
        <p className="text-white font-light"
          style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: "120px",
            fontWeight: 300, opacity: 0.055, letterSpacing: "0.1em", lineHeight: 1
          }}>
          LEATHER
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ── TOP: Brand + Tagline ── */}
        <div className="py-12 border-b border-white/[0.06] flex flex-col md:flex-row
          md:items-center md:justify-between gap-6">

          {/* Logo + tagline */}
          <div>
            <p className="text-white font-light mb-1"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "28px", letterSpacing: "-0.01em" }}>
              LL <span className="font-normal">Leather</span>{" "}
              <span className="text-indigo-400 italic">Lovers</span>
            </p>
            <p className="text-white/55"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", letterSpacing: "2px" }}>
              Premium Leather · Crafted Since 2020
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { label: "Email", path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6", type: "poly" },
              { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z" },
              { label: "Twitter / X", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
            ].map(({ label, path }) => (
              <button key={label}
                className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03]
                  flex items-center justify-center text-white/55
                  hover:bg-indigo-600/20 hover:border-indigo-500/40 hover:text-indigo-300
                  transition-all duration-300"
                aria-label={label}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6
          border-b border-white/[0.06]">

          {/* INFO */}
          <div className="col-span-1">
            <p className="text-white/80 font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
              Info
            </p>
            <ul className="space-y-0.5">
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/orders">Shipping & Returns</FooterLink>
              <FooterLink to="/about">Our Quality</FooterLink>
              <FooterLink to="">Leather Waxing</FooterLink>
              <FooterLink to="">Sizing Chart</FooterLink>
              <FooterLink to="/bestseller">Best Sellers</FooterLink>
            </ul>
          </div>

          {/* WOMEN */}
          {/* <div className="col-span-1">
            <p className="text-white/60 font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
              Women
            </p>
            <ul className="space-y-0.5">
              <FooterLink to="/collection?category=Women&sub=Topwear">Leather Jackets</FooterLink>
              <FooterLink to="/collection?category=Women&sub=Topwear">Bomber Jacket</FooterLink>
              <FooterLink to="/collection?category=Women&sub=Topwear">Moto Biker Jacket</FooterLink>
              <FooterLink to="/collection?category=Women&sub=Topwear">Winter Wear</FooterLink>
              <FooterLink to="/collection?category=Women&sub=Bottomwear">Pencil Skirt</FooterLink>
              <FooterLink to="/collection?category=Women&sub=Bottomwear">Full Skirt</FooterLink>
              <FooterLink to="/collection?category=Women&sub=Bottomwear">Bodycon Skirt</FooterLink>
            </ul>
          </div> */}

          {/* MEN */}
          {/* <div className="col-span-1">
            <p className="text-white/60 font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
              Men
            </p>
            <ul className="space-y-0.5">
              <FooterLink to="/collection?category=Men&sub=Topwear">Leather Jackets</FooterLink>
              <FooterLink to="/collection?category=Men&sub=Topwear">Coats</FooterLink>
              <FooterLink to="/collection?category=Men&sub=Topwear">Bomber Jacket</FooterLink>
              <FooterLink to="/collection?category=Men&sub=Topwear">Blazers</FooterLink>
              <FooterLink to="/collection?category=Men&sub=Bottomwear">Leather Shorts</FooterLink>
            </ul>
          </div> */}

          {/* OTHERS */}
          {/* <div className="col-span-1">
            <p className="text-white/60 font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
              Others
            </p>
            <ul className="space-y-0.5">
              <FooterLink to="/collection?category=Others&sub=Pillow">Pillow Covers</FooterLink>
              <FooterLink to="/collection?category=Others&sub=Cushion Cover">Cushion Cover</FooterLink>
              <FooterLink to="/collection?category=Others&sub=Aprons">Aprons</FooterLink>
              <FooterLink to="/collection?category=Others&sub=Desk Mat">Desk Mat</FooterLink>
              <FooterLink to="/collection?category=Others&sub=Chair Cover">Chair Cover</FooterLink>
            </ul>
          </div> */}

          {categories.map((category) => (
            <div key={category._id}>
              <p
                className="text-white/80 font-semibold uppercase tracking-widest mb-5"
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "9px",
                  letterSpacing: "3px"
                }}
              >
                {category.categoryName}
              </p>

              <ul className="space-y-0.5">
                {category.subCategories?.map((sub) => (
                  <FooterLink
                    key={sub}
                    to={buildUrl(category.categoryName, sub)}
                  >
                    {sub}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}

          {/* NEW ARRIVALS */}
          <div className="col-span-1">
            <p className="text-white/80 font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
              New Arrivals
            </p>
            <ul className="space-y-0.5">
              {/* <FooterLink to="/collection?category=Men&sub=Topwear">Men's Arrivals</FooterLink>
              <FooterLink to="/collection?category=Women&sub=Topwear">Women's Arrivals</FooterLink> */}
              {categories.slice(0, 3).map((category) => (
                category.subCategories?.length > 0 && (
                  <FooterLink
                    key={category._id}
                    to={buildUrl(
                      category.categoryName,
                      category.subCategories[0]
                    )}
                  >
                    {/* {category.categoryName}'s Arrivals */}
                    {category.categoryName === "Men"
                      ? "Men's Arrivals"
                      : category.categoryName === "Women"
                        ? "Women's Arrivals"
                        : `${category.categoryName} Arrivals`}
                  </FooterLink>
                )
              ))}
            </ul>

            {/* Trust badges */}
            <div className="mt-8 space-y-2.5">
              {[
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Genuine Leather" },
                { icon: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5", label: "Easy Returns" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-indigo-600/15 border border-indigo-500/20
                    flex items-center justify-center shrink-0">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round">
                      <path d={icon} />
                    </svg>
                  </div>
                  <span className="text-white/70"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-white/80 font-semibold uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
              Join Our Community
            </p>
            <p className="text-white/70 mb-4 leading-relaxed"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", lineHeight: "1.7" }}>
              Get latest arrivals, exclusive offers, and leather care tips — straight to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                rounded-lg px-3 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#4ade80" strokeWidth="2" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-green-400"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px" }}>
                  You're subscribed!
                </span>
              </div>
            ) : (
              <form onSubmit={onSubmitHandler} className="space-y-2">
                <div className="relative">
                  <input
                    type="email" name="email"
                    placeholder="your@email.com"
                    required disabled={loading}
                    className="w-full px-3 py-2.5 rounded-full text-white/80 placeholder-white/40
                      focus:outline-none focus:ring-1 focus:ring-indigo-500/50
                      disabled:opacity-50 transition-all"
                    style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-2.5 rounded-full text-white font-semibold uppercase tracking-widest
                    hover:opacity-90 transition-opacity disabled:opacity-50 relative overflow-hidden group"
                  style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    letterSpacing: "2px", background: "#6366f1"
                  }}>
                  <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100
                    origin-left transition-transform duration-300" />
                  <span className="relative z-10">{loading ? "Sending…" : "Subscribe"}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "1px" }}>
            © {new Date().getFullYear()} llleatherlovers.com · All Rights Reserved
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
              <a key={item} href="#"
                className="text-white/40 hover:text-white/50 transition-colors"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "0.5px" }}>
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;