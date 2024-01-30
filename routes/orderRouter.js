import express from "express";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";
import {
    createOrderController,
    getAllOrderController,
    getUserOrdersController,
    orderStatusController,
} from "../controller/orderController.js";

const router = express.Router();

//create order
router.post("/create-order", requireSignIn, createOrderController);

//get all orders
router.get("/get-all-order", requireSignIn, isAdmin, getAllOrderController);

//change Status
router.post("/get-all-order", requireSignIn, isAdmin, getAllOrderController);

//change order status
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

//get user Orders

router.get("/get-user-order", requireSignIn, getUserOrdersController);

export default router;
