const express=require('express');

const mongoose=require('mongoose');
const feedbackModel=require('./models/feedbackmodel')
const adminModel=require("./models/adminmodel");

const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors({
    origin: '*'
  }));


mongoose.connect("mongodb+srv://satheesh:portfolio@contactform.h51kp.mongodb.net/?retryWrites=true&w=majority&appName=ContactForm")
// console.log(process.env.DB_URI)
// mongoose.connect(process.env.DB_URI)
.then(()=>console.log('DB connected'))
.catch(()=>{console.log("Error in db connection")})

//feedback post
app.post("/contact",(req,res)=>{
    // const{fullname,email,mobileno,subject,message}=req.body;
    const details=req.body;
    feedbackModel.create(details)
    .then((result)=>{res.json(result)})
    .catch((err)=>res.json(err))
})
// admin record insertion purpose
// app.post('/admin',(req,res)=>{
//   const {aname,bpass}=req.body;
//   adminModel.create({aname,bpass})
//   .then((result)=>{res.json(result)})
//   .catch((err)=>{res.json(err)})
// })

//for admin login checking

app.post('/admin',(req,res)=>{
  const{aname,bpass} =req.body;
  adminModel.findOne({aname:aname})
  .then(result =>{
      if(result){
          if(result.bpass === bpass)
          {
              res.json("Success");
          }
          else{
              res.json("password incorrect")
          }
      }
      else{
          res.json("No record found")
      }
  })

})

app.get('/admin/feedback',(req,res)=>{
  feedbackModel.find()
  
  .then(visitorsres=>res.json(visitorsres))
  .catch(err=>res.json(err))
})

app.use((req,res,next)=>{res.status(404).send('<h1>404 Page not found</h1>')})

app.listen(3000,()=>console.log("Running on port 3000"));