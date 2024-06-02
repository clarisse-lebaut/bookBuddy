// import params and effects
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import components
import DisconnectButton from "./disconnectButton";
// import styll
import "../assets/styles/nav.css";

export default function NavBar() {
  // Get ID in the URL
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
          <Link className="a-style" to={`/collections/${userId}`}>
            Collections
          </Link>
        </li>
        <li className="li-style">
          <Link className="a-style" to={`/gallery/${userId}`}>
            Gallery
          </Link>
        </li>
        <li className="li-style">
          <Link className="a-style" to={`/favorites/${userId}`}>
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
