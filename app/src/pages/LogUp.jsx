import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../assets/styles/logStyle.css";

export default function LogUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorElement, setErrorElement] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "User created") {
          // Création réussi, redirection de l'utilisateur sur la page de connexion
          const { userID } = useParams();
          const [userData, setUserData] = useState(null);

          useEffect(() => {
            // Effectuer une requête fetch pour récupérer les données de l'utilisateur à partir du serveur
            fetch(`http://localhost:3000/user/${userID}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(),
            })
              .then((response) => response.text())
              .then((data) => {
                setUserData(data);
              })
              .catch((error) => {
                console.error(error);
              });
          }, [userID]);

          const [isAuthenticated, setIsAuthenticated] = useState(false);
          const [userId, setUserId] = useState(null);

          useEffect(() => {
            // Vérifier si l'utilisateur est connecté
            const storedUserId = sessionStorage.getItem("userId");
            if (storedUserId) {
              setIsAuthenticated(true);
              setUserId(storedUserId);
            }
          }, []);

          window.location.href = "/home/:id";
        } else {
          // La connexion a échoué, afficher un message d'erreur
          setErrorMessage(data.message);
          setErrorElement(
            <p style={{ color: "red", fontSize: "20px" }}>
              {"Nom d'utilisateur déjà pris."}
            </p>
          );
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div id="body-style">
      <h1>CREER UN COMPTE</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            className="input-style"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          {errorElement}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="input-style"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="button-style" type="submit" onClick={handleSubmit}>
          Créer un compte
        </Button>
        <p>Déjà inscrit ?</p>
        <Link to="/signIn">Connectez-vous!</Link>
      </Form>
    </div>
  );
}
