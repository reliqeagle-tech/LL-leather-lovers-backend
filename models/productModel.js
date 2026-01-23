// import mongoose from "mongoose";
// import { type } from "os";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true, trim: true }, // Added trim for whitespace
//     description: { type: String, required: true },
//     detailedDescription: { type: String, required: true }, // NEW FIELD
//     price: { type: Number, required: true, min: 0 }, // Prevent negative prices
//     discountPrice: { type: Number, default: 0, min: 0 },
//     discountActive: {type:Boolean, default:false},
//     image: { type: [String], required: true }, // Explicit array of strings (URLs)
//     category: { type: String, required: true, index: true }, // Index for queries
//     subCategory: { type: String, required: true },
//     sizes: { type: [String], required: true, unique: true }, // Unique to avoid duplicates
//     color: { type: [String], required: true, unique: true }, // Unique items
//     // ✅ NEW: For customizations like jacket lining
//     customOptions: {
//         linings: [{
//             name: { type: String, required: true },
//             price: { type: Number, required: true, min: 0 }
//         }] // Default empty; populate via admin UI
//     },
//     bestseller: { type: Boolean, default: false, index: true }, // Default + index
//     date: { type: Date, default: Date.now, required: true }, // Changed to Date; auto-now
//     isDeleted: { type: Boolean, default: false } // Soft delete
// }, {
//     timestamps: true // Auto createdAt/updatedAt
// });


// const productModel = mongoose.models.product || mongoose.model("product", productSchema);

// export default productModel;



import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    
    // BASE PRICE (for reference)
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 },
    discountActive: { type: Boolean, default: false },
    
    image: { type: [String], required: true },
    category: { type: String, required: true, index: true },
    subCategory: { type: String, required: true },
    
    // ✅ NEW: SIZE-BASED PRICING
    // sizes: [{
    //     size: { 
    //         type: String, 
    //         // enum: ['S', 'M', 'L', 'XL', 'XXL'],
    //         required: true 
    //     },
    //     priceMultiplier: { 
    //         type: Number, 
    //         default: 1,
    //         min: 0.5,
    //         max: 2,
    //         required: true 
    //     },
    //     stock: { 
    //         type: Number, 
    //         default: 0,
    //         min: 0 
    //     }
    // }],
    
    sizes: [{
  size: { type: String, required: true },
  priceMultiplier: {
    type: Number,
    default: 1,
    min: 0.5,
    max: 2,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  }
}],

    // color: { type: [String], required: true },
//     color: [{
//   name: { type: String, required: true },
//   hex: { type: String, required: true }
// }],
color: [{
  name: { type: String, required: true },
  hex: { type: String, required: true }
}],

    
    customOptions: {
        linings: [{
            name: { type: String, required: true },
            price: { type: Number, required: true, min: 0 }
        }]
    },
    
    bestseller: { type: Boolean, default: false, index: true },
    date: { type: Date, default: Date.now, required: true },
    isDeleted: { type: Boolean, default: false },
    
}, {
    timestamps: true
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;