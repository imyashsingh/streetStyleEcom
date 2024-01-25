import express from "express";
import {
    userForgotPasswordController,
    userLoginController,
    userRegisterController,
} from "../controller/userController.js";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";

const router = express.Router();

//Register New User
router.post("/register", userRegisterController);

//Login user
router.post("/login", userLoginController);

//forgot password
router.put("/forgotPassword", userForgotPasswordController);

router.get("/checkUser", requireSignIn, (req, res) => {
    try {
        res.send({ success: true });
    } catch (error) {
        res.send(error);
    }
});

router.get("/checkAdmin", requireSignIn, isAdmin, (req, res) => {
    try {
        res.send({ success: true });
    } catch (error) {
        res.send(error);
    }
});

export default router;
