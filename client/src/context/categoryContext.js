import { createContext, useContext, useEffect, useState } from "react";

import { getAllCategory } from "../helper/categoryHelper";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [allCategory, setAllCategory] = useState([]);

    useEffect(() => {
        const getcat = async () => {
            await getAllCategory(setAllCategory);
        };
        getcat();
    }, []);

    return (
        <CategoryContext.Provider value={{ allCategory, setAllCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

const useAllCategory = () => useContext(CategoryContext);

export { useAllCategory, CategoryProvider };
