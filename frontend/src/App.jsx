import React from "react";
import Home from "./pages/Home.jsx";
import MyRecipe from "./pages/MyRecipe.jsx";
import Favourite from "./pages/Favourite.jsx"; // Fixed: Capitalized component name
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/signUp.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myrecipe" element={<MyRecipe />} />
            <Route path="/favourite" element={<Favourite />} /> {/* Fixed: Capitalized component */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> {/* Fixed: Capitalized component */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;