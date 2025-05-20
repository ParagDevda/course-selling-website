const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_USERSECRET = process.env.JWT_USERSECRET;
const JWT_ADMINSECRET = process.env.JWT_ADMINSECRET
// console.log(JWT_ADMINSECRET);

function user_auth(req,res,next){
    const token = req.headers.authorization;
    const response = jwt.verify(token,JWT_USERSECRET);
    if(response){
        req.userId =response.id ;
        next();
    }else{
        res.status(403).json({message:"unauthorised"});
    }

}
function admin_auth(req,res,next){
    const token = req.headers.authorization;
    const response = jwt.verify(token,JWT_ADMINSECRET);
    console.log(response.id)
    if(response){
        req.id =response.id ;
        next();
    }else{
        res.status(403).json({message:"unauthorised"});
    }

}
module.exports = {
    user_auth,JWT_USERSECRET,admin_auth,JWT_ADMINSECRET
};