import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function UpdateRecipe() {
  const { id } = useParams(); // recipe ID from URL

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch recipe by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://mern-foodi-app.onrender.com/api/recipe/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const recipe = res.data.recipe;
          setTitle(recipe.title || "");
          setIngredients(recipe.ingredients || "");
          setInstructions(recipe.instructions || "");
          setTime(recipe.time || "");
        }
      } catch (error) {
        toast.error("Failed to fetch recipe!");
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  // ✅ Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("time", time);
      if (coverImage) formData.append("file", coverImage); // ✅ Correct file append

      const { data } = await axios.post(
        `https://mern-foodi-app.onrender.com/api/recipe/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Recipe updated successfully!");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed!");
    }
  };

  if (loading) return <p className="text-center text-lg font-medium">Loading recipe...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Update Recipe
        </h2>

        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <input
          type="text"
          placeholder="Cooking Time (e.g. 30 mins)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])} // ✅ Only single file
          className="w-full text-gray-600"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
}

export default UpdateRecipe;
