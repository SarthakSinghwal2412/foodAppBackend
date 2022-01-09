const express = require('express');
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require('../secrets');

// signup user
module.exports.signup = async function signup(req,res){
    try{
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if(user){
            return res.json({
                message :"user registered successfully",
                data:user
            });
        }else{
            return res.json({
                message:"error while signing up",
                data:user
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })

    }
}
// login user 
module.exports.login = async function login(req,res){
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
                            message :"wrong credentials"
                        })
                    }
                }else{
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
module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.include(req.role) == true){
            next();
        }else{
            res.status(401).json({
                message:"operations not allowed"
            })
        }
    }
}
// protext route
module.exports.protectRoute = async function protectRoute(req,res,next){
    
    try{
        let token ;
        if(req.cookies.login){
            token = req.cookies.login;
            let payload = jwt.verify(token,JWT_KEY);
            if(payload){
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
                
            }
            else{
                return res.json({
                    message :"user not verified"
                });
            }
        }
        else{
            return res.json({
                message:"user not verified"
            })
        }
    }
    catch(err){
        return res.send({
            message:err.message
        })
    }
       
}