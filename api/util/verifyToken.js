const jwt = require("jsonwebtoken");



const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        // const token = authHeader.split(" ")[1]
        // jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        jwt.verify(authHeader,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err){
                return res.status(403).json("Token is Invalid")
            }
            req.user = user;
            next();
        })

    }else{
        return res.status(401).json("you are not Authenticated")
    }
}


const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("you are not allowded to do that")
        }
    })

}


const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("you are not allowded to do that")
        }
    })

}


module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}