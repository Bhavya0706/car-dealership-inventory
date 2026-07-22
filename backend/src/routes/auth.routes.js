const express = require('express');

const {registerValidator , loginValidator} = require('../validators/auth.validator');
const {register , login } = require('../controllers/auth.controller');
const { authenticate } = require("../middleware/auth.middleware"); 

const router = express.Router();

router.post("/register",registerValidator,register);
router.post("/login" , loginValidator, login);
router.get("/me", authenticate, (req, res) => {return res.status(200).json({
        message: "route are protected",
        user: req.user
    });
});


module.exports = router;