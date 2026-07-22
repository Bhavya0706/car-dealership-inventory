const Car = require("../models/car");

const createCar = async (carData) => {
    const car = await Car.create(carData);
    return car;
};

module.exports = {
    createCar
};