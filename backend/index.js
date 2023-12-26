import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors';

// import router from './Router/UserRouter'
import userRoutes from './Router/UserRouter.js';
import AuthRouter from './Router/AuthRouter.js'
dotenv.config();


//mongodb+srv://razalp0012300:CsHcj8rrlJ28wToL@cluster0.pikhe2s.mongodb.net/
const app=express()
mongoose.connect('mongodb://127.0.0.1:27017/authapp').then(()=>{
    console.log('mongoconnected')
}).catch(()=>{
    console.log('not connected')
})

app.use(express.json())
// app.use(cors())
app.listen(3000,()=>{
    console.log("server runing on 3000" )
})
app.use('/api', userRoutes);
app.use('/api/auth', AuthRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });