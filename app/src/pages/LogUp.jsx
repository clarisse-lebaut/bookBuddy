import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function LogUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [response, setResponse] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "User create") {
          // La connexion a réussi, vous pouvez rediriger l'utilisateur vers une autre page, par exemple
          window.location.href = "/";
        } else {
          // La connexion a échoué, vous pouvez afficher un message d'erreur
          setErrorMessage(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <h1>CREER UN COMPTE</h1>
      <Form className="d-flex flex-column justify-content-center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <p>User Name</p>
          </Form.Label>
          <Form.Control
            className="input-style"
            type="text"
            placeholder="Enter userName"
            name="username"
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <p>Password</p>
          </Form.Label>
          <Form.Control
            className="input-style"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="button-style" type="submit" onClick={handleSubmit}>
          <p>Submit</p>
        </Button>
        <p> Déjà inscrit ?</p>
        <Link to="/signIn">Connectez-vous!</Link>
      </Form>
    </>
  );
}
