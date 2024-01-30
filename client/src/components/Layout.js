import React, { useState } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const Layout = () => {
    const [sideBarSwitch, setSideBarSwitch] = useState(false);
    const location = useLocation();
    return (
        <>
            <ToastContainer />
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    <Header
                        sideBarSwitch={sideBarSwitch}
                        setSideBarSwitch={setSideBarSwitch}
                    />
                    <SideBar sideBarSwitch={sideBarSwitch} />
                    <Outlet />
                </div>
                {location.pathname !== "/" && <Footer />}
            </div>
        </>
    );
};

export default Layout;
