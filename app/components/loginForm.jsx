import React, { useState, useEffect } from "react";

function LoginForm() {
  return (
    <form id="" action="" method="get" classname="form-example" className="form">
      <div classname="form-example">
        <label className="label" for="name">
          Pseudo{" "}
        </label>
        <input className="input" type="text" name="name" id="name" required />
      </div>
      <div classname="form-example">
        <label className="label" for="password">
          Mot de passe{" "}
        </label>
        <input className="input" type="password" name="password" id="password" required />
      </div>
      <div classname="form-example">
        <input className="sendButton" type="submit" value="Se connecter" />
      </div>
    </form>
  );
}

export default LoginForm;
