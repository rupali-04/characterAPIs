const User = require('../model/user');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

exports.userDetails = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
       // console.log(user);
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json("Server Error!!");
    }
}

exports.addUser = async (req,res)=>{
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
};