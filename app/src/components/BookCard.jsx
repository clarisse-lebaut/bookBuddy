export default function BookCard({ data }) {
  return (
    <Card>
      <Card.Img variant='top' src={data.image} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.author}</Card.Text>
        <Button variant='primary'>Consulter</Button>
        <Button variant='primary'>Ajouter aux favoris</Button>
      </Card.Body>
    </Card>
  );
}
