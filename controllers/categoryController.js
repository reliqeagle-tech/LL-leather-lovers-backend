
import categoryModel from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find().sort({ categoryName: 1 });
        res.json({ success: true, categories });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName?.trim()) {
            return res.json({ success: false, message: "Category name is required" });
        }

        const exists = await categoryModel.findOne({
            categoryName: categoryName.trim(),
        });

        if (exists) {
            return res.json({ success: false, message: "Category already exists" });
        }

        const category = await categoryModel.create({
            categoryName: categoryName.trim(),
            subCategories: [],
        });

        res.json({ success: true, category });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const addSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategory } = req.body;

        if (!categoryId || !subCategory?.trim()) {
            return res.json({ success: false, message: "Category and subcategory required" });
        }

        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.json({ success: false, message: "Category not found" });
        }

        const exists = category.subCategories.includes(subCategory.trim());
        if (exists) {
            return res.json({ success: false, message: "Subcategory already exists" });
        }

        category.subCategories.push(subCategory.trim());
        await category.save();

        res.json({ success: true, category });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        await categoryModel.findByIdAndDelete(categoryId);

        res.json({ success: true, message: "Category deleted" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategory } = req.body;

        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.json({ success: false, message: "Category not found" });
        }

        category.subCategories = category.subCategories.filter(
            (sub) => sub !== subCategory
        );

        await category.save();
        res.json({ success: true, message: "Subcategory deleted" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, subCategories } = req.body;

        const update = {};
        if (categoryName?.trim()) update.categoryName = categoryName.trim();
        if (Array.isArray(subCategories)) update.subCategories = subCategories;

        const category = await categoryModel.findByIdAndUpdate(categoryId, update, { new: true });
        if (!category) return res.json({ success: false, message: "Category not found" });

        res.json({ success: true, category });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};