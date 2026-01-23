// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { assets } from "../assets/assets";

// const UpdateProduct = ({ token }) => {
//   const { id } = useParams();

//   // IMAGE STATES
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [image4, setImage4] = useState(null);
//   const [image5, setImage5] = useState(null);

//   const [existingImages, setExistingImages] = useState([]);

//   // PRODUCT FIELDS
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [detailedDescription, setDetailedDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);
//   const [sizes, setSizes] = useState([]);
//   const [colors, setColors] = useState([]);

//   // COLORS (same as Add page)
//   const fallbackColors = [
//     { id: "wine", name: "Wine", hex: "#800000" },
//     { id: "red", name: "Red", hex: "#FF0000" },
//     { id: "black", name: "Black", hex: "#000000" },
//     { id: "olive", name: "Olive", hex: "#808000" },
//     { id: "green", name: "Green", hex: "#008000" },
//     { id: "cognac", name: "Cognac", hex: "#D2691E" },
//     { id: "white", name: "White", hex: "#FFFFFF" },
//     { id: "yellow", name: "Yellow", hex: "#FFFF00" },
//     { id: "gray", name: "Gray", hex: "#808080" },
//     { id: "rose", name: "Rose", hex: "#FF007F" },
//     { id: "tobacco", name: "Tobacco", hex: "#A0522D" },
//     { id: "navy", name: "Navy", hex: "#000080" },
//     { id: 'blue', name: 'blue', hex: '#0000ff' },  // Extra
//     { id: "beige", name: "Beige", hex: "#F5F5DC" },
//     { id: 'dark-wine', name: 'Dark-wine', hex: '#453333' },
//     { id: 'tobacco-dark', name: 'Dark-wine', hex: '#6e351a' },  // Extra
//   ];

//   // FETCH PRODUCT DATA
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.post(backendUrl + "/api/product/single", {
//           productId: id,
//         });

//         if (response.data.success) {
//           const p = response.data.product;

//           setName(p.name);
//           setDescription(p.description);
//           setDetailedDescription(p.detailedDescription);
//           setPrice(p.price);
//           setDiscountPrice(p.discountPrice || "");
//           setCategory(p.category);
//           setSubCategory(p.subCategory);
//           setBestseller(p.bestseller);
//           setSizes(p.sizes);
//           setColors(p.color);
//           setExistingImages(p.image);
//         }
//       } catch (error) {
//         toast.error("Failed to load product");
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // UPDATE PRODUCT
//   const updateHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       formData.append("productId", id);
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("detailedDescription", detailedDescription);
//       formData.append("price", price);
//       formData.append("discountPrice", discountPrice || "");
//       formData.append("category", category);
//       formData.append("subCategory", subCategory);
//       formData.append("bestseller", bestseller);
//       formData.append("sizes", JSON.stringify(sizes));
//       formData.append("color", JSON.stringify(colors));

//       // NEW IMAGES IF CHOSEN
//       if (image1) formData.append("image1", image1);
//       if (image2) formData.append("image2", image2);
//       if (image3) formData.append("image3", image3);
//       if (image4) formData.append("image4", image4);
//       if (image5) formData.append("image5", image5);

//       const response = await axios.post(
//         backendUrl + "/api/product/update",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success("Product updated successfully!");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Update failed!");
//     }
//   };

//   // Handle color selection
//   const handleColorSelect = (colorId) => {
//     setColors((prev) =>
//       prev.includes(colorId)
//         ? prev.filter((c) => c !== colorId)
//         : [...prev, colorId]
//     );
//   };

//   return (
//     <form onSubmit={updateHandler} className="flex flex-col w-full gap-4">
//       <h2 className="text-xl font-semibold mb-2">Update Product</h2>

//       {/* EXISTING IMAGES */}
//       <div>
//         <p className="mb-2">Existing Images</p>
//         <div className="flex gap-2 flex-wrap">
//           {existingImages.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt=""
//               className="w-24 h-24 rounded object-cover border"
//             />
//           ))}
//         </div>
//       </div>

//       {/* UPLOAD NEW IMAGES WITH FILENAME */}
//       <div>
//         <p className="mb-2">Upload New Images</p>

//         <div className="flex gap-4 flex-wrap">

//           {[image1, image2, image3, image4, image5].map((img, index) => {
//             const setter = [setImage1, setImage2, setImage3, setImage4, setImage5][index];
//             const inputId = "updImage" + (index + 1);

//             return (
//               <label key={index} htmlFor={inputId} className="flex flex-col items-center">
//                 <img
//                   className="cursor-pointer border-2 border-dashed rounded-lg w-24 h-24 object-cover hover:border-black transition"
//                   src={img ? URL.createObjectURL(img) : assets.upload_area}
//                   alt=""
//                 />
//                 {img && (
//                   <p className="text-xs mt-1 w-24 text-center truncate">
//                     {img.name}
//                   </p>
//                 )}
//                 <input
//                   type="file"
//                   id={inputId}
//                   hidden
//                   onChange={(e) => setter(e.target.files[0])}
//                 />
//               </label>
//             );
//           })}

//         </div>
//       </div>

//       {/* NAME */}
//       <div className="w-full">
//         <p>Product Name</p>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2"
//           required
//         />
//       </div>

//       {/* DESCRIPTION */}
//       <div className="w-full">
//         <p>Description</p>
//         <textarea
//           className="w-full max-w-[500px] px-3 py-2"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>

//       {/* DETAILED DESCRIPTION */}
//       <div className="w-full ">
//         <p>Detailed Description</p>
//         <ReactQuill
//           theme="snow"
//           value={detailedDescription}
//           onChange={setDetailedDescription}
//           className="bg-white max-w-[700px] "
//           style={{ height: "250px", marginBottom: "40px" }}
//         />
//       </div>

//       {/* CATEGORY */}
//       <div>
//         <p>Category</p>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="px-3 py-2"
//         >
//           <option>Men</option>
//           <option>Women</option>
//           {/* <option>Kids</option> */}
//           <option>Others</option>
//         </select>
//       </div>

//       {/* SUBCATEGORY */}
//       <div>
//         <p>Sub Category</p>
//         <select
//           value={subCategory}
//           onChange={(e) => setSubCategory(e.target.value)}
//           className="px-3 py-2"
//         >
//           {category === "Others" ? (
//             <>
//               {/* <option>Recliner Chair Headrest Cover</option> */}
//               <option>Chair Cover</option>
//               <option>Cushion Cover</option>
//               <option>Aprons</option>
//               <option>Desk Mat</option>
//               <option>Pillow</option>
//             </>
//           ) : (
//             <>
//               <option>Topwear</option>
//               <option>Bottomwear</option>
//               <option>Winterwear</option>
//             </>
//           )}
//         </select>
//       </div>

//       {/* PRICE */}
//       <div>
//         <p>Price</p>
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="px-3 py-2"
//         />
//       </div>

//       {/* DISCOUNT PRICE */}
//       <div>
//         <p>Discount Price (optional)</p>
//         <input
//           type="number"
//           value={discountPrice}
//           onChange={(e) => setDiscountPrice(e.target.value)}
//           className="px-3 py-2"
//           placeholder="Enter discount price"
//         />
//       </div>

//       {/* COLORS */}
//       <div>
//         <p>Product Colors</p>
//         <div className="flex flex-wrap gap-2">
//           {fallbackColors.map((c) => (
//             <button
//               type="button"
//               key={c.id}
//               onClick={() => handleColorSelect(c.id)}
//               className={`w-10 h-10 rounded border ${
//                 colors.includes(c.id) ? "ring-2 ring-black scale-110" : ""
//               }`}
//               style={{ backgroundColor: c.hex }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* SIZES */}
//       <div>
//         <p>Sizes</p>
//         <div className="flex gap-3">
//           {["S", "M", "L", "XL", "XXL", "3XL"].map((sz) => (
//             <p
//               key={sz}
//               onClick={() =>
//                 setSizes((prev) =>
//                   prev.includes(sz)
//                     ? prev.filter((s) => s !== sz)
//                     : [...prev, sz]
//                 )
//               }
//               className={`px-3 py-1 cursor-pointer ${
//                 sizes.includes(sz) ? "bg-pink-300" : "bg-gray-300"
//               }`}
//             >
//               {sz}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* BESTSELLER */}
//       <div className="flex gap-2 mt-2">
//         <input
//           type="checkbox"
//           checked={bestseller}
//           onChange={() => setBestseller(!bestseller)}
//         />
//         <label>Add to bestseller</label>
//       </div>

//       <button className="w-32 py-3 bg-black text-white rounded mt-3 hover:bg-gray-800">
//         UPDATE PRODUCT
//       </button>
//     </form>
//   );
// };

// export default UpdateProduct;


// add custom color functionality in them

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { assets } from "../assets/assets";

// const UpdateProduct = ({ token }) => {
//   const { id } = useParams();

//   // IMAGE STATES
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [image4, setImage4] = useState(null);
//   const [image5, setImage5] = useState(null);

//   const [existingImages, setExistingImages] = useState([]);

//   // PRODUCT FIELDS
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [detailedDescription, setDetailedDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);

//   // ✅ NEW: Colors with custom name and hex
//   const [colors, setColors] = useState([]);
//   const [newColorName, setNewColorName] = useState("");
//   const [newColorHex, setNewColorHex] = useState("#000000");

//   // ✅ NEW: Sizes with multipliers and stock
//   const [sizes, setSizes] = useState({
//     S: { multiplier: 0.9, stock: 0 },
//     M: { multiplier: 1.0, stock: 0 },
//     L: { multiplier: 1.1, stock: 0 },
//     XL: { multiplier: 1.2, stock: 0 },
//     XXL: { multiplier: 1.35, stock: 0 },
//     "3XL": { multiplier: 1.5, stock: 0 }
//   });
//   const [enabledSizes, setEnabledSizes] = useState([]);

//   // FETCH PRODUCT DATA
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.post(backendUrl + "/api/product/single", {
//           productId: id,
//         });

//         if (response.data.success) {
//           const p = response.data.product;

//           setName(p.name);
//           setDescription(p.description);
//           setDetailedDescription(p.detailedDescription);
//           setPrice(p.price);
//           setDiscountPrice(p.discountPrice || "");
//           setCategory(p.category);
//           setSubCategory(p.subCategory);
//           setBestseller(p.bestseller);
//           setExistingImages(p.image);

//           // ✅ NEW: Load colors (handle both old and new format)
//           if (p.color && p.color.length > 0) {
//             const formattedColors = p.color.map(colorItem => {
//               if (typeof colorItem === 'string') {
//                 // Old format: just string
//                 return { name: colorItem, hex: '#808080' };
//               }
//               // New format: object with name and hex
//               return { name: colorItem.name, hex: colorItem.hex };
//             });
//             setColors(formattedColors);
//           }

//           // ✅ NEW: Load sizes (handle both old and new format)
//           if (p.sizes && p.sizes.length > 0) {
//             const enabledSizesList = [];
//             const newSizeObj = { ...sizes };

//             p.sizes.forEach(sizeItem => {
//               if (typeof sizeItem === 'string') {
//                 // Old format: just string
//                 enabledSizesList.push(sizeItem);
//               } else if (typeof sizeItem === 'object' && sizeItem.size) {
//                 // New format: object with size, multiplier, stock
//                 enabledSizesList.push(sizeItem.size);
//                 newSizeObj[sizeItem.size] = {
//                   multiplier: sizeItem.priceMultiplier || 1,
//                   stock: sizeItem.stock || 0
//                 };
//               }
//             });

//             setEnabledSizes(enabledSizesList);
//             setSizes(newSizeObj);
//           }
//         }
//       } catch (error) {
//         toast.error("Failed to load product");
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // ✅ NEW: Add custom color
//   const handleAddColor = () => {
//     if (!newColorName.trim()) {
//       toast.error("Please enter color name");
//       return;
//     }

//     if (colors.some(c => c.name.toLowerCase() === newColorName.toLowerCase())) {
//       toast.error("This color already exists");
//       return;
//     }

//     setColors([...colors, { name: newColorName, hex: newColorHex }]);
//     setNewColorName("");
//     setNewColorHex("#000000");
//     toast.success("Color added!");
//   };

//   // ✅ NEW: Remove color
//   const handleRemoveColor = (colorName) => {
//     setColors(colors.filter(c => c.name !== colorName));
//   };

//   // ✅ NEW: Toggle size availability
//   const handleSizeToggle = (sizeKey) => {
//     setEnabledSizes(prev =>
//       prev.includes(sizeKey)
//         ? prev.filter(s => s !== sizeKey)
//         : [...prev, sizeKey]
//     );
//   };

//   // ✅ NEW: Update size multiplier
//   const handleSizeMultiplierChange = (sizeKey, value) => {
//     setSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         multiplier: parseFloat(value) || 1
//       }
//     }));
//   };

//   // ✅ NEW: Update size stock
//   const handleSizeStockChange = (sizeKey, value) => {
//     setSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         stock: parseInt(value) || 0
//       }
//     }));
//   };

//   // ✅ NEW: Format sizes for submission
//   const formatSizesForSubmit = () => {
//     return enabledSizes.map(sizeKey => ({
//       size: sizeKey,
//       priceMultiplier: sizes[sizeKey].multiplier,
//       stock: sizes[sizeKey].stock
//     }));
//   };

//   // UPDATE PRODUCT
//   const updateHandler = async (e) => {
//     e.preventDefault();

//     try {
//       if (enabledSizes.length === 0) {
//         return toast.error("Please select at least one size");
//       }

//       if (colors.length === 0) {
//         return toast.error("Please add at least one color");
//       }

//       const formData = new FormData();

//       formData.append("productId", id);
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("detailedDescription", detailedDescription);
//       formData.append("price", price);
//       formData.append("discountPrice", discountPrice || "");
//       formData.append("category", category);
//       formData.append("subCategory", subCategory);
//       formData.append("bestseller", bestseller);
      
//       // ✅ NEW: Send formatted sizes and colors
//       formData.append("sizes", JSON.stringify(formatSizesForSubmit()));
//       formData.append("color", JSON.stringify(colors));

//       // NEW IMAGES IF CHOSEN
//       if (image1) formData.append("image1", image1);
//       if (image2) formData.append("image2", image2);
//       if (image3) formData.append("image3", image3);
//       if (image4) formData.append("image4", image4);
//       if (image5) formData.append("image5", image5);

//       const response = await axios.post(
//         backendUrl + "/api/product/update",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success("Product updated successfully!");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Update failed!");
//     }
//   };

//   return (
//     <form onSubmit={updateHandler} className="flex flex-col w-full gap-4">
//       <h2 className="text-xl font-semibold mb-2">Update Product</h2>

//       {/* EXISTING IMAGES */}
//       <div>
//         <p className="mb-2">Existing Images</p>
//         <div className="flex gap-2 flex-wrap">
//           {existingImages.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt=""
//               className="w-24 h-24 rounded object-cover border"
//             />
//           ))}
//         </div>
//       </div>

//       {/* UPLOAD NEW IMAGES WITH FILENAME */}
//       <div>
//         <p className="mb-2">Upload New Images</p>

//         <div className="flex gap-4 flex-wrap">

//           {[image1, image2, image3, image4, image5].map((img, index) => {
//             const setter = [setImage1, setImage2, setImage3, setImage4, setImage5][index];
//             const inputId = "updImage" + (index + 1);

//             return (
//               <label key={index} htmlFor={inputId} className="flex flex-col items-center">
//                 <img
//                   className="cursor-pointer border-2 border-dashed rounded-lg w-24 h-24 object-cover hover:border-black transition"
//                   src={img ? URL.createObjectURL(img) : assets.upload_area}
//                   alt=""
//                 />
//                 {img && (
//                   <p className="text-xs mt-1 w-24 text-center truncate">
//                     {img.name}
//                   </p>
//                 )}
//                 <input
//                   type="file"
//                   id={inputId}
//                   hidden
//                   onChange={(e) => setter(e.target.files[0])}
//                 />
//               </label>
//             );
//           })}

//         </div>
//       </div>

//       {/* NAME */}
//       <div className="w-full">
//         <p>Product Name</p>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2 border"
//           required
//         />
//       </div>

//       {/* DESCRIPTION */}
//       <div className="w-full">
//         <p>Description</p>
//         <textarea
//           className="w-full max-w-[500px] px-3 py-2 border"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>

//       {/* DETAILED DESCRIPTION */}
//       <div className="w-full ">
//         <p>Detailed Description</p>
//         <ReactQuill
//           theme="snow"
//           value={detailedDescription}
//           onChange={setDetailedDescription}
//           className="bg-white max-w-[700px] "
//           style={{ height: "250px", marginBottom: "40px" }}
//         />
//       </div>

//       {/* CATEGORY */}
//       <div>
//         <p>Category</p>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="px-3 py-2 border"
//         >
//           <option>Men</option>
//           <option>Women</option>
//           <option>Others</option>
//         </select>
//       </div>

//       {/* SUBCATEGORY */}
//       <div>
//         <p>Sub Category</p>
//         <select
//           value={subCategory}
//           onChange={(e) => setSubCategory(e.target.value)}
//           className="px-3 py-2 border"
//         >
//           {category === "Others" ? (
//             <>
//               <option>Chair Cover</option>
//               <option>Cushion Cover</option>
//               <option>Aprons</option>
//               <option>Desk Mat</option>
//               <option>Pillow</option>
//             </>
//           ) : (
//             <>
//               <option>Topwear</option>
//               <option>Bottomwear</option>
//               <option>Winterwear</option>
//             </>
//           )}
//         </select>
//       </div>

//       {/* PRICE */}
//       <div>
//         <p>Price (Base)</p>
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="px-3 py-2 border"
//           required
//         />
//         <p className='text-xs text-gray-500 mt-1'>Base price before size multipliers</p>
//       </div>

//       {/* DISCOUNT PRICE */}
//       <div>
//         <p>Discount Price (optional)</p>
//         <input
//           type="number"
//           value={discountPrice}
//           onChange={(e) => setDiscountPrice(e.target.value)}
//           className="px-3 py-2 border"
//           placeholder="Enter discount price"
//         />
//       </div>

//       {/* ✅ NEW: CUSTOM COLORS */}
//       <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <p className='mb-4 font-medium text-gray-700'>Product Colors (Custom)</p>
        
//         <div className="flex gap-2 mb-4 flex-wrap items-end">
//           <div>
//             <label className='text-sm text-gray-600'>Color Name</label>
//             <input
//               type="text"
//               value={newColorName}
//               onChange={(e) => setNewColorName(e.target.value)}
//               placeholder="e.g., Navy Blue"
//               className='border p-2 rounded mt-1'
//             />
//           </div>

//           <div>
//             <label className='text-sm text-gray-600'>Color (Hex)</label>
//             <input
//               type="color"
//               value={newColorHex}
//               onChange={(e) => setNewColorHex(e.target.value)}
//               className='w-20 h-10 border rounded cursor-pointer mt-1'
//               title={newColorHex}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleAddColor}
//             className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
//           >
//             + Add Color
//           </button>
//         </div>

//         {/* Display added colors */}
//         <div className="flex flex-wrap gap-3">
//           {colors.map((color, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 p-2 bg-white border border-gray-300 rounded"
//             >
//               <div
//                 className="w-8 h-8 rounded border-2 border-gray-300"
//                 style={{ backgroundColor: color.hex }}
//                 title={color.hex}
//               />
//               <span className="text-sm font-medium">{color.name}</span>
//               <span className="text-xs text-gray-500">({color.hex})</span>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveColor(color.name)}
//                 className='text-red-500 text-sm hover:underline ml-2'
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         {colors.length === 0 && (
//           <p className='text-sm text-gray-500 italic'>No colors added yet</p>
//         )}
//       </div>

//       {/* ✅ NEW: SIZES WITH MULTIPLIERS AND STOCK */}
//       <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <p className='mb-4 font-medium text-gray-700'>Product Sizes (with Price Multiplier & Stock)</p>
        
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//           {Object.keys(sizes).map((sizeKey) => (
//             <div key={sizeKey} className={`p-3 border-2 rounded-lg transition-all ${
//               enabledSizes.includes(sizeKey)
//                 ? 'border-blue-500 bg-blue-50'
//                 : 'border-gray-200 bg-white'
//             }`}>
              
//               {/* Checkbox to enable/disable size */}
//               <div className='flex items-center gap-2 mb-3'>
//                 <input
//                   type="checkbox"
//                   id={`size-${sizeKey}`}
//                   checked={enabledSizes.includes(sizeKey)}
//                   onChange={() => handleSizeToggle(sizeKey)}
//                   className='w-5 h-5 cursor-pointer'
//                 />
//                 <label htmlFor={`size-${sizeKey}`} className='font-semibold text-lg cursor-pointer'>
//                   Size {sizeKey}
//                 </label>
//               </div>

//               {enabledSizes.includes(sizeKey) && (
//                 <div className='space-y-2'>
//                   {/* Price Multiplier */}
//                   <div>
//                     <label className='text-sm text-gray-600'>
//                       Price Multiplier (base × this)
//                     </label>
//                     <input
//                       type="number"
//                       step="0.1"
//                       min="0.5"
//                       max="2"
//                       value={sizes[sizeKey].multiplier}
//                       onChange={(e) => handleSizeMultiplierChange(sizeKey, e.target.value)}
//                       className='w-full px-2 py-1 border border-gray-300 rounded'
//                       placeholder='1.0'
//                     />
//                     <p className='text-xs text-gray-500 mt-1'>
//                       Final price: {(parseFloat(price || 0) * sizes[sizeKey].multiplier).toFixed(2)}
//                     </p>
//                   </div>

//                   {/* Stock */}
//                   <div>
//                     <label className='text-sm text-gray-600'>
//                       Stock Quantity
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       value={sizes[sizeKey].stock}
//                       onChange={(e) => handleSizeStockChange(sizeKey, e.target.value)}
//                       className='w-full px-2 py-1 border border-gray-300 rounded'
//                       placeholder='0'
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Summary */}
//         {enabledSizes.length > 0 && (
//           <div className='mt-4 p-3 bg-blue-100 rounded-lg'>
//             <p className='text-sm font-medium text-blue-900'>Selected Sizes:</p>
//             <div className='flex gap-2 mt-2 flex-wrap'>
//               {enabledSizes.map(sizeKey => (
//                 <span key={sizeKey} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
//                   {sizeKey} × {sizes[sizeKey].multiplier}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* BESTSELLER */}
//       <div className="flex gap-2 mt-2">
//         <input
//           type="checkbox"
//           checked={bestseller}
//           onChange={() => setBestseller(!bestseller)}
//           id="bestseller"
//         />
//         <label htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button className="w-32 py-3 bg-black text-white rounded mt-3 hover:bg-gray-800">
//         UPDATE PRODUCT
//       </button>
//     </form>
//   );
// };

// export default UpdateProduct;


// Add custom Sizes

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { assets } from "../assets/assets";

const UpdateProduct = ({ token }) => {
  const { id } = useParams();

  // IMAGE STATES
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);

  const [existingImages, setExistingImages] = useState([]);

  // PRODUCT FIELDS
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);

  // ✅ Colors
  const [colors, setColors] = useState([]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");

  // ✅ NEW: Size type selector
  const [sizeType, setSizeType] = useState("standard");

  // ✅ Standard sizes
  const [standardSizes, setStandardSizes] = useState({
    S: { multiplier: 0.9, stock: 0 },
    M: { multiplier: 1.0, stock: 0 },
    L: { multiplier: 1.1, stock: 0 },
    XL: { multiplier: 1.2, stock: 0 },
    XXL: { multiplier: 1.35, stock: 0 },
    "3XL": { multiplier: 1.5, stock: 0 }
  });
  const [enabledStandardSizes, setEnabledStandardSizes] = useState([]);

  // ✅ NEW: Inch-based sizes
  const [inchSizes, setInchSizes] = useState([]);
  const [newInchSize, setNewInchSize] = useState("");
  const [newInchMultiplier, setNewInchMultiplier] = useState(1.0);
  const [newInchStock, setNewInchStock] = useState(0);

  // FETCH PRODUCT DATA
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(backendUrl + "/api/product/single", {
          productId: id,
        });

        if (response.data.success) {
          const p = response.data.product;

          setName(p.name);
          setDescription(p.description);
          setDetailedDescription(p.detailedDescription);
          setPrice(p.price);
          setDiscountPrice(p.discountPrice || "");
          setCategory(p.category);
          setSubCategory(p.subCategory);
          setBestseller(p.bestseller);
          setExistingImages(p.image);

          // ✅ Load colors
          if (p.color && p.color.length > 0) {
            const formattedColors = p.color.map(colorItem => {
              if (typeof colorItem === 'string') {
                return { name: colorItem, hex: '#808080' };
              }
              return { name: colorItem.name, hex: colorItem.hex };
            });
            setColors(formattedColors);
          }

          // ✅ Load sizes (detect type and format)
          if (p.sizes && p.sizes.length > 0) {
            // Detect if standard or inch-based
            const firstSize = p.sizes[0];
            const isStandard = typeof firstSize === 'string' 
              ? ['S', 'M', 'L', 'XL', 'XXL', '3XL'].includes(firstSize)
              : ['S', 'M', 'L', 'XL', 'XXL', '3XL'].includes(firstSize.size);

            if (isStandard) {
              // Standard sizes format
              setSizeType("standard");
              const enabledList = [];
              const newSizeObj = { ...standardSizes };

              p.sizes.forEach(sizeItem => {
                const sizeLabel = typeof sizeItem === 'string' ? sizeItem : sizeItem.size;
                enabledList.push(sizeLabel);
                newSizeObj[sizeLabel] = {
                  multiplier: (typeof sizeItem === 'object' ? sizeItem.priceMultiplier : 1) || 1,
                  stock: (typeof sizeItem === 'object' ? sizeItem.stock : 0) || 0
                };
              });

              setEnabledStandardSizes(enabledList);
              setStandardSizes(newSizeObj);
            } else {
              // Inch-based sizes format
              setSizeType("inch");
              const inchArray = p.sizes.map(sizeItem => ({
                size: typeof sizeItem === 'string' ? sizeItem : sizeItem.size,
                multiplier: (typeof sizeItem === 'object' ? sizeItem.priceMultiplier : 1) || 1,
                stock: (typeof sizeItem === 'object' ? sizeItem.stock : 0) || 0
              }));
              setInchSizes(inchArray);
            }
          }
        }
      } catch (error) {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Color handlers
  const handleAddColor = () => {
    if (!newColorName.trim()) {
      toast.error("Please enter color name");
      return;
    }

    if (colors.some(c => c.name.toLowerCase() === newColorName.toLowerCase())) {
      toast.error("This color already exists");
      return;
    }

    setColors([...colors, { name: newColorName, hex: newColorHex }]);
    setNewColorName("");
    setNewColorHex("#000000");
    toast.success("Color added!");
  };

  const handleRemoveColor = (colorName) => {
    setColors(colors.filter(c => c.name !== colorName));
  };

  // ✅ Standard size handlers
  const handleStandardSizeToggle = (sizeKey) => {
    setEnabledStandardSizes(prev =>
      prev.includes(sizeKey)
        ? prev.filter(s => s !== sizeKey)
        : [...prev, sizeKey]
    );
  };

  const handleStandardSizeMultiplierChange = (sizeKey, value) => {
    setStandardSizes(prev => ({
      ...prev,
      [sizeKey]: {
        ...prev[sizeKey],
        multiplier: parseFloat(value) || 1
      }
    }));
  };

  const handleStandardSizeStockChange = (sizeKey, value) => {
    setStandardSizes(prev => ({
      ...prev,
      [sizeKey]: {
        ...prev[sizeKey],
        stock: parseInt(value) || 0
      }
    }));
  };

  // ✅ Inch size handlers
  const handleAddInchSize = () => {
    if (!newInchSize.trim()) {
      toast.error("Please enter inch size");
      return;
    }

    if (inchSizes.some(s => s.size === newInchSize)) {
      toast.error("This inch size already exists");
      return;
    }

    setInchSizes([...inchSizes, {
      size: newInchSize,
      multiplier: newInchMultiplier,
      stock: newInchStock
    }]);

    setNewInchSize("");
    setNewInchMultiplier(1.0);
    setNewInchStock(0);
    toast.success("Inch size added!");
  };

  const handleRemoveInchSize = (sizeLabel) => {
    setInchSizes(inchSizes.filter(s => s.size !== sizeLabel));
  };

  const handleInchSizeMultiplierChange = (index, value) => {
    const updated = [...inchSizes];
    updated[index].multiplier = parseFloat(value) || 1;
    setInchSizes(updated);
  };

  const handleInchSizeStockChange = (index, value) => {
    const updated = [...inchSizes];
    updated[index].stock = parseInt(value) || 0;
    setInchSizes(updated);
  };

  // ✅ Format sizes for submission
  const formatSizesForSubmit = () => {
    if (sizeType === "standard") {
      return enabledStandardSizes.map(sizeKey => ({
        size: sizeKey,
        priceMultiplier: standardSizes[sizeKey].multiplier,
        stock: standardSizes[sizeKey].stock
      }));
    } else {
      return inchSizes.map(sizeObj => ({
        size: sizeObj.size,
        priceMultiplier: sizeObj.multiplier,
        stock: sizeObj.stock
      }));
    }
  };

  // UPDATE PRODUCT
  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      if (sizeType === "standard" && enabledStandardSizes.length === 0) {
        return toast.error("Please select at least one standard size");
      }

      if (sizeType === "inch" && inchSizes.length === 0) {
        return toast.error("Please add at least one inch-based size");
      }

      if (colors.length === 0) {
        return toast.error("Please add at least one color");
      }

      const formData = new FormData();

      formData.append("productId", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("detailedDescription", detailedDescription);
      formData.append("price", price);
      formData.append("discountPrice", discountPrice || "");
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      
      formData.append("sizes", JSON.stringify(formatSizesForSubmit()));
      formData.append("color", JSON.stringify(colors));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      if (image5) formData.append("image5", image5);

      const response = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed!");
    }
  };

  return (
    <form onSubmit={updateHandler} className="flex flex-col w-full gap-4">
      <h2 className="text-xl font-semibold mb-2">Update Product</h2>

      {/* EXISTING IMAGES */}
      <div>
        <p className="mb-2">Existing Images</p>
        <div className="flex gap-2 flex-wrap">
          {existingImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="w-24 h-24 rounded object-cover border"
            />
          ))}
        </div>
      </div>

      {/* UPLOAD NEW IMAGES */}
      <div>
        <p className="mb-2">Upload New Images</p>

        <div className="flex gap-4 flex-wrap">

          {[image1, image2, image3, image4, image5].map((img, index) => {
            const setter = [setImage1, setImage2, setImage3, setImage4, setImage5][index];
            const inputId = "updImage" + (index + 1);

            return (
              <label key={index} htmlFor={inputId} className="flex flex-col items-center">
                <img
                  className="cursor-pointer border-2 border-dashed rounded-lg w-24 h-24 object-cover hover:border-black transition"
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  alt=""
                />
                {img && (
                  <p className="text-xs mt-1 w-24 text-center truncate">
                    {img.name}
                  </p>
                )}
                <input
                  type="file"
                  id={inputId}
                  hidden
                  onChange={(e) => setter(e.target.files[0])}
                />
              </label>
            );
          })}

        </div>
      </div>

      {/* NAME */}
      <div className="w-full">
        <p>Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="w-full">
        <p>Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* DETAILED DESCRIPTION */}
      <div className="w-full">
        <p>Detailed Description</p>
        <ReactQuill
          theme="snow"
          value={detailedDescription}
          onChange={setDetailedDescription}
          className="bg-white max-w-[700px]"
          style={{ height: "250px", marginBottom: "40px" }}
        />
      </div>

      {/* CATEGORY */}
      <div>
        <p>Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border"
        >
          <option>Men</option>
          <option>Women</option>
          <option>Others</option>
        </select>
      </div>

      {/* SUBCATEGORY */}
      <div>
        <p>Sub Category</p>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="px-3 py-2 border"
        >
          {category === "Others" ? (
            <>
              <option>Chair Cover</option>
              <option>Cushion Cover</option>
              <option>Aprons</option>
              <option>Desk Mat</option>
              <option>Pillow</option>
            </>
          ) : (
            <>
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </>
          )}
        </select>
      </div>

      {/* PRICE */}
      <div>
        <p>Price (Base)</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2 border"
          required
        />
        <p className='text-xs text-gray-500 mt-1'>Base price before size multipliers</p>
      </div>

      {/* DISCOUNT PRICE */}
      <div>
        <p>Discount Price (optional)</p>
        <input
          type="number"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          className="px-3 py-2 border"
          placeholder="Enter discount price"
        />
      </div>

      {/* ✅ CUSTOM COLORS */}
      <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className='mb-4 font-medium text-gray-700'>Product Colors (Custom)</p>
        
        <div className="flex gap-2 mb-4 flex-wrap items-end">
          <div>
            <label className='text-sm text-gray-600'>Color Name</label>
            <input
              type="text"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="e.g., Navy Blue"
              className='border p-2 rounded mt-1'
            />
          </div>

          <div>
            <label className='text-sm text-gray-600'>Color (Hex)</label>
            <input
              type="color"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              className='w-20 h-10 border rounded cursor-pointer mt-1'
              title={newColorHex}
            />
          </div>

          <button
            type="button"
            onClick={handleAddColor}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            + Add Color
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-white border border-gray-300 rounded"
            >
              <div
                className="w-8 h-8 rounded border-2 border-gray-300"
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
              <span className="text-sm font-medium">{color.name}</span>
              <span className="text-xs text-gray-500">({color.hex})</span>
              <button
                type="button"
                onClick={() => handleRemoveColor(color.name)}
                className='text-red-500 text-sm hover:underline ml-2'
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {colors.length === 0 && (
          <p className='text-sm text-gray-500 italic'>No colors added yet</p>
        )}
      </div>

      {/* ✅ SIZE TYPE SELECTOR */}
      <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className='mb-4 font-medium text-gray-700'>Size Type</p>
        
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="standard"
              checked={sizeType === "standard"}
              onChange={(e) => setSizeType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm">Standard Sizes (S, M, L, XL, XXL, 3XL)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="inch"
              checked={sizeType === "inch"}
              onChange={(e) => setSizeType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm">Inch-Based Sizes (14x14, 18x18, etc.)</span>
          </label>
        </div>
      </div>

      {/* ✅ STANDARD SIZES */}
      {sizeType === "standard" && (
        <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className='mb-4 font-medium text-gray-700'>Product Sizes (Standard)</p>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {Object.keys(standardSizes).map((sizeKey) => (
              <div key={sizeKey} className={`p-3 border-2 rounded-lg transition-all ${
                enabledStandardSizes.includes(sizeKey)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}>
                
                <div className='flex items-center gap-2 mb-3'>
                  <input
                    type="checkbox"
                    id={`size-${sizeKey}`}
                    checked={enabledStandardSizes.includes(sizeKey)}
                    onChange={() => handleStandardSizeToggle(sizeKey)}
                    className='w-5 h-5 cursor-pointer'
                  />
                  <label htmlFor={`size-${sizeKey}`} className='font-semibold text-lg cursor-pointer'>
                    Size {sizeKey}
                  </label>
                </div>

                {enabledStandardSizes.includes(sizeKey) && (
                  <div className='space-y-2'>
                    <div>
                      <label className='text-sm text-gray-600'>Price Multiplier</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="2"
                        value={standardSizes[sizeKey].multiplier}
                        onChange={(e) => handleStandardSizeMultiplierChange(sizeKey, e.target.value)}
                        className='w-full px-2 py-1 border border-gray-300 rounded'
                        placeholder='1.0'
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        Final price: {(parseFloat(price || 0) * standardSizes[sizeKey].multiplier).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <label className='text-sm text-gray-600'>Stock Quantity</label>
                      <input
                        type="number"
                        min="0"
                        value={standardSizes[sizeKey].stock}
                        onChange={(e) => handleStandardSizeStockChange(sizeKey, e.target.value)}
                        className='w-full px-2 py-1 border border-gray-300 rounded'
                        placeholder='0'
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {enabledStandardSizes.length > 0 && (
            <div className='mt-4 p-3 bg-blue-100 rounded-lg'>
              <p className='text-sm font-medium text-blue-900'>Selected Sizes:</p>
              <div className='flex gap-2 mt-2 flex-wrap'>
                {enabledStandardSizes.map(sizeKey => (
                  <span key={sizeKey} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
                    {sizeKey} × {standardSizes[sizeKey].multiplier}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ✅ INCH-BASED SIZES */}
      {sizeType === "inch" && (
        <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className='mb-4 font-medium text-gray-700'>Product Sizes (Inch-Based)</p>
          
          <div className="flex gap-2 mb-4 flex-wrap items-end">
            <div>
              <label className='text-sm text-gray-600'>Size (Inch)</label>
              <input
                type="text"
                value={newInchSize}
                onChange={(e) => setNewInchSize(e.target.value)}
                placeholder="e.g., 14x14, 18x18"
                className='border p-2 rounded mt-1'
              />
            </div>

            <div>
              <label className='text-sm text-gray-600'>Price Multiplier</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="2"
                value={newInchMultiplier}
                onChange={(e) => setNewInchMultiplier(parseFloat(e.target.value) || 1)}
                className='border p-2 rounded mt-1 w-24'
                placeholder='1.0'
              />
            </div>

            <div>
              <label className='text-sm text-gray-600'>Stock</label>
              <input
                type="number"
                min="0"
                value={newInchStock}
                onChange={(e) => setNewInchStock(parseInt(e.target.value) || 0)}
                className='border p-2 rounded mt-1 w-20'
                placeholder='0'
              />
            </div>

            <button
              type="button"
              onClick={handleAddInchSize}
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              + Add Size
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {inchSizes.map((sizeObj, index) => (
              <div
                key={index}
                className="p-3 border-2 border-gray-300 rounded-lg bg-white"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-semibold">{sizeObj.size} Inch</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInchSize(sizeObj.size)}
                    className='text-red-500 text-sm hover:underline'
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <label className='text-gray-600'>Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="2"
                      value={sizeObj.multiplier}
                      onChange={(e) => handleInchSizeMultiplierChange(index, e.target.value)}
                      className='w-full px-2 py-1 border border-gray-300 rounded'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      Final: {(parseFloat(price || 0) * sizeObj.multiplier).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <label className='text-gray-600'>Stock</label>
                    <input
                      type="number"
                      min="0"
                      value={sizeObj.stock}
                      onChange={(e) => handleInchSizeStockChange(index, e.target.value)}
                      className='w-full px-2 py-1 border border-gray-300 rounded'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {inchSizes.length === 0 && (
            <p className='text-sm text-gray-500 italic'>No inch-based sizes added yet</p>
          )}

          {inchSizes.length > 0 && (
            <div className='p-3 bg-blue-100 rounded-lg'>
              <p className='text-sm font-medium text-blue-900'>Added Sizes:</p>
              <div className='flex gap-2 mt-2 flex-wrap'>
                {inchSizes.map((sizeObj, idx) => (
                  <span key={idx} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
                    {sizeObj.size}" × {sizeObj.multiplier}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* BESTSELLER */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
          id="bestseller"
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button className="w-32 py-3 bg-black text-white rounded mt-3 hover:bg-gray-800">
        UPDATE PRODUCT
      </button>
    </form>
  );
};

export default UpdateProduct;