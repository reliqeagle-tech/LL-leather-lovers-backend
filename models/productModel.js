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



// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true, trim: true },
//     description: { type: String, required: true },
//     detailedDescription: { type: String, required: true },

//     // BASE PRICE (for reference)
//     price: { type: Number, required: true, min: 0 },
//     discountPrice: { type: Number, default: 0, min: 0 },
//     discountActive: { type: Boolean, default: false },

//     image: { type: [String], required: true },
//     category: { type: String, required: true, index: true },
//     subCategory: { type: String, required: true },

//     // ✅ NEW: SIZE-BASED PRICING
//     // sizes: [{
//     //     size: { 
//     //         type: String, 
//     //         // enum: ['S', 'M', 'L', 'XL', 'XXL'],
//     //         required: true 
//     //     },
//     //     priceMultiplier: { 
//     //         type: Number, 
//     //         default: 1,
//     //         min: 0.5,
//     //         max: 2,
//     //         required: true 
//     //     },
//     //     stock: { 
//     //         type: Number, 
//     //         default: 0,
//     //         min: 0 
//     //     }
//     // }],

//     sizes: [{
//   size: { type: String, required: true },
//   priceMultiplier: {
//     type: Number,
//     default: 1,
//     min: 0.5,
//     max: 2,
//     required: true
//   },
//   stock: {
//     type: Number,
//     default: 0,
//     min: 0
//   }
// }],

//     // color: { type: [String], required: true },
// //     color: [{
// //   name: { type: String, required: true },
// //   hex: { type: String, required: true }
// // }],
// color: [{
//   name: { type: String, required: true },
//   hex: { type: String, required: true }
// }],


//     customOptions: {
//         linings: [{
//             name: { type: String, required: true },
//             price: { type: Number, required: true, min: 0 }
//         }]
//     },

//     bestseller: { type: Boolean, default: false, index: true },
//     date: { type: Date, default: Date.now, required: true },
//     isDeleted: { type: Boolean, default: false },

// }, {
//     timestamps: true
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

    // ✅ UPDATED: SIZE-BASED PRICING WITH CUSTOM PRICE OPTION
    sizes: [{
        size: {
            type: String,
            required: true
        },
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
        },
        // ✅ NEW FIELDS FOR CUSTOM PRICING
        customPrice: {
            type: Number,
            default: 0,
            min: 0
        },
        useCustomPrice: {
            type: Boolean,
            default: false
        }
    }],

    // ✅ COLORS WITH HEX VALUES
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

    itemDetails: [
        {
            title: {
                type: String,
                trim: true
            },

            value: {
                type: String,
                trim: true
            }
        }
    ],
    sku: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
        index: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
        // Stores: "men-tshirts-nike-air-max-nk001" (flat, no slashes)
    },

    bestseller: { type: Boolean, default: false, index: true },
    date: { type: Date, default: Date.now, required: true },
    isDeleted: { type: Boolean, default: false },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    },

}, {
    timestamps: true
});

// ✅ ADD VIRTUAL FIELD TO CALCULATE FINAL PRICE FOR EACH SIZE
productSchema.methods.getFinalPrice = function (sizeLabel) {
    const sizeObj = this.sizes.find(s => s.size === sizeLabel);
    if (!sizeObj) return this.price;

    // Use custom price if enabled, otherwise use multiplier
    if (sizeObj.useCustomPrice && sizeObj.customPrice > 0) {
        return sizeObj.customPrice;
    }

    return this.price * sizeObj.priceMultiplier;
};

// ✅ ADD METHOD TO GET ALL SIZES WITH FINAL PRICES
productSchema.methods.getSizesWithPrices = function () {
    return this.sizes.map(sizeObj => ({
        size: sizeObj.size,
        stock: sizeObj.stock,
        priceMultiplier: sizeObj.priceMultiplier,
        customPrice: sizeObj.customPrice,
        useCustomPrice: sizeObj.useCustomPrice,
        finalPrice: sizeObj.useCustomPrice && sizeObj.customPrice > 0
            ? sizeObj.customPrice
            : this.price * sizeObj.priceMultiplier
    }));
};

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;