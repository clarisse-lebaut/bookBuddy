import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/nav";

export default function Home() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setUserId(data._id);
      })
      .catch((error) => {
        console.log("Fetch Failed " + error);
      });
  }, []);

  useEffect(() => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  }, [userId, navigate]);

  return (
    <>
      <NavBar />
      <p>JE SUIS UNE PIZZA</p>
    </>
  );
}
