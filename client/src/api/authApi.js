import axios from "axios";
import { useAuth } from "../context/authContext";

export const authUserApi = async () => {
    const { setAuth } = useAuth();
    await axios
        .get("/api/v1/user/login")
        .then(({ data }) => {
            setAuth(data);
        })
        .catch((err) => console.error("Auth Api Error", err));
};
