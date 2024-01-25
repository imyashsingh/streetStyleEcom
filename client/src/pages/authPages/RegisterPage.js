import React, { useState } from "react";
import { AuthRegisterUserApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import Redirect from "../Redirect";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const { auth } = useAuth();

    //handle register form

    const handleSubmit = async (e) => {
        e.preventDefault();
        await AuthRegisterUserApi({
            name,
            email,
            password,
            phone,
            answer,
            address,
        })
            .then(({ data }) => {
                if (data?.success === false) throw new Error(data.message);
                toast.success(data.message);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In Registration"
                );
            });
    };
    return (
        <>
            {/*if Not user then redirect to homepage */}
            {!auth?.user ? (
                <div className="flex items-center justify-center py-32 px-28 w-screen h-screen overflow-hidden">
                    <div className="bg-gradient-to-r from-red-400 to-red-600 hidden md:flex md:justify-center md:items-center md:w-full md:h-full rounded border-gray-500 border-2 md:border-r-0 md:overflow-hidden">
                        <h1 className="font-black text-white text-5xl">
                            WELCOME
                        </h1>
                    </div>
                    <div className="  w-full h-full p-2 rounded md:rounded-l-none text-center border-gray-500 border-2 md:border-l-0 overflow-hidden">
                        <h1 className="font-bold text-3xl">REGISTER</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                                required
                                autoComplete="off"
                            />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Favorite Movie (For Forgot Password)"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className=" mt-6 py-1 px-2 w-full border-gray-500 border-2"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <Redirect />
            )}
        </>
    );
};

export default RegisterPage;
