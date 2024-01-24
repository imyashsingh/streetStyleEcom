import React from "react";

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center py-32 px-28 w-screen h-screen overflow-hidden">
            <div className="bg-gradient-to-r from-red-400 to-red-600 hidden md:flex md:justify-center md:items-center md:w-full md:h-full rounded border-gray-500 border-2 md:border-r-0 md:overflow-hidden">
                <h1 className="font-black text-white text-5xl">WELCOME</h1>
            </div>
            <div className="  w-full h-full p-2 rounded md:rounded-l-none text-center border-gray-500 border-2 md:border-l-0 overflow-hidden">
                <h1 className="font-bold text-3xl">REGISTER</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                        required
                    />
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
                    <input
                        type="number"
                        placeholder="Phone Number"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Favorite Movie (For Forgot Password)"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className=" mt-6 py-1 px-2 w-full border-gray-500 border-2 rounded"
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
    );
};

export default RegisterPage;
