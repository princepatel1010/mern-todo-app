import express from "express";
import { register, login, getProfile } from "../controllers/userController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { registerSchema, loginSchema } from "../validations/userValidation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", protect, getProfile);

export default router;
