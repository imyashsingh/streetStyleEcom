import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div className="bg-blue-500 flex flex-col items-center justify-center rounded-sm rounded-e-none p-2  gap-6 text-center ">
            <div className="font-bold">Admin Panel</div>
            <Link
                to="/dashboard/admin/create-category"
                className="hover:font-bold"
            >
                Create Category
            </Link>
            <Link
                to="/dashboard/admin/create-product"
                className="hover:font-bold"
            >
                Create Product
            </Link>
            <Link
                to="/dashboard/admin/product-edit"
                className="hover:font-bold"
            >
                Products
            </Link>
            <Link
                to="/dashboard/admin/orders-status"
                className="hover:font-bold"
            >
                Orders
            </Link>
        </div>
    );
};

export default AdminMenu;