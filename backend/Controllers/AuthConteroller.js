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


export const google = async (req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(user){
            const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
            const {password:hashPassword,...rest}=user._doc;
            const expireDate =new Date(Date.now() + 3600000);//1
            res.cookie('access_token',token,{httpOnly:true,
            expires:expireDate})
            .status(200)
            .json(rest)
        }else{
            const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
          const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
          const newUser = new User({
            username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.photo,
          });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
          const { password: hashedPassword2, ...rest } = newUser._doc;
          const expiryDate = new Date(Date.now() + 3600000); // 1 hour
          res
            .cookie('access_token', token, {
              httpOnly: true,
              expires: expiryDate,
            })
            .status(200)
            .json(rest);
        }
    } catch (error) {
        next(error);
      }
    };
    
