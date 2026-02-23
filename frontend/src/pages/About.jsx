// import React from "react";
// import Title from "../components/Title";
// import { assets } from "../assets/assets";
// import NewsletterBox from "../components/NewsletterBox";

// const About = () => {
//   return (
//     <div className="px-10 pb-10">
//       <div className="text-2xl text-center pt-8 border-t">
//         <Title text1={"ABOUT"} text2={"US"} />
//       </div>

//       <div className="my-10 flex flex-col md:flex-row gap-16">
//         <img
//           className="w-full md:max-w-[600px] h-[50vh] rounded-md"
//           src={assets.aboutUsImg}
//           alt=""
//         />
//         <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
//           <p>
//             LL Leather Lovers was founded from a deep appreciation for genuine
//             craftsmanship and a passion for authentic leather. Our story began
//             with a simple vision: to offer premium leather products that blend
//             timeless elegance with exceptional durability.
//           </p>

//           <p>
//             From the beginning, we have focused on delivering high-quality
//             leather clothing and luxurious leather pillow covers, each crafted
//             with care from the finest materials. Every piece in our collection
//             is designed to bring sophistication, comfort, and lasting value to
//             your everyday life.
//           </p>

//           <b className="text-gray-800">Our Mission</b>

//           <p>
//             Our mission at LL Leather Lovers is to celebrate the beauty of
//             authentic leather by creating products that stand the test of time.
//             We are committed to exceptional craftsmanship, premium materials,
//             and delivering an experience that leather lovers can trust and
//             appreciate.
//           </p>
//         </div>
//       </div>

//       <div className=" text-xl py-4 text-center">
//         <Title text1={"WHY"} text2={"CHOOSE US"} />
//       </div>

//       <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6 pb-10">
//         <div className="border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc] ">
//           <b className="font-bold">Quality Assurance</b>
//           <p className=" text-gray-600">
//             We meticulously select and vet each product to ensure it meets our
//             stringent quality standards. Every item goes through multiple layers
//             of inspection, from material durability and stitching strength to
//             design accuracy and finish.
//           </p>
//         </div>
//         <div className="border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc]">
//           <b>Convenience</b>
//           <p className=" text-gray-600">
//             With our user-friendly interface and hassle-free ordering process,
//             shopping has never been easier. From intuitive navigation and smart
//             search filters to secure checkout and multiple payment options.
//           </p>
//         </div>
//         <div className="border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc]">
//           <b>Exceptional Customer Service</b>
//           <p className=" text-gray-600">
//             Our team of dedicated professionals is here to assist you every step
//             of the way, ensuring your satisfaction is our top priority. Whether
//             you need help choosing the right product, have questions about your
//             order.
//           </p>
//         </div>
//         <div className="border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc]">
//           <b>Fast & Reliable Delivery</b>
//           <p className=" text-gray-600">
//             We ensure your orders reach you quickly and safely, with reliable
//             shipping partners and real-time tracking. Your products arrive on
//             time, every time, so you can enjoy them without delay.
//           </p>
//         </div>
//         <div className="border px-5 md:px-10 py-5 sm:py-10 flex flex-col gap-5 mx-5 shadow-lg rounded-lg bg-[#f9fafc] ">
//           <b>Sustainable Practices</b>
//           <p className=" text-gray-600">
//             We are committed to eco-friendly sourcing and packaging. From
//             ethically produced materials to recyclable packaging, we strive to
//             reduce our environmental footprint while delivering high-quality
//             products.
//           </p>
//         </div>
//       </div>

//       <NewsletterBox />
//     </div>
//   );
// };

// export default About;





import React, { useRef, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const whyUs = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    tag: "01", title: "Quality Assurance",
    body: "Every hide is hand-selected and inspected across multiple layers — from material durability and stitching strength to design accuracy and finish quality.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    tag: "02", title: "Seamless Shopping",
    body: "Intuitive navigation, smart search filters, secure checkout and multiple payment options — we've removed every friction point from the shopping experience.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    tag: "03", title: "Expert Support 24/7",
    body: "Our leather specialists are available around the clock — for sizing advice, care tips, or custom queries. We respond within the hour, every time.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    tag: "04", title: "Fast & Tracked Delivery",
    body: "Direct from workshop to wardrobe — tracked, insured, and packaged in our signature protective wrapping. No middlemen, no delays.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
      </svg>
    ),
    tag: "05", title: "Sustainable Practices",
    body: "Ethically sourced hides, recyclable packaging, responsible tanneries. We believe genuine luxury and genuine responsibility go hand in hand.",
  },
];

const stats = [
  { value: "2020", label: "Est. Year" },
  { value: "500+", label: "Products" },
  { value: "10K+", label: "Customers" },
  { value: "4.9★", label: "Avg Rating" },
];

const useReveal = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, visible];
};

// Simple reveal wrapper using inline transition styles (no vanilla CSS classes)
const Reveal = ({ children, visible, delay = 0 }) => (
  <div style={{
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  }}>
    {children}
  </div>
);

const About = () => {
  const [heroRef, heroVisible] = useReveal();
  const [missionRef, missionVisible] = useReveal();
  const [whyRef, whyVisible] = useReveal();

  return (
    <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }} className="min-h-screen">

      {/* ══ SECTION 1 — HERO / STORY ══ */}
      <section ref={heroRef} className="relative overflow-hidden py-16 sm:py-20 lg:py-24">

        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Page heading */}
          <Reveal visible={heroVisible} delay={0}>
            <div className="text-center mb-14">
              <p className="text-indigo-400 font-semibold mb-3 tracking-widest uppercase text-xs"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Our Story
              </p>
              <h1 className="text-white leading-tight tracking-tight font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,60px)" }}>
                About{" "}
                <em className="text-indigo-400 italic font-light">LL Leather Lovers</em>
              </h1>
              <div className="w-12 h-px mx-auto mt-5"
                style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
            </div>
          </Reveal>

          {/* Image + Story */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Image */}
            <Reveal visible={heroVisible} delay={0.15}>
              <div className="lg:w-full relative">
                <img
                  src={assets.aboutUsImg}
                  alt="LL Leather Lovers Workshop"
                  className="relative z-10 w-full rounded-xl object-cover transition-transform duration-700 hover:-translate-y-1 hover:scale-[1.015]"
                  style={{ maxHeight: "500px", objectPosition: "center",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
                />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-10 h-px bg-indigo-500/40" />
                <div className="absolute top-0 left-0 w-px h-10 bg-indigo-500/40" />
                <div className="absolute bottom-0 right-0 w-10 h-px bg-amber-600/40" />
                <div className="absolute bottom-0 right-0 w-px h-10 bg-amber-600/40" />
              </div>
            </Reveal>

            {/* Story text */}
            <Reveal visible={heroVisible} delay={0.25}>
              <div className="lg:w-full flex flex-col justify-center">

                <p className="mb-3 inline-flex items-center gap-2 uppercase font-semibold"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                    letterSpacing: "4px", color: "#c97c3a" }}>
                  <span className="w-6 h-px bg-amber-600/60 inline-block" />
                  Founded 2020
                </p>

                <h2 className="text-white leading-tight mb-5 font-light"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,3.5vw,40px)" }}>
                  Where Passion Meets{" "}
                  <em style={{ fontStyle: "italic", color: "#c97c3a" }}>Craft</em>
                </h2>

                <div className="space-y-4 mb-8 text-white/45"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13.5px", lineHeight: "1.85" }}>
                  <p>
                    LL Leather Lovers was founded from a deep appreciation for genuine craftsmanship
                    and a passion for authentic leather. Our story began with a simple vision: to offer
                    premium leather products that blend timeless elegance with exceptional durability.
                  </p>
                  <p>
                    From leather clothing to luxurious pillow covers, every piece in our collection is
                    crafted from the finest hides, finished by hand — designed to bring sophistication,
                    comfort, and lasting value to your everyday life.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.07]">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <p className="text-white font-light leading-none"
                        style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(22px,3vw,30px)" }}>
                        {value}
                      </p>
                      <p className="text-white/25 mt-1.5 uppercase tracking-widest"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "2px" }}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — MISSION ══ */}
      <section ref={missionRef} className="relative overflow-hidden py-14 sm:py-16"
        style={{ background: "linear-gradient(135deg, #1a0e05 0%, #1e1208 50%, #150d06 100%)" }}>

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,124,58,0.4), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-72 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(201,124,58,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Reveal visible={missionVisible} delay={0}>
            <p className="inline-flex items-center gap-3 font-semibold uppercase mb-4"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                letterSpacing: "4px", color: "#c97c3a" }}>
              <span className="w-6 h-px bg-amber-700/60 inline-block" />
              Our Mission
              <span className="w-6 h-px bg-amber-700/60 inline-block" />
            </p>

            <h2 className="text-white leading-tight tracking-tight font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,50px)" }}>
              Celebrating the Beauty of{" "}
              <em style={{ fontStyle: "italic", color: "#c97c3a" }}>Authentic Leather</em>
            </h2>

            <div className="w-12 h-px mx-auto mb-7"
              style={{ background: "linear-gradient(90deg, transparent, #c97c3a, transparent)" }} />

            <p className="text-white/40 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", lineHeight: "1.9" }}>
              Our mission is to celebrate the beauty of authentic leather by creating products that
              stand the test of time. We are committed to exceptional craftsmanship, premium materials,
              and delivering an experience that leather lovers can trust — and be proud to wear.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 3 — WHY CHOOSE US ══ */}
      <section ref={whyRef} className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: "linear-gradient(180deg, #0b0b14 0%, #08080f 100%)" }}>

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-2xl h-80"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Heading */}
          <Reveal visible={whyVisible} delay={0}>
            <div className="text-center mb-12">
              <p className="text-indigo-400 font-semibold mb-3 tracking-widest uppercase text-xs"
                style={{ fontFamily: "'Montserrat',sans-serif" }}>
                The LL Difference
              </p>
              <h2 className="text-white leading-tight font-light"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,4vw,50px)" }}>
                Why Choose{" "}
                <em className="text-indigo-400 italic font-light">Us</em>
              </h2>
              <div className="w-12 h-px mx-auto mt-5"
                style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
            </div>
          </Reveal>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {whyUs.map((item, i) => (
              <Reveal key={i} visible={whyVisible} delay={0.1 + i * 0.08}>
                <div className="h-full rounded-xl p-6 flex flex-col gap-0 relative overflow-hidden
                  border border-white/[0.07] bg-white/[0.03]
                  hover:bg-white/[0.05] hover:border-amber-600/30
                  hover:-translate-y-1 hover:shadow-2xl
                  transition-all duration-300 group">

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full
                    transition-all duration-500 rounded-t-xl"
                    style={{ background: "linear-gradient(90deg, #c97c3a, #6366f1)" }} />

                  {/* Icon box */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5
                    border border-amber-600/20 bg-amber-600/[0.08] text-amber-500
                    group-hover:bg-amber-600/[0.15] group-hover:border-amber-600/40
                    group-hover:shadow-lg transition-all duration-300"
                    style={{ boxShadow: undefined }}>
                    {item.icon}
                  </div>

                  {/* Tag */}
                  <p className="text-white/25 font-semibold uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
                    {item.tag}
                  </p>

                  {/* Title */}
                  <h3 className="text-white font-normal leading-tight mb-3"
                    style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px,2vw,22px)" }}>
                    {item.title}
                  </h3>

                  {/* Body */}
                  <p className="text-white/40 flex-1"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12.5px", lineHeight: "1.8" }}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      <NewsletterBox />

    </div>
  );
};

export default About;