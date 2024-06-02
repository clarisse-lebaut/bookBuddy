import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import components
import NavBar from "../components/nav.jsx";

export default function Home() {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  }, [userId, navigate]);

  return (
    <>
      <NavBar></NavBar>
      <h1>HOME</h1>
      <p>je n'arrive pas à fetch les collections...</p>
    </>
  );
}
