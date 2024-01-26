import React, { useState } from "react";
import { updateCategoryApi } from "../api/categoryApi";
import { toast } from "react-toastify";
import { useAllCategory } from "../context/categoryContext";
import { getAllCategory } from "../helper/categoryHelper";

const EditCategoryBox = ({ updateCategory, setEditButton }) => {
    const [categoryName, setCategoryName] = useState(updateCategory?.name);
    const { setAllCategory } = useAllCategory();

    const handleUpdate = async () => {
        await updateCategoryApi({ categoryName, id: updateCategory._id })
            .then(({ data }) => {
                console.log(data);
                setEditButton(false);
                getAllCategory(setAllCategory);
                toast.success(data?.message);
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
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start ">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        Update Category
                                    </h3>
                                    <div className="mt-3">
                                        <input
                                            value={categoryName}
                                            onChange={(e) =>
                                                setCategoryName(e.target.value)
                                            }
                                            className="text-sm text-gray-500 w-full p-2 border-2 border-gray-900 rounded"
                                            placeholder="Enter Updated Category"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={handleUpdate}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditButton(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryBox;
