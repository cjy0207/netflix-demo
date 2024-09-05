import React, { useState } from "react";
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faClock,
  faStar,
  faUser,
  faUsers,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";
import { useMovieRecommendQuery } from "../../hooks/useMovieRecommend";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";
import MovieCard from "../../common/MovieCard/MovieCard";
import YouTube from 'react-youtube';


const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
  const { data: reviewData } = useMovieReviewQuery({ id });
  const { data: recData } = useMovieRecommendQuery({ id });
  const {data:videoData}=useMovieVideoQuery({id});

  console.log("video", videoData)

  const [showReviews, setShowReviews] = useState(true);
  const [expandedReview, setExpandedReview] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const showGenre = (genreList) => {
    if (!genreList) return [];
    return genreList.map((genre) => genre.name);
  };

  const toggleReview = (index) => {
    setExpandedReview(expandedReview === index ? null : index);
  };

  const trailer = videoData?.results.find(video => video.type === "Trailer");
  const handleShowTrailer = (key) => {
    setTrailerKey(key);
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setTrailerKey("");
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
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              style={{ width: "100%", height: "auto" }}
              alt={data?.title}
            />
          ) : (
            <p>No poster available</p>
          )}
        </Col>
        <Col md={8}>
          <Card style={{ background: "black", color: "white" }}>
            <Card.Body>
              <Card.Title>
                <h2>
                  <strong>{data?.title}</strong>
                  {trailer && (
                  <Button
                    variant="danger"
                    onClick={() => handleShowTrailer(trailer.key)}
                    style={{ marginLeft: '10px' }}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </Button>
                )}
                </h2>
                
              </Card.Title>
              <Card.Subtitle className="mb-2">
                {data?.release_date}
              </Card.Subtitle>
              <Card.Text>
                <strong>Overview:</strong> {data?.overview}
              </Card.Text>
              <Card.Text>
                <strong>Genre: </strong>
                {showGenre(data?.genres).map((name, index) => (
                  <Badge key={index} bg="danger" className="me-2">
                    {name}
                  </Badge>
                ))}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faClock} className="icon" />
                {data?.runtime} minutes
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon
                  icon={faStar}
                  className="icon"
                  style={{ color: "yellow" }}
                />{" "}
                {data?.vote_average}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faUsers} className="icon" />
                {data?.popularity}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faBuilding} className="icon" />
                {data?.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button
            variant={showReviews ? "danger" : "secondary"}
            onClick={() => setShowReviews(true)}
          >
            Review
          </Button>
          <Button
            variant={!showReviews ? "danger" : "secondary"}
            onClick={() => setShowReviews(false)}
            className="ms-2"
          >
            추천 영화
          </Button>

          {showReviews ? (
            <div>
              {reviewData?.results.length === 0 ? (
                <p>No reviews available.</p>
              ) : (
                reviewData?.results.map((review, index) => {
                  const isExpanded = expandedReview === index;
                  const maxLength = 350;
                  const shortReview =
                    review.content.length > maxLength
                      ? review.content.slice(0, maxLength) + "..."
                      : review.content;

                  return (
                    <Card
                      key={index}
                      className="mb-4 mt-4"
                      style={{
                        background: "black",
                        color: "white",
                        border: "2px solid red",
                      }}
                    >
                      <Card.Body>
                        <Card.Title>
                          <FontAwesomeIcon icon={faUser} className="icon" />
                          {review.author}
                        </Card.Title>
                        <Card.Subtitle className="mb-2">
                          {new Date(review.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Card.Text>
                          {isExpanded ? review.content : shortReview}
                        </Card.Text>
                        {review.content.length > maxLength && (
                          <Button
                            variant="danger"
                            onClick={() => toggleReview(index)}
                          >
                            {isExpanded ? "접기" : "더보기"}
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  );
                })
              )}
            </div>
          ) : (
            <div>
              {recData?.results.length === 0 ? (
                <p>No recommendations available.</p>
              ) : (
                <Row>
                  {recData.results.map((movie, index) => (
                    <Col key={index} md={3} xs={6}className="mb-4 mt-4">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          )}
        </Col>
      </Row>

      <Modal show={showTrailer} onHide={handleCloseTrailer} size="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body >
          {trailerKey && (
            <YouTube videoId={trailerKey} opts={{ height: '390', width: '100%' }} />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MovieDetailPage;
