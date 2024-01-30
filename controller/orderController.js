import OrderModel from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
    try {
        const {
            products,
            paymentOrderId,
            paymentSignature,
            paymentId,
            totalAmount,
        } = req.body;

        if (!products) throw new Error("Products Required");
        if (!paymentOrderId) throw new Error("paymentOrderId Required");
        if (!paymentSignature) throw new Error("paymentSignature Required");
        if (!paymentId) throw new Error("paymentId Required");
        if (!totalAmount) throw new Error("totalAmount Required");

        const order = await OrderModel({
            products,
            paymentOrderId,
            paymentSignature,
            paymentId,
            totalAmount,
            user: req.user._id,
        }).save();

        res.status(201).send({
            success: true,
            message: "Order Created",
            order,
        });
    } catch (error) {
        console.log("Error While Creating order", error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};

//get all orders
export const getAllOrderController = async (req, res) => {
    try {
        const orders = await OrderModel.find({})
            .populate("products.product", "-sizes -description -category")
            .populate("user", "name")
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All Orders",
            orders,
        });
    } catch (error) {
        console.log("Error While Fetching All order", error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};

//Change order status

export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Order Status Changed",
            order,
        });
    } catch (error) {
        console.log("Error While Changing Order Status", error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};

export const getUserOrdersController = async (req, res) => {
    try {
        const { _id } = req.user;
        const orders = await OrderModel.find({ user: _id })
            .populate("products.product", "-sizes -description -category")
            .populate("user", "name")
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All Orders",
            orders,
        });
    } catch (error) {
        console.log("Error While Getting User Orders", error);
        res.status(500).send({
            success: false,
            error,
            message: error.message,
        });
    }
};
