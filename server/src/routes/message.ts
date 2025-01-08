import express, {Router} from "express";
import { userAuth } from "../middleware/user";
import messageCtlr from "../controller/message";


const router: Router = express.Router();

router.post("/createmsg/:id", userAuth,messageCtlr.sendMessage);
router.get("/getmessage/:id", userAuth, messageCtlr.getAllMessage);
router.get("/users",userAuth, messageCtlr.getAllUsersforMsg);

export default router;