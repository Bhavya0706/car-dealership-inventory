import Navbar from "./components/Nevbar";
import Hero from "./components/Hero";
import CarsPage from "./pages/carPage";
import CarDetailsPage from "./pages/CarDetailsPage";
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
            
           
                </Routes>
              
            </main>
        </div>
    );
}

export default App;