import express, { Router } from "express";
import userRoute from "./user";
import friendRoutes from "./friend";
import messageRoutes from "./message";

const router: Router = express.Router();

router.use("/auth", userRoute);
router.use("/friend", friendRoutes);
router.use("/message", messageRoutes);

export default router;