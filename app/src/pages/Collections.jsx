import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import BookComponent from '../components/BookComponent';
import NavBar from "../components/nav.jsx";

export default function Collections({ userId, collections, favorites }) {
  if (!userId && userId === '') {
    return <Navigate to='/' />;
  }

  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  };

  return (
    <Container>
      <NavBar></NavBar>
      <div style={style} className='my-4'>
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
