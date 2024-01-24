import express from "express";
import {
    userLoginController,
    userRegisterController,
} from "../controller/userController.js";
import { isAdmin, requireSignIn } from "../middleware.js/authMiddleware.js";

const router = express.Router();

//Register New User
router.post("/register", userRegisterController);

//Login user
router.post("/login", userLoginController);

router.get("/test", requireSignIn, isAdmin, (req, res) => {
    try {
        res.send("loged IN");
    } catch (error) {
        res.send(error);
    }
});

export default router;
