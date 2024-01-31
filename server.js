import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";

//file imports
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();

// env configration
dotenv.config();

//Connecting To Database
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Test Rest api
app.get("/", (req, res) => {
    res.send("just started");
});

//Routes
app.use("/api/v1/user", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/order", orderRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server Runnig On PORT=${PORT}`);
});
