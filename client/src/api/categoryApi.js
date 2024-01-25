import axios from "axios";

export const createCategoryApi = async (payload) => {
    const { categoryName } = payload;
    return await axios.post("/api/v1/category/create-category", {
        categoryName,
    });
};

export const getAllCategoryApi = async () => {
    return await axios.get("/api/v1/category/get-all-category");
};
