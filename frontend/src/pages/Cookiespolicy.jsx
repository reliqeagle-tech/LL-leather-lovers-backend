// import React, { useEffect, useRef, useState } from "react";
// import { Helmet } from "react-helmet-async";

// const sections = [
//     { id: "what", num: "01", title: "What Are Cookies?" },
//     { id: "types", num: "02", title: "Types of Cookies We Use" },
//     { id: "why", num: "03", title: "Why We Use Cookies" },
//     { id: "third-party", num: "04", title: "Third-Party Cookies" },
//     { id: "manage", num: "05", title: "Managing & Disabling Cookies" },
//     { id: "retention", num: "06", title: "Cookie Retention Periods" },
//     { id: "changes", num: "07", title: "Changes to This Policy" },
//     { id: "contact", num: "08", title: "Contact Us" },
// ];

// const CookiesPolicy = () => {
//     const [active, setActive] = useState(sections[0].id);
//     const [tocOpen, setTocOpen] = useState(false);
//     const sectionRefs = useRef({});

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) setActive(entry.target.id);
//                 });
//             },
//             { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
//         );

//         Object.values(sectionRefs.current).forEach((el) => {
//             if (el) observer.observe(el);
//         });

//         return () => observer.disconnect();
//     }, []);

//     const scrollToSection = (id) => {
//         setTocOpen(false);
//         const el = sectionRefs.current[id];
//         if (el) {
//             const y = el.getBoundingClientRect().top + window.pageYOffset - 96;
//             window.scrollTo({ top: y, behavior: "smooth" });
//         }
//     };

//     return (
//         <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }} className="min-h-screen">
//             <Helmet>
//                 <title>Cookies Policy | LL Leather Lovers</title>
//                 <meta
//                     name="description"
//                     content="Read the LL Leather Lovers cookies policy to understand what cookies we use, why we use them, and how you can manage your preferences."
//                 />
//                 <meta name="robots" content="index, follow" />
//                 <link rel="canonical" href="https://llleatherlovers.com/cookies-policy" />
//             </Helmet>

//             <style>{`
//         .cp-sans  { font-family: 'Montserrat', sans-serif; }

//         .cp-toc-link {
//           transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
//           border-left: 2px solid transparent;
//         }
//         .cp-toc-link.cp-active {
//           color: #ffffff;
//           border-left-color: #6366f1;
//           background: rgba(132, 134, 236, 0.28);
//         }

//         .cp-section { scroll-margin-top: 96px; }
//         .cp-section a { color: #818cf8; text-decoration: underline; text-underline-offset: 2px; }
//         .cp-section a:hover { color: #a5b4fc; }
//       `}</style>

//             {/* ══ HERO ══ */}
//             <section className="relative overflow-hidden pt-8 pb-8">
//                 <div
//                     className="absolute top-0 left-0 right-0 h-px"
//                     style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
//                 />
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 pointer-events-none"
//                     style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

//                 <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
//                     <p className="cp-sans text-indigo-400 font-semibold mb-3 uppercase" style={{ fontSize: "10px", letterSpacing: "4px" }}>
//                         Legal
//                     </p>
//                     <h1 className="cp-sans text-white leading-tight" style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 700 }}>
//                         Cookies <span className="text-indigo-400">Policy</span>
//                     </h1>
//                     <div className="w-40 h-[2px] mx-auto mt-5" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
//                     <p className="cp-sans text-white/50 mt-5" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
//                         Last Updated: July 18, 2026
//                     </p>
//                 </div>
//             </section>

//             {/* ══ MOBILE TOC TOGGLE ══ */}
//             <div className="lg:hidden max-w-4xl mx-auto px-4 sm:px-6 mb-4">
//                 <button
//                     type="button"
//                     onClick={() => setTocOpen(!tocOpen)}
//                     className="cp-sans w-full flex items-center justify-between rounded-xl border border-white/10
//             bg-white/[0.03] px-5 py-3.5 text-white/80"
//                     style={{ fontSize: "11px", letterSpacing: "1.5px" }}
//                 >
//                     <span className="uppercase">Jump to Section</span>
//                     <svg
//                         width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
//                         style={{ transform: tocOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
//                     >
//                         <polyline points="6 9 12 15 18 9" />
//                     </svg>
//                 </button>
//                 {tocOpen && (
//                     <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col gap-1">
//                         {sections.map((s) => (
//                             <button
//                                 key={s.id}
//                                 type="button"
//                                 onClick={() => scrollToSection(s.id)}
//                                 className={`cp-sans cp-toc-link text-left pl-3 pr-2 py-2 rounded-md ${active === s.id ? "cp-active" : "text-white/65"}`}
//                                 style={{ fontSize: "12px", fontWeight: 500 }}
//                             >
//                                 {s.num} &nbsp; {s.title}
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* ══ CONTENT + STICKY TOC ══ */}
//             <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-10">
//                 <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
//                     {/* Sticky sidebar TOC, desktop only */}
//                     <aside className="hidden lg:block lg:w-64 shrink-0">
//                         <div className="sticky top-24 flex flex-col gap-1">
//                             {sections.map((s) => (
//                                 <button
//                                     key={s.id}
//                                     type="button"
//                                     onClick={() => scrollToSection(s.id)}
//                                     className={`cp-sans cp-toc-link text-left pl-4 pr-2 py-2 rounded-r-md ${active === s.id ? "cp-active" : "text-white/85"}`}
//                                     style={{ fontSize: "12px", fontWeight: 200, lineHeight: "1.5" }}
//                                 >
//                                     <span className="text-white/85 mr-2">{s.num}</span>
//                                     {s.title}
//                                 </button>
//                             ))}
//                         </div>
//                     </aside>

//                     {/* Body */}
//                     <div className="flex-1 min-w-0 cp-sans text-white/85" style={{ fontSize: "14.5px", lineHeight: "1.9", fontWeight: 200 }}>
//                         <p className="mb-6">
//                             This Cookies Policy explains how LL Leather Lovers ("we," "us," or "our") uses cookies and
//                             similar tracking technologies on our website. It should be read alongside our Privacy Policy,
//                             which explains how we use personal information more broadly. By continuing to browse our site,
//                             you agree to our use of cookies as described here.
//                         </p>

//                         <PolicySection id="what" num="01" title="What Are Cookies?" refs={sectionRefs}>
//                             <p>
//                                 Cookies are small text files that a website places on your device when you visit it. They
//                                 allow the site to remember your actions and preferences — such as items in your cart,
//                                 login state, and browsing behavior — over a period of time, so you don't have to re-enter
//                                 them every time you visit or move between pages. Similar technologies, such as pixels,
//                                 local storage, and web beacons, work in much the same way and are covered by this policy.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="types" num="02" title="Types of Cookies We Use" refs={sectionRefs}>
//                             <ul className="list-disc pl-5 space-y-1.5">
//                                 <li><span className="text-white/90">Essential cookies</span> — required for the site to function, including your shopping cart, checkout, and account login. These cannot be switched off.</li>
//                                 <li><span className="text-white/90">Performance & analytics cookies</span> — help us understand how visitors use our site, such as which pages are viewed and how long visitors stay, so we can improve the experience.</li>
//                                 <li><span className="text-white/90">Functional cookies</span> — remember choices you make, such as language, region, or display preferences, to personalize your visit.</li>
//                                 <li><span className="text-white/90">Advertising & marketing cookies</span> — used to show you relevant offers and measure the effectiveness of our campaigns, on our site and elsewhere.</li>
//                             </ul>
//                         </PolicySection>

//                         <PolicySection id="why" num="03" title="Why We Use Cookies" refs={sectionRefs}>
//                             <p className="mb-4">We use cookies to:</p>
//                             <ul className="list-disc pl-5 space-y-1.5">
//                                 <li>Keep your cart and account session active as you browse</li>
//                                 <li>Remember your preferences and previously viewed products</li>
//                                 <li>Understand site traffic and usage patterns to improve performance</li>
//                                 <li>Personalize content and product recommendations</li>
//                                 <li>Measure and improve the effectiveness of our marketing</li>
//                                 <li>Detect and prevent fraud or misuse of our site</li>
//                             </ul>
//                         </PolicySection>

//                         <PolicySection id="third-party" num="04" title="Third-Party Cookies" refs={sectionRefs}>
//                             <p>
//                                 Some cookies on our site are placed by third parties, such as analytics providers,
//                                 payment processors, and advertising or social media platforms. These third parties may
//                                 use cookies to collect information about your activity across different websites. We do
//                                 not control these cookies directly — please refer to each third party's own privacy and
//                                 cookie policies for details on how they use your information.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="manage" num="05" title="Managing & Disabling Cookies" refs={sectionRefs}>
//                             <p className="mb-4">
//                                 Most browsers let you control cookies through their settings — you can typically view,
//                                 delete, or block cookies from some or all websites. Look under "Privacy" or "Cookies" in
//                                 your browser's settings menu for these options.
//                             </p>
//                             <p>
//                                 Please note that blocking or deleting essential cookies may affect core functionality,
//                                 such as keeping items in your cart or staying signed in to your account. Disabling
//                                 performance, functional, or advertising cookies will not affect essential site features.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="retention" num="06" title="Cookie Retention Periods" refs={sectionRefs}>
//                             <p>
//                                 <span className="text-white/90">Session cookies</span> are temporary and are deleted
//                                 automatically once you close your browser. <span className="text-white/90">Persistent
//                                     cookies</span> remain on your device for a set period, or until you delete them manually,
//                                 so that your preferences are remembered on future visits. Retention periods vary by
//                                 cookie type and purpose, typically ranging from a single session up to 24 months.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="changes" num="07" title="Changes to This Policy" refs={sectionRefs}>
//                             <p>
//                                 We may update this Cookies Policy from time to time to reflect changes in the cookies we
//                                 use or for legal, operational, or regulatory reasons. We will post the updated policy on
//                                 this page with a revised "Last Updated" date. We encourage you to review this page
//                                 periodically.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="contact" num="08" title="Contact Us" refs={sectionRefs} last>
//                             <p className="mb-4">
//                                 If you have questions about this Cookies Policy or how we use cookies, reach out to us:
//                             </p>
//                             <ul className="space-y-1.5">
//                                 <li><span className="text-white/80">Email:</span> <a href="mailto:info@llleatherlovers.com">info@llleatherlovers.com</a></li>
//                                 <li><span className="text-white/80">Business Name:</span> LL Leather Lovers</li>
//                                 <li><span className="text-white/80">Address:</span> Reliq Eagle, 511, Maranpur, Opposite Shiv Mandir, Gaya Bypass Road</li>
//                             </ul>
//                         </PolicySection>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// const PolicySection = ({ id, num, title, children, refs, last }) => (
//     <div
//         id={id}
//         ref={(el) => (refs.current[id] = el)}
//         className={`cp-section ${last ? "" : "mb-6 pb-6 border-b border-white/[0.09]"}`}
//     >
//         <div className="flex items-baseline gap-3 mb-4">
//             <span className="cp-sans text-amber-600/70" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
//                 {num}
//             </span>
//             <h2 className="cp-sans text-white" style={{ fontSize: "clamp(17px,2vw,21px)", fontWeight: 600 }}>
//                 {title}
//             </h2>
//         </div>
//         {children}
//     </div>
// );

// export default CookiesPolicy;






import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet-async";

const ICONS = {
    cookie: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10c-1.5 0-3-.5-3-2a2 2 0 0 0-2-2c-1.5 0-2-1-2-2.5A2.5 2.5 0 0 0 12 3" />
            <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
            <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    ),
    layers: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    ),
    target: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
    ),
    link: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
            <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
        </svg>
    ),
    sliders: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
        </svg>
    ),
    clock: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
        </svg>
    ),
    edit: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
        </svg>
    ),
    mail: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2 7 12 13 22 7" />
        </svg>
    ),
};

const sections = [
    { id: "what", num: "01", title: "What Are Cookies?", icon: "cookie" },
    { id: "types", num: "02", title: "Types of Cookies We Use", icon: "layers" },
    { id: "why", num: "03", title: "Why We Use Cookies", icon: "target" },
    { id: "third-party", num: "04", title: "Third-Party Cookies", icon: "link" },
    { id: "manage", num: "05", title: "Managing & Disabling Cookies", icon: "sliders" },
    { id: "retention", num: "06", title: "Cookie Retention Periods", icon: "clock" },
    { id: "changes", num: "07", title: "Changes to This Policy", icon: "edit" },
    { id: "contact", num: "08", title: "Contact Us", icon: "mail" },
];

const CookiesPolicy = () => {
    const [active, setActive] = useState(sections[0].id);
    const [tocOpen, setTocOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const sectionRefs = useRef({});

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop;
            const height = h.scrollHeight - h.clientHeight;
            setProgress(height > 0 ? (scrolled / height) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
        );
        Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        setTocOpen(false);
        const el = sectionRefs.current[id];
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 96;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }} className="min-h-screen">
            <Helmet>
                <title>Cookies Policy | LL Leather Lovers</title>
                <meta
                    name="description"
                    content="Read the LL Leather Lovers cookies policy to understand what cookies we use, why we use them, and how you can manage your preferences."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://llleatherlovers.com/cookies-policy" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Cookies Policy | LL Leather Lovers" />
                <meta property="og:description" content="Read the LL Leather Lovers Cookies Policy to understand what cookies we use, why we use them, and how you can manage your preferences." />
                <meta property="og:url" content="https://llleatherlovers.com/cookies-policy" />
                <meta property="og:site_name" content="LL Leather Lovers" />
                <meta property="og:image" content="https://llleatherlovers.com/ll_leatherlovers_title.webp" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Cookies Policy | LL Leather Lovers" />
                <meta name="twitter:description" content="Read the LL Leather Lovers Cookies Policy to understand what cookies we use, why we use them, and how you can manage your preferences." />
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
                            "streetAddress": "Reliq Eagle, 511, Maranpur, Opposite Shiv Mandir, Gaya Bypass Road",
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
                        ],
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CookiePolicy",
                        "name": "Cookies Policy",
                        "url": "https://llleatherlovers.com/cookies-policy",
                        "description": "Read the LL Leather Lovers Cookies Policy to understand what cookies we use, why we use them, and how you can manage your preferences.",
                        "isPartOf": {
                            "@type": "WebSite",
                            "url": "https://llleatherlovers.com"
                        }
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
                                "name": "Cookies Policy",
                                "item": "https://llleatherlovers.com/cookies-policy"
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <style>{`
        .cp-sans { font-family: 'Montserrat', sans-serif; }

        .cp-toc-link {
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          border-left: 2px solid transparent;
        }
        .cp-toc-link.cp-active {
          color: #ffffff;
          border-left-color: #6366f1;
          background: rgba(132, 134, 236, 0.28);
        }
        .cp-toc-link .cp-icon { color: rgba(255,255,255,0.35); transition: color 0.2s ease; }
        .cp-toc-link.cp-active .cp-icon { color: #a5b4fc; }

        .cp-section { scroll-margin-top: 96px; }
        .cp-card {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .cp-card:hover {
          border-color: rgba(99,102,241,0.28);
          background: rgba(255,255,255,0.035);
        }
        .cp-icon-badge {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
        }
        .cp-section a { color: #818cf8; text-decoration: underline; text-underline-offset: 2px; }
        .cp-section a:hover { color: #a5b4fc; }
      `}</style>

            {/* ══ SCROLL PROGRESS BAR ══ */}
            {ReactDOM.createPortal(
                <div className="fixed top-[70px] left-0 right-0 h-[3px] z-[9999] bg-white/5">
                    <div
                        className="h-full"
                        style={{
                            width: `${progress}%`,
                            background: "linear-gradient(90deg, #6366f1, #c97c3a)",
                            transition: "width 0.1s linear",
                        }}
                    />
                </div>,
                document.body
            )}

            {/* ══ HERO ══ */}
            <section className="relative overflow-hidden pt-8 pb-10">
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-72 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.09) 0%, transparent 70%)" }} />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    {/* <div
                        className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center cp-icon-badge"
                        style={{ boxShadow: "0 8px 28px rgba(99,102,241,0.15)" }}
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a10 10 0 1 0 10 10c-1.5 0-3-.5-3-2a2 2 0 0 0-2-2c-1.5 0-2-1-2-2.5A2.5 2.5 0 0 0 12 3" />
                            <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
                            <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
                            <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                    </div> */}
                    <p className="cp-sans text-indigo-400 font-semibold mb-3 uppercase" style={{ fontSize: "10px", letterSpacing: "4px" }}>
                        Legal
                    </p>
                    <h1 className="cp-sans text-white leading-tight" style={{ fontSize: "clamp(28px,4.8vw,44px)", fontWeight: 700 }}>
                        Cookies <span className="text-indigo-400">Policy</span>
                    </h1>
                    <div className="w-40 h-[2px] mx-auto mt-2" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
                    <p className="cp-sans text-white/55 max-w-xl mx-auto mt-6" style={{ fontSize: "13px", lineHeight: "1.8" }}>
                        This policy explains what cookies are, why we use them, and how you can manage your preferences
                        when you visit LL Leather Lovers.
                    </p>
                    <p className="cp-sans text-white/40 mt-4" style={{ fontSize: "11.5px", letterSpacing: "0.5px" }}>
                        Last Updated: July 18, 2026 &nbsp;·&nbsp; 8 Sections
                    </p>
                </div>
            </section>

            {/* ══ MOBILE TOC TOGGLE ══ */}
            <div className="lg:hidden max-w-4xl mx-auto px-4 sm:px-6 mb-4">
                <button
                    type="button"
                    onClick={() => setTocOpen(!tocOpen)}
                    className="cp-sans w-full flex items-center justify-between rounded-xl border border-white/10
            bg-white/[0.03] px-5 py-3.5 text-white/80"
                    style={{ fontSize: "11px", letterSpacing: "1.5px" }}
                >
                    <span className="uppercase">Jump to Section</span>
                    <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ transform: tocOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                {tocOpen && (
                    <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col gap-1">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => scrollToSection(s.id)}
                                className={`cp-sans cp-toc-link text-left pl-3 pr-2 py-2 rounded-md flex items-center gap-2.5 ${active === s.id ? "cp-active" : "text-white/65"}`}
                                style={{ fontSize: "12px", fontWeight: 400 }}
                            >
                                <span className="cp-icon">{ICONS[s.icon]}</span>
                                {s.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ══ CONTENT + STICKY TOC ══ */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Sticky sidebar TOC */}
                    <aside className="hidden lg:block lg:w-72 shrink-0">
                        <div className="sticky top-24 flex flex-col gap-1 cp-card rounded-2xl p-3">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => scrollToSection(s.id)}
                                    className={`cp-sans cp-toc-link text-left pl-3 pr-2 py-2.5 rounded-lg flex items-center gap-3 ${active === s.id ? "cp-active" : "text-white/60"}`}
                                    style={{ fontSize: "12.5px", fontWeight: 300, lineHeight: "1.5" }}
                                >
                                    <span className="cp-icon shrink-0">{ICONS[s.icon]}</span>
                                    <span>
                                        <span className="text-white/25 mr-1.5">{s.num}</span>
                                        {s.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                        <p className="cp-sans text-white/70 mb-10" style={{ fontSize: "14px", lineHeight: "1.9" }}>
                            This Cookies Policy explains how LL Leather Lovers ("we," "us," or "our") uses cookies and
                            similar tracking technologies on our website. It should be read alongside our Privacy Policy,
                            which explains how we use personal information more broadly. By continuing to browse our site,
                            you agree to our use of cookies as described here.
                        </p>

                        <div className="flex flex-col gap-5">
                            <PolicySection id="what" num="01" title="What Are Cookies?" icon="cookie" refs={sectionRefs}>
                                <p>
                                    Cookies are small text files that a website places on your device when you visit it. They
                                    allow the site to remember your actions and preferences — such as items in your cart, login
                                    state, and browsing behavior — over a period of time, so you don't have to re-enter them
                                    every time you visit or move between pages. Similar technologies, such as pixels, local
                                    storage, and web beacons, work in much the same way and are covered by this policy.
                                </p>
                            </PolicySection>

                            <PolicySection id="types" num="02" title="Types of Cookies We Use" icon="layers" refs={sectionRefs}>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li><span className="text-white/90">Essential cookies</span> — required for the site to function, including your shopping cart, checkout, and account login. These cannot be switched off.</li>
                                    <li><span className="text-white/90">Performance & analytics cookies</span> — help us understand how visitors use our site, so we can improve the experience.</li>
                                    <li><span className="text-white/90">Functional cookies</span> — remember choices you make, such as language, region, or display preferences.</li>
                                    <li><span className="text-white/90">Advertising & marketing cookies</span> — used to show you relevant offers and measure the effectiveness of our campaigns.</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="why" num="03" title="Why We Use Cookies" icon="target" refs={sectionRefs}>
                                <p className="mb-4">We use cookies to:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Keep your cart and account session active as you browse</li>
                                    <li>Remember your preferences and previously viewed products</li>
                                    <li>Understand site traffic and usage patterns to improve performance</li>
                                    <li>Personalize content and product recommendations</li>
                                    <li>Measure and improve the effectiveness of our marketing</li>
                                    <li>Detect and prevent fraud or misuse of our site</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="third-party" num="04" title="Third-Party Cookies" icon="link" refs={sectionRefs}>
                                <p>
                                    Some cookies on our site are placed by third parties, such as analytics providers, payment
                                    processors, and advertising or social media platforms. These third parties may use cookies
                                    to collect information about your activity across different websites. We do not control
                                    these cookies directly — please refer to each third party's own privacy and cookie policies
                                    for details on how they use your information.
                                </p>
                            </PolicySection>

                            <PolicySection id="manage" num="05" title="Managing & Disabling Cookies" icon="sliders" refs={sectionRefs}>
                                <p className="mb-4">
                                    Most browsers let you control cookies through their settings — you can typically view,
                                    delete, or block cookies from some or all websites. Look under "Privacy" or "Cookies" in
                                    your browser's settings menu for these options.
                                </p>
                                <p>
                                    Please note that blocking or deleting essential cookies may affect core functionality, such
                                    as keeping items in your cart or staying signed in to your account. Disabling performance,
                                    functional, or advertising cookies will not affect essential site features.
                                </p>
                            </PolicySection>

                            <PolicySection id="retention" num="06" title="Cookie Retention Periods" icon="clock" refs={sectionRefs}>
                                <p>
                                    <span className="text-white/90">Session cookies</span> are temporary and are deleted
                                    automatically once you close your browser. <span className="text-white/90">Persistent
                                        cookies</span> remain on your device for a set period, or until you delete them manually, so
                                    that your preferences are remembered on future visits. Retention periods vary by cookie type
                                    and purpose, typically ranging from a single session up to 24 months.
                                </p>
                            </PolicySection>

                            <PolicySection id="changes" num="07" title="Changes to This Policy" icon="edit" refs={sectionRefs}>
                                <p>
                                    We may update this Cookies Policy from time to time to reflect changes in the cookies we use
                                    or for legal, operational, or regulatory reasons. We will post the updated policy on this
                                    page with a revised "Last Updated" date. We encourage you to review this page periodically.
                                </p>
                            </PolicySection>

                            <PolicySection id="contact" num="08" title="Contact Us" icon="mail" refs={sectionRefs} last>
                                <p className="mb-4">
                                    If you have questions about this Cookies Policy or how we use cookies, reach out to us:
                                </p>
                                <ul className="space-y-1.5">
                                    <li><span className="text-white/80">Email:</span> <a href="mailto:info@llleatherlovers.com">info@llleatherlovers.com</a></li>
                                    <li><span className="text-white/80">Business Name:</span> LL Leather Lovers</li>
                                    <li><span className="text-white/80">Address:</span> Reliq Eagle, 511, Maranpur, Opposite Shiv Mandir, Gaya Bypass Road</li>
                                </ul>
                            </PolicySection>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const PolicySection = ({ id, num, title, icon, children, refs, last }) => (
    <div
        id={id}
        ref={(el) => (refs.current[id] = el)}
        className="cp-section cp-card rounded-2xl p-6 sm:p-7"
    >
        <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center cp-icon-badge shrink-0">
                {ICONS[icon]}
            </div>
            <div className="flex items-baseline gap-2.5">
                <span className="cp-sans text-amber-600/70" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
                    {num}
                </span>
                <h2 className="cp-sans text-white" style={{ fontSize: "clamp(16px,2vw,19px)", fontWeight: 600 }}>
                    {title}
                </h2>
            </div>
        </div>
        <div className="cp-sans text-white/65 pl-[52px]" style={{ fontSize: "14px", lineHeight: "1.85", fontWeight: 200 }}>
            {children}
        </div>
    </div>
);

export default CookiesPolicy;