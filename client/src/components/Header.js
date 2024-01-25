import React, { useEffect, useRef, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaBookmark, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";

import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Header = ({ setSideBarSwitch }) => {
    const [searchSelected, setSearchSelected] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [profileSelected, setProfileSelected] = useState(false);

    const navigate = useNavigate();
    const dropDownRef = useRef();
    const searchRef = useRef();
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    useEffect(() => {
        const handleDropdown = (event) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target)
            ) {
                setProfileSelected(false);
            }
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setSearchSelected(false);
            }
        };
        document.addEventListener("mousedown", handleDropdown);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchValue.length !== 0 && navigate(`/search?v=${searchValue}`);
    };

    return (
        <nav className=" fixed w-screen z-10">
            <div className="flex justify-between items-center px-6 h-12 border-gray-950 border-b-2 md:border-0 ">
                <div
                    className="flex-30 bg-white p-2 rounded"
                    onClick={() => setSideBarSwitch((prev) => !prev)}
                >
                    <CiMenuBurger />
                </div>
                <Link
                    to="/"
                    className="ms-28 font-black text-3xl italic tracking-widest font-"
                >
                    SxS
                </Link>
                <div className=" flex-30 flex justify-center items-center gap-4">
                    <button onClick={() => setSearchSelected(!searchSelected)}>
                        <FaSearch />
                    </button>
                    <div className="relative ">
                        <button
                            className="mt-[7px]"
                            onClick={() => setProfileSelected(!profileSelected)}
                        >
                            <FaUser />
                        </button>
                        <ul
                            ref={dropDownRef}
                            className={
                                profileSelected
                                    ? "absolute bg-white leading-normal w-24  p-3 border-gray-950 rounded border-2 top-9 -left-8 z-11"
                                    : "hidden"
                            }
                        >
                            {auth?.token.length === 0 ? (
                                <>
                                    <li className="cursor-pointer font-bold">
                                        Hi Guest
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className="cursor-pointer hover:font-bold"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="cursor-pointer hover:font-bold"
                                        >
                                            Log In
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="cursor-pointer font-bold">
                                        Hi {auth?.user?.name}
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            className="cursor-pointer hover:font-bold"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={handleLogout}
                                            to="/"
                                            className="cursor-pointer hover:font-bold"
                                        >
                                            Log Out
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <Link>
                        <FaBookmark />
                    </Link>
                    <Link>
                        <FaShoppingCart />
                    </Link>
                </div>
            </div>
            <div className=" hidden font-bold pt-8  md:h-6 md:flex md:justify-center md:w-screen md:gap-20 md:items-end md:border-b-2 md:border-gray-950">
                <p>Catagory</p>
                <p>Catagory</p>
                <p>Catagory</p>
                <p>Catagory</p>
            </div>
            <div
                className={
                    searchSelected
                        ? "text-center border-b-2 border-gray-950"
                        : "hidden"
                }
                ref={searchRef}
            >
                <form className="inline-block " onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="h-10 p-4 w-[400px] rounded"
                        placeholder="SEARCH"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    <button type="submit" className=" h-8 p-2">
                        <FaSearch />
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Header;
