import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/nav";
import DisconnectButton from "../../component/disconnectButton";
import { useParams } from "react-router-dom";

export default function Favorite() {
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
      <h1>FAVORIS</h1>
      <p>pages de favoris</p>
    </>
  );
}
