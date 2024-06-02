//import params
import { Navigate } from "react-router-dom";
//import component
import BookComponent from "../components/BookComponent";
import NavBar from "../components/nav.jsx";
//import styles
import { Container } from "react-bootstrap";

export default function Gallery({ userId, books, collections, favorites }) {
  if (!userId && userId === "") {
    return <Navigate to="/signIn" />;
  }

  const style = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  };

  return (
    <>
      <Container>
        <NavBar />
        <h1 className="container mt-5">LES LIVRES QUE D'AUTRES ONT LU !</h1>
        <p className="container mt-3">
          Un oubli ? Envie de faire au plus vite ? En manque d'inspi ? Faites votre choix !
        </p>
        <div style={style} className="my-4">
          {books.map((book, i) => (
            <BookComponent
              userId={userId}
              key={i}
              data={book}
              isInCollections={collections.some((b) => b._id === book._id)}
              isInFavorites={favorites.some((b) => b._id === book._id)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
