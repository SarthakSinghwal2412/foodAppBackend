const userModel = require("../models/userModel");
module.exports.getUser = async function getUser(req,res){
    // res.send(users);
    // let allUser = await userModel.find();//list of all users
    let id = req.params.id;
    let user = await userModel.findById(id);
    if(user){
        return res.json(user);
    }else{
        res.json({
            message:"user not found",
        })
    }
    
}


module.exports.updateUser = async function updateUser(req,res){
    
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated= req.body;
    try{
        if(user){
            const keys = [] ;
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i = 0; i < keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message:"data updated successfully",
                data:user
            })
        }else{
            res.json({
                message : "data not found",
                data:user
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
};
module.exports.deleteUser = async function deleteUser(req,res){
    
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        try{
            if(!user){
                res.json({
                    message:"user not found"
                })
            }
            res.json({
                message : "data has been deleted",
                data : user
            });
        }
        catch(err){
            res.json({
                message:err.message
            })
        }
    
};

module.exports.getAllUsers = async function getAllUsers(req,res){
    
    let users = await userModel.find();
    try{
        if(users){
            res.json({
                message : "user retrived",
                data :users
            })
        }
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
};
