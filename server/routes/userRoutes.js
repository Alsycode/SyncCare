import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { validateRegister, validateLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", validateRegister, registerUser);

// Login a user
router.post("/admin/login", validateLogin, loginUser);

export default router;