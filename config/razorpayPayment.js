import Razorpay from "razorpay";

import dotenv from "dotenv";

dotenv.config();

const instance = await new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default instance;
