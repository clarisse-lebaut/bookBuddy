import { useState } from 'react';
import { Card, Modal, Button, Row, Col } from 'react-bootstrap';

export default function BookComponent({ data, isInCollections, isInFavorites }) {
  const [isModalShown, showModal] = useState(false);

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
          <Button variant={isInCollections ? 'danger' : 'success'} onClick={() => showModal(false)}>
            {isInCollections ? 'Retirer de ma collection' : 'Ajouter à la collection'}
          </Button>
          <Button variant={isInFavorites ? 'danger' : 'success'} onClick={() => showModal(false)}>
            {isInFavorites ? 'Retirer de mes favoris' : 'Ajouter à mes favoris'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
