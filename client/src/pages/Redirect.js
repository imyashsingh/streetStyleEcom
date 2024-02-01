import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const redirectCounter = setTimeout(() => {
            setCount((prev) => prev - 1);
        }, 500);

        count === 0 && navigate("/");

        return () => clearTimeout(redirectCounter);
    }, [count, navigate]);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <h1 className="font-semibold text-xl leading-loose">
                Redirecting You Back In {count}
            </h1>
        </div>
    );
};

export default Redirect;
