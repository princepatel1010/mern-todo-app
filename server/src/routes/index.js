import express from "express";
import userRoutes from "./userRoutes.js";
import todoRoutes from "./todoRoutes.js";

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/todos", todoRoutes);

export default router;
