import React from "react";
import NavBar from "../../component/nav";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-router-dom";

export default function Profil() {
  return (
    <>
      <NavBar />
      <input type="text" />
      <Button>Modifier le mot de passe</Button>
    </>
  );
}
