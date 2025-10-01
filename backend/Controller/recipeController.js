import Recipe from "../Models/recipeModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";




const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;
        const userId = req.user._id;


        if (!title || !ingredients || !instructions || !time) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let coverImage = null;

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto",
            });
            coverImage = cloudResponse.secure_url;
        }

        const newRecipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: coverImage,
            user: userId
        });

        return res.status(201).json({
            message: "Recipe created successfully",
            recipe: newRecipe,
            success: true,
        });

    } catch (error) {
        console.error("Recipe creation error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
const getRecipe = async (req, res) => {
    const userId = req.params.userId;


    try {
        const recipes = await Recipe.find({ user: userId })
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
        const { title, ingredients, instructions, time } = req.body;

        let coverImage = null;


        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto",
            });
            coverImage = cloudResponse.secure_url;
        }


        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
                success: false,
            });
        }


        if (title) recipe.title = title;
        if (ingredients) recipe.ingredients = ingredients;
        if (instructions) recipe.instructions = instructions;
        if (time) recipe.time = time;
        if (coverImage) recipe.coverImage = coverImage;

        await recipe.save();

        return res.status(200).json({
            message: "Recipe updated successfully",
            recipe,
            success: true,
        });
    } catch (error) {
        console.error("Update recipe error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};





export { createRecipe, deleteRecipe, getRecipe, getRecipebyId, updateRecipe };