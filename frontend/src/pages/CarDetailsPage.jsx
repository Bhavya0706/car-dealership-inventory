import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";


function CarDetailsPage() {
    const { id } = useParams();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [purchasing, setPurchasing] = useState(false);
const [purchaseMessage, setPurchaseMessage] = useState("");
const [purchaseError, setPurchaseError] = useState("");

const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/cars/${id}`
                );
                const contentType = response.headers.get("content-type");

                if (!contentType || !contentType.includes("application/json")) {
                    const htmlResponse = await response.text();
                    console.log("Backend returned HTML:", htmlResponse);
                
                    throw new Error(
                        "The API URL is incorrect or the backend route was not found"
                    );
                }
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || "Unable to retrieve car");
                }
                
                setCar(data.car || data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);
    const handlePurchase = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            navigate("/login", {
                state: {
                    message: "Please log in before purchasing a car.",
                    from: `/cars/${id}`
                }
            });
    
            return;
        }
    
        setPurchaseMessage("");
        setPurchaseError("");
        setPurchasing(true);
    
        try {
            const response = await fetch(
                `http://localhost:5000/api/cars/${id}/purchase`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            const contentType = response.headers.get("content-type");
    
            if (!contentType?.includes("application/json")) {
                throw new Error("The server returned an invalid response");
            }
    
            const data = await response.json();
    
            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
    
                navigate("/login", {
                    state: {
                        message:
                            "Your login has expired. Please log in again.",
                        from: `/cars/${id}`
                    }
                });
    
                return;
            }
    
            if (!response.ok) {
                throw new Error(data.message || "Purchase failed");
            }
    
            setCar(data.car);
            setPurchaseMessage("Car purchased successfully.");
        } catch (error) {
            setPurchaseError(error.message);
        } finally {
            setPurchasing(false);
        }
    };
    if (loading) {
        return <p className="car-details-message">Loading car details...</p>;
    }

    if (error) {
        return <p className="car-details-message error">{error}</p>;
    }

    if (!car) {
        return <p className="car-details-message">Car not found.</p>;
    }

    return (
        <main className="car-details-page">
            <Link to="/cars" className="back-link">
                ← Back to cars
            </Link>

            <section className="car-details-card">

                <div className="details-content">
                    <span
                        className={
                            car.quantity > 0
                                ? "details-status available"
                                : "details-status sold"
                        }
                    >
                        {car.quantity > 0
                            ? `${car.quantity} in stock`
                            : "Out of stock"}
                    </span>

                    <h1>
                        {car.make} {car.model}
                    </h1>

                    <p className="details-price">
                        ₹{car.price.toLocaleString("en-IN")}
                    </p>

                    <div className="details-information">
                        <p>
                            <strong>Make:</strong> {car.make}
                        </p>

                        <p>
                            <strong>Model:</strong> {car.model}
                        </p>

                        <p>
                            <strong>Category:</strong> {car.category}
                        </p>

                        <p>
                            <strong>Year:</strong> {car.year}
                        </p>

                        <p>
                            <strong>Fuel Type:</strong> {car.fuelType}
                        </p>

                        <p>
                            <strong>Quantity:</strong> {car.quantity}
                        </p>
                    </div>

                    <div className="details-description">
                        <h2>Description</h2>

                        <p>
                            {car.description ||
                                "No description available."}
                        </p>
                    </div>
                    {purchaseMessage && (
    <p className="purchase-message success">
        {purchaseMessage}
    </p>
)}

{purchaseError && (
    <p className="purchase-message error">
        {purchaseError}
    </p>
)}

<button
    type="button"
    className="purchase-button"
    onClick={handlePurchase}
    disabled={car.quantity === 0 || purchasing}
>
    {purchasing
        ? "Purchasing..."
        : car.quantity === 0
          ? "Out of Stock"
          : "Purchase"}
</button>
                </div>
            </section>
        </main>
    );
}

export default CarDetailsPage;