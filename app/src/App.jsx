import React from "react";
import { useState } from "react";
import "./App.css";
import "../components/loginForm.css"
// import HelloMessage from "../components/logForm";
import LoginForm from "../components/loginForm";

function App() {
  return (
    <div>
      {/* <HelloMessage name="Abby" /> */}
      <LoginForm />
    </div>
  );
}

export default App;
