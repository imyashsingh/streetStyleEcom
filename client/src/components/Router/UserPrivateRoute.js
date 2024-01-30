import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Redirect from "../../pages/Redirect";
import { authTokenHeaderSetter } from "../../helper/authHelper";
import UserMenu from "../UserMenu";

const UserPrivateRoute = () => {
    const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        const checkUser = async () => {
            //check if user is valid
            authTokenHeaderSetter();
            await axios
                .get("/api/v1/user/checkUser")
                .then(({ data }) => {
                    setIsUser(data?.success);
                })
                .catch((err) => {
                    setIsUser(false);
                    console.log(err);
                });
        };

        checkUser();
    }, []);

    return (
        <>
            {isUser ? (
                <div className="w-full h-full flex justify-center  pt-24 pb-16 px-4 md:pt-32 md:pb-24 md:px-16">
                    <div className="p-2 pe-0">
                        <UserMenu />
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

export default UserPrivateRoute;
