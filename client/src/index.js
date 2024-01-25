import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { CategoryProvider } from "./context/categoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CategoryProvider>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </CategoryProvider>
);
