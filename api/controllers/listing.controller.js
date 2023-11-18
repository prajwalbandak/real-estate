import Listing from "../models/Listing.model.js";
import multer from 'multer';
import Mongoose  from "mongoose";
import Images from "../models/image.model.js";
import fs from 'fs';
import path from 'path';
import errorHandler from "../utils/error.js";

export const createListing = async(req, res, next) =>{
    console.log("request data" + JSON.stringify(req.body));
    try{
        const listing = await Listing.create(req.body);
        return res.status(200).json({listing});


    }catch(error){
        next(error);
    }
    
}

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, 'uploads');
    },
    filename:(req, file, cb) =>{
        cb(null, file.originalname, )
    }
})

export const upload = multer({ storage: storage });

export const imageUpload = async (req, res, next) => {
  try {
      const files = req.files;
      console.log("files", files);
      console.log(Array.isArray(files));
      if (!Array.isArray(files)) {
          // If only one file is uploaded, it won't be an array
          console.log("file path", path.join('uploads', files.filename));

          const fileData = fs.readFileSync(path.join('uploads', files.filename));
          const imageObject = {
              data: fileData,
              contentType: files.mimetype,
              name: files.originalname,
          };

          const saveImage = new Images({
              name: req.body.name,
              images: [imageObject], // Wrap the single file in an array
          });

          const result = await saveImage.save();
          res.status(201).json({ message: "Image uploaded successfully" });
      } else {
          // If multiple files are uploaded, process them as before
          console.log("files length", files.length);

          const imageArray = files.map((file) => {
              const filePath = path.join('uploads', file.filename);
              const fileData = fs.readFileSync(filePath);

              return {
                  data: fileData,
                  contentType: file.mimetype,
                  name: file.originalname,
              };
          });

          const saveImage = new Images({
              name: req.body.name,
              images: imageArray,
          });

          const result = await saveImage.save();
          res.status(201).json({ message: "Images uploaded successfully" });
      }
  } catch (error) {
      next(error);
  }
};


  export const getImages = async(req, res, next) =>{
    try{
      const allData = await Images.find();
      console.log("allData" + allData);
      res.status(200).json(allData);
    }catch(error){
        next(error);
    }
    

  }

  export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, 'You can only view your own listings!'));
    }
  };


  export const deleteUserListings = async(req, res, next) =>{
    const listing = await Listing.findById(req.params.id);
    console.log("listing" + listing);
   // console.log("listing ref" + listing.userRef.toString());
    if(!Listing){
      return next(errorHandler(401, "Listing not found"));
  }
  // if(req.params.id !== listing.userRef){
  //   return next(errorHandler(401,"you can delete your own listings"))
  // }
    try{
      const deletListing = await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json("You have deleted the listings")




    }catch(error){
      next(error);
    }
  }