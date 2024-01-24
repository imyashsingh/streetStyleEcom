import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

//check if user is loged in
export const requireSignIn = async (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Login Reqired <=>", error);

        res.status(401).send({
            success: false,
            message: "Unauthorized: Invalid token",
        });
    }
};

//check if user is admin
export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (user.role !== "admin") {
            throw new Error("Unauthorized: Not Admin");
        }
        next();
    } catch (error) {
        console.log("Not Admin <=>", error);

        res.status(401).send({
            success: false,
            message: error.message,
            error,
        });
    }
};
