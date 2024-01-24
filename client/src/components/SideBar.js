import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ sideBarSwitch }) => {
    return (
        <div
            className={
                sideBarSwitch
                    ? "bg-white fixed h-screen w-48 flex flex-col justify-start items-center border-gray-950 border-r-2 pt-24 gap-3 z-9"
                    : "hidden"
            }
        >
            <Link to="/">HOME</Link>
            <Link to="/men">MEN</Link>
            <Link to="/women">WOMEN</Link>
            <Link to="/kids">KIDS</Link>
            <Link to="/accessories">ACCESSORIES</Link>
            <hr className="border-gray-950 w-48" />
            <Link to="/about">ABOUT</Link>
            <Link to="/returnAndExchange">RETURN & EXCHANGE</Link>
            <Link to="/legal">TERMS & CONDITIONS</Link>
        </div>
    );
};

export default SideBar;
