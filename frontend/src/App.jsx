import React from "react";
import Home from "./pages/Home.jsx";
import MyRecipe from "./pages/MyRecipe.jsx";
import Login from "./components/auth/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import SingleRecipe from "./pages/SingleRecipe.jsx";
import Favourite from "./pages/Favourite.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import DummyRecipe from "./pages/DummyRecipe.jsx";
import UpdateRecipe from "./pages/UpdateRecipe.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myrecipe/:username" element={<MyRecipe />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/Favourite" element={<Favourite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recipe/:id" element={<SingleRecipe />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/dummyrecipe/:id" element={<DummyRecipe />} />
            <Route path="/edit-recipe/:id" element={<UpdateRecipe />} />

            

          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
