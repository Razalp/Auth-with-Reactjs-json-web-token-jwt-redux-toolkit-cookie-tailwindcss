import User from "../models/UserModels.js"
import bcrypt from "bcrypt";

export const signup =async (req,res)=>{
    
    try{
    const { username , email, password}=req.body
    const hashPassword=bcrypt.hashSync(password,10);
    const newUser=new User({ username , email , password:hashPassword})
    await newUser.save()
    res.status(201).json({message:"Usercreated succesfully"})
    }catch(error){
        res.status(500).json(error.message)
    }
}