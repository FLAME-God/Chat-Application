import express, { Router } from "express";
import { userAuth } from "../middleware/user";
import friendCtlr from "../controller/friends";

const router: Router = express.Router();
router.post("/friendrequest/:id", userAuth, friendCtlr.sendFriendReq);
router.post("/friendrequest", userAuth, friendCtlr.acceptFriendReq);
router.put("/friendrequest", userAuth, friendCtlr.rejectFriendReq);
router.get("/friendrequest", userAuth, friendCtlr.getAllFriend);
router.get("/friendrequest", userAuth, friendCtlr.allFriendReq);

export default router;