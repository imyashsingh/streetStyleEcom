import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
    const [sideBarSwitch, setSideBarSwitch] = useState(false);
    return (
        <>
            <ToastContainer />
            <Header
                sideBarSwitch={sideBarSwitch}
                setSideBarSwitch={setSideBarSwitch}
            />
            <SideBar sideBarSwitch={sideBarSwitch} />
            <Outlet />
        </>
    );
};

export default Layout;
