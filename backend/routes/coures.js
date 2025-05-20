const {Router} =require("express");
const courseRouter = Router();


courseRouter.get("/",function(req,res){
    res.json({message:"course selling website"})
});
courseRouter.get("/purchasedCourses",function(req,res){
    res.json({message:"course selling website"})
});

module.exports ={courseRouter:courseRouter}
