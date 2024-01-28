import React, { useState } from "react";
import { useAllCategory } from "../../context/categoryContext";
import { createProductApi } from "../../api/poductApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { allSize } from "../../default/defaultConstant";

const CreateProduct = () => {
    const navigate = useNavigate();

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
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const productData = new FormData();
        productData.append("name", name);
        productData.append("brand", brand);
        productData.append("category", category);
        productData.append("price", price);
        productData.append("color", color);
        productData.append("description", description);
        productData.append("image", image);
        productData.append("sizes", JSON.stringify(sizeAndQuantity));

        await createProductApi(productData)
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
                        "Error In Creating Product"
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
            <div className="font-bold text-3xl">Create Product</div>
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
                                        autoComplete="family-name"
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
                                        defaultValue={{
                                            label: "Select Category",
                                            value: null,
                                        }}
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
                                        autoComplete="address-level1"
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
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
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
                                        autoComplete="address-level1"
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
                                        className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add
                                    </div>
                                    <div
                                        onClick={() => setSizeAndQuantity([])}
                                        className=" cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </label>
                        {image && (
                            <div className="text-center pt-4">
                                <img
                                    src={URL.createObjectURL(image)}
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
                        <button
                            type="submit"
                            disabled={sizeAndQuantity.length === 0}
                            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Save
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
