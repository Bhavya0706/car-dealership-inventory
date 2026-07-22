const { validationResult } = require("express-validator");
const { createCar } = require("../services/car.service");

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

module.exports = {
    addCar
};