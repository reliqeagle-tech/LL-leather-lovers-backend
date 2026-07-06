import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

// MUI
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

// MUI theme override — dark luxury
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    background: { paper: "#0e0e16", default: "#08080f" },
    text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.45)" },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgba(255,255,255,0.07)" },
      },
    },
  },
});

// Nav link item
const NavItem = ({ to, icon, label, onClick, danger = false }) => {
  const base =
    "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer select-none group";
  const content = (
    <span className="flex items-center gap-3 w-full">
      <span className={`text-white/35 ${danger ? 'group-hover:text-red-400' : 'group-hover:text-indigo-400'} transition-colors duration-200`}>
        {icon}
      </span>
      <span
        className={`text-white/50 ${danger ? 'group-hover:text-red-400' : 'group-hover:text-white/90'} font-medium transition-colors duration-200`}
        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", letterSpacing: "0.5px" }}
      >
        {label}
      </span>
    </span>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} hover:bg-white/[0.04] text-left`}>
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${isActive
          ? "bg-indigo-600/15 border border-indigo-500/25"
          : "hover:bg-white/[0.04] border border-transparent"
        }`
      }
    >
      {({ isActive }) => (
        <span className="flex items-center gap-3 w-full">
          <span
            className={`transition-colors duration-200 ${isActive ? "text-indigo-400" : "text-white/35 group-hover:text-indigo-400"
              }`}
          >
            {icon}
          </span>
          <span
            className={`font-medium transition-colors duration-200 ${isActive ? "text-white" : "text-white/50 group-hover:text-white/90"
              }`}
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", letterSpacing: "0.5px" }}
          >
            {label}
          </span>
          {isActive && (
            <span className="ml-auto w-1 h-1 rounded-full bg-indigo-400 inline-block" />
          )}
        </span>
      )}
    </NavLink>
  );
};

const AccountSidebar = () => {
  const { backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [backendUrl]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${backendUrl}/api/user/user-avatar`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success("Profile photo updated!");
        setUser((prev) => ({ ...prev, avatar: data.imageUrl }));
        setPreviewImage(null);
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return null;

  // const imageSrc =
  //   previewImage ||
  //   (user.profilePhoto ? `${backendUrl}${user.profilePhoto}` : assets.profileImg);
  const imageSrc = previewImage || user.avatar || assets.profileImg;

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        className="sticky top-20 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0e0e18 0%, #0b0b14 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top indigo accent line */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, #6366f1, #a5b4fc, transparent)" }}
        />

        {/* ── PROFILE TOP ── */}
        <div className="flex flex-col items-center pt-8 pb-6 px-5">

          {/* Avatar with upload */}
          <Tooltip title="Change photo" placement="top" arrow>
            <label className="relative cursor-pointer group mb-4">
              <Avatar
                src={imageSrc}
                alt={user.name}
                sx={{
                  width: 88, height: 88,
                  border: "2px solid rgba(99,102,241,0.45)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.2)",
                  opacity: uploading ? 0.5 : 1,
                  transition: "opacity 0.2s, box-shadow 0.3s",
                  "&:hover": { boxShadow: "0 0 32px rgba(99,102,241,0.45)" },
                }}
              />

              {/* Upload overlay */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(8,8,15,0.65)" }}
              >
                {uploading ? (
                  <CircularProgress size={20} sx={{ color: "#818cf8" }} />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                )}
              </div>

              {/* Indigo ring on hover */}
              <div
                className="absolute inset-[-3px] rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200 pointer-events-none"
                style={{ border: "2px solid rgba(99,102,241,0.6)" }}
              />

              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </Tooltip>

          {/* Name */}
          <p
            className="text-white font-light text-center leading-tight mb-1"
            style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px" }}
          >
            {user.name}
          </p>

          {/* Email */}
          <p
            className="text-white/55 text-center"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "11px", letterSpacing: "1px" }}
          >
            {user.email}
          </p>

          {/* Member badge */}
          <div
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="#818cf8">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>
            <span
              className="text-indigo-300 font-semibold uppercase"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "2px" }}
            >
              Premium Member
            </span>
          </div>
        </div>

        <Divider />

        {/* ── NAV LINKS ── */}
        <div className="p-3 space-y-1">
          <NavItem
            to="/profile"
            label="My Profile"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
          <NavItem
            to="/wishlist"
            label="My Wishlist"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            }
          />
          <NavItem
            to="/orders"
            label="My Orders"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
          />
        </div>

        <Divider />

        {/* Logout */}
        <div className="p-3">
          <NavItem
            label="Logout"
            onClick={handleLogout}
            danger={true}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            }
          />
        </div>

        {/* Bottom brand line */}
        <div className="px-5 pb-2 text-center">
          <p
            className="text-white/55 uppercase tracking-widest"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "9px", letterSpacing: "2px" }}
          >
            LL Leather Lovers · 2020
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AccountSidebar;