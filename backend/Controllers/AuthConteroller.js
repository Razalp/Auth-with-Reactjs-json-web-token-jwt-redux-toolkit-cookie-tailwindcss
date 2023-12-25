import User from "../models/UserModels.js"
import bcrypt from "bcrypt";
import { errorHandler } from "../utiles/error.js";
import jwt from "jsonwebtoken";
export const signup =async (req,res,next)=>{
    
    try{
    const { username , email, password}=req.body
    const hashPassword=bcrypt.hashSync(password,10);
    const newUser=new User({ username , email , password:hashPassword})
    await newUser.save()
    res.status(201).json({message:"Usercreated succesfully"})
    }catch(error){
        next(errorHandler(300,'somthing went error'))
    }
}

export const signin =async (req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({email:email});
        if(!validUser) return next(errorHandler(401,'invalid user'))
        
        const validPassword=bcrypt.compareSync(password,validUser.password)
        if(!validUser) return next(errorHandler(401,'invalid password'))
        const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:hashPassword,...rest}=validUser._doc
        const expireDate=new Date(Date.now() + 3600000)// 1 hour
        res
        .cookie('access_token',token,{httpOnly:true , expire:expireDate})
        .status(200)
        .json(rest)//only essantial things only not see password
    
    }catch(error){
        next(errorHandler(300,'somthing went error'))
    }
}