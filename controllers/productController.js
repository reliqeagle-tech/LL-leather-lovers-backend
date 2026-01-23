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










import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import csv from "csvtojson"
import unzipper from 'unzipper'
import path from "path"
import fs from "fs-extra"

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const { 
      name, description, detailedDescription, price, discountPrice, 
      discountActive, category, subCategory, sizes, color, bestseller 
    } = req.body

    // Validate price
    const numericPrice = Number(price)
    const numericDiscount = discountPrice !== undefined && discountPrice !== "" ? Number(discountPrice) : 0

    if (isNaN(numericPrice) || numericPrice < 0) {
      return res.json({ success: false, message: "Invalid product price" })
    }
    if (numericDiscount < 0) {
      return res.json({ success: false, message: "Invalid discount price" })
    }
    if (numericDiscount > 0 && numericDiscount >= numericPrice) {
      return res.json({ success: false, message: "Discount price must be less than product price" })
    }

    // Upload images
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    const image5 = req.files.image5 && req.files.image5[0]

    const images = [image1, image2, image3, image4, image5].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
        return result.secure_url
      })
    )

    // ✅ PARSE SIZES WITH PRICE MULTIPLIERS
    let parsedSizes = []
    try {
      parsedSizes = JSON.parse(sizes)
      // Validate that sizes are in correct format
      parsedSizes = parsedSizes.map(sizeObj => ({
        size: sizeObj.size,
        priceMultiplier: sizeObj.priceMultiplier || 1,
        stock: sizeObj.stock || 0
      }))
    } catch (e) {
      return res.json({ success: false, message: "Invalid sizes format. Expected: [{size:'S', priceMultiplier:1, stock:10}]" })
    }

    const productData = {
      name,
      description,
      detailedDescription,
      category,
      price: Number(price),
      discountPrice: numericDiscount,
      discountActive: numericDiscount > 0,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: parsedSizes, // ✅ NOW STORES OBJECTS WITH MULTIPLIERS
      color: JSON.parse(color),
      image: imagesUrl,
      date: Date.now()
    }

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message: "Product Added" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// LIST PRODUCTS
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({ success: true, products })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// REMOVE PRODUCT
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ✅ FIXED: SINGLE PRODUCT - Returns product with sizes as objects
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    
    if (!product) {
      return res.json({ success: false, message: "Product not found" })
    }

    // ✅ Convert to plain object
    const productObj = product.toObject()
    
    // ✅ IMPORTANT: Ensure sizes are objects (not strings)
    // Handle case where sizes might be old string format
    if (productObj.sizes && productObj.sizes.length > 0) {
      productObj.sizes = productObj.sizes.map(sizeItem => {
        // If it's already an object with size property, return it
        if (typeof sizeItem === 'object' && sizeItem.size) {
          return {
            size: sizeItem.size,
            priceMultiplier: sizeItem.priceMultiplier || 1,
            stock: sizeItem.stock || 0
          }
        }
        // If it's a string (old format), convert it
        if (typeof sizeItem === 'string') {
          return {
            size: sizeItem,
            priceMultiplier: 1,
            stock: 0
          }
        }
        return sizeItem
      })
    }
    
    res.json({ success: true, product: productObj })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    
    if (!product) {
      return res.json({ success: false, message: "Product not found" })
    }

    const {
      name,
      description,
      detailedDescription,
      price,
      category,
      discountPrice,
      subCategory,
      sizes,
      color,
      bestseller
    } = req.body

    // Handle images
    const newImagesRaw = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean)

    let newImageUrls = []

    if (newImagesRaw.length > 0) {
      newImageUrls = await Promise.all(
        newImagesRaw.map(async (img) => {
          const uploaded = await cloudinary.uploader.upload(img.path, {
            resource_type: "image",
          })
          return uploaded.secure_url
        })
      )
    }

    const updatedImages = newImagesRaw.length > 0 ? newImageUrls : product.image

    // Handle discount
    const numericDiscount =
      discountPrice !== undefined && discountPrice !== ""
        ? Number(discountPrice)
        : null

    const finalDiscountPrice =
      numericDiscount !== null ? numericDiscount : product.discountPrice

    const finalDiscountActive =
      numericDiscount !== null
        ? numericDiscount > 0
        : product.discountActive

    // ✅ PARSE SIZES WITH MULTIPLIERS
    let parsedSizes = product.sizes
    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes)
        parsedSizes = parsedSizes.map(sizeObj => ({
          size: sizeObj.size,
          priceMultiplier: sizeObj.priceMultiplier || 1,
          stock: sizeObj.stock || 0
        }))
      } catch (e) {
        return res.json({ success: false, message: "Invalid sizes format" })
      }
    }

    const updatedData = {
      name: name ?? product.name,
      description: description ?? product.description,
      detailedDescription: detailedDescription ?? product.detailedDescription,
      price: price ? Number(price) : product.price,
      discountPrice: finalDiscountPrice,
      discountActive: finalDiscountActive,
      category: category ?? product.category,
      subCategory: subCategory ?? product.subCategory,
      bestseller: bestseller !== undefined ? bestseller === "true" : product.bestseller,
      image: updatedImages,
      sizes: parsedSizes, // ✅ UPDATE SIZES WITH MULTIPLIERS
      color: color ? JSON.parse(color) : product.color,
      updatedAt: Date.now(),
    }

    await productModel.findByIdAndUpdate(productId, updatedData, { new: true })

    res.json({ success: true, message: "Product updated successfully" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// BULK UPLOAD
const bulkUploadProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" })
    }

    const filePath = req.file.path
    let jsonData = []

    if (req.file.mimetype === "text/csv") {
      jsonData = await csv().fromFile(filePath)
    } else {
      jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }

    const formattedProducts = await Promise.all(
      jsonData.map(async (item) => {
        let uploadedImages = []

        if (item.image) {
          const images = item.image.split(",").map((i) => i.trim())

          for (let img of images) {
            try {
              const result = await cloudinary.uploader.upload(img, {
                resource_type: "image",
              })
              uploadedImages.push(result.secure_url)
            } catch (err) {
              console.log("Error uploading image:", img, err)
            }
          }
        }

        // ✅ PARSE SIZES - if CSV has format: "S:0.9,M:1,L:1.1,XL:1.2,XXL:1.35"
        let parsedSizes = []
        if (item.sizes) {
          parsedSizes = item.sizes.split(",").map(s => {
            const [size, multiplier] = s.trim().split(":")
            return {
              size: size.trim(),
              priceMultiplier: parseFloat(multiplier) || 1,
              stock: 0
            }
          })
        }

        return {
          name: item.name,
          description: item.description,
          detailedDescription: item.detailedDescription || "",
          price: Number(item.price),
          discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
          discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
          category: item.category,
          subCategory: item.subCategory,
          bestseller: item.bestseller === "true",
          sizes: parsedSizes, // ✅ WITH MULTIPLIERS
          color: item.color ? item.color.split(",") : [],
          image: uploadedImages,
          date: Date.now(),
        }
      })
    )

    await productModel.insertMany(formattedProducts)
    fs.unlinkSync(filePath)

    res.json({
      success: true,
      message: `${formattedProducts.length} products uploaded successfully`,
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// BULK UPLOAD WITH ZIP
const bulkUploadZipProducts = async (req, res) => {
  try {
    if (!req.files || !req.files.csv || !req.files.images) {
      return res.json({ success: false, message: "CSV and ZIP are required" })
    }

    const csvPath = req.files.csv[0].path
    const zipPath = req.files.images[0].path
    const extractDir = "temp/images"

    await fs.ensureDir(extractDir)
    await fs
      .createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractDir }))
      .promise()

    const products = await csv().fromFile(csvPath)
    const finalProducts = []

    for (let item of products) {
      let imageFilenames = item.image ? item.image.split(",") : []
      let uploadedImages = []

      for (let filename of imageFilenames) {
        filename = filename.trim()
        const localPath = path.join(extractDir, filename)

        if (fs.existsSync(localPath)) {
          try {
            const uploaded = await cloudinary.uploader.upload(localPath, {
              resource_type: "image",
              folder: "bulk_upload",
            })
            uploadedImages.push(uploaded.secure_url)
          } catch (err) {
            console.log("Upload failed:", filename, err.message)
          }
        }
      }

      // ✅ PARSE SIZES WITH MULTIPLIERS
      let parsedSizes = []
      if (item.sizes) {
        parsedSizes = item.sizes.split(",").map(s => {
          const [size, multiplier] = s.trim().split(":")
          return {
            size: size.trim(),
            priceMultiplier: parseFloat(multiplier) || 1,
            stock: 0
          }
        })
      }

      finalProducts.push({
        name: item.name,
        description: item.description,
        detailedDescription: item.detailedDescription || "",
        price: Number(item.price),
        discountPrice: item.discountPrice ? Number(item.discountPrice) : 0,
        discountActive: item.discountPrice && Number(item.discountPrice) > 0 ? true : false,
        category: item.category,
        subCategory: item.subCategory,
        bestseller: item.bestseller === "true",
        sizes: parsedSizes, // ✅ WITH MULTIPLIERS
        color: item.color ? item.color.split(",") : [],
        image: uploadedImages,
        date: Date.now(),
      })
    }

    await productModel.insertMany(finalProducts)
    fs.unlinkSync(csvPath)
    fs.unlinkSync(zipPath)
    await fs.remove(extractDir)

    res.json({
      success: true,
      message: `${finalProducts.length} products uploaded successfully`,
    })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
}

export { 
  listProducts, 
  addProduct, 
  removeProduct, 
  singleProduct, 
  updateProduct, 
  bulkUploadProducts, 
  bulkUploadZipProducts 
}