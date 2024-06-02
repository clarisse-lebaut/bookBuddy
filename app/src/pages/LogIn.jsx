import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import "../assets/styles/logStyle.css";

export default function LogIn() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          navigate(`/home/${data.userId}`); // Utilisez navigate pour rediriger
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div id="body-style">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <h1>SE CONNECTER</h1>
      <Form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <p>User Name</p>
          </Form.Label>
          <Form.Control
            className="input-style shadow-lg"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
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
        <Button className="button-style" type="submit">
          <p>Submit</p>
        </Button>
        <p> Pas encore inscrit ?</p>
        <Link to="/signUp">Créez vous un compte !</Link>
      </Form>
    </div>
  );
}
