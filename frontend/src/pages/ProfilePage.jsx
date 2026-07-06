import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountSidebar from '../components/AccountSidebar';
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

// ✅ FIX 4 - disabled prop add kiya
const InputField = ({ label, type = "text", placeholder, value, onChange, icon, disabled }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-white/70 font-semibold uppercase tracking-widest"
      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "2px" }}>
      {label}
    </label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50
          group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg text-white/80 placeholder-white/55
          focus:outline-none transition-all duration-200"
        style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: "13px",
          padding: icon ? "11px 14px 11px 40px" : "11px 14px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "none",
          opacity: disabled ? 0.45 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
        onFocus={e => {
          if (disabled) return;
          e.target.style.border = "1px solid rgba(99,102,241,0.5)";
          e.target.style.background = "rgba(99,102,241,0.05)";
          e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
        }}
        onBlur={e => {
          e.target.style.border = "1px solid rgba(255,255,255,0.09)";
          e.target.style.background = "rgba(255,255,255,0.04)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  </div>
);

const MyAccount = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userId, setUserId] = useState(null);    // ✅ FIX 1 - false → null
  const [loading, setLoading] = useState(false);   // ✅ FIX 1 - setLoding → setLoading
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },  // ✅ FIX 2 - "Bearer:" → "Bearer "
        });
        if (data.success) {
          const u = data.user;
          setUserId(u._id);
          const parts = (u.name || "").split(" ");
          setForm({
            firstName: parts[0] || "",
            lastName: parts.slice(1).join(" ") || "",
            email: u.email || "",
            phone: u.mobile || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [backendUrl]);

  const handleChange = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) return toast.error("User not loaded yet");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${backendUrl}/api/user/${userId}`,
        { name: `${form.firstName} ${form.lastName}`.trim(), mobile: form.phone },
        { headers: { Authorization: `Bearer ${token}` } }  // ✅ FIX 3 - headers wrapper add kiya
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-10">

      <div className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        <div className="md:w-[24%] shrink-0">
          <AccountSidebar />
        </div>

        <div className="flex-1 min-w-0 max-w-4xl">

          <div className="mb-7">
            <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-1"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "4px" }}>
              Account
            </p>
            <h1 className="text-white font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,40px)" }}>
              My <em className="text-indigo-400 italic font-light">Profile</em>
            </h1>
            <div className="w-24 h-px mt-3"
              style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>

          <div className="rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}>

            <div className="h-px w-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #a5b4fc, transparent)" }} />

            <div className="p-6 sm:p-8">

              {/* Header — badge + Edit button */}
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/[0.06]">
                <div className="hidden sm:flex items-center gap-1.5
                  bg-indigo-600/10 border border-indigo-500/20 rounded-full px-3 py-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#818cf8">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-indigo-300 font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px" }}>
                    Premium Member
                  </span>
                </div>

                {/* ✅ FIX 4 - Edit button */}
                {!editing && (
                  <button type="button" onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white/70
                      rounded-lg px-4 py-2 border border-white/[0.08] hover:border-indigo-500/30
                      transition-all duration-200 font-semibold uppercase"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "1.5px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    EDIT
                  </button>
                )}
              </div>

              {/* Success banner */}
              {saved && (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                  rounded-lg px-4 py-2.5 mb-5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#4ade80" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-green-400"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px" }}>
                    Profile saved successfully!
                  </span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-5">
                <p className="text-white/80 uppercase tracking-widest font-semibold"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "3px" }}>
                  Personal Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="First Name" placeholder="John"
                    value={form.firstName} onChange={handleChange("firstName")}
                    disabled={!editing}
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                  />
                  <InputField label="Last Name" placeholder="Doe"
                    value={form.lastName} onChange={handleChange("lastName")}
                    disabled={!editing}
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                  />
                </div>

                <InputField label="Email Address" type="email" placeholder="john@example.com"
                  value={form.email} onChange={handleChange("email")}
                  disabled={true}
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
                />

                <div className="w-full sm:w-1/2">
                  <InputField label="Mobile Number" type="tel" placeholder="+1 (415) 555-0132"
                    value={form.phone} onChange={handleChange("phone")}
                    disabled={!editing}
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.88a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>}
                  />
                </div>

                <p style={{ fontSize: "12px", color: "#818cf8", fontStyle: "italic", fontFamily: "'Montserrat',sans-serif" }}>
                  ◆ &nbsp;Email address cannot be changed.
                </p>

                <div className="h-px w-full border-t border-white/[0.06]" />

                {/* ✅ FIX 4 - Sirf editing mode me show karo */}
                {editing && (
                  <div className="flex items-center gap-3 pt-1">
                    <button type="submit" disabled={loading}
                      className="relative overflow-hidden inline-flex items-center gap-2
                        text-white rounded-lg px-7 py-2.5 font-semibold uppercase tracking-widest
                        hover:opacity-90 transition-all duration-200 group disabled:opacity-60"
                      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "2px", background: "#6366f1" }}>
                      <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100
                        origin-left transition-transform duration-300 rounded-lg" />
                      {loading ? (
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                          SAVING...
                        </span>
                      ) : (
                        <>
                          <svg className="relative z-10" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                          </svg>
                          <span className="relative z-10">Save Changes</span>
                        </>
                      )}
                    </button>

                    <button type="button" onClick={() => setEditing(false)}
                      className="inline-flex items-center gap-2 text-white/40 hover:text-white/70
                        rounded-lg px-5 py-2.5 border border-white/[0.08] hover:border-white/20
                        transition-all duration-200 font-semibold uppercase tracking-widest"
                      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "2px" }}>
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;