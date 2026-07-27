import React, { useRef, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { Helmet } from "react-helmet-async";

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

const Reveal = ({ children, visible, delay = 0 }) => (
  <div style={{
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  }}>
    {children}
  </div>
);

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Our Store",
    lines: ["Reliq Eagle, 511, Maranpur, Opposite Shiv Mandir, Gaya Bypass, Road, opposite Shiv Mandir, OTA, Gaya, Bihar 823001"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.88a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
      </svg>
    ),
    label: "Phone",
    lines: ["91 90881 10999"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    lines: ["info@llleatherlovers.com"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Hours",
    lines: ["Mon – Fri: 9am – 6pm", "Sat: 10am – 4pm"],
  },
];

const Contact = () => {
  const [heroRef, heroVisible] = useReveal();
  const [cardsRef, cardsVisible] = useReveal();

  return (
    <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }} className="min-h-screen">

      <Helmet>
        <title>Contact Us | LL Leather Lovers</title>
        <meta name="description" content="Contact LL Leather Lovers for premium leather jackets, pillow covers, desk pads, aprons, bespoke orders and customer support." />
        <link rel="canonical" href="https://llleatherlovers.com/contact" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us | LL Leather Lovers" />
        <meta property="og:description" content="Contact LL Leather Lovers for premium leather jackets, pillow covers, desk pads, aprons, bespoke orders and customer support." />
        <meta property="og:url" content="https://llleatherlovers.com/contact" />
        <meta property="og:image" content="https://llleatherlovers.com/ll_leatherlovers_title.webp" />
        <meta property="og:site_name" content="LL Leather Lovers" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | LL Leather Lovers" />
        <meta name="twitter:description" content="Contact LL Leather Lovers for premium leather jackets, pillow covers, desk pads, aprons, bespoke orders and customer support." />
        <meta name="twitter:image" content="https://llleatherlovers.com/ll_leatherlovers_title.webp" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LL Leather Lovers",
            "url": "https://llleatherlovers.com",
            "logo": "https://llleatherlovers.com/ll_leatherlovers_title.webp",

            "address": {
              "@type": "PostalAddress",
              "streetAddress":
                "Reliq Eagle, 511, Maranpur, Opposite Shiv Mandir, Gaya Bypass Road",
              "addressLocality": "Gaya",
              "addressRegion": "Bihar",
              "postalCode": "823001",
              "addressCountry": "IN"
            },

            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-9088110999",
                "contactType": "customer support",
                "email": "info@llleatherlovers.com",
                "availableLanguage": [
                  "English",
                  "Hindi"
                ]
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://llleatherlovers.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://llleatherlovers.com/contact"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us | LL Leather Lovers",
            "url": "https://llleatherlovers.com/contact",
            "description":
              "Contact LL Leather Lovers for premium leather jackets, pillow covers, desk pads, aprons, bespoke orders and customer support."
          })}
        </script>
      </Helmet>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative overflow-hidden py-10">

        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Heading */}
          <Reveal visible={heroVisible} delay={0}>
            <div className="text-center mb-8">
              <p className="text-indigo-400 font-semibold mb-1 tracking-widest uppercase"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "4px" }}>
                Get In Touch
              </p>
              <h1 className="text-white leading-tight tracking-tight font-light"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,5vw,60px)" }}>
                Contact{" "}
                <em className="text-indigo-400 italic font-light">Us</em>
              </h1>
              <div className="w-40 h-[2px] mx-auto mt-2"
                style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
              <p className="text-white/55 max-w-md mx-auto mt-4 leading-relaxed"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "13px" }}>
                We'd love to hear from you — whether it's a question about our leather, your order, or just to say hello.
              </p>
            </div>
          </Reveal>

          {/* Main layout: Image + Info */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">

            {/* ── LEFT: Image ── */}
            <div className="lg:w-[48%]" style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}>
              <div className="relative h-full" style={{ minHeight: "420px" }}>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-10 h-px bg-indigo-500/40 z-10" />
                <div className="absolute top-0 left-0 w-px h-10 bg-indigo-500/40 z-10" />
                <div className="absolute bottom-0 right-0 w-10 h-px bg-amber-600/40 z-10" />
                <div className="absolute bottom-0 right-0 w-px h-10 bg-amber-600/40 z-10" />

                <img
                  src={assets.contactImg}
                  alt="LL Leather Lovers Store"
                  className="w-full h-full rounded-xl object-cover transition-transform duration-700 hover:scale-[1.015]"
                  style={{ objectPosition: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
                />

                {/* Floating info card — high contrast */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-60 z-20 rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(8,8,15,0.92)", backdropFilter: "blur(16px)",
                    border: "1px solid rgba(99,102,241,0.35)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)"
                  }}>

                  {/* Indigo top stripe */}
                  <div className="h-0.5 w-full"
                    style={{ background: "linear-gradient(90deg, #6366f1, #a5b4fc, transparent)" }} />

                  <div className="p-4">
                    {/* Open Now pill */}
                    <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30
                      rounded-full px-2.5 py-1 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      <p className="text-green-400 font-semibold uppercase tracking-widest"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "2px" }}>
                        Open Now
                      </p>
                    </div>

                    {/* Brand name */}
                    <p className="text-white font-light leading-tight mb-1"
                      style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "20px" }}>
                      LL Leather Lovers
                    </p>

                    {/* Location row */}
                    <div className="flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(99,102,241,0.8)" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p className="text-white/50"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px" }}>
                        Gaya Bypass, Road OTA, Gaya, Bihar 823001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Info + Careers ── */}
            <div className="lg:w-[52%] flex flex-col gap-5">

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, i) => (
                  <Reveal key={i} visible={heroVisible} delay={0.2 + i * 0.08}>
                    <div className="rounded-xl p-5 border border-white/[0.07] bg-white/[0.03]
                      hover:bg-white/[0.05] hover:border-indigo-500/30
                      hover:-translate-y-0.5 hover:shadow-xl
                      transition-all duration-300 group h-full">

                      {/* Top accent line on hover */}
                      <div className="h-0.5 w-0 group-hover:w-full mb-4 rounded-full
                        transition-all duration-500"
                        style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }} />

                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4
                        border border-indigo-500/20 bg-indigo-500/[0.08] text-indigo-400
                        group-hover:bg-indigo-500/[0.15] group-hover:border-indigo-500/40
                        transition-all duration-300">
                        {info.icon}
                      </div>

                      {/* Label */}
                      <p className="text-white/30 font-semibold uppercase tracking-widest mb-2"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "2.5px" }}>
                        {info.label}
                      </p>

                      {/* Lines */}
                      {info.lines.map((line, j) => (
                        <p key={j} className="text-white/65"
                          style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12.5px", lineHeight: "1.7" }}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Careers card */}
              <Reveal visible={heroVisible} delay={0.55}>
                <div className="rounded-xl overflow-hidden border border-white/[0.07]"
                  style={{ background: "linear-gradient(135deg, #1a0e05 0%, #1e1208 100%)" }}>

                  <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div>
                      <p className="font-semibold uppercase tracking-widest mb-2"
                        style={{
                          fontFamily: "'Montserrat',sans-serif", fontSize: "9px",
                          letterSpacing: "3px", color: "#c97c3a"
                        }}>
                        Join Our Team
                      </p>
                      <h3 className="text-white font-light mb-2"
                        style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2.5vw,26px)" }}>
                        Careers at{" "}
                        <em style={{ fontStyle: "italic", color: "#c97c3a" }}>LL Leather Lovers</em>
                      </h3>
                      <p className="text-white/40"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12.5px", lineHeight: "1.7" }}>
                        We're always looking for passionate people who love craft, quality, and leather. Explore our open roles.
                      </p>
                    </div>

                    {/* Explore Jobs button */}
                    <button
                      className="relative overflow-hidden shrink-0 border border-indigo-500/50 hover:border-none text-white
                        rounded-full px-7 py-3 transition-all duration-300 hover:-translate-y-0.5
                        hover:shadow-lg hover:border-indigo-400 group/btn whitespace-nowrap"
                      style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
                        fontWeight: 600, letterSpacing: "2px",
                        boxShadow: undefined
                      }}>
                      <span className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover/btn:scale-x-100
                        origin-left transition-transform duration-300 rounded-full" />
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Jobs
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {/* Amber bottom stripe */}
                  <div className="h-px w-full"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(201,124,58,0.5), transparent)" }} />
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      <NewsletterBox />

    </div>
  );
};

export default Contact;