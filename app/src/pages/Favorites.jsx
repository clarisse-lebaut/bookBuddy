import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import BookComponent from "../components/BookComponent";
import NavBar from "../components/nav.jsx";

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
