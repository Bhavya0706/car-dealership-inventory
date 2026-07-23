const { body, query } = require("express-validator");

const createCarValidator = [
    body("make")
        .trim()
        .notEmpty()
        .withMessage("Make is required"),

    body("model")
        .trim()
        .notEmpty()
        .withMessage("Model is required"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("year")
        .isInt({
            min: 1900,
            max: new Date().getFullYear() + 1
        })
        .withMessage("Please provide a valid year"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),

    body("quantity")
        .isInt({ min: 0 })
        .withMessage("Quantity must be a non-negative integer"),

    body("fuelType")
        .isIn(["Petrol", "Diesel", "Electric", "Hybrid", "CNG"])
        .withMessage("Please provide a valid fuel type")
];

const updateCarValidator = [
    body("make")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Make cannot be empty"),

    body("model")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Model cannot be empty"),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),

    body("year")
        .optional()
        .isInt({
            min: 1900,
            max: new Date().getFullYear() + 1
        })
        .withMessage("Please provide a valid year"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),

    body("quantity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Quantity must be a non-negative integer"),

    body("fuelType")
        .optional()
        .isIn(["Petrol", "Diesel", "Electric", "Hybrid", "CNG"])
        .withMessage("Please provide a valid fuel type")
];

const carFilterValidator = [
    query("search")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Search cannot be empty"),

    query("make")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Make cannot be empty"),

    query("model")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Model cannot be empty"),

    query("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),

    query("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price cannot be negative"),

    query("maxPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price cannot be negative")
        .custom((maxPrice, { req }) => {
            if (
                req.query.minPrice !== undefined &&
                Number(req.query.minPrice) > Number(maxPrice)
            ) {
                throw new Error(
                    "Minimum price cannot be greater than maximum price"
                );
            }

            return true;
        })
];

module.exports = {
    createCarValidator,
    updateCarValidator,
    carFilterValidator
};