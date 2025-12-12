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
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  // COLORS (same as Add page)
  const fallbackColors = [
    { id: "wine", name: "Wine", hex: "#800000" },
    { id: "red", name: "Red", hex: "#FF0000" },
    { id: "black", name: "Black", hex: "#000000" },
    { id: "olive", name: "Olive", hex: "#808000" },
    { id: "green", name: "Green", hex: "#008000" },
    { id: "cognac", name: "Cognac", hex: "#D2691E" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "yellow", name: "Yellow", hex: "#FFFF00" },
    { id: "gray", name: "Gray", hex: "#808080" },
    { id: "rose", name: "Rose", hex: "#FF007F" },
    { id: "tobacco", name: "Tobacco", hex: "#A0522D" },
    { id: "navy", name: "Navy", hex: "#000080" },
    { id: "beige", name: "Beige", hex: "#F5F5DC" },
  ];

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
          setSizes(p.sizes);
          setColors(p.color);
          setExistingImages(p.image);
        }
      } catch (error) {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  // UPDATE PRODUCT
  const updateHandler = async (e) => {
    e.preventDefault();

    try {
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
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("color", JSON.stringify(colors));

      // NEW IMAGES IF CHOSEN
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

  // Handle color selection
  const handleColorSelect = (colorId) => {
    setColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((c) => c !== colorId)
        : [...prev, colorId]
    );
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

      {/* UPLOAD NEW IMAGES WITH FILENAME */}
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
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="w-full">
        <p>Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
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
          className="px-3 py-2"
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
          <option>Accessories</option>
        </select>
      </div>

      {/* SUBCATEGORY */}
      <div>
        <p>Sub Category</p>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="px-3 py-2"
        >
          {category === "Accessories" ? (
            <>
              <option>Belts</option>
              <option>Wallets</option>
              <option>Bags</option>
              <option>Card Holders</option>
              <option>Keychains</option>
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
        <p>Price</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2"
        />
      </div>

      {/* DISCOUNT PRICE */}
      <div>
        <p>Discount Price (optional)</p>
        <input
          type="number"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          className="px-3 py-2"
          placeholder="Enter discount price"
        />
      </div>

      {/* COLORS */}
      <div>
        <p>Product Colors</p>
        <div className="flex flex-wrap gap-2">
          {fallbackColors.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => handleColorSelect(c.id)}
              className={`w-10 h-10 rounded border ${
                colors.includes(c.id) ? "ring-2 ring-black scale-110" : ""
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* SIZES */}
      <div>
        <p>Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL", "3XL"].map((sz) => (
            <p
              key={sz}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(sz)
                    ? prev.filter((s) => s !== sz)
                    : [...prev, sz]
                )
              }
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes(sz) ? "bg-pink-300" : "bg-gray-300"
              }`}
            >
              {sz}
            </p>
          ))}
        </div>
      </div>

      {/* BESTSELLER */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label>Add to bestseller</label>
      </div>

      <button className="w-32 py-3 bg-black text-white rounded mt-3 hover:bg-gray-800">
        UPDATE PRODUCT
      </button>
    </form>
  );
};

export default UpdateProduct;
