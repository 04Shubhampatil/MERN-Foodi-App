import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../pages/RecipeCard.jsx";
import {
  Favorite,
  Search,
  Add,
  Share,
  Folder,
  TrendingUp,
  Restaurant,
  Explore,
  Login,
} from "@mui/icons-material";

function Favourites() {
  const { favourites, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const safeFavourites = Array.isArray(favourites) ? favourites : [];

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
            <Favorite className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Favourite Recipes
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Your curated collection of beloved recipes. Nourish your passion for cooking!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-gray-700 font-semibold border border-gray-200 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {safeFavourites.length} {safeFavourites.length === 1 ? 'Cherished Recipe' : 'Cherished Recipes'}
            </div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 text-emerald-700 text-sm font-medium">
              👋 Welcome, {user.name || user.email}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {safeFavourites.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
              <Favorite className="w-16 h-16 text-emerald-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Favourites Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              Start growing your garden of favorite recipes! Click the heart icon on any recipe to plant it here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-emerald-200 text-emerald-700 rounded-xl font-medium hover:bg-emerald-50 transition-colors duration-200 flex items-center justify-center gap-2 min-w-[160px]"
              >
                <Search className="w-5 h-5" />
                Browse Recipes
              </button>
              <button 
                onClick={() => navigate("/create-recipe")}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 min-w-[160px]"
              >
                <Add className="w-5 h-5" />
                Create New Recipe
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-lg border border-white/60">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <div className="text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-emerald-600">{safeFavourites.length}</div>
                    <div className="text-sm text-gray-500 mt-1">Total Favourites</div>
                  </div>
                  <div className="hidden lg:block h-12 w-px bg-gray-300"></div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-emerald-600">
                      {safeFavourites.filter(recipe => recipe.time && recipe.time.includes('min')).length}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Quick Recipes</div>
                  </div>
                  <div className="hidden lg:block h-12 w-px bg-gray-300"></div>
                  <div className="text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-emerald-600">
                      {new Set(safeFavourites.map(recipe => recipe.category).filter(Boolean)).size}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Categories</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 min-w-[180px]"
                  >
                    <Explore className="w-5 h-5" />
                    Discover More
                  </button>
                </div>
              </div>
            </div>

            {/* Favourites Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {safeFavourites.map((recipe) => (
                <div key={recipe._id} className="w-full max-w-[320px]">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>

            {/* Growth Section */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                  <div className="absolute top-12 right-8 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute bottom-8 left-12 w-10 h-10 bg-white rounded-full"></div>
                  <div className="absolute bottom-16 right-16 w-4 h-4 bg-white rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Keep Your Collection Growing</h3>
                  <p className="text-emerald-100 mb-6 max-w-2xl mx-auto leading-relaxed">
                    Continue exploring to discover more delicious recipes that deserve a spot in your favorites!
                  </p>
                  <button 
                    onClick={() => navigate("/")}
                    className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto"
                  >
                    <Restaurant className="w-5 h-5" />
                    Explore All Recipes
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/40 hover:transform hover:-translate-y-1 transition-all duration-200">
                <div className="w-14 h-14 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Share className="w-7 h-7 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">Share Your Favorites</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Spread the culinary love with friends and family</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/40 hover:transform hover:-translate-y-1 transition-all duration-200">
                <div className="w-14 h-14 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <Folder className="w-7 h-7 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">Organize</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Create custom collections and categories</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/40 hover:transform hover:-translate-y-1 transition-all duration-200">
                <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">Keep Growing</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Add more amazing recipes to your collection</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favourites;