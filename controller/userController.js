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

//Login user
export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check invalid email password
        if (!email || !password) {
            throw new Error("invalid email or password");
        }

        const curruser = await UserModel.findOne({ email });

        if (!curruser) {
            throw new Error("invalid email or password");
        }

        const match = await comparePassword(password, curruser.password);

        //JWT token
        const token = await jwt.sign(
            { _id: curruser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //enter valid Email or Password
        if (!match) {
            throw new Error("Please Enter Valid Email or Password");
        }
        const user = { user: { ...curruser._doc }, token };

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

//Forgot Password

export const userForgotPasswordController = async (req, res) => {
    try {
        const { email, password, answer } = req.body;
        //validations

        if (!email) {
            throw new Error("Email is Required");
        }
        if (!password) {
            throw new Error("Password is Required");
        }
        if (!answer) {
            throw new Error("Answer is Required");
        }

        //Finding user
        const existUser = await UserModel.findOne({ email });
        //User not Exist
        if (!existUser) {
            throw new Error("Invalid User or Answer");
        }
        //Answer Not Match
        if (answer.toLowerCase() !== existUser.answer.toLowerCase()) {
            throw new Error("Invalid User or Answer");
        }
        //Pasword Hashing
        const hashedPassword = await hashPassword(password);

        await UserModel.findByIdAndUpdate(existUser._id, {
            password: hashedPassword,
        });
        res.status(200).send({
            success: true,
            message: "Password Updated Successfully",
        });
    } catch (error) {
        console.error("Error in Forgot Password <=>", error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};

export const updateProfileController = async (req, res) => {
    try {
        const { name, password, phone, address, answer } = req.body;
        const user = await UserModel.findById(req.user._id);

        if (!password) {
            throw new Error("Password is Required");
        }

        const match = await comparePassword(password, user.password);
        if (!match) throw new Error("Password Not Matched");

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user?.name,
                phone: phone || user?.phone,
                address: address || user?.address,
                answer: answer || user?.answer,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};
