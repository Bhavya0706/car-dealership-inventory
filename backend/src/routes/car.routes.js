const express = require('express');

const {addCar} = require("../controllers/car.controller");
const {createCarValidator} = require('../validators/car.validator');


const {authorizeRoles} = require("../middleware/role.middelware");
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post("/",authenticate,authorizeRoles('admin'),createCarValidator,addCar);

module.exports = router;
  