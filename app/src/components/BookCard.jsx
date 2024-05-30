export default function BookCard({ data }) {
  // const handleCollections = async () => {
  //   // Adds the book into user's collection
  //   try {
  //     await fetch(`http://locahost:3000/collection/${user.id}/new/${data.id}`);
  //   } catch (error) {
  //     throw error;
  //   }

  //   // Gets the updated user
  //   try {
  //     const response = await fetch('');

  //     if (!response.ok) {
  //       throw new Error('Impossible to get user!');
  //     }

  //     const newUser = await response.json();
  //     setUser(() => newUser);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const handleFavorites = () => {};

  return (
    <Card>
      <Card.Img variant='top' src={data.image} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.author}</Card.Text>
        <Button variant='primary'>Consulter</Button>
        {/* {showCollectionsBtn && setCollections !== null ? (
          <Button variant='primary' onclick={handleCollections}>
            Ajouter dans ma collection
          </Button>
        ) : (
          <></>
        )}
        {showFavoritesBtn && setFavorites !== null ? (
          <Button variant='primary' onclick={handleFavorites}>
            Ajouter à mes favoris
          </Button>
        ) : (
          <></>
        )} */}
      </Card.Body>
    </Card>
  );
}
