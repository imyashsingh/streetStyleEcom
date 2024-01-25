import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Redirect from "../../pages/Redirect";
import { authTokenHeaderSetter } from "../../helper/authHelper";

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

    return <>{isUser ? <Outlet /> : <Redirect />}</>;
};

export default UserPrivateRoute;
