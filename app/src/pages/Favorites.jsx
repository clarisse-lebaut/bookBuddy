import { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default function Favorites({ user }) {
  if (user === null || user === '') {
    return <Navigate to='/' />;
  }

  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  };

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${user}`, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Not ok');
      }

      let favorites = await response.json();
      setFavorites(favorites);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (favorites.length === 0) {
      fetchFavorites();
    }
  }, []);

  return (
    <Container>
      <div style={style} className='my-4'>
        {favorites.map((book, i) => {
          return <AppCard key={i} data={book} />;
        })}
      </div>
    </Container>
  );
}
