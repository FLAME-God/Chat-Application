import express, { Router } from "express";
import userRoute from "./user";
import friendRoutes from "./friend";

const router: Router = express.Router();

router.use("/user", userRoute);
router.use("/friend", friendRoutes);

export default router;