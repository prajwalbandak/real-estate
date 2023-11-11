import User from "../models/User.model.js";
import errorHandler from "../utils/error.js"
import bcrypt from 'bcryptjs'



export const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id) {
        return next(errorHandler("401", "You have to update your own account"));
    }

    try {
        const updateFields = {};

        if (req.body.username) {
            updateFields.username = req.body.username;
        }

        if (req.body.email) {
            updateFields.email = req.body.email;
        }

        if (req.body.password) {
            const hashPassword = bcrypt.hashSync(req.body.password, 10);
            updateFields.password = hashPassword;
        }

        if (req.body.avatar) {
            updateFields.avatar = req.body.avatar;
        }

        console.log("req body", req.body);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // Use req.params.id to get the ID from the URL
            {
                $set: updateFields,
            },
            { new: true }
        );

        //console.log("updatedUser", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async(req, res, next) =>{
    console.log("req data"  + req);
    console.log("req params id", req.params.id);
    console.log("req.user.id " + req.user.id);
    if (req.user.id != req.params.id) {
        return next(errorHandler("401", "You have to update your own account"));
    }

    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User has been deleted"})



    }catch(error){
        next(error);
    }

}
