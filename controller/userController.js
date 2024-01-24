import dotenv from "dotenv";
import jwt from "jsonwebtoken";

//file Import
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import UserModel from "../models/user.js";

dotenv.config();

// Registration of new user
export const userRegisterController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validations
        if (!name) {
            throw new Error("Name is Required");
        }
        if (!email) {
            throw new Error("Email is Required");
        }
        if (!password) {
            throw new Error("Password is Required");
        }
        if (!phone) {
            throw new Error("Phone number is Required");
        }
        if (!address) {
            throw new Error("Address is Required");
        }
        if (!answer) {
            throw new Error("Answer is Required");
        }

        // checking for existing user

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            throw new Error("Already Register please login");
        }

        //Hashing Password
        const hashedPassword = await hashPassword(password);

        // save user in DB
        const user = await UserModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Registeration Successfully",
            user,
        });
    } catch (error) {
        console.error("Error in Registering User <=>", error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};

export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check invalid email password

        if (!email || !password) {
            throw new Error("invalid email or password");
        }

        const curruser = await UserModel.findOne({ email });

        const match = await comparePassword(password, curruser.password);

        //JWT token
        const token = await jwt.sign(
            { _id: curruser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //enter valid Email or Password
        if (!match) {
            console.log(match);
            throw new Error("Please Enter Valid Email or Password");
        }
        const user = { ...curruser._doc, token };

        // removing password from api data
        delete user.password;

        res.status(200).send({
            success: true,
            message: "User Login Successfully",
            user,
        });
    } catch (error) {
        console.error("Error in Login User <=>", error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};
