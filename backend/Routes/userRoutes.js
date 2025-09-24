import express from "express";
import { registerUser, LogIn, logout, getUser } from "../Controller/userControler.js";
import  isAuthenticated  from "../Middleware/isAuthentication.js";


const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", LogIn);

// Logout user
router.get("/logout",isAuthenticated, logout);

// Get user
router.get("/:id",isAuthenticated, getUser);


export default router;
