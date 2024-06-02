// import params and effects
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import components
import NavBar from "../components/nav.jsx";
//import style
import "../App.css";
import { Container } from "react-bootstrap";

export default function Home({ userId }) {
  const navigate = useNavigate();

  if (userId === "") {
    navigate(`/loginIn`);
  }

  useEffect(() => {
    if (userId) {
      navigate(`/user`);
    }
  }, [userId, navigate]);

  return (
    <>
      <Container>
        <NavBar></NavBar>
        <h1 className="container mt-5">HOME</h1>
        <p className="container mt-3">page pour des recommandations de lecture</p>
      </Container>
    </>
  );
}
