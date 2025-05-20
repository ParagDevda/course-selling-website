const mongoose = require("mongoose");
const { number } = require("zod");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    email: String,
    Password:String,
    FirstName:String,
    LastName:String
});

const admin = new Schema({
    email: String,
    Password:String,
    FirstName:String,
    LastName:String
});
const course = new Schema({
     title:String,
     description:String,
     price:Number,
     imgUrl:String,
     creatorId:ObjectId

});

const purchases = new Schema({
     courseId:ObjectId,
     userId:ObjectId
});

const UserModel = mongoose.model("User",user);
const AdminModel = mongoose.model("Admin",admin);
const CourseModel = mongoose.model("Course",course);
const PurchasesModel = mongoose.model("purchases",purchases);

module.exports ={UserModel,AdminModel,CourseModel,PurchasesModel};