// import { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { FaInfoCircle } from 'react-icons/fa';
// import RelatedProducts from '../components/RelatedProducts';
// import Modal from '../components/Modal';
// import JacketLiningSelector from '../components/JacketLiningSelector';
// import { toast } from 'react-toastify'
// import CartDrawer from '../components/CartDrawer';
// import { IoHeartSharp } from "react-icons/io5";
// import { FaRegStar } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
// // import { Helmet } from 'react-helmet-async';

// const colorMap = {
//   wine: '#722F37',
//   red: '#FF0000',
//   black: '#000000',
//   olive: '#808000',
//   green: '#008000',
//   cognac: '#D2691E',
//   white: '#FFFFFF',
//   yellow: '#FFFF00',
//   gray: '#808080',
//   rose: '#FF007F',
//   tobacco: '#A0522D',
//   navy: '#000080',
//   beige: '#F5F5DC',
//   blue: '#0000FF',
//   brown: '#8B4513',
//   'dark-wine': '#453333',
//   'tobacco-dark': '#6e351a',
// };

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const { submitReview, getProductReviews, token, backendUrl, deleteReview, userId } = useContext(ShopContext);
//   const { wishlist, toggleWishlistItem } = useContext(ShopContext);
//   const { getSingleProduct } = useContext(ShopContext);
//   const navigate = useNavigate();

//   // ✅ ALL STATE DECLARATIONS FIRST
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [size, setSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState('description');
//   const [makeMeasure, setMakeMeasure] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [displayPrice, setDisplayPrice] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [sizeMultiplier, setSizeMultiplier] = useState(1);
//   const [sizeStock, setSizeStock] = useState(0);

//   // ✅ Wishlist check
//   const isWishlisted = Array.isArray(wishlist)
//     ? wishlist.some(item => item.productId === productId)
//     : false;

//   // ✅ ALL FUNCTION DECLARATIONS SECOND
//   const fetchProductData = async () => {
//     const item = await getSingleProduct(productId);
//     if (item) {
//       setProductData(item);
//       setImage(item.image[0]);
//       setSelectedIndex(0);
//       setDisplayPrice(item.price);
//       setSizeMultiplier(1);
//     }
//   };

//   const loadReviews = async () => {
//     const data = await getProductReviews(productId);
//     setReviews(data);
//   };

//   const toggleCartDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleSizeSelect = (sizeObj) => {
//     console.log("Size clicked:", sizeObj);

//     if (!sizeObj) {
//       console.log("Invalid size object");
//       return;
//     }

//     if (typeof sizeObj === 'string') {
//       setSize(sizeObj);
//       setSizeMultiplier(1);
//       setSizeStock(0);
//     } else if (typeof sizeObj === 'object' && sizeObj.size) {
//       setSize(sizeObj.size);
//       setSizeMultiplier(sizeObj.priceMultiplier || 1);
//       setSizeStock(sizeObj.stock || 0);
//       console.log(`Size updated: ${sizeObj.size}, Multiplier: ${sizeObj.priceMultiplier}`);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!size || !selectedColor) {
//       toast.error('Please select a size and color before adding to cart.', { duration: 2000 });
//       return;
//     }

//     // Temp: Skip stock check
//     const customPrice = displayPrice - productData.price;
//     console.log(`Adding to cart: Base ${productData.price}, Size Multiplier ${sizeMultiplier}, Custom ${customPrice}, Total ${displayPrice}`);

//     addToCart(productData._id, size, selectedColor, customPrice);
//     setIsButtonDisabled(true);

//     setTimeout(() => {
//       toast.success('Product added to cart!', { duration: 2000 });
//       setIsButtonDisabled(false);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 2000);
//   };

//   const handleReviewSubmit = async () => {
//     if (!token) return toast.error("Please login first");

//     if (!rating || !comment.trim()) {
//       return toast.error("Please add rating and comment");
//     }

//     const success = await submitReview(productId, rating, comment);

//     if (success) {
//       setComment("");
//       setRating(5);
//       loadReviews();
//     }
//   };

//   const toggleMakeMeasure = () => setMakeMeasure(!makeMeasure);
//   const toggleExpansion = () => setIsExpanded((prev) => !prev);
//   const handleTabClick = (tab) => setActiveTab(tab);

//   // ✅ ALL useEffect HOOKS LAST
//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   useEffect(() => {
//     if (productId) {
//       loadReviews();
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (productData) {
//       console.log("ProductData loaded:", {
//         name: productData.name,
//         price: productData.price,
//         sizes: productData.sizes,
//         sizeType: Array.isArray(productData.sizes) ? typeof productData.sizes[0] : 'unknown'
//       });
//     }
//   }, [productData]);

//   useEffect(() => {
//     if (productData?.color?.length) {
//       // ✅ FIXED: Handle both old (string) and new (object) formats
//       const firstColor = productData.color[0];
//       let colorName;

//       if (typeof firstColor === 'string') {
//         // Old format: just a string
//         colorName = firstColor;
//       } else if (typeof firstColor === 'object' && firstColor.name) {
//         // New format: object with name property
//         colorName = firstColor.name;
//       } else {
//         colorName = 'Unknown';
//       }

//       setSelectedColor(colorName);
//     }
//   }, [productData]);

//   useEffect(() => {
//     if (productData && productData.price) {
//       const multiplier = sizeMultiplier || 1;
//       const baseSizePrice = productData.price * multiplier;
//       console.log(`🔄 Price HOOK fired: Base ${productData.price} × Multiplier ${multiplier} = ${baseSizePrice}`);
//       setDisplayPrice(baseSizePrice);
//     }
//   }, [sizeMultiplier, productData?.price]);

//   useEffect(() => {
//     if (size) {
//       console.log(`✅ Size state: ${size}, Multiplier: ${sizeMultiplier}, Stock: ${sizeStock}`);
//     }
//   }, [size, sizeMultiplier, sizeStock]);

//   // ✅ RENDER
//   if (!productData) {
//     return <div className="opacity-0"></div>;
//   }

//   const avgRating = reviews.length > 0
//     ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//     : 0;

//   const roundedRating = Math.round(avgRating);

//   const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction.
//     Get your order delivered swiftly with tracking updates every step of the way.
//     We use sustainable, recyclable materials to keep your delivery green and guilt-free.
//     Products adhere to international quality benchmarks, ensuring top-tier performance.
//     Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;

//   const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;
//   const customBreakdown = displayPrice > productData.price ? ` (incl. +${currency}${(displayPrice - productData.price).toFixed(2)} for size/customization)` : '';

//   return (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-10">
//       {/* <Helmet>
//         <title>{productData.name} - Buy Premium Leather Jacket | LL Leather Lovers</title>
//         <meta name="description" content={productData.description} />
//         <meta property="og:title" content={productData.name} />
//         <meta property="og:description" content={productData.description} />
//         <meta property="og:image" content={productData.image} />
//         <link rel="canonical" href={`https://llleatherlovers.com/product/${productId}`} />
//       </Helmet> */}

//       <div className="flex flex-col sm:flex-row">
//         <div className=" flex flex-col-reverse gap-3 sm:flex-row md:sticky md:top-28 self-start w-full lg:w-[40%] ">
//         {/* <div className="w-full lg:w-[40%] flex gap-4 md:sticky md:top-28 self-start"> */}

//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] lg:w-[10%] lg:h-[10%] w-full lg:mr-5 gap-1">
//           {/* <div className="flex lg:flex-col gap-2 w-full lg:w-[15%] overflow-x-auto lg:overflow-y-auto"> */}

//             {productData.image.map((item, index) => (
//               <div
//                 key={index}
//                 className={`flex-shrink-0 cursor-pointer transition-all duration-200 w-[70px] h-[50px] sm:w-full  rounded-md
//                 ${index === selectedIndex ? 'border-2 border-blue-500' : 'border-2 border-transparent'}`}
//                 onClick={() => {
//                   setImage(item);
//                   setSelectedIndex(index);
//                 }}
//               >
//                 <img src={item} alt="" className="w-full h-full object-cover rounded-md" />
//               </div>
//             ))}
//           </div>

//           <div className="w-full sm:w-[80%] lg:w-[70%] flex justify-center items-center">
//           {/* <div className="w-full lg:w-[85%] flex justify-center items-center"> */}

//             <div className="w-full max-h-[400px] aspect-[3/4] overflow-hidden rounded-lg bg-white flex items-center justify-center shadow-sm">
//               <img className="w-full h-full object-contain rounded-lg" src={image} alt={productData.name} />
//             </div>
//           </div>
//         </div>

//         <div className="w-full lg:w-[60%]">
//           <h1 className="lg:font-[600]text-gray-900 lg:text-[22px] mt-4 lg:mt-0 lg:mr-12">{productData.name}</h1>
//           <div className="flex items-center gap-1 mt-2">
//             {[...Array(5)].map((_, index) => (
//               <span key={index} className="text-[#de7921] text-sm">
//                 {index < roundedRating ? <FaStar /> : <FaRegStar />}
//               </span>
//             ))}
//             <p className="pl-2 text-sm text-gray-600">({reviews.length})</p>
//           </div>

//           {productData.discountPrice > 0 ? (
//             productData.discountActive ? (
//               <div className="flex items-center gap-3 mt-5">
//                 <p className="text-2xl font-medium text-gray-500 line-through">
//                   {currency}{displayPrice.toFixed(2)}
//                 </p>
//                 <p className="text-3xl font-semibold text-green-600">
//                   {currency}
//                   {(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//                 </p>
//               </div>
//             ) : (
//               <p className="mt-5 text-3xl font-semibold text-green-700">
//                 {currency}
//                 {(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//               </p>
//             )
//           ) : (
//             <p className="mt-5 text-3xl font-medium text-gray-800">
//               {currency}{displayPrice.toFixed(2)}
//               <span className="text-sm text-gray-500">{customBreakdown}</span>
//             </p>
//           )}

//           {/* DEBUG: Show current state */}
//           {/* <p className="text-xs text-gray-400 mt-2">Debug: displayPrice={displayPrice}, sizeMultiplier={sizeMultiplier}</p> */}

//           <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

//           <div className="flex flex-col gap-4 my-8">
//             <div>
//               <div className="flex items-center mb-2">
//                 <p className="text-sm font-medium text-gray-700 mr-2">Color :</p>
//                 <span className="text-sm text-gray-900 capitalize">{selectedColor}</span>
//               </div>
//               <div className="flex gap-3 flex-wrap">
//                 {productData.color && productData.color.length > 0 ? (
//                   productData.color.map((colorObj, index) => {
//                     // ✅ FIXED: Handle both old (string) and new (object) formats
//                     let colorName, colorHex;

//                     if (typeof colorObj === 'string') {
//                       // Old format: just a string like "Red" or "Black"
//                       colorName = colorObj;
//                       // Try to find hex from colorMap, otherwise use a default gray
//                       colorHex = colorMap[colorObj.toLowerCase()] || '#CCCCCC';
//                     } else if (typeof colorObj === 'object' && colorObj.name) {
//                       // New format: object with {name, hex}
//                       colorName = colorObj.name;
//                       colorHex = colorObj.hex || '#CCCCCC';
//                     } else {
//                       // Fallback
//                       colorName = 'Unknown';
//                       colorHex = '#CCCCCC';
//                     }

//                     const isSelected = selectedColor === colorName;
//                     return (
//                       <div key={index} className="flex flex-col items-center">
//                         <button
//                           onClick={() => setSelectedColor(colorName)}
//                           className={`w-10 h-10 rounded-md border-2 transition-all duration-200 ${
//                             isSelected
//                               ? 'ring- ring-black scale-110 border-black'
//                               : 'border-gray-800 hover:ring-1 hover:ring-gray-400'
//                           }`}
//                           style={{
//                             backgroundColor: colorHex,
//                           }}
//                           title={`${colorName} (${colorHex})`}
//                         ></button>
//                         <p className="text-xs text-gray-600 mt-1 capitalize text-center max-w-[60px]">
//                           {/* {colorName} */}
//                         </p>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p>No colors available</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <div className="flex gap-0 justify-between mr-20 mb-2">
//                 <p className="text-sm font-medium text-gray-700">Select Size</p>
//                 <button
//                   className="underline hover:no-underline text-sm text-blue-600"
//                   onClick={() => setShowModal(true)}
//                 >
//                   Size Guide
//                 </button>
//                 {showModal && <Modal onclose={() => setShowModal(false)} />}
//               </div>

//               <div className="flex gap-2 mb-2 flex-wrap">
//                 {productData.sizes && productData.sizes.length > 0 ? (
//                   productData.sizes.map((sizeObj, index) => {
//                     const sizeLabel = sizeObj?.size || sizeObj;
//                     const multiplier = sizeObj?.priceMultiplier || 1;
//                     const stock = sizeObj?.stock || 0;
//                     const sizePrice = (productData.price * multiplier).toFixed(2);
//                     // ✅ FIXED: If stock is 0, treat as in stock (temp fix for testing)
//                     const isInStock = stock > 0 || stock === 0; // Always true for now
//                     const isSelected = size === sizeLabel;

//                     return (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => {
//                           console.log("🔥 SIZE CLICKED:", sizeObj);
//                           handleSizeSelect(sizeObj);
//                         }}
//                         disabled={!isInStock}
//                         className={`border-2 border-gray-400 py-2 px-4 rounded-md flex flex-col items-center gap-1 transition-all ${
//                           isSelected
//                             ? 'border-orange-500 bg-orange-100 scale-105'
//                             : 'border-gray-300 hover:border-orange-300 hover:bg-gray-50'
//                         } ${!isInStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//                         title={!isInStock ? 'Out of stock' : `Select ${sizeLabel}`}
//                       >
//                         <span className="font-semibold text-gray-800">{sizeLabel}</span>
//                         <span className="text-xs text-gray-600 font-medium">
//                           ${sizePrice}
//                         </span>
//                       </button>
//                     );
//                   })
//                 ) : (
//                   <p className="text-gray-500">No sizes available</p>
//                 )}
//               </div>

//               {size && sizeStock <= 0 && (
//                 <p className="text-sm text-red-600 font-medium">⚠️ This size is out of stock</p>
//               )}
//               {size && sizeStock > 0 && sizeStock < 5 && (
//                 <p className="text-sm text-orange-600 font-medium">⚠️ Only {sizeStock} left in stock</p>
//               )}
//             </div>

//             <div className="flex flex-col justify-center items-center">
//               <button
//                 onClick={toggleMakeMeasure}
//                 className="w-[90%] border border-gray-300 text-gray-800 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors mb-4"
//               >
//                 MADE TO MEASURE
//               </button>
//               {makeMeasure && (
//                 <div className="flex items-center justify-center text-sm md:text-base lg:text-lg text-gray-600 bg-gray-100 p-4 rounded-md w-[80%] -mb-4">
//                   <FaInfoCircle className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
//                   Measurements can be added on the Cart page
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col items-center gap-3  top-24 z-[9] mb-10">
//             <button
//               onClick={() => toggleWishlistItem(productId)}
//               className="w-[90%] border border-gray-300 py-2.5 rounded-md
//              text-gray-800 hover:bg-gray-100 transition-colors"
//             >
//               {isWishlisted ? "❤️ Remove from Wishlist" : "🖤 Add to Wishlist"}
//             </button>
//           </div>

//           <div className="flex items-center justify-center md:sticky top-24 z-[999]" >
//             <button
//               onClick={() => {
//                 handleAddToCart();
//                 toggleCartDrawer();
//               }}
//               disabled={isButtonDisabled || !size || !selectedColor}
//               className="w-[90%] bg-gray-500 text-white font-semibold py-2.5 rounded-md
// hover:bg-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed
// md:sticky md:top-4 self-start z-50"
//             >
//               ADD TO CART
//             </button>
//           </div>

//           <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
//           <JacketLiningSelector
//             basePrice={productData.price * sizeMultiplier}
//             onPriceChange={(newPrice) => {
//               console.log(`JacketLiningSelector changed price to: ${newPrice}`);
//               setDisplayPrice(newPrice);
//             }}
//           />

//           <hr className="mt-8 sm:w-4/3" />

//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>Every item is 100% original, crafted with premium materials for lasting style and comfort.</p>
//             <p>Enjoy secure cash on delivery options, plus multiple payment methods to suit your preference.</p>
//             <p>{shownContent}</p>
//             <p
//               className="underline hover:no-underline cursor-pointer text-base text-gray-600"
//               onClick={toggleExpansion}
//             >
//               {isExpanded ? 'Read Less' : 'Read More'}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20">
//         <div className="flex border-b border-gray-200">
//           <button
//             onClick={() => handleTabClick('description')}
//             className={`px-4 py-2 text-sm font-medium ${activeTab === 'description'
//               ? 'border-b-2 border-blue-500 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//               }`}
//           >
//             Description
//           </button>
//           <button
//             onClick={() => handleTabClick('reviews')}
//             className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews'
//               ? 'border-b-2 border-blue-500 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//               }`}
//           >
//             Reviews ({reviews.length})
//           </button>
//         </div>

//         <div className="mt-4">
//           {activeTab === 'description' && (
//             <div
//               className="text-gray-700 leading-relaxed whitespace-pre-line"
//               dangerouslySetInnerHTML={{ __html: productData.detailedDescription }}
//             />
//           )}

//           {activeTab === 'reviews' && (
//             <div className="text-gray-600">
//               {token ? (
//                 <div className="mb-6 p-4 border rounded-lg">
//                   <h3 className="font-semibold mb-2">Write a Review</h3>
//                   <select
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                     className="border p-2 rounded mb-3"
//                   >
//                     <option value="5">★★★★★ (5)</option>
//                     <option value="4">★★★★☆ (4)</option>
//                     <option value="3">★★★☆☆ (3)</option>
//                     <option value="2">★★☆☆☆ (2)</option>
//                     <option value="1">★☆☆☆☆ (1)</option>
//                   </select>

//                   <textarea
//                     placeholder="Write your review..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     className="w-full border p-2 rounded mb-3"
//                     rows="3"
//                   ></textarea>

//                   <button
//                     onClick={handleReviewSubmit}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//                   >
//                     Submit Review
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mb-4">Login to write a review.</p>
//               )}

//               {reviews.length === 0 ? (
//                 <p className="text-gray-500">No reviews yet.</p>
//               ) : (
//                 reviews.map((rev) => (
//                   <div key={rev._id} className="mb-4 border-b pb-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="font-semibold">{rev.user?.name || "User"}</span>
//                         <span className="text-yellow-500 ml-3">
//                           {"★".repeat(rev.rating)}
//                           {"☆".repeat(5 - rev.rating)}
//                         </span>
//                       </div>

//                       {rev.user?._id === userId && (
//                         <button
//                           onClick={async () => {
//                             const ok = await deleteReview(rev._id);
//                             if (ok) loadReviews();
//                           }}
//                           className="text-red-500 text-sm hover:underline"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>

//                     <p className="mt-1">{rev.comment}</p>
//                     <span className="text-sm text-gray-400">
//                       {new Date(rev.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;







// import { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { FaInfoCircle } from 'react-icons/fa';
// import RelatedProducts from '../components/RelatedProducts';
// import Modal from '../components/Modal';
// import JacketLiningSelector from '../components/JacketLiningSelector';
// import { toast } from 'react-toastify';
// import CartDrawer from '../components/CartDrawer';

// const colorMap = {
//   wine:'#722F37', red:'#FF0000', black:'#000000', olive:'#808000', green:'#008000',
//   cognac:'#D2691E', white:'#FFFFFF', yellow:'#FFFF00', gray:'#808080', rose:'#FF007F',
//   tobacco:'#A0522D', navy:'#000080', beige:'#F5F5DC', blue:'#0000FF', brown:'#8B4513',
//   'dark-wine':'#453333', 'tobacco-dark':'#6e351a',
// };

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart, submitReview, getProductReviews, token, backendUrl, deleteReview, userId, wishlist, toggleWishlistItem, getSingleProduct } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [size, setSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState('description');
//   const [makeMeasure, setMakeMeasure] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [displayPrice, setDisplayPrice] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [sizeStock, setSizeStock] = useState(0);

//   const isWishlisted = Array.isArray(wishlist) ? wishlist.some(item => item.productId === productId) : false;

//   const fetchProductData = async () => {
//     const item = await getSingleProduct(productId);
//     if (item) { setProductData(item); setImage(item.image[0]); setSelectedIndex(0); setDisplayPrice(item.price); }
//   };

//   const loadReviews = async () => { const data = await getProductReviews(productId); setReviews(data); };

//   const handleSizeSelect = (sizeObj) => {
//     if (!sizeObj) return;
//     if (typeof sizeObj === 'string') { setSize(sizeObj); setSizeStock(0); setDisplayPrice(productData?.price || 0); }
//     else if (typeof sizeObj === 'object' && sizeObj.size) {
//       setSize(sizeObj.size); setSizeStock(sizeObj.stock || 0);
//       if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) setDisplayPrice(sizeObj.customPrice);
//       else setDisplayPrice(productData.price * (sizeObj.priceMultiplier || 1));
//     }
//   };

//   const handleAddToCart = () => {
//     if (!size || !selectedColor) { toast.error('Please select a size and color.'); return; }
//     const customPrice = displayPrice - productData.price;
//     addToCart(productData._id, size, selectedColor, customPrice);
//     setIsButtonDisabled(true);
//     setTimeout(() => { toast.success('Product added to cart!'); setIsButtonDisabled(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 2000);
//   };

//   const handleReviewSubmit = async () => {
//     if (!token) return toast.error('Please login first');
//     if (!rating || !comment.trim()) return toast.error('Please add rating and comment');
//     const success = await submitReview(productId, rating, comment);
//     if (success) { setComment(''); setRating(5); loadReviews(); }
//   };

//   useEffect(() => { fetchProductData(); }, [productId, products]);
//   useEffect(() => { if (productId) loadReviews(); }, [productId]);
//   useEffect(() => {
//     if (productData?.color?.length) {
//       const firstColor = productData.color[0];
//       setSelectedColor(typeof firstColor === 'string' ? firstColor : firstColor?.name || 'Unknown');
//     }
//   }, [productData]);

//   if (!productData) return <div className="opacity-0" />;

//   const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
//   const roundedRating = Math.round(avgRating);
//   const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction. Get your order delivered swiftly with tracking updates every step of the way. We use sustainable, recyclable materials to keep your delivery green and guilt-free. Products adhere to international quality benchmarks, ensuring top-tier performance. Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;
//   const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;
//   const customBreakdown = displayPrice > productData.price ? ` (incl. +${currency}${(displayPrice - productData.price).toFixed(2)} for size/customization)` : '';

//   return (
//     <div style={{ background: 'linear-gradient(180deg, #08080f 0%, #0b0b14 100%)' }} className="min-h-screen">

//       {/* Top separator */}
//       <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">

//         {/* ── PRODUCT MAIN ── */}
//         <div className="flex flex-col lg:flex-row gap-10">

//           {/* ── IMAGE GALLERY ── */}
//           <div className="lg:w-[45%] flex flex-col-reverse sm:flex-row gap-3 lg:sticky lg:top-24 self-start">
//             {/* Thumbnails */}
//             <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] sm:w-20 shrink-0">
//               {productData.image.map((img, index) => (
//                 <button key={index} onClick={() => { setImage(img); setSelectedIndex(index); }}
//                   className="shrink-0 w-16 h-16 sm:w-full sm:h-16 rounded-lg overflow-hidden transition-all duration-200"
//                   style={{ border: index === selectedIndex ? '2px solid #6366f1' : '2px solid rgba(255,255,255,0.06)', background: 'white' }}>
//                   <img src={img} alt="" className="w-full h-full object-contain p-1" />
//                 </button>
//               ))}
//             </div>

//             {/* Main image */}
//             <div className="flex-1 rounded-2xl overflow-hidden relative"
//               style={{ background: 'white', border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '3/4', maxHeight: '560px' }}>
//               <img src={image} alt={productData.name} className="w-full h-full object-contain p-4" />
//               {/* Wishlist button on image */}
//               <button onClick={() => toggleWishlistItem(productId)}
//                 className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
//                 style={{ background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(0,0,0,0.08)', border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)' }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : '#666'} strokeWidth="1.5" strokeLinecap="round">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* ── PRODUCT INFO ── */}
//           <div className="lg:w-[55%]">

//             {/* Breadcrumb */}
//             <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-3"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>
//               {productData.category} / {productData.subCategory}
//             </p>

//             {/* Name */}
//             <h1 className="text-white mb-4"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(20px,3.5vw,20px)' }}>
//               {productData.name}
//             </h1>

//             {/* Stars */}
//             <div className="flex items-center gap-1.5 mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <svg key={i} width="14" height="14" viewBox="0 0 24 24"
//                   fill={i < roundedRating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                 </svg>
//               ))}
//               <span className="text-white/35 ml-1" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>
//                 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
//               </span>
//             </div>

//             {/* Price */}
//             <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//               {productData.discountPrice > 0 && productData.discountActive ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-white/40 line-through" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '22px' }}>{currency}{displayPrice.toFixed(2)}</span>
//                   <span className="text-green-400 font-medium" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//                   </span>
//                   <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
//                     style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 700 }}>
//                     {productData.discountPrice}% OFF
//                   </span>
//                 </div>
//               ) : (
//                 <div>
//                   <span className="text-white" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{displayPrice.toFixed(2)}
//                   </span>
//                   {customBreakdown && <span className="text-white/35 ml-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{customBreakdown}</span>}
//                 </div>
//               )}
//             </div>

//             {/* Description */}
//             <p className="text-white/50 leading-relaxed mb-7"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', lineHeight: '1.8' }}>
//               {productData.description}
//             </p>

//             {/* Color */}
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Colour</p>
//                 <span className="text-white/70 capitalize" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{selectedColor}</span>
//               </div>
//               <div className="flex gap-2.5 flex-wrap">
//                 {productData.color && productData.color.length > 0 ? productData.color.map((colorObj, index) => {
//                   let colorName = typeof colorObj === 'string' ? colorObj : colorObj?.name || 'Unknown';
//                   let colorHex = typeof colorObj === 'string' ? (colorMap[colorObj.toLowerCase()] || '#CCCCCC') : (colorObj.hex || colorMap[colorObj?.name?.toLowerCase()] || '#CCCCCC');
//                   const isSelected = selectedColor === colorName;
//                   return (
//                     <button key={index} onClick={() => setSelectedColor(colorName)} title={colorName}
//                       className="w-9 h-9 rounded-lg transition-all duration-200"
//                       style={{ backgroundColor: colorHex,
//                         border: isSelected ? '3px solid #6366f1' : '2px solid rgba(255,255,255,0.15)',
//                         boxShadow: isSelected ? '0 0 12px rgba(99,102,241,0.5)' : 'none',
//                         transform: isSelected ? 'scale(1.1)' : 'scale(1)' }} />
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No colors available</p>}
//               </div>
//             </div>

//             {/* Size */}
//             <div className="mb-7">
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Select Size</p>
//                 <button onClick={() => setShowModal(true)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                   style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline' }}>Size Guide</button>
//                 {showModal && <Modal onclose={() => setShowModal(false)} />}
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {productData.sizes && productData.sizes.length > 0 ? productData.sizes.map((sizeObj, index) => {
//                   const sizeLabel = sizeObj?.size || sizeObj;
//                   const stock = sizeObj?.stock ?? 0;
//                   let sizePrice = productData.price;
//                   if (typeof sizeObj === 'object') {
//                     if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) sizePrice = sizeObj.customPrice;
//                     else sizePrice = productData.price * (sizeObj.priceMultiplier || 1);
//                   }
//                   const isSelected = size === sizeLabel;
//                   return (
//                     <button key={index} type="button" onClick={() => handleSizeSelect(sizeObj)}
//                       className="flex flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200"
//                       style={{ border: isSelected ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
//                         background: isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
//                         transform: isSelected ? 'scale(1.05)' : 'scale(1)', minWidth: '60px' }}>
//                       <span className="text-white font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>{sizeLabel}</span>
//                       <span className="text-white/40" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>{currency}{sizePrice.toFixed(0)}</span>
//                     </button>
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No sizes available</p>}
//               </div>
//               {size && sizeStock <= 0 && <p className="text-red-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ This size is out of stock</p>}
//               {size && sizeStock > 0 && sizeStock < 5 && <p className="text-amber-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ Only {sizeStock} left in stock</p>}
//             </div>

//             {/* Made to Measure */}
//             <div className="mb-4">
//               <button onClick={() => setMakeMeasure(!makeMeasure)}
//                 className="w-full rounded-xl py-3 text-white/60 hover:text-white/90 transition-all duration-200 font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2px',
//                   border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
//                   <path d="M21 3H3v18h18V3z M7 7h.01 M7 12h.01 M7 17h.01 M11 7h6 M11 12h6 M11 17h6"/>
//                 </svg>
//                 Made to Measure
//               </button>
//               {makeMeasure && (
//                 <div className="mt-2 rounded-xl p-3 flex items-center gap-2"
//                   style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
//                   <FaInfoCircle className="text-indigo-400 shrink-0" size={14} />
//                   <p className="text-white/50" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>Measurements can be added on the Cart page</p>
//                 </div>
//               )}
//             </div>

//             {/* Add to Cart */}
//             <button onClick={() => { handleAddToCart(); setDrawerOpen(true); }}
//               disabled={isButtonDisabled || !size || !selectedColor}
//               className="w-full relative overflow-hidden rounded-xl text-white font-semibold uppercase tracking-widest py-4 mb-4 group"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '2.5px',
//                 background: isButtonDisabled ? '#4b4b6b' : '#6366f1',
//                 opacity: (!size || !selectedColor) ? 0.5 : 1,
//                 cursor: (!size || !selectedColor) ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
//               <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl" style={{ display: (!size || !selectedColor) ? 'none' : 'block' }} />
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 {isButtonDisabled ? (
//                   <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Adding…</>
//                 ) : (
//                   <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Add to Cart</>
//                 )}
//               </span>
//             </button>

//             <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={() => setDrawerOpen(!drawerOpen)} />
//             <JacketLiningSelector basePrice={displayPrice} onPriceChange={newPrice => setDisplayPrice(newPrice)} />

//             {/* Policy list */}
//             <div className="mt-6 space-y-2.5 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//               {[
//                 { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text: '100% original, premium materials' },
//                 { icon: 'M9 12l2 2 4-4', text: 'Secure cash on delivery + multiple payment methods' },
//                 { icon: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5', text: 'Simple 7-day return or exchange policy' },
//               ].map(({ icon, text }) => (
//                 <div key={text} className="flex items-center gap-2.5">
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round"><path d={icon}/></svg>
//                   <span className="text-white/35" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{text}</span>
//                 </div>
//               ))}
//               <p className="text-white/30 leading-relaxed" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', lineHeight: '1.8' }}>
//                 {shownContent}
//               </p>
//               <button onClick={() => setIsExpanded(p => !p)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline' }}>
//                 {isExpanded ? 'Read Less' : 'Read More'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── TABS: DESCRIPTION & REVIEWS ── */}
//         <div className="mt-16">
//           <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
//             {['description', 'reviews'].map(tab => (
//               <button key={tab} onClick={() => setActiveTab(tab)}
//                 className="px-6 py-3 font-semibold uppercase tracking-widest transition-all duration-200 relative"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2px',
//                   color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.3)' }}>
//                 {tab === 'reviews' ? `Reviews (${reviews.length})` : 'Description'}
//                 {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
//               </button>
//             ))}
//           </div>

//           {activeTab === 'description' && (
//             <div className="prose max-w-none text-white/50 leading-relaxed"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', lineHeight: '1.9' }}
//               dangerouslySetInnerHTML={{ __html: productData.detailedDescription }} />
//           )}

//           {activeTab === 'reviews' && (
//             <div className="space-y-6">
//               {token && (
//                 <div className="rounded-2xl p-6 border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
//                   <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
//                   <p className="text-white font-light mb-4" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px' }}>Write a Review</p>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-white/30 uppercase tracking-widest mb-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Rating</p>
//                       <div className="flex gap-2">
//                         {[5,4,3,2,1].map(r => (
//                           <button key={r} type="button" onClick={() => setRating(r)}
//                             className="flex items-center gap-1 rounded-lg px-3 py-2 transition-all duration-200 border"
//                             style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
//                               background: Number(rating) === r ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)',
//                               border: Number(rating) === r ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.07)',
//                               color: Number(rating) === r ? '#f59e0b' : 'rgba(255,255,255,0.35)' }}>
//                             {'★'.repeat(r)} {r}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-white/30 uppercase tracking-widest mb-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Comment</p>
//                       <textarea value={comment} onChange={e => setComment(e.target.value)}
//                         placeholder="Share your experience..." rows={3}
//                         className="w-full rounded-lg text-white/70 placeholder-white/20 transition-all duration-200 resize-none"
//                         style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', padding: '12px 14px',
//                           background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', outline: 'none' }}
//                         onFocus={e => { e.target.style.border = '1px solid rgba(99,102,241,0.5)'; e.target.style.background = 'rgba(99,102,241,0.04)'; }}
//                         onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }} />
//                     </div>
//                     <button onClick={handleReviewSubmit}
//                       className="relative overflow-hidden rounded-lg text-white font-semibold uppercase tracking-widest px-8 py-3 group"
//                       style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2.5px', background: '#6366f1' }}>
//                       <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-lg" />
//                       <span className="relative z-10">Submit Review</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {!token && <p className="text-white/30" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>Login to write a review.</p>}

//               {reviews.length === 0 ? (
//                 <p className="text-white/25" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px' }}>No reviews yet. Be the first!</p>
//               ) : (
//                 <div className="space-y-4">
//                   {reviews.map(rev => (
//                     <div key={rev._id} className="rounded-xl p-5 border border-white/[0.06]"
//                       style={{ background: 'rgba(255,255,255,0.02)' }}>
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center"
//                             style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px', color: '#818cf8', fontWeight: 600 }}>
//                             {(rev.user?.name || 'U')[0].toUpperCase()}
//                           </div>
//                           <div>
//                             <p className="text-white/80 font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>{rev.user?.name || 'User'}</p>
//                             <div className="flex gap-0.5">
//                               {[...Array(5)].map((_, i) => (
//                                 <svg key={i} width="11" height="11" viewBox="0 0 24 24"
//                                   fill={i < rev.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//                                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                                 </svg>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <span className="text-white/25" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>
//                             {new Date(rev.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
//                           </span>
//                           {rev.user?._id === userId && (
//                             <button onClick={async () => { const ok = await deleteReview(rev._id); if (ok) loadReviews(); }}
//                               className="text-red-400 hover:text-red-300 transition-colors"
//                               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>
//                               Delete
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-white/50 leading-relaxed" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px', lineHeight: '1.7' }}>{rev.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="mt-20">
//           <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;




// import { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { FaInfoCircle } from 'react-icons/fa';
// import RelatedProducts from '../components/RelatedProducts';
// import Modal from '../components/Modal';
// import JacketLiningSelector from '../components/JacketLiningSelector';
// import { toast } from 'react-toastify';
// import CartDrawer from '../components/CartDrawer';

// const colorMap = {
//   wine:'#722F37', red:'#FF0000', black:'#000000', olive:'#808000', green:'#008000',
//   cognac:'#D2691E', white:'#FFFFFF', yellow:'#FFFF00', gray:'#808080', rose:'#FF007F',
//   tobacco:'#A0522D', navy:'#000080', beige:'#F5F5DC', blue:'#0000FF', brown:'#8B4513',
//   'dark-wine':'#453333', 'tobacco-dark':'#6e351a',
// };

// /* ══════════════════════════════════════════════════════════════════
//    STYLES
// ══════════════════════════════════════════════════════════════════ */
// const ProductPageStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

//     /* ── tab underline slide ── */
//     .ptab-btn { position:relative; overflow:hidden; }
//     .ptab-btn::after {
//       content:''; position:absolute; bottom:0; left:50%; right:50%;
//       height:2px; background:linear-gradient(90deg,#6366f1,#818cf8);
//       transition: left .35s ease, right .35s ease;
//       border-radius:99px;
//     }
//     .ptab-btn.ptab-active::after { left:0; right:0; }

//     /* ── star hover ── */
//     .star-pick { transition: transform .15s, filter .15s; }
//     .star-pick:hover { transform:scale(1.05); filter:drop-shadow(0 0 6px #f59e0b88); }

//     /* ── review card hover ── */
//     .rev-card { transition: border-color .2s, box-shadow .2s, transform .2s; }
//     .rev-card:hover {
//       border-color: rgba(99,102,241,.25) !important;
//       box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 0 0 1px rgba(99,102,241,.08);
//       transform: translateY(-1px);
//     }

//     /* ── textarea glow ── */
//     .rev-textarea:focus {
//       outline:none;
//       border-color: rgba(99,102,241,.55) !important;
//       box-shadow: 0 0 0 3px rgba(99,102,241,.12), 0 0 24px rgba(99,102,241,.08);
//     }

//     /* ── submit btn ── */
//     .submit-btn {
//       background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
//       transition: transform .2s, box-shadow .2s, filter .2s;
//     }
//     .submit-btn:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 12px 28px rgba(99,102,241,.45);
//       filter: brightness(1.1);
//     }
//     .submit-btn:active { transform: translateY(0); }

//     /* ── description prose ── */
//     .desc-prose p  { margin-bottom:1.2em; }
//     .desc-prose h2,
//     .desc-prose h3 { color:#c7c9ff; font-family:'Cormorant Garamond',serif; font-weight:400; margin:1.6em 0 .6em; }
//     .desc-prose ul { list-style:none; padding:0; }
//     .desc-prose ul li {
//       padding-left:1.4em; position:relative; margin-bottom:.55em; color:rgba(255,255,255,.45);
//     }
//     .desc-prose ul li::before {
//       content:''; position:absolute; left:0; top:.55em;
//       width:6px; height:6px; border-radius:50%;
//       background:linear-gradient(135deg,#6366f1,#818cf8);
//     }

//     /* ── avg rating ring ── */
//     @keyframes ringIn { from{ stroke-dashoffset:220 } to{ stroke-dashoffset:var(--offset) } }
//     .ring-arc { animation: ringIn 1.1s cubic-bezier(.22,1,.36,1) forwards; }

//     /* ── bar fill ── */
//     @keyframes barFill { from{ width:0 } to{ width:var(--w) } }
//     .bar-fill { animation: barFill .9s cubic-bezier(.22,1,.36,1) forwards; }

//     /* ── badge pulse ── */
//     @keyframes bPulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
//     .verified-badge { animation: bPulse 2.5s infinite; }
//   `}</style>
// );

// /* ══════════════════════════════════════════════════════════════════
//    RATING RING
// ══════════════════════════════════════════════════════════════════ */
// const RatingRing = ({ avg, total }) => {
//   const circ = 220;
//   const offset = circ - (avg / 5) * circ;
//   return (
//     <div className="flex flex-col items-center justify-center gap-1" style={{ minWidth: 110 }}>
//       <div className="relative" style={{ width: 90, height: 90 }}>
//         <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
//           <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
//           <circle cx="45" cy="45" r="35" fill="none"
//             stroke="url(#rgrad)" strokeWidth="7" strokeLinecap="round"
//             strokeDasharray={circ}
//             className="ring-arc"
//             style={{ '--offset': offset, strokeDashoffset: offset }} />
//           <defs>
//             <linearGradient id="rgrad" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#6366f1" />
//               <stop offset="100%" stopColor="#a78bfa" />
//             </linearGradient>
//           </defs>
//         </svg>
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: 26, color:'#fff', lineHeight: 1 }}>{avg.toFixed(1)}</span>
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 9, color:'rgba(255,255,255,.3)', letterSpacing: 1 }}>/ 5.0</span>
//         </div>
//       </div>
//       <div className="flex gap-0.5">
//         {[...Array(5)].map((_,i) => (
//           <svg key={i} width="11" height="11" viewBox="0 0 24 24"
//             fill={i < Math.round(avg) ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//           </svg>
//         ))}
//       </div>
//       <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 10, color:'rgba(255,255,255,.3)' }}>
//         {total} {total === 1 ? 'review' : 'reviews'}
//       </span>
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    STAR BARS
// ══════════════════════════════════════════════════════════════════ */
// const StarBars = ({ reviews }) => {
//   const counts = [5,4,3,2,1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));
//   const max = Math.max(...counts.map(c => c.count), 1);
//   return (
//     <div className="flex flex-col gap-2 flex-1" style={{ minWidth: 180 }}>
//       {counts.map(({ star, count }) => (
//         <div key={star} className="flex items-center gap-2.5">
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 10, color:'rgba(255,255,255,.4)', width: 8, textAlign:'right' }}>{star}</span>
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//           </svg>
//           <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
//             <div className="bar-fill h-full rounded-full"
//               style={{ '--w': `${(count/max)*100}%`, width: `${(count/max)*100}%`,
//                 background: star >= 4 ? 'linear-gradient(90deg,#6366f1,#818cf8)' : star === 3 ? '#f59e0b' : '#f87171' }} />
//           </div>
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 10, color:'rgba(255,255,255,.25)', width: 14, textAlign:'right' }}>{count}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════ */
// const Product = () => {
//   const { productId } = useParams();
//   const {
//     products, currency, addToCart, submitReview, getProductReviews,
//     token, backendUrl, deleteReview, userId, wishlist,
//     toggleWishlistItem, getSingleProduct
//   } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData]     = useState(null);
//   const [image, setImage]                 = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [size, setSize]                   = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [showModal, setShowModal]         = useState(false);
//   const [isExpanded, setIsExpanded]       = useState(false);
//   const [activeTab, setActiveTab]         = useState('description');
//   const [makeMeasure, setMakeMeasure]     = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [drawerOpen, setDrawerOpen]       = useState(false);
//   const [displayPrice, setDisplayPrice]   = useState(0);
//   const [reviews, setReviews]             = useState([]);
//   const [rating, setRating]               = useState(5);
//   const [comment, setComment]             = useState('');
//   const [sizeStock, setSizeStock]         = useState(0);

//   const isWishlisted = Array.isArray(wishlist)
//     ? wishlist.some(item => item.productId === productId)
//     : false;

//   const fetchProductData = async () => {
//     const item = await getSingleProduct(productId);
//     if (item) {
//       setProductData(item);
//       setImage(item.image[0]);
//       setSelectedIndex(0);
//       setDisplayPrice(item.price);
//     }
//   };

//   const loadReviews = async () => {
//     const data = await getProductReviews(productId);
//     setReviews(data);
//   };

//   const handleSizeSelect = (sizeObj) => {
//     if (!sizeObj) return;
//     if (typeof sizeObj === 'string') {
//       setSize(sizeObj); setSizeStock(0); setDisplayPrice(productData?.price || 0);
//     } else if (typeof sizeObj === 'object' && sizeObj.size) {
//       setSize(sizeObj.size); setSizeStock(sizeObj.stock || 0);
//       if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) setDisplayPrice(sizeObj.customPrice);
//       else setDisplayPrice(productData.price * (sizeObj.priceMultiplier || 1));
//     }
//   };

//   const handleAddToCart = () => {
//     if (!size || !selectedColor) { toast.error('Please select a size and color.'); return; }
//     const customPrice = displayPrice - productData.price;
//     addToCart(productData._id, size, selectedColor, customPrice);
//     setIsButtonDisabled(true);
//     setTimeout(() => {
//       toast.success('Product added to cart!');
//       setIsButtonDisabled(false);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 2000);
//   };

//   const handleReviewSubmit = async () => {
//     if (!token) return toast.error('Please login first');
//     if (!rating || !comment.trim()) return toast.error('Please add rating and comment');
//     const success = await submitReview(productId, rating, comment);
//     if (success) { setComment(''); setRating(5); loadReviews(); }
//   };

//   useEffect(() => { fetchProductData(); }, [productId, products]);
//   useEffect(() => { if (productId) loadReviews(); }, [productId]);
//   useEffect(() => {
//     if (productData?.color?.length) {
//       const firstColor = productData.color[0];
//       setSelectedColor(typeof firstColor === 'string' ? firstColor : firstColor?.name || 'Unknown');
//     }
//   }, [productData]);

//   if (!productData) return <div className="opacity-0" />;

//   const avgRating    = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
//   const roundedRating = Math.round(avgRating);
//   const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction. Get your order delivered swiftly with tracking updates every step of the way. We use sustainable, recyclable materials to keep your delivery green and guilt-free. Products adhere to international quality benchmarks, ensuring top-tier performance. Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;
//   const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;
//   const customBreakdown = displayPrice > productData.price
//     ? ` (incl. +${currency}${(displayPrice - productData.price).toFixed(2)} for size/customization)`
//     : '';

//   return (
//     <div style={{ background: 'linear-gradient(180deg, #08080f 0%, #0b0b14 100%)' }} className="min-h-screen">
//       <ProductPageStyles />

//       {/* Top separator */}
//       <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">

//         {/* ══════════════════════════════════════════
//             PRODUCT MAIN
//         ══════════════════════════════════════════ */}
//         <div className="flex flex-col lg:flex-row gap-10">

//           {/* ── IMAGE GALLERY ── */}
//           <div className="lg:w-[45%] flex flex-col-reverse sm:flex-row gap-3 lg:sticky lg:top-24 self-start">
//             {/* Thumbnails */}
//             <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] sm:w-20 shrink-0">
//               {productData.image.map((img, index) => (
//                 <button key={index} onClick={() => { setImage(img); setSelectedIndex(index); }}
//                   className="shrink-0 w-16 h-16 sm:w-full sm:h-16 rounded-lg overflow-hidden transition-all duration-200"
//                   style={{ border: index === selectedIndex ? '2px solid #6366f1' : '2px solid rgba(255,255,255,0.06)', background: 'white' }}>
//                   <img src={img} alt="" className="w-full h-full object-contain p-1" />
//                 </button>
//               ))}
//             </div>

//             {/* Main image */}
//             <div className="flex-1 rounded-2xl overflow-hidden relative"
//               style={{ background: 'white', border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '3/4', maxHeight: '560px' }}>
//               <img src={image} alt={productData.name} className="w-full h-full object-contain p-4" />
//               <button onClick={() => toggleWishlistItem(productId)}
//                 className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
//                 style={{ background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(0,0,0,0.08)', border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)' }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : '#666'} strokeWidth="1.5" strokeLinecap="round">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* ── PRODUCT INFO ── */}
//           <div className="lg:w-[55%]">

//             {/* Breadcrumb */}
//             <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-3"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>
//               {productData.category} / {productData.subCategory}
//             </p>

//             {/* Name */}
//             <h1 className="text-white font-light mb-4"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(20px,3.5vw,20px)' }}>
//               {productData.name}
//             </h1>

//             {/* Stars */}
//             <div className="flex items-center gap-1.5 mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <svg key={i} width="14" height="14" viewBox="0 0 24 24"
//                   fill={i < roundedRating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                 </svg>
//               ))}
//               <span className="text-white/35 ml-1" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>
//                 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
//               </span>
//             </div>

//             {/* Price */}
//             <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//               {productData.discountPrice > 0 && productData.discountActive ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-white/40 line-through" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '22px' }}>{currency}{displayPrice.toFixed(2)}</span>
//                   <span className="text-green-400 font-medium" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//                   </span>
//                   <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
//                     style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 700 }}>
//                     {productData.discountPrice}% OFF
//                   </span>
//                 </div>
//               ) : (
//                 <div>
//                   <span className="text-white " style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{displayPrice.toFixed(2)}
//                   </span>
//                   {customBreakdown && <span className="text-white/35 ml-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{customBreakdown}</span>}
//                 </div>
//               )}
//             </div>

//             {/* Description */}
//             <p className="text-white/50 leading-relaxed mb-7"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', lineHeight: '1.8' }}>
//               {productData.description}
//             </p>

//             {/* Color */}
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Colour</p>
//                 <span className="text-white/70 capitalize" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{selectedColor}</span>
//               </div>
//               <div className="flex gap-2.5 flex-wrap">
//                 {productData.color && productData.color.length > 0 ? productData.color.map((colorObj, index) => {
//                   let colorName = typeof colorObj === 'string' ? colorObj : colorObj?.name || 'Unknown';
//                   let colorHex  = typeof colorObj === 'string' ? (colorMap[colorObj.toLowerCase()] || '#CCCCCC') : (colorObj.hex || colorMap[colorObj?.name?.toLowerCase()] || '#CCCCCC');
//                   const isSelected = selectedColor === colorName;
//                   return (
//                     <button key={index} onClick={() => setSelectedColor(colorName)} title={colorName}
//                       className="w-9 h-9 rounded-lg transition-all duration-200"
//                       style={{ backgroundColor: colorHex,
//                         border: isSelected ? '3px solid #6366f1' : '2px solid rgba(255,255,255,0.15)',
//                         boxShadow: isSelected ? '0 0 12px rgba(99,102,241,0.5)' : 'none',
//                         transform: isSelected ? 'scale(1.1)' : 'scale(1)' }} />
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No colors available</p>}
//               </div>
//             </div>

//             {/* Size */}
//             <div className="mb-7">
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Select Size</p>
//                 <button onClick={() => setShowModal(true)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                   style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline' }}>Size Guide</button>
//                 {showModal && <Modal onclose={() => setShowModal(false)} />}
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {productData.sizes && productData.sizes.length > 0 ? productData.sizes.map((sizeObj, index) => {
//                   const sizeLabel = sizeObj?.size || sizeObj;
//                   const stock     = sizeObj?.stock ?? 0;
//                   let sizePrice   = productData.price;
//                   if (typeof sizeObj === 'object') {
//                     if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) sizePrice = sizeObj.customPrice;
//                     else sizePrice = productData.price * (sizeObj.priceMultiplier || 1);
//                   }
//                   const isSelected = size === sizeLabel;
//                   return (
//                     <button key={index} type="button" onClick={() => handleSizeSelect(sizeObj)}
//                       className="flex flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200"
//                       style={{ border: isSelected ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
//                         background: isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
//                         transform: isSelected ? 'scale(1.05)' : 'scale(1)', minWidth: '60px' }}>
//                       <span className="text-white font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>{sizeLabel}</span>
//                       <span className="text-white/40" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>{currency}{sizePrice.toFixed(2)}</span>
//                     </button>
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No sizes available</p>}
//               </div>
//               {size && sizeStock <= 0 && <p className="text-red-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ This size is out of stock</p>}
//               {size && sizeStock > 0 && sizeStock < 5 && <p className="text-amber-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ Only {sizeStock} left in stock</p>}
//             </div>

//             {/* Made to Measure */}
//             <div className="mb-4">
//               <button onClick={() => setMakeMeasure(!makeMeasure)}
//                 className="w-full rounded-xl py-3 text-white/60 hover:text-white/90 transition-all duration-200 font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2px',
//                   border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
//                   <path d="M21 3H3v18h18V3z M7 7h.01 M7 12h.01 M7 17h.01 M11 7h6 M11 12h6 M11 17h6"/>
//                 </svg>
//                 Made to Measure
//               </button>
//               {makeMeasure && (
//                 <div className="mt-2 rounded-xl p-3 flex items-center gap-2"
//                   style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
//                   <FaInfoCircle className="text-indigo-400 shrink-0" size={14} />
//                   <p className="text-white/50" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>Measurements can be added on the Cart page</p>
//                 </div>
//               )}
//             </div>

//             {/* Add to Cart */}
//             <button onClick={() => { handleAddToCart(); setDrawerOpen(true); }}
//               disabled={isButtonDisabled || !size || !selectedColor}
//               className="w-full relative overflow-hidden rounded-xl text-white font-semibold uppercase tracking-widest py-4 mb-4 group"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '2.5px',
//                 background: isButtonDisabled ? '#4b4b6b' : '#6366f1',
//                 opacity: (!size || !selectedColor) ? 0.5 : 1,
//                 cursor: (!size || !selectedColor) ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
//               <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl"
//                 style={{ display: (!size || !selectedColor) ? 'none' : 'block' }} />
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 {isButtonDisabled ? (
//                   <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Adding…</>
//                 ) : (
//                   <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Add to Cart</>
//                 )}
//               </span>
//             </button>

//             <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={() => setDrawerOpen(!drawerOpen)} />
//             <JacketLiningSelector basePrice={displayPrice} onPriceChange={newPrice => setDisplayPrice(newPrice)} />

//             {/* Policy list */}
//             <div className="mt-6 space-y-2.5 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//               {[
//                 { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text: '100% original, premium materials' },
//                 { icon: 'M9 12l2 2 4-4', text: 'Secure cash on delivery + multiple payment methods' },
//                 { icon: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5', text: 'Simple 7-day return or exchange policy' },
//               ].map(({ icon, text }) => (
//                 <div key={text} className="flex items-center gap-2.5">
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round"><path d={icon}/></svg>
//                   <span className="text-white/35" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{text}</span>
//                 </div>
//               ))}
//               <p className="text-white/30 leading-relaxed" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', lineHeight: '1.8' }}>
//                 {shownContent}
//               </p>
//               <button onClick={() => setIsExpanded(p => !p)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline' }}>
//                 {isExpanded ? 'Read Less' : 'Read More'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ══════════════════════════════════════════
//             TABS: DESCRIPTION & REVIEWS
//         ══════════════════════════════════════════ */}
//         <div className="mt-20">

//           {/* Tab Bar */}
//           <div className="flex items-end gap-0 mb-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
//             {['description', 'reviews'].map(tab => (
//               <button key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`ptab-btn px-8 py-4 font-semibold uppercase tracking-widest transition-colors duration-200 ${activeTab === tab ? 'ptab-active' : ''}`}
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px',
//                   color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.28)' }}>
//                 {tab === 'reviews' ? `Reviews (${reviews.length})` : 'Description'}
//               </button>
//             ))}
//           </div>

//           {/* ─────────────────────────────────────
//               DESCRIPTION TAB
//           ───────────────────────────────────── */}
//           {activeTab === 'description' && (
//             <div className="pt-10 pb-4">
//               {/* Decorative header */}
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,rgba(99,102,241,.3),transparent)' }} />
//                 <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: 'rgba(99,102,241,.6)', letterSpacing: '4px', textTransform: 'uppercase' }}>
//                   Product Details
//                 </span>
//                 <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,.3))' }} />
//               </div>

//               {/* Two-col layout: prose + spec card */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Prose */}
//                 <div className="lg:col-span-2">
//                   <div className="desc-prose"
//                     style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 2, color: 'rgba(255,255,255,.45)' }}
//                     dangerouslySetInnerHTML={{ __html: productData.detailedDescription }} />
//                 </div>

//                 {/* Spec card */}
//                 {/* <div className="rounded-2xl p-6 self-start"
//                   style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}>
//                   <div className="flex items-center gap-2 mb-5">
//                     <div className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(180deg,#6366f1,#818cf8)' }} />
//                     <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(99,102,241,.8)', letterSpacing: '3px', textTransform: 'uppercase' }}>
//                       Specifications
//                     </span>
//                   </div>
//                   {[
//                     { label: 'Category',     value: productData.category },
//                     { label: 'Sub-Category', value: productData.subCategory },
//                     { label: 'Material',     value: 'Premium Leather' },
//                     { label: 'Care',         value: 'Dry clean only' },
//                     { label: 'Origin',       value: 'Handcrafted' },
//                   ].map(({ label, value }) => value && (
//                     <div key={label} className="flex flex-col gap-0.5 py-3"
//                       style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//                       <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</span>
//                       <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.65)' }}>{value}</span>
//                     </div>
//                   ))}
//                   <div className="flex flex-wrap gap-2 mt-5">
//                     {['Premium Quality', 'Handcrafted', 'Authentic Leather'].map(b => (
//                       <span key={b} className="rounded-full px-3 py-1"
//                         style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: '1.5px',
//                           color: 'rgba(99,102,241,.8)', background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.15)' }}>
//                         {b}
//                       </span>
//                     ))}
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           )}

//           {/* ─────────────────────────────────────
//               REVIEWS TAB
//           ───────────────────────────────────── */}
//           {activeTab === 'reviews' && (
//             <div className="pt-10 space-y-8">

//               {/* Overview row */}
//               {reviews.length > 0 && (
//                 <div className="rounded-2xl p-6 flex flex-wrap gap-8 items-center"
//                   style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
//                   <RatingRing avg={avgRating} total={reviews.length} />
//                   <div className="w-px self-stretch hidden sm:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
//                   <StarBars reviews={reviews} />
//                   <div className="w-px self-stretch hidden lg:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
//                   <div className="flex flex-col gap-2">
//                     <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>
//                       Top sentiments
//                     </span>
//                     {['Premium quality', 'Great fit', 'Fast delivery'].map(s => (
//                       <span key={s} className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
//                         style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10,
//                           color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
//                         <span style={{ color: '#6366f1', fontSize: 12 }}>✦</span> {s}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Write review form */}
//               {token ? (
//                 <div className="rounded-2xl overflow-hidden"
//                   style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.08)' }}>
//                   {/* Form header */}
//                   <div className="px-6 py-4 flex items-center gap-3"
//                     style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(99,102,241,0.04)' }}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round">
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                     </svg>
//                     <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#fff', fontWeight: 300 }}>
//                       Share Your Experience
//                     </span>
//                   </div>

//                   <div className="p-6 space-y-6">
//                     {/* Star picker */}
//                     <div>
//                       <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 12 }}>
//                         Your Rating
//                       </p>
//                       <div className="flex gap-3 flex-wrap">
//                         {[5,4,3,2,1].map(r => {
//                           const active = Number(rating) === r;
//                           return (
//                             <button key={r} type="button" onClick={() => setRating(r)}
//                               className="star-pick flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200"
//                               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12,
//                                 background: active ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)',
//                                 border: active ? '1px solid rgba(245,158,11,0.45)' : '1px solid rgba(255,255,255,0.08)',
//                                 color: active ? '#f59e0b' : 'rgba(255,255,255,.3)',
//                                 boxShadow: active ? '0 0 16px rgba(245,158,11,0.2)' : 'none' }}>
//                               <span style={{ fontSize: 14 }}>{'★'.repeat(r)}</span>
//                               <span style={{ fontSize: 11 }}>{r}.0</span>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>

//                     {/* Comment */}
//                     <div>
//                       <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10 }}>
//                         Your Review
//                       </p>
//                       <div className="relative">
//                         <textarea
//                           className="rev-textarea w-full rounded-xl text-white/70 placeholder-white/15 resize-none transition-all duration-200"
//                           value={comment} onChange={e => setComment(e.target.value)}
//                           placeholder="What did you love about this product? Quality, fit, style…"
//                           rows={4}
//                           style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 1.7,
//                             padding: '14px 16px',
//                             background: 'rgba(255,255,255,0.04)',
//                             border: '1px solid rgba(255,255,255,0.09)',
//                             outline: 'none',
//                             color: 'rgba(255,255,255,.65)' }}
//                         />
//                         <span className="absolute bottom-3 right-4"
//                           style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>
//                           {comment.length}/500
//                         </span>
//                       </div>
//                     </div>

//                     {/* Submit */}
//                     <div className="flex items-center gap-4">
//                       <button onClick={handleReviewSubmit}
//                         className="submit-btn rounded-xl text-white font-semibold uppercase tracking-widest px-8 py-3.5"
//                         style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px' }}>
//                         <span className="flex items-center gap-2">
//                           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                             <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
//                           </svg>
//                           Submit Review
//                         </span>
//                       </button>
//                       <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>
//                         Your review is public
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="rounded-2xl p-8 text-center"
//                   style={{ background: 'rgba(99,102,241,0.04)', border: '1px dashed rgba(99,102,241,0.2)' }}>
//                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,.5)" strokeWidth="1.2" strokeLinecap="round" className="mx-auto mb-3">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
//                   </svg>
//                   <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.35)' }}>
//                     Sign in to share your experience
//                   </p>
//                 </div>
//               )}

//               {/* Review list */}
//               {reviews.length === 0 ? (
//                 <div className="rounded-2xl p-12 text-center"
//                   style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}>
//                   <div className="text-4xl mb-3" style={{ opacity: .18 }}>✦</div>
//                   <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>
//                     No reviews yet
//                   </p>
//                   <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: 'rgba(255,255,255,.2)', marginTop: 6 }}>
//                     Be the first to share your thoughts
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//                     <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>
//                       {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
//                     </span>
//                     <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.2)', letterSpacing: '1px' }}>
//                       Most recent
//                     </span>
//                   </div>

//                   {reviews.map((rev, idx) => {
//                     const initial = (rev.user?.name || 'U')[0].toUpperCase();
//                     const colors  = ['#6366f1','#8b5cf6','#ec4899','#14b8a6','#f59e0b'];
//                     const col     = colors[idx % colors.length];
//                     return (
//                       <div key={rev._id} className="rev-card rounded-2xl p-5"
//                         style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
//                         <div className="flex items-start justify-between gap-4">
//                           {/* Avatar + meta */}
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
//                               style={{ background: `${col}22`, border: `1px solid ${col}44`,
//                                 fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: col }}>
//                               {initial}
//                             </div>
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>
//                                   {rev.user?.name || 'User'}
//                                 </p>
//                                 <span className="verified-badge rounded-full px-2 py-0.5 flex items-center gap-1"
//                                   style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,.25)' }}>
//                                   <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
//                                     <polyline points="20 6 9 17 4 12"/>
//                                   </svg>
//                                   <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: '#818cf8', letterSpacing: '1px' }}>Verified</span>
//                                 </span>
//                               </div>
//                               <div className="flex gap-0.5 mt-0.5">
//                                 {[...Array(5)].map((_,i) => (
//                                   <svg key={i} width="10" height="10" viewBox="0 0 24 24"
//                                     fill={i < rev.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                                   </svg>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Date + delete */}
//                           <div className="flex items-center gap-3 shrink-0">
//                             <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>
//                               {new Date(rev.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
//                             </span>
//                             {rev.user?._id === userId && (
//                               <button onClick={async () => { const ok = await deleteReview(rev._id); if (ok) loadReviews(); }}
//                                 className="flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all duration-150"
//                                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: '1px',
//                                   color: 'rgba(248,113,113,.6)', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.15)',
//                                   textTransform: 'uppercase' }}
//                                 onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; }}
//                                 onMouseLeave={e => { e.currentTarget.style.color = 'rgba(248,113,113,.6)'; e.currentTarget.style.background = 'rgba(248,113,113,0.07)'; }}>
//                                 <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                   <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6 M14 11v6"/>
//                                 </svg>
//                                 Delete
//                               </button>
//                             )}
//                           </div>
//                         </div>

//                         {/* Comment body */}
//                         <p className="mt-4 leading-relaxed"
//                           style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, lineHeight: 1.8,
//                             color: 'rgba(255,255,255,.45)', paddingLeft: 52 }}>
//                           {rev.comment}
//                         </p>

//                         {/* Helpful row */}
//                         <div className="flex items-center gap-3 mt-4" style={{ paddingLeft: 52 }}>
//                           <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>Helpful?</span>
//                           {['👍','👎'].map(e => (
//                             <button key={e} className="rounded-lg px-2.5 py-1 transition-colors"
//                               style={{ fontSize: 11, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
//                               onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
//                               onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
//                               {e}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Related Products */}
//         <div className="mt-20">
//           <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Product;





// import { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { FaInfoCircle } from 'react-icons/fa';
// import RelatedProducts from '../components/RelatedProducts';
// import Modal from '../components/Modal';
// import JacketLiningSelector from '../components/JacketLiningSelector';
// import { toast } from 'react-toastify';
// import CartDrawer from '../components/CartDrawer';

// const colorMap = {
//   wine:'#722F37', red:'#FF0000', black:'#000000', olive:'#808000', green:'#008000',
//   cognac:'#D2691E', white:'#FFFFFF', yellow:'#FFFF00', gray:'#808080', rose:'#FF007F',
//   tobacco:'#A0522D', navy:'#000080', beige:'#F5F5DC', blue:'#0000FF', brown:'#8B4513',
//   'dark-wine':'#453333', 'tobacco-dark':'#6e351a',
// };

// /* ══════════════════════════════════════════════════════════════════
//    STYLES
// ══════════════════════════════════════════════════════════════════ */
// const ProductPageStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

//     .ptab-btn { position:relative; overflow:hidden; }
//     .ptab-btn::after {
//       content:''; position:absolute; bottom:0; left:50%; right:50%;
//       height:2px; background:linear-gradient(90deg,#6366f1,#818cf8);
//       transition: left .35s ease, right .35s ease;
//       border-radius:99px;
//     }
//     .ptab-btn.ptab-active::after { left:0; right:0; }

//     .star-pick { transition: transform .15s, filter .15s; }
//     .star-pick:hover { transform:scale(1.05); filter:drop-shadow(0 0 6px #f59e0b88); }

//     .rev-card { transition: border-color .2s, box-shadow .2s, transform .2s; }
//     .rev-card:hover {
//       border-color: rgba(99,102,241,.25) !important;
//       box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 0 0 1px rgba(99,102,241,.08);
//       transform: translateY(-1px);
//     }

//     .rev-textarea:focus {
//       outline:none;
//       border-color: rgba(99,102,241,.55) !important;
//       box-shadow: 0 0 0 3px rgba(99,102,241,.12), 0 0 24px rgba(99,102,241,.08);
//     }

//     .submit-btn {
//       background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
//       transition: transform .2s, box-shadow .2s, filter .2s;
//     }
//     .submit-btn:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 12px 28px rgba(99,102,241,.45);
//       filter: brightness(1.1);
//     }
//     .submit-btn:active { transform: translateY(0); }

//     .desc-prose p  { margin-bottom:1.2em; }
//     .desc-prose h2,
//     .desc-prose h3 { color:#c7c9ff; font-family:'Cormorant Garamond',serif; font-weight:400; margin:1.6em 0 .6em; }
//     .desc-prose ul { list-style:none; padding:0; }
//     .desc-prose ul li {
//       padding-left:1.4em; position:relative; margin-bottom:.55em; color:rgba(255,255,255,.45);
//     }
//     .desc-prose ul li::before {
//       content:''; position:absolute; left:0; top:.55em;
//       width:6px; height:6px; border-radius:50%;
//       background:linear-gradient(135deg,#6366f1,#818cf8);
//     }

//     @keyframes ringIn { from{ stroke-dashoffset:220 } to{ stroke-dashoffset:var(--offset) } }
//     .ring-arc { animation: ringIn 1.1s cubic-bezier(.22,1,.36,1) forwards; }

//     @keyframes barFill { from{ width:0 } to{ width:var(--w) } }
//     .bar-fill { animation: barFill .9s cubic-bezier(.22,1,.36,1) forwards; }

//     @keyframes bPulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
//     .verified-badge { animation: bPulse 2.5s infinite; }
//   `}</style>
// );

// /* ══════════════════════════════════════════════════════════════════
//    RATING RING
// ══════════════════════════════════════════════════════════════════ */
// const RatingRing = ({ avg, total }) => {
//   const circ = 220;
//   const offset = circ - (avg / 5) * circ;
//   return (
//     <div className="flex flex-col items-center justify-center gap-1" style={{ minWidth: 110 }}>
//       <div className="relative" style={{ width: 90, height: 90 }}>
//         <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
//           <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
//           <circle cx="45" cy="45" r="35" fill="none"
//             stroke="url(#rgrad)" strokeWidth="7" strokeLinecap="round"
//             strokeDasharray={circ}
//             className="ring-arc"
//             style={{ '--offset': offset, strokeDashoffset: offset }} />
//           <defs>
//             <linearGradient id="rgrad" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#6366f1" />
//               <stop offset="100%" stopColor="#a78bfa" />
//             </linearGradient>
//           </defs>
//         </svg>
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: 26, color:'#fff', lineHeight: 1 }}>{avg.toFixed(1)}</span>
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 9, color:'rgba(255,255,255,.3)', letterSpacing: 1 }}>/ 5.0</span>
//         </div>
//       </div>
//       <div className="flex gap-0.5">
//         {[...Array(5)].map((_,i) => (
//           <svg key={i} width="11" height="11" viewBox="0 0 24 24"
//             fill={i < Math.round(avg) ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//           </svg>
//         ))}
//       </div>
//       <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 10, color:'rgba(255,255,255,.3)' }}>
//         {total} {total === 1 ? 'review' : 'reviews'}
//       </span>
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    STAR BARS
// ══════════════════════════════════════════════════════════════════ */
// const StarBars = ({ reviews }) => {
//   const counts = [5,4,3,2,1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));
//   const max = Math.max(...counts.map(c => c.count), 1);
//   return (
//     <div className="flex flex-col gap-2 flex-1" style={{ minWidth: 180 }}>
//       {counts.map(({ star, count }) => (
//         <div key={star} className="flex items-center gap-2.5">
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 10, color:'rgba(255,255,255,.4)', width: 8, textAlign:'right' }}>{star}</span>
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//           </svg>
//           <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
//             <div className="bar-fill h-full rounded-full"
//               style={{ '--w': `${(count/max)*100}%`, width: `${(count/max)*100}%`,
//                 background: star >= 4 ? 'linear-gradient(90deg,#6366f1,#818cf8)' : star === 3 ? '#f59e0b' : '#f87171' }} />
//           </div>
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 10, color:'rgba(255,255,255,.25)', width: 14, textAlign:'right' }}>{count}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════ */
// const Product = () => {
//   const { productId } = useParams();
//   const {
//     products, currency, addToCart, submitReview, getProductReviews,
//     token, backendUrl, deleteReview, userId, wishlist,
//     toggleWishlistItem, getSingleProduct
//   } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData]     = useState(null);
//   const [image, setImage]                 = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [size, setSize]                   = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [showModal, setShowModal]         = useState(false);
//   const [isExpanded, setIsExpanded]       = useState(false);
//   const [activeTab, setActiveTab]         = useState('description');
//   const [makeMeasure, setMakeMeasure]     = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [drawerOpen, setDrawerOpen]       = useState(false);
//   const [reviews, setReviews]             = useState([]);
//   const [rating, setRating]               = useState(5);
//   const [comment, setComment]             = useState('');
//   const [sizeStock, setSizeStock]         = useState(0);

//   // ─────────────────────────────────────────────────────────────────
//   // PRICE STATE — kept separate to avoid accumulation bugs
//   //
//   // basePrice   = product price based on size selection (from Shopify/DB)
//   // addonCost   = extra cost from JacketLiningSelector (lining + quilted)
//   // displayPrice = basePrice + addonCost  (shown to user in main price area)
//   //
//   // CRITICAL: never pass displayPrice into JacketLiningSelector as basePrice.
//   //           Always pass basePrice only. addonCost is tracked separately here.
//   // ─────────────────────────────────────────────────────────────────
//   const [basePrice, setBasePrice]   = useState(0);   // set by product load & size selection
//   const [addonCost, setAddonCost]   = useState(0);   // set by JacketLiningSelector

//   // Derived — pure computation, no state needed
//   const displayPrice = basePrice + addonCost;

//   const isWishlisted = Array.isArray(wishlist)
//     ? wishlist.some(item => item.productId === productId)
//     : false;

//   const fetchProductData = async () => {
//     const item = await getSingleProduct(productId);
//     if (item) {
//       setProductData(item);
//       setImage(item.image[0]);
//       setSelectedIndex(0);
//       setBasePrice(item.price);   // ← set basePrice, not displayPrice
//       setAddonCost(0);            // ← reset addons when product changes
//     }
//   };

//   const loadReviews = async () => {
//     const data = await getProductReviews(productId);
//     setReviews(data);
//   };

//   const handleSizeSelect = (sizeObj) => {
//     if (!sizeObj) return;
//     if (typeof sizeObj === 'string') {
//       setSize(sizeObj);
//       setSizeStock(0);
//       setBasePrice(productData?.price || 0);  // ← update basePrice only
//     } else if (typeof sizeObj === 'object' && sizeObj.size) {
//       setSize(sizeObj.size);
//       setSizeStock(sizeObj.stock || 0);
//       if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) {
//         setBasePrice(sizeObj.customPrice);
//       } else {
//         setBasePrice(productData.price * (sizeObj.priceMultiplier || 1));
//       }
//       // addonCost stays unchanged — user's lining selection is preserved
//     }
//   };

//   const handleAddToCart = () => {
//     if (!size || !selectedColor) { toast.error('Please select a size and color.'); return; }
//     // Pass only the addon cost as customPrice so cart math stays clean
//     addToCart(productData._id, size, selectedColor, addonCost);
//     setIsButtonDisabled(true);
//     setTimeout(() => {
//       toast.success('Product added to cart!');
//       setIsButtonDisabled(false);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 2000);
//   };

//   const handleReviewSubmit = async () => {
//     if (!token) return toast.error('Please login first');
//     if (!rating || !comment.trim()) return toast.error('Please add rating and comment');
//     const success = await submitReview(productId, rating, comment);
//     if (success) { setComment(''); setRating(5); loadReviews(); }
//   };

//   useEffect(() => { fetchProductData(); }, [productId, products]);
//   useEffect(() => { if (productId) loadReviews(); }, [productId]);
//   useEffect(() => {
//     if (productData?.color?.length) {
//       const firstColor = productData.color[0];
//       setSelectedColor(typeof firstColor === 'string' ? firstColor : firstColor?.name || 'Unknown');
//     }
//   }, [productData]);

//   if (!productData) return <div className="opacity-0" />;

//   const avgRating    = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
//   const roundedRating = Math.round(avgRating);
//   const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction. Get your order delivered swiftly with tracking updates every step of the way. We use sustainable, recyclable materials to keep your delivery green and guilt-free. Products adhere to international quality benchmarks, ensuring top-tier performance. Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;
//   const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;

//   // Breakdown text shown next to price (e.g. "incl. +$20.00 for size/customization")
//   const extraAboveBase = displayPrice - productData.price;
//   const customBreakdown = extraAboveBase > 0
//     ? ` (incl. +${currency}${extraAboveBase.toFixed(2)} for size/customization)`
//     : '';

//   return (
//     <div style={{ background: 'linear-gradient(180deg, #08080f 0%, #0b0b14 100%)' }} className="min-h-screen">
//       <ProductPageStyles />

//       <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">

//         {/* ══════════════════════════════════════════
//             PRODUCT MAIN
//         ══════════════════════════════════════════ */}
//         <div className="flex flex-col lg:flex-row gap-10">

//           {/* ── IMAGE GALLERY ── */}
//           <div className="lg:w-[45%] flex flex-col-reverse sm:flex-row gap-3 lg:sticky lg:top-24 self-start">
//             {/* <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] sm:w-20 shrink-0"> */}
//             <div className="flex sm:flex-col gap-2
//                 overflow-x-auto sm:overflow-y-auto
//                 sm:h-[500px]
//                 sm:w-20 shrink-0
//                 pr-1">
//               {productData.image.map((img, index) => (
//                 <button key={index} onClick={() => { setImage(img); setSelectedIndex(index); }}
//                   className="shrink-0 w-16 h-16 sm:w-full sm:h-16 rounded-lg overflow-hidden transition-all duration-200"
//                   style={{ border: index === selectedIndex ? '2px solid #6366f1' : '2px solid rgba(255,255,255,0.06)', background: 'white' }}>
//                   <img src={img} alt="" className="w-full h-full object-contain p-1" />
//                 </button>
//               ))}
//             </div>

//             <div className="flex-1 rounded-2xl overflow-hidden relative"
//               style={{ background: 'white', border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '3/4', maxHeight: '560px' }}>
//               <img src={image} alt={productData.name} className="w-full h-full object-contain p-4" />
//               <button onClick={() => toggleWishlistItem(productId)}
//                 className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
//                 style={{ background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(0,0,0,0.08)', border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)' }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : '#666'} strokeWidth="1.5" strokeLinecap="round">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* ── PRODUCT INFO ── */}
//           <div className="lg:w-[55%]">

//             <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-3"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>
//               {productData.category} / {productData.subCategory}
//             </p>

//             <h1 className="text-white font-light mb-4"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(20px,3.5vw,20px)' }}>
//               {productData.name}
//             </h1>

//             <div className="flex items-center gap-1.5 mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <svg key={i} width="14" height="14" viewBox="0 0 24 24"
//                   fill={i < roundedRating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                 </svg>
//               ))}
//               <span className="text-white/35 ml-1" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>
//                 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
//               </span>
//             </div>

//             {/* ── PRICE DISPLAY ── */}
//             {/* displayPrice = basePrice (size) + addonCost (lining customization) */}
//             <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//               {productData.discountPrice > 0 && productData.discountActive ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-white/40 line-through" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '22px' }}>{currency}{displayPrice.toFixed(2)}</span>
//                   <span className="text-green-400 font-medium" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//                   </span>
//                   <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
//                     style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 700 }}>
//                     {productData.discountPrice}% OFF
//                   </span>
//                 </div>
//               ) : (
//                 <div>
//                   <span className="text-white" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{displayPrice.toFixed(2)}
//                   </span>
//                   {customBreakdown && (
//                     <span className="text-white/35 ml-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>
//                       {customBreakdown}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             <p className="text-white/50 leading-relaxed mb-7"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', lineHeight: '1.8' }}>
//               {productData.description}
//             </p>

//             {/* Color */}
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Colour</p>
//                 <span className="text-white/70 capitalize" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{selectedColor}</span>
//               </div>
//               <div className="flex gap-2.5 flex-wrap">
//                 {productData.color && productData.color.length > 0 ? productData.color.map((colorObj, index) => {
//                   let colorName = typeof colorObj === 'string' ? colorObj : colorObj?.name || 'Unknown';
//                   let colorHex  = typeof colorObj === 'string' ? (colorMap[colorObj.toLowerCase()] || '#CCCCCC') : (colorObj.hex || colorMap[colorObj?.name?.toLowerCase()] || '#CCCCCC');
//                   const isSelected = selectedColor === colorName;
//                   return (
//                     <button key={index} onClick={() => setSelectedColor(colorName)} title={colorName}
//                       className="w-9 h-9 rounded-lg transition-all duration-200"
//                       style={{ backgroundColor: colorHex,
//                         border: isSelected ? '3px solid #6366f1' : '2px solid rgba(255,255,255,0.15)',
//                         boxShadow: isSelected ? '0 0 12px rgba(99,102,241,0.5)' : 'none',
//                         transform: isSelected ? 'scale(1.1)' : 'scale(1)' }} />
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No colors available</p>}
//               </div>
//             </div>

//             {/* Size */}
//             <div className="mb-7">
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Select Size</p>
//                 <button onClick={() => setShowModal(true)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                   style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline' }}>Size Guide</button>
//                 {showModal && <Modal onclose={() => setShowModal(false)} />}
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {productData.sizes && productData.sizes.length > 0 ? productData.sizes.map((sizeObj, index) => {
//                   const sizeLabel = sizeObj?.size || sizeObj;
//                   const stock     = sizeObj?.stock ?? 0;
//                   let sizePrice   = productData.price;
//                   if (typeof sizeObj === 'object') {
//                     if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) sizePrice = sizeObj.customPrice;
//                     else sizePrice = productData.price * (sizeObj.priceMultiplier || 1);
//                   }
//                   const isSelected = size === sizeLabel;
//                   return (
//                     <button key={index} type="button" onClick={() => handleSizeSelect(sizeObj)}
//                       className="flex flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200"
//                       style={{ border: isSelected ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
//                         background: isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
//                         transform: isSelected ? 'scale(1.05)' : 'scale(1)', minWidth: '60px' }}>
//                       <span className="text-white font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>{sizeLabel}</span>
//                       <span className="text-white/40" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>{currency}{sizePrice.toFixed(2)}</span>
//                     </button>
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No sizes available</p>}
//               </div>
//               {size && sizeStock <= 0 && <p className="text-red-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ This size is out of stock</p>}
//               {size && sizeStock > 0 && sizeStock < 5 && <p className="text-amber-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ Only {sizeStock} left in stock</p>}
//             </div>

//             {/* Made to Measure */}
//             <div className="mb-4">
//               <button onClick={() => setMakeMeasure(!makeMeasure)}
//                 className="w-full rounded-xl py-3 text-white/60 hover:text-white/90 transition-all duration-200 font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2px',
//                   border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
//                   <path d="M21 3H3v18h18V3z M7 7h.01 M7 12h.01 M7 17h.01 M11 7h6 M11 12h6 M11 17h6"/>
//                 </svg>
//                 Made to Measure
//               </button>
//               {makeMeasure && (
//                 <div className="mt-2 rounded-xl p-3 flex items-center gap-2"
//                   style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
//                   <FaInfoCircle className="text-indigo-400 shrink-0" size={14} />
//                   <p className="text-white/50" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>Measurements can be added on the Cart page</p>
//                 </div>
//               )}
//             </div>

//             {/* Add to Cart */}
//             <button onClick={() => { handleAddToCart(); setDrawerOpen(true); }}
//               disabled={isButtonDisabled || !size || !selectedColor}
//               className="w-full relative overflow-hidden rounded-xl text-white font-semibold uppercase tracking-widest py-4 mb-4 group"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '2.5px',
//                 background: isButtonDisabled ? '#4b4b6b' : '#6366f1',
//                 opacity: (!size || !selectedColor) ? 0.5 : 1,
//                 cursor: (!size || !selectedColor) ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
//               <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl"
//                 style={{ display: (!size || !selectedColor) ? 'none' : 'block' }} />
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 {isButtonDisabled ? (
//                   <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Adding…</>
//                 ) : (
//                   <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Add to Cart</>
//                 )}
//               </span>
//             </button>

//             <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={() => setDrawerOpen(!drawerOpen)} />

//             {/*
//               ── JACKET LINING SELECTOR ──
//               CRITICAL FIX:
//               - Pass `basePrice` (NOT `displayPrice`) so the selector always
//                 shows the correct size-based base price
//               - `onPriceChange` receives ONLY the addon cost from the selector
//                 and stores it in `addonCost` state — it does NOT update `basePrice`
//               - This means: selecting a lining sets addonCost=$20
//                 then selecting another lining REPLACES addonCost=$20 → $40
//                 instead of stacking $20 + $20 + $20 ...
//             */}
//             <JacketLiningSelector
//               basePrice={basePrice}
//               onPriceChange={(newAddonCost) => setAddonCost(newAddonCost)}
//             />

//             {/* Policy list */}
//             <div className="mt-6 space-y-2.5 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//               {[
//                 { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text: '100% original, premium materials' },
//                 { icon: 'M9 12l2 2 4-4', text: 'Secure cash on delivery + multiple payment methods' },
//                 { icon: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5', text: 'Simple 7-day return or exchange policy' },
//               ].map(({ icon, text }) => (
//                 <div key={text} className="flex items-center gap-2.5">
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round"><path d={icon}/></svg>
//                   <span className="text-white/35" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{text}</span>
//                 </div>
//               ))}
//               <p className="text-white/30 leading-relaxed" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', lineHeight: '1.8' }}>
//                 {shownContent}
//               </p>
//               <button onClick={() => setIsExpanded(p => !p)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline' }}>
//                 {isExpanded ? 'Read Less' : 'Read More'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ══════════════════════════════════════════
//             TABS
//         ══════════════════════════════════════════ */}
//         <div className="mt-20">
//           <div className="flex items-end gap-0 mb-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
//             {['description', 'reviews'].map(tab => (
//               <button key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`ptab-btn px-8 py-4 font-semibold uppercase tracking-widest transition-colors duration-200 ${activeTab === tab ? 'ptab-active' : ''}`}
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px',
//                   color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.28)' }}>
//                 {tab === 'reviews' ? `Reviews (${reviews.length})` : 'Description'}
//               </button>
//             ))}
//           </div>

//           {activeTab === 'description' && (
//             <div className="pt-10 pb-4">
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,rgba(99,102,241,.3),transparent)' }} />
//                 <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: 'rgba(99,102,241,.6)', letterSpacing: '4px', textTransform: 'uppercase' }}>
//                   Product Details
//                 </span>
//                 <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,.3))' }} />
//               </div>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2">
//                   <div className="desc-prose"
//                     style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 2, color: 'rgba(255,255,255,.45)' }}
//                     dangerouslySetInnerHTML={{ __html: productData.detailedDescription }} />
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'reviews' && (
//             <div className="pt-10 space-y-8">
//               {reviews.length > 0 && (
//                 <div className="rounded-2xl p-6 flex flex-wrap gap-8 items-center"
//                   style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
//                   <RatingRing avg={avgRating} total={reviews.length} />
//                   <div className="w-px self-stretch hidden sm:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
//                   <StarBars reviews={reviews} />
//                   <div className="w-px self-stretch hidden lg:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
//                   <div className="flex flex-col gap-2">
//                     <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>
//                       Top sentiments
//                     </span>
//                     {['Premium quality', 'Great fit', 'Fast delivery'].map(s => (
//                       <span key={s} className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
//                         style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10,
//                           color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
//                         <span style={{ color: '#6366f1', fontSize: 12 }}>✦</span> {s}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {token ? (
//                 <div className="rounded-2xl overflow-hidden"
//                   style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.08)' }}>
//                   <div className="px-6 py-4 flex items-center gap-3"
//                     style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(99,102,241,0.04)' }}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round">
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                     </svg>
//                     <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#fff', fontWeight: 300 }}>
//                       Share Your Experience
//                     </span>
//                   </div>
//                   <div className="p-6 space-y-6">
//                     <div>
//                       <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 12 }}>
//                         Your Rating
//                       </p>
//                       <div className="flex gap-3 flex-wrap">
//                         {[5,4,3,2,1].map(r => {
//                           const active = Number(rating) === r;
//                           return (
//                             <button key={r} type="button" onClick={() => setRating(r)}
//                               className="star-pick flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200"
//                               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12,
//                                 background: active ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)',
//                                 border: active ? '1px solid rgba(245,158,11,0.45)' : '1px solid rgba(255,255,255,0.08)',
//                                 color: active ? '#f59e0b' : 'rgba(255,255,255,.3)',
//                                 boxShadow: active ? '0 0 16px rgba(245,158,11,0.2)' : 'none' }}>
//                               <span style={{ fontSize: 14 }}>{'★'.repeat(r)}</span>
//                               <span style={{ fontSize: 11 }}>{r}.0</span>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                     <div>
//                       <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10 }}>
//                         Your Review
//                       </p>
//                       <div className="relative">
//                         <textarea
//                           className="rev-textarea w-full rounded-xl text-white/70 placeholder-white/15 resize-none transition-all duration-200"
//                           value={comment} onChange={e => setComment(e.target.value)}
//                           placeholder="What did you love about this product? Quality, fit, style…"
//                           rows={4}
//                           style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 1.7,
//                             padding: '14px 16px', background: 'rgba(255,255,255,0.04)',
//                             border: '1px solid rgba(255,255,255,0.09)', outline: 'none',
//                             color: 'rgba(255,255,255,.65)' }} />
//                         <span className="absolute bottom-3 right-4"
//                           style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>
//                           {comment.length}/500
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <button onClick={handleReviewSubmit}
//                         className="submit-btn rounded-xl text-white font-semibold uppercase tracking-widest px-8 py-3.5"
//                         style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px' }}>
//                         <span className="flex items-center gap-2">
//                           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                             <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
//                           </svg>
//                           Submit Review
//                         </span>
//                       </button>
//                       <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>
//                         Your review is public
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="rounded-2xl p-8 text-center"
//                   style={{ background: 'rgba(99,102,241,0.04)', border: '1px dashed rgba(99,102,241,0.2)' }}>
//                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,.5)" strokeWidth="1.2" strokeLinecap="round" className="mx-auto mb-3">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
//                   </svg>
//                   <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.35)' }}>
//                     Sign in to share your experience
//                   </p>
//                 </div>
//               )}

//               {reviews.length === 0 ? (
//                 <div className="rounded-2xl p-12 text-center"
//                   style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}>
//                   <div className="text-4xl mb-3" style={{ opacity: .18 }}>✦</div>
//                   <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>No reviews yet</p>
//                   <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: 'rgba(255,255,255,.2)', marginTop: 6 }}>Be the first to share your thoughts</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
//                     <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>
//                       {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
//                     </span>
//                     <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.2)', letterSpacing: '1px' }}>Most recent</span>
//                   </div>
//                   {reviews.map((rev, idx) => {
//                     const initial = (rev.user?.name || 'U')[0].toUpperCase();
//                     const colors  = ['#6366f1','#8b5cf6','#ec4899','#14b8a6','#f59e0b'];
//                     const col     = colors[idx % colors.length];
//                     return (
//                       <div key={rev._id} className="rev-card rounded-2xl p-5"
//                         style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
//                         <div className="flex items-start justify-between gap-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
//                               style={{ background: `${col}22`, border: `1px solid ${col}44`,
//                                 fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: col }}>
//                               {initial}
//                             </div>
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>
//                                   {rev.user?.name || 'User'}
//                                 </p>
//                                 <span className="verified-badge rounded-full px-2 py-0.5 flex items-center gap-1"
//                                   style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,.25)' }}>
//                                   <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
//                                     <polyline points="20 6 9 17 4 12"/>
//                                   </svg>
//                                   <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: '#818cf8', letterSpacing: '1px' }}>Verified</span>
//                                 </span>
//                               </div>
//                               <div className="flex gap-0.5 mt-0.5">
//                                 {[...Array(5)].map((_,i) => (
//                                   <svg key={i} width="10" height="10" viewBox="0 0 24 24"
//                                     fill={i < rev.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
//                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                                   </svg>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-3 shrink-0">
//                             <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>
//                               {new Date(rev.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
//                             </span>
//                             {rev.user?._id === userId && (
//                               <button onClick={async () => { const ok = await deleteReview(rev._id); if (ok) loadReviews(); }}
//                                 className="flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all duration-150"
//                                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: '1px',
//                                   color: 'rgba(248,113,113,.6)', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.15)',
//                                   textTransform: 'uppercase' }}
//                                 onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; }}
//                                 onMouseLeave={e => { e.currentTarget.style.color = 'rgba(248,113,113,.6)'; e.currentTarget.style.background = 'rgba(248,113,113,0.07)'; }}>
//                                 <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                   <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6 M14 11v6"/>
//                                 </svg>
//                                 Delete
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                         <p className="mt-4 leading-relaxed"
//                           style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, lineHeight: 1.8,
//                             color: 'rgba(255,255,255,.45)', paddingLeft: 52 }}>
//                           {rev.comment}
//                         </p>
//                         <div className="flex items-center gap-3 mt-4" style={{ paddingLeft: 52 }}>
//                           <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.2)' }}>Helpful?</span>
//                           {['👍','👎'].map(e => (
//                             <button key={e} className="rounded-lg px-2.5 py-1 transition-colors"
//                               style={{ fontSize: 11, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
//                               onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
//                               onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
//                               {e}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="mt-20">
//           <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Product;










// import { useContext, useEffect, useRef, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { FaInfoCircle } from 'react-icons/fa';
// import RelatedProducts from '../components/RelatedProducts';
// import Modal from '../components/Modal';
// import JacketLiningSelector from '../components/JacketLiningSelector';
// import { toast } from 'react-toastify';
// import CartDrawer from '../components/CartDrawer';

// const colorMap = {
//   wine:'#722F37', red:'#FF0000', black:'#000000', olive:'#808000', green:'#008000',
//   cognac:'#D2691E', white:'#FFFFFF', yellow:'#FFFF00', gray:'#808080', rose:'#FF007F',
//   tobacco:'#A0522D', navy:'#000080', beige:'#F5F5DC', blue:'#0000FF', brown:'#8B4513',
//   'dark-wine':'#453333', 'tobacco-dark':'#6e351a',
//   'royal blue':'#4169e1', 'royal-blue':'#4169e1',
// };

// /* ══════════════════════════════════════════════════════════════════
//    STYLES
// ══════════════════════════════════════════════════════════════════ */
// const ProductPageStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

//     /* hide native scrollbar on thumb container */
//     .thumb-inner-v {
//       overflow-y: auto;
//       overflow-x: hidden;
//       scrollbar-width: none;
//       -ms-overflow-style: none;
//     }
//     .thumb-inner-v::-webkit-scrollbar { display: none; }

//     /* mobile horizontal scroll — NO overflow-x:hidden */
//     .thumb-inner-h {
//       overflow-x: auto;
//       overflow-y: hidden;
//       scrollbar-width: none;
//       -ms-overflow-style: none;
//     }
//     .thumb-inner-h::-webkit-scrollbar { display: none; }

//     /* Amazon-style arrow button */
//     .thumb-arrow {
//       width: 72px; height: 24px;
//       display: flex; align-items: center; justify-content: center;
//       background: transparent;
//       border: 1px solid #d5d9d9;
//       border-radius: 6px;
//       cursor: pointer;
//       transition: background .12s, border-color .12s;
//       flex-shrink: 0;
//       outline: none;
//     }
//     .thumb-arrow:hover:not(:disabled) {
//       background: #f7f8f8;
//       border-color: #adb1b8;
//     }
//     .thumb-arrow:disabled { opacity: 0.28; cursor: default; pointer-events: none; }

//     /* mobile horizontal strip */
//     .thumb-mobile {
//       display: flex; gap: 8px;
//       overflow-x: auto; overflow-y: hidden;
//       scrollbar-width: none; -ms-overflow-style: none;
//       padding-bottom: 2px;
//     }
//     .thumb-mobile::-webkit-scrollbar { display: none; }

//     .ptab-btn { position:relative; overflow:hidden; }
//     .ptab-btn::after {
//       content:''; position:absolute; bottom:0; left:50%; right:50%;
//       height:2px; background:linear-gradient(90deg,#6366f1,#818cf8);
//       transition: left .35s ease, right .35s ease; border-radius:99px;
//     }
//     .ptab-btn.ptab-active::after { left:0; right:0; }

//     .star-pick { transition: transform .15s, filter .15s; }
//     .star-pick:hover { transform:scale(1.05); filter:drop-shadow(0 0 6px #f59e0b88); }

//     .rev-card { transition: border-color .2s, box-shadow .2s, transform .2s; }
//     .rev-card:hover {
//       border-color: rgba(99,102,241,.25) !important;
//       box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 0 0 1px rgba(99,102,241,.08);
//       transform: translateY(-1px);
//     }
//     .rev-textarea:focus {
//       outline:none; border-color: rgba(99,102,241,.55) !important;
//       box-shadow: 0 0 0 3px rgba(99,102,241,.12), 0 0 24px rgba(99,102,241,.08);
//     }
//     .submit-btn {
//       background: linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);
//       transition: transform .2s, box-shadow .2s, filter .2s;
//     }
//     .submit-btn:hover { transform:translateY(-2px); box-shadow:0 12px 28px rgba(99,102,241,.45); filter:brightness(1.1); }
//     .submit-btn:active { transform:translateY(0); }

//     .desc-prose p { margin-bottom:1.2em; }
//     .desc-prose h2,.desc-prose h3 { color:#c7c9ff; font-family:'Cormorant Garamond',serif; font-weight:400; margin:1.6em 0 .6em; }
//     .desc-prose ul { list-style:none; padding:0; }
//     .desc-prose ul li { padding-left:1.4em; position:relative; margin-bottom:.55em; color:rgba(255,255,255,.45); }
//     .desc-prose ul li::before { content:''; position:absolute; left:0; top:.55em; width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,#6366f1,#818cf8); }

//     @keyframes ringIn { from{stroke-dashoffset:220} to{stroke-dashoffset:var(--offset)} }
//     .ring-arc { animation: ringIn 1.1s cubic-bezier(.22,1,.36,1) forwards; }
//     @keyframes barFill { from{width:0} to{width:var(--w)} }
//     .bar-fill { animation: barFill .9s cubic-bezier(.22,1,.36,1) forwards; }
//     @keyframes bPulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
//     .verified-badge { animation: bPulse 2.5s infinite; }

//     .main-img { transition: transform .5s cubic-bezier(.22,1,.36,1); }
//     .main-img-wrap:hover .main-img { transform: scale(1.04); }
//     .size-btn:hover:not([disabled]) { border-color:rgba(99,102,241,.55) !important; background:rgba(99,102,241,.08) !important; }
//   `}</style>
// );

// /* ══════════════════════════════════════════════════════════════════
//    AMAZON-STYLE VERTICAL THUMBNAIL RAIL
// ══════════════════════════════════════════════════════════════════ */
// const ThumbRail = ({ images, selectedIndex, onSelect }) => {
//   const scrollRef  = useRef(null);
//   const [canUp,   setCanUp]   = useState(false);
//   const [canDown, setCanDown] = useState(false);

//   const THUMB_H   = 74;
//   const THUMB_GAP = 8;
//   const STEP      = (THUMB_H + THUMB_GAP) * 2;

//   const sync = () => {
//     const el = scrollRef.current;
//     if (!el) return;
//     setCanUp(el.scrollTop > 1);
//     setCanDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
//   };

//   useEffect(() => {
//     sync();
//     const el = scrollRef.current;
//     if (!el) return;
//     el.addEventListener('scroll', sync, { passive: true });
//     return () => el.removeEventListener('scroll', sync);
//   }, [images]);

//   return (
//     <div className="flex flex-col items-center gap-1.5" style={{ width: 72, flexShrink: 0 }}>
//       {/* UP */}
//       <button className="thumb-arrow" disabled={!canUp} onClick={() => scrollRef.current?.scrollBy({ top: -STEP, behavior: 'smooth' })}>
//         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round">
//           <polyline points="18 15 12 9 6 15"/>
//         </svg>
//       </button>

//       {/* SCROLLABLE LIST */}
//       <div ref={scrollRef} className="thumb-inner-v" style={{ width: '100%', maxHeight: 400 }}>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: THUMB_GAP, padding: '2px 0' }}>
//           {images.map((img, i) => (
//             <button
//               key={i}
//               onClick={() => onSelect(img, i)}
//               style={{
//                 width: '100%', height: THUMB_H, flexShrink: 0,
//                 borderRadius: 8, overflow: 'hidden', background: '#ffffff',
//                 border: i === selectedIndex
//                   ? '2px solid #6366f1'
//                   : '1px solid #d5d9d9',
//                 boxShadow: 'none',
//                 transform: 'none',
//                 outline: 'none',
//                 transition: 'border-color .15s',
//                 cursor: 'pointer',
//               }}
//             >
//               <img src={img} alt={`view-${i}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 5, display: 'block' }} />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* DOWN */}
//       <button className="thumb-arrow" disabled={!canDown} onClick={() => scrollRef.current?.scrollBy({ top: STEP, behavior: 'smooth' })}>
//         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round">
//           <polyline points="6 9 12 15 18 9"/>
//         </svg>
//       </button>
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    AMAZON-STYLE MOBILE HORIZONTAL THUMBNAIL RAIL (left/right arrows)
// ══════════════════════════════════════════════════════════════════ */
// const MobileThumbRail = ({ images, selectedIndex, onSelect }) => {
//   const scrollRef = useRef(null);
//   const [canLeft,  setCanLeft]  = useState(false);
//   const [canRight, setCanRight] = useState(false);

//   const THUMB_W   = 60;
//   const THUMB_GAP = 8;
//   const STEP      = (THUMB_W + THUMB_GAP) * 2;

//   const sync = () => {
//     const el = scrollRef.current;
//     if (!el) return;
//     setCanLeft(el.scrollLeft > 1);
//     setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
//   };

//   useEffect(() => {
//     sync();
//     const el = scrollRef.current;
//     if (!el) return;
//     el.addEventListener('scroll', sync, { passive: true });
//     return () => el.removeEventListener('scroll', sync);
//   }, [images]);

//   return (
//     <div style={{ display:'flex', flexDirection:'row', alignItems:'center', gap:4, width:'100%', minWidth:0 }}>
//       {/* LEFT arrow */}
//       <button
//         className="thumb-arrow"
//         disabled={!canLeft}
//         onClick={() => scrollRef.current?.scrollBy({ left: -STEP, behavior: 'smooth' })}
//         style={{ width:24, height:60, flexShrink:0 }}
//       >
//         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round">
//           <polyline points="15 18 9 12 15 6"/>
//         </svg>
//       </button>

//       {/* Scrollable strip */}
//       <div
//         ref={scrollRef}
//         className="thumb-inner-h"
//         style={{ flex:1, minWidth:0 }}
//         onScroll={sync}
//       >
//         <div style={{ display:'flex', flexDirection:'row', gap:THUMB_GAP, padding:'2px 0' }}>
//           {images.map((img, i) => (
//             <button
//               key={i}
//               onClick={() => onSelect(img, i)}
//               style={{
//                 flexShrink: 0,
//                 width: THUMB_W, height: THUMB_W,
//                 borderRadius: 8, overflow: 'hidden',
//                 background: '#ffffff',
//                 border: i === selectedIndex ? '2px solid #6366f1' : '1px solid #d5d9d9',
//                 boxShadow: 'none', outline: 'none',
//                 transition: 'border-color .15s',
//                 cursor: 'pointer',
//               }}
//             >
//               <img src={img} alt={`m-${i}`} style={{ width:'100%', height:'100%', objectFit:'contain', padding:4, display:'block' }}/>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT arrow */}
//       <button
//         className="thumb-arrow"
//         disabled={!canRight}
//         onClick={() => scrollRef.current?.scrollBy({ left: STEP, behavior: 'smooth' })}
//         style={{ width:24, height:60, flexShrink:0 }}
//       >
//         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round">
//           <polyline points="9 18 15 12 9 6"/>
//         </svg>
//       </button>
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    RATING RING
// ══════════════════════════════════════════════════════════════════ */
// const RatingRing = ({ avg, total }) => {
//   const circ = 220, offset = circ - (avg / 5) * circ;
//   return (
//     <div className="flex flex-col items-center justify-center gap-1" style={{ minWidth: 110 }}>
//       <div className="relative" style={{ width: 90, height: 90 }}>
//         <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
//           <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7"/>
//           <circle cx="45" cy="45" r="35" fill="none" stroke="url(#rgrad)" strokeWidth="7" strokeLinecap="round"
//             strokeDasharray={circ} className="ring-arc" style={{ '--offset': offset, strokeDashoffset: offset }}/>
//           <defs>
//             <linearGradient id="rgrad" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#a78bfa"/>
//             </linearGradient>
//           </defs>
//         </svg>
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:'#fff', lineHeight:1 }}>{avg.toFixed(1)}</span>
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,.3)', letterSpacing:1 }}>/ 5.0</span>
//         </div>
//       </div>
//       <div className="flex gap-0.5">
//         {[...Array(5)].map((_,i)=>(
//           <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i<Math.round(avg)?'#f59e0b':'none'} stroke="#f59e0b" strokeWidth="1.5">
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//           </svg>
//         ))}
//       </div>
//       <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.3)' }}>
//         {total} {total===1?'review':'reviews'}
//       </span>
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    STAR BARS
// ══════════════════════════════════════════════════════════════════ */
// const StarBars = ({ reviews }) => {
//   const counts = [5,4,3,2,1].map(s=>({ star:s, count:reviews.filter(r=>r.rating===s).length }));
//   const max = Math.max(...counts.map(c=>c.count), 1);
//   return (
//     <div className="flex flex-col gap-2 flex-1" style={{ minWidth:180 }}>
//       {counts.map(({star,count})=>(
//         <div key={star} className="flex items-center gap-2.5">
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.4)', width:8, textAlign:'right' }}>{star}</span>
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
//             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//           </svg>
//           <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
//             <div className="bar-fill h-full rounded-full"
//               style={{ '--w':`${(count/max)*100}%`, width:`${(count/max)*100}%`,
//                 background: star>=4?'linear-gradient(90deg,#6366f1,#818cf8)':star===3?'#f59e0b':'#f87171' }}/>
//           </div>
//           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.25)', width:14, textAlign:'right' }}>{count}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ══════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════ */
// const Product = () => {
//   const { productId } = useParams();
//   const {
//     products, currency, addToCart, submitReview, getProductReviews,
//     token, backendUrl, deleteReview, userId, wishlist,
//     toggleWishlistItem, getSingleProduct
//   } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData]       = useState(null);
//   const [image, setImage]                   = useState('');
//   const [selectedIndex, setSelectedIndex]   = useState(0);
//   const [size, setSize]                     = useState('');
//   const [selectedColor, setSelectedColor]   = useState('');
//   const [showModal, setShowModal]           = useState(false);
//   const [isExpanded, setIsExpanded]         = useState(false);
//   const [activeTab, setActiveTab]           = useState('description');
//   const [makeMeasure, setMakeMeasure]       = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [drawerOpen, setDrawerOpen]         = useState(false);
//   const [reviews, setReviews]               = useState([]);
//   const [rating, setRating]                 = useState(5);
//   const [comment, setComment]               = useState('');
//   const [sizeStock, setSizeStock]           = useState(0);
//   const [basePrice, setBasePrice]           = useState(0);
//   const [addonCost, setAddonCost]           = useState(0);

//   const displayPrice = basePrice + addonCost;
//   const isWishlisted = Array.isArray(wishlist) ? wishlist.some(w => w.productId === productId) : false;

//   const fetchProductData = async () => {
//     const item = await getSingleProduct(productId);
//     if (item) {
//       setProductData(item);
//       setImage(item.image[0]);
//       setSelectedIndex(0);
//       setBasePrice(item.price);
//       setAddonCost(0);
//     }
//   };

//   const loadReviews = async () => {
//     const data = await getProductReviews(productId);
//     setReviews(data);
//   };

//   const handleSizeSelect = (sizeObj) => {
//     if (!sizeObj) return;
//     if (typeof sizeObj === 'string') {
//       setSize(sizeObj); setSizeStock(0); setBasePrice(productData?.price || 0);
//     } else if (sizeObj.size) {
//       setSize(sizeObj.size); setSizeStock(sizeObj.stock || 0);
//       setBasePrice(sizeObj.useCustomPrice && sizeObj.customPrice > 0
//         ? sizeObj.customPrice
//         : productData.price * (sizeObj.priceMultiplier || 1));
//     }
//   };

//   const handleAddToCart = () => {
//     if (!size || !selectedColor) { toast.error('Please select a size and color.'); return; }
//     addToCart(productData._id, size, selectedColor, addonCost);
//     setIsButtonDisabled(true);
//     setTimeout(() => { toast.success('Product added to cart!'); setIsButtonDisabled(false); window.scrollTo({ top:0, behavior:'smooth' }); }, 2000);
//   };

//   const handleReviewSubmit = async () => {
//     if (!token) return toast.error('Please login first');
//     if (!rating || !comment.trim()) return toast.error('Please add rating and comment');
//     const ok = await submitReview(productId, rating, comment);
//     if (ok) { setComment(''); setRating(5); loadReviews(); }
//   };

//   useEffect(() => { fetchProductData(); }, [productId, products]);
//   useEffect(() => { if (productId) loadReviews(); }, [productId]);
//   useEffect(() => {
//     if (productData?.color?.length) {
//       const c = productData.color[0];
//       setSelectedColor(typeof c === 'string' ? c : c?.name || 'Unknown');
//     }
//   }, [productData]);

//   if (!productData) return <div className="opacity-0"/>;

//   const avgRating    = reviews.length > 0 ? reviews.reduce((s,r) => s+r.rating, 0) / reviews.length : 0;
//   const roundedRating = Math.round(avgRating);
//   const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction. Get your order delivered swiftly with tracking updates every step of the way. We use sustainable, recyclable materials to keep your delivery green and guilt-free. Products adhere to international quality benchmarks, ensuring top-tier performance. Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;
//   const shownContent = isExpanded ? content : `${content.substring(0,250)}...`;
//   const extraAboveBase  = displayPrice - productData.price;
//   const customBreakdown = extraAboveBase > 0 ? ` (incl. +${currency}${extraAboveBase.toFixed(2)} for size/customization)` : '';

//   return (
//     <div style={{ background:'linear-gradient(180deg,#08080f 0%,#0b0b14 100%)' }} className="min-h-screen">
//       <ProductPageStyles/>

//       <div className="h-px w-full" style={{ background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)' }}/>

//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">

//         {/* ══ PRODUCT MAIN ══ */}
//         <div className="flex flex-col lg:flex-row lg:items-start gap-6">

//           {/* ── IMAGE GALLERY ── */}
//           {/* FIX: added maxWidth:'100%' and overflow:'hidden' to prevent any child overflow */}
//           <div className="lg:w-[35%] lg:sticky lg:top-24 self-start" style={{ overflow:'hidden', maxWidth:'100%', width:'100%' }}>

//             {/* DESKTOP: vertical thumb rail + main image */}
//             <div className="hidden sm:flex flex-row gap-3" style={{ alignItems:'flex-start' }}>

//               <ThumbRail
//                 images={productData.image}
//                 selectedIndex={selectedIndex}
//                 onSelect={(img, idx) => { setImage(img); setSelectedIndex(idx); }}
//               />

//               {/* MAIN IMAGE — always visible */}
//               <div
//                 // className="main-img-wrap flex-1 rounded-2xl overflow-hidden relative"
//                 className="main-img-wrap rounded-2xl overflow-hidden relative"
//                 style={{ background:'#fff', border:'1px solid rgba(255,255,255,0.06)', width: 400, height: 480, borderRadius: 16 }}
//               >
//                 <img
//                   src={image}
//                   alt={productData.name}
//                   className="main-img"
//                   style={{ width:'100%', height:'100%', objectFit:'contain', padding:16, display:'block' }}
//                 />
//                 <button
//                   onClick={() => toggleWishlistItem(productId)}
//                   className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
//                   style={{ background: isWishlisted?'rgba(239,68,68,0.15)':'rgba(255,255,255,0.85)',
//                     border: isWishlisted?'1px solid rgba(239,68,68,0.4)':'1px solid rgba(0,0,0,0.1)',
//                     backdropFilter:'blur(4px)', boxShadow:'0 2px 8px rgba(0,0,0,0.15)', transition:'all .2s' }}
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24"
//                     fill={isWishlisted?'#ef4444':'none'} stroke={isWishlisted?'#ef4444':'#888'}
//                     strokeWidth="1.5" strokeLinecap="round">
//                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                   </svg>
//                 </button>
//                 <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-1"
//                   style={{ background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)', border:'1px solid rgba(255,255,255,0.1)' }}>
//                   <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,0.7)' }}>
//                     {selectedIndex+1} / {productData.image.length}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* MOBILE: main image + horizontal arrow-scroll strip */}
//             {/* FIX: removed fixed height, use aspectRatio + maxHeight in vw units so it never overflows */}
//             <div className="flex sm:hidden flex-col gap-3" style={{ width:'100%', maxWidth:'100%' }}>

//               {/* Main image */}
//               <div
//                 className="rounded-2xl overflow-hidden relative"
//                 style={{
//                   background: '#fff',
//                   border: '1px solid rgba(255,255,255,0.06)',
//                   width: '100%',
//                   aspectRatio: '1 / 1',    /* square keeps it contained */
//                   maxHeight: '80vw',
//                 }}
//               >
//                 <img
//                   src={image}
//                   alt={productData.name}
//                   style={{ width:'100%', height:'100%', objectFit:'contain', padding:12, display:'block' }}
//                 />
//                 <button
//                   onClick={() => toggleWishlistItem(productId)}
//                   className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
//                   style={{
//                     background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.85)',
//                     border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)',
//                   }}
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24"
//                     fill={isWishlisted?'#ef4444':'none'} stroke={isWishlisted?'#ef4444':'#888'} strokeWidth="1.5" strokeLinecap="round">
//                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                   </svg>
//                 </button>
//                 {/* image counter */}
//                 <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-1"
//                   style={{ background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)', border:'1px solid rgba(255,255,255,0.1)' }}>
//                   <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,0.7)' }}>
//                     {selectedIndex+1} / {productData.image.length}
//                   </span>
//                 </div>
//               </div>

//               {/* FIX: thumbnail strip wrapped in overflow:hidden container so arrows stay inside */}
//               <div style={{ width:'100%', maxWidth:'100%', overflow:'hidden' }}>
//                 <MobileThumbRail
//                   images={productData.image}
//                   selectedIndex={selectedIndex}
//                   onSelect={(img, i) => { setImage(img); setSelectedIndex(i); }}
//                 />
//               </div>

//             </div>
//           </div>

//           {/* ── PRODUCT INFO ── */}
//           <div className="lg:w-[65%]" style={{maxWidth:'100%', width:'100%' }}>

//             <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-3"
//               style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'9px', letterSpacing:'3px' }}>
//               {productData.category} / {productData.subCategory}
//             </p>

//                {/* Name */}
//             <h1 className="text-white font-light mb-4"
//               style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(20px,3.5vw,20px)' }}>
//               {productData.name}
//             </h1>

//             <div className="flex items-center gap-1.5 mb-2">
//               {[...Array(5)].map((_,i)=>(
//                 <svg key={i} width="14" height="14" viewBox="0 0 24 24"
//                   fill={i<roundedRating?'#f59e0b':'none'} stroke="#f59e0b" strokeWidth="1.5">
//                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                 </svg>
//               ))}
//               <span className="text-white/35 ml-1" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>
//                 ({reviews.length} {reviews.length===1?'review':'reviews'})
//               </span>
//             </div>

//             {/* PRICE */}
//              <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//               {productData.discountPrice > 0 && productData.discountActive ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-white/40 line-through" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '22px' }}>{currency}{displayPrice.toFixed(2)}</span>
//                   <span className="text-green-400 font-medium" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//                   </span>
//                   <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
//                     style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 700 }}>
//                     {productData.discountPrice}% OFF
//                   </span>
//                 </div>
//               ) : (
//                 <div>
//                   <span className="text-white " style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
//                     {currency}{displayPrice.toFixed(2)}
//                   </span>
//                   {customBreakdown && <span className="text-white/35 ml-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{customBreakdown}</span>}
//                 </div>
//               )}
//             </div>

//             <p className="text-white/50 leading-relaxed mb-7"
//               style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'13px', lineHeight:'1.8' }}>
//               {productData.description}
//             </p>

//             {/* COLOR */}
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'9px', letterSpacing:'2px' }}>Colour</p>
//                 <span className="text-white/70 capitalize" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>— {selectedColor}</span>
//               </div>
//               <div className="flex gap-2.5 flex-wrap">
//                 {productData.color?.length > 0 ? productData.color.map((c,i) => {
//                   const n = typeof c==='string'?c:c?.name||'Unknown';
//                   const h = typeof c==='string'?(colorMap[c.toLowerCase()]||'#CCCCCC'):(c.hex||colorMap[c?.name?.toLowerCase()]||'#CCCCCC');
//                   const sel = selectedColor===n;
//                   return (
//                     <button key={i} onClick={()=>setSelectedColor(n)} title={n}
//                       className="w-9 h-9 rounded-lg transition-all duration-200"
//                       style={{ backgroundColor:h,
//                         border: sel?'3px solid #6366f1':'2px solid rgba(255,255,255,0.15)',
//                         boxShadow: sel?'0 0 0 3px rgba(99,102,241,0.25)':'none',
//                         transform: sel?'scale(1.1)':'scale(1)' }}/>
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'12px' }}>No colors available</p>}
//               </div>
//             </div>

//             {/* SIZE */}
//             <div className="mb-7">
//               <div className="flex items-center justify-between mb-3">
//                 <p className="text-white/40 font-semibold uppercase tracking-widest" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'9px', letterSpacing:'2px' }}>Select Size</p>
//                 <button onClick={()=>setShowModal(true)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                   style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px', textDecoration:'underline' }}>Size Guide</button>
//                 {showModal && <Modal onclose={()=>setShowModal(false)}/>}
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {productData.sizes?.length > 0 ? productData.sizes.map((s,i) => {
//                   const lbl = s?.size||s;
//                   let sp = productData.price;
//                   if (typeof s==='object') sp = (s.useCustomPrice&&s.customPrice>0) ? s.customPrice : productData.price*(s.priceMultiplier||1);
//                   const sel = size===lbl;
//                   const oos = typeof s==='object' && s.stock===0;
//                   return (
//                     <button key={i} type="button" onClick={()=>handleSizeSelect(s)}
//                       className="size-btn flex flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200"
//                       style={{ border: sel?'2px solid #6366f1':'1px solid rgba(255,255,255,0.1)',
//                         background: sel?'rgba(99,102,241,0.15)':'rgba(255,255,255,0.03)',
//                         transform: sel?'scale(1.05)':'scale(1)', minWidth:'60px',
//                         opacity: oos?0.4:1, boxShadow: sel?'0 0 0 3px rgba(99,102,241,0.18)':'none' }}>
//                       <span className="text-white font-semibold" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'12px' }}>{lbl}</span>
//                       <span className="text-white/40" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'10px' }}>{currency}{sp.toFixed(2)}</span>
//                     </button>
//                   );
//                 }) : <p className="text-white/30" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'12px' }}>No sizes available</p>}
//               </div>
//               {size && sizeStock<=0 && <p className="text-red-400 mt-2" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>⚠️ This size is out of stock</p>}
//               {size && sizeStock>0 && sizeStock<5 && <p className="text-amber-400 mt-2" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>⚠️ Only {sizeStock} left in stock</p>}
//             </div>

//             {/* MADE TO MEASURE */}
//             <div className="mb-4">
//               <button onClick={()=>setMakeMeasure(!makeMeasure)}
//                 className="w-full rounded-xl py-3 transition-all duration-200 font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
//                 style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'10px', letterSpacing:'2px',
//                   color: makeMeasure?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.55)',
//                   border: makeMeasure?'1px solid rgba(99,102,241,0.35)':'1px solid rgba(255,255,255,0.1)',
//                   background: makeMeasure?'rgba(99,102,241,0.08)':'rgba(255,255,255,0.02)' }}>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
//                   <path d="M21 3H3v18h18V3z M7 7h.01 M7 12h.01 M7 17h.01 M11 7h6 M11 12h6 M11 17h6"/>
//                 </svg>
//                 Made to Measure
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
//                   style={{ transform: makeMeasure?'rotate(180deg)':'none', transition:'transform .2s' }}>
//                   <polyline points="6 9 12 15 18 9"/>
//                 </svg>
//               </button>
//               {makeMeasure && (
//                 <div className="mt-2 rounded-xl p-3 flex items-center gap-2"
//                   style={{ background:'rgba(99,102,241,0.06)', border:'1px solid rgba(99,102,241,0.15)' }}>
//                   <FaInfoCircle className="text-indigo-400 shrink-0" size={14}/>
//                   <p className="text-white/50" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>Measurements can be added on the Cart page</p>
//                 </div>
//               )}
//             </div>

//             {/* ADD TO CART */}
//             <button onClick={()=>{ handleAddToCart(); setDrawerOpen(true); }}
//               disabled={isButtonDisabled||!size||!selectedColor}
//               className="w-full relative overflow-hidden rounded-xl text-white font-semibold uppercase tracking-widest py-4 mb-4 group"
//               style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px', letterSpacing:'2.5px',
//                 background: isButtonDisabled?'#4b4b6b':'linear-gradient(135deg,#6366f1,#4f46e5)',
//                 opacity: (!size||!selectedColor)?0.5:1,
//                 cursor: (!size||!selectedColor)?'not-allowed':'pointer', transition:'all 0.2s',
//                 boxShadow: (!size||!selectedColor||isButtonDisabled)?'none':'0 8px 24px rgba(99,102,241,0.35)' }}>
//               <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl"
//                 style={{ display:(!size||!selectedColor)?'none':'block' }}/>
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 {isButtonDisabled ? (
//                   <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Adding…</>
//                 ) : (
//                   <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Add to Cart</>
//                 )}
//               </span>
//             </button>

//             <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={()=>setDrawerOpen(!drawerOpen)}/>

//             <JacketLiningSelector basePrice={basePrice} onPriceChange={(c)=>setAddonCost(c)}/>

//             {/* POLICY */}
//             <div className="mt-6 space-y-2.5 pb-6" style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
//               {[
//                 { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text:'100% original, premium materials' },
//                 { icon:'M9 12l2 2 4-4', text:'Secure cash on delivery + multiple payment methods' },
//                 { icon:'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5', text:'Simple 7-day return or exchange policy' },
//               ].map(({icon,text})=>(
//                 <div key={text} className="flex items-center gap-2.5">
//                   <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
//                     style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.2)' }}>
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.8)" strokeWidth="1.5" strokeLinecap="round">
//                       <path d={icon}/>
//                     </svg>
//                   </div>
//                   <span className="text-white/35" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>{text}</span>
//                 </div>
//               ))}
//               <p className="text-white/30 leading-relaxed" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px', lineHeight:'1.8' }}>
//                 {shownContent}
//               </p>
//               <button onClick={()=>setIsExpanded(p=>!p)} className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                 style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px', textDecoration:'underline' }}>
//                 {isExpanded?'Read Less':'Read More'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ══ TABS ══ */}
//         <div className="mt-20">
//           <div className="flex items-end gap-0 mb-0" style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
//             {['description','reviews'].map(tab=>(
//               <button key={tab} onClick={()=>setActiveTab(tab)}
//                 className={`ptab-btn px-8 py-4 font-semibold uppercase tracking-widest transition-colors duration-200 ${activeTab===tab?'ptab-active':''}`}
//                 style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:'2.5px',
//                   color: activeTab===tab?'#fff':'rgba(255,255,255,0.28)' }}>
//                 {tab==='reviews'?`Reviews (${reviews.length})`:'Description'}
//               </button>
//             ))}
//           </div>

//           {activeTab==='description' && (
//             <div className="pt-10 pb-4">
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="h-px flex-1" style={{ background:'linear-gradient(90deg,rgba(99,102,241,.3),transparent)' }}/>
//                 <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:'rgba(99,102,241,.6)', letterSpacing:'4px', textTransform:'uppercase' }}>Product Details</span>
//                 <div className="h-px flex-1" style={{ background:'linear-gradient(90deg,transparent,rgba(99,102,241,.3))' }}/>
//               </div>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2">
//                   <div className="desc-prose" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:13, lineHeight:2, color:'rgba(255,255,255,.45)' }}
//                     dangerouslySetInnerHTML={{ __html:productData.detailedDescription }}/>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab==='reviews' && (
//             <div className="pt-10 space-y-8">
//               {reviews.length>0 && (
//                 <div className="rounded-2xl p-6 flex flex-wrap gap-8 items-center"
//                   style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)' }}>
//                   <RatingRing avg={avgRating} total={reviews.length}/>
//                   <div className="w-px self-stretch hidden sm:block" style={{ background:'rgba(255,255,255,0.07)' }}/>
//                   <StarBars reviews={reviews}/>
//                   <div className="w-px self-stretch hidden lg:block" style={{ background:'rgba(255,255,255,0.07)' }}/>
//                   <div className="flex flex-col gap-2">
//                     <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,.25)', letterSpacing:'2px', textTransform:'uppercase' }}>Top sentiments</span>
//                     {['Premium quality','Great fit','Fast delivery'].map(s=>(
//                       <span key={s} className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
//                         style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.5)', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
//                         <span style={{ color:'#6366f1', fontSize:12 }}>✦</span> {s}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {token ? (
//                 <div className="rounded-2xl overflow-hidden" style={{ background:'rgba(255,255,255,0.015)', border:'1px solid rgba(255,255,255,0.08)' }}>
//                   <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(99,102,241,0.04)' }}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round">
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                     </svg>
//                     <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:'#fff', fontWeight:300 }}>Share Your Experience</span>
//                   </div>
//                   <div className="p-6 space-y-6">
//                     <div>
//                       <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,.25)', letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:12 }}>Your Rating</p>
//                       <div className="flex gap-3 flex-wrap">
//                         {[5,4,3,2,1].map(r=>{
//                           const active=Number(rating)===r;
//                           return (
//                             <button key={r} type="button" onClick={()=>setRating(r)}
//                               className="star-pick flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200"
//                               style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12,
//                                 background: active?'rgba(245,158,11,0.1)':'rgba(255,255,255,0.03)',
//                                 border: active?'1px solid rgba(245,158,11,0.45)':'1px solid rgba(255,255,255,0.08)',
//                                 color: active?'#f59e0b':'rgba(255,255,255,.3)',
//                                 boxShadow: active?'0 0 16px rgba(245,158,11,0.2)':'none' }}>
//                               <span style={{ fontSize:14 }}>{'★'.repeat(r)}</span>
//                               <span style={{ fontSize:11 }}>{r}.0</span>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                     <div>
//                       <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,.25)', letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:10 }}>Your Review</p>
//                       <div className="relative">
//                         <textarea className="rev-textarea w-full rounded-xl resize-none transition-all duration-200"
//                           value={comment} onChange={e=>setComment(e.target.value)}
//                           placeholder="What did you love about this product? Quality, fit, style…" rows={4}
//                           style={{ fontFamily:"'Montserrat',sans-serif", fontSize:13, lineHeight:1.7,
//                             padding:'14px 16px', background:'rgba(255,255,255,0.04)',
//                             border:'1px solid rgba(255,255,255,0.09)', outline:'none', color:'rgba(255,255,255,.65)' }}/>
//                         <span className="absolute bottom-3 right-4" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.2)' }}>
//                           {comment.length}/500
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <button onClick={handleReviewSubmit} className="submit-btn rounded-xl text-white font-semibold uppercase tracking-widest px-8 py-3.5"
//                         style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:'2.5px' }}>
//                         <span className="flex items-center gap-2">
//                           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                             <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
//                           </svg>
//                           Submit Review
//                         </span>
//                       </button>
//                       <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.2)' }}>Your review is public</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="rounded-2xl p-8 text-center" style={{ background:'rgba(99,102,241,0.04)', border:'1px dashed rgba(99,102,241,0.2)' }}>
//                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,.5)" strokeWidth="1.2" strokeLinecap="round" className="mx-auto mb-3">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
//                   </svg>
//                   <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, color:'rgba(255,255,255,.35)' }}>Sign in to share your experience</p>
//                 </div>
//               )}

//               {reviews.length===0 ? (
//                 <div className="rounded-2xl p-12 text-center" style={{ background:'rgba(255,255,255,0.015)', border:'1px solid rgba(255,255,255,0.06)' }}>
//                   <div className="text-4xl mb-3" style={{ opacity:.18 }}>✦</div>
//                   <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'rgba(255,255,255,.3)', fontWeight:300 }}>No reviews yet</p>
//                   <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, color:'rgba(255,255,255,.2)', marginTop:6 }}>Be the first to share your thoughts</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between pb-2" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
//                     <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,.25)', letterSpacing:'2px', textTransform:'uppercase' }}>
//                       {reviews.length} {reviews.length===1?'Review':'Reviews'}
//                     </span>
//                     <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, color:'rgba(255,255,255,.2)', letterSpacing:'1px' }}>Most recent</span>
//                   </div>
//                   {reviews.map((rev,idx)=>{
//                     const init=(rev.user?.name||'U')[0].toUpperCase();
//                     const cols=['#6366f1','#8b5cf6','#ec4899','#14b8a6','#f59e0b'];
//                     const col=cols[idx%cols.length];
//                     return (
//                       <div key={rev._id} className="rev-card rounded-2xl p-5"
//                         style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
//                         <div className="flex items-start justify-between gap-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
//                               style={{ background:`${col}22`, border:`1px solid ${col}44`, fontFamily:"'Montserrat',sans-serif", fontSize:13, color:col }}>
//                               {init}
//                             </div>
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, color:'rgba(255,255,255,.75)', fontWeight:600 }}>
//                                   {rev.user?.name||'User'}
//                                 </p>
//                                 <span className="verified-badge rounded-full px-2 py-0.5 flex items-center gap-1"
//                                   style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,.25)' }}>
//                                   <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
//                                     <polyline points="20 6 9 17 4 12"/>
//                                   </svg>
//                                   <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:8, color:'#818cf8', letterSpacing:'1px' }}>Verified</span>
//                                 </span>
//                               </div>
//                               <div className="flex gap-0.5 mt-0.5">
//                                 {[...Array(5)].map((_,i)=>(
//                                   <svg key={i} width="10" height="10" viewBox="0 0 24 24"
//                                     fill={i<rev.rating?'#f59e0b':'none'} stroke="#f59e0b" strokeWidth="1.5">
//                                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
//                                   </svg>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-3 shrink-0">
//                             <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.2)' }}>
//                               {new Date(rev.createdAt).toLocaleDateString('en-US',{ day:'numeric', month:'short', year:'numeric' })}
//                             </span>
//                             {rev.user?._id===userId && (
//                               <button onClick={async()=>{ const ok=await deleteReview(rev._id); if(ok)loadReviews(); }}
//                                 className="flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all duration-150"
//                                 style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:'1px',
//                                   color:'rgba(248,113,113,.6)', background:'rgba(248,113,113,0.07)', border:'1px solid rgba(248,113,113,0.15)', textTransform:'uppercase' }}
//                                 onMouseEnter={e=>{e.currentTarget.style.color='#f87171';e.currentTarget.style.background='rgba(248,113,113,0.12)';}}
//                                 onMouseLeave={e=>{e.currentTarget.style.color='rgba(248,113,113,.6)';e.currentTarget.style.background='rgba(248,113,113,0.07)';}}>
//                                 <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                                   <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6 M14 11v6"/>
//                                 </svg>
//                                 Delete
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                         <p className="mt-4 leading-relaxed"
//                           style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, lineHeight:1.8, color:'rgba(255,255,255,.45)', paddingLeft:52 }}>
//                           {rev.comment}
//                         </p>
//                         <div className="flex items-center gap-3 mt-4" style={{ paddingLeft:52 }}>
//                           <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:'rgba(255,255,255,.2)' }}>Helpful?</span>
//                           {['👍','👎'].map(e=>(
//                             <button key={e} className="rounded-lg px-2.5 py-1 transition-colors"
//                               style={{ fontSize:11, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}
//                               onMouseEnter={ev=>{ev.currentTarget.style.background='rgba(255,255,255,0.07)';}}
//                               onMouseLeave={ev=>{ev.currentTarget.style.background='rgba(255,255,255,0.03)';}}>
//                               {e}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="mt-20">
//           <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Product;








import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { FaInfoCircle } from 'react-icons/fa';
import RelatedProducts from '../components/RelatedProducts';
import Modal from '../components/Modal';
import JacketLiningSelector from '../components/JacketLiningSelector';
import { toast } from 'react-toastify';
import CartDrawer from '../components/CartDrawer';
import axios from 'axios';

const colorMap = {
  wine: '#722F37', red: '#FF0000', black: '#000000', olive: '#808000', green: '#008000',
  cognac: '#D2691E', white: '#FFFFFF', yellow: '#FFFF00', gray: '#808080', rose: '#FF007F',
  tobacco: '#A0522D', navy: '#000080', beige: '#F5F5DC', blue: '#0000FF', brown: '#8B4513',
  'dark-wine': '#453333', 'tobacco-dark': '#6e351a',
  'royal blue': '#4169e1', 'royal-blue': '#4169e1',
};

/* ══════════════════════════════════════════════════════════════════
   STYLES — original indigo/black colors, layout fixes only
══════════════════════════════════════════════════════════════════ */
const ProductPageStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    .thumb-inner-v {
      overflow-y: auto; overflow-x: hidden;
      scrollbar-width: none; -ms-overflow-style: none;
    }
    .thumb-inner-v::-webkit-scrollbar { display: none; }

    .thumb-inner-h {
      overflow-x: auto; overflow-y: hidden;
      scrollbar-width: none; -ms-overflow-style: none;
    }
    .thumb-inner-h::-webkit-scrollbar { display: none; }

    .thumb-arrow {
      width: 72px; height: 24px;
      display: flex; align-items: center; justify-content: center;
      background: transparent;
      border: 1px solid rgba(99,102,241,0.35);
      border-radius: 6px; cursor: pointer;
      transition: background .12s, border-color .12s;
      flex-shrink: 0; outline: none;
    }
    .thumb-arrow:hover:not(:disabled) {
      background: rgba(99,102,241,0.1);
      border-color: rgba(99,102,241,0.6);
    }
    .thumb-arrow:disabled { opacity: 0.28; cursor: default; pointer-events: none; }

    .ptab-btn { position: relative; overflow: hidden; }
    .ptab-btn::after {
      content: ''; position: absolute; bottom: 0; left: 50%; right: 50%;
      height: 2px; background: linear-gradient(90deg,#6366f1,#818cf8);
      transition: left .35s ease, right .35s ease; border-radius: 99px;
    }
    .ptab-btn.ptab-active::after { left: 0; right: 0; }

    .star-pick { transition: transform .15s, filter .15s; }
    .star-pick:hover { transform: scale(1.05); filter: drop-shadow(0 0 6px #f59e0b88); }

    .rev-card { transition: border-color .2s, box-shadow .2s, transform .2s; }
    .rev-card:hover {
      border-color: rgba(99,102,241,.25) !important;
      box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 0 0 1px rgba(99,102,241,.08);
      transform: translateY(-1px);
    }
    .rev-textarea:focus {
      outline: none; border-color: rgba(99,102,241,.55) !important;
      box-shadow: 0 0 0 3px rgba(99,102,241,.12), 0 0 24px rgba(99,102,241,.08);
    }
    .submit-btn {
      background: linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);
      transition: transform .2s, box-shadow .2s, filter .2s;
    }
    .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(99,102,241,.45); filter: brightness(1.1); }
    .submit-btn:active { transform: translateY(0); }

    .desc-prose p { margin-bottom: 1.2em; }
    .desc-prose h2,.desc-prose h3 { color: #c7c9ff; font-family: 'Cormorant Garamond',serif; font-weight: 400; margin: 1.6em 0 .6em; }
    .desc-prose ul { list-style: none; padding: 0; }
    .desc-prose ul li { padding-left: 1.4em; position: relative; margin-bottom: .55em; color: rgba(255,255,255,.70); }
    .desc-prose ul li::before { content: ''; position: absolute; left: 0; top: .55em; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#818cf8); }

    @keyframes ringIn { from{stroke-dashoffset:220} to{stroke-dashoffset:var(--offset)} }
    .ring-arc { animation: ringIn 1.1s cubic-bezier(.22,1,.36,1) forwards; }
    @keyframes barFill { from{width:0} to{width:var(--w)} }
    .bar-fill { animation: barFill .9s cubic-bezier(.22,1,.36,1) forwards; }
    @keyframes bPulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
    .verified-badge { animation: bPulse 2.5s infinite; }

    .main-img { transition: transform .5s cubic-bezier(.22,1,.36,1); }
    .main-img-wrap:hover .main-img { transform: scale(1.04); }
    .size-btn:hover:not([disabled]) { border-color: rgba(99,102,241,.55) !important; background: rgba(99,102,241,.08) !important; }

    /* color swatch hover */
    .color-swatch { transition: transform .15s, box-shadow .15s; }
    .color-swatch:hover { transform: scale(1.12); }

    /* mobile overflow guard */
    @media (max-width: 640px) {
      .product-gallery-wrap { overflow: hidden; width: 100%; max-width: 100%; }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════════════
   VERTICAL THUMBNAIL RAIL (desktop)
══════════════════════════════════════════════════════════════════ */
const ThumbRail = ({ images, selectedIndex, onSelect }) => {
  const scrollRef = useRef(null);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);

  const THUMB_H = 60;
  const THUMB_GAP = 6;
  const STEP = (THUMB_H + THUMB_GAP) * 2;

  const sync = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanUp(el.scrollTop > 1);
    setCanDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  };

  useEffect(() => {
    sync();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    return () => el.removeEventListener('scroll', sync);
  }, [images]);

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ width: 60, flexShrink: 0 }}>
      <button className="thumb-arrow" disabled={!canUp}
        onClick={() => scrollRef.current?.scrollBy({ top: -STEP, behavior: 'smooth' })}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <div ref={scrollRef} className="thumb-inner-v" style={{ width: '100%', maxHeight: 420 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: THUMB_GAP, padding: '2px 0' }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => onSelect(img, i)}
              style={{
                width: '100%', height: THUMB_H, flexShrink: 0,
                borderRadius: 8, overflow: 'hidden', background: '#ffffff',
                border: i === selectedIndex ? '2px solid #6366f1' : '1px solid rgba(99,102,241,0.25)',
                outline: 'none', cursor: 'pointer',
                transition: 'border-color .15s, opacity .15s',
                opacity: i === selectedIndex ? 1 : 0.6,
              }}>
              <img src={img} alt={`view-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 5, display: 'block' }} />
            </button>
          ))}
        </div>
      </div>

      <button className="thumb-arrow" disabled={!canDown}
        onClick={() => scrollRef.current?.scrollBy({ top: STEP, behavior: 'smooth' })}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MOBILE HORIZONTAL THUMBNAIL RAIL
══════════════════════════════════════════════════════════════════ */
const MobileThumbRail = ({ images, selectedIndex, onSelect }) => {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const THUMB_W = 60;
  const THUMB_GAP = 8;
  const STEP = (THUMB_W + THUMB_GAP) * 2;

  const sync = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    sync();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    return () => el.removeEventListener('scroll', sync);
  }, [images]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%', minWidth: 0 }}>
      <button className="thumb-arrow" disabled={!canLeft}
        onClick={() => scrollRef.current?.scrollBy({ left: -STEP, behavior: 'smooth' })}
        style={{ width: 24, height: 60, flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div ref={scrollRef} className="thumb-inner-h" style={{ flex: 1, minWidth: 0 }} onScroll={sync}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: THUMB_GAP, padding: '2px 0' }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => onSelect(img, i)}
              style={{
                flexShrink: 0, width: THUMB_W, height: THUMB_W,
                borderRadius: 8, overflow: 'hidden', background: '#ffffff',
                border: i === selectedIndex ? '2px solid #6366f1' : '1px solid rgba(99,102,241,0.25)',
                outline: 'none', cursor: 'pointer',
                transition: 'border-color .15s, opacity .15s',
                opacity: i === selectedIndex ? 1 : 0.6,
              }}>
              <img src={img} alt={`m-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4, display: 'block' }} />
            </button>
          ))}
        </div>
      </div>

      <button className="thumb-arrow" disabled={!canRight}
        onClick={() => scrollRef.current?.scrollBy({ left: STEP, behavior: 'smooth' })}
        style={{ width: 24, height: 60, flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   RATING RING
══════════════════════════════════════════════════════════════════ */
const RatingRing = ({ avg, total }) => {
  const circ = 220, offset = circ - (avg / 5) * circ;
  return (
    <div className="flex flex-col items-center justify-center gap-1" style={{ minWidth: 110 }}>
      <div className="relative" style={{ width: 90, height: 90 }}>
        <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          <circle cx="45" cy="45" r="35" fill="none" stroke="url(#rgrad)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={circ} className="ring-arc" style={{ '--offset': offset, strokeDashoffset: offset }} />
          <defs>
            <linearGradient id="rgrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: '#fff', lineHeight: 1 }}>{avg.toFixed(1)}</span>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: 1 }}>/ 5.0</span>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < Math.round(avg) ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)' }}>
        {total} {total === 1 ? 'review' : 'reviews'}
      </span>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   STAR BARS
══════════════════════════════════════════════════════════════════ */
const StarBars = ({ reviews }) => {
  const counts = [5, 4, 3, 2, 1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));
  const max = Math.max(...counts.map(c => c.count), 1);
  return (
    <div className="flex flex-col gap-2 flex-1" style={{ minWidth: 180 }}>
      {counts.map(({ star, count }) => (
        <div key={star} className="flex items-center gap-2.5">
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)', width: 8, textAlign: 'right' }}>{star}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="bar-fill h-full rounded-full"
              style={{
                '--w': `${(count / max) * 100}%`, width: `${(count / max) * 100}%`,
                background: star >= 4 ? 'linear-gradient(90deg,#6366f1,#818cf8)' : star === 3 ? '#f59e0b' : '#f87171'
              }} />
          </div>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)', width: 14, textAlign: 'right' }}>{count}</span>
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
const Product = () => {
  const { productId, category, subCategory, ProductName, sku } = useParams();
  const {
    products, currency, addToCart, submitReview, getProductReviews,
    token, backendUrl, deleteReview, userId, wishlist,
    toggleWishlistItem, getSingleProduct
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [size, setSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [makeMeasure, setMakeMeasure] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [sizeStock, setSizeStock] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [addonCost, setAddonCost] = useState(0);

  const displayPrice = basePrice + addonCost;
  const isWishlisted = Array.isArray(wishlist) ? wishlist.some(w => w.productId === productData?._id) : false;

  // const fetchProductData = async () => {
  //   const item = await getSingleProduct(productId);
  //   if (item) {
  //     setProductData(item);
  //     setImage(item.image[0]);
  //     setSelectedIndex(0);
  //     setBasePrice(item.price);
  //     setAddonCost(0);
  //   }
  // };

  useEffect(() => {
    const fetchProduct = async () => {
      // Slug-based route
      // if (sku) {
      //   const res = await axios.get(
      //     `${backendUrl}/api/product/${category}/${subCategory}/${name}/${sku}`
      //   );
      //   setProductData(res.data.product);
      // }
      if (sku) {
        const res = await axios.get(
          `${backendUrl}/api/product/sku/${sku}`
        );

        if (res.data.success) {
          setProductData(res.data.product);
          setImage(res.data.product.image?.[0] || "");
          setBasePrice(res.data.product.price);
          setAddonCost(0);
        }
      }
      // Old ID-based route (backward compatible)
      else if (productId) {
        const res = await axios.post(
          `${backendUrl}/api/product/single`,
          { productId }
        );
        setProductData(res.data.product);
        setImage(res.data.product.image?.[0] || "");
        setBasePrice(res.data.product.price);
        setAddonCost(0);
      }
    };
    fetchProduct();
  }, [sku]);

  // const loadReviews = async () => {
  //   const data = await getProductReviews(productId);
  //   setReviews(data);
  // };

  const loadReviews = async () => {
    if (!productData?._id) return;
    const data = await getProductReviews(productData._id);
    setReviews(data);
  };
  useEffect(() => {
    if (productData?._id) loadReviews();
  }, [productData?._id]);

  useEffect(() => {
    if (productData?.image?.length) {
      setImage(productData.image[0]);
    }
  }, [productData]);

  const handleSizeSelect = (sizeObj) => {
    if (!sizeObj) return;
    if (typeof sizeObj === 'string') {
      setSize(sizeObj); setSizeStock(0); setBasePrice(productData?.price || 0);
    } else if (sizeObj.size) {
      setSize(sizeObj.size); setSizeStock(sizeObj.stock || 0);
      setBasePrice(sizeObj.useCustomPrice && sizeObj.customPrice > 0
        ? sizeObj.customPrice
        : productData.price * (sizeObj.priceMultiplier || 1));
    }
  };

  const handleAddToCart = () => {
    if (!size || !selectedColor) { toast.error('Please select a size and color.'); return; }
    addToCart(productData._id, size, selectedColor, addonCost, basePrice);
    setIsButtonDisabled(true);
    setTimeout(() => { toast.success('Product added to cart!'); setIsButtonDisabled(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 2000);
  };

  const handleReviewSubmit = async () => {
    if (!token) return toast.error('Please login first');
    if (!rating || !comment.trim()) return toast.error('Please add rating and comment');
    const ok = await submitReview(productData._id, rating, comment);
    if (ok) { setComment(''); setRating(5); loadReviews(); }
  };

  // useEffect(() => { fetchProductData(); }, [productId, products]);
  useEffect(() => { if (productId) loadReviews(); }, [productId]);
  useEffect(() => {
    if (productData?.color?.length) {
      const c = productData.color[0];
      setSelectedColor(typeof c === 'string' ? c : c?.name || 'Unknown');
    }
  }, [productData]);

  if (!productData) return <div className="opacity-0" />;

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const roundedRating = Math.round(avgRating);
  const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction. Get your order delivered swiftly with tracking updates every step of the way. We use sustainable, recyclable materials to keep your delivery green and guilt-free. Products adhere to international quality benchmarks, ensuring top-tier performance. Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;
  const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;
  const extraAboveBase = displayPrice - productData.price;
  const customBreakdown = extraAboveBase > 0 ? ` (incl. +${currency}${extraAboveBase.toFixed(2)} for size/customization)` : '';

  return (
    <div style={{ background: 'linear-gradient(180deg,#08080f 0%,#0b0b14 100%)' }} className="min-h-screen">
      <ProductPageStyles />

      {/* Original indigo top accent line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10">

        {/* ══ PRODUCT MAIN — improved grid layout ══ */}
        <div style={{
          display: 'grid',
          // gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)',
          gridTemplateColumns: '420px 1fr',
          gap: '24px',
          alignItems: 'start',
        }} className="product-main-grid">

          {/* ── IMAGE GALLERY ── */}
          <div className="product-gallery-wrap lg:sticky lg:top-24 self-start" style={{ overflow: 'hidden', maxWidth: '100%', width: '100%' }}>

            {/* DESKTOP: vertical thumb rail + main image */}
            <div className="hidden sm:flex flex-row gap-3" style={{ alignItems: 'flex-start' }}>
              <ThumbRail
                images={productData.image}
                selectedIndex={selectedIndex}
                onSelect={(img, idx) => { setImage(img); setSelectedIndex(idx); }}
              />

              {/* MAIN IMAGE — aspect-ratio based, not fixed px */}
              <div className="main-img-wrap overflow-hidden relative"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  aspectRatio: '3/4',
                  maxHeight: 450,
                }}>
                <img src={image} alt={productData.name} className="main-img"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16, display: 'block' }} />
                <button onClick={() => toggleWishlistItem(productData._id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.85)',
                    border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(4px)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'all .2s'
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24"
                    fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : '#888'}
                    strokeWidth="1.5" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-1"
                  style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>
                    {selectedIndex + 1} / {productData.image.length}
                  </span>
                </div>
              </div>
            </div>

            {/* MOBILE: main image + horizontal strip */}
            <div className="flex sm:hidden flex-col gap-3" style={{ width: '100%', maxWidth: '100%' }}>
              <div className="rounded-2xl overflow-hidden relative"
                style={{ background: '#fff', border: '1px solid rgba(255,255,255,0.06)', width: '100%', aspectRatio: '1/1', maxHeight: '80vw' }}>
                <img src={image} alt={productData.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12, display: 'block' }} />
                <button onClick={() => toggleWishlistItem(productData._id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.85)',
                    border: isWishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(0,0,0,0.1)'
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24"
                    fill={isWishlisted ? '#ef4444' : 'none'} stroke={isWishlisted ? '#ef4444' : '#888'} strokeWidth="1.5" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-1"
                  style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>
                    {selectedIndex + 1} / {productData.image.length}
                  </span>
                </div>
              </div>
              <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                <MobileThumbRail images={productData.image} selectedIndex={selectedIndex}
                  onSelect={(img, i) => { setImage(img); setSelectedIndex(i); }} />
              </div>
            </div>
          </div>

          {/* ── PRODUCT INFO — improved spacing & hierarchy ── */}
          <div style={{ maxWidth: '100%', width: '100%' }}>

            {/* Category */}
            <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>
              {productData.category} / {productData.subCategory}
            </p>

            {/* Product name — IMPROVED: Cormorant serif, larger */}
            {/* <h1 className="text-white font-light mb-4"
              style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,2.8vw,38px)', lineHeight:1.2, letterSpacing:'-0.01em' }}>
              {productData.name}
            </h1> */}
            <h1 className="text-white font-light mb-4"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(20px,3.5vw,20px)' }}>
              {productData.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                  fill={i < roundedRating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-white/70 ml-1" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* PRICE — IMPROVED: larger, more breathing room */}
            {/* <div className="mb-5 pb-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
              {productData.discountPrice > 0 && productData.discountActive ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-green-400 font-medium"
                    style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'34px', lineHeight:1 }}>
                    {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
                  </span>
                  <span className="text-white/40 line-through"
                    style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'18px' }}>
                    {currency}{displayPrice.toFixed(2)}
                  </span>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
                    style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'10px', fontWeight:700 }}>
                    {productData.discountPrice}% OFF
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-white"
                    style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'34px', lineHeight:1 }}>
                    {currency}{displayPrice.toFixed(2)}
                  </span>
                  {customBreakdown && (
                    <span className="text-white/35" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'11px' }}>{customBreakdown}</span>
                  )}
                </div>
              )}
              <p className="text-white/25 mt-1" style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'10px' }}>Incl. of all taxes</p>
            </div> */}

            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {productData.discountPrice > 0 && productData.discountActive ? (
                <div className="flex items-center gap-3">
                  <span className="text-white/40 line-through" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '22px' }}>{currency}{displayPrice.toFixed(2)}</span>
                  <span className="text-green-400 font-medium" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
                    {currency}{(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
                  </span>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-2.5 py-1"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', fontWeight: 700 }}>
                    {productData.discountPrice}% OFF
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-white " style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '30px' }}>
                    {currency}{displayPrice.toFixed(2)}
                  </span>
                  {customBreakdown && <span className="text-white/35 ml-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{customBreakdown}</span>}
                </div>
              )}
            </div>

            <p className="text-white/60 leading-relaxed mb-7"
              style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', lineHeight: '1.8' }}>
              {productData.description}
            </p>

            {/* COLOUR — round swatches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-white/70 font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Colour</p>
                <span className="text-white/70 capitalize"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>— {selectedColor}</span>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {productData.color?.length > 0 ? productData.color.map((c, i) => {
                  const n = typeof c === 'string' ? c : c?.name || 'Unknown';
                  const h = typeof c === 'string' ? (colorMap[c.toLowerCase()] || '#CCCCCC') : (c.hex || colorMap[c?.name?.toLowerCase()] || '#CCCCCC');
                  const sel = selectedColor === n;
                  return (
                    <button key={i} onClick={() => setSelectedColor(n)} title={n}
                      className="color-swatch"
                      style={{
                        width: 34, height: 34, borderRadius: '50%',
                        backgroundColor: h,
                        border: sel ? '3px solid #6366f1' : '2px solid rgba(255,255,255,0.15)',
                        boxShadow: sel ? '0 0 0 3px rgba(99,102,241,0.3)' : 'none',
                        cursor: 'pointer', outline: 'none',
                        transition: 'transform .15s, box-shadow .15s',
                      }} />
                  );
                }) : (
                  <p className="text-white/60" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No colors available</p>
                )}
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/70 font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '2px' }}>Select Size</p>
                <button onClick={() => setShowModal(true)}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Size Guide
                </button>
                {showModal && <Modal onclose={() => setShowModal(false)} />}
              </div>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes?.length > 0 ? productData.sizes.map((s, i) => {
                  const lbl = s?.size || s;
                  let sp = productData.price;
                  if (typeof s === 'object') sp = (s.useCustomPrice && s.customPrice > 0) ? s.customPrice : productData.price * (s.priceMultiplier || 1);
                  const sel = size === lbl;
                  const oos = typeof s === 'object' && s.stock === 0;
                  return (
                    <button key={i} type="button" onClick={() => handleSizeSelect(s)}
                      className="size-btn flex flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200"
                      style={{
                        border: sel ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                        background: sel ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                        transform: sel ? 'scale(1.05)' : 'scale(1)', minWidth: '60px',
                        opacity: oos ? 0.4 : 1, boxShadow: sel ? '0 0 0 3px rgba(99,102,241,0.18)' : 'none',
                        cursor: oos ? 'not-allowed' : 'pointer'
                      }}>
                      <span className="text-white font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>{lbl}</span>
                      <span className="text-white/70" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px' }}>{currency}{sp.toFixed(2)}</span>
                    </button>
                  );
                }) : (
                  <p className="text-white/60" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>No sizes available</p>
                )}
              </div>
              {size && sizeStock <= 0 && <p className="text-red-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ This size is out of stock</p>}
              {size && sizeStock > 0 && sizeStock < 5 && <p className="text-amber-400 mt-2" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>⚠️ Only {sizeStock} left in stock</p>}
            </div>

            {/* MADE TO MEASURE */}
            {/* <div className="mb-4">
              <button onClick={() => setMakeMeasure(!makeMeasure)}
                className="w-full rounded-xl py-3 transition-all duration-200 font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
                style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2px',
                  color: makeMeasure ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
                  border: makeMeasure ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.1)',
                  background: makeMeasure ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 3H3v18h18V3z M7 7h.01 M7 12h.01 M7 17h.01 M11 7h6 M11 12h6 M11 17h6" />
                </svg>
                Made to Measure
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ transform: makeMeasure ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {makeMeasure && (
                <div className="mt-2 rounded-xl p-3 flex items-center gap-2"
                  style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <FaInfoCircle className="text-indigo-400 shrink-0" size={14} />
                  <p className="text-white/50" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>Measurements can be added on the Cart page</p>
                </div>
              )}
            </div> */}

            {/* ADD TO CART — original indigo gradient */}
            <button onClick={() => { handleAddToCart(); setDrawerOpen(true); }}
              disabled={isButtonDisabled || !size || !selectedColor}
              className="w-full relative overflow-hidden rounded-xl text-white font-semibold uppercase tracking-widest py-4 mb-4 group"
              style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '2.5px',
                background: isButtonDisabled ? '#4b4b6b' : 'linear-gradient(135deg,#6366f1,#4f46e5)',
                opacity: (!size || !selectedColor) ? 0.5 : 1,
                cursor: (!size || !selectedColor) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', border: 'none',
                boxShadow: (!size || !selectedColor || isButtonDisabled) ? 'none' : '0 8px 24px rgba(99,102,241,0.35)'
              }}>
              <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl"
                style={{ display: (!size || !selectedColor) ? 'none' : 'block' }} />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isButtonDisabled ? (
                  <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Adding…</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>Add to Cart</>
                )}
              </span>
            </button>

            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={() => setDrawerOpen(!drawerOpen)} />
            {/* <JacketLiningSelector basePrice={basePrice} onPriceChange={(c) => setAddonCost(c)} /> */}
            {
              productData.itemDetails?.some(item => item.title || item.value) && (

                <div
                  style={{
                    marginTop: 4,
                    marginBottom: 24,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    overflow: "hidden",
                    backdropFilter: "blur(8px)",
                  }}
                >

                  {/* Header */}

                  <div
                    style={{
                      padding: "10px 22px",
                      background: "rgba(99,102,241,0.08)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#ffffff",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        fontFamily: "'Montserrat',sans-serif",
                      }}
                    >
                      Product Specifications
                    </h2>
                  </div>

                  {/* Specification Rows */}

                  {productData.itemDetails.map((item, index) => (

                    item.title || item.value ? (

                      <div
                        key={index}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "250px 1fr",
                          alignItems: "center",
                          padding: "10px 22px",
                          background:
                            index % 2 === 0
                              ? "rgba(255,255,255,.015)"
                              : "transparent",

                          borderBottom:
                            index !== productData.itemDetails.length - 1
                              ? "1px solid rgba(255,255,255,.06)"
                              : "none",
                        }}
                      >

                        {/* Left */}

                        <p
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,.90)",
                            letterSpacing: ".05em",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.title}
                        </p>

                        {/* Right */}

                        <p
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: 12,
                            color: "rgba(255,255,255,.70)",
                            lineHeight: 1.8,
                          }}
                        >
                          {item.value}
                        </p>

                      </div>

                    ) : null

                  ))}

                </div>

              )
            }


            {/* POLICY — original indigo icons */}
            <div className="mt-6 space-y-2.5 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text: '100% original, premium materials' },
                { icon: 'M4 12l6 6L20 6', text: 'Secure cash on delivery + multiple payment methods' },
                { icon: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5', text: 'Simple 7-day return or exchange policy' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.50)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,.90)" strokeWidth="2" strokeLinecap="round">
                      <path d={icon} />
                    </svg>
                  </div>
                  <span className="text-white/70" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px' }}>{text}</span>
                </div>
              ))}
              <p className="text-white/60 leading-relaxed" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', lineHeight: '1.8' }}>
                {shownContent}
              </p>
              <button onClick={() => setIsExpanded(p => !p)}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        </div>

        {/* ══ TABS — all original ══ */}
        <div className="mt-20">
          <div className="flex items-end gap-0 mb-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {['description', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`ptab-btn px-8 py-4 font-semibold uppercase tracking-widest transition-colors duration-200 ${activeTab === tab ? 'ptab-active' : ''}`}
                style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px',
                  color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.50)', background: 'none', border: 'none', cursor: 'pointer'
                }}>
                {tab === 'reviews' ? `Reviews (${reviews.length})` : 'Description'}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="pt-10 pb-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,rgba(99,102,241,.70),transparent)' }} />
                {/* <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: 'rgba(120,125,241,.90)', letterSpacing: '4px', textTransform: 'uppercase' }}>Product Details</span> */}
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",        // 13 → 18
                    fontWeight: 600,         // thoda bold
                    color: "#8b93ff",        // brighter indigo
                    letterSpacing: "6px",    // 4 → 6
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  Product Details
                </span>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,.70))' }} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="desc-prose" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,.45)' }}
                    dangerouslySetInnerHTML={{ __html: productData.detailedDescription }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="pt-10 space-y-8">
              {reviews.length > 0 && (
                <div className="rounded-2xl p-6 flex flex-wrap gap-8 items-center"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <RatingRing avg={avgRating} total={reviews.length} />
                  <div className="w-px self-stretch hidden sm:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
                  <StarBars reviews={reviews} />
                  <div className="w-px self-stretch hidden lg:block" style={{ background: 'rgba(255,255,255,0.07)' }} />
                  <div className="flex flex-col gap-2">
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2px', textTransform: 'uppercase' }}>Top sentiments</span>
                    {['Premium quality', 'Great fit', 'Fast delivery'].map(s => (
                      <span key={s} className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ color: '#6366f1', fontSize: 12 }}>✦</span> {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {token ? (
                <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(99,102,241,0.04)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#fff', fontWeight: 300 }}>Share Your Experience</span>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 12 }}>Your Rating</p>
                      <div className="flex gap-3 flex-wrap">
                        {[5, 4, 3, 2, 1].map(r => {
                          const active = Number(rating) === r;
                          return (
                            <button key={r} type="button" onClick={() => setRating(r)}
                              className="star-pick flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200"
                              style={{
                                fontFamily: "'Montserrat',sans-serif", fontSize: 12,
                                // background: active ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.03)',
                                // border: active ? '1px solid rgba(245,158,11,0.45)' : '1px solid rgba(255,255,255,0.08)',
                                // color: active ? '#f59e0b' : 'rgba(255,255,255,.3)',
                                // boxShadow: active ? '0 0 16px rgba(245,158,11,0.2)' : 'none', cursor: 'pointer'
                                background: active
                                  ? 'rgba(251,191,36,0.28)'
                                  : 'rgba(255,255,255,0.04)',

                                border: active
                                  ? '1px solid #fbbf24'
                                  : '1px solid rgba(255,255,255,0.10)',

                                color: active
                                  ? '#facc15'
                                  : 'rgba(255,255,255,.35)',

                                boxShadow: active
                                  ? '0 0 20px rgba(251,191,36,.55)'
                                  : 'none',
                              }}>
                              <span style={{ fontSize: 14 }}>{'★'.repeat(r)}</span>
                              <span style={{ fontSize: 11 }}>{r}.0</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10 }}>Your Review</p>
                      <div className="relative">
                        <textarea className="rev-textarea w-full rounded-xl resize-none transition-all duration-200"
                          value={comment} onChange={e => setComment(e.target.value)}
                          placeholder="What did you love about this product? Quality, fit, style…" rows={4}
                          style={{
                            fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 1.7,
                            padding: '14px 16px', background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,.65)', width: '100%'
                          }} />
                        <span className="absolute bottom-3 right-4" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.40)' }}>
                          {comment.length}/500
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={handleReviewSubmit} className="submit-btn rounded-xl text-white font-semibold uppercase tracking-widest px-8 py-3.5"
                        style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '2.5px', cursor: 'pointer', border: 'none' }}>
                        <span className="flex items-center gap-2">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          Submit Review
                        </span>
                      </button>
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.70)' }}>Your review is public</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(99,102,241,0.04)', border: '1px dashed rgba(99,102,241,0.2)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,.5)" strokeWidth="1.2" strokeLinecap="round" className="mx-auto mb-3">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.70)' }}>Sign in to share your experience</p>
                </div>
              )}

              {reviews.length === 0 ? (
                <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.070)' }}>
                  <div className="text-4xl mb-3 text-indigo-500">✦</div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: 'rgba(255,255,255,.40)', fontWeight: 300 }}>No reviews yet</p>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: 'rgba(255,255,255,.40)', marginTop: 6 }}>Be the first to share your thoughts</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                    </span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: 'rgba(255,255,255,.70)', letterSpacing: '1px' }}>Most recent</span>
                  </div>
                  {reviews.map((rev, idx) => {
                    const init = (rev.user?.name || 'U')[0].toUpperCase();
                    const cols = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];
                    const col = cols[idx % cols.length];
                    return (
                      <div key={rev._id} className="rev-card rounded-2xl p-5"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                              style={{ background: `${col}22`, border: `1px solid ${col}44`, fontFamily: "'Montserrat',sans-serif", fontSize: 13, color: col }}>
                              {init}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>
                                  {rev.user?.name || 'User'}
                                </p>
                                <span className="verified-badge rounded-full px-2 py-0.5 flex items-center gap-1"
                                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,.25)' }}>
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, color: '#818cf8', letterSpacing: '1px' }}>Verified</span>
                                </span>
                              </div>
                              <div className="flex gap-0.5 mt-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} width="10" height="10" viewBox="0 0 24 24"
                                    fill={i < rev.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)' }}>
                              {new Date(rev.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            {rev.user?._id === userId && (
                              // <button onClick={async () => { const ok = await deleteReview(rev._id); if (ok) loadReviews(); }}
                              //   className="flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all duration-150"
                              //   style={{
                              //     fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: '1px',
                              //     color: 'rgba(248,113,113,.6)', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.15)', textTransform: 'uppercase', cursor: 'pointer'
                              //   }}
                              //   onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; }}
                              //   onMouseLeave={e => { e.currentTarget.style.color = 'rgba(248,113,113,.6)'; e.currentTarget.style.background = 'rgba(248,113,113,0.07)'; }}>
                              //   <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              //     <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6 M14 11v6" />
                              //   </svg>
                              //   Delete
                              // </button>
                              <button
                                onClick={async () => {
                                  const ok = await deleteReview(rev._id);
                                  if (ok) loadReviews();
                                }}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all duration-200"
                                style={{
                                  fontFamily: "'Montserrat',sans-serif",
                                  fontSize: 10,
                                  fontWeight: 600,
                                  letterSpacing: "1px",
                                  color: "#f87171",
                                  background: "rgba(248,113,113,0.15)",
                                  border: "1px solid rgba(248,113,113,0.35)",
                                  textTransform: "uppercase",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "#ffffff";
                                  e.currentTarget.style.background = "#ef4444";
                                  e.currentTarget.style.borderColor = "#ef4444";
                                  e.currentTarget.style.boxShadow =
                                    "0 0 16px rgba(239,68,68,.45)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#f87171";
                                  e.currentTarget.style.background =
                                    "rgba(248,113,113,0.15)";
                                  e.currentTarget.style.borderColor =
                                    "rgba(248,113,113,0.35)";
                                  e.currentTarget.style.boxShadow = "none";
                                }}
                              >
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14H6L5 6" />
                                  <path d="M10 11v6 M14 11v6" />
                                </svg>

                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="mt-4 leading-relaxed"
                          style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, lineHeight: 1.8, color: 'rgba(255,255,255,.70)', paddingLeft: 52 }}>
                          {rev.comment}
                        </p>
                        <div className="flex items-center gap-3 mt-4" style={{ paddingLeft: 52 }}>
                          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.70)' }}>Helpful?</span>
                          {['👍', '👎'].map(e => (
                            <button key={e} className="rounded-lg px-2.5 py-1 transition-colors"
                              style={{ fontSize: 11, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}
                              onMouseEnter={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                              onMouseLeave={ev => { ev.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                              {e}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-20">
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>

      </div>

      {/* Responsive grid: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .product-main-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Product;





// import { useContext, useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { createPortal } from 'react-dom';
// import { ShopContext } from '../context/ShopContext';
// import { FaInfoCircle, FaCrown, FaChevronUp, FaChevronDown, FaRuler } from 'react-icons/fa';
// import { MdVerified, MdLocalShipping, MdLoop } from 'react-icons/md';
// import { HiSparkles } from 'react-icons/hi';
// import RelatedProducts from '../components/RelatedProducts';
// import Modal from '../components/Modal';
// import { toast } from 'react-toastify';
// import { FaRegStar, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
// import { BsShieldCheck, BsBagCheck } from 'react-icons/bs';
// import CartDrawer from '../components/CartDrawer';
// import axios from 'axios';
// import { Helmet } from 'react-helmet-async';

// /*
//   ═══════════════════════════════════════════════
//   LL LEATHER LOVERS — Product.jsx (dark indigo theme)
//   Ported from D Dolly Lamb's light-mode Product.jsx,
//   with these corrections:

//   ✅ DISCOUNT FIX — LLeather Lovers' discountPrice field
//      stores the FINAL RUPEE AMOUNT in the DB (e.g. 950
//      means ₹950), not a percentage like D Dolly Lamb's
//      schema. All discount math below derives the % badge
//      from price vs discountPrice instead of assuming
//      discountPrice itself is already a percent.

//   ✅ basePrice/displayPrice now always initializes from
//      productData.price as soon as the product loads,
//      instead of staying at 0 until a size is clicked.
//   ═══════════════════════════════════════════════
// */

// const C = {
//   bgPage: '#08080f',
//   bgCard: '#0e0e1c',
//   bgCardHover: '#13132a',
//   bgInput: '#0b0b16',
//   accent: '#6366F1',
//   accentMid: '#818CF8',
//   accentDk: '#4338CA',
//   gold: '#D4A853',
//   textNav: '#FFFFFF',
//   textBody: 'rgba(255,255,255,0.6)',
//   textMuted: 'rgba(255,255,255,0.4)',
//   textDim: 'rgba(255,255,255,0.25)',
//   border: 'rgba(99,102,241,0.15)',
//   borderMd: 'rgba(99,102,241,0.22)',
//   borderBright: 'rgba(99,102,241,0.4)',
// };

// const colorMap = {
//   wine: '#722F37', red: '#FF0000', black: '#000000', olive: '#808000',
//   green: '#008000', cognac: '#D2691E', white: '#FFFFFF', yellow: '#FFFF00',
//   gray: '#808080', rose: '#FF007F', tobacco: '#A0522D', navy: '#000080',
//   beige: '#F5F5DC', blue: '#0000FF', brown: '#8B4513',
//   'antique brown': '#8A5A44', 'dark gray': '#404040', 'dark-gray': '#404040',
//   'dark-wine': '#453333', 'tobacco-dark': '#6e351a',
// };

// const Product = () => {
//   const { productId, category, subCategory, productName, sku } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const { wishlist, toggleWishlistItem, backendUrl } = useContext(ShopContext);
//   const { submitReview, getProductReviews, token, deleteReview, userId } = useContext(ShopContext);

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [size, setSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState('description');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [displayPrice, setDisplayPrice] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [sizeMultiplier, setSizeMultiplier] = useState(1);
//   const [sizeStock, setSizeStock] = useState(0);
//   const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
//   const [isZooming, setIsZooming] = useState(false);

//   const thumbListRef = useRef(null);
//   const mainImgRef = useRef(null);

//   const isWishlisted = Array.isArray(wishlist) && productData
//     ? wishlist.some(item => item.productId === productData._id) : false;

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (sku) {
//         const res = await axios.get(`${backendUrl}/api/product/sku/${sku}`);
//         if (res.data.success) {
//           setProductData(res.data.product);
//           setImage(res.data.product.image?.[0] || "");
//         }
//       } else if (productId) {
//         const res = await axios.post(`${backendUrl}/api/product/single`, { productId });
//         setProductData(res.data.product);
//       }
//     };
//     fetchProduct();
//   }, [sku]);

//   const loadReviews = async () => {
//     if (!productData?._id) return;
//     const data = await getProductReviews(productData._id);
//     setReviews(data);
//   };
//   useEffect(() => {
//     if (productData?._id) loadReviews();
//   }, [productData?._id]);

//   useEffect(() => {
//     if (productData?.image?.length) {
//       setImage(productData.image[0]);
//     }
//   }, [productData]);

//   const openCartDrawer = () => setDrawerOpen(true);
//   const closeCartDrawer = () => setDrawerOpen(false);

//   const handleSizeSelect = (sizeObj) => {
//     if (!sizeObj) return;
//     if (typeof sizeObj === 'string') {
//       setSize(sizeObj); setSizeMultiplier(1); setSizeStock(0);
//       setDisplayPrice(productData.price);
//     } else if (typeof sizeObj === 'object' && sizeObj.size) {
//       setSize(sizeObj.size);
//       setSizeMultiplier(sizeObj.priceMultiplier || 1);
//       setSizeStock(sizeObj.stock || 0);
//       if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) {
//         setDisplayPrice(sizeObj.customPrice);
//       } else {
//         setDisplayPrice(productData.price * (sizeObj.priceMultiplier || 1));
//       }
//     }
//   };

//   const scrollThumbs = (dir) => {
//     if (!thumbListRef.current) return;
//     const isMobile = window.innerWidth < 768;
//     thumbListRef.current.scrollBy({
//       top: isMobile ? 0 : dir * 110,
//       left: isMobile ? dir * 90 : 0,
//       behavior: 'smooth',
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (!mainImgRef.current) return;
//     const rect = mainImgRef.current.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setZoomPos({ x, y });
//   };

//   useEffect(() => {
//     if (productData?.color?.length > 0) {
//       const firstColor = productData.color[0];
//       setSelectedColor(typeof firstColor === 'string' ? firstColor : firstColor?.name || '');
//     } else {
//       setSelectedColor('');
//     }
//   }, [productData]);

//   // ✅ FIX — always initialize displayPrice from productData.price
//   // as soon as the product loads, instead of leaving it at 0 until
//   // the user manually clicks a size. This was the root cause of the
//   // "$0.00" price bug seen on freshly bulk-uploaded products.
//   useEffect(() => {
//     if (productData?.price !== undefined) {
//       setDisplayPrice(productData.price);
//     }
//   }, [productData]);

//   useEffect(() => {
//     if (!productData?.price) return;
//     const selectedSizeObj = productData.sizes?.find(s => s.size === size);
//     if (selectedSizeObj?.useCustomPrice && selectedSizeObj?.customPrice > 0) {
//       setDisplayPrice(selectedSizeObj.customPrice);
//     } else {
//       setDisplayPrice(productData.price * (sizeMultiplier || 1));
//     }
//   }, [sizeMultiplier, productData?.price, size]);

//   const handleAddToCart = () => {
//     if (!size || !selectedColor) { toast.error('Please select a size and color.'); return; }
//     const customPrice = displayPrice - productData.price;
//     addToCart(productData._id, size, selectedColor, customPrice);
//     setIsButtonDisabled(true);
//     openCartDrawer();
//     setTimeout(() => { toast.success('Added to cart!'); setIsButtonDisabled(false); }, 2000);
//   };

//   const handleReviewSubmit = async () => {
//     if (!token) return toast.error('Please login first');
//     if (!rating || !comment.trim()) return toast.error('Please add rating and comment');
//     const success = await submitReview(productData._id, rating, comment);
//     if (success) { setComment(''); setRating(5); loadReviews(); }
//   };

//   /* ── Loading State ── */
//   if (!productData) return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: C.bgPage, flexDirection: 'column', gap: 20 }}>
//       <div style={{ width: 48, height: 48, position: 'relative' }}>
//         <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${C.border}` }} />
//         <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid transparent`, borderTopColor: C.accent, animation: 'spin 1s linear infinite' }} />
//       </div>
//       <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, letterSpacing: '.22em', color: C.textDim, textTransform: 'uppercase', fontWeight: 600 }}>Loading</span>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );

//   const productUrl = `https://llleatherlovers.com/product/${category}/${subCategory}/${productName}/${sku}`;

//   const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
//   const roundedRating = Math.round(avgRating);

//   /* ══════════════════════════════════════════════════════════════
//      ✅ DISCOUNT FIX — discountPrice is the FINAL rupee price here,
//      not a percentage. D Dolly Lamb's original formula was:
//        displayPrice - (displayPrice * productData.discountPrice / 100)
//      which silently produced wildly wrong (often negative) prices
//      once the backend started storing the final rupee amount.
//   ══════════════════════════════════════════════════════════════ */
//   const hasDiscount = productData.discountPrice > 0 && productData.discountActive && productData.discountPrice < displayPrice;
//   const discountedPrice = hasDiscount ? productData.discountPrice : null;
//   const discountPercent = hasDiscount
//     ? Math.round(((displayPrice - productData.discountPrice) / displayPrice) * 100)
//     : 0;

//   const customBreakdown = displayPrice > productData.price
//     ? `+${currency}${(displayPrice - productData.price).toFixed(2)} customization` : '';

//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
//     *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

//     .pp { font-family:'Montserrat',sans-serif; background:${C.bgPage}; min-height:100vh; color:${C.textBody}; }
//     .pp-serif { font-family:'Montserrat',sans-serif; }

//     .pp-crumb {
//       padding:11px 36px; font-size:10px; font-weight:600;
//       letter-spacing:.25em; text-transform:uppercase; color:${C.textDim};
//       border-bottom:1px solid ${C.border}; display:flex; align-items:center; gap:5px;
//       background:${C.bgCard};
//     }
//     .pp-crumb-dot { width:3px; height:3px; border-radius:50%; background:${C.textDim}; flex-shrink:0; }
//     .pp-crumb-name { color:${C.textBody}; font-weight:400; letter-spacing:.06em; text-transform:none; font-size:12px; }

//     .pp-thumb-col { display:flex; flex-direction:column; align-items:center; width:64px; flex-shrink:0; gap:6px; }
//     .pp-thumb-scroll { display:flex; flex-direction:column; gap:6px; overflow-y:scroll; max-height:380px; scrollbar-width:none; -ms-overflow-style:none; width:100%; }
//     .pp-thumb-scroll::-webkit-scrollbar { display:none; }
//     .pp-arr { width:100%; height:24px; background:transparent; border:1px solid ${C.border}; border-radius:5px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:${C.textDim}; transition:all .2s; flex-shrink:0; }
//     .pp-arr:hover { border-color:${C.accent}; color:${C.accent}; background:rgba(99,102,241,0.1); }
//     .pp-thumb-item { width:100%; aspect-ratio:1/1; border-radius:8px; overflow:hidden; cursor:pointer; border:1.5px solid ${C.border}; background:#FFFFFF; flex-shrink:0; transition:all .3s; opacity:0.7; }
//     .pp-thumb-item:hover { opacity:0.9; border-color:${C.accentMid}; }
//     .pp-thumb-item.active { opacity:1; border-color:${C.accent}; box-shadow:0 0 0 2px rgba(99,102,241,0.25); }
//     .pp-thumb-item img { width:100%; height:100%; object-fit:cover; display:block; }

//     .pp-main-wrap { flex:1; position:relative; border-radius:14px; overflow:hidden; background:#FFFFFF; border:1.5px solid ${C.border}; cursor:crosshair; box-shadow:0 4px 24px rgba(99,102,241,0.15); }
//     .pp-main-wrap img { width:100%; height:100%; object-fit:contain; display:block; transition:transform .1s ease; }
//     .pp-main-wrap.zooming img { transform:scale(2.2); transform-origin:var(--zx,50%) var(--zy,50%); }

//     .pp-corner { position:absolute; width:20px; height:20px; pointer-events:none; }
//     .pp-corner-tl { top:12px; left:12px; border-top:1.5px solid ${C.accentMid}; border-left:1.5px solid ${C.accentMid}; opacity:0.5; }
//     .pp-corner-tr { top:12px; right:12px; border-top:1.5px solid ${C.accentMid}; border-right:1.5px solid ${C.accentMid}; opacity:0.5; }
//     .pp-corner-bl { bottom:12px; left:12px; border-bottom:1.5px solid ${C.accentMid}; border-left:1.5px solid ${C.accentMid}; opacity:0.5; }
//     .pp-corner-br { bottom:12px; right:12px; border-bottom:1.5px solid ${C.accentMid}; border-right:1.5px solid ${C.accentMid}; opacity:0.5; }

//     .pp-img-wish { position:absolute; top:12px; right:12px; width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.92); border:1.5px solid ${C.border}; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .25s; z-index:10; box-shadow:0 2px 8px rgba(0,0,0,0.15); }
//     .pp-img-wish:hover { border-color:${C.accent}; background:rgba(99,102,241,0.1); }
//     .pp-img-wish.active { border-color:${C.accent}; background:rgba(99,102,241,0.12); }

//     .pp-counter { position:absolute; bottom:12px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.55); border:1px solid rgba(255,255,255,0.1); border-radius:99px; padding:5px 16px; font-size:10px; font-weight:700; color:rgba(255,255,255,0.7); backdrop-filter:blur(8px); letter-spacing:.14em; display:flex; align-items:center; gap:8px; }
//     .pp-counter-dot { width:4px; height:4px; border-radius:50%; background:${C.accentMid}; }

//     .pp-badge-indigo { background:linear-gradient(135deg,${C.accentDk},${C.accent}); color:#fff; border-radius:20px; padding:4px 14px; font-size:9px; font-weight:700; letter-spacing:.2em; display:inline-flex; align-items:center; gap:5px; text-transform:uppercase; box-shadow:0 2px 8px rgba(99,102,241,0.35); }
//     .pp-badge-sale { background:linear-gradient(135deg,#059669,#10B981); color:#fff; border-radius:20px; padding:4px 14px; font-size:9px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; box-shadow:0 2px 8px rgba(16,185,129,0.3); }

//     .pp-divider { display:flex; align-items:center; gap:12px; margin:18px 0; }
//     .pp-divider-line { flex:1; height:1px; background:${C.border}; }
//     .pp-divider-diamond { width:5px; height:5px; background:${C.accentMid}; transform:rotate(45deg); flex-shrink:0; opacity:0.6; }

//     .pp-pricebox { padding:14px 0; margin-bottom:14px; border-bottom:1px solid ${C.border}; }

//     .pp-clr { border-radius:50%; cursor:pointer; transition:all .25s; border:2px solid transparent; flex-shrink:0; width:24px; height:24px; position:relative; }
//     .pp-clr::after { content:''; position:absolute; inset:-4px; border-radius:50%; border:2px solid transparent; transition:border-color .25s; }
//     .pp-clr:hover { transform:scale(1.1); }
//     .pp-clr.active::after { border-color:${C.accent}; }

//     .pp-size { border:1.5px solid ${C.border}; border-radius:10px; background:${C.bgCard}; display:flex; flex-direction:column; align-items:center; padding:8px 14px; min-width:52px; cursor:pointer; transition:all .2s; position:relative; overflow:hidden; }
//     .pp-size:hover { border-color:${C.accentMid}; background:${C.bgCardHover}; }
//     .pp-size.active { border-color:${C.accent}; background:rgba(99,102,241,0.12); box-shadow:0 0 0 3px rgba(99,102,241,0.18); }
//     .pp-size-lbl { font-weight:600; font-size:12px; color:${C.textNav}; }
//     .pp-size-price { font-size:10px; color:${C.textDim}; font-weight:400; margin-top:2px; }
//     .pp-size.active .pp-size-lbl { color:${C.accentMid}; }
//     .pp-size.active .pp-size-price { color:${C.accent}; }

//     .pp-cart { width:100%; color:#fff; font-weight:700; font-size:11px; letter-spacing:.22em; border:none; border-radius:10px; padding:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; background:linear-gradient(110deg,${C.accentDk} 0%,${C.accent} 45%,${C.accentMid} 65%,${C.accent} 100%); background-size:200% 200%; background-position:0% 50%; transition:all .4s ease; position:relative; overflow:hidden; font-family:'Montserrat',sans-serif; text-transform:uppercase; box-shadow:0 6px 24px rgba(99,102,241,0.4); }
//     .pp-cart::before { content:''; position:absolute; top:-50%; left:-60%; width:30%; height:200%; background:rgba(255,255,255,.15); transform:skewX(-20deg); transition:left .6s ease; }
//     .pp-cart:hover::before { left:120%; }
//     .pp-cart:hover { background-position:100% 50%; box-shadow:0 10px 36px rgba(99,102,241,0.5); transform:translateY(-1px); }
//     .pp-cart:disabled { background:${C.border}; color:${C.textDim}; border:1px solid ${C.border}; box-shadow:none; transform:none; cursor:not-allowed; }

//     .pp-policy { display:flex; align-items:center; gap:14px; padding:10px 0; border-bottom:1px solid ${C.border}; font-size:12px; color:${C.textMuted}; letter-spacing:.02em; }
//     .pp-policy:last-child { border-bottom:none; }
//     .pp-policy-icon { width:32px; height:32px; border-radius:8px; background:rgba(99,102,241,0.1); border:1px solid ${C.border}; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

//     .pp-slabel { font-size:10px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:${C.textDim}; }

//     .pp-bar-track { flex:1; height:5px; background:${C.border}; border-radius:99px; overflow:hidden; }
//     .pp-bar-fill { height:100%; background:linear-gradient(90deg,${C.accentDk},${C.accent}); border-radius:99px; transition:width .7s ease; }

//     .pp-rsum { background:${C.bgCard}; border:1.5px solid ${C.borderMd}; border-radius:16px; padding:26px; margin-bottom:24px; position:relative; overflow:hidden; }
//     .pp-rsum::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,${C.accent},transparent); }

//     .pp-submit-btn { margin-top:14px; background:linear-gradient(110deg,${C.accentDk},${C.accent}); color:#fff; border-radius:8px; padding:12px 28px; font-size:10px; font-weight:800; letter-spacing:.2em; border:none; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .25s; text-transform:uppercase; box-shadow:0 4px 16px rgba(99,102,241,0.35); }
//     .pp-submit-btn:hover { box-shadow:0 6px 24px rgba(99,102,241,0.5); transform:translateY(-1px); }

//     .pp-rinput { width:100%; border:1.5px solid ${C.border}; border-radius:10px; padding:14px 16px; font-size:13px; color:${C.textNav}; resize:vertical; font-family:'Montserrat',sans-serif; background:${C.bgInput}; outline:none; transition:border-color .25s, box-shadow .25s; line-height:1.7; }
//     .pp-rinput:focus { border-color:${C.accent}; box-shadow:0 0 0 3px rgba(99,102,241,0.18); }
//     .pp-rinput::placeholder { color:${C.textDim}; }

//     .pp-rev-card { background:${C.bgCard}; border:1.5px solid ${C.border}; border-radius:14px; padding:22px; margin-bottom:12px; transition:border-color .2s, box-shadow .2s; }
//     .pp-rev-card:hover { border-color:${C.accentMid}; box-shadow:0 4px 16px rgba(99,102,241,0.12); }

//     .pp-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,${C.accentDk},${C.accent}); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0; box-shadow:0 0 0 2px rgba(99,102,241,0.2); }

//     .desc-html { color:${C.textBody}; line-height:2; font-size:14px; letter-spacing:.02em; font-family:'Montserrat',sans-serif; }
//     .desc-html strong, .desc-html b { color:${C.textNav}; font-weight:600; }
//     .desc-html p { margin-bottom:1rem; }
//     .desc-html ul { list-style:none; padding:0; margin-bottom:1rem; }
//     .desc-html ul li { padding-left:1.5rem; position:relative; margin-bottom:.5rem; }
//     .desc-html ul li::before { content:'◆'; position:absolute; left:0; font-size:7px; top:6px; color:${C.accentMid}; }
//     .desc-html h2,.desc-html h3 { color:${C.textNav}; font-family:'Montserrat',sans-serif; font-weight:600; margin-bottom:.75rem; margin-top:1.5rem; }

//     .feat-card { transition:border-color .3s, background .3s, box-shadow .3s; }
//     .feat-card:hover { border-color:${C.accentMid} !important; background:${C.bgCardHover} !important; box-shadow:0 8px 24px rgba(99,102,241,0.15) !important; }

//     .pp-gallery-col { display:flex; gap:12px; flex:0 0 auto; width:min(480px,100%); align-self:flex-start; }
//     @media (min-width:768px) { .pp-gallery-col { position:sticky; top:88px; } }

//     @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
//     .pp-fadein { animation:fadeUp .45s ease both; }
//     .tab-content { animation:fadeUp .35s ease both; }

//     @media (max-width:767px) {
//       .pp-crumb { padding:10px 16px; font-size:9px; }
//       .pp-crumb-name { display:none; }
//       .pp-page-inner { padding:16px 16px 60px !important; }
//       .pp-two-col { flex-direction:column !important; gap:0 !important; }
//       .pp-gallery-col { width:100% !important; position:static !important; margin-bottom:20px; flex-direction:column !important; gap:10px !important; }
//       .pp-thumb-col { order:2; width:100%; flex-direction:row; align-items:center; gap:6px; }
//       .pp-thumb-scroll { flex-direction:row !important; overflow-x:auto !important; overflow-y:hidden !important; max-height:none !important; gap:8px; }
//       .pp-thumb-item { width:70px !important; height:70px !important; flex-shrink:0; }
//       .pp-arr { width:20px; height:40px; }
//       .pp-arr svg { transform:rotate(-90deg); }
//       .pp-info-panel { width:100% !important; min-width:0 !important; padding:0 !important; }
//       .pp-size { padding:7px 10px !important; min-width:46px !important; }
//       .pp-cart { padding:14px !important; }
//       .pp-rsum { padding:16px !important; }
//     }

//     .pp *::-webkit-scrollbar { width:3px; height:3px; }
//     .pp *::-webkit-scrollbar-thumb { background:rgba(99,102,241,0.25); border-radius:99px; }
//     .pp *::-webkit-scrollbar-thumb:hover { background:rgba(99,102,241,0.45); }
//   `;

//   return (
//     <>
//       <Helmet>
//         <title>{productData.name} | LL Leather Lovers</title>
//         <meta
//           name="description"
//           content={productData.description?.replace(/<[^>]*>/g, '').substring(0, 160)}
//         />
//         <link rel="canonical" href={productUrl} />

//         <meta property="og:type" content="product" />
//         <meta property="og:title" content={productData.name} />
//         <meta
//           property="og:description"
//           content={productData.description?.replace(/<[^>]*>/g, '').substring(0, 160)}
//         />
//         <meta property="og:image" content={productData.image?.[0]} />
//         <meta property="og:url" content={productUrl} />

//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Product",
//             name: productData.name,
//             image: productData.image,
//             sku: productData.sku,
//             description: productData.description,
//             offers: {
//               "@type": "Offer",
//               price: hasDiscount ? discountedPrice : displayPrice,
//               priceCurrency: "INR",
//               availability: "https://schema.org/InStock"
//             }
//           })}
//         </script>
//       </Helmet>
//       <style>{css}</style>

//       {createPortal(
//         <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={closeCartDrawer} />,
//         document.body
//       )}

//       <div className="pp">

//         {/* Breadcrumb */}
//         <div className="pp-crumb">
//           <span>{productData.category?.toUpperCase()}</span>
//           {productData.subCategory && (
//             <><span>&nbsp;/</span><span>{productData.subCategory?.toUpperCase()}</span></>
//           )}
//           <span>&nbsp;/</span>
//           <span className="pp-crumb-name">
//             {productData.name?.substring(0, 55)}{productData.name?.length > 55 ? '…' : ''}
//           </span>
//         </div>

//         <div className="pp-page-inner" style={{ padding: '28px 36px 80px', maxWidth: 1440, margin: '0 auto' }}>
//           <div className="pp-two-col" style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>

//             {/* ── Gallery ── */}
//             <div className="pp-gallery-col">
//               <div className="pp-thumb-col">
//                 <button className="pp-arr" onClick={() => scrollThumbs(-1)}><FaChevronUp size={9} /></button>
//                 <div className="pp-thumb-scroll" ref={thumbListRef}>
//                   {productData.image.map((item, index) => (
//                     <div key={index} className={`pp-thumb-item${index === selectedIndex ? ' active' : ''}`}
//                       onClick={() => { setImage(item); setSelectedIndex(index); }}>
//                       <img src={item} alt={`View ${index + 1}`} />
//                     </div>
//                   ))}
//                 </div>
//                 <button className="pp-arr" onClick={() => scrollThumbs(1)}><FaChevronDown size={9} /></button>
//               </div>

//               <div className={`pp-main-wrap${isZooming ? ' zooming' : ''} contain p-4`}
//                 style={{ aspectRatio: '1/1', flex: 1, '--zx': `${zoomPos.x}%`, '--zy': `${zoomPos.y}%` }}
//                 ref={mainImgRef} onMouseMove={handleMouseMove}
//                 onMouseEnter={() => setIsZooming(true)}
//                 onMouseLeave={() => setIsZooming(false)}>
//                 <img src={image} alt={productData.name} />
//                 <div className="pp-corner pp-corner-tl" /><div className="pp-corner pp-corner-tr" />
//                 <div className="pp-corner pp-corner-bl" /><div className="pp-corner pp-corner-br" />
//                 <button className={`pp-img-wish${isWishlisted ? ' active' : ''}`}
//                   onClick={() => toggleWishlistItem(productData._id)}>
//                   {isWishlisted
//                     ? <FaHeart size={14} style={{ color: C.accent }} />
//                     : <FaRegHeart size={14} style={{ color: C.accentMid }} />}
//                 </button>
//                 <div className="pp-counter">
//                   <span style={{ color: C.accentMid, fontWeight: 700 }}>{String(selectedIndex + 1).padStart(2, '0')}</span>
//                   <div className="pp-counter-dot" />
//                   <span>{String(productData.image.length).padStart(2, '0')}</span>
//                 </div>
//               </div>
//             </div>

//             {/* ── Info Panel ── */}
//             <div className="pp-info-panel pp-fadein" style={{ flex: '1 1 300px', minWidth: 0, paddingRight: 8 }}>

//               <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.26em', color: C.accentMid, marginBottom: 10, textTransform: 'uppercase' }}>
//                 {productData.category}&nbsp;/&nbsp;{productData.subCategory}
//               </p>

//               <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 }}>
//                 <span className="pp-badge-indigo"><FaCrown size={8} />&nbsp;Premium Collection</span>
//                 {hasDiscount && <span className="pp-badge-sale">{discountPercent}% Off</span>}
//               </div>

//               <h1 className="pp-serif lg:w-[90%]" style={{
//                 fontSize: 'clamp(16px,1.6vw,22px)', fontWeight: 700,
//                 color: C.textNav, lineHeight: 1.4, marginBottom: 10,
//               }}>{productData.name}</h1>

//               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                 <div style={{ display: 'flex', gap: 2 }}>
//                   {[...Array(5)].map((_, i) => (
//                     <span key={i} style={{ color: i < roundedRating ? C.gold : 'rgba(255,255,255,0.15)', fontSize: 13 }}>
//                       {i < roundedRating ? <FaStar /> : <FaRegStar />}
//                     </span>
//                   ))}
//                 </div>
//                 <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 500 }}>
//                   {avgRating > 0 ? avgRating.toFixed(1) : '—'}&ensp;·&ensp;{reviews.length} reviews
//                 </span>
//               </div>

//               <div className="pp-divider" style={{ margin: '14px 0' }}>
//                 <div className="pp-divider-line" /><div className="pp-divider-diamond" /><div className="pp-divider-line" />
//               </div>

//               {/* ✅ PRICE — using discountPrice directly as the final amount */}
//               <div className="pp-pricebox">
//                 {hasDiscount ? (
//                   <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
//                     <span className="pp-serif" style={{ fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
//                       {currency}{discountedPrice.toFixed(2)}
//                     </span>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 4 }}>
//                       <span style={{ fontSize: 15, color: C.textDim, textDecoration: 'line-through' }}>{currency}{displayPrice.toFixed(2)}</span>
//                       <span style={{ background: 'linear-gradient(135deg,#059669,#10B981)', color: '#fff', borderRadius: 20, padding: '2px 10px', fontSize: 9, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase' }}>
//                         Save {currency}{(displayPrice - discountedPrice).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
//                     <span className="pp-serif" style={{ fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
//                       {currency}{displayPrice.toFixed(2)}
//                     </span>
//                     {customBreakdown && <span style={{ fontSize: 11, color: C.textDim, paddingBottom: 4 }}>{customBreakdown}</span>}
//                   </div>
//                 )}
//                 <p style={{ fontSize: 11, color: C.textMuted, marginTop: 8 }}>
//                   All taxes included&ensp;·&ensp;Free shipping above {currency}1000
//                 </p>
//               </div>

//               <p className="lg:w-[90%]" style={{ color: C.textBody, lineHeight: 1.85, fontSize: 13, letterSpacing: '.02em' }}>
//                 {productData.description}
//               </p>

//               <div className="pp-divider" style={{ margin: '16px 0' }}>
//                 <div className="pp-divider-line" /><div className="pp-divider-diamond" /><div className="pp-divider-line" />
//               </div>

//               {/* Color selector */}
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
//                   <span className="pp-slabel">Colour</span>
//                   <span style={{ fontSize: 11, color: C.textNav, fontWeight: 600, textTransform: 'capitalize' }}>
//                     — {selectedColor}
//                   </span>
//                 </div>
//                 <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                   {productData.color?.map((colorObj, index) => {
//                     let colorName, colorHex;
//                     if (typeof colorObj === 'string') {
//                       colorName = colorObj;
//                       colorHex = colorMap[colorObj.toLowerCase()] || null;
//                     } else if (colorObj?.name) {
//                       colorName = colorObj.name;
//                       const hex = colorObj.hex;
//                       colorHex = (hex && hex.trim() !== '') ? hex : null;
//                     } else {
//                       colorName = 'Unknown';
//                       colorHex = null;
//                     }

//                     return colorHex ? (
//                       <button key={index}
//                         className={`pp-clr${selectedColor === colorName ? ' active' : ''}`}
//                         onClick={() => setSelectedColor(colorName)}
//                         style={{
//                           background: colorHex,
//                           outline: colorHex === '#FFFFFF' ? `1.5px solid ${C.border}` : 'none'
//                         }}
//                         title={colorName}
//                       />
//                     ) : null;
//                   })}
//                 </div>
//               </div>

//               {/* Size selector */}
//               <div style={{ marginBottom: 16 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
//                   <span className="pp-slabel">Select Size</span>
//                   <button onClick={() => setShowModal(true)}
//                     style={{ fontSize: 10, color: C.accentMid, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", display: 'flex', alignItems: 'center', gap: 5 }}>
//                     <FaRuler size={10} /> Size Guide
//                   </button>
//                   {showModal && <Modal onclose={() => setShowModal(false)} />}
//                 </div>
//                 <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
//                   {productData.sizes?.length > 0 ? productData.sizes.map((sizeObj, index) => {
//                     const sizeLabel = typeof sizeObj === 'object' ? (sizeObj?.size ?? `Size ${index + 1}`) : String(sizeObj);
//                     const multiplier = sizeObj?.priceMultiplier || 1;
//                     return (
//                       <button key={index} type="button" className={`pp-size${size === sizeLabel ? ' active' : ''}`}
//                         onClick={() => handleSizeSelect(sizeObj)}>
//                         <span className="pp-size-lbl">{sizeLabel}</span>
//                         <span className="pp-size-price">
//                           {currency}{(sizeObj?.useCustomPrice && sizeObj?.customPrice > 0
//                             ? sizeObj.customPrice : productData.price * multiplier).toFixed(2)}
//                         </span>
//                       </button>
//                     );
//                   }) : <p style={{ fontSize: 13, color: C.textMuted }}>No sizes available</p>}
//                 </div>
//                 {size && sizeStock > 0 && sizeStock < 5 && (
//                   <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 8, padding: '5px 12px' }}>
//                     <span style={{ fontSize: 11 }}>🔥</span>
//                     <span style={{ fontSize: 11, color: '#FB923C', fontWeight: 600 }}>Only {sizeStock} left in this size</span>
//                   </div>
//                 )}
//               </div>

//               {/* CTA */}
//               <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
//                 <button className="pp-cart" onClick={handleAddToCart}
//                   disabled={isButtonDisabled || !size || !selectedColor}>
//                   <BsBagCheck size={16} />
//                   {isButtonDisabled ? 'Adding to Cart…' : 'Add to Cart'}
//                 </button>
//               </div>

//               {productData.itemDetails?.some(item => item.title || item.value) && (
//                 <div style={{ marginTop: 22, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
//                   <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}`, background: 'rgba(99,102,241,0.06)' }}>
//                     <h2 style={{ fontSize: 13, fontWeight: 700, color: C.textNav, letterSpacing: '.08em', textTransform: 'uppercase', fontFamily: "'Montserrat',sans-serif" }}>
//                       Product Specifications
//                     </h2>
//                   </div>
//                   {productData.itemDetails.map((item, index) => (
//                     item.title || item.value ? (
//                       <div key={index} style={{
//                         display: 'grid', gridTemplateColumns: '40% 50%', gap: 2, padding: '10px 18px',
//                         borderBottom: index !== productData.itemDetails.length - 1 ? `1px solid ${C.border}` : 'none',
//                         alignItems: 'center'
//                       }}>
//                         <p style={{ fontWeight: 600, color: C.textBody, fontSize: 13, letterSpacing: '.03em', lineHeight: 1.4 }}>{item.title}</p>
//                         <p style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.6, letterSpacing: '.02em' }}>{item.value}</p>
//                       </div>
//                     ) : null
//                   ))}
//                 </div>
//               )}

//               {/* Policies */}
//               <div style={{ paddingTop: 8 }} />
//               {[
//                 { icon: <BsShieldCheck size={14} style={{ color: C.accentMid }} />, text: '100% original, premium materials' },
//                 { icon: <MdLocalShipping size={14} style={{ color: C.accentMid }} />, text: 'Secure cash on delivery + multiple payment methods' },
//                 { icon: <MdLoop size={14} style={{ color: C.accentMid }} />, text: 'Simple 7-day return or exchange policy' },
//               ].map((p, i) => (
//                 <div key={i} className="pp-policy">
//                   <div className="pp-policy-icon">{p.icon}</div>
//                   <span>{p.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── TABS ── */}
//           <div style={{ marginTop: 80 }}>
//             <div style={{ display: 'flex', borderBottom: `1.5px solid ${C.border}`, marginBottom: 40, overflowX: 'auto' }}>
//               {['description', 'reviews'].map(tab => (
//                 <button key={tab} onClick={() => setActiveTab(tab)} style={{
//                   position: 'relative', padding: '13px 32px',
//                   fontFamily: "'Montserrat',sans-serif",
//                   fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
//                   background: 'none', border: 'none',
//                   borderBottom: activeTab === tab ? `2px solid ${C.accent}` : '2px solid transparent',
//                   marginBottom: -1.5, cursor: 'pointer',
//                   color: activeTab === tab ? C.accentMid : C.textDim,
//                   transition: 'color .25s, border-color .25s', whiteSpace: 'nowrap',
//                 }}>
//                   {tab === 'reviews' ? `Reviews (${reviews.length})` : 'Description'}
//                 </button>
//               ))}
//             </div>

//             {/* Description Tab */}
//             {activeTab === 'description' && (
//               <div className="tab-content" style={{ maxWidth: 900 }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
//                   <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.accentMid})`, opacity: 0.4 }} />
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                     <div style={{ width: 5, height: 5, background: C.accentMid, transform: 'rotate(45deg)', opacity: 0.6 }} />
//                     <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.accentMid, fontFamily: "'Montserrat',sans-serif" }}>Product Details</span>
//                     <div style={{ width: 5, height: 5, background: C.accentMid, transform: 'rotate(45deg)', opacity: 0.6 }} />
//                   </div>
//                   <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.accentMid}, transparent)`, opacity: 0.4 }} />
//                 </div>

//                 <div style={{ position: 'relative', borderRadius: 16, padding: 32, marginBottom: 24, background: C.bgCard, border: `1.5px solid ${C.border}` }}>
//                   <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`, borderRadius: '16px 16px 0 0' }} />
//                   <div className="desc-html" dangerouslySetInnerHTML={{ __html: productData.detailedDescription }} />
//                 </div>

//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 24 }}>
//                   {[
//                     { symbol: '✦', label: 'Premium Craft', desc: 'Handcrafted by artisans using heritage leatherworking techniques passed through generations.' },
//                     { symbol: '◈', label: 'Finest Materials', desc: "Sourced exclusively from the world's most prestigious and ethically certified tanneries." },
//                     { symbol: '❋', label: 'Bespoke Finish', desc: 'Each piece hand-finished to exacting luxury standards with precision hand stitching.' },
//                   ].map((feat, i) => (
//                     <div key={i} className="feat-card" style={{ position: 'relative', borderRadius: 14, padding: 22, background: C.bgCard, border: `1.5px solid ${C.border}` }}>
//                       <div style={{ width: 42, height: 42, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, background: 'rgba(99,102,241,0.1)', border: `1px solid ${C.border}`, color: C.accentMid, fontSize: 16 }}>{feat.symbol}</div>
//                       <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.textNav, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{feat.label}</p>
//                       <p style={{ fontSize: 12, lineHeight: 1.75, color: C.textMuted, fontFamily: "'Montserrat',sans-serif" }}>{feat.desc}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div style={{ borderRadius: 12, padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 20px', background: C.bgCard, border: `1.5px solid ${C.border}` }}>
//                   <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.accentMid, fontFamily: "'Montserrat',sans-serif", flexShrink: 0 }}>Care Guide</span>
//                   <div style={{ width: 1, height: 16, background: C.border, flexShrink: 0 }} />
//                   {[{ symbol: '🌿', label: 'Dry Clean Only' }, { symbol: '💧', label: 'Avoid Moisture' }, { symbol: '☀️', label: 'No Direct Sunlight' }, { symbol: '🗄️', label: 'Store in Dust Bag' }].map((care, i) => (
//                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//                       <span style={{ fontSize: 14 }}>{care.symbol}</span>
//                       <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'Montserrat',sans-serif" }}>{care.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Reviews Tab */}
//             {activeTab === 'reviews' && (
//               <div className="tab-content" style={{ maxWidth: 700 }}>
//                 {reviews.length > 0 && (
//                   <div className="pp-rsum" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
//                     <div style={{ textAlign: 'center', flexShrink: 0 }}>
//                       <div className="pp-serif" style={{ fontSize: 64, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
//                         {avgRating.toFixed(1)}
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'center', gap: 3, margin: '6px 0' }}>
//                         {[...Array(5)].map((_, i) => (
//                           <span key={i} style={{ color: i < roundedRating ? C.gold : 'rgba(255,255,255,0.15)', fontSize: 12 }}>
//                             {i < roundedRating ? <FaStar /> : <FaRegStar />}
//                           </span>
//                         ))}
//                       </div>
//                       <p style={{ fontSize: 10, color: C.textDim, letterSpacing: '.1em', fontWeight: 600 }}>{reviews.length} Reviews</p>
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       {[5, 4, 3, 2, 1].map(star => {
//                         const count = reviews.filter(r => Math.round(r.rating) === star).length;
//                         const pct = reviews.length ? (count / reviews.length) * 100 : 0;
//                         return (
//                           <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
//                             <span style={{ fontSize: 10, color: C.textDim, width: 8, textAlign: 'right', fontWeight: 600 }}>{star}</span>
//                             <FaStar size={8} style={{ color: C.gold, flexShrink: 0 }} />
//                             <div className="pp-bar-track"><div className="pp-bar-fill" style={{ width: `${pct}%` }} /></div>
//                             <span style={{ fontSize: 10, color: C.textDim, width: 18, textAlign: 'right' }}>{count}</span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {token ? (
//                   <div style={{ marginBottom: 24, padding: 28, borderRadius: 14, border: `1.5px solid ${C.border}`, background: C.bgCard, position: 'relative', overflow: 'hidden' }}>
//                     <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)` }} />
//                     <h3 className="pp-serif" style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 18 }}>Write a Review</h3>
//                     <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
//                       {[1, 2, 3, 4, 5].map(s => (
//                         <span key={s} onClick={() => setRating(s)}
//                           style={{ fontSize: 28, cursor: 'pointer', color: s <= rating ? C.gold : 'rgba(255,255,255,0.15)', transition: 'transform .15s', display: 'inline-block' }}
//                           onMouseOver={e => e.currentTarget.style.transform = 'scale(1.25)'}
//                           onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
//                           {s <= rating ? <FaStar /> : <FaRegStar />}
//                         </span>
//                       ))}
//                     </div>
//                     <textarea className="pp-rinput" placeholder="Share your experience with this product…"
//                       value={comment} onChange={e => setComment(e.target.value)} rows={4} />
//                     <button className="pp-submit-btn" onClick={handleReviewSubmit}>Submit Review</button>
//                   </div>
//                 ) : (
//                   <div style={{ padding: 20, borderRadius: 12, background: C.bgCard, border: `1.5px dashed ${C.border}`, textAlign: 'center', marginBottom: 20, color: C.textMuted, fontSize: 13 }}>
//                     Please&nbsp;<span style={{ color: C.accentMid, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>sign in</span>&nbsp;to write a review.
//                   </div>
//                 )}

//                 {reviews.length === 0 ? (
//                   <div style={{ textAlign: 'center', padding: '40px 0' }}>
//                     <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
//                       <FaRegStar size={24} style={{ color: C.accentMid, opacity: 0.5 }} />
//                     </div>
//                     <div className="pp-serif" style={{ fontSize: 18, color: C.textDim, marginBottom: 8, fontWeight: 600 }}>No reviews yet</div>
//                     <p style={{ fontSize: 12, color: C.textDim, letterSpacing: '.06em' }}>Be the first to share your experience</p>
//                   </div>
//                 ) : reviews.map(rev => (
//                   <div key={rev._id} className="pp-rev-card">
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                       <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
//                         <div className="pp-avatar">{(rev.user?.name || 'U')[0].toUpperCase()}</div>
//                         <div>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//                             <span style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{rev.user?.name || 'Customer'}</span>
//                             <MdVerified size={12} style={{ color: '#10B981' }} />
//                           </div>
//                           <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
//                             {[...Array(5)].map((_, i) => (
//                               <span key={i} style={{ color: i < rev.rating ? C.gold : 'rgba(255,255,255,0.15)', fontSize: 10 }}>
//                                 {i < rev.rating ? <FaStar /> : <FaRegStar />}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
//                         <span style={{ fontSize: 10, color: C.textDim, fontWeight: 500 }}>
//                           {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                         </span>
//                         {rev.user?._id === userId && (
//                           <button onClick={async () => { const ok = await deleteReview(rev._id); if (ok) loadReviews(); }}
//                             style={{ fontSize: 10, color: '#F87171', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '.06em', textTransform: 'uppercase' }}>
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <p style={{ fontSize: 13, color: C.textBody, lineHeight: 1.8, marginTop: 14 }}>{rev.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Related Products */}
//           <div style={{ marginTop: 100 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
//               <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
//               <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.accentMid, fontFamily: "'Montserrat',sans-serif", whiteSpace: 'nowrap' }}>
//                 ◆ YOU MAY ALSO LIKE ◆
//               </span>
//               <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
//             </div>
//             <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Product;








// import { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { FaInfoCircle } from 'react-icons/fa';
// import RelatedProducts from '../components/RelatedProducts';
// import Modal from '../components/Modal';
// import JacketLiningSelector from '../components/JacketLiningSelector';
// import { toast } from 'react-toastify'
// import CartDrawer from '../components/CartDrawer';
// import { IoHeartSharp } from "react-icons/io5";
// import { FaRegStar } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";

// const colorMap = {
//   wine: '#722F37',
//   red: '#FF0000',
//   black: '#000000',
//   olive: '#808000',
//   green: '#008000',
//   cognac: '#D2691E',
//   white: '#FFFFFF',
//   yellow: '#FFFF00',
//   gray: '#808080',
//   rose: '#FF007F',
//   tobacco: '#A0522D',
//   navy: '#000080',
//   beige: '#F5F5DC',
//   blue: '#0000FF',
//   brown: '#8B4513',
//   'dark-wine': '#453333',
//   'tobacco-dark': '#6e351a',
// };

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const { submitReview, getProductReviews, token, backendUrl, deleteReview, userId } = useContext(ShopContext);
//   const { wishlist, toggleWishlistItem } = useContext(ShopContext);
//   const { getSingleProduct } = useContext(ShopContext);
//   const navigate = useNavigate();

//   // ✅ ALL STATE DECLARATIONS FIRST
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [size, setSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState('description');
//   const [makeMeasure, setMakeMeasure] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [displayPrice, setDisplayPrice] = useState(0);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [sizeStock, setSizeStock] = useState(0);

//   // ✅ Wishlist check
//   const isWishlisted = Array.isArray(wishlist)
//     ? wishlist.some(item => item.productId === productId)
//     : false;

//   // ✅ ALL FUNCTION DECLARATIONS SECOND
//   const fetchProductData = async () => {
//     const item = await getSingleProduct(productId);
//     if (item) {
//       setProductData(item);
//       setImage(item.image[0]);
//       setSelectedIndex(0);
//       setDisplayPrice(item.price);
//     }
//   };

//   const loadReviews = async () => {
//     const data = await getProductReviews(productId);
//     setReviews(data);
//   };

//   const toggleCartDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   // ✅ FIXED: Handle size selection with custom price support
//   const handleSizeSelect = (sizeObj) => {
//     console.log("🔥 Size clicked:", sizeObj);

//     if (!sizeObj) {
//       console.log("Invalid size object");
//       return;
//     }

//     if (typeof sizeObj === 'string') {
//       // Old format: just a string
//       setSize(sizeObj);
//       setSizeStock(0);
//       if (productData && productData.price) {
//         setDisplayPrice(productData.price);
//       }
//     } else if (typeof sizeObj === 'object' && sizeObj.size) {
//       // New format: object with size, multiplier, stock, customPrice
//       setSize(sizeObj.size);
//       setSizeStock(sizeObj.stock || 0);

//       // ✅ CHECK FOR CUSTOM PRICE FIRST
//       if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) {
//         console.log(`✅ Using CUSTOM PRICE: ₹${sizeObj.customPrice}`);
//         setDisplayPrice(sizeObj.customPrice);
//       } else {
//         // Use multiplier-based pricing
//         const multiplier = sizeObj.priceMultiplier || 1;
//         const calculatedPrice = productData.price * multiplier;
//         console.log(`✅ Using MULTIPLIER: ${multiplier}, Price: ₹${calculatedPrice}`);
//         setDisplayPrice(calculatedPrice);
//       }

//       console.log(`✅ Final Display Price: ₹${sizeObj.useCustomPrice ? sizeObj.customPrice : productData.price * (sizeObj.priceMultiplier || 1)}`);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!size || !selectedColor) {
//       toast.error('Please select a size and color before adding to cart.', { duration: 2000 });
//       return;
//     }

//     const customPrice = displayPrice - productData.price;
//     console.log(`Adding to cart: Base ₹${productData.price}, Custom ₹${customPrice}, Total ₹${displayPrice}`);

//     addToCart(productData._id, size, selectedColor, customPrice);
//     setIsButtonDisabled(true);

//     setTimeout(() => {
//       toast.success('Product added to cart!', { duration: 2000 });
//       setIsButtonDisabled(false);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 2000);
//   };

//   const handleReviewSubmit = async () => {
//     if (!token) return toast.error("Please login first");

//     if (!rating || !comment.trim()) {
//       return toast.error("Please add rating and comment");
//     }

//     const success = await submitReview(productId, rating, comment);

//     if (success) {
//       setComment("");
//       setRating(5);
//       loadReviews();
//     }
//   };

//   const toggleMakeMeasure = () => setMakeMeasure(!makeMeasure);
//   const toggleExpansion = () => setIsExpanded((prev) => !prev);
//   const handleTabClick = (tab) => setActiveTab(tab);

//   // ✅ ALL useEffect HOOKS LAST
//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   useEffect(() => {
//     if (productId) {
//       loadReviews();
//     }
//   }, [productId]);

//   // ✅ DEBUG: Log product data
//   useEffect(() => {
//     if (productData) {
//       console.log("=== PRODUCT DATA LOADED ===");
//       console.log("Product Name:", productData.name);
//       console.log("Base Price:", productData.price);
//       console.log("Sizes:", productData.sizes);

//       if (productData.sizes && productData.sizes.length > 0) {
//         console.log("\n--- Size Details ---");
//         productData.sizes.forEach((sizeObj, index) => {
//           if (typeof sizeObj === 'object') {
//             console.log(`Size ${index + 1}:`, {
//               size: sizeObj.size,
//               priceMultiplier: sizeObj.priceMultiplier,
//               customPrice: sizeObj.customPrice,
//               useCustomPrice: sizeObj.useCustomPrice,
//               stock: sizeObj.stock
//             });
//           }
//         });
//       }
//       console.log("=======================\n");
//     }
//   }, [productData]);

//   useEffect(() => {
//     if (productData?.color?.length) {
//       const firstColor = productData.color[0];
//       let colorName;

//       if (typeof firstColor === 'string') {
//         colorName = firstColor;
//       } else if (typeof firstColor === 'object' && firstColor.name) {
//         colorName = firstColor.name;
//       } else {
//         colorName = 'Unknown';
//       }

//       setSelectedColor(colorName);
//     }
//   }, [productData]);

//   // ✅ RENDER
//   if (!productData) {
//     return <div className="opacity-0"></div>;
//   }

//   const avgRating = reviews.length > 0
//     ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//     : 0;

//   const roundedRating = Math.round(avgRating);

//   const content = `Simple 7-day return or exchange policy—no questions asked, just pure satisfaction.
//     Get your order delivered swiftly with tracking updates every step of the way.
//     We use sustainable, recyclable materials to keep your delivery green and guilt-free.
//     Products adhere to international quality benchmarks, ensuring top-tier performance.
//     Sizes tailored for real bodies—refer to our detailed size guide for the perfect match.`;

//   const shownContent = isExpanded ? content : `${content.substring(0, 250)}...`;
//   const customBreakdown = displayPrice > productData.price ? ` (incl. +${currency}${(displayPrice - productData.price).toFixed(2)} for size/customization)` : '';

//   return (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-10">
//       <div className="flex flex-col sm:flex-row">
//         <div className="flex flex-col-reverse gap-3 sm:flex-row md:sticky md:top-28 self-start w-full lg:w-[40%]">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] lg:w-[10%] lg:h-[10%] w-full lg:mr-5 gap-1">
//             {productData.image.map((item, index) => (
//               <div
//                 key={index}
//                 className={`flex-shrink-0 cursor-pointer transition-all duration-200 w-[70px] h-[50px] sm:w-full rounded-md
//                 ${index === selectedIndex ? 'border-2 border-blue-500' : 'border-2 border-transparent'}`}
//                 onClick={() => {
//                   setImage(item);
//                   setSelectedIndex(index);
//                 }}
//               >
//                 <img src={item} alt="" className="w-full h-full object-cover rounded-md" />
//               </div>
//             ))}
//           </div>

//           <div className="w-full sm:w-[80%] lg:w-[70%] flex justify-center items-center">
//             <div className="w-full max-h-[400px] aspect-[3/4] overflow-hidden rounded-lg bg-white flex items-center justify-center shadow-sm">
//               <img className="w-full h-full object-contain rounded-lg" src={image} alt={productData.name} />
//             </div>
//           </div>
//         </div>

//         <div className="w-full lg:w-[60%]">
//           <h1 className="lg:font-[600] text-gray-900 lg:text-[22px] mt-4 lg:mt-0 lg:mr-12">{productData.name}</h1>
//           <div className="flex items-center gap-1 mt-2">
//             {[...Array(5)].map((_, index) => (
//               <span key={index} className="text-[#de7921] text-sm">
//                 {index < roundedRating ? <FaStar /> : <FaRegStar />}
//               </span>
//             ))}
//             <p className="pl-2 text-sm text-gray-600">({reviews.length})</p>
//           </div>

//           {/* ✅ PRICE DISPLAY */}
//           {productData.discountPrice > 0 ? (
//             productData.discountActive ? (
//               <div className="flex items-center gap-3 mt-5">
//                 <p className="text-2xl font-medium text-gray-500 line-through">
//                   {currency}{displayPrice.toFixed(2)}
//                 </p>
//                 <p className="text-3xl font-semibold text-green-600">
//                   {currency}
//                   {(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//                 </p>
//               </div>
//             ) : (
//               <p className="mt-5 text-3xl font-semibold text-green-700">
//                 {currency}
//                 {(displayPrice - (displayPrice * productData.discountPrice / 100)).toFixed(2)}
//               </p>
//             )
//           ) : (
//             <p className="mt-5 text-3xl font-medium text-gray-800">
//               {currency}{displayPrice.toFixed(2)}
//               <span className="text-sm text-gray-500">{customBreakdown}</span>
//             </p>
//           )}

//           <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

//           {/* ✅ COLOR SELECTION */}
//           <div className="flex flex-col gap-4 my-8">
//             <div>
//               <div className="flex items-center mb-2">
//                 <p className="text-sm font-medium text-gray-700 mr-2">Color :</p>
//                 <span className="text-sm text-gray-900 capitalize">{selectedColor}</span>
//               </div>
//               <div className="flex gap-3 flex-wrap">
//                 {productData.color && productData.color.length > 0 ? (
//                   productData.color.map((colorObj, index) => {
//                     let colorName, colorHex;

//                     if (typeof colorObj === 'string') {
//                       colorName = colorObj;
//                       colorHex = colorMap[colorObj.toLowerCase()] || '#CCCCCC';
//                     } else if (typeof colorObj === 'object' && colorObj.name) {
//                       colorName = colorObj.name;
//                       colorHex = colorObj.hex || '#CCCCCC';
//                     } else {
//                       colorName = 'Unknown';
//                       colorHex = '#CCCCCC';
//                     }

//                     const isSelected = selectedColor === colorName;
//                     return (
//                       <div key={index} className="flex flex-col items-center">
//                         <button
//                           onClick={() => setSelectedColor(colorName)}
//                           className={`w-10 h-10 rounded-md border-2 transition-all duration-200 ${isSelected
//                               ? 'ring-2 ring-black scale-110 border-black'
//                               : 'border-gray-800 hover:ring-1 hover:ring-gray-400'
//                             }`}
//                           style={{ backgroundColor: colorHex }}
//                           title={`${colorName} (${colorHex})`}
//                         ></button>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p>No colors available</p>
//                 )}
//               </div>
//             </div>

//             {/* ✅ SIZE SELECTION WITH CUSTOM PRICE SUPPORT */}
//             <div>
//               <div className="flex gap-0 justify-between mr-20 mb-2">
//                 <p className="text-sm font-medium text-gray-700">Select Size</p>
//                 <button
//                   className="underline hover:no-underline text-sm text-blue-600"
//                   onClick={() => setShowModal(true)}
//                 >
//                   Size Guide
//                 </button>
//                 {showModal && <Modal onclose={() => setShowModal(false)} />}
//               </div>

//               <div className="flex gap-2 mb-2 flex-wrap">
//                 {productData.sizes && productData.sizes.length > 0 ? (
//                   productData.sizes.map((sizeObj, index) => {
//                     const sizeLabel = sizeObj?.size || sizeObj;
//                     const stock = sizeObj?.stock || 0;

//                     // ✅ CALCULATE PRICE: Check custom price first, then multiplier
//                     let sizePrice;
//                     let isCustomPrice = false;

//                     if (typeof sizeObj === 'object') {
//                       if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) {
//                         sizePrice = sizeObj.customPrice;
//                         isCustomPrice = true;
//                       } else {
//                         const multiplier = sizeObj.priceMultiplier || 1;
//                         sizePrice = productData.price * multiplier;
//                       }
//                     } else {
//                       sizePrice = productData.price;
//                     }

//                     const isInStock = stock > 0 || stock === 0;
//                     const isSelected = size === sizeLabel;

//                     return (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => {
//                           console.log("🔥 SIZE CLICKED:", sizeObj);
//                           handleSizeSelect(sizeObj);
//                         }}
//                         disabled={!isInStock}
//                         className={`border-2 border-gray-400 py-2 px-4 rounded-md flex flex-col items-center gap-1 transition-all ${isSelected
//                             ? 'border-orange-500 bg-orange-100 scale-105'
//                             : 'border-gray-300 hover:border-orange-300 hover:bg-gray-50'
//                           } ${!isInStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//                         title={!isInStock ? 'Out of stock' : `Select ${sizeLabel}`}
//                       >
//                         <span className="font-semibold text-gray-800">{sizeLabel}</span>
//                         <span className="text-xs text-gray-600 font-medium">
//                           {currency}{sizePrice.toFixed(2)}
//                           {isCustomPrice && (
//                             <span className="ml-1 text-green-600 text-[10px] font-bold">✓</span>
//                           )}
//                         </span>
//                       </button>
//                     );
//                   })
//                 ) : (
//                   <p className="text-gray-500">No sizes available</p>
//                 )}
//               </div>

//               {size && sizeStock <= 0 && (
//                 <p className="text-sm text-red-600 font-medium">⚠️ This size is out of stock</p>
//               )}
//               {size && sizeStock > 0 && sizeStock < 5 && (
//                 <p className="text-sm text-orange-600 font-medium">⚠️ Only {sizeStock} left in stock</p>
//               )}
//             </div>

//             <div className="flex flex-col justify-center items-center">
//               <button
//                 onClick={toggleMakeMeasure}
//                 className="w-[90%] border border-gray-300 text-gray-800 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors mb-4"
//               >
//                 MADE TO MEASURE
//               </button>
//               {makeMeasure && (
//                 <div className="flex items-center justify-center text-sm md:text-base lg:text-lg text-gray-600 bg-gray-100 p-4 rounded-md w-[80%] -mb-4">
//                   <FaInfoCircle className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
//                   Measurements can be added on the Cart page
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col items-center gap-3 top-24 z-[9] mb-10">
//             <button
//               onClick={() => toggleWishlistItem(productId)}
//               className="w-[90%] border border-gray-300 py-2.5 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
//             >
//               {isWishlisted ? "❤️ Remove from Wishlist" : "🖤 Add to Wishlist"}
//             </button>
//           </div>

//           <div className="flex items-center justify-center md:sticky top-24 z-[999]">
//             <button
//               onClick={() => {
//                 handleAddToCart();
//                 toggleCartDrawer();
//               }}
//               disabled={isButtonDisabled || !size || !selectedColor}
//               className="w-[90%] bg-gray-500 text-white font-semibold py-2.5 rounded-md hover:bg-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed md:sticky md:top-4 self-start z-50"
//             >
//               ADD TO CART
//             </button>
//           </div>

//           <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
//           <JacketLiningSelector
//             basePrice={displayPrice}
//             onPriceChange={(newPrice) => {
//               console.log(`JacketLiningSelector changed price to: ${newPrice}`);
//               setDisplayPrice(newPrice);
//             }}
//           />

//           <hr className="mt-8 sm:w-4/3" />

//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>Every item is 100% original, crafted with premium materials for lasting style and comfort.</p>
//             <p>Enjoy secure cash on delivery options, plus multiple payment methods to suit your preference.</p>
//             <p>{shownContent}</p>
//             <p
//               className="underline hover:no-underline cursor-pointer text-base text-gray-600"
//               onClick={toggleExpansion}
//             >
//               {isExpanded ? 'Read Less' : 'Read More'}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* TABS: DESCRIPTION & REVIEWS */}
//       <div className="mt-20">
//         <div className="flex border-b border-gray-200">
//           <button
//             onClick={() => handleTabClick('description')}
//             className={`px-4 py-2 text-sm font-medium ${activeTab === 'description'
//               ? 'border-b-2 border-blue-500 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//               }`}
//           >
//             Description
//           </button>
//           <button
//             onClick={() => handleTabClick('reviews')}
//             className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews'
//               ? 'border-b-2 border-blue-500 text-blue-600'
//               : 'text-gray-500 hover:text-gray-700'
//               }`}
//           >
//             Reviews ({reviews.length})
//           </button>
//         </div>

//         <div className="mt-4">
//           {activeTab === 'description' && (
//             <div
//               className="text-gray-700 leading-relaxed whitespace-pre-line"
//               dangerouslySetInnerHTML={{ __html: productData.detailedDescription }}
//             />
//           )}

//           {activeTab === 'reviews' && (
//             <div className="text-gray-600">
//               {token ? (
//                 <div className="mb-6 p-4 border rounded-lg">
//                   <h3 className="font-semibold mb-2">Write a Review</h3>
//                   <select
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                     className="border p-2 rounded mb-3"
//                   >
//                     <option value="5">★★★★★ (5)</option>
//                     <option value="4">★★★★☆ (4)</option>
//                     <option value="3">★★★☆☆ (3)</option>
//                     <option value="2">★★☆☆☆ (2)</option>
//                     <option value="1">★☆☆☆☆ (1)</option>
//                   </select>

//                   <textarea
//                     placeholder="Write your review..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     className="w-full border p-2 rounded mb-3"
//                     rows="3"
//                   ></textarea>

//                   <button
//                     onClick={handleReviewSubmit}
//                     className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//                   >
//                     Submit Review
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mb-4">Login to write a review.</p>
//               )}

//               {reviews.length === 0 ? (
//                 <p className="text-gray-500">No reviews yet.</p>
//               ) : (
//                 reviews.map((rev) => (
//                   <div key={rev._id} className="mb-4 border-b pb-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="font-semibold">{rev.user?.name || "User"}</span>
//                         <span className="text-yellow-500 ml-3">
//                           {"★".repeat(rev.rating)}
//                           {"☆".repeat(5 - rev.rating)}
//                         </span>
//                       </div>

//                       {rev.user?._id === userId && (
//                         <button
//                           onClick={async () => {
//                             const ok = await deleteReview(rev._id);
//                             if (ok) loadReviews();
//                           }}
//                           className="text-red-500 text-sm hover:underline"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>

//                     <p className="mt-1">{rev.comment}</p>
//                     <span className="text-sm text-gray-400">
//                       {new Date(rev.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;