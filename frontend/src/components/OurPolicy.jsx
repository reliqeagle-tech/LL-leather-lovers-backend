import React, { useRef, useState, useEffect } from "react";

const policies = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
    tag: "Hassle-Free",
    title: "Easy Exchange Policy",
    body: "Changed your mind? No problem. We offer seamless exchanges on all leather pieces — because your satisfaction is non-negotiable.",
    highlight: "Exchange within 7 days",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    tag: "Risk-Free",
    title: "7-Day Return Policy",
    body: "Every purchase is protected. If it's not perfect, return it within 7 days for a full refund — no questions asked, no friction.",
    highlight: "100% refund guaranteed",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="12" y1="7" x2="12" y2="13" />
      </svg>
    ),
    tag: "Always On",
    title: "24 / 7 Premium Support",
    body: "Our leather experts are available around the clock. Whether it's sizing, care, or a custom query — we respond within the hour.",
    highlight: "Avg. response < 1 hour",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    tag: "Fast & Free",
    title: "Free Premium Shipping",
    body: "Every order ships free, tracked, and insured. Your leather arrives in our signature protective packaging — in pristine condition.",
    highlight: "Ships within 2–4 days",
  },
];

const Counter = ({ end, suffix = "", duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // easeOutQuad for smooth acceleration → deceleration
            const eased = 1 - (1 - progress) ** 2;
            const current = Math.floor(eased * end);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const OurPolicy = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bottomStats = [
    { end: 500, suffix: "+", label: "Products" },
    { end: 10000, suffix: "+", label: "Happy Customers" },
    { end: 100, suffix: "%", label: "Genuine Leather" },
    { end: 4.9, suffix: "★", label: "Avg. Rating", decimals: true },
  ];

  return (
    <>
      <style>{`
        .op-serif { font-family: 'Cormorant Garamond', serif; }
        .op-sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes opReveal {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .op-reveal { opacity:0; animation: opReveal 0.55s ease forwards; }

        /* card */
        .op-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 28px 24px 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .op-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(99,102,241,0.35);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.12);
          transform: translateY(-8px);
        }

        /* top accent line expands on hover */
        .op-card::before {
          content:'';
          position:absolute; top:0; left:0;
          height:2px; width:0;
          background: linear-gradient(90deg, #6366f1, #a5b4fc);
          transition: width 0.4s cubic-bezier(.22,1,.36,1);
          border-radius: 12px 12px 0 0;
        }
        .op-card:hover::before { width:100%; }

        /* icon circle */
        .op-icon {
          width: 60px; height: 60px;
          border-radius: 12px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #818cf8;
          margin-bottom: 20px;
          transition: background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s;
          flex-shrink: 0;
        }
        .op-card:hover .op-icon {
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.45);
          color: #a5b4fc;
          box-shadow: 0 0 20px rgba(99,102,241,0.25);
        }

        /* highlight pill */
        .op-highlight {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #6366f1;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          padding: 3px 10px;
          border-radius: 50px;
          margin-top: 14px;
          display: inline-block;
          transition: background 0.3s, border-color 0.3s;
        }
        .op-card:hover .op-highlight {
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.4);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-16"
        style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
      >
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)" }} />

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)" }} />

        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width: "700px", height: "300px",
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)"
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── HEADING ── */}
          <div className="text-center mb-12 sm:mb-14 op-reveal"
            style={visible ? { animationDelay: "0s" } : { animation: "none", opacity: 0 }}>

            <p className="op-sans text-indigo-400 font-semibold mb-3"
              style={{ fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase" }}>
              The LL Promise
            </p>

            <h2 className="op-serif text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 300 }}>
              Crafted for Your{" "}
              <em className="text-indigo-400" style={{ fontStyle: "italic", fontWeight: 300 }}>
                Peace of Mind
              </em>
            </h2>

            <div className="w-40 h-[1.5px] mx-auto my-4"
              style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />

            <p className="op-sans text-white/35 max-w-md mx-auto"
              style={{ fontSize: "13px", lineHeight: "1.7" }}>
              Every leather piece comes backed by our premium guarantee — because luxury should never come with risk.
            </p>
          </div>

          {/* ── POLICY CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {policies.map((p, i) => (
              <div key={i} className="op-reveal"
                style={visible
                  ? { animationDelay: `${0.1 + i * 0.1}s` }
                  : { animation: "none", opacity: 0 }
                }>
                <div className="op-card h-full">

                  {/* Icon */}
                  <div className="op-icon">{p.icon}</div>

                  {/* Tag */}
                  <p className="op-sans text-white/60 mb-2"
                    style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 }}>
                    {p.tag}
                  </p>

                  {/* Title */}
                  <h3 className="op-serif text-white mb-3"
                    style={{ fontSize: "clamp(18px,1.8vw,22px)", fontWeight: 400, lineHeight: 1.2 }}>
                    {p.title}
                  </h3>

                  {/* Body */}
                  <p className="op-sans text-white/60 flex-1"
                    style={{ fontSize: "12px", lineHeight: "1.8" }}>
                    {p.body}
                  </p>

                  {/* Highlight pill */}
                  <span className="op-highlight">{p.highlight}</span>

                </div>
              </div>
            ))}
          </div>

          {/* ── BOTTOM BAR WITH COUNTERS ── */}
          {/* <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16"> */}
          <div
            className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02]
  px-8 py-8 flex flex-wrap items-center justify-center
  gap-8 lg:gap-16"
          >
            {bottomStats.map(({ end, suffix, label, decimals = false }, i) => (
              <div
                key={label}
                className="min-w-[150px] rounded-xl border border-white/10
    bg-white/[0.02] py-5 px-6 text-center
    hover:border-indigo-500/30
    transition-all duration-300"
              >
                <p className="op-serif text-white"
                  style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 300, lineHeight: 1 }}>
                  {decimals ? (
                    <Counter end={end} suffix={suffix} duration={2200} />
                  ) : (
                    <Counter end={end} suffix={suffix} />
                  )}
                </p>
                <p className="op-sans text-white/45 mt-1"
                  style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default OurPolicy;   