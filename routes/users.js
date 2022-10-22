var express = require('express');
var router = express.Router();
let jwt= require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

require("../models/user");
const user = mongoose.model("user");

let requireToken = require("../models/requireToken");
/* GET users listing. */


router.post("/signup", async (req, res) => {
  let { password, nom, prenom, tel, sexe } = req.body;
  try {
    let User= new user({password,nom,prenom,tel,sexe});
   await User.save();
    let token =jwt.sign({userId:User._id},process.env.ACCES_TOKEN_KEY);
    res.send({token});
    console.log(" signup posted");
    
  } catch (err) {
    console.log("signup failed");
     res.send({ msg: "false" });
  }
});
router.get("/signin",async (req,res)=>{
  const {tel,password} =req.body;
  let User= await user.findOne({tel});
  User ?  User.comparePassword(password).then(()=>{
     
        let token =jwt.sign({userId:User._id},process.env.ACCES_TOKEN_KEY);
        res.send({token});
     
     
      }).catch(()=>res.send({msg:"Password failed"})):res.send({msg:"User not found"});
  


});
router.route('/:id').get(requireToken,(req, res) =>{
  
  ! req.err ? res.send(`get user by id ${req.params.id} => ${req.user}`):res.send({"msg":"Id not found"});
  }).patch((req, res) =>{
    res.send(`update user by id ${req.params.id}`);
  });
  router.param("id",async (req,res,next,_id)=>{
  
  let add= await user.findById({_id}).catch(err=>req.err=err);
   req.user=add;
   next(); 
  });
module.exports = router;
