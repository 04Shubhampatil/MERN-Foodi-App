import React from "react";
import toast, { Toaster } from "react-hot-toast";

function MyRecipe() {
  const recipes = [
    {
      id: 1,
      title: "Pasta Primavera",
      description: "A delicious Italian pasta with fresh vegetables.",
      image:
        "https://images.unsplash.com/photo-1604909053089-3b7b3e2f6c72?w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Chocolate Cake",
      description: "Rich and moist chocolate cake with creamy frosting.",
      image:
        "https://images.unsplash.com/photo-1599785209796-bd8e2d1a1f65?w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Avocado Toast",
      description: "Simple, healthy and tasty breakfast option.",
      image:
        "https://images.unsplash.com/photo-1600891963937-95312d1d4a29?w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {recipe.description}
              </p>
              <button
                onClick={() => toast.success(`${recipe.title} saved!`)}
                className="mt-4 bg-yellow-300 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition"
              >
                Save Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default MyRecipe;
