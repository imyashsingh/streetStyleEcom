import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
    return (
        <div className="flex flex-col items-center justify-center rounded-sm rounded-e-none p-2  gap-6 text-center ">
            <div className="font-bold">User Panel</div>
            <Link
                to="/dashboard/user/profile"
                className="hover:font-bold font-medium font-2xl"
            >
                Edit Profile
            </Link>
            <Link
                to="/dashboard/user/orders-status"
                className="hover:font-bold font-medium font-2xl"
            >
                Orders
            </Link>
        </div>
    );
};

export default UserMenu;
