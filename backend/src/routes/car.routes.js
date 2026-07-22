const express = require('express');

const {addCar , viewAllCars ,viewCarById , updateCar,deleteCar } = require("../controllers/car.controller");
const {createCarValidator , updateCarValidator} = require('../validators/car.validator');


const {authorizeRoles} = require("../middleware/role.middelware");
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();
router.get("/", viewAllCars);
router.get("/:id", viewCarById);
router.post("/",authenticate,authorizeRoles('admin'),createCarValidator,addCar);
router.patch("/:id",authenticate,authorizeRoles("admin"),updateCarValidator,updateCar);
router.delete("/:id",authenticate,authorizeRoles("admin"),deleteCar);

module.exports = router;
  