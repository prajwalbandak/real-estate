import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion }  from 'mongodb';
//import userRouter from "../routes/user.route.js";
import userRouter from "./routes/user.route.js"; 
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import { createListing } from "./controllers/listing.controller.js";
import listRouter from "./routes/listing.route.js"
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO,
       {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    }
  ).then(() => {
    console.log("MongoDB is connected");
  }).catch((error) => {
    console.error("MongoDB connection error: ", error);
  });
  
const app = express();
app.use(express.json());
app.use(cookieParser());
console.log(process.env.MONGO)

app.listen(3000, ()=>{
    console.log("server is started");
})
const __dirname = path.resolve();
app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);
app.use('/api', listRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((error, req, res, next)  => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({
    success : false,
    statusCode,
    message
  })
})