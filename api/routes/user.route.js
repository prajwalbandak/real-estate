import  express  from "express";
import  {updateUser, deleteUser}   from "../controllers/user.Controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);


export default router;

