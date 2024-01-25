import express from "express";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";
import {
    createCategoryController,
    getAllCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

//Create New Category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

//get All Category
router.get("/get-all-category", getAllCategoryController);

export default router;
