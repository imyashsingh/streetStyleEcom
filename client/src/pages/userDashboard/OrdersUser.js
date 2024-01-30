import React, { useEffect, useState } from "react";
import men from "../../images/HomePage/Men.jpg";
import { toast } from "react-toastify";
import { getUserOrderApi } from "../../api/orderApi";

const OrdersUser = () => {
    const [orders, setOrders] = useState([]);

    const getAllOrders = async () => {
        await getUserOrderApi()
            .then(({ data }) => {
                setOrders(data?.orders);
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In Fetching Orders"
                );
            });
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    const getTime = (timeString) => {
        const date = new Date(timeString);
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };

        return date.toLocaleString("en-US", options);
    };
    return (
        <div className="flex flex-col w-full ">
            <div className="font-semibold text-xl">All Orders</div>
            {orders?.map((o, i) => (
                <div key={o._id}>
                    <table className="table-fixed text-center">
                        <thead>
                            <tr>
                                <th className=" px-4 py-2">#</th>
                                <th className=" px-4 py-2">Status</th>
                                <th className=" px-4 py-2">Buyer</th>
                                <th className=" px-4 py-2">Date</th>
                                <th className=" px-4 py-2">Payment</th>
                                <th className=" px-4 py-2">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className=" px-4 py-2">{i + 1}</td>
                                <td className=" px-4 py-2">{o.status}</td>
                                <td className=" px-4 py-2">{o.user.name}</td>
                                <td className=" px-4 py-2">
                                    {getTime(o.createdAt)}
                                </td>
                                <td className=" px-4 py-2">Success</td>
                                <td className=" px-4 py-2">
                                    <span>&#8377;</span>
                                    {o.totalAmount}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {o?.products?.map((p, ind) => (
                        <div
                            key={ind}
                            className=" p-2 flex justify-between w-full"
                        >
                            <div className="flex border-t-2 p-2 ">
                                <img
                                    src={men}
                                    alt="product"
                                    className="h-full w-3/12 object-cover object-center pr-3 "
                                />
                                <div className="ps-3 text-xs sm:text-sm flex">
                                    <div className="ps-3">
                                        <div>Brand : {p.product.brand}</div>
                                        <div>Name : {p.product.name}</div>
                                        <div>Color : {p.product.color}</div>
                                    </div>
                                    <div className="ps-6">
                                        <div>Price : {p.product.price}</div>
                                        <div>Size : {p.buySize}</div>
                                        <div>Quantity : {p.quantity}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OrdersUser;
