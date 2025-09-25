import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setLoading, setUser } from "../../redux/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      console.log(res.data); // Log the actual response data
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with status code not in 2xx
        toast.error(error.response.data.message || "Something went wrong!");
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response
        toast.error("No response from server. Please try again later.");
        console.error("Error Request:", error.request);
      } else {
        // Something else
        toast.error(error.message || "Unexpected error!");
        console.error("Error:", error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="shubham@example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="********"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Please wait..." : " Login"}
        </button>

        {/* Login Link */}
        <p className="text-sm mt-4 text-center">
          dont have an account?
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
        <Toaster position="top-right" />
      </form>
    </div>
  );
}

export default Login;
