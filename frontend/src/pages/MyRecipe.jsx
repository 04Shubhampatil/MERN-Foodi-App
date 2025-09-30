import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../pages/RecipeCard.jsx";
import { setLoading } from "../redux/auth.js";
import Isdelete from '../hook/Isdelete.jsx'

function MyRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [recipes, setRecipes] = React.useState([]);


  useEffect(() => {
 
    if (!user || !user._id) {
      navigate("/login");
      return;
    }


    const fetchRecipes = async () => {

      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          `http://localhost:5500/api/recipe/user/${user._id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        localStorage.setItem(
          "userData",
          JSON.stringify(res.data.recipes || [])
        );
        if (res.data.success) {
          setRecipes(res.data.recipes || []);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      } finally {
        dispatch(setLoading(false));
      }
    };

    

    fetchRecipes();

   
  }, [user, dispatch, navigate]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">My Recipes</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-600">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe}  onDelete={(id) =>
        setRecipes((prev) => prev.filter((r) => r._id !== id))
      } />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecipe;
