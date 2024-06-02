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
  const [userId, _] = useState("665c96c97c83dd6d4a3c6c36");
  const [books, setBooks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");

      if (!response.ok) {
        throw new Error("Impossible to get books!");
      }

      let data = await response.json();
      let books = data.results;
      setBooks(() => books);
    } catch (error) {
      throw error;
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch(`http://localhost:3000/collection/${userId}`, {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Impossible to get user's collection!");
      }

      let data = await response.json();
      setCollections(() => data);
    } catch (error) {
      throw error;
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${userId}`, {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Impossible to get user's favorites!");
      }

      let data = await response.json();
      setFavorites(() => data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCollections();
    fetchFavorites();
  }, []);

  return (
    <>
      <Routes>
        {/* route page connexion : crée ou connecter */}
        <Route path="/" element={<Title />} />
        {/* route pour se conneceter */}
        <Route path="/signIn" element={<LogIn />} />
        {/* route pour se créer un compte */}
        <Route path="/signUp" element={<LogUp />} />
        {/* route page home */}
        <Route path="/home/:id" element={<Home />} />
        {/* route page profil */}
        <Route path="/profil/:id" element={<Profil />} />
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
