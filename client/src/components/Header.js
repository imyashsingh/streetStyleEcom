import React, { useEffect, useRef, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Header = ({ sideBarSwitch, setSideBarSwitch }) => {
    const [searchSelected, setSearchSelected] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [profileSelected, setProfileSelected] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dropDownRef = useRef();
    const searchRef = useRef();
    const { auth, setAuth } = useAuth();

    //Set auth token First in header when reload from localstorage
    useEffect(() => {
        const setAuthToken = () => {
            const res = JSON.parse(localStorage.getItem("auth"));
            setAuth(res);
        };
        setAuthToken();
    }, [setAuth]);

    //handling Logout for user
    const handleLogout = () => {
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    useEffect(() => {
        // close profile dropdown if click anyware
        const handleDropdown = (event) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target)
            ) {
                setProfileSelected(false);
            }
            // close searchbar section if click anyware
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setSearchSelected(false);
            }
        };
        document.addEventListener("mousedown", handleDropdown);
    }, []);

    //search value handling
    const handleSubmit = (e) => {
        e.preventDefault();
        searchValue.length !== 0 && navigate(`/search?v=${searchValue}`);
    };

    return (
        <nav className=" fixed w-screen z-10">
            <div
                className={`${
                    location.pathname !== "/" && "bg-white"
                } flex justify-between items-center px-6 h-12 border-gray-950 border-b-2 md:border-0 `}
            >
                {/*Sidebar*/}
                <div
                    className="flex-30 bg-white p-2 rounded"
                    onClick={() => setSideBarSwitch((prev) => !prev)}
                >
                    {sideBarSwitch ? <IoMdClose /> : <CiMenuBurger />}
                </div>
                {/*LOGO*/}
                <NavLink
                    to="/"
                    className="ms-28 font-black text-3xl italic tracking-widest font-"
                >
                    SxS
                </NavLink>
                {/*search,dropdown and cartlink */}
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
                        {/*dropdown menu */}
                        <ul
                            ref={dropDownRef}
                            onClick={() => setProfileSelected(!profileSelected)}
                            className={
                                profileSelected
                                    ? "absolute bg-white leading-normal w-28  p-3 border-gray-950 rounded border-2 top-9 -left-16 z-11"
                                    : "hidden"
                            }
                        >
                            {/*If user is not loged in */}
                            {!auth?.user ? (
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
                                    {/*when user loged in */}
                                    <li className="cursor-pointer font-bold">
                                        Hi{" "}
                                        {auth?.user?.name.length > 5
                                            ? auth?.user?.name
                                                  .substr(0, 4)
                                                  .toLowerCase() + ".."
                                            : auth?.user?.name.toLowerCase()}
                                    </li>
                                    <li>
                                        {/*Different routes for admin and user */}
                                        <Link
                                            to={`/dashboard${
                                                auth?.user?.role === "admin"
                                                    ? "/admin"
                                                    : "/user"
                                            }`}
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
                        <FaShoppingCart />
                    </Link>
                </div>
            </div>
            {/*Catagories Section */}
            <div
                className={`${
                    location.pathname !== "/" && "bg-white"
                } hidden font-bold pt-8  md:h-6 md:flex md:justify-center md:w-screen md:gap-20 md:items-end md:border-b-2 md:border-gray-950`}
            >
                <p>Catagory</p>
                <p>Catagory</p>
                <p>Catagory</p>
                <p>Catagory</p>
            </div>
            {/*Hidden search bar section */}
            <div
                className={
                    searchSelected
                        ? `${
                              location.pathname !== "/" && "bg-white"
                          } text-center border-b-2 border-gray-950`
                        : "hidden"
                }
                ref={searchRef}
            >
                <form className="inline-block " onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="h-10 p-4 w-[400px] rounded border-x-2 border-gray-950"
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
