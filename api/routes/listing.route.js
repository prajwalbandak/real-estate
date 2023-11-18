import express from 'express';
import { createListing, imageUpload , getImages, getUserListings} from '../controllers/listing.controller.js';
import { verifyToken } from "../utils/VerifyUser.js";
import { upload } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/listing/create',createListing);
router.get('/listings/:id',  verifyToken, getUserListings);
router.post('/imageUpload', upload.array('photos', 6), imageUpload)
router.get('/images', getImages);


export default router;