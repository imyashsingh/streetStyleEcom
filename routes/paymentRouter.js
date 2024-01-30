import express from "express";
import { requireSignIn } from "../middleware.js/authMiddleware.js";
import {
    paymentCheckoutController,
    paymentVerificationController,
} from "../controller/paymentController.js";

const router = express.Router();

router.post("/checkout", requireSignIn, paymentCheckoutController);

router.get("/getkey", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

router.post(
    "/payment-verification",
    requireSignIn,
    paymentVerificationController
);

export default router;
