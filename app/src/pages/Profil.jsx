import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../../component/nav";
import { Button } from "react-bootstrap";
import DisconnectButton from "../../component/disconnectButton";
import { useParams } from "react-router-dom";

export default function Profil() {
  const { id } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: password }),
    });

    // Vérifier si la modification du mot de passe a réussi ou non
    if (response.ok) {
      // Afficher un message de succès ou rediriger l'utilisateur vers une autre page
    } else {
      // Afficher un message d'erreur
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <h1>PROFIL</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit">Modifier le mot de passe</Button>
        </form>
      </div>
    </>
  );
}
