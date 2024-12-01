const mongoose =require('mongoose')

const adminSchema=mongoose.Schema({
    aname:String,
    bpass:String,
});

const adminmodel=mongoose.model("admin",adminSchema);

module.exports=adminmodel;