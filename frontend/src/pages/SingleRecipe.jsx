import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useFavouriteRecipe } from "../hook/Isfavourites.jsx";
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  AccessTime,
  People,
  Whatshot,
  Print,
  Add,
  Lightbulb,
  Restaurant,
  List,
  MenuBook,
  Schedule,
} from "@mui/icons-material";

function SingleRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavourite } = useFavouriteRecipe();
  const { favourites, user } = useSelector((state) => state.auth);
  const [singleRecipe, setSingleRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ingredients");

  const safeFavourites = Array.isArray(favourites) ? favourites : [];
  const isFav = safeFavourites.find((r) => r._id === id);

  useEffect(() => {
    if (id) {
      localStorage.setItem("lastRecipeId", id);
    }
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://mern-foodi-app.onrender.com/api/recipe/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res.data.success) {
          setSingleRecipe(res.data.recipe);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleFavouriteClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (singleRecipe) {
      toggleFavourite(singleRecipe);
    }
  };

  const formatIngredients = (ingredients) => {
    if (Array.isArray(ingredients)) {
      return ingredients;
    }
    if (typeof ingredients === 'string') {
      return ingredients.split(',').map(item => item.trim()).filter(item => item);
    }
    return [];
  };

  const formatInstructions = (instructions) => {
    if (Array.isArray(instructions)) {
      return instructions;
    }
    if (typeof instructions === 'string') {
      return instructions.split('\n').filter(step => step.trim());
    }
    return [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your recipe...</p>
          <p className="text-gray-400 text-sm">Getting everything ready</p>
        </div>
      </div>
    );
  }

  if (!singleRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60">
          <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Restaurant className="text-4xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
          >
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  const ingredientsList = formatIngredients(singleRecipe.ingredients);
  const instructionsList = formatInstructions(singleRecipe.instructions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-6 transition-colors duration-200 group"
        >
          <ArrowBack className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Back to Recipes
        </button>

        {/* Recipe Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 overflow-hidden mb-8">
          <div className="relative">
            <img
              src={singleRecipe.coverImage || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop"}
              alt={singleRecipe.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Favorite Button */}
            <button
              onClick={handleFavouriteClick}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl hover:scale-110 transition-all duration-200"
            >
              {isFav ? (
                <Favorite className="text-2xl text-[#00A63E]" />
              ) : (
                <FavoriteBorder className="text-2xl text-gray-600" />
              )}
            </button>

            {/* Recipe Title and Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-2xl">
                {singleRecipe.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <AccessTime className="text-lg" />
                  <span className="font-semibold">{singleRecipe.time}</span>
                </div>
                {singleRecipe.servings && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <People className="text-lg" />
                    <span className="font-semibold">{singleRecipe.servings} servings</span>
                  </div>
                )}
                {singleRecipe.difficulty && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <Whatshot className="text-lg" />
                    <span className="font-semibold capitalize">{singleRecipe.difficulty}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`py-4 px-2 font-semibold text-lg border-b-2 transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "ingredients"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <List />
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("instructions")}
                className={`py-4 px-2 font-semibold text-lg border-b-2 transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "instructions"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <MenuBook />
                Instructions
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "ingredients" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <List className="text-emerald-600 text-3xl" />
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {ingredientsList.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-200"></span>
                        <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-200">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Nutrition/Notes Section */}
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Lightbulb className="text-emerald-600" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">•</span>
                      Read through all instructions before starting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">•</span>
                      Prep all ingredients before cooking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">•</span>
                      Taste and adjust seasoning as you go
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "instructions" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Restaurant className="text-emerald-600 text-3xl" />
                  Cooking Instructions
                </h3>
                <div className="space-y-6">
                  {instructionsList.map((step, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-200">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

       

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.print()}
            className="px-8 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Print className="w-5 h-5" />
            Print Recipe
          </button>
          
          <button 
            onClick={() => navigate("/create-recipe")}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <Add className="w-5 h-5" />
            Create Similar Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleRecipe;