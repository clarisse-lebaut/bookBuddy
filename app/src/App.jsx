// import des effets et des paramètres
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";

//import des roots
import Title from "./pages/Welcome";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Collections from "./pages/Collections";
import Favorites from "./pages/Favorites";
import LogIn from "./pages/LogIn";
import LogUp from "./pages/LogUp";
import Profil from "./pages/Profil";

// import des styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function App() {
  const [userId, setUserId] = useState("");
  const [books, setBooks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [favorites, setFavorites] = useState([]);
  return (
    <>
      <Routes>
        {/* route page connexion : crée ou connecter */}
        <Route path="/" element={<Title />} />
        {/* route pour se conneceter */}
        <Route
          path="/signIn"
          element={
            <LogIn
              setUserId={setUserId}
              setBooks={setBooks}
              setCollections={setCollections}
              setFavorites={setFavorites}
            />
          }
        />
        {/* route pour se créer un compte */}
        <Route path="/signUp" element={<LogUp />} />
        {/* route page home */}
        <Route path="/home" element={<Home />} />
        {/* route page profil */}
        <Route path="/profil" element={<Profil />} />
        <Route
          path="/gallery"
          element={
            <Gallery
              userId={userId}
              books={books}
              collections={collections}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/collections"
          element={<Collections userId={userId} collections={collections} favorites={favorites} />}
        />
        <Route
          path="/favorites"
          element={<Favorites userId={userId} collections={collections} favorites={favorites} />}
        />
      </Routes>
    </>
  );
}
