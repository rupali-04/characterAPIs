const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

//@route    GET api/auth
//@desc     This route help us to het user from the token
//@access   Private

router.get("/",auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
       // console.log(user);
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
});



//@route    Post api/auth
//@desc     This route help us to login user Email and password
//@access   Public


router.post("/user",[ 
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});

        }
        const {email,password} = req.body;
        let user = await User.findOne({email /*email:email*/});
        if(!user){
            return res.status(400).json({error:[{msg: "Invalid credentials......"}]});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({msg:"Invalid credentials"})
        }

        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,'jwtToken',{expiresIn: 3600000},(err,token)=>{
            if(err){
                throw err
            }else{
                res.json({token})
            }
        });
        

    }catch(err){
        console.log(err.message);
        return res.status(500).json({msg:"Server Error!!"});
    }
})

module.exports = router;