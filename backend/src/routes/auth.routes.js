const express = require('express');

const {registerValidator} = require('../validators/auth.validator');
const {register} = require('../controllers/auth.controller');

const router = express.Router();

router.post("/register",registerValidator,register);

module.exports = router;