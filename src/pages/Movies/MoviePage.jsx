import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Container, Spinner, Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import './MoviePage.style.css'

//경로 2가지
//nav바에서  클릭해서 온 경우 => popularMovie보여주기
//keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할 때마다  page바꾸기
//page 값이 바뀔 때마다 useSearchMovie에  page까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const [page, setPage] = useState(1)

  useEffect(()=>{
    setPage(1)
  }, [keyword])

  const handlePageClick =({selected}) =>{
    setPage(selected+1)
  }

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  console.log("s", data);
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
            필터
          </Row>

          <Row>
            sort
          </Row>
        </Col>

        <Col lg={8} xs={13} className="mt-3">
          <Row>
            {data?.results.map((movie, index) => (
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
            pageCount={data?.total_pages}
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
            forcePage={page-1}
            className="pagination mt-4"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
