import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserApi } from "../../api/authApi";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import Redirect from "../Redirect";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Log In Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await AuthUserApi({ email, password })
            .then(({ data }) => {
                if (data?.success === false) {
                    throw new Error(data?.message);
                }
                setAuth(data.user);
                localStorage.setItem("auth", JSON.stringify(data?.user));
                toast.success(data?.message);
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
        setIsLoading(false);
    };

    return (
        <>
            {/*if Not user then redirect to homepage */}

            {!auth?.user ? (
                <div className="flex items-center justify-center py-32 px-16 w-full h-full ">
                    <div className="flex shadow-xl border border-gray-400 rounded-lg ">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 hidden md:flex md:justify-center  rounded md:items-center md:basis-2/4">
                            <h1 className="font-black text-white text-5xl ">
                                WELCOME
                            </h1>
                        </div>
                        <div className=" w-full h-full p-2 rounded md:rounded-l-none text-center md:basis-2/4 ">
                            <h1 className="font-bold text-3xl">Sign In</h1>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className=" mt-6 py-1 px-2 w-full border-2 rounded"
                                    value={email}
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className=" mt-6 py-1 px-2 w-full  border-2 rounded"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    autoComplete="off"
                                />
                                {isLoading ? (
                                    <button
                                        disabled
                                        className=" mt-6 py-1 px-2 w-full text-white bg-gray-800 rounded"
                                    >
                                        Processing...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className=" mt-6 py-1 px-2 w-full text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded"
                                    >
                                        Sign In
                                    </button>
                                )}
                            </form>
                            <button
                                onClick={() => navigate("/forgotPassword")}
                                className=" mt-6 py-1 px-2 w-full  text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded"
                            >
                                Forgot Password
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Redirect />
            )}
        </>
    );
};

export default RegisterPage;
