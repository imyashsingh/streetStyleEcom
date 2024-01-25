import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //initial auth value
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //Setting token in header
    axios.defaults.headers.common["Authorization"] = JSON.parse(
        localStorage.getItem("auth")
    )?.token;

    useEffect(() => {
        const authDataUpdate = () => {
            const res = JSON.parse(localStorage.getItem("auth"));
            setAuth(res);
        };

        authDataUpdate();

        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
