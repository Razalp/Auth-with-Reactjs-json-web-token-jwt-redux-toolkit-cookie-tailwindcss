import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import router from './Router/UserRouter'
import userRoutes from './Router/UserRouter.js';
dotenv.config();


const app=express()
mongoose.connect('mongodb+srv://razalp0012300:CsHcj8rrlJ28wToL@cluster0.pikhe2s.mongodb.net/').then(()=>{
    console.log('mongoconnected')
}).catch(()=>{
    console.log('not connected')
})



app.listen(3000,()=>{
    console.log("server runing on 3000" )
})
app.use('/', userRoutes);