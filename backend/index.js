import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import router from './Router/UserRouter'
import userRoutes from './Router/UserRouter.js';
import AuthRouter from './Router/AuthRouter.js'
dotenv.config();


const app=express()
mongoose.connect('mongodb+srv://razalp0012300:CsHcj8rrlJ28wToL@cluster0.pikhe2s.mongodb.net/').then(()=>{
    console.log('mongoconnected')
}).catch(()=>{
    console.log('not connected')
})

app.use(express.json())

app.listen(3000,()=>{
    console.log("server runing on 3000" )
})
app.use('/', userRoutes);
app.use('/auth', AuthRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });