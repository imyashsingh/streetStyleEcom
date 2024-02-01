import React, { useEffect, useState } from "react";

import men from "../images/HomePage/Men.jpg";
import women from "../images/HomePage/Women.jpg";
import kid from "../images/HomePage/Kid.jpg";
import accessories from "../images/HomePage/Accesories.jpg";

import menM from "../images/HomePage/Men-M.jpg";
import womenM from "../images/HomePage/Women-M.jpg";
import kidM from "../images/HomePage/Kid-M.jpg";
import accessoriesM from "../images/HomePage/Accesories-M.jpg";

const Home = () => {
    //image for desktop
    const images = [men, women, kid, accessories];
    //image for mobile device
    const imagesM = [menM, womenM, kidM, accessoriesM];
    const [currentImage, setCurrentImage] = useState(0);

    //change Homepage Image in interval
    useEffect(() => {
        const interval = setInterval(() => {
            // Update the current image every 5 seconds (adjust as needed)
            setCurrentImage((prevImage) => (prevImage + 1) % images?.length);
        }, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [images?.length]);

    return (
        <div className="bg-gray-50 flex justify-center items-center  w-screen h-screen  overflow-hidden">
            <img
                src={images[currentImage]}
                alt="cover"
                className=" hidden md:block h-full w-full object-cover object-center "
            />
            <img
                src={imagesM[currentImage]}
                alt="cover"
                className="md:hidden sm:block h-full w-full object-cover object-center"
            />
        </div>
    );
};

export default Home;
