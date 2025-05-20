const {Router} = require("express");
const userRouter = Router();
const {UserModel} = require("../db")
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
        res.json({message:"incorrect input",error:parsedSuccess.error.message})
    }
    const {email,Password,FirstName,LastName} = req.body;

    const hashedPassword = await bcrypt.hash(Password , 10);

   await UserModel.create({ email:email,
        Password:hashedPassword,
        FirstName:FirstName,
        LastName:LastName
    })
    res.json({message:"Signed up successfully !!"});
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
        res.json({message:"logged in.",token:token});
    }else{
        res.json({message:"incorrect password"})
    }
    }else{res.json({message:"user not found"})}
    
});
userRouter.get("/purchases",user_auth, async function(req,res){
      const courseId = req.body.courseId;
      const userId = req.UserId;
      await PurchasesModel.create({
        courseId:courseId,
        userId:userId
      })
      res.json({message:"purchased successfully !"})
});



module.exports = { userRouter:userRouter}