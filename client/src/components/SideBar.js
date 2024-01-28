import React from "react";
import { Link } from "react-router-dom";
import { useAllCategory } from "../context/categoryContext";

const SideBar = ({ sideBarSwitch }) => {
    const { allCategory } = useAllCategory();
    return (
        <div
            className={
                sideBarSwitch
                    ? "bg-white fixed h-screen w-48 flex flex-col justify-start items-center border-gray-950 border-r-2 pt-24 gap-3 z-9"
                    : "hidden"
            }
        >
            <Link to="/" className="hover:font-bold">
                HOME
            </Link>
            {allCategory.map((c) => (
                <Link
                    to={`/product?category=${c._id}`}
                    key={c._id}
                    className="hover:font-bold"
                >
                    {c.name.toUpperCase()}
                </Link>
            ))}
            <hr className="border-gray-950 w-48" />
            <Link to="/about" className="hover:font-bold">
                ABOUT
            </Link>
            <Link to="/returnAndExchange" className="hover:font-bold">
                RETURN & EXCHANGE
            </Link>
            <Link to="/legal" className="hover:font-bold">
                TERMS & CONDITIONS
            </Link>
        </div>
    );
};

export default SideBar;
