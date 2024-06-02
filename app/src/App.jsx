import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Collections from './pages/Collections';
import Favorites from './pages/Favorites';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import BookComponent from './components/BookComponent';

export default function App() {
  const [userId, setUserId] = useState('6652210aee93eb07369be9fe');
  const [books, setBooks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/books');

      if (!response.ok) {
        throw new Error('Impossible to get books!');
      }

      let data = await response.json();
      let books = data.results;
      setBooks(() => books);
    } catch (error) {
      throw error;
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch(`http://localhost:3000/collection/${userId}`, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Not ok');
      }

      let data = await response.json();
      setCollections(() => data);
    } catch (error) {
      throw error;
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${userId}`, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Not ok');
      }

      let data = await response.json();
      setFavorites(() => data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCollections();
    fetchFavorites();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/books'
          element={
            <Gallery
              userId={userId}
              books={books}
              collections={collections}
              favorites={favorites}
            />
          }
        />
        <Route
          path='/collections'
          element={<Collections userId={userId} collections={collections} favorites={favorites} />}
        />
        <Route
          path='/favorites'
          element={<Favorites userId={userId} collections={collections} favorites={favorites} />}
        />
      </Routes>
    </>
  );
}
