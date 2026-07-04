import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subCategories: [{
        type: String,
        required: true,
        trim: true
    }],
},
    { timestamps: true }
);

const CategoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default CategoryModel;