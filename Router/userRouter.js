const express = require('express');
const userRouter = express.Router();
const{getUser,getAllUsers,updateUser,deleteUser} = require('../controller/userController')
const{signup,login,protectRoute,isAuthorised} = require('../controller/authController')


// user ke options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

// profile page
userRouter.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)

// admin specific func
userRouter.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUsers)

module.exports = userRouter;