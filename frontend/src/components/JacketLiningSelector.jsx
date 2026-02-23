// import React, { useState, useEffect } from "react";

// const JacketCustomization = ({ basePrice = 36, onPriceChange }) => {
//   const [showCustomization, setShowCustomization] = useState(false);
//   const [showHardware, setShowHardware] = useState(false);
//   const [showComment, setShowComment] = useState(false);
//   const [selectedLining, setSelectedLining] = useState("Default");
//   const [selectedQuilted, setSelectedQuilted] = useState("NO");
//   const [selectedHardware, setSelectedHardware] = useState("Antique Brass");
//   const [comment, setComment] = useState("");
//   const [displayPrice, setDisplayPrice] = useState(basePrice);

//   // 🧵 Jacket lining options
//   const linings = [
//     { name: "Default", price: 0, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/default_lt_lining.jpg" },
//     { name: "Red", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/red_satin.jpg" },
//     { name: "Steel Gray", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/steelgraylining100x100.jpg" },
//     { name: "Golden Beige", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/golden_beige.jpg" },
//     { name: "Wine", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/wine_lining.jpg" },
//     { name: "Electric Blue", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/fizzblue_lining.jpg" },
//     { name: "Turkish Blue", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/turkishblue_lining.jpg" },
//     { name: "Tan Brown", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/tan_brown_satin100x100.jpg" },
//     { name: "Green", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/greenlining_LC.jpg" },
//     { name: "Jade Green", price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/jade_green_satin130x130.jpg" },
//     { name: "Black Stretch", price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/black.jpg" },
//     { name: "Purple Bemberg", price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/purplebemberg100x100.jpg" },
//     { name: "Wine Bemberg", price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/winebemberg100x100.jpg" },
//     { name: "Burgandy Bemberg", price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/burgandy_bemberg.jpg" },
//     { name: "Red Bemberg", price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/redbemberg100x100.jpg" },
//   ];

//   // 🧵 Quilted lining options
//   const quantityLining = [
//     { name: "NO", price: 0, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/no_quiltedlining.jpg" },
//     { name: "Normal", price: 45, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/quiltedlining.jpg" },
//     { name: "Thinsulate Body Warmer", price: 70, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/thinsulate_quiltedlining.jpg" },
//   ];

//   // ⚙️ Hardware options
//   const hardwareColor = [
//     { name: "Antique Brass", img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/antiquebrasshardware.jpg" },
//     { name: "Antique Silver", img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/antiquesilverhardware.jpg" },
//     { name: "Silver", img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/silverhardware.jpg" },
//   ];

//   // 🧮 Update price dynamically
//   useEffect(() => {
//     const liningPrice = linings.find(l => l.name === selectedLining)?.price || 0;
//     const quiltedPrice = quantityLining.find(q => q.name === selectedQuilted)?.price || 0;
//     const total = basePrice + liningPrice + quiltedPrice;
//     setDisplayPrice(total);

//     // optional: notify parent
//     if (onPriceChange) onPriceChange(total);
//   }, [selectedLining, selectedQuilted]);

//   // 💬 Comment input handler
//   const handleCommentChange = (e) => {
//     if (e.target.value.length <= 600) {
//       setComment(e.target.value);
//     }
//   };

//   return (
//     <div className="p-6 bg-white text-center rounded-lg w-full max-w-4xl mx-auto mt-2 px-10">

//       {/* Toggle Button */}
//       <button
//         onClick={() => setShowCustomization(!showCustomization)}
//         className="w-[98%] border rounded-md py-2.5 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
//       >
//         {showCustomization ? "HIDE CUSTOMIZATION ▲" : "ADVANCED CUSTOMIZATION ▼"}
//       </button>

//       {showCustomization && (
//         <div className="mt-6 border-t pt-4">
//                 {/* 💰 Show dynamic price */}
//       <p className="mt-4 text-xl font-semibold text-gray-800">
//         Total Price: ${displayPrice.toFixed(2)}
//       </p>
//           {/* Jacket Lining */}
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">
//               Jacket Lining: <span className="text-gray-500">{selectedLining}</span>
//             </h3>
//           </div>

//           <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4 max-h-[400px] overflow-y-scroll p-2 mb-6">
//             {linings.map((lining, index) => (
//               <label
//                 key={index}
//                 className={`relative border rounded-lg cursor-pointer overflow-hidden group transition-all duration-200 ${
//                   selectedLining === lining.name ? "ring-2 ring-gray-800" : "hover:ring-1 hover:ring-gray-400"
//                 }`}
//               >
//                 <img src={lining.img} alt={lining.name} className="w-full h-20 object-cover" />
//                 <input
//                   type="radio"
//                   name="jacketLining"
//                   value={lining.name}
//                   checked={selectedLining === lining.name}
//                   onChange={() => setSelectedLining(lining.name)}
//                   className="absolute top-2 left-2 accent-black"
//                 />
//                 <div className="text-center text-xs py-2">
//                   <p>
//                     {lining.name} {lining.price > 0 && <span>(+${lining.price})</span>}
//                   </p>
//                 </div>
//               </label>
//             ))}
//           </div>

//           {/* Quilted Lining */}
//           <div className="flex justify-between items-center mb-4 mt-6 border-t pt-4">
//             <h3 className="text-lg font-semibold">
//               Quilted Lining: <span className="text-gray-500">{selectedQuilted}</span>
//             </h3>
//           </div>

//           <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4 max-h-[400px] overflow-y-scroll p-2 mb-6">
//             {quantityLining.map((lining, index) => (
//               <label
//                 key={index}
//                 className={`relative border rounded-lg cursor-pointer overflow-hidden group transition-all duration-200 ${
//                   selectedQuilted === lining.name ? "ring-2 ring-gray-800" : "hover:ring-1 hover:ring-gray-400"
//                 }`}
//               >
//                 <img src={lining.img} alt={lining.name} className="w-full h-20 object-cover" />
//                 <input
//                   type="radio"
//                   name="quiltedLining"
//                   value={lining.name}
//                   checked={selectedQuilted === lining.name}
//                   onChange={() => setSelectedQuilted(lining.name)}
//                   className="absolute top-2 left-2 accent-black"
//                 />
//                 <div className="text-center text-xs py-2">
//                   <p>
//                     {lining.name} {lining.price > 0 && <span>(+${lining.price})</span>}
//                   </p>
//                 </div>
//               </label>
//             ))}
//           </div>

//           {/* Hardware Section */}
//           <div
//             className="flex justify-between items-center mb-8 cursor-pointer hover:bg-gray-50 px-2 rounded mt-6 border-t pt-4"
//             onClick={() => setShowHardware(!showHardware)}
//           >
//             <h3 className="text-lg font-semibold">
//               Hardware Color: <span className="text-gray-500">{selectedHardware}</span>
//             </h3>
//             <span className="text-gray-400">{showHardware ? "▲" : "▼"}</span>
//           </div>

//           {showHardware && (
//             <div className="mb-6">
//               <p className="text-left text-sm">Please choose hardware color.</p>
//               <p className="text-left text-xs mb-2">
//                 2-way zippers have two pulls, allowing you to keep the garment zipped while leaving the lower portion open.
//               </p>
//               <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-scroll p-2">
//                 {hardwareColor.map((hardware, index) => (
//                   <label
//                     key={index}
//                     className={`relative border rounded-lg cursor-pointer overflow-hidden group transition-all duration-200 ${
//                       selectedHardware === hardware.name ? "ring-2 ring-gray-800" : "hover:ring-1 hover:ring-gray-400"
//                     }`}
//                   >
//                     <img src={hardware.img} alt={hardware.name} className="w-full h-20 object-cover" />
//                     <input
//                       type="radio"
//                       name="hardware"
//                       value={hardware.name}
//                       checked={selectedHardware === hardware.name}
//                       onChange={() => setSelectedHardware(hardware.name)}
//                       className="absolute top-2 left-2 accent-black"
//                     />
//                     <div className="text-center text-xs py-2">
//                       <p>{hardware.name}</p>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Comments Section */}
//           <button
//             onClick={() => setShowComment(!showComment)}
//             className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-100 transition-colors mb-4"
//           >
//             {showComment ? "HIDE COMMENTS ▲" : "COMMENTS ▼"}
//           </button>

          

//           {showComment && (
//             <div className="border border-gray-300 rounded-md">
//               <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t-md">
//                 <h4 className="text-sm font-medium text-gray-700">Comments</h4>
//               </div>
//               <textarea
//                 value={comment}
//                 onChange={handleCommentChange}
//                 placeholder="Enter your comments here..."
//                 className="w-full px-4 py-3 border-0 rounded-b-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-sm"
//                 rows={4}
//                 maxLength={600}
//               />
//               <div className="text-right px-4 pt-1 pb-2 text-xs text-gray-400">
//                 {600 - comment.length} characters remaining
//               </div>
//             </div>
//           )}

//           {/* Scroll back to top */}
//           <button
//             onClick={() => {
//               setShowCustomization(!showCustomization);
//               window.scrollTo({ top: 0, behavior: "smooth" });
//             }}
//             className="w-full pt-4 font-medium text-gray-500 underline hover:text-gray-700 hover:no-underline transition-all"
//           >
//             {showCustomization ? "HIDE CUSTOMIZATION ▲" : "ADVANCED CUSTOMIZATION ▼"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JacketCustomization;




// import React, { useState, useEffect } from "react";

// const JacketCustomization = ({ basePrice = 36, onPriceChange }) => {
//   const [showCustomization, setShowCustomization] = useState(false);
//   const [showHardware, setShowHardware] = useState(false);
//   const [showComment, setShowComment] = useState(false);
//   const [selectedLining, setSelectedLining] = useState("Default");
//   const [selectedQuilted, setSelectedQuilted] = useState("NO");
//   const [selectedHardware, setSelectedHardware] = useState("Antique Brass");
//   const [comment, setComment] = useState("");
//   const [displayPrice, setDisplayPrice] = useState(basePrice);

//   const linings = [
//     { name: "Default",          price: 0,  img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/default_lt_lining.jpg" },
//     { name: "Red",              price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/red_satin.jpg" },
//     { name: "Steel Gray",       price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/steelgraylining100x100.jpg" },
//     { name: "Golden Beige",     price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/golden_beige.jpg" },
//     { name: "Wine",             price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/wine_lining.jpg" },
//     { name: "Electric Blue",    price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/fizzblue_lining.jpg" },
//     { name: "Turkish Blue",     price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/turkishblue_lining.jpg" },
//     { name: "Tan Brown",        price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/tan_brown_satin100x100.jpg" },
//     { name: "Green",            price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/greenlining_LC.jpg" },
//     { name: "Jade Green",       price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/jade_green_satin130x130.jpg" },
//     { name: "Black Stretch",    price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/black.jpg" },
//     { name: "Purple Bemberg",   price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/purplebemberg100x100.jpg" },
//     { name: "Wine Bemberg",     price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/winebemberg100x100.jpg" },
//     { name: "Burgandy Bemberg", price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/burgandy_bemberg.jpg" },
//     { name: "Red Bemberg",      price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/redbemberg100x100.jpg" },
//   ];

//   const quantityLining = [
//     { name: "NO",                   price: 0,  img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/no_quiltedlining.jpg" },
//     { name: "Normal",               price: 45, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/quiltedlining.jpg" },
//     { name: "Thinsulate Body Warmer", price: 70, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/thinsulate_quiltedlining.jpg" },
//   ];

//   const hardwareColor = [
//     { name: "Antique Brass",  img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/antiquebrasshardware.jpg" },
//     { name: "Antique Silver", img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/antiquesilverhardware.jpg" },
//     { name: "Silver",         img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/silverhardware.jpg" },
//   ];

//   useEffect(() => {
//     const liningPrice  = linings.find(l => l.name === selectedLining)?.price  || 0;
//     const quiltedPrice = quantityLining.find(q => q.name === selectedQuilted)?.price || 0;
//     const total = basePrice + liningPrice + quiltedPrice;
//     setDisplayPrice(total);
//     if (onPriceChange) onPriceChange(total);
//   }, [selectedLining, selectedQuilted, basePrice]);

//   const handleCommentChange = (e) => {
//     if (e.target.value.length <= 600) setComment(e.target.value);
//   };

//   // ── Reusable option card ──────────────────────────────────────────────────
//   const OptionCard = ({ item, selected, onSelect, name }) => (
//     <label
//       onClick={() => onSelect(item.name)}
//       className="ll-option-card"
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         cursor: 'pointer',
//         borderRadius: '10px',
//         overflow: 'hidden',
//         border: selected
//           ? '1.5px solid #6366f1'
//           : '1px solid rgba(255,255,255,0.07)',
//         background: selected
//           ? 'rgba(99,102,241,0.1)'
//           : 'rgba(255,255,255,0.03)',
//         boxShadow: selected
//           ? '0 0 0 3px rgba(99,102,241,0.15), 0 4px 16px rgba(99,102,241,0.12)'
//           : 'none',
//         transition: 'all 0.2s ease',
//         position: 'relative',
//       }}
//     >
//       <input
//         type="radio"
//         name={name}
//         value={item.name}
//         checked={selected}
//         onChange={() => onSelect(item.name)}
//         style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
//       />

//       {/* Checkmark badge */}
//       {selected && (
//         <div style={{
//           position: 'absolute', top: 7, right: 7, zIndex: 10,
//           width: 18, height: 18, borderRadius: '50%',
//           background: '#6366f1',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           boxShadow: '0 2px 6px rgba(99,102,241,0.5)',
//         }}>
//           <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
//             <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </div>
//       )}

//       {/* Image */}
//       <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#111' }}>
//         <img
//           src={item.img}
//           alt={item.name}
//           style={{ width: '100%', height: '100%', objectFit: 'cover',
//             transition: 'transform 0.3s ease', display: 'block' }}
//           onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
//           onMouseLeave={e => e.target.style.transform = 'scale(1)'}
//         />
//       </div>

//       {/* Label */}
//       <div style={{
//         padding: '8px 6px 9px',
//         textAlign: 'center',
//         background: selected ? 'rgba(99,102,241,0.08)' : 'transparent',
//       }}>
//         <p style={{
//           fontFamily: "'Montserrat',sans-serif",
//           fontSize: '9.5px',
//           fontWeight: 600,
//           letterSpacing: '0.04em',
//           color: selected ? '#818cf8' : 'rgba(255,255,255,0.55)',
//           lineHeight: 1.3,
//           marginBottom: item.price > 0 ? '2px' : 0,
//         }}>
//           {item.name}
//         </p>
//         {item.price > 0 && (
//           <p style={{
//             fontFamily: "'Montserrat',sans-serif",
//             fontSize: '9px',
//             fontWeight: 500,
//             color: selected ? '#c97c3a' : 'rgba(201,124,58,0.6)',
//           }}>
//             +${item.price}
//           </p>
//         )}
//       </div>
//     </label>
//   );

//   // ── Section header ────────────────────────────────────────────────────────
//   const SectionHeader = ({ label, value, collapsible, open, onToggle }) => (
//     <div
//       onClick={collapsible ? onToggle : undefined}
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: '14px',
//         cursor: collapsible ? 'pointer' : 'default',
//         padding: '10px 14px',
//         borderRadius: '10px',
//         background: 'rgba(99,102,241,0.05)',
//         border: '1px solid rgba(99,102,241,0.12)',
//       }}
//     >
//       <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         <div style={{ width: 3, height: 18, borderRadius: 2, background: 'linear-gradient(180deg,#6366f1,#c97c3a)' }} />
//         <span style={{
//           fontFamily: "'Cormorant Garamond',serif",
//           fontSize: '17px',
//           fontWeight: 400,
//           color: '#fff',
//         }}>
//           {label}
//         </span>
//         {value && (
//           <span style={{
//             fontFamily: "'Montserrat',sans-serif",
//             fontSize: '10px',
//             fontWeight: 600,
//             letterSpacing: '0.08em',
//             color: '#818cf8',
//             background: 'rgba(99,102,241,0.15)',
//             border: '1px solid rgba(99,102,241,0.25)',
//             borderRadius: '6px',
//             padding: '2px 8px',
//           }}>
//             {value}
//           </span>
//         )}
//       </div>
//       {collapsible && (
//         <svg
//           width="16" height="16" viewBox="0 0 24 24" fill="none"
//           stroke="rgba(99,102,241,0.7)" strokeWidth="2" strokeLinecap="round"
//           style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
//         >
//           <path d="M6 9l6 6 6-6"/>
//         </svg>
//       )}
//     </div>
//   );

//   // ── Divider ───────────────────────────────────────────────────────────────
//   const Divider = () => (
//     <div style={{
//       height: 1,
//       margin: '24px 0',
//       background: 'linear-gradient(90deg, rgba(99,102,241,0.3), rgba(201,124,58,0.2), transparent)',
//     }} />
//   );

//   return (
//     <>
//       <style>{`
//         @keyframes customizeOpen {
//           from { opacity:0; transform:translateY(-8px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .ll-option-card:hover {
//           border-color: rgba(99,102,241,0.4) !important;
//           background: rgba(99,102,241,0.06) !important;
//         }
//         .ll-textarea::placeholder { color: rgba(255,255,255,0.2); }
//         .ll-textarea:focus { outline:none; }
//         .ll-options-grid::-webkit-scrollbar { width:3px; }
//         .ll-options-grid::-webkit-scrollbar-track { background:transparent; }
//         .ll-options-grid::-webkit-scrollbar-thumb { background:rgba(99,102,241,0.3); border-radius:4px; }
//       `}</style>

//       <div style={{
//         width: '100%',
//         maxWidth: '900px',
//         margin: '0 auto',
//         padding: '0 4px',
//       }}>

//         {/* ── Toggle Button ── */}
//         <button
//           onClick={() => setShowCustomization(!showCustomization)}
//           style={{
//             width: '100%',
//             padding: '14px 20px',
//             borderRadius: '12px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             cursor: 'pointer',
//             background: showCustomization
//               ? 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.08) 100%)'
//               : 'rgba(255,255,255,0.04)',
//             border: showCustomization
//               ? '1px solid rgba(99,102,241,0.4)'
//               : '1px solid rgba(255,255,255,0.08)',
//             transition: 'all 0.25s ease',
//             boxShadow: showCustomization ? '0 4px 20px rgba(99,102,241,0.15)' : 'none',
//           }}
//           onMouseEnter={e => {
//             if (!showCustomization) {
//               e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
//               e.currentTarget.style.background = 'rgba(99,102,241,0.06)';
//             }
//           }}
//           onMouseLeave={e => {
//             if (!showCustomization) {
//               e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
//               e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
//             }
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//             {/* Customize icon */}
//             <div style={{
//               width: 36, height: 36, borderRadius: '9px',
//               background: showCustomization ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.1)',
//               border: '1px solid rgba(99,102,241,0.3)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               flexShrink: 0,
//             }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                 stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
//               </svg>
//             </div>
//             <div style={{ textAlign: 'left' }}>
//               <p style={{
//                 fontFamily: "'Montserrat',sans-serif",
//                 fontSize: '10px',
//                 fontWeight: 600,
//                 letterSpacing: '0.15em',
//                 textTransform: 'uppercase',
//                 color: '#6366f1',
//                 marginBottom: '1px',
//               }}>
//                 Personalize Your Jacket
//               </p>
//               <p style={{
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontSize: '17px',
//                 fontWeight: 300,
//                 color: '#fff',
//                 lineHeight: 1,
//               }}>
//                 Advanced <em style={{ fontStyle: 'italic', color: '#c97c3a' }}>Customization</em>
//               </p>
//             </div>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//               stroke="rgba(99,102,241,0.7)" strokeWidth="2" strokeLinecap="round"
//               style={{ transform: showCustomization ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }}>
//               <path d="M6 9l6 6 6-6"/>
//             </svg>
//           </div>
//         </button>

//         {/* ── Expandable panel ── */}
//         {showCustomization && (
//           <div
//             style={{
//               marginTop: '12px',
//               borderRadius: '14px',
//               border: '1px solid rgba(99,102,241,0.18)',
//               background: 'linear-gradient(160deg, #0d0d1a 0%, #09090f 100%)',
//               overflow: 'hidden',
//               animation: 'customizeOpen 0.28s ease',
//               boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.06)',
//             }}
//           >
//             {/* Top glow */}
//             <div style={{
//               height: 1,
//               background: 'linear-gradient(90deg, transparent, #6366f1, #c97c3a, transparent)',
//             }} />

//             <div style={{ padding: '24px 20px' }}>

//               {/* ── Price banner ── */}
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 padding: '14px 18px',
//                 borderRadius: '10px',
//                 background: 'rgba(201,124,58,0.08)',
//                 border: '1px solid rgba(201,124,58,0.2)',
//                 marginBottom: '24px',
//               }}>
//                 <div>
//                   <p style={{
//                     fontFamily: "'Montserrat',sans-serif",
//                     fontSize: '9px',
//                     fontWeight: 600,
//                     letterSpacing: '0.15em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(201,124,58,0.7)',
//                     marginBottom: '2px',
//                   }}>
//                     Customization Total
//                   </p>
//                   <p style={{
//                     fontFamily: "'Cormorant Garamond',serif",
//                     fontSize: '26px',
//                     fontWeight: 400,
//                     color: '#fff',
//                     lineHeight: 1,
//                   }}>
//                     ${displayPrice.toFixed(2)}
//                   </p>
//                 </div>
//                 <div style={{ textAlign: 'right' }}>
//                   {(() => {
//                     const extra = displayPrice - basePrice;
//                     return extra > 0 ? (
//                       <span style={{
//                         fontFamily: "'Montserrat',sans-serif",
//                         fontSize: '10px',
//                         fontWeight: 600,
//                         color: '#c97c3a',
//                         background: 'rgba(201,124,58,0.12)',
//                         border: '1px solid rgba(201,124,58,0.25)',
//                         borderRadius: '6px',
//                         padding: '3px 9px',
//                       }}>
//                         +${extra.toFixed(2)} added
//                       </span>
//                     ) : (
//                       <span style={{
//                         fontFamily: "'Montserrat',sans-serif",
//                         fontSize: '10px',
//                         color: 'rgba(255,255,255,0.2)',
//                       }}>
//                         Base price
//                       </span>
//                     );
//                   })()}
//                 </div>
//               </div>

//               {/* ── Jacket Lining ── */}
//               <SectionHeader label="Jacket Lining" value={selectedLining} />

//               <div
//                 className="ll-options-grid"
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
//                   gap: '10px',
//                   maxHeight: '340px',
//                   overflowY: 'auto',
//                   padding: '4px 2px 8px',
//                   marginBottom: '4px',
//                 }}
//               >
//                 {linings.map((lining, i) => (
//                   <OptionCard
//                     key={i}
//                     item={lining}
//                     selected={selectedLining === lining.name}
//                     onSelect={setSelectedLining}
//                     name="jacketLining"
//                   />
//                 ))}
//               </div>

//               <Divider />

//               {/* ── Quilted Lining ── */}
//               <SectionHeader label="Quilted Lining" value={selectedQuilted} />

//               <div
//                 className="ll-options-grid"
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
//                   gap: '10px',
//                   padding: '4px 2px 8px',
//                   marginBottom: '4px',
//                 }}
//               >
//                 {quantityLining.map((lining, i) => (
//                   <OptionCard
//                     key={i}
//                     item={lining}
//                     selected={selectedQuilted === lining.name}
//                     onSelect={setSelectedQuilted}
//                     name="quiltedLining"
//                   />
//                 ))}
//               </div>

//               <Divider />

//               {/* ── Hardware ── */}
//               <SectionHeader
//                 label="Hardware Color"
//                 value={selectedHardware}
//                 collapsible
//                 open={showHardware}
//                 onToggle={() => setShowHardware(!showHardware)}
//               />

//               {showHardware && (
//                 <div style={{ animation: 'customizeOpen 0.2s ease' }}>
//                   <p style={{
//                     fontFamily: "'Montserrat',sans-serif",
//                     fontSize: '11px',
//                     color: 'rgba(255,255,255,0.3)',
//                     marginBottom: '12px',
//                     lineHeight: 1.6,
//                   }}>
//                     2-way zippers have two pulls, allowing you to keep the garment zipped while leaving the lower portion open.
//                   </p>
//                   <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(3, 1fr)',
//                     gap: '10px',
//                     maxWidth: '380px',
//                     marginBottom: '8px',
//                   }}>
//                     {hardwareColor.map((hw, i) => (
//                       <OptionCard
//                         key={i}
//                         item={hw}
//                         selected={selectedHardware === hw.name}
//                         onSelect={setSelectedHardware}
//                         name="hardware"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <Divider />

//               {/* ── Comments ── */}
//               <button
//                 onClick={() => setShowComment(!showComment)}
//                 style={{
//                   width: '100%',
//                   padding: '11px 14px',
//                   borderRadius: '10px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   cursor: 'pointer',
//                   background: 'rgba(255,255,255,0.03)',
//                   border: '1px solid rgba(255,255,255,0.07)',
//                   marginBottom: showComment ? '14px' : '0',
//                   transition: 'all 0.2s ease',
//                 }}
//                 onMouseEnter={e => {
//                   e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)';
//                   e.currentTarget.style.background = 'rgba(99,102,241,0.05)';
//                 }}
//                 onMouseLeave={e => {
//                   e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
//                   e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
//                 }}
//               >
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
//                     stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
//                   </svg>
//                   <span style={{
//                     fontFamily: "'Montserrat',sans-serif",
//                     fontSize: '10px',
//                     fontWeight: 600,
//                     letterSpacing: '0.12em',
//                     textTransform: 'uppercase',
//                     color: 'rgba(255,255,255,0.4)',
//                   }}>
//                     Special Instructions
//                   </span>
//                 </div>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                   stroke="rgba(99,102,241,0.6)" strokeWidth="2" strokeLinecap="round"
//                   style={{ transform: showComment ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>
//                   <path d="M6 9l6 6 6-6"/>
//                 </svg>
//               </button>

//               {showComment && (
//                 <div
//                   style={{
//                     borderRadius: '10px',
//                     overflow: 'hidden',
//                     border: '1px solid rgba(99,102,241,0.2)',
//                     animation: 'customizeOpen 0.2s ease',
//                   }}
//                 >
//                   <div style={{
//                     padding: '10px 14px',
//                     background: 'rgba(99,102,241,0.08)',
//                     borderBottom: '1px solid rgba(99,102,241,0.15)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 8,
//                   }}>
//                     <span style={{
//                       fontFamily: "'Montserrat',sans-serif",
//                       fontSize: '9px',
//                       fontWeight: 600,
//                       letterSpacing: '0.15em',
//                       textTransform: 'uppercase',
//                       color: '#818cf8',
//                     }}>
//                       Comments &amp; Special Requests
//                     </span>
//                   </div>
//                   <textarea
//                     value={comment}
//                     onChange={handleCommentChange}
//                     placeholder="Add any special requests, measurements, or notes for your order…"
//                     rows={4}
//                     maxLength={600}
//                     className="ll-textarea"
//                     style={{
//                       width: '100%',
//                       padding: '14px',
//                       background: 'rgba(255,255,255,0.02)',
//                       border: 'none',
//                       resize: 'none',
//                       fontFamily: "'Montserrat',sans-serif",
//                       fontSize: '12px',
//                       color: 'rgba(255,255,255,0.7)',
//                       lineHeight: 1.7,
//                       minHeight: '100px',
//                       display: 'block',
//                     }}
//                   />
//                   <div style={{
//                     padding: '8px 14px',
//                     background: 'rgba(0,0,0,0.2)',
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                   }}>
//                     <span style={{
//                       fontFamily: "'Montserrat',sans-serif",
//                       fontSize: '9px',
//                       color: comment.length > 540 ? '#c97c3a' : 'rgba(255,255,255,0.2)',
//                     }}>
//                       {600 - comment.length} characters remaining
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* ── Collapse button ── */}
//               <button
//                 onClick={() => {
//                   setShowCustomization(false);
//                   window.scrollTo({ top: 0, behavior: 'smooth' });
//                 }}
//                 style={{
//                   display: 'block',
//                   margin: '24px auto 0',
//                   fontFamily: "'Montserrat',sans-serif",
//                   fontSize: '9px',
//                   fontWeight: 600,
//                   letterSpacing: '0.15em',
//                   textTransform: 'uppercase',
//                   color: 'rgba(99,102,241,0.5)',
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: '6px 12px',
//                   transition: 'color 0.2s ease',
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
//                 onMouseLeave={e => e.currentTarget.style.color = 'rgba(99,102,241,0.5)'}
//               >
//                 ↑ Collapse Customization
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default JacketCustomization;



import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Static data OUTSIDE component — never recreated on re-render
// ─────────────────────────────────────────────────────────────────────────────
const LININGS = [
  { name: "Default",          price: 0,  img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/default_lt_lining.jpg" },
  { name: "Red",              price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/red_satin.jpg" },
  { name: "Steel Gray",       price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/steelgraylining100x100.jpg" },
  { name: "Golden Beige",     price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/golden_beige.jpg" },
  { name: "Wine",             price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/wine_lining.jpg" },
  { name: "Electric Blue",    price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/fizzblue_lining.jpg" },
  { name: "Turkish Blue",     price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/turkishblue_lining.jpg" },
  { name: "Tan Brown",        price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/tan_brown_satin100x100.jpg" },
  { name: "Green",            price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/greenlining_LC.jpg" },
  { name: "Jade Green",       price: 20, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/jade_green_satin130x130.jpg" },
  { name: "Black Stretch",    price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/black.jpg" },
  { name: "Purple Bemberg",   price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/purplebemberg100x100.jpg" },
  { name: "Wine Bemberg",     price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/winebemberg100x100.jpg" },
  { name: "Burgandy Bemberg", price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/burgandy_bemberg.jpg" },
  { name: "Red Bemberg",      price: 40, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/redbemberg100x100.jpg" },
];

const QUILTED_LININGS = [
  { name: "NO",                     price: 0,  img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/no_quiltedlining.jpg" },
  { name: "Normal",                 price: 45, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/quiltedlining.jpg" },
  { name: "Thinsulate Body Warmer", price: 70, img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/thinsulate_quiltedlining.jpg" },
];

const HARDWARE_COLORS = [
  { name: "Antique Brass",  img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/antiquebrasshardware.jpg" },
  { name: "Antique Silver", img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/antiquesilverhardware.jpg" },
  { name: "Silver",         img: "https://cdn.shopify.com/s/files/1/0623/6992/3156/files/silverhardware.jpg" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pure price calculator — no hooks, no side effects
// ─────────────────────────────────────────────────────────────────────────────
const calcTotal = (basePrice, liningName, quiltedName) => {
  const lp = LININGS.find(l => l.name === liningName)?.price ?? 0;
  const qp = QUILTED_LININGS.find(q => q.name === quiltedName)?.price ?? 0;
  return basePrice + lp + qp;
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components OUTSIDE main component — prevents re-creation on every render
// ─────────────────────────────────────────────────────────────────────────────
const OptionCard = ({ item, selected, onSelect, name }) => (
  <label
    className="ll-option-card"
    style={{
      display: 'flex', flexDirection: 'column', cursor: 'pointer',
      borderRadius: '10px', overflow: 'hidden',
      border: selected ? '1.5px solid #6366f1' : '1px solid rgba(255,255,255,0.07)',
      background: selected ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
      boxShadow: selected ? '0 0 0 3px rgba(99,102,241,0.15), 0 4px 16px rgba(99,102,241,0.12)' : 'none',
      transition: 'all 0.2s ease', position: 'relative',
    }}
  >
    <input
      type="radio" name={name} value={item.name} checked={selected}
      onChange={() => onSelect(item.name)}
      style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
    />
    {selected && (
      <div style={{
        position: 'absolute', top: 7, right: 7, zIndex: 10,
        width: 18, height: 18, borderRadius: '50%', background: '#6366f1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(99,102,241,0.5)',
      }}>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )}
    <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#111' }}>
      <img
        src={item.img} alt={item.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', display: 'block' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      />
    </div>
    <div style={{ padding: '8px 6px 9px', textAlign: 'center', background: selected ? 'rgba(99,102,241,0.08)' : 'transparent' }}>
      <p style={{
        fontFamily: "'Montserrat',sans-serif", fontSize: '9.5px', fontWeight: 600,
        letterSpacing: '0.04em', color: selected ? '#818cf8' : 'rgba(255,255,255,0.55)',
        lineHeight: 1.3, marginBottom: item.price > 0 ? '2px' : 0,
      }}>
        {item.name}
      </p>
      {item.price > 0 && (
        <p style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 500,
          color: selected ? '#c97c3a' : 'rgba(201,124,58,0.6)',
        }}>
          +${item.price}
        </p>
      )}
    </div>
  </label>
);

const SectionHeader = ({ label, value, collapsible, open, onToggle }) => (
  <div
    onClick={collapsible ? onToggle : undefined}
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: '14px', cursor: collapsible ? 'pointer' : 'default',
      padding: '10px 14px', borderRadius: '10px',
      background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.12)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 3, height: 18, borderRadius: 2, background: 'linear-gradient(180deg,#6366f1,#c97c3a)' }} />
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '17px', fontWeight: 400, color: '#fff' }}>
        {label}
      </span>
      {value && (
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 600,
          letterSpacing: '0.08em', color: '#818cf8',
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '6px', padding: '2px 8px',
        }}>
          {value}
        </span>
      )}
    </div>
    {collapsible && (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="rgba(99,102,241,0.7)" strokeWidth="2" strokeLinecap="round"
        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
        <path d="M6 9l6 6 6-6"/>
      </svg>
    )}
  </div>
);

const Divider = () => (
  <div style={{
    height: 1, margin: '24px 0',
    background: 'linear-gradient(90deg, rgba(99,102,241,0.3), rgba(201,124,58,0.2), transparent)',
  }} />
);

// ─────────────────────────────────────────────────────────────────────────────
// Main component — NO useEffect for price calculation
// ─────────────────────────────────────────────────────────────────────────────
const JacketCustomization = ({ basePrice = 36, onPriceChange }) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [showHardware,      setShowHardware]      = useState(false);
  const [showComment,       setShowComment]       = useState(false);
  const [selectedLining,    setSelectedLining]    = useState("Default");
  const [selectedQuilted,   setSelectedQuilted]   = useState("NO");
  const [selectedHardware,  setSelectedHardware]  = useState("Antique Brass");
  const [comment,           setComment]           = useState("");

  // ── Price is PURE COMPUTATION — no useState, no useEffect, no loop ──
  const displayPrice = calcTotal(basePrice, selectedLining, selectedQuilted);
  const extraCost    = displayPrice - basePrice;

  // ── Notify parent INLINE in each handler — never in useEffect ──
  const handleLiningChange = (name) => {
    setSelectedLining(name);
    if (onPriceChange) onPriceChange(calcTotal(basePrice, name, selectedQuilted));
  };

  const handleQuiltedChange = (name) => {
    setSelectedQuilted(name);
    if (onPriceChange) onPriceChange(calcTotal(basePrice, selectedLining, name));
  };

  const handleCommentChange = (e) => {
    if (e.target.value.length <= 600) setComment(e.target.value);
  };

  return (
    <>
      <style>{`
        @keyframes customizeOpen {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ll-option-card:hover {
          border-color: rgba(99,102,241,0.4) !important;
          background: rgba(99,102,241,0.06) !important;
        }
        .ll-textarea { outline: none; }
        .ll-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .ll-options-scroll::-webkit-scrollbar { width: 3px; }
        .ll-options-scroll::-webkit-scrollbar-track { background: transparent; }
        .ll-options-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 4px' }}>

        {/* ── Toggle Button ── */}
        <button
          onClick={() => setShowCustomization(prev => !prev)}
          style={{
            width: '100%', padding: '14px 20px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
            background: showCustomization
              ? 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.08) 100%)'
              : 'rgba(255,255,255,0.04)',
            border: showCustomization
              ? '1px solid rgba(99,102,241,0.4)'
              : '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.25s ease',
            boxShadow: showCustomization ? '0 4px 20px rgba(99,102,241,0.15)' : 'none',
          }}
          onMouseEnter={e => {
            if (!showCustomization) {
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
              e.currentTarget.style.background  = 'rgba(99,102,241,0.06)';
            }
          }}
          onMouseLeave={e => {
            if (!showCustomization) {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.background  = 'rgba(255,255,255,0.04)';
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '9px',
              background: showCustomization ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
              </svg>
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6366f1', marginBottom: '1px',
              }}>
                Personalize Your Jacket
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: '17px',
                fontWeight: 300, color: '#fff', lineHeight: 1,
              }}>
                Advanced <em style={{ fontStyle: 'italic', color: '#c97c3a' }}>Customization</em>
              </p>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="rgba(99,102,241,0.7)" strokeWidth="2" strokeLinecap="round"
            style={{ transform: showCustomization ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease' }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        {/* ── Expandable Panel ── */}
        {showCustomization && (
          <div style={{
            marginTop: '12px', borderRadius: '14px',
            border: '1px solid rgba(99,102,241,0.18)',
            background: 'linear-gradient(160deg, #0d0d1a 0%, #09090f 100%)',
            overflow: 'hidden', animation: 'customizeOpen 0.28s ease',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.06)',
          }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #6366f1, #c97c3a, transparent)' }} />

            <div style={{ padding: '24px 20px' }}>

              {/* ── Price Banner ── */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px', borderRadius: '10px',
                background: 'rgba(201,124,58,0.08)', border: '1px solid rgba(201,124,58,0.2)',
                marginBottom: '24px',
              }}>
                <div>
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(201,124,58,0.7)', marginBottom: '2px',
                  }}>
                    Customization Total
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond',serif", fontSize: '26px',
                    fontWeight: 400, color: '#fff', lineHeight: 1,
                  }}>
                    ${displayPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  {extraCost > 0 ? (
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 600,
                      color: '#c97c3a', background: 'rgba(201,124,58,0.12)',
                      border: '1px solid rgba(201,124,58,0.25)', borderRadius: '6px', padding: '3px 9px',
                    }}>
                      +${extraCost.toFixed(2)} added
                    </span>
                  ) : (
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
                      Base price
                    </span>
                  )}
                </div>
              </div>

              {/* ── Jacket Lining ── */}
              <SectionHeader label="Jacket Lining" value={selectedLining} />
              <div
                className="ll-options-scroll"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                  gap: '10px', maxHeight: '340px', overflowY: 'auto',
                  padding: '4px 2px 8px', marginBottom: '4px',
                }}
              >
                {LININGS.map((lining, i) => (
                  <OptionCard
                    key={lining.name}
                    item={lining}
                    selected={selectedLining === lining.name}
                    onSelect={handleLiningChange}
                    name="jacketLining"
                  />
                ))}
              </div>

              <Divider />

              {/* ── Quilted Lining ── */}
              <SectionHeader label="Quilted Lining" value={selectedQuilted} />
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '10px', padding: '4px 2px 8px', marginBottom: '4px',
              }}>
                {QUILTED_LININGS.map((lining) => (
                  <OptionCard
                    key={lining.name}
                    item={lining}
                    selected={selectedQuilted === lining.name}
                    onSelect={handleQuiltedChange}
                    name="quiltedLining"
                  />
                ))}
              </div>

              <Divider />

              {/* ── Hardware ── */}
              <SectionHeader
                label="Hardware Color" value={selectedHardware}
                collapsible open={showHardware}
                onToggle={() => setShowHardware(prev => !prev)}
              />
              {showHardware && (
                <div style={{ animation: 'customizeOpen 0.2s ease' }}>
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
                    color: 'rgba(255,255,255,0.3)', marginBottom: '12px', lineHeight: 1.6,
                  }}>
                    2-way zippers have two pulls, allowing you to keep the garment zipped while leaving the lower portion open.
                  </p>
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px', maxWidth: '380px', marginBottom: '8px',
                  }}>
                    {HARDWARE_COLORS.map((hw) => (
                      <OptionCard
                        key={hw.name}
                        item={hw}
                        selected={selectedHardware === hw.name}
                        onSelect={setSelectedHardware}
                        name="hardware"
                      />
                    ))}
                  </div>
                </div>
              )}

              <Divider />

              {/* ── Comments ── */}
              <button
                onClick={() => setShowComment(prev => !prev)}
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  marginBottom: showComment ? '14px' : '0', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)';
                  e.currentTarget.style.background  = 'rgba(99,102,241,0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                  }}>
                    Special Instructions
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(99,102,241,0.6)" strokeWidth="2" strokeLinecap="round"
                  style={{ transform: showComment ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {showComment && (
                <div style={{
                  borderRadius: '10px', overflow: 'hidden',
                  border: '1px solid rgba(99,102,241,0.2)',
                  animation: 'customizeOpen 0.2s ease',
                }}>
                  <div style={{
                    padding: '10px 14px', background: 'rgba(99,102,241,0.08)',
                    borderBottom: '1px solid rgba(99,102,241,0.15)',
                  }}>
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                      letterSpacing: '0.15em', textTransform: 'uppercase', color: '#818cf8',
                    }}>
                      Comments &amp; Special Requests
                    </span>
                  </div>
                  <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add any special requests, measurements, or notes for your order…"
                    rows={4}
                    maxLength={600}
                    className="ll-textarea"
                    style={{
                      width: '100%', padding: '14px',
                      background: 'rgba(255,255,255,0.02)', border: 'none', resize: 'none',
                      fontFamily: "'Montserrat',sans-serif", fontSize: '12px',
                      color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, minHeight: '100px', display: 'block',
                    }}
                  />
                  <div style={{
                    padding: '8px 14px', background: 'rgba(0,0,0,0.2)',
                    display: 'flex', justifyContent: 'flex-end',
                  }}>
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: '9px',
                      color: comment.length > 540 ? '#c97c3a' : 'rgba(255,255,255,0.2)',
                    }}>
                      {600 - comment.length} characters remaining
                    </span>
                  </div>
                </div>
              )}

              {/* ── Collapse ── */}
              <button
                onClick={() => {
                  setShowCustomization(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'block', margin: '24px auto 0',
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'rgba(99,102,241,0.5)', background: 'none', border: 'none',
                  cursor: 'pointer', padding: '6px 12px', transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#818cf8'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(99,102,241,0.5)'; }}
              >
                ↑ Collapse Customization
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JacketCustomization;