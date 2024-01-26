import { toast } from "react-toastify";
import { getAllCategoryApi } from "../api/categoryApi";

export const getAllCategory = async (setAllCategory) => {
    await getAllCategoryApi()
        .then(({ data }) => setAllCategory(data?.allCategory))
        .catch((err) => {
            console.log(err);
            toast.error("Somthing Went Wrong In Getting Category");
        });
};
