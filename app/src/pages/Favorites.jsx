// import params
import { Navigate } from "react-router-dom";
// import components
import BookComponent from "../components/BookComponent";
import NavBar from "../components/nav.jsx";
// import styles
import "../App.css";
import { Container } from "react-bootstrap";

export default function Favorites({ userId, collections, favorites }) {
  console.log(favorites);
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
      <NavBar />
      <h1 className="container mt-5">RETROUVEZ VOS COUP DE COEUR</h1>
      <p className="container mt-3">Recommandé un livre et avoir oublié un titre ? Plus jamais !</p>
      <div style={style} className="my-4">
        {favorites.map((book, i) => (
          <BookComponent
            key={i}
            data={book}
            isInCollections={collections.some((b) => b._id === book._id)}
            isInFavorites={true}
          />
        ))}
      </div>
    </Container>
  );
}
