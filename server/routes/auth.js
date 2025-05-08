// routes/auth.js
// const express = require('express');
// const router = express.Router();
const { signup , login} = require('../controllers/AuthController');
const { signupValidation , loginValidation} = require('../middleware/authMiddleware');
// console.log("Signup handler:", signup);  // It should log a function
const router = require('express').Router() ;
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// router.post('/signup', signupValidation, signup);  // signup should be a function

module.exports = router;
