var express = require('express');
var router = express.Router();
let jwt= require('jsonwebtoken');
const { default: mongoose } = require("mongoose");


require("../models/user");
const user = mongoose.model("user");

let requireToken = require("../models/requireToken");
/* GET users listing. */




router.post("/signup", async (req, res) => {
  let { password, username, email, phone, sexe } = req.body;
  try {
    let User= new user({password,username,email,phone,sexe});
    await User.save();
    let token =jwt.sign({userId:User._id},process.env.ACCES_TOKEN_KEY);
    console.log(token);
    res.send({token});
    console.log("signup posted");
    
  } catch (err) {
    console.log(err);
    console.log("signup failed");
     res.status(401).send("signup failed");
  }
});
router.get("/signin",async (req,res)=>{
 const {username,password} =req.headers;
  let User= await user.findOne({username});
  User ?  User.comparePassword(password).then(()=>{
        let token =jwt.sign({userId:User._id},process.env.ACCES_TOKEN_KEY);
        res.send({token});
     }).catch(()=>res.status(401).send("Password failed")):res.status(401).send("User not found");
     
});
router.route('/:id').get(requireToken,(req, res) =>{
  
  ! req.err ? res.send(`get user by id ${req.params.id} => ${req.user}`):res.status(401).send("Id not found");
  }).patch((req, res) =>{
    res.send(`update user by id ${req.params.id}`);
  });
  router.param("id",async (req,res,next,_id)=>{
  
  let add= await user.findById({_id}).catch(err=>req.err=err);
   req.user=add;
   next(); 
  });
module.exports = router;
