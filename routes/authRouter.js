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
router.post("/forgotPassword", userForgotPasswordController);

router.get("/test", requireSignIn, isAdmin, (req, res) => {
    try {
        res.send("loged IN");
    } catch (error) {
        res.send(error);
    }
});

export default router;
