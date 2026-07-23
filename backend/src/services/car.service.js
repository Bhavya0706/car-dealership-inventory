const Car = require("../models/car");

const createCar = async (carData) => {
    const car = await Car.create(carData);
    return car;
};

const getAllCars = async (filters = {}) => {
    const query = {};

    if (filters.search) {
        query.$or = [
            { make: { $regex: filters.search, $options: "i" } },
            { model: { $regex: filters.search, $options: "i" } },
            { category: { $regex: filters.search, $options: "i" } }
        ];
    }

    if (filters.make) {
        query.make = {
            $regex: filters.make,
            $options: "i"
        };
    }

    if (filters.model) {
        query.model = {
            $regex: filters.model,
            $options: "i"
        };
    }

    if (filters.category) {
        query.category = {
            $regex: filters.category,
            $options: "i"
        };
    }

    if (filters.minPrice || filters.maxPrice) {
        query.price = {};

        if (filters.minPrice !== undefined) {
            query.price.$gte = Number(filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
            query.price.$lte = Number(filters.maxPrice);
        }
    }

    const cars = await Car.find(query).sort({ createdAt: -1 });

    return cars;
};

const getCarById = async (carId) => {
    const car = await Car.findById(carId);

    if (!car) {
        const error = new Error("Car not found");
        error.statusCode = 404;
        throw error;
    }

    return car;
};

const updateCarById = async (carId, carData) => {
    const car = await Car.findByIdAndUpdate(
        carId,
        carData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!car) {
        const error = new Error("Car not found");
        error.statusCode = 404;
        throw error;
    }

    return car;
};
const deleteCarById = async (carId) => {
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
        const error = new Error("Car not found");
        error.statusCode = 404;
        throw error;
    }

    return car;
};

const purchaseCarById = async (carId) => {
    const car = await Car.findOneAndUpdate(
        {
            _id: carId,
            quantity: { $gt: 0 }
        },
        {
            $inc: { quantity: -1 }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!car) {
        const existingCar = await Car.findById(carId);

        if (!existingCar) {
            const error = new Error("Car not found");
            error.statusCode = 404;
            throw error;
        }

        const error = new Error("Car is out of stock");
        error.statusCode = 400;
        throw error;
    }

    return car;
};
module.exports = {
    createCar,getAllCars,getCarById,updateCarById,deleteCarById,purchaseCarById
};