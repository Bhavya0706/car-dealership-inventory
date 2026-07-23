const express = require('express');

const {addCar , viewAllCars ,viewCarById , updateCar,deleteCar } = require("../controllers/car.controller");
const {createCarValidator , updateCarValidator , carFilterValidator} = require('../validators/car.validator');


const {authorizeRoles} = require("../middleware/role.middelware");
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.get("/", viewAllCars);
router.get("/search", carFilterValidator, viewAllCars);
router.post("/",authenticate,authorizeRoles('admin'),createCarValidator,addCar);
router.get("/:id", viewCarById);
router.put("/:id",authenticate,authorizeRoles("admin"),updateCarValidator,updateCar);
router.delete("/:id",authenticate,authorizeRoles("admin"),deleteCar);

module.exports = router;
  