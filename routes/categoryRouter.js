import express from "express";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    updateCategoryController,
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

//Update Category
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);

//Delete Category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
);
export default router;
