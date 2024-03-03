import React, { useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    paymentCheckoutApi,
    paymentKeyApi,
    paymentVerificationApi,
} from "../api/paymentApi";
import { createOrderApi } from "../api/orderApi";

const CartPage = () => {
    const { cart, setCart } = useCart();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const delivery = 149;

    useEffect(() => {
        const getCartProduct = () => {
            const res = JSON.parse(localStorage?.getItem("cart"));
            if (res) {
                setCart(res);
            }
        };

        getCartProduct();
        // eslint-disable-next-line
    }, []);

    const getTotalPrice = () => {
        let totalPrice = 0;
        cart?.map((ele) => (totalPrice += ele.quantity * ele.product.price));
        return totalPrice;
    };
    // removing Item from cart
    const removeCartItem = (ind) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item, i) => i === ind);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckout = async (e) => {
        const amount = Number(getTotalPrice() + delivery);
        try {
            const {
                data: { key },
            } = await paymentKeyApi();
            //RazorPay key
            if (!key) throw new Error("Error While Getting Key");

            const { data } = await paymentCheckoutApi({ amount, cart });

            if (!data) throw new Error("Error While Payment Checkout");

            var options = {
                key, // Enter the Key ID generated from the Dashboard
                amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "StreetStyle", //your business name
                description: "Ecom Project",
                image: "https://example.com/your_logo",
                order_id: data?.order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: async function ({
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                }) {
                    try {
                        const { data } = await paymentVerificationApi({
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                        });
                        if (!data.success) {
                            throw new Error("Error While Payment Verification");
                        }
                        let products = [...cart];
                        toast.success("Payment Successful");
                        setCart([]);
                        localStorage.removeItem("cart");

                        products?.forEach(
                            (ele) => (ele.product = ele.product._id)
                        );
                        // Create order after Payment done Successfully
                        await createOrderApi({
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                            products,
                            amount,
                        })
                            .then((data) => {
                                console.log(data);
                            })
                            .catch((err) => {
                                console.log(err);
                                toast.error(
                                    err?.response?.data?.message ||
                                        err.message ||
                                        "Error While Creating Order"
                                );
                            });
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        toast.error(
                            err?.response?.data?.message ||
                                err.message ||
                                "Error While Payment"
                        );
                    }
                },
                prefill: {
                    //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                    name: "Street Style", //your customer's name
                    email: "StreetStyle@example.com",
                    contact: "9000090000", //Provide the customer's phone number for better conversion rates
                },

                theme: {
                    color: "#121212",
                },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                console.log(response);
                throw new Error("Error While Payment");
            });

            rzp1.open();
            e.preventDefault();
        } catch (err) {
            console.log(err);
            toast.error(
                err?.response?.data?.message ||
                    err.message ||
                    "Error While Payment"
            );
        }
    };

    return (
        <div className="flex flex-col pt-24 sm:pt-32 p-2 sm:px-16">
            <div className="font-black text-xl py-6 px-2">Shoping Cart</div>
            <div className="flex flex-wrap">
                <div className="sm:basis-4/6  ">
                    {cart?.map((c, i) => (
                        <div key={i} className=" p-2 flex justify-between">
                            <div className="flex border-t-2 p-2">
                                <img
                                    src={c?.product?.image?.url}
                                    alt="product"
                                    className="h-full w-4/12 object-cover object-center pr-3 "
                                />
                                <div className="ps-6">
                                    <div>{c?.product?.brand}</div>
                                    <div>{c?.product?.name}</div>
                                    <div>{c?.product?.price}</div>
                                    <div>{c?.product?.color}</div>
                                    <div>{c?.buySize}</div>
                                    <div>
                                        <select
                                            value={c.quantity}
                                            onChange={(e) => {
                                                const updatedCart = cart.map(
                                                    (ele, indx) => {
                                                        if (i === indx) {
                                                            return {
                                                                ...ele,
                                                                quantity:
                                                                    e.target
                                                                        .value,
                                                            };
                                                        } else {
                                                            return ele;
                                                        }
                                                    }
                                                );
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify(updatedCart)
                                                );
                                                setCart(updatedCart);
                                            }}
                                            className="m-2 mx-0 p-1 border-gray-600 border-2 rounded-md"
                                            required
                                        >
                                            {Array(10)
                                                .fill(0)
                                                .map((q, i) => (
                                                    <option
                                                        key={i}
                                                        value={i + 1}
                                                    >
                                                        {i + 1}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className=" p-2">
                                <button onClick={() => removeCartItem(i)}>
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-2 ps-4 border-l-2 flex-auto">
                    <div className="font-semibold border-b-2 p-3 pt-0 w-full">
                        Order summary
                    </div>
                    <div className="font-medium px-3 py-1">
                        Sub Total :{" "}
                        <span>
                            <span>&#8377;</span>
                            {getTotalPrice()}
                        </span>
                    </div>
                    <div className="font-medium px-3 py-1">
                        Delivery : <span>&#8377;</span>
                        <span>{getTotalPrice() === 0 ? 0 : delivery}</span>
                    </div>
                    <div className="font-medium px-3 py-1 border-t-2">
                        Total : <span>&#8377;</span>
                        <span className="font-semibold ">
                            {getTotalPrice() === 0
                                ? 0
                                : getTotalPrice() + delivery}
                        </span>
                    </div>
                    <div className="px-3 py-2 mt-6">
                        {auth?.token ? (
                            <div>
                                <div className="font-semibold py-2">
                                    Address
                                </div>
                                <div className="text-sm text-wrap">
                                    {auth?.user?.address}
                                </div>
                                <div>
                                    <Link
                                        to={`/dashboard/${
                                            auth?.user?.role === "admin"
                                                ? "admin"
                                                : "user"
                                        }/profile`}
                                    >
                                        <button className="px-4 py-2 my-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300 text-white">
                                            Update Address
                                        </button>
                                    </Link>
                                </div>
                                {cart?.length !== 0 && (
                                    <>
                                        <button
                                            onClick={handleCheckout}
                                            className="px-4 py-2 my-4 rounded-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white"
                                        >
                                            Make Payment
                                        </button>
                                        <p>Test card = 4111111111111111</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="px-4 py-2 a rounded-lg bg-red-500 hover:bg-red-400 active:bg-red-300 text-white">
                                    Please Login To Checkout
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
