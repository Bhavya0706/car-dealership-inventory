const { body , query} = require("express-validator");

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
const carFilterValidator = [
    query("search")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Search cannot be empty"),

    query("fuelType")
        .optional()
        .isIn(["Petrol", "Diesel", "Electric", "Hybrid", "CNG"])
        .withMessage("Please provide a valid fuel type"),

    query("status")
        .optional()
        .isIn(["Available", "Sold"])
        .withMessage("Please provide a valid status"),

    query("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be a positive number"),

    query("maxPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be a positive number"),
        query("maxPrice").custom((maxPrice, { req }) => {
            if (
                req.query.minPrice !== undefined &&
                maxPrice !== undefined &&
                Number(req.query.minPrice) > Number(maxPrice)
            ) {
                throw new Error("Minimum price cannot be greater than maximum price");
            }
        
            return true;
        })
];

module.exports = {
    createCarValidator,updateCarValidator,carFilterValidator
};