import axios from "axios";

export const paymentCheckoutApi = async (payload) => {
    const { amount, cart } = payload;
    return await axios.post("/api/v1/payment/checkout", { amount, cart });
};

export const paymentKeyApi = async () => {
    return await axios.get("/api/v1/payment/getkey");
};

export const paymentVerificationApi = async (payload) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        payload;
    return await axios.post("/api/v1/payment/payment-verification", {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
    });
};
