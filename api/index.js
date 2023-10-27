import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion }  from 'mongodb';

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
console.log(process.env.MONGO)

app.listen(3000, ()=>{
    console.log("server is started");
})