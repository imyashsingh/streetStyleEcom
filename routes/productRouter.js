import express from "express";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";
import {
    createProductController,
    deleteProductController,
    getProductsController,
    getSingleProductController,
    updateProductController,
} from "../controller/productController.js";

import { imageUploadMiddleware } from "../middleware.js/multerMiddleware.js";

const router = express.Router();

// Create New Product
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    imageUploadMiddleware,
    createProductController
);

//update Product
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    imageUploadMiddleware,
    updateProductController
);

//Delete product
router.delete(
    "/delete-product/:pid",
    requireSignIn,
    isAdmin,
    deleteProductController
);

//Get all product with filters
router.get("/get-product", getProductsController);

//Get Single Product
router.get("/get-product/:pid", getSingleProductController);

export default router;
