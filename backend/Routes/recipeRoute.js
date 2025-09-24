import express from "express";
import { createRecipe, deleteRecipe, getRecipe, getRecipebyId, updateRecipe} from "../Controller/recipeController.js";
import  isAuthenticated  from "../Middleware/isAuthentication.js";


const router = express.Router();

// Register user
router.get("/",isAuthenticated, getRecipe);
router.get("/:id",isAuthenticated, getRecipebyId);
router.post("/",isAuthenticated, createRecipe);
router.put("/:id",isAuthenticated, updateRecipe);
router.delete("/:id",isAuthenticated, deleteRecipe);




export default router;
