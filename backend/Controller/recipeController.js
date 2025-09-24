import Recipe from "../Models/recipeModel.js";
import ApiError from "../utils/Apierror.js";


const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time, coverImage } = req.body;

        if (
            !title ||
            !ingredients ||
            !instructions ||
            !time 
            
        ) {
            throw new ApiError(400, "All fields are required");
        }
        const newRecipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage,
        });
        return res.status(201).json({
            message: "Recipe created successfully",
            recipe: newRecipe,
            success: true,
        });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};
const getRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        return res.status(200).json({
            message: "Recipes fetched successfully",
            recipes,
            success: true,
        });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};
const getRecipebyId = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        return res.status(200).json({
            message: "Recipe fetched successfully",
            recipe,
            success: true,
        });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Recipe deleted successfully",
            success: true,
        });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.status(200).json({
            message: "Recipe updated successfully",
            recipe,
            success: true,
        });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

export { createRecipe,deleteRecipe, getRecipe, getRecipebyId, updateRecipe };