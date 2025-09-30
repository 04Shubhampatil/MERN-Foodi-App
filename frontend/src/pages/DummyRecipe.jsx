import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowBack,
  AccessTime,
  Whatshot,
  People,
  CalendarToday,
  Print,
  Home,
  List,
  MenuBook,
  Info,
  Restaurant,
  LocalDining,
} from "@mui/icons-material";

function Dummy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleRecipe, setSingleRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ingredients");

  const handleGetId = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5500/api/recipe/${id}`, {
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

  useEffect(() => {
    handleGetId();
  }, [id]);

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
          <p className="text-gray-600 text-lg font-medium">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (!singleRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60 max-w-md w-full mx-4">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Restaurant className="text-3xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to load the requested recipe.</p>
          <button 
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 mx-auto"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const ingredientsList = formatIngredients(singleRecipe.ingredients);
  const instructionsList = formatInstructions(singleRecipe.instructions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors duration-200 group"
          >
            <ArrowBack className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LocalDining className="w-4 h-4" />
            <span>Recipe Details</span>
          </div>
        </div>

        {/* Main Recipe Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
          {/* Recipe Image */}
          <div className="relative">
            <img
              src={singleRecipe.coverImage || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=400&fit=crop"}
              alt={singleRecipe.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Recipe Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-2xl">
                {singleRecipe.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-emerald-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
                  <AccessTime className="w-4 h-4" />
                  {singleRecipe.time}
                </span>
                {singleRecipe.difficulty && (
                  <span className="bg-green-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium capitalize flex items-center gap-1">
                    <Whatshot className="w-4 h-4" />
                    {singleRecipe.difficulty}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "ingredients"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="w-5 h-5" />
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("instructions")}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "instructions"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <MenuBook className="w-5 h-5" />
                Instructions
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "details"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Info className="w-5 h-5" />
                Details
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "ingredients" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <List className="text-emerald-500" />
                  Ingredients List
                </h3>
                <ul className="space-y-3">
                  {ingredientsList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-200"></span>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "instructions" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MenuBook className="text-emerald-500" />
                  Cooking Instructions
                </h3>
                <div className="space-y-4">
                  {instructionsList.map((step, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Info className="text-emerald-500" />
                  Recipe Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <AccessTime className="text-emerald-500 w-5 h-5" />
                      Cooking Time
                    </h4>
                    <p className="text-emerald-600 font-medium">{singleRecipe.time}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Whatshot className="text-green-500 w-5 h-5" />
                      Difficulty Level
                    </h4>
                    <p className="text-green-600 font-medium capitalize">{singleRecipe.difficulty || "Not specified"}</p>
                  </div>
                </div>

                {singleRecipe.servings && (
                  <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <People className="text-teal-500 w-5 h-5" />
                      Servings
                    </h4>
                    <p className="text-teal-600 font-medium">{singleRecipe.servings}</p>
                  </div>
                )}

                {singleRecipe.createdAt && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <CalendarToday className="text-gray-500 w-5 h-5" />
                      Created Date
                    </h4>
                    <p className="text-gray-600">
                      {new Date(singleRecipe.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Print className="w-5 h-5" />
            Print Recipe
          </button>
          
          <button 
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dummy;