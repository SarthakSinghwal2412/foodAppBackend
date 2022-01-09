const jwt = require("jsonwebtoken");
const JWT_KEY = require('../secrets');

function protectRoute(req,res,next){
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
            next();
        }
        
    }else{
        return res.json({
            message :"operation not allowed"
        });
    }
}
module.exports = protectRoute;