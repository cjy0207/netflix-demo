import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams } from "react-router-dom";
import { Alert, Container, Spinner, Row, Col, Form } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import './MoviePage.style.css'

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 기본 정렬 순서: 내림차순 (인기순)
  const [page, setPage] = useState(1);

  const { data: genreData } = useMovieGenreQuery();
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

  useEffect(() => {
    setPage(1);
  }, [keyword, selectedGenre, sortOrder]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="danger" style={{ width: "5rem", height: "5rem" }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 필터링 및 정렬 로직
  const filteredMovies = data?.results.filter(movie => 
    selectedGenre ? movie.genre_ids.includes(parseInt(selectedGenre)) : true
  ).sort((a, b) => {
    if (sortOrder === "desc") {
      return b.popularity - a.popularity;
    } else {
      return a.popularity - b.popularity;
    }
  });

  return (
    <Container>
      <Row>
        <Col lg={2} xs={12}>
          <Row>
            <Form.Group controlId="genreSelect">
              <Form.Label>장르 필터</Form.Label>
              <Form.Control as="select" onChange={handleGenreChange} value={selectedGenre}>
                <option value="">모든 장르</option>
                {genreData?.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group controlId="sortSelect">
              <Form.Label>정렬</Form.Label>
              <Form.Control as="select" onChange={handleSortChange} value={sortOrder}>
                <option value="desc">인기순</option>
                <option value="asc">인기역순</option>
                {/* Add more sorting options here if needed */}
              </Form.Control>
            </Form.Group>
          </Row>
        </Col>

        <Col lg={8} xs={13} className="mt-3">
          {filteredMovies?.length === 0 ? (
            <Alert variant="info">검색 결과가 없습니다.</Alert>
          ) : (
            <>
              <Row>
                {filteredMovies.map((movie, index) => (
                  <Col key={index} lg={4} xs={6} className="mb-2">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>

              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={data.total_pages}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
                className="pagination mt-4"
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
