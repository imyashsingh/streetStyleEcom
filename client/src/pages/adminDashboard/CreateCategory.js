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
                toast.success(data.message);
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
                ></input>
                <button className="rounded border-2 bg-rose-700 px-5 py-2 mt-3">
                    Add
                </button>
            </form>
            {JSON.stringify(allCategory, null, 4)}
        </div>
    );
};

export default CreateCategory;
