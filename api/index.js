import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion }  from 'mongodb';
//import userRouter from "../routes/user.route.js";
import userRouter from "./routes/user.route.js"; 
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

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

app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);

app.use((error, req, res, next)  => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({
    success : false,
    statusCode,
    message
  })
})