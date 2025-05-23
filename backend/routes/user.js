const {Router} = require("express");
const userRouter = Router();
const {UserModel, CourseModel} = require("../db")
const {PurchasesModel} = require("../db")
const jwt = require("jsonwebtoken")
const { user_auth , JWT_USERSECRET}= require("../auth");
const bcrypt = require("bcrypt");
const {z} =require("zod");

userRouter.post("/signup",async function(req,res){
    const requiredBody = z.object({
        email:z.string().min(3).max(50).email(),
        Password:z.string().min(3).max(50).regex(/[A-Z]/)
        .regex(/[a-z]/).regex(/[^A-Za-z0-9]/),
        FirstName: z.string().min(3).max(50),
        LastName:z.string().min(3).max(50)
    })
    const parsedSuccess = requiredBody.safeParse(req.body);
    if(!parsedSuccess.success){
        // const error = parsedSuccess.error.issues[0].path[0]+" "+ parsedSuccess.error.issues[0].message
        res.json({message:"incorrect input",error:parsedSuccess.error,success:false});
        return;
        
    }
    const {email,Password,FirstName,LastName} = req.body;

    const hashedPassword = await bcrypt.hash(Password , 10);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        res.json({ message: "User already exists", success: false });
        return;
    }
   await UserModel.create({ email:email,
        Password:hashedPassword,
        FirstName:FirstName,
        LastName:LastName
    })
    res.json({message:"Signed up successfully !!",success:true});
});

userRouter.post("/login", async function(req,res){
    const email = req.body.email;
    const Password = req.body.Password;
    const user = await UserModel.findOne({email:email})
    if(user){
        const PassMatch = await bcrypt.compare(Password,user.Password);
        console.log(PassMatch)
        if(PassMatch){
        const token = jwt.sign({id:user._id},JWT_USERSECRET);
        res.json({message:"logged in.",token:token,name:user.FirstName,success:true});
    }else{
        res.json({message:"incorrect password",success:false})
    }
    }else{res.json({message:"user not found",success:false})}
    
});
userRouter.get("/purchases",user_auth, async function(req,res){
      const userId = req.userId;
      const courses = await PurchasesModel.find({userId});
    const course_content = await Promise.all(
      courses.map(async (u) => {
        return await CourseModel.findOne({ _id: u.courseId });
      })
    );
    res.json({courses:course_content});
      
});



module.exports = { userRouter:userRouter}