const express = require("express");
const jwt = require("jsonwebtoken")
const mongoose =require("mongoose");
const {userRouter} = require("./routes/user");
const {adminRouter} = require("./routes/admin");
const {courseRouter} = require("./routes/coures");
const path = require("path")
const cors = require("cors")
const app = express();
const {user_auth , JWT_USERSECRET ,admin_auth,JWT_ADMINSECRET}=require("./auth");
const { UserModel } = require("./db");
require('dotenv').config();
app.use(cors());
app.use(express.json());


app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);
app.use(express.static(path.join(__dirname, '../frontend')))
app.get("/",function(req,res){
    console.log("hello")
    console.log(path.join(__dirname, '../frontend/index.html'))
    res.sendFile(path.join(__dirname, '../frontend/index.html'))
return
})
app.get("/main", async function(req,res){
    //   const id = req.userId;
    // const user = await UserModel.findOne({_id:id})
    // console.log(user)
    // if(user){
    //     res.json({name:user.FirstName})
    // }
    res.sendFile(path.join(__dirname,"../frontend/main.html"));
  

})

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
}
main();


