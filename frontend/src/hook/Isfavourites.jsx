import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, addFavourite, removeFavourite } from "../redux/auth.js";

export const useFavouriteRecipe = () => {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  const toggleFavourite = useCallback(
    async (recipe) => {
      if (!recipe || !recipe._id) return;

      // Compute safeFavourites inside the callback
      const safeFavourites = Array.isArray(favourites) ? favourites : [];
      const isFav = safeFavourites.find((r) => r._id === recipe._id);

      dispatch(setLoading(true));
      setError(null);

      try {
        const res = await axios.put(
          `http://localhost:5500/api/recipe/${recipe._id}/favorite`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (res.data?.success) {
          if (isFav) {
            dispatch(removeFavourite(recipe));
          } else {
            dispatch(addFavourite(res.data.recipe));
          }
        } else {
          setError(res.data?.message || "Failed to toggle favourite");
        }
      } catch (err) {
        console.error("Error toggling favourite:", err);
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, favourites] // only include favourites and dispatch in deps
  );

  return { toggleFavourite, error };
};
