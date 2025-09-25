import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setLoading } from "../../redux/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",

    password: "",
 
  });
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
        "http://localhost:5500/api/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if(res.data.success){
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 mt-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden ">
        {/* Card Header */}
        

        {/* Card Body */}
        <form onSubmit={submitHandler} className="p-6">
          {/* Fullname */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Shubham Patel"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
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
          <div className="mb-4">
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

          {/* Profile Upload */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Profile</label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : "Sign Up"}
          </button>

          {/* Footer */}
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default Signup;
