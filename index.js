const express=require('express');

const mongoose=require('mongoose');
const feedbackModel=require('./models/feedbackmodel')

const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));
  app.options('/contact', cors()); 

mongoose.connect("mongodb+srv://satheesh:portfolio@contactform.h51kp.mongodb.net/?retryWrites=true&w=majority&appName=ContactForm")
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

app.use((req,res,next)=>{res.status(404).send('<h1>404 Page not found</h1>')})

app.listen(3000,()=>console.log("Running on port 3000"));