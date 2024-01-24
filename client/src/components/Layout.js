import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
    const [sideBarSwitch, setSideBarSwitch] = useState(false);
    return (
        <>
            <Header setSideBarSwitch={setSideBarSwitch} />
            <SideBar sideBarSwitch={sideBarSwitch} />
            <Outlet />
        </>
    );
};

export default Layout;
