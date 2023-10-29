import exp from 'constants';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        
        username : {
            type:String,
            required:true,
            
        },
        email: {
            type: String,
            required: true,
           
          },
          password: {
            type: String,
            required: true,
          },
          avatar:{
            type:String,
            default: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
          }
    },
    {timestamps:true}
)
const User = mongoose.model('User',userSchema);

export default User;