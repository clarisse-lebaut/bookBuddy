import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import components
import NavBar from "../components/nav.jsx";
import BookComponent from "../components/BookComponent.jsx";

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
      <NavBar></NavBar>
      <h1>HOME</h1>
    </>
  );
}
