import axios from "axios";

//Create Catagory Api
export const createCategoryApi = async (payload) => {
    const { categoryName } = payload;
    return await axios.post("/api/v1/category/create-category", {
        categoryName,
    });
};

//Get All Category Api
export const getAllCategoryApi = async () => {
    return await axios.get("/api/v1/category/get-all-category");
};

//Update Category Api
export const updateCategoryApi = async (payload) => {
    const { id, categoryName } = payload;
    return await axios.put(`/api/v1/category/update-category/${id}`, {
        categoryName,
    });
};

//Deleting Category Api
export const deleteCategoryApi = async (payload) => {
    const { id } = payload;
    return await axios.delete(`/api/v1/category/delete-category/${id}`);
};
