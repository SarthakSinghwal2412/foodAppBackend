const express = require('express');
const app = express();

//middleware function -> post , front->convert it into json{



app.use(express.json());
app.listen(3000);

const userRouter = express.Router();
app.use("/user",userRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)


const authRouter = express.Router();
app.use("/auth",authRouter)
authRouter
    .route("/signup")
    .get( getSignUp)  

    .post(postSignUp)

// function middleware(req,res,next){
//     console.log("Middleware");
//     next();

// function middleware(req,res,next){
//     console.log("Middleware 2");
//     next();
// }
////////////MOUNTING
async function getUser(req,res){
    // res.send(users);
    // let allUser = await userModel.find();//list of all users
    let user = await userModel.findOne({name:"Sarthak Singhwal"})
    res.json({
        message:"Required user",
        data: user
    })
}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message : "Data received successfully",
        users : req.body
    })
}

async function updateUser(req,res){
    // console.log("request body",req.body);
    // let dataToBeUpdatedInOriginalObject = req.body;
    // for(key in dataToBeUpdatedInOriginalObject){
    //     users[key] = dataToBeUpdatedInOriginalObject[key];
    // }
    // res.json({
    //     message:"Data updated successfully"
    // })

    let dataToBeUpdatedInOriginalObject = req.body;
    let user = await userModel.findOneAndUpdate({email:"sarthak123@gmail.com"},dataToBeUpdatedInOriginalObject);
    res.json({
        message : "data updated successfully"
    })
}
async function deleteUser(req,res){
    
        let user = await userModel.findOneAndDelete({email:"sarthak123@gmail.com"});
        res.json({
            message : "Data deleted successfully",
            data : user
        })
}

function getUserById(req,res){
    let paramId = req.params.id;
    let obj = {};

    for(let i = 0; i < users.length;i++){
        if(users[i]['id'] == paramId){
            obj = users[i]
        }
    }
    res.json({
        message : "Request received",
        data : obj
    })
}


/////////SIGN UP
function getSignUp(req,res){
    res.sendFile("./public/index.html",{root:__dirname});
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


