import axios from "axios";

export const createProductApi = async (productData) => {
    return await axios.post("/api/v1/product/create-product", productData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
