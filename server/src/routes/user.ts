import express, { Router } from "express";
import userController from "../controller/user";

const router : Router = express.Router();

router.post("/signup", userController.register);
router.post("/signin", userController.login);

export default router;