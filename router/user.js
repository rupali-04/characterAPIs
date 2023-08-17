const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const userController = require('../controller/userController');


//@route    POST api/users
//@desc     This is a user registraton route
//@access   Public

router.post("/",[
    check('name',"Name is required").not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],userController.registerUser);


module.exports = router;