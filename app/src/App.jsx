import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Title from "./pages/Welcome";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import LogUp from "./pages/LogUp";
import Profil from "./pages/Profil";
import Favorite from "./pages/Favorite";

export default function App() {
  return (
    <>
      <Routes>
        {/* route pour la page d'acceuil */}
        <Route path="/" element={<Title />} />
        {/* route pour se connecter */}
        <Route path="/signIn" element={<LogIn />} />
        {/* route pour se crée un compte */}
        <Route path="/signUp" element={<LogUp />} />
        {/* route pour la page d'acceuil */}
        <Route path="/home/:id" element={<Home />} />
        {/* route pour le profil */}
        <Route path="/profil/:id" element={<Profil />} />
        {/* route pour les favoris */}
        <Route path="/favoris/:id" element={<Favorite />} />
      </Routes>
    </>
  );
}
