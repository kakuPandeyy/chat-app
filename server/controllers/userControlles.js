const User = require('../models/userModels')
const brcypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { json } = require('express');

// register sec

module.exports.register = async (req,res,next)=>{

try {
  const {username,password,email }= req.body;
  
  const usercheck = await User.findOne({username})
 if (usercheck) {
  return res.json({msg:"username is already used",status:false})

 }
 
 const emailcheck = await User.findOne({email})
 if (emailcheck) {
  return res.json({msg:"email is already used",status:false})

 }


const hasedPassword = await brcypt.hash(password,10)
const user = await User.create({
 username,
  email,
  password:hasedPassword,
})
delete user.password;

return res.json({status:true,user})

} catch (error) {
 console.log(error)
 return res.json({msg:"some technical issue try after some time",status:false})
}
  
}


// login section
module.exports.login = async (req,res,next)=>{

  try {
    const {username,password }= req.body;
    
    const user = await User.findOne({username})
   if (!user) {
    return res.json({msg:"Incorrect username",status:false})
   }
  
  
  const isPasswordValid = await brcypt.compare(password,user.password)
if(!isPasswordValid){
  return res.json({msg:"Incorrect password",status:false})

 
}

  delete user.password;
  return res.json({status:true,user})
  } catch (error) {
   console.log(error)
   return res.json({msg:"error",status:false})
  }
    
  }
  module.exports.setAvatar = async (req,res,next)=>{

    try {
      const data =  req.body
      const userData = await User.findByIdAndUpdate(data.id,{
      avatarImage:data.image,
      isAvatarImageSet: true,
      myProfile: data.custom
      })
  
      return ( res.json({userData,setStatus:true}) )
    } catch (ex) {
      next(ex)
    }
  }

  module.exports.getContact = async (req,res,next)=>{
try {
console.log("i am hint");
  const contacts = await User.find({_id:{$ne:req.params.id}})

return res.json({contacts})
} catch (error) {
  next(error)
}

  }
// function compare(a,b){

// }