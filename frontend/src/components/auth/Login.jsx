import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoading, setUser } from "../../redux/auth.js";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";

// ✅ MUI Icons
import { Email, Lock, Login as LoginIcon } from "@mui/icons-material";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:5500/api/user/login",
        {
          email: input.email,
          password: input.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
        console.error("Error Request:", error.request);
      } else {
        toast.error(error.message || "Unexpected error!");
        console.error("Error:", error.message);
      }
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
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <LoginIcon color="success" />
          Login
        </Typography>

        <form onSubmit={submitHandler}>
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
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, py: 1.2 }}
            startIcon={!loading && <LoginIcon />}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Please wait...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Signup Link */}
        <Typography variant="body2" align="center" mt={3}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#15813C", textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
      <Toaster position="top-right" />
    </Box>
  );
}

export default Login;
