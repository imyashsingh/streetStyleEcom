import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

//file imports
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import categoryRouter from "./routes/categoryRouter.js";

const app = express();

// env configration
dotenv.config();

//Connecting To Database
connectDB();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Test Rest api
app.get("/", (req, res) => {
    res.send("just started");
});

//Routes
app.use("/api/v1/user", authRouter);
app.use("/api/v1/category", categoryRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server Runnig On PORT=${PORT}`);
});
