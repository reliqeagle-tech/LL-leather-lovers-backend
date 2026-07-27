// import React, { useEffect, useRef, useState } from "react";
// import { Helmet } from "react-helmet-async";

// const sections = [
//     { id: "collect", num: "01", title: "Information We Collect" },
//     { id: "use", num: "02", title: "How We Use Your Information" },
//     { id: "cookies", num: "03", title: "Cookies & Tracking Technologies" },
//     { id: "sharing", num: "04", title: "How We Share Your Information" },
//     { id: "security", num: "05", title: "Data Security" },
//     { id: "rights", num: "06", title: "Your Rights & Choices" },
//     { id: "retention", num: "07", title: "Data Retention" },
//     { id: "children", num: "08", title: "Children's Privacy" },
//     { id: "changes", num: "09", title: "Changes to This Policy" },
//     { id: "contact", num: "10", title: "Contact Us" },
// ];

// const PrivacyPolicy = () => {
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
//                 <title>Privacy Policy | LL Leather Lovers</title>
//                 <meta
//                     name="description"
//                     content="Read the LL Leather Lovers privacy policy to understand how we collect, use, and protect your personal information."
//                 />
//                 <meta name="robots" content="index, follow" />
//                 <link rel="canonical" href="https://llleatherlovers.com/privacy-policy" />
//             </Helmet>

//             <style>{`
//         .pp-sans  { font-family: 'Montserrat', sans-serif; }

//         .pp-toc-link {
//           transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
//           border-left: 2px solid transparent;
//         }
//         .pp-toc-link.pp-active {
//           color: #ffffff;
//           border-left-color: #6366f1;
//           background: rgba(132, 134, 236, 0.28);
//         }

//         .pp-section { scroll-margin-top: 96px; }
//         .pp-section a { color: #818cf8; text-decoration: underline; text-underline-offset: 2px; }
//         .pp-section a:hover { color: #a5b4fc; }
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
//                     <p className="pp-sans text-indigo-400 font-semibold mb-3 uppercase" style={{ fontSize: "10px", letterSpacing: "4px" }}>
//                         Legal
//                     </p>
//                     <h1 className="pp-sans text-white leading-tight" style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 700 }}>
//                         Privacy <span className="text-indigo-400">Policy</span>
//                     </h1>
//                     <div className="w-40 h-[2px] mx-auto mt-5" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
//                     <p className="pp-sans text-white/50 mt-5" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
//                         Last Updated: July 18, 2026
//                     </p>
//                 </div>
//             </section>

//             {/* ══ MOBILE TOC TOGGLE ══ */}
//             <div className="lg:hidden max-w-4xl mx-auto px-4 sm:px-6 mb-4">
//                 <button
//                     type="button"
//                     onClick={() => setTocOpen(!tocOpen)}
//                     className="pp-sans w-full flex items-center justify-between rounded-xl border border-white/10
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
//                                 className={`pp-sans pp-toc-link text-left pl-3 pr-2 py-2 rounded-md ${active === s.id ? "pp-active" : "text-white/65"}`}
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
//                                     className={`pp-sans pp-toc-link text-left pl-4 pr-2 py-2 rounded-r-md ${active === s.id ? "pp-active" : "text-white/85"}`}
//                                     style={{ fontSize: "12px", fontWeight: 200, lineHeight: "1.5" }}
//                                 >
//                                     <span className="text-white/85 mr-2">{s.num}</span>
//                                     {s.title}
//                                 </button>
//                             ))}
//                         </div>
//                     </aside>

//                     {/* Body */}
//                     <div className="flex-1 min-w-0 pp-sans text-white/85" style={{ fontSize: "14.5px", lineHeight: "1.9", fontWeight: 200 }}>
//                         <p className="mb-6">
//                             LL Leather Lovers ("we," "us," or "our") respects your privacy and is committed to protecting
//                             the personal information you share with us. This Privacy Policy explains what information we
//                             collect, how we use it, and the choices you have regarding your data when you visit our website
//                             or make a purchase from us. By using our site, you agree to the practices described below.
//                         </p>

//                         <PolicySection id="collect" num="01" title="Information We Collect" refs={sectionRefs}>
//                             <p className="mb-4">We collect information that you provide directly to us, as well as information gathered automatically as you browse our site.</p>
//                             <p className="font-medium text-white/90 mb-2">Information you provide:</p>
//                             <ul className="list-disc pl-5 space-y-1.5 mb-4">
//                                 <li>Name, email address, phone number, and shipping/billing address</li>
//                                 <li>Order details and payment information (processed securely through our payment partners)</li>
//                                 <li>Account credentials, if you create an account with us</li>
//                                 <li>Messages you send us through contact forms or customer support</li>
//                             </ul>
//                             <p className="font-medium text-white/90 mb-2">Information collected automatically:</p>
//                             <ul className="list-disc pl-5 space-y-1.5">
//                                 <li>Device and browser information, IP address, and approximate location</li>
//                                 <li>Pages visited, products viewed, and browsing behavior on our site</li>
//                                 <li>Cookies and similar tracking technologies (see Section 03)</li>
//                             </ul>
//                         </PolicySection>

//                         <PolicySection id="use" num="02" title="How We Use Your Information" refs={sectionRefs}>
//                             <p className="mb-4">We use the information we collect to:</p>
//                             <ul className="list-disc pl-5 space-y-1.5">
//                                 <li>Process and fulfil your orders, including payment, shipping, and returns</li>
//                                 <li>Communicate with you about your orders, account, and customer support requests</li>
//                                 <li>Send marketing communications, where you have opted in, and let you unsubscribe at any time</li>
//                                 <li>Improve our website, products, and shopping experience</li>
//                                 <li>Detect, prevent, and address fraud, security issues, or technical problems</li>
//                                 <li>Comply with legal obligations</li>
//                             </ul>
//                         </PolicySection>

//                         <PolicySection id="cookies" num="03" title="Cookies & Tracking Technologies" refs={sectionRefs}>
//                             <p className="mb-4">
//                                 We use cookies and similar technologies to keep you signed in, remember items in your cart,
//                                 understand how visitors use our site, and personalize content and ads. You can control cookies
//                                 through your browser settings; disabling certain cookies may affect how parts of our site function.
//                             </p>
//                             <p>We use the following categories of cookies:</p>
//                             <ul className="list-disc pl-5 space-y-1.5 mt-3">
//                                 <li><span className="text-white/80">Essential cookies</span> — required for core site functionality, such as your cart and checkout</li>
//                                 <li><span className="text-white/80">Analytics cookies</span> — help us understand site usage so we can improve the experience</li>
//                                 <li><span className="text-white/80">Marketing cookies</span> — used to show you relevant offers on and off our site</li>
//                             </ul>
//                         </PolicySection>

//                         <PolicySection id="sharing" num="04" title="How We Share Your Information" refs={sectionRefs}>
//                             <p className="mb-4">We do not sell your personal information. We may share it with:</p>
//                             <ul className="list-disc pl-5 space-y-1.5">
//                                 <li>Service providers who help us operate our business — payment processors, shipping carriers, hosting providers, and email/marketing platforms</li>
//                                 <li>Professional advisors, such as legal or financial consultants, where necessary</li>
//                                 <li>Law enforcement or regulators, when required by law or to protect our rights</li>
//                                 <li>A successor entity, in the event of a merger, acquisition, or sale of assets</li>
//                             </ul>
//                         </PolicySection>

//                         <PolicySection id="security" num="05" title="Data Security" refs={sectionRefs}>
//                             <p>
//                                 We use reasonable technical and organizational safeguards — including encryption in transit,
//                                 restricted access to personal data, and secure payment processing — to protect your information
//                                 from unauthorized access, alteration, disclosure, or destruction. No method of transmission or
//                                 storage is completely secure, so we cannot guarantee absolute security.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="rights" num="06" title="Your Rights & Choices" refs={sectionRefs}>
//                             <p className="mb-4">Depending on where you live, you may have the right to:</p>
//                             <ul className="list-disc pl-5 space-y-1.5 mb-4">
//                                 <li>Access the personal information we hold about you</li>
//                                 <li>Request correction of inaccurate or incomplete information</li>
//                                 <li>Request deletion of your personal information</li>
//                                 <li>Object to or restrict certain processing of your data</li>
//                                 <li>Withdraw consent for marketing communications at any time</li>
//                             </ul>
//                             <p>
//                                 To exercise any of these rights, contact us using the details in Section 10. We will respond
//                                 within the timeframe required by applicable law.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="retention" num="07" title="Data Retention" refs={sectionRefs}>
//                             <p>
//                                 We retain personal information for as long as necessary to fulfil the purposes described in this
//                                 policy — including order history, tax and accounting obligations, and resolving disputes — after
//                                 which it is securely deleted or anonymized.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="children" num="08" title="Children's Privacy" refs={sectionRefs}>
//                             <p>
//                                 Our website is not directed to children under 16, and we do not knowingly collect personal
//                                 information from children. If you believe a child has provided us with personal information,
//                                 please contact us and we will take steps to delete it.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="changes" num="09" title="Changes to This Policy" refs={sectionRefs}>
//                             <p>
//                                 We may update this Privacy Policy from time to time to reflect changes in our practices or for
//                                 legal, operational, or regulatory reasons. We will post the updated policy on this page with a
//                                 revised "Last Updated" date. We encourage you to review this page periodically.
//                             </p>
//                         </PolicySection>

//                         <PolicySection id="contact" num="10" title="Contact Us" refs={sectionRefs} last>
//                             <p className="mb-4">
//                                 If you have questions about this Privacy Policy or how we handle your personal information,
//                                 reach out to us:
//                             </p>
//                             <ul className="space-y-1.5">
//                                 <li><span className="text-white/80">Email:</span> <a href="mailto:info@llleatherlovers.com">info@llleatherlovers.com</a></li>
//                                 <li><span className="text-white/80">Business Name:</span> LL Leather Lovers</li>
//                                 <li><span className="text-white/80">Address :</span> Reliq Eagle, 511, Maranpur, Opposite Shiv Mandir, Gaya Bypass, Road,</li>
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
//         className={`pp-section ${last ? "" : "mb-6 pb-6 border-b border-white/[0.09]"}`}
//     >
//         <div className="flex items-baseline gap-3 mb-4">
//             <span className="pp-sans text-amber-600/70" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
//                 {num}
//             </span>
//             <h2 className="pp-sans text-white" style={{ fontSize: "clamp(17px,2vw,21px)", fontWeight: 600 }}>
//                 {title}
//             </h2>
//         </div>
//         {children}
//     </div>
// );

// export default PrivacyPolicy;







import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet-async";

const ICONS = {
    inbox: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
    ),
    gear: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    cookie: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10c-1.5 0-3-.5-3-2a2 2 0 0 0-2-2c-1.5 0-2-1-2-2.5A2.5 2.5 0 0 0 12 3" />
            <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
            <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    ),
    share: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" />
            <line x1="8.3" y1="10.7" x2="15.7" y2="6.3" /><line x1="8.3" y1="13.3" x2="15.7" y2="17.7" />
        </svg>
    ),
    shield: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    userCheck: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="4" /><path d="M2 21c1.3-3.6 4.4-5.5 7-5.5s5.7 1.9 7 5.5" />
            <polyline points="16 11 18 13 22 9" />
        </svg>
    ),
    clock: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
        </svg>
    ),
    child: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" /><path d="M8 22v-4a4 4 0 0 1 8 0v4" />
            <circle cx="10.3" cy="7.3" r="0.6" fill="currentColor" stroke="none" />
            <circle cx="13.7" cy="7.3" r="0.6" fill="currentColor" stroke="none" />
            <path d="M10.2 9.3c.5.5 1.1.5 1.8.5s1.3 0 1.8-.5" />
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
    { id: "collect", num: "01", title: "Information We Collect", icon: "inbox" },
    { id: "use", num: "02", title: "How We Use Your Information", icon: "gear" },
    { id: "cookies", num: "03", title: "Cookies & Tracking Technologies", icon: "cookie" },
    { id: "sharing", num: "04", title: "How We Share Your Information", icon: "share" },
    { id: "security", num: "05", title: "Data Security", icon: "shield" },
    { id: "rights", num: "06", title: "Your Rights & Choices", icon: "userCheck" },
    { id: "retention", num: "07", title: "Data Retention", icon: "clock" },
    { id: "children", num: "08", title: "Children's Privacy", icon: "child" },
    { id: "changes", num: "09", title: "Changes to This Policy", icon: "edit" },
    { id: "contact", num: "10", title: "Contact Us", icon: "mail" },
];

const PrivacyPolicy = () => {
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
                <title>Privacy Policy | LL Leather Lovers</title>
                <meta name="description" content="Read the LL Leather Lovers privacy policy to understand how we collect, use, and protect your personal information." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://llleatherlovers.com/privacy-policy" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Privacy Policy | LL Leather Lovers" />
                <meta property="og:site_name" content="LL Leather Lovers" />
                <meta property="og:description" content="Read the LL Leather Lovers Privacy Policy to understand how we collect, use, store, and protect your personal information." />
                <meta property="og:url" content="https://llleatherlovers.com/privacy-policy" />
                <meta property="og:image" content="https://llleatherlovers.com/ll_leatherlovers_title.webp" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Privacy Policy | LL Leather Lovers" />
                <meta name="twitter:description" content="Read the LL Leather Lovers Privacy Policy to understand how we collect, use, store, and protect your personal information." />
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
                                "availableLanguage": ["English", "Hindi"]
                            }
                        ]
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "PrivacyPolicy",
                        "name": "Privacy Policy",
                        "url": "https://llleatherlovers.com/privacy-policy",
                        "description": "Read the LL Leather Lovers Privacy Policy to understand how we collect, use, store, and protect your personal information.",
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
                                "name": "Privacy Policy",
                                "item": "https://llleatherlovers.com/privacy-policy"
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <style>{`
        .pp-sans { font-family: 'Montserrat', sans-serif; }

        .pp-toc-link {
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          border-left: 2px solid transparent;
        }
        .pp-toc-link.pp-active {
          color: #ffffff;
          border-left-color: #6366f1;
          background: rgba(132, 134, 236, 0.28);
        }
        .pp-toc-link .pp-icon { color: rgba(255,255,255,0.35); transition: color 0.2s ease; }
        .pp-toc-link.pp-active .pp-icon { color: #a5b4fc; }

        .pp-section { scroll-margin-top: 96px; }
        .pp-card {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .pp-card:hover {
          border-color: rgba(99,102,241,0.28);
          background: rgba(255,255,255,0.035);
        }
        .pp-icon-badge {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
        }
        .pp-section a { color: #818cf8; text-decoration: underline; text-underline-offset: 2px; }
        .pp-section a:hover { color: #a5b4fc; }
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
                        className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center pp-icon-badge"
                        style={{ boxShadow: "0 8px 28px rgba(99,102,241,0.15)" }}
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 11 14 15 10" />
                        </svg>
                    </div> */}
                    <p className="pp-sans text-indigo-400 font-semibold mb-3 uppercase" style={{ fontSize: "10px", letterSpacing: "4px" }}>
                        Legal
                    </p>
                    <h1 className="pp-sans text-white leading-tight" style={{ fontSize: "clamp(28px,4.8vw,44px)", fontWeight: 700 }}>
                        Privacy <span className="text-indigo-400">Policy</span>
                    </h1>
                    <div className="w-40 h-[2px] mx-auto mt-2" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
                    <p className="pp-sans text-white/55 max-w-xl mx-auto mt-6" style={{ fontSize: "13px", lineHeight: "1.8" }}>
                        This policy explains what personal information we collect, how we use it, and the choices you
                        have when you visit or shop with LL Leather Lovers.
                    </p>
                    <p className="pp-sans text-white/40 mt-4" style={{ fontSize: "11.5px", letterSpacing: "0.5px" }}>
                        Last Updated: July 18, 2026 &nbsp;·&nbsp; 10 Sections
                    </p>
                </div>
            </section>

            {/* ══ MOBILE TOC TOGGLE ══ */}
            <div className="lg:hidden max-w-4xl mx-auto px-4 sm:px-6 mb-4">
                <button
                    type="button"
                    onClick={() => setTocOpen(!tocOpen)}
                    className="pp-sans w-full flex items-center justify-between rounded-xl border border-white/10
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
                                className={`pp-sans pp-toc-link text-left pl-3 pr-2 py-2 rounded-md flex items-center gap-2.5 ${active === s.id ? "pp-active" : "text-white/65"}`}
                                style={{ fontSize: "12px", fontWeight: 500 }}
                            >
                                <span className="pp-icon">{ICONS[s.icon]}</span>
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
                        <div className="sticky top-24 flex flex-col gap-1 pp-card rounded-2xl p-3">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => scrollToSection(s.id)}
                                    className={`pp-sans pp-toc-link text-left pl-3 pr-2 py-2.5 rounded-lg flex items-center gap-3 ${active === s.id ? "pp-active" : "text-white/85"}`}
                                    style={{ fontSize: "12px", fontWeight: 200, lineHeight: "1.5" }}
                                >
                                    <span className="pp-icon shrink-0">{ICONS[s.icon]}</span>
                                    <span>
                                        <span className="text-white/85 mr-1.5">{s.num}</span>
                                        {s.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                        <p className="pp-sans text-white/85 mb-10" style={{ fontSize: "14.5px", lineHeight: "1.9", fontWeight: 200 }}>
                            LL Leather Lovers ("we," "us," or "our") respects your privacy and is committed to protecting
                            the personal information you share with us. This Privacy Policy explains what information we
                            collect, how we use it, and the choices you have regarding your data when you visit our website
                            or make a purchase from us. By using our site, you agree to the practices described below.
                        </p>

                        <div className="flex flex-col gap-5">
                            <PolicySection id="collect" num="01" title="Information We Collect" icon="inbox" refs={sectionRefs}>
                                <p className="mb-4">We collect information that you provide directly to us, as well as information gathered automatically as you browse our site.</p>
                                <p className="font-medium text-white/90 mb-2">Information you provide:</p>
                                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                                    <li>Name, email address, phone number, and shipping/billing address</li>
                                    <li>Order details and payment information (processed securely through our payment partners)</li>
                                    <li>Account credentials, if you create an account with us</li>
                                    <li>Messages you send us through contact forms or customer support</li>
                                </ul>
                                <p className="font-medium text-white/90 mb-2">Information collected automatically:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Device and browser information, IP address, and approximate location</li>
                                    <li>Pages visited, products viewed, and browsing behavior on our site</li>
                                    <li>Cookies and similar tracking technologies (see Section 03)</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="use" num="02" title="How We Use Your Information" icon="gear" refs={sectionRefs}>
                                <p className="mb-4">We use the information we collect to:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Process and fulfil your orders, including payment, shipping, and returns</li>
                                    <li>Communicate with you about your orders, account, and customer support requests</li>
                                    <li>Send marketing communications, where you have opted in, and let you unsubscribe at any time</li>
                                    <li>Improve our website, products, and shopping experience</li>
                                    <li>Detect, prevent, and address fraud, security issues, or technical problems</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="cookies" num="03" title="Cookies & Tracking Technologies" icon="cookie" refs={sectionRefs}>
                                <p className="mb-4">
                                    We use cookies and similar technologies to keep you signed in, remember items in your cart,
                                    understand how visitors use our site, and personalize content and ads. You can control cookies
                                    through your browser settings; disabling certain cookies may affect how parts of our site function.
                                </p>
                                <p>We use the following categories of cookies:</p>
                                <ul className="list-disc pl-5 space-y-1.5 mt-3">
                                    <li><span className="text-white/80">Essential cookies</span> — required for core site functionality, such as your cart and checkout</li>
                                    <li><span className="text-white/80">Analytics cookies</span> — help us understand site usage so we can improve the experience</li>
                                    <li><span className="text-white/80">Marketing cookies</span> — used to show you relevant offers on and off our site</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="sharing" num="04" title="How We Share Your Information" icon="share" refs={sectionRefs}>
                                <p className="mb-4">We do not sell your personal information. We may share it with:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Service providers who help us operate our business — payment processors, shipping carriers, hosting providers, and email/marketing platforms</li>
                                    <li>Professional advisors, such as legal or financial consultants, where necessary</li>
                                    <li>Law enforcement or regulators, when required by law or to protect our rights</li>
                                    <li>A successor entity, in the event of a merger, acquisition, or sale of assets</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="security" num="05" title="Data Security" icon="shield" refs={sectionRefs}>
                                <p>
                                    We use reasonable technical and organizational safeguards — including encryption in transit,
                                    restricted access to personal data, and secure payment processing — to protect your information
                                    from unauthorized access, alteration, disclosure, or destruction. No method of transmission or
                                    storage is completely secure, so we cannot guarantee absolute security.
                                </p>
                            </PolicySection>

                            <PolicySection id="rights" num="06" title="Your Rights & Choices" icon="userCheck" refs={sectionRefs}>
                                <p className="mb-4">Depending on where you live, you may have the right to:</p>
                                <ul className="list-disc pl-5 space-y-1.5 mb-4">
                                    <li>Access the personal information we hold about you</li>
                                    <li>Request correction of inaccurate or incomplete information</li>
                                    <li>Request deletion of your personal information</li>
                                    <li>Object to or restrict certain processing of your data</li>
                                    <li>Withdraw consent for marketing communications at any time</li>
                                </ul>
                                <p>
                                    To exercise any of these rights, contact us using the details in Section 10. We will respond
                                    within the timeframe required by applicable law.
                                </p>
                            </PolicySection>

                            <PolicySection id="retention" num="07" title="Data Retention" icon="clock" refs={sectionRefs}>
                                <p>
                                    We retain personal information for as long as necessary to fulfil the purposes described in this
                                    policy — including order history, tax and accounting obligations, and resolving disputes — after
                                    which it is securely deleted or anonymized.
                                </p>
                            </PolicySection>

                            <PolicySection id="children" num="08" title="Children's Privacy" icon="child" refs={sectionRefs}>
                                <p>
                                    Our website is not directed to children under 16, and we do not knowingly collect personal
                                    information from children. If you believe a child has provided us with personal information,
                                    please contact us and we will take steps to delete it.
                                </p>
                            </PolicySection>

                            <PolicySection id="changes" num="09" title="Changes to This Policy" icon="edit" refs={sectionRefs}>
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or for
                                    legal, operational, or regulatory reasons. We will post the updated policy on this page with a
                                    revised "Last Updated" date. We encourage you to review this page periodically.
                                </p>
                            </PolicySection>

                            <PolicySection id="contact" num="10" title="Contact Us" icon="mail" refs={sectionRefs} last>
                                <p className="mb-4">
                                    If you have questions about this Privacy Policy or how we handle your personal information,
                                    reach out to us:
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
        className="pp-section pp-card rounded-2xl p-6 sm:p-7"
    >
        <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center pp-icon-badge shrink-0">
                {ICONS[icon]}
            </div>
            <div className="flex items-baseline gap-2.5">
                <span className="pp-sans text-amber-600/70" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
                    {num}
                </span>
                <h2 className="pp-sans text-white" style={{ fontSize: "clamp(16px,2vw,19px)", fontWeight: 600 }}>
                    {title}
                </h2>
            </div>
        </div>
        <div className="pp-sans text-white/85 pl-[52px]" style={{ fontSize: "14.5px", lineHeight: "1.9", fontWeight: 200 }}>
            {children}
        </div>
    </div>
);

export default PrivacyPolicy;