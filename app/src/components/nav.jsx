// import params and effects
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import components
import DisconnectButton from "./disconnectButton";
// import styll
import "../assets/styles/nav.css";
import { Container } from "react-bootstrap";

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
      <Container>
        <nav className="nav-style position-sticky">
          <li className="li-style">
            <Link className="a-style" to={`/home`}>
              Home
            </Link>
          </li>
          <li className="li-style">
            <Link className="a-style" to={`/collections`}>
              Collections
            </Link>
          </li>
          <li className="li-style">
            <Link className="a-style" to={`/gallery`}>
              Gallery
            </Link>
          </li>
          <li className="li-style">
            <Link className="a-style" to={`/favorites`}>
              Favoris
            </Link>
          </li>
          <li className="li-style">
            <Link className="a-style" to={`/profil`}>
              Profil
            </Link>
          </li>
          <DisconnectButton />
        </nav>
      </Container>
    </>
  );
}
