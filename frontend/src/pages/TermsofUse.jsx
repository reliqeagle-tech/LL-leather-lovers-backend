import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet-async";

const ICONS = {
    check: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
        </svg>
    ),
    user: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
        </svg>
    ),
    tag: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41 12 22l-9-9V4h9l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
    ),
    card: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
        </svg>
    ),
    truck: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="14" height="12" rx="1.5" /><path d="M15 9h4l3 4.5V16h-7z" />
            <circle cx="5.5" cy="18" r="2" /><circle cx="17.5" cy="18" r="2" />
        </svg>
    ),
    refresh: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-3-6.7" /><polyline points="21 3 21 9 15 9" />
        </svg>
    ),
    shield: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    alert: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="9" />
        </svg>
    ),
    scale: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M5 7l-3 6a3.5 3.5 0 0 0 7 0l-3-6zM19 7l-3 6a3.5 3.5 0 0 0 7 0l-3-6z" />
            <path d="M5 7h14M9 21h6" />
        </svg>
    ),
    book: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 0 4 5.5v14z" />
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
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
    { id: "acceptance", num: "01", title: "Acceptance of Terms", icon: "check" },
    { id: "eligibility", num: "02", title: "Eligibility & Accounts", icon: "user" },
    { id: "products", num: "03", title: "Products, Pricing & Availability", icon: "tag" },
    { id: "orders", num: "04", title: "Orders & Payment", icon: "card" },
    { id: "shipping", num: "05", title: "Shipping & Delivery", icon: "truck" },
    { id: "returns", num: "06", title: "Returns, Exchanges & Refunds", icon: "refresh" },
    { id: "ip", num: "07", title: "Intellectual Property", icon: "shield" },
    { id: "conduct", num: "08", title: "User Conduct", icon: "alert" },
    { id: "liability", num: "09", title: "Limitation of Liability", icon: "scale" },
    { id: "law", num: "10", title: "Governing Law", icon: "book" },
    { id: "changes", num: "11", title: "Changes to These Terms", icon: "edit" },
    { id: "contact", num: "12", title: "Contact Us", icon: "mail" },
];

const TermsOfUse = () => {
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
                <title>Terms of Use | LL Leather Lovers</title>
                <meta
                    name="description"
                    content="Read the LL Leather Lovers Terms of Use covering orders, payment, shipping, returns, intellectual property, and your rights and obligations as a customer."
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://llleatherlovers.com/terms-of-use" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Terms of Use | LL Leather Lovers" />
                <meta property="og:description" content="Read the Terms of Use governing purchases, payments, shipping, returns and use of the LL Leather Lovers website." />
                <meta property="og:url" content="https://llleatherlovers.com/terms-of-use" />
                <meta property="og:site_name" content="LL Leather Lovers" />
                <meta property="og:image" content="https://llleatherlovers.com/ll_leatherlovers_title.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Terms of Use | LL Leather Lovers" />
                <meta name="twitter:description" content="Read the Terms of Use governing purchases, payments, shipping, returns and use of the LL Leather Lovers website." />
                <meta name="twitter:image" content="https://llleatherlovers.com/ll_leatherlovers_title.png" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "LL Leather Lovers",
                        "url": "https://llleatherlovers.com",
                        "logo": "https://llleatherlovers.com/ll_leatherlovers_title.png",
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
                                "email": "info@llleatherlovers.com"
                            }
                        ]
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TermsOfService",
                        "name": "Terms of Use",
                        "url": "https://llleatherlovers.com/terms-of-use",
                        "description": "Read the Terms of Use governing purchases, payments, shipping, returns and use of the LL Leather Lovers website.",
                        "inLanguage": "en",
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
                                "name": "Terms of Use",
                                "item": "https://llleatherlovers.com/terms-of-use"
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <style>{`
        .tu-sans { font-family: 'Montserrat', sans-serif; }

        .tu-toc-link {
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          border-left: 2px solid transparent;
        }
        .tu-toc-link.tu-active {
          color: #ffffff;
          border-left-color: #6366f1;
          background: rgba(132, 134, 236, 0.28);
        }
        .tu-toc-link .tu-icon { color: rgba(255,255,255,0.35); transition: color 0.2s ease; }
        .tu-toc-link.tu-active .tu-icon { color: #a5b4fc; }

        .tu-section { scroll-margin-top: 96px; }
        .tu-card {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .tu-card:hover {
          border-color: rgba(99,102,241,0.28);
          background: rgba(255,255,255,0.035);
        }
        .tu-icon-badge {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
        }
        .tu-section a { color: #818cf8; text-decoration: underline; text-underline-offset: 2px; }
        .tu-section a:hover { color: #a5b4fc; }
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
                        className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center tu-icon-badge"
                        style={{ boxShadow: "0 8px 28px rgba(99,102,241,0.15)" }}
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 0 4 5.5v14z" />
                            <path d="M8 7h8M8 10.5h8M8 14h5" />
                        </svg>
                    </div> */}
                    <p className="tu-sans text-indigo-400 font-semibold mb-3 uppercase" style={{ fontSize: "10px", letterSpacing: "4px" }}>
                        Legal Agreement
                    </p>
                    <h1 className="tu-sans text-white leading-tight" style={{ fontSize: "clamp(28px,4.8vw,44px)", fontWeight: 700 }}>
                        Terms of <span className="text-indigo-400">Use</span>
                    </h1>
                    <div className="w-40 h-[2px] mx-auto mt-2" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
                    <p className="tu-sans text-white/55 max-w-xl mx-auto mt-6" style={{ fontSize: "13px", lineHeight: "1.8" }}>
                        Please read these terms carefully before using LL Leather Lovers. They govern your access to our
                        website and the purchase of our products.
                    </p>
                    <p className="tu-sans text-white/40 mt-4" style={{ fontSize: "11.5px", letterSpacing: "0.5px" }}>
                        Last Updated: July 18, 2026 &nbsp;·&nbsp; 12 Sections
                    </p>
                </div>
            </section>

            {/* ══ MOBILE TOC TOGGLE ══ */}
            <div className="lg:hidden max-w-4xl mx-auto px-4 sm:px-6 mb-4">
                <button
                    type="button"
                    onClick={() => setTocOpen(!tocOpen)}
                    className="tu-sans w-full flex items-center justify-between rounded-xl border border-white/10
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
                                className={`tu-sans tu-toc-link text-left pl-3 pr-2 py-2 rounded-md flex items-center gap-2.5 ${active === s.id ? "tu-active" : "text-white/65"}`}
                                style={{ fontSize: "12px", fontWeight: 500 }}
                            >
                                <span className="tu-icon">{ICONS[s.icon]}</span>
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
                        <div className="sticky top-24 flex flex-col gap-1 tu-card rounded-2xl p-3">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => scrollToSection(s.id)}
                                    className={`tu-sans tu-toc-link text-left pl-3 pr-2 py-2.5 rounded-lg flex items-center gap-3 ${active === s.id ? "tu-active" : "text-white/60"}`}
                                    style={{ fontSize: "12.5px", fontWeight: 300, lineHeight: "1.5" }}
                                >
                                    <span className="tu-icon shrink-0">{ICONS[s.icon]}</span>
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
                        <p className="tu-sans text-white/70 mb-10" style={{ fontSize: "14px", lineHeight: "1.9" }}>
                            These Terms of Use ("Terms") form a binding agreement between you and LL Leather Lovers ("we,"
                            "us," or "our") governing your use of our website and the purchase of products from us. By
                            accessing our site or placing an order, you agree to be bound by these Terms. If you do not
                            agree, please do not use our website.
                        </p>

                        <div className="flex flex-col gap-5">
                            <PolicySection id="acceptance" num="01" title="Acceptance of Terms" icon="check" refs={sectionRefs}>
                                <p>
                                    By browsing, creating an account, or placing an order on our website, you confirm that you
                                    have read, understood, and agree to be bound by these Terms, along with our Privacy Policy
                                    and Cookies Policy. We may update these Terms periodically, and continued use of our site
                                    after changes are posted constitutes your acceptance of the revised Terms.
                                </p>
                            </PolicySection>

                            <PolicySection id="eligibility" num="02" title="Eligibility & Accounts" icon="user" refs={sectionRefs}>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>You must be at least 18 years old, or the age of majority in your jurisdiction, to place an order</li>
                                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                    <li>You agree to provide accurate, current, and complete information when creating an account or placing an order</li>
                                    <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="products" num="03" title="Products, Pricing & Availability" icon="tag" refs={sectionRefs}>
                                <p className="mb-4">
                                    We make reasonable efforts to display product colors, materials, and details accurately;
                                    however, slight variations may occur due to the natural characteristics of genuine leather
                                    and differences in display screens.
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>All prices are listed in the applicable currency and are subject to change without notice</li>
                                    <li>Product availability is not guaranteed and items may be discontinued or out of stock</li>
                                    <li>We reserve the right to limit quantities or refuse orders at our discretion</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="orders" num="04" title="Orders & Payment" icon="card" refs={sectionRefs}>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Placing an order constitutes an offer to purchase, which we may accept or decline</li>
                                    <li>Payment must be received in full before an order is processed and dispatched</li>
                                    <li>We use third-party payment processors and do not store your full card details</li>
                                    <li>In the event of a pricing or listing error, we reserve the right to cancel the order and issue a refund</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="shipping" num="05" title="Shipping & Delivery" icon="truck" refs={sectionRefs}>
                                <p>
                                    Estimated delivery timelines are provided at checkout and are not guaranteed, as they may be
                                    affected by courier delays, customs processing, or circumstances beyond our control. Risk of
                                    loss and title to products pass to you upon delivery to the shipping carrier. Shipping fees,
                                    where applicable, are calculated at checkout based on destination and order weight.
                                </p>
                            </PolicySection>

                            <PolicySection id="returns" num="06" title="Returns, Exchanges & Refunds" icon="refresh" refs={sectionRefs}>
                                <p>
                                    Products may be returned or exchanged within the return window stated on our Returns page,
                                    provided they are unused, undamaged, and in their original packaging. Refunds are issued to
                                    the original payment method once the returned item has been received and inspected.
                                    Personalized, custom-made, or clearance items may not be eligible for return unless defective.
                                </p>
                            </PolicySection>

                            <PolicySection id="ip" num="07" title="Intellectual Property" icon="shield" refs={sectionRefs}>
                                <p>
                                    All content on our website — including logos, product designs, photography, text, and
                                    graphics — is the property of LL Leather Lovers or our licensors and is protected by
                                    copyright and trademark law. You may not reproduce, distribute, or create derivative works
                                    from our content without our prior written consent.
                                </p>
                            </PolicySection>

                            <PolicySection id="conduct" num="08" title="User Conduct" icon="alert" refs={sectionRefs}>
                                <p className="mb-4">When using our website, you agree not to:</p>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    <li>Use our site for any unlawful purpose or in violation of these Terms</li>
                                    <li>Attempt to gain unauthorized access to our systems or another user's account</li>
                                    <li>Interfere with or disrupt the security or performance of our website</li>
                                    <li>Submit false, misleading, or fraudulent information, including fraudulent orders</li>
                                </ul>
                            </PolicySection>

                            <PolicySection id="liability" num="09" title="Limitation of Liability" icon="scale" refs={sectionRefs}>
                                <p>
                                    To the fullest extent permitted by law, LL Leather Lovers shall not be liable for any
                                    indirect, incidental, or consequential damages arising from your use of our website or
                                    products. Our total liability for any claim relating to a purchase shall not exceed the
                                    amount you paid for the relevant order.
                                </p>
                            </PolicySection>

                            <PolicySection id="law" num="10" title="Governing Law" icon="book" refs={sectionRefs}>
                                <p>
                                    These Terms are governed by and construed in accordance with the laws of India, without
                                    regard to its conflict of law principles. Any disputes arising from these Terms or your use
                                    of our website shall be subject to the exclusive jurisdiction of the courts located in
                                    Gaya, Bihar.
                                </p>
                            </PolicySection>

                            <PolicySection id="changes" num="11" title="Changes to These Terms" icon="edit" refs={sectionRefs}>
                                <p>
                                    We may revise these Terms at any time to reflect changes in our practices or for legal,
                                    operational, or regulatory reasons. The updated Terms will be posted on this page with a
                                    revised "Last Updated" date. We encourage you to review this page periodically.
                                </p>
                            </PolicySection>

                            <PolicySection id="contact" num="12" title="Contact Us" icon="mail" refs={sectionRefs} last>
                                <p className="mb-4">
                                    If you have questions about these Terms of Use, reach out to us:
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
        className="tu-section tu-card rounded-2xl p-6 sm:p-7"
    >
        <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center tu-icon-badge shrink-0">
                {ICONS[icon]}
            </div>
            <div className="flex items-baseline gap-2.5">
                <span className="tu-sans text-amber-600/70" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
                    {num}
                </span>
                <h2 className="tu-sans text-white" style={{ fontSize: "clamp(16px,2vw,19px)", fontWeight: 600 }}>
                    {title}
                </h2>
            </div>
        </div>
        <div className="tu-sans text-white/70 pl-[52px]" style={{ fontSize: "14px", lineHeight: "1.85", fontWeight: 200 }}>
            {children}
        </div>
    </div>
);

export default TermsOfUse;