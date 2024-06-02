// import params
import { Navigate } from "react-router-dom";
// imports component
import BookComponent from "../components/BookComponent";
import NavBar from "../components/nav.jsx";
//import styles
import "../App.css";
import { Container } from "react-bootstrap";

export default function Collections({ userId, collections, favorites }) {
  console.log(collections);
  console.log(userId);
  if (!userId && userId === "") {
    return <Navigate to="/" />;
  }

  const style = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  };

  return (
    <Container>
      <NavBar></NavBar>
      <h1 className="container mt-5">VOTRE ETAGERE</h1>
      <p className="container mt-3">Ne perdez plus le fil de vos lecture passé, en cours et futur !</p>
      <div style={style} className="my-4">
        {collections.map((book, i) => (
          <BookComponent
            key={i}
            data={book}
            isInCollections={true}
            isInFavorites={favorites.some((b) => b._id === book._id)}
          />
        ))}
      </div>
    </Container>
  );
}
