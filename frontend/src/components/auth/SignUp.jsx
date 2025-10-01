import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/auth.js";
import toast, { Toaster } from "react-hot-toast";

// ✅ MUI Components
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

// ✅ MUI Icons
import { Person, Email, Lock, Visibility, VisibilityOff, CloudUpload } from "@mui/icons-material";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    file: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("password", input.password);

      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await axios.post(
        "https://mern-foodi-app.onrender.com/api/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: "100%" }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Sign Up
        </Typography>

        <form onSubmit={submitHandler}>
          {/* Fullname */}
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* File Upload */}
          <Button
            variant="outlined"
            color="success"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            startIcon={<CloudUpload />}
          >
            {input.file ? input.file.name : "Upload Profile"}
            <input type="file" hidden accept="image/*" onChange={changeFileHandler} />
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={loading}
            sx={{ py: 1.2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Please wait...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        {/* Footer */}
        <Typography variant="body2" align="center" mt={3}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#15813C", textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Paper>
      <Toaster position="top-right" />
    </Box>
  );
}

export default Signup;
