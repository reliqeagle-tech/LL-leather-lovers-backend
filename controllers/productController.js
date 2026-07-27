// import { v2 as cloudinary } from "cloudinary"
// import productModel from "../models/productModel.js"
// // import fs from "fs";
// import csv from "csvtojson";
// import unzipper from 'unzipper'
// import path from "path";
// import fs from "fs-extra";

// // function for add product
// const addProduct = async (req, res) => {
//   try {

//     const { name, description, detailedDescription, price, discountPrice, discountActive, category, subCategory, sizes, color, bestseller } = req.body

//     // validate price values
//     const numericPrice = Number(price);
//     const numericDiscount = discountPrice !== undefined && discountPrice !== "" ? Number(discountPrice) : 0;

//     if (isNaN(numericPrice) || numericPrice < 0) {
//       return res.json({ success: false, message: "Invalid product price" });
//     }
//     if (numericDiscount < 0) {
//       return res.json({ success: false, message: "Invalid discount price" });
//     }
//     if (numericDiscount > 0 && numericDiscount >= numericPrice) {
//       return res.json({ success: false, message: "Discount price must be less than product price" });
//     }

//     const image1 = req.files.image1 && req.files.image1[0]
//     const image2 = req.files.image2 && req.files.image2[0]
//     const image3 = req.files.image3 && req.files.image3[0]
//     const image4 = req.files.image4 && req.files.image4[0]

//     const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
//         return result.secure_url
//       })
//     )

//     const productData = {
//       name,
//       description,
//       detailedDescription,
//       category,
//       price: Number(price),
//       discountPrice: numericDiscount,           // NEW
//       discountActive: numericDiscount > 0,
//       subCategory,
//       bestseller: bestseller === "true" ? true : false,
//       sizes: JSON.parse(sizes),
//       color: JSON.parse(color),
//       image: imagesUrl,
//       date: Date.now()
//     }

//     console.log(productData);

//     const product = new productModel(productData);
//     await product.save()

//     res.json({ success: true, message: "Product Added" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // function for list product
// const listProducts = async (req, res) => {
//   try {

//     const products = await productModel.find({});
//     res.json({ success: true, products })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // function for removing product
// const removeProduct = async (req, res) => {
//   try {

//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({ success: true, message: "Product Removed" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // function for single product info
// const singleProduct = async (req, res) => {
//   try {

//     const { productId } = req.body
//     const product = await productModel.findById(productId)
//     res.json({ success: true, product })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // function for updating product
// const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     // Fetch existing product
//     const product = await productModel.findById(productId);
//     if (!product) {
//       return res.json({ success: false, message: "Product not found" });
//     }

//     const {
//       name,
//       description,
//       detailedDescription,
//       price,
//       category,
//       discountPrice,
//       subCategory,
//       sizes,
//       color,
//       bestseller
//     } = req.body;

//     // ===========================
//     // 🔄 IMAGE UPLOAD
//     // ===========================
//     const newImagesRaw = [
//       req.files?.image1?.[0],
//       req.files?.image2?.[0],
//       req.files?.image3?.[0],
//       req.files?.image4?.[0],
//     ].filter(Boolean);

//     let newImageUrls = [];

//     if (newImagesRaw.length > 0) {
//       newImageUrls = await Promise.all(
//         newImagesRaw.map(async (img) => {
//           const uploaded = await cloudinary.uploader.upload(img.path, {
//             resource_type: "image",
//           });
//           return uploaded.secure_url;
//         })
//       );
//     }

//     // Use new images or keep old
//     const updatedImages = newImagesRaw.length > 0 ? newImageUrls : product.image;

//     // ===========================
//     // 🔄 DISCOUNT LOGIC (fixed)
//     // ===========================
//     const numericDiscount =
//       discountPrice !== undefined && discountPrice !== ""
//         ? Number(discountPrice)
//         : null;

//     const finalDiscountPrice =
//       numericDiscount !== null ? numericDiscount : product.discountPrice;

//     const finalDiscountActive =
//       numericDiscount !== null
//         ? numericDiscount > 0
//         : product.discountActive;

//     // ===========================
//     // 🔄 Prepare Update Object
//     // ===========================
//     const updatedData = {
//       name: name ?? product.name,
//       description: description ?? product.description,
//       detailedDescription: detailedDescription ?? product.detailedDescription,
//       price: price ? Number(price) : product.price,

//       // discount fields
//       discountPrice: finalDiscountPrice,
//       discountActive: finalDiscountActive,

//       category: category ?? product.category,
//       subCategory: subCategory ?? product.subCategory,
//       bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,

//       image: updatedImages,

//       sizes: sizes ? JSON.parse(sizes) : product.sizes,
//       color: color ? JSON.parse(color) : product.color,

//       updatedAt: Date.now(),
//     };

//     await productModel.findByIdAndUpdate(productId, updatedData, { new: true });

//     res.json({ success: true, message: "Product updated successfully" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };



// // ===========================
// // 🔄 Bulk upload Product
// // ===========================

// const bulkUploadProducts = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.json({ success: false, message: "No file uploaded" });
//     }

//     const filePath = req.file.path;
//     let jsonData = [];

//     // 1. Parse CSV or JSON
//     if (req.file.mimetype === "text/csv") {
//       jsonData = await csv().fromFile(filePath);
//     } else {
//       jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     }

//     const formattedProducts = await Promise.all(
//       jsonData.map(async (item) => {

//         let uploadedImages = [];

//         // --- If CSV contains image URL(s) ---
//         if (item.image) {
//           const images = item.image.split(",").map((i) => i.trim());

//           for (let img of images) {
//             try {
//               // Upload URL or local path to cloudinary
//               const result = await cloudinary.uploader.upload(img, {
//                 resource_type: "image",
//               });

//               uploadedImages.push(result.secure_url);

//             } catch (err) {
//               console.log("Error uploading image:", img, err);
//             }
//           }
//         }

//         return {
//           name: item.name,
//           description: item.description,
//           detailedDescription: item.detailedDescription || "",
//           price: Number(item.price),
//           discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//           discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,

//           category: item.category,
//           subCategory: item.subCategory,
//           bestseller: item.bestseller === "true",
//           sizes: item.sizes ? item.sizes.split(",") : [],
//           color: item.color ? item.color.split(",") : [],
//           image: uploadedImages,  // 🎉 REAL CLOUDINARY URLS
//           date: Date.now(),
//         };
//       })
//     );

//     // Insert into MongoDB
//     await productModel.insertMany(formattedProducts);

//     fs.unlinkSync(filePath); // delete CSV file

//     res.json({
//       success: true,
//       message: `${formattedProducts.length} products uploaded successfully`,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// // ===========================
// // 🔄 Bulk upload with zip Product
// // ===========================


// const bulkUploadZipProducts = async (req, res) => {
//   try {
//     if (!req.files || !req.files.csv || !req.files.images) {
//       return res.json({ success: false, message: "CSV and ZIP are required" });
//     }

//     const csvPath = req.files.csv[0].path;
//     const zipPath = req.files.images[0].path;

//     // 1️⃣ Extract ZIP to temp/images/
//     const extractDir = "temp/images";
//     await fs.ensureDir(extractDir);

//     await fs
//       .createReadStream(zipPath)
//       .pipe(unzipper.Extract({ path: extractDir }))
//       .promise();

//     // 2️⃣ Parse CSV
//     const products = await csv().fromFile(csvPath);

//     const finalProducts = [];

//     for (let item of products) {
//       let imageFilenames = item.image ? item.image.split(",") : [];
//       let uploadedImages = [];

//       for (let filename of imageFilenames) {
//         filename = filename.trim();

//         // Path inside extracted zip
//         const localPath = path.join(extractDir, filename);

//         if (fs.existsSync(localPath)) {
//           try {
//             const uploaded = await cloudinary.uploader.upload(localPath, {
//               resource_type: "image",
//               folder: "bulk_upload",
//             });
//             uploadedImages.push(uploaded.secure_url);
//           } catch (err) {
//             console.log("Upload failed:", filename, err.message);
//           }
//         } else {
//           console.log("File not found in ZIP:", filename);
//         }
//       }

//       finalProducts.push({
//         name: item.name,
//         description: item.description,
//         detailedDescription: item.detailedDescription || "",
//         price: Number(item.price),
//         discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//         discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,

//         category: item.category,
//         subCategory: item.subCategory,
//         bestseller: item.bestseller === "true",
//         sizes: item.sizes ? item.sizes.split(",") : [],
//         color: item.color ? item.color.split(",") : [],
//         image: uploadedImages,
//         date: Date.now(),
//       });
//     }

//     // 3️⃣ Insert into MongoDB
//     await productModel.insertMany(finalProducts);

//     // Cleanup
//     fs.unlinkSync(csvPath);
//     fs.unlinkSync(zipPath);
//     await fs.remove(extractDir);

//     res.json({
//       success: true,
//       message: `${finalProducts.length} products uploaded successfully`,
//     });
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false, message: err.message });
//   }
// };


// export { listProducts, addProduct, removeProduct, singleProduct, updateProduct, bulkUploadProducts, bulkUploadZipProducts }










// import { v2 as cloudinary } from "cloudinary"
// import productModel from "../models/productModel.js"
// import csv from "csvtojson"
// import unzipper from 'unzipper'
// import path from "path"
// import fs from "fs-extra"

// // ADD PRODUCT
// const addProduct = async (req, res) => {
//   try {
//     const {
//       name, description, detailedDescription, price, discountPrice,
//       discountActive, category, subCategory, sizes, color, bestseller
//     } = req.body

//     // Validate price
//     const numericPrice = Number(price)
//     const numericDiscount = discountPrice !== undefined && discountPrice !== "" ? Number(discountPrice) : 0

//     if (isNaN(numericPrice) || numericPrice < 0) {
//       return res.json({ success: false, message: "Invalid product price" })
//     }
//     if (numericDiscount < 0) {
//       return res.json({ success: false, message: "Invalid discount price" })
//     }
//     if (numericDiscount > 0 && numericDiscount >= numericPrice) {
//       return res.json({ success: false, message: "Discount price must be less than product price" })
//     }

//     // Upload images
//     const image1 = req.files.image1 && req.files.image1[0]
//     const image2 = req.files.image2 && req.files.image2[0]
//     const image3 = req.files.image3 && req.files.image3[0]
//     const image4 = req.files.image4 && req.files.image4[0]
//     const image5 = req.files.image5 && req.files.image5[0]

//     const images = [image1, image2, image3, image4, image5].filter((item) => item !== undefined)

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
//         return result.secure_url
//       })
//     )

//     // ✅ PARSE SIZES WITH PRICE MULTIPLIERS
//     let parsedSizes = []
//     try {
//       parsedSizes = JSON.parse(sizes)
//       // Validate that sizes are in correct format
//       parsedSizes = parsedSizes.map(sizeObj => ({
//         size: sizeObj.size,
//         priceMultiplier: sizeObj.priceMultiplier || 1,
//         stock: sizeObj.stock || 0
//       }))
//     } catch (e) {
//       return res.json({ success: false, message: "Invalid sizes format. Expected: [{size:'S', priceMultiplier:1, stock:10}]" })
//     }

//     const productData = {
//       name,
//       description,
//       detailedDescription,
//       category,
//       price: Number(price),
//       discountPrice: numericDiscount,
//       discountActive: numericDiscount > 0,
//       subCategory,
//       bestseller: bestseller === "true" ? true : false,
//       sizes: parsedSizes, // ✅ NOW STORES OBJECTS WITH MULTIPLIERS
//       color: JSON.parse(color),
//       image: imagesUrl,
//       date: Date.now()
//     }

//     const product = new productModel(productData)
//     await product.save()

//     res.json({ success: true, message: "Product Added" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // LIST PRODUCTS
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({})
//     res.json({ success: true, products })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // REMOVE PRODUCT
// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({ success: true, message: "Product Removed" })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ✅ FIXED: SINGLE PRODUCT - Returns product with sizes as objects
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)

//     if (!product) {
//       return res.json({ success: false, message: "Product not found" })
//     }

//     // ✅ Convert to plain object
//     const productObj = product.toObject()

//     // ✅ IMPORTANT: Ensure sizes are objects (not strings)
//     // Handle case where sizes might be old string format
//     if (productObj.sizes && productObj.sizes.length > 0) {
//       productObj.sizes = productObj.sizes.map(sizeItem => {
//         // If it's already an object with size property, return it
//         if (typeof sizeItem === 'object' && sizeItem.size) {
//           return {
//             size: sizeItem.size,
//             priceMultiplier: sizeItem.priceMultiplier || 1,
//             stock: sizeItem.stock || 0
//           }
//         }
//         // If it's a string (old format), convert it
//         if (typeof sizeItem === 'string') {
//           return {
//             size: sizeItem,
//             priceMultiplier: 1,
//             stock: 0
//           }
//         }
//         return sizeItem
//       })
//     }

//     res.json({ success: true, product: productObj })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // UPDATE PRODUCT
// const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)

//     if (!product) {
//       return res.json({ success: false, message: "Product not found" })
//     }

//     const {
//       name,
//       description,
//       detailedDescription,
//       price,
//       category,
//       discountPrice,
//       subCategory,
//       sizes,
//       color,
//       bestseller
//     } = req.body

//     // Handle images
//     const newImagesRaw = [
//       req.files?.image1?.[0],
//       req.files?.image2?.[0],
//       req.files?.image3?.[0],
//       req.files?.image4?.[0],
//     ].filter(Boolean)

//     let newImageUrls = []

//     if (newImagesRaw.length > 0) {
//       newImageUrls = await Promise.all(
//         newImagesRaw.map(async (img) => {
//           const uploaded = await cloudinary.uploader.upload(img.path, {
//             resource_type: "image",
//           })
//           return uploaded.secure_url
//         })
//       )
//     }

//     const updatedImages = newImagesRaw.length > 0 ? newImageUrls : product.image

//     // Handle discount
//     const numericDiscount =
//       discountPrice !== undefined && discountPrice !== ""
//         ? Number(discountPrice)
//         : null

//     const finalDiscountPrice =
//       numericDiscount !== null ? numericDiscount : product.discountPrice

//     const finalDiscountActive =
//       numericDiscount !== null
//         ? numericDiscount > 0
//         : product.discountActive

//     // ✅ PARSE SIZES WITH MULTIPLIERS
//     let parsedSizes = product.sizes
//     if (sizes) {
//       try {
//         parsedSizes = JSON.parse(sizes)
//         parsedSizes = parsedSizes.map(sizeObj => ({
//           size: sizeObj.size,
//           priceMultiplier: sizeObj.priceMultiplier || 1,
//           stock: sizeObj.stock || 0
//         }))
//       } catch (e) {
//         return res.json({ success: false, message: "Invalid sizes format" })
//       }
//     }

//     const updatedData = {
//       name: name ?? product.name,
//       description: description ?? product.description,
//       detailedDescription: detailedDescription ?? product.detailedDescription,
//       price: price ? Number(price) : product.price,
//       discountPrice: finalDiscountPrice,
//       discountActive: finalDiscountActive,
//       category: category ?? product.category,
//       subCategory: subCategory ?? product.subCategory,
//       bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,
//       image: updatedImages,
//       sizes: parsedSizes, // ✅ UPDATE SIZES WITH MULTIPLIERS
//       color: color ? JSON.parse(color) : product.color,
//       updatedAt: Date.now(),
//     }

//     await productModel.findByIdAndUpdate(productId, updatedData, { new: true })

//     res.json({ success: true, message: "Product updated successfully" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // BULK UPLOAD
// const bulkUploadProducts = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.json({ success: false, message: "No file uploaded" })
//     }

//     const filePath = req.file.path
//     let jsonData = []

//     if (req.file.mimetype === "text/csv") {
//       jsonData = await csv().fromFile(filePath)
//     } else {
//       jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
//     }

//     const formattedProducts = await Promise.all(
//       jsonData.map(async (item) => {
//         let uploadedImages = []

//         if (item.image) {
//           const images = item.image.split(",").map((i) => i.trim())

//           for (let img of images) {
//             try {
//               const result = await cloudinary.uploader.upload(img, {
//                 resource_type: "image",
//               })
//               uploadedImages.push(result.secure_url)
//             } catch (err) {
//               console.log("Error uploading image:", img, err)
//             }
//           }
//         }

//         // ✅ PARSE SIZES - if CSV has format: "S:0.9,M:1,L:1.1,XL:1.2,XXL:1.35"
//         let parsedSizes = []
//         if (item.sizes) {
//           parsedSizes = item.sizes.split(",").map(s => {
//             const [size, multiplier] = s.trim().split(":")
//             return {
//               size: size.trim(),
//               priceMultiplier: parseFloat(multiplier) || 1,
//               stock: 0
//             }
//           })
//         }

//         return {
//           name: item.name,
//           description: item.description,
//           detailedDescription: item.detailedDescription || "",
//           price: Number(item.price),
//           discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//           discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
//           category: item.category,
//           subCategory: item.subCategory,
//           bestseller: item.bestseller === "true",
//           sizes: parsedSizes, // ✅ WITH MULTIPLIERS
//           color: item.color ? item.color.split(",") : [],
//           image: uploadedImages,
//           date: Date.now(),
//         }
//       })
//     )

//     await productModel.insertMany(formattedProducts)
//     fs.unlinkSync(filePath)

//     res.json({
//       success: true,
//       message: `${formattedProducts.length} products uploaded successfully`,
//     })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // BULK UPLOAD WITH ZIP
// const bulkUploadZipProducts = async (req, res) => {
//   try {
//     if (!req.files || !req.files.csv || !req.files.images) {
//       return res.json({ success: false, message: "CSV and ZIP are required" })
//     }

//     const csvPath = req.files.csv[0].path
//     const zipPath = req.files.images[0].path
//     const extractDir = "temp/images"

//     await fs.ensureDir(extractDir)
//     await fs
//       .createReadStream(zipPath)
//       .pipe(unzipper.Extract({ path: extractDir }))
//       .promise()

//     const products = await csv().fromFile(csvPath)
//     const finalProducts = []

//     for (let item of products) {
//       let imageFilenames = item.image ? item.image.split(",") : []
//       let uploadedImages = []

//       for (let filename of imageFilenames) {
//         filename = filename.trim()
//         const localPath = path.join(extractDir, filename)

//         if (fs.existsSync(localPath)) {
//           try {
//             const uploaded = await cloudinary.uploader.upload(localPath, {
//               resource_type: "image",
//               folder: "bulk_upload",
//             })
//             uploadedImages.push(uploaded.secure_url)
//           } catch (err) {
//             console.log("Upload failed:", filename, err.message)
//           }
//         }
//       }

//       // ✅ PARSE SIZES WITH MULTIPLIERS
//       let parsedSizes = []
//       if (item.sizes) {
//         parsedSizes = item.sizes.split(",").map(s => {
//           const [size, multiplier] = s.trim().split(":")
//           return {
//             size: size.trim(),
//             priceMultiplier: parseFloat(multiplier) || 1,
//             stock: 0
//           }
//         })
//       }

//       finalProducts.push({
//         name: item.name,
//         description: item.description,
//         detailedDescription: item.detailedDescription || "",
//         price: Number(item.price),
//         discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//         discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
//         category: item.category,
//         subCategory: item.subCategory,
//         bestseller: item.bestseller === "true",
//         sizes: parsedSizes, // ✅ WITH MULTIPLIERS
//         color: item.color ? item.color.split(",") : [],
//         image: uploadedImages,
//         date: Date.now(),
//       })
//     }

//     await productModel.insertMany(finalProducts)
//     fs.unlinkSync(csvPath)
//     fs.unlinkSync(zipPath)
//     await fs.remove(extractDir)

//     res.json({
//       success: true,
//       message: `${finalProducts.length} products uploaded successfully`,
//     })
//   } catch (err) {
//     console.log(err)
//     res.json({ success: false, message: err.message })
//   }
// }

// export {
//   listProducts,
//   addProduct,
//   removeProduct,
//   singleProduct,
//   updateProduct,
//   bulkUploadProducts,
//   bulkUploadZipProducts
// }






// import { v2 as cloudinary } from "cloudinary"
// import productModel from "../models/productModel.js"
// import csv from "csvtojson"
// import unzipper from 'unzipper'
// import path from "path"
// import fs from "fs-extra"

// // ADD PRODUCT
// const addProduct = async (req, res) => {
//   try {
//     const {
//       name, description, detailedDescription, price, discountPrice,
//       discountActive, category, subCategory, sizes, color, bestseller
//     } = req.body

//     // Validate price
//     const numericPrice = Number(price)
//     const numericDiscount = discountPrice !== undefined && discountPrice !== "" ? Number(discountPrice) : 0

//     if (isNaN(numericPrice) || numericPrice < 0) {
//       return res.json({ success: false, message: "Invalid product price" })
//     }
//     if (numericDiscount < 0) {
//       return res.json({ success: false, message: "Invalid discount price" })
//     }
//     if (numericDiscount > 0 && numericDiscount >= numericPrice) {
//       return res.json({ success: false, message: "Discount price must be less than product price" })
//     }

//     // Upload images
//     const image1 = req.files.image1 && req.files.image1[0]
//     const image2 = req.files.image2 && req.files.image2[0]
//     const image3 = req.files.image3 && req.files.image3[0]
//     const image4 = req.files.image4 && req.files.image4[0]
//     const image5 = req.files.image5 && req.files.image5[0]

//     const images = [image1, image2, image3, image4, image5].filter((item) => item !== undefined)

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
//         return result.secure_url
//       })
//     )

//     // ✅ PARSE SIZES WITH PRICE MULTIPLIERS AND CUSTOM PRICES
//     let parsedSizes = []
//     try {
//       parsedSizes = JSON.parse(sizes)
//       // Validate that sizes are in correct format with custom price support
//       parsedSizes = parsedSizes.map(sizeObj => ({
//         size: sizeObj.size,
//         priceMultiplier: parseFloat(sizeObj.priceMultiplier) || 1,
//         stock: parseInt(sizeObj.stock) || 0,
//         customPrice: sizeObj.customPrice ? parseFloat(sizeObj.customPrice) : 0,
//         useCustomPrice: Boolean(sizeObj.useCustomPrice)
//       }))
//     } catch (e) {
//       return res.json({ success: false, message: "Invalid sizes format. Expected: [{size:'S', priceMultiplier:1, stock:10, customPrice:0, useCustomPrice:false}]" })
//     }

//     const productData = {
//       name,
//       description,
//       detailedDescription,
//       category,
//       price: Number(price),
//       discountPrice: numericDiscount,
//       discountActive: numericDiscount > 0,
//       subCategory,
//       bestseller: bestseller === "true" ? true : false,
//       sizes: parsedSizes, // ✅ NOW STORES OBJECTS WITH MULTIPLIERS AND CUSTOM PRICES
//       color: JSON.parse(color),
//       image: imagesUrl,
//       date: Date.now()
//     }

//     const product = new productModel(productData)
//     await product.save()

//     res.json({ success: true, message: "Product Added" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // LIST PRODUCTS
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({})

//     // ✅ Add final prices for each size to help frontend
//     const productsWithPrices = products.map(product => {
//       const productObj = product.toObject()

//       // Calculate final price for each size
//       if (productObj.sizes) {
//         productObj.sizes = productObj.sizes.map(sizeObj => ({
//           ...sizeObj,
//           finalPrice: sizeObj.useCustomPrice && sizeObj.customPrice > 0
//             ? sizeObj.customPrice
//             : product.price * (sizeObj.priceMultiplier || 1)
//         }))
//       }

//       return productObj
//     })

//     res.json({ success: true, products: productsWithPrices })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // REMOVE PRODUCT
// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({ success: true, message: "Product Removed" })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ✅ SINGLE PRODUCT - Returns product with sizes as objects including custom prices
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)

//     if (!product) {
//       return res.json({ success: false, message: "Product not found" })
//     }

//     // ✅ Convert to plain object
//     const productObj = product.toObject()

//     // ✅ Ensure sizes include custom price fields
//     if (productObj.sizes && productObj.sizes.length > 0) {
//       productObj.sizes = productObj.sizes.map(sizeItem => {
//         // If it's already an object with size property
//         if (typeof sizeItem === 'object' && sizeItem.size) {
//           const finalPrice = sizeItem.useCustomPrice && sizeItem.customPrice > 0
//             ? sizeItem.customPrice
//             : product.price * (sizeItem.priceMultiplier || 1)

//           return {
//             size: sizeItem.size,
//             priceMultiplier: sizeItem.priceMultiplier || 1,
//             stock: sizeItem.stock || 0,
//             customPrice: sizeItem.customPrice || 0,
//             useCustomPrice: sizeItem.useCustomPrice || false,
//             finalPrice: finalPrice
//           }
//         }
//         // If it's a string (old format), convert it
//         if (typeof sizeItem === 'string') {
//           return {
//             size: sizeItem,
//             priceMultiplier: 1,
//             stock: 0,
//             customPrice: 0,
//             useCustomPrice: false,
//             finalPrice: product.price
//           }
//         }
//         return sizeItem
//       })
//     }

//     res.json({ success: true, product: productObj })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // UPDATE PRODUCT
// const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)

//     if (!product) {
//       return res.json({ success: false, message: "Product not found" })
//     }

//     const {
//       name,
//       description,
//       detailedDescription,
//       price,
//       category,
//       discountPrice,
//       subCategory,
//       sizes,
//       color,
//       bestseller
//     } = req.body

//     // Handle images
//     const newImagesRaw = [
//       req.files?.image1?.[0],
//       req.files?.image2?.[0],
//       req.files?.image3?.[0],
//       req.files?.image4?.[0],
//       req.files?.image5?.[0],
//     ].filter(Boolean)

//     let newImageUrls = []

//     if (newImagesRaw.length > 0) {
//       newImageUrls = await Promise.all(
//         newImagesRaw.map(async (img) => {
//           const uploaded = await cloudinary.uploader.upload(img.path, {
//             resource_type: "image",
//           })
//           return uploaded.secure_url
//         })
//       )
//     }

//     const updatedImages = newImagesRaw.length > 0 ? newImageUrls : product.image

//     // Handle discount
//     const numericDiscount =
//       discountPrice !== undefined && discountPrice !== ""
//         ? Number(discountPrice)
//         : null

//     const finalDiscountPrice =
//       numericDiscount !== null ? numericDiscount : product.discountPrice

//     const finalDiscountActive =
//       numericDiscount !== null
//         ? numericDiscount > 0
//         : product.discountActive

//     // ✅ PARSE SIZES WITH MULTIPLIERS AND CUSTOM PRICES
//     let parsedSizes = product.sizes
//     if (sizes) {
//       try {
//         parsedSizes = JSON.parse(sizes)
//         parsedSizes = parsedSizes.map(sizeObj => ({
//           size: sizeObj.size,
//           priceMultiplier: parseFloat(sizeObj.priceMultiplier) || 1,
//           stock: parseInt(sizeObj.stock) || 0,
//           customPrice: sizeObj.customPrice ? parseFloat(sizeObj.customPrice) : 0,
//           useCustomPrice: Boolean(sizeObj.useCustomPrice)
//         }))
//       } catch (e) {
//         return res.json({ success: false, message: "Invalid sizes format" })
//       }
//     }

//     const updatedData = {
//       name: name ?? product.name,
//       description: description ?? product.description,
//       detailedDescription: detailedDescription ?? product.detailedDescription,
//       price: price ? Number(price) : product.price,
//       discountPrice: finalDiscountPrice,
//       discountActive: finalDiscountActive,
//       category: category ?? product.category,
//       subCategory: subCategory ?? product.subCategory,
//       bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,
//       image: updatedImages,
//       sizes: parsedSizes, // ✅ UPDATE SIZES WITH MULTIPLIERS AND CUSTOM PRICES
//       color: color ? JSON.parse(color) : product.color,
//       updatedAt: Date.now(),
//     }

//     await productModel.findByIdAndUpdate(productId, updatedData, { new: true })

//     res.json({ success: true, message: "Product updated successfully" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // BULK UPLOAD
// const bulkUploadProducts = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.json({ success: false, message: "No file uploaded" })
//     }

//     const filePath = req.file.path
//     let jsonData = []

//     if (req.file.mimetype === "text/csv") {
//       jsonData = await csv().fromFile(filePath)
//     } else {
//       jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
//     }

//     const formattedProducts = await Promise.all(
//       jsonData.map(async (item) => {
//         let uploadedImages = []

//         if (item.image) {
//           const images = item.image.split(",").map((i) => i.trim())

//           for (let img of images) {
//             try {
//               const result = await cloudinary.uploader.upload(img, {
//                 resource_type: "image",
//               })
//               uploadedImages.push(result.secure_url)
//             } catch (err) {
//               console.log("Error uploading image:", img, err)
//             }
//           }
//         }

//         // ✅ PARSE SIZES - if CSV has format: "S:0.9:10,M:1:15,L:1.1:20"
//         // Format: size:multiplier:stock or size:multiplier:stock:customPrice:useCustomPrice
//         let parsedSizes = []
//         if (item.sizes) {
//           parsedSizes = item.sizes.split(",").map(s => {
//             const parts = s.trim().split(":")
//             const size = parts[0].trim()
//             const multiplier = parseFloat(parts[1]) || 1
//             const stock = parseInt(parts[2]) || 0
//             const customPrice = parts[3] ? parseFloat(parts[3]) : 0
//             const useCustomPrice = parts[4] === 'true' ? true : false

//             return {
//               size,
//               priceMultiplier: multiplier,
//               stock,
//               customPrice,
//               useCustomPrice
//             }
//           })
//         }

//         return {
//           name: item.name,
//           description: item.description,
//           detailedDescription: item.detailedDescription || "",
//           price: Number(item.price),
//           discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//           discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
//           category: item.category,
//           subCategory: item.subCategory,
//           bestseller: item.bestseller === "true",
//           sizes: parsedSizes, // ✅ WITH MULTIPLIERS AND CUSTOM PRICES
//           color: item.color ? item.color.split(",") : [],
//           image: uploadedImages,
//           date: Date.now(),
//         }
//       })
//     )

//     await productModel.insertMany(formattedProducts)
//     fs.unlinkSync(filePath)

//     res.json({
//       success: true,
//       message: `${formattedProducts.length} products uploaded successfully`,
//     })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // BULK UPLOAD WITH ZIP
// const bulkUploadZipProducts = async (req, res) => {
//   try {
//     if (!req.files || !req.files.csv || !req.files.images) {
//       return res.json({ success: false, message: "CSV and ZIP are required" })
//     }

//     const csvPath = req.files.csv[0].path
//     const zipPath = req.files.images[0].path
//     const extractDir = "temp/images"

//     await fs.ensureDir(extractDir)
//     await fs
//       .createReadStream(zipPath)
//       .pipe(unzipper.Extract({ path: extractDir }))
//       .promise()

//     const products = await csv().fromFile(csvPath)
//     const finalProducts = []

//     for (let item of products) {
//       let imageFilenames = item.image ? item.image.split(",") : []
//       let uploadedImages = []

//       for (let filename of imageFilenames) {
//         filename = filename.trim()
//         const localPath = path.join(extractDir, filename)

//         if (fs.existsSync(localPath)) {
//           try {
//             const uploaded = await cloudinary.uploader.upload(localPath, {
//               resource_type: "image",
//               folder: "bulk_upload",
//             })
//             uploadedImages.push(uploaded.secure_url)
//           } catch (err) {
//             console.log("Upload failed:", filename, err.message)
//           }
//         }
//       }

//       // ✅ PARSE SIZES WITH MULTIPLIERS AND CUSTOM PRICES
//       let parsedSizes = []
//       if (item.sizes) {
//         parsedSizes = item.sizes.split(",").map(s => {
//           const parts = s.trim().split(":")
//           const size = parts[0].trim()
//           const multiplier = parseFloat(parts[1]) || 1
//           const stock = parseInt(parts[2]) || 0
//           const customPrice = parts[3] ? parseFloat(parts[3]) : 0
//           const useCustomPrice = parts[4] === 'true' ? true : false

//           return {
//             size,
//             priceMultiplier: multiplier,
//             stock,
//             customPrice,
//             useCustomPrice
//           }
//         })
//       }

//       finalProducts.push({
//         name: item.name,
//         description: item.description,
//         detailedDescription: item.detailedDescription || "",
//         price: Number(item.price),
//         discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//         discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
//         category: item.category,
//         subCategory: item.subCategory,
//         bestseller: item.bestseller === "true",
//         sizes: parsedSizes, // ✅ WITH MULTIPLIERS AND CUSTOM PRICES
//         color: item.color ? item.color.split(",") : [],
//         image: uploadedImages,
//         date: Date.now(),
//       })
//     }

//     await productModel.insertMany(finalProducts)
//     fs.unlinkSync(csvPath)
//     fs.unlinkSync(zipPath)
//     await fs.remove(extractDir)

//     res.json({
//       success: true,
//       message: `${finalProducts.length} products uploaded successfully`,
//     })
//   } catch (err) {
//     console.log(err)
//     res.json({ success: false, message: err.message })
//   }
// }

// export {
//   listProducts,
//   addProduct,
//   removeProduct,
//   singleProduct,
//   updateProduct,
//   bulkUploadProducts,
//   bulkUploadZipProducts
// }





// import { v2 as cloudinary } from "cloudinary"
// import productModel from "../models/productModel.js"
// import csv from "csvtojson"
// import unzipper from 'unzipper'
// import path from "path"
// import fs from "fs-extra"

// // ADD PRODUCT
// const addProduct = async (req, res) => {
//   try {
//     const {
//       name, description, detailedDescription, price, discountPrice,
//       discountActive, category, subCategory, sizes, color, bestseller
//     } = req.body

//     // Validate price
//     const numericPrice = Number(price)
//     const numericDiscount = discountPrice !== undefined && discountPrice !== "" ? Number(discountPrice) : 0

//     if (isNaN(numericPrice) || numericPrice < 0) {
//       return res.json({ success: false, message: "Invalid product price" })
//     }
//     if (numericDiscount < 0) {
//       return res.json({ success: false, message: "Invalid discount price" })
//     }
//     if (numericDiscount > 0 && numericDiscount >= numericPrice) {
//       return res.json({ success: false, message: "Discount price must be less than product price" })
//     }

//     // Upload images
//     const images = req.files || [];

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: 'image'
//         });
//         return result.secure_url;
//       })
//     );

//     // const image1 = req.files.image1 && req.files.image1[0]
//     // const image2 = req.files.image2 && req.files.image2[0]
//     // const image3 = req.files.image3 && req.files.image3[0]
//     // const image4 = req.files.image4 && req.files.image4[0]
//     // const image5 = req.files.image5 && req.files.image5[0]

//     // const images = [image1, image2, image3, image4, image5].filter((item) => item !== undefined)

//     // let imagesUrl = [];

//     // for (let item of images) {
//     //   try {
//     //     const result = await cloudinary.uploader.upload(item.path, {
//     //       resource_type: 'image'
//     //     });
//     //     imagesUrl.push(result.secure_url);
//     //   } catch (err) {
//     //     console.log("Cloudinary upload error:", err);
//     //     return res.status(500).json({
//     //       success: false,
//     //       message: "Image upload failed"
//     //     });
//     //   }
//     // }
//     // let imagesUrl = await Promise.all(
//     //   images.map(async (item) => {
//     //     let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
//     //     return result.secure_url
//     //   })
//     // )

//     // ✅ PARSE SIZES WITH PRICE MULTIPLIERS
//     let parsedSizes = []
//     try {
//       parsedSizes = JSON.parse(sizes)
//       // Validate that sizes are in correct format
//       parsedSizes = parsedSizes.map(sizeObj => ({
//         size: sizeObj.size,
//         priceMultiplier: sizeObj.priceMultiplier || 1,
//         stock: sizeObj.stock || 0
//       }))
//     } catch (e) {
//       return res.json({ success: false, message: "Invalid sizes format. Expected: [{size:'S', priceMultiplier:1, stock:10}]" })
//     }

//     const productData = {
//       name,
//       description,
//       detailedDescription,
//       category,
//       price: Number(price),
//       discountPrice: numericDiscount,
//       discountActive: numericDiscount > 0,
//       subCategory,
//       bestseller: bestseller === "true" ? true : false,
//       sizes: parsedSizes, // ✅ NOW STORES OBJECTS WITH MULTIPLIERS
//       color: JSON.parse(color),
//       image: imagesUrl,
//       date: Date.now()
//     }

//     const product = new productModel(productData)
//     await product.save()

//     res.json({ success: true, message: "Product Added" })

//     // } catch (error) {
//     //   console.log(error)
//     //   res.json({ success: false, message: error.message })
//     // }
//   } catch (error) {
//     console.log("ADD PRODUCT ERROR:", error)
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// // LIST PRODUCTS
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({})
//     res.json({ success: true, products })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // REMOVE PRODUCT
// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({ success: true, message: "Product Removed" })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ✅ FIXED: SINGLE PRODUCT - Returns product with sizes as objects
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)

//     if (!product) {
//       return res.json({ success: false, message: "Product not found" })
//     }

//     // ✅ Convert to plain object
//     const productObj = product.toObject()

//     // ✅ IMPORTANT: Ensure sizes are objects (not strings)
//     // Handle case where sizes might be old string format
//     if (productObj.sizes && productObj.sizes.length > 0) {
//       productObj.sizes = productObj.sizes.map(sizeItem => {
//         // If it's already an object with size property, return it
//         if (typeof sizeItem === 'object' && sizeItem.size) {
//           return {
//             size: sizeItem.size,
//             priceMultiplier: sizeItem.priceMultiplier || 1,
//             stock: sizeItem.stock || 0
//           }
//         }
//         // If it's a string (old format), convert it
//         if (typeof sizeItem === 'string') {
//           return {
//             size: sizeItem,
//             priceMultiplier: 1,
//             stock: 0
//           }
//         }
//         return sizeItem
//       })
//     }

//     res.json({ success: true, product: productObj })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // UPDATE PRODUCT
// const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)

//     if (!product) {
//       return res.json({ success: false, message: "Product not found" })
//     }

//     const {
//       name,
//       description,
//       detailedDescription,
//       price,
//       category,
//       discountPrice,
//       subCategory,
//       sizes,
//       color,
//       bestseller
//     } = req.body

//     // Handle images
//     // const newImagesRaw = [
//     //   req.files?.image1?.[0],
//     //   req.files?.image2?.[0],
//     //   req.files?.image3?.[0],
//     //   req.files?.image4?.[0],
//     //   req.files?.image5?.[0]
//     // ].filter(Boolean)

//     // let newImageUrls = []

//     const newImagesRaw = req.files || [];

//     if (newImagesRaw.length > 0) {
//       newImageUrls = await Promise.all(
//         newImagesRaw.map(async (img) => {
//           const uploaded = await cloudinary.uploader.upload(img.path, {
//             resource_type: "image",
//           })
//           return uploaded.secure_url
//         })
//       )
//     }

//     const updatedImages = newImagesRaw.length > 0 ? newImageUrls : product.image

//     // Handle discount
//     const numericDiscount =
//       discountPrice !== undefined && discountPrice !== ""
//         ? Number(discountPrice)
//         : null

//     const finalDiscountPrice =
//       numericDiscount !== null ? numericDiscount : product.discountPrice

//     const finalDiscountActive =
//       numericDiscount !== null
//         ? numericDiscount > 0
//         : product.discountActive

//     // ✅ PARSE SIZES WITH MULTIPLIERS
//     let parsedSizes = product.sizes
//     if (sizes) {
//       try {
//         parsedSizes = JSON.parse(sizes)
//         parsedSizes = parsedSizes.map(sizeObj => ({
//           size: sizeObj.size,
//           priceMultiplier: sizeObj.priceMultiplier || 1,
//           stock: sizeObj.stock || 0
//         }))
//       } catch (e) {
//         return res.json({ success: false, message: "Invalid sizes format" })
//       }
//     }

//     const updatedData = {
//       name: name ?? product.name,
//       description: description ?? product.description,
//       detailedDescription: detailedDescription ?? product.detailedDescription,
//       price: price ? Number(price) : product.price,
//       discountPrice: finalDiscountPrice,
//       discountActive: finalDiscountActive,
//       category: category ?? product.category,
//       subCategory: subCategory ?? product.subCategory,
//       bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,
//       image: updatedImages,
//       sizes: parsedSizes, // ✅ UPDATE SIZES WITH MULTIPLIERS
//       color: color ? JSON.parse(color) : product.color,
//       updatedAt: Date.now(),
//     }

//     await productModel.findByIdAndUpdate(productId, updatedData, { new: true })

//     res.json({ success: true, message: "Product updated successfully" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // BULK UPLOAD
// const bulkUploadProducts = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.json({ success: false, message: "No file uploaded" })
//     }

//     const filePath = req.file.path
//     let jsonData = []

//     if (req.file.mimetype === "text/csv") {
//       jsonData = await csv().fromFile(filePath)
//     } else {
//       jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
//     }

//     const formattedProducts = await Promise.all(
//       jsonData.map(async (item) => {
//         let uploadedImages = []

//         if (item.image) {
//           const images = item.image.split(",").map((i) => i.trim())

//           for (let img of images) {
//             try {
//               const result = await cloudinary.uploader.upload(img, {
//                 resource_type: "image",
//               })
//               uploadedImages.push(result.secure_url)
//             } catch (err) {
//               console.log("Error uploading image:", img, err)
//             }
//           }
//         }

//         // ✅ PARSE SIZES - if CSV has format: "S:0.9,M:1,L:1.1,XL:1.2,XXL:1.35"
//         let parsedSizes = []
//         if (item.sizes) {
//           parsedSizes = item.sizes.split(",").map(s => {
//             const [size, multiplier] = s.trim().split(":")
//             return {
//               size: size.trim(),
//               priceMultiplier: parseFloat(multiplier) || 1,
//               stock: 0
//             }
//           })
//         }

//         return {
//           name: item.name,
//           description: item.description,
//           detailedDescription: item.detailedDescription || "",
//           price: Number(item.price),
//           discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//           discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
//           category: item.category,
//           subCategory: item.subCategory,
//           bestseller: item.bestseller === "true",
//           sizes: parsedSizes, // ✅ WITH MULTIPLIERS
//           color: item.color ? item.color.split(",") : [],
//           image: uploadedImages,
//           date: Date.now(),
//         }
//       })
//     )

//     await productModel.insertMany(formattedProducts)
//     fs.unlinkSync(filePath)

//     res.json({
//       success: true,
//       message: `${formattedProducts.length} products uploaded successfully`,
//     })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // BULK UPLOAD WITH ZIP
// const bulkUploadZipProducts = async (req, res) => {
//   try {
//     if (!req.files || !req.files.csv || !req.files.images) {
//       return res.json({ success: false, message: "CSV and ZIP are required" })
//     }

//     const csvPath = req.files.csv[0].path
//     const zipPath = req.files.images[0].path
//     const extractDir = "temp/images"

//     await fs.ensureDir(extractDir)
//     await fs
//       .createReadStream(zipPath)
//       .pipe(unzipper.Extract({ path: extractDir }))
//       .promise()

//     const products = await csv().fromFile(csvPath)
//     const finalProducts = []

//     for (let item of products) {
//       let imageFilenames = item.image ? item.image.split(",") : []
//       let uploadedImages = []

//       for (let filename of imageFilenames) {
//         filename = filename.trim()
//         const localPath = path.join(extractDir, filename)

//         if (fs.existsSync(localPath)) {
//           try {
//             const uploaded = await cloudinary.uploader.upload(localPath, {
//               resource_type: "image",
//               folder: "bulk_upload",
//             })
//             uploadedImages.push(uploaded.secure_url)
//           } catch (err) {
//             console.log("Upload failed:", filename, err.message)
//           }
//         }
//       }

//       // ✅ PARSE SIZES WITH MULTIPLIERS
//       let parsedSizes = []
//       if (item.sizes) {
//         parsedSizes = item.sizes.split(",").map(s => {
//           const [size, multiplier] = s.trim().split(":")
//           return {
//             size: size.trim(),
//             priceMultiplier: parseFloat(multiplier) || 1,
//             stock: 0
//           }
//         })
//       }

//       finalProducts.push({
//         name: item.name,
//         description: item.description,
//         detailedDescription: item.detailedDescription || "",
//         price: Number(item.price),
//         discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//         discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
//         category: item.category,
//         subCategory: item.subCategory,
//         bestseller: item.bestseller === "true",
//         sizes: parsedSizes, // ✅ WITH MULTIPLIERS
//         color: item.color ? item.color.split(",") : [],
//         image: uploadedImages,
//         date: Date.now(),
//       })
//     }

//     await productModel.insertMany(finalProducts)
//     fs.unlinkSync(csvPath)
//     fs.unlinkSync(zipPath)
//     await fs.remove(extractDir)

//     res.json({
//       success: true,
//       message: `${finalProducts.length} products uploaded successfully`,
//     })
//   } catch (err) {
//     console.log(err)
//     res.json({ success: false, message: err.message })
//   }
// }

// export {
//   listProducts,
//   addProduct,
//   removeProduct,
//   singleProduct,
//   updateProduct,
//   bulkUploadProducts,
//   bulkUploadZipProducts
// }







// import { v2 as cloudinary } from "cloudinary"
// import productModel from "../models/productModel.js"
// import csv from "csvtojson"
// import unzipper from 'unzipper'
// import path from "path"
// import fs from "fs-extra"
// import mongoose from "mongoose";
// import { generateSeoSlug } from "../utils/slugify.js"



// const parseItemDetailsField = (value = "") => {
//   if (!value) return [];

//   try {
//     return JSON.parse(value)
//       .filter(item => item.title?.trim() && item.value?.trim());
//   } catch (e) {

//     return value
//       .split("::")
//       .map(item => {
//         const [title, val] = item.split(":");

//         return {
//           title: title?.trim(),
//           value: val?.trim()
//         };
//       })
//       .filter(item =>
//         item.title &&
//         item.value
//       );
//   }
// };


// // ─────────────────────────────────────────────
// // ADD PRODUCT
// // ─────────────────────────────────────────────
// const addProduct = async (req, res) => {
//   let parsedItemDetails = [];
//   try {
//     const {
//       sku, name, description, detailedDescription, itemDetails, price, discountPrice,
//       discountActive, category, subCategory, sizes, color, bestseller
//     } = req.body

//     if (!sku) {
//       return res.json({ success: false, message: "SKU is required" })
//     }

//     const normalizedSku = sku.trim().toUpperCase();

//     const existingSku = await productModel.findOne({
//       sku: normalizedSku
//     });

//     if (existingSku) {
//       return res.json({
//         success: false,
//         message: "SKU already exists"
//       });
//     }


//     try {
//       parsedItemDetails = itemDetails
//         ? JSON.parse(itemDetails).filter(
//           item =>
//             item.title?.trim() &&
//             item.value?.trim()
//         )
//         : [];
//     } catch (e) {
//       return res.json({
//         success: false,
//         message: "Invalid itemDetails format"
//       });
//     }

//     const numericPrice = Number(price)
//     const numericDiscount = discountPrice !== undefined && discountPrice !== ""
//       ? Number(discountPrice) : 0

//     if (isNaN(numericPrice) || numericPrice < 0)
//       return res.json({ success: false, message: "Invalid product price" })
//     if (numericDiscount < 0)
//       return res.json({ success: false, message: "Invalid discount price" })
//     if (numericDiscount > 0 && numericDiscount >= numericPrice)
//       return res.json({ success: false, message: "Discount price must be less than product price" })

//     // Upload images
//     const images = req.files || []
//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
//         return result.secure_url
//       })
//     )

//     // ✅ FIX 1 - Parse sizes WITH customPrice & useCustomPrice
//     let parsedSizes = []
//     try {
//       parsedSizes = JSON.parse(sizes).map(sizeObj => ({
//         size: sizeObj.size,
//         priceMultiplier: sizeObj.priceMultiplier || 1,
//         stock: sizeObj.stock || 0,
//         customPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true"
//           ? Number(sizeObj.customPrice) || 0 : 0,
//         useCustomPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true",
//       }))
//     } catch (e) {
//       return res.json({ success: false, message: "Invalid sizes format" })
//     }

//     const productData = {
//       sku: normalizedSku,
//       slug: generateSeoSlug(name, category, subCategory, normalizedSku),
//       name,
//       description,
//       detailedDescription,
//       itemDetails: parsedItemDetails,
//       category,
//       subCategory,
//       price: numericPrice,
//       discountPrice: numericDiscount,
//       discountActive: numericDiscount > 0,
//       bestseller: bestseller === "true",
//       sizes: parsedSizes,
//       color: JSON.parse(color),
//       image: imagesUrl,
//       date: Date.now()
//     }

//     const product = new productModel(productData)
//     await product.save()
//     res.json({ success: true, message: "Product Added" })

//   } catch (error) {
//     console.log("ADD PRODUCT ERROR:", error)
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// // ─────────────────────────────────────────────
// // LIST PRODUCTS
// // ─────────────────────────────────────────────
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({})
//     res.json({ success: true, products })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ─────────────────────────────────────────────
// // REMOVE PRODUCT
// // ─────────────────────────────────────────────
// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({ success: true, message: "Product Removed" })
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ─────────────────────────────────────────────
// // SINGLE PRODUCT
// // ─────────────────────────────────────────────
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     // const product = await productModel.findById(productId)
//     let product;
//     if (mongoose.Types.ObjectId.isValid(productId)) {
//       product = await productModel.findById(productId);
//     } else {
//       product = await productModel.findOne({
//         slug: productId
//       });
//     }
//     if (!product)
//       return res.json({ success: false, message: "Product not found" })

//     const productObj = product.toObject()

//     // ✅ FIX 2 - Return customPrice & useCustomPrice (were missing before!)
//     if (productObj.sizes?.length > 0) {
//       productObj.sizes = productObj.sizes.map(sizeItem => {
//         if (typeof sizeItem === 'string') {
//           return { size: sizeItem, priceMultiplier: 1, stock: 0, customPrice: 0, useCustomPrice: false }
//         }
//         return {
//           size: sizeItem.size,
//           priceMultiplier: sizeItem.priceMultiplier || 1,
//           stock: sizeItem.stock ?? 0,
//           customPrice: sizeItem.customPrice ?? 0,       // ✅ FIXED
//           useCustomPrice: sizeItem.useCustomPrice ?? false, // ✅ FIXED
//         }
//       })
//     }

//     res.json({ success: true, product: productObj })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ─────────────────────────────────────────────
// // UPDATE PRODUCT
// // ─────────────────────────────────────────────
// const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)
//     if (!product)
//       return res.json({ success: false, message: "Product not found" })

//     const {
//       sku, name, description, detailedDescription,
//       itemDetails, price, discountPrice, category, subCategory,
//       sizes, color, bestseller,
//       existingImages  // ✅ FIX 3 - Frontend se existing images
//     } = req.body

//     // ── IMAGE HANDLING ────────────────────────
//     // ✅ FIX 3 - Use existingImages + new files (delete support)
//     const keptImages = existingImages ? JSON.parse(existingImages) : product.image
//     const newImagesRaw = req.files || []
//     let newImageUrls = [] // ✅ FIX - was undeclared before (caused crash)

//     if (newImagesRaw.length > 0) {
//       newImageUrls = await Promise.all(
//         newImagesRaw.map(async (img) => {
//           const uploaded = await cloudinary.uploader.upload(img.path, { resource_type: "image" })
//           return uploaded.secure_url
//         })
//       )
//     }

//     const normalizedSku = sku
//       ? sku.trim().toUpperCase()
//       : product.sku;

//     if (
//       normalizedSku &&
//       normalizedSku !== product.sku
//     ) {
//       const exists = await productModel.findOne({
//         sku: normalizedSku,
//         _id: { $ne: productId }
//       });

//       if (exists) {
//         return res.json({
//           success: false,
//           message: "SKU already exists"
//         });
//       }
//     }

//     let parsedItemDetails = product.itemDetails || [];

//     if (itemDetails) {
//       try {
//         parsedItemDetails = JSON.parse(itemDetails)
//           .filter(
//             item =>
//               item.title?.trim() &&
//               item.value?.trim()
//           );
//       } catch (e) {
//         return res.json({
//           success: false,
//           message: "Invalid itemDetails format"
//         });
//       }
//     }


//     // Kept existing + new = final images, max 10
//     const updatedImages = [...keptImages, ...newImageUrls].slice(0, 10)

//     // ── DISCOUNT ──────────────────────────────
//     const numericDiscount = discountPrice !== undefined && discountPrice !== ""
//       ? Number(discountPrice) : null
//     const finalDiscountPrice = numericDiscount !== null ? numericDiscount : product.discountPrice
//     const finalDiscountActive = numericDiscount !== null ? numericDiscount > 0 : product.discountActive

//     // ── SIZES ─────────────────────────────────
//     // ✅ FIX 1 - customPrice & useCustomPrice properly save
//     let parsedSizes = product.sizes
//     if (sizes) {
//       try {
//         parsedSizes = JSON.parse(sizes).map(sizeObj => ({
//           size: sizeObj.size,
//           priceMultiplier: sizeObj.priceMultiplier || 1,
//           stock: sizeObj.stock || 0,
//           customPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true"
//             ? Number(sizeObj.customPrice) || 0 : 0,
//           useCustomPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true",
//         }))
//       } catch (e) {
//         return res.json({ success: false, message: "Invalid sizes format" })
//       }
//     }

//     const finalName = name ?? product.name;
//     const finalCategory = category ?? product.category;
//     const finalSubCategory = subCategory ?? product.subCategory;
//     const slug = generateSeoSlug(finalName, finalCategory, finalSubCategory, normalizedSku);

//     const updatedData = {
//       sku: normalizedSku,
//       slug,
//       name: name ?? product.name,
//       description: description ?? product.description,
//       detailedDescription: detailedDescription ?? product.detailedDescription,
//       itemDetails: parsedItemDetails,
//       price: price ? Number(price) : product.price,
//       discountPrice: finalDiscountPrice,
//       discountActive: finalDiscountActive,
//       category: category ?? product.category,
//       subCategory: subCategory ?? product.subCategory,
//       bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,
//       image: updatedImages,
//       sizes: parsedSizes,
//       color: color ? JSON.parse(color) : product.color,
//       updatedAt: Date.now(),
//     }

//     await productModel.findByIdAndUpdate(productId, updatedData, { new: true })
//     res.json({ success: true, message: "Product updated successfully" })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ─────────────────────────────────────────────
// // BULK UPLOAD (CSV/JSON)
// // ─────────────────────────────────────────────
// const bulkUploadProducts = async (req, res) => {
//   try {
//     if (!req.file)
//       return res.json({ success: false, message: "No file uploaded" })

//     const filePath = req.file.path
//     let jsonData = []

//     if (req.file.mimetype === "text/csv") {
//       jsonData = await csv().fromFile(filePath)
//     } else {
//       jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
//     }

//     const formattedProducts = await Promise.all(
//       jsonData.map(async (item) => {
//         let uploadedImages = []
//         if (item.image) {
//           for (let img of item.image.split(",").map(i => i.trim())) {
//             try {
//               const result = await cloudinary.uploader.upload(img, { resource_type: "image" })
//               uploadedImages.push(result.secure_url)
//             } catch (err) {
//               console.log("Error uploading image:", img, err)
//             }
//           }
//         }

//         let parsedSizes = []
//         if (item.sizes) {
//           parsedSizes = item.sizes.split(",").map(s => {
//             const [size, multiplier] = s.trim().split(":")
//             return { size: size.trim(), priceMultiplier: parseFloat(multiplier) || 1, stock: 0, customPrice: 0, useCustomPrice: false }
//           })
//         }

//         const parsedItemDetails = parseItemDetailsField(item.itemDetails);

//         return {
//           sku: item.sku.trim().toUpperCase(),
//           slug: generateSeoSlug(        // ✅ ADD THIS
//             item.name,
//             item.category,
//             item.subCategory,
//             item.sku.trim().toUpperCase()
//           ),
//           name: item.name,
//           description: item.description,
//           detailedDescription: item.detailedDescription || "",
//           itemDetails: parsedItemDetails,
//           price: Number(item.price),
//           discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//           discountActive: item.discountPrice && Number(item.discountPrice) > 0,
//           category: item.category,
//           subCategory: item.subCategory,
//           bestseller: item.bestseller === "true",
//           sizes: parsedSizes,
//           color: item.color ? item.color.split(",") : [],
//           image: uploadedImages,
//           date: Date.now(),
//         }
//       })
//     )

//     await productModel.insertMany(formattedProducts)
//     fs.unlinkSync(filePath)
//     res.json({ success: true, message: `${formattedProducts.length} products uploaded successfully` })

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }

// // ─────────────────────────────────────────────
// // BULK UPLOAD WITH ZIP
// // ─────────────────────────────────────────────
// const bulkUploadZipProducts = async (req, res) => {
//   try {
//     if (!req.files || !req.files.csv || !req.files.images)
//       return res.json({ success: false, message: "CSV and ZIP are required" })

//     const csvPath = req.files.csv[0].path
//     const zipPath = req.files.images[0].path
//     const extractDir = "temp/images"

//     await fs.ensureDir(extractDir)
//     await fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: extractDir })).promise()

//     const products = await csv().fromFile(csvPath)
//     const finalProducts = []

//     for (let item of products) {
//       let uploadedImages = []
//       for (let filename of (item.image ? item.image.split(",") : [])) {
//         filename = filename.trim()
//         const localPath = path.join(extractDir, filename)
//         if (fs.existsSync(localPath)) {
//           try {
//             const uploaded = await cloudinary.uploader.upload(localPath, { resource_type: "image", folder: "bulk_upload" })
//             uploadedImages.push(uploaded.secure_url)
//           } catch (err) {
//             console.log("Upload failed:", filename, err.message)
//           }
//         }
//       }

//       let parsedSizes = []
//       if (item.sizes) {
//         parsedSizes = item.sizes.split(",").map(s => {
//           const [size, multiplier] = s.trim().split(":")
//           return { size: size.trim(), priceMultiplier: parseFloat(multiplier) || 1, stock: 0, customPrice: 0, useCustomPrice: false }
//         })
//       }

//       const parsedItemDetails =
//         parseItemDetailsField(item.itemDetails);

//       finalProducts.push({
//         sku: item.sku.trim().toUpperCase(),
//         slug: generateSeoSlug(
//           item.name,
//           item.category,
//           item.subCategory,
//           item.sku.trim().toUpperCase()
//         ),
//         name: item.name,
//         description: item.description,
//         detailedDescription: item.detailedDescription || "",
//         itemDetails: parsedItemDetails,
//         price: Number(item.price),
//         discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
//         discountActive: item.discountPrice && Number(item.discountPrice) > 0,
//         category: item.category,
//         subCategory: item.subCategory,
//         bestseller: item.bestseller === "true",
//         sizes: parsedSizes,
//         color: item.color ? item.color.split(",") : [],
//         image: uploadedImages,
//         date: Date.now(),
//       })
//     }

//     await productModel.insertMany(finalProducts)
//     fs.unlinkSync(csvPath)
//     fs.unlinkSync(zipPath)
//     await fs.remove(extractDir)

//     res.json({ success: true, message: `${finalProducts.length} products uploaded successfully` })

//   } catch (err) {
//     console.log(err)
//     res.json({ success: false, message: err.message })
//   }
// }

// const getProductBySlug = async (req, res) => {
//   try {

//     const { slug } = req.params;

//     const product = await productModel.findOne({
//       slug
//     });

//     if (!product) {
//       return res.json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.json({
//       success: true,
//       product
//     });

//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// const getProductBySku = async (req, res) => {
//   try {

//     const product = await productModel.findOne({
//       sku: req.params.sku.toUpperCase()
//     });

//     if (!product) {
//       return res.json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.json({
//       success: true,
//       product
//     });

//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// export {
//   listProducts, addProduct, removeProduct,
//   singleProduct, updateProduct,
//   bulkUploadProducts, bulkUploadZipProducts,
//   getProductBySlug, getProductBySku
// }




import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import csv from "csvtojson"
import unzipper from 'unzipper'
import path from "path"
import fs from "fs-extra"
import mongoose from "mongoose";
import { generateSeoSlug } from "../utils/slugify.js"

/* ══════════════════════════════════════════════════════════════
   COLOR HANDLING — ported from D Dolly Lamb
   Parses "Black,Brown,Antique Brown:#8A5A44" into
   [{name:"Black", hex:"#000000"}, {name:"Brown", hex:"#92400E"}, ...]
══════════════════════════════════════════════════════════════ */
const DEFAULT_COLOR_HEX = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#EF4444',
  navy: '#1E3A5F',
  'royal blue': '#3B82F6',
  'forest green': '#166534',
  olive: '#4D7C0F',
  yellow: '#EAB308',
  pink: '#EC4899',
  lavender: '#8B5CF6',
  orange: '#F97316',
  brown: '#92400E',
  cream: '#FFFDD0',
  gray: '#9CA3AF',
  charcoal: '#374151',
  maroon: '#7F1D1D',
  'antique brown': '#8A5A44',
}

const resolveColorHex = (rawName = '') => {
  const normalized = String(rawName).trim().toLowerCase().replace(/\s+/g, ' ')
  const compact = normalized.replace(/[\s_-]+/g, '')

  if (DEFAULT_COLOR_HEX[normalized]) return DEFAULT_COLOR_HEX[normalized]

  const aliasMap = {
    navyblue: 'royal blue',
    forestgreen: 'forest green',
    antiquebrown: 'antique brown',
  }

  const aliasKey = aliasMap[compact]
  if (aliasKey && DEFAULT_COLOR_HEX[aliasKey]) return DEFAULT_COLOR_HEX[aliasKey]

  return '#000000'
}

const normalizeHex = (value = '') => {
  const raw = String(value).trim().replace(/^#/, '').toUpperCase()
  if (/^[0-9A-F]{3}$/.test(raw) || /^[0-9A-F]{6}$/.test(raw)) return `#${raw}`
  return ''
}

const parseColorToken = (token = '') => {
  const raw = String(token).trim()
  if (!raw) return null

  let name = raw
  let hexCandidate = ''

  if (raw.includes('|')) {
    const [n, h] = raw.split('|')
    name = (n || '').trim()
    hexCandidate = (h || '').trim()
  } else if (raw.includes(':')) {
    const [n, h] = raw.split(':')
    name = (n || '').trim()
    hexCandidate = (h || '').trim()
  } else {
    const parenMatch = raw.match(/^(.*?)\((#?[0-9a-fA-F]{3,6})\)$/)
    if (parenMatch) {
      name = (parenMatch[1] || '').trim()
      hexCandidate = (parenMatch[2] || '').trim()
    } else {
      const hashMatch = raw.match(/^(.*?)(#?[0-9a-fA-F]{3,6})$/)
      if (hashMatch && hashMatch[1]?.trim()) {
        name = hashMatch[1].trim()
        hexCandidate = hashMatch[2]
      }
    }
  }

  name = name.replace(/\s+/g, ' ').trim()
  if (!name) return null

  const normalizedHex = normalizeHex(hexCandidate)
  return {
    name,
    hex: normalizedHex || resolveColorHex(name),
  }
}

const normalizeColorInput = (colorValue) => {
  if (!colorValue) return []
  if (Array.isArray(colorValue)) {
    return colorValue.flatMap((item) => normalizeColorInput(item))
  }
  if (typeof colorValue === 'string') {
    const parsed = colorValue
      .split(',')
      .map((token) => parseColorToken(token))
      .filter(Boolean)

    const seen = new Set()
    return parsed.filter((c) => {
      const key = c.name.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
  if (typeof colorValue === 'object') {
    const name = String(colorValue.name || colorValue.value || '').trim()
    if (!name) return []
    return [{
      name,
      hex: normalizeHex(colorValue.hex) || resolveColorHex(name)
    }]
  }
  return []
}

/* ══════════════════════════════════════════════════════════════
   SIZES PARSER (bulk) — ported from D Dolly Lamb
   Supports:
     S:0.9:10              → multiplier mode, multiplier=0.9, stock=10
     S:custom:2499:10      → explicit custom mode
     S:2499:10:custom      → explicit custom mode (suffix form)
     S:2499:10             → shorthand custom mode (if value > 2, treated as price)
══════════════════════════════════════════════════════════════ */
const parseBulkSizes = (sizesValue = '') => {
  if (!sizesValue || typeof sizesValue !== 'string') return []

  return sizesValue
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const parts = entry.split(':').map((p) => p.trim())
      const size = parts[0]
      if (!size) return null

      const base = {
        size,
        priceMultiplier: 1,
        stock: 0,
        customPrice: 0,
        useCustomPrice: false,
      }

      const p1 = parts[1]?.toLowerCase()
      const p2 = parts[2]
      const p3 = parts[3]
      const p4 = parts[4]

      // Explicit custom mode: size:custom:2499:10
      if (p1 === 'custom') {
        base.customPrice = Number(p2) || 0
        base.stock = Number.isNaN(parseInt(p3, 10)) ? 0 : parseInt(p3, 10)
        base.useCustomPrice = true
        return base
      }

      // Explicit custom mode: size:2499:10:custom
      if (parts.length >= 4 && p3?.toLowerCase() === 'custom') {
        base.customPrice = Number(parts[1]) || 0
        base.stock = Number.isNaN(parseInt(parts[2], 10)) ? 0 : parseInt(parts[2], 10)
        base.useCustomPrice = true
        return base
      }

      // Shorthand custom mode: size:2499:10
      // If first numeric value is > 2 and stock is present, treat it as customPrice.
      if (parts.length >= 3 && Number(parts[1]) > 2) {
        base.customPrice = Number(parts[1]) || 0
        base.stock = Number.isNaN(parseInt(parts[2], 10)) ? 0 : parseInt(parts[2], 10)
        base.useCustomPrice = true
        return base
      }

      // Multiplier mode + optional stock/custom
      base.priceMultiplier = Number(parts[1]) || 1
      if (parts[2] !== undefined && parts[2] !== '') {
        base.stock = Number.isNaN(parseInt(parts[2], 10)) ? 0 : parseInt(parts[2], 10)
      }

      // Backward-compatible implicit custom mode when customPrice is provided.
      if (parts[3] !== undefined && parts[3] !== '') {
        base.customPrice = Number(parts[3]) || 0
        base.useCustomPrice = true
      }

      if (parts[4] !== undefined && parts[4] !== '') {
        base.useCustomPrice = parts[4].toLowerCase() === 'true'
      }

      return base
    })
    .filter(Boolean)
}

/* ══════════════════════════════════════════════════════════════
   itemDetails PARSER
   Supports JSON array OR "Key: Value::Key: Value" string
══════════════════════════════════════════════════════════════ */
const parseItemDetailsField = (value = "") => {
  if (!value) return [];

  try {
    return JSON.parse(value)
      .filter(item => item.title?.trim() && item.value?.trim());
  } catch (e) {
    return value
      .split("::")
      .map(item => {
        const [title, val] = item.split(":");
        return {
          title: title?.trim(),
          value: val?.trim()
        };
      })
      .filter(item =>
        item.title &&
        item.value
      );
  }
};

/* ══════════════════════════════════════════════════════════════
   DISCOUNT HELPER — frontend sends discountPrice as a PERCENTAGE
   (field label is "Discount_(In_%)"). Backend must convert that
   percentage into an actual rupee discount price before saving.
   This fixes the silent wrong-pricing bug.
══════════════════════════════════════════════════════════════ */
const resolveDiscountFromPercent = (price, discountPercentRaw) => {
  const numericPrice = Number(price) || 0
  const percent = discountPercentRaw !== undefined && discountPercentRaw !== '' && discountPercentRaw !== null
    ? Number(discountPercentRaw)
    : 0

  if (!percent || percent <= 0 || isNaN(percent)) {
    return { discountPrice: 0, discountActive: false }
  }

  // Clamp percent between 0–100 to avoid negative or absurd prices
  const clampedPercent = Math.min(Math.max(percent, 0), 100)
  const discountPrice = Math.round(numericPrice * (1 - clampedPercent / 100))

  return {
    discountPrice: discountPrice > 0 ? discountPrice : 0,
    discountActive: discountPrice > 0 && discountPrice < numericPrice,
  }
}

/* ══════════════════════════════════════════════════════════════
   ADD PRODUCT (single, from admin form)
══════════════════════════════════════════════════════════════ */
const addProduct = async (req, res) => {
  try {
    const {
      sku, name, description, detailedDescription, itemDetails, price, discountPrice,
      discountActive, category, subCategory, sizes, color, bestseller
    } = req.body

    if (!sku || !sku.toString().trim()) {
      return res.json({ success: false, message: "SKU is required" })
    }

    const normalizedSku = sku.trim().toUpperCase();

    const existingSku = await productModel.findOne({ sku: normalizedSku });
    if (existingSku) {
      return res.json({ success: false, message: "SKU already exists" });
    }

    let parsedItemDetails = [];
    try {
      parsedItemDetails = itemDetails
        ? JSON.parse(itemDetails).filter(item => item.title?.trim() && item.value?.trim())
        : [];
    } catch (e) {
      return res.json({ success: false, message: "Invalid itemDetails format" });
    }

    const numericPrice = Number(price)
    const numericDiscount = discountPrice !== undefined && discountPrice !== ""
      ? Number(discountPrice) : 0

    if (isNaN(numericPrice) || numericPrice < 0)
      return res.json({ success: false, message: "Invalid product price" })
    if (numericDiscount < 0)
      return res.json({ success: false, message: "Invalid discount price" })
    if (numericDiscount > 0 && numericDiscount >= numericPrice)
      return res.json({ success: false, message: "Discount price must be less than product price" })

    // Upload images
    const images = req.files || []
    let imagesUrl = []
    try {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
          return result.secure_url
        })
      )
    } catch (uploadErr) {
      console.error("IMAGE UPLOAD ERROR:", uploadErr.message)
      return res.json({ success: false, message: "One or more images failed to upload" })
    }

    // Parse sizes WITH customPrice & useCustomPrice (admin form sends JSON array directly)
    let parsedSizes = []
    try {
      parsedSizes = JSON.parse(sizes).map(sizeObj => ({
        size: sizeObj.size,
        priceMultiplier: sizeObj.priceMultiplier || 1,
        stock: sizeObj.stock || 0,
        customPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true"
          ? Number(sizeObj.customPrice) || 0 : 0,
        useCustomPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true",
      }))
    } catch (e) {
      return res.json({ success: false, message: "Invalid sizes format" })
    }

    let parsedColor = []
    try {
      parsedColor = color ? JSON.parse(color) : []
    } catch (e) {
      return res.json({ success: false, message: "Invalid color format" })
    }

    const productData = {
      sku: normalizedSku,
      slug: generateSeoSlug(name, category, subCategory, normalizedSku),
      name,
      description,
      detailedDescription,
      itemDetails: parsedItemDetails,
      category,
      subCategory,
      price: numericPrice,
      discountPrice: numericDiscount,
      discountActive: numericDiscount > 0,
      bestseller: bestseller === "true",
      sizes: parsedSizes,
      color: parsedColor,
      image: imagesUrl,
      date: Date.now()
    }

    const product = new productModel(productData)
    await product.save()
    res.json({ success: true, message: "Product Added" })

  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

/* ══════════════════════════════════════════════════════════════
   LIST PRODUCTS
══════════════════════════════════════════════════════════════ */
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).lean();
    res.json({ success: true, products })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

/* ══════════════════════════════════════════════════════════════
   REMOVE PRODUCT
══════════════════════════════════════════════════════════════ */
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

/* ══════════════════════════════════════════════════════════════
   SINGLE PRODUCT (by id or slug)
══════════════════════════════════════════════════════════════ */
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    let product;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      product = await productModel.findById(productId);
    } else {
      product = await productModel.findOne({ slug: productId });
    }
    if (!product)
      return res.json({ success: false, message: "Product not found" })

    const productObj = product.toObject()

    if (productObj.sizes?.length > 0) {
      productObj.sizes = productObj.sizes.map(sizeItem => {
        if (typeof sizeItem === 'string') {
          return { size: sizeItem, priceMultiplier: 1, stock: 0, customPrice: 0, useCustomPrice: false }
        }
        return {
          size: sizeItem.size,
          priceMultiplier: sizeItem.priceMultiplier || 1,
          stock: sizeItem.stock ?? 0,
          customPrice: sizeItem.customPrice ?? 0,
          useCustomPrice: sizeItem.useCustomPrice ?? false,
        }
      })
    }

    res.json({ success: true, product: productObj })

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel.findOne({ slug });
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getProductBySku = async (req, res) => {
  try {
    const skuParam = req.params.sku
    if (!skuParam) {
      return res.json({ success: false, message: "SKU is required" });
    }
    const product = await productModel.findOne({ sku: skuParam.toUpperCase() });
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ══════════════════════════════════════════════════════════════
   UPDATE PRODUCT
══════════════════════════════════════════════════════════════ */
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    if (!product)
      return res.json({ success: false, message: "Product not found" })

    const {
      sku, name, description, detailedDescription,
      itemDetails, price, discountPrice, category, subCategory,
      sizes, color, bestseller,
      existingImages
    } = req.body

    const keptImages = existingImages ? JSON.parse(existingImages) : product.image
    const removedImages = product.image.filter(img => !keptImages.includes(img))

    const newImagesRaw = req.files || []
    let newImageUrls = []

    if (newImagesRaw.length > 0) {
      try {
        newImageUrls = await Promise.all(
          newImagesRaw.map(async (img) => {
            const uploaded = await cloudinary.uploader.upload(img.path, { resource_type: "image" })
            return uploaded.secure_url
          })
        )
      } catch (uploadErr) {
        console.error("IMAGE UPLOAD ERROR:", uploadErr.message)
        return res.json({ success: false, message: "One or more new images failed to upload" })
      }
    }

    const normalizedSku = sku ? sku.trim().toUpperCase() : product.sku;

    if (normalizedSku && normalizedSku !== product.sku) {
      const exists = await productModel.findOne({
        sku: normalizedSku,
        _id: { $ne: productId }
      });
      if (exists) {
        return res.json({ success: false, message: "SKU already exists" });
      }
    }

    let parsedItemDetails = product.itemDetails || [];
    if (itemDetails) {
      try {
        parsedItemDetails = JSON.parse(itemDetails)
          .filter(item => item.title?.trim() && item.value?.trim());
      } catch (e) {
        return res.json({ success: false, message: "Invalid itemDetails format" });
      }
    }

    const updatedImages = [...keptImages, ...newImageUrls].slice(0, 10)

    const numericDiscount = discountPrice !== undefined && discountPrice !== ""
      ? Number(discountPrice) : null
    const finalDiscountPrice = numericDiscount !== null ? numericDiscount : product.discountPrice
    const finalDiscountActive = numericDiscount !== null ? numericDiscount > 0 : product.discountActive

    let parsedSizes = product.sizes
    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes).map(sizeObj => ({
          size: sizeObj.size,
          priceMultiplier: sizeObj.priceMultiplier || 1,
          stock: sizeObj.stock || 0,
          customPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true"
            ? Number(sizeObj.customPrice) || 0 : 0,
          useCustomPrice: sizeObj.useCustomPrice === true || sizeObj.useCustomPrice === "true",
        }))
      } catch (e) {
        return res.json({ success: false, message: "Invalid sizes format" })
      }
    }

    let parsedColor = product.color
    if (color) {
      try {
        parsedColor = JSON.parse(color)
      } catch (e) {
        return res.json({ success: false, message: "Invalid color format" })
      }
    }

    const finalName = name ?? product.name;
    const finalCategory = category ?? product.category;
    const finalSubCategory = subCategory ?? product.subCategory;
    const slug = generateSeoSlug(finalName, finalCategory, finalSubCategory, normalizedSku);

    const updatedData = {
      sku: normalizedSku,
      slug,
      name: finalName,
      description: description ?? product.description,
      detailedDescription: detailedDescription ?? product.detailedDescription,
      itemDetails: parsedItemDetails,
      price: price ? Number(price) : product.price,
      discountPrice: finalDiscountPrice,
      discountActive: finalDiscountActive,
      category: finalCategory,
      subCategory: finalSubCategory,
      bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,
      image: updatedImages,
      sizes: parsedSizes,
      color: parsedColor,
      updatedAt: Date.now(),
    }

    await productModel.findByIdAndUpdate(productId, updatedData, { new: true })

    // Clean up Cloudinary for images the admin actually removed
    if (removedImages.length > 0) {
      Promise.all(
        removedImages.map(async (url) => {
          try {
            const publicId = url.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(publicId)
          } catch (cleanupErr) {
            console.error("CLOUDINARY CLEANUP ERROR:", cleanupErr.message)
          }
        })
      ).catch(() => { })
    }

    res.json({ success: true, message: "Product updated successfully" })

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

/* ══════════════════════════════════════════════════════════════
   BULK UPLOAD (CSV / Excel / JSON, image URLs)
   — supports create AND update by SKU
   — skips rows missing SKU instead of crashing
   — converts discountPrice percent → rupee amount
   — proper color hex parsing
   — robust sizes parser
══════════════════════════════════════════════════════════════ */
const bulkUploadProducts = async (req, res) => {
  try {
    if (!req.file)
      return res.json({ success: false, message: "No file uploaded" })

    const filePath = req.file.path
    let jsonData = []

    const isCsv =
      req.file.mimetype === "text/csv" ||
      req.file.mimetype === "application/vnd.ms-excel" ||
      req.file.originalname.toLowerCase().endsWith(".csv")

    if (isCsv) {
      jsonData = await csv().fromFile(filePath)
    } else {
      jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }

    let inserted = 0
    let updated = 0
    let skipped = []

    for (const item of jsonData) {

      // SKU REQUIRED — skip row instead of crashing the whole batch
      if (!item.sku || !item.sku.toString().trim()) {
        console.log(`Row skipped — SKU missing for "${item.name || 'unnamed'}"`)
        skipped.push(item.name || 'unnamed row')
        continue
      }

      const normalizedSku = item.sku.toString().trim().toUpperCase()

      // Images
      let uploadedImages = []
      if (item.image) {
        const images = item.image.toString().split(",").map(i => i.trim()).filter(Boolean)
        for (let img of images) {
          try {
            const result = await cloudinary.uploader.upload(img, { resource_type: "image" })
            uploadedImages.push(result.secure_url)
          } catch (err) {
            console.log("Image upload error:", img, err.message)
          }
        }
      }

      const parsedSizes = parseBulkSizes(item.sizes)
      const parsedItemDetails = parseItemDetailsField(item.itemDetails)

      // ✅ Discount: frontend sends a PERCENTAGE — convert to rupee discountPrice
      const { discountPrice, discountActive } = resolveDiscountFromPercent(item.price, item.discountPrice)

      const productData = {
        sku: normalizedSku,
        slug: generateSeoSlug(item.name, item.category, item.subCategory, normalizedSku),
        name: item.name,
        description: item.description,
        detailedDescription: item.detailedDescription || "",
        itemDetails: parsedItemDetails,
        price: Number(item.price) || 0,
        discountPrice,
        discountActive,
        category: item.category,
        subCategory: item.subCategory,
        bestseller: String(item.bestseller).toLowerCase() === "true",
        sizes: parsedSizes,
        color: normalizeColorInput(item.color),
        image: uploadedImages,
        date: Date.now(),
      }

      const existing = await productModel.findOne({ sku: normalizedSku })

      // Preserve existing images if no new images were uploaded for this row
      if (existing && uploadedImages.length === 0) {
        productData.image = existing.image
      }

      if (existing) {
        await productModel.updateOne({ sku: normalizedSku }, { $set: productData })
        updated++
      } else {
        await productModel.create(productData)
        inserted++
      }
    }

    fs.unlinkSync(filePath)

    return res.json({
      success: true,
      message: `${inserted} new products added, ${updated} products updated${skipped.length ? `, ${skipped.length} rows skipped (missing SKU)` : ''}`,
      inserted,
      updated,
      skipped,
    })

  } catch (error) {
    console.error("BULK UPLOAD ERROR:", error)
    // Best-effort cleanup of the uploaded temp file even on failure
    if (req.file?.path) {
      try { fs.unlinkSync(req.file.path) } catch (e) { }
    }
    return res.json({ success: false, message: error.message })
  }
}

/* ══════════════════════════════════════════════════════════════
   BULK UPLOAD WITH ZIP (CSV + local image files)
   — same fixes as above, plus unique extractDir per request
══════════════════════════════════════════════════════════════ */
const bulkUploadZipProducts = async (req, res) => {
  let extractDir = null
  let csvPath = null
  let zipPath = null

  try {
    if (!req.files || !req.files.csv || !req.files.images)
      return res.json({ success: false, message: "CSV and ZIP are required" })

    csvPath = req.files.csv[0].path
    zipPath = req.files.images[0].path

    // ✅ Unique extraction folder per request — avoids concurrent-upload collisions
    extractDir = path.join("temp", `images_${Date.now()}_${Math.random().toString(36).slice(2)}`)

    await fs.ensureDir(extractDir)
    await fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: extractDir })).promise()

    const products = await csv().fromFile(csvPath)

    let inserted = 0
    let updated = 0
    let skipped = []

    for (const item of products) {

      if (!item.sku || !item.sku.toString().trim()) {
        console.log(`Row skipped — SKU missing for "${item.name || 'unnamed'}"`)
        skipped.push(item.name || 'unnamed row')
        continue
      }

      const normalizedSku = item.sku.toString().trim().toUpperCase()

      let uploadedImages = []
      const imageFilenames = item.image ? item.image.toString().split(",") : []

      for (let filename of imageFilenames) {
        filename = filename.trim()
        if (!filename) continue
        const localPath = path.join(extractDir, filename)
        if (fs.existsSync(localPath)) {
          try {
            const uploaded = await cloudinary.uploader.upload(localPath, {
              resource_type: "image",
              folder: "bulk_upload"
            })
            uploadedImages.push(uploaded.secure_url)
          } catch (err) {
            console.log("Upload failed:", filename, err.message)
          }
        } else {
          console.log(`Image not found in ZIP: ${filename}`)
        }
      }

      const parsedSizes = parseBulkSizes(item.sizes)
      const parsedItemDetails = parseItemDetailsField(item.itemDetails)

      const { discountPrice, discountActive } = resolveDiscountFromPercent(item.price, item.discountPrice)

      const productData = {
        sku: normalizedSku,
        slug: generateSeoSlug(item.name, item.category, item.subCategory, normalizedSku),
        name: item.name,
        description: item.description,
        detailedDescription: item.detailedDescription || "",
        itemDetails: parsedItemDetails,
        price: Number(item.price) || 0,
        discountPrice,
        discountActive,
        category: item.category,
        subCategory: item.subCategory,
        bestseller: String(item.bestseller).toLowerCase() === "true",
        sizes: parsedSizes,
        color: normalizeColorInput(item.color),
        image: uploadedImages,
        date: Date.now(),
      }

      const existing = await productModel.findOne({ sku: normalizedSku })

      if (existing && uploadedImages.length === 0) {
        productData.image = existing.image
      }

      if (existing) {
        await productModel.updateOne({ sku: normalizedSku }, { $set: productData })
        updated++
      } else {
        await productModel.create(productData)
        inserted++
      }
    }

    return res.json({
      success: true,
      message: `${inserted} new products added, ${updated} products updated${skipped.length ? `, ${skipped.length} rows skipped (missing SKU)` : ''}`,
      inserted,
      updated,
      skipped,
    })

  } catch (err) {
    console.error("BULK ZIP UPLOAD ERROR:", err)
    return res.json({ success: false, message: err.message })

  } finally {
    // ✅ Cleanup ALWAYS runs, success or failure — avoids orphaned temp files
    if (csvPath) { try { fs.unlinkSync(csvPath) } catch (e) { } }
    if (zipPath) { try { fs.unlinkSync(zipPath) } catch (e) { } }
    if (extractDir) { try { await fs.remove(extractDir) } catch (e) { } }
  }
}

export {
  listProducts, addProduct, removeProduct,
  singleProduct, updateProduct,
  bulkUploadProducts, bulkUploadZipProducts,
  getProductBySlug, getProductBySku
}