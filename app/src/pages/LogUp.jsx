import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/logStyle.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function LogUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorElement, setErrorElement] = useState(null);

  const { userID } = useParams();
  const [userData, setUserData] = useState(null);
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
          navigate(`/home/${data.userId}`); // Utilisez navigate pour rediriger
        } else {
          // La connexion a échoué, afficher un message d'erreur
          setErrorMessage(data.message);
          setErrorElement(
            <p style={{ color: "red", fontSize: "20px" }}>{"Nom d'utilisateur déjà pris."}</p>
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
