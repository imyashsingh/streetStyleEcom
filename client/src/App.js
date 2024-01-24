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
