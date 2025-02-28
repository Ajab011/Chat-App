import {generateToken} from "../lib/utils.js"
import User from"../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body
    try{
         //hash password
         if(!fullName || !email || !password){
            return res.status(400).json({message:"All feilds are required"})
         }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
         const user= await User.findOne({email})
         if(user)return res.status (400).json({message:"Emailalready exist"})
          
           console.log("Error section")

            const salt= await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
         // const newUser=new User({
         //     fullName:fullName,
         //     email:email,
         //     password:hashedPassword

         // })
          const newUser=new User({
           fullName,
            email,
            password:hashedPassword

           })
           console.log(newUser)

           if(newUser){
             generateToken(newUser._id,res)
             await newUser.save();
                 res.status(201).json({
                 _id:newUser._id,
                  fullName:newUser.fullName,
                  email:newUser.email,
                   profilepic:newUser.profilePic,
              })

            }
            else{
             res.status(400).json({message:"Invalid user data"})
            }
          console.log("done")
    }
    catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal Server Error"})
       
    }

};
export const login= async(req,res)=>{
    const {email,password}=req.body
  try {
    const user=await User.findOne({email})
    if(!user){
        return res.status (400).json({message:"Invalid credentials"})
    } 

   const isPasswordCorrect= await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status (400).json({message:"Invalid credentials"})
    }

    generateToken(user._id,res);
    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilePic:user.profilePic,
    });
    
  } catch (error) {
    console.log("error in login controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
  }

};
export const logout=(req,res)=>{

   try {
      res.cookie("jwt","",{maxAge:0})
      res.status(200).json ({message:"logged out successfully"})
   } catch (error) {
    console.log("Eroor in logout controller ",error.message);
    res.status(500).json({message:"Internal server error"})
   }

}
