import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { GoHeartFill } from "react-icons/go";
import axios from "axios";
import {
  faMagnifyingGlass,
  faUser,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

const NavStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@400;500;600&display=swap');

    .nav-brand  { font-family: 'Cormorant Garamond', serif; }
    .nav-links  { font-family: 'Montserrat', sans-serif; }

    /* ── nav item hover underline ── */
    .nav-item-line { position: relative; }
    .nav-item-line::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 1.5px;
      background: #818cf8;
      transition: width 0.28s ease;
    }
    .nav-item-line:hover::after,
    .nav-item-line.active-link::after { width: 100%; }

    /* ── mega menu slide-down ── */
    @keyframes megaIn {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .mega-enter { animation: megaIn 0.22s ease forwards; }

    /* ── mobile sidebar ── */
    @keyframes sideIn  { from { transform: translateX(100%); } to { transform: translateX(0); } }
    @keyframes sideOut { from { transform: translateX(0); }   to { transform: translateX(100%); } }
    .sidebar-open  { animation: sideIn  0.3s cubic-bezier(.22,1,.36,1) forwards; }
    .sidebar-close { animation: sideOut 0.3s cubic-bezier(.22,1,.36,1) forwards; }

    /* ── icon glow on hover ── */
    .icon-btn { transition: color 0.2s, filter 0.2s; }
    .icon-btn:hover { color: #818cf8; filter: drop-shadow(0 0 6px rgba(129,140,248,.55)); }

    /* ── scrolled glass ── */
    .nav-glass {
      background: rgba(5,5,5,0.93) !important;
      backdrop-filter: blur(18px) saturate(1.4);
      box-shadow: 0 8px 32px rgba(0,0,0,0.55);
    }

    /* ── logo hover glow ── */
    .logo-mark { transition: filter 0.3s; }
    .logo-wrap:hover .logo-mark {
      filter: drop-shadow(0 0 8px rgba(129,140,248,.7));
    }

    /* ── tablet gap compression ── */
    @media (min-width: 640px) and (max-width: 900px) {
      .nav-mid-gap  { gap: 18px !important; }
      .nav-right-gap { gap: 12px !important; }
      .nav-text-size { font-size: 10px !important; }
    }
  `}</style>
);

/* ── SVG Logo ── */
const LogoMark = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="logo-mark flex-shrink-0"
  >
    <path
      d="M18 2L34 18L18 34L2 18L18 2Z"
      stroke="#6366f1"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M18 8L28 18L18 28L8 18L18 8Z"
      fill="#6366f1"
      fillOpacity="0.15"
      stroke="#818cf8"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <text
      x="11"
      y="22"
      fontFamily="Cormorant Garamond, serif"
      fontSize="12"
      fontWeight="700"
      fill="#ffffff"
    >
      L
    </text>
    <text
      x="18"
      y="22"
      fontFamily="Cormorant Garamond, serif"
      fontSize="12"
      fontWeight="700"
      fill="#818cf8"
    >
      L
    </text>
  </svg>
);

const corners = [
  { pos: "top-2 left-2", b: "border-t border-l" },
  { pos: "top-2 right-2", b: "border-t border-r" },
  { pos: "bottom-2 left-2", b: "border-b border-l" },
  { pos: "bottom-2 right-2", b: "border-b border-r" },
];

const C = {
  indigo: "#6366f1",
  navBorder: "rgba(99,102,241,0.25)"
};

/* ════════════════════════════
   MAIN NAVBAR
════════════════════════════ */
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [sidebarAnim, setSidebarAnim] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileAccord, setMobileAccord] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const hideTimeoutRef = useRef(null);

  const {
    wishlist,
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    backendUrl,
  } = useContext(ShopContext);

  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/category/list`);
        if (res.data.success) setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to load categories for navbar:", err.message);
      }
    };
    fetchCategories();
  }, [backendUrl]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);


  // Helper: get subcategory string array for a given categoryName
  const getSubcats = (categoryName) => {
    const cat = categories.find(c => c.categoryName === categoryName);
    return cat?.subCategories || [];
  };


  // Helper: turn a string array into [{label, categoryName}]
  const toItems = (categoryName, subs) => subs.map(s => ({ label: s, categoryName }));
  const menSubs = toItems("Men", getSubcats("Men"));
  const womenSubsAll = getSubcats("Women");
  const womenHalf = Math.ceil(womenSubsAll.length / 2);
  const womenSubsCol1 = toItems("Women", womenSubsAll.slice(0, womenHalf));
  const womenSubsCol2 = toItems("Women", womenSubsAll.slice(womenHalf));

  useEffect(() => {
    setActiveMenu(null);
    setVisible(false);
  }, [location]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const hideMenu = () => {
    hideTimeoutRef.current = setTimeout(() => setActiveMenu(null), 280);
  };
  const showMenu = (m) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setActiveMenu(m);
  };

  const openSidebar = () => {
    setVisible(true);
    setSidebarAnim(true);
  };
  const closeSidebar = () => {
    setSidebarAnim(false);
    setTimeout(() => setVisible(false), 280);
  };
  const toggleAccord = (s) => setMobileAccord(mobileAccord === s ? null : s);
  const isActive = (p) => location.pathname === p;

  return (
    <>
      <NavStyles />

      {/*
        ┌──────────────────────────────────────────┐
        │  border-b-2 border-indigo-600            │
        │  → single solid indigo line always shown │
        │    at the very bottom of the navbar      │
        └──────────────────────────────────────────┘
      */}
      <header
        className={`
          border-b-2 border-indigo-600
          sticky top-0 z-[9999] transition-all duration-300
          ${scrolled ? "nav-glass" : "bg-[#050505]"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            {/* LOGO */}
            <Link
              to="/"
              className="logo-wrap flex items-center gap-2.5 flex-shrink-0 group"
            >
              <LogoMark />
              <div className="flex flex-col leading-none">
                <span className="nav-brand text-[18px] sm:text-[20px] font-semibold text-white leading-[1.1] tracking-wide">
                  <span className="text-indigo-400">LL</span>
                  <span className="text-white/90"> Leather</span>
                </span>
                <span className="nav-brand text-[10px] sm:text-[11px] tracking-[3px] text-white/40 uppercase font-normal">
                  Lovers
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav
              className="hidden sm:flex items-center nav-mid-gap"
              style={{ gap: "28px" }}
            >
              <NavLink
                to="/"
                className={`nav-item-line nav-text-size text-[11px] font-[500] tracking-[2px] uppercase transition-colors duration-200
                  ${isActive("/") ? "text-indigo-400 active-link" : "text-white/70 hover:text-white"}`}
              >
                Home
              </NavLink>

              {/* MEN */}
              <li
                onMouseEnter={() => showMenu("men")}
                onMouseLeave={hideMenu}
                className="list-none relative"
              >
                <button
                  className={`nav-item-line nav-text-size flex items-center gap-0.5 text-[11px] font-[500] tracking-[2px] uppercase transition-colors duration-200
                  ${activeMenu === "men" ? "text-indigo-400 active-link" : "text-white/70 hover:text-white"}`}
                >
                  Men
                  <RiArrowDropDownLine
                    className={`text-xl transition-transform duration-300 ${activeMenu === "men" ? "rotate-180" : ""}`}
                  />
                </button>

                {activeMenu === "men" && (
                  // <MegaMenu
                  //   showMenu={() => showMenu("men")}
                  //   hideMenu={hideMenu}
                  // >
                  //   <MegaColumn
                  //     title="TOPS"
                  //     items={[
                  //       {
                  //         label: "Jackets",
                  //         category: "Topwear",
                  //         gender: "Men",
                  //       },
                  //       { label: "Coats", category: "Topwear", gender: "Men" },
                  //     ]}
                  //   />
                  //   <MegaColumn
                  //     title="OTHERS"
                  //     items={[
                  //       { label: "Pillow", category: "Others", gender: "Men" },
                  //       {
                  //         label: "Cushion Cover",
                  //         category: "Others",
                  //         gender: "Men",
                  //       },
                  //       { label: "Aprons", category: "Others", gender: "Men" },
                  //       {
                  //         label: "Desk Mat",
                  //         category: "Others",
                  //         gender: "Men",
                  //       },
                  //       {
                  //         label: "Chair Cover",
                  //         category: "Others",
                  //         gender: "Men",
                  //       },
                  //     ]}
                  //   />
                  //   <div className="flex-shrink-0 w-[200px] xl:w-[230px] self-start">
                  //     <div className="relative overflow-hidden rounded-lg">
                  //       <img
                  //         src={assets.men1}
                  //         className="w-full h-[240px] xl:h-[270px] object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-500"
                  //         alt="Men"
                  //       />
                  //       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  //       <p className="absolute bottom-3 left-3 text-white text-[10px] tracking-[2px] uppercase">
                  //         Men's Edit
                  //       </p>
                  //     </div>
                  //   </div>
                  // </MegaMenu>

                  <MegaMenu showMenu={() => showMenu("men")} hideMenu={hideMenu}>
                    <MegaColumn title="Shop By Type" badge="MEN'S COLLECTION" items={menSubs} />
                    <div style={{ width: 1, alignSelf: "stretch", background: C.navBorder }} />
                    <div className="ddl-mega-img-wrap" style={{
                      marginLeft: "auto", flexShrink: 0, width: 170,
                      position: "relative", overflow: "hidden", borderRadius: 6,
                      boxShadow: "0 4px 20px rgba(91,91,214,0.12)",
                    }}>
                      <img src={assets.men1} alt="Men's Collection" style={{
                        width: "100%", height: 220, objectFit: "cover", display: "block",
                        filter: "brightness(1.05) contrast(1.08)", transition: "transform 0.5s",
                      }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"}
                      />
                      {corners.map((c, i) => (
                        <span key={i} className={`absolute w-4 h-4 ${c.pos} ${c.b}`}
                          style={{ borderColor: C.indigo, opacity: 0.6 }} />
                      ))}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "8px 12px", fontSize: 8, fontWeight: 700,
                        letterSpacing: "0.25em", textTransform: "uppercase",
                        textAlign: "center", color: "#fff",
                        background: "linear-gradient(to top,rgba(30,27,75,0.88),transparent)",
                      }}>Men's Collection</div>
                    </div>
                  </MegaMenu>
                )}
              </li>

              {/* WOMEN */}
              <li
                onMouseEnter={() => showMenu("women")}
                onMouseLeave={hideMenu}
                className="list-none relative"
              >
                <button
                  className={`nav-item-line nav-text-size flex items-center gap-0.5 text-[11px] font-[500] tracking-[2px] uppercase transition-colors duration-200
                  ${activeMenu === "women" ? "text-indigo-400 active-link" : "text-white/70 hover:text-white"}`}
                >
                  Women
                  <RiArrowDropDownLine
                    className={`text-xl transition-transform duration-300 ${activeMenu === "women" ? "rotate-180" : ""}`}
                  />
                </button>

                {activeMenu === "women" && (
                  // <MegaMenu
                  //   showMenu={() => showMenu("women")}
                  //   hideMenu={hideMenu}
                  // >
                  //   <MegaColumn
                  //     title="TOPS"
                  //     items={[
                  //       {
                  //         label: "Jackets",
                  //         category: "Topwear",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Bomber Biker Jacket",
                  //         category: "Topwear",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Moto Biker Jacket",
                  //         category: "Topwear",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Racing Coat",
                  //         category: "Topwear",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Women Winter Wear",
                  //         category: "Topwear",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Women Night Dress",
                  //         category: "Topwear",
                  //         gender: "Women",
                  //       },
                  //     ]}
                  //   />
                  //   <MegaColumn
                  //     title="BOTTOMS"
                  //     items={[
                  //       {
                  //         label: "Leather Pencil Skirt",
                  //         category: "Bottomwear",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Leather Full Skirt",
                  //         category: "Bottomwear",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Slim Bodycon Skirt",
                  //         category: "Bottomwear",
                  //         gender: "Women",
                  //       },
                  //     ]}
                  //   />
                  //   <MegaColumn
                  //     title="OTHERS"
                  //     items={[
                  //       {
                  //         label: "Pillow",
                  //         category: "Others",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Cushion Cover",
                  //         category: "Others",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Aprons",
                  //         category: "Others",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Desk Mat",
                  //         category: "Others",
                  //         gender: "Women",
                  //       },
                  //       {
                  //         label: "Chair Cover",
                  //         category: "Others",
                  //         gender: "Women",
                  //       },
                  //     ]}
                  //   />
                  //   <div className="flex-shrink-0 w-[200px] xl:w-[230px] self-start">
                  //     <div className="relative overflow-hidden rounded-lg">
                  //       <img
                  //         src={assets.women1}
                  //         className="w-full h-[240px] xl:h-[270px] object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-500"
                  //         alt="Women"
                  //       />
                  //       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  //       <p className="absolute bottom-3 left-3 text-white text-[10px] tracking-[2px] uppercase">
                  //         Women's Edit
                  //       </p>
                  //     </div>
                  //   </div>
                  // </MegaMenu>
                  <MegaMenu showMenu={() => showMenu("women")} hideMenu={hideMenu}>
                    <MegaColumn title="Shop By Type" badge="WOMEN'S COLLECTION" items={womenSubsCol1} />
                    <div style={{ width: 1, alignSelf: "stretch", background: C.navBorder }} />
                    <MegaColumn title="More Styles" items={womenSubsCol2} />
                    <div style={{ width: 1, alignSelf: "stretch", background: C.navBorder }} />
                    <div className="ddl-mega-img-wrap" style={{
                      marginLeft: "auto", flexShrink: 0, width: 170,
                      position: "relative", overflow: "hidden", borderRadius: 6,
                      boxShadow: "0 4px 20px rgba(91,91,214,0.12)",
                    }}>
                      <img src={assets.women1} alt="Women's Collection" style={{
                        width: "100%", height: 220, objectFit: "cover", display: "block",
                        filter: "brightness(1.05) contrast(1.08)", transition: "transform 0.5s",
                      }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"}
                      />
                      {corners.map((c, i) => (
                        <span key={i} className={`absolute w-4 h-4 ${c.pos} ${c.b}`}
                          style={{ borderColor: C.indigo, opacity: 0.6 }} />
                      ))}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "8px 12px", fontSize: 8, fontWeight: 700,
                        letterSpacing: "0.25em", textTransform: "uppercase",
                        textAlign: "center", color: "#fff",
                        background: "linear-gradient(to top,rgba(30,27,75,0.88),transparent)",
                      }}>Women's Collection</div>
                    </div>
                  </MegaMenu>
                )}
              </li>

              {[
                { to: "/collection", label: "Collection" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={`nav-item-line nav-text-size text-[11px] font-[500] tracking-[2px] uppercase transition-colors duration-200
                    ${isActive(to) ? "text-indigo-400 active-link" : "text-white/70 hover:text-white"}`}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT ICONS */}
            <div
              className="flex items-center nav-right-gap"
              style={{ gap: "18px" }}
            >
              {/* Search – desktop */}
              <button
                onClick={() => {
                  setShowSearch(true);
                  navigate("/collection");
                }}
                className="icon-btn text-white/75 text-[17px] p-1 hidden sm:block"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              {/* Profile – desktop */}
              <div className="group relative hidden sm:block">
                <button
                  onClick={() => !token && navigate("/login")}
                  className="icon-btn text-white/75 text-[17px] p-1"
                  aria-label="Account"
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                {token && (
                  <div className="group-hover:block hidden absolute right-0 top-full pt-3 z-[9999] min-w-[160px]">
                    <div className="bg-[#111] border border-white/10 rounded-xl py-2 shadow-2xl shadow-black/60 overflow-hidden">
                      {[
                        {
                          label: "My Profile",
                          action: () => navigate("/profile"),
                        },
                        { label: "Orders", action: () => navigate("/orders") },
                        { label: "Logout", action: logout },
                      ].map(({ label, action }) => (
                        <button
                          key={label}
                          onClick={action}
                          className="w-full text-left px-4 py-3 text-[11px] tracking-[1px] uppercase
                            text-white/55 hover:text-white hover:bg-indigo-500/10 transition-colors nav-links"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative icon-btn text-white/75 p-1"
              >
                <GoHeartFill className="text-[19px]" />
                {wishlist?.length > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white text-[9px]
                    w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold leading-none
                    shadow-lg shadow-indigo-900/50"
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative icon-btn text-white/75 p-1">
                <FontAwesomeIcon icon={faBagShopping} className="text-[19px]" />
                {getCartCount() > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white text-[9px]
                    w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold leading-none
                    shadow-lg shadow-indigo-900/50"
                  >
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Search – mobile */}
              <button
                onClick={() => {
                  setShowSearch(true);
                  navigate("/collection");
                }}
                className="icon-btn text-white/75 text-[17px] p-1 sm:hidden"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              {/* Hamburger – mobile */}
              <button
                onClick={openSidebar}
                className="sm:hidden icon-btn text-white/75 text-[22px] p-1"
                aria-label="Open menu"
              >
                <HiOutlineMenuAlt3 />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════
          MOBILE SIDEBAR
      ══════════════════════════ */}
      {visible && (
        <>
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[9998]"
            onClick={closeSidebar}
          />

          <div
            className={`fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#080808]
            z-[9999] flex flex-col overflow-hidden
            ${sidebarAnim ? "sidebar-open" : "sidebar-close"}`}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-indigo-600/40">
              <div className="flex items-center gap-2.5">
                <LogoMark />
                <div className="flex flex-col leading-none">
                  <span className="nav-brand text-[17px] font-semibold text-white">
                    <span className="text-indigo-400">LL</span> Leather
                  </span>
                  <span className="nav-brand text-[9px] tracking-[3px] text-white/35 uppercase">
                    Lovers
                  </span>
                </div>
              </div>
              <button
                onClick={closeSidebar}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                <HiX className="text-[20px]" />
              </button>
            </div>

            {/* Sidebar links */}
            <nav className="flex-1 overflow-y-auto nav-links">
              <MobileSidebarLink to="/" label="Home" close={closeSidebar} />

              {/* <MobileAccordion
                title="Men"
                open={mobileAccord === "men"}
                toggle={() => toggleAccord("men")}
                sections={{
                  TOPS: [
                    { label: "Jackets", category: "Topwear", gender: "Men" },
                    {
                      label: "Leather Coats",
                      category: "Topwear",
                      gender: "Men",
                    },
                    { label: "Coats", category: "blazers", gender: "men" },
                  ],
                  OTHERS: [
                    { label: "Pillow", category: "Others", gender: "Men" },
                    {
                      label: "Cushion Cover",
                      category: "Others",
                      gender: "Men",
                    },
                    { label: "Aprons", category: "Others", gender: "men" },
                    { label: "Desk Mat", category: "Others", gender: "Men" },
                    { label: "Chair Cover", category: "Others", gender: "Men" },
                  ],
                }}
                closeSidebar={closeSidebar}
              /> */}

              <MobileAccordion title="Men" open={mobileAccord === "men"}
                toggle={() => setMobileAccord(mobileAccord === "men" ? null : "men")}
                sections={{ "SHOP MEN'S": menSubs }}
                closeSidebar={closeSidebar}
              />

              {/* <MobileAccordion
                title="Women"
                open={mobileAccord === "women"}
                toggle={() => toggleAccord("women")}
                sections={{
                  TOPS: [
                    { label: "Jackets", category: "Topwear", gender: "Women" },
                    {
                      label: "Bomber Biker Jacket",
                      category: "Topwear",
                      gender: "Women",
                    },
                    {
                      label: "Moto Biker Jacket",
                      category: "Topwear",
                      gender: "Women",
                    },
                    {
                      label: "Racing Coat",
                      category: "Topwear",
                      gender: "Women",
                    },
                    {
                      label: "Women Winter Wear",
                      category: "Topwear",
                      gender: "Women",
                    },
                    {
                      label: "Women Night Dress",
                      category: "Topwear",
                      gender: "Women",
                    },
                  ],
                  BOTTOMS: [
                    {
                      label: "Leather Pencil Skirt",
                      category: "Bottomwear",
                      gender: "Women",
                    },
                    {
                      label: "Leather Full Skirt",
                      category: "Bottomwear",
                      gender: "Women",
                    },
                    {
                      label: "Slim Bodycon Skirt",
                      category: "Bottomwear",
                      gender: "Women",
                    },
                  ],
                  OTHERS: [
                    { label: "Pillow", category: "Others", gender: "other" },
                    {
                      label: "Cushion Cover",
                      category: "Others",
                      gender: "Women",
                    },
                    { label: "Aprons", category: "Others", gender: "Women" },
                    { label: "Desk Mat", category: "Others", gender: "Women" },
                    {
                      label: "Chair Cover",
                      category: "Others",
                      gender: "Women",
                    },
                  ],
                }}
                closeSidebar={closeSidebar}
              /> */}
              <MobileAccordion title="Women" open={mobileAccord === "women"}
                toggle={() => setMobileAccord(mobileAccord === "women" ? null : "women")}
                sections={{ "SHOP WOMEN'S": toItems("Women", womenSubsAll) }}
                closeSidebar={closeSidebar}
              />

              <MobileSidebarLink
                to="/collection"
                label="Collection"
                close={closeSidebar}
              />
              <MobileSidebarLink
                to="/about"
                label="About"
                close={closeSidebar}
              />
              <MobileSidebarLink
                to="/contact"
                label="Contact"
                close={closeSidebar}
              />

              {/* Account links */}
              <div className="mt-2 border-t border-white/[0.07] pt-2">
                {token ? (
                  <>
                    <MobileSidebarLink
                      to="/profile"
                      label="My Profile"
                      close={closeSidebar}
                    />
                    <MobileSidebarLink
                      to="/orders"
                      label="Orders"
                      close={closeSidebar}
                    />
                    <button
                      onClick={() => {
                        logout();
                        closeSidebar();
                      }}
                      className="block w-full text-left px-6 py-3.5 text-[11px] tracking-[2px] uppercase
                        text-red-400/70 hover:text-red-400 border-b border-white/[0.05] transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <MobileSidebarLink
                    to="/login"
                    label="Login / Register"
                    close={closeSidebar}
                  />
                )}
              </div>
            </nav>

            {/* Sidebar footer */}
            <div className="px-5 py-4 border-t border-indigo-600/30 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-indigo-400" />
              <p className="text-white/25 text-[10px] tracking-[2px] uppercase nav-links">
                Premium Leather Since 2020
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/* ════════════════════════════════════════
   HELPER COMPONENTS
════════════════════════════════════════ */

const MegaMenu = ({ children, showMenu, hideMenu }) => (
  <div
    onMouseEnter={showMenu}
    onMouseLeave={hideMenu}
    // className="mega-enter fixed inset-x-0 top-[70px] bg-[#060606]/98 backdrop-blur-2xl
    //   border-t border-indigo-600/50
    //   shadow-2xl shadow-black/80 z-[9998]"
    className="mega-enter fixed inset-x-0 top-[70px] bg-[#060606] 
  
  shadow-2xl shadow-black/80 z-[9998]"
  >
    <div className="max-w-7xl mx-auto flex flex-wrap gap-8 xl:gap-12 px-6 xl:px-8 py-8 xl:py-10 items-start">
      {children}
    </div>
  </div>
);

const MegaColumn = ({ title, items, badge }) => (
  <div className="flex-1 min-w-[130px] xl:min-w-[150px]">
    {badge && (
      <div className="flex items-center gap-2 mb-3">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M7 1l1.5 3.1 3.4.5-2.5 2.4.6 3.4L7 9l-3 1.4.6-3.4L2.1 4.6l3.4-.5z"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="rgba(99,102,241,.12)"
          />
        </svg>

        <span className="text-[8px] tracking-[4px] uppercase text-indigo-400 font-semibold">
          {badge}
        </span>
      </div>
    )}
    <h3
      className="nav-links text-[9px] font-[600] tracking-[3.5px] uppercase text-indigo-400 mb-4 pb-2
      border-b border-white/[0.07] flex items-center gap-2"
    >
      <span className="w-3 h-[1px] bg-indigo-500 flex-shrink-0" />
      {title}
    </h3>
    <ul className="space-y-[10px]">
      {items.map((item, i) => {
        // const toURL = item.category === "Others"
        //   ? `/collection?category=Others&sub=${encodeURIComponent(item.label)}`
        //   : `/collection?category=${encodeURIComponent(item.gender)}&sub=${encodeURIComponent(item.label)}`;

        const toURL =
          `/collection?category=${encodeURIComponent(item.categoryName)}&sub=${encodeURIComponent(item.label)}`;
        return (
          <li key={i}>
            <Link
              to={toURL}
              className="nav-links text-[12px] text-white/80 hover:text-indigo-400 tracking-[0.3px]
                transition-all duration-200 flex items-center gap-2 group"
            >
              <span className="w-0 group-hover:w-[6px] h-[1px] bg-indigo-400 transition-all duration-200 flex-shrink-0" />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

const MobileSidebarLink = ({ to, label, close }) => (
  <NavLink
    to={to}
    onClick={close}
    className={({ isActive }) =>
      `block px-6 py-3.5 text-[11px] tracking-[2px] uppercase font-[500]
       border-b border-white/[0.05] transition-all duration-150
       ${isActive
        ? "text-indigo-400 bg-indigo-500/8 border-l-2 border-l-indigo-500 pl-5"
        : "text-white/60 hover:text-white hover:bg-white/[0.03] hover:pl-7"
      }`
    }
  >
    {label}
  </NavLink>
);

const MobileAccordion = ({ title, open, toggle, sections, closeSidebar }) => (
  <div className="border-b border-white/[0.05]">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between px-6 py-3.5
        text-[11px] tracking-[2px] uppercase font-[500] transition-colors duration-150
        text-white/60 hover:text-white"
    >
      {title}
      <RiArrowDropDownLine
        className={`text-2xl transition-transform duration-300 flex-shrink-0
        ${open ? "rotate-180 text-indigo-400" : "text-white/40"}`}
      />
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out
      ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="px-6 pb-5 pt-1 space-y-5 bg-white/[0.015]">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section}>
            <h4 className="text-[9px] tracking-[3px] uppercase text-indigo-400/70 font-[600] mb-3 flex items-center gap-1.5">
              <span className="w-2 h-[1px] bg-indigo-500/50" />
              {section}
            </h4>
            <ul className="space-y-2.5">
              {items.map((item, i) => (
                <li key={i}>
                  <Link
                    // to={`/collection?category=${encodeURIComponent(item.gender)}&sub=${encodeURIComponent(item.category)}`}
                    to={`/collection?category=${encodeURIComponent(item.categoryName)}&sub=${encodeURIComponent(item.label)}`}
                    className="flex items-center gap-2 text-[12px] text-white/45 hover:text-indigo-400 transition-all duration-200 group"
                    onClick={closeSidebar}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full border border-white/20
                      group-hover:border-indigo-400 group-hover:bg-indigo-400/30 transition-all flex-shrink-0"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Navbar;
