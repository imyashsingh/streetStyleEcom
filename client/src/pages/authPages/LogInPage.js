import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserApi } from "../../api/authApi";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth } = useAuth();

    // Log In Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        await AuthUserApi({ email, password })
            .then(({ data }) => {
                console.log(data);
                if (data?.success === false) {
                    throw new Error(data?.message);
                }
                setAuth(data.user);
                console.log(data.user);
                localStorage.setItem("auth", JSON.stringify(data.user));
                toast.success(data.message);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In LogIn"
                );
            });
    };

    return (
        <div className="flex items-center justify-center py-32 px-28 w-screen h-screen overflow-hidden ">
            <div className="bg-gradient-to-r from-red-400 to-red-600 hidden md:flex md:justify-center  rounded md:items-center md:w-full md:h-full  border-gray-500 border-2 md:border-r-0 md:overflow-hidden">
                <h1 className="font-black text-white text-5xl ">WELCOME</h1>
            </div>
            <div className=" bg-white w-full h-full p-2 rounded md:rounded-l-none text-center border-gray-500 border-2 md:border-l-0 overflow-hidden">
                <h1 className="font-bold text-3xl">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2"
                    >
                        Sign In
                    </button>
                </form>
                <button
                    onClick={() => navigate("/forgotPassword")}
                    className=" mt-6 py-1 px-2 w-full border-gray-500 border-2"
                >
                    Forgot Password
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
