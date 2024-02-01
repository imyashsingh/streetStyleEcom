import slugify from "slugify";
import CatagoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            throw new Error("Category Name Required");
        }
        const categoryNameSlug = slugify(categoryName, {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            lower: true, // convert to lower case, defaults to `false`
            trim: true, // trim leading and trailing replacement chars, defaults to `true`
        });

        let existingCategory = await CatagoryModel.findOne({
            name: categoryName,
        });
        if (existingCategory) {
            throw new Error("category already exist");
        }
        existingCategory = await CatagoryModel.findOne({
            slug: categoryNameSlug,
        });
        if (existingCategory) {
            throw new Error("category already exist");
        }
        const category = await CatagoryModel({
            name: categoryName,
            slug: categoryNameSlug,
        }).save();

        res.status(201).send({
            success: true,
            message: `${categoryName} Category Created`,
            category,
        });
    } catch (error) {
        console.error("Error in Creating Category <=>", error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};

export const getAllCategoryController = async (req, res) => {
    try {
        const allCategory = await CatagoryModel.find({});

        res.status(201).send({
            success: true,
            message: "All Category List",
            allCategory,
        });
    } catch (error) {
        console.error("Error in Feching All Category <=>", error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};

//updating category
export const updateCategoryController = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const { id } = req.params;
        if (!categoryName) {
            throw new Error("Category Name Required");
        }

        const categoryNameSlug = slugify(categoryName, {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            lower: true, // convert to lower case, defaults to `false`
            trim: true, // trim leading and trailing replacement chars, defaults to `true`
        });

        let existingCategory = await CatagoryModel.findOne({
            name: categoryName,
        });
        if (existingCategory) {
            throw new Error("category already exist");
        }
        existingCategory = await CatagoryModel.findOne({
            slug: categoryNameSlug,
        });
        if (existingCategory) {
            throw new Error("category already exist");
        }

        const category = await CatagoryModel.findByIdAndUpdate(
            id,
            { name: categoryName, slug: categoryNameSlug },
            { new: true }
        );
        res.status(201).send({
            success: true,
            message: `${categoryName} Category Updated Successfully`,
            category,
        });
    } catch (error) {
        console.error("Error in Updating Category <=>", error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};

//delete category controller
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CatagoryModel.findByIdAndDelete(id);
        res.status(201).send({
            success: true,
            message: `${deletedCategory?.name} Category Deleted Successfully`,
            deletedCategory,
        });
    } catch (error) {
        console.error("Error in Deleting Category <=>", error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};
