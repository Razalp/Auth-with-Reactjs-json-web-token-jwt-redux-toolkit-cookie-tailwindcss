import User from "../models/UserModels.js"
import bcrypt from "bcrypt";
import { errorHandler } from "../utiles/error.js";

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