import React, { useState, useContext } from 'react';
import NavBar from '../../component/nav';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Ajouter cette ligne
import './Profil.css'; // Importer le fichier CSS

export default function Profil() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [password, setPassword] = useState('');

  // Récupérer l'ID de l'utilisateur dans l'URL en utilisant le hook useParams
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: password }),
    });

    // Vérifier si la modification du mot de passe a réussi ou non
    if (response.ok) {
      // Afficher un message de succès ou rediriger l'utilisateur vers une autre page
    } else {
      // Afficher un message d'erreur
    }
  };

  return (
    <>
      <NavBar />
      <div className='profile-container'>
        <div className='username'>Pseudo de l'utilisateur : ""</div>
        <form onSubmit={handleSubmit} className='password-form'>
          <input
            type='password'
            placeholder='Nouveau mot de passe'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type='submit'>Modifier le mot de passe</Button>
        </form>
      </div>
    </>
  );
}
