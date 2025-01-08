import express, { Router } from "express";
import userController from "../controller/user";
import { userAuth } from "../middleware/user";

const router : Router = express.Router();

router.post("/signup", userController.register);
router.post("/signin", userController.login);
router.get("/checkAuth", userAuth, userController.checkAuth);
router.put("/avatar", userAuth, userController.userAvatar);

export default router;