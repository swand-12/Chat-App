import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generatetoken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup= async (req,res)=>{
    const{fullname,email,password}=req.body;
   try {
    if(!fullname || !email || !password){
        return res.status(400).json({message:"All Fields are Required"});
    }
    if(password.lenght<6){
      return  res.status(400).json({message:"Password Must be Atleast 6 character Long"});
    }
    const user=await User.findOne({email});
    if(user){
       return  res.status(400).json({message:"User with the email Already Exists"});
    }
    const salt =await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);

    const newuser = new User({
        fullname,
        email,
        password:hashedpassword
    })
    if(newuser){
            //new jwt token to be generated here //
            generatetoken(newuser._id,res);
            await newuser.save();
          return  res.status(200).json({
                    _id:newuser._id,
                    fullname:newuser.fullname,
                    email:newuser.email,
                    profilepic:newuser.profilepic
            })
    }
    else{
     return   res.status(400).json({message:"Invalid User Data"});
    }

   } catch (error) {
    console.log("Error in signup Controller");
    return res.status(500).json({message:"Internal Server Error"});
   }
};
export const login=async (req,res)=>{
   const{email,password}=req.body;
   try {
    if(!email || !password){
      return  res.status(400).json({message:"All Fields are Required"});  
    }
    const user = await User.findOne({email});
    if(!user){
       return  res.status(400).json({message:"Invalid Credentials"});
    }
   
    const ispassCorrect=await bcrypt.compare(password,user.password);
       if(!ispassCorrect){
      return  res.status(400).json({message:"Invalid Credentials"});
       }
       generatetoken(user._id,res);
      return res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        profilepic:user.profilePic
       
})

        
    
   } catch (error) {
        console.log("Problem in Login Control"+error.message);
      return   res.status(500).json({message:"Server Error"});
   }
};
export const logout=(req,res)=>{
    try {
        res.cookie("token","",{maxAge:0});
        res.status(200).json({message:"Logged out succesfully"});
        
        
    } catch (error) {
        console.log("Problem in Logout Control"+error.message);
        res.status(500).json({message:"Server Error"});
    }
 
};
export const updateProfile = async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile Pic required"});
        }
        const uploadResponse =await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

    } catch (error) {
        console.log("Problem in update user Control"+error.message);
        res.status(500).json({message:"Server Error"});
    }

}

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };