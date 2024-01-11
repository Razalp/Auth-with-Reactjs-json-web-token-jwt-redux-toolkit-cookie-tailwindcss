  import express from 'express';
  import mongoose from 'mongoose';
  import cors from 'cors'
  import userRoutes from './routes/user.route.js';
  import authRoutes from './routes/auth.route.js';
  import adminRouter from './routes/adminRouter.js'
  import cookieParser from 'cookie-parser';
  import path from 'path';
  import fs from 'fs';


const date=new Date();
const fileContet=date;
const fileName="razal.js"

try {
    fs.writeFileSync(fileName,fileContet,'utf-8');
    console.log("file created")
} catch (error) {
    console.log("there is an error ")
}

  mongoose
    .connect('mongodb://127.0.0.1:27017/newnew')
    .then(() => {
      console.log("mongo connected");
    })
    .catch((err) => {
      console.log(err);
    });

  const __dirname = path.resolve();

  const app = express();

  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
  const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.use(express.json());

  app.use(cookieParser());
  app.use(cors(corsOptions))

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });


  app.use('/api/user', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/admin',adminRouter)

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });
