const { body } = require("express-validator");

const createCarValidator = [
    body("brand")
        .trim()
        .notEmpty()
        .withMessage("Brand is required"),

    body("model")
        .trim()
        .notEmpty()
        .withMessage("Model is required"),

    body("year")
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage("Please provide a valid year"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("fuelType")
        .isIn(["Petrol", "Diesel", "Electric", "Hybrid", "CNG"])
        .withMessage("Please provide a valid fuel type")
];

module.exports = {
    createCarValidator
};