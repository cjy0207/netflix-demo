import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>; // Loading 상태를 제대로 반환합니다
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>; // Error 상태를 제대로 반환합니다
  }

  const backgroundImage = `url(https://image.tmdb.org/t/p/original${data?.results[2].poster_path})`;

  return (
    <div
      style={{ backgroundImage }}
      className='banner'
    >
      <div className='text-white banner-text-area'>
        <h1>{data?.results[2].title}</h1>
        <p>{data?.results[2].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
