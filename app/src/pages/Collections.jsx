import { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default function Collections({ user }) {
  if (user === null || user === '') {
    return <Navigate to='/' />;
  }

  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  };

  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await fetch(`http://localhost:3000/collection/${user}`, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Not ok');
      }

      let collections = await response.json();
      setCollections(collections);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (collections.length === 0) {
      fetchCollections();
    }
  }, []);

  return (
    <Container>
      <div style={style} className='my-4'>
        {collections.map((book, i) => {
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
  );
}
