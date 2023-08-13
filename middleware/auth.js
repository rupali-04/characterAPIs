const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    // Get the Token
    const token = req.header('x-auth-token');
    
    // Check if not token
    if(!token){
        return res.status(401).json({msg:"Not Authorized......."});
    }

    // Verify Token
    try{
        const decode = jwt.verify(token,"jwtToken");
        req.user = decode.user;
        next();
    }catch(err){
        return res.status(401).json({msg:"Invaild Token....."});
    }
}