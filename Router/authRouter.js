
const express = require('express');
const authRouter = express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require('../secrets');
authRouter
.route("/signup")
.get( getSignUp)  
.post(postSignUp)

authRouter
.route("/login")
.post(loginUser)

/////////SIGN UP
function getSignUp(req,res){
        console.log("getsignup is called");
    }
async function postSignUp(req,res){
        let dataObj = req.body;
        // console.log("backend",dataObj);
        let newUser = await userModel.create(dataObj);
        res.json({
            message : "User Signed Up",
            data:newUser
        })
    }
async function loginUser(req,res){
    try{
        
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                if(user.password == data.password){
                    // res.cookie('isLoggedIn',true,{httpOnly:true});
                    let uid = user['_id'];//this is payload
                    let jwt_token = jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',jwt_token,{httpOly:true});
                    return res.json({
                        message :"user has logged in successfully",
                        userDetails:data
                    })
                }else{
                        return res.json({
                            message :"password is incorrect"
                        })
                    }
                }
            else{
                    return res.json({
                        message:"user not found"
                    })
                }
        }
        else{
            return res.json({
                message:"empty field found"
            })
        }
    }
        
    catch(err){
        return res.json({
            message:err.message
        });
    }
    
}


module.exports = authRouter;    
    