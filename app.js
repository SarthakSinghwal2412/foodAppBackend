const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

//middleware function -> post , front->convert it into json{
app.use(express.json());
app.listen(3000);

const userRouter = require('./Router/userRouter');
const authRouter = require('./Router/authRouter');

app.use("/user",userRouter);
app.use("/auth",authRouter)





