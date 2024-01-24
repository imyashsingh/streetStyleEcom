import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { FaBookmark, FaShoppingCart } from "react-icons/fa";

const Header = ({ setSideBarSwitch }) => {
    const [searchSelected, setSearchSelected] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?v=${searchValue}`);
    };

    return (
        <nav className="bg-lime-400 fixed w-screen z-10">
            <div className="flex justify-between items-center px-6 h-12">
                <div
                    className="flex-30"
                    onClick={() => setSideBarSwitch((prev) => !prev)}
                >
                    <CiMenuBurger />
                </div>
                <Link className="ms-28">LOGO</Link>
                <div className=" flex-30 flex justify-center items-center gap-4">
                    <button onClick={() => setSearchSelected(!searchSelected)}>
                        <CiSearch />
                    </button>
                    <Link>
                        <CgProfile />
                    </Link>
                    <Link>
                        <FaBookmark />
                    </Link>
                    <Link>
                        <FaShoppingCart />
                    </Link>
                </div>
            </div>
            <div className="bg-indigo-500 hidden md:h-6 md:flex md:justify-center md:w-screen md:gap-20 md:items-end md:border-b-2 md:border-gray-950">
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
            >
                <form className="inline-block " onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="h-8 p-4 w-[400px] rounded"
                        placeholder="SEARCH"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    <button type="submit" className=" h-8 ">
                        <CiSearch />
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Header;
