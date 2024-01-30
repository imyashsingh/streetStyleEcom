import slugify from "slugify";
import ProductModel from "../models/productModel.js";
import CatagoryModel from "../models/categoryModel.js";

import { v2 as cloudinary } from "cloudinary";

export const createProductController = async (req, res) => {
    try {
        const { name, brand, category, price, color, sizes, description } =
            req.body;

        const image = req.file;

        const parseSizes = JSON.parse(sizes);

        //validation
        switch (true) {
            case !name:
                throw new Error("Name is Required");
            case !brand:
                throw new Error("Brand is Required");
            case !category:
                throw new Error("Category is Required");
            case !price:
                throw new Error("Price is Required");
            case !color:
                throw new Error("Color is Required");
            case !parseSizes:
                throw new Error("Sizes And Quantity is Required");
            case !description:
                throw new Error("Description is Required");
            case !image:
                throw new Error("Image is Required");
            case image.size * 1 > 5 * 1024 * 1024:
                throw new Error("Image Size Should be less then 5 MB");
        }

        const slug = slugify(name, {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            lower: true, // convert to lower case, defaults to `false`
            trim: true, // trim leading and trailing replacement chars, defaults to `true`
        });

        let existingProduct = await ProductModel.findOne({ name });
        if (existingProduct) {
            throw new Error("Product already exist");
        }
        existingProduct = await ProductModel.findOne({ slug });
        if (existingProduct) {
            throw new Error("Product already exist");
        }

        const categoryexist = await CatagoryModel.findById(category);

        if (!categoryexist) {
            throw new Error("Category Not Exist");
        }

        //Image upload to cloud
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;

        const imageStoreRes = await cloudinary.uploader.upload(dataURI, {
            resource_type: "image",
            folder: "streetStyle/images",
        });

        if (!imageStoreRes?.secure_url || !imageStoreRes?.public_id)
            throw new Error("Error While Uploading File To Cloud");

        const imageObj = {
            url: imageStoreRes?.secure_url,
            publicId: imageStoreRes?.public_id,
        };

        const product = await ProductModel({
            name,
            brand,
            category,
            slug,
            price,
            color,
            sizes: parseSizes,
            description,
            image: imageObj,
        }).save();

        res.status(201).send({
            success: true,
            message: "New Product Created",
            product,
        });
    } catch (error) {
        console.log("Error While Creating Product".error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};

//update product

export const updateProductController = async (req, res) => {
    try {
        const { name, brand, category, price, color, sizes, description } =
            req.body;

        const { pid } = req.params;

        const image = req.file;

        const parseSizes = JSON.parse(sizes);

        //validation
        switch (true) {
            case !name:
                throw new Error("Name is Required");
            case !brand:
                throw new Error("Brand is Required");
            case !category:
                throw new Error("Category is Required");
            case !price:
                throw new Error("Price is Required");
            case !color:
                throw new Error("Color is Required");
            case !parseSizes:
                throw new Error("Sizes And Quantity is Required");
            case !description:
                throw new Error("Description is Required");

            case image && image.size * 1 > 5 * 1024 * 1024:
                throw new Error("Image Size Should be less then 5 MB");
        }

        const slug = slugify(name, {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            lower: true, // convert to lower case, defaults to `false`
            trim: true, // trim leading and trailing replacement chars, defaults to `true`
        });

        let existingProduct = await ProductModel.findOne({
            _id: { $ne: pid },
            name,
        });
        if (existingProduct) {
            throw new Error("Product already exist");
        }
        existingProduct = await ProductModel.findOne({
            _id: { $ne: pid },
            slug,
        });
        if (existingProduct) {
            throw new Error("Product already exist");
        }

        const categoryexist = await CatagoryModel.findById(category);

        if (!categoryexist) {
            throw new Error("Category Not Exist");
        }
        //Editied product
        let editProduct = {
            name,
            brand,
            category,
            slug,
            price,
            color,
            sizes: parseSizes,
            description,
        };

        //Image upload to cloud

        if (image) {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;

            const imageStoreRes = await cloudinary.uploader.upload(dataURI, {
                resource_type: "image",
                folder: "streetStyle/images",
            });

            if (!imageStoreRes?.secure_url || !imageStoreRes?.public_id)
                throw new Error("Error While Uploading File To Cloud");

            const imageObj = {
                url: imageStoreRes?.secure_url,
                publicId: imageStoreRes?.public_id,
            };
            editProduct = { ...editProduct, image: imageObj };

            //Deleting prev image
            const prevProduct = await ProductModel.findById(pid);

            await cloudinary.uploader
                .destroy(prevProduct?.image?.publicId)
                .then(() => console.log("Image deleted successfully"))
                .catch((error) => {
                    console.log("Error While Deleting image".error);
                    res.status(500).send({
                        success: false,
                        error,
                        message: error.message,
                    });
                });
        }

        const product = await ProductModel.findByIdAndUpdate(pid, editProduct, {
            new: true,
        });

        res.status(201).send({
            success: true,
            message: "New Product Created",
            product,
        });
    } catch (error) {
        console.log("Error While Updating Product", error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};

//Get Product with filter and pagination

export const getProductsController = async (req, res) => {
    try {
        let { search, page = 1, sortprice, category, brand, size } = req.query;

        //Pre page products
        const perPage = 6;
        //Pagination with filter
        if (page < 1) {
            page = 1;
        }
        const skipProduct = (page - 1) * perPage;

        //adding filter
        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ],
            };
        }
        if (category) filter.category = category;

        if (brand) filter.brand = { $regex: brand, $options: "i" };

        if (size) filter.sizes = { $elemMatch: { size: size } };

        //sort
        let sortBy = {};

        if (sortprice) {
            if (sortprice === "asc") {
                sortBy.price = 1;
            } else {
                sortBy.price = -1;
            }
        }
        sortBy.createdAt = -1;

        const products = await ProductModel.find(filter)
            .sort(sortBy)
            .skip(skipProduct)
            .limit(perPage)
            .populate("category");

        res.status(200).send({
            success: true,
            message: "Product Fetch Successfully",
            productsCount: products.length,
            products,
        });
    } catch (error) {
        console.log("Error While Fetching Filtered Product".error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};

//Get single Product
export const getSingleProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await ProductModel.findById(pid).populate("category");

        res.status(200).send({
            success: true,
            message: "Single Product Fetch Successfully",
            product,
        });
    } catch (error) {
        console.log("Error While Fetching Single Product".error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};

//delete product

export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const deleteProduct = await ProductModel.findById(pid);
        //delete image from cloud
        await cloudinary.uploader
            .destroy(deleteProduct?.image?.publicId)
            .then(() => console.log("Image deleted successfully"))
            .catch((error) => {
                console.log("Error While Deleting image".error);
                res.status(500).send({
                    success: false,
                    error,
                    message: error.message,
                });
            });

        //delete database
        await ProductModel.findByIdAndDelete(pid);
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        console.log("Error While Deleting Product".error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};
