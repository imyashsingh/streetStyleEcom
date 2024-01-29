import axios from "axios";

//Create new Product
export const createProductApi = async (productData) => {
    return await axios.post("/api/v1/product/create-product", productData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

//Get All Product with filter

export const getProductsApi = async (queryFilter) => {
    return await axios.get(`/api/v1/product/get-product?${queryFilter}`);
};

//Get single Product

export const getSingleProductsApi = async (pid) => {
    return await axios.get(`/api/v1/product/get-product/${pid}`);
};

//update Product

export const productEditApi = async (pid, productData) => {
    return await axios.put(
        `/api/v1/product/update-product/${pid}`,
        productData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

//delete Product

export const productDeleteApi = async (pid) => {
    return await axios.delete(`/api/v1/product/delete-product/${pid}`);
};
