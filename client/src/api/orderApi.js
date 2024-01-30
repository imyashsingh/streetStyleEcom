import axios from "axios";

//create new order
export const createOrderApi = async (payload) => {
    const {
        products,
        razorpay_order_id: paymentOrderId,
        razorpay_signature: paymentSignature,
        razorpay_payment_id: paymentId,
        amount: totalAmount,
    } = payload;

    return await axios.post("/api/v1/order/create-order", {
        products,
        paymentOrderId,
        paymentSignature,
        paymentId,
        totalAmount,
    });
};

// get all order
export const getAllOrderApi = async () => {
    return await axios.get("/api/v1/order/get-all-order");
};

//change order status

export const changeOrderStatusApi = async (payload) => {
    const { orderId, status } = payload;
    return await axios.put(`/api/v1/order/order-status/${orderId}`, { status });
};

//get user all order

export const getUserOrderApi = async () => {
    return await axios.get("/api/v1/order/get-user-order");
};
