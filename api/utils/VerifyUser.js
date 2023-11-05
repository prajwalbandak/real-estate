import errorHandler from './error.js';
import jwt  from 'jsonwebtoken';


export const verifyToken = (req, res, next) =>{

    const token = req.cookie.access_token;
    console.log("token " + token);

    if(!token) res.send(errorHandler(401, "Unauthorized"));

   
        jwt.verify(token, process.env.SECRET, (err,user) =>{
            if(err) res.send(errorHandler(401, "forbidden"));
            req.user = user;
            next();
        })


}