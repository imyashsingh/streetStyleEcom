import { toast } from "react-toastify";
import { getProductsApi } from "../api/poductApi";

//get All Product with Filter
export const getProducts = async (queryFilter) => {
    return await getProductsApi(queryFilter)
        .then(({ data }) => {
            return data;
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
