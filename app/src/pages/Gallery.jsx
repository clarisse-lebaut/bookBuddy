import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function Gallery() {
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
    fetchBooks();
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className='bg-danger'>Titre</th>
            <th>Auteur</th>
            <th>Nombre de page</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => {
            return (
              <tr key={i}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
