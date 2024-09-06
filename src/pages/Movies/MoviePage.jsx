import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Container, Spinner, Row, Col, Dropdown } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sort, setSort] = useState("popularity");

  const { data: genres = [], isLoading: isGenresLoading } = useMovieGenreQuery();
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page, genre: selectedGenre, sort });

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setQuery({ q: keyword, genre: genreId });
  };

  const handleSortSelect = (sortOption) => {
    setSort(sortOption);
    setQuery({ q: keyword, sort: sortOption });
  };

  if (isGenresLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={2} xs={12}>
          <Row>
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic" className="mt-4">
                필터
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {genres.map((genre) => (
                  <Dropdown.Item
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre.id)}
                  >
                    {genre.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>

          <Row className="mt-3">
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                정렬
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleSortSelect("popularity")}
                >
                  Popularity
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Col>

        <Col lg={8} xs={13} className="mt-3">
          {data?.results.length === 0 ? (
            <Alert variant="info">검색 결과가 없습니다.</Alert>
          ) : (
            <>
              <Row>
                {data.results.map((movie, index) => (
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
