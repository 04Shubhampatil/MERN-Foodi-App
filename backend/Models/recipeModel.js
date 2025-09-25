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
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
       
    },

},{timestamps:true});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe