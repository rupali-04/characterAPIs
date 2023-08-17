const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {check,validationResult} = require('express-validator');

exports.registerUser = async (req,res)=>{
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
    jwt.sign(payload,'jwtToken',{expiresIn: 3600000},(err,token)=>{
        if(err){
            throw err
        }else{
            res.json({token:token})
        }
    });

    }catch(err){
        console.log(err.message);
        return res.send({error:[{err: err.message}]})
    }
    
};