const express = require('express');

const {registerValidator , loginValidator} = require('../validators/auth.validator');
const {register , login } = require('../controllers/auth.controller');

const router = express.Router();

router.post("/register",registerValidator,register);
router.post("/login" , loginValidator, login);

module.exports = router;