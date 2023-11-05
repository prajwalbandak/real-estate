import  express  from "express";
import  {updateUser}   from "../controllers/user.Controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

router.post("/user/:id", verifyToken, updateUser);


export default router;

