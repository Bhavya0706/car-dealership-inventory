const Car = require("../models/car");

const createCar = async (carData) => {
    const car = await Car.create(carData);
    return car;
};

const getAllCars = async (filters = {}) => {
    const query = {};

    if (filters.search) {
        query.$or = [
            { brand: { $regex: filters.search, $options: "i" } },
            { model: { $regex: filters.search, $options: "i" } }
        ];
    }

    if (filters.fuelType) {
        query.fuelType = filters.fuelType;
    }

    if (filters.status) {
        query.status = filters.status;
    }

    if (filters.minPrice || filters.maxPrice) {
        query.price = {};

        if (filters.minPrice) {
            query.price.$gte = Number(filters.minPrice);
        }

        if (filters.maxPrice) {
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
module.exports = {
    createCar,getAllCars,getCarById,updateCarById,deleteCarById
};