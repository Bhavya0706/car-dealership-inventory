const { validationResult } = require("express-validator");
const { createCar , getAllCars ,getCarById ,  updateCarById ,deleteCarById} = require("../services/car.service");

const addCar = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
    }

    try {
        const car = await createCar(req.body);

        return res.status(201).json({
            message: "Car added successfully",
            car
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const viewAllCars = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
    }
    try {
        const cars = await getAllCars(req.query);

        return res.status(200).json({
            message: "Cars retrieved successfully",
            cars
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const viewCarById = async (req, res) => {
    try {
        const car = await getCarById(req.params.id);

        return res.status(200).json({
            message: "Car retrieved successfully",
            car
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        });
    }
};

const updateCar = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array()
        });
    }

    try {
        const car = await updateCarById(req.params.id, req.body);

        return res.status(200).json({
            message: "Car updated successfully",
            car
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        await deleteCarById(req.params.id);

        return res.status(200).json({
            message: "Car deleted successfully"
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || " server error"
        });
    }
};

module.exports = {
    addCar,viewAllCars,viewCarById,updateCar,deleteCar
};