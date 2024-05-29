import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default function Gallery({ user }) {
  if (user === null || user === '') {
    return <Navigate to='/' />;
  }

  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  };

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Not ok');
      }

      const books = await response.json();
      setBooks(books.results);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, []);

  return (
    <>
      <Container>
        <div style={style} className='my-4'>
          {books.map((book, i) => {
            return (
              <Card key={i}>
                <Card.Img variant='top' src={book.image} style={{ height: '400px' }} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                  <Button variant='primary'>Consulter</Button>
                  <Button variant='primary'>Ajouter aux favoris</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}
