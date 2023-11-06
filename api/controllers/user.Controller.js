import User from "../models/User.model.js";
import errorHandler from "../utils/error.js"
import bcrypt from 'bcryptjs'



export const updateUser = (req, res, next) =>{

    if(req.user.id != req.param.id) {
        return next(errorHandler("401", "You have have to update your own account"));
    }
    try{
        if(req.body.password){
            const hashPassword = bcrypt.hashSync(req.body.password, 10);

        }
        const updatedUser = User.findByIdAndUpdate(
            req.param.id,
            {
                $set :{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    avatar: req.body.avatar,
                },
            },
            {new:true}
        )
        const { password:pass, ...rest} = updatedUser._doc;
        res.status(201).json({
            rest
        })

    }catch(error){
        next(error);
    }


}

