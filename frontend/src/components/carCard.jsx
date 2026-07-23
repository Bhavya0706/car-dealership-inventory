import { Link } from "react-router-dom";

function CarCard({ car }) {
    return (
        <article className="car-card">
            <div className="car-details">
                <div className="car-card-top">
             

                    <span className="car-category">
                        {car.category}
                    </span>
                </div>

                <div className="car-heading">
                    <div>
                        <h3>
                            {car.make} {car.model}
                        </h3>
                        <p>{car.year}</p>
                    </div>

                    <strong>
                        ₹{Number(car.price).toLocaleString("en-IN")}
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