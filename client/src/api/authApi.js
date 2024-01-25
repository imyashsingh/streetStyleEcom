import axios from "axios";

// user and token data
export const AuthUserApi = async (payload) => {
    const { email, password } = payload;

    return await axios.post("/api/v1/user/login", { email, password });
};

//new user Register
export const AuthRegisterUserApi = async (payload) => {
    const { name, email, password, phone, answer, address } = payload;

    return await axios.post("/api/v1/user/register", {
        name,
        email,
        password,
        phone,
        answer,
        address,
    });
};

//Api for forgot password change
export const AuthForgotPasswordApi = async (payload) => {
    const { email, password, answer } = payload;
    return await axios.put("/api/v1/user/forgotPassword", {
        email,
        password,
        answer,
    });
};
