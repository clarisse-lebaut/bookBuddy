import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import BookComponent from "../components/BookComponent";
import NavBar from "../components/nav.jsx";

export default function Gallery({ userId, books, collections, favorites }) {
  if (!userId && userId === "") {
    return <Navigate to="/" />;
  }

  const style = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  };

  const testBook = {
    title: "Test",
    author: "Test",
    categories: ["Test"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg",
  };

  return (
    <>
      <Container>
        <NavBar />
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
