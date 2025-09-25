import Recipe from "../Models/recipeModel.js";

const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time, coverImage } = req.body;

        if (!title || !ingredients || !instructions || !time) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
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
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
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
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getRecipebyId = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Recipe fetched successfully",
            recipe,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Recipe deleted successfully",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Recipe updated successfully",
            recipe,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export { createRecipe, deleteRecipe, getRecipe, getRecipebyId, updateRecipe };