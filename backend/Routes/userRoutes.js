import express from "express";
import { registerUser, logIn, logout } from "../Controllers/authController.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", logIn);

// Logout user
router.get("/logout", logout);

export default router;
