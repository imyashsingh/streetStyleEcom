import React, { useState } from "react";
import { createCategoryApi, getAllCategoryApi } from "../../api/categoryApi";
import { toast } from "react-toastify";
import { useAllCategory } from "../../context/categoryContext";

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState("");

    const { allCategory, setAllCategory } = useAllCategory();

    //handle Create Category
    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        await createCategoryApi({ categoryName })
            .then(({ data }) => {
                getAllCategory();
                toast.success(data?.message);
                setCategoryName("");
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    err?.response?.data?.message ||
                        err.message ||
                        "Error In Creating Category"
                );
            });
    };

    const getAllCategory = async () => {
        await getAllCategoryApi()
            .then(({ data }) => {
                setAllCategory(data?.allCategory);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Somthing Went Wrong In Getting Category");
            });
    };

    return (
        <div className=" flex flex-col items-center justify-center">
            <div className="font-black text-xl">Create Product</div>
            <form
                className="p-5 w-full text-center "
                onSubmit={handleSubmitCategory}
            >
                <input
                    className=" w-full p-3 border-2 border-black"
                    placeholder="Enter New Category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                ></input>
                <button className="rounded border-2 bg-blue-500 active:bg-blue-400 px-5 py-2 mt-3">
                    Add
                </button>
            </form>
            <div className="w-full flex flex-col p-3 gap-1">
                <div className="flex justify-between px-6 py-2 border-2 rounded border-black font-bold">
                    <div>Category</div>
                    <div>Action</div>
                </div>
                {allCategory.map((category) => (
                    <div
                        className="flex justify-between px-6 py-2 border-2 rounded border-black"
                        key={category?._id}
                    >
                        <div className="p-2">{category?.name}</div>
                        <div>
                            <button className="rounded m-1 p-2 bg-yellow-500">
                                EDIT
                            </button>
                            <button className=" rounded m-1 p-2 bg-red-500">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateCategory;
