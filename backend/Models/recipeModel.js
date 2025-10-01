import mongoose,{Schema} from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
   
    ingredients: {
        type: [String],
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
        default: "https://imgs.search.brave.com/dm7r_HQftAEriYHlI3eCuLNcxt3wsiDlIaGSi8N0IdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NTEyODYzMi9waG90/by9tb3N0LWNvbW1v/bi1hbGxlcmd5LWZv/b2Qtc2hvdC1mcm9t/LWFib3ZlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12YmJr/TlZScEh2LVg0c0lL/SnphSzF5WVJDbXpF/LUNnbnVXRTk4d2xO/X3ZVPQ"
       
    },
   
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
   

},{timestamps:true});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe