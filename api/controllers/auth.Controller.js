import User from "../models/User.model.js"
import bcrypt from 'bcryptjs'
import errorHandler from "../utils/error.js";
import Jwt from "jsonwebtoken";


export const signUp = async(req, res,next) =>{
    try{
        console.log(req.body);
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({username, email, password: hashedPassword });
        
        await newUser.save();
        res.json({ message: 'User registered successfully' });

    }catch(error){
        //errorHandler(500, "internal server error");
       next(error);
    }
  
}

export const signIn = async(req, res, next) =>{
    console.log(req.body);
    const { email, password} = req.body;
    const validUser = await User.findOne({email});

    if(!validUser) return next(errorHandler(404,"User not found"));

    const validPassword = await bcrypt.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401,"Wrong credential"));
    const token = Jwt.sign({id : validUser._id}, process.env.SECRET);
    console.log(validUser);
    const { password : pass, ...rest} = validUser._doc; 
    console.log(rest);
    res.cookie("access token", token, {httponly:true}).status(200).json({rest});


}


