// import React, { useContext, useState, useRef } from "react";
// import { assets } from "../assets/assets";
// import { Link, NavLink } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ITEM_TO_SUBCATEGORY } from "./categoriesMapping";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import { GoHeartFill } from "react-icons/go";
// import {
//   faMagnifyingGlass,
//   faUser,
//   faBagShopping,
// } from "@fortawesome/free-solid-svg-icons";
// import Title from "./Title";

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [mobileAccord, setMobileAccord] = useState(null);
//   const hideTimeoutRef = useRef(null);
//   const {wishlist} = useContext(ShopContext);

//   const {
//     setShowSearch,
//     getCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems,
//   } = useContext(ShopContext);

//   const logout = () => {
//     navigate("/login");
//     localStorage.removeItem("token");
//     setToken("");
//     setCartItems({});
//   };

//   const hideMenu = () => {
//     hideTimeoutRef.current = setTimeout(() => {
//       setActiveMenu(null);
//     }, 300);
//   };

//   const showMenu = (menu) => {
//     if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
//     setActiveMenu(menu);
//   };

//   const toggleMobileAccord = (section) => {
//     setMobileAccord(mobileAccord === section ? null : section);
//   };

//   return (
//     <div className="pb-[2px] sticky top-0 z-[9999] bg-gradient-to-r from-indigo-500 via-indigo-500 to-black ">
//       <div className="sticky top-0 z-[99999] bg-black w-full shadow-sm bg-blend-saturation">
//         {/* ------------------- TOP NAV ------------------- */}
//         <div className="flex items-center justify-between py-5 font-medium max-w-7xl mx-auto px-4">
//           <Link to="/">
//             <h1 className="lg:text-2xl font-bold text-white py-2"><span className="text-indigo-500"> LL Leather</span> Lovers</h1>
//           </Link>

//           {/* ------------------- DESKTOP LINKS ------------------- */}
//           <ul className="hidden sm:flex md:gap-8 sm:gap-5 md:text-sm text-xs text-white">
//             <NavLink
//               to="/"
//               className="flex flex-col items-center gap-1 pt-[2px]"
//             >
//               <p className="hover:text-indigo-400">HOME</p>
//             </NavLink>

//             {/* MEN MENU */}
//             <li
//               onMouseEnter={() => showMenu("men")}
//               onMouseLeave={hideMenu}
//               className="relative cursor-pointer"
//             >
//               <div className="flex items-center">
//                 <p className="hover:text-indigo-400">MEN</p>
//                 <RiArrowDropDownLine
//                   className={`text-2xl transition-transform duration-300 ${activeMenu === "men" ? "rotate-180" : "rotate-0"
//                     }`}
//                 />
//               </div>

//               {activeMenu === "men" && (
//                 <MegaMenu
//                   showMenu={() => showMenu("men")}
//                   hideMenu={hideMenu}>
//                   { /* top wear */}
//                   <MegaColumn
//                     title="TOPS"
//                     items={[
//                       {
//                         label: "Jackets",
//                         category: "Topwear",
//                         gender: "Men",
//                       },
//                       {
//                         label: "Coats",
//                         category: "Topwear",
//                         gender: "Men",
//                       },
//                       // {
//                       //   label: "Blazers",
//                       //   category: "Topwear",
//                       //   gender: "Men",
//                       // },
//                       // {
//                       //   label: "Celebrity",
//                       //   category: "Topwear",
//                       //   gender: "Men",
//                       // },
//                       // {
//                       //   label: "Suits",
//                       //   category: "Topwear",
//                       //   gender: "Men",
//                       // },
//                       // {
//                       //   label: "Boys",
//                       //   category: "Topwear",
//                       //   gender: "Men",
//                       // },
//                     ]}
//                   />

//                   {/* <MegaColumn
//                     title="BOTTOMS"
//                     items={[
//                       {
//                         label: "Pants",
//                         category: "Bottomwear",
//                         gender: "Men",
//                       },
//                       {
//                         label: "Shorts",
//                         category: "Bottomwear",
//                         gender: "Men",
//                       },
//                       {
//                         label: "Chaps",
//                         category: "Bottomwear",
//                         gender: "Men",
//                       },
//                     ]}
//                   /> */}

//                   <MegaColumn
//                     title="OTHERS"
//                     items={[
//                       {
//                         label: "Pillow",
//                         category: "Others",
//                         gender: "Men",
//                       },
//                       {
//                         label: "Cushion Cover",
//                         category: "Others",
//                         gender: "Men",
//                       },
//                       {
//                         label: "Aprons",
//                         category: "Others",
//                         gender: "Men",
//                       },
//                       {
//                         label: "Desk Mat",
//                         category: "Others",
//                         gender: "Men",
//                       },
//                       {
//                         label: "Chair Cover",
//                         category: "Others",
//                         gender: "Men",
//                       },
//                     ]}
//                   />

//                   <div className="flex-shrink-0 w-[250px] self-start">
//                     <img
//                       src={assets.men1}
//                       className="rounded-lg shadow-md w-full h-[300px] object-cover"
//                       alt="preview"
//                     />
//                   </div>
//                 </MegaMenu>
//               )}
//             </li>

//             {/* WOMEN MENU */}
//             <li
//               onMouseEnter={() => showMenu("women")}
//               onMouseLeave={hideMenu}
//               className="relative cursor-pointer"
//             >
//               <div className="flex items-center">
//                 <p className="hover:text-indigo-400">WOMEN</p>
//                 <RiArrowDropDownLine
//                   className={`text-2xl transition-transform duration-300 ${activeMenu === "women" ? "rotate-180" : "rotate-0"
//                     }`}
//                 />
//               </div>

//               {activeMenu === "women" && (
//                 <MegaMenu
//                   showMenu={() => showMenu("women")}
//                   hideMenu={hideMenu}
//                 >
//                   {/* TOPS */}
//                   <MegaColumn
//                     title="TOPS"
//                     items={[
//                       { label: "Jackets", category: "Topwear", gender: "Women" },
//                       { label: "Bomber Biker Jacket", category: "Topwear", gender: "Women" },
//                       { label: "Moto Biker Jacket", category: "Topwear", gender: "Women" },
//                       { label: "Racing Coat", category: "Topwear", gender: "Women" },
//                       { label: "Women Winter Wear", category: "Topwear", gender: "Women" },
//                       { label: "Women Night Dress", category: "Topwear", gender: "Women" },
//                     ]}
//                   />

//                   {/* BOTTOMS */}
//                   <MegaColumn
//                     title="BOTTOMS"
//                     items={[
//                       { label: "Leather Pencil Skirt", category: "Bottomwear", gender: "Women" },
//                       { label: "Leather Full Skirt", category: "Bottomwear", gender: "Women" },
//                       { label: "Slim Bodycon Skirt", category: "Bottomwear", gender: "Women" },
//                     ]}
//                   />

//                   {/* ACCESSORIES */}
//                   <MegaColumn
//                     title="OTHERS"
//                     items={[
//                       { label: "Pillow", category: "Others", gender: "Women" },
//                       { label: "Cushion Cover", category: "Others", gender: "Women" },
//                       { label: "Aprons", category: "Others", gender: "Women" },
//                       { label: "Desk Mat", category: "Others", gender: "Women" },
//                       { label: "Chair Cover", category: "Others", gender: "Women" },
//                       // { label: "Wallets", category: "Others", gender: "Women" },
//                       // { label: "Hats", category: "Others", gender: "Women" },
//                     ]}
//                   />

//                   {/* IMAGE */}
//                   <div className="flex-shrink-0 w-[250px] self-start">
//                     <img
//                       src={assets.women1}
//                       className="rounded-lg shadow-md w-full h-[300px] object-cover"
//                       alt=""
//                     />
//                   </div>
//                 </MegaMenu>
//               )}

//             </li>

//             <NavLink className='hover:text-indigo-400' to="/collection">COLLECTION</NavLink>
//             <NavLink className='hover:text-indigo-400' to="/about">ABOUT</NavLink>
//             <NavLink className='hover:text-indigo-400' to="/contact">CONTACT</NavLink>
//           </ul>

//           {/* ------------------- RIGHT ICONS ------------------- */}
//           <div className="flex items-center gap-6">
//             <FontAwesomeIcon
//               onClick={() => {
//                 setShowSearch(true);
//                 navigate("/collection");
//               }}
//               className="cursor-pointer text-2xl"
//               icon={faMagnifyingGlass}
//               style={{ color: "#ffffff" }}
//             />

//             {/* Profile */}
//             <div className="group relative">
//               <FontAwesomeIcon
//                 onClick={() => (token ? null : navigate("/login"))}
//                 className="cursor-pointer text-2xl"
//                 icon={faUser}
//                 style={{ color: "#ffffff" }}
//               />
//               {token && (
//                 <div className="group-hover:block hidden absolute right-0 pt-4 z-[9999]">
//                   <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
//                     <p
//                       onClick={() => navigate("/profile")}
//                       className="cursor-pointer"
//                     >
//                       My Profile
//                     </p>
//                     <p
//                       onClick={() => navigate("/orders")}
//                       className="cursor-pointer"
//                     >
//                       Orders
//                     </p>
//                     <p onClick={logout} className="cursor-pointer">
//                       Logout
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/*Wishlist*/}
//             <Link to="/wishlist" className="relative">
//               <GoHeartFill className="text-[24px] text-white hover:text-red-400 duration-200" />

//               {/* Wishlist Badge */}
//               {wishlist && wishlist.length > 0 && (
//                 <span
//                   className="
//         absolute -bottom-1 -right-1
//         bg-[#3b4754]
//         text-white text-[10px]
//         w-4 h-4 rounded-full
//         flex items-center justify-center
//       "
//                 >
//                   {wishlist.length}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link to="/cart" className="relative">
//               <FontAwesomeIcon
//                 icon={faBagShopping}
//                 style={{ color: "#ffffff" }}
//                 className="w-6 min-w-5 text-2xl"
//               />
//               <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gray-700 text-white aspect-square rounded-full text-[8px]">
//                 {getCartCount()}
//               </p>
//             </Link>

//             <img
//               onClick={() => setVisible(true)}
//               src={assets.menu_icon}
//               className="w-5 cursor-pointer sm:hidden invert"
//             />
//           </div>
//         </div>

//         {/* ------------------- MOBILE SIDEBAR ------------------- */}
//         <div
//           className={`fixed top-0 right-0 bottom-0 bg-white z-[9999] transition-all duration-300
//         ${visible ? "w-full" : "w-0"} overflow-hidden`}
//         >
//           <div className="flex flex-col text-gray-600">
//             <div
//               onClick={() => setVisible(false)}
//               className="flex items-center gap-4 p-3 cursor-pointer border-b"
//             >
//               <HiOutlineMenuAlt3 />
//               {/* <img className="h-4 rotate-180 invert" src={assets.dropdown_icon} /> */}
//               <p>Back</p>
//             </div>

//             <SidebarLink to="/" label="HOME" close={setVisible} />

//             {/* Mobile MEN */}
//             <MobileAccordion
//               title="MEN"
//               open={mobileAccord === "men"}
//               toggle={() => toggleMobileAccord("men")}
//               sections={{
//                 TOPS: [
//                   {
//                     label: "Jackets",
//                     category: "Topwear",
//                     gender: "Men",
//                   },
//                   { label: "Leather Coats", category: "Topwear", gender: "Men" },
//                   {
//                     label: "Coats",
//                     category: "blazers",
//                     gender: "men",
//                   },
//                   // {
//                   //   label: "Celebrity Jackets",
//                   //   category: "celebrity-Topwear",
//                   //   gender: "men",
//                   // },
//                   // { label: "Leather Suits", category: "Topwear", gender: "Men" },
//                   // {
//                   //   label: "Boys Leather Jackets",
//                   //   category: "Topwear",
//                   //   gender: "boys",
//                   // },
//                 ],
//                 // BOTTOMS: [
//                 //   { label: "Leather Pants", category: "Bottomwear", gender: "Men" },
//                 //   {
//                 //     label: "Leather Shorts",
//                 //     category: "Bottomwear",
//                 //     gender: "men",
//                 //   },
//                 //   { label: "Leather Chaps", category: "Bottomwear", gender: "Men" },
//                 // ],
//                 OTHERS: [
//                   { label: "Pillow", category: "Others", gender: "Men" },
//                   { label: "Cushion Cover", category: "Others", gender: "Men" },
//                   {
//                     label: "Aprons",
//                     category: "Others",
//                     gender: "men",
//                   },
//                   { label: "Desk Mat", category: "Others", gender: "Men" },
//                   { label: "Chair Cover", category: "Others", gender: "Men" },
//                 ],
//               }}

//               closeSidebar={() => setVisible(false)}
//             />

//             {/* Mobile WOMEN */}
//             <MobileAccordion
//               title="WOMEN"
//               open={mobileAccord === "women"}
//               toggle={() => toggleMobileAccord("women")}
//               sections={{
//                 TOPS: [
//                   {
//                     label: "Jackets",
//                     category: "Topwear",
//                     gender: "Women",
//                   },
//                   {
//                     label: "Bomber Biker Jacket",
//                     category: "Topwear",
//                     gender: "Women",
//                   },
//                   {
//                     label: "Moto Biker Jacket",
//                     category: "Topwear",
//                     gender: "Women",
//                   },
//                   { label: "Racing Coat", category: "Topwear", gender: "Women" },
//                   { label: "Women Winter Wear", category: "Topwear", gender: "Women" },
//                   { label: "Women Night Dress", category: "Topwear", gender: "Women" },
//                 ],

//                 BOTTOMS: [
//                   { label: "Leather Pencil Skirt", category: "Bottomwear", gender: "Women" },
//                   { label: "Leather Full Skirt", category: "Bottomwear", gender: "Women" },
//                   {
//                     label: "Slim Bodycon Skirt",
//                     category: "Bottomwear",
//                     gender: "Women",
//                   },
//                 ],

//                 OTHERS: [
//                   {
//                     label: "Pillow",
//                     category: "Others",
//                     gender: "other",
//                   },
//                   {
//                     label: "Cushion Cover",
//                     category: "Others",
//                     gender: "Women",
//                   },
//                   {
//                     label: "Aprons",
//                     category: "Others",
//                     gender: "Women",
//                   },
//                   {
//                     label: "Desk Mat",
//                     category: "Others",
//                     gender: "Women",
//                   },
//                   {
//                     label: "Chair Cover",
//                     category: "Others",
//                     gender: "Women",
//                   },
//                 ],
//               }}
//               closeSidebar={() => setVisible(false)}
//             />

//             <SidebarLink
//               to="/collection"
//               label="COLLECTION"
//               close={setVisible}
//             />
//             <SidebarLink to="/about" label="ABOUT" close={setVisible} />
//             <SidebarLink to="/contact" label="CONTACT" close={setVisible} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------- HELPER COMPONENTS ---------------------- */

// const SidebarLink = ({ to, label, close }) => (
//   <NavLink onClick={() => close(false)} className="py-2 pl-6 border-b" to={to}>
//     {label}
//   </NavLink>
// );

// const MegaMenu = ({ children, showMenu, hideMenu }) => (
//   <div
//     onMouseEnter={showMenu}
//     onMouseLeave={hideMenu}
//     className="fixed inset-x-0 top-[80px] bg-black/95 p-8 z-[9999] shadow-2xl border-t-4 border-indigo-600"
//   >
//     <div className="max-w-7xl mx-auto flex flex-wrap gap-8 px-4 items-start">
//       {children}
//     </div>
//   </div>
// );

// const MegaColumn = ({ title, items }) => {
//   return (
//     <div className="flex-1 min-w-[150px]">
//       <h3 className="font-semibold mb-3 text-white text-xl border-b-2 w-1/3 border-indigo-600">
//         {title}
//       </h3>

//       <ul className="space-y-2 text-white">
//         {items.map((item, index) => {
//           // const toURL = `/collection?category=${encodeURIComponent(
//           //   item.gender
//           // )}&sub=${encodeURIComponent(item.category)}`;

//           const toURL =
//   item.category === "Others"
//     ? `/collection?category=Others&sub=${encodeURIComponent(item.label)}`
//     : `/collection?category=${encodeURIComponent(item.gender)}&sub=${encodeURIComponent(item.category)}`;

//           console.log("Generated URL:", toURL); // Debug

//           return (
//             <li key={index}>
//               <Link
//                 to={toURL}
//                 className="hover:text-indigo-400 transition"
//               >
//                 {item.label}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// /* ---------------------- MOBILE ACCORDION ---------------------- */
// const MobileAccordion = ({ title, open, toggle, sections, closeSidebar }) => (
//   <div>
//     <button
//       onClick={toggle}
//       className="w-full text-left py-3 px-6 border-b flex justify-between items-center"
//     >
//       {title}
//       <RiArrowDropDownLine
//         className={`text-3xl transition-transform duration-300 ${open ? "rotate-180" : ""
//           }`}
//       />
//     </button>

//     <div
//       className={`overflow-hidden transition-all duration-500 ease-in-out
//       ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
//     >
//       <div className="bg-gray-50 px-6 py-3 border-b space-y-4">
//         {Object.entries(sections).map(([section, items], index) => (
//           <div key={index}>
//             <h4 className="font-semibold text-gray-800 mb-2">{section}</h4>
//             <ul className="text-gray-600 space-y-1">
//               {items.map((item, i) => (
//                 <li key={i} className="pl-2">
//                   <Link
//                     to={`/collection?category=${encodeURIComponent(item.gender)}&sub=${encodeURIComponent(item.category)}`}
//                     className="block w-full hover:text-black transition"
//                     onClick={closeSidebar} // 🚀 CLOSE ON CLICK
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default Navbar;




import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { GoHeartFill } from "react-icons/go";
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

/* ════════════════════════════
   MAIN NAVBAR
════════════════════════════ */
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [sidebarAnim, setSidebarAnim] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileAccord, setMobileAccord] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const hideTimeoutRef = useRef(null);

  const {
    wishlist,
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
                  <MegaMenu
                    showMenu={() => showMenu("men")}
                    hideMenu={hideMenu}
                  >
                    <MegaColumn
                      title="TOPS"
                      items={[
                        {
                          label: "Jackets",
                          category: "Topwear",
                          gender: "Men",
                        },
                        { label: "Coats", category: "Topwear", gender: "Men" },
                      ]}
                    />
                    <MegaColumn
                      title="OTHERS"
                      items={[
                        { label: "Pillow", category: "Others", gender: "Men" },
                        {
                          label: "Cushion Cover",
                          category: "Others",
                          gender: "Men",
                        },
                        { label: "Aprons", category: "Others", gender: "Men" },
                        {
                          label: "Desk Mat",
                          category: "Others",
                          gender: "Men",
                        },
                        {
                          label: "Chair Cover",
                          category: "Others",
                          gender: "Men",
                        },
                      ]}
                    />
                    <div className="flex-shrink-0 w-[200px] xl:w-[230px] self-start">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={assets.men1}
                          className="w-full h-[240px] xl:h-[270px] object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-500"
                          alt="Men"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <p className="absolute bottom-3 left-3 text-white text-[10px] tracking-[2px] uppercase">
                          Men's Edit
                        </p>
                      </div>
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
                  <MegaMenu
                    showMenu={() => showMenu("women")}
                    hideMenu={hideMenu}
                  >
                    <MegaColumn
                      title="TOPS"
                      items={[
                        {
                          label: "Jackets",
                          category: "Topwear",
                          gender: "Women",
                        },
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
                      ]}
                    />
                    <MegaColumn
                      title="BOTTOMS"
                      items={[
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
                      ]}
                    />
                    <MegaColumn
                      title="OTHERS"
                      items={[
                        {
                          label: "Pillow",
                          category: "Others",
                          gender: "Women",
                        },
                        {
                          label: "Cushion Cover",
                          category: "Others",
                          gender: "Women",
                        },
                        {
                          label: "Aprons",
                          category: "Others",
                          gender: "Women",
                        },
                        {
                          label: "Desk Mat",
                          category: "Others",
                          gender: "Women",
                        },
                        {
                          label: "Chair Cover",
                          category: "Others",
                          gender: "Women",
                        },
                      ]}
                    />
                    <div className="flex-shrink-0 w-[200px] xl:w-[230px] self-start">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={assets.women1}
                          className="w-full h-[240px] xl:h-[270px] object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-500"
                          alt="Women"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <p className="absolute bottom-3 left-3 text-white text-[10px] tracking-[2px] uppercase">
                          Women's Edit
                        </p>
                      </div>
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

              <MobileAccordion
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
              />

              <MobileAccordion
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

const MegaColumn = ({ title, items }) => (
  <div className="flex-1 min-w-[130px] xl:min-w-[150px]">
    <h3
      className="nav-links text-[9px] font-[600] tracking-[3.5px] uppercase text-indigo-400 mb-4 pb-2
      border-b border-white/[0.07] flex items-center gap-2"
    >
      <span className="w-3 h-[1px] bg-indigo-500 flex-shrink-0" />
      {title}
    </h3>
    <ul className="space-y-[10px]">
      {items.map((item, i) => {
        // const toURL =
        //   item.category === "Others"
        //     ? `/collection?category=Others&sub=${encodeURIComponent(item.label)}`
        //     : `/collection?category=${encodeURIComponent(item.gender)}&sub=${encodeURIComponent(item.category)}`;
        const toURL = item.category === "Others"
          ? `/collection?category=Others&sub=${encodeURIComponent(item.label)}`
          : `/collection?category=${encodeURIComponent(item.gender)}&sub=${encodeURIComponent(item.label)}`;
        return (
          <li key={i}>
            <Link
              to={toURL}
              className="nav-links text-[12px] text-white/50 hover:text-white tracking-[0.3px]
                transition-all duration-150 flex items-center gap-2 group"
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
                    to={`/collection?category=${encodeURIComponent(item.gender)}&sub=${encodeURIComponent(item.category)}`}
                    className="flex items-center gap-2 text-[12px] text-white/45 hover:text-white transition-all duration-150 group"
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
