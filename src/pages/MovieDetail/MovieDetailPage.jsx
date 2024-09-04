import React from "react";
import { useParams } from "react-router-dom";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieRecommendQuery } from "../../hooks/useMovieRecommend";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieDetailPage = () => {
  const { id } = useParams();
  const {data:recommendData} = useMovieRecommendQuery({id})
  const {data:reviewData} = useMovieReviewQuery({id})
  const {data:videoData} = useMovieVideoQuery({id})

  const {data : genreData}=useMovieGenreQuery()
  const showGenre=(genreIdList)=>{
    if(!genreData) return []
    const genreNameList=genreIdList.map((id)=>{
        const genreObj = genreData.find((genre)=>genre.id===id);
        return genreObj.name;
    })

    return genreNameList;
  }

  const {data:detailData, isLoading, isError, error} = useMovieDetailQuery({id})
  console.log("detail", detailData)

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
          <img src={`https://www.themovidb.org/t/p/w300_and_h450_bestv2/${detailData?.poster_path}`}/>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
