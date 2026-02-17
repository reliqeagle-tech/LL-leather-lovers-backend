// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";


// const Add = ({ token }) => {

//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)
//   const [image5, setImage5] = useState(false)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);
//   const [sizes, setSizes] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [detailedDescription, setDetailedDescription] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");


//   // ✅ Full Fallback Colors Array (with wine + many more)
//   const fallbackColors = [
//     { id: 'wine', name: 'Wine', hex: '#800000' },
//     { id: 'red', name: 'Red', hex: '#FF0000' },
//     { id: 'black', name: 'Black', hex: '#000000' },
//     { id: 'olive', name: 'Olive', hex: '#808000' },
//     { id: 'green', name: 'Green', hex: '#008000' },
//     { id: 'cognac', name: 'Cognac', hex: '#D2691E' },
//     { id: 'white', name: 'White', hex: '#FFFFFF' },
//     { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
//     { id: 'gray', name: 'Gray', hex: '#808080' },
//     { id: 'rose', name: 'Rose', hex: '#FF007F' },
//     { id: 'tobacco', name: 'Tobacco', hex: '#A0522D' },
//     { id: 'navy', name: 'Navy', hex: '#000080' },  // Extra
//     { id: 'blue', name: 'blue', hex: '#0000ff' },  // Extra
//     { id: 'beige', name: 'Beige', hex: '#F5F5DC' },  // Extra
//     { id: 'dark-wine', name: 'Dark-wine', hex: '#453333' },
//     { id: 'tobacco-dark', name: 'Dark-wine', hex: '#6e351a' },  // Extra
//   ];

//   // ✅ Dynamic Colors: Use selected colors state, but render from fallback
//   const availableColors = fallbackColors;

//   const handleColorSelect = (colorId) => {
//     setColors((prevColors) =>
//       prevColors.includes(colorId)
//         ? prevColors.filter((c) => c !== colorId)
//         : [...prevColors, colorId]
//     );
//   };



//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {

//       const formData = new FormData()

//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("detailedDescription", detailedDescription);
//       formData.append("price", price)
//       formData.append("discountPrice", discountPrice || "")
//       formData.append("category", category)
//       formData.append("subCategory", subCategory)
//       formData.append("bestseller", bestseller)
//       formData.append("sizes", JSON.stringify(sizes))
//       formData.append("color", JSON.stringify(colors));


//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)
//       image5 && formData.append("image5", image5)

//       // console.log("SENDING TO BACKEND:", detailedDescription);


//       const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

//       if (response.data.success) {
//         toast.success(response.data.message)
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setImage5(false)  // Added missing reset
//         setPrice('')
//         setDiscountPrice('') 
//         setColors([])  // Reset colors
//         setSizes([])  // Reset sizes
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>

//         <div className='flex gap-4 flex-wrap'>

//   {/* IMAGE 1 */}
//   <label htmlFor="image1" className="flex flex-col items-center">
//     <img
//       className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//       src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
//       alt=""
//     />
//     {/* Show filename */}
//     {image1 && (
//       <p className="text-xs mt-1 w-24 text-center truncate">{image1.name}</p>
//     )}
//     <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
//   </label>

//   {/* IMAGE 2 */}
//   <label htmlFor="image2" className="flex flex-col items-center">
//     <img
//       className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//       src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
//       alt=""
//     />
//     {image2 && (
//       <p className="text-xs mt-1 w-24 text-center truncate">{image2.name}</p>
//     )}
//     <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
//   </label>

//   {/* IMAGE 3 */}
//   <label htmlFor="image3" className="flex flex-col items-center">
//     <img
//       className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//       src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
//       alt=""
//     />
//     {image3 && (
//       <p className="text-xs mt-1 w-24 text-center truncate">{image3.name}</p>
//     )}
//     <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
//   </label>

//   {/* IMAGE 4 */}
//   <label htmlFor="image4" className="flex flex-col items-center">
//     <img
//       className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//       src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
//       alt=""
//     />
//     {image4 && (
//       <p className="text-xs mt-1 w-24 text-center truncate">{image4.name}</p>
//     )}
//     <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
//   </label>

//   {/* IMAGE 5 */}
//   <label htmlFor="image5" className="flex flex-col items-center">
//     <img
//       className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//       src={!image5 ? assets.upload_area : URL.createObjectURL(image5)}
//       alt=""
//     />
//     {image5 && (
//       <p className="text-xs mt-1 w-24 text-center truncate">{image5.name}</p>
//     )}
//     <input onChange={(e) => setImage5(e.target.files[0])} type="file" id="image5" hidden />
//   </label>

// </div>

//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product description</p>
//         <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
//       </div>

//       {/* ✅ Detailed Description (WYSIWYG Editor) */}
//       <div className="w-full mt-4">
//         <p className='mb-2 text-gray-700 font-medium'>Detailed Description</p>

//         <ReactQuill
//           theme="snow"
//           value={detailedDescription}
//           onChange={setDetailedDescription}
//           className="bg-white w-full max-w-[700px] rounded-md"
//           style={{ height: "250px", marginBottom: "40px" }}
//         />
//       </div>


//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

//         <div>
//           <p className='mb-2'>Product category</p>
//           <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             {/* <option value="Kids">Kids</option> */}
//             <option value="Others">Others</option>
//           </select>
//         </div>

//         {/* <div>
//           <p className='mb-2'>Sub category</p>
//           <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
//             <option value="Topwear">Topwear</option>
//             <option value="Bottomwear">Bottomwear</option>
//             <option value="Winterwear">Winterwear</option>
//           </select>
//         </div> */}

//         <div>
//           <p className='mb-2'>Sub category</p>

//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             className='w-full px-3 py-2'
//           >

//             {category === "Others" ? (
//               <>
//                 {/* <option value="Recliner Chair Headrest Cover">Recliner Chair Headrest Cover</option> */}
//                 <option value="Cushion Cover">Cushion Cover</option>
//                 <option value="Aprons">Aprons</option>
//                 <option value="Desk Mat">Desk Mat</option>
//                 {/* <option value="Keychains">Keychains</option> */}
//                 <option value="Pillow">Pillow</option>
//                 <option value="Chair Cover">Chair Cover</option>
//               </>
//             ) : (
//               <>
//                 <option value="Topwear">Topwear</option>
//                 <option value="Bottomwear">Bottomwear</option>
//                 <option value="Winterwear">Winterwear</option>
//               </>
//             )}

//           </select>
//         </div>


//         <div>
//           <p className='mb-2'>Product Price</p>
//           <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
//         </div>
//         <div className='w-full'>
//           <p className='mb-2'>Discount Price (optional)</p>
//           <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='20' />
//           {/* <p className='text-xs text-gray-500 mt-1'>Keep blank or 0 for no discount. Must be less than Product Price.</p> */}
//         </div>

//       </div>


//       {/* ✅ Updated Colors Section: Now shows wine + many more with proper styling */}
//       <label className="block mt-4 mb-2 text-gray-700">Product Colors</label>
//       <div className="flex flex-wrap gap-2">
//         {availableColors.map((colorObj) => {
//           const colorId = colorObj.id;
//           return (
//             <button
//               key={colorId}
//               type="button"
//               onClick={() => handleColorSelect(colorId)}
//               className={`w-10 h-10 rounded-md border transition-all duration-200 ${colors.includes(colorId)
//                   ? 'ring-2 ring-black scale-110'
//                   : 'hover:ring-1 hover:ring-gray-400 border-gray-300'
//                 }`}
//               style={{
//                 backgroundColor: colorObj.hex,
//               }}
//               title={colorObj.name}  // Tooltip for full name
//             />
//           );
//         })}
//       </div>

//       {/* Selected Colors Preview */}
//       <div className="mt-2 flex gap-2">
//         {colors.map((colorId) => {
//           const colorObj = availableColors.find(c => c.id === colorId);
//           return (
//             <span
//               key={colorId}
//               className="w-6 h-6 rounded-full border-2 border-gray-300"
//               style={{ backgroundColor: colorObj?.hex || colorId.toLowerCase() }}
//               title={colorObj?.name || colorId}
//             />
//           );
//         })}
//       </div>




//       <div>
//         <p className='mb-2'>Product Sizes</p>
//         <div className='flex gap-3'>
//           <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
//             <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
//             <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
//             <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
//             <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
//             <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
//           </div>

//           <div onClick={() => setSizes(prev => prev.includes("3XL") ? prev.filter(item => item !== "3XL") : [...prev, "3XL"])}>
//             <p className={`${sizes.includes("3XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>3XL</p>
//           </div>

//         </div>
//       </div>

//       <div className='flex gap-2 mt-2'>
//         <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button type="submit" className='w-28 py-3 mt-4 bg-black hover:bg-gray-800 text-white rounded-md'>ADD</button>

//     </form>
//   )
// }

// export default Add




// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";


// const Add = ({ token }) => {

//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)
//   const [image5, setImage5] = useState(false)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);
//   const [colors, setColors] = useState([]);
//   const [detailedDescription, setDetailedDescription] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");

//   // ✅ NEW: Size configuration with multipliers and stock
//   const [sizes, setSizes] = useState({
//     S: { multiplier: 0.9, stock: 0 },
//     M: { multiplier: 1.0, stock: 0 },
//     L: { multiplier: 1.1, stock: 0 },
//     XL: { multiplier: 1.2, stock: 0 },
//     XXL: { multiplier: 1.35, stock: 0 },
//     "3XL": { multiplier: 1.5, stock: 0 }
//   });
//   const [enabledSizes, setEnabledSizes] = useState([]);

//   // ✅ Full Fallback Colors Array
//   const fallbackColors = [
//     { id: 'wine', name: 'Wine', hex: '#800000' },
//     { id: 'red', name: 'Red', hex: '#FF0000' },
//     { id: 'black', name: 'Black', hex: '#000000' },
//     { id: 'olive', name: 'Olive', hex: '#808000' },
//     { id: 'green', name: 'Green', hex: '#008000' },
//     { id: 'cognac', name: 'Cognac', hex: '#D2691E' },
//     { id: 'white', name: 'White', hex: '#FFFFFF' },
//     { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
//     { id: 'gray', name: 'Gray', hex: '#808080' },
//     { id: 'rose', name: 'Rose', hex: '#FF007F' },
//     { id: 'tobacco', name: 'Tobacco', hex: '#A0522D' },
//     { id: 'navy', name: 'Navy', hex: '#000080' },
//     { id: 'blue', name: 'Blue', hex: '#0000ff' },
//     { id: 'beige', name: 'Beige', hex: '#F5F5DC' },
//     { id: 'dark-wine', name: 'Dark-wine', hex: '#453333' },
//     { id: 'tobacco-dark', name: 'Tobacco-Dark', hex: '#6e351a' },
//   ];

//   const availableColors = fallbackColors;

//   const handleColorSelect = (colorId) => {
//     setColors((prevColors) =>
//       prevColors.includes(colorId)
//         ? prevColors.filter((c) => c !== colorId)
//         : [...prevColors, colorId]
//     );
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

//   // ✅ NEW: Convert sizes object to array format for backend
//   const formatSizesForSubmit = () => {
//     return enabledSizes.map(sizeKey => ({
//       size: sizeKey,
//       priceMultiplier: sizes[sizeKey].multiplier,
//       stock: sizes[sizeKey].stock
//     }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       // Validation
//       if (enabledSizes.length === 0) {
//         return toast.error("Please select at least one size");
//       }

//       if (colors.length === 0) {
//         return toast.error("Please select at least one color");
//       }

//       const formData = new FormData()

//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("detailedDescription", detailedDescription)
//       formData.append("price", price)
//       formData.append("discountPrice", discountPrice || "")
//       formData.append("category", category)
//       formData.append("subCategory", subCategory)
//       formData.append("bestseller", bestseller)
      
//       // ✅ Send formatted sizes array
//       formData.append("sizes", JSON.stringify(formatSizesForSubmit()))
//       formData.append("color", JSON.stringify(colors))

//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)
//       image5 && formData.append("image5", image5)

//       const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

//       if (response.data.success) {
//         toast.success(response.data.message)
        
//         // Reset form
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setImage5(false)
//         setPrice('')
//         setDiscountPrice('')
//         setColors([])
//         setEnabledSizes([])
//         setSizes({
//           S: { multiplier: 0.9, stock: 0 },
//           M: { multiplier: 1.0, stock: 0 },
//           L: { multiplier: 1.1, stock: 0 },
//           XL: { multiplier: 1.2, stock: 0 },
//           XXL: { multiplier: 1.35, stock: 0 },
//           "3XL": { multiplier: 1.5, stock: 0 }
//         });
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>

//         <div className='flex gap-4 flex-wrap'>

//           {/* IMAGE 1 */}
//           <label htmlFor="image1" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
//               alt=""
//             />
//             {image1 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image1.name}</p>
//             )}
//             <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
//           </label>

//           {/* IMAGE 2 */}
//           <label htmlFor="image2" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
//               alt=""
//             />
//             {image2 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image2.name}</p>
//             )}
//             <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
//           </label>

//           {/* IMAGE 3 */}
//           <label htmlFor="image3" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
//               alt=""
//             />
//             {image3 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image3.name}</p>
//             )}
//             <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
//           </label>

//           {/* IMAGE 4 */}
//           <label htmlFor="image4" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
//               alt=""
//             />
//             {image4 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image4.name}</p>
//             )}
//             <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
//           </label>

//           {/* IMAGE 5 */}
//           <label htmlFor="image5" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image5 ? assets.upload_area : URL.createObjectURL(image5)}
//               alt=""
//             />
//             {image5 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image5.name}</p>
//             )}
//             <input onChange={(e) => setImage5(e.target.files[0])} type="file" id="image5" hidden />
//           </label>

//         </div>

//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product description</p>
//         <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
//       </div>

//       {/* ✅ Detailed Description (WYSIWYG Editor) */}
//       <div className="w-full mt-4">
//         <p className='mb-2 text-gray-700 font-medium'>Detailed Description</p>

//         <ReactQuill
//           theme="snow"
//           value={detailedDescription}
//           onChange={setDetailedDescription}
//           className="bg-white w-full max-w-[700px] rounded-md"
//           style={{ height: "250px", marginBottom: "40px" }}
//         />
//       </div>


//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

//         <div>
//           <p className='mb-2'>Product category</p>
//           <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Sub category</p>

//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             className='w-full px-3 py-2'
//           >

//             {category === "Others" ? (
//               <>
//                 <option value="Cushion Cover">Cushion Cover</option>
//                 <option value="Aprons">Aprons</option>
//                 <option value="Desk Mat">Desk Mat</option>
//                 <option value="Pillow">Pillow</option>
//                 <option value="Chair Cover">Chair Cover</option>
//               </>
//             ) : (
//               <>
//                 <option value="Topwear">Topwear</option>
//                 <option value="Bottomwear">Bottomwear</option>
//                 <option value="Winterwear">Winterwear</option>
//               </>
//             )}

//           </select>
//         </div>


//         <div>
//           <p className='mb-2'>Product Price (Base)</p>
//           <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='100' required />
//           <p className='text-xs text-gray-500 mt-1'>Base price before size multipliers</p>
//         </div>
//         <div className='w-full'>
//           <p className='mb-2'>Discount Price (optional)</p>
//           <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='0' />
//         </div>

//       </div>


//       {/* ✅ Colors Section */}
//       <label className="block mt-4 mb-2 text-gray-700 font-medium">Product Colors</label>
//       <div className="flex flex-wrap gap-2">
//         {availableColors.map((colorObj) => {
//           const colorId = colorObj.id;
//           return (
//             <button
//               key={colorId}
//               type="button"
//               onClick={() => handleColorSelect(colorId)}
//               className={`w-10 h-10 rounded-md border transition-all duration-200 ${colors.includes(colorId)
//                   ? 'ring-2 ring-black scale-110'
//                   : 'hover:ring-1 hover:ring-gray-400 border-gray-300'
//                 }`}
//               style={{
//                 backgroundColor: colorObj.hex,
//               }}
//               title={colorObj.name}
//             />
//           );
//         })}
//       </div>

//       {/* Selected Colors Preview */}
//       <div className="mt-2 flex gap-2">
//         {colors.map((colorId) => {
//           const colorObj = availableColors.find(c => c.id === colorId);
//           return (
//             <span
//               key={colorId}
//               className="w-6 h-6 rounded-full border-2 border-gray-300"
//               style={{ backgroundColor: colorObj?.hex || colorId.toLowerCase() }}
//               title={colorObj?.name || colorId}
//             />
//           );
//         })}
//       </div>


//       {/* ✅ NEW: Size Configuration with Multiplier & Stock */}
//       <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
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

//       <div className='flex gap-2 mt-2'>
//         <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button type="submit" className='w-28 py-3 mt-4 bg-black hover:bg-gray-800 text-white rounded-md'>ADD</button>

//     </form>
//   )
// }

// export default Add


// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Add = ({ token }) => {

//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)
//   const [image5, setImage5] = useState(false)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);
//   const [colors, setColors] = useState([]); // ✅ NEW: Array of {name, hex}
//   const [newColorName, setNewColorName] = useState("");
//   const [newColorHex, setNewColorHex] = useState("#000000");
//   const [detailedDescription, setDetailedDescription] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");

//   // ✅ NEW: Size configuration with multipliers and stock
//   const [sizes, setSizes] = useState({
//     S: { multiplier: 0.9, stock: 0 },
//     M: { multiplier: 1.0, stock: 0 },
//     L: { multiplier: 1.1, stock: 0 },
//     XL: { multiplier: 1.2, stock: 0 },
//     XXL: { multiplier: 1.35, stock: 0 },
//     "3XL": { multiplier: 1.5, stock: 0 }
//   });
//   const [enabledSizes, setEnabledSizes] = useState([]);

//   // ✅ NEW: Add custom color
//   const handleAddColor = () => {
//     if (!newColorName.trim()) {
//       toast.error("Please enter color name");
//       return;
//     }

//     const newColor = {
//       name: newColorName,
//       hex: newColorHex
//     };

//     // Check if color name already exists
//     if (colors.some(c => c.name.toLowerCase() === newColorName.toLowerCase())) {
//       toast.error("This color already exists");
//       return;
//     }

//     setColors([...colors, newColor]);
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

//   // ✅ NEW: Convert sizes object to array format for backend
//   const formatSizesForSubmit = () => {
//     return enabledSizes.map(sizeKey => ({
//       size: sizeKey,
//       priceMultiplier: sizes[sizeKey].multiplier,
//       stock: sizes[sizeKey].stock
//     }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       // Validation
//       if (enabledSizes.length === 0) {
//         return toast.error("Please select at least one size");
//       }

//       if (colors.length === 0) {
//         return toast.error("Please add at least one color");
//       }

//       const formData = new FormData()

//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("detailedDescription", detailedDescription)
//       formData.append("price", price)
//       formData.append("discountPrice", discountPrice || "")
//       formData.append("category", category)
//       formData.append("subCategory", subCategory)
//       formData.append("bestseller", bestseller)
      
//       // ✅ Send formatted sizes array
//       formData.append("sizes", JSON.stringify(formatSizesForSubmit()))
      
//       // ✅ Send colors as JSON array with name and hex
//       formData.append("color", JSON.stringify(colors))

//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)
//       image5 && formData.append("image5", image5)

//       const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

//       if (response.data.success) {
//         toast.success(response.data.message)
        
//         // Reset form
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setImage5(false)
//         setPrice('')
//         setDiscountPrice('')
//         setColors([])
//         setNewColorName("")
//         setNewColorHex("#000000")
//         setEnabledSizes([])
//         setSizes({
//           S: { multiplier: 0.9, stock: 0 },
//           M: { multiplier: 1.0, stock: 0 },
//           L: { multiplier: 1.1, stock: 0 },
//           XL: { multiplier: 1.2, stock: 0 },
//           XXL: { multiplier: 1.35, stock: 0 },
//           "3XL": { multiplier: 1.5, stock: 0 }
//         });
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>

//         <div className='flex gap-4 flex-wrap'>

//           {/* IMAGE 1 */}
//           <label htmlFor="image1" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
//               alt=""
//             />
//             {image1 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image1.name}</p>
//             )}
//             <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
//           </label>

//           {/* IMAGE 2 */}
//           <label htmlFor="image2" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
//               alt=""
//             />
//             {image2 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image2.name}</p>
//             )}
//             <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
//           </label>

//           {/* IMAGE 3 */}
//           <label htmlFor="image3" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
//               alt=""
//             />
//             {image3 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image3.name}</p>
//             )}
//             <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
//           </label>

//           {/* IMAGE 4 */}
//           <label htmlFor="image4" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
//               alt=""
//             />
//             {image4 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image4.name}</p>
//             )}
//             <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
//           </label>

//           {/* IMAGE 5 */}
//           <label htmlFor="image5" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image5 ? assets.upload_area : URL.createObjectURL(image5)}
//               alt=""
//             />
//             {image5 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image5.name}</p>
//             )}
//             <input onChange={(e) => setImage5(e.target.files[0])} type="file" id="image5" hidden />
//           </label>

//         </div>

//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product description</p>
//         <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
//       </div>

//       {/* ✅ Detailed Description (WYSIWYG Editor) */}
//       <div className="w-full mt-4">
//         <p className='mb-2 text-gray-700 font-medium'>Detailed Description</p>

//         <ReactQuill
//           theme="snow"
//           value={detailedDescription}
//           onChange={setDetailedDescription}
//           className="bg-white w-full max-w-[700px] rounded-md"
//           style={{ height: "250px", marginBottom: "40px" }}
//         />
//       </div>


//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

//         <div>
//           <p className='mb-2'>Product category</p>
//           <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Sub category</p>

//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             className='w-full px-3 py-2'
//           >

//             {category === "Others" ? (
//               <>
//                 <option value="Cushion Cover">Cushion Cover</option>
//                 <option value="Aprons">Aprons</option>
//                 <option value="Desk Mat">Desk Mat</option>
//                 <option value="Pillow">Pillow</option>
//                 <option value="Chair Cover">Chair Cover</option>
//               </>
//             ) : (
//               <>
//                 <option value="Topwear">Topwear</option>
//                 <option value="Bottomwear">Bottomwear</option>
//                 <option value="Winterwear">Winterwear</option>
//               </>
//             )}

//           </select>
//         </div>


//         <div>
//           <p className='mb-2'>Product Price (Base)</p>
//           <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='100' required />
//           <p className='text-xs text-gray-500 mt-1'>Base price before size multipliers</p>
//         </div>
//         <div className='w-full'>
//           <p className='mb-2'>Discount Price (optional)</p>
//           <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='0' />
//         </div>

//       </div>


//       {/* ✅ NEW: Custom Color System */}
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


//       {/* ✅ NEW: Size Configuration with Multiplier & Stock */}
//       <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
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

//       <div className='flex gap-2 mt-2'>
//         <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button type="submit" className='w-28 py-3 mt-4 bg-black hover:bg-gray-800 text-white rounded-md'>ADD</button>

//     </form>
//   )
// }

// export default Add



// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Add = ({ token }) => {

//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)
//   const [image5, setImage5] = useState(false)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);
//   const [colors, setColors] = useState([]);
//   const [newColorName, setNewColorName] = useState("");
//   const [newColorHex, setNewColorHex] = useState("#000000");
//   const [detailedDescription, setDetailedDescription] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");

//   // ✅ NEW: Size type selector (Standard or Inch-based)
//   const [sizeType, setSizeType] = useState("standard"); // "standard" or "inch"

//   // ✅ Standard sizes (S, M, L, XL, XXL, 3XL)
//   const [standardSizes, setStandardSizes] = useState({
//     S: { multiplier: 0.9, stock: 0 },
//     M: { multiplier: 1.0, stock: 0 },
//     L: { multiplier: 1.1, stock: 0 },
//     XL: { multiplier: 1.2, stock: 0 },
//     XXL: { multiplier: 1.35, stock: 0 },
//     "3XL": { multiplier: 1.5, stock: 0 }
//   });
//   const [enabledStandardSizes, setEnabledStandardSizes] = useState([]);

//   // ✅ NEW: Inch-based sizes
//   const [inchSizes, setInchSizes] = useState([]);
//   const [newInchSize, setNewInchSize] = useState("");
//   const [newInchMultiplier, setNewInchMultiplier] = useState(1.0);
//   const [newInchStock, setNewInchStock] = useState(0);

//   // ✅ NEW: Add custom color
//   const handleAddColor = () => {
//     if (!newColorName.trim()) {
//       toast.error("Please enter color name");
//       return;
//     }

//     const newColor = {
//       name: newColorName,
//       hex: newColorHex
//     };

//     if (colors.some(c => c.name.toLowerCase() === newColorName.toLowerCase())) {
//       toast.error("This color already exists");
//       return;
//     }

//     setColors([...colors, newColor]);
//     setNewColorName("");
//     setNewColorHex("#000000");
//     toast.success("Color added!");
//   };

//   // ✅ NEW: Remove color
//   const handleRemoveColor = (colorName) => {
//     setColors(colors.filter(c => c.name !== colorName));
//   };

//   // ✅ Standard size handlers
//   const handleStandardSizeToggle = (sizeKey) => {
//     setEnabledStandardSizes(prev =>
//       prev.includes(sizeKey)
//         ? prev.filter(s => s !== sizeKey)
//         : [...prev, sizeKey]
//     );
//   };

//   const handleStandardSizeMultiplierChange = (sizeKey, value) => {
//     setStandardSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         multiplier: parseFloat(value) || 1
//       }
//     }));
//   };

//   const handleStandardSizeStockChange = (sizeKey, value) => {
//     setStandardSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         stock: parseInt(value) || 0
//       }
//     }));
//   };

//   // ✅ NEW: Inch size handlers
//   const handleAddInchSize = () => {
//     if (!newInchSize.trim()) {
//       toast.error("Please enter inch size (e.g., 14x14, 18x18)");
//       return;
//     }

//     if (inchSizes.some(s => s.size === newInchSize)) {
//       toast.error("This inch size already exists");
//       return;
//     }

//     setInchSizes([...inchSizes, {
//       size: newInchSize,
//       multiplier: newInchMultiplier,
//       stock: newInchStock
//     }]);

//     setNewInchSize("");
//     setNewInchMultiplier(1.0);
//     setNewInchStock(0);
//     toast.success("Inch size added!");
//   };

//   const handleRemoveInchSize = (sizeLabel) => {
//     setInchSizes(inchSizes.filter(s => s.size !== sizeLabel));
//   };

//   const handleInchSizeMultiplierChange = (index, value) => {
//     const updated = [...inchSizes];
//     updated[index].multiplier = parseFloat(value) || 1;
//     setInchSizes(updated);
//   };

//   const handleInchSizeStockChange = (index, value) => {
//     const updated = [...inchSizes];
//     updated[index].stock = parseInt(value) || 0;
//     setInchSizes(updated);
//   };

//   // ✅ NEW: Format sizes for backend based on type
//   const formatSizesForSubmit = () => {
//     if (sizeType === "standard") {
//       return enabledStandardSizes.map(sizeKey => ({
//         size: sizeKey,
//         priceMultiplier: standardSizes[sizeKey].multiplier,
//         stock: standardSizes[sizeKey].stock
//       }));
//     } else {
//       return inchSizes.map(sizeObj => ({
//         size: sizeObj.size, // e.g., "14x14 Inch"
//         priceMultiplier: sizeObj.multiplier,
//         stock: sizeObj.stock
//       }));
//     }
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       // Validation
//       if (sizeType === "standard" && enabledStandardSizes.length === 0) {
//         return toast.error("Please select at least one standard size");
//       }

//       if (sizeType === "inch" && inchSizes.length === 0) {
//         return toast.error("Please add at least one inch-based size");
//       }

//       if (colors.length === 0) {
//         return toast.error("Please add at least one color");
//       }

//       const formData = new FormData()

//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("detailedDescription", detailedDescription)
//       formData.append("price", price)
//       formData.append("discountPrice", discountPrice || "")
//       formData.append("category", category)
//       formData.append("subCategory", subCategory)
//       formData.append("bestseller", bestseller)
      
//       // ✅ Send formatted sizes
//       formData.append("sizes", JSON.stringify(formatSizesForSubmit()))
//       formData.append("color", JSON.stringify(colors))

//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)
//       image5 && formData.append("image5", image5)

//       const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

//       if (response.data.success) {
//         toast.success(response.data.message)
        
//         // Reset form
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setImage5(false)
//         setPrice('')
//         setDiscountPrice('')
//         setColors([])
//         setNewColorName("")
//         setNewColorHex("#000000")
//         setSizeType("standard")
//         setEnabledStandardSizes([])
//         setStandardSizes({
//           S: { multiplier: 0.9, stock: 0 },
//           M: { multiplier: 1.0, stock: 0 },
//           L: { multiplier: 1.1, stock: 0 },
//           XL: { multiplier: 1.2, stock: 0 },
//           XXL: { multiplier: 1.35, stock: 0 },
//           "3XL": { multiplier: 1.5, stock: 0 }
//         })
//         setInchSizes([])
//         setNewInchSize("")
//         setNewInchMultiplier(1.0)
//         setNewInchStock(0)
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>

//         <div className='flex gap-4 flex-wrap'>

//           {/* IMAGE 1 */}
//           <label htmlFor="image1" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
//               alt=""
//             />
//             {image1 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image1.name}</p>
//             )}
//             <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
//           </label>

//           {/* IMAGE 2 */}
//           <label htmlFor="image2" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
//               alt=""
//             />
//             {image2 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image2.name}</p>
//             )}
//             <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
//           </label>

//           {/* IMAGE 3 */}
//           <label htmlFor="image3" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
//               alt=""
//             />
//             {image3 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image3.name}</p>
//             )}
//             <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
//           </label>

//           {/* IMAGE 4 */}
//           <label htmlFor="image4" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
//               alt=""
//             />
//             {image4 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image4.name}</p>
//             )}
//             <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
//           </label>

//           {/* IMAGE 5 */}
//           <label htmlFor="image5" className="flex flex-col items-center">
//             <img
//               className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//               src={!image5 ? assets.upload_area : URL.createObjectURL(image5)}
//               alt=""
//             />
//             {image5 && (
//               <p className="text-xs mt-1 w-24 text-center truncate">{image5.name}</p>
//             )}
//             <input onChange={(e) => setImage5(e.target.files[0])} type="file" id="image5" hidden />
//           </label>

//         </div>

//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Type here' required />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product description</p>
//         <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Write content here' required />
//       </div>

//       {/* ✅ Detailed Description (WYSIWYG Editor) */}
//       <div className="w-full mt-4">
//         <p className='mb-2 text-gray-700 font-medium'>Detailed Description</p>

//         <ReactQuill
//           theme="snow"
//           value={detailedDescription}
//           onChange={setDetailedDescription}
//           className="bg-white w-full max-w-[700px] rounded-md"
//           style={{ height: "250px", marginBottom: "40px" }}
//         />
//       </div>


//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

//         <div>
//           <p className='mb-2'>Product category</p>
//           <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border'>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Sub category</p>

//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             className='w-full px-3 py-2 border'
//           >

//             {category === "Others" ? (
//               <>
//                 <option value="Cushion Cover">Cushion Cover</option>
//                 <option value="Aprons">Aprons</option>
//                 <option value="Desk Mat">Desk Mat</option>
//                 <option value="Pillow">Pillow</option>
//                 <option value="Chair Cover">Chair Cover</option>
//               </>
//             ) : (
//               <>
//                 <option value="Topwear">Topwear</option>
//                 <option value="Bottomwear">Bottomwear</option>
//                 <option value="Winterwear">Winterwear</option>
//               </>
//             )}

//           </select>
//         </div>


//         <div>
//           <p className='mb-2'>Product Price (Base)</p>
//           <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px] border' type="Number" placeholder='100' required />
//           <p className='text-xs text-gray-500 mt-1'>Base price before size multipliers</p>
//         </div>
//         <div className='w-full'>
//           <p className='mb-2'>Discount Price (optional)</p>
//           <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} className='w-full px-3 py-2 sm:w-[120px] border' type="Number" placeholder='0' />
//         </div>

//       </div>


//       {/* ✅ NEW: Custom Color System */}
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


//       {/* ✅ NEW: Size Type Selector */}
//       <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <p className='mb-4 font-medium text-gray-700'>Size Type</p>
        
//         <div className="flex gap-4 mb-4">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="standard"
//               checked={sizeType === "standard"}
//               onChange={(e) => setSizeType(e.target.value)}
//               className="w-4 h-4"
//             />
//             <span className="text-sm">Standard Sizes (S, M, L, XL, XXL, 3XL)</span>
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="inch"
//               checked={sizeType === "inch"}
//               onChange={(e) => setSizeType(e.target.value)}
//               className="w-4 h-4"
//             />
//             <span className="text-sm">Inch-Based Sizes (14x14, 18x18, etc.)</span>
//           </label>
//         </div>
//       </div>


//       {/* ✅ STANDARD SIZES */}
//       {sizeType === "standard" && (
//         <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//           <p className='mb-4 font-medium text-gray-700'>Product Sizes (Standard)</p>
          
//           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//             {Object.keys(standardSizes).map((sizeKey) => (
//               <div key={sizeKey} className={`p-3 border-2 rounded-lg transition-all ${
//                 enabledStandardSizes.includes(sizeKey)
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 bg-white'
//               }`}>
                
//                 <div className='flex items-center gap-2 mb-3'>
//                   <input
//                     type="checkbox"
//                     id={`size-${sizeKey}`}
//                     checked={enabledStandardSizes.includes(sizeKey)}
//                     onChange={() => handleStandardSizeToggle(sizeKey)}
//                     className='w-5 h-5 cursor-pointer'
//                   />
//                   <label htmlFor={`size-${sizeKey}`} className='font-semibold text-lg cursor-pointer'>
//                     Size {sizeKey}
//                   </label>
//                 </div>

//                 {enabledStandardSizes.includes(sizeKey) && (
//                   <div className='space-y-2'>
//                     <div>
//                       <label className='text-sm text-gray-600'>Price Multiplier</label>
//                       <input
//                         type="number"
//                         step="0.1"
//                         min="0.5"
//                         max="2"
//                         value={standardSizes[sizeKey].multiplier}
//                         onChange={(e) => handleStandardSizeMultiplierChange(sizeKey, e.target.value)}
//                         className='w-full px-2 py-1 border border-gray-300 rounded'
//                         placeholder='1.0'
//                       />
//                       <p className='text-xs text-gray-500 mt-1'>
//                         Final price: {(parseFloat(price || 0) * standardSizes[sizeKey].multiplier).toFixed(2)}
//                       </p>
//                     </div>

//                     <div>
//                       <label className='text-sm text-gray-600'>Stock Quantity</label>
//                       <input
//                         type="number"
//                         min="0"
//                         value={standardSizes[sizeKey].stock}
//                         onChange={(e) => handleStandardSizeStockChange(sizeKey, e.target.value)}
//                         className='w-full px-2 py-1 border border-gray-300 rounded'
//                         placeholder='0'
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {enabledStandardSizes.length > 0 && (
//             <div className='mt-4 p-3 bg-blue-100 rounded-lg'>
//               <p className='text-sm font-medium text-blue-900'>Selected Sizes:</p>
//               <div className='flex gap-2 mt-2 flex-wrap'>
//                 {enabledStandardSizes.map(sizeKey => (
//                   <span key={sizeKey} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
//                     {sizeKey} × {standardSizes[sizeKey].multiplier}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}


//       {/* ✅ INCH-BASED SIZES */}
//       {sizeType === "inch" && (
//         <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//           <p className='mb-4 font-medium text-gray-700'>Product Sizes (Inch-Based)</p>
          
//           <div className="flex gap-2 mb-4 flex-wrap items-end">
//             <div>
//               <label className='text-sm text-gray-600'>Size (Inch)</label>
//               <input
//                 type="text"
//                 value={newInchSize}
//                 onChange={(e) => setNewInchSize(e.target.value)}
//                 placeholder="e.g., 14x14, 18x18, 17x36"
//                 className='border p-2 rounded mt-1'
//               />
//             </div>

//             <div>
//               <label className='text-sm text-gray-600'>Price Multiplier</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0.5"
//                 max="2"
//                 value={newInchMultiplier}
//                 onChange={(e) => setNewInchMultiplier(parseFloat(e.target.value) || 1)}
//                 className='border p-2 rounded mt-1 w-24'
//                 placeholder='1.0'
//               />
//             </div>

//             <div>
//               <label className='text-sm text-gray-600'>Stock</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={newInchStock}
//                 onChange={(e) => setNewInchStock(parseInt(e.target.value) || 0)}
//                 className='border p-2 rounded mt-1 w-20'
//                 placeholder='0'
//               />
//             </div>

//             <button
//               type="button"
//               onClick={handleAddInchSize}
//               className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
//             >
//               + Add Size
//             </button>
//           </div>

//           {/* Display added inch sizes */}
//           <div className="flex flex-wrap gap-3 mb-4">
//             {inchSizes.map((sizeObj, index) => (
//               <div
//                 key={index}
//                 className="p-3 border-2 border-gray-300 rounded-lg bg-white"
//               >
//                 <div className="flex items-center justify-between gap-3 mb-2">
//                   <span className="font-semibold">{sizeObj.size} Inch</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveInchSize(sizeObj.size)}
//                     className='text-red-500 text-sm hover:underline'
//                   >
//                     Remove
//                   </button>
//                 </div>

//                 <div className="space-y-2 text-sm">
//                   <div>
//                     <label className='text-gray-600'>Multiplier</label>
//                     <input
//                       type="number"
//                       step="0.1"
//                       min="0.5"
//                       max="2"
//                       value={sizeObj.multiplier}
//                       onChange={(e) => handleInchSizeMultiplierChange(index, e.target.value)}
//                       className='w-full px-2 py-1 border border-gray-300 rounded'
//                     />
//                     <p className='text-xs text-gray-500 mt-1'>
//                       Final: {(parseFloat(price || 0) * sizeObj.multiplier).toFixed(2)}
//                     </p>
//                   </div>

//                   <div>
//                     <label className='text-gray-600'>Stock</label>
//                     <input
//                       type="number"
//                       min="0"
//                       value={sizeObj.stock}
//                       onChange={(e) => handleInchSizeStockChange(index, e.target.value)}
//                       className='w-full px-2 py-1 border border-gray-300 rounded'
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {inchSizes.length === 0 && (
//             <p className='text-sm text-gray-500 italic'>No inch-based sizes added yet</p>
//           )}

//           {inchSizes.length > 0 && (
//             <div className='p-3 bg-blue-100 rounded-lg'>
//               <p className='text-sm font-medium text-blue-900'>Added Sizes:</p>
//               <div className='flex gap-2 mt-2 flex-wrap'>
//                 {inchSizes.map((sizeObj, idx) => (
//                   <span key={idx} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
//                     {sizeObj.size}" × {sizeObj.multiplier}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <div className='flex gap-2 mt-2'>
//         <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button type="submit" className='w-28 py-3 mt-4 bg-black hover:bg-gray-800 text-white rounded-md'>ADD</button>

//     </form>
//   )
// }

// export default Add







// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Add = ({ token }) => {

//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)
//   const [image5, setImage5] = useState(false)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);
//   const [detailedDescription, setDetailedDescription] = useState("");
//   const [discountPrice, setDiscountPrice] = useState("");

//   // ✅ Colors with flexible input
//   const [colors, setColors] = useState([]);
//   const [newColorName, setNewColorName] = useState("");
//   const [newColorHex, setNewColorHex] = useState("#000000");
//   const [colorInputMode, setColorInputMode] = useState("both"); // "both", "nameOnly", "hexOnly"

//   // ✅ Size type selector
//   const [sizeType, setSizeType] = useState("standard");

//   // ✅ Standard sizes with custom price option
//   const [standardSizes, setStandardSizes] = useState({
//     XS: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
//     S: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
//     M: { multiplier: 1.0, stock: 0, customPrice: "", useCustomPrice: false },
//     L: { multiplier: 1.1, stock: 0, customPrice: "", useCustomPrice: false },
//     XL: { multiplier: 1.2, stock: 0, customPrice: "", useCustomPrice: false },
//     XXL: { multiplier: 1.35, stock: 0, customPrice: "", useCustomPrice: false },
//     "3XL": { multiplier: 1.5, stock: 0, customPrice: "", useCustomPrice: false }
//   });
//   const [enabledStandardSizes, setEnabledStandardSizes] = useState([]);

//   // ✅ Inch-based sizes with custom price option
//   const [inchSizes, setInchSizes] = useState([]);
//   const [newInchSize, setNewInchSize] = useState("");
//   const [newInchMultiplier, setNewInchMultiplier] = useState(1.0);
//   const [newInchStock, setNewInchStock] = useState(0);
//   const [newInchCustomPrice, setNewInchCustomPrice] = useState("");
//   const [newInchUseCustomPrice, setNewInchUseCustomPrice] = useState(false);

//   // ✅ Color handlers
//   const handleAddColor = () => {
//     // Validate based on input mode
//     if (colorInputMode === "both") {
//       if (!newColorName.trim()) {
//         toast.error("Please enter color name");
//         return;
//       }
//       if (!newColorHex) {
//         toast.error("Please select a color");
//         return;
//       }
//     } else if (colorInputMode === "nameOnly") {
//       if (!newColorName.trim()) {
//         toast.error("Please enter color name");
//         return;
//       }
//     } else if (colorInputMode === "hexOnly") {
//       if (!newColorHex) {
//         toast.error("Please select a color");
//         return;
//       }
//     }

//     const colorToAdd = {
//       name: newColorName.trim() || `Color-${colors.length + 1}`,
//       hex: newColorHex || '#808080'
//     };

//     if (colors.some(c => c.name.toLowerCase() === colorToAdd.name.toLowerCase())) {
//       toast.error("This color name already exists");
//       return;
//     }

//     setColors([...colors, colorToAdd]);
//     setNewColorName("");
//     setNewColorHex("#000000");
//     toast.success("Color added!");
//   };

//   const handleRemoveColor = (colorName) => {
//     setColors(colors.filter(c => c.name !== colorName));
//   };

//   const handleEditColor = (index, field, value) => {
//     const updated = [...colors];
//     updated[index][field] = value;
//     setColors(updated);
//   };

//   // ✅ Standard size handlers
//   const handleStandardSizeToggle = (sizeKey) => {
//     setEnabledStandardSizes(prev =>
//       prev.includes(sizeKey)
//         ? prev.filter(s => s !== sizeKey)
//         : [...prev, sizeKey]
//     );
//   };

//   const handleStandardSizeMultiplierChange = (sizeKey, value) => {
//     setStandardSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         multiplier: parseFloat(value) || 1
//       }
//     }));
//   };

//   const handleStandardSizeStockChange = (sizeKey, value) => {
//     setStandardSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         stock: parseInt(value) || 0
//       }
//     }));
//   };

//   const handleStandardSizeCustomPriceChange = (sizeKey, value) => {
//     setStandardSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         customPrice: value
//       }
//     }));
//   };

//   const handleStandardSizeToggleCustomPrice = (sizeKey) => {
//     setStandardSizes(prev => ({
//       ...prev,
//       [sizeKey]: {
//         ...prev[sizeKey],
//         useCustomPrice: !prev[sizeKey].useCustomPrice
//       }
//     }));
//   };

//   // ✅ Inch size handlers
//   const handleAddInchSize = () => {
//     if (!newInchSize.trim()) {
//       toast.error("Please enter inch size");
//       return;
//     }

//     if (inchSizes.some(s => s.size === newInchSize)) {
//       toast.error("This inch size already exists");
//       return;
//     }

//     setInchSizes([...inchSizes, {
//       size: newInchSize,
//       multiplier: newInchMultiplier,
//       stock: newInchStock,
//       customPrice: newInchCustomPrice,
//       useCustomPrice: newInchUseCustomPrice
//     }]);

//     setNewInchSize("");
//     setNewInchMultiplier(1.0);
//     setNewInchStock(0);
//     setNewInchCustomPrice("");
//     setNewInchUseCustomPrice(false);
//     toast.success("Inch size added!");
//   };

//   const handleRemoveInchSize = (sizeLabel) => {
//     setInchSizes(inchSizes.filter(s => s.size !== sizeLabel));
//   };

//   const handleInchSizeMultiplierChange = (index, value) => {
//     const updated = [...inchSizes];
//     updated[index].multiplier = parseFloat(value) || 1;
//     setInchSizes(updated);
//   };

//   const handleInchSizeStockChange = (index, value) => {
//     const updated = [...inchSizes];
//     updated[index].stock = parseInt(value) || 0;
//     setInchSizes(updated);
//   };

//   const handleInchSizeCustomPriceChange = (index, value) => {
//     const updated = [...inchSizes];
//     updated[index].customPrice = value;
//     setInchSizes(updated);
//   };

//   const handleInchSizeToggleCustomPrice = (index) => {
//     const updated = [...inchSizes];
//     updated[index].useCustomPrice = !updated[index].useCustomPrice;
//     setInchSizes(updated);
//   };

//   // ✅ Calculate final price
//   const calculateFinalPrice = (sizeData) => {
//     if (sizeData.useCustomPrice && sizeData.customPrice) {
//       return parseFloat(sizeData.customPrice);
//     }
//     return parseFloat(price || 0) * sizeData.multiplier;
//   };

//   // ✅ Format sizes for submission
//   const formatSizesForSubmit = () => {
//     if (sizeType === "standard") {
//       return enabledStandardSizes.map(sizeKey => ({
//         size: sizeKey,
//         priceMultiplier: standardSizes[sizeKey].multiplier,
//         stock: standardSizes[sizeKey].stock,
//         customPrice: standardSizes[sizeKey].customPrice,
//         useCustomPrice: standardSizes[sizeKey].useCustomPrice
//       }));
//     } else {
//       return inchSizes.map(sizeObj => ({
//         size: sizeObj.size,
//         priceMultiplier: sizeObj.multiplier,
//         stock: sizeObj.stock,
//         customPrice: sizeObj.customPrice,
//         useCustomPrice: sizeObj.useCustomPrice
//       }));
//     }
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       // Validation
//       if (sizeType === "standard" && enabledStandardSizes.length === 0) {
//         return toast.error("Please select at least one standard size");
//       }

//       if (sizeType === "inch" && inchSizes.length === 0) {
//         return toast.error("Please add at least one inch-based size");
//       }

//       if (colors.length === 0) {
//         return toast.error("Please add at least one color");
//       }

//       const formData = new FormData()

//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("detailedDescription", detailedDescription)
//       formData.append("price", price)
//       formData.append("discountPrice", discountPrice || "")
//       formData.append("category", category)
//       formData.append("subCategory", subCategory)
//       formData.append("bestseller", bestseller)
      
//       formData.append("sizes", JSON.stringify(formatSizesForSubmit()))
//       formData.append("color", JSON.stringify(colors))

//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)
//       image5 && formData.append("image5", image5)

//       const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

//       if (response.data.success) {
//         toast.success(response.data.message)
        
//         // Reset form
//         setName('')
//         setDescription('')
//         setDetailedDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setImage5(false)
//         setPrice('')
//         setDiscountPrice('')
//         setColors([])
//         setNewColorName("")
//         setNewColorHex("#000000")
//         setColorInputMode("both")
//         setSizeType("standard")
//         setEnabledStandardSizes([])
//         setStandardSizes({
//           XS: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
//           S: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
//           M: { multiplier: 1.0, stock: 0, customPrice: "", useCustomPrice: false },
//           L: { multiplier: 1.1, stock: 0, customPrice: "", useCustomPrice: false },
//           XL: { multiplier: 1.2, stock: 0, customPrice: "", useCustomPrice: false },
//           XXL: { multiplier: 1.35, stock: 0, customPrice: "", useCustomPrice: false },
//           "3XL": { multiplier: 1.5, stock: 0, customPrice: "", useCustomPrice: false }
//         })
//         setInchSizes([])
//         setNewInchSize("")
//         setNewInchMultiplier(1.0)
//         setNewInchStock(0)
//         setNewInchCustomPrice("")
//         setNewInchUseCustomPrice(false)
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>

//         <div className='flex gap-4 flex-wrap'>

//           {/* IMAGE UPLOADS */}
//           {[image1, image2, image3, image4, image5].map((img, index) => {
//             const setter = [setImage1, setImage2, setImage3, setImage4, setImage5][index];
//             const inputId = "image" + (index + 1);

//             return (
//               <label key={index} htmlFor={inputId} className="flex flex-col items-center">
//                 <img
//                   className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
//                   src={!img ? assets.upload_area : URL.createObjectURL(img)}
//                   alt=""
//                 />
//                 {img && (
//                   <p className="text-xs mt-1 w-24 text-center truncate">{img.name}</p>
//                 )}
//                 <input onChange={(e) => setter(e.target.files[0])} type="file" id={inputId} hidden />
//               </label>
//             );
//           })}

//         </div>
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Type here' required />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product description</p>
//         <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Write content here' required />
//       </div>

//       <div className="w-full mt-4">
//         <p className='mb-2 text-gray-700 font-medium'>Detailed Description</p>
//         <ReactQuill
//           theme="snow"
//           value={detailedDescription}
//           onChange={setDetailedDescription}
//           className="bg-white w-full max-w-[700px] rounded-md"
//           style={{ height: "250px", marginBottom: "40px" }}
//         />
//       </div>

//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
//         <div>
//           <p className='mb-2'>Product category</p>
//           <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border'>
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Sub category</p>
//           <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 border'>
//             {category === "Others" ? (
//               <>
//                 <option value="Cushion Cover">Cushion Cover</option>
//                 <option value="Aprons">Aprons</option>
//                 <option value="Desk Mat">Desk Mat</option>
//                 <option value="Pillow">Pillow</option>
//                 <option value="Chair Cover">Chair Cover</option>
//               </>
//             ) : (
//               <>
//                 <option value="Topwear">Topwear</option>
//                 <option value="Bottomwear">Bottomwear</option>
//                 <option value="Winterwear">Winterwear</option>
//               </>
//             )}
//           </select>
//         </div>

//         <div>
//           <p className='mb-2'>Product Price (Base)</p>
//           <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px] border' type="Number" placeholder='100' required />
//           <p className='text-xs text-gray-500 mt-1'>Base price (or use custom per size)</p>
//         </div>

//         <div className='w-full'>
//           <p className='mb-2'>Discount Price (optional)</p>
//           <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} className='w-full px-3 py-2 sm:w-[120px] border' type="Number" placeholder='0' />
//         </div>
//       </div>

//       {/* ✅ FLEXIBLE COLOR SYSTEM */}
//       <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <p className='mb-4 font-medium text-gray-700'>Product Colors (Flexible)</p>
        
//         {/* Color Input Mode Selector */}
//         <div className="mb-4 p-3 bg-white rounded-lg border border-gray-300">
//           <p className='text-sm font-medium text-gray-700 mb-2'>Color Input Mode:</p>
//           <div className="flex gap-3 flex-wrap">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 value="both"
//                 checked={colorInputMode === "both"}
//                 onChange={(e) => setColorInputMode(e.target.value)}
//                 className="w-4 h-4"
//               />
//               <span className="text-sm">Name + Hex</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 value="nameOnly"
//                 checked={colorInputMode === "nameOnly"}
//                 onChange={(e) => setColorInputMode(e.target.value)}
//                 className="w-4 h-4"
//               />
//               <span className="text-sm">Name Only</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 value="hexOnly"
//                 checked={colorInputMode === "hexOnly"}
//                 onChange={(e) => setColorInputMode(e.target.value)}
//                 className="w-4 h-4"
//               />
//               <span className="text-sm">Hex Only</span>
//             </label>
//           </div>
//         </div>

//         {/* Add Color Section */}
//         <div className="flex gap-2 mb-4 flex-wrap items-end p-3 bg-white rounded-lg border border-gray-300">
//           {(colorInputMode === "both" || colorInputMode === "nameOnly") && (
//             <div>
//               <label className='text-sm text-gray-600 font-medium'>Color Name</label>
//               <input
//                 type="text"
//                 value={newColorName}
//                 onChange={(e) => setNewColorName(e.target.value)}
//                 placeholder="e.g., Navy Blue, Red"
//                 className='border p-2 rounded mt-1 w-48'
//               />
//             </div>
//           )}

//           {(colorInputMode === "both" || colorInputMode === "hexOnly") && (
//             <div>
//               <label className='text-sm text-gray-600 font-medium'>Color Picker</label>
//               <div className="flex gap-2 items-center mt-1">
//                 <input
//                   type="color"
//                   value={newColorHex}
//                   onChange={(e) => setNewColorHex(e.target.value)}
//                   className='w-20 h-10 border rounded cursor-pointer'
//                   title={newColorHex}
//                 />
//                 <input
//                   type="text"
//                   value={newColorHex}
//                   onChange={(e) => setNewColorHex(e.target.value)}
//                   placeholder="#000000"
//                   className='border p-2 rounded w-28'
//                 />
//               </div>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={handleAddColor}
//             className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
//           >
//             + Add Color
//           </button>
//         </div>

//         {/* Display Added Colors */}
//         <div className="space-y-2">
//           <p className='text-sm font-medium text-gray-700'>Added Colors ({colors.length}):</p>
          
//           {colors.length === 0 ? (
//             <p className='text-sm text-gray-500 italic p-3 bg-white rounded border border-gray-200'>
//               No colors added yet
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {colors.map((color, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-400 transition"
//                 >
//                   <div className="flex-shrink-0">
//                     <input
//                       type="color"
//                       value={color.hex}
//                       onChange={(e) => handleEditColor(index, 'hex', e.target.value)}
//                       className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
//                       title="Click to edit"
//                     />
//                   </div>

//                   <div className="flex-grow">
//                     <input
//                       type="text"
//                       value={color.name}
//                       onChange={(e) => handleEditColor(index, 'name', e.target.value)}
//                       className="w-full font-medium text-sm border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1 py-0.5"
//                     />
//                     <input
//                       type="text"
//                       value={color.hex}
//                       onChange={(e) => handleEditColor(index, 'hex', e.target.value)}
//                       className="w-full text-xs text-gray-500 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1 py-0.5 mt-1"
//                     />
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => handleRemoveColor(color.name)}
//                     className='flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition'
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Quick Presets */}
//         <div className="mt-4 p-3 bg-white rounded-lg border border-gray-300">
//           <p className='text-sm font-medium text-gray-700 mb-2'>Quick Add:</p>
//           <div className="flex gap-2 flex-wrap">
//             {[
//               { name: "Black", hex: "#000000" },
//               { name: "White", hex: "#FFFFFF" },
//               { name: "Red", hex: "#FF0000" },
//               { name: "Blue", hex: "#0000FF" },
//               { name: "Green", hex: "#00FF00" },
//               { name: "Yellow", hex: "#FFFF00" },
//               { name: "Navy Blue", hex: "#000080" },
//               { name: "Brown", hex: "#8B4513" },
//               { name: "Pink", hex: "#FFC0CB" },
//               { name: "Purple", hex: "#800080" },
//               { name: "Orange", hex: "#FFA500" },
//               { name: "Gray", hex: "#808080" }
//             ].map((preset, idx) => (
//               <button
//                 key={idx}
//                 type="button"
//                 onClick={() => {
//                   if (!colors.some(c => c.name.toLowerCase() === preset.name.toLowerCase())) {
//                     setColors([...colors, preset]);
//                     toast.success(`${preset.name} added!`);
//                   } else {
//                     toast.info(`${preset.name} already exists`);
//                   }
//                 }}
//                 className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50 transition text-sm"
//               >
//                 <div
//                   className="w-4 h-4 rounded border border-gray-300"
//                   style={{ backgroundColor: preset.hex }}
//                 />
//                 <span>{preset.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ✅ SIZE TYPE SELECTOR */}
//       <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <p className='mb-4 font-medium text-gray-700'>Size Type</p>
        
//         <div className="flex gap-4 mb-4">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="standard"
//               checked={sizeType === "standard"}
//               onChange={(e) => setSizeType(e.target.value)}
//               className="w-4 h-4"
//             />
//             <span className="text-sm">Standard Sizes (XS, S, M, L, XL, XXL, 3XL)</span>
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               value="inch"
//               checked={sizeType === "inch"}
//               onChange={(e) => setSizeType(e.target.value)}
//               className="w-4 h-4"
//             />
//             <span className="text-sm">Inch-Based Sizes (14x14, 18x18, etc.)</span>
//           </label>
//         </div>
//       </div>

//       {/* ✅ STANDARD SIZES WITH CUSTOM PRICE */}
//       {sizeType === "standard" && (
//         <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
//           <p className='mb-4 font-medium text-gray-700'>Product Sizes (Standard)</p>
          
//           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//             {Object.keys(standardSizes).map((sizeKey) => (
//               <div key={sizeKey} className={`p-3 border-2 rounded-lg transition-all ${
//                 enabledStandardSizes.includes(sizeKey)
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 bg-white'
//               }`}>
                
//                 <div className='flex items-center gap-2 mb-3'>
//                   <input
//                     type="checkbox"
//                     id={`size-${sizeKey}`}
//                     checked={enabledStandardSizes.includes(sizeKey)}
//                     onChange={() => handleStandardSizeToggle(sizeKey)}
//                     className='w-5 h-5 cursor-pointer'
//                   />
//                   <label htmlFor={`size-${sizeKey}`} className='font-semibold text-lg cursor-pointer'>
//                     Size {sizeKey}
//                   </label>
//                 </div>

//                 {enabledStandardSizes.includes(sizeKey) && (
//                   <div className='space-y-3'>
//                     <div className='flex items-center gap-2 p-2 bg-white rounded border'>
//                       <input
//                         type="checkbox"
//                         id={`custom-price-${sizeKey}`}
//                         checked={standardSizes[sizeKey].useCustomPrice}
//                         onChange={() => handleStandardSizeToggleCustomPrice(sizeKey)}
//                         className='w-4 h-4 cursor-pointer'
//                       />
//                       <label htmlFor={`custom-price-${sizeKey}`} className='text-sm font-medium cursor-pointer'>
//                         Use Custom Price
//                       </label>
//                     </div>

//                     {standardSizes[sizeKey].useCustomPrice ? (
//                       <div>
//                         <label className='text-sm text-gray-600 font-medium'>Custom Price (₹)</label>
//                         <input
//                           type="number"
//                           step="0.01"
//                           min="0"
//                           value={standardSizes[sizeKey].customPrice}
//                           onChange={(e) => handleStandardSizeCustomPriceChange(sizeKey, e.target.value)}
//                           className='w-full px-2 py-1 border border-gray-300 rounded'
//                           placeholder='Enter custom price'
//                         />
//                         <p className='text-xs text-green-600 mt-1 font-medium'>
//                           Final: ₹{standardSizes[sizeKey].customPrice || '0'}
//                         </p>
//                       </div>
//                     ) : (
//                       <div>
//                         <label className='text-sm text-gray-600'>Price Multiplier</label>
//                         <input
//                           type="number"
//                           step="0.1"
//                           min="0.5"
//                           max="2"
//                           value={standardSizes[sizeKey].multiplier}
//                           onChange={(e) => handleStandardSizeMultiplierChange(sizeKey, e.target.value)}
//                           className='w-full px-2 py-1 border border-gray-300 rounded'
//                         />
//                         <p className='text-xs text-gray-500 mt-1'>
//                           Final: ₹{calculateFinalPrice(standardSizes[sizeKey]).toFixed(2)}
//                         </p>
//                       </div>
//                     )}

//                     <div>
//                       <label className='text-sm text-gray-600'>Stock</label>
//                       <input
//                         type="number"
//                         min="0"
//                         value={standardSizes[sizeKey].stock}
//                         onChange={(e) => handleStandardSizeStockChange(sizeKey, e.target.value)}
//                         className='w-full px-2 py-1 border border-gray-300 rounded'
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {enabledStandardSizes.length > 0 && (
//             <div className='mt-4 p-3 bg-blue-100 rounded-lg'>
//               <p className='text-sm font-medium text-blue-900'>Selected Sizes:</p>
//               <div className='flex gap-2 mt-2 flex-wrap'>
//                 {enabledStandardSizes.map(sizeKey => (
//                   <span key={sizeKey} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
//                     {sizeKey} - ₹{calculateFinalPrice(standardSizes[sizeKey]).toFixed(2)}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ✅ INCH-BASED SIZES WITH CUSTOM PRICE */}
//       {sizeType === "inch" && (
//         <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
//           <p className='mb-4 font-medium text-gray-700'>Product Sizes (Inch-Based)</p>
          
//           <div className="flex gap-2 mb-4 flex-wrap items-end">
//             <div>
//               <label className='text-sm text-gray-600'>Size (Inch)</label>
//               <input
//                 type="text"
//                 value={newInchSize}
//                 onChange={(e) => setNewInchSize(e.target.value)}
//                 placeholder="e.g., 14x14"
//                 className='border p-2 rounded mt-1'
//               />
//             </div>

//             <div>
//               <label className='text-sm text-gray-600'>Stock</label>
//               <input
//                 type="number"
//                 min="0"
//                 value={newInchStock}
//                 onChange={(e) => setNewInchStock(parseInt(e.target.value) || 0)}
//                 className='border p-2 rounded mt-1 w-20'
//               />
//             </div>

//             <div className='flex items-center gap-2 p-2 border rounded bg-white'>
//               <input
//                 type="checkbox"
//                 id="new-inch-custom"
//                 checked={newInchUseCustomPrice}
//                 onChange={(e) => setNewInchUseCustomPrice(e.target.checked)}
//                 className='w-4 h-4 cursor-pointer'
//               />
//               <label htmlFor="new-inch-custom" className='text-sm cursor-pointer'>
//                 Custom Price
//               </label>
//             </div>

//             {newInchUseCustomPrice ? (
//               <div>
//                 <label className='text-sm text-gray-600'>Custom Price (₹)</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={newInchCustomPrice}
//                   onChange={(e) => setNewInchCustomPrice(e.target.value)}
//                   className='border p-2 rounded mt-1 w-28'
//                 />
//               </div>
//             ) : (
//               <div>
//                 <label className='text-sm text-gray-600'>Multiplier</label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   min="0.5"
//                   max="2"
//                   value={newInchMultiplier}
//                   onChange={(e) => setNewInchMultiplier(parseFloat(e.target.value) || 1)}
//                   className='border p-2 rounded mt-1 w-24'
//                 />
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={handleAddInchSize}
//               className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
//             >
//               + Add Size
//             </button>
//           </div>

//           <div className="flex flex-wrap gap-3 mb-4">
//             {inchSizes.map((sizeObj, index) => (
//               <div key={index} className="p-3 border-2 border-gray-300 rounded-lg bg-white">
//                 <div className="flex items-center justify-between gap-3 mb-2">
//                   <span className="font-semibold">{sizeObj.size} Inch</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveInchSize(sizeObj.size)}
//                     className='text-red-500 text-sm hover:underline'
//                   >
//                     Remove
//                   </button>
//                 </div>

//                 <div className="space-y-2 text-sm">
//                   <div className='flex items-center gap-2 p-1.5 bg-gray-50 rounded'>
//                     <input
//                       type="checkbox"
//                       id={`inch-custom-${index}`}
//                       checked={sizeObj.useCustomPrice}
//                       onChange={() => handleInchSizeToggleCustomPrice(index)}
//                       className='w-4 h-4 cursor-pointer'
//                     />
//                     <label htmlFor={`inch-custom-${index}`} className='text-xs cursor-pointer font-medium'>
//                       Custom Price
//                     </label>
//                   </div>

//                   {sizeObj.useCustomPrice ? (
//                     <div>
//                       <label className='text-gray-600 font-medium'>Price (₹)</label>
//                       <input
//                         type="number"
//                         step="0.01"
//                         min="0"
//                         value={sizeObj.customPrice}
//                         onChange={(e) => handleInchSizeCustomPriceChange(index, e.target.value)}
//                         className='w-full px-2 py-1 border border-gray-300 rounded'
//                       />
//                       <p className='text-xs text-green-600 mt-1 font-medium'>
//                         Final: ₹{sizeObj.customPrice || '0'}
//                       </p>
//                     </div>
//                   ) : (
//                     <div>
//                       <label className='text-gray-600'>Multiplier</label>
//                       <input
//                         type="number"
//                         step="0.1"
//                         min="0.5"
//                         max="2"
//                         value={sizeObj.multiplier}
//                         onChange={(e) => handleInchSizeMultiplierChange(index, e.target.value)}
//                         className='w-full px-2 py-1 border border-gray-300 rounded'
//                       />
//                       <p className='text-xs text-gray-500 mt-1'>
//                         Final: ₹{calculateFinalPrice(sizeObj).toFixed(2)}
//                       </p>
//                     </div>
//                   )}

//                   <div>
//                     <label className='text-gray-600'>Stock</label>
//                     <input
//                       type="number"
//                       min="0"
//                       value={sizeObj.stock}
//                       onChange={(e) => handleInchSizeStockChange(index, e.target.value)}
//                       className='w-full px-2 py-1 border border-gray-300 rounded'
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {inchSizes.length === 0 && (
//             <p className='text-sm text-gray-500 italic'>No sizes added yet</p>
//           )}

//           {inchSizes.length > 0 && (
//             <div className='p-3 bg-blue-100 rounded-lg'>
//               <p className='text-sm font-medium text-blue-900'>Added Sizes:</p>
//               <div className='flex gap-2 mt-2 flex-wrap'>
//                 {inchSizes.map((sizeObj, idx) => (
//                   <span key={idx} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
//                     {sizeObj.size}" - ₹{calculateFinalPrice(sizeObj).toFixed(2)}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <div className='flex gap-2 mt-2'>
//         <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//         <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button type="submit" className='w-28 py-3 mt-4 bg-black hover:bg-gray-800 text-white rounded-md'>ADD</button>

//     </form>
//   )
// }

// export default Add




import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [detailedDescription, setDetailedDescription] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  // Colors with flexible input
  const [colors, setColors] = useState([]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");
  const [colorInputMode, setColorInputMode] = useState("both"); // "both", "nameOnly", "hexOnly"

  // Size type selector
  const [sizeType, setSizeType] = useState("standard");

  // Standard sizes with custom price option
  const [standardSizes, setStandardSizes] = useState({
    XS: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
    S: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
    M: { multiplier: 1.0, stock: 0, customPrice: "", useCustomPrice: false },
    L: { multiplier: 1.1, stock: 0, customPrice: "", useCustomPrice: false },
    XL: { multiplier: 1.2, stock: 0, customPrice: "", useCustomPrice: false },
    XXL: { multiplier: 1.35, stock: 0, customPrice: "", useCustomPrice: false },
    "3XL": { multiplier: 1.5, stock: 0, customPrice: "", useCustomPrice: false }
  });
  const [enabledStandardSizes, setEnabledStandardSizes] = useState([]);

  // Inch-based sizes with custom price option
  const [inchSizes, setInchSizes] = useState([]);
  const [newInchSize, setNewInchSize] = useState("");
  const [newInchMultiplier, setNewInchMultiplier] = useState(1.0);
  const [newInchStock, setNewInchStock] = useState(0);
  const [newInchCustomPrice, setNewInchCustomPrice] = useState("");
  const [newInchUseCustomPrice, setNewInchUseCustomPrice] = useState(false);

  // Color handlers
  const handleAddColor = () => {
    // Validate based on input mode
    if (colorInputMode === "both") {
      if (!newColorName.trim()) {
        toast.error("Please enter color name");
        return;
      }
      if (!newColorHex) {
        toast.error("Please select a color");
        return;
      }
    } else if (colorInputMode === "nameOnly") {
      if (!newColorName.trim()) {
        toast.error("Please enter color name");
        return;
      }
    } else if (colorInputMode === "hexOnly") {
      if (!newColorHex) {
        toast.error("Please select a color");
        return;
      }
    }

    const colorToAdd = {
      name: newColorName.trim() || `Color-${colors.length + 1}`,
      hex: newColorHex || '#808080'
    };

    if (colors.some(c => c.name.toLowerCase() === colorToAdd.name.toLowerCase())) {
      toast.error("This color name already exists");
      return;
    }

    setColors([...colors, colorToAdd]);
    setNewColorName("");
    setNewColorHex("#000000");
    toast.success("Color added!");
  };

  const handleRemoveColor = (colorName) => {
    setColors(colors.filter(c => c.name !== colorName));
  };

  const handleEditColor = (index, field, value) => {
    const updated = [...colors];
    updated[index][field] = value;
    setColors(updated);
  };

  // Standard size handlers
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

  const handleStandardSizeCustomPriceChange = (sizeKey, value) => {
    setStandardSizes(prev => ({
      ...prev,
      [sizeKey]: {
        ...prev[sizeKey],
        customPrice: value === "" ? "" : value, // allow empty temporarily
      }
    }));
  };

  const handleStandardSizeToggleCustomPrice = (sizeKey) => {
    setStandardSizes(prev => ({
      ...prev,
      [sizeKey]: {
        ...prev[sizeKey],
        useCustomPrice: !prev[sizeKey].useCustomPrice
      }
    }));
  };

  // Inch size handlers
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
      stock: newInchStock,
      customPrice: newInchCustomPrice,
      useCustomPrice: newInchUseCustomPrice
    }]);

    setNewInchSize("");
    setNewInchMultiplier(1.0);
    setNewInchStock(0);
    setNewInchCustomPrice("");
    setNewInchUseCustomPrice(false);
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

  const handleInchSizeCustomPriceChange = (index, value) => {
    const updated = [...inchSizes];
    updated[index].customPrice = value === "" ? "" : value;
    setInchSizes(updated);
  };

  const handleInchSizeToggleCustomPrice = (index) => {
    const updated = [...inchSizes];
    updated[index].useCustomPrice = !updated[index].useCustomPrice;
    setInchSizes(updated);
  };

  // Calculate final price
  const calculateFinalPrice = (sizeData) => {
    if (sizeData.useCustomPrice && sizeData.customPrice) {
      return parseFloat(sizeData.customPrice);
    }
    return parseFloat(price || 0) * sizeData.multiplier;
  };

  // Format sizes for submission - fixed version
  const formatSizesForSubmit = () => {
    let sizesArray = [];

    if (sizeType === "standard") {
      sizesArray = enabledStandardSizes.map(sizeKey => {
        const sizeData = standardSizes[sizeKey];

        const sizeObj = {
          size: sizeKey,
          priceMultiplier: sizeData.multiplier,
          stock: sizeData.stock,
        };

        // Only include custom price fields if actually using custom price
        if (sizeData.useCustomPrice) {
          const customVal = sizeData.customPrice?.trim();
          if (!customVal || isNaN(Number(customVal)) || Number(customVal) <= 0) {
            toast.error(`Custom price for size ${sizeKey} is required and must be > 0`);
            throw new Error("Invalid custom price"); // stop submission
          }
          sizeObj.customPrice = Number(customVal);
          sizeObj.useCustomPrice = true;
        }

        return sizeObj;
      });
    } else {
      // Inch-based
      sizesArray = inchSizes.map(sizeObj => {
        const newObj = {
          size: sizeObj.size,
          priceMultiplier: sizeObj.multiplier,
          stock: sizeObj.stock,
        };

        if (sizeObj.useCustomPrice) {
          const customVal = sizeObj.customPrice?.trim();
          if (!customVal || isNaN(Number(customVal)) || Number(customVal) <= 0) {
            toast.error(`Custom price for size ${sizeObj.size} is required and must be > 0`);
            throw new Error("Invalid custom price");
          }
          newObj.customPrice = Number(customVal);
          newObj.useCustomPrice = true;
        }

        return newObj;
      });
    }

    return sizesArray;
  };

  const onSubmitHandler = async (e) => {
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
      if (!price || isNaN(Number(price)) || Number(price) <= 0) {
        return toast.error("Base price is required and must be greater than 0");
      }

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("detailedDescription", detailedDescription);
      formData.append("price", price);
      formData.append("discountPrice", discountPrice || "");
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);

      // Prepare sizes – will throw if validation fails
      const sizesToSend = formatSizesForSubmit();
      formData.append("sizes", JSON.stringify(sizesToSend));

      formData.append("color", JSON.stringify(colors));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      if (image5) formData.append("image5", image5);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");

        // Reset form
        setName("");
        setDescription("");
        setDetailedDescription("");
        setPrice("");
        setDiscountPrice("");
        setColors([]);
        setNewColorName("");
        setNewColorHex("#000000");
        setColorInputMode("both");
        setSizeType("standard");
        setEnabledStandardSizes([]);
        setStandardSizes({
          XS: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
          S: { multiplier: 0.9, stock: 0, customPrice: "", useCustomPrice: false },
          M: { multiplier: 1.0, stock: 0, customPrice: "", useCustomPrice: false },
          L: { multiplier: 1.1, stock: 0, customPrice: "", useCustomPrice: false },
          XL: { multiplier: 1.2, stock: 0, customPrice: "", useCustomPrice: false },
          XXL: { multiplier: 1.35, stock: 0, customPrice: "", useCustomPrice: false },
          "3XL": { multiplier: 1.5, stock: 0, customPrice: "", useCustomPrice: false },
        });
        setInchSizes([]);
        setNewInchSize("");
        setNewInchMultiplier(1.0);
        setNewInchStock(0);
        setNewInchCustomPrice("");
        setNewInchUseCustomPrice(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setImage5(false);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error);
      if (error.message !== "Invalid custom price") {
        toast.error(error.response?.data?.message || error.message || "Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-4 flex-wrap'>

          {/* IMAGE UPLOADS */}
          {[image1, image2, image3, image4, image5].map((img, index) => {
            const setter = [setImage1, setImage2, setImage3, setImage4, setImage5][index];
            const inputId = "image" + (index + 1);

            return (
              <label key={index} htmlFor={inputId} className="flex flex-col items-center">
                <img
                  className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                {img && (
                  <p className="text-xs mt-1 w-24 text-center truncate">{img.name}</p>
                )}
                <input onChange={(e) => setter(e.target.files[0])} type="file" id={inputId} hidden />
              </label>
            );
          })}

        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Write content here' required />
      </div>

      <div className="w-full mt-4">
        <p className='mb-2 text-gray-700 font-medium'>Detailed Description</p>
        <ReactQuill
          theme="snow"
          value={detailedDescription}
          onChange={setDetailedDescription}
          className="bg-white w-full max-w-[700px] rounded-md"
          style={{ height: "250px", marginBottom: "40px" }}
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 border'>
            {category === "Others" ? (
              <>
                <option value="Cushion Cover">Cushion Cover</option>
                <option value="Aprons">Aprons</option>
                <option value="Desk Mat">Desk Mat</option>
                <option value="Pillow">Pillow</option>
                <option value="Chair Cover">Chair Cover</option>
              </>
            ) : (
              <>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </>
            )}
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price (Base)</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px] border' type="Number" placeholder='100' required />
          <p className='text-xs text-gray-500 mt-1'>Base price (or use custom per size)</p>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Discount Price (optional)</p>
          <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} className='w-full px-3 py-2 sm:w-[120px] border' type="Number" placeholder='0' />
        </div>
      </div>

      {/* FLEXIBLE COLOR SYSTEM */}
      <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className='mb-4 font-medium text-gray-700'>Product Colors (Flexible)</p>
        
        {/* Color Input Mode Selector */}
        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-300">
          <p className='text-sm font-medium text-gray-700 mb-2'>Color Input Mode:</p>
          <div className="flex gap-3 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="both"
                checked={colorInputMode === "both"}
                onChange={(e) => setColorInputMode(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Name + Hex</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="nameOnly"
                checked={colorInputMode === "nameOnly"}
                onChange={(e) => setColorInputMode(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Name Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="hexOnly"
                checked={colorInputMode === "hexOnly"}
                onChange={(e) => setColorInputMode(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Hex Only</span>
            </label>
          </div>
        </div>

        {/* Add Color Section */}
        <div className="flex gap-2 mb-4 flex-wrap items-end p-3 bg-white rounded-lg border border-gray-300">
          {(colorInputMode === "both" || colorInputMode === "nameOnly") && (
            <div>
              <label className='text-sm text-gray-600 font-medium'>Color Name</label>
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="e.g., Navy Blue, Red"
                className='border p-2 rounded mt-1 w-48'
              />
            </div>
          )}

          {(colorInputMode === "both" || colorInputMode === "hexOnly") && (
            <div>
              <label className='text-sm text-gray-600 font-medium'>Color Picker</label>
              <div className="flex gap-2 items-center mt-1">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className='w-20 h-10 border rounded cursor-pointer'
                  title={newColorHex}
                />
                <input
                  type="text"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  placeholder="#000000"
                  className='border p-2 rounded w-28'
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddColor}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          >
            + Add Color
          </button>
        </div>

        {/* Display Added Colors */}
        <div className="space-y-2">
          <p className='text-sm font-medium text-gray-700'>Added Colors ({colors.length}):</p>
          
          {colors.length === 0 ? (
            <p className='text-sm text-gray-500 italic p-3 bg-white rounded border border-gray-200'>
              No colors added yet
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-400 transition"
                >
                  <div className="flex-shrink-0">
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => handleEditColor(index, 'hex', e.target.value)}
                      className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                      title="Click to edit"
                    />
                  </div>

                  <div className="flex-grow">
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => handleEditColor(index, 'name', e.target.value)}
                      className="w-full font-medium text-sm border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1 py-0.5"
                    />
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => handleEditColor(index, 'hex', e.target.value)}
                      className="w-full text-xs text-gray-500 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1 py-0.5 mt-1"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color.name)}
                    className='flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Presets */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-gray-300">
          <p className='text-sm font-medium text-gray-700 mb-2'>Quick Add:</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { name: "Black", hex: "#000000" },
              { name: "White", hex: "#FFFFFF" },
              { name: "Red", hex: "#FF0000" },
              { name: "Blue", hex: "#0000FF" },
              { name: "Green", hex: "#00FF00" },
              { name: "Yellow", hex: "#FFFF00" },
              { name: "Navy Blue", hex: "#000080" },
              { name: "Brown", hex: "#8B4513" },
              { name: "Pink", hex: "#FFC0CB" },
              { name: "Purple", hex: "#800080" },
              { name: "Orange", hex: "#FFA500" },
              { name: "Gray", hex: "#808080" }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (!colors.some(c => c.name.toLowerCase() === preset.name.toLowerCase())) {
                    setColors([...colors, preset]);
                    toast.success(`${preset.name} added!`);
                  } else {
                    toast.info(`${preset.name} already exists`);
                  }
                }}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50 transition text-sm"
              >
                <div
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: preset.hex }}
                />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SIZE TYPE SELECTOR */}
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
            <span className="text-sm">Standard Sizes (XS, S, M, L, XL, XXL, 3XL)</span>
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

      {/* STANDARD SIZES WITH CUSTOM PRICE */}
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
                  <div className='space-y-3'>
                    <div className='flex items-center gap-2 p-2 bg-white rounded border'>
                      <input
                        type="checkbox"
                        id={`custom-price-${sizeKey}`}
                        checked={standardSizes[sizeKey].useCustomPrice}
                        onChange={() => handleStandardSizeToggleCustomPrice(sizeKey)}
                        className='w-4 h-4 cursor-pointer'
                      />
                      <label htmlFor={`custom-price-${sizeKey}`} className='text-sm font-medium cursor-pointer'>
                        Use Custom Price
                      </label>
                    </div>

                    {standardSizes[sizeKey].useCustomPrice ? (
                      <div>
                        <label className='text-sm text-gray-600 font-medium'>Custom Price (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={standardSizes[sizeKey].customPrice}
                          onChange={(e) => handleStandardSizeCustomPriceChange(sizeKey, e.target.value)}
                          className='w-full px-2 py-1 border border-gray-300 rounded'
                          placeholder='Enter custom price'
                        />
                        <p className='text-xs text-green-600 mt-1 font-medium'>
                          Final: ₹{standardSizes[sizeKey].customPrice || '0'}
                        </p>
                      </div>
                    ) : (
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
                        />
                        <p className='text-xs text-gray-500 mt-1'>
                          Final: ₹{calculateFinalPrice(standardSizes[sizeKey]).toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className='text-sm text-gray-600'>Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={standardSizes[sizeKey].stock}
                        onChange={(e) => handleStandardSizeStockChange(sizeKey, e.target.value)}
                        className='w-full px-2 py-1 border border-gray-300 rounded'
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
                    {sizeKey} - ₹{calculateFinalPrice(standardSizes[sizeKey]).toFixed(2)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* INCH-BASED SIZES WITH CUSTOM PRICE */}
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
                placeholder="e.g., 14x14"
                className='border p-2 rounded mt-1'
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
              />
            </div>

            <div className='flex items-center gap-2 p-2 border rounded bg-white'>
              <input
                type="checkbox"
                id="new-inch-custom"
                checked={newInchUseCustomPrice}
                onChange={(e) => setNewInchUseCustomPrice(e.target.checked)}
                className='w-4 h-4 cursor-pointer'
              />
              <label htmlFor="new-inch-custom" className='text-sm cursor-pointer'>
                Custom Price
              </label>
            </div>

            {newInchUseCustomPrice ? (
              <div>
                <label className='text-sm text-gray-600'>Custom Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newInchCustomPrice}
                  onChange={(e) => setNewInchCustomPrice(e.target.value)}
                  className='border p-2 rounded mt-1 w-28'
                />
              </div>
            ) : (
              <div>
                <label className='text-sm text-gray-600'>Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="2"
                  value={newInchMultiplier}
                  onChange={(e) => setNewInchMultiplier(parseFloat(e.target.value) || 1)}
                  className='border p-2 rounded mt-1 w-24'
                />
              </div>
            )}

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
              <div key={index} className="p-3 border-2 border-gray-300 rounded-lg bg-white">
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
                  <div className='flex items-center gap-2 p-1.5 bg-gray-50 rounded'>
                    <input
                      type="checkbox"
                      id={`inch-custom-${index}`}
                      checked={sizeObj.useCustomPrice}
                      onChange={() => handleInchSizeToggleCustomPrice(index)}
                      className='w-4 h-4 cursor-pointer'
                    />
                    <label htmlFor={`inch-custom-${index}`} className='text-xs cursor-pointer font-medium'>
                      Custom Price
                    </label>
                  </div>

                  {sizeObj.useCustomPrice ? (
                    <div>
                      <label className='text-gray-600 font-medium'>Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={sizeObj.customPrice}
                        onChange={(e) => handleInchSizeCustomPriceChange(index, e.target.value)}
                        className='w-full px-2 py-1 border border-gray-300 rounded'
                      />
                      <p className='text-xs text-green-600 mt-1 font-medium'>
                        Final: ₹{sizeObj.customPrice || '0'}
                      </p>
                    </div>
                  ) : (
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
                        Final: ₹{calculateFinalPrice(sizeObj).toFixed(2)}
                      </p>
                    </div>
                  )}

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
            <p className='text-sm text-gray-500 italic'>No sizes added yet</p>
          )}

          {inchSizes.length > 0 && (
            <div className='p-3 bg-blue-100 rounded-lg'>
              <p className='text-sm font-medium text-blue-900'>Added Sizes:</p>
              <div className='flex gap-2 mt-2 flex-wrap'>
                {inchSizes.map((sizeObj, idx) => (
                  <span key={idx} className='px-3 py-1 bg-blue-500 text-white text-sm rounded-full'>
                    {sizeObj.size}" - ₹{calculateFinalPrice(sizeObj).toFixed(2)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black hover:bg-gray-800 text-white rounded-md'>ADD</button>

    </form>
  );
};

export default Add;