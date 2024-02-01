import React, { useState } from "react";
import { AuthForgotPasswordApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import Redirect from "../Redirect";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const { auth } = useAuth();

    //handle Forgot Password
    const handleSubmit = async (e) => {
        e.preventDefault();
        await AuthForgotPasswordApi({ email, password, answer })
            .then(({ data }) => {
                if (data.success === false) {
                    throw new Error(data?.message);
                }
                toast.success(data?.message);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In Forgot Password"
                );
            });
    };

    return (
        <>
            {/*if Not user then redirect to homepage */}

            {!auth?.user ? (
                <div className="flex items-center justify-center py-32 px-28 w-full h-full">
                    <div className="flex shadow-xl border border-gray-400 rounded-lg ">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-800 hidden md:flex md:justify-center  rounded md:items-center md:basis-2/4">
                            <h1 className="font-black text-white text-5xl">
                                WELCOME
                            </h1>
                        </div>
                        <div className="  w-full h-full p-2 rounded md:rounded-l-none text-center md:basis-2/4">
                            <h1 className="font-bold text-3xl">
                                Forgot Password
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className=" mt-6 py-1 px-2 w-full border-2 rounded"
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className=" mt-6 py-1 px-2 w-full border-2 rounded"
                                    required
                                    autoComplete="off"
                                />
                                <input
                                    type="text"
                                    placeholder="Favorite Movie (For Forgot Password)"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className=" mt-6 py-1 px-2 w-full border-2 rounded"
                                    autoComplete="off"
                                    required
                                />
                                <button
                                    type="submit"
                                    className=" mt-6 py-1 px-2 w-full  text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded"
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <Redirect />
            )}
        </>
    );
};

export default ForgotPasswordPage;
