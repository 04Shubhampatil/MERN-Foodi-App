import express from "express";

import { createRecipe, deleteRecipe, getRecipe, getRecipebyId, updateRecipe,isFavorite } from "../Controller/recipeController.js";
import  isAuthenticated  from "../Middleware/isAuthentication.js";
import { singleUpload } from "../Middleware/multter.js";



const router = express.Router();


// Register user
router.get("/user/:userId", isAuthenticated, getRecipe);
router.get("/:id", isAuthenticated, getRecipebyId);
router.post("/create", isAuthenticated, singleUpload, createRecipe);
router.post("/:id",isAuthenticated,singleUpload, updateRecipe);
router.delete("/:id",isAuthenticated, deleteRecipe);
router.get("/:id", isAuthenticated, isFavorite);



export default router;
