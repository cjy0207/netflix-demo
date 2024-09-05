import React from 'react';
import { Alert, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';

const MovieDetailPage = () => {
  const { id } = useParams(); 
  const { data, isLoading, isError, error } = useMovieDetailQuery({ id }); 
  console.log("detail", data);

  const showGenre = (genreList) => {
    if (!genreList) return [];
    return genreList.map((genre) => genre.name);
  };

  if (isLoading) {
    return <h1>Loading...</h1>; 
  }
  
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>; 
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col md={4}>
          {data?.poster_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`} 
              style={{ width: '100%', height: 'auto' }} 
            />
          ) : (
            <p>No poster available</p> 
          )}
        </Col>
        <Col md={8}>
          <Card style={{background: 'black', color:'white'}}>
            <Card.Body>
              <Card.Title><h2><strong>{data?.title}</strong></h2></Card.Title>
              <Card.Subtitle className="mb-2">{data?.release_date}</Card.Subtitle>
              <Card.Text>
                <strong>Overview:</strong> {data?.overview}
              </Card.Text>
              <Card.Text>
              <strong>Genre: </strong>
                {showGenre(data?.genres).map((name, index) => (
                  <Badge key={index} bg="danger" className="me-2">{name}</Badge>
                ))}
              </Card.Text>
              <Card.Text>
                <strong>Runtime:</strong> {data?.runtime} minutes
              </Card.Text>
              <Card.Text>
                <strong>Average Rating:</strong> {data?.vote_average}
              </Card.Text>
              <Card.Text>
                <strong>Popularity:</strong> {data?.popularity}
              </Card.Text>
              <Card.Text>
                <strong>Production Companies:</strong> {data?.production_companies.map((company) => company.name).join(', ')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
