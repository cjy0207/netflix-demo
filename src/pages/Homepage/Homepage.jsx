import React from 'react'
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide';

//배너 => popular movie를 가져와서 첫번째 아이템 보여주기
//popular movie
//top rated movie
//upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner/>
      <PopularMovieSlide/>
      <TopRatedMovieSlide/>
      <UpcomingMovieSlide/>
    </div>
  )
}

export default Homepage;