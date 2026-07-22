const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            trim: true
        },

        model: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        fuelType: {
            type: String,
            required: true,
            enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"]
        },

        status: {
            type: String,
            enum: ["Available", "Sold"],
            default: "Available"
        },

        image: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;