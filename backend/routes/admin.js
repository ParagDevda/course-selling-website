const {Router} = require("express");
const adminRouter = Router();
const {AdminModel,CourseModel} = require("../db")
const {PurchasesModel} = require("../db")
const jwt = require("jsonwebtoken")
const {admin_auth,JWT_ADMINSECRET}= require("../auth");
const bcrypt = require("bcrypt");
const {z} =require("zod");

adminRouter.post("/signup",async function(req,res){
   const requiredBody = z.object({
        email:z.string().min(3).max(50).email(),
        Password:z.string().min(3).max(50).regex(/[A-Z]/)
        .regex(/[a-z]/).regex(/[^A-Za-z0-9]/),
        FirstName: z.string().min(3).max(50),
        LastName:z.string().min(3).max(50)
    })
    const parsedSuccess = requiredBody.safeParse(req.body);
    if(!parsedSuccess.success){
        res.json({message:"incorrect input",error:parsedSuccess.error.message})
    }
    const email = req.body.email;
    const Password = req.body.Password;
    const FirstName= req.body.FirstName;
    const LastName=req.body.LastName;

    const hashedPassword = await bcrypt.hash(Password , 10);

   await AdminModel.create({ email:email,
        Password:hashedPassword,
        FirstName:FirstName,
        LastName:LastName
    })
    res.json({message:"Signed up successfully !!"});
});

adminRouter.post("/login",async function(req,res){
    const email = req.body.email;
    const Password = req.body.Password;
    const user = await AdminModel.findOne({email:email})
    if(user){
        const PassMatch = await bcrypt.compare(Password,user.Password);
        if(PassMatch){
        const token = jwt.sign({id:user._id},JWT_ADMINSECRET);
        res.json({message:"logged in.",token:token});
    }else{
        res.json({message:"incorrect password"})
    }
    }else{res.json({message:"user not found"})}
});
adminRouter.post("/course",admin_auth,async function(req,res){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const adminId = req.id;

   const course = await CourseModel.create({
        title:title,
        description:description,
        price:price,
        imgUrl:imgUrl,
        creatorId:adminId
    })
    res.json({
        message:"courser created",
        courseId:course._id
    })
})
adminRouter.put("/course",admin_auth,async function(req,res){
    const {title,description,price,imgUrl,courseId}=req.body;
    const adminId = req.id;
    const course = CourseModel.findOne({_id:courseId});
    if(!course){
        return res.json({message:"course not found"});
    }
    if(adminId!==course.creatorId){
        return res.json({message:"this course does not belong to you you can;t update this course!!"})
    }
    await CourseModel.updateOne({
        _id:courseId,
        creatorId:adminId},{
        $set:{title,description,price,imgUrl}
    })
    res.json({message:"updated",courseId:courseId});
});
adminRouter.get("/courses",admin_auth,async function(req,res){
    const creatorId = req.id;
    const courses = await CourseModel.find({creatorId:id})
    res.json({
        courses:courses
    })
})

adminRouter.delete("/deleteCourse",admin_auth,async function(req,res){
    const courseId = req.body.courseId;
    const creatorId = req.id;
    console.log(courseId)
    const deletedcourse = await CourseModel.findOne({_id:courseId})
    if(deletedcourse){
        if(creatorId==deletedcourse.creatorId){
         await CourseModel.deleteOne({_id:deletedcourse._id});
         res.json({message:"deleted",deletedcourse :deletedcourse})}
         else{
            res.json({message:"you are not authorized!!"})
         }
    }else{ res.json({message:"course not found!!"})}
});



module.exports ={adminRouter:adminRouter}