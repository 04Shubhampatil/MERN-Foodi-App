import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/auth.js";
import run from "../../src/utils/askAi.js";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  IconButton,
  Container,
} from "@mui/material";
import {
  AutoAwesome,
  Close,
  CloudUpload,
  Restaurant,
  Add,
} from "@mui/icons-material";

function CreateRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    file: null,
  });

  const [aiGenerating, setAiGenerating] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [fileName, setFileName] = useState("");

  // Check authentication on mount
  useEffect(() => {
    if (!user) {
      toast.error("Please login to create recipes");
      navigate("/login");
    }
  }, [user, navigate]);

  // Helper functions to parse AI response
  const extractSection = (text, sectionName) => {
    const regex = new RegExp(`${sectionName}:?\\s*([\\s\\S]*?)(?=\\n\\n|$)`, "i");
    const match = text.match(regex);
    if (match) {
      return match[1]
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.match(/^#{1,6}\s/));
    }
    return [];
  };

  const extractField = (text, fieldName) => {
    const regex = new RegExp(`${fieldName}:?\\s*(.+)`, "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "Not specified";
  };

  const generateRecipeWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a recipe idea");
      return;
    }

    setAiGenerating(true);
    try {
      const res = await run(`
        Generate a detailed recipe based on this idea: "${aiPrompt}"
        
        Please format the response exactly as follows:
        
        Title: [Recipe Name]
        
        Ingredients:
        - [ingredient 1]
        - [ingredient 2]
        (list all ingredients)
        
        Instructions:
        1. [step 1]
        2. [step 2]
        (list all steps)
        
        Cooking Time: [ eg.30 min]
      `);

      // Parse AI response
      const title = extractField(res, "Title");
      const ingredients = extractSection(res, "Ingredients");
      const instructions = extractSection(res, "Instructions");
      const time = extractField(res, "Cooking Time");

      setInput({
        ...input,
        title: title !== "Not specified" ? title : "",
        ingredients: ingredients.join(", "),
        instructions: instructions.join("\n"),
        time: time,
      });

      toast.success("Recipe generated! Review and submit.");
      setShowAiPanel(false);
      setAiPrompt("");
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setFileName(file.name);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to create recipes");
      navigate("/login");
      return;
    }

    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("ingredients", input.ingredients);
      formData.append("instructions", input.instructions);
      formData.append("time", input.time);

      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await axios.post(
        "https://mern-foodi-app.onrender.com/api/recipe/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Recipe created successfully!", {
          duration: 3000 // Toast will disappear after 3 seconds
        });

        // Reset form
        setInput({
          title: "",
          ingredients: "",
          instructions: "",
          time: "",
          file: null,
        });
        setFileName("");

        // Navigate to home or recipes page
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0fdf4",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              bgcolor: "white",
              borderRadius: "50%",
              mb: 2,
              boxShadow: "0 2px 8px rgba(21, 128, 61, 0.1)",
            }}
          >
            <Restaurant sx={{ fontSize: 32, color: "#15803d" }} />
          </Box>
          <Typography
            variant="h4"
            fontWeight="600"
            color="#1f2937"
            gutterBottom
          >
            Create New Recipe
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your delicious creation with food lovers
          </Typography>
        </Box>

        {/* AI Generation Section */}
        {!showAiPanel ? (
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Button
              variant="outlined"
              startIcon={<AutoAwesome />}
              onClick={() => setShowAiPanel(true)}
              sx={{
                borderColor: "#86efac",
                color: "#15803d",
                bgcolor: "white",
                "&:hover": {
                  borderColor: "#4ade80",
                  bgcolor: "#f0fdf4",
                },
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: "500",
              }}
            >
              Generate with AI
            </Button>
          </Box>
        ) : (
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              border: "1px solid #86efac",
              bgcolor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AutoAwesome sx={{ color: "#15803d", fontSize: 20 }} />
                  <Typography variant="h6" fontWeight="600" color="#15803d">
                    AI Recipe Generator
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => setShowAiPanel(false)}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Describe your recipe idea... (e.g., 'spicy Thai curry with vegetables')"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f9fafb",
                    "&:hover fieldset": {
                      borderColor: "#86efac",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4ade80",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={generateRecipeWithAI}
                disabled={aiGenerating}
                startIcon={
                  aiGenerating ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <AutoAwesome />
                  )
                }
                sx={{
                  bgcolor: "#15803d",
                  "&:hover": { bgcolor: "#166534" },
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: "500",
                  borderRadius: 2,
                }}
              >
                {aiGenerating ? "Generating..." : "Generate Recipe"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Form */}
        <Card
          sx={{
            borderRadius: 3,
            border: "1px solid #d1fae5",
            bgcolor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <form onSubmit={submitHandler}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Title */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="#374151"
                    fontWeight="500"
                    mb={1}
                  >
                    Recipe Title
                  </Typography>
                  <TextField
                    fullWidth
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    required
                    placeholder="e.g., Grandma's Special Pasta"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#f9fafb",
                        "&:hover fieldset": {
                          borderColor: "#86efac",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ade80",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Ingredients */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="#374151"
                    fontWeight="500"
                    mb={1}
                  >
                    Ingredients
                  </Typography>
                  <TextField
                    fullWidth
                    name="ingredients"
                    value={input.ingredients}
                    onChange={changeEventHandler}
                    required
                    multiline
                    rows={3}
                    placeholder="e.g., 2 cups flour, 1 cup sugar, 3 eggs..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#f9fafb",
                        "&:hover fieldset": {
                          borderColor: "#86efac",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ade80",
                        },
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" mt={0.5}>
                    Separate ingredients with commas
                  </Typography>
                </Box>

                {/* Instructions */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="#374151"
                    fontWeight="500"
                    mb={1}
                  >
                    Instructions
                  </Typography>
                  <TextField
                    fullWidth
                    name="instructions"
                    value={input.instructions}
                    onChange={changeEventHandler}
                    required
                    multiline
                    rows={5}
                    placeholder="Step-by-step cooking instructions..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#f9fafb",
                        "&:hover fieldset": {
                          borderColor: "#86efac",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ade80",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Cooking Time */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="#374151"
                    fontWeight="500"
                    mb={1}
                  >
                    Cooking Time
                  </Typography>
                  <TextField
                    fullWidth
                    name="time"
                    value={input.time}
                    onChange={changeEventHandler}
                    required
                    placeholder="e.g., 30 minutes"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#f9fafb",
                        "&:hover fieldset": {
                          borderColor: "#86efac",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ade80",
                        },
                      },
                    }}
                  />
                </Box>

                {/* File Upload */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="#374151"
                    fontWeight="500"
                    mb={1}
                  >
                    Recipe Image
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderStyle: "dashed",
                      borderWidth: 2,
                      borderColor: "#d1fae5",
                      color: "#15803d",
                      bgcolor: "#f9fafb",
                      textTransform: "none",
                      fontWeight: "500",
                      "&:hover": {
                        borderColor: "#86efac",
                        bgcolor: "#f0fdf4",
                      },
                    }}
                  >
                    {fileName || "Upload Image"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={changeFileHandler}
                    />
                  </Button>
                  {fileName && (
                    <Chip
                      label={fileName}
                      onDelete={() => {
                        setInput({ ...input, file: null });
                        setFileName("");
                      }}
                      sx={{
                        mt: 1.5,
                        bgcolor: "#dcfce7",
                        color: "#15803d",
                        "& .MuiChip-deleteIcon": {
                          color: "#15803d",
                        },
                      }}
                    />
                  )}
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? null : <Add />}
                  fullWidth
                  sx={{
                    bgcolor: "#15803d",
                    "&:hover": { bgcolor: "#166534" },
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    mt: 1,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(21, 128, 61, 0.2)",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create Recipe"
                  )}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>

      <Toaster position="top-right"  />
    </Box>
  );
}

export default CreateRecipe;