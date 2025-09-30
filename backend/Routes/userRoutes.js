import express from "express";
import { registerUser, LogIn, logout, getUser } from "../Controller/userControler.js";
import  isAuthenticated  from "../Middleware/isAuthentication.js";
import { singleUpload } from "../Middleware/multter.js";


const router = express.Router();

// Register user
router.post("/register",singleUpload, registerUser);

// Login user
router.post("/login", LogIn);
router.post("/logout",isAuthenticated, logout);
router.get("/:id",isAuthenticated, getUser);


export default router;
