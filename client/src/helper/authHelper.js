import axios from "axios";

//Set auth token in header from localstorage
export const authTokenHeaderSetter = () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    //Setting token in header
    axios.defaults.headers.common["Authorization"] = user?.token;
};
