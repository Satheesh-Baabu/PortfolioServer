const mongoose=require('mongoose');

const feedbackSchema=mongoose.Schema({
    fullname:String,
    email:String,
    mobileno:String,
    subject:String,
    message:String,
});

const feedbackModel=mongoose.model("feedbacktable",feedbackSchema);
module.exports=feedbackModel;
