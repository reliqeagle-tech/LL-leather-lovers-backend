// import React, { useContext, useEffect, useState, useMemo } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/assets';
// import Title from '../components/Title';
// import ProductItem from '../components/ProductItem';
// import PromoBanner from '../components/PromoBanner';
// import { useSearchParams } from "react-router-dom";

// const Collection = () => {

//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relavent')
//   const [currentPage, setCurrentPage] = useState(1); // New: Track current page
//   const productsPerPage = 12; // New: Items per page (adjustable)
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const rawCategory = searchParams.get("category");
//     const rawSub = searchParams.get("sub");

//     if (rawCategory) {
//       setCategory([decodeURIComponent(rawCategory)]);
//     }

//     if (rawSub) {
//       setSubCategory([decodeURIComponent(rawSub)]);
//     }
//   }, [searchParams]);



//   /* --------------------------------------------------------
//        🟦 CATEGORY → DYNAMIC SUBCATEGORY SYSTEM
//     -------------------------------------------------------- */
//   const subCategoriesMap = {
//     Men: ["Topwear", "Bottomwear", "Winterwear"],
//     Women: ["Topwear", "Bottomwear", "Winterwear"],
//     // Kids: ["Topwear", "Bottomwear", "Winterwear"],
//     Others: ["Recliner Chair Headrest Cover", "Cushion Cover", "Aprons", "Desk Mat", "Pillow"]
//   };


//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products]);

//   /* --------------------------------------------------------
//     🟦 Category Toggler
//  -------------------------------------------------------- */
//   const toggleCategory = (e) => {
//     const value = e.target.value;

//     if (category.includes(value)) {
//       setCategory(prev => prev.filter(item => item !== value));
//       setSubCategory(prev =>
//         prev.filter(s => !subCategoriesMap[value].includes(s))
//       );
//     } else {
//       setCategory(prev => [...prev, value]);
//     }
//   };


//   /* --------------------------------------------------------
//      🟦 SubCategory Toggler
//   -------------------------------------------------------- */
//   const toggleSubCategory = (e) => {
//     const value = e.target.value;

//     if (subCategory.includes(value)) {
//       setSubCategory(prev => prev.filter(item => item !== value))
//     } else {
//       setSubCategory(prev => [...prev, value])
//     }
//   };

//   const applyFilter = () => {

//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter(item => category.includes(item.category));
//     }

//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
//     }

//     setFilterProducts(productsCopy)
//     setCurrentPage(1); // New: Reset to first page on filter change

//   }

//   const sortProduct = () => {

//     let fpCopy = filterProducts.slice();

//     switch (sortType) {
//       case 'low-high':
//         setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
//         break;

//       case 'high-low':
//         setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
//         break;

//       default:
//         applyFilter();
//         break;
//     }
//     setCurrentPage(1); // New: Reset to first page on sort change

//   }
//   // New: Calculate paginated products
//   const paginatedProducts = useMemo(() => {
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     return filterProducts.slice(startIndex, endIndex);
//   }, [filterProducts, currentPage]);

//   // New: Calculate total pages
//   const totalPages = Math.ceil(filterProducts.length / productsPerPage);

//   // New: Handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       // Optional: Scroll to top of products for better UX
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products])

//   useEffect(() => {
//     sortProduct();
//   }, [sortType])

//   // New: Pagination Component (inlined for simplicity)
//   const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     // Generate page numbers to show (e.g., show 5 pages max, with ellipsis)
//     const getPageNumbers = () => {
//       const pages = [];
//       const maxVisible = 5;
//       let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//       let end = Math.min(totalPages, start + maxVisible - 1);

//       if (end - start < maxVisible - 1) {
//         start = Math.max(1, end - maxVisible + 1);
//       }

//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       return { start, end, pages };
//     };

//     const { pages } = getPageNumbers();
//     const isFirstPage = currentPage === 1;
//     const isLastPage = currentPage === totalPages;

//     if (totalPages <= 1) return null;

//     return (
//       <div className="flex justify-center items-center space-x-2 mt-8 pb-8 ">
//         {/* Previous Button */}
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={isFirstPage}
//           className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isFirstPage
//             ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             : 'bg-white border border-gray-300 hover:bg-indigo-100 text-gray-700'
//             }`}
//         >
//           Previous
//         </button>

//         {/* Page Numbers */}
//         {pages.map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${page === currentPage
//               ? 'bg-indigo-500 text-white' // Active page styling (customize to your theme)
//               : 'bg-white border border-gray-300 hover:bg-indigo-100 text-gray-700'
//               }`}
//           >
//             {page}
//           </button>
//         ))}

//         {/* Ellipsis if needed */}
//         {getPageNumbers().end < totalPages && (
//           <span className="px-3 py-2 text-gray-500">...</span>
//         )}

//         {/* Next Button */}
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={isLastPage}
//           className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isLastPage
//             ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             : 'bg-white border border-gray-300 hover:bg-indigo-100 text-gray-700'
//             }`}
//         >
//           Next
//         </button>

//         {/* Optional: Page info */}
//         <span className="text-sm text-gray-500 ml-4">
//           Page {currentPage} of {totalPages}
//         </span>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <PromoBanner />
//       <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 sm:px-10 px-2'>

//         {/* Filter Options */}
//         <div className='min-w-60 md:sticky md:top-4 self-start pt-4 lg:pt-20'>
//           <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl text-gray-800 font-medium flex items-center cursor-pointer gap-2'>FILTERS
//             <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
//           </p>
//           {/* CATEGORY */}
//           <div className={`border border-gray-400 rounded-md pl-5 py-3 mt-6 bg-[#f1f1f1] shadow-lg ${showFilter ? '' : 'hidden'} sm:block`}>
//             <p className='mb-3 text-sm text-gray-800 font-medium'>CATEGORIES</p>

//             <div className='flex flex-col gap-2 text-sm text-gray-700'>
//               {Object.keys(subCategoriesMap).map(cat => (
//                 <label key={cat} className='flex gap-2'>
//                   <input type="checkbox" value={cat} onChange={toggleCategory} />
//                   {cat}
//                 </label>
//               ))}
//             </div>
//           </div>
//           {/* SUBCATEGORY */}
//           <div className={`border border-gray-400 rounded-md pl-5 py-3 my-5 bg-[#f1f1f1] shadow-lg ${showFilter ? '' : 'hidden'} sm:block`}>
//             <p className='mb-3 text-sm text-gray-800 font-medium'>TYPE</p>

//             <div className='flex flex-col gap-2 text-sm text-gray-700'>
//               {category.length === 0 && (
//                 <p className="text-xs text-gray-500">Select category first</p>
//               )}

//               {[...new Set(category.flatMap(cat => subCategoriesMap[cat]))].map(sub => (
//                 <label key={sub} className='flex gap-2'>
//                   <input
//                     type="checkbox"
//                     value={sub}
//                     checked={subCategory.includes(sub)}
//                     onChange={toggleSubCategory}
//                   />
//                   {sub}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className='flex-1'>

//           <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4 text-lg sm:text-2xl">

//             <div className="text-center sm:text-left w-full sm:w-auto">
//               <Title text1={"ALL"} text2={"COLLECTIONS"} />
//             </div>

//             {/* Product Sort */}
//             <select
//               onChange={(e) => setSortType(e.target.value)}
//               className="border-2 border-gray-300 text-sm px-3 py-1 rounded-md w-full sm:w-auto mb-4"
//             >
//               <option value="relavent">Sort by: Relevant</option>
//               <option value="low-high">Sort by: Low to High</option>
//               <option value="high-low">Sort by: High to Low</option>
//             </select>

//           </div>



//           {/* Map Products - Updated to use paginatedProducts */}
//           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 sm:gap-y-6 mb-8'>
//             {
//               paginatedProducts.map((item, index) => (
//                 <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} discountPrice={item.discountPrice} />
//               ))
//             }
//           </div>

//           {/* New: Pagination Component - Render below the grid */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />

//         </div>

//       </div>
//     </div>
//   )
// }

// export default Collection



// import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/assets';
// import PromoBanner from '../components/PromoBanner';
// import { useSearchParams, Link } from "react-router-dom";
// import ProductItem from '../components/ProductItem';

// /* ─────────────────────────────────────────
//    INLINE CARD — matches BestSeller card UI
// ───────────────────────────────────────── */
// const Stars = ({ rating = 4, count = 0 }) => (
//   <div className="flex items-center gap-0.5 my-1.5">
//     {Array.from({ length: 5 }, (_, i) => (
//       <svg key={i} width="12" height="12" viewBox="0 0 24 24"
//         fill={i < Math.round(rating) ? "#3b82f6" : "none"}
//         stroke="#3b82f6" strokeWidth="1.5">
//         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//       </svg>
//     ))}
//     <span style={{ fontSize:"10px", color:"#9ca3af", marginLeft:"3px" }}>({count})</span>
//   </div>
// );

// const CollectionCard = ({ item, index }) => {
//   const hasDiscount = item.discountPrice && Number(item.discountPrice) < Number(item.price);
//   const discountPct = hasDiscount
//     ? Math.round(((item.price - item.discountPrice) / item.price) * 100) : 0;
//   const displayPrice = hasDiscount ? item.discountPrice : item.price;
//   const rating = item.rating ?? 4;
//   const reviewCount = item.reviews?.length ?? item.reviewCount ?? 0;

//   const ACCENTS = ["#6366f1","#3b82f6","#4f46e5","#2563eb","#818cf8","#7c3aed","#6366f1","#4338ca"];
//   const accent = ACCENTS[index % ACCENTS.length];

//   return (
//     <Link to={`/product/${item._id}`} className="block no-underline group">
//       <div className="col-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100
//         transition-shadow duration-300 hover:shadow-xl relative h-full"
//         style={{ borderLeft:`3px solid ${accent}` }}>

//         {/* Image */}
//         <div className="relative bg-white overflow-hidden" style={{ height:"220px" }}>
//           <img
//             src={Array.isArray(item.image) ? item.image[0] : item.image}
//             alt={item.name}
//             className="col-img w-full h-full"
//             style={{ objectFit:"contain", objectPosition:"center", padding:"8px", display:"block" }}
//           />
//         </div>

//         {/* Info */}
//         <div className="px-3 pt-2.5 pb-3.5">
//           {hasDiscount && (
//             <span className="inline-block bg-indigo-600 text-white rounded-full px-3 py-0.5 mb-2"
//               style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"11px", fontWeight:600 }}>
//               Christmas Sale
//             </span>
//           )}
//           <p className="text-gray-800 leading-snug line-clamp-2 mb-0.5"
//             style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"12.5px", fontWeight:400 }}>
//             {item.name}
//           </p>
//           <Stars rating={rating} count={reviewCount} />
//           <div className="flex items-center gap-2 flex-wrap mt-1">
//             {hasDiscount ? (
//               <>
//                 <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"15px", fontWeight:700, color:"#111" }}>
//                   ${displayPrice}
//                 </span>
//                 <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"11px", color:"#9ca3af", textDecoration:"line-through" }}>
//                   ${item.price}
//                 </span>
//                 <span className="bg-green-50 border border-green-200 text-green-600 px-1.5 py-0.5 rounded"
//                   style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"9px", fontWeight:700 }}>
//                   {discountPct}% OFF
//                 </span>
//               </>
//             ) : (
//               <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"15px", fontWeight:700, color:"#111" }}>
//                 ${item.price}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// /* ─────────────────────────────────────────
//    MAIN COLLECTION PAGE
// ───────────────────────────────────────── */
// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relavent');
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 12;
//   const [searchParams] = useSearchParams();

//   const subCategoriesMap = {
//     Men: ["Topwear", "Bottomwear", "Winterwear"],
//     Women: ["Topwear", "Bottomwear", "Winterwear"],
//     Others: ["Recliner Chair Headrest Cover", "Cushion Cover", "Aprons", "Desk Mat", "Pillow"]
//   };

//   useEffect(() => {
//     const rawCategory = searchParams.get("category");
//     const rawSub = searchParams.get("sub");
//     if (rawCategory) setCategory([decodeURIComponent(rawCategory)]);
//     if (rawSub) setSubCategory([decodeURIComponent(rawSub)]);
//   }, [searchParams]);

//   const toggleCategory = (val) => {
//     setCategory(prev =>
//       prev.includes(val)
//         ? prev.filter(i => i !== val)
//         : [...prev, val]
//     );
//     if (category.includes(val)) {
//       setSubCategory(prev => prev.filter(s => !subCategoriesMap[val].includes(s)));
//     }
//   };

//   const toggleSubCategory = (val) => {
//     setSubCategory(prev =>
//       prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
//     );
//   };

//   const applyFilter = () => {
//     let copy = products.slice();
//     if (showSearch && search)
//       copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
//     if (category.length > 0)
//       copy = copy.filter(i => category.includes(i.category));
//     if (subCategory.length > 0)
//       copy = copy.filter(i => subCategory.includes(i.subCategory));
//     setFilterProducts(copy);
//     setCurrentPage(1);
//   };

//   const sortProduct = () => {
//     let copy = filterProducts.slice();
//     switch (sortType) {
//       case 'low-high': setFilterProducts(copy.sort((a,b) => a.price - b.price)); break;
//       case 'high-low': setFilterProducts(copy.sort((a,b) => b.price - a.price)); break;
//       default: applyFilter(); break;
//     }
//     setCurrentPage(1);
//   };

//   useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);
//   useEffect(() => { sortProduct(); }, [sortType]);

//   const paginatedProducts = useMemo(() => {
//     const start = (currentPage - 1) * productsPerPage;
//     return filterProducts.slice(start, start + productsPerPage);
//   }, [filterProducts, currentPage]);

//   const totalPages = Math.ceil(filterProducts.length / productsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
//         .col-serif { font-family: 'Cormorant Garamond', serif; }
//         .col-sans  { font-family: 'Montserrat', sans-serif; }

//         /* card image zoom */
//         .col-img { transition: transform 0.6s cubic-bezier(.22,1,.36,1); }
//         .col-card:hover .col-img { transform: scale(1.05); }

//         /* custom checkbox */
//         .col-check {
//           appearance: none; -webkit-appearance: none;
//           width: 15px; height: 15px; min-width: 15px;
//           border: 1px solid rgba(255,255,255,0.2);
//           border-radius: 3px;
//           background: rgba(255,255,255,0.04);
//           cursor: pointer;
//           transition: background 0.2s, border-color 0.2s;
//           position: relative;
//           margin-top: 1px;
//         }
//         .col-check:checked {
//           background: #6366f1;
//           border-color: #6366f1;
//         }
//         .col-check:checked::after {
//           content: '';
//           position: absolute; left: 4px; top: 1.5px;
//           width: 5px; height: 8px;
//           border: 1.5px solid white;
//           border-top: none; border-left: none;
//           transform: rotate(45deg);
//         }

//         /* sort select */
//         .col-select {
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.12);
//           color: rgba(255,255,255,0.7);
//           border-radius: 6px;
//           padding: 8px 14px;
//           font-family: 'Montserrat', sans-serif;
//           font-size: 11px;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: border-color 0.2s;
//         }
//         .col-select:focus { outline: none; border-color: rgba(99,102,241,0.5); }
//         .col-select option { background: #1a1a2e; color: #fff; }

//         /* pagination */
//         .pg-btn {
//           font-family: 'Montserrat', sans-serif;
//           font-size: 11px; font-weight: 600;
//           padding: 7px 14px;
//           border-radius: 6px;
//           border: 1px solid rgba(255,255,255,0.1);
//           background: rgba(255,255,255,0.04);
//           color: rgba(255,255,255,0.5);
//           cursor: pointer;
//           transition: background 0.2s, border-color 0.2s, color 0.2s;
//         }
//         .pg-btn:hover:not(:disabled) {
//           background: rgba(99,102,241,0.15);
//           border-color: rgba(99,102,241,0.4);
//           color: #fff;
//         }
//         .pg-btn.active {
//           background: #6366f1;
//           border-color: #6366f1;
//           color: #fff;
//         }
//         .pg-btn:disabled { opacity: 0.3; cursor: not-allowed; }

//         /* filter toggle mobile */
//         .filter-toggle {
//           display: flex; align-items: center; gap: 8px;
//           font-family: 'Montserrat', sans-serif;
//           font-size: 11px; font-weight: 600;
//           letter-spacing: 2px; text-transform: uppercase;
//           color: rgba(255,255,255,0.7);
//           cursor: pointer;
//           padding: 8px 14px;
//           border: 1px solid rgba(255,255,255,0.12);
//           border-radius: 6px;
//           background: rgba(255,255,255,0.04);
//           transition: border-color 0.2s, background 0.2s;
//         }
//         .filter-toggle:hover {
//           border-color: rgba(99,102,241,0.4);
//           background: rgba(99,102,241,0.08);
//         }
//       `}</style>

//       <div style={{ background:"linear-gradient(180deg, #08080f 0%, #0b0b14 100%)", minHeight:"100vh" }}>
//         <PromoBanner />

//         {/* ── PAGE HEADER ── */}
//         <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-6">
//           <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
//             <div>
//               <p className="col-sans text-indigo-400 font-semibold mb-2"
//                 style={{ fontSize:"10px", letterSpacing:"4px", textTransform:"uppercase" }}>
//                 Browse &amp; Discover
//               </p>
//               <h1 className="col-serif text-white leading-tight"
//                 style={{ fontSize:"clamp(28px,4vw,46px)", fontWeight:300 }}>
//                 All{" "}
//                 <em className="text-indigo-400" style={{ fontStyle:"italic" }}>Collections</em>
//               </h1>
//               <div className="w-10 h-px mt-3"
//                 style={{ background:"linear-gradient(90deg, #6366f1, transparent)" }} />
//             </div>
//             <p className="col-sans text-white/25" style={{ fontSize:"11px", letterSpacing:"1px" }}>
//               {filterProducts.length} products found
//             </p>
//           </div>
//         </div>

//         {/* ── LAYOUT ── */}
//         <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row gap-6 pb-16">

//           {/* ── SIDEBAR FILTERS ── */}
//           <aside className="w-full sm:w-56 lg:w-60 sm:sticky sm:top-6 self-start shrink-0">

//             {/* Mobile toggle */}
//             <button className="filter-toggle sm:hidden mb-4 w-full justify-between"
//               onClick={() => setShowFilter(!showFilter)}>
//               <span>Filters</span>
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//                 style={{ transform: showFilter ? "rotate(180deg)" : "rotate(0)", transition:"transform 0.2s" }}>
//                 <polyline points="6 9 12 15 18 9"/>
//               </svg>
//             </button>

//             <div className={`${showFilter ? 'flex' : 'hidden'} sm:flex flex-col gap-4`}>

//               {/* CATEGORY */}
//               <div className="rounded-xl p-4"
//                 style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
//                 <p className="col-sans text-white/40 mb-4 flex items-center gap-2"
//                   style={{ fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", fontWeight:600 }}>
//                   <span className="w-4 h-px bg-indigo-500/60 inline-block" />
//                   Categories
//                 </p>
//                 <div className="flex flex-col gap-3">
//                   {Object.keys(subCategoriesMap).map(cat => (
//                     <label key={cat} className="flex items-start gap-2.5 cursor-pointer group/lbl">
//                       <input type="checkbox" value={cat}
//                         checked={category.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="col-check" />
//                       <span className="col-sans text-white/55 group-hover/lbl:text-white/85 transition-colors"
//                         style={{ fontSize:"12px" }}>
//                         {cat}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* SUBCATEGORY */}
//               <div className="rounded-xl p-4"
//                 style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
//                 <p className="col-sans text-white/40 mb-4 flex items-center gap-2"
//                   style={{ fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", fontWeight:600 }}>
//                   <span className="w-4 h-px bg-indigo-500/60 inline-block" />
//                   Type
//                 </p>
//                 {category.length === 0 ? (
//                   <p className="col-sans text-white/25 italic" style={{ fontSize:"11px" }}>
//                     Select a category first
//                   </p>
//                 ) : (
//                   <div className="flex flex-col gap-3">
//                     {[...new Set(category.flatMap(cat => subCategoriesMap[cat]))].map(sub => (
//                       <label key={sub} className="flex items-start gap-2.5 cursor-pointer group/lbl">
//                         <input type="checkbox" value={sub}
//                           checked={subCategory.includes(sub)}
//                           onChange={() => toggleSubCategory(sub)}
//                           className="col-check" />
//                         <span className="col-sans text-white/55 group-hover/lbl:text-white/85 transition-colors"
//                           style={{ fontSize:"12px" }}>
//                           {sub}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Clear filters */}
//               {(category.length > 0 || subCategory.length > 0) && (
//                 <button
//                   onClick={() => { setCategory([]); setSubCategory([]); }}
//                   className="col-sans text-indigo-400 hover:text-indigo-300 transition-colors text-left"
//                   style={{ fontSize:"11px", letterSpacing:"1px" }}>
//                   ✕ Clear all filters
//                 </button>
//               )}
//             </div>
//           </aside>

//           {/* ── PRODUCTS ── */}
//           <div className="flex-1 min-w-0">

//             {/* Sort bar */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//               <p className="col-sans text-white/30" style={{ fontSize:"11px", letterSpacing:"1px" }}>
//                 Showing {paginatedProducts.length} of {filterProducts.length} products
//               </p>
//               <select
//                 className="col-select"
//                 onChange={(e) => setSortType(e.target.value)}
//                 value={sortType}
//               >
//                 <option value="relavent">Sort: Relevant</option>
//                 <option value="low-high">Price: Low to High</option>
//                 <option value="high-low">Price: High to Low</option>
//               </select>
//             </div>

//             {/* Grid */}
//             {paginatedProducts.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
//                 {paginatedProducts.map((item, index) => (
//                   // <CollectionCard key={item._id || index} item={item} index={index} />
//                   <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} discountPrice={item.discountPrice} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-20 gap-4">
//                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
//                   stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round">
//                   <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//                 </svg>
//                 <p className="col-sans text-white/25" style={{ fontSize:"13px" }}>
//                   No products match your filters
//                 </p>
//                 <button onClick={() => { setCategory([]); setSubCategory([]); }}
//                   className="col-sans text-indigo-400 hover:text-indigo-300 transition-colors"
//                   style={{ fontSize:"11px", letterSpacing:"1px" }}>
//                   Clear filters
//                 </button>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
//                 <button className="pg-btn" disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}>
//                   ← Prev
//                 </button>

//                 {(() => {
//                   const maxV = 5;
//                   let start = Math.max(1, currentPage - Math.floor(maxV / 2));
//                   let end = Math.min(totalPages, start + maxV - 1);
//                   if (end - start < maxV - 1) start = Math.max(1, end - maxV + 1);
//                   return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//                 })().map(page => (
//                   <button key={page}
//                     className={`pg-btn ${page === currentPage ? 'active' : ''}`}
//                     onClick={() => handlePageChange(page)}>
//                     {page}
//                   </button>
//                 ))}

//                 {Math.min(totalPages, Math.max(1, currentPage - 2) + 4) < totalPages && (
//                   <span className="col-sans text-white/30" style={{ fontSize:"12px" }}>…</span>
//                 )}

//                 <button className="pg-btn" disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(currentPage + 1)}>
//                   Next →
//                 </button>

//                 <span className="col-sans text-white/25" style={{ fontSize:"10px", letterSpacing:"1px", marginLeft:"4px" }}>
//                   Page {currentPage} / {totalPages}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Collection;








import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import PromoBanner from '../components/PromoBanner';
import { useSearchParams, Link } from "react-router-dom";
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [searchParams] = useSearchParams();

  const subCategoriesMap = {
    Men: ["Topwear", "Bottomwear", "Winterwear"],
    Women: ["Topwear", "Bottomwear", "Winterwear"],
    Others: ["Recliner Chair Headrest Cover", "Cushion Cover", "Aprons", "Desk Mat", "Pillow"],
  };

  useEffect(() => {
    const rawCategory = searchParams.get("category");
    const rawSub = searchParams.get("sub");
    if (rawCategory) setCategory([decodeURIComponent(rawCategory)]);
    if (rawSub) setSubCategory([decodeURIComponent(rawSub)]);
  }, [searchParams]);

  const toggleCategory = (val) => {
    setCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
    if (category.includes(val))
      setSubCategory(prev => prev.filter(s => !subCategoriesMap[val].includes(s)));
  };
  const toggleSubCategory = (val) =>
    setSubCategory(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);

  const applyFilter = () => {
    let copy = products.slice();
    if (showSearch && search) copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    if (category.length > 0) copy = copy.filter(i => category.includes(i.category));
    if (subCategory.length > 0) copy = copy.filter(i => subCategory.includes(i.subCategory));
    setFilterProducts(copy);
    setCurrentPage(1);
  };

  const sortProduct = () => {
    let copy = filterProducts.slice();
    switch (sortType) {
      case 'low-high': setFilterProducts(copy.sort((a, b) => a.price - b.price)); break;
      case 'high-low': setFilterProducts(copy.sort((a, b) => b.price - a.price)); break;
      default: applyFilter(); break;
    }
    setCurrentPage(1);
  };

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filterProducts.slice(start, start + productsPerPage);
  }, [filterProducts, currentPage]);

  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeFilterCount = category.length + subCategory.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        /* ── Custom checkbox ── */
        .col-check {
          appearance: none; -webkit-appearance: none;
          width: 16px; height: 16px; min-width: 16px;
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 4px;
          background: rgba(99,102,241,0.05);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          position: relative; margin-top: 1px;
        }
        .col-check:checked { background: #6366f1; border-color: #6366f1; }
        .col-check:checked::after {
          content: ''; position: absolute; left: 4px; top: 1.5px;
          width: 5px; height: 8px;
          border: 1.5px solid white;
          border-top: none; border-left: none;
          transform: rotate(45deg);
        }
        .col-check:hover:not(:checked) { border-color: rgba(99,102,241,0.5); }

        /* ── Sort select ── */
        .col-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          border-radius: 8px; padding: 9px 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; letter-spacing: 0.5px; cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }
        .col-select:focus { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.06); }
        .col-select option { background: #0e0e1c; color: #fff; }

        /* ── Pagination ── */
        .pg-btn {
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600;
          padding: 7px 14px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.45);
          cursor: pointer; transition: all 0.2s;
        }
        .pg-btn:hover:not(:disabled) {
          background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #fff;
        }
        .pg-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }
        .pg-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* ── Filter panel label hover ── */
        .col-filter-label:hover span { color: rgba(255,255,255,0.9) !important; }

        /* ── Filter sidebar card ── */
        .col-filter-card {
          border-radius: 12px; padding: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.2s;
        }
        .col-filter-card:hover { border-color: rgba(99,102,241,0.2); }

        /* ── Mobile filter toggle ── */
        .col-filter-toggle {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.65); cursor: pointer;
          padding: 10px 16px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04); transition: all 0.2s; width: 100%;
        }
        .col-filter-toggle:hover { border-color: rgba(99,102,241,0.35); background: rgba(99,102,241,0.07); }

        /* ── Active filter chip ── */
        .col-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.05em;
          color: '#818cf8'; background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 999px; padding: 3px 10px 3px 12px;
          cursor: pointer; transition: background 0.15s;
        }
        .col-chip:hover { background: rgba(99,102,241,0.22); }

        @keyframes gridIn {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .col-grid-item { animation: gridIn 0.35s ease forwards; }
      `}</style>

      <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)", minHeight: "100vh" }}>
        {/* <PromoBanner /> */}

        {/* ── Page Header ── */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-8">

          {/* Top glow line */}
          <div style={{
            height: 1, marginBottom: 28,
            background: 'linear-gradient(90deg, rgba(99,102,241,0.4), rgba(201,124,58,0.2), transparent)'
          }} />

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6366f1', marginBottom: '8px',
              }}>
                Browse &amp; Discover
              </p>
              <h1 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(28px,4vw,46px)", fontWeight: 300,
                color: '#fff', lineHeight: 1.1,
              }}>
                All{" "}
                <em style={{ fontStyle: "italic", color: '#818cf8' }}>Collections</em>
              </h1>
              <div style={{
                width: 40, height: 1, marginTop: 10,
                background: 'linear-gradient(90deg, #6366f1, transparent)'
              }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {/* Active filter chips */}
              {[...category, ...subCategory].map(f => (
                <button key={f} className="col-chip"
                  onClick={() => category.includes(f) ? toggleCategory(f) : toggleSubCategory(f)}>
                  <span style={{ color: '#818cf8' }}>{f}</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2l6 6M8 2L2 8" stroke="rgba(129,140,248,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              ))}

              <span style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '1px',
                color: 'rgba(255,255,255,0.25)',
              }}>
                {filterProducts.length} products
              </span>
            </div>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row gap-6 pb-16">

          {/* ── Sidebar ── */}
          <aside className="w-full sm:w-56 lg:w-60 sm:sticky sm:top-6 self-start shrink-0">

            {/* Mobile toggle */}
            <button className="col-filter-toggle sm:hidden mb-4"
              onClick={() => setShowFilter(!showFilter)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(99,102,241,0.8)" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="20" y2="12" />
                  <line x1="12" y1="18" x2="20" y2="18" />
                </svg>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: '#6366f1', color: '#fff',
                    fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ transform: showFilter ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className={`${showFilter ? 'flex' : 'hidden'} sm:flex flex-col gap-3`}>

              {/* Sidebar header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6366f1',
                }}>
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <button onClick={() => { setCategory([]); setSubCategory([]); }}
                    style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                      letterSpacing: '0.08em', color: 'rgba(99,102,241,0.6)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(99,102,241,0.6)'}
                  >
                    Clear all ✕
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="col-filter-card">
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', marginBottom: '14px',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 14, height: 1, background: 'rgba(99,102,241,0.5)', display: 'inline-block' }} />
                  Category
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Object.keys(subCategoriesMap).map(cat => (
                    <label key={cat} className="col-filter-label"
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                      <input type="checkbox" value={cat}
                        checked={category.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="col-check" />
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: '12px',
                        color: category.includes(cat) ? '#818cf8' : 'rgba(255,255,255,0.5)',
                        transition: 'color 0.2s',
                      }}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategory */}
              <div className="col-filter-card">
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', marginBottom: '14px',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 14, height: 1, background: 'rgba(99,102,241,0.5)', display: 'inline-block' }} />
                  Type
                </p>
                {category.length === 0 ? (
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
                    color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', lineHeight: 1.5,
                  }}>
                    Select a category first
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[...new Set(category.flatMap(cat => subCategoriesMap[cat]))].map(sub => (
                      <label key={sub} className="col-filter-label"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                        <input type="checkbox" value={sub}
                          checked={subCategory.includes(sub)}
                          onChange={() => toggleSubCategory(sub)}
                          className="col-check" />
                        <span style={{
                          fontFamily: "'Montserrat',sans-serif", fontSize: '12px',
                          color: subCategory.includes(sub) ? '#818cf8' : 'rgba(255,255,255,0.5)',
                          transition: 'color 0.2s',
                        }}>
                          {sub}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ── Products panel ── */}
          <div className="flex-1 min-w-0">

            {/* Sort bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6"
              style={{ paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '10px',
                  color: 'rgba(255,255,255,0.25)', letterSpacing: '1px',
                }}>
                  {paginatedProducts.length} of {filterProducts.length} products
                </span>
                {activeFilterCount > 0 && (
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 700,
                    color: '#818cf8', background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    borderRadius: '4px', padding: '1px 7px',
                  }}>
                    {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}>
                  Sort
                </span>
                <select className="col-select" onChange={e => setSortType(e.target.value)} value={sortType}>
                  <option value="relavent">Relevant</option>
                  <option value="low-high">Price: Low → High</option>
                  <option value="high-low">Price: High → Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                {paginatedProducts.map((item, index) => (
                  <div key={item._id || index} className="col-grid-item"
                    style={{ animationDelay: `${index * 0.04}s` }}>
                    <ProductItem
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      discountPrice={item.discountPrice}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '80px 20px', gap: 16, textAlign: 'center',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond',serif", fontSize: '20px',
                  color: 'rgba(255,255,255,0.5)', fontWeight: 300,
                }}>
                  No products found
                </p>
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
                  color: 'rgba(255,255,255,0.2)', marginBottom: 8,
                }}>
                  Try adjusting your filters
                </p>
                <button onClick={() => { setCategory([]); setSubCategory([]); }}
                  style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '6px 0', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6366f1'}
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 8 }}>
                <button className="pg-btn" disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}>
                  ← Prev
                </button>

                {(() => {
                  const maxV = 5;
                  let start = Math.max(1, currentPage - Math.floor(maxV / 2));
                  let end = Math.min(totalPages, start + maxV - 1);
                  if (end - start < maxV - 1) start = Math.max(1, end - maxV + 1);
                  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                })().map(page => (
                  <button key={page}
                    className={`pg-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                ))}

                <button className="pg-btn" disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}>
                  Next →
                </button>

                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '10px',
                  color: 'rgba(255,255,255,0.2)', marginLeft: 6, letterSpacing: '1px',
                }}>
                  Page {currentPage} / {totalPages}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;