import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Redirect from "../../pages/Redirect";
import AdminMenu from "../AdminMenu";
import { authTokenHeaderSetter } from "../../helper/authHelper";

const AdminPrivateRoute = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const checkAdmin = async () => {
            //check if user is admin
            authTokenHeaderSetter();
            await axios
                .get("/api/v1/user/checkAdmin")
                .then(({ data }) => {
                    setIsAdmin(data?.success);
                })
                .catch((err) => {
                    setIsAdmin(false);
                    console.log(err);
                });
        };

        checkAdmin();
    }, []);

    return (
        <>
            {isAdmin ? (
                <div className="w-full h-full flex justify-center  pt-24 pb-16 px-4 md:pt-32 md:pb-24 md:px-16">
                    <div className="basis-1/4 p-2 pe-0">
                        <AdminMenu />
                    </div>
                    <div className="basis-3/4 p-2 ps-0">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <Redirect />
            )}
        </>
    );
};

export default AdminPrivateRoute;
