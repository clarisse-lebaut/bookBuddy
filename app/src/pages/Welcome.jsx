import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/welcome.css";

export default function Title() {
  return (
    <>
      <div id="body">
        <div id="box">
          <h1>Book Buddy</h1>
        </div>
        <div id="box">
          <Button id="button">
            <Link to="/signIn">Se connecter</Link>
          </Button>
          <Button id="button">
            <Link to="/signUp">Crée un compte</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
