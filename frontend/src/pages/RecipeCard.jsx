import React from "react";
import { useFavouriteRecipe } from "../hook/Isfavourites.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDeleteRecipe from "../hook/Isdelete.jsx";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  CardActions,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  FavoriteBorderIcon,
  FavoriteIcon,
  AccessTime,
  Schedule,
  Restaurant,
  Edit,
  Delete,
} from "@mui/icons-material";

function RecipeCard({ recipe, onDelete }) {
  const navigate = useNavigate();
  const { toggleFavourite } = useFavouriteRecipe();
  const { favourites, user } = useSelector((state) => state.auth);
  const safeFavourites = Array.isArray(favourites) ? favourites : [];

  const isFav = safeFavourites.find((r) => r._id === recipe._id);
  const isOwner = user && recipe.user === user._id;

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success"
  });
  
  const { deleteRecipe, error: deleteError, isLoading: isDeleting } = useDeleteRecipe();

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }
    toggleFavourite(recipe);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit-recipe/${recipe._id}`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteRecipe(recipe._id);
      if (res?.success) {
        setSnackbar({
          open: true,
          message: "Recipe deleted successfully!",
          severity: "success"
        });
        if (onDelete) onDelete(recipe._id);
      } else {
        setSnackbar({
          open: true,
          message: deleteError || "Failed to delete recipe",
          severity: "error"
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      setSnackbar({
        open: true,
        message: "An error occurred while deleting the recipe",
        severity: "error"
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // format date (optional: short & readable)
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate cooking time in minutes
  const getTimeInMinutes = (timeString) => {
    if (!timeString) return "N/A";
    const time = timeString.toLowerCase();
    if (time.includes("hour") && time.includes("min")) {
      const hours = parseInt(time) || 0;
      const mins = parseInt(time.split("min")[0].split(" ").pop()) || 0;
      return hours * 60 + mins;
    } else if (time.includes("hour")) {
      return (parseInt(time) || 0) * 60;
    } else if (time.includes("min")) {
      return parseInt(time) || 0;
    }
    return parseInt(time) || "N/A";
  };

  const timeInMinutes = getTimeInMinutes(recipe.time);

  return (
    <>
      <Card
        sx={{
          position: "relative",
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          bgcolor: "white",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
            borderColor: "#10b981",
            "& .card-image": {
              transform: "scale(1.05)",
            },
          },
          overflow: "hidden",
        }}
        onClick={handleCardClick}
      >
        {/* Recipe Image with Gradient Overlay */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            className="card-image"
            component="img"
            height="200"
            image={
              recipe.coverImage ||
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop"
            }
            alt={recipe.title}
            sx={{
              objectFit: "cover",
              bgcolor: "#f1f5f9",
              transition: "transform 0.4s ease",
            }}
          />

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.1))",
            }}
          />

          {/* Difficulty Badge - Top Left */}
          {recipe.difficulty && (
            <Chip
              label={recipe.difficulty}
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                fontWeight: "600",
                fontSize: "0.7rem",
                height: 28,
                bgcolor:
                  recipe.difficulty?.toLowerCase() === "easy"
                    ? "rgba(34, 197, 94, 0.9)"
                    : recipe.difficulty?.toLowerCase() === "medium"
                    ? "rgba(245, 158, 11, 0.9)"
                    : "rgba(239, 68, 68, 0.9)",
                color: "white",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
          )}
        </Box>

        {/* Recipe Details */}
        <CardContent
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {/* Recipe Title */}
          <Typography
            variant="h6"
            fontWeight="700"
            color="#1e293b"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
              minHeight: "2.8em",
              fontSize: "1.1rem",
            }}
          >
            {recipe.title}
          </Typography>

          {/* Recipe Stats */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Schedule sx={{ fontSize: 18, color: "#10b981" }} />
              <Typography
                variant="body2"
                color="#64748b"
                fontSize="0.8rem"
                fontWeight="500"
              >
                {timeInMinutes} min
              </Typography>
            </Box>

            {recipe.servings && (
              <>
                <Typography variant="body2" color="#cbd5e1" fontSize="0.8rem">
                  •
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Restaurant sx={{ fontSize: 18, color: "#10b981" }} />
                  <Typography
                    variant="body2"
                    color="#64748b"
                    fontSize="0.8rem"
                    fontWeight="500"
                  >
                    {recipe.servings} servings
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {/* Ingredients Preview */}
          {recipe.ingredients && (
            <Typography
              variant="body2"
              color="#64748b"
              sx={{
                fontSize: "0.8rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.4,
                minHeight: "2.8rem",
              }}
            >
              {typeof recipe.ingredients === "string"
                ? recipe.ingredients.split(",").slice(0, 3).join(", ")
                : recipe.ingredients.slice(0, 3).join(", ")}
              {(typeof recipe.ingredients === "string"
                ? recipe.ingredients.split(",").length
                : recipe.ingredients.length) > 3 && "..."}
            </Typography>
          )}

          {/* Created At */}
          {recipe.createdAt && (
            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                fontSize: "0.75rem",
                fontStyle: "italic",
                mt: "auto",
                pt: 1,
              }}
            >
              Added {formatDate(recipe.createdAt)}
            </Typography>
          )}
        </CardContent>

        {/* Bottom Actions - Favorite, Time, and Edit/Delete */}
        <CardActions
          sx={{ p: 2, pt: 1, gap: 1, justifyContent: "space-between" }}
        >
          {/* Left Side - Time Chip */}
          <Chip
            icon={<AccessTime sx={{ fontSize: 16 }} />}
            label={recipe.time || "Time N/A"}
            size="small"
            sx={{
              bgcolor: "rgba(16, 185, 129, 0.1)",
              color: "#059669",
              fontWeight: "600",
              fontSize: "0.75rem",
              height: 32,
              border: "1px solid rgba(16, 185, 129, 0.2)",
              "& .MuiChip-icon": {
                color: "#059669",
              },
            }}
          />

          {/* Right Side - Action Buttons */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {/* Delete Button - Only show if user is owner */}
            {isOwner && (
              <Tooltip title="Delete Recipe">
                <IconButton
                  size="small"
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  sx={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderRadius: 2,
                    width: 36,
                    height: 36,
                    "&:hover": {
                      backgroundColor: "rgba(239, 68, 68, 0.2)",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease",
                    "&:disabled": {
                      opacity: 0.5,
                    }
                  }}
                >
                  <Delete sx={{ color: "#ef4444", fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}

            {/* Edit Button - Only show if user is owner */}
            {isOwner && (
              <Tooltip title="Edit Recipe">
                <IconButton
                  size="small"
                  onClick={handleEditClick}
                  sx={{
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderRadius: 2,
                    width: 36,
                    height: 36,
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Edit sx={{ color: "#3b82f6", fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}

            {/* Favorite Button */}
            <Tooltip
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <IconButton
                size="small"
                onClick={handleFavouriteClick}
                sx={{
                  backgroundColor: isFav
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
                  borderRadius: 2,
                  width: 36,
                  height: 36,
                  "&:hover": {
                    backgroundColor: isFav
                      ? "rgba(239, 68, 68, 0.2)"
                      : "rgba(0, 0, 0, 0.08)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {isFav ? (
                  <FavoriteIcon sx={{ color: "#00A63E", fontSize: 18 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#00A63E" , fontSize: 18 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>

        {/* Hover Effect Border */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
            transform: "scaleX(0)",
            transition: "transform 0.3s ease",
            ".MuiCard-root:hover &": {
              transform: "scaleX(1)",
            },
          }}
        />
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-recipe-dialog"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="delete-recipe-dialog"
          sx={{ textAlign: "center", color: "#ef4444" }}
        >
          <Delete sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Delete Recipe
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center">
            Are you sure you want to delete "<strong>{recipe.title}</strong>"?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={1}
          >
            This action cannot be undone. The recipe will be permanently
            removed.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
          <Button
            onClick={cancelDelete}
            variant="outlined"
            disabled={isDeleting}
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting ? null : <Delete />}
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              },
              "&:disabled": {
                background: "#9ca3af",
              }
            }}
          >
            {isDeleting ? "Deleting..." : "Delete Recipe"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RecipeCard;