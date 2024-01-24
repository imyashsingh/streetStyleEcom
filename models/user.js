import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
