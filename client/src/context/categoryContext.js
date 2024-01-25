import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategoryApi } from "../api/categoryApi";
import { toast } from "react-toastify";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [allCategory, setAllCategory] = useState([]);

    useEffect(() => {
        const getAllCategory = async () => {
            await getAllCategoryApi()
                .then(({ data }) => setAllCategory(data?.allCategory))
                .catch((err) => {
                    console.log(err);
                    toast.error("Somthing Went Wrong In Getting Category");
                });
        };
        getAllCategory();
    }, []);

    return (
        <CategoryContext.Provider value={{ allCategory, setAllCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

const useAllCategory = () => useContext(CategoryContext);

export { useAllCategory, CategoryProvider };
