const {Router} =require("express");
const courseRouter = Router();
const {PurchasesModel,CourseModel} = require("../db");
const { user_auth , JWT_USERSECRET}= require("../auth");


courseRouter.get("/preview",async function(req,res){
    const courses = await CourseModel.find({});
    res.json({courses});
    
});
courseRouter.post("/purchase",user_auth,async function(req,res){
 const courseId = req.body.courseId;
      const userId = req.userId;
      console.log(userId)
      await PurchasesModel.create({
        courseId:courseId,
        userId:userId
      })
      res.json({message:"purchased successfully !"})
});

module.exports ={courseRouter:courseRouter}
