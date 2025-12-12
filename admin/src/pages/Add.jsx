import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [image5, setImage5] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [detailedDescription, setDetailedDescription] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");


  // ✅ Full Fallback Colors Array (with wine + many more)
  const fallbackColors = [
    { id: 'wine', name: 'Wine', hex: '#800000' },
    { id: 'red', name: 'Red', hex: '#FF0000' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'olive', name: 'Olive', hex: '#808000' },
    { id: 'green', name: 'Green', hex: '#008000' },
    { id: 'cognac', name: 'Cognac', hex: '#D2691E' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
    { id: 'gray', name: 'Gray', hex: '#808080' },
    { id: 'rose', name: 'Rose', hex: '#FF007F' },
    { id: 'tobacco', name: 'Tobacco', hex: '#A0522D' },
    { id: 'navy', name: 'Navy', hex: '#000080' },  // Extra
    { id: 'beige', name: 'Beige', hex: '#F5F5DC' },  // Extra
  ];

  // ✅ Dynamic Colors: Use selected colors state, but render from fallback
  const availableColors = fallbackColors;

  const handleColorSelect = (colorId) => {
    setColors((prevColors) =>
      prevColors.includes(colorId)
        ? prevColors.filter((c) => c !== colorId)
        : [...prevColors, colorId]
    );
  };



  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("detailedDescription", detailedDescription);
      formData.append("price", price)
      formData.append("discountPrice", discountPrice || "")
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("color", JSON.stringify(colors));


      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)
      image5 && formData.append("image5", image5)

      // console.log("SENDING TO BACKEND:", detailedDescription);


      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setImage5(false)  // Added missing reset
        setPrice('')
        setDiscountPrice('') 
        setColors([])  // Reset colors
        setSizes([])  // Reset sizes
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-4 flex-wrap'>

  {/* IMAGE 1 */}
  <label htmlFor="image1" className="flex flex-col items-center">
    <img
      className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
      src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
      alt=""
    />
    {/* Show filename */}
    {image1 && (
      <p className="text-xs mt-1 w-24 text-center truncate">{image1.name}</p>
    )}
    <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
  </label>

  {/* IMAGE 2 */}
  <label htmlFor="image2" className="flex flex-col items-center">
    <img
      className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
      src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
      alt=""
    />
    {image2 && (
      <p className="text-xs mt-1 w-24 text-center truncate">{image2.name}</p>
    )}
    <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
  </label>

  {/* IMAGE 3 */}
  <label htmlFor="image3" className="flex flex-col items-center">
    <img
      className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
      src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
      alt=""
    />
    {image3 && (
      <p className="text-xs mt-1 w-24 text-center truncate">{image3.name}</p>
    )}
    <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
  </label>

  {/* IMAGE 4 */}
  <label htmlFor="image4" className="flex flex-col items-center">
    <img
      className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
      src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
      alt=""
    />
    {image4 && (
      <p className="text-xs mt-1 w-24 text-center truncate">{image4.name}</p>
    )}
    <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
  </label>

  {/* IMAGE 5 */}
  <label htmlFor="image5" className="flex flex-col items-center">
    <img
      className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex justify-center items-center hover:border-black transition'
      src={!image5 ? assets.upload_area : URL.createObjectURL(image5)}
      alt=""
    />
    {image5 && (
      <p className="text-xs mt-1 w-24 text-center truncate">{image5.name}</p>
    )}
    <input onChange={(e) => setImage5(e.target.files[0])} type="file" id="image5" hidden />
  </label>

</div>

      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      {/* ✅ Detailed Description (WYSIWYG Editor) */}
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
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div> */}

        <div>
          <p className='mb-2'>Sub category</p>

          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full px-3 py-2'
          >

            {category === "Others" ? (
              <>
                <option value="Belts">Belts</option>
                <option value="Wallets">Wallets</option>
                <option value="Bags">Bags</option>
                <option value="Card Holders">Card Holders</option>
                <option value="Keychains">Keychains</option>
                <option value="Pillow">Pillow</option>
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
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
        </div>
        <div className='w-full'>
          <p className='mb-2'>Discount Price (optional)</p>
          <input onChange={(e) => setDiscountPrice(e.target.value)} value={discountPrice} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='20' />
          {/* <p className='text-xs text-gray-500 mt-1'>Keep blank or 0 for no discount. Must be less than Product Price.</p> */}
        </div>

      </div>


      {/* ✅ Updated Colors Section: Now shows wine + many more with proper styling */}
      <label className="block mt-4 mb-2 text-gray-700">Product Colors</label>
      <div className="flex flex-wrap gap-2">
        {availableColors.map((colorObj) => {
          const colorId = colorObj.id;
          return (
            <button
              key={colorId}
              type="button"
              onClick={() => handleColorSelect(colorId)}
              className={`w-10 h-10 rounded-md border transition-all duration-200 ${colors.includes(colorId)
                  ? 'ring-2 ring-black scale-110'
                  : 'hover:ring-1 hover:ring-gray-400 border-gray-300'
                }`}
              style={{
                backgroundColor: colorObj.hex,
              }}
              title={colorObj.name}  // Tooltip for full name
            />
          );
        })}
      </div>

      {/* Selected Colors Preview */}
      <div className="mt-2 flex gap-2">
        {colors.map((colorId) => {
          const colorObj = availableColors.find(c => c.id === colorId);
          return (
            <span
              key={colorId}
              className="w-6 h-6 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: colorObj?.hex || colorId.toLowerCase() }}
              title={colorObj?.name || colorId}
            />
          );
        })}
      </div>




      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("3XL") ? prev.filter(item => item !== "3XL") : [...prev, "3XL"])}>
            <p className={`${sizes.includes("3XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>3XL</p>
          </div>

        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black hover:bg-gray-800 text-white rounded-md'>ADD</button>

    </form>
  )
}

export default Add




