import mongoose,{Schema} from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
   
    ingredients: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
       
    },

},{timestamps:true});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe