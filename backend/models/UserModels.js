import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        Unique:true,
    },
    email:{
        type:String,
        required:true,
        Unique:true,
    },
    password:{
        type:String,
        required:true,

    }
},{timestamps:true})


const User=mongoose.model('User',userSchema)
export default User