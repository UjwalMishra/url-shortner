const express = require('express');
const {userSignupController,userLoginController} = require('../controllers/users');

const router = express.Router();

// to register user
router.post("/",userSignupController);
//to login that user
router.post("/login",userLoginController);

module.exports = router;