import express from "express";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";
import { createProductController } from "../controller/productController.js";

import { imageUploadMiddleware } from "../middleware.js/multerMiddleware.js";

const router = express.Router();

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    imageUploadMiddleware,
    createProductController
);

export default router;
