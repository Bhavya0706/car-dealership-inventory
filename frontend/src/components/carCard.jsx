function CarCard({ car }) {
    return (
        <article className="car-card">
            <div className="car-image-container">
                {car.image ? (
                    <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="car-image"
                    />
                ) : (
                    <div className="car-image-placeholder">🚙</div>
                )}

                <span className={`car-status ${car.status.toLowerCase()}`}>
                    {car.status}
                </span>
            </div>

            <div className="car-details">
                <div className="car-heading">
                    <div>
                        <h3>{car.brand} {car.model}</h3>
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

                <button
                    className="view-car-button"
                    disabled={car.status === "Sold"}
                >
                    {car.status === "Sold" ? "Already Sold" : "View Details"}
                </button>
            </div>
        </article>
    );
}

export default CarCard;