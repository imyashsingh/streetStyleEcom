import React from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
    const { auth } = useAuth();
    return <div className="pt-28">{JSON.stringify(auth, null, 4)}</div>;
};

export default Home;
