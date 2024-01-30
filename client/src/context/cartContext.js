import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const getCartProduct = () => {
            let existingCartItem = localStorage.getItem("cart");
            if (existingCartItem) setCart(JSON.parse(existingCartItem));
        };
        getCartProduct();
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
