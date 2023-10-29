import express from 'express';
import { signUp, signIn , goggle} from '../controllers/auth.Controller.js';


const router = express.Router();

router.post('/signUp',signUp);
router.post('/signIn',signIn);
router.post('/goggle',goggle)


export default router;