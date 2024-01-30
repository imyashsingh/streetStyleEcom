import React from "react";
import { useAuth } from "../../context/authContext";

const UserDashboard = () => {
    const { auth } = useAuth();
    return (
        <div className="p-2 rounded-sm rounded-s-none h-full flex justify-center items-center font-black  text-xl tracking-widest">
            <div>
                <h3> Name : {auth?.user?.name}</h3>
                <h3>Email : {auth?.user?.email}</h3>
                <h3> Contact : {auth?.user?.phone}</h3>
                <h3>Address : {auth?.user?.address}</h3>
            </div>
        </div>
    );
};

export default UserDashboard;
