import Navbar from "./components/Nevbar";
import Hero from "./components/Hero";
import CarsPage from "./pages/carPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div>
            <Navbar />

         
            <main>
                <Routes>
<Route path="/" element={<Hero />}/> 
<Route path="/cars/:id" element={<CarDetailsPage />} />
<Route path="/cars" element={<CarsPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />}/>
            
           
                </Routes>
              
            </main>
        </div>
    );
}

export default App;