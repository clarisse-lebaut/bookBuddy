// import params and effects
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import styles
import "../App.css";
import "../assets/styles/logStyle.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function LogIn({ setUserId, setBooks, setCollections, setFavorites }) {
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
          setUserId(() => data.userId);
          fetchBooks();
          fetchCollections(data.userId);
          fetchFavorites(data.userId);
          navigate(`/home`); // Utilisez navigate pour rediriger
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");

      if (!response.ok) {
        throw new Error("Impossible to get books!");
      }

      let data = await response.json();
      let books = data.results;
      setBooks(() => books);
    } catch (error) {
      throw error;
    }
  };

  const fetchCollections = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/collection/${userId}`, {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Impossible to get user's collection!");
      }

      let data = await response.json();
      setCollections(() => data);
    } catch (error) {
      throw error;
    }
  };

  const fetchFavorites = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${userId}`, {
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Impossible to get user's favorites!");
      }

      let data = await response.json();
      setFavorites(() => data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div id="body-style">
      <h1>SE CONNECTER</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="input-style"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
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
        <Button className="button-style" type="submit">
          Se connecter
        </Button>
        <p>Pas encore inscrit ?</p>
        <Link to="/signUp">Créez vous un compte !</Link>
      </Form>
    </div>
  );
}
