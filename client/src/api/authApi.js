import axios from "axios";

export const AuthUserApi = async (payload) => {
    const { email, password } = payload;

    return await axios.post("/api/v1/user/login", { email, password });
};
