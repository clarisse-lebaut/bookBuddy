import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./nav.css";
import DisconnectButton from "./disconnectButton";

export default function NavBar() {
  // Récupérer l'ID de l'utilisateur à partir de l'URL actuelle
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const userIdFromUrl = pathParts[pathParts.length - 1];
    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
    }
  }, []);

  return (
    <>
      <nav className="nav-style">
        <li className="li-style">
          <Link className="a-style" to={`/home/${userId}`}>
            Home
          </Link>
        </li>
        <li className="li-style">
          <Link className="a-style" to={`/favoris/${userId}`}>
            Favoris
          </Link>
        </li>
        <li className="li-style">
          <Link className="a-style" to={`/profil/${userId}`}>
            Profil
          </Link>
        </li>
        <DisconnectButton />
      </nav>
    </>
  );
}
