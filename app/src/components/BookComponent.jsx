import { useState } from 'react';
import { Card, Modal, Button, Row, Col } from 'react-bootstrap';

export default function BookComponent({ userId, data, isInCollections, isInFavorites }) {
  const [isModalShown, showModal] = useState(false);
  const [collectionsBtnVariant, setCollectionsBtnVariant] = useState(
    isInCollections ? 'danger' : 'success'
  );
  const [collectionsBtnText, setCollectionsBtnText] = useState(
    isInCollections ? 'Retirer de ma collection' : 'Ajouter à la collection'
  );
  const [favoritesBtnVariant, setFavoritesBtnVariant] = useState(
    isInFavorites ? 'danger' : 'success'
  );
  const [favoritesBtnText, setFavoritesBtnText] = useState(
    isInFavorites ? 'Retirer de mes favoris' : 'Ajouter à mes favoris'
  );

  const addToCollections = async () => {
    try {
      await fetch(`http://localhost:3000/collection/${userId}/new/${data._id}`, {
        method: 'POST',
        mode: 'cors',
      });

      console.log("Book is successfully added to user's collections!");
    } catch (error) {
      throw error;
    }
  };

  const removeToCollections = async () => {
    try {
      await fetch(`http://localhost:3000/collection/${userId}/remove/${data._id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      console.log("Book is successfully removed to user's collections!");
    } catch (error) {
      throw error;
    }
  };

  const addToFavorites = async () => {
    try {
      await fetch(`http://localhost:3000/favorites/${userId}/new/${data._id}`, {
        method: 'POST',
        mode: 'cors',
      });

      console.log("Book is successfully added to user's favorites!");
    } catch (error) {
      throw error;
    }
  };

  const removeToFavorites = async () => {
    try {
      await fetch(`http://localhost:3000/favorites/${userId}/remove/${data._id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      console.log("Book is successfully removed to user's favorites!");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Card onClick={() => showModal(true)}>
        <Card.Img variant='top' src={data.image} style={{ height: '400px' }} />
      </Card>
      <Modal size='lg' centered show={isModalShown} onHide={() => showModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informations sur le livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={4}>
              <img src={data.image} alt='' style={{ display: 'block', width: '200px' }} />
            </Col>
            <Col>
              <Row>Titre : {data.title}</Row>
              <Row>Auteur : {data.author}</Row>
              <Row>Genre : {data.categories.join(', ')}</Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={collectionsBtnVariant}
            onClick={() => {
              if (collectionsBtnVariant === 'success') {
                addToCollections();
                setCollectionsBtnVariant(() => 'danger');
                setCollectionsBtnText(() => 'Retirer de ma collections');
              } else {
                removeToCollections();
                setCollectionsBtnVariant(() => 'success');
                setCollectionsBtnText(() => 'Ajouter à ma collections');
              }
            }}
          >
            {collectionsBtnText}
          </Button>
          <Button
            variant={favoritesBtnVariant}
            onClick={() => {
              if (favoritesBtnVariant === 'success') {
                addToFavorites();
                setFavoritesBtnVariant(() => 'danger');
                setFavoritesBtnText(() => 'Retirer de mes favoris');
              } else {
                removeToFavorites();
                setFavoritesBtnVariant(() => 'success');
                setFavoritesBtnText(() => 'Ajouter à mes favoris');
              }
            }}
          >
            {favoritesBtnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
