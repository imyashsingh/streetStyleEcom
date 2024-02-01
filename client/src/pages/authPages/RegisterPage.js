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
                if (data?.success === false) throw new Error(data?.message);
                toast.success(data?.message);
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
                <div className="flex items-center justify-center py-32 px-28 w-full h-full">
                    <div className="flex shadow-xl border border-gray-400 rounded-lg">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-800 hidden md:flex md:justify-center md:items-center md:basis-2/4 rounded">
                            <h1 className="font-black text-white text-5xl">
                                WELCOME
                            </h1>
                        </div>
                        <div className="   w-full h-full p-2 rounded md:rounded-l-none text-center md:basis-2/4">
                            <h1 className="font-bold text-3xl ">REGISTER</h1>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className=" mt-6 py-1 px-2 w-full border rounded"
                                    autoComplete="name"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className=" mt-6 py-1 px-2 w-full border rounded"
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className=" mt-6 py-1 px-2 w-full border rounded"
                                    required
                                    autoComplete="off"
                                />
                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className=" mt-6 py-1 px-2 w-full border rounded"
                                    autoComplete="number"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Favorite Movie (For Forgot Password)"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className=" mt-6 py-1 px-2 w-full border rounded"
                                    autoComplete="off"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className=" mt-6 py-1 px-2 w-full border rounded"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    autoComplete="address"
                                    required
                                />
                                <button
                                    type="submit"
                                    className=" mt-6 py-1 px-2 w-full  text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded"
                                >
                                    Sign Up
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

export default RegisterPage;
