import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";

import { getSingleProductsApi } from "../api/poductApi";
import { useCart } from "../context/cartContext";

const ProductDetails = () => {
    const [queryString] = useSearchParams();
    const { cart, setCart } = useCart();
    const pid = queryString.get("pid") || "";
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [sizes, setSizes] = useState([]);
    const [color, setColor] = useState("");
    const [buySize, SetBuySize] = useState("");
    const [product, setProduct] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getProductDetails = async () => {
            await getSingleProductsApi(pid)
                .then(({ data }) => {
                    setName(data?.product?.name);
                    setBrand(data?.product?.brand);
                    setDescription(data?.product?.description);
                    setCategoryName(data?.product?.category?.name);
                    setPrice(data?.product?.price);
                    setImage(data?.product?.image?.url);
                    setSizes(data?.product?.sizes);
                    setColor(data?.product?.color);
                    setProduct(data?.product);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(
                        err?.response?.data?.message ||
                            err.message ||
                            "Error In Getting Product"
                    );
                });
        };
        getProductDetails();
    }, [pid]);

    const handleCart = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const index = cart?.findIndex(
            (ele) => ele?.product?._id === pid && ele?.buySize === buySize
        );
        if (index === -1) {
            setCart([...cart, { product, buySize, quantity: 1 }]);
            localStorage.setItem(
                "cart",
                JSON.stringify([...cart, { product, buySize, quantity: 1 }])
            );
        } else {
            let updatedCart = cart?.map((ele, i) => {
                if (i === index) {
                    ele.quantity = ele.quantity + 1;
                }
                return ele;
            });
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        toast.success("Product Added To Cart");
        setIsLoading(false);
    };

    return (
        <div className="pt-24 px-16 md:pt-40 md:px-24 h-100 flex flex-col items-center">
            <div className=" lg:flex lg:justify-center  w-full  h-full  pb-28  ">
                <div className="w-full h-full">
                    <img
                        src={image}
                        alt="Product"
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="flex flex-col  w-full ">
                    <div className="flex flex-col items-center lg:items-start px-16  w-full gap-1">
                        <div>
                            <span className="font-semibold text-gray-600 ">
                                BRAND :{" "}
                            </span>

                            <span className="font-semibold text-gray-500">
                                {brand}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600">
                                NAME :{" "}
                            </span>

                            <span className="font-semibold text-gray-500">
                                {name}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600">
                                PRICE : <span>&#8377;</span>
                            </span>

                            <span className="font-semibold text-gray-500">
                                {price}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600">
                                COLOR :{" "}
                            </span>

                            <span className="font-semibold text-gray-500">
                                {color}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600">
                                CATEGORY :
                            </span>{" "}
                            <span className="font-semibold text-gray-500">
                                {categoryName}
                            </span>
                        </div>
                        <div>
                            <form onSubmit={handleCart}>
                                <select
                                    value={buySize}
                                    onChange={(e) => {
                                        SetBuySize(e.target.value);
                                    }}
                                    className="m-2 mx-0 p-2 border-gray-600 border-2 rounded-md"
                                    required
                                >
                                    <option value={""}>select Size</option>
                                    {sizes?.map((s) => (
                                        <option key={s?._id} value={s?.size}>
                                            {s?.size}
                                        </option>
                                    ))}
                                </select>
                                {isLoading ? (
                                    <button
                                        disabled
                                        className={`rounded-md bg-gray-900 m-2 p-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
                                    >
                                        Processing...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className={`rounded-md bg-gray-800 m-2 p-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
                                    >
                                        Add To Cart
                                    </button>
                                )}
                            </form>
                        </div>
                        <div className="font-semibold text-gray-600">
                            DESCRIPTION :
                        </div>
                        <div className="font-semibold text-gray-500">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
