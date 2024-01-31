import React, { useEffect, useState } from "react";
import { useAllCategory } from "../../context/categoryContext";
import {
    getSingleProductsApi,
    productDeleteApi,
    productEditApi,
} from "../../api/poductApi";

import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { allSize } from "../../default/defaultConstant";

const ProductEditForm = () => {
    const navigate = useNavigate();
    const [queryString] = useSearchParams();

    const { allCategory } = useAllCategory();

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [size, setSize] = useState("OneSize");
    const [quantity, setQuantity] = useState("");
    const [sizeAndQuantity, setSizeAndQuantity] = useState([]);
    const [limage, setLimage] = useState(true);
    const [pid, setPid] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSingleProduct = async () => {
            const newpid = queryString.get("pid");
            setPid(newpid);
            await getSingleProductsApi(newpid)
                .then(({ data }) => {
                    setName(data?.product?.name);
                    setBrand(data?.product?.brand);
                    setCategory(data?.product?.category?._id);
                    setPrice(data?.product?.price);
                    setColor(data?.product?.color);
                    setDescription(data?.product?.description);
                    setSizeAndQuantity(data?.product?.sizes);
                    setImage(data?.product?.image?.url);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(
                        err?.response?.data?.message ||
                            err.message ||
                            "Error In Getting Single Product"
                    );
                });
        };
        getSingleProduct();
    }, [queryString]);

    //handle update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name", name);
        productData.append("brand", brand);
        productData.append("category", category);
        productData.append("price", price);
        productData.append("color", color);
        productData.append("description", description);
        productData.append("sizes", JSON.stringify(sizeAndQuantity));

        !limage && productData.append("image", image);

        setLoading(true);
        await productEditApi(pid, productData)
            .then(({ data }) => {
                toast.success(data?.message);
                navigate("/dashboard/admin/product-edit");
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In Editing Product"
                );
            });
    };

    //handle delete product
    const handleDelete = async () => {
        setLoading(true);
        await productDeleteApi(pid)
            .then(({ data }) => {
                toast.success(data?.message);
                navigate("/dashboard/admin/product-edit");
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In Deleting Product"
                );
            });
    };

    const addSizeArray = () => {
        if (quantity && quantity !== 0) {
            let flag = true;
            let tempsizeq = sizeAndQuantity;
            tempsizeq.forEach((ele) => {
                if (ele.size === size) {
                    ele.quantity += quantity;
                    flag = false;
                }
            });
            if (flag) {
                tempsizeq = [
                    ...sizeAndQuantity,
                    {
                        size: size,
                        quantity: quantity,
                    },
                ];
            }
            setSizeAndQuantity(tempsizeq);
            setQuantity("");
        }
    };
    return (
        <div className=" flex flex-col items-center justify-center">
            <div className="font-bold text-3xl">Update or Delete Product</div>
            <form
                className="p-3"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        autoComplete="brand"
                                        value={brand}
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                    htmlFor="Category"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="Category"
                                        name="Category"
                                        autoComplete="Category-name"
                                        value={category}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setCategory(e.target.value);
                                        }}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value={""}>
                                            Select Catagory
                                        </option>
                                        {allCategory.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="Number"
                                        name="price"
                                        id="price"
                                        autoComplete="price"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(
                                                Math.abs(e.target.value * 1)
                                            )
                                        }
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="postal-code"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Color
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="color"
                                        id="color"
                                        autoComplete="color"
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {/*Add size */}

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Size
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="size"
                                        name="size"
                                        autoComplete="size-name"
                                        value={size}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setSize(e.target.value);
                                        }}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        {allSize.map((c, i) => (
                                            <option key={i} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="Number"
                                        name="quantity"
                                        id="quantity"
                                        autoComplete="quantity"
                                        value={quantity}
                                        onChange={(e) => {
                                            setQuantity(
                                                Math.abs(e.target.value * 1)
                                            );
                                        }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Edit Size Array
                                </label>
                                <div className="flex justify-start items-center gap-1">
                                    <div
                                        onClick={() => addSizeArray()}
                                        className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Add
                                    </div>
                                    <div
                                        onClick={() => setSizeAndQuantity([])}
                                        className=" cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-red-400 focus-visible:outline-red-600"
                                    >
                                        Reset
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                {sizeAndQuantity.length === 0 && (
                                    <div className="text-red-600">
                                        Please Fill Size and Quantity!!
                                    </div>
                                )}
                                {sizeAndQuantity.map((ele, i) => (
                                    <p className="font-medium " key={i}>
                                        Size : {ele?.size} - Quantity :{" "}
                                        {ele?.quantity}
                                    </p>
                                ))}
                            </div>
                            {/*Add Description */}
                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        required
                                        value={description}
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter Description"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label className="border-2 p-3">
                            Upload Image
                            <input
                                name="file"
                                type="file"
                                hidden
                                autoComplete="off"
                                accept="image/*"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setLimage(false);
                                }}
                            />
                        </label>
                        {image && (
                            <div className="text-center pt-4">
                                <img
                                    src={
                                        limage
                                            ? image
                                            : URL.createObjectURL(image)
                                    }
                                    alt="product_photo"
                                    className="h-64"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {loading ? (
                        <div className="bg-gray-800 h-max w-max rounded-lg text-white font-bold">
                            <div className="flex items-center justify-center m-[10px]">
                                <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4" />
                                <div className="ml-2">
                                    Processing... <div></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button
                                type="submit"
                                disabled={sizeAndQuantity.length === 0}
                                className={`rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600`}
                            >
                                UPDATE
                            </button>
                            <div
                                onClick={handleDelete}
                                className=" cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                DELETE
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductEditForm;
