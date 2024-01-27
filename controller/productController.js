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
        console.log(imageObj);
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
