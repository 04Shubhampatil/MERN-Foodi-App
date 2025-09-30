import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowBack, SentimentVeryDissatisfied } from "@mui/icons-material";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Icon */}
        <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
          <SentimentVeryDissatisfied className="text-6xl text-red-500" />
        </div>

        {/* Error Code */}
        <h1 className="text-9xl font-black text-red-500 mb-4 drop-shadow-2xl">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>

        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          The page you're looking for seems to have wandered off into the digital wilderness. 
          Let's get you back to familiar territory.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="px-8 py-4 border-2 border-emerald-500 text-emerald-600 rounded-2xl font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            onClick={() => navigate(-1)}
          >
            <ArrowBack className="w-6 h-6" />
            Go Back
          </button>
          
          <button
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl"
            onClick={() => navigate("/")}
          >
            <Home className="w-6 h-6" />
            Go Home
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            If you believe this is an error, please check the URL or contact support.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
              Check the URL
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Refresh the page
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              Clear cache
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-red-200 rounded-full opacity-10 blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-yellow-200 rounded-full opacity-10 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;