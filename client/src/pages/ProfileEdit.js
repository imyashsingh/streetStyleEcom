import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { profileUpdateApi } from "../api/authApi";
import { toast } from "react-toastify";

const ProfileEdit = () => {
    const { auth, setAuth } = useAuth();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setName(auth?.user?.name);
        setPhone(auth?.user?.phone);
        setAddress(auth?.user?.address);
        setAnswer(auth?.user?.answer);
        // eslint-disable-next-line
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await profileUpdateApi({ name, phone, address, answer, password })
            .then(({ data }) => {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success(data.message);
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In Editing Product"
                );
            });
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="font-semibold text-2xl"> Update Profile</div>
            <div>
                <form className="pt-8" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={name}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-gray-300 border-2 rounded-md px-3 py-2 "
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 pt-5">
                            Email
                        </label>
                        <div className="w-full border-gray-300 border-2 rounded-md px-3 py-2 ">
                            {auth?.user?.email}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-1 pt-5"
                        >
                            Ph No.
                        </label>
                        <input
                            type="phone"
                            id="phone"
                            name="phone"
                            autoComplete="off"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border-gray-300 border-2 rounded-md px-3 py-2 "
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 pt-5">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            autoComplete="off"
                            placeholder="Enter Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-gray-300 border-2 rounded-md px-3 py-2 "
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-1 pt-5">
                            Address
                        </label>
                        <input
                            type="address"
                            id="adress"
                            name="adress"
                            autoComplete="off"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border-gray-300 border-2 rounded-md px-3 py-2 "
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-1 pt-5">
                            Favorite Movie
                        </label>
                        <input
                            type="movi"
                            id="movi"
                            name="movi"
                            autoComplete="off"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full border-gray-300 border-2 rounded-md px-3 py-2 "
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-400 active:bg-blue-300 my-5"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;
