import Navbar from "./components/Nevbar";
import Hero from "./components/Hero";
import AdminRoute from "./components/AdminRoute";
import CarsPage from "./pages/carPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/adminPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/cars" element={<CarsPage />} />
                    <Route
                        path="/cars/:id"
                        element={<CarDetailsPage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />

                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminPage />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;