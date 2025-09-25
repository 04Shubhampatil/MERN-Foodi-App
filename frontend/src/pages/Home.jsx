import React from "react";
import Button from "@mui/material/Button";
import { ChefHat, Clock, Star, Users } from "lucide-react";

function Home() {
  const features = [
    { icon: <ChefHat className="w-8 h-8" />, title: "Expert Recipes", desc: "Curated by professional chefs" },
    { icon: <Clock className="w-8 h-8" />, title: "Quick & Easy", desc: "30-minute meals available" },
    { icon: <Star className="w-8 h-8" />, title: "Rated & Reviewed", desc: "Community verified recipes" },
    { icon: <Users className="w-8 h-8" />, title: "Join Community", desc: "Share with food lovers" },
  ];

  const popularRecipes = [
    { name: "Pasta Carbonara", time: "25 min", rating: "4.8" },
    { name: "Vegetable Stir Fry", time: "20 min", rating: "4.6" },
    { name: "Chocolate Cake", time: "45 min", rating: "4.9" },
    { name: "Grilled Salmon", time: "30 min", rating: "4.7" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-white overflow-hidden">
        {/* Background Elements */}
      
        
        {/* Floating decorative elements */}
        <div className="absolute left-5% top-20 opacity-10">
          <div className="w-20 h-20 bg-green-300 rounded-full blur-xl"></div>
        </div>
        <div className="absolute right-10% bottom-20 opacity-10">
          <div className="w-32 h-32 bg-yellow-300 rounded-full blur-xl"></div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 z-10 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                Discover Delicious <span className="text-green-600">Recipes</span>
              </h1>
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0">
                Explore a variety of recipes crafted with love and flavor. From quick bites to gourmet meals, bring your cooking journey to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#15803d",
                    "&:hover": { backgroundColor: "#166534" },
                    borderRadius: "12px",
                    padding: "14px 32px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0px 4px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  Share Your Recipe
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#15803d",
                    color: "#15803d",
                    "&:hover": { borderColor: "#166534", backgroundColor: "#f0fdf4" },
                    borderRadius: "12px",
                    padding: "14px 32px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Explore Recipes
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative z-10 flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Delicious Food"
                  className="rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">4.9 Rating</p>
                      <p className="text-sm text-gray-600">By 2k+ Foodies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative w-full -mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#f0fdf4"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Foodi?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best cooking experience with features designed for both beginners and expert chefs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-green-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Popular Recipes
            </h2>
            <p className="text-lg text-gray-600">Try our most loved recipes from the community</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRecipes.map((recipe, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-40 bg-gradient-to-br from-green-100 to-yellow-100 rounded-lg mb-4"></div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{recipe.name}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>⏱️ {recipe.time}</span>
                  <span>⭐ {recipe.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join thousands of food enthusiasts and share your culinary creations.
          </p>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#15803d",
              "&:hover": { backgroundColor: "#f0fdf4" },
              borderRadius: "12px",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;