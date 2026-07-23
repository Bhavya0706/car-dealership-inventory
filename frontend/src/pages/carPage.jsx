import { useEffect, useState } from "react";
import { getCars } from "../api/carApi.js";
import CarCard from "../components/carCard.jsx";


function CarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");


    useEffect(() => {
        async function loadCars() {
            try {
                const data = await getCars();

                console.log("Cars response:", data);
                setCars(data.cars || data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadCars();
    }, []);

    const filteredCars = cars.filter((car) => {
        const searchText = search.toLowerCase();
    
        return (
            car.make.toLowerCase().includes(searchText) ||
            car.model.toLowerCase().includes(searchText)
        );
    });

    if (loading) {
        return <p>Loading cars...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="inventory-section">
        <div className="inventory-heading">
            <div>
                <span>Dealership collection</span>
                <h2>Car Inventory</h2>
            </div>

            <p>
    {filteredCars.length}{" "}
    {filteredCars.length === 1 ? "car" : "cars"} found
</p>
        </div>
        <div className="inventory-filters">
    <input
        type="text"
        placeholder="Search by make or model..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
    />

</div>
        <div className="cars-grid">
        {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
            ))}
        </div>
        {filteredCars.length === 0 && (
    <p className="no-cars-message">
        No cars match your search or selected status.
    </p>
)}
    </section>
    );
}

export default CarsPage;