import express, {Router} from "express";
import { userAuth } from "../middleware/user";
import messageCtlr from "../controller/message";

const router: Router = express.Router();

router.post("/:id", userAuth,messageCtlr.sendMessage);
router.get("/:id", userAuth, messageCtlr.getAllMessage);

export default router;