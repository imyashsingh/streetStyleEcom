import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Legal from "./pages/Legal";
import ReturnAndExchange from "./pages/ReturnAndExchange";
import RegisterPage from "./pages/authPages/RegisterPage";
import LogInPage from "./pages/authPages/LogInPage";
import ForgotPasswordPage from "./pages/authPages/ForgotPasswordPage";
import AdminPrivateRoute from "./components/Router/AdminPrivateRoute";
import UserPrivateRoute from "./components/Router/UserPrivateRoute";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import AdminDash from "./pages/adminDashboard/AdminDash";
import CreateCategory from "./pages/adminDashboard/CreateCategory";
import CreateProduct from "./pages/adminDashboard/CreateProduct";
import ProductsEdit from "./pages/adminDashboard/ProductsEdit";
import OrderStatusChange from "./pages/adminDashboard/OrderStatusChange";
import ProductEditForm from "./pages/adminDashboard/ProductEditForm";
import ProductGrid from "./pages/ProductGrid";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route
                        path="/forgotPassword"
                        element={<ForgotPasswordPage />}
                    />
                    <Route path="/dashboard" element={<AdminPrivateRoute />}>
                        <Route path="admin" element={<AdminDash />} />
                        <Route
                            path="admin/create-category"
                            element={<CreateCategory />}
                        />
                        <Route
                            path="admin/create-product"
                            element={<CreateProduct />}
                        />
                        <Route
                            path="admin/product-edit"
                            element={<ProductsEdit />}
                        />
                        <Route
                            path="admin/product-edit/:name"
                            element={<ProductEditForm />}
                        />
                        <Route
                            path="admin/orders-status"
                            element={<OrderStatusChange />}
                        />
                    </Route>

                    <Route path="/dashboard" element={<UserPrivateRoute />}>
                        <Route path="user" element={<UserDashboard />} />
                    </Route>

                    <Route path="/product" element={<ProductGrid />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route
                        path="/returnandexchange"
                        element={<ReturnAndExchange />}
                    />

                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
