import { Link } from "react-router-dom";

function CarCard({ car }) {
    return (
        <article className="car-card">
            <div className="car-image-container">
                {car.image ? (
                    <img
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        className="car-image"
                    />
                ) : (
                    <div className="car-image-placeholder">🚙</div>
                )}

<span
    className={
        car.quantity > 0
            ? "car-status available"
            : "car-status sold"
    }
>
    {car.quantity > 0
        ? `${car.quantity} in stock`
        : "Out of stock"}
</span>
            </div>

            <div className="car-details">
                <div className="car-heading">
                    <div>
                        <h3>{car.make} {car.model}</h3>
                        <p>{car.year}</p>
                    </div>

                    <strong>
                        ₹{car.price.toLocaleString("en-IN")}
                    </strong>
                </div>

                <div className="car-info">
                    <span>⛽ {car.fuelType}</span>
                </div>

                <p className="car-description">
                    {car.description || "No description available."}
                </p>

                <Link
    to={`/cars/${car._id}`}
    className="view-car-button"
>
    View Details
</Link>
            </div>
        </article>
    );
}

export default CarCard;