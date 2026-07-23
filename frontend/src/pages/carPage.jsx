import { useEffect, useState } from "react";
import { getCars } from "../api/carApi.js";
import CarCard from "../components/carCard.jsx";

const emptyFilters = {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: ""
};

function CarsPage() {
    const [cars, setCars] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState(emptyFilters);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCars = async (selectedFilters = {}) => {
        setLoading(true);
        setError("");

        try {
            const data = await getCars(selectedFilters);
            setCars(data.cars || data);
        } catch (err) {
            setCars([]);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function loadInitialCars() {
            setLoading(true);
            setError("");

            try {
                const data = await getCars();
                const loadedCars = data.cars || data;

                setCars(loadedCars);

                const availableCategories = [
                    ...new Set(
                        loadedCars
                            .map((car) => car.category)
                            .filter(Boolean)
                    )
                ].sort();

                setCategories(availableCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadInitialCars();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleFilter = (event) => {
        event.preventDefault();

        const minPrice = Number(filters.minPrice);
        const maxPrice = Number(filters.maxPrice);

        if (
            filters.minPrice !== "" &&
            filters.maxPrice !== "" &&
            minPrice > maxPrice
        ) {
            setError(
                "Minimum price cannot be greater than maximum price."
            );
            return;
        }

        loadCars(filters);
    };

    const handleClear = () => {
        setFilters(emptyFilters);
        loadCars();
    };

    return (
        <section className="inventory-section">
            <div className="inventory-heading">
                <div>
                    <span>Dealership collection</span>
                    <h2>Car Inventory</h2>
                </div>

                <p>
                    {cars.length}{" "}
                    {cars.length === 1 ? "car" : "cars"} found
                </p>
            </div>

            <form
                className="inventory-filters"
                onSubmit={handleFilter}
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Search by make or model..."
                    value={filters.search}
                    onChange={handleChange}
                />

                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                >
                    <option value="">All categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="minPrice"
                    min="0"
                    placeholder="Minimum price"
                    value={filters.minPrice}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="maxPrice"
                    min="0"
                    placeholder="Maximum price"
                    value={filters.maxPrice}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="filter-button"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Apply Filters"}
                </button>

                <button
                    type="button"
                    className="clear-filter-button"
                    onClick={handleClear}
                    disabled={loading}
                >
                    Clear
                </button>
            </form>

            {error && (
                <p className="filter-error">{error}</p>
            )}

            {loading ? (
                <p className="inventory-loading">Loading cars...</p>
            ) : (
                <>
                    <div className="cars-grid">
                        {cars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>

                    {cars.length === 0 && !error && (
                        <p className="no-cars-message">
                            No cars match the selected filters.
                        </p>
                    )}
                </>
            )}
        </section>
    );
}

export default CarsPage;