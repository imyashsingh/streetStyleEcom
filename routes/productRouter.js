import express from "express";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";
import { createProductController } from "../controller/productController.js";

import formidable from "express-formidable";
import upload from "../config/multer.js";

const router = express.Router();

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),

    createProductController
);

export default router;
