import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export default function NavBar() {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Logout successful") {
          // Déconnexion réussi, redirection sur page de connexion
          window.location.href = "/signIn";
        } else {
          // Déconnexion échoué
          setErrorMessage(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <nav className="nav-style">
        <li className="li-style">
          <Link className="a-style" to="/">
            Home
          </Link>
        </li>
        <li className="li-style">
          <Link className="a-style" to="/favoris">
            Favoris
          </Link>
        </li>
        <li className="li-style">
          <Link className="a-style" to="/profil">
            Profil
          </Link>
        </li>
        <button onClick={handleSubmit}>Déconnexion</button>
      </nav>
    </>
  );
}
