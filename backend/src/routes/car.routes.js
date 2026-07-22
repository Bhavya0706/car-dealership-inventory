const express = require('express');

const {addCar , viewAllCars ,viewCarById} = require("../controllers/car.controller");
const {createCarValidator} = require('../validators/car.validator');


const {authorizeRoles} = require("../middleware/role.middelware");
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();
router.get("/", viewAllCars);
router.get("/:id", viewCarById);
router.post("/",authenticate,authorizeRoles('admin'),createCarValidator,addCar);

module.exports = router;
  