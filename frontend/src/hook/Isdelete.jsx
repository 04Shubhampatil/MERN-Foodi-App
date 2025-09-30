import axios from "axios";

function useDeleteRecipe() {
  const deleteRecipe = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/recipe/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return res.data; // return backend response
    } catch (err) {
      console.error("Error deleting recipe:", err);

      return null;
    }
  };

  return { deleteRecipe };
}

export default useDeleteRecipe;
