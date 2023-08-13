const express = require('express');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');


//@route    POST api/users
//@desc     This is a user registraton route
//@access   Public

router.post("/",[
    check('name',"Name is required").not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
],async (req,res)=>{
    try{
        const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});

    }
    const {name,email,password} = req.body;

    let user = await User.findOne({email /*email:email*/});
    if(user){
        return res.status(400).json({error:[{msg: "User already Exsist"}]});
    }

   

    
    const salt = await bcrypt.genSalt(10);
    const ep = await bcrypt.hash(password,salt);

    user = new User({
        name,
        email,
        password: ep
    })

    await user.save();

    const payload = {
        user:{
            id: user.id
        }
    }
    jwt.sign(payload,config.get('jwtToken'),{expiresIn: 3600000},(err,token)=>{
        if(err){
            throw err
        }else{
            res.json({token:token})
        }
    });
    

  //  console.log(user);
    //res.send({user});
    }catch(err){
        console.log(err.message);
        return res.send({error:[{err: err.message}]})
    }
    
});


module.exports = router;