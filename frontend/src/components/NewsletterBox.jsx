// import React, { useState } from "react";

// const NewsletterBox = () => {
//   const isDevelopment = import.meta.env.MODE === 'development'
//   const backendUrl = isDevelopment ? import.meta.env.VITE_BACKEND_URL_D : import.meta.env.VITE_BACKEND_URL
//   const [loading, setLoading] = useState(false);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const email = event.target.email.value;

//     console.log(backendUrl)
//     setLoading(true);
//     try {
//       const res = await fetch(`${backendUrl}/api/user/send-mail`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("🎉 Subscription successful! Check your email.");
//         event.target.reset();
//       } else {
//         alert("⚠️ Error: " + data.message);
//       }
//     } catch (error) {
//       alert("❌ Error subscribing: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="flex flex-col items-center justify-center text-center bg-[#f1f1f1] py-16 px-6 rounded-2xl">
//       {/* Title */}
//       <h2 className="text-2xl md:text-3xl font-bold text-gray-700 prata-regular">
//         Subscribe now & get <span className="text-gray-700 prata-regular">20% off</span>
//       </h2>

//       {/* Subtitle */}
//       <p className="mt-3 text-gray-500 max-w-xl">
//         Stay updated with our latest arrivals, exclusive offers, and style
//         inspiration—delivered straight to your inbox.
//       </p>

//       {/* Form */}
//       <form
//         onSubmit={onSubmitHandler}
//         className="mt-6 w-full sm:w-1/2 flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm"
//       >
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           required
//           disabled={loading}
//           className="flex-1 w-[60%] px-4 py-3 text-gray-800 placeholder-gray-500 outline-none bg-white"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 w-[40%] py-3 bg-black text-white text-sm font-medium hover:bg-indigo-500 transition   rounded-md"
//         >
//           {loading ? "Sending..." : "SUBSCRIBE"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default NewsletterBox;




import React, { useState } from "react";

const NewsletterBox = () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const backendUrl = isDevelopment
    ? import.meta.env.VITE_BACKEND_URL_D
    : import.meta.env.VITE_BACKEND_URL;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        setSuccess(true);
        event.target.reset();
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (error) {
      alert("❌ Error subscribing: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .nl-serif { font-family: 'Cormorant Garamond', serif; }
        .nl-sans  { font-family: 'Montserrat', sans-serif; }

        /* input focus ring */
        .nl-input:focus {
          outline: none;
          box-shadow: inset 0 0 0 1.5px rgba(99,102,241,0.5);
        }

        /* submit button wipe */
        .nl-btn {
          position: relative; overflow: hidden;
          transition: box-shadow 0.25s, transform 0.2s;
        }
        .nl-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #4f46e5;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1);
        }
        .nl-btn:hover:not(:disabled)::before { transform: scaleX(1); }
        .nl-btn:hover:not(:disabled) {
          box-shadow: 0 6px 24px rgba(99,102,241,0.45);
          transform: translateY(-1px);
        }
        .nl-btn > * { position: relative; z-index: 1; }

        /* floating label glow dots */
        @keyframes nlPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.4); }
        }
        .nl-dot { animation: nlPulse 2.5s ease-in-out infinite; }
        .nl-dot:nth-child(2) { animation-delay: 0.4s; }
        .nl-dot:nth-child(3) { animation-delay: 0.8s; }

        /* success checkmark */
        @keyframes nlCheck {
          from { opacity:0; transform: scale(0.7); }
          to   { opacity:1; transform: scale(1); }
        }
        .nl-success { animation: nlCheck 0.4s cubic-bezier(.22,1,.36,1) forwards; }
      `}</style>

      <section
        className="relative overflow-hidden py-14 "
        style={{ background: "linear-gradient(160deg, #0d0b18 0%, #0f0d1c 50%, #0a0912 100%)" }}
      >
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,124,58,0.3), transparent)" }} />

        {/* Center indigo glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div style={{
            width: "600px", height: "300px",
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }} />
        </div>

        {/* Decorative large watermark */}
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          nl-serif text-white pointer-events-none select-none hidden lg:block"
          style={{
            fontSize: "clamp(80px,12vw,160px)", fontWeight: 300,
            opacity: 0.055, whiteSpace: "nowrap", letterSpacing: "0.15em",
          }}>
          LL LEATHER
        </p>

        {/* <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center"> */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">

          {/* Pulsing dots */}
          <div className="flex items-center justify-center gap-1.5 mb-5">
            {[0, 1, 2].map(i => (
              <span key={i} className="nl-dot w-1 h-1 rounded-full bg-indigo-400 inline-block"
                style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </div>

          {/* Eyebrow */}
          <p className="nl-sans text-indigo-400 font-semibold mb-4 tracking-[4px] uppercase"
            style={{ fontSize: "10px" }}>
            Exclusive Access
          </p>

          {/* Heading */}
          <h2 className="nl-serif text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 300 }}>
            Join & Get{" "}
            <em className="text-indigo-400" style={{ fontStyle: "italic", fontWeight: 300 }}>
              20% Off
            </em>
          </h2>

          {/* Divider */}
          <div className="w-40 h-[1.5px] mx-auto mb-5"
            style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />

          {/* Subtitle */}
          <p className="nl-sans text-white/60 max-w-xl mx-auto leading-relaxed mb-8"
            style={{ fontSize: "13px" }}>
            Be the first to know about new leather arrivals, limited drops, and
            members-only offers — delivered straight to your inbox.
          </p>

          {/* ── FORM / SUCCESS ── */}
          {success ? (
            <div className="nl-success flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-indigo-600/20 border border-indigo-500/40
                flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="nl-sans text-white/80 font-medium" style={{ fontSize: "14px" }}>
                Welcome to The LL Leather Lovers Club
              </p>
              <p className="nl-sans text-white/60" style={{ fontSize: "12px" }}>
                Your exclusive offers will arrive soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-xl mx-auto"
            >
              {/* Email input */}
              <div className="flex-1 relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  className="nl-input nl-sans w-full pl-9 pr-4 py-4 rounded-full
                    text-white/85 placeholder-white/25 disabled:opacity-50"
                  style={{
                    fontSize: "12px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    letterSpacing: "0.3px",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="nl-btn nl-sans text-white rounded-full px-7 py-4
                  disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                style={{
                  fontSize: "10px", fontWeight: 600,
                  letterSpacing: "2.5px", textTransform: "uppercase",
                  background: "#6366f1",
                }}
              >
                <span>{loading ? "Sending…" : "Join Now"}</span>
              </button>
            </form>
          )}

          {/* Privacy note */}
          {!success && (
            <p className="nl-sans text-white/60 mt-4" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
              Exclusive updates • Early access • No spam
            </p>
          )}

          {/* Bottom brand line */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/40 inline-block" />
            <p className="nl-sans text-white/60 tracking-[3px] uppercase" style={{ fontSize: "9px" }}>
              LL Leather Lovers · Premium Since 2020
            </p>
            <span className="w-8 h-px bg-white/40 inline-block" />
          </div>

        </div>
      </section>
    </>
  );
};

export default NewsletterBox;