import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Database Connection
const connectDB = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("Database Connected"))
        .catch((err) => console.error("Database Connection Error <=>", err));
};

export default connectDB;
