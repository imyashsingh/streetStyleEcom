import instance from "../config/razorpayPayment.js";
import crypto from "crypto";

export const paymentCheckoutController = async (req, res) => {
    try {
        const { amount, cart } = req.body;
        if (!amount) throw new Error("Amount Not Provided");
        if (!cart) throw new Error("Cart Product Bot Provided");

        const order = await instance.orders.create({
            amount: Number(amount * 100),
            currency: "INR",
        });

        console.log(order);
        res.status(200).send({
            success: true,
            order,
            cart,
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error In Payment",
        });
    }
};

export const paymentVerificationController = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            req.body;

        let hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

        // Passing the data to be hashed
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

        // Creating the hmac in the required format
        const generated_signature = hmac.digest("hex");

        if (razorpay_signature === generated_signature) {
            res.status(200).send({
                success: true,
                message: "Payment has been verified",
            });
        } else {
            throw new Error("Payment verification failed");
        }
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error In Payment Verification",
        });
    }
};
