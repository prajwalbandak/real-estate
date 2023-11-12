import Listing from "../models/Listing.model.js";


export const createListing = async(req, res, next) =>{
    console.log("request data" + JSON.stringify(req.body));
    try{
        const listing = await Listing.create(req.body);
        return res.status(200).json({listing});


    }catch(error){
        next(error);
    }
    
}