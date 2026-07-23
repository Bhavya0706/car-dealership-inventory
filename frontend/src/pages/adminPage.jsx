import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/cars";

const emptyForm = {
    make: "",
    model: "",
    category: "",
    year: "",
    price: "",
    quantity: "",
    fuelType: "Petrol",
    description: ""
};

function AdminPage() {
    const [cars, setCars] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [restockValues, setRestockValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const loadCars = async () => {
        setError("");

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not load cars");
            }

            setCars(data.cars || data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCars();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        const payload = {
            ...form,
            year: Number(form.year),
            price: Number(form.price),
            quantity: Number(form.quantity)
        };

        try {
            const response = await fetch(
                editingId ? `${API_URL}/${editingId}` : API_URL,
                {
                    method: editingId ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                const validationMessage = data.errors
                    ?.map((item) => item.msg)
                    .join(", ");

                throw new Error(
                    validationMessage ||
                    data.message ||
                    "Could not save car"
                );
            }

            setMessage(
                editingId
                    ? "Car updated successfully."
                    : "Car added successfully."
            );

            setForm(emptyForm);
            setEditingId(null);
            await loadCars();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (car) => {
        setEditingId(car._id);

        setForm({
            make: car.make,
            model: car.model,
            category: car.category,
            year: car.year,
            price: car.price,
            quantity: car.quantity,
            fuelType: car.fuelType,
         
            description: car.description || ""
        });

        setMessage("");
        setError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
    };

    const handleDelete = async (carId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this car?"
        );

        if (!confirmed) {
            return;
        }

        setMessage("");
        setError("");

        try {
            const response = await fetch(`${API_URL}/${carId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not delete car");
            }

            setMessage("Car deleted successfully.");
            setCars((previous) =>
                previous.filter((car) => car._id !== carId)
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRestock = async (carId) => {
        const quantity = Number(restockValues[carId]);

        if (!Number.isInteger(quantity) || quantity <= 0) {
            setError("Enter a positive whole number for restocking.");
            return;
        }

        setMessage("");
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/${carId}/restock`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ quantity })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Could not restock car"
                );
            }

            setCars((previous) =>
                previous.map((car) =>
                    car._id === carId ? data.car : car
                )
            );

            setRestockValues((previous) => ({
                ...previous,
                [carId]: ""
            }));

            setMessage("Car restocked successfully.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="admin-page">
            <div className="admin-heading">
                <div>
                    <span>Inventory management</span>
                    <h1>Admin Dashboard</h1>
                </div>

                <p>{cars.length} cars in inventory</p>
            </div>

            {message && (
                <p className="admin-message success">{message}</p>
            )}

            {error && (
                <p className="admin-message error">{error}</p>
            )}

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>
                    {editingId ? "Update Car" : "Add New Car"}
                </h2>

                <div className="admin-form-grid">
                    <input
                        name="make"
                        placeholder="Make"
                        value={form.make}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="model"
                        placeholder="Model"
                        value={form.model}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="year"
                        type="number"
                        placeholder="Year"
                        value={form.year}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        min="0"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="quantity"
                        type="number"
                        min="0"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="fuelType"
                        value={form.fuelType}
                        onChange={handleChange}
                        required
                    >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="CNG">CNG</option>
                    </select>


                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="admin-form-actions">
                    <button type="submit" disabled={saving}>
                        {saving
                            ? "Saving..."
                            : editingId
                              ? "Update Car"
                              : "Add Car"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="admin-cancel-button"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="admin-inventory">
                <h2>Manage Inventory</h2>

                {loading ? (
                    <p>Loading inventory...</p>
                ) : (
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Car</th>
                                    <th>Year</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Restock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cars.map((car) => (
                                    <tr key={car._id}>
                                        <td>
                                            <strong>
                                                {car.make} {car.model}
                                            </strong>
                                            <small>{car.category}</small>
                                        </td>

                                        <td>{car.year}</td>

                                        <td>
                                            ₹
                                            {Number(
                                                car.price
                                            ).toLocaleString("en-IN")}
                                        </td>

                                        <td>{car.quantity}</td>

                                        <td>
                                            <div className="restock-control">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    placeholder="Qty"
                                                    value={
                                                        restockValues[
                                                            car._id
                                                        ] || ""
                                                    }
                                                    onChange={(event) =>
                                                        setRestockValues(
                                                            (previous) => ({
                                                                ...previous,
                                                                [car._id]:
                                                                    event
                                                                        .target
                                                                        .value
                                                            })
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRestock(
                                                            car._id
                                                        )
                                                    }
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="admin-row-actions">
                                                <button
                                                    type="button"
                                                    className="edit-button"
                                                    onClick={() =>
                                                        handleEdit(car)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            car._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {cars.length === 0 && (
                            <p className="admin-empty">
                                No cars are currently available.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AdminPage;