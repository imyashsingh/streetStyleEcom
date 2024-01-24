import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center py-32 px-28 w-screen h-screen overflow-hidden">
            <div className="hidden md:bg-red-500 md:flex md:justify-center md:items-center md:w-full md:h-full md:rounded-l-lg md:overflow-hidden">
                <h1 className="font-black text-6xl">WELCOME</h1>
            </div>
            <div className="  w-full h-full p-2 rounded md:rounded-l-none text-center border-gray-500 border-2 md:border-l-0 overflow-hidden">
                <h1 className="font-bold text-3xl">Sign In</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Email"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                        required
                    />
                    <button className=" mt-6 py-1 px-2 w-full border-gray-500 border-2">
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
