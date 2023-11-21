import express from 'express';
import { createListing, imageUpload , getImages, getUserListings,getListingforEdit, deleteUserListings, 
    
    getUser,
    updateUserListing} from '../controllers/listing.controller.js';
import { verifyToken } from "../utils/VerifyUser.js";
import { upload } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/listing/create',createListing);
router.get('/listings/:id',  verifyToken, getUserListings); // this API, will show according to profile section in the "SHOW LISTING" tab
router.delete('/deleteListing/:id',verifyToken,deleteUserListings);
router.post('/updateListing/:id', verifyToken, updateUserListing);

router.get('/getListingForUser/:id', getListingforEdit) //This API, when you'r clicked on the edit section in "SHOW LISTING" tab.

router.get('/:id', verifyToken, getUser)  // get the user for particular listing.


router.post('/imageUpload', upload.array('photos', 6), imageUpload)
router.get('/images', getImages);


export default router;