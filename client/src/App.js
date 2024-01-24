import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Legal from "./pages/Legal";
import ReturnAndExchange from "./pages/ReturnAndExchange";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="legal" element={<Legal />} />
                    <Route
                        path="returnandexchange"
                        element={<ReturnAndExchange />}
                    />

                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
