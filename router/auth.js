const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check,validationResult} = require('express-validator');

const authController = require("../controller/authController");



//@route    GET api/auth
//@desc     This route help us to het user from the token
//@access   Private
router.get("/",auth,authController.userDetails);

//@route    Post api/auth
//@desc     This route help us to login user Email and password
//@access   Public
router.post("/user",[ 
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],authController.addUser);

module.exports = router;