import React from "react";
import { useState } from "react";

export default function DisconnectButton() {
  // disconnect and destroy the session
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
  return <button onClick={handleSubmit}>Déconnexion</button>;
}
