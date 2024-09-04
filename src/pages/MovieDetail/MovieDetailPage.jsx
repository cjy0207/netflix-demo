import React from 'react'
import { Alert, Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'

const MovieDetailPage = () => {

  const {id} =useParams()
  const {data, isLoading, isError, error} = useMovieDetailQuery({id})
  console.log("detail", data)

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }


  return (
    <Container>
      <Row>
        <Col>
          <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data?.poster_path}`}/>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetailPage