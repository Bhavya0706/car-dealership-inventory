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

const updateCarValidator = [
    body("brand")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Brand cannot be empty"),

    body("model")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Model cannot be empty"),

    body("year")
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage("Please provide a valid year"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),

    body("fuelType")
        .optional()
        .isIn(["Petrol", "Diesel", "Electric", "Hybrid", "CNG"])
        .withMessage("Please provide a valid fuel type"),

    body("status")
        .optional()
        .isIn(["Available", "Sold"])
        .withMessage("Please provide a valid status")
];

module.exports = {
    createCarValidator,updateCarValidator
};